import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { OrganizersSection } from "@/components/sections/organizers-section";
import { MediaEnquiryForm } from "@/components/forms/media-enquiry-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const breadcrumbs = [{ label: "Media", href: "/news" }, { label: "Media Enquiry" }];

export const metadata: Metadata = {
  title: { absolute: "Media Enquiry | Nepal Electric, Power and Lights Expo 2026" },
  description: "Request press information, interviews, media accreditation, photographs or official materials for the 2026 expo.",
  alternates: { canonical: "/media-enquiry" },
};

export default function MediaEnquiryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Media", href: "/news" },
          { label: "Media Enquiry", href: "/media-enquiry" },
        ]}
      />
      <PageHero title="Request Verified Information and Media Support" breadcrumbs={breadcrumbs} />

      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          Journalists, editors, photographers, broadcasters, digital publishers and industry media may contact the
          organizing team for event information, interviews, accreditation, approved photographs and press
          materials.
        </p>

        <div className="mt-6 flex max-w-3xl gap-4 rounded-xl border-2 border-yellow bg-yellow/10 px-5 py-5">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-yellow-dark" aria-hidden="true" />
          <p className="text-sm font-medium leading-relaxed text-ink sm:text-base">
            Submitting a request does not confirm media accreditation, interview availability, filming permission
            or access to restricted areas.
          </p>
        </div>

        <div className="mt-12 max-w-3xl">
          <MediaEnquiryForm />
        </div>
      </Container>

      <OrganizersSection />
    </>
  );
}
