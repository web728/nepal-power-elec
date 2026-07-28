# 5th Nepal Electric, Power and Lights International Expo 2026 — Website

Production website for the **5th Nepal Electric, Power and Lights International Expo 2026** (4–6 September
2026, Bhrikuti Mandap Exhibition Hall, Kathmandu, Nepal) — built with Next.js 16 (App Router), TypeScript,
Tailwind CSS v4, and Supabase.

The site is fully functional today with **zero configuration**: every page renders, every form validates
and submits, and submissions are logged server-side. Connecting Supabase and Resend (both optional, see
below) upgrades forms from "logged to console" to "persisted to a database and emailed."

## Content policy

Every page is scoped to what the official 2026 brochure, the 2025 post-show report, the approved Full
Website Content master document, and the Website Design & Development Specification actually say — see
[docs/FILE_INVENTORY.md](docs/FILE_INVENTORY.md) for the complete source-to-page mapping and every
conflict found between those source documents (and how each was resolved). There is no fabricated
exhibitor directory, no invented stand pricing, no fake sponsors, and no co-located "Home Appliances"
show (a mislabeled 2025 asset — see the inventory's conflict #1). Statistics from the 2025 edition are
always labelled organizer-reported.

## What's here

- **49 routes**: homepage, About, Exhibit, Visit, Past Editions, Media, Downloads, legal pages, a
  lightweight admin CMS, and a participant login/dashboard shell.
- **6 working forms** (Book a Stand / exhibitor enquiry, Register to Visit / visitor registration, Media
  Enquiry, Contact, Newsletter, Accessibility Feedback) — client + server validation with Zod,
  rate-limited API routes, reference-number generation, transactional email templates, and equal-fan-out
  notification to all three organizers.
- **Real, working downloads** — the actual 2026 brochure and 2025 post-show report PDFs are served from
  `/downloads/`, correctly renamed from their original filenames (see FILE_INVENTORY.md).
- **No fabricated content.** Anything not confirmed by the organizers (a 2026 exhibitor directory,
  featured exhibitors, stand prices, schedules) is omitted entirely rather than shown as a placeholder.
- **SEO**: per-page metadata + canonical URLs, `sitemap.xml`, `robots.txt`, dynamic OG image, JSON-LD
  (Organization ×3, Event, Breadcrumb, FAQ).
- **Accessibility**: semantic landmarks, skip link, visible focus states, labelled form fields with live
  error messaging, `prefers-reduced-motion` support, keyboard-operable nav, accordions and mobile menu.
- **Cookie consent**: Accept All / Reject Non-Essential / Manage Preferences, analytics scripts gated on
  consent, a persistent Cookie Settings control in the footer.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Forms/validation | Zod, client + server |
| Database/auth | Supabase (Postgres + Auth) |
| Email | Resend |
| Icons | lucide-react |

This stack was chosen because no specific CMS/framework/database is mandated by the approved Website
Design & Development Specification (it names WordPress/Drupal/"a modern headless CMS" only as
non-binding *examples*, see `docs/archive/`) and the AI Build Playbook names only "Next.js with
TypeScript" — so it mirrors the proven, working architecture already used for a sibling event site in
this workspace (`battery-india-expo`), which meets every capability the spec actually requires (reusable
components, role-based access, media management, SEO fields, secure updates) without locking content
inside page-builder shortcodes.

> **Note on Next.js version**: this project pins to Next 16, which renamed `middleware.ts` to `proxy.ts`
> and made `params`/`searchParams` promises.

## Brand system

Colors and typography follow the **official Branding Guidelines PDF** (Sky #35A8E0 / Yellow #EBBC17 /
Teal #05756A, Poppins-only) — **not** the Website Design & Development Specification's own proposed
navy/blue/cyan palette and "Inter" typeface, because the master brief's Brand Authority Order ranks the
Branding Guidelines above the Design Spec for color/typography decisions. See
`docs/FILE_INVENTORY.md`, conflict #2, for the full reasoning. The Design Spec's *structural* rules
(breakpoints, spacing scale, component behavior, motion durations, WCAG target) are still followed.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000> (or whichever port your dev script prints). The site works immediately —
forms will succeed and log their payload to the terminal instead of writing to a database.

### Environment variables

Copy `.env.example` to `.env.local` and fill in what you have:

```bash
cp .env.example .env.local
```

Everything is optional — see the table in `.env.example` for what each variable unlocks (Supabase
persistence + admin CMS, Resend transactional email, analytics IDs, production site URL).

### Setting up Supabase (database, auth, admin CMS)

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run `supabase/schema.sql` — creates every table (the six lead/enquiry tables,
   `profiles` with a role enum), RLS policies, and indexes.
3. Copy **Project URL**, **anon public key**, and **service role key** into `.env.local`.
4. Create your own account via Supabase Auth (`/login`'s password-reset flow, or directly in the
   Supabase dashboard under *Authentication → Users*).
5. In the `profiles` table, set your row's `role` to `super_admin` — this unlocks `/admin`.
6. Restart the dev server. Every form now persists submissions instead of just logging them.

### Setting up email (Resend)

1. Create an account at [resend.com](https://resend.com) and verify a sending domain.
2. Add `RESEND_API_KEY` and `EMAIL_FROM_ADDRESS` to `.env.local`.
3. Templates live in `src/lib/email/templates.ts` — the confirmation copy there is transcribed verbatim
   from the approved content master; edit with care if the organizers change the approved wording.

## Editing content

Almost all copy lives in small, typed files under `src/lib/content/` and `src/lib/site-config.ts`:

| File | Controls |
|---|---|
| `src/lib/site-config.ts` | Event name, dates, venue, all three organizers' contacts, logos |
| `src/lib/content/nav.ts` | Header/footer navigation |
| `src/lib/content/sectors.ts` | The 6 Exhibitor Profile sectors (verbatim from the 2026 brochure) |
| `src/lib/content/stats.ts` | 2025 post-show statistics (verbatim, organizer-reported) |
| `src/lib/content/faqs.ts` | General / Exhibitor / Visitor FAQs (verbatim from the content master) |
| `src/lib/content/home-content.ts` | Why Exhibit / Why Visit benefit lists, gallery caption |
| `src/lib/content/form-options.ts` | Dropdown option lists for all 6 forms |

**Do not add placeholder exhibitors, sponsors, or statistics.** These are intentionally absent — see
"Content policy" above.

## Admin CMS

`/admin` is gated by Supabase Auth + a role check (`src/lib/auth.ts`). It provides an overview linking to
a generic module viewer (`/admin/[module]`) for each of the six submission tables. This is intentionally
a **read-oriented** admin (a full read/write CRUD UI is out of scope for this build pass) — the RLS
policies and table shapes in `schema.sql` support extending it later.

## Deployment

Standard Next.js app — deploys cleanly to Vercel (recommended) or any Node.js host:

```bash
npm run build
npm run start
```

**Vercel:** push to GitHub → import in Vercel → add the env vars from `.env.example` → deploy. Full
step-by-step (custom domain, DNS, SSL, rollback) is in `docs/VERCEL_DEPLOYMENT_GUIDE.md`. Security
headers (CSP, HSTS, etc.) and a `vercel.json` are already configured — see `next.config.ts`.

## Project structure

```
src/
  app/                    Routes (App Router)
    api/                  6 form submission endpoints (POST-only)
    admin/                Admin CMS (auth-gated layout + generic module viewer)
    dashboard/, login/    Participant auth shell
  components/
    ui/                   Generic primitives (Button, Card, form fields, Accordion, ...)
    layout/               Header, Footer, mobile menu, consent banner, sticky CTA bar
    sections/             Homepage/page-level building blocks (Hero, PageHero, LegalPage, ...)
    forms/                The 6 form components
    seo/                  JSON-LD components, analytics script loader
  lib/
    content/              Editable site content (see table above)
    validations/          Zod schemas shared by forms + API routes
    email/                Templates + send() wrapper
    supabase/              Browser/server/service Supabase clients
    site-config.ts          Event facts
    admin-modules.ts         Admin CMS module registry
    auth.ts                  Session/role helpers
supabase/
  schema.sql                Full Postgres schema, RLS policies, enums
docs/
  FILE_INVENTORY.md          Complete source-file audit + conflict log (read this first)
  archive/                   Reference copies of the source PDFs
```

## Testing what you built

```bash
npm run build   # type-checks every route and statically generates all pages
npm run lint    # ESLint (React Compiler rules included)
npm test        # Vitest — form-validation schemas, content-data integrity, rate limiter
npm run dev     # local dev server with Turbopack + fast refresh
```

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Forms "succeed" but nothing appears in Supabase | Supabase env vars not set, or `SUPABASE_SERVICE_ROLE_KEY` missing — check the server console; it logs `[db:<table>] Supabase not configured` when falling back to demo mode. |
| No confirmation/notification emails arrive | `RESEND_API_KEY` not set (server console logs `[email] RESEND_API_KEY not configured`), or the sending domain isn't verified in Resend yet. |
| `/admin` shows "Not Yet Configured" | Supabase env vars aren't set, or your account's `profiles.role` isn't one of the admin roles — see `src/lib/auth.ts`. |
| `/login` sign-in fails | Confirm the account exists in Supabase Auth (dashboard → Authentication → Users) and that `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` are set and correct. |
| Analytics scripts never load | This is by design until a visitor accepts analytics cookies via the consent banner — check `localStorage` key `nepal-expo-cookie-consent`, and confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID`/`NEXT_PUBLIC_GTM_ID` are set. |
| `npm run build` fails after an edit | Run `npm run lint` first — most build failures are TypeScript type errors caught by lint/tsc; the error output names the exact file/line. |
| Styling looks unbranded / wrong font | Confirm you didn't remove the `Poppins` import in `src/app/layout.tsx` or the CSS variables in `src/app/globals.css` — brand colors/typography intentionally come from the Branding Guidelines PDF, not any framework default. |
| A page shows stale content after a content-file edit | Restart `npm run dev` (Turbopack fast refresh usually picks up `src/lib/content/*` edits automatically, but a restart is the reliable fallback). |
| A form submission returns "This looks like a duplicate submission" | Expected behavior — the same payload was submitted to the same form within the last 2 minutes (see `src/lib/rate-limit.ts`'s `isDuplicateSubmission()`). Wait, or change a field slightly, to submit again. |
| `npm audit` shows findings | Check `docs/SECURITY_REMEDIATION_REPORT.md` first — as of the last remediation pass, any findings should be confined to the dev-only ESLint toolchain (never shipped to production); a finding in `next`/`sharp`/`postcss`/`react`/etc. would be new and should be investigated. |

## Further documentation

See the table in [DEVELOPER_HANDOFF.md](DEVELOPER_HANDOFF.md#full-documentation-index) for the complete
index of every handover document (security, Supabase, Resend, deployment, testing, and audit reports).
