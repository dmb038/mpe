"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentResident } from "@/lib/supabase/getCurrentResident";
import { accountSettingsSchema, type AccountSettingsInput } from "@/lib/validation/schemas";
import type { ActionResult } from "./contact";

export async function updateVisibilityPrefs(input: AccountSettingsInput): Promise<ActionResult> {
  const parsed = accountSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid submission" };
  }

  const resident = await getCurrentResident();
  if (!resident) {
    return { ok: false, error: "You must be signed in." };
  }

  const supabase = await createClient();
  const { error: prefsError } = await supabase
    .from("directory_preferences")
    .update({
      show_in_directory: parsed.data.show_in_directory,
      show_email: parsed.data.show_email,
      show_phone: parsed.data.show_phone,
      show_household: parsed.data.show_household,
    })
    .eq("resident_id", resident.id);

  const { error: residentError } = await supabase
    .from("residents")
    .update({
      display_email: parsed.data.display_email || null,
      display_phone: parsed.data.display_phone || null,
    })
    .eq("id", resident.id);

  if (prefsError || residentError) {
    console.error("updateVisibilityPrefs failed", prefsError, residentError);
    return { ok: false, error: "Something went wrong saving your settings." };
  }

  revalidatePath("/portal/account");
  revalidatePath("/portal/directory");
  return { ok: true };
}
