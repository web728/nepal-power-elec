# Launch Checklist — Nepal Electric, Power and Lights Expo 2026

Complete every item before pointing the final domain at this site. Items marked **(done in this build)**
were already verified during development; everything else requires the organizers' own accounts/access
and must be done at deployment time.

**Related documents**: `docs/SECURITY_REMEDIATION_REPORT.md` (dependency security),
`docs/SUPABASE_SETUP_GUIDE.md`, `docs/RESEND_SETUP_GUIDE.md`, `docs/VERCEL_DEPLOYMENT_GUIDE.md`,
`docs/PRODUCTION_TEST_PLAN.md` (exact test procedures for every item below),
`docs/LIVE_AUDIT_PROCEDURES.md` (Lighthouse/axe/Rich-Results/PageSpeed/SSL procedures once a public URL
exists), `docs/FINAL_RELEASE_NOTES.md` (overall release summary).

## Domain & Infrastructure
- [ ] Domain registered and accessible (e.g. nepalpowerelec.com)
- [ ] DNS records point to the hosting provider
- [ ] SSL/TLS certificate active (automatic on Vercel; confirm on any other host)
- [ ] `NEXT_PUBLIC_SITE_URL` set to the final production domain

## Supabase
- [ ] Production Supabase project created
- [ ] `supabase/schema.sql` run against the production project
- [ ] `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` set in
      production environment variables
