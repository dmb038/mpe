import "server-only";

/**
 * WEBAUTHN_RP_ID must be the site's bare domain (e.g. "mpedallas.com", or
 * "localhost" in dev) — no protocol, no port. WEBAUTHN_ORIGIN is the full
 * origin the browser sends requests from (e.g. "https://mpedallas.com").
 */
export function getWebauthnConfig() {
  const rpID = process.env.WEBAUTHN_RP_ID ?? "localhost";
  const rpName = process.env.WEBAUTHN_RP_NAME ?? "Merriman Park Estates";
  const origin = process.env.WEBAUTHN_ORIGIN ?? "http://localhost:3000";
  return { rpID, rpName, origin };
}

export const CHALLENGE_COOKIE = "mpe_webauthn_challenge";
export const CHALLENGE_RESIDENT_COOKIE = "mpe_webauthn_resident";
