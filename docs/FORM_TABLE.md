# Form Table

| | Exhibitor Enquiry ("Book a Stand") | Visitor Registration ("Register to Visit") | Media Enquiry | Contact ("General Enquiry") | Newsletter | Accessibility Feedback |
|---|---|---|---|---|---|---|
| **Page route** | `/book-a-stand` | `/register-to-visit` | `/media-enquiry` | `/contact` | Footer widget (all pages) | `/accessibility` |
| **API route** | `POST /api/exhibitor-enquiry` | `POST /api/visitor-registration` | `POST /api/media-enquiry` | `POST /api/contact` | `POST /api/newsletter` | `POST /api/accessibility-feedback` |
| **Fields** | fullName*, designation*, email*, phone*, country*, companyName*, companyWebsite, companyAddress*, companyType*, productCategory*, productsOrServices*, standRequirement*, message, privacyConsent* | fullName*, designation*, email*, phone*, country*, companyName*, companyWebsite, industry*, companyType*, productCategories* (multi-select, min 1), visitPurpose*, privacyConsent* | fullName*, designation*, mediaOrganization*, mediaWebsite, email*, phone*, country*, mediaType*, language*, enquiryType*, requestedInformation*, deadline, supportingLink, privacyConsent* | fullName*, email*, phone, country*, company, enquiryType*, subject*, message*, privacyConsent* | email*, consent* | fullName*, email*, pageOrDocument*, deviceOrBrowser*, issueDescription*, preferredContactMethod*, privacyConsent* |
| **Validation** | Zod `exhibitorEnquirySchema` (client + server, identical schema) | Zod `visitorRegistrationSchema` | Zod `mediaEnquirySchema` | Zod `contactFormSchema` | Zod `newsletterSchema` | Zod `accessibilityFeedbackSchema` |
| **Database destination** | `exhibitor_enquiries` table | `visitor_registrations` table | `media_enquiries` table | `contact_enquiries` table | `newsletter_subscribers` table | `accessibility_feedback` table |
| **Email recipients** | Submitter (acknowledgement) + all 3 organizers (notification copy) | Submitter + all 3 organizers | Submitter + all 3 organizers | Submitter + all 3 organizers | Submitter only (confirmation email) | Submitter + all 3 organizers |
| **Confirmation email subject** | "Enquiry Received — Book a Stand" | "Registration Received — Nepal Electric, Power and Lights Expo 2026" | "Request Received — Media Enquiry" | "Thank You — Your Enquiry Has Been Received" | "Confirm Your Subscription" | "Accessibility Feedback Received" |
| **Reference-number format** | `EXH-<base36 timestamp>-<random>` e.g. `EXH-MS31SC2P-VVO7` | `VIS-...` | `MED-...` | `GEN-...` | `NEWS-...` | `ACC-...` |
| **Spam protection** | Server-side Zod re-validation (never trusts client) + per-IP rate limit | Same | Same | Same | Same | Same |
| **Rate limit** | 5 requests / 60 seconds per IP per route (in-memory fixed-window; swap for Redis if scaling beyond one instance) | Same | Same | Same | Same | Same |
| **Success state** | Inline confirmation panel replaces the form: "ENQUIRY RECEIVED" + verbatim approved copy + reference number | "REGISTRATION RECEIVED" + copy + reference | "REQUEST RECEIVED" + copy + reference | "THANK YOU" + copy + reference | Compact inline text: "Thanks — check your inbox to confirm your subscription." | Inline confirmation + reference |
| **Error state** | "The form could not be submitted. Review the highlighted fields and try again." (values preserved) | Same | Same | Same | Same (compact) | Same |
| **Demo-mode behavior (no Supabase/Resend configured)** | Submission logged to server console with full payload; reference number still generated; emails logged instead of sent | Same | Same | Same | Same | Same |

\* = required field. All 6 forms verified end-to-end in this build (client validation blocks invalid
submission with the exact approved error copy; valid submission returns HTTP 200, logs correctly in demo
mode, and shows the correct confirmation screen — see `docs/FINAL_AUDIT_REPORT.md` §1). Field-level Zod
schemas are additionally covered by 19 automated unit tests in `src/lib/validations/forms.test.ts`.

No CAPTCHA is used (no third-party keys available in this build) — the per-IP rate limiter is today's
spam mitigation; documented as an accepted interim tradeoff in `FINAL_AUDIT_REPORT.md`.
