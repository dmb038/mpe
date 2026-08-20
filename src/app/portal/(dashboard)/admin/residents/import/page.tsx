import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Section from "@/components/layout/Section";
import CsvImportForm from "@/components/forms/CsvImportForm";

export const metadata: Metadata = { title: "Import Resident CSV" };
export const dynamic = "force-dynamic";

export default function ImportResidentsPage() {
  return (
    <Section maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 1 }}>
        Import Resident CSV
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Expected columns: <code>full_name, address_line1, address_line2, city, state, zip,
        email, mobile</code>. Rows are matched to existing residents by address — nothing is
        ever deleted, and an already-claimed resident&apos;s verification email/mobile are
        never silently overwritten.
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Download the{" "}
        <a href="/residents-template.csv" download>
          CSV template
        </a>{" "}
        if you need the exact column headers.
      </Alert>
      <CsvImportForm />
    </Section>
  );
}
