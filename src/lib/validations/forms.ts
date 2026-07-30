import { z } from "zod";

const consentRequired = z.boolean().refine((v) => v === true, { message: "Accept the Privacy Policy and Terms and Conditions to continue." });

// Exhibitor Enquiry Form ("Book a Stand") — field groups per the approved
// content master (Contact details / Company details / Exhibit details / Consent).
export const exhibitorEnquirySchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  designation: z.string().min(1, "Enter your designation.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: z.string().min(6, "Enter a valid phone number.").max(20),
  country: z.string().min(1, "Select your country."),
  companyName: z.string().min(1, "Enter your company name.").max(200),
  companyWebsite: z.string().url("Enter a valid website URL.").optional().or(z.literal("")),
  companyAddress: z.string().min(1, "Enter your company address.").max(300),
  companyType: z.string().min(1, "Select a company type."),
  productCategory: z.string().min(1, "Select a primary product category."),
  productsOrServices: z.string().min(1, "Describe your products or services.").max(1000),
  standRequirement: z.string().min(1, "Describe your preferred stand requirement.").max(500),
  message: z.string().max(2000).optional().or(z.literal("")),
  privacyConsent: consentRequired,
});
export type ExhibitorEnquiryInput = z.infer<typeof exhibitorEnquirySchema>;

// Visitor Registration Form ("Register to Visit")
export const visitorRegistrationSchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  designation: z.string().min(1, "Enter your designation.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: z.string().min(6, "Enter a valid phone number.").max(20),
  country: z.string().min(1, "Select your country."),
  companyName: z.string().min(1, "Enter your company or organization.").max(200),
  companyWebsite: z.string().url("Enter a valid website URL.").optional().or(z.literal("")),
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
  mediaWebsite: z.string().url("Enter a valid website URL.").optional().or(z.literal("")),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: z.string().min(6, "Enter a valid phone number.").max(20),
  country: z.string().min(1, "Select your country."),
  mediaType: z.string().min(1, "Select a media type."),
  language: z.string().min(1, "Select a language."),
  enquiryType: z.string().min(1, "Select an enquiry type."),
  requestedInformation: z.string().min(1, "Describe the information or interview requested.").max(1500),
  deadline: z.string().optional().or(z.literal("")),
  supportingLink: z.string().url("Enter a valid URL.").optional().or(z.literal("")),
  privacyConsent: consentRequired,
});
export type MediaEnquiryInput = z.infer<typeof mediaEnquirySchema>;

// General Enquiry Form ("Contact Us")
export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: z.string().optional().or(z.literal("")),
  country: z.string().min(1, "Select your country."),
  company: z.string().optional().or(z.literal("")),
  enquiryType: z.string().min(1, "Select an enquiry type."),
  subject: z.string().min(1, "Enter a subject.").max(200),
  message: z.string().min(1, "Enter your message.").max(2000),
  privacyConsent: consentRequired,
});
export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Newsletter subscription (footer)
export const newsletterSchema = z.object({
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  consent: consentRequired,
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

// Accessibility Feedback — routed as a General Enquiry tagged "Accessibility"
// per the design spec's Section 8.1 routing rule.
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

// Quick Enquiry (homepage lead capture)
export const quickEnquirySchema = z.object({
  fullName: z.string().min(1, "Enter your full name.").max(150),
  email: z.string().min(1, "Enter a valid email address.").email("Enter a valid email address."),
  phone: z.string().optional().or(z.literal("")),
  country: z.string().min(1, "Select your country."),
  interest: z.string().min(1, "Select your area of interest."),
  message: z.string().min(1, "Enter your message.").max(2000),
  privacyConsent: consentRequired,
});
export type QuickEnquiryInput = z.infer<typeof quickEnquirySchema>;
