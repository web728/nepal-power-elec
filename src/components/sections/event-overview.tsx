import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function EventOverview() {
  return (
    <section className="bg-bg py-16 sm:py-22">
      <Container>
        <SectionHeading
          eyebrow="About the Expo"
          title="A Focused Trade Platform for Nepal"
          description="The Nepal Electric, Power and Lights International Expo brings together companies and professionals involved in electrical equipment, power and energy, transmission and distribution, wires and cables, renewable energy, lighting, automation, appliances and related technologies. The exhibition is designed for product presentation, supplier discovery, sourcing discussions, distributor development and professional networking."
          align="center"
          className="mx-auto max-w-3xl"
        />
      </Container>
    </section>
  );
}
