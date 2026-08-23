# Applying this migration

**Project:** `wnfigcryauvwvcisjdve` (bukwinai-beep's Project)

## Option A — Supabase SQL editor (simplest)
1. Open the Supabase dashboard → your project → SQL Editor.
2. Paste the contents of `0001_fix_supabase_security.sql`.
3. Run it.

## Option B — Supabase CLI
```bash
supabase link --project-ref wnfigcryauvwvcisjdve
supabase db push
```

## What this does
Fixes the two `ERROR`-level security advisor findings:
- `upcoming_appointments` and `daily_booking_summary` were `SECURITY DEFINER`
  views, which bypass Row Level Security and were reachable through
  Supabase's auto-generated REST API by anyone with the project's anon key
  — leaking customer name/email/phone. They're recreated as
  `SECURITY INVOKER` and locked to `service_role` only.
- Pins `search_path` on the `update_updated_at_column()` trigger function.

## Not touched (review yourself)
- `rls_auto_enable()` is also a `SECURITY DEFINER` function callable by
  `anon`/`authenticated`. I didn't touch it because I don't know whether
  something in your setup depends on it being publicly callable — if not,
  run:
  ```sql
  revoke execute on function public.rls_auto_enable() from anon, authenticated;
  ```
- Base tables (`Appointment`, `Lead`, etc.) already have RLS enabled with
  no policies, which is correct for a server-only (Prisma) access pattern
  — no changes needed there.

## After running this
Set `DATABASE_URL` in your `.env` (and Vercel) to your Supabase **pooled**
Postgres connection string (Project Settings → Database → Connection
string → Transaction pooler), then run:
```bash
npx prisma generate
```
The `Appointment` model now in `prisma/schema.prisma` matches this
database's existing table exactly, so no `prisma db push` / migration is
needed on the Prisma side — this only fixes the two views + function.
