# Production Test Plan

Run this against the deployed URL (a Vercel preview URL or the final production domain) after each
significant deploy. Where a step has a copy-pasteable command, `<URL>` means your deployed base URL
(e.g. `https://nepal-power-elec-expo-2026.vercel.app` or `https://www.nepalpowerelec.com`).

## 1. Homepage

- Visit `<URL>/`. Confirm event name, dates (4-6 September 2026), venue (Bhrikuti Mandap Exhibition Hall,
  Kathmandu, Nepal), and both primary CTAs (Book a Stand, Register to Visit) are visible without
  scrolling on a 1280px-wide viewport.
- Confirm the "organizer-reported" qualifier is visible next to the 150+/5+/15,000+ stats.
- Confirm no console errors: open DevTools → Console, reload, check for red errors.

## 2. Every public navigation item

Click every top-level nav item and every dropdown child (see `docs/ROUTE_TABLE.md` for the full list of
34 public content pages) — confirm each loads without a 404 or error boundary.

## 3. All 49 routes

```bash
for path in / /about-the-expo /event-history /organizers /venue /faq /why-exhibit /exhibitor-profile \
  /exhibitor-categories /book-a-stand /exhibitor-faq /why-visit /visitor-profile /register-to-visit \
  /plan-your-visit /visitor-faq /past-editions/2025-edition /past-editions/post-show-statistics \
  /past-editions/photo-gallery /past-editions/media-coverage /news /press-releases /media-enquiry \
  /downloads /downloads/2026-event-brochure /downloads/2025-post-show-report /contact /privacy-policy \
  /terms-and-conditions /cookie-policy /accessibility /disclaimer /sitemap /search; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "<URL>$path")
  echo "$code  $path"
done
```
Expect `200` for every path above. (`/admin`, `/dashboard`, `/login` are excluded from this list since
they render a "not configured"/access-gated state by design until Supabase is connected — see
`SUPABASE_SETUP_GUIDE.md`.)

## 4. All six forms

For each of Book a Stand, Register to Visit, Media Enquiry, Contact, Newsletter, Accessibility Feedback:
1. Submit with an invalid field (e.g. empty required field) — confirm the exact approved error copy
   appears inline and the field is focused (see `docs/FORM_TABLE.md` for exact validation messages).
2. Submit a fully valid submission — confirm the exact approved confirmation copy and a reference number
   in the form `<PREFIX>-XXXXXXXX-XXXX` appears.
3. Immediately resubmit the identical payload — confirm a `409`/"duplicate submission" message, not a
   second success.

## 5. Database insertion

With Supabase connected (see `SUPABASE_SETUP_GUIDE.md`): after each of the 6 submissions in step 4,
check the corresponding table in Supabase's **Table Editor** — confirm a new row appeared with matching
field values and the same reference number shown on-screen.

## 6. Organizer notification emails

