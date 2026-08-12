"use client";

import { useEffect, useRef, useState } from "react";
import type { Metadata } from "next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelpCircle, Search, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { exhibitorFaqs } from "@/lib/content/faqs";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [
  { label: "Exhibit", href: "/why-exhibit" },
  { label: "Exhibitor FAQ" },
];

export default function ExhibitorFaqPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = exhibitorFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro block animation
      gsap.fromTo(
        ".anim-faq-intro",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-faq-intro",
            start: "top 85%",
          },
        }
      );

      // Accordion container reveal
      gsap.fromTo(
        ".anim-faq-list",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-faq-list",
            start: "top 80%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative overflow-hidden bg-bg">
      <BreadcrumbJsonLd
        items={[
          { label: "Exhibit", href: "/why-exhibit" },
          { label: "Exhibitor FAQ", href: "/exhibitor-faq" },
        ]}
      />
      <FaqJsonLd items={exhibitorFaqs} />

      <PageHero
        title="Exhibitor FAQ"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/np11-scaled.jpg"
        bgOpacity="opacity-75"
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-10">
          
          {/* Header & Search Control */}
          <div className="anim-faq-intro rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Exhibitor Help Center</span>
              </div>
              <span className="text-xs font-semibold text-muted">
                {filteredFaqs.length} Questions Available
              </span>
            </div>

            <p className="mt-4 text-lg font-semibold leading-relaxed text-ink sm:text-xl">
              Find practical details regarding booth setups, power requirements, move-in schedules, commercial guidelines, and event logistics.
            </p>

            {/* Quick Search */}
            <div className="relative mt-6">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search queries (e.g., stall size, power supply, payment terms)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-ink shadow-xs outline-hidden focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>
          </div>

          {/* Accordion Component List */}
          <div className="anim-faq-list rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            {filteredFaqs.length > 0 ? (
              <Accordion items={filteredFaqs} />
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  No questions found matching "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-xs font-bold text-teal underline"
                >
                  Clear search term
                </button>
              </div>
            )}
          </div>

          {/* Bottom Conversion & Support Banner */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-slate-50 p-6 text-center sm:flex-row sm:text-left sm:p-8">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-teal sm:justify-start">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Still Have Questions?</span>
              </div>
              <h4 className="text-lg font-bold text-ink">Our Organizing Team is Ready to Help</h4>
              <p className="text-xs text-muted sm:text-sm">
                Get tailored guidance regarding stall selection and exhibition space requirements.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                href={siteConfig.registration.exhibitor}
                target="_blank"
                rel="noopener noreferrer"
                variant="cta-exhibitor"
                className="group shadow-sm hover:shadow-md"
              >
                <span>Book a Stand</span>
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" variant="outline">
                Contact Organizers
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}