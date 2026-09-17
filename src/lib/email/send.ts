import nodemailer from "nodemailer";

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createTransporter() {
  const user = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_APP_PASSWORD;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|h1|h2|h3)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const safeSubject = subject.replace(/[\r\n]+/g, " ").trim();
  const safeReplyTo = replyTo?.replace(/[\r\n]+/g, " ").trim();
  const text = htmlToPlainText(html);

  const transporter = createTransporter();
  const from = process.env.SMTP_FROM_NAME
    ? `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_EMAIL}>`
    : process.env.SMTP_EMAIL;

  if (!transporter || !from) {
    console.info("[email] SMTP not configured — logging email only", {
      to,
      subject: safeSubject,
      replyTo: safeReplyTo,
    });
    return { sent: false };
  }

  let lastError: unknown = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      await transporter.sendMail({
        from,
        to,
        subject: safeSubject,
        html,
        text,
        ...(safeReplyTo ? { replyTo: safeReplyTo } : {}),
      });
      return { sent: true };
    } catch (err) {
      lastError = err;
      console.error(
        `[email] send attempt ${attempt + 1}/${MAX_RETRIES + 1} failed`,
        { to, subject: safeSubject, error: err }
      );
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * (attempt + 1));
      }
    }
  }

  console.error(
    "[email] send failed after retries — enquiry remains saved",
    { to, subject: safeSubject, error: lastError }
  );
  return { sent: false };
}

/**
 * Dynamically collects all NOTIFICATION_EMAIL_X from environment variables.
 */
function getTargetEmails(): string[] {
  const targets: string[] = [];
  let i = 1;
  while (process.env[`NOTIFICATION_EMAIL_${i}`]) {
    const email = process.env[`NOTIFICATION_EMAIL_${i}`];
    if (email) targets.push(email);
    i++;
  }

  // Fallback if numbered ones aren't found
  if (targets.length === 0) {
    if (process.env.NOTIFICATION_EMAIL_1) targets.push(process.env.NOTIFICATION_EMAIL_1);
    if (process.env.NOTIFICATION_EMAIL_2) targets.push(process.env.NOTIFICATION_EMAIL_2);
  }

  return targets;
}

/**
 * Sends a raw pre-built notification email to all admin/organizer addresses.
 * (This matches what your route files are trying to import and call).
 */
export async function sendNotificationEmails({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const targets = getTargetEmails();

  if (targets.length === 0) {
    console.warn("[email] No notification recipient emails configured in environment variables.");
    return;
  }

  for (const to of targets) {
    await sendEmail({ to, subject, html, replyTo });
  }
}

/**
 * Sends a structured, clean notification email to admin/organizer addresses only.
 * Reference number removed. Highlights Company / Lead name.
 */
export async function sendOrganizerNotification({
  websiteName = "Nepal Power Elec 2026",
  formType = "Enquiry", 
  fields,
  replyTo,
}: {
  websiteName?: string;
  formType: string;
  fields: { label: string; value: string | undefined | null }[];
  replyTo?: string;
}) {
  const targets = getTargetEmails();

  if (targets.length === 0) {
    console.warn("[email] No notification recipient emails configured in environment variables.");
    return;
  }

  // Filter out empty fields
  const validFields = fields.filter((f) => f.value && String(f.value).trim().length > 0);

  // Find Company Name or Contact Person for prominent display in subject
  const companyField = validFields.find(f => f.label.toLowerCase().includes("company") || f.label.toLowerCase().includes("organization"));
  const nameField = validFields.find(f => f.label.toLowerCase().includes("name") || f.label.toLowerCase().includes("contact person"));
  
  const entityName = companyField ? String(companyField.value) : (nameField ? String(nameField.value) : "New Lead");

  // Professional subject clearly showing Website + Form Type + Company/Lead Name
  const subject = `[${websiteName}] ${formType} — ${entityName}`;

  // Clean HTML layout with zero clutter (No reference number)
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #044f47; border-bottom: 2px solid #044f47; padding-bottom: 8px; margin-top: 0;">
        ${websiteName}
      </h2>
      <p style="font-size: 14px; color: #4a5568; margin-bottom: 15px;">
        New submission received for: <strong>${formType}</strong>
      </p>

      <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <tr style="background-color: #edf2f7;">
          <th style="padding: 10px 15px; text-align: left; font-size: 13px; color: #2d3748; width: 35%;">Field</th>
          <th style="padding: 10px 15px; text-align: left; font-size: 13px; color: #2d3748;">Details</th>
        </tr>
        ${validFields
          .map(
            (f, index) => `
          <tr style="border-bottom: 1px solid #edf2f7; background-color: ${index % 2 === 0 ? '#ffffff' : '#fafafa'};">
            <td style="padding: 10px 15px; font-size: 13px; font-weight: bold; color: #4a5568;">${f.label}</td>
            <td style="padding: 10px 15px; font-size: 13px; color: #2d3748; word-break: break-word; white-space: pre-wrap;">${f.value || "—"}</td>
          </tr>
        `
          )
          .join("")}
      </table>

      <p style="font-size: 12px; color: #718096; margin-top: 20px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px;">
        💡 You can reply directly to this email to respond to the sender.
      </p>
    </div>
  `;

  for (const to of targets) {
    await sendEmail({ to, subject, html, replyTo });
  }
}