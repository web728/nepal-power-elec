import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { SectorsAccordionClient } from "@/components/sections/sectors-accordion-client";

export function SectorsAccordion() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Expo Sectors"
          title="Explore the Industries Powering the Expo"
          description="Discover products and technologies across electrical equipment, power infrastructure, renewable energy, lighting, transmission, distribution and allied sectors."
          align="center"
          className="mx-auto"
        />
        <div className="mt-10">
          <SectorsAccordionClient />
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/exhibitor-categories" variant="primary" size="md">
            View Exhibitor Categories
          </Button>
        </div>
      </Container>
    </section>
  );
}
