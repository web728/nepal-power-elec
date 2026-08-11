import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";

interface OrganizersSectionProps {
  showSupportedBy?: boolean;
}

// Supported By Partners Interface
interface SupportedLogo {
  id: number;
  name: string;
  src: string;
  url?: string;
}

// Supported By Partners with Exact Image Paths and Official Links (5 Active Logos)
const supportedByLogos: SupportedLogo[] = [
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

        {/* Flex Wrap Center - Ensures 5 logos stay nicely centered on all screens */}
<div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
  {supportedByLogos.map((logo, index) => {
    const CardWrapper = logo.url ? "a" : "div";
    const wrapperProps = logo.url
      ? {
          href: logo.url,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Visit ${logo.name}`,
        }
      : {};

    const isFirstTwo = index < 2;

    return (
      <CardWrapper
        key={logo.id}
        {...wrapperProps}
        className="group flex h-28 w-full max-w-[176px] shrink-0 items-center justify-center rounded-xl border border-border bg-white p-2 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal hover:shadow-md"
      >
        <div className="relative h-full w-full flex items-center justify-center">
          <Image
            src={logo.src}
            alt={logo.name}
            fill
            className={`object-contain transition-transform duration-200 group-hover:scale-105 ${
              isFirstTwo ? "scale-125 p-1.5" : "scale-100 p-1.5"
            }`}
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 33vw, 176px"
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
  {siteConfig.organizers.map((org, index) => {
    const hasLogo = org.logo && org.logo.trim().length > 0;

    // Direct size adjustments based on index if needed:
    // Pehli 2 images ko thoda bada padding dene aur 3rd ko clean max-height dene ke liye
    const isLastItem = index === siteConfig.organizers.length - 1;

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
        className={`object-contain transition-transform duration-200 group-hover:scale-105 ${
          // Last image ki size choti karne ke liye: zyada padding (p-4) aur chotay scaling (scale-90)
          // Start ke images ke liye: 0 padding aur scale-110 (size bada)
          isLastItem ? "p-4 scale-90" : "p-0.5 scale-110"
        }`}
        sizes="(min-width: 680px) 250px, 100vw"
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