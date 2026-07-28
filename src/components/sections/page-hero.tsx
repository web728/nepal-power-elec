import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  cta,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  cta?: ReactNode;
}) {
  return (
    <section className="bg-teal-dark py-12 sm:py-16">
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        {eyebrow && <p className="mt-4 text-sm font-bold uppercase tracking-wide text-yellow">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-[32px] leading-[1.15] text-white sm:text-[42px]">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{description}</p>}
        {cta && <div className="mt-6 flex flex-wrap gap-3">{cta}</div>}
      </Container>
    </section>
  );
}
