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
  showMediaPartners?: boolean;
}

interface PartnerLogo {
  id: number;
  name: string;
  src: string;
  url?: string;
  scale?: number;       // desktop/tablet scale
  mobileScale?: number; // optional override for mobile only
  offsetX?: number;
  offsetY?: number;
}

// ========================================================
// 1. SUPPORTED BY LOGOS (PATRONS) INDIVIDUAL SCALES
// ========================================================
const supportedByLogos: PartnerLogo[] = [
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
    name: "IPPAN",
    src: "/logo/IPPAN-New-Logo.png",
    url: "https://www.ippan.org.np/",
    scale: 0.6,
  },
   {
    id: 4,
    name: "SEEN",
    src: "/logo/60.png",
    scale: 1,
  },
  {
    id: 5,
    name: "SCAEF Nepal",
    src: "/logo/scaff.png",
    url: "https://scaef.org.np/",
    scale: 0.9,
  },
 
 
];

// ========================================================
// 2. MEDIA PARTNER LOGOS (8 LOGOS -> 5 top row, 3 bottom row)
// ========================================================
const mediaPartnerLogos: PartnerLogo[] = [
  {
    id: 1,
    name: "Media Partner 1",
    src: "/logo/lighting_world.jpeg",
    // url: "https://example.com",
    scale: 0.8,
    mobileScale: 0.8, // 0.2 kam mobile pe
  },
  {
    id: 2,
    name: "Media Partner 2",
    src: "/logo/electrical.jpeg",
    // url: "https://example.com",
    scale: 0.8,
    mobileScale: 0.8, // 0.2 kam mobile pe
  },
  {
    id: 3,
    name: "Media Partner 3",
    src: "/logo/11.png",
    // url: "https://example.com",
    scale: 2.1,
    offsetX: 0,
    offsetY: -5,
  },
  {
    id: 4,
    name: "Media Partner 4",
    src: "/logo/22.png",
    // url: "https://example.com",
    scale: 2.3,
  },
  {
    id: 5,
    name: "Media Partner 5",
    src: "/logo/10.png",
    url: "https://ecosmoworld.com/",
    scale: 2.2,
  },
  {
    id: 6,
    name: "Media Partner 6",
    src: "/logo/30.png",
    // url: "https://example.com",
    scale: 2.3,
  },
  {
    id: 7,
    name: "Media Partner 7",
    src: "/logo/40.png",
    // url: "https://example.com",
    scale: 2.5,
  },
  {
    id: 8,
    name: "Media Partner 8",
    src: "/logo/66.png",
    // url: "https://example.com",
    scale: 2.5,
    offsetX: 0,
    offsetY: -12,
  },
];

// ========================================================
// 3. ORGANIZERS LOGOS INDIVIDUAL SCALES
// ========================================================
const organizerScales: Record<string, number> = {
  futurex: 1.2,
  etss: 1.0,
  mediaspace: 0.9,
};

export function OrganizersSection({
  showSupportedBy = true,
  showMediaPartners = true,
}: OrganizersSectionProps) {
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

      if (showMediaPartners) {
        gsap.fromTo(
          ".anim-media-head",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".anim-media-head",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          ".anim-media-card",
          { opacity: 0, y: 15, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".anim-media-card",
              start: "top 85%",
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
            trigger: ".anim-org-head",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

    // Organizers Section Title
gsap.fromTo(
  ".anim-org-head",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".anim-org-head",
      start: "top 90%", // Jaldi trigger hoga
      toggleActions: "play none none none", // Ek baar play hone ke baad gayab nahi hoga
    },
  }
);

// Organizers Cards Grid
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
      trigger: ".anim-org-head", // Trigger parent/heading ko banaya taaki saare cards ek sath time par aayein
      start: "top 80%",
      toggleActions: "play none none none", // Up/Down scroll par disappear nahi hoga
    },
  }
);

// Contact Cards Grid
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
      start: "top 20%",
      toggleActions: "play none none none",
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
  }, [showSupportedBy, showMediaPartners]);

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
                      isLastOddItem
                        ? "col-span-2 mx-auto w-full max-w-[calc(50%-0.375rem)] sm:col-span-1 sm:mx-0 sm:w-auto sm:max-w-none"
                        : "col-span-1"
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

        {/* ================= MEDIA PARTNERS SECTION ================= */}
        {showMediaPartners && (
          <div className="mb-10 sm:mb-20">
            <div className="anim-media-head text-center">
              <SectionHeading
                eyebrow="Partners"
                title="Media Partners"
                align="center"
                className="mx-auto"
              />
            </div>

            {/* Flex layout -> auto centers incomplete rows (5 top, 3 bottom on lg) */}
            <div className="mx-auto mt-6 sm:mt-10 flex flex-wrap justify-center items-stretch gap-3 sm:gap-4 lg:gap-5">
              {mediaPartnerLogos.map((logo) => {
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

                const mobileScale = logo.mobileScale ?? logo.scale ?? 1;
                const desktopScale = logo.scale ?? 1;

                return (
                  <CardWrapper
                    key={logo.id}
                    {...wrapperProps}
                    className="anim-media-card group flex shrink-0 grow-0 basis-[47%] sm:basis-[22%] lg:basis-[18%] items-center justify-center rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-md"
                  >
                    <div className="relative flex h-16 sm:h-20 w-full items-center justify-center p-1 overflow-hidden">
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        fill
                        style={
                          {
                            "--tx": `${logo.offsetX ?? 0}px`,
                            "--ty": `${logo.offsetY ?? 0}px`,
                            "--s-mobile": mobileScale,
                            "--s-desktop": desktopScale,
                          } as React.CSSProperties
                        }
                        className="object-contain transition-transform duration-300 group-hover:scale-105 [transform:translate(var(--tx),var(--ty))_scale(var(--s-mobile))] sm:[transform:translate(var(--tx),var(--ty))_scale(var(--s-desktop))]"
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 150px"
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
                        objectPosition: "center",
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