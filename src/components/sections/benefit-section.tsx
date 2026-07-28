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
}: {
  eyebrow?: string;
  title: string;
  benefits: string[];
  ctaLabel: string;
  ctaHref: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <section className={isDark ? "bg-teal-dark py-16 sm:py-22" : "bg-white py-16 sm:py-22"}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} tone={tone} />

        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <CheckCircle2
                className={isDark ? "mt-0.5 h-5 w-5 flex-shrink-0 text-yellow" : "mt-0.5 h-5 w-5 flex-shrink-0 text-teal"}
                aria-hidden="true"
              />
              <span className={isDark ? "text-base leading-relaxed text-white/90" : "text-base leading-relaxed text-ink"}>
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
