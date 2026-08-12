"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function EventOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Direct Text Scroll Animation
      gsap.fromTo(
        textContainerRef.current,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%", // Scroll hone par kab start hoga
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
      className="relative overflow-hidden bg-bg py-16 sm:py-24 md:py-28"
    >
      {/* Top Left Static Graphic */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 opacity-15 sm:opacity-40 lg:opacity-75">
        <Image
          src="/brandings/wow.png"
          alt="Windmill Graphic Left"
          width={800}
          height={800}
          priority
          className="
            h-auto object-contain rotate-180
            /* Mobile View Sizing & Positioning */
            w-[200px] -translate-x-[20%] -translate-y-[15%]
            /* Tablet Sizing */
            sm:w-[380px] sm:-translate-x-[15%] sm:-translate-y-[15%]
            /* Desktop Sizing */
            lg:w-[650px] lg:-translate-x-[10%] lg:-translate-y-[10%]
            xl:w-[750px] xl:-translate-x-[5%]
          "
        />
      </div>

      {/* Right Static Graphic */}
      <div className="pointer-events-none absolute right-0 bottom-0 sm:top-0 z-0 opacity-15 sm:opacity-40 lg:opacity-75">
        <Image
          src="/brandings/wow.png"
          alt="Windmill Graphic Right"
          width={800}
          height={800}
          priority
          className="
            h-auto object-contain
            /* Mobile View Sizing & Positioning */
            w-[200px] translate-x-[20%] translate-y-[15%]
            /* Tablet & Desktop Sizing */
            sm:w-[380px] sm:translate-x-[15%] sm:translate-y-[15%]
            lg:w-[650px] lg:translate-x-[10%] lg:-translate-y-[10%]
            xl:w-[750px] xl:translate-x-[5%]
          "
        />
      </div>

      {/* Container - Scroll Animated Text */}
      <Container className="relative z-10">
        <div ref={textContainerRef} className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="About the Expo"
            title="A Focused Trade Platform for Nepal"
            description="The Nepal Electric, Power and Lights International Expo brings together companies and professionals involved in electrical equipment, power and energy, transmission and distribution, wires and cables, renewable energy, lighting, automation, appliances and related technologies. The exhibition is designed for product presentation, supplier discovery, sourcing discussions, distributor development and professional networking."
            align="center"
          />
        </div>
      </Container>
    </section>
  );
}