import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { OrganizersSection } from "@/components/sections/organizers-section";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Mail, Phone, MapPin, Clock, HelpCircle, Sparkles, Calendar } from "lucide-react";

const breadcrumbs = [{ label: "Contact" }];

export const metadata: Metadata = {
  title: { absolute: "Contact | Nepal Electric, Power and Lights Expo 2026" },
  description:
    "Contact the joint organizers for exhibitor, visitor, media, sponsorship and general enquiries.",
  alternates: { canonical: "/contact" },
};

const quickContactCards = [
  {
    icon: Calendar,
    title: "Event Dates",
    detail: "September 04 - 06, 2026", // Apni actual dates yaha dalein
    subDetail: "Friday - Sunday | 10:00 AM - 6:00 PM NPT",
    href: "#", // Ya calendar add event link
  },
  {
    icon: MapPin,
    title: "Event Venue",
    detail: "Bhrikuti Mandap Exhibition Hall",
    subDetail: "Kathmandu, Nepal",
    href: "https://maps.google.com/?q=Bhrikuti+Mandap+Exhibition+Hall+Kathmandu",
  },
];
export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Contact", href: "/contact" }]} />

      <PageHero
        title="Get in Touch"
        breadcrumbs={breadcrumbs}
        bgImage="/images/hero/excellent-business-opportunities-for-upvc-dealers-and-upvc-profile-distributors.jpg"
        bgOpacity="opacity-50"
      />

      {/* Main Content Section */}
      <Container as="section" className="py-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Context & Quick Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal">
                <Sparkles className="h-3.5 w-3.5" />
                <span>We're Here to Help</span>
              </div>

              <SectionHeading title="Connect with the Organizing Team" className="mt-4" />

              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                For exhibitor participation, visitor registration, sponsorship opportunities, media enquiries, 
                partnerships or general event assistance, reach out directly or submit your query.
              </p>

              {/* Quick Event Info Stack */}
<div className="mt-8 flex flex-col gap-4">
  {quickContactCards.map((card, idx) => {
    const Icon = card.icon;
    const isExternal = card.href.startsWith("http");

    return (
      <a
        key={idx}
        href={card.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-teal/50 hover:shadow-sm"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground">{card.title}</h4>
          <p className="mt-0.5 text-sm font-semibold text-teal">{card.detail}</p>
          <p className="text-xs text-muted-foreground">{card.subDetail}</p>
        </div>
      </a>
    );
  })}
</div>
            </div>

            {/* Quick Response Notice */}
            <div className="mt-8 rounded-xl bg-slate-50 p-5 border border-slate-200/80">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Clock className="h-4 w-4 text-teal" />
                <span>Response Time</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Our desk responds to all formal enquiries within 24 business hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-2 shadow-xs sm:p-4">
              <ContactForm />
            </div>
          </div>

        </div>
      </Container>

      {/* Organizers Section */}
      <section className="border-t border-border bg-muted/10 py-12 sm:py-16">
        <Container>
          <OrganizersSection 
          showSupportedBy={false}
          showMediaPartners = {true} />
        </Container>
      </section>
    </>
  );
}