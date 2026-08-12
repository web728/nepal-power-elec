"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BenefitSectionProps {
  eyebrow?: string;
  title: string;
  benefits: string[];
  ctaLabel: string;
  ctaHref: string;
  tone?: "light" | "dark";
  bgImage?: string;
  bgOpacity?: string;
  showTopGraphic?: boolean;
}

export function BenefitSection({
  eyebrow,
  title,
  benefits,
  ctaLabel,
  ctaHref,
  tone = "light",
  bgImage,
  bgOpacity = "opacity-40",
  showTopGraphic = false,
}: BenefitSectionProps) {
  const isDark = tone === "dark";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Animation
      gsap.fromTo(
        ".anim-heading",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered Benefits List Animation
      gsap.fromTo(
        ".anim-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA Button Animation
      gsap.fromTo(
        ".anim-cta",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
      className={`relative overflow-hidden py-12 sm:py-18 md:py-24 ${
        isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* 1. Top Right Graphic */}
      {showTopGraphic && (
        <div className="pointer-events-none absolute right-0 top-0 z-0 opacity-20 sm:opacity-40 lg:opacity-75 overflow-hidden">
          <Image
            src="/brandings/ulb.png"
            alt="Background Graphic Top Right"
            width={800}
            height={800}
            priority
            className="
              h-auto object-contain
              w-[220px] translate-x-[20%] -translate-y-[15%]
              sm:w-[450px] sm:translate-x-[15%] sm:-translate-y-[20%]
              lg:w-[650px] lg:translate-x-[10%] lg:-translate-y-[25%]
            "
          />
        </div>
      )}

      {/* 2. Background Image */}
      {bgImage && (
        <div className={`absolute inset-0 pointer-events-none z-0 ${bgOpacity}`}>
          <Image
            src={bgImage}
            alt="Section background"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      )}

      {/* 3. Dark Overlay for Contrast */}
      {isDark && bgImage && (
        <div
          className="absolute inset-0 bg-teal-dark/60  pointer-events-none z-0"
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="anim-heading max-w-3xl">
          <SectionHeading eyebrow={eyebrow} title={title} tone={tone} />
        </div>

        {/* Benefits Grid */}
        <ul className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
          {benefits.map((benefit, idx) => (
            <li
              key={`${benefit}-${idx}`}
              className="anim-item flex items-start gap-3.5 rounded-lg border border-transparent p-2 transition-colors sm:p-0"
            >
              <CheckCircle2
                className={`mt-1 h-5 w-5 flex-shrink-0 ${
                  isDark ? "text-amber-400" : "text-teal-600"
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? "text-slate-200" : "text-slate-700"
                }`}
              >
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button Wrapper */}
        <div className="anim-cta mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center">
          <Button
            href={ctaHref}
            variant={isDark ? "outline-white" : "primary"}
            size="md"
            className="w-full sm:w-auto text-center px-8 py-3 transition-transform duration-200 active:scale-95"
          >
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}