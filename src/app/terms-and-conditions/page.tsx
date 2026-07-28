import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Terms and Conditions | Nepal Electric, Power and Lights Expo" },
  description:
    "Read the website, registration, attendance and participation terms for the Nepal Electric, Power and Lights Expo.",
  alternates: { canonical: "/terms-and-conditions" },
};

const sections = [
  {
    heading: "Website and Event Information",
    body: "These terms govern use of the official website, forms, downloads, registration services and event attendance. Information may change as planning develops. Users should verify important details before making travel, shipping or commercial decisions.",
  },
  {
    heading: "Visitor Registration and Admission",
    body: "Registration does not automatically guarantee admission. Entry may be subject to verification, identification, venue capacity, security procedures, event rules and appropriate conduct. Badges may be personal and non-transferable.",
  },
  {
    heading: "Exhibitor Enquiries and Confirmation",
    body: "Submitting an exhibitor enquiry does not reserve space or create a binding booking. Participation is confirmed only through approved commercial documentation, organizer acceptance and completion of the required payment process.",
  },
  {
    heading: "Stands, Products and Demonstrations",
    body: "Exhibitors are responsible for lawful, accurate and safe displays. Products, stand designs and demonstrations may require approval and must comply with venue, electrical, fire, structural and safety requirements.",
  },
  {
    heading: "Commercial Transactions",
    body: "The organizers are not automatically parties to transactions between exhibitors and visitors. Users are responsible for verifying companies, products, specifications, certifications, prices, warranties, delivery, payment terms and legal requirements.",
  },
  {
    heading: "Event Changes and Force Majeure",
    body: "The organizers may change, postpone, relocate, shorten, extend or cancel the event where reasonably necessary because of venue, safety, government, public-health, transport, natural-disaster, technical or other circumstances beyond reasonable control. Exhibitor payment consequences are governed by the applicable written agreement.",
  },
  {
    heading: "Travel and Visas",
    body: "Visitors and exhibitors are responsible for passports, visas, immigration compliance, travel, accommodation, insurance, customs and transport. Registration or invitation correspondence does not guarantee a visa or entry into Nepal.",
  },
  {
    heading: "Photography and Intellectual Property",
    body: "Photography and filming may occur at the event. Event names, logos, documents, photographs and website content may be protected. Unauthorized alteration, commercial exploitation or misleading use is prohibited.",
  },
  {
    heading: "Conduct and Safety",
    body: "Users must follow event staff, venue and safety instructions. Admission or participation may be withdrawn for false information, badge misuse, unsafe conduct, harassment, disruption, property damage or legal violations.",
  },
  {
    heading: "Liability",
    body: "To the extent permitted by law, the organizers are not responsible for indirect or consequential losses arising from website use, third-party services, commercial discussions, travel arrangements, event changes or circumstances outside reasonable control. Nothing excludes liability that cannot lawfully be excluded.",
  },
  {
    heading: "Governing Framework",
    body: "These terms are governed by applicable law in Nepal, subject to any more specific written agreement between an exhibitor and the relevant contracting entity.",
  },
  {
    heading: "Contact",
    body: "Questions may be sent to any organizing partner through the Contact page.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Terms and Conditions", href: "/terms-and-conditions" }]} />
      <LegalPage
        title="Terms and Conditions"
        effectiveNote="Effective upon publication on the official website."
        sections={sections}
      />
    </>
  );
}
