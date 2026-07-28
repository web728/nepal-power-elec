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
    "[email] send failed after retries — enquiry remains saved, only the notification email did not send",
    { to, subject: safeSubject, error: lastError }
  );
  return { sent: false };
}

export async function sendNotificationEmails({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const email1 = process.env.NOTIFICATION_EMAIL_1;
  const email2 = process.env.NOTIFICATION_EMAIL_2;

  const targets = [email1, email2].filter(Boolean) as string[];

  for (const to of targets) {
    await sendEmail({ to, subject, html, replyTo });
  }
}
