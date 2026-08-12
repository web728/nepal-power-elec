"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OrganizersSectionProps {
  showSupportedBy?: boolean;
}

interface SupportedLogo {
  id: number;
  name: string;
  src: string;
  url?: string;
  scale?: number;
  maxHeight?: string;
}

// ========================================================
// 1. SUPPORTED BY LOGOS (PATRONS) INDIVIDUAL SCALES
// ========================================================
const supportedByLogos: SupportedLogo[] = [
  {
    id: 1,
    name: "Nepal Chamber of Commerce",
    src: "/logo/nepal-chamber.png",
    url: "https://ncc.org.np/",
    scale: 1.1,
  },
  {
    id: 2,
    name: "Nepal Electricity Authority",
    src: "/logo/nepal-logo.png",
    url: "https://www.neanepal.org.np/",
    scale: 1,
  },
  {
    id: 3,
    name: "SCAEF Nepal",
    src: "/logo/scaff.png",
    url: "https://scaef.org.np/",
    scale: 0.9,
  },
  {
    id: 4,
    name: "IPPAN",
    src: "/logo/IPPAN-New-Logo.png",
    url: "https://www.ippan.org.np/",
    scale: 0.7,
  },
  {
    id: 5,
    name: "SEEN",
    src: "/logo/60.png",
    scale: 1,
  },
];

// ========================================================
// 2. ORGANIZERS LOGOS INDIVIDUAL SCALES (HAR LOGO KI SIZE ALAG)
// Yahan se aap teeno organizers ke logo ki size alag-alag control kar sakte ho:
// 1 = Normal Size | 1.2, 1.3 = Bada Logo | 0.8, 0.9 = Chhota Logo
// ========================================================
const organizerScales: Record<string, number> = {
  futurex: 1.2,    // Futurex Trade Fair logo size
  etss: 1.0,       // Exhibitions & Trade Services logo size
  mediaspace: 0.9, // Media Space Solutions logo size
};

export function OrganizersSection({ showSupportedBy = true }: OrganizersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (showSupportedBy) {
        gsap.fromTo(
          ".anim-patrons-head",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          ".anim-patron-card",
          { opacity: 0, y: 15, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      gsap.fromTo(
        ".anim-org-head",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: showSupportedBy ? ".anim-org-head" : sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".anim-org-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-org-card",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".anim-contact-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-contact-card",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [showSupportedBy]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 py-10 sm:py-16 lg:py-24"
    >
      <Container className="px-3 sm:px-6 lg:px-8">
        {/* ================= SUPPORTED BY SECTION ================= */}
        {showSupportedBy && (
          <div className="mb-10 sm:mb-20">
            <div className="anim-patrons-head text-center">
              <SectionHeading
                eyebrow="Patrons"
                title="Supported By"
                align="center"
                className="mx-auto"
              />
            </div>

            {/* Logo Grid */}
            <div className="mx-auto mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-5 lg:gap-6">
              {supportedByLogos.map((logo, index) => {
                const isLink = Boolean(logo.url);
                const CardWrapper = isLink ? "a" : "div";
                const wrapperProps = isLink
                  ? {
                      href: logo.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      title: `Visit ${logo.name}`,
                    }
                  : {};

                const isLastOddItem =
                  supportedByLogos.length % 2 !== 0 && index === supportedByLogos.length - 1;

                return (
                  <CardWrapper
                    key={logo.id}
                    {...wrapperProps}
                    className={`anim-patron-card group flex items-center justify-center rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-md ${
                      isLastOddItem ? "col-span-2 sm:col-span-1" : "col-span-1"
                    }`}
                  >
                    <div className="relative flex h-16 sm:h-20 w-full items-center justify-center p-1">
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        style={{
                          transform: `scale(${logo.scale ?? 1})`,
                        }}
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 200px"
                      />
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= ORGANIZERS SECTION ================= */}
        <div className="anim-org-head text-center">
          <SectionHeading
            eyebrow="Organizers"
            title="Meet the Organizers"
            description="Jointly organized by Futurex Trade Fair and Events Pvt. Ltd., Exhibitions & Trade Services India Pvt. Ltd., and Media Space Solutions Pvt. Ltd."
            align="center"
            className="mx-auto max-w-3xl"
          />
        </div>

        {/* Organizers Logos Grid */}
        <div className="mx-auto mt-6 sm:mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
          {siteConfig.organizers.map((org) => {
            const hasLogo = Boolean(org.logo && org.logo.trim().length > 0);
            
            // Individual scale fetch kar rahe hain `organizerScales` se
            const customScale = organizerScales[org.key] ?? 1;

            return (
              <a
                key={org.key}
                href={org.url || "#"}
                target={org.url ? "_blank" : "_self"}
                rel={org.url ? "noopener noreferrer" : undefined}
                title={`Visit ${org.name}`}
                className="anim-org-card group flex flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-md"
              >
                <div className="relative h-20 sm:h-24 w-full flex items-center justify-center p-2">
                  {hasLogo ? (
                    <Image
                      src={org.logo!}
                      alt={org.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      style={{
                        transform: `scale(${customScale})`,
                      }}
                      sizes="(max-width: 640px) 60vw, (min-width: 640px) 250px"
                    />
                  ) : (
                    <span className="text-center text-xs font-bold text-slate-800 sm:text-sm">
                      {org.name}
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {/* ================= CONTACT CARDS ================= */}
        <div className="mx-auto mt-10 sm:mt-18 max-w-4xl">
          <h3 className="text-center text-sm font-bold uppercase tracking-wider text-slate-800 sm:text-lg">
            For More Details, Please Contact
          </h3>

          <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
            {siteConfig.organizers.map((org) => (
              <div
                key={org.key}
                className="anim-contact-card flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:border-teal-500/30 hover:shadow-md"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-teal-600 sm:text-xs">
                    {org.name}
                  </p>
                  <p className="mt-1 sm:mt-2 text-xs font-semibold text-slate-900 sm:text-sm">
                    {org.contactName}
                  </p>
                </div>

                <div className="mt-3 flex flex-col gap-2 pt-2.5 border-t border-slate-100 text-xs sm:text-sm">
                  <a
                    href={`tel:${org.phoneHref}`}
                    className="flex items-center gap-2 text-slate-600 transition-colors hover:text-teal-600"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-teal-600" aria-hidden="true" />
                    <span className="truncate">{org.phone}</span>
                  </a>
                  <a
                    href={`mailto:${org.email}`}
                    className="flex items-center gap-2 text-slate-600 transition-colors hover:text-teal-600"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-teal-600" aria-hidden="true" />
                    <span className="truncate">{org.email}</span>
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