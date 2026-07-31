import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function BenefitSection({
  eyebrow,
  title,
  benefits,
  ctaLabel,
  ctaHref,
  tone = "light",
  bgImage,
  bgOpacity = "opacity-40",
}: {
  eyebrow?: string;
  title: string;
  benefits: string[];
  ctaLabel: string;
  ctaHref: string;
  tone?: "light" | "dark";
  bgImage?: string;
  bgOpacity?: string;
}) {
  const isDark = tone === "dark";

  return (
   <section
    className={`relative overflow-hidden py-16 sm:py-22 ${
      isDark ? "bg-teal-dark" : "bg-white"
    }`}
  >
    {/* Background Graphic - Top Right Corner */}
    <div className="absolute right-0 top-0 pointer-events-none z-0 opacity-100 overflow-hidden">
      <Image
        src="/brandings/ulb.png"
        alt="Background Graphic Top Right"
        width={1200}
        height={1200}
        className="
          h-auto object-contain
          
          /* Mobile: Badi image, top corner positioning */
          w-[250vw] max-w-none translate-x-[28%] -translate-y-[20%]
          
          /* Tablet Sizing */
          sm:w-[600px] sm:translate-x-[10%] sm:-translate-y-[15%]
          
          /* Laptop / Desktop Sizing - Isse image pure top par chali jayegi */
          lg:w-[850px] lg:translate-x-[15%] lg:-translate-y-[30%]
          
          /* Extra Large Screens */
          xl:w-[700px] xl:translate-x-[2%] xl:-translate-y-[20%]
        "
      />
    </div>

      {/* 1. Background Image (Jab bgImage prop pass ho tabhi dikhega) */}
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

      {/* 2. Dark Overlay */}
      {isDark && bgImage && (
        <div
          className="absolute inset-0 bg-teal-dark/60 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}

      {/* Main Content - bilkul original layout ki tarah intact hai */}
      <Container className="relative z-10">
        <SectionHeading eyebrow={eyebrow} title={title} tone={tone} />

        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <CheckCircle2
                className={
                  isDark
                    ? "mt-0.5 h-5 w-5 flex-shrink-0 text-yellow"
                    : "mt-0.5 h-5 w-5 flex-shrink-0 text-teal"
                }
                aria-hidden="true"
              />
              <span
                className={
                  isDark
                    ? "text-base leading-relaxed text-white/90"
                    : "text-base leading-relaxed text-ink"
                }
              >
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        <Button
          href={ctaHref}
          variant={isDark ? "outline-white" : "primary"}
          size="md"
          className="mt-8"
        >
          {ctaLabel}
        </Button>
      </Container>
    </section>
  );
}