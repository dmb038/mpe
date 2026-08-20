import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database.types";

/** Refreshes the Supabase session cookie on every request and redirects
 * signed-out visitors away from the gated /portal area. Runs in Proxy
 * (proxy.ts), so it only checks session existence — role-based checks for
 * /portal/admin happen again inside that route group's own layout and
 * Server Actions, per Next.js's guidance not to rely on Proxy alone. */
export async function refreshSessionAndGuard(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Supabase isn't configured yet (e.g. local dev before the project is
    // provisioned). Let requests through rather than hard-failing every
    // page load — each portal page/layout does its own session check
    // server-side as a second line of defense, so this isn't a security
    // gap once Supabase *is* configured, only a dev-time convenience.
    return response;
  }

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname === "/portal/login" || pathname.startsWith("/portal/signup");
  const isPortalRoute = pathname.startsWith("/portal") && !isAuthRoute;

  if (!user && isPortalRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/portal/login";
    return NextResponse.redirect(url);
  }
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/portal";
    return NextResponse.redirect(url);
  }

  return response;
}
