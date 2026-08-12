"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { ArrowUpRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal sequence
      gsap.fromTo(
        ".anim-cta-content",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Buttons stagger animation
      gsap.fromTo(
        ".anim-cta-btn",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-cta-btn",
            start: "top 90%",
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
      className="relative overflow-hidden bg-teal-dark py-16 sm:py-24"
    >
      {/* Background Animated Glow Blobs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(53, 168, 224, 0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-yellow/10 blur-3xl" />

      <Container className="relative z-10 text-center">
        <div className="anim-cta-content mx-auto max-w-3xl">
          {/* Subtle Tag */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow/30 bg-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Join Nepal's Premier Expo</span>
          </div>

          <h2 className="text-[28px] font-bold leading-[1.15] text-white sm:text-[40px]">
            Be Part of the {siteConfig.edition} {siteConfig.shortName}
          </h2>

          <p className="mt-4 text-base font-semibold text-yellow sm:text-xl">
            {siteConfig.dates.display} · {siteConfig.venue.full}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="anim-cta-btn">
            <TrackedLink
              event={AnalyticsEvents.BOOK_STAND_START}
              params={{ source: "final_cta" }}
              href={siteConfig.registration.exhibitor}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-yellow px-8 py-4 text-base font-bold text-ink shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-dark hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>Book a Stand</span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </TrackedLink>
          </div>

          <div className="anim-cta-btn">
            <TrackedLink
              event={AnalyticsEvents.VISITOR_REGISTER_START}
              params={{ source: "final_cta" }}
              href={siteConfig.registration.visitor}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-ink hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>Register to Visit</span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </TrackedLink>
          </div>
        </div>
      </Container>
    </section>
  );
}