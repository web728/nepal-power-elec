import { describe, it, expect } from "vitest";
import {
  exhibitorEnquirySchema,
  visitorRegistrationSchema,
  mediaEnquirySchema,
  contactFormSchema,
  newsletterSchema,
  accessibilityFeedbackSchema,
  quickEnquirySchema,
} from "./forms";

const validExhibitor = {
  fullName: "Test Person",
  designation: "Manager",
  email: "test@example.com",
  phone: "+9779800000000",
  country: "Nepal",
  companyName: "Test Co",
  companyWebsite: "",
  companyAddress: "123 Street, Kathmandu",
  companyType: "Manufacturer",
  productCategory: "power-and-energy",
  productsOrServices: "Inverters",
  standRequirement: "18 sqm",
  message: "",
  privacyConsent: true,
};

describe("exhibitorEnquirySchema", () => {
  it("accepts a fully valid submission", () => {
    expect(exhibitorEnquirySchema.safeParse(validExhibitor).success).toBe(true);
  });

  it("rejects a missing required field", () => {
    const { companyName, ...rest } = validExhibitor;
    void companyName;
    expect(exhibitorEnquirySchema.safeParse(rest).success).toBe(false);
  });

  it("rejects when privacyConsent is false", () => {
    const result = exhibitorEnquirySchema.safeParse({ ...validExhibitor, privacyConsent: false });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = exhibitorEnquirySchema.safeParse({ ...validExhibitor, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid company website URL when provided", () => {
    const result = exhibitorEnquirySchema.safeParse({ ...validExhibitor, companyWebsite: "not-a-url" });
    expect(result.success).toBe(false);
  });
});

describe("visitorRegistrationSchema", () => {
  const valid = {
    fullName: "Visitor Name",
    designation: "Engineer",
    email: "visitor@example.com",
    phone: "+9779811111111",
    country: "Nepal",
    companyName: "Visitor Co",
    companyWebsite: "",
    industry: "Power & Energy",
    companyType: "Distributor / Dealer",
    productCategories: ["power-and-energy", "lighting"],
    visitPurpose: "Sourcing new suppliers",
    privacyConsent: true,
  };

  it("accepts a fully valid submission", () => {
    expect(visitorRegistrationSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an empty productCategories array", () => {
    const result = visitorRegistrationSchema.safeParse({ ...valid, productCategories: [] });
    expect(result.success).toBe(false);
  });
});

describe("mediaEnquirySchema", () => {
  const valid = {
    fullName: "Reporter Name",
    designation: "Correspondent",
    mediaOrganization: "Example Press",
    mediaWebsite: "",
    email: "reporter@example.com",
    phone: "+9779822222222",
    country: "Nepal",
    mediaType: "Online / Digital",
    language: "English",
    enquiryType: "Interview request",
    requestedInformation: "Would like to interview the organizers.",
    deadline: "",
    supportingLink: "",
    privacyConsent: true,
  };

  it("accepts a fully valid submission", () => {
    expect(mediaEnquirySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid supportingLink URL", () => {
    const result = mediaEnquirySchema.safeParse({ ...valid, supportingLink: "not-a-url" });
    expect(result.success).toBe(false);
  });
});

describe("contactFormSchema", () => {
  const valid = {
    fullName: "Contact Name",
    email: "contact@example.com",
    phone: "",
    country: "Nepal",
    company: "",
    enquiryType: "General enquiry",
    subject: "Question about the expo",
    message: "I have a question.",
    privacyConsent: true,
  };

  it("accepts a fully valid submission", () => {
    expect(contactFormSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an empty message", () => {
    const result = contactFormSchema.safeParse({ ...valid, message: "" });
    expect(result.success).toBe(false);
  });
});

describe("newsletterSchema", () => {
  it("accepts a valid email with consent", () => {
    expect(newsletterSchema.safeParse({ email: "a@b.com", consent: true }).success).toBe(true);
  });

  it("rejects without consent", () => {
    expect(newsletterSchema.safeParse({ email: "a@b.com", consent: false }).success).toBe(false);
  });
});

describe("accessibilityFeedbackSchema", () => {
  const valid = {
    fullName: "Feedback Name",
    email: "feedback@example.com",
    pageOrDocument: "/venue",
    deviceOrBrowser: "iPhone Safari",
    issueDescription: "Low contrast text",
    preferredContactMethod: "Email",
    privacyConsent: true,
  };

  it("accepts a fully valid submission", () => {
    expect(accessibilityFeedbackSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a missing issue description", () => {
    const { issueDescription, ...rest } = valid;
    void issueDescription;
    expect(accessibilityFeedbackSchema.safeParse(rest).success).toBe(false);
  });
});

describe("quickEnquirySchema", () => {
  const valid = {
    fullName: "Lead Name",
    email: "lead@example.com",
    phone: "",
    interest: "Exhibiting",
    message: "Interested in booking a stand.",
    privacyConsent: true,
  };

  it("accepts a fully valid submission", () => {
    expect(quickEnquirySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an empty interest", () => {
    const result = quickEnquirySchema.safeParse({ ...valid, interest: "" });
    expect(result.success).toBe(false);
  });

  it("rejects without consent", () => {
    const result = quickEnquirySchema.safeParse({ ...valid, privacyConsent: false });
    expect(result.success).toBe(false);
  });
});
