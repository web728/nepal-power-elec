"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, ExternalLink, ShieldCheck, ArrowRight, Building2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "Organizers" }];

export default function OrganizersPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in section header & intro
      gsap.fromTo(
        ".anim-org-intro",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-org-intro",
            start: "top 85%",
          },
        }
      );

      // Fade & scale up Logos Container
      gsap.fromTo(
        ".anim-org-logos",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-org-logos",
            start: "top 80%",
          },
        }
      );

      // Staggered reveal for contact cards
      gsap.fromTo(
        ".anim-org-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-org-cards-grid",
            start: "top 80%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative overflow-hidden bg-bg">
      <BreadcrumbJsonLd items={[{ label: "Organizers", href: "/organizers" }]} />

      <PageHero
        title="Meet the Organizers"
        breadcrumbs={breadcrumbs}
        bgImage="/uploads/organi.jpg"
        bgOpacity="opacity-70"
      />

      <Container as="section" className="py-12 sm:py-20">
        
        {/* Intro Block with Modern Highlight Styling */}
        <div className="anim-org-intro rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
            <Building2 className="h-3.5 w-3.5" />
            <span>Joint Exhibition Leadership</span>
          </div>
          <p className="max-w-4xl text-lg leading-relaxed font-semibold text-ink sm:text-xl">
            The Nepal Electric, Power and Lights International Expo is jointly organized
            by Futurex Trade Fair and Events Pvt. Ltd., Exhibitions &amp; Trade Services India Pvt.
            Ltd., and Media Space Solutions Pvt. Ltd.
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted sm:text-base">
            Together, our organizing partners bring decade-long global expertise in trade exhibitions,
            exhibitor coordination, visitor outreach, targeted marketing, and seamless event operations.
          </p>
        </div>

        {/* Section Header */}
        <div className="mt-14 sm:mt-18">
          <SectionHeading title="Our Organizing Partners" />
          <p className="mt-2 max-w-3xl text-sm text-muted sm:text-base">
            Click on any partner logo below to visit their official website or connect directly with their respective leads.
          </p>
        </div>

        {/* Clickable Logos Grid Card */}
        <div className="anim-org-logos mx-auto mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-0">
            {siteConfig.organizers.map((org, index) => (
              <div
                key={org.key}
                className="relative flex w-full items-center justify-center py-2"
              >
                <Link
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-24 w-full max-w-[220px] items-center justify-center rounded-lg p-2 transition-transform duration-300 hover:scale-105 sm:h-28"
                  aria-label={`Visit ${org.name} website`}
                >
                  <Image
                    src={org.logo}
                    alt={`${org.name} Logo`}
                    fill
                    className="object-contain transition-all duration-300 group-hover:brightness-105"
                    sizes="(min-width: 768px) 300px, 100vw"
                    priority
                  />
                  <ExternalLink className="absolute top-0 right-0 h-4 w-4 text-slate-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>

                {/* Vertical Divider for Desktop */}
                {index < siteConfig.organizers.length - 1 && (
                  <div className="hidden h-20 w-[1px] bg-slate-200 md:absolute md:right-0 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="anim-org-cards-grid mt-12 grid gap-6 md:grid-cols-3">
          {siteConfig.organizers.map((org) => (
            <div
              key={org.key}
              className="anim-org-card group flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-lg sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal">
                    Partner Organization
                  </span>
                  <ShieldCheck className="h-4 w-4 text-teal/60" />
                </div>

                <h3 className="mt-4 text-lg font-extrabold text-ink group-hover:text-teal transition-colors duration-200">
                  {org.name}
                </h3>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Contact Person: <span className="text-ink font-bold">{org.contactName}</span>
                </p>

                <div className="mt-5 flex flex-col gap-3 text-sm">
                  <a
                    href={`tel:${org.phoneHref}`}
                    className="inline-flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-slate-700 font-medium transition-colors hover:border-teal/30 hover:bg-teal/5 hover:text-teal"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-teal" />
                    <span>{org.phone}</span>
                  </a>

                  <a
                    href={`mailto:${org.email}`}
                    className="inline-flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-slate-700 font-medium transition-colors hover:border-teal/30 hover:bg-teal/5 hover:text-teal break-all"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-sky" />
                    <span>{org.email}</span>
                  </a>
                </div>
              </div>

              <div className="mt-6 border-t border-border/40 pt-4">
                <Link
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky hover:text-teal transition-colors"
                >
                  <span>Visit Official Site</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-center text-muted sm:text-sm">
          * All three organizations are joint organizing partners and are presented with equal prominence.
        </p>

        {/* Action Callouts Footer */}
        <div className="mt-14 rounded-2xl border border-border bg-slate-50 p-6 text-center sm:p-10">
          <h4 className="text-xl font-extrabold text-ink sm:text-2xl">Want to Participate in 2026?</h4>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Choose your path below to register as an exhibitor or visitor today.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              href={siteConfig.registration.exhibitor}
              target="_blank"
              rel="noopener noreferrer"
              variant="cta-exhibitor"
              className="shadow-sm hover:shadow-md"
            >
              Book a Stand
            </Button>
            <Button
              href={siteConfig.registration.visitor}
              target="_blank"
              rel="noopener noreferrer"
              variant="cta-visitor"
              className="shadow-sm hover:shadow-md"
            >
              Register to Visit
            </Button>
            <Button href="/contact" variant="ghost" className="group">
              <span>Send an Enquiry</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

      </Container>
    </div>
  );
}