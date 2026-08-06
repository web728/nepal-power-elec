import { z } from "zod";

// 1. Consent Helper
const consentRequired = z.boolean().refine((v) => v === true, {
  message: "Accept the Privacy Policy and Terms and Conditions to continue.",
});

// 2. Global Phone Helper (Supports +, spaces, dashes, brackets for all international codes)
const phoneRegex = /^[+0-9\s()\-]{6,25}$/;

const requiredPhone = z
  .string()
  .min(1, "Enter your phone number.")
  .refine((val) => phoneRegex.test(val.trim()), {
    message: "Enter a valid phone number (e.g. +1 234 567 8900).",
  });

const optionalPhone = z
  .string()
  .transform((val) => val.trim())
  .refine((val) => val === "" || phoneRegex.test(val), {
    message: "Enter a valid phone number (e.g. +1 234 567 8900).",
  })
  .optional()
  .or(z.literal(""));

// 3. Global URL Helper (Auto-prepends https:// if missing)
// Any TLD (.com, .org, .tech, .pro, .ai, .co.uk, etc.) support
const flexibleUrl = z
  .string()
  .transform((val) => val.trim().toLowerCase()) // Auto fix spaces and capital letters
  .transform((val) => {
    if (!val) return "";
    // Handle paths/urls without protocol
    if (!/^https?:\/\//i.test(val)) {
      return `https://${val}`;
    }
    return val;
  })
  .refine(
    (val) => {
      if (!val) return true; // Empty is allowed if optional
      try {
        const parsed = new URL(val);
        // Ensure valid hostname with at least one dot (e.g. site.org, site.tech)
        return parsed.hostname.includes(".") && parsed.hostname.split(".").pop()!.length >= 2;
      } catch {
        return false;
      }
    },
    { message: "Enter a valid website URL (e.g. example.org or example.tech)." }
  )
  .optional()
  .or(z.literal(""));


// --- SCHEMAS ---

// Exhibitor Enquiry Form Schema
export const exhibitorEnquirySchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  designation: z.string().min(1, "Enter your designation.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: requiredPhone,
  country: z.string().min(1, "Enter your country.").max(100),
  companyName: z.string().min(1, "Enter your company name.").max(200),
  companyWebsite: flexibleUrl,
  companyAddress: z.string().min(1, "Enter your company address.").max(300),
  companyType: z.string().min(1, "Select a company type."),
  productCategory: z.string().min(1, "Select a primary product category."),
  productsOrServices: z.string().min(1, "Describe your products or services.").max(1000),
  standRequirement: z.string().min(1, "Describe your preferred stand requirement.").max(500),
  message: z.string().max(2000).optional().or(z.literal("")),
  privacyConsent: consentRequired,
});
export type ExhibitorEnquiryInput = z.infer<typeof exhibitorEnquirySchema>;

// Visitor Registration Form
export const visitorRegistrationSchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  designation: z.string().min(1, "Enter your designation.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: requiredPhone,
  country: z.string().min(1, "Enter your country.").max(100),
  companyName: z.string().min(1, "Enter your company or organization.").max(200),
  companyWebsite: flexibleUrl,
  industry: z.string().min(1, "Select your industry."),
  companyType: z.string().min(1, "Select a company type."),
  productCategories: z.array(z.string()).min(1, "Select at least one product category."),
  visitPurpose: z.string().min(1, "Describe the purpose of your visit.").max(1000),
  privacyConsent: consentRequired,
});
export type VisitorRegistrationInput = z.infer<typeof visitorRegistrationSchema>;

// Media Enquiry Form
export const mediaEnquirySchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  designation: z.string().min(1, "Enter your designation.").max(150),
  mediaOrganization: z.string().min(1, "Enter your media organization.").max(200),
  mediaWebsite: flexibleUrl,
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: requiredPhone,
  country: z.string().min(1, "Enter your country.").max(100),
  mediaType: z.string().min(1, "Select a media type."),
  language: z.string().min(1, "Select a language."),
  enquiryType: z.string().min(1, "Select an enquiry type."),
  requestedInformation: z.string().min(1, "Describe the information or interview requested.").max(1500),
  deadline: z.string().optional().or(z.literal("")),
  supportingLink: flexibleUrl,
  privacyConsent: consentRequired,
});
export type MediaEnquiryInput = z.infer<typeof mediaEnquirySchema>;

// General Enquiry Form ("Contact Us")
export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: optionalPhone,
  country: z.string().min(1, "Enter your country.").max(100),
  company: z.string().optional().or(z.literal("")),
  enquiryType: z.string().min(1, "Select an enquiry type."),
  subject: z.string().min(1, "Enter a subject.").max(200),
  message: z.string().min(1, "Enter your message.").max(2000),
  privacyConsent: consentRequired,
});
export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Newsletter Subscription
export const newsletterSchema = z.object({
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  consent: consentRequired,
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

// Accessibility Feedback
export const accessibilityFeedbackSchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  pageOrDocument: z.string().min(1, "Identify the page or document.").max(300),
  deviceOrBrowser: z.string().min(1, "Tell us the device or browser you used.").max(200),
  issueDescription: z.string().min(1, "Describe the problem experienced.").max(2000),
  preferredContactMethod: z.string().min(1, "Select a preferred contact method."),
  privacyConsent: consentRequired,
});
export type AccessibilityFeedbackInput = z.infer<typeof accessibilityFeedbackSchema>;

// Quick Enquiry
export const quickEnquirySchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: optionalPhone,
  country: z.string().min(1, "Enter your country.").max(100),
  interest: z.string().min(1, "Select your area of interest."),
  message: z.string().min(1, "Enter your message.").max(2000),
  privacyConsent: consentRequired,
});
export type QuickEnquiryInput = z.infer<typeof quickEnquirySchema>;



// Post-Show Report Download Lead Form Schema
export const postShowReportSchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: optionalPhone,
  country: z.string().min(1, "Enter your country.").max(100),
  company: z.string().optional().or(z.literal("")),
  privacyConsent: consentRequired,
});

export type PostShowReportInput = z.infer<typeof postShowReportSchema>;


// Event Brochure Download Lead Form Schema
export const brochureDownloadSchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: optionalPhone,
  country: z.string().min(1, "Enter your country.").max(100),
  company: z.string().optional().or(z.literal("")),
  privacyConsent: consentRequired,
});

export type BrochureDownloadInput = z.infer<typeof brochureDownloadSchema>;