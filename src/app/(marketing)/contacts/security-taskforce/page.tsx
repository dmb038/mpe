import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import ContactGrid from "@/components/content/ContactCard";
import { ButtonLink } from "@/components/ui/LinkComponents";

export const metadata: Metadata = { title: "Security Taskforce" };

const members = [
  { name: "Ric Moseley", role: "Security Taskforce" },
  { name: "Travis Dunbar", role: "Security Taskforce / VIP" },
];

export default function SecurityTaskforcePage() {
  return (
    <>
      <PageHero
        eyebrow="Contacts"
        title="Security Taskforce"
        description="The Security Taskforce manages the neighborhood's Flock Safety camera program."
      />
      <Section>
        <Stack spacing={4}>
          <ContactGrid contacts={members} />
          <Card variant="outlined" sx={{ maxWidth: 480 }}>
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <EmailOutlinedIcon color="primary" />
                  <Typography
                    component="a"
                    href="mailto:merrimanparkestates@gmail.com"
                    variant="body1"
                  >
                    merrimanparkestates@gmail.com
                  </Typography>
                </Stack>
                <ButtonLink
                  href="/flock-request"
                  variant="contained"
                  startIcon={<VideocamOutlinedIcon />}
                >
                  Request Flock Footage Review
                </ButtonLink>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Section>
    </>
  );
}