After each form submission (except Newsletter, which doesn't route to organizers by design), confirm
all three addresses receive the detailed notification email (enquiry type, reference number, submission
time, and every submitted field) — see `docs/RESEND_SETUP_GUIDE.md` §6 for the full test procedure.

## 7. Submitter confirmation emails

Confirm the submitter's own email address receives the approved acknowledgement copy for each of the 6
forms (Newsletter sends a subscription-confirmation email instead).

## 8. PDF downloads

```bash
curl -sI "<URL>/downloads/Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf" | head -5
curl -sI "<URL>/downloads/Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf" | head -5
```
Expect `200 OK` and `Content-Type: application/pdf` for both. Open each in a browser — confirm it opens
without corruption and the title bar/metadata is readable.

## 9. Cookie preferences

1. Load the site in a fresh/incognito session — confirm the consent banner appears.
2. Click **Accept All** — confirm `localStorage.getItem('nepal-expo-cookie-consent')` shows
   `analytics:true, marketing:true`.
3. Reload, click the footer's **Cookie Settings** link — confirm the banner reopens with **Manage
   Preferences**.
4. Click **Reject Non-Essential** — confirm analytics scripts do not load (check Network tab for no
   `google-analytics.com`/`googletagmanager.com` requests).

## 10. Search

Visit `<URL>/search`, submit any query — confirm the honest "No results were found..." message appears
(there is no fabricated search index — see `docs/FINAL_AUDIT_REPORT.md` §11).

## 11. 404 behavior

```bash
curl -s -o /dev/null -w "%{http_code}\n" "<URL>/this-page-does-not-exist-12345"
```
Expect `404`. Visit it in a browser — confirm the custom not-found page (not a generic server error)
renders with working "Return to Home" / "Contact Us" links.

## 12. Sitemap

```bash
curl -s "<URL>/sitemap.xml" | head -20
```
Confirm valid XML, and that `<loc>` values use your real production domain (not a placeholder or a
Vercel preview URL) — this depends on `NEXT_PUBLIC_SITE_URL` being set correctly (see
`docs/VERCEL_DEPLOYMENT_GUIDE.md`).

## 13. robots.txt

```bash
curl -s "<URL>/robots.txt"
```
Confirm it disallows `/admin`, `/dashboard`, `/login`, `/search`, `/api`, and references the correct
sitemap URL.

## 14. Canonical URLs

For a sample of pages, view source and confirm `<link rel="canonical" href="...">` matches the actual
production URL for that page (see `docs/ROUTE_TABLE.md` for the expected canonical path per route).

## 15. Open Graph metadata

```bash
curl -s "<URL>/" | grep -oE '<meta property="og:[^>]*>'
```
Confirm `og:title`, `og:description`, `og:url`, `og:type` are present and accurate. Visit
`<URL>/opengraph-image` directly — confirm it renders a 1200×630 image with the event name/date/venue.

## 16. JSON-LD

```bash
curl -s "<URL>/" | grep -oE '<script type="application/ld\+json">.*?</script>'
```
Paste each block into [Google's Rich Results Test](https://search.google.com/test/rich-results) (or
validate JSON syntax locally first with `python3 -m json.tool`) — confirm no errors. Expect Organization
×3, Event on the homepage; add BreadcrumbList/FAQPage on pages like `/faq`.

## 17. Mobile menu

At a 375px viewport: tap the hamburger icon, confirm the full navigation (all sections + both primary
CTAs) opens in an accessible dialog, and that it closes via the X button, Escape key, or backdrop tap.

## 18. Keyboard navigation

Starting from the address bar, press Tab repeatedly through the entire homepage — confirm a visible
focus outline follows every interactive element in a logical order (skip link → nav → hero CTAs →
sections → footer), and that the skip-to-content link (first Tab press) jumps past the header when
activated.

## 19. Screen-reader landmarks

With a screen reader (NVDA+Chrome or VoiceOver+Safari) or a landmarks browser extension, confirm exactly
one `<header>`/banner, one `<nav aria-label="Primary">`, one `<main>`, and one `<footer>` per page.

## 20. Color contrast

Run a contrast checker (browser DevTools' built-in contrast checker, or
[WebAIM's Contrast Checker](https://webaim.org/resources/contrastchecker/)) against the brand color
pairs actually used for text: `#14212B` (ink) on white, white on `#05756A`/`#044f47` (teal), `#5B6B74`
(muted) on white/`#F5F8F9`. All should meet WCAG AA (4.5:1 for normal text, 3:1 for large text/UI).

## 21. Responsive layouts

Test at 320, 375, 768, 1024, 1440px widths (browser DevTools device toolbar, or `resize_window` if using
an automated browser tool) — confirm no horizontal scrollbar appears at any width, and that the 3
organizer cards stack (never a horizontal carousel) on mobile.

## 22. Security headers

```bash
curl -sI "<URL>/" | grep -iE "content-security-policy|x-frame-options|x-content-type-options|strict-transport-security|referrer-policy|permissions-policy"
```
Confirm all 6 headers are present (see `next.config.ts` for the exact expected values) and that the CSP
does **not** contain `unsafe-eval` on the production domain (dev-only — see
`docs/VERCEL_DEPLOYMENT_GUIDE.md`'s "Known cosmetic-only item").

## 23. Rate limiting

```bash
for i in 1 2 3 4 5 6; do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST "<URL>/api/contact" \
    -H "Content-Type: application/json" \
    -d '{"fullName":"Rate Test","email":"rate@example.com","country":"Nepal","enquiryType":"General enquiry","subject":"test","message":"test","privacyConsent":true}'
done
```
Expect the first 5 requests to return `200` (or `400`/`409` if validation/duplicate logic kicks in first)
and the 6th to return `429` within the same 60-second window.

## 24. Spam protection

Confirm (by code review, not a live exploit attempt) that: every field is server-side Zod-validated
(never trusts client input alone), the duplicate-submission guard rejects identical resubmissions (step
4 above), and no CAPTCHA is present — this is a documented, accepted interim tradeoff (see
`docs/FINAL_AUDIT_REPORT.md` §10).

## 25. Admin authentication

1. Visit `<URL>/admin` without signing in — confirm redirect/access-denied behavior (or "not configured"
   state if Supabase isn't connected yet).
2. Sign in at `<URL>/login` with a non-admin-role account (if one exists) — confirm `/admin` still
   denies access.
3. Sign in with a `super_admin` account — confirm `/admin` now shows the 6 module cards.

## 26. CMS editing

Follow `CONTENT_ADMIN_GUIDE.md` end to end at least once: edit one FAQ entry, confirm it appears
correctly on the live FAQ page after redeploy/refresh.

## 27. Enquiry export

Per `CONTENT_ADMIN_GUIDE.md` §8: export one table via the Supabase dashboard's Table Editor CSV export —
confirm the downloaded CSV contains the expected columns and at least the test rows created in step 5.

## 28. Backup and restore

Per `SUPABASE_SETUP_GUIDE.md` §8: perform one manual backup (`supabase db dump`) and one restore-to-a-
test-project, confirming the six submission tables and their data reappear correctly. Do this **before**
go-live, not for the first time during an actual incident.

---

## Summary sign-off table

| # | Area | Result | Notes |
|---|---|---|---|
| 1 | Homepage | ☐ | |
| 2 | Navigation | ☐ | |
| 3 | All 49 routes | ☐ | |
| 4 | 6 forms | ☐ | |
| 5 | Database insertion | ☐ | Requires Supabase connected |
| 6 | Organizer emails | ☐ | Requires Resend connected |
| 7 | Submitter emails | ☐ | Requires Resend connected |
| 8 | PDF downloads | ☐ | |
| 9 | Cookie preferences | ☐ | |
| 10 | Search | ☐ | |
| 11 | 404 | ☐ | |
| 12 | Sitemap | ☐ | |
| 13 | robots.txt | ☐ | |
| 14 | Canonical URLs | ☐ | |
| 15 | Open Graph | ☐ | |
| 16 | JSON-LD | ☐ | |
| 17 | Mobile menu | ☐ | |
| 18 | Keyboard nav | ☐ | |
| 19 | Screen-reader landmarks | ☐ | |
| 20 | Color contrast | ☐ | |
| 21 | Responsive layouts | ☐ | |
| 22 | Security headers | ☐ | |
| 23 | Rate limiting | ☐ | |
| 24 | Spam protection | ☐ | |
| 25 | Admin auth | ☐ | Requires Supabase connected |
| 26 | CMS editing | ☐ | Requires Supabase connected |
| 27 | Enquiry export | ☐ | Requires Supabase connected |
| 28 | Backup/restore | ☐ | Requires Supabase connected |

Items 5-7, 25-28 cannot be completed until Supabase and Resend are connected to a real project (see
`SUPABASE_SETUP_GUIDE.md`, `RESEND_SETUP_GUIDE.md`) — everything else can be tested against any deployed
preview URL today.
