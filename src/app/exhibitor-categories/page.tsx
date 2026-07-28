import type { Metadata } from "next";
import { Zap, Cable, Cpu, Lightbulb, Home, Settings2, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { sectors } from "@/lib/content/sectors";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [
  { label: "Exhibit", href: "/why-exhibit" },
  { label: "Exhibitor Categories" },
];

const sectorIcons: Record<string, LucideIcon> = {
  "power-and-energy": Zap,
  "transmission-distribution-equipment": Cable,
  "electricals-electronics": Cpu,
  lighting: Lightbulb,
  "home-appliances": Home,
  "electro-energetics": Settings2,
};

export const metadata: Metadata = {
  title: { absolute: "Exhibitor Categories | Nepal Electric, Power and Lights Expo" },
  description:
    "Browse power, electrical, renewable-energy, lighting, automation, cable and appliance categories at the 2026 expo.",
  alternates: { canonical: "/exhibitor-categories" },
};

export default function ExhibitorCategoriesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Exhibit", href: "/why-exhibit" },
          { label: "Exhibitor Categories", href: "/exhibitor-categories" },
        ]}
      />
      <PageHero title="Explore the Event's Main Product Sectors" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => {
            const Icon = sectorIcons[sector.slug] ?? Zap;
            return (
              <Card key={sector.slug} className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky/10">
                  <Icon className="h-6 w-6 text-sky-dark" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-ink">{sector.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {sector.items.join(", ")}.
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-yellow/40 bg-yellow/10 px-5 py-4">
          <p className="text-sm leading-relaxed text-ink">
            The final product range depends on confirmed exhibitor participation. Category
            inclusion does not confirm that a specific company or product will be present.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={siteConfig.registration.exhibitor} target="_blank" rel="noopener noreferrer" variant="cta-exhibitor">
            Book a Stand
          </Button>
          <Button href={siteConfig.registration.visitor} target="_blank" rel="noopener noreferrer" variant="cta-visitor">
            Register to Visit
          </Button>
        </div>
      </Container>
    </>
  );
}
