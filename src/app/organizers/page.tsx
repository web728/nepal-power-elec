import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [{ label: "Organizers" }];

export const metadata: Metadata = {
  title: { absolute: "Organizers | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Meet the three joint organizing partners of the Nepal Electric, Power and Lights International Expo 2026.",
  alternates: { canonical: "/organizers" },
};

export default function OrganizersPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Organizers", href: "/organizers" }]} />
      <PageHero title="Jointly Organized by Three Event Companies" breadcrumbs={breadcrumbs}
        bgImage="/images/hero/0L1A2244-min-scaled.jpg" 
        bgOpacity="opacity-50"  />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          The 5th Nepal Electric, Power and Lights International Expo 2026 is jointly organized
          by Futurex Trade Fair and Events Pvt. Ltd., Exhibitions &amp; Trade Services India Pvt.
          Ltd. and Media Space Solutions Pvt. Ltd.
        </p>

        <div className="mt-12">
          <SectionHeading title="Shared Event Responsibilities" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            The organizing partnership supports exhibitor participation, visitor communication,
            event promotion, media coordination and operational delivery. Any of the three
            listed representatives may be contacted for event-related assistance.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-border">
          <Image
            src={siteConfig.organizersLockupImage}
            alt="Organizing partners of the Nepal Electric, Power and Lights Expo 2026"
            width={5000}
            height={575}
            className="h-auto w-full"
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {siteConfig.organizers.map((org) => (
            <div
              key={org.key}
              className="flex flex-col rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-teal">
                {org.name}
              </p>
              <p className="mt-3 text-sm font-semibold text-ink">{org.contactName}</p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a
                  href={`tel:${org.phoneHref}`}
                  className="flex items-center gap-2 text-sky-dark hover:text-teal"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Call / WhatsApp: {org.phone}</span>
                </a>
                <a
                  href={`mailto:${org.email}`}
                  className="flex items-center gap-2 break-all text-sky-dark hover:text-teal"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{org.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted">
          All three organizations are joint organizing partners and are presented with equal
          prominence.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={siteConfig.registration.exhibitor} target="_blank" rel="noopener noreferrer" variant="cta-exhibitor">
            Book a Stand
          </Button>
          <Button href={siteConfig.registration.visitor} target="_blank" rel="noopener noreferrer" variant="cta-visitor">
            Register to Visit
          </Button>
          <Button href="/contact" variant="ghost">
            Send an Enquiry
          </Button>
        </div>
      </Container>
    </>
  );
}
