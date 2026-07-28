# Environment Variable Setup

Copy `.env.example` to `.env.local` for local development, or add these to your hosting provider's
environment variable settings for production. **Every variable is optional** — the site runs fully in
demo mode (forms log to console, admin/dashboard show a "not configured" state) with none of them set.

| Variable | Purpose | Where to obtain it | Required? | Scope | Example format (no real secrets) |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL — enables login, dashboard, and form persistence | Supabase dashboard → Project Settings → API | Optional (required to move off demo mode) | **Public** (bundled to the browser) | `https://xxxxxxxxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key — used by the browser client for auth | Supabase dashboard → Project Settings → API | Optional (paired with the URL above) | **Public** (designed to be public — protected by RLS, not secrecy) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key — lets API routes write form submissions and lets `/admin` read them, bypassing RLS | Supabase dashboard → Project Settings → API (⚠️ never expose to the browser or commit it) | Optional (required for real form persistence + admin CMS) | **Server-only — secret** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `RESEND_API_KEY` | Sends real transactional emails (confirmations, organizer notifications) instead of console-logging them | resend.com → API Keys | Optional (required for real email delivery) | **Server-only — secret** | `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `EMAIL_FROM_ADDRESS` | The "From" address/name used on outgoing emails — must be on a domain verified in Resend | Your own domain, verified in Resend → Domains | Optional (defaults to a placeholder sender) | **Server-only** (not secret, just not needed client-side) | `"5th Nepal Electric, Power and Lights International Expo <noreply@nepalpowerelec.com>"` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID — only loads after a visitor accepts analytics cookies | Google Analytics → Admin → Data Streams | Optional | **Public** | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (alternative/addition to GA4 direct) | Google Tag Manager → Container settings | Optional | **Public** | `GTM-XXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook) Pixel ID, if social ad tracking is required | Meta Events Manager | Optional — not currently wired into any component; reserved for future use | **Public** | `000000000000000` |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag partner ID, if B2B ad tracking is required | LinkedIn Campaign Manager → Account Assets → Insight Tag | Optional — not currently wired into any component; reserved for future use | **Public** | `0000000` |
| `NEXT_PUBLIC_SITE_URL` | Overrides the production domain used in metadata, sitemap, JSON-LD, and email links | Your own registered domain | Optional (defaults to `https://www.nepalpowerelec.com` in `src/lib/site-config.ts`) | **Public** | `https://www.nepalpowerelec.com` |

## Notes

- Variables prefixed `NEXT_PUBLIC_` are bundled into client-side JavaScript and are **not** secret — never
  put a real secret behind that prefix.
- `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` are server-only and must never be committed to the
  repository or exposed in client code. `.env.local` is already listed in `.gitignore`.
- Nothing crashes if a variable is missing — each integration point (`src/lib/supabase/*`,
  `src/lib/email/send.ts`) checks for its own env vars and falls back to a safe "not configured" /
  console-log path.
