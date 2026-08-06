import { NextResponse } from "next/server";
import { brochureDownloadSchema } from "@/lib/validations/forms";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { submitLead, DuplicateSubmissionError } from "@/lib/db";
import { isHoneypotFilled, honeypotResponse } from "@/lib/honeypot";
import { sendEmail, sendNotificationEmails } from "@/lib/email/send";
import { brochureDownloadAckEmail, organizerNotificationEmail } from "@/lib/email/templates";

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is missing in environment variables.");
    return false;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rate = checkRateLimit(`event-brochure:${clientKey}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  const body = await request.json();
  if (isHoneypotFilled(body)) return honeypotResponse();

  const { recaptchaToken, ...formData } = body;
  if (!recaptchaToken) {
    return NextResponse.json(
      { error: "Please complete the reCAPTCHA verification." },
      { status: 400 }
    );
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return NextResponse.json(
      { error: "reCAPTCHA verification failed. Please try again." },
      { status: 400 }
    );
  }

  const parsed = brochureDownloadSchema.safeParse(formData);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const { referenceNumber } = await submitLead("brochure_downloads", parsed.data, "BRO");
    const downloadUrl = "/downloads/Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf";

    const ack = brochureDownloadAckEmail(referenceNumber, downloadUrl);
    await sendEmail({
      to: parsed.data.email,
      subject: ack.subject,
      html: ack.html,
    });

    const notification = organizerNotificationEmail({
      enquiryTypeLabel: "Event Brochure Download Request",
      referenceNumber,
      submittedAt: new Date(),
      fields: [
        { label: "Full Name", value: parsed.data.fullName },
        { label: "Email", value: parsed.data.email },
        { label: "Phone", value: parsed.data.phone ?? "" },
        { label: "Country", value: parsed.data.country },
        { label: "Company Name", value: parsed.data.company ?? "" },
      ],
    });

    await sendNotificationEmails({
      subject: notification.subject,
      html: notification.html,
      replyTo: parsed.data.email,
    });

    return NextResponse.json({ referenceNumber, downloadUrl });
  } catch (err) {
    if (err instanceof DuplicateSubmissionError) {
      return NextResponse.json(
        { error: "This looks like a duplicate submission. If you already submitted this, no further action is needed." },
        { status: 409 }
      );
    }
    console.error("event-brochure-download submission failed", err);
    return NextResponse.json({ error: "Unable to process submission." }, { status: 500 });
  }
}