import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { visitorProfessionalRoles, visitorIndustriesServed } from "@/lib/content/home-content";
import { visitorRoles } from "@/lib/content/stats";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [{ label: "Visit", href: "/why-visit" }, { label: "Visitor Profile" }];

export const metadata: Metadata = {
  title: { absolute: "Visitor Profile | Nepal Electric, Power and Lights Expo" },
  description:
    "See the professional roles and industries relevant to visiting the Nepal Electric, Power and Lights Expo 2026.",
  alternates: { canonical: "/visitor-profile" },
};

export default function VisitorProfilePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Visit", href: "/why-visit" },
          { label: "Visitor Profile", href: "/visitor-profile" },
        ]}
      />
      <PageHero title="Who Should Attend?" breadcrumbs={breadcrumbs}
       bgImage="/images/hero/download-2.jpeg" 
        bgOpacity="opacity-50"
         />
      <Container as="section" className="py-12 sm:py-16">
        <div>
          <SectionHeading title="Professional Roles" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {visitorProfessionalRoles.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <SectionHeading title="Industries" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {visitorIndustriesServed.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

       <div className="mt-12">
  <SectionHeading title="2025 Audience Profile" />
  <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
    The 2025 edition attracted a diverse audience of business leaders, procurement professionals, 
    engineers, distributors, and industry experts. This strong presence of key decision-makers 
    and technical partners makes the exhibition an ideal platform for business networking, 
    product launches, and market expansion across the electrical, power, and energy sectors.
  </p>

  <ul className="mt-6 flex max-w-2xl flex-col gap-4">
    {visitorRoles.map((role) => (
      <li key={role.label}>
        <div className="flex items-center justify-between gap-4 text-sm font-medium text-ink">
          <span>{role.label}</span>
          <span className="shrink-0 tabular-nums font-semibold">{role.value}%</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-bg" aria-hidden="true">
          <div 
            className="h-full rounded-full bg-teal transition-all duration-500 ease-out" 
            style={{ width: `${role.value}%` }} 
          />
        </div>
      </li>
    ))}
  </ul>
</div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={siteConfig.registration.visitor} target="_blank" rel="noopener noreferrer" variant="cta-visitor">
            Register to Visit
          </Button>
          <Button href="/why-visit" variant="outline">
            Why Visit
          </Button>
        </div>
      </Container>
    </>
  );
}
