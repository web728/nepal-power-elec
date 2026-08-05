import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      <PageHero 
        title="Meet the Organizers" 
        breadcrumbs={breadcrumbs}
        bgImage="/uploads/organi.jpg" 
        bgOpacity="opacity-50"  
      />
      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          The Nepal Electric, Power and Lights International Expo is jointly organized 
          by Futurex Trade Fair and Events Pvt. Ltd., Exhibitions &amp; Trade Services India Pvt. 
          Ltd., and Media Space Solutions Pvt. Ltd.
        </p>

        <div className="mt-12">
          <SectionHeading title="Our Organizing Partners" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Together, the organizing partners bring expertise in international trade exhibitions, 
            exhibitor coordination, visitor outreach, marketing and event operations. 
            For exhibitor participation, sponsorship opportunities, visitor inquiries or general 
            event information, please contact the relevant representative listed below.
          </p>
        </div>

        {/* Separate Clickable Logos Container styled like the provided image layout */}
    <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
  {/* CSS Grid layout dynamic alignment ke liye */}
  <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-0">
    {siteConfig.organizers.map((org, index) => (
      <div 
        key={org.key} 
        className="relative flex w-full items-center justify-center"
      >
        <Link
          href={org.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex h-24 w-full max-w-[220px] items-center justify-center transition-transform duration-200 hover:scale-105 sm:h-28"
        >
          <Image
            src={org.logo}
            alt={`${org.name} Logo`}
            fill
            className="object-contain"
            sizes="(min-width: 768px) 400px, 100vw"
            priority
          />
        </Link>

        {/* Vertical Divider - Absolute Positioned between Grid Columns */}
        {index < siteConfig.organizers.length - 1 && (
          <div className="hidden h-24 w-[1px] bg-gray-300 md:absolute md:right-0 md:block" />
        )}
      </div>
    ))}
  </div>
</div>

        {/* Organizer Contact Cards */}
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