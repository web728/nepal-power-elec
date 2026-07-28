import { sectors } from "@/lib/content/sectors";

export const productCategoryOptions = sectors.map((s) => ({ label: s.name, value: s.slug }));

export const companyTypeOptions = [
  "Manufacturer",
  "Exporter",
  "Importer",
  "Distributor / Dealer",
  "Trading Company",
  "Service Provider",
  "Consultant",
  "Association / Institution",
  "Other",
].map((v) => ({ label: v, value: v }));

export const industryOptions = [
  "Electrical Equipment & Components",
  "Power & Energy",
  "Construction & Infrastructure",
  "Renewable Energy",
  "Lighting & LED",
  "Automation & Smart Technology",
  "Distribution & Retail",
  "Government & Institutions",
  "Other",
].map((v) => ({ label: v, value: v }));

// Enquiry Types — verbatim dropdown list from the Contact Us form (Content
// Master, page 36-37).
export const enquiryTypeOptions = [
  "Exhibitor participation",
  "Visitor registration",
  "Media enquiry",
  "Partnership enquiry",
  "Product category enquiry",
  "Venue information",
  "Document request",
  "General enquiry",
].map((v) => ({ label: v, value: v }));

// Media Request Types — verbatim dropdown list from the Media Enquiry form
// (Content Master, page 31-32).
export const mediaEnquiryTypeOptions = [
  "General event information",
  "Interview request",
  "Media registration",
  "Photography or filming request",
  "Press release or official images",
  "Previous-edition statistics",
  "Exhibitor information",
  "Organizer comment",
  "Media collaboration",
].map((v) => ({ label: v, value: v }));

export const mediaTypeOptions = ["Print", "Online / Digital", "Broadcast", "Radio", "Podcast", "Photography", "Other"].map(
  (v) => ({ label: v, value: v })
);

export const languageOptions = ["English", "Nepali", "Hindi", "Other"].map((v) => ({ label: v, value: v }));

export const preferredContactMethodOptions = ["Email", "Phone"].map((v) => ({ label: v, value: v }));

export const countryOptions = [
  "Nepal",
  "India",
  "China",
  "Bangladesh",
  "Bhutan",
  "Sri Lanka",
  "Pakistan",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Other",
].map((v) => ({ label: v, value: v }));
