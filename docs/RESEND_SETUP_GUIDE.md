# Resend Email Setup Guide

## What's already implemented and verified (see `docs/SECURITY_REMEDIATION_REPORT.md` for how it was tested)

- **Two email types per form**: a fixed, approved-copy **acknowledgement** to the submitter (verbatim
  text from the content master — see `docs/FORM_TABLE.md`), and a **detailed notification** to all three
  organizers containing the enquiry type, reference number, submission time (Nepal time zone), and every
  submitted field (name, company, contact details, message, etc.) — see `organizerNotificationEmail()`
  in `src/lib/email/templates.ts`.
- **Equal organizer delivery**: every form that routes to organizers (all except Newsletter, which per
  the design spec routes only to the confirmed-opt-in email platform, not organizer inboxes) sends the
  identical notification to all three: `namit@futurextrade.com`, `vijyanka@etsipl.in`,
  `info@mss.com.np` — read from the single shared `siteConfig.organizers` array, so it's structurally
  impossible for one organizer to be silently dropped from the list without also affecting the other two.
- **HTML-escaping**: every submitted field value is passed through `escapeHtml()` before being
  interpolated into the notification email's HTML — unit-tested (`src/lib/email/templates.test.ts`) to
  confirm a submitted `<img src=x onerror=...>` payload renders as inert escaped text, not live markup.
- **Header-injection prevention**: `sanitizeHeaderValue()` strips line breaks from subject lines and
  Reply-To values before they reach Resend's API — unit-tested — and `replyTo` is only ever set to a
  value that already passed Zod's `.email()` format validation upstream in the form schema.
- **Reply-To**: every organizer notification sets `replyTo` to the submitter's own (validated) email —
  an organizer can hit "Reply" in their inbox and it goes straight to the submitter, no copy-pasting.
- **Retry + failure logging**: `sendEmail()` (`src/lib/email/send.ts`) retries a failed send up to twice
  with a short backoff, and logs (never throws) on final failure — an email provider hiccup never causes
  a lost enquiry, because the submission is already durably saved to the database (or console-logged in
  demo mode) *before* any email is attempted.
- **No API key in browser code**: `RESEND_API_KEY` is read only in `src/lib/email/send.ts`, a
  server-only module imported exclusively by API route handlers — grep-verified not to appear in any
  `"use client"` file.

## 1. Account setup

1. Go to [resend.com](https://resend.com) and create an account.
2. From the dashboard, note your API key location: **API Keys** in the left sidebar (you'll generate the
   actual key in step 4, after domain verification, so you can scope it appropriately).

## 2. Domain verification

1. In the Resend dashboard, go to **Domains → Add Domain**.
2. Enter your sending domain (e.g. `nepalpowerelec.com`, or a subdomain like `mail.nepalpowerelec.com` if
   you'd rather keep sending traffic separate from your main domain's reputation).
3. Resend will show you the exact DNS records to add.

## 3. DNS records required

Resend will generate the exact values for your domain, but you will need to add these record **types**
at your domain registrar / DNS provider:

| Record type | Purpose |
|---|---|
| **TXT** (SPF) | Authorizes Resend's servers to send email on your domain's behalf |
| **CNAME** ×3 (DKIM) | Cryptographically signs outgoing mail so receiving servers can verify it wasn't tampered with |
| **TXT** (DMARC) | Tells receiving servers what to do with mail that fails SPF/DKIM (recommended: start with `p=none` to monitor, then tighten to `p=quarantine` once confident) |

After adding them, click **Verify** in the Resend dashboard — DNS propagation can take a few minutes to a
few hours depending on your provider.

## 4. Sender-address configuration

1. Once the domain shows **Verified** in Resend, generate an API key: **API Keys → Create API Key**.
   Scope it to **Sending access** only (not full account access) if Resend offers granular scopes.
2. Decide your sending address — e.g. `noreply@nepalpowerelec.com` for automated confirmations. This
   project's default (used if `EMAIL_FROM_ADDRESS` isn't set) is:
   ```
   5th Nepal Electric, Power and Lights International Expo <noreply@nepalpowerelec.com>
   ```
   Override it in your environment variables if you want a different address/display name — see below.

## 5. Environment variables

Add to `.env.local` (development) or your hosting provider's environment variables (production):
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM_ADDRESS="5th Nepal Electric, Power and Lights International Expo <noreply@nepalpowerelec.com>"
```
See `ENVIRONMENT_SETUP.md` for the full variable reference table.

## 6. Test procedure

1. With both env vars set, restart the dev server (or redeploy).
2. Submit any of the 5 organizer-routed forms (Book a Stand, Register to Visit, Media Enquiry, Contact,
   Accessibility Feedback) — the Newsletter form only sends a confirmation to the subscriber, not to
   organizers, by design.
3. Confirm you receive:
   - **The acknowledgement email** at the address you submitted with the form's approved confirmation
     copy and reference number.
   - **Three notification emails** (one per organizer inbox, if you have access to test with real
     addresses first) — or check the Resend dashboard's **Logs** tab, which shows every send attempt
     even if you don't have inbox access to all three organizer addresses.
4. Reply to a notification email from an organizer's inbox — confirm it goes to the submitter's address
   (the Reply-To), not back to Resend or another organizer.
5. Try triggering a duplicate: submit the exact same form twice in under 2 minutes — the second attempt
   should return a clear "this looks like a duplicate" message instead of sending a second set of emails.

## 7. Troubleshooting

| Symptom | Likely cause |
|---|---|
| Domain won't verify | DNS records haven't propagated yet (wait longer), or a value was copy-pasted with a typo/trailing space — re-copy directly from the Resend dashboard |
| Emails go to spam | DMARC not yet aligned, or the sending domain is brand new with no reputation — this settles over the first few weeks of consistent legitimate sending; consider warming up gradually rather than sending in bulk on day one |
| No email arrives, no error in server logs | Check the Resend dashboard's **Logs** tab — it distinguishes "sent," "delivered," "bounced," and "complained" |
| Server logs show `[email] send attempt 1/3 failed` then eventually succeeds | Normal — this is the built-in retry logic recovering from a transient issue |
| Server logs show `[email] send failed after retries` | A persistent problem (invalid API key, domain not verified, Resend account issue) — the enquiry itself is still safely saved; only the notification failed to send. Check the Resend dashboard for the specific rejection reason. |
| Reply-To doesn't work as expected | Confirm your email client isn't overriding Reply-To with its own "reply to sender" behavior — this is a client-side setting, not a bug in this app |

## 8. Production verification checklist

- [ ] Domain shows **Verified** in the Resend dashboard
- [ ] SPF, DKIM, and DMARC all pass (check via [mail-tester.com](https://www.mail-tester.com) or
      Resend's own domain diagnostics)
- [ ] A real end-to-end test of all 5 organizer-routed forms was performed against production
      credentials (not just demo mode)
- [ ] All three organizers confirmed receipt at their real inboxes
- [ ] Reply-To tested and confirmed working from a real organizer inbox
- [ ] `RESEND_API_KEY` is set only in server-side environment variables, never committed to the
      repository (already grep-verified clean — see `docs/SECURITY_REMEDIATION_REPORT.md`)
