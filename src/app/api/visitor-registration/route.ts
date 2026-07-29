import { NextResponse } from "next/server";
import { visitorRegistrationSchema } from "@/lib/validations/forms";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { submitLead, DuplicateSubmissionError } from "@/lib/db";
import { isHoneypotFilled, honeypotResponse } from "@/lib/honeypot";
import { sendEmail, sendNotificationEmails } from "@/lib/email/send";
import { visitorRegistrationEmail, organizerNotificationEmail } from "@/lib/email/templates";

// Google reCAPTCHA Verification Helper
async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is missing in environment variables.");
    return false;
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
  });

  const data = await response.json();
  return data.success;
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rate = checkRateLimit(`visitor-registration:${clientKey}`);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json();
  if (isHoneypotFilled(body)) return honeypotResponse();

  // 1. Extract recaptchaToken & Verify
  const { recaptchaToken, ...formData } = body;

  if (!recaptchaToken) {
    return NextResponse.json({ error: "reCAPTCHA verification is required." }, { status: 400 });
  }

  const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isCaptchaValid) {
    return NextResponse.json({ error: "Invalid reCAPTCHA verification. Please try again." }, { status: 400 });
  }

  // 2. Schema Validation
  const parsed = visitorRegistrationSchema.safeParse(formData);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  try {
    const { referenceNumber } = await submitLead("visitor_registrations", parsed.data, "VIS");

    const ack = visitorRegistrationEmail(referenceNumber);
    await sendEmail({ to: parsed.data.email, subject: ack.subject, html: ack.html });

    const notification = organizerNotificationEmail({
      enquiryTypeLabel: "Visitor Registration",
      referenceNumber,
      submittedAt: new Date(),
      fields: [
        { label: "Full Name", value: parsed.data.fullName },
        { label: "Designation", value: parsed.data.designation },
        { label: "Email", value: parsed.data.email },
        { label: "Phone", value: parsed.data.phone },
        { label: "Country", value: parsed.data.country },
        { label: "Company / Organization", value: parsed.data.companyName },
        { label: "Company Website", value: parsed.data.companyWebsite ?? "" },
        { label: "Industry", value: parsed.data.industry },
        { label: "Company Type", value: parsed.data.companyType },
        { label: "Primary Product Categories", value: parsed.data.productCategories.join(", ") },
        { label: "Purpose of Visit", value: parsed.data.visitPurpose },
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
    console.error("visitor-registration submission failed", err);
    return NextResponse.json({ error: "Unable to process submission." }, { status: 500 });
  }
}