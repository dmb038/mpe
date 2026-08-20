export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string | null;
  allDay: boolean;
  location: string | null;
  description: string | null;
  htmlLink: string | null;
};

type GoogleCalendarEventsResponse = {
  items?: {
    id: string;
    summary?: string;
    location?: string;
    description?: string;
    htmlLink?: string;
    start?: { date?: string; dateTime?: string };
    end?: { date?: string; dateTime?: string };
  }[];
};

/**
 * Fetches upcoming events from a public, HOA-owned Google Calendar using a
 * simple API key (no OAuth). Revalidated every 15 minutes via Next.js fetch
 * caching rather than polled client-side.
 *
 * Requires GOOGLE_CALENDAR_API_KEY and GOOGLE_CALENDAR_ID to be configured;
 * returns an empty, non-throwing result if they're missing so the page can
 * render a friendly "not configured yet" state instead of crashing.
 */
export async function getUpcomingEvents(): Promise<{
  events: CalendarEvent[];
  configured: boolean;
  error: string | null;
}> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!apiKey || !calendarId) {
    return { events: [], configured: false, error: null };
  }

  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
  );
  url.searchParams.set("key", apiKey);
  url.searchParams.set("timeMin", new Date().toISOString());
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", "50");

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 900 } });
    if (!res.ok) {
      return { events: [], configured: true, error: `Google Calendar API returned ${res.status}` };
    }
    const data = (await res.json()) as GoogleCalendarEventsResponse;

    const events: CalendarEvent[] = (data.items ?? []).map((item) => {
      const allDay = !!item.start?.date;
      return {
        id: item.id,
        title: item.summary ?? "(Untitled event)",
        start: item.start?.dateTime ?? item.start?.date ?? "",
        end: item.end?.dateTime ?? item.end?.date ?? null,
        allDay,
        location: item.location ?? null,
        description: item.description ?? null,
        htmlLink: item.htmlLink ?? null,
      };
    });

    return { events, configured: true, error: null };
  } catch (err) {
    console.error("getUpcomingEvents failed", err);
    return { events: [], configured: true, error: "Couldn't reach Google Calendar" };
  }
}
