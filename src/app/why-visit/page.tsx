"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  CheckCircle2, 
  Users, 
  Zap, 
  Lightbulb, 
  Compass, 
  ArrowRight, 
  CalendarCheck, 
  Target 
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { whyVisitBenefits } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "Visit", href: "/why-visit" }, { label: "Why Visit" }];

const visitorStats = [
  { label: "Trade Visitors Expected", value: "15,000+" },
  { label: "Exhibiting Brands", value: "200+" },
  { label: "Product Categories", value: "50+" },
  { label: "Networking Hours", value: "24+" },
];

const preparationSteps = [
  {
    title: "Register Online Early",
    description: "Get free fast-track digital entry badges directly on your mobile device to skip long queue lines at registration desks.",
  },
  {
    title: "Identify Key Suppliers",
    description: "Review product profiles and schedule technical discussions with international manufacturers beforehand.",
  },
  {
    title: "Prepare Requirements",
    description: "Bring your product specifications and RFQs to get instant quotes and commercial proposals directly from exhibitors.",
  },
];

export default function WhyVisitPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.fromTo(
        ".anim-visit-intro",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-visit-intro",
            start: "top 85%",
          },
        }
      );

      // Benefits grid stagger
      gsap.fromTo(
        ".anim-benefit-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-benefits-grid",
            start: "top 80%",
          },
        }
      );

      // Prep steps stagger
      gsap.fromTo(
        ".anim-prep-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-prep-grid",
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
          { label: "Why Visit", href: "/why-visit" },
        ]}
      />

      <PageHero
        title="Discover Products, Suppliers and Business Connections"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/0L1A2244-min-scaled.jpg"
        bgOpacity="opacity-50"
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-16">

          {/* Intro Section with Stats Bar */}
          <div className="anim-visit-intro space-y-8">
            <div className="rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-10 text-center sm:text-left">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
                <Zap className="h-3.5 w-3.5" />
                <span>Premier Trade Exposition</span>
              </div>
              <p className="max-w-4xl text-lg font-semibold leading-relaxed text-ink sm:text-xl">
                The expo gives trade and professional visitors an unprecedented opportunity to explore electrical,
                power, renewable energy, smart lighting, and industrial automation solutions in one focused setting.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {visitorStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-slate-200/80 bg-white p-4 text-center shadow-xs">
                  <span className="text-2xl font-black text-teal sm:text-3xl">{stat.value}</span>
                  <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Benefits Grid */}
          <div className="space-y-6">
            <div className="text-center sm:text-left">
              <SectionHeading title="Reasons to Attend" />
              <p className="mt-1 text-sm text-slate-600">
                Key value highlights for engineers, buyers, contractors, and industry leaders.
              </p>
            </div>

            <div className="anim-benefits-grid grid gap-4 sm:grid-cols-2">
              {whyVisitBenefits.map((item, idx) => (
                <div
                  key={idx}
                  className="anim-benefit-card group flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-md"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold leading-relaxed text-slate-800 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Section */}
          <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 sm:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <SectionHeading title="Prepare for a Productive Visit" />
                <p className="text-xs text-slate-500 sm:text-sm">Maximize your efficiency on the show floor</p>
              </div>
            </div>

            <div className="anim-prep-grid grid gap-4 sm:grid-cols-3 pt-2">
              {preparationSteps.map((step, idx) => (
                <div key={idx} className="anim-prep-card rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                  <span className="inline-block text-xs font-black uppercase tracking-wider text-teal">
                    Step 0{idx + 1}
                  </span>
                  <h4 className="mt-1 text-base font-bold text-slate-900">{step.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-teal/20 bg-gradient-to-r from-teal/10 via-sky/5 to-white p-6 shadow-sm sm:flex-row sm:p-8">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">Free Visitor Access</span>
              <h4 className="text-xl font-bold text-slate-900">Ready to Attend the Exposition?</h4>
              <p className="text-xs text-slate-600 sm:text-sm">
                Get your digital badge now or review attendee profiles and venue logistics.
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
              <Button href="/visitor-profile" variant="outline">
                Visitor Profile
              </Button>
              <Button href="/plan-your-visit" variant="ghost">
                Plan Your Visit
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}