import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PostShowReportForm } from "@/components/forms/PostShowReportForm";

const breadcrumbs = [{ label: "Downloads", href: "/downloads" }, { label: "2025 Post-Show Report" }];

const headlineFigures = ["150+ exhibitors", "Participation from 5+ countries", "15,000+ visitors"];

export const metadata: Metadata = {
  title: { absolute: "2025 Post-Show Report | Nepal Electric, Power and Lights Expo" },
  description:
    "Download the 2025 post-show report with statistics, visitor analysis, photographs and media coverage.",
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
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Report Details & Stats */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-border bg-bg px-5 py-4 text-sm font-medium text-ink">
              4th Nepal Electric, Power and Lights International Expo 2025 — Post-Show Report | PDF | English
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              The report documents the event held from 29-31 August 2025 at Bhrikuti Mandap Exhibition
              Hall, Kathmandu. It includes reported exhibitor and visitor figures, visitor profiles,
              business intent, company size, survey findings, photographs and media coverage.
            </p>

       <div className="mt-10">
  <SectionHeading title="Headline Reported Figures" />
  <ul className="mt-5 grid gap-4 sm:grid-cols-3">
    {headlineFigures.map((figure) => {
      // RegEx updated to handle commas (15,000+) properly
      const match = figure.match(/^([\d+,\s]+)(.*)$/);
      const numberPart = match ? match[1].trim() : "";
      const textPart = match ? match[2].trim() : figure;

      return (
        <li
          key={figure}
          className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-md"
        >
          {/* Top Accent Highlight Bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-80 transition-opacity group-hover:opacity-100" />

          {numberPart ? (
            <div className="flex flex-col items-center justify-center gap-1">
              {/* whitespace-nowrap added to strictly prevent line break in numbers */}
              <span className="whitespace-nowrap text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {numberPart}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {textPart}
              </span>
            </div>
          ) : (
            <span className="text-base font-bold text-slate-800">
              {figure}
            </span>
          )}
        </li>
      );
    })}
  </ul>
</div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/past-editions/2025-edition" variant="outline">
                View 2025 Edition
              </Button>
              <Button href="/past-editions/post-show-statistics" variant="ghost">
                View Statistics
              </Button>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5">
            <PostShowReportForm />
          </div>

        </div>
      </Container>
    </>
  );
}