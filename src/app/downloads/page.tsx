import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const breadcrumbs = [{ label: "Downloads" }];

export const metadata: Metadata = {
  title: { absolute: "Downloads | Nepal Electric, Power and Lights Expo 2026" },
  description: "Download the official 2026 event brochure and 2025 post-show report.",
  alternates: { canonical: "/downloads" },
};

export default function DownloadsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Downloads", href: "/downloads" }]} />
      <PageHero title="Official Event Documents and Resources" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="flex h-full flex-col">
            <h2 className="text-xl font-semibold text-ink">2026 Event Brochure</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              Download the official brochure for the fifth edition, including the event overview,
              principal industry sectors, exhibitor profile, visitor profile, dates and venue.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                href="/downloads/Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf"
                variant="primary"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download 2026 Brochure
              </Button>
              <Button href="/downloads/2026-event-brochure" variant="ghost">
                View Details
              </Button>
            </div>
          </Card>

          <Card className="flex h-full flex-col">
            <h2 className="text-xl font-semibold text-ink">2025 Post-Show Report</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              Download the organizer-issued report for the fourth edition, including reported
              participation figures, visitor analysis, survey findings, photographs and media
              coverage.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                href="/downloads/Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf"
                variant="primary"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download 2025 Report
              </Button>
              <Button href="/downloads/2025-post-show-report" variant="ghost">
                View Details
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-12">
          <SectionHeading title="Document Use" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Users may share official document links for event-related information. Files should
            not be altered, rebranded or presented as documents issued by another organization.
          </p>
        </div>
      </Container>
    </>
  );
}
