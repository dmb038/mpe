import type { Metadata } from "next";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import { ButtonLink, TextLink } from "@/components/ui/LinkComponents";

export const metadata: Metadata = { title: "Security" };

export default function SecurityPage() {
  return (
    <>
      <PageHero eyebrow="Info" title="Security" />
      <Section>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={4}>
              <Stack spacing={1.5}>
                <Typography variant="h5">Neighborhood camera surveillance (Flock Safety)</Typography>
                <Typography variant="body1" color="text.secondary">
                  MPE partnered with Flock Safety in 2019 for round-the-clock surveillance.
                  Nine cameras cover key neighborhood access points, capturing license
                  plates, vehicle color, type, and other details. Flock Safety is the only
                  security camera system built specifically to help solve and prevent
                  neighborhood crime.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Footage is stored securely in the cloud and is accessible to the MPE
                  Security Taskforce and the Dallas Police Department. Residents can request
                  a review of footage — turnaround is typically about 24–48 hours, depending
                  on severity.
                </Typography>
                <Box>
                  <ButtonLink
                    href="/flock-request"
                    variant="contained"
                    startIcon={<VideocamOutlinedIcon />}
                    sx={{ mt: 1 }}
                  >
                    Request Flock Footage Review
                  </ButtonLink>
                </Box>
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="h5">Volunteers In Patrol (VIP)</Typography>
                <Typography variant="body1" color="text.secondary">
                  VIP volunteers are extra eyes and ears for the police department — they are
                  not armed and are non-confrontational. Patrols cover every street and
                  alley in marked &ldquo;CRIME PATROL&rdquo; vehicles, checking for open
                  garage doors and calling 911 for anything suspicious. Shifts run all day
                  until midnight in staggered two-hour blocks.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  New volunteers complete a two-hour training plus a ride-along with a
                  veteran patroller. Most volunteers patrol about four hours a month. The
                  group meets bi-monthly on the third Monday at 7:00 PM.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card variant="outlined">
              <Box sx={{ position: "relative", width: "100%", aspectRatio: "3 / 4" }}>
                <Image
                  src="/images/flock-camera-map.png"
                  alt="Map of Flock Safety camera locations in MPE"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Approximate camera locations at neighborhood entry points. Contact the{" "}
                  <TextLink href="/contacts/security-taskforce" variant="body2" sx={{ color: "primary.main" }}>
                    Security Taskforce
                  </TextLink>{" "}
                  for the current map.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Section>
    </>
  );
}
