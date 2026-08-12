"use client";

import { useEffect, useRef } from "react";
import type { Metadata } from "next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Zap, 
  Cable, 
  Cpu, 
  Lightbulb, 
  Home, 
  Settings2, 
  ArrowRight, 
  Sparkles,
  Layers,
  CheckCircle2,
  type LucideIcon 
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { sectors } from "@/lib/content/sectors";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [
  { label: "Exhibit", href: "/why-exhibit" },
  { label: "Exhibitor Categories" },
];

const sectorIcons: Record<string, LucideIcon> = {
  "power-and-energy": Zap,
  "transmission-distribution-equipment": Cable,
  "electricals-electronics": Cpu,
  lighting: Lightbulb,
  "home-appliances": Home,
  "electro-energetics": Settings2,
};

export default function ExhibitorCategoriesPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro block animation
      gsap.fromTo(
        ".anim-categories-intro",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-categories-intro",
            start: "top 85%",
          },
        }
      );

      // Staggered Category Cards reveal
      gsap.fromTo(
        ".anim-category-card",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-categories-grid",
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
          { label: "Exhibitor Categories", href: "/exhibitor-categories" },
        ]}
      />

      <PageHero
        title="Explore the Event's Main Product Sectors"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/electricity-transmission-pylon-silhouetted-against-blue-sky-d-copy-min-scaled.jpg"
        bgOpacity="opacity-75"
      />

      <Container as="section" className="py-12 sm:py-20">
        
        {/* Intro Block */}
        <div className="anim-categories-intro rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
            <Layers className="h-3.5 w-3.5" />
            <span>Product Focus Areas</span>
          </div>
          <p className="max-w-4xl text-lg font-semibold leading-relaxed text-ink sm:text-xl">
            Browse through our comprehensively structured sectors representing power generation, high-voltage distribution, renewable power tech, smart electronics, and lighting solutions.
          </p>
        </div>

        {/* Sectors & Categories Grid */}
        <div className="anim-categories-grid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => {
            const Icon = sectorIcons[sector.slug] ?? Zap;
            return (
              <Card
                key={sector.slug}
                className="anim-category-card group flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-lg sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-white group-hover:shadow-md">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {sector.items.length} Offerings
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-ink transition-colors duration-200 group-hover:text-teal">
                    {sector.name}
                  </h3>

                  <ul className="mt-4 space-y-2.5">
                    {sector.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-medium leading-relaxed text-slate-600 sm:text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <a
                    href="/exhibitor-profile"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky hover:text-teal transition-colors"
                  >
                    <span>Explore Profile Specs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call To Action Block */}
        <div className="mt-14 sm:mt-18 rounded-2xl border border-border bg-slate-50 p-6 text-center sm:p-10">
          <h4 className="text-xl font-extrabold text-ink sm:text-2xl">Participate in Nepal's Energy Showcase</h4>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Book your exhibit space or register as a trade visitor for the 2026 expo today.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              href={siteConfig.registration.exhibitor}
              target="_blank"
              rel="noopener noreferrer"
              variant="cta-exhibitor"
              className="shadow-sm hover:shadow-md"
            >
              Book a Stand
            </Button>
            <Button
              href={siteConfig.registration.visitor}
              target="_blank"
              rel="noopener noreferrer"
              variant="cta-visitor"
              className="shadow-sm hover:shadow-md"
            >
              Register to Visit
            </Button>
            <Button href="/contact" variant="ghost">
              Contact Organizers
            </Button>
          </div>
        </div>

      </Container>
    </div>
  );
}