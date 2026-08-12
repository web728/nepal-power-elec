import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";
import { 
  FileText, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  Sparkles,
  Layers
} from "lucide-react";

const breadcrumbs = [
  { label: "Downloads", href: "/downloads" }, 
  { label: "2026 Event Brochure" }
];

const brochureSectors = [
  "Power and Energy",
  "Transmission & Distribution Equipment",
  "Electricals & Electronics",
  "Lighting & Illumination",
  "Home & Commercial Appliances",
  "Electro Energetics",
];

export const metadata: Metadata = {
  title: { absolute: "2026 Event Brochure | Nepal Electric, Power and Lights Expo" },
  description:
    "Download the official brochure for the 5th Nepal Electric, Power and Lights International Expo 2026.",
  alternates: { canonical: "/downloads/2026-event-brochure" },
};

export default function BrochureDownloadPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Downloads", href: "/downloads" },
          { label: "2026 Event Brochure", href: "/downloads/2026-event-brochure" },
        ]}
      />
      
      <PageHero 
        title="Download Official 2026 Event Brochure" 
        breadcrumbs={breadcrumbs} 
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Brochure Info & Highlights */}
          <div className="lg:col-span-7">
            
            {/* Format Pill Tag */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal shadow-2xs">
              <FileText className="h-4 w-4" />
              <span>5th Edition • Official Event Brochure • PDF (English)</span>
            </div>

            <h2 className="mt-4 text-2xl font-black text-slate-900 sm:text-3xl">
              Comprehensive Guide to Nepal's Premier Energy Event
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              The brochure introduces the event, key industry sectors, participation benefits for exhibitors
              and trade visitors, complete profile details, exhibition floor overview, and scheduled event dates.
            </p>

            {/* Main Sectors Covered Grid */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-4 w-4 text-teal" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Featured Industry Sectors
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {brochureSectors.map((sector) => (
                  <div
                    key={sector}
                    className="group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs transition-all duration-200 hover:border-teal/50 hover:shadow-xs"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                      <Zap className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      {sector}
                    </span>
                  </div>
                ))}
              </div>
            </div>

      

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                href={siteConfig.registration.exhibitor}
                target="_blank"
                rel="noopener noreferrer"
                variant="cta-exhibitor"
                className="gap-2"
              >
                <span>Book a Stand</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={siteConfig.registration.visitor}
                target="_blank"
                rel="noopener noreferrer"
                variant="cta-visitor"
                className="gap-2"
              >
                <span>Register to Visit</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xs sm:p-4">
              <BrochureDownloadForm />
            </div>
          </div>

        </div>
      </Container>
    </>
  );
}