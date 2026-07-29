import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { whyVisitBenefits } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [{ label: "Visit", href: "/why-visit" }, { label: "Why Visit" }];

export const metadata: Metadata = {
  title: { absolute: "Why Visit | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Discover why buyers, engineers, distributors, contractors and industry professionals should visit the 2026 expo.",
  alternates: { canonical: "/why-visit" },
};

export default function WhyVisitPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Visit", href: "/why-visit" },
          { label: "Why Visit", href: "/why-visit" },
        ]}
      />
      <PageHero
        title="Discover Products, Suppliers and Business Connections"
        breadcrumbs={breadcrumbs}
          bgImage="/images/hero/0L1A2244-min-scaled.jpg" 
        bgOpacity="opacity-50"
      />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          The expo gives trade and professional visitors an opportunity to explore electrical,
          power, renewable-energy, lighting and automation solutions in one focused setting.
        </p>

        <div className="mt-12">
          <SectionHeading title="Reasons to Attend" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {whyVisitBenefits.map((item) => (
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
          <SectionHeading title="Prepare for a Productive Visit" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Review the event categories, register in advance, identify priority suppliers when
            the confirmed directory is available and prepare technical or commercial questions
            before attending.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={siteConfig.registration.visitor} target="_blank" rel="noopener noreferrer" variant="cta-visitor">
            Register to Visit
          </Button>
          <Button href="/visitor-profile" variant="outline">
            View Visitor Profile
          </Button>
          <Button href="/plan-your-visit" variant="ghost">
            Plan Your Visit
          </Button>
        </div>
      </Container>
    </>
  );
}
