import { NextResponse } from "next/server";
import { accessibilityFeedbackSchema } from "@/lib/validations/forms";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { submitLead, DuplicateSubmissionError } from "@/lib/db";
import { isHoneypotFilled, honeypotResponse } from "@/lib/honeypot";
import { sendEmail, sendNotificationEmails } from "@/lib/email/send";
import { accessibilityFeedbackEmail, organizerNotificationEmail } from "@/lib/email/templates";

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
    const { referenceNumber } = await submitLead("accessibility_feedback", parsed.data, "ACC");

    const ack = accessibilityFeedbackEmail(referenceNumber);
    await sendEmail({ to: parsed.data.email, subject: ack.subject, html: ack.html });

    const notification = organizerNotificationEmail({
      enquiryTypeLabel: "Accessibility Feedback",
      referenceNumber,
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
    await sendNotificationEmails({ subject: notification.subject, html: notification.html, replyTo: parsed.data.email });

    return NextResponse.json({ referenceNumber });
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
