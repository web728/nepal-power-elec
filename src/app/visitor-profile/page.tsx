"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserCheck, Building2, BarChart3, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { visitorProfessionalRoles, visitorIndustriesServed } from "@/lib/content/home-content";
import { visitorRoles } from "@/lib/content/stats";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "Visit", href: "/why-visit" }, { label: "Visitor Profile" }];

export default function VisitorProfilePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Roles Stagger Animation
      gsap.fromTo(
        ".anim-role-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-roles-grid",
            start: "top 85%",
          },
        }
      );

      // Industries Stagger Animation
      gsap.fromTo(
        ".anim-industry-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-industries-grid",
            start: "top 85%",
          },
        }
      );

      // Progress bar fill animation
      gsap.fromTo(
        ".anim-progress-bar",
        { width: "0%" },
        {
          width: (i, target) => target.getAttribute("data-value") + "%",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-stats-list",
            start: "top 80%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative overflow-hidden bg-bg">
      <BreadcrumbJsonLd
        items={[
          { label: "Visit", href: "/why-visit" },
          { label: "Visitor Profile", href: "/visitor-profile" },
        ]}
      />

      <PageHero
        title="Who Should Attend?"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/download-2.jpeg"
        bgOpacity="opacity-50"
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-16">

          {/* Section 1: Professional Roles */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <SectionHeading title="Professional Roles" />
                <p className="text-xs text-slate-500 sm:text-sm">Key designations attending the exposition</p>
              </div>
            </div>

            <div className="anim-roles-grid grid gap-3 sm:grid-cols-2">
              {visitorProfessionalRoles.map((item, idx) => (
                <div
                  key={idx}
                  className="anim-role-card flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all duration-200 hover:border-teal/40 hover:shadow-md"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal mt-0.5" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Target Industries */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <SectionHeading title="Industries Represented" />
                <p className="text-xs text-slate-500 sm:text-sm">Sectors driving energy, power, and lighting innovation</p>
              </div>
            </div>

            <div className="anim-industries-grid grid gap-3 sm:grid-cols-2">
              {visitorIndustriesServed.map((item, idx) => (
                <div
                  key={idx}
                  className="anim-industry-card flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all duration-200 hover:border-sky/40 hover:shadow-md"
                >
                  <span className="flex h-2 w-2 shrink-0 rounded-full bg-sky mt-2" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Audience Breakdown Stats */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <SectionHeading title="2025 Audience Profile" />
                <p className="text-xs text-slate-500 sm:text-sm">Demographic representation from the previous edition</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              The 2025 edition attracted a diverse audience of business leaders, procurement professionals, 
              engineers, distributors, and industry experts. This strong presence of key decision-makers 
              makes the exhibition an ideal platform for networking, product sourcing, and partnerships.
            </p>

            <ul className="anim-stats-list space-y-4 pt-2">
              {visitorRoles.map((role) => (
                <li key={role.label} className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between gap-4 text-sm font-bold text-slate-900">
                    <span>{role.label}</span>
                    <span className="shrink-0 font-mono text-teal">{role.value}%</span>
                  </div>
                  <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                    <div
                      className="anim-progress-bar h-full rounded-full bg-teal"
                      data-value={role.value}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-teal/20 bg-gradient-to-r from-teal/10 via-sky/5 to-white p-6 shadow-sm sm:flex-row sm:p-8">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center gap-1.5 text-teal sm:justify-start">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Fast-Track Pass</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">Join Industry Leaders at the Expo</h4>
              <p className="text-xs text-slate-600 sm:text-sm">
                Get free admission badges for instant access on event days.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Button
                href={siteConfig.registration.visitor}
                target="_blank"
                rel="noopener noreferrer"
                variant="cta-visitor"
                className="group shadow-sm hover:shadow-md"
              >
                <span>Register to Visit</span>
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="/why-visit" variant="outline">
                Why Visit
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}