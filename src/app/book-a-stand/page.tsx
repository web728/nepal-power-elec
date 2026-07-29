import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { OrganizersSection } from "@/components/sections/organizers-section";
import { ExhibitorEnquiryForm } from "@/components/forms/exhibitor-enquiry-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const breadcrumbs = [{ label: "Exhibit", href: "/why-exhibit" }, { label: "Book a Stand" }];

export const metadata: Metadata = {
  title: { absolute: "Book a Stand | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Submit an exhibitor enquiry for the Nepal Electric, Power and Lights International Expo 2026 in Kathmandu.",
  alternates: { canonical: "/book-a-stand" },
};

const whatHappensNext = [
  "The organizing team reviews the company and product information.",
  "A representative contacts the applicant regarding participation and available options.",
  "The applicant receives official commercial and participation documentation.",
  "Participation is confirmed only after the required approval, documentation and payment process is completed.",
];

export default function BookAStandPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Exhibit", href: "/why-exhibit" },
          { label: "Book a Stand", href: "/book-a-stand" },
        ]}
      />
      <PageHero title="Apply to Exhibit at the 2026 Edition" breadcrumbs={breadcrumbs}
       bgImage="/images/hero/np11-scaled.jpg" 
        bgOpacity="opacity-50" />


      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          Submit your company and product information to begin the participation process. The organizing team
          will review your enquiry and contact you using the details provided.
        </p>

        <div className="mt-12 max-w-3xl">
          <ExhibitorEnquiryForm />
        </div>
      </Container>

      <OrganizersSection />
    </>
  );
}
