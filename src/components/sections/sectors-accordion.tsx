"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { SectorsAccordionClient } from "@/components/sections/sectors-accordion-client";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectorsAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered Staggered Fade-in Animation
      gsap.fromTo(
        [headingRef.current, accordionRef.current, buttonRef.current],
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Jab section screen ke 80% par aaye
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