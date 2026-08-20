import type { Metadata } from "next";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import FlockRequestForm from "@/components/forms/FlockRequestForm";

export const metadata: Metadata = { title: "Flock Footage Request" };

export default function FlockRequestPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Flock Footage Request"
        description="Ask the MPE Security Taskforce to review footage from the neighborhood's Flock Safety cameras."
      />
      <Section maxWidth="sm">
        <Stack spacing={3}>
          <Alert severity="info">
            This form notifies the Security Taskforce, who review footage directly in Flock&apos;s
            dashboard — MPE does not have public access to camera footage. Expect a response by
            email within about 24–48 hours, depending on severity.
          </Alert>
          <FlockRequestForm />
        </Stack>
      </Section>
    </>
  );
}
