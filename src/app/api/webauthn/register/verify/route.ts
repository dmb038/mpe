import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import type { RegistrationResponseJSON } from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { getCurrentResident } from "@/lib/supabase/getCurrentResident";
import { createAdminClient } from "@/lib/supabase/admin";
import { getWebauthnConfig, CHALLENGE_COOKIE } from "@/lib/webauthn/config";

export async function POST(request: Request) {
  const resident = await getCurrentResident();
  if (!resident) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const store = await cookies();
  const expectedChallenge = store.get(CHALLENGE_COOKIE)?.value;
  if (!expectedChallenge) {
    return NextResponse.json({ error: "Registration session expired. Try again." }, { status: 400 });
  }

  const body = (await request.json()) as { response: RegistrationResponseJSON; deviceLabel?: string };
  const { rpID, origin } = getWebauthnConfig();

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response: body.response,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });
  } catch (err) {
    console.error("passkey registration verify failed", err);
    return NextResponse.json({ error: "Couldn't verify that passkey." }, { status: 400 });
  }

  store.delete(CHALLENGE_COOKIE);

  if (!verification.verified) {
    return NextResponse.json({ error: "Couldn't verify that passkey." }, { status: 400 });
  }

  const { credential } = verification.registrationInfo;
  const admin = createAdminClient();
  const { error } = await admin.from("webauthn_credentials").insert({
    resident_id: resident.id,
    credential_id: credential.id,
    public_key: isoBase64URL.fromBuffer(credential.publicKey),
    counter: credential.counter,
    transports: credential.transports ?? null,
    device_label: body.deviceLabel ?? null,
  });

  if (error) {
    console.error("passkey registration insert failed", error);
    return NextResponse.json({ error: "Couldn't save that passkey." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
