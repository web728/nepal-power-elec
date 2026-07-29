import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { beforeTravelling, atTheExhibition } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [{ label: "Visit", href: "/why-visit" }, { label: "Plan Your Visit" }];

export const metadata: Metadata = {
  title: { absolute: "Plan Your Visit | Nepal Electric, Power and Lights Expo 2026" },
  description: "Plan your visit to the 2026 expo at Bhrikuti Mandap Exhibition Hall in Kathmandu.",
  alternates: { canonical: "/plan-your-visit" },
};

export default function PlanYourVisitPage() {
  const heroDescription = `${siteConfig.dates.display} · ${siteConfig.venue.line1} · ${siteConfig.venue.city}, ${siteConfig.venue.country}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Visit", href: "/why-visit" },
          { label: "Plan Your Visit", href: "/plan-your-visit" },
        ]}
      />
      <PageHero
        title="Prepare for Your Visit to Kathmandu"
        description={heroDescription}
        breadcrumbs={breadcrumbs}
          bgImage="/images/hero/0L1A2531-min-scaled.jpg" 
        bgOpacity="opacity-50"
      />
      <Container as="section" className="py-12 sm:py-16">
        <div>
          <SectionHeading title="Before the Event" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {beforeTravelling.map((item) => (
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
          <SectionHeading title="International Visitors" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            International visitors are responsible for passports, visas, immigration
            requirements, travel insurance, accommodation, local transport and any customs
            requirements. Event registration or invitation correspondence does not guarantee a
            visa or entry into Nepal.
          </p>
        </div>

        <div className="mt-12">
          <SectionHeading title="At the Exhibition" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {atTheExhibition.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={siteConfig.registration.visitor} target="_blank" rel="noopener noreferrer" variant="cta-visitor">
            Register to Visit
          </Button>
          <Button href="/venue" variant="outline">
            View Venue
          </Button>
          <Button href="/contact" variant="ghost">
            Contact Us
          </Button>
        </div>
      </Container>
    </>
  );
}
