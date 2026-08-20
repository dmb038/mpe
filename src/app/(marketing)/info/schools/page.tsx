import type { Metadata } from "next";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";

export const metadata: Metadata = { title: "Schools" };

const schools = [
  { name: "Merriman Park Elementary", image: "/images/merriman-park-elementary.jpg" },
  { name: "Forest Meadow Junior High", image: "/images/forest-meadow-junior-high.jpg" },
];

export default function SchoolsPage() {
  return (
    <>
      <PageHero eyebrow="Info" title="Schools" />
      <Section>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 720, fontSize: "1.05rem" }}>
          While MPE is located within Dallas city limits, our neighborhood is part of the
          Richardson Independent School District (RISD). RISD has received a
          &ldquo;recognized&rdquo; rating from the Texas Education Agency for the fifth
          consecutive year in a row.
        </Typography>
        <Grid container spacing={3}>
          {schools.map((school) => (
            <Grid size={{ xs: 12, sm: 6 }} key={school.name}>
              <Card>
                <Box sx={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
                  <CardMedia component="div" sx={{ position: "relative", width: "100%", height: "100%" }}>
                    <Image src={school.image} alt={school.name} fill style={{ objectFit: "cover" }} />
                  </CardMedia>
                </Box>
                <CardContent>
                  <Typography variant="h6">{school.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
          High-school-age students attend Lake Highlands High School.
        </Typography>
      </Section>
    </>
  );
}
