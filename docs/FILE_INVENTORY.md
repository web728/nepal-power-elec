# Source File Inventory & Asset Classification

Source folder reviewed: `D:\Claud Work\nepal power elec site new 2026\` (13 files). Every file was opened and its actual contents inspected — classification below is based on content, not filename.

## Quick-reference table

| Original file | Actual file identity | Corrected title | Used? | Archived? | Rejected? | Reason for rejection | Production filename |
|---|---|---|---|---|---|---|---|
| `5th-...-Broucher.pdf` | Official 2026 event brochure | 5th Nepal Electric, Power and Lights International Expo 2026 — Official Brochure | Yes | Original kept in source folder | No | — | `Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf` |
| `5th-...-PSR.pdf` | Official 2025 (4th edition) post-show report | 4th Nepal Electric, Power and Lights International Expo 2025 — Post-Show Report | Yes | Original kept in source folder | No | — | `Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf` |
| `Nepal_Electric_..._Full_Website_Content.pdf` | 2026 website copy master | Full Website Content — Final Publication Edition | Yes, as copy source | Yes, `docs/archive/` | No | — | N/A (not a public asset) |
| `Nepal_Expo_2026_Website_Design_..._Specification.pdf` | Technical/UX build specification | Website Design & Development Specification | Yes, as build spec | Yes, `docs/archive/` | Partially — its proposed color/type system was **not** used | Overridden by the Branding Guidelines PDF per the Brand Authority Order (see conflict #2) | N/A (not a public asset) |
| `Nepal_Expo_2026_AI_Website_Build_Prompt_Playbook.pdf` | AI build-agent prompt sequence | AI Website Build Prompt Playbook | Yes, as sequence reference | Yes, `docs/archive/` | No | — | N/A (not a public asset) |
| `5th-Nepal-Electric-Logo main expo logo.png` | Official 2026 event wordmark | 5th Nepal Electric, Power and Lights International Expo — Primary Logo | Yes | Copied to `public/` | No | — | `nepal-electric-power-lights-expo-2026-primary-logo.png` |
| `Branding Guidelines-1.pdf` | Brand guide (colors/type/logo rules) — cover slide reads "2nd edition/2023" | Nepal Electric, Power and Lights Expo — Branding Guidelines | Yes, as binding rules | Yes, `docs/archive/` | No | — | N/A (rules document, not published) |
| `nepal-electric-slider-post.gif` | Official 2026 promo social post (5 frames, real 2025 photos) | 2026 Promotional Social Post | Used as reference only | Not copied into `public/` | No | — | N/A |
| `organisers logo jpg.jpg` | Approved combined 3-organizer lockup | Organized Jointly By — Lockup | Yes | Copied to `public/` | No | — | `nepal-expo-2026-organizers-lockup.jpg` |
| `]organisers logo.png` | **Exact duplicate** of the file above | (duplicate) | No | No | Yes | Byte-identical duplicate of an already-used file | N/A |
| `futurex-logo.png.png` | Standalone Futurex wordmark | Futurex Trade Fair and Events — Logo | Yes | Copied to `public/` | No | — | `futurex-trade-fair-events-logo.png` |
| `ChatGPT Image Jul 8... 03_41_29 PM.png` | AI-generated abstract decorative pattern | Decorative Background Texture A | Optional/not used in final build | Not copied into `public/` | No | Decorative-only asset, not required by any built page | N/A |
| `ChatGPT Image Jul 8... 04_05_29 PM.png` | AI-generated abstract decorative pattern | Decorative Background Texture B | Optional/not used in final build | Not copied into `public/` | No | Same as above | N/A |
| `5th-Home-Appliances- concurrent event logo.png` | Artwork reads "**4th Edition**" (2025) despite "5th" filename | Nepal Consumer Electronics & Home Appliances Expo — 4th Edition (2025) Logo | **No** | No | **Yes** | Filename claims 2026 but content is unverified 2025 material; no 2026 co-located show is confirmed anywhere in the brochure, content master, or build prompt — publishing it would fabricate a 2026 event | N/A |

## Detailed narrative inventory

| # | Original filename | Actual contents | Type | Edition / date | Authority | Current or historical | Approved for public use | Rename? | Disposition |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `5th-Nepal-Electric-Power-Lights-international-Expo-2026-Broucher.pdf` | 8-page marketing brochure: cover, About, Focusing Sectors, opportunities, Why Exhibit/Visit, Exhibitors Profile, Visitors Profile, Venue+organizer lockup | Official 2026 brochure | 5th edition, 4–6 Sept 2026 | **Highest** for event facts/sectors (per brand & factual authority order) | Current | Yes | Yes → `Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf` | **Use** — copied to `public/downloads/`, original untouched in source folder |
| 2 | `5th-Nepal-Electric-Power-Lights-international-Expo-2026-PSR.pdf` | 10-page post-show report: opening ceremony, visitor statistics, business intent/company size, survey findings, exhibitor feedback, media coverage clippings, exhibition photo glimpses, "mark your presence" 2026 teaser | Official 2025 post-show report | **4th edition, 29–31 Aug 2025** (filename says "2026" but content is entirely about the 2025 show — filename does not match content) | High, for 2025 historical facts | Historical (2025) | Yes, with 2025 labelling | Yes → `Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf` | **Use** — copied to `public/downloads/`, original untouched |
| 3 | `Nepal_Electric_Power_Lights_Expo_2026_Full_Website_Content.pdf` | 54-page "Full Website Content — Final Publication Edition": complete page-by-page copy, 4 form field groups, 5 legal policies verbatim, FAQs, SEO metadata for every page | Content master / copy source | 2026 site content | Highest for page copy/wording (content authority order) | Current | Internal — not published as a file | No | **Use as copy source only**, archived at `docs/archive/` |
| 4 | `Nepal_Expo_2026_Website_Design_Development_Specification.pdf` | 30-page technical/UX spec: IA, color/type system, components, breakpoints, CMS capability requirements, forms/security/SEO/performance/accessibility/QA rules | Design & dev specification | 2026 build spec | Governs structure/tech/QA (not brand color/type — see conflict log) | Current | Internal | No | **Use as build spec**, archived at `docs/archive/` |
| 5 | `Nepal_Expo_2026_AI_Website_Build_Prompt_Playbook.pdf` | 22-page prompt sequence for an AI build agent (40 prompts across 5–9 phase groupings) | Build playbook | 2026 build process | Governs implementation sequence only | Current | Internal | No | **Use as sequence reference**, archived at `docs/archive/` |
| 6 | `5th-Nepal-Electric-Logo main expo logo.png` | The actual "5th NEPAL ELECTRIC, POWER AND LIGHTS INTERNATIONAL EXPO" wordmark, transparent PNG | Official event logo | 5th edition / 2026 | Highest (brand authority #2) | Current | Yes | Yes → `nepal-electric-power-lights-expo-2026-primary-logo.png` | **Use** — primary logo everywhere |
| 7 | `Nepal Electric, Power and Lights International Expo Branding Guidelines-1.pdf` | 14-slide brand guide: color gamut (Sky #35A8E0 / Yellow #EBBC17 / Teal #05756A), Poppins-only typography, logo clear-space/do's-and-don'ts, 4 approved organizer-lockup variants, tone of voice, image-rights guidance. **Cover slide is branded "2nd Nepal Electric... International Expo 2023"** — i.e. this is the *2nd edition (2023)* brand guide, reused as the template for later editions. | Branding guidelines | Originally authored for 2nd edition (2023); reused per the task instruction "branding old but follow this" | **Highest** for all color/typography/logo-usage decisions | Historical document, current instructions | Yes, as a rules document (not as a 2023-dated visual to publish) | No rename (internal reference) | **Follow exactly** for colors/type/logo rules; do not publish the document itself |
| 8 | `nepal-electric-slider-post.gif` | 5-frame, 1080×1080 animated social post: "5th Nepal Electric... 04–06 September 2026... Register Now... Organised by Futurex \| ETSIPL \| mediaspace," using real 2025-edition exhibition-floor photos | Approved current (2026) promotional asset, containing 2025 photography | 2026 promo / 2025 photo content |  | Both — current promo wrapper around historical photos | Yes, with 2025 photo captioning | No rename needed | **Use** social frames as reference; note it also contains the phrase "Nepal's Largest Tradeshow," which is **excluded from site copy** per the master prompt's explicit ban on unverified superlative claims |
| 9 | `organisers logo jpg.jpg` | Combined lockup: Futurex \| ETSIPL \| mediaspace, horizontal, on white | Approved organizer lockup (one of 4 official variants shown in the brand guide) | Current | High (brand authority #3) | Current | Yes | Yes → `nepal-expo-2026-organizers-lockup.jpg` | **Use** as the "Organised By" graphic (footer/homepage) |
| 10 | `]organisers logo.png` | **Identical image** to file #9 (same lockup, PNG instead of JPG; stray `]` character in filename is a typo) | Duplicate of #9 | Current | — | Current | Yes | N/A | **Duplicate — ignore.** Only #9 copied into the project |
| 11 | `futurex-logo.png.png` | Standalone Futurex wordmark ("Let's Build the Future Together"), transparent PNG. Double `.png` extension is a filename artifact. | Individual organizer logo | Current | High | Current | Yes | Yes → `futurex-trade-fair-events-logo.png` | **Use** where an individual organizer mark is needed |
| 12 | `ChatGPT Image Jul 8, 2026, 03_41_29 PM.png` | AI-generated abstract geometric background pattern (plug/bulb/wind-turbine icon collage in brand green/blue/yellow) — no people, no logos, matches the branding guide's own decorative pattern style | AI-generated decorative background asset | 2026 | Low — decorative only | Current | Conditionally — decorative section backgrounds only, never as "photography" or implying real people/exhibitors | Optional rename if used | **Optional use** as a subtle section-background texture only; not used as hero/gallery "photography" |
| 13 | `ChatGPT Image Jul 8, 2026, 04_05_29 PM.png` | Same as #12: AI-generated abstract corner/border decorative pattern, brand colors | AI-generated decorative background asset | 2026 | Low — decorative only | Current | Conditionally, same as #12 | Optional | **Optional use**, same basis as #12 |
| 14 | `5th-Home-Appliances- concurrent event logo.png` | Logo artwork reads **"4th Edition — Nepal Consumer Electronics & Home Appliances Expo"** — i.e. despite the filename saying "5th," the actual embedded text is the **4th edition (2025)** co-located show's logo | Historical concurrent-event logo, **mislabeled by filename** | Filename claims 5th/2026; actual content is 4th/2025 | Low — not corroborated elsewhere | **Historical (2025) only** | **No** — not used as 2026 identity | N/A | **Excluded from the 2026 site.** No concurrent "Home Appliances" show is confirmed for 2026 anywhere in the brochure, content master, or build prompt; publishing this would imply a 2026 co-located event that is not verified. Flagged in the conflict log below. |

## Conflicts found and resolutions applied

1. **Concurrent-event logo mismatch (file #14).** Filename says "5th" (2026) but the artwork itself says "4th Edition" (2025), and no 2026 brochure, content-master, or build-prompt page confirms a co-located Home Appliances show for 2026. **Resolution: excluded** from the 2026 site entirely (no fabricated co-located event), per the master prompt's explicit "do not fabricate confirmed product launches / do not use historical branding as primary 2026 identity" rules.
2. **Design Spec color/type system vs. Branding Guidelines.** The Website Design & Development Specification proposes its own palette (Navy #071B33, Electric Blue #0A66FF, Cyan #00A9CE, Amber #F5B400) and "Inter" typography. The Branding Guidelines PDF specifies Sky #35A8E0, Yellow #EBBC17, Teal #05756A and Poppins-only typography, and states "no font other than the above-mentioned font should be used." **Resolution: Branding Guidelines wins** — per the master prompt's own Brand Authority Order, the Branding Guidelines PDF outranks the Design/Development Specification for "official colors, color values... typography." The Design Spec's *structural* rules (breakpoints, spacing scale, component behavior, motion durations, grid) are still followed, since those aren't brand decisions.
3. **"Electro Energetics" sector naming.** This term appears in the actual 2026 brochure (Focusing Sectors and Exhibitors Profile) but was dropped/renamed in some pages of the Content Master PDF. **Resolution:** the brochure's 6-category Exhibitor Profile taxonomy (Power & Energy · Transmission & Distribution Equipment · Electricals & Electronics · Lighting · Home Appliances · Electro Energetics) is used as the canonical sector list site-wide, per the factual authority order ranking the brochure above the Content Master PDF.
4. **"Nepal's Largest Tradeshow" claim.** This phrase appears in the organizer's own 2026 promotional GIF (file #8), but the master build prompt explicitly bans unverified superlative claims ("Nepal's largest," "number one," etc.) unless independently supported. **Resolution:** excluded from site copy; the site instead uses the organizer-reported 2025 figures (150+ exhibitors, 5+ countries, 15,000+ visitors) with explicit "organizer-reported" labeling.
5. **Named minister attribution (Damodar Bhandari).** The PSR itself (page 2) states the 2025 opening ceremony was attended by "Hon. Damodar Bhandari, Minister of Industry, Commerce & Supplies, Government of Nepal." **Resolution:** used exactly as attributed to the organizer's own report on the historical 2025 Edition page only, not presented as a current/2026 claim.
6. **Missing standalone ETSIPL / Media Space logos.** Only a combined 3-logo lockup graphic was supplied (in 4 layout variants, per the brand guide) — no individual ETSIPL or Media Space files exist. **Resolution:** the approved combined lockup graphic is used wherever the three organizers are shown together (footer, homepage, Organizers page); it is not cropped or redrawn. The one available individual mark (Futurex) is used only where the design genuinely needs a single-organizer treatment.

## Directory structure created

```
public/downloads/   Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf
                    Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf
