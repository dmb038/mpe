import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import DataTable from "@/components/content/DataTable";

export const metadata: Metadata = { title: "Preschools" };

const preschools = [
  ["Ridgewood Park Preschool", "6445 E. Lovers Lane, Dallas, TX 75214", "214-369-9250"],
  ["Zion Lutheran School", "6121 East Lovers Lane, Dallas, TX 75214", "214-363-1630"],
  ["Scofield Christian School", "7730 Abrams Road, Dallas, TX 75231", "214-349-6843"],
  ["Northpark Presbyterian Day School", "9555 N. Central Expressway, Dallas, TX 75231", "214-361-8024"],
];

const parentsDayOut = [
  ["Lake Highlands United Methodist (CCDC)", "9015 Plano Road, Dallas, TX 75238", "214-348-6600"],
  ["Wilshire Baptist", "4316 Abrams Rd., Dallas, TX 75214", "214-824-4531"],
  ["Lake Highlands Baptist Church", "642 Brookhurst, Dallas, TX 75218", "214-327-7393"],
  ["Ridgewood Park Mom's Day Out", "6445 E. Lovers Lane, Dallas, TX 75214", "214-369-9259"],
];

export default function PreschoolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Info"
        title="Preschools"
        description="Preschools in the area that MPE children have attended or are attending."
      />
      <Section>
        <Stack spacing={5}>
          <Stack spacing={2}>
            <Typography variant="h5">Preschools</Typography>
            <DataTable columns={["Name", "Address", "Phone"]} rows={preschools} />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5">Parent&apos;s Day Out</Typography>
            <DataTable columns={["Name", "Address", "Phone"]} rows={parentsDayOut} />
          </Stack>
        </Stack>
      </Section>
    </>
  );
}
