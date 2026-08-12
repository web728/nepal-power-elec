"use client";

import { useEffect, useRef } from "react";
import type { Metadata } from "next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  CheckCircle2, 
  Target, 
  Users2, 
  ArrowRight, 
  Download, 
  Building, 
  TrendingUp,
  Sparkles 
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { whyExhibitBenefits } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "Exhibit", href: "/why-exhibit" }, { label: "Why Exhibit" }];

export default function WhyExhibitPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro section fade up
      gsap.fromTo(
        ".anim-exhibit-intro",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-exhibit-intro",
            start: "top 85%",
          },
        }
      );

      // Business objectives staggered reveal
      gsap.fromTo(
        ".anim-benefit-card",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-benefit-grid",
            start: "top 80%",
          },
        }
      );

      // Who Should Exhibit section reveal
      gsap.fromTo(
        ".anim-who-exhibit",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-who-exhibit",
            start: "top 85%",
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
          { label: "Why Exhibit", href: "/why-exhibit" },
        ]}
      />

      <PageHero
        title="Present Your Products to Nepal's Electrical and Energy Market"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/images-3.jpeg"
        bgOpacity="opacity-70"
      />

      <Container as="section" className="py-12 sm:py-20">
        
        {/* Intro Block */}
        <div className="anim-exhibit-intro rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Prime Market Opportunity</span>
          </div>
          <p className="max-w-4xl text-lg font-semibold leading-relaxed text-ink sm:text-xl">
            The expo provides a focused environment for companies to introduce products, meet
            professional buyers, explore distributor relationships, and build high visibility across
            electrical, power, lighting, renewable-energy, and allied industries in Nepal.
          </p>
        </div>

        {/* Business Objectives Grid */}
        <div className="mt-14 sm:mt-18">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky">Strategic Growth</span>
              <SectionHeading title="Business Objectives & Benefits" />
            </div>
          </div>

          <ul className="anim-benefit-grid grid gap-4 sm:grid-cols-2">
            {whyExhibitBenefits.map((item, index) => (
              <li
                key={index}
                className="anim-benefit-card group flex items-start gap-3.5 rounded-2xl border border-border/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-md sm:p-6"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium leading-relaxed text-ink sm:text-base">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Who Should Exhibit Block */}
        <div className="anim-who-exhibit mt-14 sm:mt-18 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-10">
          <div className="flex items-center gap-3 text-sky">
            <Building className="h-6 w-6" />
            <span className="text-xs font-bold uppercase tracking-wider">Target Profile</span>
          </div>
          
          <h3 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">Who Should Exhibit?</h3>
          
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted sm:text-lg">
            Manufacturers, exporters, suppliers, technology providers, service companies,
            importers, distributors, and regional brands serving the power, lighting, and electrical technology sectors are invited to participate.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
            <Button href="/exhibitor-profile" variant="outline" className="group">
              <span>View Full Exhibitor Profile</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button href="/downloads/2026-event-brochure" variant="ghost">
              <Download className="mr-2 h-4 w-4 text-sky" />
              <span>Download 2026 Brochure</span>
            </Button>
          </div>
        </div>

        {/* Action Callouts Footer */}
        <div className="mt-14 sm:mt-18 rounded-2xl border border-border bg-slate-50 p-6 text-center sm:p-10">
          <h4 className="text-xl font-extrabold text-ink sm:text-2xl">Secure Your Exhibition Space Today</h4>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Connect with thousands of decision-makers and expand your footprint in Nepal's energy market.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              href={siteConfig.registration.exhibitor}
              target="_blank"
              rel="noopener noreferrer"
              variant="cta-exhibitor"
              className="shadow-sm hover:shadow-md"
            >
              Book a Stand Now
            </Button>
            <Button href="/contact" variant="ghost">
              Contact Sales Team
            </Button>
          </div>
        </div>

      </Container>
    </div>
  );
}