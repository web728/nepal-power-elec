import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";

interface OrganizersSectionProps {
  showSupportedBy?: boolean;
}

// Supported By Partners with Exact Image Paths and Official Links
const supportedByLogos = [
  {
    id: 1,
    name: "Nepal Chamber of Commerce",
    src: "/logo/nepal-chamber.png",
    url: "https://ncc.org.np/",
  },
  {
    id: 2,
    name: "Nepal Electricity Authority",
    src: "/logo/nepal-logo.png",
    url: "https://www.neanepal.org.np/",
  },
  {
    id: 3,
    name: "SCAEF Nepal",
    src: "/logo/scaff.png",
    url: "https://scaef.org.np/",
  },
  {
    id: 4,
    name: "IPPAN",
    src: "/logo/IPPAN-New-Logo.png",
    url: "https://www.ippan.org.np/",
  }, 
  {
    id: 5,
    name: "SEEN",
    src: "/logo/60.png",
  },
  {
    id: 6,
    name: "SOPPAN",
    src: "/logo/70.png",
    url: "https://soppan.org.np/",
  },
];

export function OrganizersSection({ showSupportedBy = true }: OrganizersSectionProps) {
  return (
    <section className="bg-bg py-16 sm:py-22">
      <Container>
        {/* ================= SUPPORTED BY SECTION ================= */}
        {showSupportedBy && (
          <div className="mb-16">
            <SectionHeading
              eyebrow="Patrons"
              title="Supported By"
              align="center"
              className="mx-auto"
            />

            {/* 6 Logos Alignment: 2 Columns (Mobile), 3 Columns (Tablet), 6 Columns (Desktop) */}
            <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 items-center justify-center gap-4 sm:grid-cols-3 lg:grid-cols-6 sm:gap-6">
              {supportedByLogos.map((logo) => {
                const CardWrapper = logo.url ? "a" : "div";
                const wrapperProps = logo.url
                  ? {
                      href: logo.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      title: `Visit ${logo.name}`,
                    }
                  : {};

                return (
                  <CardWrapper
                    key={logo.id}
                    {...wrapperProps}
                    className="group flex h-28 w-full items-center justify-center rounded-xl border border-border bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal hover:shadow-md"
                  >
                    <div className="relative flex h-full w-full items-center justify-center">
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        fill
                        className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
                        sizes="(min-width: 1024px) 160px, (min-width: 640px) 200px, 50vw"
                      />
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= ORGANIZERS SECTION ================= */}
        <SectionHeading
          eyebrow="Organizers"
          title="Meet the Organizers"
          description="Jointly organized by Futurex Trade Fair and Events Pvt. Ltd., Exhibitions & Trade Services India Pvt. Ltd., and Media Space Solutions Pvt. Ltd."
          align="center"
          className="mx-auto"
        />

        {/* --- Individual Organizer Logos Grid --- */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {siteConfig.organizers.map((org) => {
            const hasLogo = org.logo && org.logo.trim().length > 0;

            return (
              <a
                key={org.key}
                href={org.url || "#"}
                target={org.url ? "_blank" : "_self"}
                rel={org.url ? "noopener noreferrer" : undefined}
                title={`Visit ${org.name}`}
                className="group flex flex-col items-center justify-center rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal hover:shadow-md"
              >
                <div className="relative flex h-20 w-full items-center justify-center">
                  {hasLogo ? (
                    <Image
                      src={org.logo!}
                      alt={org.name}
                      fill
                      className="object-contain transition-transform duration-200 group-hover:scale-105"
                      sizes="(min-width: 640px) 250px, 100vw"
                    />
                  ) : (
                    <span className="text-center font-bold text-ink">
                      {org.name}
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {/* ================= CONTACT CARDS ================= */}
        <div className="mx-auto mt-12 max-w-4xl">
          <h3 className="text-center text-lg font-semibold text-ink sm:text-xl">
            For More Details, Please Contact
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
        </div>
      </Container>
    </section>
  );
}