-- ─────────────────────────────────────────────────────────────────────────
-- Bukwin AI — Supabase security hardening
--
-- Run this manually in the Supabase SQL editor (or via `supabase db push` /
-- `psql`) against project wnfigcryauvwvcisjdve. It does not touch table
-- data or RLS policies on the base tables — those are already correctly
-- locked down (RLS enabled, no policies, so PostgREST/anon has zero direct
-- access). This migration only fixes two issues flagged by the Supabase
-- security advisor:
--
--   1. `upcoming_appointments` and `daily_booking_summary` were created as
--      SECURITY DEFINER views. Postgres views default to SECURITY DEFINER
--      behavior (they run with the privileges of the view owner), which
--      means they silently bypass RLS on the underlying `Appointment`
--      table. Since Supabase auto-exposes public-schema views over its
--      REST API, `upcoming_appointments` — which returns customer name,
--      email, phone, and appointment details — was reachable by ANY
--      caller with the project's public anon key, regardless of RLS.
--      Recreating them as SECURITY INVOKER makes them run with the
--      *querying* role's privileges, so they inherit the same RLS
--      restrictions as querying the table directly (i.e. effectively
--      inaccessible to anon/authenticated, same as the base table today).
--
--   2. `update_updated_at_column()` had a mutable search_path, which is a
--      standard hardening item for SECURITY DEFINER-style trigger
--      functions (prevents search_path hijacking via schema tricks).
-- ─────────────────────────────────────────────────────────────────────────

begin;

-- 1a. upcoming_appointments — recreate as SECURITY INVOKER
drop view if exists public.upcoming_appointments;

create view public.upcoming_appointments
with (security_invoker = true) as
select
  id,
  "customerName",
  "customerEmail",
  "customerPhone",
  service,
  "startTime",
  "endTime",
  timezone,
  status,
  notes,
  "calendarEventId",
  "createdAt"
from "Appointment"
where status = any (array['PENDING', 'CONFIRMED'])
  and "startTime" >= now()
order by "startTime";

-- 1b. daily_booking_summary — recreate as SECURITY INVOKER
drop view if exists public.daily_booking_summary;

create view public.daily_booking_summary
with (security_invoker = true) as
select
  date((("startTime" at time zone 'UTC') at time zone 'Asia/Karachi')) as booking_date,
  count(*) filter (where status = 'CONFIRMED') as confirmed_count,
  count(*) filter (where status = 'CANCELLED') as cancelled_count,
  count(*) filter (where status = 'PENDING') as pending_count,
  count(*) as total_count
from "Appointment"
group by date((("startTime" at time zone 'UTC') at time zone 'Asia/Karachi'))
order by date((("startTime" at time zone 'UTC') at time zone 'Asia/Karachi')) desc;

-- Views are auto-exposed by PostgREST; explicitly restrict them to the
-- service_role (which Prisma / your server-side code uses) so anon and
-- authenticated callers can't hit them even indirectly.
revoke all on public.upcoming_appointments from anon, authenticated;
revoke all on public.daily_booking_summary from anon, authenticated;
grant select on public.upcoming_appointments to service_role;
grant select on public.daily_booking_summary to service_role;

-- 2. Pin the search_path on the updated_at trigger function.
alter function public.update_updated_at_column() set search_path = public;

commit;
