import Image from "next/image";
import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const REG_VISITOR = siteConfig.registration.visitor;
const REG_EXHIBITOR = siteConfig.registration.exhibitor;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-teal-dark via-teal-dark to-teal">
      {/* Subtle radial accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(53, 168, 224, 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative grid grid-cols-1 gap-10 py-16 sm:py-22 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-28">
        <div className="lg:col-span-7">
          <p className="text-sm font-bold uppercase tracking-widest text-yellow">
            5TH NEPAL ELECTRIC, POWER AND LIGHTS INTERNATIONAL EXPO 2026
          </p>
          <h1 className="mt-4 max-w-2xl text-[34px] leading-[1.1] text-white sm:text-[46px] lg:text-[54px]">
            {siteConfig.marketingLine}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Meet manufacturers, suppliers, buyers, engineers, distributors and project professionals across
            Nepal&apos;s electrical, power, lighting, renewable-energy and allied industries.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/8 px-5 py-3.5">
            <div className="h-10 w-1 rounded-full bg-yellow" aria-hidden="true" />
            <p className="text-sm font-semibold text-white sm:text-base">
              {siteConfig.dates.display} · {siteConfig.venue.name} · {siteConfig.venue.city},{" "}
              {siteConfig.venue.country}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <TrackedLink
              event={AnalyticsEvents.BOOK_STAND_START}
              params={{ source: "hero" }}
              href={REG_EXHIBITOR}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-animated cta-exhibitor inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-teal px-7 py-3 text-base font-semibold text-white transition-colors duration-150 hover:bg-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Book a Stand
            </TrackedLink>
            <TrackedLink
              event={AnalyticsEvents.VISITOR_REGISTER_START}
              params={{ source: "hero" }}
              href={REG_VISITOR}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-animated cta-visitor inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-yellow px-7 py-3 text-base font-semibold text-ink transition-colors duration-150 hover:bg-yellow-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Register to Visit
            </TrackedLink>
            <TrackedLink
              event={AnalyticsEvents.BROCHURE_DOWNLOAD}
              params={{ source: "hero" }}
              href="/downloads/Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-1.5 text-base font-semibold text-white underline decoration-white/50 underline-offset-4 hover:text-yellow hover:decoration-yellow"
            >
              Download Brochure
            </TrackedLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <figure className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl shadow-black/20">
            <div className="relative aspect-[1600/1131] w-full">
              <Image
                src="/images/gallery/2025/nepal-electric-expo-2025-glimpses-01.webp"
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
