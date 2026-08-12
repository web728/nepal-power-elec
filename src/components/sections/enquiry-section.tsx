"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuickEnquiryForm } from "@/components/forms/quick-enquiry-form";
import { MapPin, CalendarDays, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const infoPoints = [
  {
    icon: CalendarDays,
    label: "Dates",
    value: siteConfig.dates.display,
  },
  {
    icon: MapPin,
    label: "Venue",
    value: siteConfig.venue.full,
  },
];

export function EnquirySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side text and info cards sequence animation
      gsap.fromTo(
        ".anim-enquiry-left",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Info points (Dates & Venue) stagger entrance
      gsap.fromTo(
        ".anim-info-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Right side Form Card pop-in & slide-up animation
      gsap.fromTo(
        ".anim-form-card",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-form-card",
            start: "top 85%",
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
      id="enquiry"
      className="relative overflow-hidden bg-bg py-16 sm:py-24 scroll-mt-24"
    >
      {/* Background Decorative Gradient Blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sky/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 items-center">
          
          {/* Left Column - Content & Details */}
          <div className="lg:col-span-2">
            <div className="anim-enquiry-left">
              <SectionHeading
                eyebrow="Get in Touch"
                title="Interested in the Expo?"
              />
              <p className="mt-4 text-base leading-relaxed text-muted">
                Whether you want to exhibit, visit, or explore partnership opportunities — drop us a
                message and our team will get back to you.
              </p>
            </div>

            {/* Info Cards */}
            <div className="mt-8 flex flex-col gap-4">
              {infoPoints.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="anim-info-item group flex items-start gap-4 rounded-xl border border-border/60 bg-white/60 p-4 backdrop-blur-sm shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-sky/40 hover:bg-white hover:shadow-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky transition-transform duration-300 group-hover:scale-110 group-hover:bg-sky group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted/80">{label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-ink sm:text-base">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Badge */}
            <div className="anim-info-item mt-6 inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky/5 px-3.5 py-1.5 text-xs font-medium text-sky">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Fast response within 24 hours</span>
            </div>
          </div>

          {/* Right Column - Animated Form Container */}
          <div className="lg:col-span-3">
            <div className="anim-form-card relative rounded-2xl border border-border/80 bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl sm:p-8">
              {/* Top Decorative Line */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-sky via-teal-500 to-sky" />
              
              <QuickEnquiryForm />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}