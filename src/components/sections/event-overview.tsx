import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function EventOverview() {
  return (
    <section className="relative overflow-hidden bg-bg py-16 sm:py-22">
      {/* Top Left Graphic */}
      <div className="absolute left-0 top-0 pointer-events-none z-10 opacity-100">
        <Image
          src="/brandings/wow.png"
          alt="Windmill Graphic Left"
          width={900}
          height={900}
          className="
            h-auto object-contain rotate-180
            /* Mobile Sizing & Positioning */
            w-[280px] -translate-x-[5%] -translate-y-[15%]
            /* Tablet Sizing */
            sm:w-[450px] sm:-translate-x-[5%] sm:-translate-y-[15%]
            /* Laptop / Desktop Sizing */
            lg:w-[700px] lg:-translate-x-[5%] lg:-translate-y-[10%]
            xl:w-[850px] xl:-translate-x-[5%]
          "
        />
      </div>

  <div className="absolute right-0 top-0 pointer-events-none z-10 opacity-100 h-full">
  <Image
    src="/brandings/wow.png"
    alt="Windmill Graphic Right"
    width={900}
    height={900}
    className="
     
      h-full w-auto max-w-none object-cover
      translate-x-[5%]

      /* Tablet & Desktop: Wapas standard corner graphics ban jayega */
      sm:h-auto sm:w-[450px] sm:object-contain sm:translate-x-[5%] sm:translate-y-[15%]
      lg:w-[700px] lg:translate-x-[5%] lg:-translate-y-[10%]
      xl:w-[850px] xl:translate-x-[5%]
    "
  />
</div>

      {/* Container - Text content above background graphics */}
      <Container className="relative z-20">
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