"use client";

import { useEffect, useRef, useState } from "react";
import type { Metadata } from "next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Layers, Sparkles, ArrowRight, Building2, Search } from "lucide-react";
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
  { label: "Exhibitor Profile" },
];

export default function ExhibitorProfilePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSectors = sectors.filter((sector) => {
    const matchesFilter = activeFilter === "all" || sector.slug === activeFilter;
    const matchesSearch =
      sector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sector.items.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro block animation
      gsap.fromTo(
        ".anim-profile-intro",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-profile-intro",
            start: "top 85%",
          },
        }
      );

      // Staggered Sector Cards reveal
      gsap.fromTo(
        ".anim-sector-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-sector-grid",
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
          { label: "Exhibitor Profile", href: "/exhibitor-profile" },
        ]}
      />

      <PageHero
        title="Companies and Technologies Relevant to the Expo"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/0L1A2244-min-scaled.jpg"
        bgOpacity="opacity-70"
      />

      <Container as="section" className="py-12 sm:py-20">
        
        {/* Intro & Interactive Controls Block */}
        <div className="anim-profile-intro space-y-6 rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
              <Building2 className="h-3.5 w-3.5" />
              <span>Target Sectors & Categories</span>
            </div>
            <span className="text-xs font-semibold text-muted">
              Showing {filteredSectors.length} of {sectors.length} Industry Sectors
            </span>
          </div>

          <p className="max-w-4xl text-lg font-semibold leading-relaxed text-ink sm:text-xl">
            Explore the diverse categories of manufacturers, tech providers, and suppliers showcasing products at Nepal’s premier energy & lighting expo.
          </p>

          {/* Search & Sector Filters */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter by product or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-ink shadow-xs outline-hidden focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                  activeFilter === "all"
                    ? "bg-teal text-white shadow-xs"
                    : "border border-slate-200 bg-white text-muted hover:border-teal/40 hover:text-ink"
                }`}
              >
                All Categories
              </button>
              {sectors.map((sec) => (
                <button
                  key={sec.slug}
                  onClick={() => setActiveFilter(sec.slug)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                    activeFilter === sec.slug
                      ? "bg-teal text-white shadow-xs"
                      : "border border-slate-200 bg-white text-muted hover:border-teal/40 hover:text-ink"
                  }`}
                >
                  {sec.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sectors Grid */}
        <div className="anim-sector-grid mt-10 grid gap-6 md:grid-cols-2">
          {filteredSectors.length > 0 ? (
            filteredSectors.map((sector) => (
              <Card
                key={sector.slug}
                className="anim-sector-card group flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-md sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-teal">
                      {sector.name}
                    </h3>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                      <Layers className="h-4 w-4" />
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {sector.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                        <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky/10 text-sky">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-50">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {sector.items.length} Product Categories Listed
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-base font-semibold text-slate-600">
                No sectors matched "{searchTerm}"
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                className="mt-3 text-xs font-bold text-teal underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Call To Action Block */}
        <div className="mt-14 sm:mt-18 rounded-2xl border border-border bg-slate-50 p-6 text-center sm:p-10">
          <h4 className="text-xl font-extrabold text-ink sm:text-2xl">Ready to Exhibit Your Products?</h4>
          <p className="mt-2 max-w-2xl mx-auto text-sm text-muted sm:text-base">
            Companies should submit an exhibitor enquiry so the organizing team can review product relevance and stall allotment requirements.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              href={siteConfig.registration.exhibitor}
              target="_blank"
              rel="noopener noreferrer"
              variant="cta-exhibitor"
              className="group shadow-sm hover:shadow-md"
            >
              <span>Book a Stand</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button href="/contact" variant="outline">
              Contact the Organizers
            </Button>
          </div>
        </div>

      </Container>
    </div>
  );
}