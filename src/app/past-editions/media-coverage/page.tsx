import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Newspaper, CheckCircle2, Info } from "lucide-react";

const breadcrumbs = [
  { label: "Past Editions", href: "/past-editions/2025-edition" },
  { label: "Media Coverage" },
];

const coverageThemes = [
  "Event announcements",
  "Opening ceremony",
  "Exhibitor and product coverage",
  "Electrical and energy industry activity",
  "Visitor engagement",
  "Business and market developments",
];

export const metadata: Metadata = {
  title: { absolute: "Media Coverage | Nepal Electric, Power and Lights Expo" },
  description: "Explore verified media coverage of the Nepal Electric, Power and Lights International Expo.",
  alternates: { canonical: "/past-editions/media-coverage" },
};

export default function MediaCoveragePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Past Editions", href: "/past-editions/2025-edition" },
          { label: "Media Coverage", href: "/past-editions/media-coverage" },
        ]}
      />
      
      <PageHero
        title="The Expo in the News"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/0L1A2531-min-scaled.jpg"
        bgOpacity="opacity-50"
      />

      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
          The 2025 post-show report includes English- and Nepali-language newspaper clippings and
          event photographs documenting media attention around the fourth edition.
        </p>

        {/* Coverage Themes Section */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <Newspaper className="h-5 w-5" />
            </div>
            <SectionHeading title="Coverage Themes" />
          </div>

          <ul className="grid gap-3.5 sm:grid-cols-2">
            {coverageThemes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all hover:border-teal/40 hover:shadow-md"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-teal mt-0.5" />
                <span className="text-sm font-semibold leading-relaxed text-slate-800">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notice Card */}
        <div className="mt-10 flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-5 text-slate-700 shadow-xs sm:p-6">
          <Info className="h-5 w-5 shrink-0 text-slate-400 mt-0.5" />
          <p className="text-sm leading-relaxed">
            Verified media items will be listed here individually (publication name, title, date,
            language and source link) as they become available. Full third-party articles are not
            reproduced without permission.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/press-releases" variant="primary">
            View Press Releases
          </Button>
          <Button href="/downloads/2025-post-show-report" variant="ghost">
            Download Report
          </Button>
        </div>
      </Container>
    </>
  );
}