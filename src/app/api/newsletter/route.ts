import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/forms";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { submitLead, DuplicateSubmissionError } from "@/lib/db";
import { isHoneypotFilled, honeypotResponse } from "@/lib/honeypot";
import { sendEmail, sendNotificationEmails } from "@/lib/email/send";
import { newsletterConfirmEmail, organizerNotificationEmail } from "@/lib/email/templates";
import { appendToGoogleSheet } from "@/lib/google-sheets";

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rate = checkRateLimit(`newsletter:${clientKey}`);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json();
  if (isHoneypotFilled(body)) return honeypotResponse();

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  try {
    await submitLead("newsletter_subscribers", parsed.data, "NEWS");

    // 1. Save to Google Sheet
    await appendToGoogleSheet({
      platform: "Newsletter Subscription",
      email: parsed.data.email,
    });

    // 2. Send confirmation email to the subscriber (Required for newsletters)
    const { subject, html } = newsletterConfirmEmail();
    await sendEmail({ to: parsed.data.email, subject, html });

    // 3. Send Notification to Admin Emails as well
    const notification = organizerNotificationEmail({
      enquiryTypeLabel: "Newsletter Subscription",
      submittedAt: new Date(),
      fields: [
        { label: "Subscriber Email", value: parsed.data.email },
      ],
    });

    await sendNotificationEmails({
      subject: notification.subject,
      html: notification.html,
      replyTo: parsed.data.email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof DuplicateSubmissionError) {
      return NextResponse.json(
        { error: "This looks like a duplicate submission. If you already submitted this, no further action is needed." },
        { status: 409 }
      );
    }
    console.error("newsletter submission failed", err);
    return NextResponse.json({ error: "Unable to process submission." }, { status: 500 });
  }
}