import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const breadcrumbs = [{ label: "Downloads", href: "/downloads" }, { label: "2025 Post-Show Report" }];

const headlineFigures = ["150+ exhibitors", "Participation from 5+ countries", "15,000+ visitors"];

export const metadata: Metadata = {
  title: { absolute: "2025 Post-Show Report | Nepal Electric, Power and Lights Expo" },
  description:
    "Download the organizer-issued 2025 post-show report with statistics, visitor analysis, photographs and media coverage.",
  alternates: { canonical: "/downloads/2025-post-show-report" },
};

export default function PostShowReportDownloadPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Downloads", href: "/downloads" },
          { label: "2025 Post-Show Report", href: "/downloads/2025-post-show-report" },
        ]}
      />
      <PageHero title="Download the Official Report from the 4th Edition" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <div className="rounded-lg border border-border bg-bg px-5 py-4 text-sm font-medium text-ink">
            4th Nepal Electric, Power and Lights International Expo 2025 — Post-Show Report | PDF |
            English
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            The report documents the event held from 29-31 August 2025 at Bhrikuti Mandap Exhibition
            Hall, Kathmandu. It includes reported exhibitor and visitor figures, visitor profiles,
            business intent, company size, survey findings, photographs and media coverage.
          </p>

          <div className="mt-10">
            <SectionHeading title="Headline Reported Figures" />
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {headlineFigures.map((figure) => (
                <li
                  key={figure}
                  className="rounded-lg border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-ink"
                >
                  {figure}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              href="/downloads/Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Download Report
            </Button>
            <Button href="/past-editions/2025-edition" variant="outline">
              View 2025 Edition
            </Button>
            <Button href="/past-editions/post-show-statistics" variant="ghost">
              View Statistics
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
