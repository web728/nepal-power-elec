import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { generalFaqs } from "@/lib/content/faqs";

const breadcrumbs = [{ label: "FAQ" }];

export const metadata: Metadata = {
  title: { absolute: "FAQ | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Find answers about dates, venue, exhibiting, visiting, media enquiries and official documents for the 2026 expo.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "FAQ", href: "/faq" }]} />
      <FaqJsonLd items={generalFaqs} />
      <PageHero title="Frequently Asked Questions" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <Accordion items={generalFaqs} />
      </Container>
    </>
  );
}
