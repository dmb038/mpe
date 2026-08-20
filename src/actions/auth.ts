"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { loginSchema, type LoginInput } from "@/lib/validation/schemas";
import type { ActionResult } from "./contact";

export async function login(input: LoginInput): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "The resident portal isn't connected to a database yet." };
  }

  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { ok: false, error: "Incorrect email or password." };
  }
  return { ok: true };
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
