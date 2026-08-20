import { redirect } from "next/navigation";
import { getCurrentResident } from "@/lib/supabase/getCurrentResident";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const resident = await getCurrentResident();
  if (!resident || (resident.role !== "board" && resident.role !== "admin")) {
    redirect("/portal");
  }
  return <>{children}</>;
}
