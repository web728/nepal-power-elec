# Final Release Notes

## Final dependency versions

| Package | Version | Notes |
|---|---|---|
| `next` | 16.2.12 | Patched (was 16.2.10); latest stable — 16.3.0 exists only as unreleased preview/canary |
| `sharp` | 0.35.3 (all copies, top-level + nested) | Deduped via `package.json` `overrides` |
| `postcss` | 8.5.23 (all copies, top-level + nested) | Deduped via `package.json` `overrides` |
| `eslint` | ^9.39.5 | 10.8.0 tested, confirmed to break `eslint-config-next`'s bundled `eslint-plugin-react`, reverted |
| `eslint-config-next` | 16.2.12 | Patched (was 16.2.10) to match `next` |
| `react` / `react-dom` | 19.2.4 | Unchanged |
| `zod` | ^4.4.3 | Unchanged |
| `resend` | ^6.17.2 | Unchanged |
| `@supabase/ssr` / `@supabase/supabase-js` | ^0.12.1 / ^2.110.4 | Unchanged |
| `vitest` | ^4.1.10 | Added production-hardening pass — automated test runner |
| ~~`motion`~~ | ~~^12.42.2~~ | Evaluated during visual-polish pass, never imported by any component — **removed** (4 packages eliminated). All animations use CSS transitions + IntersectionObserver |

## Security status

**0 findings in any production-relevant package.** 9 high-severity findings remain, all confined to the
dev-only ESLint toolchain (never installed in a production build, never executes at runtime) — tested,
confirmed unfixable without breaking the lint toolchain, and documented as an accepted risk. Full detail:
[SECURITY_REMEDIATION_REPORT.md](SECURITY_REMEDIATION_REPORT.md).

Additional hardening this pass: duplicate-submission protection (409 on identical resubmission within 2
minutes), HTML-escaped + Reply-To-enabled organizer notification emails with full submission detail,
email retry-with-backoff, header-injection sanitization, 6 security headers (CSP/HSTS/X-Frame-Options/
X-Content-Type-Options/Referrer-Policy/Permissions-Policy) applied and curl-verified on both dev and a
local production build, and a full repository/git-history secret scan (0 secrets found).

## Build status

✅ `npm run build` — all 49 routes compiled successfully (Next.js 16 / Turbopack).

## Lint status

✅ `npm run lint` — 0 errors, 0 warnings.

## Test status

✅ `npm test` — 65/65 automated tests passing across 5 files (form validation 19, content-data integrity
12, rate-limiter + duplicate-submission guard 7, email-template escaping/header-safety 4, visual-polish
integrity 23).

## Route count

