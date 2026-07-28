# Route Table

All titles/canonicals below were extracted directly from each page's `metadata` export (not hand-typed),
so this table matches the actual shipped code. "Content source" cites the authoritative source document
per `FILE_INVENTORY.md`'s content authority order. "Sitemap" = included in `/sitemap.xml`.

| Route | Page Title | Index Status | Canonical URL | Sitemap | Content Source | Status |
|---|---|---|---|---|---|---|
| `/` | Nepal Electric, Power and Lights Expo 2026 \| Kathmandu | Index | `/` | Yes | Content Master + Brochure | Live |
| `/about-the-expo` | About the Nepal Electric, Power and Lights Expo 2026 | Index | `/about-the-expo` | Yes | Content Master | Live |
| `/event-history` | Event History \| Nepal Electric, Power and Lights Expo | Index | `/event-history` | Yes | Content Master + Brochure + PSR | Live |
| `/organizers` | Organizers \| Nepal Electric, Power and Lights Expo 2026 | Index | `/organizers` | Yes | Content Master + Brochure | Live |
| `/venue` | Venue \| Nepal Electric, Power and Lights Expo 2026 | Index | `/venue` | Yes | Content Master + Brochure | Live |
| `/faq` | FAQ \| Nepal Electric, Power and Lights Expo 2026 | Index | `/faq` | Yes | Content Master | Live |
| `/why-exhibit` | Why Exhibit \| Nepal Electric, Power and Lights Expo 2026 | Index | `/why-exhibit` | Yes | Content Master | Live |
| `/exhibitor-profile` | Exhibitor Profile \| Nepal Electric, Power and Lights Expo | Index | `/exhibitor-profile` | Yes | Brochure (canonical 6-sector taxonomy) | Live |
| `/exhibitor-categories` | Exhibitor Categories \| Nepal Electric, Power and Lights Expo | Index | `/exhibitor-categories` | Yes | Brochure | Live |
| `/book-a-stand` | Book a Stand \| Nepal Electric, Power and Lights Expo 2026 | Index | `/book-a-stand` | Yes | Content Master | Live (form) |
| `/exhibitor-faq` | Exhibitor FAQ \| Nepal Electric, Power and Lights Expo 2026 | Index | `/exhibitor-faq` | Yes | Content Master | Live |
| `/why-visit` | Why Visit \| Nepal Electric, Power and Lights Expo 2026 | Index | `/why-visit` | Yes | Content Master | Live |
| `/visitor-profile` | Visitor Profile \| Nepal Electric, Power and Lights Expo | Index | `/visitor-profile` | Yes | Content Master + PSR | Live |
| `/register-to-visit` | Register to Visit \| Nepal Electric, Power and Lights Expo 2026 | Index | `/register-to-visit` | Yes | Content Master | Live (form) |
| `/plan-your-visit` | Plan Your Visit \| Nepal Electric, Power and Lights Expo 2026 | Index | `/plan-your-visit` | Yes | Content Master | Live |
| `/visitor-faq` | Visitor FAQ \| Nepal Electric, Power and Lights Expo 2026 | Index | `/visitor-faq` | Yes | Content Master | Live |
| `/past-editions/2025-edition` | 2025 Edition \| Nepal Electric, Power and Lights Expo | Index | `/past-editions/2025-edition` | Yes | PSR | Live |
| `/past-editions/post-show-statistics` | Post-Show Statistics \| Nepal Electric, Power and Lights Expo | Index | `/past-editions/post-show-statistics` | Yes | PSR | Live |
| `/past-editions/photo-gallery` | Photo Gallery \| Nepal Electric, Power and Lights Expo | Index | `/past-editions/photo-gallery` | Yes | PSR (photography) | Live |
| `/past-editions/media-coverage` | Media Coverage \| Nepal Electric, Power and Lights Expo | Index | `/past-editions/media-coverage` | Yes | PSR | Live |
| `/news` | News \| Nepal Electric, Power and Lights Expo 2026 | Index | `/news` | Yes | Content Master | Live |
| `/press-releases` | Press Releases \| Nepal Electric, Power and Lights Expo | Index | `/press-releases` | Yes | Content Master | Live |
| `/media-enquiry` | Media Enquiry \| Nepal Electric, Power and Lights Expo 2026 | Index | `/media-enquiry` | Yes | Content Master | Live (form) |
| `/downloads` | Downloads \| Nepal Electric, Power and Lights Expo 2026 | Index | `/downloads` | Yes | Content Master | Live |
| `/downloads/2026-event-brochure` | 2026 Event Brochure \| Nepal Electric, Power and Lights Expo | Index | `/downloads/2026-event-brochure` | Yes | Brochure | Live |
| `/downloads/2025-post-show-report` | 2025 Post-Show Report \| Nepal Electric, Power and Lights Expo | Index | `/downloads/2025-post-show-report` | Yes | PSR | Live |
| `/contact` | Contact \| Nepal Electric, Power and Lights Expo 2026 | Index | `/contact` | Yes | Content Master | Live (form) |
| `/privacy-policy` | Privacy Policy \| Nepal Electric, Power and Lights Expo | Index | `/privacy-policy` | Yes | Content Master (verbatim policy) | Live — pending legal review |
| `/terms-and-conditions` | Terms and Conditions \| Nepal Electric, Power and Lights Expo | Index | `/terms-and-conditions` | Yes | Content Master (verbatim policy) | Live — pending legal review |
| `/cookie-policy` | Cookie Policy \| Nepal Electric, Power and Lights Expo | Index | `/cookie-policy` | Yes | Content Master (verbatim policy) | Live — pending legal review |
| `/accessibility` | Accessibility \| Nepal Electric, Power and Lights Expo | Index | `/accessibility` | Yes | Content Master (verbatim policy) | Live — pending legal review (form) |
| `/disclaimer` | Disclaimer \| Nepal Electric, Power and Lights Expo | Index | `/disclaimer` | Yes | Content Master (verbatim policy) | Live — pending legal review |
| `/sitemap` (HTML) | Sitemap \| Nepal Electric, Power and Lights Expo | Index | `/sitemap` | Yes | Generated from `nav.ts` | Live |
| `/search` | Search \| Nepal Electric, Power and Lights Expo | **Noindex** | `/search` | No | N/A (utility page) | Live |
| `/404` (`not-found.tsx`) | Page Not Found \| Nepal Electric, Power and Lights Expo | **Noindex** | N/A | No | N/A (utility page) | Live |
| `/admin`, `/admin/[module]` | (internal, gated) | **Noindex** (disallowed in robots.txt) | N/A | No | N/A | Live — requires Supabase to unlock |
| `/dashboard` | (internal, gated) | **Noindex** | N/A | No | N/A | Live — minimal shell, requires Supabase |
| `/login` | (internal, gated) | Disallowed in robots.txt | N/A | No | N/A | Live — requires Supabase to unlock |
| `/api/*` (6 routes) | N/A (JSON endpoints) | Disallowed in robots.txt | N/A | No | N/A | Live |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image` | N/A (generated files) | N/A | N/A | N/A | N/A | Live |

**Totals:** 49 routes total → 34 public content pages + 6 API routes + 4 auth/admin utility routes
(`/admin`, `/admin/[module]`, `/dashboard`, `/login`) + 1 not-found handler + 4 generated technical
endpoints (`sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `opengraph-image`). The build's
"Generating static pages (50/50)" counter includes `favicon.ico` (a metadata convention file from
`src/app/favicon.ico`, not displayed in the route tree).

**Deliberately not built** (no verified data — see `docs/FILE_INVENTORY.md` and
`docs/FINAL_AUDIT_REPORT.md` §3): `/exhibitors` directory, individual exhibitor profile pages, individual
news-article pages beyond the one confirmed announcement, individually-sourced media-coverage articles.
