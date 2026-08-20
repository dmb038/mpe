import type { NextRequest } from "next/server";
import { refreshSessionAndGuard } from "@/lib/supabase/proxySession";

export function proxy(request: NextRequest) {
  return refreshSessionAndGuard(request);
}

export const config = {
  // Only the resident portal needs session refresh/guarding — the
  // marketing site is entirely public and shouldn't pay for a Supabase
  // round-trip (or break if Supabase isn't configured yet) on every page.
  matcher: ["/portal/:path*"],
};
