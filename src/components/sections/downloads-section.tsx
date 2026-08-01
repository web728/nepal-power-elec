import Image from "next/image";
import { FileText, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const downloads = [
  {
    title: "2026 Event Brochure",
    description: `Full details on the ${siteConfig.dates.display} edition, including sectors, venue and participation information.`,
    href: "/downloads/Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf",
    event: AnalyticsEvents.BROCHURE_DOWNLOAD,
  },
  {
    title: "2025 Post-Show Report",
    description: "Organizer-reported results and visitor survey findings from the 2025 (4th) edition.",
    href: "/downloads/Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf",
    event: AnalyticsEvents.REPORT_DOWNLOAD,
  },
];

export function DownloadsSection() {
  return (
    <section id="downloads" className="relative overflow-hidden bg-white py-16 sm:py-22 scroll-mt-24">
      {/* 1. Top Left Graphic - Hidden on Mobile (`hidden sm:block`) */}
 {/* 1. Bottom Left Graphic on Mobile (Seedha) / Top Left on Desktop (Ulta) */}
<div className="absolute left-0 bottom-0 sm:top-0 sm:bottom-auto pointer-events-none z-0 opacity-100 overflow-hidden block">
  <Image
    src="/brandings/wind.png"
    alt="Background Graphic Left"
    width={1200}
    height={1200}
    className="
      h-auto object-contain
      /* Mobile Sizing (Bottom Left & Seedha) */
      w-[120px] max-w-none -translate-x-[20%] translate-y-[25%] rotate-0
      /* Tablet Sizing (Ulta / Rotate-180) */
      sm:w-[300px] sm:-translate-x-[20%] sm:-translate-y-[25%] sm:rotate-180
      /* Laptop / Desktop Sizing */
      lg:w-[650px] lg:-translate-x-[15%] lg:-translate-y-[20%]
      /* Extra Large Screens */
      xl:w-[350px] xl:-translate-x-[10%] xl:-translate-y-[15%]
    "
  />
</div>

{/* 2. Top Right Graphic - Mobile par Ulta (rotate-180) */}
<div className="absolute right-0 top-0 pointer-events-none z-0 opacity-100 overflow-hidden">
  <Image
    src="/brandings/wind.png"
    alt="Background Graphic Right"
    width={1200}
    height={1200}
    className="
      h-auto object-contain
      /* Mobile Sizing (Top Right & Ulta) */
      w-[45vw] max-w-none translate-x-[20%] -translate-y-[10%] rotate-180 sm:rotate-0
      /* Tablet Sizing */
      sm:w-[500px] sm:translate-x-[20%] sm:-translate-y-[25%]
      /* Laptop / Desktop Sizing */
      lg:w-[650px] lg:translate-x-[15%] lg:-translate-y-[10%]
      /* Extra Large Screens */
      xl:w-[350px] xl:translate-x-[5%] xl:translate-y-[20%]
    "
  />
</div>

      {/* Content Container */}
      <Container className="relative z-10">
        <SectionHeading eyebrow="Resources" title="Event Documents" align="center" className="mx-auto" />

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {downloads.map((doc) => (
            <div
              key={doc.title}
              className="group flex flex-col items-start rounded-xl border border-border bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <FileText className="h-6 w-6" aria-hidden="true" />
              </span>
              <Badge tone="muted">PDF</Badge>
              <h3 className="mt-3 text-lg font-semibold text-ink">{doc.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{doc.description}</p>
              <TrackedLink
                event={doc.event}
                params={{ source: "downloads_section" }}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-sky px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-sky-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
              </TrackedLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}