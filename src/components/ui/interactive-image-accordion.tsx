"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

export interface AccordionSector {
  id: string;
  title: string;
  imageSrc: string;
  alt: string;
}

interface InteractiveImageAccordionProps {
  items: AccordionSector[];
  className?: string;
}

export function InteractiveImageAccordion({
  items,
  className,
}: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useReducedMotion();

  const handleActivate = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index && index !== 0 ? 0 : index));
  }, []);

  if (isMobile) {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div key={item.id} className="rounded-xl overflow-hidden border border-border shadow-sm">
              <button
                type="button"
                onClick={() => handleActivate(index)}
                aria-expanded={isActive}
                className="flex w-full items-center justify-between gap-3 bg-white px-5 py-4 text-left font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-[-2px]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-sm font-bold text-teal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </span>
                <svg
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted transition-transform",
                    !prefersReducedMotion && "duration-300",
                    isActive && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={cn(
                  "overflow-hidden",
                  prefersReducedMotion
                    ? isActive ? "h-auto" : "h-0"
                    : "transition-[max-height] duration-400 ease-in-out",
                )}
                style={
                  prefersReducedMotion
                    ? undefined
                    : { maxHeight: isActive ? "300px" : "0px" }
                }
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn("flex h-[420px] gap-2 lg:h-[480px]", className)}
      role="group"
      aria-label="Expo sector image panels"
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            aria-expanded={isActive}
            className={cn(
              "group relative overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2",
              prefersReducedMotion
                ? ""
                : "transition-[flex] duration-500 ease-in-out",
              isActive ? "flex-[4]" : "flex-[0.8]",
            )}
          >
            <Image
              src={item.imageSrc}
              alt={item.alt}
              fill
              className={cn(
                "object-cover",
                !prefersReducedMotion && "transition-transform duration-700 ease-out",
                isActive && !prefersReducedMotion && "scale-105",
              )}
              sizes="(min-width: 1024px) 60vw, 80vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 flex items-end p-4 lg:p-6",
                prefersReducedMotion ? "" : "transition-opacity duration-300",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/60 bg-white/10 text-sm font-bold text-white backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-left text-base font-semibold text-white lg:text-lg",
                    prefersReducedMotion
                      ? ""
                      : "transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0 md:opacity-100",
                  )}
                >
                  {item.title}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
