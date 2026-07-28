import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { SearchForm } from "./search-form";

export const metadata: Metadata = {
  title: { absolute: "Search | Nepal Electric, Power and Lights Expo" },
  description: "Search the Nepal Electric, Power and Lights Expo website.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Search", href: "/search" }]} />
      <PageHero title="Search the Expo Website" breadcrumbs={[{ label: "Search" }]} />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Search for event information, participation, visitor registration, product sectors,
          previous editions, downloads or organizer contacts.
        </p>
        <div className="mt-8">
          <SearchForm />
        </div>
      </Container>
    </>
  );
}
