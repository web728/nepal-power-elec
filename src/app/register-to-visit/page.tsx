"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserCheck, Ticket, CalendarDays, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { VisitorRegistrationForm } from "@/components/forms/visitor-registration-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "Visit", href: "/why-visit" }, { label: "Register to Visit" }];

const registrationPerks = [
  "Free fast-track badge issuance at entry desks",
  "Access to 200+ global electrical & power exhibitors",
  "Invitation to technical seminars & product demos",
  "Digital show guide & official exhibitor directory",
];

export default function RegisterToVisitPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro section animation
      gsap.fromTo(
        ".anim-reg-intro",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-reg-intro",
            start: "top 85%",
          },
        }
      );

      // Form container reveal
      gsap.fromTo(
        ".anim-reg-form",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-reg-form",
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
          { label: "Register to Visit", href: "https://exporegistration.in/nepalpowerelec-visitor.aspx" },
        ]}
      />

      <PageHero
        title="Register Your Interest in Attending"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/np-scaled.jpg"
        bgOpacity="opacity-50"
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-10">
          
          {/* Top Intro Card with Event Logistics Bar */}
          <div className="anim-reg-intro rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
                <Ticket className="h-3.5 w-3.5" />
                <span>Free Visitor Pass</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5 text-teal" />
                  4 - 6 September 2026
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-teal" />
                  Bhrikuti Mandap, Kathmandu
                </span>
              </div>
            </div>

            <p className="mt-4 text-lg font-semibold leading-relaxed text-ink sm:text-xl">
              Complete the visitor registration form for the 5th Nepal Electric, Power and Lights International Expo
              2026. Registration helps our team prepare express entry processing and provide instant event updates.
            </p>

            {/* Included Perks */}
            <div className="mt-6 border-t border-slate-200/80 pt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Attendee Benefits</span>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {registrationPerks.map((perk, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Centered Main Form Container */}
          <div className="anim-reg-form">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-10">
              <div className="mb-8 border-b border-slate-100 pb-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-ink sm:text-3xl">
                  Visitor Registration Form
                </h3>
                <p className="mt-2 text-sm text-muted sm:text-base">
                  Fill in your official contact information to receive your digital entry confirmation.
                </p>
              </div>

              <VisitorRegistrationForm />
            </div>
          </div>

          {/* Footer Security / Info Banner */}
          <div className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 sm:text-sm">
            <ShieldCheck className="h-5 w-5 shrink-0 text-teal" />
            <span>
              Your registration data is kept private and used exclusively for event entry verification, fast-track badge printing, and official expo communications.
            </span>
          </div>

        </div>
      </Container>
    </div>
  );
}