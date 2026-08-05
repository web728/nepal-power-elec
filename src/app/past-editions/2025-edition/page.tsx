import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { galleryImageCaption } from "@/lib/content/home-content";

const breadcrumbs = [
  { label: "Past Editions", href: "/past-editions/2025-edition" },
  { label: "2025 Edition" },
];

export const metadata: Metadata = {
  title: { absolute: "2025 Edition | Nepal Electric, Power and Lights Expo" },
  description:
    "Review verified highlights and organizer-reported results from the 2025 Nepal Electric, Power and Lights Expo.",
  alternates: { canonical: "/past-editions/2025-edition" },
};

export default function Edition2025Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Past Editions", href: "/past-editions/2025-edition" },
          { label: "2025 Edition", href: "/past-editions/2025-edition" },
        ]}
      />
      <PageHero
        title="4th Nepal Electric, Power and Lights International Expo"
        description="29-31 August 2025 · Bhrikuti Mandap Exhibition Hall · Kathmandu, Nepal"
        breadcrumbs={breadcrumbs}
      />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          The 2025 edition brought together exhibitors and visitors across the electrical, power,
          energy, lighting, renewable-energy and allied sectors.
        </p>

        <div className="mt-12">
          <SectionHeading title="2025 Edition Results" />
          
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <li className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink">
              <strong>5+</strong> Participating Countries
            </li>
            <li className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink">
              <strong>150+</strong> Exhibitors
            </li>
            <li className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink">
              <strong>300+</strong> Brands & Solutions
            </li>
            <li className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink">
              <strong>15,000+</strong> Trade Visitors
            </li>
            <li className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink">
              <strong>3 Days</strong> of Business Networking
            </li>
          </ul>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            The post-show report also presents visitor-role data, industry representation,
            business intent, company size, survey findings, photographs and media coverage.
          </p>
        </div>

        {/* ================= OPENING CEREMONY SECTION ================= */}
        <div className="mt-12">
          <SectionHeading title="Opening Ceremony" />
          <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-ink">
            <p>
              The 4th edition of the Nepal Electric, Power & Lights International Expo 2025 commenced with a prestigious inaugural ceremony graced by <strong>Hon. Damodar Bhandari</strong>, Minister of Industry, Commerce & Supplies, Government of Nepal.
            </p>
            <p className="text-muted">
              The ceremony began with a welcome address by the organizing team, followed by the traditional ribbon-cutting. The Honourable Minister highlighted the importance of such international platforms in connecting Nepal’s growing market with global innovations.
            </p>
          </div>
        </div>

        <figure className="mt-12 overflow-hidden rounded-xl border border-border">
          <Image
            src="/images/gallery/2025/nepal-electric-expo-2025-glimpses-01.webp"
            alt="Exhibition floor, stands and visitor activity at the 2025 Nepal Electric, Power and Lights Expo"
            width={1600}
            height={1131}
            className="h-auto w-full"
          />
          <figcaption className="border-t border-border bg-bg px-4 py-3 text-sm text-muted">
            {galleryImageCaption}
          </figcaption>
        </figure>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/past-editions/post-show-statistics" variant="primary">
            View Statistics
          </Button>
          <Button href="/past-editions/photo-gallery" variant="outline">
            View Gallery
          </Button>
          <Button href="/downloads/2025-post-show-report" variant="ghost">
            Download Report
          </Button>
        </div>
      </Container>
    </>
  );
}