import "server-only";
import { createClient } from "./server";
import { isSupabaseConfigured } from "./isConfigured";
import type { Database } from "@/types/database.types";

type Resident = Database["public"]["Tables"]["residents"]["Row"];

/** Returns the signed-in user's resident row, or null if not logged in
 * (also null, rather than throwing, if Supabase isn't configured yet). */
export async function getCurrentResident(): Promise<Resident | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase.from("residents").select("*").eq("auth_user_id", user.id).maybeSingle();
  return data ?? null;
}
