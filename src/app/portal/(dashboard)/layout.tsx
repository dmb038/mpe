import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import { getCurrentResident } from "@/lib/supabase/getCurrentResident";
import PortalNav from "@/components/layout/PortalNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const resident = await getCurrentResident();
  if (!resident) {
    redirect("/portal/login");
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <PortalNav isAdmin={resident.role === "board" || resident.role === "admin"} />
      <Box component="main">{children}</Box>
    </Box>
  );
}
