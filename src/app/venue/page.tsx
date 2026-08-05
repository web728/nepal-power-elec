import type { Metadata } from "next";
import { MapPin, ExternalLink, Navigation, Compass } from "lucide-react";
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
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Bhrikuti+Mandap+Exhibition+Hall+Kathmandu";
  const mapEmbedSrc =
    "https://maps.google.com/maps?q=Bhrikuti%20Mandap%20Exhibition%20Hall%20Kathmandu&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Venue", href: "/venue" }]} />
      <PageHero
        title="Bhrikuti Mandap Exhibition Hall, Kathmandu"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/0L1A2244-min-scaled.jpg"
        bgOpacity="opacity-50"
      />

      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          The 5th Nepal Electric, Power and Lights International Expo 2026 will be held at
          Bhrikuti Mandap Exhibition Hall in Kathmandu, Nepal.
        </p>

        {/* Premium Map Section */}
        <div className="mt-10">
          <SectionHeading title="Event Location & Interactive Map" />

          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
            {/* Embedded Live Map */}
            <div className="relative h-[380px] w-full bg-gray-100 sm:h-[480px]">
              <iframe
                title="Bhrikuti Mandap Exhibition Hall Location Map"
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Premium Info Bar below Map */}
            <div className="flex flex-col gap-4 border-t border-border bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal">
                    Official Venue
                  </h3>
                  <p className="mt-0.5 text-base font-semibold text-ink">
                    {siteConfig.venue.full}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal/90"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-sky-dark transition-colors hover:bg-gray-50"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <SectionHeading title="Before Travelling" />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Visitors and exhibitors should review the official website before travelling for
              current registration and event information. International participants remain
              responsible for their own passports, visas, insurance, accommodation, transport and
              customs requirements.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <SectionHeading title="Venue Enquiries" />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              For accessibility, delivery, visitor or exhibitor questions connected with the
              venue, contact any of the organizing partners.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/plan-your-visit" variant="primary">
            Plan Your Visit
          </Button>
          <Button
            href={siteConfig.registration.visitor}
            target="_blank"
            rel="noopener noreferrer"
            variant="cta-visitor"
          >
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