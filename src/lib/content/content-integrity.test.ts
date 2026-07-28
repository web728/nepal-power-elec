import { describe, it, expect } from "vitest";
import { sectors } from "./sectors";
import {
  eventScale,
  visitorRoles,
  visitorIndustries,
  businessIntent,
  companySize,
} from "./stats";
import { siteConfig } from "@/lib/site-config";
import { mainNav } from "./nav";

function sumValues(items: { value: number }[]) {
  return items.reduce((sum, item) => sum + item.value, 0);
}

describe("site-config facts", () => {
  it("uses the verified 2026 event dates", () => {
    expect(siteConfig.dates.start).toBe("2026-09-04");
    expect(siteConfig.dates.end).toBe("2026-09-06");
    expect(siteConfig.dates.display).toBe("4-6 September 2026");
  });

  it("uses the verified venue", () => {
    expect(siteConfig.venue.full).toBe("Bhrikuti Mandap Exhibition Hall, Kathmandu, Nepal");
  });

  it("lists exactly the three joint organizers with equal-shape data", () => {
    expect(siteConfig.organizers).toHaveLength(3);
    for (const org of siteConfig.organizers) {
      expect(org.name).toBeTruthy();
      expect(org.contactName).toBeTruthy();
      expect(org.phone).toBeTruthy();
      expect(org.email).toBeTruthy();
    }
  });

  it("carries an organizer-reported qualifier for previous-edition stats", () => {
    expect(siteConfig.previousEdition.qualifier.toLowerCase()).toContain("organizer-reported");
  });
});

describe("sectors taxonomy", () => {
  it("has exactly the 6 brochure-verified sectors", () => {
    expect(sectors).toHaveLength(6);
    const names = sectors.map((s) => s.name);
    expect(names).toEqual([
      "Power and Energy",
      "Transmission and Distribution Equipment",
      "Electricals and Electronics",
      "Lighting",
      "Home Appliances",
      "Electro Energetics",
    ]);
  });

  it("gives every sector a unique slug and at least one item", () => {
    const slugs = sectors.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const sector of sectors) {
      expect(sector.items.length).toBeGreaterThan(0);
    }
  });
});

describe("2025 post-show statistics integrity", () => {
  it("has exactly 3 event-scale figures", () => {
    expect(eventScale).toHaveLength(3);
  });

  it("visitorRoles percentages sum to 100", () => {
    expect(sumValues(visitorRoles)).toBe(100);
  });

  it("visitorIndustries percentages sum to 100", () => {
    expect(sumValues(visitorIndustries)).toBe(100);
  });

  it("businessIntent percentages sum to 100", () => {
    expect(sumValues(businessIntent)).toBe(100);
  });

  it("companySize percentages sum to 100", () => {
    expect(sumValues(companySize)).toBe(100);
  });
});

describe("main navigation", () => {
  it("does not include an Exhibitors directory link (no verified 2026 exhibitor data)", () => {
    const allLabels = mainNav.flatMap((item) => [item.label, ...(item.children?.map((c) => c.label) ?? [])]);
    expect(allLabels).not.toContain("Exhibitors");
  });

  it("every top-level item has a non-empty href", () => {
    for (const item of mainNav) {
      expect(item.href.startsWith("/")).toBe(true);
      for (const child of item.children ?? []) {
        expect(child.href.startsWith("/")).toBe(true);
      }
    }
  });
});
