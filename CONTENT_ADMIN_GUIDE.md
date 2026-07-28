# Content Administrator Guide

This guide is for a **non-technical** team member who needs to keep the site's content current. It
assumes Supabase has already been connected (see `ENVIRONMENT_SETUP.md` and `DEVELOPER_HANDOFF.md`) —
until then, `/admin` shows a "not yet configured" message instead of the tools described below.

This is intentionally a **first-version, read-oriented admin CMS**. A few tasks below (editing page
prose, adding news) currently require a developer to edit a text file rather than a web form — each task
says exactly which file and how simple the edit is. Extending `/admin` with write forms for these is a
documented next step, not something built into this version.

## 1. Editing an existing page's text

Page copy lives in `src/lib/content/*.ts` (structured facts — dates, stats, FAQs, sector lists) and
`src/app/*/page.tsx` (page prose). To change a sentence on, say, the "Why Exhibit" page: open
`src/app/why-exhibit/page.tsx` in any text/code editor, find the sentence in quotes, edit it, save, and
either redeploy or ask a developer to redeploy. Structured facts (like the event dates or an organizer's
phone number) should instead be changed once in `src/lib/site-config.ts` — that single change updates
every page, the footer, emails, and the metadata automatically.

## 2. Adding a News item or Press Release

Currently: `/news` and `/press-releases` display the confirmed items already approved. To add a new one,
a developer adds an entry to the relevant array in `src/app/news/page.tsx` /
`src/app/press-releases/page.tsx`. **Do not publish a headline without organizer-approved wording** — the
existing items follow a strict "no unconfirmed information" rule (see FILE_INVENTORY.md).

## 3. Uploading documents (brochure, reports)

Official PDFs live in `public/downloads/`. To replace the brochure or post-show report: give the new PDF
the exact same filename as the current one (`Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf` or
`Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf`), replace the file in that folder, and
redeploy. Do not change the filename unless you also update the links on `/downloads`,
`/downloads/2026-event-brochure`, and `/downloads/2025-post-show-report`.

## 4. Managing gallery images

2025-edition photographs live in `public/images/gallery/2025/`. To add a new one: place the optimized
image file (WebP or JPEG, ideally under 300KB) in that folder, then add it to the gallery list in
`src/app/past-editions/photo-gallery/page.tsx` with a caption that clearly states it is from the **2025
edition** — never imply a pictured company/individual is confirmed for 2026.

## 5. Editing FAQs

All FAQ content (general, exhibitor, visitor) lives in one file: `src/lib/content/faqs.ts`. Each FAQ is a
simple `{ question: "...", answer: "..." }` entry — add, remove, or edit entries directly in that array;
no other file needs to change, and the accordion UI on `/faq`, `/exhibitor-faq`, and `/visitor-faq`
updates automatically.

## 6. Updating organizer contacts

All three organizers' names, contact people, phone numbers, and emails live in **one place**:
`src/lib/site-config.ts`, in the `organizers` array. Editing an entry there updates the footer, the
Organizers page, the Contact page, Book a Stand, Media Enquiry, Press Releases, and every confirmation
email's recipient list simultaneously — there is no need to hunt for the same contact info elsewhere.

## 7. Managing form submissions (via `/admin`)

Once Supabase is connected and you have an admin account:
1. Sign in at `/login`.
2. Go to `/admin` — you'll see a card for each of the six form types (Exhibitor Enquiries, Visitor
   Registrations, Media Enquiries, Contact Enquiries, Newsletter Subscribers, Accessibility Feedback).
3. Click into any one to see the most recent 100 submissions in a table, newest first.

## 8. Exporting enquiries

This version's admin does not yet have a one-click "Export CSV" button (see `FINAL_AUDIT_REPORT.md` for
why — an export button that doesn't actually work was explicitly avoided rather than faked). To export
submissions today: open the relevant table directly in the Supabase dashboard's **Table Editor**, which
has a built-in CSV export option, or ask a developer to query the table via the Supabase SQL editor and
export the result.

## 9. Updating SEO metadata (title/description) for a page

Each page file (`src/app/<page>/page.tsx`) has a `metadata` export near the top with `title` and
`description` fields. Edit those strings directly — they control what appears in the browser tab and in
Google search results for that page. Keep titles under ~60 characters and descriptions under ~160
characters for best display in search results.

## 10. Managing redirects

If a page's URL needs to change after launch, do not just rename the folder — old links (including ones
already indexed by Google) would break. Instead, ask a developer to add a redirect rule (Next.js supports
this via a `redirects()` function in `next.config.ts`, or your hosting provider's own redirect rules if
using Vercel). A redirect map should be documented in `docs/REDIRECTS.md` once any redirects exist (none
exist yet at initial launch, since this is a new site with no prior URLs to preserve).

## 11. Updating legal pages

Privacy Policy, Terms and Conditions, Cookie Policy, Accessibility Statement, and Disclaimer each live in
their own file under `src/app/<page-name>/page.tsx`, built from a shared `LegalPage` component
(`src/components/sections/legal-page.tsx`). Each section of legal text is defined as
`{ heading: "...", body: "..." }` in that page file — edit the `body` text directly. **Any legal-wording
change should be reviewed by the organizers' legal counsel before publishing**, per
`LAUNCH_CHECKLIST.md`.
