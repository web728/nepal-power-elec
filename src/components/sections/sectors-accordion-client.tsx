"use client";

import {
  InteractiveImageAccordion,
  type AccordionSector,
} from "@/components/ui/interactive-image-accordion";

const accordionItems: AccordionSector[] = [
  {
    id: "power-energy",
    title: "Power & Energy",
    imageSrc: "/images/gallery/2025/img-1.png",
    alt: "Power and energy equipment displays at the Nepal Electric, Power and Lights Expo exhibition floor",
  },
  {
    id: "transmission-distribution",
    title: "Transmission & Distribution",
    imageSrc: "/images/gallery/2025/img-2.png",
    alt: "Transmission and distribution equipment stands and visitor engagement at the expo",
  },
  {
    id: "wires-cables",
    title: "Wires, Cables & Electricals",
    imageSrc: "/images/gallery/2025/img-3.png",
    alt: "Wires, cables and electrical components on display at exhibitor stands",
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    imageSrc: "/images/gallery/2025/img-4.png",
    alt: "Renewable energy solutions and solar equipment exhibits at the expo",
  },
  {
    id: "led-lighting-smart",
    title: "LED, Lighting & Smart Technology",
    imageSrc: "/images/gallery/2025/img-5.png",
    alt: "LED lighting and smart technology product demonstrations at the expo",
  },
];

export function SectorsAccordionClient() {
  return <InteractiveImageAccordion items={accordionItems} />;
}
