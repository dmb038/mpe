"use server";

import { randomInt, createHash } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { getResendClient, EMAIL_FROM } from "@/lib/email/resend";
import { verificationCodeEmail } from "@/lib/email/templates";
import { normalizeEmail, normalizePhone, normalizeAddress } from "@/lib/normalize";
import { setSignupSession, getSignupResidentId, clearSignupSession } from "@/lib/signupSession";
import {
  signupVerifySchema,
  emailCodeSchema,
  setCredentialsSchema,
  type SignupVerifyInput,
} from "@/lib/validation/schemas";
import type { ActionResult } from "./contact";

const CODE_EXPIRY_MINUTES = 15;
const MAX_ATTEMPTS = 5;

function hashCode(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

/** Step 1: match the applicant against the pre-loaded resident list, then
 * email a verification code to the address already on file. */
export async function verifyResident(input: SignupVerifyInput): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "The resident portal isn't connected to a database yet." };
  }

  const parsed = signupVerifySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }

  const email = normalizeEmail(parsed.data.email);
  const mobile = normalizePhone(parsed.data.mobile);
  const address = normalizeAddress(parsed.data.address);

  const admin = createAdminClient();
  const { data: candidates, error } = await admin
    .from("residents")
    .select("*")
    .eq("csv_email", email);

  if (error) {
    console.error("verifyResident lookup failed", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  const resident = (candidates ?? []).find(
    (r) => normalizePhone(r.csv_mobile) === mobile && normalizeAddress(r.address_line1).includes(address)
  );

  // Deliberately generic — don't reveal which field didn't match.
  const genericError =
    "We couldn't verify your information against our resident records. Double-check your entries, or contact the board if you believe this is an error.";

  if (!resident) {
    return { ok: false, error: genericError };
  }
  if (resident.status === "active") {
    return {
      ok: false,
      error: "An account already exists for this address. Try logging in, or use \"forgot password\".",
    };
  }
  if (resident.status === "disabled") {
    return { ok: false, error: genericError };
  }

  const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
  const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60_000).toISOString();

  const { error: insertError } = await admin.from("email_verification_codes").insert({
    resident_id: resident.id,
    email: resident.csv_email,
    code_hash: hashCode(code),
    expires_at: expiresAt,
  });
  if (insertError) {
    console.error("verifyResident code insert failed", insertError);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  await admin.from("residents").update({ status: "pending_verification" }).eq("id", resident.id);
  await setSignupSession(resident.id);

  const resend = getResendClient();
  if (resend) {
    const { subject, html } = verificationCodeEmail(code);
    await resend.emails.send({ from: EMAIL_FROM, to: resident.csv_email, subject, html }).catch((err) => {
      console.error("verifyResident email send failed", err);
    });
  } else {
    console.info(`[dev] Verification code for ${resident.csv_email}: ${code}`);
  }

  return { ok: true };
}

export async function confirmEmailCode(input: { code: string }): Promise<ActionResult> {
  const parsed = emailCodeSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid code" };
  }

  const residentId = await getSignupResidentId();
  if (!residentId) {
    return { ok: false, error: "Your signup session expired. Please start over." };
  }

  const admin = createAdminClient();
  const { data: codeRow, error } = await admin
    .from("email_verification_codes")
    .select("*")
    .eq("resident_id", residentId)
    .is("consumed_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !codeRow) {
    return { ok: false, error: "No pending verification code found. Please start over." };
  }
  if (new Date(codeRow.expires_at) < new Date()) {
    return { ok: false, error: "That code has expired. Please start over." };
  }
  if (codeRow.attempt_count >= MAX_ATTEMPTS) {
    return { ok: false, error: "Too many attempts. Please start over." };
  }

  if (hashCode(parsed.data.code) !== codeRow.code_hash) {
    await admin
      .from("email_verification_codes")
      .update({ attempt_count: codeRow.attempt_count + 1 })
      .eq("id", codeRow.id);
    return { ok: false, error: "Incorrect code. Please try again." };
  }

  await admin.from("email_verification_codes").update({ consumed_at: new Date().toISOString() }).eq("id", codeRow.id);

  return { ok: true };
}

export async function setCredentials(input: {
  password: string;
  confirmPassword: string;
}): Promise<ActionResult> {
  const parsed = setCredentialsSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }

  const residentId = await getSignupResidentId();
  if (!residentId) {
    return { ok: false, error: "Your signup session expired. Please start over." };
  }

  const admin = createAdminClient();
  const { data: resident, error: fetchError } = await admin
    .from("residents")
    .select("*")
    .eq("id", residentId)
    .single();

  if (fetchError || !resident) {
    return { ok: false, error: "Something went wrong. Please start over." };
  }
  if (resident.status !== "pending_verification") {
    return { ok: false, error: "Please verify your email before setting a password." };
  }

  const { data: newUser, error: createError } = await admin.auth.admin.createUser({
    email: resident.csv_email,
    password: parsed.data.password,
    email_confirm: true,
  });
  if (createError || !newUser.user) {
    console.error("setCredentials createUser failed", createError);
    return { ok: false, error: "Something went wrong creating your account. Please try again." };
  }

  await admin
    .from("residents")
    .update({ auth_user_id: newUser.user.id, status: "active" })
    .eq("id", resident.id);

  await admin.from("directory_preferences").insert({ resident_id: resident.id });

  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: resident.csv_email,
    password: parsed.data.password,
  });
  if (signInError) {
    console.error("setCredentials signIn failed", signInError);
    return { ok: false, error: "Account created, but automatic sign-in failed. Please log in manually." };
  }

  await clearSignupSession();
  return { ok: true };
}
