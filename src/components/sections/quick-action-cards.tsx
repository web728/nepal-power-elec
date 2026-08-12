"use client";

import { useEffect, useState } from "react";
import { Building2, Ticket, FileDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const cards = [
  {
    icon: Building2,
    heading: "Exhibit at the Expo",
    line: "Showcase your products to buyers, distributors and project professionals from across Nepal's electrical and power sector.",
    ctaLabel: "Book a Stand",
    href: siteConfig.registration.exhibitor,
    external: true,
    variant: "cta-exhibitor" as const,
    accent: "bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white",
    borderAccent: "group-hover:border-sky-300",
  },
  {
    icon: Ticket,
    heading: "Visit the Expo",
    line: "Register to explore manufacturers, suppliers and the latest products across power, lighting and renewable energy.",
    ctaLabel: "Register to Visit",
    href: siteConfig.registration.visitor,
    external: true,
    variant: "cta-visitor" as const,
    accent: "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
    borderAccent: "group-hover:border-teal-300",
  },
  {
    icon: FileDown,
    heading: "Get the Documents",
    line: "Download the 2026 event brochure and the 2025 post-show report for full event details and past results.",
    ctaLabel: "View Downloads",
    href: "#downloads",
    external: false,
    variant: "ghost" as const,
    accent: "bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
    borderAccent: "group-hover:border-amber-300",
  },
];

export function QuickActionCards() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative -mt-10 z-10 pb-8 sm:-mt-14 sm:pb-12">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {cards.map(
            (
              { icon: Icon, heading, line, ctaLabel, href, external, variant, accent, borderAccent },
              index
            ) => (
              <div
                key={heading}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
                className={`group relative flex flex-col items-start rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-md transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.99] sm:active:scale-100 ${borderAccent} ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >
                {/* Accent Top Border Bar */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-transparent transition-colors duration-300 group-hover:bg-current text-slate-300 rounded-full" />

                {/* Animated Icon Header */}
                <span
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 shadow-sm ${accent} group-hover:scale-110 group-hover:shadow-md`}
                >
                  <Icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                </span>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight transition-colors duration-200">
                  {heading}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 font-normal">
                  {line}
                </p>

                <div className="mt-6 w-full pt-2 border-t border-slate-100 sm:border-0 sm:pt-0">
                  <Button
                    href={href}
                    variant={variant}
                    size="sm"
                    className="w-full sm:w-auto font-medium transition-all duration-200 group-hover:shadow-sm"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {ctaLabel}
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </Container>
    </section>
  );
}