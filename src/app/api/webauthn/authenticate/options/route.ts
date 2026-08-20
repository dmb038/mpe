import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import type { AuthenticatorTransportFuture } from "@simplewebauthn/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeEmail } from "@/lib/normalize";
import { getWebauthnConfig, CHALLENGE_COOKIE, CHALLENGE_RESIDENT_COOKIE } from "@/lib/webauthn/config";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };
  const { rpID } = getWebauthnConfig();

  // Always return options (never reveal whether the email matched a
  // resident) — if there are no credentials, allowCredentials is just
  // empty and the browser will report no eligible passkey.
  const admin = createAdminClient();
  let allowCredentials: { id: string; transports?: AuthenticatorTransportFuture[] }[] = [];
  let residentId: string | null = null;

  if (email) {
    const { data: resident } = await admin
      .from("residents")
      .select("id")
      .eq("csv_email", normalizeEmail(email))
      .eq("status", "active")
      .maybeSingle();

    if (resident) {
      residentId = resident.id;
      const { data: creds } = await admin
        .from("webauthn_credentials")
        .select("credential_id, transports")
        .eq("resident_id", resident.id);
      allowCredentials = (creds ?? []).map((c) => ({
        id: c.credential_id,
        transports: (c.transports ?? undefined) as AuthenticatorTransportFuture[] | undefined,
      }));
    }
  }

  const options = await generateAuthenticationOptions({
    rpID,
    allowCredentials,
    userVerification: "preferred",
  });

  const store = await cookies();
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 300,
    path: "/",
  };
  store.set(CHALLENGE_COOKIE, options.challenge, cookieOpts);
  if (residentId) store.set(CHALLENGE_RESIDENT_COOKIE, residentId, cookieOpts);

  return NextResponse.json(options);
}
