import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  cta,
  bgImage,
  bgOpacity = "opacity-30", // Default opacity (aap custom class pass kar sakte ho)
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  cta?: ReactNode;
  bgImage?: string; // Image path (Optional)
  bgOpacity?: string; // Opacity control (Optional)
}) {
  return (
    <section className="relative overflow-hidden bg-teal-dark py-12 sm:py-16">
      {/* 1. Background Image (Agar bgImage pass kiya ho) */}
      {bgImage && (
        <div className={`absolute inset-0 pointer-events-none ${bgOpacity}`}>
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      )}

      {/* 2. Gradient Overlay (Text readability ke liye) */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-teal-dark/90 via-teal-dark/70 to-teal-dark/50 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <Container className="relative z-10">
        <Breadcrumbs items={breadcrumbs} />
        {eyebrow && (
          <p className="mt-4 text-sm font-bold uppercase tracking-wide text-yellow">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 max-w-3xl text-[32px] leading-[1.15] text-white sm:text-[42px]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
        )}
        {cta && <div className="mt-6 flex flex-wrap gap-3">{cta}</div>}
      </Container>
    </section>
  );
}