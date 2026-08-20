import { google } from "googleapis";

// SERVER-SIDE ONLY. Never import this file from a "use client" component.
// GOOGLE_SERVICE_ACCOUNT_KEY holds the full service-account JSON, either as
// a raw JSON string or base64-encoded (either works — we auto-detect).

let cachedAuth: InstanceType<typeof google.auth.JWT> | null = null;

function loadServiceAccountCredentials(): {
  client_email: string;
  private_key: string;
} {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_KEY is not set. See docs/BOOKING-SETUP.md."
    );
  }

  let jsonString = raw;
  // If it doesn't look like JSON, assume it's base64-encoded.
  if (!raw.trim().startsWith("{")) {
    jsonString = Buffer.from(raw, "base64").toString("utf-8");
  }

  const parsed = JSON.parse(jsonString);
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_KEY is missing client_email or private_key."
    );
  }
  return parsed;
}

function getAuth() {
  if (cachedAuth) return cachedAuth;
  const creds = loadServiceAccountCredentials();
  cachedAuth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return cachedAuth;
}

function getCalendarId(): string {
  const id = process.env.GOOGLE_CALENDAR_ID;
  if (!id) {
    throw new Error("GOOGLE_CALENDAR_ID is not set. See docs/BOOKING-SETUP.md.");
  }
  return id;
}

function getCalendarClient() {
  return google.calendar({ version: "v3", auth: getAuth() });
}

export type BusyPeriod = { start: string; end: string };

/**
 * Returns busy periods (as UTC ISO strings) for the configured calendar
 * between timeMinISO and timeMaxISO (both UTC ISO strings).
 */
export async function getBusyPeriods(
  timeMinISO: string,
  timeMaxISO: string
): Promise<BusyPeriod[]> {
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      items: [{ id: calendarId }],
    },
  });

  const busy = res.data.calendars?.[calendarId]?.busy ?? [];
  return busy
    .filter((b) => b.start && b.end)
    .map((b) => ({ start: b.start as string, end: b.end as string }));
}

/**
 * Returns true if the [startISO, endISO) window has no overlap with any
 * busy period on the calendar. Both must be UTC ISO strings.
 */
export async function isSlotFree(
  startISO: string,
  endISO: string
): Promise<boolean> {
  const busy = await getBusyPeriods(startISO, endISO);
  const start = new Date(startISO).getTime();
  const end = new Date(endISO).getTime();

  return !busy.some((period) => {
    const busyStart = new Date(period.start).getTime();
    const busyEnd = new Date(period.end).getTime();
    return start < busyEnd && end > busyStart; // overlap test
  });
}

export type CreateEventInput = {
  summary: string;
  description?: string;
  startISO: string; // UTC ISO instant
  endISO: string; // UTC ISO instant
  timeZone: string; // IANA timezone for display purposes on the event
  attendeeEmail?: string;
  attendeeName?: string;
};

export type CreatedEvent = {
  id: string;
  htmlLink: string | null;
};

export async function createCalendarEvent(
  input: CreateEventInput
): Promise<CreatedEvent> {
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();

  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: input.summary,
      description: input.description,
      start: { dateTime: input.startISO, timeZone: input.timeZone },
      end: { dateTime: input.endISO, timeZone: input.timeZone },
      attendees: input.attendeeEmail
        ? [{ email: input.attendeeEmail, displayName: input.attendeeName }]
        : undefined,
    },
    sendUpdates: input.attendeeEmail ? "all" : "none",
  });

  if (!res.data.id) {
    throw new Error("Google Calendar did not return an event ID.");
  }

  return { id: res.data.id, htmlLink: res.data.htmlLink ?? null };
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();
  await calendar.events.delete({ calendarId, eventId, sendUpdates: "all" });
}
