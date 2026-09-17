import { siteConfig } from "@/lib/site-config";

// Escapes user-provided content before it's interpolated into an HTML email body
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strips line breaks from a value before it's used in headers
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

// Organizer-facing notification: carries the actual submitted details so
// a recipient can act on the enquiry without needing database access.
// Reference number parameter is completely removed.
export function organizerNotificationEmail({
  enquiryTypeLabel,
  submittedAt,
  fields,
}: {
  enquiryTypeLabel: string;
  referenceNumber?: string; // Optional rakha hai taaki koi purana call ho toh error na aaye
  submittedAt: Date;
  fields: { label: string; value: string | undefined | null }[];
}) {
  const validFields = fields.filter((f) => f.value && String(f.value).trim().length > 0);

  const rows = validFields
    .map(
      (f, index) => `
        <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9f9f9'}; border-bottom: 1px solid #edf2f7;">
          <td style="padding: 10px 14px; font-size: 13px; font-weight: bold; color: #4a5568; width: 35%; vertical-align: top;">${escapeHtml(f.label)}</td>
          <td style="padding: 10px 14px; font-size: 13px; color: #2d3748; word-break: break-word; white-space: pre-wrap;">${escapeHtml(String(f.value))}</td>
        </tr>`
    )
    .join("");

  const submittedAtDisplay = submittedAt.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  // Find Company Name or Contact Person for prominent display in subject
  const companyField = validFields.find(f => f.label.toLowerCase().includes("company") || f.label.toLowerCase().includes("organization"));
  const nameField = validFields.find(f => f.label.toLowerCase().includes("name") || f.label.toLowerCase().includes("contact person"));
  
  const entityName = companyField ? String(companyField.value) : (nameField ? String(nameField.value) : "New Lead");

  // Clean subject line optimized for notification preview:
  const subject = `[${siteConfig.shortName}] ${enquiryTypeLabel} — ${entityName}`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f8f9;font-family:'Segoe UI',Arial,sans-serif;color:#14212b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8f9;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #dce4e6;box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <tr>
              <td style="background:#044f47;padding:20px 24px;">
                <p style="margin:0;color:#ebbc17;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">
                  ${escapeHtml(siteConfig.eventName)}
                </p>
                <h1 style="margin:4px 0 0;color:#ffffff;font-size:18px;line-height:1.3;">
                  ${escapeHtml(enquiryTypeLabel)}: ${escapeHtml(entityName)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 16px;font-size:12px;color:#718096;">
                  Received At: <strong>${escapeHtml(submittedAtDisplay)} (IST)</strong>
                </p>
                <table role="presentation" width="100%" style="border-collapse:collapse;border:1px solid #edf2f7;border-radius:6px;overflow:hidden;">
                  ${rows}
                </table>
                <p style="margin:20px 0 0;font-size:12px;color:#718096;border-top:1px solid #edf2f7;padding-top:12px;">
                  💡 <strong>Note:</strong> You can reply directly to this email to respond to the sender (Reply-To is automatically set).
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html };
}

export function newsletterConfirmEmail() {
  return {
    subject: `Confirm Your Subscription — ${siteConfig.shortName}`,
    html: `<!doctype html>
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
                <h2 style="margin:0 0 16px;font-size:18px;color:#14212b;">Confirm Your Subscription</h2>
                <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#14212b;">You're almost done. Please confirm your subscription to receive verified announcements about registration, documents, and highlights from previous editions.</p>
                <p style="margin:0 0 4px;font-size:13px;color:#5b6b74;">${siteConfig.venue.full}</p>
                <p style="margin:0;font-size:13px;"><a href="${siteConfig.siteUrl}" style="color:#2688b8;">${siteConfig.siteUrl.replace(/^https?:\/\//, "")}</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}




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
    html: `<!doctype html>
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
                <h2 style="margin:0 0 16px;font-size:18px;color:#14212b;">Your Post-Show Report Request Has Been Received</h2>
                <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#14212b;">${bodyContent}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}