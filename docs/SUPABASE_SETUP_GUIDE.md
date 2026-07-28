# Supabase Setup Guide

This guide takes the site from demo mode (forms log to console, `/admin` shows "not configured") to a
real, production Supabase connection. It assumes you're comfortable copying/pasting into a terminal and
a web dashboard — no prior Supabase experience required.

## What's already verified in the codebase (see `docs/FINAL_AUDIT_REPORT.md` and
`docs/SECURITY_REMEDIATION_REPORT.md` for full detail)

- **Migrations**: `supabase/schema.sql` is complete — 1 roles table (`profiles`) + 6 submission tables,
  each with `id`, a unique `reference_number`, `created_at`, and its form-specific columns (see
  `docs/FORM_TABLE.md` for the exact field-to-column mapping, cross-checked against
  `src/lib/validations/forms.ts`).
- **Indexes**: every table has a `created_at desc` index (supports the admin CMS's "most recent first"
  queries).
- **Constraints/timestamps**: `reference_number` is `unique not null` on every table (enforced at the
  database level, not just in application code); `created_at` defaults to `now()`.
- **Row Level Security**: enabled on every table. **No anon or authenticated INSERT/SELECT policy exists
  anywhere** — anonymous public users cannot read any form submission through the standard Supabase
  client, full stop. The only SELECT policies are `is_admin()`-gated (via a `SECURITY DEFINER` helper
  function checking the caller's `profiles.role`).
- **Form inserts happen only server-side**: all 6 API routes (`src/app/api/*/route.ts`) call
  `submitLead()` (`src/lib/db.ts`), which uses the **service-role** Supabase client
  (`createSupabaseServiceClient()` in `src/lib/supabase/server.ts`) — never the browser/anon client. The
  service-role key is read only from `process.env.SUPABASE_SERVICE_ROLE_KEY` inside that one server-only
  file; grep-verified not to appear in any `"use client"` component.
- **Administrator access is protected**: `/admin`, `/admin/[module]`, `/dashboard` all call
  `getCurrentProfile()`/`isAdminRole()` (`src/lib/auth.ts`) server-side before rendering any data.
- **Duplicate-submission protection**: `submitLead()` now rejects an identical payload to the same table
  submitted again within 2 minutes (see `src/lib/rate-limit.ts`'s `isDuplicateSubmission()`), independent
  of the existing per-IP rate limiter — this catches double-clicks and client retries without blocking a
  legitimately different follow-up enquiry.
- **Fail-safe persistence**: once Supabase IS configured, an insert failure throws and the API route
  returns a real error (never a false "success" for a submission that wasn't actually saved) — verified
  in `docs/SECURITY_REMEDIATION_REPORT.md`.

## Step-by-step setup

### 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (or create an account).
2. Click **New Project**. Choose an organization, a project name (e.g. `nepal-power-expo-2026`), a
   strong database password (save it somewhere safe — you won't need it day-to-day, but you will if you
   ever need direct Postgres access), and a region close to your users (e.g. Singapore for South Asia).
3. Wait for provisioning to finish (a couple of minutes).

### 2. Run the schema (migrations)

1. In the Supabase dashboard, open **SQL Editor** (left sidebar).
2. Click **New query**, paste the entire contents of `supabase/schema.sql` from this repository, and
   click **Run**.
3. Confirm success: open **Table Editor** (left sidebar) — you should see 7 tables: `profiles`,
   `exhibitor_enquiries`, `visitor_registrations`, `media_enquiries`, `contact_enquiries`,
   `newsletter_subscribers`, `accessibility_feedback`.

### 3. Configure environment variables

1. In the Supabase dashboard, go to **Project Settings → API**.
2. Copy the **Project URL**, the **anon public** key, and the **service_role** key.
3. In this project, copy `.env.example` to `.env.local` (local dev) or add these to your hosting
   provider's environment variables (production):
   ```
   NEXT_PUBLIC_SUPABASE_URL=<Project URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
   SUPABASE_SERVICE_ROLE_KEY=<service_role key>
   ```
   **The service_role key is a secret — never commit it, never prefix it with `NEXT_PUBLIC_`, never paste
   it into client-side code.** See `ENVIRONMENT_SETUP.md`.
4. Restart the dev server (`npm run dev`) or redeploy, so the new env vars take effect.

### 4. Configure authentication

No extra configuration is required for basic email/password sign-in — Supabase Auth supports it by
default. If you want to restrict sign-ups (recommended, since this is an internal admin tool, not a
public account system):
1. Go to **Authentication → Providers → Email**.
2. Consider turning off **"Allow new users to sign up"** once your admin accounts are created, so nobody
   else can self-register at `/login`. (This project's `/login` page does not offer a public sign-up flow
   at all — the only "create account" mechanism is the Supabase dashboard, see step 5 — but this Auth
   setting is a useful extra guard against any future public sign-up feature being added by mistake.)

### 5. Create the first admin user

1. Go to **Authentication → Users → Add user → Create new user**. Enter the admin's email and a
   temporary password (or use **"Send invite email"** if you've configured an email provider in
   Supabase's Auth settings).
2. Go to **Table Editor → profiles**. You should see a row automatically created for the new user
   (Supabase's `auth.users` triggers don't auto-populate `profiles` — if no row appears, insert one
   manually: click **Insert row**, set `id` to the new user's UUID from **Authentication → Users**, set
   `role` to `super_admin`).
3. Repeat for a **second** admin account — per the design spec's "equal organizer governance" rule, at
   least two people should have independent admin/recovery access; no single organizer should be the sole
   credential holder.
4. Sign in at `/login` with the new account. You should now see `/admin` with all 6 submission modules
   listed instead of the "not yet configured" message.

### 6. Configure Row Level Security

Already done by `schema.sql` (RLS is enabled on every table with `alter table … enable row level
security;`, plus the `is_admin()`-gated SELECT policies). Nothing further to configure — just confirm in
**Table Editor**, each table should show a "RLS enabled" badge.

### 7. Verify database inserts

1. With env vars set and the dev server restarted, submit any of the 6 forms on the live site (e.g.
   `/book-a-stand`).
2. Check **Table Editor → exhibitor_enquiries** (or the relevant table) — the new row should appear
   within a few seconds, including a unique `reference_number`.
3. Check the confirmation screen shown to you in the browser — the reference number displayed there
   should match the `reference_number` column value exactly.
4. If nothing appears: check the server console/logs for `[db:<table>] insert failed` — this means
   Supabase env vars are set but something else is wrong (wrong key, RLS blocking the service-role client
   — shouldn't happen since it bypasses RLS by design, or a network/firewall issue). If you instead see
   `[db:<table>] Supabase not configured`, your env vars aren't being picked up — double check spelling
   and that you restarted the server after adding them.

### 8. Back up and restore data

**Automated backups:**
1. Go to **Project Settings → Backups** (or **Database → Backups** depending on your Supabase plan).
2. Confirm daily backups are enabled (available by default on paid plans; free-tier projects have more
   limited backup retention — check your plan's specifics).
3. Note your backup retention window (aim for at least 30 days, per `LAUNCH_CHECKLIST.md`).

**Manual backup (works on any plan):**
```bash
# Requires the Supabase CLI: https://supabase.com/docs/guides/cli
supabase db dump --db-url "postgresql://postgres:<password>@<host>:5432/postgres" -f backup.sql
```

**Restore:**
1. From the dashboard's **Backups** page, select a restore point and follow the guided restore flow
   (this typically restores to a new project, which you then re-point your env vars at), **or**
2. From a manual `pg_dump` file: `psql "<connection string>" -f backup.sql` against a fresh project.
3. **Test this at least once before go-live** — restoring a backup you've never tried tends to reveal
   surprises at the worst possible time.

## Production failure behavior (important)

- **Demo mode (no env vars set)**: every form still works end-to-end — submissions are logged to the
  server console and a reference number is generated, so the full user-facing flow can be verified
  without a database. This is intentional for local development and for previewing the site before
  Supabase is connected.
- **Production mode (env vars set)**: if the database insert fails for any reason (network issue, bad
  credentials, RLS misconfiguration), the API route returns a real `500` error and the form shows "The
  form could not be submitted. Review the highlighted fields and try again." — **the enquiry is never
  silently discarded and shown as if it succeeded.** If you ever see this error in production, check the
  server logs for the underlying `[db:<table>] insert failed` message.
