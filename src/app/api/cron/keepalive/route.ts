import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Pinged weekly by Vercel Cron (see vercel.json). Supabase free-tier
 * projects auto-pause after 7 days of inactivity — a paused project takes
 * the entire portal down until someone manually resumes it in the
 * dashboard, so this is not optional cosmetic housekeeping.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from("residents").select("id").limit(1);

  if (error) {
    console.error("keepalive ping failed", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
}
