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
    "Review the verified history of the Nepal Electric, Power and Lights International Expo, including previous editions.",
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
          The Nepal Electric, Power and Lights International Expo has developed as a premier trade
          platform connecting companies and professionals across the electrical, power, lighting
          and renewable-energy industries.
        </p>

        {/* Previous Editions Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* 1st Edition */}
          <Card>
            <h2 className="text-xl font-semibold text-ink">1st Edition &mdash; January 2023</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The inaugural edition was held from 20&ndash;22 January 2023 at Bhrikuti Mandap,
              Kathmandu, Nepal. It established the foundation for a dedicated industry platform.
            </p>
          </Card>

          {/* 2nd Edition */}
          <Card>
            <h2 className="text-xl font-semibold text-ink">2nd Edition &mdash; September 2023</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The second edition took place from 1&ndash;3 September 2023 at Bhrikuti Mandap,
              Kathmandu, expanding its regional reach and trade participant base.
            </p>
          </Card>

          {/* 3rd Edition */}
          <Card>
            <h2 className="text-xl font-semibold text-ink">3rd Edition &mdash; 2024</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The third edition was held from 6&ndash;8 September 2024 at Bhrikuti Mandap,
              Kathmandu, connecting key decision-makers, engineers, and suppliers.
            </p>
          </Card>

          {/* 4th Edition */}
          <Card>
            <h2 className="text-xl font-semibold text-ink">4th Edition &mdash; 2025</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The fourth edition was held from 29&ndash;31 August 2025 at Bhrikuti Mandap Exhibition
              Hall, Kathmandu, featuring 150+ exhibitors and 15,000+ visitors.
            </p>
          </Card>
        </div>

        {/* Action Buttons */}
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