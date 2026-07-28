import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { mainNav } from "@/lib/content/nav";

// Next.js App Router metadata file — generates /sitemap.xml at build/request
// time. This is distinct from the human-readable HTML sitemap page at
// src/app/sitemap/page.tsx (linked in the footer), which this file also
// lists as an entry (its own XML record) but does not otherwise touch.
//
// Route set = every href reachable from mainNav (top-level items and their
// dropdown children) + a short list of known routes that live outside the
// nav (home, downloads sub-pages, legal pages, the HTML sitemap page).
// Deliberately excluded: /search, /404, /admin*, /dashboard, /login — none
// of these should be indexed or listed in the XML sitemap.

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
    paths.add(item.href);
    for (const child of item.children ?? []) {
      paths.add(child.href);
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

export default function sitemap(): MetadataRoute.Sitemap {
  const allPaths = Array.from(new Set([...collectNavPaths(), ...EXTRA_PATHS]));

  return allPaths.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFrequencyFor(path),
    priority: priorityFor(path),
  }));
}
