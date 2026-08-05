import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { OrganizersSection } from "@/components/sections/organizers-section";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const breadcrumbs = [{ label: "Contact" }];

export const metadata: Metadata = {
  title: { absolute: "Contact | Nepal Electric, Power and Lights Expo 2026" },
  description: "Contact the joint organizers for exhibitor, visitor, media, sponsorship and general enquiries.",
  alternates: { canonical: "/contact" },
};

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

      {/* Intro & Contact Form Section */}
      <Container as="section" className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <SectionHeading title="Send Us a Message" />
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            For exhibitor participation, visitor registration, sponsorship opportunities, media enquiries, 
            partnerships or general event assistance, please contact the appropriate representative below or 
            fill out our enquiry form.
          </p>
        </div>

        <div className="mt-10 max-w-3xl">
          <div className="rounded-xl border border-border bg-bg p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>

      {/* Organizers Section (Positioned Below Contact Form without 'Supported By' logos) */}
      <section className="border-t border-border bg-muted/5 py-12 sm:py-16">
        <Container>
          <OrganizersSection showSupportedBy={false} />
        </Container>
      </section>
    </>
  );
}