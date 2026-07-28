import { NextResponse } from "next/server";
import { exhibitorEnquirySchema } from "@/lib/validations/forms";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { submitLead, DuplicateSubmissionError } from "@/lib/db";
import { isHoneypotFilled, honeypotResponse } from "@/lib/honeypot";
import { sendEmail, sendNotificationEmails } from "@/lib/email/send";
import { exhibitorEnquiryEmail, organizerNotificationEmail } from "@/lib/email/templates";

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rate = checkRateLimit(`exhibitor-enquiry:${clientKey}`);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json();
  if (isHoneypotFilled(body)) return honeypotResponse();

  const parsed = exhibitorEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  try {
    const { referenceNumber } = await submitLead("exhibitor_enquiries", parsed.data, "EXH");

    const ack = exhibitorEnquiryEmail(referenceNumber);
    await sendEmail({ to: parsed.data.email, subject: ack.subject, html: ack.html });

    const notification = organizerNotificationEmail({
      enquiryTypeLabel: "Exhibitor Enquiry",
      referenceNumber,
      submittedAt: new Date(),
      fields: [
        { label: "Full Name", value: parsed.data.fullName },
        { label: "Designation", value: parsed.data.designation },
        { label: "Email", value: parsed.data.email },
        { label: "Phone", value: parsed.data.phone },
        { label: "Country", value: parsed.data.country },
        { label: "Company Name", value: parsed.data.companyName },
        { label: "Company Website", value: parsed.data.companyWebsite ?? "" },
        { label: "Company Address", value: parsed.data.companyAddress },
        { label: "Company Type", value: parsed.data.companyType },
        { label: "Primary Product Category", value: parsed.data.productCategory },
        { label: "Products or Services", value: parsed.data.productsOrServices },
        { label: "Preferred Stand Requirement", value: parsed.data.standRequirement },
        { label: "Message", value: parsed.data.message ?? "" },
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
    console.error("exhibitor-enquiry submission failed", err);
    return NextResponse.json({ error: "Unable to process submission." }, { status: 500 });
  }
}
