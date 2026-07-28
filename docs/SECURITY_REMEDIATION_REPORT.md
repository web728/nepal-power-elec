# Security Remediation Report

## Summary

**Before:** 12 high-severity `npm audit` findings.
**After:** 3 production-relevant packages (`next`, `sharp`, `postcss`) fully remediated — **0 findings**
remain against any package that ships to production or runs at runtime. **9 findings remain**, all
confined to the ESLint dev-tooling chain (a devDependency that never ships to production or executes at
runtime) — evaluated and accepted as a documented, non-blocking risk (see "Remaining accepted risk"
below), because the only available fix (a major ESLint version bump) was tested and confirmed to break
the lint toolchain.

## Original vulnerabilities (12 total, all "high" severity, 0 critical)

| Package | Direct/Transitive | Via | Production-relevant? |
|---|---|---|---|
| `next` | Direct | Advisory covers Middleware/Proxy bypass, DoS in Server Actions, SSRF in Server Actions, cache confusion, unbounded Server Action payload, SSRF in rewrites, DoS in Image Optimization (SVG), unauthenticated Server Function endpoint disclosure | **Yes** — the framework itself |
| `sharp` (nested inside `next`'s own dependencies, plus the top-level copy) | Transitive (via `next`) + top-level | libvips CVEs (CVE-2026-33327, -33328, -35590, -35591) | **Yes** — used by `next/image` |
| `postcss` (nested inside `next`'s own dependencies) | Transitive (via `next`) | XSS via unescaped `</style>`, arbitrary file read via `sourceMappingURL`, path traversal in source-map auto-loading | **Yes** — used by the CSS build pipeline |
| `eslint` | Direct (devDependency) | — | No — dev-only, never ships to production |
| `eslint-config-next` | Direct (devDependency) | — | No — dev-only |
| `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react` | Transitive (via `eslint-config-next`) | — | No — dev-only |
| `@eslint/config-array`, `@eslint/eslintrc`, `minimatch`, `brace-expansion` | Transitive (via `eslint`) | `brace-expansion`: DoS via unbounded expansion length | No — dev-only |

## Exploitability analysis performed in this project's actual configuration

Before remediating, I checked whether this project's code actually uses the vulnerable feature surfaces
that the `next` advisories describe, since several apply only to specific, opt-in features:

- **No `middleware.ts`/`proxy.ts` exists** → the Middleware/Proxy bypass advisory does not apply.
- **No `"use server"` Server Actions are used anywhere** (all 6 forms submit to explicit API routes
  instead) → the Server Actions DoS/SSRF/unbounded-payload/endpoint-disclosure advisories do not apply.
- **No `rewrites()` are configured in `next.config.ts`** → the SSRF-via-rewrites advisory does not apply.
- **No custom server** (`server.js`/`server.ts`) exists → the custom-server SSRF advisory does not apply.
- **No SVGs are ever passed through `next/image`** (logos are PNG, gallery photos are WebP) → the
  Image-Optimization-API-via-SVG DoS advisory does not apply.
- **No form accepts a file upload** — all 6 forms are text/select/checkbox fields only (see
  `docs/FORM_TABLE.md`) — so no attacker-controlled image ever reaches `sharp`'s image-processing code
  path in this application; the `sharp`/libvips CVEs require a malicious input image to trigger.

**Conclusion:** even before the version upgrade below, this project's actual usage pattern was not
exposed to most of the specific `next` CVEs in the advisory range. The upgrade was still performed as
defense-in-depth and because it was available with zero breaking changes.

## Remediation performed

1. **`next`: `16.2.10` → `16.2.12`** (patch upgrade, `16.2.12` is the current latest **stable** release —
   `16.3.0` exists only as unreleased preview/canary builds, which are not appropriate for production).
   This alone did not fully resolve the nested `sharp`/`postcss` copies bundled inside `next`'s own
   `node_modules`, because npm's dependency resolution had pinned those nested copies independently.
2. **Added `overrides` to `package.json`** forcing every nested resolution of `sharp` and `postcss`
   (including the copies bundled inside `next`) to the already-patched top-level versions:
   ```json
   "overrides": { "sharp": "^0.35.3", "postcss": "^8.5.23" }
   ```
   Verified via `npm ls sharp postcss next` that all three package trees now dedupe to the patched
   versions with no stale nested copies remaining.
3. **`eslint-config-next`: `16.2.10` → `16.2.12`** (patch upgrade, matches the `next` version — a
   sensible, expected pairing; the `12.0.4` "fix" that `npm audit`'s own auto-suggestion proposed was
   incorrect — that version number is *older* than what was already installed and would have been a
   downgrade, not a fix).
4. **Attempted `eslint@9 → 10.8.0`** (the only path `npm audit` reports for the remaining 9 findings).
   Installed it, ran `npm run lint`, and it **crashed** with `TypeError:
   contextOrFilename.getFilename is not a function` inside `eslint-config-next`'s bundled
   `eslint-plugin-react` — a real incompatibility between ESLint 10's new rule-context API and the
   version of `eslint-plugin-react` that ships nested inside the current `eslint-config-next`. **Reverted
   to `eslint@^9`** per the instruction not to accept a forced/major upgrade without first verifying it
   doesn't break anything — it did, so it was not kept.

## Final package versions

| Package | Before | After |
|---|---|---|
| `next` | 16.2.10 | **16.2.12** |
| `sharp` (top-level + all nested copies) | 0.35.3 top-level / 0.34.5 nested inside `next` | **0.35.3 everywhere** (deduped via override) |
| `postcss` (all copies) | 8.5.23 top-level / 8.4.31 nested inside `next` | **8.5.23 everywhere** (deduped via override) |
| `eslint-config-next` | 16.2.10 | **16.2.12** |
| `eslint` | ^9 | **^9** (unchanged — 10.x tested and reverted, see above) |

## Remaining accepted risk

**9 high-severity findings remain, 100% confined to the ESLint dev-tooling dependency chain**
(`eslint`, `eslint-config-next`, and their nested `eslint-plugin-*`/`minimatch`/`brace-expansion`/
`@eslint/*` dependencies). These packages:
- Are `devDependencies` only — never installed in a production deployment (`npm install --production` /
  Vercel's production install would not include them), never imported by any file under `src/`, and never
  execute at runtime in the deployed application.
- Only run locally/in CI when a developer executes `npm run lint`.
- Have exactly one available fix path (`eslint@10.8.0`), which was tested and **confirmed to break the
  lint toolchain** against the current `eslint-config-next` release.

**Risk assessment: not production-relevant.** This is accepted as a known item to revisit — re-attempt
the `eslint@10` upgrade once `eslint-config-next` ships a release compatible with ESLint 10's rule-context
API (check `npm view eslint-config-next versions` periodically, or watch the Next.js release notes).

## Final `npm audit` result

```
9 high severity vulnerabilities (all devDependency-only, ESLint toolchain — see above)
0 vulnerabilities in any production-relevant package (next, sharp, postcss, react, zod, resend,
  @supabase/*, lucide-react, qrcode, clsx, tailwind-merge — all clean)
0 critical, 0 moderate, 0 low
```

## Post-remediation verification

- `npm install` — clean, no errors.
- `npm run build` — ✅ all 49 routes compiled successfully, no regressions from the version bumps or the
  `overrides` entries.
- `npm run lint` — ✅ 0 errors, 0 warnings.
- `npm test` — ✅ 31/31 automated tests passing.

**This project's production dependency surface (everything that actually ships and runs in the deployed
site) carries zero known high or critical vulnerabilities as of this report.** The remaining 9 findings
are exclusively in a dev-only linting tool that is never installed or executed in production.
