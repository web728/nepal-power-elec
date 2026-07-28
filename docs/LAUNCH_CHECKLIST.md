# Launch Checklist — 5th Nepal Electric, Power and Lights International Expo 2026 Website

## Pre-launch status (as of visual-polish pass)

### Build & quality gates — all passing

| Check | Status | Result |
|---|---|---|
| `npm run build` | ✅ Pass | 49 routes compiled (Next.js 16 / Turbopack) |
| `npm run lint` | ✅ Pass | 0 errors, 0 warnings |
| `npm test` | ✅ Pass | 65/65 tests across 5 files |
| `npm audit` (production) | ✅ Pass | 0 findings in production packages |
| `npm audit` (dev-only) | ⚠️ Accepted | 9 high, all ESLint toolchain — see `SECURITY_REMEDIATION_REPORT.md` |
| Content compliance grep | ✅ Pass | 0 violations across all rules |
| Browser verification (desktop 1440px) | ✅ Pass | All sections render, accordion expands, lamp animates |
| Browser verification (mobile 375px) | ✅ Pass | No horizontal overflow, stacked accordion, all CTAs visible |

### Visual-polish components verified

| Component | Desktop | Mobile | Reduced motion | Keyboard | Screen reader |
|---|---|---|---|---|---|
| Interactive Image Accordion | ✅ Flex panels | ✅ Stacked cards | ✅ No animation | ✅ Button focus | ✅ aria-expanded |
| Lamp CTA | ✅ Beam animation | ✅ Full-width | ✅ Final state | ✅ Focus on CTAs | ✅ aria-hidden decor |
| Animated Counters | ✅ Count-up | ✅ Count-up | ✅ Instant value | N/A (display) | ✅ aria-label |

## Remaining launch blockers (external accounts required)

### 1. Supabase account setup
- [ ] Create a Supabase project
- [ ] Run `supabase/schema.sql` to create 7 tables with RLS
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in environment
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY` in environment (server-only)
- [ ] Verify a test form submission persists to the database
- [ ] Full guide: `docs/SUPABASE_SETUP_GUIDE.md`

### 2. Resend account setup
- [ ] Create a Resend account
- [ ] Verify the sending domain (requires DNS access)
- [ ] Set `RESEND_API_KEY` in environment
- [ ] Set `RESEND_FROM_EMAIL` and `RESEND_FROM_NAME` in environment
- [ ] Verify a test form submission triggers real notification emails
- [ ] Full guide: `docs/RESEND_SETUP_GUIDE.md`

### 3. Hosting & domain
- [ ] Create a Vercel account (or equivalent)
- [ ] Register/connect a production domain
- [ ] Deploy and verify SSL certificate is active
- [ ] Configure all environment variables on the hosting platform
- [ ] Full guide: `docs/VERCEL_DEPLOYMENT_GUIDE.md`

### 4. Legal review
- [ ] Obtain legal counsel sign-off on Privacy Policy
- [ ] Obtain legal counsel sign-off on Terms & Conditions
- [ ] Obtain legal counsel sign-off on Cookie Policy
- [ ] Obtain legal counsel sign-off on Accessibility Statement
- [ ] Obtain legal counsel sign-off on Disclaimer

## Post-deployment verification

Run these after the site is live at a public URL:

- [ ] Run Lighthouse audit (target: 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO)
- [ ] Run axe automated accessibility scan
- [ ] Run Google Rich Results Test on homepage and FAQ page
- [ ] Run PageSpeed Insights (mobile + desktop)
- [ ] Run SSL Labs test (target: A+ rating)
- [ ] Run securityheaders.com scan (target: A rating)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Manual NVDA/VoiceOver screen-reader pass on key pages
- [ ] Full cross-browser matrix test (Safari, Firefox, Edge, mobile Safari, mobile Chrome)
- [ ] Full breakpoint matrix test (320px, 375px, 768px, 1024px, 1440px)
- [ ] Full guide: `docs/LIVE_AUDIT_PROCEDURES.md`

## Architecture summary

| Component | Technology | Status |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) | ✅ |
| Language | TypeScript | ✅ |
| Styling | Tailwind CSS v4 | ✅ |
| Database | Supabase (PostgreSQL + RLS) | ⏳ Needs account |
| Email | Resend | ⏳ Needs account |
| Hosting | Vercel-ready | ⏳ Needs account |
| Animations | CSS transitions + IntersectionObserver (no external animation library) | ✅ |
| Forms | 6 forms, Zod validation, rate limiting | ✅ |
| Tests | 65 Vitest tests, 5 files | ✅ |
| Routes | 49 total (34 public + 6 API + 4 admin + 1 not-found + 4 generated) | ✅ |
