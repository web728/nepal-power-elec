import { describe, it, expect } from "vitest";
import { escapeHtml, sanitizeHeaderValue, organizerNotificationEmail } from "./templates";

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml('<script>alert("hi")</script>')).toBe(
      "&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;"
    );
  });

  it("escapes ampersands and quotes", () => {
    expect(escapeHtml(`Tom & Jerry's "Show"`)).toBe("Tom &amp; Jerry&#39;s &quot;Show&quot;");
  });
});

describe("sanitizeHeaderValue", () => {
  it("strips line breaks that could be used for header injection", () => {
    expect(sanitizeHeaderValue("Normal Subject\r\nBcc: attacker@example.com")).toBe(
      "Normal Subject Bcc: attacker@example.com"
    );
  });

  it("leaves a normal single-line value unchanged", () => {
    expect(sanitizeHeaderValue("Reference EXH-ABC123")).toBe("Reference EXH-ABC123");
  });
});

describe("organizerNotificationEmail", () => {
  it("HTML-escapes submitted field values in the rendered email", () => {
    const { html } = organizerNotificationEmail({
      enquiryTypeLabel: "Exhibitor Enquiry",
      referenceNumber: "EXH-TEST-0001",
      submittedAt: new Date("2026-01-01T00:00:00Z"),
      fields: [{ label: "Message", value: '<img src=x onerror="alert(1)">' }],
    });
    expect(html).not.toContain("<img src=x onerror");
    expect(html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });

  it("omits empty optional fields rather than showing a blank row", () => {
    const { html } = organizerNotificationEmail({
      enquiryTypeLabel: "Contact Enquiry",
      referenceNumber: "GEN-TEST-0001",
      submittedAt: new Date(),
      fields: [
        { label: "Company", value: "" },
        { label: "Message", value: "Hello there" },
      ],
    });
    expect(html).not.toContain(">Company<");
    expect(html).toContain("Hello there");
  });

  it("includes the reference number and enquiry type in the subject", () => {
    const { subject } = organizerNotificationEmail({
      enquiryTypeLabel: "Media Enquiry",
      referenceNumber: "MED-TEST-0001",
      submittedAt: new Date(),
      fields: [],
    });
    expect(subject).toBe("[Media Enquiry] MED-TEST-0001");
  });
});
