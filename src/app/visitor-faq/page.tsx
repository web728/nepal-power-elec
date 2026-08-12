"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, HelpCircle, MessageSquare, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { visitorFaqs } from "@/lib/content/faqs";
import { siteConfig } from "@/lib/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "Visit", href: "/why-visit" }, { label: "Visitor FAQ" }];

interface RawFaqItem {
  title?: string;
  question?: string;
  content?: string;
  answer?: string;
}

export default function VisitorFaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const pageRef = useRef<HTMLDivElement>(null);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return visitorFaqs as RawFaqItem[];
    const query = searchQuery.toLowerCase();

    return (visitorFaqs as RawFaqItem[]).filter((item) => {
      const qText = (item.title || item.question || "").toLowerCase();
      const aText = (item.content || item.answer || "").toLowerCase();
      return qText.includes(query) || aText.includes(query);
    });
  }, [searchQuery]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".anim-faq-intro",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-faq-intro",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".anim-faq-container",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-faq-container",
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
          { label: "Visitor FAQ", href: "/visitor-faq" },
        ]}
      />
      <FaqJsonLd items={visitorFaqs} />

      <PageHero
        title="Frequently Asked Questions"
        description="Find clear answers regarding visitor registration, entry passes, travel logistics, and exhibition guidelines."
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/0L1A2531-min-scaled.jpg"
        bgOpacity="opacity-50"
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-10">
          
          {/* Search Header */}
          <div className="anim-faq-intro rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  How can we help you?
                </h2>
                <p className="text-xs text-slate-500 sm:text-sm">
                  Search through our visitor knowledge base
                </p>
              </div>
            </div>

            {/* Interactive Search Input */}
            <div className="relative mt-6">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., registration, entry fee, venue, badges)..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-xs outline-none transition-all duration-200 focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Accordion Component List */}
          <div className="anim-faq-container rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
            {filteredFaqs.length > 0 ? (
              <Accordion
                items={filteredFaqs.map((faq) => ({
                  question: faq.title || faq.question || "",
                  answer: faq.content || faq.answer || "",
                }))}
              />
            ) : (
              <div className="py-12 text-center">
                <p className="text-base font-bold text-slate-700">No matching questions found</p>
                <p className="mt-1 text-xs text-slate-500">
                  Try searching with different keywords or contact our visitor support team directly.
                </p>
              </div>
            )}
          </div>

          {/* Help & Registration CTA */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-teal/20 bg-gradient-to-r from-teal/10 via-sky/5 to-white p-6 shadow-sm sm:flex-row sm:p-8">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center gap-1.5 text-teal sm:justify-start">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Still Have Questions?</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">Get in Touch with Our Team</h4>
              <p className="text-xs text-slate-600 sm:text-sm">
                We are happy to assist you with registration or travel logistics.
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
              <Button href="/contact" variant="outline">
                Contact Support
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}