import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import type { AuthenticatorTransportFuture } from "@simplewebauthn/server";
import { getCurrentResident } from "@/lib/supabase/getCurrentResident";
import { createAdminClient } from "@/lib/supabase/admin";
import { getWebauthnConfig, CHALLENGE_COOKIE } from "@/lib/webauthn/config";

export async function POST() {
  const resident = await getCurrentResident();
  if (!resident) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { rpID, rpName } = getWebauthnConfig();
  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("webauthn_credentials")
    .select("credential_id, transports")
    .eq("resident_id", resident.id);

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userName: resident.csv_email,
    userDisplayName: resident.full_name,
    attestationType: "none",
    excludeCredentials: (existing ?? []).map((c) => ({
      id: c.credential_id,
      transports: (c.transports ?? undefined) as AuthenticatorTransportFuture[] | undefined,
    })),
    authenticatorSelection: { residentKey: "preferred", userVerification: "preferred" },
  });

  const store = await cookies();
  store.set(CHALLENGE_COOKIE, options.challenge, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 300,
    path: "/",
  });

  return NextResponse.json(options);
}
