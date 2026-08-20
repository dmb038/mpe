import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "mpe_signup_session";
const MAX_AGE_SECONDS = 30 * 60; // 30 minutes to complete all 3 signup steps

function secret() {
  const value = process.env.SIGNUP_SESSION_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!value) throw new Error("SIGNUP_SESSION_SECRET (or SUPABASE_SERVICE_ROLE_KEY) is not configured");
  return value;
}

function sign(residentId: string) {
  return createHmac("sha256", secret()).update(residentId).digest("hex");
}

/** Sets a signed cookie pointing at the resident mid-signup, so steps 2 and
 * 3 know who they're verifying without trusting an unsigned client value. */
export async function setSignupSession(residentId: string) {
  const signature = sign(residentId);
  const store = await cookies();
  store.set(COOKIE_NAME, `${residentId}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function getSignupResidentId(): Promise<string | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  const [residentId, signature] = raw.split(".");
  if (!residentId || !signature) return null;

  const expected = sign(residentId);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  return residentId;
}

export async function clearSignupSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
