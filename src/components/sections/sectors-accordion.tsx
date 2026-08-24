"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { SectorsAccordionClient } from "@/components/sections/sectors-accordion-client";

export function SectorsAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register plugin inside effect safely
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const targets = [headingRef.current, accordionRef.current, buttonRef.current].filter(Boolean);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      // Safe animation with clearProps to avoid permanent opacity lock
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          clearProps: "transform", // Animation complete hone ke baad transform styles clean kar dega
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Smooth early trigger
            toggleActions: "play none none none", // Once played, stay visible (prevents layout freeze)
            once: true, // Prevents re-animating and browser reflow
          },
        }
      );
    }, sectionRef);

    // Refresh ScrollTrigger when layout shift happens
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Expo Sectors"
            title="Explore the Industries Powering the Expo"
            description="Discover products and technologies across electrical equipment, power infrastructure, renewable energy, lighting, transmission, distribution and allied sectors."
            align="center"
          />
        </div>

        {/* Client Accordion Component */}
        <div ref={accordionRef} className="mt-8 sm:mt-10 lg:mt-12">
          <SectorsAccordionClient />
        </div>

        {/* Bottom CTA Button */}
        <div
          ref={buttonRef}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button
            href="/exhibitor-categories"
            variant="primary"
            size="md"
            className="w-full sm:w-auto text-center px-6 py-3 transition-transform duration-200 active:scale-95"
          >
            View Exhibitor Categories
          </Button>
        </div>
      </Container>
    </section>
  );
}