import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function EventOverview() {
  return (
    <section className="relative overflow-hidden bg-bg py-16 sm:py-22">
      {/* Left Side Graphic (Windmill / Phool) */}
      <div className="absolute left-2 bottom-0 hidden xl:block w-96  opacity-100 pointer-events-none">
        <Image
          src="/brandings/phool.png"
          alt="Windmill Graphic"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>


      <Container className="relative z-10">
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