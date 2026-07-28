import { Building2, Ticket, FileDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const cards = [
  {
    icon: Building2,
    heading: "Exhibit at the Expo",
    line: "Showcase your products to buyers, distributors and project professionals from across Nepal's electrical and power sector.",
    ctaLabel: "Book a Stand",
    href: siteConfig.registration.exhibitor,
    external: true,
    variant: "cta-exhibitor" as const,
    accent: "bg-sky/10 text-sky-dark",
  },
  {
    icon: Ticket,
    heading: "Visit the Expo",
    line: "Register to explore manufacturers, suppliers and the latest products across power, lighting and renewable energy.",
    ctaLabel: "Register to Visit",
    href: siteConfig.registration.visitor,
    external: true,
    variant: "cta-visitor" as const,
    accent: "bg-teal/10 text-teal",
  },
  {
    icon: FileDown,
    heading: "Get the Documents",
    line: "Download the 2026 event brochure and the 2025 post-show report for full event details and past results.",
    ctaLabel: "View Downloads",
    href: "#downloads",
    external: false,
    variant: "ghost" as const,
    accent: "bg-yellow/10 text-yellow-dark",
  },
];

export function QuickActionCards() {
  return (
    <section className="relative -mt-8 z-10 pb-6 sm:-mt-10 sm:pb-8">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map(({ icon: Icon, heading, line, ctaLabel, href, external, variant, accent }) => (
            <div
              key={heading}
              className="group flex flex-col items-start rounded-xl border border-border bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <span className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${accent}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-ink">{heading}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{line}</p>
              <Button
                href={href}
                variant={variant}
                size="sm"
                className="mt-5 w-full sm:w-auto"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {ctaLabel}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
