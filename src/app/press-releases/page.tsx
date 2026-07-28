import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [{ label: "Media", href: "/news" }, { label: "Press Releases" }];

export const metadata: Metadata = {
  title: { absolute: "Press Releases | Nepal Electric, Power and Lights Expo" },
  description:
    "Read official press releases and organizer announcements for the Nepal Electric, Power and Lights International Expo.",
  alternates: { canonical: "/press-releases" },
};

export default function PressReleasesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Media", href: "/news" },
          { label: "Press Releases", href: "/press-releases" },
        ]}
      />
      <PageHero title="Official Announcements from the Organizers" breadcrumbs={breadcrumbs} />
      <Container as="section" className="py-12 sm:py-16">
        <Card className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-dark">
            For Immediate Release
          </p>
          <p className="mt-1 text-sm font-medium text-muted">Kathmandu, Nepal</p>

          <div className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-ink">
            <p>
              The 5th Nepal Electric, Power and Lights International Expo will take place from
              4-6 September 2026 at Bhrikuti Mandap Exhibition Hall, Kathmandu. The three-day
              trade exhibition will bring together manufacturers, suppliers, technology
              providers, buyers, distributors, engineers, contractors, project developers and
              other industry professionals across electrical, power, renewable-energy, lighting
              and allied sectors.
            </p>
            <p>
              The event will cover power and energy, transmission and distribution, wires and
              cables, renewable energy, batteries and storage, LED and lighting, electricals and
              electronics, automation, appliances, consumer electronics and related services.
            </p>
            <p>
              The fifth edition follows the 2025 event, for which the organizer-issued post-show
              report recorded 150+ exhibitors, participation from 5+ countries and 15,000+
              visitors. These figures are organizer-reported.
            </p>
            <p>
              The event is jointly organized by Futurex Trade Fair and Events Pvt. Ltd.,
              Exhibitions &amp; Trade Services India Pvt. Ltd. and Media Space Solutions Pvt. Ltd.
            </p>
          </div>
        </Card>

        <div className="mt-10 max-w-3xl rounded-xl border border-border bg-bg px-5 py-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted">About the Expo</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            The Nepal Electric, Power and Lights International Expo is a trade exhibition
            connecting manufacturers, suppliers, buyers, distributors, engineers, project
            developers and industry professionals across electrical, power, renewable-energy,
            lighting, automation and allied sectors.
          </p>
        </div>

        <div className="mt-12">
          <SectionHeading title="Media Contact" />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {siteConfig.organizers.map((org) => (
              <Card key={org.key} className="flex h-full flex-col">
                <h3 className="text-lg font-semibold text-ink">{org.name}</h3>
                <p className="mt-2 text-sm text-muted">{org.contactName}</p>
                <div className="mt-4 flex flex-col gap-2 text-sm">
                  <a
                    href={`tel:${org.phoneHref}`}
                    className="flex items-center gap-2 text-teal hover:text-teal-dark"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {org.phone}
                  </a>
                  <a
                    href={`mailto:${org.email}`}
                    className="flex items-center gap-2 break-all text-teal hover:text-teal-dark"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {org.email}
                  </a>
                </div>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            All three organizations are joint organizing partners and are presented with equal
            prominence.
          </p>
        </div>
      </Container>
    </>
  );
}
