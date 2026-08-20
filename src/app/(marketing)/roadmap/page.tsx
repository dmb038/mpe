import type { Metadata } from "next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";

export const metadata: Metadata = { title: "Roadmap" };

const pillars = [
  {
    icon: PhoneIphoneOutlinedIcon,
    title: "One shared backend",
    body: "A future iOS and Android app would reuse this site's Supabase database and API layer directly, rather than standing up a separate backend — the same resident directory, Flock requests, and calendar data would power both experiences.",
  },
  {
    icon: LockOutlinedIcon,
    title: "Passkeys, natively",
    body: "Supabase Auth's passkey support maps cleanly onto iOS Face ID/Touch ID and Android biometric unlock, so residents could sign in on mobile the same way they do on the web — no separate password system to maintain.",
  },
  {
    icon: CloudSyncOutlinedIcon,
    title: "React Native + Expo",
    body: "Building the app in Expo would let it share the same @supabase/supabase-js data layer and Zod validation schemas as this website, minimizing duplicate work for the volunteer team maintaining both.",
  },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="What's next"
        title="Mobile App Roadmap"
        description="A native iOS and Android app is planned for a future release, built on top of the same resident portal backend introduced in this site."
      />
      <Section>
        <Grid container spacing={3}>
          {pillars.map((pillar) => (
            <Grid size={{ xs: 12, md: 4 }} key={pillar.title}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <pillar.icon sx={{ fontSize: 32, color: "primary.main", mb: 1.5 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {pillar.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pillar.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2} sx={{ mt: 5, maxWidth: 720 }}>
          <Typography variant="h5">Not built yet — by design</Typography>
          <Typography variant="body1" color="text.secondary">
            This release focuses on getting the website, resident portal, and directory right
            first. Once those are in daily use, a native app becomes a much smaller project:
            most of the hard work — authentication, the resident data model, and privacy
            controls — will already be done.
          </Typography>
        </Stack>
      </Section>
    </>
  );
}
