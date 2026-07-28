import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { mainNav, footerLegalLinks } from "@/lib/content/nav";

export const metadata: Metadata = {
  title: { absolute: "Sitemap | Nepal Electric, Power and Lights Expo" },
  description: "Browse all public pages of the Nepal Electric, Power and Lights International Expo website.",
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Sitemap", href: "/sitemap" }]} />
      <PageHero title="Website Sitemap" breadcrumbs={[{ label: "Sitemap" }]} />
      <Container as="section" className="py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mainNav.map((item) => (
            <div key={item.label}>
              <h2 className="text-lg font-semibold text-ink">
                <Link href={item.href} className="hover:text-sky-dark hover:underline">
                  {item.label}
                </Link>
              </h2>
              {item.children && item.children.length > 0 && (
                <ul className="mt-3 space-y-2 border-l border-border pl-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="text-sm text-muted hover:text-sky-dark hover:underline">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-semibold text-ink">Legal</h2>
          <ul className="mt-3 grid gap-2 border-l border-border pl-4 sm:grid-cols-2 lg:grid-cols-3">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted hover:text-sky-dark hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
