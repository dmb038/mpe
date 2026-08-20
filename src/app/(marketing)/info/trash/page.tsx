import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";

export const metadata: Metadata = { title: "Trash & Recycling" };

const recyclingAccepted = [
  "Newspapers, magazines, catalogs, junk mail",
  "Paperback books, phone books, brown bags",
  "Food & detergent boxes, egg cartons, cardboard",
  "Glass containers (all colors)",
  "Plastics #1–7, rinsed with caps off",
  "Aluminum cans, flattened steel/tin cans, aerosol cans",
];

const recyclingRejected = [
  "Plastic bags",
  "Loose broken glass",
  "Shredded paper",
  "Metal hangers",
  "Styrofoam",
  "Wires/cables, clothes, light bulbs",
];

export default function TrashPage() {
  return (
    <>
      <PageHero eyebrow="Info" title="Trash & Recycling" />
      <Section maxWidth="md">
        <Alert severity="warning" sx={{ mb: 4 }}>
          The neighborhood association&apos;s records list conflicting weekly pickup days
          (Friday for household trash vs. Tuesday for recycling). This page will be updated
          once the board confirms the current schedule — check the City of Dallas Sanitation
          lookup tool or call 311 if you need this week&apos;s exact day.
        </Alert>

        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h5">Garbage pickup</Typography>
            <Typography variant="body1" color="text.secondary">
              City-provided rollcarts, household garbage only — no yard waste, liquids, hot
              ashes, leaves, brush, or bulky items. Place carts with the handle toward the
              house, with 3 feet of clearance on each side and 1 foot in back.
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h5">Bulk trash</Typography>
            <Typography variant="body1" color="text.secondary">
              Curbside pickup during the week of the 4th Monday each month (District 4).
              Place items by 7am on the Thursday before the first collection day. The city
              generally will not take construction debris, rocks, bricks, concrete, or dirt.
              Placing items early risks a $200 fine. For emergency tree removal, call
              214-670-8613. The Dallas City Dump is at 7677 Fair Oaks Avenue.
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h5">Holidays observed</Typography>
            <Typography variant="body1" color="text.secondary">
              July 4th, Thanksgiving, Christmas, and New Year&apos;s Day (when falling on a
              Thursday or Monday).
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h5">Recycling</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Collection is provided weekly, on your regular garbage collection day.
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Accepted
                </Typography>
                <List dense>
                  {recyclingAccepted.map((item) => (
                    <ListItem key={item} disableGutters>
                      <ListItemText primary={item} slotProps={{ primary: { color: "text.secondary" } }} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Not accepted
                </Typography>
                <List dense>
                  {recyclingRejected.map((item) => (
                    <ListItem key={item} disableGutters>
                      <ListItemText primary={item} slotProps={{ primary: { color: "text.secondary" } }} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h5">Missed collection</Typography>
            <Typography variant="body1" color="text.secondary">
              Call 311 by 6pm on your collection day. Recyclables get an orange rejection
              sticker for items like rubber bands, plastic wrap, hardback books, pizza boxes,
              waxed cardboard, window glass, ceramics, mirrors, Pyrex, fiberglass, aluminum
              foil, pie plates, metal parts, or plastic toys.
            </Typography>
          </Stack>
        </Stack>
      </Section>
    </>
  );
}
