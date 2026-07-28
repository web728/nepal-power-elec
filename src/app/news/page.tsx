import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const breadcrumbs = [{ label: "Media", href: "/news" }, { label: "News" }];

const headlines: { title: string; href?: string }[] = [
  { title: "Dates Announced for the 5th Edition" },
  { title: "Exhibitor Enquiries Open for 2026", href: "/book-a-stand" },
  { title: "Visitor Registration for the 2026 Expo", href: "/register-to-visit" },
  { title: "Official 2026 Event Brochure Available", href: "/downloads/2026-event-brochure" },
  { title: "Looking Back at the 4th Edition in 2025", href: "/past-editions/2025-edition" },
  { title: "2025 Post-Show Report Available Online", href: "/downloads/2025-post-show-report" },
];

export const metadata: Metadata = {
  title: { absolute: "News | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Read official updates about dates, registration, documents and previous-edition highlights for the 2026 expo.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Media", href: "/news" },
          { label: "News", href: "/news" },
        ]}
      />
      <PageHero title="Latest Official Expo Updates" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          Read verified announcements about the 5th Nepal Electric, Power and Lights
          International Expo 2026, including event information, registration, documents and
          previous-edition highlights.
        </p>

        <Card className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold text-ink">
            5th Nepal Electric, Power and Lights International Expo Scheduled for September 2026
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The fifth edition will take place from 4-6 September 2026 at Bhrikuti Mandap
            Exhibition Hall in Kathmandu. The three-day trade exhibition will connect companies
            and professionals across electrical equipment, power, transmission and distribution,
            renewable energy, wires and cables, lighting, automation, appliances and allied
            sectors.
          </p>
        </Card>

        <div className="mt-12">
          <SectionHeading title="More Headlines" />
          <ul className="mt-6 flex flex-col divide-y divide-border rounded-xl border border-border bg-white">
            {headlines.map((item) => (
              <li key={item.title} className="px-5 py-4 text-sm">
                {item.href ? (
                  <Link href={item.href} className="font-medium text-teal hover:text-teal-dark hover:underline">
                    {item.title}
                  </Link>
                ) : (
                  <span className="font-medium text-ink">{item.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
