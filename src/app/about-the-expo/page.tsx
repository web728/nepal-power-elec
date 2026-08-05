import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { expoSupports } from "@/lib/content/home-content";

const breadcrumbs = [{ label: "About the Expo" }];

export const metadata: Metadata = {
  title: { absolute: "About the Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Learn about the purpose, sectors and professional audience of the Nepal Electric, Power and Lights International Expo 2026.",
  alternates: { canonical: "/about-the-expo" },
};

export default function AboutTheExpoPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "About the Expo", href: "/about-the-expo" }]} />
      <PageHero
        title="Connecting the Electrical, Power and Energy Value Chain"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/Large-image-Energy-connectivity.jpg" 
        bgOpacity="opacity-50" 
      />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          5th Nepal Electric, Power and Lights International Expo is a business exhibition for
          manufacturers, suppliers, importers, distributors, dealers, engineers, consultants,
          project developers, utilities, contractors, institutions and buyers operating across
          the electrical and energy sectors.
        </p>

        <div className="mt-12">
          <SectionHeading title="What the Expo Supports" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {expoSupports.map((item) => (
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
          <SectionHeading title="Industry Coverage" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            The event covers power and energy, transmission and distribution, wires and cables,
            renewable energy, batteries and storage, lighting and LED, electrical and electronic
            products, automation, appliances, electric mobility and allied professional services.
          </p>
        </div>

        <div className="mt-12">
          <SectionHeading title="Who the Event Serves" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            The expo serves both companies seeking market access and professionals seeking
            products, suppliers and technical solutions. It is designed as a trade-oriented
            environment for meaningful business interaction.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/exhibitor-profile" variant="primary">
            View Exhibitor Profile
          </Button>
          <Button href="/visitor-profile" variant="outline">
            View Visitor Profile
          </Button>
          <Button href="/contact" variant="ghost">
            Contact the Organizers
          </Button>
        </div>
      </Container>
    </>
  );
}