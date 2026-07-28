import type { Metadata } from "next";
import { MapPin, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [{ label: "Venue" }];

export const metadata: Metadata = {
  title: { absolute: "Venue | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Find venue information for the Nepal Electric, Power and Lights International Expo at Bhrikuti Mandap Exhibition Hall, Kathmandu.",
  alternates: { canonical: "/venue" },
};

export default function VenuePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Venue", href: "/venue" }]} />
      <PageHero title="Bhrikuti Mandap Exhibition Hall, Kathmandu" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          The 5th Nepal Electric, Power and Lights International Expo 2026 will be held at
          Bhrikuti Mandap Exhibition Hall in Kathmandu, Nepal.
        </p>

        <div className="mt-10">
          <SectionHeading title="Event Location" />
          <div className="mt-4 flex max-w-xl flex-col gap-3 rounded-xl border border-border bg-bg px-5 py-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
              <p className="text-base font-medium text-ink">{siteConfig.venue.full}</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Bhrikuti+Mandap+Exhibition+Hall+Kathmandu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-sky-dark hover:underline"
            >
              View on Google Maps
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12">
          <SectionHeading title="Before Travelling" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Visitors and exhibitors should review the official website before travelling for
            current registration and event information. International participants remain
            responsible for their own passports, visas, insurance, accommodation, transport and
            customs requirements.
          </p>
        </div>

        <div className="mt-12">
          <SectionHeading title="Venue Enquiries" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            For accessibility, delivery, visitor or exhibitor questions connected with the
            venue, contact any of the organizing partners.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/plan-your-visit" variant="primary">
            Plan Your Visit
          </Button>
          <Button href={siteConfig.registration.visitor} target="_blank" rel="noopener noreferrer" variant="cta-visitor">
            Register to Visit
          </Button>
          <Button href="/contact" variant="ghost">
            Contact Us
          </Button>
        </div>
      </Container>
    </>
  );
}
