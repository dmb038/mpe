import type { Metadata } from "next";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";

export const metadata: Metadata = { title: "Location" };

const highlights = [
  "Bounded by Abrams Road, Skillman Street, and Walnut Hill Lane in northeast Dallas.",
  "Zoned to Richardson ISD: Merriman Park Elementary, Forest Meadow Junior High, and Lake Highlands High School.",
  "On the edge of a greenbelt parkway, home to the neighborhood's own R.P. Brooks Park.",
  "The greenbelt connects to the White Rock Hike & Bike Trail and White Rock Lake.",
  "Fair Oaks Tennis Center is about a five-minute walk via Merriman Parkway and the trail.",
];

export default function LocationPage() {
  return (
    <>
      <PageHero
        eyebrow="About MPE"
        title="Location"
        description={'Merriman Park Estates ("MPE") is a twelve-street neighborhood in Northeast Dallas, in the greater area known as Lake Highlands.'}
      />
      <Section>
        <Grid container spacing={6} sx={{ alignItems: "flex-start" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <List>
              {highlights.map((item) => (
                <ListItem key={item} disableGutters alignItems="flex-start">
                  <ListItemIcon sx={{ minWidth: 28, mt: 1 }}>
                    <FiberManualRecordIcon sx={{ fontSize: 8, color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary={item} slotProps={{ primary: { variant: "body1", color: "text.secondary" } }} />
                </ListItem>
              ))}
            </List>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Learn more about the trail and lake at{" "}
              <Typography
                component="a"
                href="http://www.whiterocklake.org/"
                target="_blank"
                rel="noreferrer"
                variant="body2"
                sx={{ color: "primary.main" }}
              >
                whiterocklake.org
              </Typography>
              .
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative", width: "100%", aspectRatio: "4 / 3", borderRadius: 4, overflow: "hidden", boxShadow: 2 }}>
              <Image src="/images/location-map.jpg" alt="Map of Merriman Park Estates" fill style={{ objectFit: "cover" }} />
            </Box>
          </Grid>
        </Grid>
      </Section>
    </>
  );
}
