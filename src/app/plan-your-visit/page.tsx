"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  CalendarCheck, 
  Globe2, 
  MapPin, 
  Plane, 
  CheckCircle2, 
  ArrowRight, 
  Info,
  Building2 
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { beforeTravelling, atTheExhibition } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "Visit", href: "/why-visit" }, { label: "Plan Your Visit" }];

export default function PlanYourVisitPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroDescription = `${siteConfig.dates.display} · ${siteConfig.venue.line1} · ${siteConfig.venue.city}, ${siteConfig.venue.country}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Before Travelling Stagger
      gsap.fromTo(
        ".anim-before-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-before-grid",
            start: "top 85%",
          },
        }
      );

      // International Notice Reveal
      gsap.fromTo(
        ".anim-intl-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-intl-card",
            start: "top 85%",
          },
        }
      );

      // At Exhibition Stagger
      gsap.fromTo(
        ".anim-during-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-during-grid",
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
          { label: "Visit", href: "/why-visit" },
          { label: "Plan Your Visit", href: "/plan-your-visit" },
        ]}
      />

      <PageHero
        title="Prepare for Your Visit to Kathmandu"
        description={heroDescription}
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/0L1A2531-min-scaled.jpg"
        bgOpacity="opacity-50"
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-16">

          {/* Section 1: Before the Event Checklist */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <SectionHeading title="Before the Event" />
                <p className="text-xs text-slate-500 sm:text-sm">Key preparations prior to arriving at the venue</p>
              </div>
            </div>

            <div className="anim-before-grid grid gap-4 sm:grid-cols-2">
              {beforeTravelling.map((item, idx) => (
                <div
                  key={idx}
                  className="anim-before-card flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:border-teal/40 hover:shadow-md"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal mt-0.5" />
                  <span className="text-sm font-semibold leading-relaxed text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: International Visitors Advisory */}
          <div className="anim-intl-card rounded-2xl border border-sky/30 bg-gradient-to-br from-white via-sky/5 to-teal/5 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                <Globe2 className="h-5 w-5" />
              </div>
              <SectionHeading title="International Visitors Advisory" />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              International attendees are responsible for managing their passport validity, visa processing, immigration requirements,
              travel insurance, flight bookings, accommodation, local transportation, and customs clearance.
            </p>
          </div>

          {/* Section 3: At the Exhibition */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <SectionHeading title="At the Exhibition" />
                <p className="text-xs text-slate-500 sm:text-sm">Guidelines for show days at Bhrikuti Mandap</p>
              </div>
            </div>

            <div className="anim-during-grid grid gap-4 sm:grid-cols-2">
              {atTheExhibition.map((item, idx) => (
                <div
                  key={idx}
                  className="anim-during-card flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:border-teal/40 hover:shadow-md"
                >
                  <MapPin className="h-5 w-5 shrink-0 text-teal mt-0.5" />
                  <span className="text-sm font-semibold leading-relaxed text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-teal/20 bg-gradient-to-r from-teal/10 via-sky/5 to-white p-6 shadow-sm sm:flex-row sm:p-8">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">Ready to Attend?</span>
              <h4 className="text-xl font-bold text-slate-900">Secure Your Digital Pass Online</h4>
              <p className="text-xs text-slate-600 sm:text-sm">
                Get your digital entry badge or check venue location details.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Button
                href={siteConfig.registration.visitor}
                target="_blank"
                rel="noopener noreferrer"
                variant="cta-visitor"
                className="group shadow-sm hover:shadow-md"
              >
                <span>Register to Visit</span>
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="/venue" variant="outline">
                View Venue
              </Button>
              <Button href="/contact" variant="ghost">
                Contact Us
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}