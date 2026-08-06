import type { Metadata } from "next";
import { Phone, Mail, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [{ label: "Media", href: "/news" }, { label: "Press Releases" }];

export const metadata: Metadata = {
  title: { absolute: "Press Releases | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Official announcements, event updates and media information for the 5th Nepal Electric, Power and Lights International Expo 2026.",
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
      <PageHero
        title="Official Announcements"
        description="Event updates, press materials, and media information from the organizing team."
        breadcrumbs={breadcrumbs}
      />

      <Container as="section" className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl space-y-12">

          {/* Main Press Release Card */}
          <Card className="p-6 sm:p-10">
            <div className="border-b border-border pb-6">
              <span className="inline-block rounded-md bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal">
                FOR IMMEDIATE RELEASE
              </span>
              <p className="mt-2 text-sm font-medium text-muted">Kathmandu, Nepal</p>

              <h1 className="mt-4 text-xl font-bold leading-snug text-ink sm:text-2xl">
                5th Nepal Electric, Power and Lights International Expo to Be Held in Kathmandu from 4–6 September 2026
              </h1>
            </div>

            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-ink sm:text-base">
              <p>
                <strong>Kathmandu, Nepal —</strong> The 5th Nepal Electric, Power and Lights International Expo 2026
                will be held from 4–6 September 2026 at Bhrikuti Mandap Exhibition Hall, Kathmandu, Nepal. The three-day
                international trade exhibition will bring together manufacturers, exporters, suppliers, distributors,
                technology providers, EPC contractors, project developers, consultants, engineers, procurement professionals,
                utility representatives and other industry stakeholders from Nepal and international markets.
              </p>

              <p>
                The exhibition will provide a focused business platform for companies operating across the electrical, power,
                renewable-energy, lighting, automation and allied industries. Participating companies will be able to present new
                products, technologies and solutions, meet potential buyers and channel partners, explore distributorship opportunities
                and develop business relationships within Nepal's growing electrical and energy market.
              </p>

              <p>
                The 2026 edition will feature products and solutions related to power generation, transmission and distribution,
                transformers, switchgear, wires and cables, renewable energy, solar technology, batteries, inverters, UPS systems,
                energy storage, LED and professional lighting, electrical equipment, electronic components, industrial automation,
                smart metering, energy-management systems, EV charging infrastructure, home appliances, consumer electronics, testing
                equipment and related services.
              </p>

              <p>
                The expo is expected to attract business owners, company directors, purchase managers, procurement professionals,
                engineers, EPC contractors, project developers, utilities, importers, distributors, dealers, consultants, architects,
                government representatives, institutional buyers and professionals from the construction, infrastructure and industrial sectors.
              </p>

              <p>
                The forthcoming edition will build on the success of the 2025 exhibition, which welcomed more than 150 exhibitors, over 300 brands
                and solutions, participation from more than five countries and more than 15,000 trade visitors over three days of business networking.
              </p>

              <p>
                The Nepal Electric, Power and Lights International Expo is designed to support product sourcing, technical discussions,
                project enquiries, distributor development, strategic partnerships and regional market expansion. The event also provides
                manufacturers and technology companies with an opportunity to understand local demand, strengthen brand visibility and engage
                directly with Nepalese buyers and industry professionals.
              </p>

              <p>
                The exhibition will be open daily from <strong>10:00 AM to 6:00 PM on 4, 5 and 6 September 2026</strong>. Visitor entry is free
                with registration. Visitors below 18 years of age must be accompanied by a parent or legal guardian.
              </p>

              <p>
                The event is jointly organized by <strong>Futurex Trade Fair and Events Pvt. Ltd.</strong>, <strong>Exhibitions &amp; Trade Services India Pvt. Ltd.</strong>,
                and <strong>Media Space Solutions Pvt. Ltd.</strong> The organizing partners bring experience in international trade exhibitions,
                exhibitor coordination, visitor outreach, marketing, media engagement and event operations.
              </p>

              <p>
                Companies interested in participating as exhibitors may submit a stand enquiry through the official Book a Stand section of
                the website. Trade visitors may complete advance registration through the official Visitor Registration section. Advance registration
                is recommended for faster entry at the venue.
              </p>
            </div>
          </Card>

          {/* About the Expo Section */}
          <div className="rounded-xl border border-border bg-bg p-6 sm:p-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">About the Expo</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
              The Nepal Electric, Power and Lights International Expo is a B2B trade exhibition dedicated to the electrical, power,
              renewable-energy, lighting, automation and allied industries. It connects manufacturers, exporters, suppliers and technology
              providers with importers, distributors, EPC contractors, project developers, engineers, consultants, procurement
              professionals and institutional buyers.
            </p>
          </div>


          {/* Media Contact Section */}
          <div>
            <SectionHeading
              title="Media Enquiries"
              description="Media representatives may contact the organizing team for official event information, interview requests, press materials, exhibition updates, media registration and coverage-related enquiries."
            />

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {siteConfig.organizers.map((org) => (
                <Card key={org.key} className="flex h-full flex-col p-6">
                  <h3 className="text-base font-bold text-ink">{org.name}</h3>
                  <p className="mt-1 text-sm font-medium text-muted">{org.contactName}</p>
                  <div className="mt-4 flex flex-col gap-2.5 text-sm">
                    <a
                      href={`tel:${org.phoneHref}`}
                      className="flex items-center gap-2 text-sky-dark hover:text-teal"
                    >
                      <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{org.phone}</span>
                    </a>
                    <a
                      href={`mailto:${org.email}`}
                      className="flex items-center gap-2 break-all text-sky-dark hover:text-teal"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{org.email}</span>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </>
  );
}