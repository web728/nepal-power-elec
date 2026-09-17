import { NextResponse } from "next/server";
import { accessibilityFeedbackSchema } from "@/lib/validations/forms";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { submitLead, DuplicateSubmissionError } from "@/lib/db";
import { isHoneypotFilled, honeypotResponse } from "@/lib/honeypot";
import { sendNotificationEmails } from "@/lib/email/send";
import { organizerNotificationEmail } from "@/lib/email/templates";
import { appendToGoogleSheet } from "@/lib/google-sheets";

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rate = checkRateLimit(`accessibility-feedback:${clientKey}`);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json();
  if (isHoneypotFilled(body)) return honeypotResponse();

  const parsed = accessibilityFeedbackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  try {
    await submitLead("accessibility_feedback", parsed.data, "ACC");

    // 1. Save to Google Sheet
    await appendToGoogleSheet({
      platform: "Accessibility Feedback",
      contactPerson: parsed.data.fullName,
      email: parsed.data.email,
      message: `Page/Doc: ${parsed.data.pageOrDocument}, Device/Browser: ${parsed.data.deviceOrBrowser}, Issue: ${parsed.data.issueDescription}, Preferred Contact: ${parsed.data.preferredContactMethod}`,
    });

    // 2. Send Notification ONLY to Admin Emails
    const notification = organizerNotificationEmail({
      enquiryTypeLabel: "Accessibility Feedback",
      submittedAt: new Date(),
      fields: [
        { label: "Full Name", value: parsed.data.fullName },
        { label: "Email", value: parsed.data.email },
        { label: "Page or Document", value: parsed.data.pageOrDocument },
        { label: "Device or Browser Used", value: parsed.data.deviceOrBrowser },
        { label: "Problem Experienced", value: parsed.data.issueDescription },
        { label: "Preferred Contact Method", value: parsed.data.preferredContactMethod },
      ],
    });

    await sendNotificationEmails({ 
      subject: notification.subject, 
      html: notification.html, 
      replyTo: parsed.data.email 
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof DuplicateSubmissionError) {
      return NextResponse.json(
        { error: "This looks like a duplicate submission. If you already submitted this, no further action is needed." },
        { status: 409 }
      );
    }
    console.error("accessibility-feedback submission failed", err);
    return NextResponse.json({ error: "Unable to process submission." }, { status: 500 });
  }
}