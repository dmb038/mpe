"use server";

import { createClient } from "@/lib/supabase/server";
import { getResendClient, EMAIL_FROM, SECURITY_TEAM_EMAIL } from "@/lib/email/resend";
import { flockRequestNotificationEmail } from "@/lib/email/templates";
import { flockRequestSchema, type FlockRequestInput } from "@/lib/validation/schemas";
import type { ActionResult } from "./contact";

export async function submitFlockRequest(input: FlockRequestInput): Promise<ActionResult> {
  const parsed = flockRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }
  if (parsed.data.company) {
    return { ok: true };
  }
  if (!parsed.data.incidentDate && !parsed.data.incidentNotSure) {
    return { ok: false, error: "Give an approximate date/time, or note that you're not sure." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("flock_requests").insert({
    requester_name: parsed.data.name,
    requester_email: parsed.data.email,
    incident_datetime: parsed.data.incidentDate ? new Date(parsed.data.incidentDate).toISOString() : null,
    incident_date_text: parsed.data.incidentNotSure || null,
    description: parsed.data.description,
  });

  if (error) {
    console.error("submitFlockRequest insert failed", error);
    return { ok: false, error: "Something went wrong saving your request. Please try again." };
  }

  const resend = getResendClient();
  if (resend) {
    const { subject, html } = flockRequestNotificationEmail({
      requesterName: parsed.data.name,
      requesterEmail: parsed.data.email,
      incidentWhen: parsed.data.incidentDate || parsed.data.incidentNotSure || "Not specified",
      description: parsed.data.description,
    });
    await resend.emails.send({ from: EMAIL_FROM, to: SECURITY_TEAM_EMAIL, subject, html }).catch((err) => {
      console.error("submitFlockRequest email failed", err);
    });
  }

  return { ok: true };
}
