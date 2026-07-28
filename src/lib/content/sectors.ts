// The six Exhibitor Profile sector categories, transcribed verbatim from the
// official 2026 brochure ("Exhibitors Profile" / "Focusing Sectors" pages).
// This is the canonical taxonomy used site-wide (Home, Exhibitor Profile,
// Exhibitor Categories) — see FILE_INVENTORY.md conflict #3 for why this
// list is used instead of the Content Master PDF's alternate 8-category
// grouping, which drops the brochure's "Electro Energetics" sector.

export type Sector = {
  slug: string;
  name: string;
  items: string[];
};

export const sectors: Sector[] = [
  {
    slug: "power-and-energy",
    name: "Power and Energy",
    items: [
      "Geothermal, thermal power and decentralized generation",
      "New and renewable energy plants",
      "Generators and diesel generating sets",
      "Wind and solar power equipment",
      "Electric drives",
      "Batteries, inverters and UPS systems",
    ],
  },
  {
    slug: "transmission-distribution-equipment",
    name: "Transmission and Distribution Equipment",
    items: [
      "Transmission lines, towers and accessories",
      "Substation equipment",
      "Power and distribution transformers",
      "Switchgear and control gear",
      "Measuring instruments and meters",
      "Cables, conductors and cabling and wiring products",
      "Capacitors, insulators and insulation materials",
      "Equipment for alternate sources of energy",
    ],
  },
  {
    slug: "electricals-electronics",
    name: "Electricals and Electronics",
    items: [
      "Electronic components and modules",
      "Production facilities and components for the electrical industry",
      "Lasers, photonics and fine mechanics",
      "Electro-mobility",
    ],
  },
  {
    slug: "lighting",
    name: "Lighting",
    items: [
      "Lighting fixtures and accessories",
      "Lamps and LEDs, bulbs and tubes",
      "Lighting systems and solutions",
    ],
  },
  {
    slug: "home-appliances",
    name: "Home Appliances",
    items: [
      "Household electrical appliances and products",
      "Safety systems and devices",
      "Regulating and control equipment",
      "Automation systems and rotating machines",
      "Energy-saving equipment",
    ],
  },
  {
    slug: "electro-energetics",
    name: "Electro Energetics",
    items: [
      "Power generation, transfer and distribution conductors and cables",
      "Electric installation, building management and security systems",
      "Lighting devices and systems",
      "Electro-thermal technology, tools and equipment",
      "Software development, IT and automation",
    ],
  },
];
