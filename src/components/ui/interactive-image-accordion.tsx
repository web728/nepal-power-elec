"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

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
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Prevent SSR/Client media query mismatch freezing GSAP
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  }, []);

  if (!mounted) {
    // SSR Fallback skeleton preventing layout shift freeze
    return (
      <div className={cn("grid gap-3 md:flex md:h-[420px] lg:h-[480px]", className)}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative h-28 md:h-full md:flex-1 overflow-hidden rounded-xl bg-slate-900 border border-slate-800"
          >
            <Image
              src={item.imageSrc}
              alt={item.alt}
              fill
              className="object-cover opacity-50"
              sizes="(min-width: 768px) 25vw, 100vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {/* ---------------- MOBILE ACCORDION (< 768px) ---------------- */}
      <div className="flex flex-col gap-3 md:hidden">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => handleToggle(index)}
                aria-expanded={isActive}
                className="flex w-full items-center justify-between gap-3 bg-white px-4 py-3.5 text-left font-semibold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-xs font-bold text-teal-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{item.title}</span>
                </span>
                <svg
                  className={cn(
                    "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300",
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
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="relative aspect-[16/9] w-full bg-slate-900">
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
            </div>
          );
        })}
      </div>

      {/* ---------------- DESKTOP EXPANDABLE PANELS (>= 768px) ---------------- */}
      <div
        className="hidden md:flex h-[420px] lg:h-[480px] gap-2.5 w-full"
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
                "group relative overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 will-change-[flex-grow]",
                prefersReducedMotion
                  ? "transition-none"
                  : "transition-[flex-grow] duration-500 ease-in-out",
                isActive ? "flex-[4]" : "flex-[1]"
              )}
            >
              <Image
                src={item.imageSrc}
                alt={item.alt}
                fill
                className={cn(
                  "object-cover transition-transform duration-700 ease-out",
                  isActive && !prefersReducedMotion && "scale-105"
                )}
                sizes="(min-width: 1024px) 50vw, 70vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end p-4 lg:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/40 text-sm font-bold text-white backdrop-blur-md">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-left font-semibold text-white whitespace-nowrap transition-opacity duration-300",
                      isActive ? "opacity-100 text-lg lg:text-xl" : "opacity-0 lg:opacity-70 text-sm"
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
    </div>
  );
}