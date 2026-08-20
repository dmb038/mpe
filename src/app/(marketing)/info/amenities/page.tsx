import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";

export const metadata: Metadata = { title: "Amenities" };

const categories: { title: string; items: string[] }[] = [
  {
    title: "Entertainment",
    items: [
      "Top Golf",
      "Alamo Draft House",
      "Dallas Children's Theater",
      "One Nostalgia Place (ONP)",
      "Vector Brewery",
      "Underdog",
      "Water's Edge Winery",
    ],
  },
  {
    title: "Hospitals",
    items: [
      "Presbyterian Hospital of Dallas",
      "Preston Hollow ER",
      "Dallas Family Medicine",
      "Abrams Royal Animal Clinic",
    ],
  },
  {
    title: "Health & Recreation",
    items: [
      "Lake Highlands YMCA",
      "Fair Oaks Tennis Center",
      "LH North Rec Center",
      "Moss Soccer Park",
      "Moss Bike Park",
      "LA Fitness",
      "Hot Worx",
      "Crossfit Lake Highlands",
      "9Round Fitness",
      "Club Pilates",
    ],
  },
  {
    title: "Chain Stores",
    items: ["Home Depot", "Super Target", "Tom Thumb", "Sprouts", "Academy", "Marshalls", "Walmart", "Sam's Club", "At Home"],
  },
  {
    title: "Shopping",
    items: [
      "NorthPark Center",
      "Old Town Shopping Center",
      "Town Creek Shopping Center",
      "Lakeridge Village",
      "Creekside",
      "Lake Highlands Town Center",
    ],
  },
  {
    title: "Restaurants",
    items: [
      "Jake's Hamburgers",
      "Shady's",
      "Mi Cocina",
      "Taco Diner",
      "Mariano's",
      "Jersey Mike's",
      "Subway",
      "McAlister's Deli",
      "Whataburger",
      "Chick-fil-A",
      "Fish City Grill",
      "Cedar and Vine",
      "Kickn' Crab",
    ],
  },
  {
    title: "Parks",
    items: ["R.P. Brooks Park", "White Rock Lake", "White Rock Dog Park", "Dallas Arboretum", "Flag Poll Hill"],
  },
  {
    title: "Treats",
    items: ["Starbucks", "Andy's", "Yogurtland", "Dairy Queen", "Smoothie King", "Crumbl Cookies", "Great American Cookies"],
  },
];

export default function AmenitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Info"
        title="Amenities"
        description="MPE has a wealth of amenities nearby — specialty stores, restaurants, shopping, entertainment, recreation centers, and health clubs."
      />
      <Section>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid size={{ xs: 12, sm: 6 }} key={category.title}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>
                    {category.title}
                  </Typography>
                  <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                    {category.items.map((item) => (
                      <Chip key={item} label={item} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
    </>
  );
}
