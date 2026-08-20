import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Section from "@/components/layout/Section";
import DirectorySearch from "@/components/content/DirectorySearch";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Resident Directory" };
export const dynamic = "force-dynamic";

export default async function DirectoryPage() {
  const supabase = await createClient();
  const { data: residents, error } = await supabase
    .from("directory_view")
    .select("*")
    .order("full_name");

  return (
    <Section>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Resident Directory
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Residents choose what contact info is visible here — visit Account Settings to control
        your own listing.
      </Typography>
      {error && <Alert severity="error">Couldn&apos;t load the directory right now.</Alert>}
      <DirectorySearch residents={residents ?? []} />
    </Section>
  );
}
