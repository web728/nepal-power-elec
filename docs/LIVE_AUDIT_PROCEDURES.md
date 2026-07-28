# Live Audit Procedures

**Status: no public preview URL exists yet.** This document is the exact procedure to run once one does
(a Vercel preview URL or the final production domain) — it intentionally contains **no fabricated
scores**. Every row below should be filled in with a real, dated, measured result after deployment, not
an estimate. Until then, treat every target as "pending deployment."

## How to run each audit

| Tool | How to run it | What to record |
|---|---|---|
| **Lighthouse (mobile)** | Chrome DevTools → Lighthouse tab → Device: Mobile → Categories: all → Analyze. Or CLI: `npx lighthouse <URL> --preset=mobile --output=json --output-path=./lighthouse-mobile.json` | Performance, Accessibility, Best Practices, SEO scores; LCP, INP (or TBT as a proxy in lab data), CLS |
| **Lighthouse (desktop)** | Same DevTools panel → Device: Desktop. Or CLI: `npx lighthouse <URL> --preset=desktop --output=json --output-path=./lighthouse-desktop.json` | Same four scores + Core Web Vitals |
| **axe accessibility** | Install the [axe DevTools browser extension](https://www.deque.com/axe/devtools/), open it on each key page, click **Scan** | Number of violations by severity (critical/serious/moderate/minor), and the specific rule IDs |
| **W3C HTML validation** | [validator.w3.org](https://validator.w3.org/) → "Validate by URI" → enter `<URL>` (repeat for a few key templates: homepage, a form page, a legal page) | Errors and warnings list |
| **Google Rich Results Test** | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) → enter `<URL>` | Detected structured data types (Event, Organization, BreadcrumbList, FAQPage) and any errors/warnings |
| **PageSpeed Insights** | [pagespeed.web.dev](https://pagespeed.web.dev/) → enter `<URL>` | Field data (if enough real traffic exists) and lab data — same Core Web Vitals as Lighthouse but from Google's infrastructure |
| **SSL test** | [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/) → enter your domain | Overall grade (A/A+ expected on Vercel's default TLS config), protocol/cipher support, certificate chain validity |
| **Security-header test** | [securityheaders.com](https://securityheaders.com/) → enter `<URL>`, or `curl -sI <URL>/` locally (see `docs/PRODUCTION_TEST_PLAN.md` §22) | Grade and which of the 6 configured headers are detected |
| **Broken-link scan** | `npx linkinator <URL> --recurse` (crawls the whole site following internal links) | Any non-200 internal link, with the source page and target URL |
| **Sitemap validation** | [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html) → enter `<URL>/sitemap.xml`, or just confirm `curl -s <URL>/sitemap.xml \| xmllint --noout -` exits 0 | Valid/invalid, entry count |
| **robots.txt validation** | Google Search Console's robots.txt report (after verifying the property), or manually diff against `docs/PRODUCTION_TEST_PLAN.md` §13's expected content | Match/mismatch |

## Targets (from the master brief — record actual measured numbers against these once live)

| Metric | Target | Measured result | Date |
|---|---|---|---|
| Critical accessibility errors (axe) | 0 | _pending deployment_ | |
| Broken internal links | 0 | _pending deployment_ | |
| Invalid Event structured data (Rich Results Test) | 0 errors | _pending deployment_ | |
| Admin/private pages indexed (Search Console "Coverage") | 0 | _pending deployment_ | |
| Exposed secrets (re-run the scan in `docs/SECURITY_REMEDIATION_REPORT.md` against the deployed bundle) | 0 | _pending deployment_ | |
| LCP (mobile, 75th percentile) | < 2.5s | _pending deployment_ | |
| INP (mobile, 75th percentile) | < 200ms | _pending deployment_ | |
| CLS (mobile, 75th percentile) | < 0.1 | _pending deployment_ | |

## What has already been verified pre-deployment (not a substitute for the above, but a head start)

- **Structured data validity**: all JSON-LD blocks confirmed to parse as valid JSON with correct `@type`
  values against the local dev server (`docs/FINAL_AUDIT_REPORT.md` §2) — the *content* is already right;
  the Rich Results Test against a live URL additionally confirms Google can actually crawl and parse it
  in context.
- **Security headers**: confirmed present via curl against both dev and a local production build
  (`docs/VERCEL_DEPLOYMENT_GUIDE.md`) — the securityheaders.com test against the live domain is the
  final confirmation once real HTTPS/CDN is in front of it.
- **No secrets in the repository or git history**: confirmed via `docs/SECURITY_REMEDIATION_REPORT.md`
  and the Phase 4 scan (`docs/FINAL_RELEASE_NOTES.md` references this) — rerunning a scan against the
  deployed build output is still worthwhile since a build step could theoretically inline something
  unexpected (unlikely here, since no secrets exist to inline, but cheap to re-verify).
- **No admin/private pages in the sitemap**: confirmed by inspecting `src/app/sitemap.ts`'s route list
  directly (`docs/ROUTE_TABLE.md`) — Search Console's own crawl report after real indexing is the final
  confirmation that Google respects `robots.txt`'s disallow rules as expected.

## Recording results

When you run these for real, replace this file's "_pending deployment_" placeholders with the actual
measured values, the date, and a link/screenshot reference to the tool's report where practical. Do not
mark `docs/LAUNCH_CHECKLIST.md`'s Performance/Accessibility/Security sections complete until this table
is filled in with real numbers meeting the targets above.
