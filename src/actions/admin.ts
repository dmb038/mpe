"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentResident } from "@/lib/supabase/getCurrentResident";
import { parseResidentCsv } from "@/lib/csv/residentImport";
import type { Database, ResidentRole, FlockRequestStatus } from "@/types/database.types";
import type { ActionResult } from "./contact";

/** Every admin action re-checks role server-side — the UI being hidden for
 * non-admins isn't a security boundary on its own. */
async function requireBoardOrAdmin() {
  const resident = await getCurrentResident();
  if (!resident || (resident.role !== "board" && resident.role !== "admin")) {
    throw new Error("Not authorized");
  }
  return resident;
}

export type CsvImportSummary = Database["public"]["Tables"]["csv_imports"]["Row"];

export async function importResidentsCsv(
  formData: FormData
): Promise<{ ok: true; summary: CsvImportSummary; parseErrors: string[] } | { ok: false; error: string }> {
  let admin_resident;
  try {
    admin_resident = await requireBoardOrAdmin();
  } catch {
    return { ok: false, error: "Not authorized" };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "No file uploaded" };
  }

  const text = await file.text();
  const { rows, errors: parseErrors } = parseResidentCsv(text);
  if (rows.length === 0) {
    return { ok: false, error: parseErrors[0] ?? "No valid rows found in that file." };
  }

  const admin = createAdminClient();
  const { data, error } = await admin.rpc("import_residents", {
    p_rows: rows,
    p_imported_by: admin_resident.id,
    p_filename: file.name,
  });

  if (error || !data) {
    console.error("importResidentsCsv rpc failed", error);
    return { ok: false, error: "Import failed. No changes were made." };
  }

  revalidatePath("/portal/admin/residents");
  return { ok: true, summary: data, parseErrors };
}

export async function updateResidentRole(residentId: string, role: ResidentRole): Promise<ActionResult> {
  try {
    await requireBoardOrAdmin();
  } catch {
    return { ok: false, error: "Not authorized" };
  }

  const admin = createAdminClient();
  const { error } = await admin.from("residents").update({ role }).eq("id", residentId);
  if (error) return { ok: false, error: "Couldn't update that resident's role." };

  revalidatePath("/portal/admin/residents");
  return { ok: true };
}

export async function updateResidentStatusAction(
  residentId: string,
  status: "active" | "disabled"
): Promise<ActionResult> {
  try {
    await requireBoardOrAdmin();
  } catch {
    return { ok: false, error: "Not authorized" };
  }

  const admin = createAdminClient();
  const { error } = await admin.from("residents").update({ status }).eq("id", residentId);
  if (error) return { ok: false, error: "Couldn't update that resident." };

  revalidatePath("/portal/admin/residents");
  return { ok: true };
}

export async function updateFlockRequestStatus(
  requestId: string,
  status: FlockRequestStatus,
  adminNotes: string
): Promise<ActionResult> {
  const resident = await getCurrentResident();
  if (!resident || (resident.role !== "board" && resident.role !== "admin")) {
    return { ok: false, error: "Not authorized" };
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("flock_requests")
    .update({
      status,
      admin_notes: adminNotes || null,
      reviewed_by: resident.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", requestId);

  if (error) return { ok: false, error: "Couldn't update that request." };

  revalidatePath("/portal/admin/flock-requests");
  return { ok: true };
}
