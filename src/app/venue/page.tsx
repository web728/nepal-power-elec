"use client";

import { useEffect, useRef } from "react";
import type { Metadata } from "next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MapPin, 
  ExternalLink, 
  Navigation, 
  Plane, 
  Building2, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "Venue" }];

export default function VenuePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Bhrikuti+Mandap+Exhibition+Hall+Kathmandu";
  const mapEmbedSrc =
    "https://maps.google.com/maps?q=Bhrikuti%20Mandap%20Exhibition%20Hall%20Kathmandu&t=&z=15&ie=UTF8&iwloc=&output=embed";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro section animation
      gsap.fromTo(
        ".anim-venue-intro",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-venue-intro",
            start: "top 85%",
          },
        }
      );

      // Map container reveal
      gsap.fromTo(
        ".anim-venue-map",
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-venue-map",
            start: "top 80%",
          },
        }
      );

      // Info cards staggered animation
      gsap.fromTo(
        ".anim-venue-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-venue-cards-grid",
            start: "top 80%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative overflow-hidden bg-bg">
      <BreadcrumbJsonLd items={[{ label: "Venue", href: "/venue" }]} />

      <PageHero
        title="Bhrikuti Mandap Exhibition Hall, Kathmandu"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/0L1A2244-min-scaled.jpg"
        bgOpacity="opacity-70"
      />

      <Container as="section" className="py-12 sm:py-20">
        
        {/* Intro Block */}
        <div className="anim-venue-intro rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
            <Building2 className="h-3.5 w-3.5" />
            <span>Premier Event Hub</span>
          </div>
          <p className="max-w-4xl text-lg font-semibold leading-relaxed text-ink sm:text-xl">
            The 5th Nepal Electric, Power and Lights International Expo 2026 will be held at
            Bhrikuti Mandap Exhibition Hall in the heart of Kathmandu, Nepal.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            Located conveniently in central Kathmandu, the venue offers seamless connectivity for local trade visitors and international delegations.
          </p>
        </div>

        {/* Premium Map Section */}
        <div className="mt-14 sm:mt-18">
          <SectionHeading title="Event Location & Interactive Map" />

          <div className="anim-venue-map mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            {/* Embedded Live Map */}
            <div className="relative h-[380px] w-full bg-slate-100 sm:h-[480px]">
              <iframe
                title="Bhrikuti Mandap Exhibition Hall Location Map"
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info Bar below Map */}
            <div className="flex flex-col gap-5 border-t border-slate-200 bg-slate-50/80 p-5 backdrop-blur-xs sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal shadow-2xs">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal">
                    Official Venue
                  </h3>
                  <p className="mt-0.5 text-base font-extrabold text-ink">
                    {siteConfig.venue.full}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-teal px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-teal/90 hover:shadow-md"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Cards Grid */}
        <div className="anim-venue-cards-grid mt-12 grid gap-6 md:grid-cols-2">
          
          {/* Card 1 */}
          <div className="anim-venue-card flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-teal/40 hover:shadow-md sm:p-8">
            <div>
              <div className="flex items-center gap-2 text-teal">
                <Plane className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Travel Guidance</span>
              </div>
              <h3 className="mt-3 text-xl font-extrabold text-ink">Before Travelling</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Visitors and exhibitors should review official travel and event guidelines before arriving. International participants remain responsible for their own passports, visas, travel insurance, accommodation, airport transport, and customs requirements.
              </p>
            </div>
            <div className="mt-6 border-t border-slate-100 pt-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Info className="h-3.5 w-3.5 text-teal" />
                Kathmandu Airport (TIA) is approx. 20-30 mins from venue.
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="anim-venue-card flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-sky/40 hover:shadow-md sm:p-8">
            <div>
              <div className="flex items-center gap-2 text-sky">
                <HelpCircle className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Support & Help</span>
              </div>
              <h3 className="mt-3 text-xl font-extrabold text-ink">Venue Enquiries</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                For questions regarding hall accessibility, goods delivery, stall setup logistics, or specialized assistance for visitors and exhibitors, please contact the organizing team directly.
              </p>
            </div>
            <div className="mt-6 border-t border-slate-100 pt-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky hover:text-teal transition-colors"
              >
                <span>Contact Event Desk</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Action Callouts Footer */}
        <div className="mt-14 sm:mt-18 rounded-2xl border border-border bg-slate-50 p-6 text-center sm:p-10">
          <h4 className="text-xl font-extrabold text-ink sm:text-2xl">Ready to Join Us at the Venue?</h4>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Plan your travel schedule early or complete visitor registration to secure your badge.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button href="/plan-your-visit" variant="primary" className="shadow-sm hover:shadow-md">
              Plan Your Visit
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
            <Button href="/contact" variant="ghost" className="group">
              <span>Contact Us</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

      </Container>
    </div>
  );
}