"use client";

import { useEffect, useRef } from "react";
import type { Metadata } from "next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { expoSupports } from "@/lib/content/home-content";
import { 
  CheckCircle2, 
  Zap, 
  Users, 
  ArrowRight, 
  Sparkles,
  Building2,
  Globe2
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "About the Expo" }];

export default function AboutTheExpoPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro paragraph reveal
      gsap.fromTo(
        ".anim-about-intro",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-about-intro",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // What the expo supports list stagger
      gsap.fromTo(
        ".anim-support-card",
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-support-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Feature Info Cards
      gsap.fromTo(
        ".anim-feature-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-feature-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA Buttons reveal
      gsap.fromTo(
        ".anim-cta-buttons",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-cta-buttons",
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
      <BreadcrumbJsonLd items={[{ label: "About the Expo", href: "/about-the-expo" }]} />
      
      <PageHero
        title="Connecting the Electrical, Power and Energy Value Chain"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/Large-image-Energy-connectivity.jpg" 
        bgOpacity="opacity-50" 
      />

      <Container as="section" className="py-12 sm:py-20">
        
        {/* Intro Section with Highlight Card */}
        <div className="anim-about-intro relative rounded-2xl border border-sky/20 bg-gradient-to-br from-white via-sky/5 to-teal-500/5 p-6 shadow-sm sm:p-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky/30 bg-sky/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky">
            <Sparkles className="h-3.5 w-3.5" />
            <span>5th Edition Premier Trade Fair</span>
          </div>
          <p className="max-w-4xl text-lg leading-relaxed text-ink font-medium sm:text-xl">
            5th Nepal Electric, Power and Lights International Expo is a premier business exhibition for
            manufacturers, suppliers, importers, distributors, dealers, engineers, consultants,
            project developers, utilities, contractors, institutions and buyers operating across
            the electrical and energy sectors.
          </p>
        </div>

        {/* What the Expo Supports Section */}
        <div className="mt-14 sm:mt-20">
          <SectionHeading 
            eyebrow="Key Objectives" 
            title="What the Expo Supports" 
          />
          <div className="anim-support-grid mt-8 grid gap-4 sm:grid-cols-2">
            {expoSupports.map((item, index) => (
              <div
                key={index}
                className="anim-support-card group flex items-start gap-3.5 rounded-xl border border-border/80 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-md"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky transition-transform duration-300 group-hover:scale-110 group-hover:bg-sky group-hover:text-white">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <p className="text-sm font-medium leading-relaxed text-ink sm:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Coverage & Who Serves Cards Grid */}
        <div className="anim-feature-grid mt-14 sm:mt-20 grid gap-6 md:grid-cols-2">
          
          {/* Card 1 - Industry Coverage */}
          <div className="anim-feature-card group rounded-2xl border border-border/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-teal-500/40 hover:shadow-lg sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 transition-transform duration-300 group-hover:scale-110">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-ink sm:text-2xl">
              Industry Coverage
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              The event covers power and energy, transmission and distribution, wires and cables,
              renewable energy, batteries and storage, lighting and LED, electrical and electronic
              products, automation, appliances, electric mobility and allied professional services.
            </p>
          </div>

          {/* Card 2 - Who the Event Serves */}
          <div className="anim-feature-card group rounded-2xl border border-border/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-sky/40 hover:shadow-lg sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky/10 text-sky transition-transform duration-300 group-hover:scale-110">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-ink sm:text-2xl">
              Who the Event Serves
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              The expo serves both companies seeking market access and professionals seeking
              products, suppliers and technical solutions. It is designed as a trade-oriented
              environment for meaningful business interaction.
            </p>
          </div>

        </div>

        {/* Action Buttons Section */}
        <div className="anim-cta-buttons mt-14 sm:mt-20 rounded-2xl border border-border bg-slate-50 p-6 sm:p-8 text-center">
          <h4 className="text-lg font-bold text-ink sm:text-xl">Ready to Explore Further?</h4>
          <p className="mt-1 text-sm text-muted">Discover profiles or reach out to our event coordination team.</p>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button href="/exhibitor-profile" variant="primary" className="group">
              <span>View Exhibitor Profile</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href="/visitor-profile" variant="outline" className="group">
              <span>View Visitor Profile</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href="/contact" variant="ghost">
              Contact the Organizers
            </Button>
          </div>
        </div>

      </Container>
    </div>
  );
}