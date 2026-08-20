# Bukwin AI Booking Agent — Setup Guide

This document covers everything needed to turn the ChatKit widget already
in this codebase into a working AI receptionist that answers questions and
books real appointments on your Google Calendar.

## What was built

- `prisma/schema.prisma` — new `Appointment` model
- `src/lib/business-config.ts` — hours, timezone, services (edit this file directly)
- `src/lib/google-calendar.ts` — server-only Google Calendar client
- `src/lib/email.ts` — booking confirmation email (Resend)
- `src/app/api/appointments/availability/route.ts` — `GET` real open slots
- `src/app/api/appointments/route.ts` — `POST` create a booking, `GET` list upcoming
- `src/components/bukwin/chat/floating-chatkit.tsx` — now reads config from
  env vars only (placeholder credentials removed)

The existing `src/app/api/demo/chat/route.ts` (the marketing-page demo bot)
was left untouched — it's unrelated to this system.

---

## 1. Install the new dependencies

```bash
bun install
# or: npm install
```

New packages: `googleapis`, `date-fns-tz`, `resend`.

## 2. Apply the database change

```bash
bun run db:push
# or: npx prisma db push --accept-data-loss
```

This adds the `Appointment` table to `db/custom.db`.

## 3. Google Calendar setup (service account)

A service account is the right approach here — no user has to log in, no
OAuth refresh tokens to manage, and it works well for a single business
calendar.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and
   create (or reuse) a project.
2. **APIs & Services → Library** → enable **Google Calendar API**.
3. **APIs & Services → Credentials → Create Credentials → Service account**.
   Give it any name (e.g. `bukwin-booking-agent`).
4. Open the new service account → **Keys → Add Key → Create new key → JSON**.
   This downloads a `.json` file — treat it like a password.
5. Copy the `client_email` value from that JSON (looks like
   `bukwin-booking-agent@your-project.iam.gserviceaccount.com`).
6. Open **Google Calendar** in the browser, under the calendar you want the
   agent to book into: **Settings and sharing → Share with specific people**
   → paste the service account's email → give it **"Make changes to events"**
   permission.
7. Also on that settings page, copy the **Calendar ID** (under "Integrate
   calendar" — for your primary calendar it's your Gmail address; for a
   secondary calendar it looks like `xxxx@group.calendar.google.com`).

### Setting the env vars

- `GOOGLE_CALENDAR_ID` = the calendar ID from step 7.
- `GOOGLE_SERVICE_ACCOUNT_KEY` = the **entire contents** of the downloaded
  JSON file, either:
  - pasted as-is (it's valid JSON, most hosts handle multi-line env vars fine), or
  - base64-encoded if your host doesn't like multi-line values:
    ```bash
    base64 -i service-account.json | tr -d '\n'
    ```
    The app auto-detects either format.

**Never commit the JSON file to git. Never put it in a `NEXT_PUBLIC_*` variable.**

## 4. OpenAI Agent Builder setup

The ChatKit widget already in the layout renders whatever workflow you
publish in OpenAI's Agent Builder — this repo doesn't define the agent's
conversation logic itself, it defines the *tools* the agent calls.

1. In the OpenAI platform, create an **Agent Builder** workflow.
2. Give it instructions along these lines (adjust to your real business info):
   > You are Bukwin, a warm and professional AI receptionist. Answer
   > questions about services and pricing using only the information
   > provided to you. When a customer wants to book, collect their name,
   > email, phone (if needed), desired service, and preferred date. Call
   > `check_availability` to find real open times — never assume a time is
   > free. Once the customer picks a time, confirm the details out loud,
   > then call `book_appointment`. Never say an appointment is booked unless
   > `book_appointment` returns success. If it returns a conflict, apologize
   > and offer to check other times.
3. Add two **tools** (function calling / HTTP action) pointing at this
   deployed app:
   - `check_availability`
     - `GET https://yourdomain.com/api/appointments/availability?date={date}&service={service}`
     - params: `date` (YYYY-MM-DD), `service` (service id — see `business-config.ts`)
   - `book_appointment`
     - `POST https://yourdomain.com/api/appointments`
     - body: `{ customerName, customerEmail, customerPhone, service, start, notes }`
     - `start` must be one of the exact ISO timestamps returned by `check_availability`
4. Publish the workflow. OpenAI gives you a **ChatKit API URL** and
   **domain key** for the published deployment.
5. Set those as `NEXT_PUBLIC_CHATKIT_API_URL` and
   `NEXT_PUBLIC_CHATKIT_DOMAIN_KEY`.

(`cancel_appointment` / `reschedule_appointment` aren't built yet — the
`Appointment.status` field already supports `CANCELLED`, so adding a
`PATCH /api/appointments/[id]` route later is a small follow-up, not a
redesign.)

## 5. Email confirmations (optional)

1. Create a [Resend](https://resend.com) account, verify a sending domain.
2. Set `RESEND_API_KEY` and `BUSINESS_EMAIL_FROM` (e.g.
   `"Bukwin AI <bookings@yourdomain.com>"`).
3. If these are left unset, bookings still work — the app just skips the
   email and logs a warning. A failed email never un-books an appointment.

## 6. Business configuration

Edit `src/lib/business-config.ts` directly for anything that isn't
environment-specific:
- `SERVICES` — the list of bookable services and their durations
- or override hours/timezone/etc. via the env vars in `.env.example`

## 7. Full environment variable list

See `.env.example` in the repo root — copy it to `.env` and fill it in
locally, and set the same values in your hosting provider's dashboard for
production.

## 8. Testing the flow locally

```bash
bun run dev
```

1. **Availability:** `curl "http://localhost:3000/api/appointments/availability?date=2026-08-25&service=consultation"`
   — should return real open slots based on your calendar's current busy periods.
2. **Block a slot:** manually create an event on the business calendar
   during business hours, re-run the request above, confirm that slot is
   now missing from the results.
3. **Book:** `POST /api/appointments` with a valid `start` from step 1 —
   confirm the event appears on Google Calendar and the `Appointment` row
   exists (`bun run db:push` then inspect `db/custom.db`, or add a quick
   Prisma Studio session: `npx prisma studio`).
4. **Conflict:** immediately POST the same `start` again — should return
   `409` and must **not** create a duplicate calendar event.
5. **Chat end-to-end:** open the site, use the floating ChatKit bubble
   (only renders once the env vars are set), ask "what times are available
   tomorrow", then complete a booking through conversation.
6. **Regression:** confirm the marketing pages, the existing `/demo` page,
   and lead/newsletter forms still work unchanged.

## 9. Security checklist before going live

- [ ] `GOOGLE_SERVICE_ACCOUNT_KEY` is set only as a server env var, never `NEXT_PUBLIC_*`
- [ ] `.env` is not committed (already covered by `.gitignore`)
- [ ] `OPENAI_API_KEY` (if used server-side elsewhere) is never exposed to the client
- [ ] Booking endpoint re-checks availability immediately before writing (already implemented)
- [ ] Double-booking is rejected with a clear `409`, not a silent overwrite (already implemented)
