"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentResident } from "@/lib/supabase/getCurrentResident";
import type { ActionResult } from "./contact";

export async function deletePasskey(credentialRowId: string): Promise<ActionResult> {
  const resident = await getCurrentResident();
  if (!resident) {
    return { ok: false, error: "You must be signed in." };
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("webauthn_credentials")
    .delete()
    .eq("id", credentialRowId)
    .eq("resident_id", resident.id);

  if (error) {
    return { ok: false, error: "Couldn't remove that passkey." };
  }

  revalidatePath("/portal/account");
  return { ok: true };
}
