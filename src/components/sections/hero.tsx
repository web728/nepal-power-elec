import Image from "next/image";
import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const REG_VISITOR = siteConfig.registration.visitor;
const REG_EXHIBITOR = siteConfig.registration.exhibitor;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-teal-900">
      {/* 1. Background Image */}
      <Image
        src="/uploads/distribution-electric-substation-with-power-lines-transformers_156373-17.webp"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center pointer-events-none"
        sizes="100vw"
      />

      {/* 2. Dark Overlay / Gradient (Text readability ke liye) */}
      {/* Humne opacity `/95`, `/90`, `/80` se kam karke `/70`, `/60`, `/50` kar di hai */}
     {/* Improved Dark Overlay Gradient */}
<div 
  className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-900/50 pointer-events-none" 
  aria-hidden="true" 
/>

      {/* Subtle radial accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(53, 168, 224, 0.09) 0%, transparent 90%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative grid grid-cols-1 gap-6 py-6 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-12">
        <div className="lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow">
            5TH NEPAL ELECTRIC, POWER AND LIGHTS INTERNATIONAL EXPO 2026
          </p>
          <h1 className="mt-2 max-w-2xl text-[28px] leading-[1.15] text-white sm:text-[38px] lg:text-[44px]">
            {siteConfig.marketingLine}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Meet manufacturers, suppliers, buyers, engineers, distributors and project professionals across
            Nepal&apos;s electrical, power, lighting, renewable-energy and allied industries.
          </p>

          <div className="mt-4 inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/8 px-4 py-2.5">
            <div className="h-8 w-1 rounded-full bg-yellow" aria-hidden="true" />
            <p className="text-xs font-semibold text-white sm:text-sm">
              {siteConfig.dates.display} · {siteConfig.venue.name} · {siteConfig.venue.city},{" "}
              {siteConfig.venue.country}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <TrackedLink
              event={AnalyticsEvents.BOOK_STAND_START}
              params={{ source: "hero" }}
              href={REG_EXHIBITOR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Book a Stand
            </TrackedLink>

            <TrackedLink
              event={AnalyticsEvents.VISITOR_REGISTER_START}
              params={{ source: "hero" }}
              href={REG_VISITOR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors duration-150 hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Register to Visit
            </TrackedLink>

            <TrackedLink
              event={AnalyticsEvents.BROCHURE_DOWNLOAD}
              params={{ source: "hero" }}
              href="/downloads/Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center justify-center gap-1.5 text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 hover:text-yellow hover:decoration-yellow"
            >
              Download Brochure
            </TrackedLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <figure className="overflow-hidden rounded-xl border border-white/15 bg-white/5 shadow-2xl shadow-black/20">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/uploads/0L1A2376-min-scaled.jpg"
                alt="Grid of photographs showing exhibitor stands, visitors and the exhibition floor at the 2025 edition of the Nepal Electric, Power and Lights Expo"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            </div>
          </figure>
        </div>
      </Container>
    </section>
  );
}