import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";

export const metadata: Metadata = { title: "History" };

const timeline = [
  { year: "1940", text: "Developer Hal McGraw acquires the Merriman family land." },
  {
    year: "Dec 1956",
    text: "McGraw opens Merriman Park on the south side; Andrew and Anna Freed become the first MPE residents.",
  },
  { year: "1957", text: "Merriman Park Estates (\"the Estates\") opens with larger lots. Louise and Frank Hicks host the first resident Christmas party." },
  { year: "March 1958", text: "MPE Club, Inc. is formed by twelve original families." },
  { year: "1960", text: "The first issue of The Estater newsletter is published. By September, all but ten lots are complete." },
  { year: "1967", text: "McGraw acquires the neighboring Murdoch farm." },
  { year: "Nov 1975", text: "Construction begins on Claybrook and Winedale streets. RISD purchases 9 acres at Greenville/Walnut Hill for a future Merriman Park Elementary." },
  { year: "March 1982", text: "Original resident R.B. Brooks passes away." },
  { year: "March 1986", text: "The Dallas Park Department names the park along Merriman Parkway in his honor." },
  { year: "Oct 1996", text: "Volunteers In Patrol (VIP) is organized with 35 volunteers." },
  { year: "Sept 1999", text: "Playground equipment is installed at R.B. Brooks Park." },
  { year: "March 2000", text: "Resident Ric Moseley creates and hosts the first MPE website." },
  { year: "April 2001", text: "Street sign toppers are installed throughout the neighborhood." },
  { year: "May 2006", text: "Forbes lists the 75231 zip code among the highest home-value-growth areas of 2003–2005." },
  { year: "Nov 2007", text: "Groundbreaking for the Lake Highlands Town Center." },
  { year: "Dec 2010", text: "The Lake Highlands DART station opens." },
  { year: "2013–2014", text: "Town Center phase one opens: a parking garage and the Haven Lake Highlands apartments." },
  { year: "Nov 2014", text: "NorthRock Lake Highlands apartments open." },
  { year: "Aug 2015", text: "Artistik Edge becomes the first Town Center retail tenant." },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="About MPE"
        title="Our History"
        description="From twelve founding families in 1958 to the neighborhood MPE is today."
      />
      <Section maxWidth="md">
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem" }}>
            Skillman Street was extended after World War II, opening farmland once owned by
            the Merriman and Murdoch families — split by present-day Colfax — to new
            development. What began as a single street of homes has grown, over nearly seven
            decades, into the twelve-street neighborhood residents call home today.
          </Typography>
        </Stack>

        <Stack divider={<Divider />} spacing={3}>
          {timeline.map((event) => (
            <Box key={event.year} sx={{ display: "flex", gap: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ minWidth: 110, fontWeight: 700, color: "primary.main", flexShrink: 0 }}
              >
                {event.year}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event.text}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Section>
    </>
  );
}
