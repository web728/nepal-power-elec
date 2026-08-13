"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const downloads = [
  {
    title: "2026 Event Brochure",
    description: `Full details on the ${siteConfig.dates.display} edition, including sectors, venue and participation information.`,
    href: "/downloads/2026-event-brochure",
    event: AnalyticsEvents.BROCHURE_DOWNLOAD,
  },
  {
    title: "2025 Post-Show Report",
    description: "Highlights, participation insights and visitor findings from the 4th edition held in 2025.",
    href: "/downloads/2025-post-show-report",
    event: AnalyticsEvents.REPORT_DOWNLOAD,
  },
];

export function DownloadsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".anim-download-head",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Download Cards Staggered Animation
      gsap.fromTo(
        ".anim-download-card",
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="downloads"
      className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24 scroll-mt-24"
    >
    {/* Background Graphic */}
<div className="pointer-events-none absolute right-0 top-0 z-0 overflow-hidden opacity-30 sm:opacity-60 lg:opacity-100">
  <Image
    src="/brandings/wind.png"
    alt="Background Graphic Right"
    width={1200}
    height={1200}
    priority
    className="
      h-auto object-contain
      w-[240px] translate-x-[20%] -translate-y-[10%]
      sm:w-[450px] sm:translate-x-[20%] sm:-translate-y-[20%]
      lg:w-[600px] lg:translate-x-[15%] lg:-translate-y-[10%]
      xl:w-[350px] xl:translate-x-[5%] xl:translate-y-[20%]
    "
  />
</div>

      {/* Main Content */}
      <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="anim-download-head text-center">
          <SectionHeading
            eyebrow="Resources"
            title="Event Documents"
            align="center"
            className="mx-auto"
          />
        </div>

        {/* Downloads Grid */}
        <div className="mx-auto mt-8 sm:mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {downloads.map((doc) => (
            <div
              key={doc.title}
              className="anim-download-card group flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-500/40 hover:shadow-xl"
            >
              {/* Icon & Badge Header */}
              <div className="flex w-full items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <FileText className="h-6 w-6" aria-hidden="true" />
                </span>
                <Badge tone="muted">PDF</Badge>
              </div>

              {/* Title & Description */}
              <h3 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
                {doc.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {doc.description}
              </p>

              {/* Download Action Button */}
              <TrackedLink
                event={doc.event}
                params={{ source: "downloads_section" }}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-sky-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 focus-visible:outline-offset-2 active:scale-95"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                Download PDF
              </TrackedLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}