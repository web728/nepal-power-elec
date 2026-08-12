"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { eventScale } from "@/lib/content/stats";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Animation for Badge and Stat Cards
      gsap.fromTo(
        ".stat-item",
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
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
      className="relative overflow-hidden bg-teal-800 py-12 sm:py-16 lg:py-20"
    >
      {/* Background Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(4, 79, 71, 0.6) 0%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Sub-header Badge */}
        <p className="stat-item mb-8 text-center text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400 drop-shadow-sm">
          2025 Edition Results
        </p>

        {/* Responsive Grid: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {eventScale.map((stat, index) => (
            <div
              key={stat.label || index}
              className="stat-item flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-amber-400/30 hover:bg-white/10 hover:shadow-lg hover:shadow-teal-950/40"
            >
              <p className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-2 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}