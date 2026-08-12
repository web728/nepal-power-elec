"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building, ClipboardList, ShieldCheck, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { OrganizersSection } from "@/components/sections/organizers-section";
import { ExhibitorEnquiryForm } from "@/components/forms/exhibitor-enquiry-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "Exhibit", href: "/why-exhibit" }, { label: "Book a Stand" }];

const whatHappensNext = [
  "The organizing team reviews the submitted company and product profile.",
  "A representative contacts the applicant regarding space availability and stand configurations.",
  "The applicant receives official commercial proposals, stall layouts, and contract forms.",
  "Participation is confirmed upon successful verification, documentation, and payment completion.",
];

export default function BookAStandPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro section animation
      gsap.fromTo(
        ".anim-book-intro",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-book-intro",
            start: "top 85%",
          },
        }
      );

      // Form Container animation
      gsap.fromTo(
        ".anim-book-form",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-book-form",
            start: "top 80%",
          },
        }
      );

      // Process steps stagger
      gsap.fromTo(
        ".anim-process-step",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-process-list",
            start: "top 85%",
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
          { label: "Exhibit", href: "/why-exhibit" },
          { label: "Book a Stand", href: "/book-a-stand" },
        ]}
      />

      <PageHero
        title="Apply to Exhibit at the 2026 Edition"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/np11-scaled.jpg"
        bgOpacity="opacity-75"
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-10">
          
          {/* Intro Block */}
          <div className="anim-book-intro text-center rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
              <Building className="h-3.5 w-3.5" />
              <span>Exhibitor Space Application</span>
            </div>
            <p className="mx-auto max-w-3xl text-lg font-semibold leading-relaxed text-ink sm:text-xl">
              Submit your company and product information to begin the participation process. The organizing team
              will review your enquiry and contact you directly using the details provided.
            </p>
          </div>

          {/* Centered Main Enquiry Form Container */}
          <div className="anim-book-form">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-10">
              <div className="mb-8 border-b border-slate-100 pb-5 text-center">
                <h3 className="text-2xl font-extrabold text-ink sm:text-3xl">
                  Exhibitor Enquiry Form
                </h3>
                <p className="mt-2 text-sm text-muted sm:text-base">
                  Please fill out the details below accurately for quick processing.
                </p>
              </div>

              <ExhibitorEnquiryForm />
            </div>
          </div>

          {/* Bottom Process Steps Section */}
          <div className="rounded-2xl border border-teal/20 bg-white p-6 shadow-xs sm:p-8">
            <div className="flex items-center justify-center gap-3 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-ink">What Happens Next?</h4>
                <p className="text-xs text-muted">Application & Allotment Steps</p>
              </div>
            </div>

            <ol className="anim-process-list mt-6 grid gap-4 sm:grid-cols-2">
              {whatHappensNext.map((step, idx) => (
                <li key={idx} className="anim-process-step flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-medium leading-relaxed text-slate-700 sm:text-sm">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Bottom Support Box */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-slate-50 p-6 text-center sm:flex-row sm:text-left sm:p-7">
            <div>
              <div className="flex items-center justify-center gap-2 text-sky sm:justify-start">
                <PhoneCall className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Direct Assistance</span>
              </div>
              <p className="mt-1 text-xs font-medium text-muted sm:text-sm">
                Need immediate help or custom stall space sizes? Reach out directly to our sales support desk.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-teal px-4 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              <span>Contact Organizer Sales Desk</span>
              <ShieldCheck className="h-4 w-4" />
            </a>
          </div>

        </div>
      </Container>

      <OrganizersSection />
    </div>
  );
}