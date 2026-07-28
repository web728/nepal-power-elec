import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { exhibitorFaqs } from "@/lib/content/faqs";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [
  { label: "Exhibit", href: "/why-exhibit" },
  { label: "Exhibitor FAQ" },
];

export const metadata: Metadata = {
  title: { absolute: "Exhibitor FAQ | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Read practical answers about exhibiting, stands, demonstrations, payments, travel and event branding.",
  alternates: { canonical: "/exhibitor-faq" },
};

export default function ExhibitorFaqPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Exhibit", href: "/why-exhibit" },
          { label: "Exhibitor FAQ", href: "/exhibitor-faq" },
        ]}
      />
      <FaqJsonLd items={exhibitorFaqs} />
      <PageHero title="Exhibitor FAQ" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <Accordion items={exhibitorFaqs} />

        <div className="mt-10 flex flex-wrap gap-3">
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
