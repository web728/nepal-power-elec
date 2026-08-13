"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const images = [
  {
    src: "/uploads/0L1A2244-min-1-1024x683.jpg",
    alt: "Collage of photographs of exhibitor stands and visitors at the 2025 edition of the Nepal Electric, Power and Lights Expo",
    title: "Exhibition Floor Highlights",
  },
  {
    src: "/uploads/np18-1024x681.jpg",
    alt: "Collage of photographs of the exhibition floor and business meetings at the 2025 edition of the Nepal Electric, Power and Lights Expo",
    title: "Business & B2B Meetings",
  },
  {
    src: "/uploads/559A5415-min.jpg",
    alt: "Inauguration ceremony and keynote speeches",
    title: "Inauguration Ceremony",
  },
  {
    src: "/uploads/AYU_7443-min-1536x1024.jpg",
    alt: "Product demonstrations on the expo floor",
    title: "Product Demonstrations",
  },
  {
    src: "/uploads/AYU_7369-min.jpg",
    alt: "International delegates visiting exhibition stalls",
    title: "Global Trade Delegates",
  },
  {
    src: "/uploads/np7-1024x681.jpg",
    alt: "Power and lighting technology showcases",
    title: "Power Tech Showcase",
  },
];

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".anim-gallery-head",
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

      // Gallery Card Stagger Animation
      gsap.fromTo(
        ".anim-gallery-card",
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTAs Entrance Animation
      gsap.fromTo(
        ".anim-gallery-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
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
      className="relative overflow-hidden bg-slate-50 py-12 sm:py-16 lg:py-24"
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="anim-gallery-head text-center">
          <SectionHeading
            eyebrow="Past Edition"
            title="2025 Edition Glimpses"
            align="center"
            className="mx-auto"
          />
        </div>

        {/* Responsive Grid Layout */}
        <div className="mx-auto mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
          {images.map((image, index) => (
            <figure
              key={image.src + index}
              className="anim-gallery-card group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-500/30 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />

                {/* Subtle Gradient Overlay & Title Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              </div>
            </figure>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="anim-gallery-cta mt-10 sm:mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button
            href="/past-editions/photo-gallery"
            variant="secondary"
            size="md"
            className="w-full sm:w-auto text-center px-8 py-3 transition-transform active:scale-95"
          >
            View Photo Gallery
          </Button>

          <TrackedLink
            event={AnalyticsEvents.REPORT_DOWNLOAD}
            params={{ source: "gallery_section" }}
            href="/downloads/2025-post-show-report"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm sm:text-base font-semibold text-teal-700 underline underline-offset-4 transition-colors hover:text-teal-900 active:scale-95"
          >
            Download Post-Show Report
          </TrackedLink>
        </div>
      </Container>
    </section>
  );
}