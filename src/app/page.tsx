import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { QuickActionCards } from "@/components/sections/quick-action-cards";
import { EventOverview } from "@/components/sections/event-overview";
import { SectorsAccordion } from "@/components/sections/sectors-accordion";
import { StatsSection } from "@/components/sections/stats-section";
import { BenefitSection } from "@/components/sections/benefit-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { DownloadsSection } from "@/components/sections/downloads-section";
import { OrganizersSection } from "@/components/sections/organizers-section";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { FinalCta } from "@/components/sections/final-cta";
import { whyExhibitBenefits, whyVisitBenefits } from "@/lib/content/home-content";

export const metadata: Metadata = {
  title: "Nepal Electric, Power and Lights Expo 2026 | Kathmandu",
  description:
    "Join the 5th Nepal Electric, Power and Lights International Expo, 4-6 September 2026 at Bhrikuti Mandap Exhibition Hall, Kathmandu.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActionCards />
      <EventOverview />
      {/* Interactive Image Accordion — after About, before Why Exhibit */}
      <SectorsAccordion />
      <BenefitSection
        eyebrow="For Exhibitors"
        title="Why Exhibit"
        benefits={whyExhibitBenefits}
        ctaLabel="Why Exhibit"
        ctaHref="/why-exhibit"
        tone="light"
      />
      <BenefitSection
        eyebrow="For Visitors"
        title="Why Visit"
        benefits={whyVisitBenefits}
        ctaLabel="Why Visit"
        ctaHref="/why-visit"
        tone="dark"
        bgImage="/uploads/cloud-service-provider.jpg" 
        bgOpacity="opacity-60"
      />
      <StatsSection />
      <GallerySection />
      <DownloadsSection />
      <OrganizersSection />
      <EnquirySection />
      <FinalCta />
    </>
  );
}
