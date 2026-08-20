import type { Metadata } from "next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import { footerLinks } from "@/lib/nav";

export const metadata: Metadata = { title: "Dues" };

const benefits = [
  "Neighborhood security cameras (the Flock system) — the Association's largest annual expense",
  "A voice in the neighborhood — voting requires paid membership",
  "MPE Club events: Neighbors Night Out, Popsicles in the Park, Merrifest, and more",
  "Neighborhood improvements — R.P. Brooks Park maintenance, marker landscaping, street sign toppers",
  "The Estater newsletter",
  "Printed and online resident directory access",
  "Access to the private Facebook group",
];

export default function DuesPage() {
  return (
    <>
      <PageHero
        eyebrow="Info"
        title="Dues"
        description="Membership in the MPE Neighborhood Association is entirely voluntary — open to any resident or homeowner who wants to join."
      />
      <Section>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              2026 dues are $125
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
              What do membership dues provide?
            </Typography>
            <List>
              {benefits.map((benefit) => (
                <ListItem key={benefit} disableGutters alignItems="flex-start">
                  <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                    <CheckCircleOutlineIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} slotProps={{ primary: { color: "text.secondary" } }} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  How to pay
                </Typography>
                <Stack component="ol" spacing={1.5} sx={{ pl: 2.5, m: 0, mb: 3 }}>
                  <Typography component="li" variant="body2" color="text.secondary">
                    Click the button below
                  </Typography>
                  <Typography component="li" variant="body2" color="text.secondary">
                    Enter your name and email address
                  </Typography>
                  <Typography component="li" variant="body2" color="text.secondary">
                    Enter your card information securely
                  </Typography>
                  <Typography component="li" variant="body2" color="text.secondary">
                    Submit to complete your payment
                  </Typography>
                </Stack>
                <Button
                  component="a"
                  href="/pay-dues"
                  variant="contained"
                  fullWidth
                >
                  Pay dues now
                </Button>
                <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                  <Typography variant="body2" color="text.secondary">
                    Prefer to pay by check? Deliver it to our Treasurer, Evan Richter.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Section>
    </>
  );
}