public/images/brand/event/        nepal-electric-power-lights-expo-2026-primary-logo.png
public/images/brand/organizers/   nepal-expo-2026-organizers-lockup.jpg
                                   futurex-trade-fair-events-logo.png
public/images/gallery/2025/       nepal-electric-expo-2025-glimpses-01.webp
                                   nepal-electric-expo-2025-glimpses-02.webp
docs/archive/branding-source/     Branding Guidelines PDF (reference copy)
```

Original source files in `D:\Claud Work\nepal power elec site new 2026\` were **not modified or deleted** — all copies above are new files.

## Visual-polish pass — new source files added

| File | Purpose | Notes |
|---|---|---|
| `src/components/ui/interactive-image-accordion.tsx` | Horizontal expanding panel accordion (desktop) / stacked expanding cards (mobile) | Client component, ~160 lines, CSS transitions only |
| `src/components/ui/lamp.tsx` | CSS gradient lamp-beam reveal animation | Client component, ~140 lines, IntersectionObserver trigger |
| `src/components/ui/animated-counter.tsx` | Count-up animation for statistics values | Client component, requestAnimationFrame with cubic ease-out |
| `src/components/sections/sectors-accordion.tsx` | Server component wrapper for accordion with heading/CTA | Wraps the client accordion component |
| `src/components/sections/sectors-accordion-client.tsx` | Client component with 5 sector data items | Power & Energy, T&D, Wires/Cables/Electricals, Renewable Energy, LED/Lighting/Smart Technology |
| `src/components/sections/lamp-cta.tsx` | Lamp section with heading, copy, date/venue, and two CTAs | Uses the Lamp UI component |
| `src/lib/hooks/use-reduced-motion.ts` | SSR-safe `prefers-reduced-motion` hook | Uses `useSyncExternalStore` (avoids React Compiler lint errors) |
| `src/lib/hooks/use-media-query.ts` | SSR-safe media query hook | Uses `useSyncExternalStore`, shared across components |
| `src/lib/visual-polish.test.ts` | 23 automated tests for visual-polish components | Accordion items/titles/a11y, lamp content/CTAs, homepage layout, dependency guardrails |

### Existing files modified (visual polish only — no content or logic changes)

| File | Change |
|---|---|
| `src/app/page.tsx` | Added SectorsAccordion and LampCta imports + JSX placement |
| `src/components/sections/hero.tsx` | Radial gradient accent, yellow date-bar stripe, button shadow |
| `src/components/sections/stats-section.tsx` | "2025 Edition Results" eyebrow, AnimatedCounter, larger typography |
| `src/components/sections/quick-action-cards.tsx` | Negative margin hero overlap, per-card accent colors |
| `src/components/sections/gallery-section.tsx` | Hover zoom effect on images |
| `src/components/sections/downloads-section.tsx` | Hover shadow transition |
| `src/components/sections/organizers-section.tsx` | Card styling improvements |
| `src/components/sections/final-cta.tsx` | Radial gradient accent, button shadow |
| `src/components/sections/benefit-section.tsx` | Increased section spacing |
| `src/components/sections/event-overview.tsx` | Increased section spacing |
