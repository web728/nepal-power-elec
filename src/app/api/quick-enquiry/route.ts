import { NextResponse } from "next/server";
import { quickEnquirySchema } from "@/lib/validations/forms";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { submitLead, DuplicateSubmissionError } from "@/lib/db";
import { sendEmail, sendNotificationEmails } from "@/lib/email/send";
import { quickEnquiryEmail, organizerNotificationEmail } from "@/lib/email/templates";
import { isHoneypotFilled, honeypotResponse } from "@/lib/honeypot";

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is missing from environment variables.");
    return false;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rate = checkRateLimit(`quick-enquiry:${clientKey}`);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json();
  if (isHoneypotFilled(body)) return honeypotResponse();

  // 1. Verify reCAPTCHA Token
  const recaptchaToken = body.recaptchaToken;
  if (!recaptchaToken) {
    return NextResponse.json({ error: "reCAPTCHA verification failed. Missing token." }, { status: 400 });
  }

  const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isCaptchaValid) {
    return NextResponse.json({ error: "reCAPTCHA verification failed. Please try again." }, { status: 400 });
  }

  // 2. Validate Schema
  const parsed = quickEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  try {
    const { referenceNumber } = await submitLead("quick_enquiry", parsed.data, "QEN");

    const ack = quickEnquiryEmail(referenceNumber);
    await sendEmail({ to: parsed.data.email, subject: ack.subject, html: ack.html });

    const notification = organizerNotificationEmail({
      enquiryTypeLabel: "Quick Enquiry (Homepage)",
      referenceNumber,
      submittedAt: new Date(),
      fields: [
        { label: "Full Name", value: parsed.data.fullName },
        { label: "Email", value: parsed.data.email },
        { label: "Phone", value: parsed.data.phone ?? "" },
        { label: "Area of Interest", value: parsed.data.interest },
        { label: "Message", value: parsed.data.message },
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
    console.error("quick-enquiry submission failed", err);
    return NextResponse.json({ error: "Unable to process submission." }, { status: 500 });
  }
}