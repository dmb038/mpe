export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "").replace(/^1(\d{10})$/, "$1");
}

export function normalizeAddress(address: string) {
  return address
    .trim()
    .toLowerCase()
    .replace(/[.,#]/g, "")
    .replace(/\bstreet\b/g, "st")
    .replace(/\bavenue\b/g, "ave")
    .replace(/\bboulevard\b/g, "blvd")
    .replace(/\bdrive\b/g, "dr")
    .replace(/\bparkway\b/g, "pkwy")
    .replace(/\blane\b/g, "ln")
    .replace(/\bcourt\b/g, "ct")
    .replace(/\s+/g, " ");
}
