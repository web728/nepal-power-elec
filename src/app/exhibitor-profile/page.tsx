import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { sectors } from "@/lib/content/sectors";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [
  { label: "Exhibit", href: "/why-exhibit" },
  { label: "Exhibitor Profile" },
];

export const metadata: Metadata = {
  title: { absolute: "Exhibitor Profile | Nepal Electric, Power and Lights Expo" },
  description:
    "See which manufacturers, suppliers, technologies and services are relevant to the Nepal Electric, Power and Lights Expo.",
  alternates: { canonical: "/exhibitor-profile" },
};

export default function ExhibitorProfilePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Exhibit", href: "/why-exhibit" },
          { label: "Exhibitor Profile", href: "/exhibitor-profile" },
        ]}
      />
      <PageHero title="Companies and Technologies Relevant to the Expo" breadcrumbs={breadcrumbs}
         bgImage="/images/hero/0L1A2244-min-scaled.jpg" 
        bgOpacity="opacity-50"
         />
      <Container as="section" className="py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {sectors.map((sector) => (
            <Card key={sector.slug} className="h-full">
              <h2 className="text-lg font-semibold text-ink">{sector.name}</h2>
              <ul className="mt-4 space-y-2">
                {sector.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-base leading-relaxed text-ink">
          Companies should submit an exhibitor enquiry so the organizing team can review product
          relevance and participation requirements.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={siteConfig.registration.exhibitor} target="_blank" rel="noopener noreferrer" variant="cta-exhibitor">
            Book a Stand
          </Button>
          <Button href="/contact" variant="outline">
            Contact the Organizers
          </Button>
        </div>
      </Container>
    </>
  );
}
