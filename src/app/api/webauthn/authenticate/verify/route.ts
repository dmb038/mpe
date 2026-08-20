import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import type { AuthenticationResponseJSON, AuthenticatorTransportFuture } from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { mintSessionForEmail } from "@/lib/supabase/mintSession";
import { getWebauthnConfig, CHALLENGE_COOKIE, CHALLENGE_RESIDENT_COOKIE } from "@/lib/webauthn/config";

export async function POST(request: Request) {
  const store = await cookies();
  const expectedChallenge = store.get(CHALLENGE_COOKIE)?.value;
  const residentId = store.get(CHALLENGE_RESIDENT_COOKIE)?.value;
  if (!expectedChallenge || !residentId) {
    return NextResponse.json({ error: "Sign-in session expired. Try again." }, { status: 400 });
  }

  const body = (await request.json()) as { response: AuthenticationResponseJSON };
  const { rpID, origin } = getWebauthnConfig();

  const admin = createAdminClient();
  const { data: storedCredential } = await admin
    .from("webauthn_credentials")
    .select("*")
    .eq("resident_id", residentId)
    .eq("credential_id", body.response.id)
    .maybeSingle();

  if (!storedCredential) {
    return NextResponse.json({ error: "That passkey isn't recognized." }, { status: 400 });
  }

  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: body.response,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: storedCredential.credential_id,
        publicKey: isoBase64URL.toBuffer(storedCredential.public_key),
        counter: Number(storedCredential.counter),
        transports: (storedCredential.transports ?? undefined) as AuthenticatorTransportFuture[] | undefined,
      },
    });
  } catch (err) {
    console.error("passkey authentication verify failed", err);
    return NextResponse.json({ error: "Couldn't verify that passkey." }, { status: 400 });
  }

  store.delete(CHALLENGE_COOKIE);
  store.delete(CHALLENGE_RESIDENT_COOKIE);

  if (!verification.verified) {
    return NextResponse.json({ error: "Couldn't verify that passkey." }, { status: 400 });
  }

  await admin
    .from("webauthn_credentials")
    .update({ counter: verification.authenticationInfo.newCounter, last_used_at: new Date().toISOString() })
    .eq("id", storedCredential.id);

  const { data: resident } = await admin.from("residents").select("csv_email").eq("id", residentId).single();
  if (!resident) {
    return NextResponse.json({ error: "Account not found." }, { status: 400 });
  }

  try {
    await mintSessionForEmail(resident.csv_email);
  } catch (err) {
    console.error("passkey session mint failed", err);
    return NextResponse.json({ error: "Verified, but couldn't sign you in. Please use your password." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
