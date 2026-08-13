import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Nepal Electric, Power and Lights Expo" },
  description: "Read how the expo website collects, uses, shares and protects personal information.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    heading: "Scope",
    body: "This policy explains how the joint organizers collect, use, store and share personal information submitted through the official website, registration forms, enquiry forms, email communication and event-administration systems.",
  },
  {
    heading: "Information Collected",
    body: "Information may include name, company, designation, email, phone, country, industry, product interests, enquiry details, registration information, company profile information and technical website data such as browser, device, pages viewed and general location derived from an Internet Protocol address.",
  },
  {
    heading: "How Information Is Used",
    body: [
      "Process visitor registrations and exhibitor enquiries",
      "Respond to questions and media requests",
      "Manage event access and administration",
      "Send operational and consented event communications",
      "Maintain website security and prevent abuse",
      "Analyze aggregate website and event interest",
      "Meet legal, financial and administrative obligations",
    ],
  },
  {
    heading: "Sharing",
    body: "Information may be shared among Futurex Trade Fair and Events Pvt. Ltd., Exhibitions & Trade Services India Pvt. Ltd. and Media Space Solutions Pvt. Ltd., and with approved service providers supporting hosting, forms, registration, email, security, analytics, badge production or event operations. The organizers do not sell personal information to unrelated third parties.",
  },
  {
    heading: "Visitor Information and Exhibitors",
    body: "Visitor details should be shared with an exhibitor only where the visitor requests contact, voluntarily uses an approved lead-capture method or otherwise provides appropriate consent.",
  },
  {
    heading: "International Processing",
    body: "Because the organizing partners operate across Nepal and India and may use service providers in other locations, information may be processed outside the user's country. Reasonable steps should be taken to protect it.",
  },
  {
    heading: "Cookies and Analytics",
    body: "The website may use essential cookies and, with appropriate choice, analytics or other optional technologies. Further information appears in the Cookie Policy.",
  },
  {
    heading: "Photographs and Video",
    body: "Photography and filming may take place during the event for documentation, media coverage and future event communication. Attendees with a specific concern should contact the organizers.",
  },
  {
    heading: "Retention and Security",
    body: "Information is retained only as long as reasonably necessary for event administration, communication, legal records, security and dispute management. Reasonable administrative and technical safeguards are used, although no internet system can be guaranteed completely secure.",
  },
  {
    heading: "User Requests",
    body: "Subject to applicable law, users may request access, correction, updating, deletion where appropriate, withdrawal of marketing consent or information about how their data is used. Identity verification may be required.",
  },
  {
    heading: "Contact",
    body: "Privacy enquiries may be sent to any of the three organizing partners listed on the Contact page.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />
      <LegalPage
        title="Privacy Policy"
        effectiveNote=""
        sections={sections}
      />
    </>
  );
}
