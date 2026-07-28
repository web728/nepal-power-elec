import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { VisitorRegistrationForm } from "@/components/forms/visitor-registration-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const breadcrumbs = [{ label: "Visit", href: "/why-visit" }, { label: "Register to Visit" }];

export const metadata: Metadata = {
  title: { absolute: "Register to Visit | Nepal Electric, Power and Lights Expo 2026" },
  description: "Register to attend the Nepal Electric, Power and Lights International Expo, 4-6 September 2026 in Kathmandu.",
  alternates: { canonical: "/register-to-visit" },
};

export default function RegisterToVisitPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Visit", href: "/why-visit" },
          { label: "Register to Visit", href: "/register-to-visit" },
        ]}
      />
      <PageHero title="Register Your Interest in Attending" breadcrumbs={breadcrumbs} />

      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          Complete the visitor registration form for the 5th Nepal Electric, Power and Lights International Expo
          2026. Registration helps the organizing team prepare visitor communication and entry processing.
        </p>

        <div className="mt-6 flex max-w-3xl gap-4 rounded-xl border-2 border-yellow bg-yellow/10 px-5 py-5">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-yellow-dark" aria-hidden="true" />
          <p className="text-sm font-medium leading-relaxed text-ink sm:text-base">
            Submitting the form records the visitor&apos;s interest in attending. Admission remains subject to
            registration verification, the event entry process, venue capacity, security requirements and
            appropriate conduct.
          </p>
        </div>

        <div className="mt-12 max-w-3xl">
          <VisitorRegistrationForm />
        </div>
      </Container>
    </>
  );
}
