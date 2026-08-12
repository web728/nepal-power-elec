import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PostShowReportForm } from "@/components/forms/PostShowReportForm";
import { FileText, ArrowRight, BarChart2, ShieldCheck, Sparkles } from "lucide-react";

const breadcrumbs = [{ label: "Downloads", href: "/downloads" }, { label: "2025 Post-Show Report" }];

const headlineFigures = [
  { label: "150+", subtext: "Exhibitors" },
  { label: "5+", subtext: "Countries" },
  { label: "15,000+", subtext: "Trade Visitors" },
];

export const metadata: Metadata = {
  title: { absolute: "2025 Post-Show Report | Nepal Electric, Power and Lights Expo" },
  description:
    "Download the 2025 post-show report with statistics, visitor analysis, photographs and media coverage.",
  alternates: { canonical: "/downloads/2025-post-show-report" },
};

export default function PostShowReportDownloadPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Downloads", href: "/downloads" },
          { label: "2025 Post-Show Report", href: "/downloads/2025-post-show-report" },
        ]}
      />
      
      <PageHero 
        title="Download 2025 Post-Show Report" 
        breadcrumbs={breadcrumbs} 
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Report Details & Stats */}
          <div className="lg:col-span-7">
            
            {/* Meta Pill Tag */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal shadow-2xs">
              <FileText className="h-4 w-4" />
              <span>4th Edition • PDF Report • English</span>
            </div>

            <h2 className="mt-4 text-2xl font-black text-slate-900 sm:text-3xl">
              Official Post-Show Analysis & Key Highlights
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              The report documents the event held from 29-31 August 2025 at Bhrikuti Mandap Exhibition
              Hall, Kathmandu. It includes reported exhibitor and visitor figures, visitor profiles,
              business intent, company size, survey findings, photographs and media coverage.
            </p>

            {/* Headline Reported Figures */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-teal" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Statistics</span>
              </div>
              
              <ul className="grid gap-4 sm:grid-cols-3">
                {headlineFigures.map((item, idx) => (
                  <li
                    key={idx}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-md"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal to-emerald-500 opacity-80 group-hover:opacity-100" />
                    
                    <span className="whitespace-nowrap text-3xl font-black tracking-tight text-slate-900">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      {item.subtext}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature Highlights Grid */}
            <div className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-teal" />
                <span>What's Included in this PDF:</span>
              </h4>
              <ul className="mt-3 grid gap-2.5 text-xs sm:text-sm font-medium text-slate-600 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                  Demographic Breakdown of Visitors
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                  Purchasing & Business Intent Analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                  Exhibitor Satisfaction Surveys
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                  Official Photo Gallery & Press Clippings
                </li>
              </ul>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/past-editions/2025-edition" variant="outline" className="gap-2">
                <span>View 2025 Edition</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/past-editions/post-show-statistics" variant="ghost" className="gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>View Statistics</span>
              </Button>
            </div>

          </div>

          {/* Right Column: Download Request Form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xs sm:p-4">
              <PostShowReportForm />
            </div>
          </div>

        </div>
      </Container>
    </>
  );
}