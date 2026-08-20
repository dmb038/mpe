import "server-only";
import { createAdminClient } from "./admin";
import { createClient } from "./server";

/**
 * Establishes a real Supabase Auth session for a resident who just proved
 * their identity through a non-password path (email verification code
 * during signup, or a verified passkey ceremony) rather than
 * `signInWithPassword`.
 *
 * Supabase doesn't expose a direct "mint me a session for this user" call
 * from the service role, so this bridges through its magic-link machinery:
 * generate a magic link server-side (never emailed anywhere), then
 * immediately redeem its token hash against the request-scoped client so
 * the resulting session cookies get attached to the current response.
 * Only callable from a Server Action or Route Handler, where cookies() is
 * writable.
 */
export async function mintSessionForEmail(email: string) {
  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (error || !data.properties?.hashed_token) {
    throw new Error(error?.message ?? "Could not generate a session for this account");
  }

  const supabase = await createClient();
  const { error: verifyError } = await supabase.auth.verifyOtp({
    type: "magiclink",
    token_hash: data.properties.hashed_token,
  });
  if (verifyError) {
    throw new Error(verifyError.message);
  }
}
