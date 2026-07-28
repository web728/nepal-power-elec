import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Disclaimer | Nepal Electric, Power and Lights Expo" },
  description:
    "Read important limitations concerning event information, exhibitors, statistics, travel, external websites and commercial activity.",
  alternates: { canonical: "/disclaimer" },
};

const sections = [
  {
    heading: "Information and Changes",
    body: "Website information is provided for general event, participation and visitor purposes. Dates, operational arrangements, exhibitor participation, product categories and website content may change. Users should verify important details before acting.",
  },
  {
    heading: "No Commercial Guarantee",
    body: "The expo provides a platform for business interaction but does not guarantee sales, orders, leads, contracts, distributor appointments, investments, product approvals or return on investment.",
  },
  {
    heading: "Exhibitor and Product Information",
    body: "Company descriptions and product claims may be supplied by exhibitors. Listing does not constitute endorsement, certification or a guarantee by the organizers. Buyers should conduct their own commercial and technical checks.",
  },
  {
    heading: "Previous-Edition Data",
    body: "The 2025 figures and survey findings are taken from the organizer-issued post-show report. The document does not disclose a complete independent audit or detailed survey methodology. Previous results do not guarantee future attendance or outcomes.",
  },
  {
    heading: "Third-Party Services",
    body: "External websites, registration systems, maps, media reports, social platforms and exhibitor websites operate under their own terms and privacy practices. The organizers do not control their availability or content.",
  },
  {
    heading: "Travel and Visas",
    body: "Visitors and exhibitors are responsible for travel, visas, accommodation, insurance, customs and transport. Registration or invitation correspondence does not guarantee a visa or entry into Nepal.",
  },
  {
    heading: "Contact",
    body: "Questions about official event information may be sent through the Contact page.",
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Disclaimer", href: "/disclaimer" }]} />
      <LegalPage title="Website and Event Disclaimer" sections={sections} />
    </>
  );
}
