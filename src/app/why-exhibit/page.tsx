import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { whyExhibitBenefits } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [{ label: "Exhibit", href: "/why-exhibit" }, { label: "Why Exhibit" }];

export const metadata: Metadata = {
  title: { absolute: "Why Exhibit | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Explore reasons to exhibit at the Nepal Electric, Power and Lights International Expo 2026 in Kathmandu.",
  alternates: { canonical: "/why-exhibit" },
};

export default function WhyExhibitPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Exhibit", href: "/why-exhibit" },
          { label: "Why Exhibit", href: "/why-exhibit" },
        ]}
      />
      <PageHero
        title="Present Your Products to Nepal's Electrical and Energy Market"
        breadcrumbs={breadcrumbs}
      />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          The expo provides a focused environment for companies to introduce products, meet
          professional buyers, explore distributor relationships and build visibility across
          electrical, power, lighting, renewable-energy and allied industries.
        </p>

        <div className="mt-12">
          <SectionHeading title="Business Objectives" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {whyExhibitBenefits.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <SectionHeading title="Who Should Exhibit" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Manufacturers, exporters, suppliers, technology providers, service companies,
            importers, distributors and brands serving the event&apos;s industry sectors may
            apply to participate.
          </p>
        </div>

        <div className="mt-12 flex gap-4 rounded-xl border-2 border-yellow bg-yellow/10 px-5 py-5">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-yellow-dark" aria-hidden="true" />
          <p className="text-sm font-medium leading-relaxed text-ink sm:text-base">
            Participation does not guarantee sales, contracts, leads, distributor appointments or
            return on investment.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/exhibitor-profile" variant="primary">
            View Exhibitor Profile
          </Button>
          <Button href={siteConfig.registration.exhibitor} target="_blank" rel="noopener noreferrer" variant="cta-exhibitor">
            Book a Stand
          </Button>
          <Button href="/downloads/2026-event-brochure" variant="ghost">
            Download Brochure
          </Button>
        </div>
      </Container>
    </>
  );
}
