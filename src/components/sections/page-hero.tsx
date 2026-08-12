"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  description,
  breadcrumbs,
  cta,
  bgImage,
  bgOpacity = "opacity-80", 
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  cta?: ReactNode;
  bgImage?: string;
  bgOpacity?: string;
}) {
  const subText = subtitle || description;
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance staggered animation
      gsap.fromTo(
        ".anim-hero-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );

      // Smooth zoom effect on hero image
      if (bgImage) {
        gsap.fromTo(
          ".anim-hero-bg",
          { scale: 1.08 },
          { scale: 1, duration: 1.4, ease: "power2.out" }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [bgImage]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-teal-dark py-14 sm:py-20 lg:py-24"
    >
      {/* 1. Background Image (High Visibility & Contrast) */}
      {bgImage && (
        <div className={`anim-hero-bg absolute inset-0 pointer-events-none ${bgOpacity}`}>
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            className="object-cover object-center brightness-105 contrast-105"
            sizes="100vw"
          />
        </div>
      )}

      {/* 2. Soft Tint Overlay (Keeps image crisp while ensuring contrast) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-teal-dark/90 via-teal-dark/65 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-teal-dark/80 via-transparent to-teal-dark/30 pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Ambient Glow Accents */}
      <div className="pointer-events-none absolute -top-12 -left-12 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 right-12 h-64 w-64 rounded-full bg-yellow/15 blur-3xl" />

      {/* Main Content Area */}
      <Container className="relative z-10">
        <div className="max-w-3xl">
      <div className="anim-hero-item [&_a]:text-gray-400 [&_a:hover]:text-gray-300">
  <Breadcrumbs items={breadcrumbs} />
</div>

          {eyebrow && (
            <div className="anim-hero-item mt-4 inline-flex items-center gap-1.5 rounded-full border border-yellow/40 bg-yellow/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-yellow shadow-xs backdrop-blur-md">
              {eyebrow}
            </div>
          )}

          <h1 className="anim-hero-item mt-3 text-[32px] font-extrabold leading-[1.12] text-white tracking-tight drop-shadow-md sm:text-[44px] lg:text-[50px]">
            {title}
          </h1>

          {subText && (
            <p className="anim-hero-item mt-4 max-w-2xl text-base leading-relaxed text-white/90 drop-shadow-xs sm:text-lg">
              {subText}
            </p>
          )}

          {cta && (
            <div className="anim-hero-item mt-8 flex flex-wrap gap-3 sm:gap-4">
              {cta}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}