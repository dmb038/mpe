"use server";

import { createClient } from "@/lib/supabase/server";
import { getResendClient, EMAIL_FROM, SECURITY_TEAM_EMAIL } from "@/lib/email/resend";
import { contactUsNotificationEmail } from "@/lib/email/templates";
import { contactSchema, type ContactInput } from "@/lib/validation/schemas";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function submitContactMessage(input: ContactInput): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }
  if (parsed.data.company) {
    // Honeypot tripped — silently pretend success so bots don't learn.
    return { ok: true };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject || null,
    message: parsed.data.message,
  });

  if (error) {
    console.error("submitContactMessage insert failed", error);
    return { ok: false, error: "Something went wrong saving your message. Please try again." };
  }

  const resend = getResendClient();
  if (resend) {
    const { subject, html } = contactUsNotificationEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      body: parsed.data.message,
    });
    await resend.emails.send({ from: EMAIL_FROM, to: SECURITY_TEAM_EMAIL, subject, html }).catch((err) => {
      console.error("submitContactMessage email failed", err);
    });
  }

  return { ok: true };
}
