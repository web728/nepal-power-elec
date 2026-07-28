import { siteConfig } from "@/lib/site-config";

// Escapes user-provided content before it's interpolated into an HTML email
// body — prevents a submitted field (name, message, etc.) from injecting
// markup/script into the rendered email.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strips line breaks from a value before it's used anywhere that behaves
// like an email header (subject line, Reply-To) — defense-in-depth against
// header injection.
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function baseTemplate(heading: string, body: string, referenceNumber: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f8f9;font-family:'Segoe UI',Arial,sans-serif;color:#14212b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8f9;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dce4e6;">
            <tr>
              <td style="background:#044f47;padding:24px 32px;">
                <p style="margin:0;color:#ebbc17;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">
                  ${siteConfig.edition} Edition &middot; ${siteConfig.dates.display}
                </p>
                <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;line-height:1.3;">${siteConfig.eventName}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h2 style="margin:0 0 16px;font-size:18px;color:#14212b;">${heading}</h2>
                <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#14212b;">${body}</p>
                <table role="presentation" style="width:100%;background:#f5f8f9;border-radius:8px;border:1px solid #dce4e6;margin-bottom:20px;">
                  <tr>
                    <td style="padding:14px 18px;font-size:13px;color:#5b6b74;">
                      Reference number<br /><strong style="color:#14212b;font-size:15px;">${referenceNumber}</strong>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 4px;font-size:13px;color:#5b6b74;">${siteConfig.venue.full}</p>
                <p style="margin:0;font-size:13px;"><a href="${siteConfig.siteUrl}" style="color:#2688b8;">${siteConfig.siteUrl.replace(/^https?:\/\//, "")}</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Organizer-facing notification: carries the actual submitted details so
// a recipient can act on the enquiry without needing database access.
// Every value is HTML-escaped.
export function organizerNotificationEmail({
  enquiryTypeLabel,
  referenceNumber,
  submittedAt,
  fields,
}: {
  enquiryTypeLabel: string;
  referenceNumber: string;
  submittedAt: Date;
  fields: { label: string; value: string }[];
}) {
  const rows = fields
    .filter((f) => f.value && f.value.trim().length > 0)
    .map(
      (f) => `
                  <tr>
                    <td style="padding:8px 0;font-size:12px;color:#5b6b74;width:40%;vertical-align:top;">${escapeHtml(f.label)}</td>
                    <td style="padding:8px 0;font-size:13px;color:#14212b;white-space:pre-wrap;">${escapeHtml(f.value)}</td>
                  </tr>`
    )
    .join("");

  const submittedAtDisplay = submittedAt.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kathmandu",
  });

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f8f9;font-family:'Segoe UI',Arial,sans-serif;color:#14212b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8f9;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dce4e6;">
            <tr>
              <td style="background:#044f47;padding:24px 32px;">
                <p style="margin:0;color:#ebbc17;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">
                  New ${escapeHtml(enquiryTypeLabel)}
                </p>
                <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;line-height:1.3;">${siteConfig.eventName}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table role="presentation" style="width:100%;background:#f5f8f9;border-radius:8px;border:1px solid #dce4e6;margin-bottom:20px;">
                  <tr>
                    <td style="padding:14px 18px;font-size:13px;color:#5b6b74;">
                      Reference number<br /><strong style="color:#14212b;font-size:15px;">${escapeHtml(referenceNumber)}</strong>
                    </td>
                  </tr>
                </table>
                <table role="presentation" style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:8px 0;font-size:12px;color:#5b6b74;width:40%;vertical-align:top;">Submitted</td>
                    <td style="padding:8px 0;font-size:13px;color:#14212b;">${escapeHtml(submittedAtDisplay)} (Nepal time)</td>
                  </tr>${rows}
                </table>
                <p style="margin:20px 0 0;font-size:12px;color:#5b6b74;">
                  Reply directly to this email to respond to the submitter — their address is set as the Reply-To.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject: `[${enquiryTypeLabel}] ${referenceNumber}`, html };
}

// Confirmation copy transcribed verbatim from the approved Full Website
// Content master document's "Form Confirmation and Error Messages" page.

export function exhibitorEnquiryEmail(referenceNumber: string) {
  return {
    subject: "Enquiry Received — Book a Stand",
    html: baseTemplate(
      "Enquiry Received",
      "Thank you for your interest in exhibiting. The organizing team will review the company and product information provided. Submission does not reserve or confirm a stand.",
      referenceNumber
    ),
  };
}

export function visitorRegistrationEmail(referenceNumber: string) {
  return {
    subject: "Registration Received — Nepal Electric, Power and Lights Expo 2026",
    html: baseTemplate(
      "Registration Received",
      "Thank you for registering your interest in attending the 2026 expo. Keep your confirmation and review the official website before travelling.",
      referenceNumber
    ),
  };
}

export function mediaEnquiryEmail(referenceNumber: string) {
  return {
    subject: "Request Received — Media Enquiry",
    html: baseTemplate(
      "Request Received",
      "Your media request has been submitted for review. Submission does not confirm accreditation, interview availability, photography permission or access to restricted areas.",
      referenceNumber
    ),
  };
}

export function contactEnquiryEmail(referenceNumber: string) {
  return {
    subject: "Thank You — Your Enquiry Has Been Received",
    html: baseTemplate(
      "Thank You",
      "Your enquiry has been submitted to the organizing team. A representative may contact you using the details provided. Submission does not confirm registration, exhibition space, media accreditation or partnership status.",
      referenceNumber
    ),
  };
}

export function accessibilityFeedbackEmail(referenceNumber: string) {
  return {
    subject: "Accessibility Feedback Received",
    html: baseTemplate(
      "Thank You",
      "Your accessibility feedback has been submitted to the organizing team for review. A representative may contact you using the details provided.",
      referenceNumber
    ),
  };
}

export function quickEnquiryEmail(referenceNumber: string) {
  return {
    subject: "Enquiry Received — Nepal Electric, Power and Lights Expo 2026",
    html: baseTemplate(
      "Thank You for Your Interest",
      "Your enquiry has been received. A member of the organizing team will review your submission and may contact you using the details provided.",
      referenceNumber
    ),
  };
}

export function newsletterConfirmEmail() {
  return {
    subject: "Confirm Your Subscription",
    html: baseTemplate(
      "Confirm Your Subscription",
      "You're almost done. Please confirm you'd like to receive verified announcements about registration, documents and previous-edition highlights for the 5th Nepal Electric, Power and Lights International Expo 2026.",
      "SUBSCRIPTION"
    ),
  };
}
