import { NextResponse } from "next/server";
import { quickEnquirySchema } from "@/lib/validations/forms";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { submitLead, DuplicateSubmissionError } from "@/lib/db";
import { sendNotificationEmails } from "@/lib/email/send";
import { organizerNotificationEmail } from "@/lib/email/templates";
import { isHoneypotFilled, honeypotResponse } from "@/lib/honeypot";
import { appendToGoogleSheet } from "@/lib/google-sheets";

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

  const recaptchaToken = body.recaptchaToken;
  if (!recaptchaToken) {
    return NextResponse.json({ error: "reCAPTCHA verification failed. Missing token." }, { status: 400 });
  }

  const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isCaptchaValid) {
    return NextResponse.json({ error: "reCAPTCHA verification failed. Please try again." }, { status: 400 });
  }

  const parsed = quickEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  try {
    await submitLead("quick_enquiry", parsed.data, "QEN");

    // 1. Save to Google Sheet
    await appendToGoogleSheet({
      platform: "Quick Enquiry",
      contactPerson: parsed.data.fullName,
      email: parsed.data.email,
      mobile: parsed.data.phone,
      areaOfInterest: parsed.data.interest,
      message: parsed.data.message,
    });

    // 2. Send Notification ONLY to Admin Emails (User email acknowledgement removed)
    const notification = organizerNotificationEmail({
      enquiryTypeLabel: "Quick Enquiry (Homepage)",
      submittedAt: new Date(),
      fields: [
        { label: "Full Name", value: parsed.data.fullName },
        { label: "Email", value: parsed.data.email },
        { label: "Phone", value: parsed.data.phone ?? "" },
        { label: "Area of Interest", value: parsed.data.interest },
        { label: "Message", value: parsed.data.message },
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
    console.error("quick-enquiry submission failed", err);
    return NextResponse.json({ error: "Unable to process submission." }, { status: 500 });
  }
}