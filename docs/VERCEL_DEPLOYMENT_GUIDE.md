# Vercel Deployment Guide

Vercel is used because this is a standard Next.js 16 App Router application with zero custom-server
requirements — Vercel is built by the Next.js team and auto-detects everything below with no extra
configuration beyond what's already committed to this repository.

## What's already verified/configured in this repository

- **Build command**: `npm run build` — verified passing (all 49 routes) as of `docs/FINAL_AUDIT_REPORT.md`.
- **Output**: standard `.next` directory (Vercel's default `outputDirectory`, also set explicitly in
  `vercel.json`).
- **Node.js version**: `package.json` now declares `"engines": { "node": ">=20.0.0" }` — Vercel reads
  this and provisions a matching Node runtime automatically.
- **Environment variables**: none are required for the site to build or run (demo mode) — see
  `ENVIRONMENT_SETUP.md` for the full optional list to add for production behavior.
- **Redirects**: `next.config.ts` has an empty `redirects()` function ready for future use — no legacy
  URLs exist yet since this is a new site.
- **Security headers**: `next.config.ts`'s `headers()` function applies `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, and a
  `Content-Security-Policy` to every route — curl-verified present on responses. A moderate
  `Cache-Control` is set on the two PDF downloads specifically (1 hour, `must-revalidate`) so a
  content-admin's file replacement (see `CONTENT_ADMIN_GUIDE.md`) isn't hidden by an over-long cache.
- **Canonical URL handling**: every page sets `alternates.canonical` in its `metadata` export (see
  `docs/ROUTE_TABLE.md`), built from `siteConfig.siteUrl` — set `NEXT_PUBLIC_SITE_URL` to your real
  domain so these (and the sitemap, OG tags, and JSON-LD) all point at production instead of the default.
- **Sitemap base URL / robots.txt**: both `src/app/sitemap.ts` and `src/app/robots.ts` read
  `siteConfig.siteUrl` — same `NEXT_PUBLIC_SITE_URL` dependency as above. Verified via curl (see
  `docs/FINAL_AUDIT_REPORT.md`) that `robots.txt` correctly disallows `/admin`, `/dashboard`, `/login`,
  `/search`, `/api`.
- **Open Graph URLs / dynamic OG image**: `src/app/opengraph-image.tsx` generates a 1200×630 image at
  request time with zero external dependencies (pure `ImageResponse` JSX) — works identically on Vercel's
  Edge/Node runtime with no extra config.
- **PDF download URLs**: `/downloads/Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf` and
  `/downloads/Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf` are static files under
  `public/downloads/` — served as-is by Vercel's CDN, no configuration needed.
- **Image configuration**: all images are local (`public/images/...`), so no `next.config.ts`
  `images.remotePatterns` entries are needed — nothing external to allow-list.
- **Function limits**: `vercel.json` sets `maxDuration: 15` seconds for the 6 form API routes (generous
  for a validate → insert → send-email flow; Vercel's default for Node functions is usually sufficient,
  this just makes the intent explicit).
- **Error logging**: `console.error(...)` calls throughout the API routes and email helpers
  (`src/lib/db.ts`, `src/lib/email/send.ts`) surface directly in Vercel's **Logs** tab — no separate
  logging service is wired up (not required for this scale; consider Vercel's log drains or a service
  like Sentry if/when the team wants alerting).

## Step-by-step deployment

### 1. GitHub repository creation

If the code isn't already in a Git remote:
```bash
cd "path/to/nepal-power-elec-expo-2026"
git init                    # skip if already initialized
git add -A
git commit -m "Initial commit"
```
Create an empty repository on [github.com/new](https://github.com/new) (recommend **private** — set to
public later only if/when the organizers want the source visible), then:
```bash
git remote add origin https://github.com/<your-org>/<repo-name>.git
git branch -M main
git push -u origin main
```

### 2. Repository push

Already covered above. For subsequent changes: `git add -A && git commit -m "..." && git push`.

### 3. Vercel import

1. Go to [vercel.com/new](https://vercel.com/new) and sign in (GitHub sign-in is easiest — it lets Vercel
   list your repos directly).
2. Select the repository you just pushed.
3. Vercel auto-detects **Next.js** as the framework — leave the build/output settings as detected
   (they match `vercel.json`).

### 4. Environment-variable setup

Before or right after the first deploy, go to **Project Settings → Environment Variables** and add
every variable from `ENVIRONMENT_SETUP.md` that you have real values for (all are optional — add
Supabase/Resend/analytics vars once those accounts exist, per `SUPABASE_SETUP_GUIDE.md` and
`RESEND_SETUP_GUIDE.md`). Set `NEXT_PUBLIC_SITE_URL` to your real domain once you know it (step 6).

### 5. First deployment

Click **Deploy**. Vercel runs `npm install && npm run build` and serves the result at a generated
`*.vercel.app` URL. Open it and spot-check the homepage, a form, and `/robots.txt` before proceeding.

### 6. Custom-domain connection

1. **Project Settings → Domains → Add**. Enter your domain (e.g. `nepalpowerelec.com`).
2. Vercel shows the exact DNS records to add.

### 7. DNS

Add the records Vercel shows — typically an `A` record (for the apex domain) pointing at Vercel's IP, or
a `CNAME` (for a `www` subdomain) pointing at `cname.vercel-dns.com`. Exact values are generated per
project in the dashboard — always copy them from there rather than reusing values from elsewhere.

### 8. SSL

Automatic — Vercel provisions and renews a Let's Encrypt certificate for every verified domain with zero
configuration. Allow a few minutes after DNS propagates.

### 9. www and non-www redirect choice

Decide on one canonical form (e.g. `www.nepalpowerelec.com` redirecting to `nepalpowerelec.com`, or vice
versa) — **Project Settings → Domains** lets you set one as primary and the other auto-redirects to it.
Whichever you choose, set `NEXT_PUBLIC_SITE_URL` to match exactly (with `https://`, no trailing slash) —
this is what the sitemap, canonical tags, and JSON-LD use, and it should always match your actual primary
domain.

### 10. Deployment verification

After DNS/SSL settle:
1. Visit the real domain — confirm the homepage loads, HTTPS padlock shows, no console errors.
2. `curl -I https://<yourdomain>/` — confirm the security headers from `next.config.ts` are present.
3. `curl https://<yourdomain>/robots.txt` and `curl https://<yourdomain>/sitemap.xml` — confirm they
   reference the real domain, not the Vercel preview URL or `nepalpowerelec.com` if that's not actually
   your final domain.
4. Submit a real test enquiry through one of the 6 forms — confirm it works exactly as tested in demo
   mode, and (once Supabase/Resend are connected) actually persists and emails for real.
5. Run through `docs/PRODUCTION_TEST_PLAN.md` and `LAUNCH_CHECKLIST.md` in full.

### 11. Rollback procedure

Vercel keeps every previous deployment. If a new deploy breaks something:
1. Go to the project's **Deployments** tab.
2. Find the last known-good deployment.
3. Click the **⋯** menu → **Promote to Production** (instantly repoints the production domain at that
   build — no rebuild needed, effectively immediate).
4. Separately, fix the issue in a new commit and redeploy normally once ready.

## Known cosmetic-only item (not a production issue)

During local development (`npm run dev`), the browser console may show a `React requires eval()`
warning. This is React's own development-mode debugging feature (call-stack reconstruction) and its
message explicitly states **"React will never use eval() in production mode."** `next.config.ts`'s CSP
already allows `'unsafe-eval'` only when `NODE_ENV !== "production"` (curl-verified: the served header
correctly omits it in a production build). No action needed — this cannot appear in the deployed site.
