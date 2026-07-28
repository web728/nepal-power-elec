import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [{ label: "Downloads", href: "/downloads" }, { label: "2026 Event Brochure" }];

const brochureSectors = [
  "Power and Energy",
  "Transmission and Distribution Equipment",
  "Electricals and Electronics",
  "Lighting",
  "Home Appliances",
  "Electro Energetics",
];

export const metadata: Metadata = {
  title: { absolute: "2026 Event Brochure | Nepal Electric, Power and Lights Expo" },
  description:
    "Download the official brochure for the 5th Nepal Electric, Power and Lights International Expo 2026.",
  alternates: { canonical: "/downloads/2026-event-brochure" },
};

export default function BrochureDownloadPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Downloads", href: "/downloads" },
          { label: "2026 Event Brochure", href: "/downloads/2026-event-brochure" },
        ]}
      />
      <PageHero title="Download the Official Brochure for the 5th Edition" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <div className="rounded-lg border border-border bg-bg px-5 py-4 text-sm font-medium text-ink">
            5th Nepal Electric, Power and Lights International Expo 2026 — Event Brochure | PDF | English
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            The brochure introduces the event, its principal industry sectors, reasons to exhibit and
            visit, exhibitor profile, visitor profile, dates and venue.
          </p>

          <div className="mt-10">
            <SectionHeading title="Main Sectors in the Brochure" />
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {brochureSectors.map((sector) => (
                <li
                  key={sector}
                  className="rounded-lg border border-border bg-white px-4 py-3 text-sm leading-relaxed text-ink"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-base leading-relaxed text-muted">
            The brochure is an introductory document. Current website information and official
            participation documentation govern where details have been updated.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              href="/downloads/Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Download Brochure
            </Button>
            <Button href={siteConfig.registration.exhibitor} target="_blank" rel="noopener noreferrer" variant="cta-exhibitor">
              Book a Stand
            </Button>
            <Button href={siteConfig.registration.visitor} target="_blank" rel="noopener noreferrer" variant="cta-visitor">
              Register to Visit
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
