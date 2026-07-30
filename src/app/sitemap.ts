import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { mainNav } from "@/lib/content/nav";

type Priority = 1.0 | 0.8 | 0.6 | 0.3;
type ChangeFreq = "yearly" | "monthly" | "weekly";

const HIGH_PRIORITY_PATHS = new Set(["/book-a-stand", "/register-to-visit"]);
const WEEKLY_PATHS = new Set(["/", "/news", "/press-releases"]);
const LEGAL_PATHS = new Set([
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/accessibility",
  "/disclaimer",
]);

const EXTRA_PATHS = [
  "/",
  "/downloads/2026-event-brochure",
  "/downloads/2025-post-show-report",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/accessibility",
  "/disclaimer",
  "/sitemap",
];

function collectNavPaths(): string[] {
  const paths = new Set<string>();
  for (const item of mainNav) {
    if (item.href) paths.add(item.href);
    for (const child of item.children ?? []) {
      if (child.href) paths.add(child.href);
    }
  }
  return Array.from(paths);
}

function priorityFor(path: string): Priority {
  if (path === "/") return 1.0;
  if (HIGH_PRIORITY_PATHS.has(path)) return 0.8;
  if (LEGAL_PATHS.has(path) || path === "/sitemap") return 0.3;
  return 0.6;
}

function changeFrequencyFor(path: string): ChangeFreq {
  if (LEGAL_PATHS.has(path)) return "yearly";
  if (WEEKLY_PATHS.has(path)) return "weekly";
  return "monthly";
}

// Fixed static date for static/legal content to avoid constant false freshness
const STATIC_LAST_MOD = new Date("2026-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, ""); // Strip trailing slash from base config
  const allPaths = Array.from(new Set([...collectNavPaths(), ...EXTRA_PATHS]));

  return allPaths.map((path) => {
    // Form clean URL path
    const url = path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
    
    // Legal & static pages get a fixed date, high priority/frequent pages get current date
    const lastModified = LEGAL_PATHS.has(path) || path === "/sitemap" 
      ? STATIC_LAST_MOD 
      : new Date();

    return {
      url,
      lastModified,
      changeFrequency: changeFrequencyFor(path),
      priority: priorityFor(path),
    };
  });
}