"use client";

import { useEffect, useRef } from "react";
import type { Metadata } from "next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Store, 
  ArrowRight, 
  History, 
  Sparkles,
  Download
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "Event History" }];

const editions = [
  {
    edition: "1st Edition",
    date: "20–22 January 2023",
    location: "Bhrikuti Mandap, Kathmandu, Nepal",
    description:
      "The inaugural edition established the foundation for a dedicated industry platform connecting regional electrical manufacturers, distributors, and key buyers.",
    highlight: "Inaugural Event",
  },
  {
    edition: "2nd Edition",
    date: "1–3 September 2023",
    location: "Bhrikuti Mandap, Kathmandu, Nepal",
    description:
      "Expanded regional reach, driving higher engagement among trade visitors, electrical engineers, and project consultants.",
    highlight: "Regional Expansion",
  },
  {
    edition: "3rd Edition",
    date: "6–8 September 2024",
    location: "Bhrikuti Mandap, Kathmandu, Nepal",
    description:
      "Accelerated sector convergence across renewable energy, T&D, and smart lighting solutions with active participation from decision-makers.",
    highlight: "Industry Growth",
  },
  {
    edition: "4th Edition",
    date: "29–31 August 2025",
    location: "Bhrikuti Mandap Exhibition Hall, Kathmandu",
    description:
      "A milestone edition featuring 150+ exhibitors and 15,000+ trade visitors, consolidating its rank as Nepal's premier power & energy expo.",
    highlight: "150+ Exhibitors · 15k+ Visitors",
    featured: true,
  },
];

export default function EventHistoryPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro section fade-up
      gsap.fromTo(
        ".anim-history-intro",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-history-intro",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline cards staggered reveal
      gsap.fromTo(
        ".anim-history-card",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-history-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bottom CTA section reveal
      gsap.fromTo(
        ".anim-history-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-history-cta",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative overflow-hidden bg-bg">
      <BreadcrumbJsonLd items={[{ label: "Event History", href: "/event-history" }]} />
      
      <PageHero
        title="Building a Dedicated Electrical and Energy Exhibition in Nepal"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/Crowds-at-Auto-Expo.jpg"
        bgOpacity="opacity-50"
      />

      <Container as="section" className="py-12 sm:py-20">
        
        {/* Intro Block */}
        <div className="anim-history-intro relative rounded-2xl border border-teal-500/20 bg-gradient-to-br from-white via-teal-500/5 to-sky/5 p-6 shadow-sm sm:p-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-600">
            <History className="h-3.5 w-3.5" />
            <span>Proven Excellence Since 2023</span>
          </div>
          <p className="max-w-4xl text-lg leading-relaxed font-medium text-ink sm:text-xl">
            The Nepal Electric, Power and Lights International Expo has developed as a premier trade
            platform connecting companies and professionals across the electrical, power, lighting
            and renewable-energy industries.
          </p>
        </div>

        {/* Historical Timeline Cards Grid */}
        <div className="mt-14 sm:mt-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky">Editions Timeline</span>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Previous Expo Editions</h2>
            </div>
          </div>

          <div className="anim-history-grid grid gap-6 md:grid-cols-2">
            {editions.map((item, index) => (
              <div
                key={index}
                className={`anim-history-card group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8 ${
                  item.featured
                    ? "border-yellow/50 bg-gradient-to-br from-white via-yellow/5 to-amber-500/5 shadow-md hover:border-yellow"
                    : "border-border/80 bg-white hover:border-sky/40"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-ink">
                      <Calendar className="h-3.5 w-3.5 text-sky" />
                      {item.date}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.featured 
                        ? "bg-yellow text-ink shadow-xs" 
                        : "bg-sky/10 text-sky"
                    }`}>
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-extrabold text-ink group-hover:text-sky transition-colors duration-200">
                    {item.edition}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-xs font-medium text-muted">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-teal-600" />
                    <span>{item.location}</span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                    {item.description}
                  </p>
                </div>

                {item.featured && (
                  <div className="mt-6 flex items-center gap-4 border-t border-border/60 pt-4 text-xs font-semibold text-ink">
                    <span className="inline-flex items-center gap-1.5 text-teal-600">
                      <Store className="h-4 w-4" /> 150+ Exhibitors
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sky">
                      <Users className="h-4 w-4" /> 15,000+ Trade Visitors
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons Footer Block */}
        <div className="anim-history-cta mt-14 sm:mt-20 rounded-2xl border border-border bg-slate-50 p-6 text-center sm:p-8">
          <h4 className="text-lg font-bold text-ink sm:text-xl">Discover Past Performance & Next Steps</h4>
          <p className="mt-1 text-sm text-muted">Review detailed statistics or navigate to upcoming event details.</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button href="/past-editions/2025-edition" variant="primary" className="group">
              <span>View 2025 Edition</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button href="/downloads/2025-post-show-report" variant="outline" className="group">
              <Download className="mr-2 h-4 w-4 text-sky" />
              <span>Download 2025 Report</span>
            </Button>

            <Button href="/about-the-expo" variant="ghost">
              Explore 2026 Expo
            </Button>
          </div>
        </div>

      </Container>
    </div>
  );
}