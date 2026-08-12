import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { galleryImageCaption } from "@/lib/content/home-content";
import { Globe2, Building2, Layers, Users, CalendarDays, Award } from "lucide-react";

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
        <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
          The 2025 edition brought together exhibitors and visitors across the electrical, power,
          energy, lighting, renewable-energy and allied sectors.
        </p>

        {/* 2025 Edition Results */}
        <div className="mt-12">
          <SectionHeading title="2025 Edition Results" />
          
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <li className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all hover:border-teal/40 hover:shadow-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <Globe2 className="h-5 w-5" />
              </div>
              <span className="text-sm leading-relaxed text-slate-800">
                <strong className="font-extrabold text-slate-900">5+</strong> Participating Countries
              </span>
            </li>

            <li className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all hover:border-teal/40 hover:shadow-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-sm leading-relaxed text-slate-800">
                <strong className="font-extrabold text-slate-900">150+</strong> Exhibitors
              </span>
            </li>

            <li className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all hover:border-teal/40 hover:shadow-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-sm leading-relaxed text-slate-800">
                <strong className="font-extrabold text-slate-900">300+</strong> Brands & Solutions
              </span>
            </li>

            <li className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all hover:border-teal/40 hover:shadow-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-sm leading-relaxed text-slate-800">
                <strong className="font-extrabold text-slate-900">15,000+</strong> Trade Visitors
              </span>
            </li>

            <li className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all hover:border-teal/40 hover:shadow-md sm:col-span-2 md:col-span-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <CalendarDays className="h-5 w-5" />
              </div>
              <span className="text-sm leading-relaxed text-slate-800">
                <strong className="font-extrabold text-slate-900">3 Days</strong> of Business Networking
              </span>
            </li>
          </ul>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            The post-show report also presents visitor-role data, industry representation,
            business intent, company size, survey findings, photographs and media coverage.
          </p>
        </div>

        {/* Opening Ceremony Section */}
        <div className="mt-12 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <Award className="h-5 w-5" />
            </div>
            <SectionHeading title="Opening Ceremony" />
          </div>

          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-slate-800">
            <p>
              The 4th edition of the Nepal Electric, Power & Lights International Expo 2025 commenced with a prestigious inaugural ceremony graced by <strong className="font-bold text-slate-900">Hon. Damodar Bhandari</strong>, Minister of Industry, Commerce & Supplies, Government of Nepal.
            </p>
            <p className="text-slate-600">
              The ceremony began with a welcome address by the organizing team, followed by the traditional ribbon-cutting. The Honourable Minister highlighted the importance of such international platforms in connecting Nepal’s growing market with global innovations.
            </p>
          </div>
        </div>

        {/* Image Figure */}
        <figure className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <Image
            src="/images/gallery/2025/nepal-electric-expo-2025-glimpses-01.webp"
            alt="Exhibition floor, stands and visitor activity at the 2025 Nepal Electric, Power and Lights Expo"
            width={1600}
            height={1131}
            className="h-auto w-full object-cover"
          />
          <figcaption className="border-t border-slate-100 bg-slate-50/80 px-5 py-3.5 text-xs text-slate-600 sm:text-sm">
            {galleryImageCaption}
          </figcaption>
        </figure>

        {/* Action CTAs */}
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