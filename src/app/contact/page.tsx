import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { OrganizersSection } from "@/components/sections/organizers-section";
import { ContactForm } from "@/components/forms/contact-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const breadcrumbs = [{ label: "Contact" }];

export const metadata: Metadata = {
  title: { absolute: "Contact | Nepal Electric, Power and Lights Expo 2026" },
  description: "Contact the three joint organizers for exhibitor, visitor, media and general enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Contact", href: "/contact" }]} />
      <PageHero title="Connect with the Organizing Team" breadcrumbs={breadcrumbs} 
        bgImage="/images/hero/excellent-business-opportunities-for-upvc-dealers-and-upvc-profile-distributors.jpg" 
        bgOpacity="opacity-50"
        />

      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          Contact any of the three joint organizing partners for exhibitor participation, visitor registration,
          media enquiries, official documents, partnerships or general event assistance.
        </p>
      </Container>

      <OrganizersSection />

      <Container as="section" className="py-12 sm:py-16">
        <div className="flex max-w-3xl gap-4 rounded-xl border-2 border-yellow bg-yellow/10 px-5 py-5">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-yellow-dark" aria-hidden="true" />
          <p className="text-sm font-medium leading-relaxed text-ink sm:text-base">
            Submitting an enquiry does not confirm exhibition space, visitor admission, media accreditation or
            partnership status.
          </p>
        </div>

        <div className="mt-10 max-w-3xl">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
