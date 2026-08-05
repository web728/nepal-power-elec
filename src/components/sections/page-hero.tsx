import Image from "next/image";
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
  bgOpacity = "opacity-30",
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
  // Check whether subtitle or description is passed
  const subText = subtitle || description;

  return (
    <section className="relative overflow-hidden bg-teal-dark py-12 sm:py-16">
      {/* 1. Background Image */}
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

      {/* 2. Gradient Overlay */}
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
        {subText && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {subText}
          </p>
        )}
        {cta && <div className="mt-6 flex flex-wrap gap-3">{cta}</div>}
      </Container>
    </section>
  );
}