import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const breadcrumbs = [{ label: "Event History" }];

export const metadata: Metadata = {
  title: { absolute: "Event History | Nepal Electric, Power and Lights Expo" },
  description:
    "Review the verified history of the Nepal Electric, Power and Lights International Expo, including the 2025 and 2026 editions.",
  alternates: { canonical: "/event-history" },
};

export default function EventHistoryPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Event History", href: "/event-history" }]} />
      <PageHero
        title="Building a Dedicated Electrical and Energy Exhibition in Nepal"
        breadcrumbs={breadcrumbs}
         bgImage="/images/hero/Crowds-at-Auto-Expo.jpg" 
        bgOpacity="opacity-50" 
      />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          The Nepal Electric, Power and Lights International Expo has developed as a trade
          platform connecting companies and professionals across the electrical, power, lighting
          and renewable-energy industries.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold text-ink">4th Edition &mdash; 2025</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The fourth edition was held from 29-31 August 2025 at Bhrikuti Mandap Exhibition
              Hall in Kathmandu. The organizer-issued post-show report records 150+ exhibitors,
              participation from 5+ countries and 15,000+ visitors. The report also documents
              visitor profiles, business interests, photographs and media coverage.
            </p>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold text-ink">5th Edition &mdash; 2026</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The fifth edition will be held from 4-6 September 2026 at Bhrikuti Mandap
              Exhibition Hall, Kathmandu. It will continue the event&apos;s focus on electrical
              equipment, power, energy, transmission and distribution, renewable energy,
              lighting, automation and allied technologies.
            </p>
          </Card>
        </div>

        <div className="mt-10 rounded-xl border border-yellow/40 bg-yellow/10 px-5 py-4">
          <p className="text-sm leading-relaxed text-ink">
            Previous-edition figures are organizer-reported. They do not guarantee attendance,
            enquiries or commercial outcomes for the 2026 edition.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/past-editions/2025-edition" variant="primary">
            View 2025 Edition
          </Button>
          <Button href="/downloads/2025-post-show-report" variant="outline">
            Download 2025 Report
          </Button>
          <Button href="/about-the-expo" variant="ghost">
            Explore 2026 Expo
          </Button>
        </div>
      </Container>
    </>
  );
}
