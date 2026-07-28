import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SRC_DIR = path.resolve(__dirname, "..");

function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(SRC_DIR, relativePath), "utf-8");
}

function readFileFromRoot(relativePath: string): string {
  return fs.readFileSync(path.resolve(SRC_DIR, "..", relativePath), "utf-8");
}

describe("Interactive Image Accordion", () => {
  const accordionClient = readFile("components/sections/sectors-accordion-client.tsx");
  const accordionComponent = readFile("components/ui/interactive-image-accordion.tsx");

  it("has exactly 5 sector items", () => {
    const matches = accordionClient.match(/id:\s*"/g);
    expect(matches).toHaveLength(5);
  });

  it("contains the correct sector titles", () => {
    expect(accordionClient).toContain("Power & Energy");
    expect(accordionClient).toContain("Transmission & Distribution");
    expect(accordionClient).toContain("Wires, Cables & Electricals");
    expect(accordionClient).toContain("Renewable Energy");
    expect(accordionClient).toContain("LED, Lighting & Smart Technology");
  });

  it("does not contain AI-related sample content", () => {
    const combined = accordionClient + accordionComponent;
    expect(combined).not.toContain("Voice Assistant");
    expect(combined).not.toContain("AI Image Generation");
    expect(combined).not.toContain("AI Chatbot");
    expect(combined).not.toContain("Local RAG");
    expect(combined).not.toContain("AI Agent");
    expect(combined).not.toContain("Visual Understanding");
    expect(combined).not.toContain("Accelerate Gen-AI");
    expect(combined).not.toContain("model compression");
    expect(combined).not.toContain("edge deployment");
  });

  it("uses aria-expanded for accessibility", () => {
    expect(accordionComponent).toContain("aria-expanded");
  });

  it("supports keyboard interaction via button elements", () => {
    expect(accordionComponent).toContain('type="button"');
  });

  it("does not reference Unsplash", () => {
    expect(accordionClient).not.toContain("unsplash");
    expect(accordionComponent).not.toContain("unsplash");
  });
});


describe("Homepage layout", () => {
  const homepage = readFile("app/page.tsx");

  it("contains SectorsAccordion exactly once", () => {
    const matches = homepage.match(/<SectorsAccordion/g);
    expect(matches).toHaveLength(1);
  });

  it("does not contain LampCta (removed per feedback)", () => {
    expect(homepage).not.toContain("<LampCta");
  });

  it("places accordion after EventOverview and before BenefitSection", () => {
    const overviewPos = homepage.indexOf("<EventOverview");
    const accordionPos = homepage.indexOf("<SectorsAccordion");
    const benefitPos = homepage.indexOf("<BenefitSection");
    expect(accordionPos).toBeGreaterThan(overviewPos);
    expect(benefitPos).toBeGreaterThan(accordionPos);
  });

  it("places GallerySection after StatsSection", () => {
    const statsPos = homepage.indexOf("<StatsSection");
    const galleryPos = homepage.indexOf("<GallerySection");
    expect(galleryPos).toBeGreaterThan(statsPos);
  });

  it("does not contain unsupported sections", () => {
    expect(homepage).not.toContain("Testimonial");
    expect(homepage).not.toContain("Sponsor");
    expect(homepage).not.toContain("Countdown");
    expect(homepage).not.toContain("Partner");
  });
});

describe("No Unsplash references in the project", () => {
  it("checks homepage sections for Unsplash URLs", () => {
    const files = [
      "components/sections/hero.tsx",
      "components/sections/gallery-section.tsx",
      "components/sections/sectors-accordion-client.tsx",
    ];
    for (const file of files) {
      const content = readFile(file);
      expect(content.toLowerCase()).not.toContain("unsplash");
    }
  });
});

describe("Package dependencies", () => {
  const pkg = JSON.parse(readFileFromRoot("package.json"));

  it("does not include motion (unused — all animations use CSS transitions)", () => {
    expect(pkg.dependencies?.motion).toBeUndefined();
    expect(pkg.devDependencies?.motion).toBeUndefined();
  });

  it("does not include GSAP", () => {
    expect(pkg.dependencies.gsap).toBeUndefined();
    expect(pkg.devDependencies?.gsap).toBeUndefined();
  });

  it("does not include Three.js", () => {
    expect(pkg.dependencies.three).toBeUndefined();
    expect(pkg.devDependencies?.three).toBeUndefined();
  });

  it("does not include Lenis", () => {
    expect(pkg.dependencies.lenis).toBeUndefined();
    expect(pkg.dependencies["@studio-freight/lenis"]).toBeUndefined();
  });

  it("does not include Supabase (replaced by MongoDB)", () => {
    expect(pkg.dependencies?.["@supabase/supabase-js"]).toBeUndefined();
    expect(pkg.dependencies?.["@supabase/ssr"]).toBeUndefined();
  });

  it("does not include Resend (replaced by Nodemailer)", () => {
    expect(pkg.dependencies?.resend).toBeUndefined();
  });

  it("includes MongoDB driver", () => {
    expect(pkg.dependencies.mongoose).toBeDefined();
  });

  it("includes Nodemailer", () => {
    expect(pkg.dependencies.nodemailer).toBeDefined();
  });

  it("includes Google APIs for Sheets integration", () => {
    expect(pkg.dependencies.googleapis).toBeDefined();
  });
});
