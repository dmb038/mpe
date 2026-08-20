import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Section from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/LinkComponents";
import { createAdminClient } from "@/lib/supabase/admin";
import ResidentsAdminTable from "@/components/content/ResidentsAdminTable";

export const metadata: Metadata = { title: "Residents" };
export const dynamic = "force-dynamic";

export default async function AdminResidentsPage() {
  const admin = createAdminClient();
  const { data: residents } = await admin.from("residents").select("*").order("full_name");

  return (
    <Section>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Residents</Typography>
        <ButtonLink href="/portal/admin/residents/import" variant="contained">
          Import CSV
        </ButtonLink>
      </Stack>
      <ResidentsAdminTable residents={residents ?? []} />
    </Section>
  );
}
