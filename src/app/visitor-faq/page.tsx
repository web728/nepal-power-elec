import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { visitorFaqs } from "@/lib/content/faqs";

const breadcrumbs = [{ label: "Visit", href: "/why-visit" }, { label: "Visitor FAQ" }];

export const metadata: Metadata = {
  title: { absolute: "Visitor FAQ | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Find answers about visitor registration, entry, travel, photography, exhibitors and accessibility.",
  alternates: { canonical: "/visitor-faq" },
};

export default function VisitorFaqPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Visit", href: "/why-visit" },
          { label: "Visitor FAQ", href: "/visitor-faq" },
        ]}
      />
      <FaqJsonLd items={visitorFaqs} />
      <PageHero title="Visitor FAQ" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <Accordion items={visitorFaqs} />
      </Container>
    </>
  );
}
