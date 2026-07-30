import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

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
      <PageHero title="The Expo in the News" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          The 2025 post-show report includes English- and Nepali-language newspaper clippings and
          event photographs documenting media attention around the fourth edition.
        </p>

        <div className="mt-12">
          <SectionHeading title="Coverage Themes" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {coverageThemes.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-bg px-5 py-4">
          <p className="text-sm leading-relaxed text-ink">
            Verified media items will be listed here individually (publication name, title, date,
            language and source link) as they become available. Full third-party articles are not
            reproduced without permission.
          </p>
        </div>

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
