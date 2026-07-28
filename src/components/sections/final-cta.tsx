import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-teal-dark py-16 sm:py-22">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(53, 168, 224, 0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-2xl text-[28px] leading-[1.15] text-white sm:text-[34px]">
          Be Part of the {siteConfig.edition} {siteConfig.shortName}
        </h2>
        <p className="mt-4 text-base font-semibold text-yellow sm:text-lg">
          {siteConfig.dates.display} · {siteConfig.venue.full}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <TrackedLink
            event={AnalyticsEvents.BOOK_STAND_START}
            params={{ source: "final_cta" }}
            href={siteConfig.registration.exhibitor}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-animated cta-exhibitor inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-teal px-8 py-4 text-base font-semibold text-white transition-colors duration-150 hover:bg-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Book a Stand
          </TrackedLink>
          <TrackedLink
            event={AnalyticsEvents.VISITOR_REGISTER_START}
            params={{ source: "final_cta" }}
            href={siteConfig.registration.visitor}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-animated cta-visitor inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-yellow px-8 py-4 text-base font-semibold text-ink transition-colors duration-150 hover:bg-yellow-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Register to Visit
          </TrackedLink>
        </div>
      </Container>
    </section>
  );
}
