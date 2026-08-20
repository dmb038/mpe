import "server-only";
import { Resend } from "resend";

let client: Resend | null = null;

/** Returns null (rather than throwing) when RESEND_API_KEY isn't configured
 * yet, so forms can still save to the database and degrade gracefully in
 * local dev before the Resend account is set up. */
export function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export const EMAIL_FROM = process.env.EMAIL_FROM ?? "MPE Dallas <notifications@mpedallas.com>";
export const SECURITY_TEAM_EMAIL =
  process.env.SECURITY_TEAM_EMAIL ?? "merrimanparkestates@gmail.com";
