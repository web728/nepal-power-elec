import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { mainNav, footerLegalLinks } from "@/lib/content/nav";

type Priority = 1.0 | 0.9 | 0.8 | 0.6 | 0.3;
type ChangeFreq = "yearly" | "monthly" | "weekly" | "daily";

// Conversion-focused high-priority pages
const TOP_PRIORITY_PATHS = new Set(["/register-to-visit", "/book-a-stand"]);
const HIGH_PRIORITY_PATHS = new Set(["/why-visit", "/why-exhibit"]);

const WEEKLY_PATHS = new Set(["/", "/news", "/press-releases"]);

// Legal paths extracted directly from footer array
const LEGAL_PATHS = new Set(
  footerLegalLinks
    .map((item) => item.href)
    .filter((href) => href.startsWith("/") && href !== "/sitemap")
);

// Fallback extra routes not explicitly defined in mainNav
const EXTRA_PATHS = [
  "/",
  "/register-to-visit",
  "/downloads/2026-event-brochure",
  "/downloads/2025-post-show-report",
  "/sitemap",
  ...footerLegalLinks.map((item) => item.href),
];

function isInternalPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function collectNavPaths(): string[] {
  const paths = new Set<string>();

  for (const item of mainNav) {
    if (item.href && isInternalPath(item.href)) {
      paths.add(item.href);
    }
    for (const child of item.children ?? []) {
      if (child.href && isInternalPath(child.href)) {
        paths.add(child.href);
      }
    }
  }

  return Array.from(paths);
}

function priorityFor(path: string): Priority {
  if (path === "/") return 1.0;
  if (TOP_PRIORITY_PATHS.has(path)) return 0.9;
  if (HIGH_PRIORITY_PATHS.has(path)) return 0.8;
  if (LEGAL_PATHS.has(path) || path === "/sitemap") return 0.3;
  return 0.6;
}

function changeFrequencyFor(path: string): ChangeFreq {
  if (path === "/register-to-visit") return "daily";
  if (LEGAL_PATHS.has(path)) return "yearly";
  if (WEEKLY_PATHS.has(path)) return "weekly";
  return "monthly";
}

const STATIC_LAST_MOD = new Date("2026-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl.replace(/\/+$/, "");

  const allPaths = Array.from(
    new Set([...collectNavPaths(), ...EXTRA_PATHS].filter(isInternalPath))
  );

  return allPaths.map((path) => {
    // Form clean standard URLs without trailing slashes
    const url = path === "/" ? baseUrl : `${baseUrl}${path}`;

    const isStatic = LEGAL_PATHS.has(path) || path === "/sitemap";
    const lastModified = isStatic ? STATIC_LAST_MOD : new Date();

    return {
      url,
      lastModified,
      changeFrequency: changeFrequencyFor(path),
      priority: priorityFor(path),
    };
  });
}