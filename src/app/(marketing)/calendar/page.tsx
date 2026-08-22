import type { Metadata } from "next";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import EmbeddedCalendar from "@/components/calendar/EmbeddedCalendar";
import { getUpcomingEvents, type CalendarEvent } from "@/lib/calendar/googleCalendar";

export const metadata: Metadata = { title: "Calendar" };

function formatEventTime(event: CalendarEvent) {
  const start = new Date(event.start);
  if (event.allDay) {
    return start.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  }
  const datePart = start.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const timePart = start.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  return `${datePart} · ${timePart}`;
}

function groupByMonth(events: CalendarEvent[]) {
  const groups = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const key = new Date(event.start).toLocaleDateString(undefined, { month: "long", year: "numeric" });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(event);
  }
  return groups;
}

export default async function CalendarPage() {
  const { events, configured, error } = await getUpcomingEvents();
  const grouped = groupByMonth(events);

  return (
    <>
      <PageHero
        eyebrow="Stay in the loop"
        title="Calendar"
        description="Association meetings, club events, and school holidays."
      />
      <Section>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <EmbeddedCalendar />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            {!configured && (
              <Alert severity="info">
                The neighborhood calendar isn&apos;t connected yet. Once the board sets up
                <code> GOOGLE_CALENDAR_API_KEY</code> and <code>GOOGLE_CALENDAR_ID</code>, events
                from the MPE Google Calendar will appear here automatically.
              </Alert>
            )}
            {configured && error && <Alert severity="warning">{error} — check back soon.</Alert>}
            {configured && !error && events.length === 0 && (
              <Alert severity="info">No upcoming events on the calendar right now — check back soon.</Alert>
            )}

            {events.length > 0 && (
              <Stack spacing={5}>
                {Array.from(grouped.entries()).map(([month, monthEvents]) => (
                  <Stack key={month} spacing={2}>
                    <Typography variant="h5">{month}</Typography>
                    <Stack spacing={1.5} divider={<Divider />}>
                      {monthEvents.map((event) => (
                        <Card key={event.id} variant="outlined">
                          <CardContent>
                            <Stack direction="row" sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
                              <Typography variant="subtitle1">{event.title}</Typography>
                              <Chip size="small" label={formatEventTime(event)} />
                            </Stack>
                            {event.location && (
                              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mt: 1 }}>
                                <PlaceOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                                <Typography variant="body2" color="text.secondary">
                                  {event.location}
                                </Typography>
                              </Stack>
                            )}
                            {event.description && (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {event.description}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Section>
    </>
  );
}
