"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelpCircle, Search, MessageSquare, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { generalFaqs } from "@/lib/content/faqs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breadcrumbs = [{ label: "FAQ" }];

export default function FaqPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Search Filtered FAQs (Safe for ReactNode answers)
const filteredFaqs = generalFaqs.filter((faq) => {
  const query = searchQuery.toLowerCase();
  const matchesQuestion = faq.question.toLowerCase().includes(query);
    
    // Check if optional plainText exists for deep search
  const faqWithPlainText = faq as { plainText?: string };
  const matchesAnswerText = faqWithPlainText.plainText 
    ? faqWithPlainText.plainText.toLowerCase().includes(query) 
    : false;

  return matchesQuestion || matchesAnswerText;
});

// Prepare clean JSON-LD items for SEO
const jsonLdItems = generalFaqs.map((faq) => {
  const faqWithPlainText = faq as { plainText?: string };
  return {
    question: faq.question,
    answer: faqWithPlainText.plainText || faq.question,
  };
});

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro section animation
      gsap.fromTo(
        ".anim-faq-intro",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-faq-intro",
            start: "top 85%",
          },
        }
      );

      // Accordion container reveal
      gsap.fromTo(
        ".anim-faq-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-faq-content",
            start: "top 80%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative overflow-hidden bg-bg">
      <BreadcrumbJsonLd items={[{ label: "FAQ", href: "/faq" }]} />
      <FaqJsonLd items={jsonLdItems} />

      <PageHero
        title="Frequently Asked Questions"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/electricity-transmission-pylon-silhouetted-against-blue-sky-d-copy-min-scaled.jpg"
        bgOpacity="opacity-70"
      />

      <Container as="section" className="py-12 sm:py-20">
        
        {/* Intro & Search Block */}
        <div className="anim-faq-intro relative rounded-2xl border border-teal/20 bg-gradient-to-br from-white via-teal/5 to-sky/5 p-6 shadow-sm sm:p-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help Center</span>
          </div>
          <p className="max-w-3xl text-lg font-semibold leading-relaxed text-ink sm:text-xl">
            Find quick answers regarding exhibition dates, venue logistics, stall booking, visitor registration, and official media policies.
          </p>

          {/* Interactive Search Bar */}
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-ink shadow-xs outline-hidden transition-all duration-200 focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
          </div>
        </div>

        {/* Accordion List Container */}
        <div className="anim-faq-content mt-10">
          {filteredFaqs.length > 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <Accordion items={filteredFaqs} />
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-base font-semibold text-slate-600">
                No matching questions found for "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs font-bold text-teal underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Support Callout Footer */}
        <div className="mt-14 rounded-2xl border border-border bg-slate-50 p-6 text-center sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h4 className="mt-4 text-xl font-extrabold text-ink sm:text-2xl">Still Have Questions?</h4>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Can't find the answer you're looking for? Feel free to reach out directly to our support team.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button href="/contact" variant="primary" className="group">
              <span>Contact Organizers</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button href="/about-the-expo" variant="outline">
              Learn About Expo
            </Button>
          </div>
        </div>

      </Container>
    </div>
  );
}