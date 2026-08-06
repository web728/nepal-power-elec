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

// referenceNumber is optional now — pass null/undefined to skip the
// reference box entirely (e.g. newsletter confirmations that don't have
// a real reference number).
function baseTemplate(heading: string, body: string, referenceNumber?: string | null) {
  const referenceBlock = referenceNumber
    ? `<table role="presentation" style="width:100%;background:#f5f8f9;border-radius:8px;border:1px solid #dce4e6;margin-bottom:20px;">
                  <tr>
                    <td style="padding:14px 18px;font-size:13px;color:#5b6b74;">
                      Reference number<br /><strong style="color:#14212b;font-size:15px;">${escapeHtml(referenceNumber)}</strong>
                    </td>
                  </tr>
                </table>`
    : "";

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
                ${referenceBlock}
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

// Confirmation copy transcribed from the approved Full Website Content
// master document's "Form Confirmation and Error Messages" page, with
// subject lines standardized to a single professional convention:
//   "<Action> — <Event Short Name>"

export function exhibitorEnquiryEmail(referenceNumber: string) {
  return {
    subject: `Exhibitor Enquiry Received — ${siteConfig.shortName}`,
    html: baseTemplate(
      "Your Exhibitor Enquiry Has Been Received",
      "Thank you for your interest in exhibiting. Our team will review the company and product information you've provided and get back to you shortly. Please note that submitting this form does not reserve or confirm a stand.",
      referenceNumber
    ),
  };
}

export function visitorRegistrationEmail(referenceNumber: string) {
  return {
    subject: `Registration Confirmed — ${siteConfig.shortName}`,
    html: baseTemplate(
      "Your Registration Has Been Received",
      "Thank you for registering your interest in attending. Please keep this confirmation for your records and check the official website closer to the date for updates.",
      referenceNumber
    ),
  };
}

export function mediaEnquiryEmail(referenceNumber: string) {
  return {
    subject: `Media Enquiry Received — ${siteConfig.shortName}`,
    html: baseTemplate(
      "Your Media Enquiry Has Been Received",
      "Thank you for reaching out. Your request has been submitted for review. Please note that submission does not confirm accreditation, interview availability, photography permission, or access to restricted areas.",
      referenceNumber
    ),
  };
}

export function contactEnquiryEmail(referenceNumber: string) {
  return {
    subject: `Enquiry Received — ${siteConfig.shortName}`,
    html: baseTemplate(
      "Thank You for Reaching Out",
      "Your enquiry has been received and shared with our team. A representative will get in touch using the details you've provided. Please note that submission does not confirm registration, exhibition space, media accreditation, or partnership status.",
      referenceNumber
    ),
  };
}

export function accessibilityFeedbackEmail(referenceNumber: string) {
  return {
    subject: `Accessibility Feedback Received — ${siteConfig.shortName}`,
    html: baseTemplate(
      "Thank You for Your Feedback",
      "Your accessibility feedback has been received and shared with our team for review. A representative will follow up using the details you've provided if needed.",
      referenceNumber
    ),
  };
}

export function quickEnquiryEmail(referenceNumber: string) {
  return {
    subject: `Enquiry Received — ${siteConfig.shortName}`,
    html: baseTemplate(
      "Thank You for Your Interest",
      "Your enquiry has been received. A member of our team will review your submission and get in touch using the details you've provided.",
      referenceNumber
    ),
  };
}

export function newsletterConfirmEmail() {
  return {
    subject: `Confirm Your Subscription — ${siteConfig.shortName}`,
    html: baseTemplate(
      "Confirm Your Subscription",
      "You're almost done. Please confirm your subscription to receive verified announcements about registration, documents, and highlights from previous editions.",
      null
    ),
  };
}


// Post-Show Report Email Confirmation (includes PDF download link in email body)
export function postShowReportAckEmail(referenceNumber: string, downloadUrl: string) {
  const fullDownloadUrl = `${siteConfig.siteUrl}${downloadUrl}`;

  const bodyContent = `
    Thank you for your interest in the ${escapeHtml(siteConfig.eventName)}. Your request to access the official Post-Show Report has been recorded.
    <br /><br />
    <a href="${escapeHtml(fullDownloadUrl)}" target="_blank" style="display:inline-block;background:#044f47;color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">
      Download Post-Show Report (PDF)
    </a>
    <br /><br />
    <span style="font-size:12px;color:#5b6b74;">If the button above does not work, copy and paste this link into your browser:</span><br />
    <a href="${escapeHtml(fullDownloadUrl)}" style="color:#2688b8;font-size:12px;word-break:break-all;">${escapeHtml(fullDownloadUrl)}</a>
  `;

  return {
    subject: `Post-Show Report Download — ${siteConfig.shortName}`,
    html: baseTemplate(
      "Your Post-Show Report Request Has Been Received",
      bodyContent,
      referenceNumber
    ),
  };
}



export function brochureDownloadAckEmail(referenceNumber: string, downloadUrl: string) {
  const fullDownloadUrl = `${siteConfig.siteUrl}${downloadUrl}`;

  const bodyContent = `
    Thank you for your interest in the ${escapeHtml(siteConfig.eventName)}. Your request to download the official 2026 Event Brochure has been recorded.
    <br /><br />
    <a href="${escapeHtml(fullDownloadUrl)}" target="_blank" style="display:inline-block;background:#044f47;color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">
      Download 2026 Event Brochure (PDF)
    </a>
    <br /><br />
    <span style="font-size:12px;color:#5b6b74;">If the button above does not work, copy and paste this link into your browser:</span><br />
    <a href="${escapeHtml(fullDownloadUrl)}" style="color:#2688b8;font-size:12px;word-break:break-all;">${escapeHtml(fullDownloadUrl)}</a>
  `;

  return {
    subject: `Event Brochure Download — ${siteConfig.shortName}`,
    html: baseTemplate(
      "Your Brochure Request Has Been Received",
      bodyContent,
      referenceNumber
    ),
  };
}