- [ ] At least one admin account created with `profiles.role = 'super_admin'`
- [ ] At least two people have documented recovery access (per the design spec's "equal organizer
      governance" rule — no single organizer should be the sole credential holder)

## Resend (Email)
- [ ] Resend account created, sending domain verified (SPF, DKIM, DMARC configured)
- [ ] `RESEND_API_KEY` and `EMAIL_FROM_ADDRESS` set in production
- [ ] Test email sent and received for all 6 forms

## Analytics & Consent
- [ ] Analytics IDs set (`NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_GTM_ID`) if required at launch
- [ ] Confirmed analytics scripts do **not** load before cookie consent is given **(done in this build —
      verified via `analytics-scripts.tsx` gating on stored consent)**
- [ ] Cookie banner Accept All / Reject Non-Essential / Manage Preferences all function **(done in this
      build — verified end-to-end, consent persists in localStorage)**
- [ ] Cookie Settings link in footer reopens the preference banner **(done in this build)**

## Form Routing & Email Delivery
- [ ] All 6 forms tested end-to-end against the **production** Supabase + Resend configuration (not just
      demo mode) — Book a Stand, Register to Visit, Media Enquiry, Contact, Newsletter, Accessibility
      Feedback
- [ ] Confirmation emails arrive at the submitter's address
- [ ] Notification copies arrive at all three organizers' addresses for every form type
- [ ] Reference numbers generate correctly and are unique **(done in this build — unit-tested)**

## Backups
- [ ] Automated daily Supabase database backups enabled (Supabase dashboard → Database → Backups)
- [ ] Backup restore process tested at least once before go-live
- [ ] Source code repository backed up / mirrored beyond a single machine

## Legal Review
- [ ] Privacy Policy reviewed by organizers' legal counsel
- [ ] Terms and Conditions reviewed
- [ ] Cookie Policy reviewed
- [ ] Accessibility Statement reviewed
- [ ] Disclaimer reviewed
- [ ] Any wording changes from legal review applied to the corresponding page in `src/app/*/page.tsx`

## Branding & Assets
- [x] Real favicon/app icons added **(done in this build — `favicon.ico`, `icon-16/32/48.png`,
      `apple-touch-icon.png`, `android-chrome-192/512.png`, and a maskable PWA icon, all cropped directly
      from the approved primary event logo's own icon glyph with no redrawing — see
      `docs/FINAL_RELEASE_NOTES.md` for the exact derivation)**
- [ ] Social-sharing image confirmed correct — the dynamic OG image at `/opengraph-image` renders the
      event name, date and venue **(done in this build — verified generates a 1200×630 PNG)**

## Search Engine Setup
- [ ] `sitemap.xml` submitted to Google Search Console
- [ ] `sitemap.xml` submitted to Bing Webmaster Tools
- [ ] Domain verified in Google Search Console
- [ ] Domain verified in Bing Webmaster Tools
- [ ] `robots.txt` reachable at `/robots.txt` and correctly disallows `/admin`, `/dashboard`, `/login`,
      `/search`, `/api` **(done in this build — verified via curl)**
- [ ] `sitemap.xml` reachable and lists all public pages with correct priorities **(done in this build —
      verified via curl)**
- [ ] Event / Organization / Breadcrumb / FAQ structured data validated with Google's Rich Results Test
      **(JSON validity confirmed in this build; live Rich Results Test requires a public URL)**

## Performance
- [ ] Lighthouse run against the deployed production URL (targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.10 at
      the 75th percentile)
- [ ] Confirm homepage image payload stays under the spec's 1.5MB budget on first load
- [ ] Confirm no unused JavaScript libraries were introduced by later edits

## Accessibility
- [ ] Automated scan (axe or Lighthouse accessibility audit) run against the deployed production URL
- [ ] Manual keyboard-only pass on every page template **(spot-checked in this build — nav, forms,
      accordions, mobile menu, cookie banner all keyboard-operable with visible focus states)**
- [ ] Screen-reader smoke test (NVDA + Chrome, or VoiceOver + Safari) on the homepage and at least one
      form

## Security
- [ ] MFA enabled on the Supabase account, hosting account, domain registrar, and Resend account
- [x] Security headers configured **(done in this build — CSP, HSTS, X-Frame-Options,
      X-Content-Type-Options, Referrer-Policy, Permissions-Policy applied via `next.config.ts`,
      curl-verified present on both dev and a local production build; CSP's `unsafe-eval` is
      dev-only and confirmed absent from the production build — see `docs/VERCEL_DEPLOYMENT_GUIDE.md`)**
- [x] `npm audit` remediated **(done in this build — `next`/`sharp`/`postcss` fully resolved via a patch
      upgrade + `package.json` overrides; 0 findings remain in any production-relevant package; 9 remain
      in the dev-only ESLint toolchain, tested-and-confirmed unfixable without breaking the lint
      toolchain, documented as an accepted risk — see `docs/SECURITY_REMEDIATION_REPORT.md`)**
- [x] Duplicate-submission protection and fail-safe persistence **(done in this build — see
      `docs/SUPABASE_SETUP_GUIDE.md`)**
- [x] Full secret scan of repository, working tree, and git history **(done in this build — 0 secrets
      found — see `docs/SECURITY_REMEDIATION_REPORT.md`)**
- [ ] Staging environment (if used) is protected from public/search-engine access

## Mobile & Browser Testing
- [ ] Manual test at 320px, 375px, 768px, 1024px, 1440px widths **(spot-checked at 375px in this build —
      no horizontal scroll, sticky mobile CTA bar, hamburger menu all functioned correctly)**
- [ ] Latest Chrome, Edge, Firefox on Windows
- [ ] Latest Safari and Chrome on macOS
- [ ] Latest Safari on iOS (current + one older supported device size)
- [ ] Latest Chrome on Android (360px and 412px widths)

## Final Content Verification
- [ ] Event name, dates (4–6 September 2026) and venue (Bhrikuti Mandap Exhibition Hall, Kathmandu, Nepal)
      identical across header, footer, every page, structured data, and emails **(verified in this build
      via automated tests + grep audit — zero date discrepancies found)**
- [ ] All three organizers equally visible everywhere they appear **(verified — identical card treatment,
      unit-tested)**
- [ ] Every 2025 statistic labelled organizer-reported **(verified — grep-audited)**
- [ ] No unsupported superlative claims, no conference/speaker content, no unverified exhibitor names, no
      placeholder/"coming soon" text, no dead buttons **(verified — grep-audited, zero matches)**
- [ ] No development notes, internal comments, or build-process language visible on any public page
      **(verified — grep-audited)**