**49 total routes** (unchanged) — 34 public content pages, 6 form-backed API routes, 4 auth/admin
utility routes (`/admin`, `/admin/[module]`, `/dashboard`, `/login`), 1 not-found handler, 4 generated
technical endpoints (`sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `opengraph-image`). The build's
"Generating static pages (50/50)" counter includes `favicon.ico`, a metadata convention file not displayed
in the route tree. Full breakdown: `docs/ROUTE_TABLE.md`.

## Visual polish pass

A premium visual-polish pass was applied to the homepage. New interactive components:

| Component | Homepage position | Animation technique |
|---|---|---|
| Interactive Image Accordion (5 expo sectors) | After EventOverview, before Why Exhibit | CSS `flex` transitions (desktop), `max-height` transitions (mobile) |
| Lamp CTA with beam animation | After StatsSection, before GallerySection | CSS gradients (conic + radial) + IntersectionObserver reveal |
| Animated Counters | Inside StatsSection | `requestAnimationFrame` with cubic ease-out + IntersectionObserver |

Additional polish: Hero radial gradient accent + yellow date-bar stripe, Quick Action Cards with negative
margin hero overlap and per-card accent colors, Gallery hover zoom effect, increased section spacing
throughout. All animations respect `prefers-reduced-motion` and are keyboard/screen-reader accessible.

**Libraries evaluated and rejected:**
- `motion` — installed, never imported by any component, removed (4 packages eliminated)
- GSAP — commercial license required for production, CSS transitions sufficient
- Three.js — no 3D requirements, unnecessary bundle weight
- Lenis — no smooth-scroll requirements

**Images used:** existing gallery images only (`nepal-electric-expo-2025-glimpses-01.webp`,
`nepal-electric-expo-2025-glimpses-02.webp`). No new images added.

## Form count

**6 forms** — Book a Stand, Register to Visit, Media Enquiry, Contact, Newsletter, Accessibility
Feedback. Full breakdown: `docs/FORM_TABLE.md`.

## Database status

Schema complete and verified (`supabase/schema.sql`): 7 tables (1 roles table + 6 submission tables),
RLS enabled everywhere, unique reference numbers enforced at the database level, admin-only SELECT
policies, no public read/write policies. **Not yet connected to a real Supabase project** — verified only
in demo mode (console-logged submissions). Connect via `docs/SUPABASE_SETUP_GUIDE.md`.

## Email status

Templates complete and verified (acknowledgement + detailed organizer notification per form, HTML-
escaped, Reply-To wired to the submitter, retry-with-backoff on transient failure). **Not yet connected
to a real Resend account** — verified only in demo mode (console-logged emails). Connect via
`docs/RESEND_SETUP_GUIDE.md`.

## Favicon status

**Complete.** `favicon.ico` (16/32/48px multi-resolution), `icon-16.png`, `icon-32.png`, `icon-48.png`,
`apple-touch-icon.png` (180px), `android-chrome-192x192.png`, `android-chrome-512x512.png`, and a
maskable PWA variant were all generated from the approved primary event logo (the teal power-button
glyph from its own icon row) — cropped directly from the source file's unaltered pixels, never redrawn
or recolored. The mislabeled historical "4th Edition" concurrent-event logo (see `FILE_INVENTORY.md`
conflict #1) was not used for anything.

## Deployment readiness

**Ready to deploy.** `vercel.json`, `next.config.ts` (security headers, redirects scaffold), and
`package.json`'s `engines` field (Node ≥20) are all in place. Full step-by-step in
`docs/VERCEL_DEPLOYMENT_GUIDE.md`. Deployment itself has not been performed (no hosting account exists in
this environment) — see "Remaining items requiring external accounts" below.

## Remaining items requiring external accounts, domain access, or legal counsel

These cannot be resolved by further engineering work in this environment:

1. **Supabase account** — create a project, run `supabase/schema.sql`, connect env vars
   (`docs/SUPABASE_SETUP_GUIDE.md`).
2. **Resend account** — verify a sending domain (DNS access required), connect env vars
   (`docs/RESEND_SETUP_GUIDE.md`).
3. **Hosting + domain** — a Vercel account (or equivalent), a registered domain, and DNS access
   (`docs/VERCEL_DEPLOYMENT_GUIDE.md`).
4. **Legal review** — the 5 policy pages (Privacy, Terms, Cookie, Accessibility, Disclaimer) contain
   complete, verbatim-approved text but require the organizers' legal counsel's sign-off before the
   "pending review" status (documented internally only — never shown publicly, see `FINAL_AUDIT_REPORT.md`
   §content-compliance verification) is lifted.
5. **Live audits** — Lighthouse, axe, Google Rich Results Test, PageSpeed Insights, SSL Labs,
   securityheaders.com, Search Console, and Bing Webmaster Tools all require a public URL to run against;
   exact procedures are ready in `docs/LIVE_AUDIT_PROCEDURES.md`, with no fabricated results recorded.

## What this release is, and isn't

This is a **complete, tested, security-hardened codebase** ready for the organizers to connect real
accounts and deploy. It is **not yet a live, publicly launched website** — that requires the 5 external
actions above, none of which can be completed without the organizers' own accounts, domain, or legal
counsel.
