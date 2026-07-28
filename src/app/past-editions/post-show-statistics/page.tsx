import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  eventScale,
  visitorRoles,
  visitorIndustries,
  businessIntent,
  companySize,
  surveyFindings,
  methodologyNote,
} from "@/lib/content/stats";

const breadcrumbs = [
  { label: "Past Editions", href: "/past-editions/2025-edition" },
  { label: "Post-Show Statistics" },
];

export const metadata: Metadata = {
  title: { absolute: "Post-Show Statistics | Nepal Electric, Power and Lights Expo" },
  description:
    "Review organizer-reported exhibitor, visitor and audience statistics from the 2025 edition.",
  alternates: { canonical: "/past-editions/post-show-statistics" },
};

function PercentList({ items }: { items: { label: string; value: number }[] }) {
  return (
    <ul className="mt-6 flex max-w-2xl flex-col gap-4">
      {items.map((item) => (
        <li key={item.label}>
          <div className="flex items-center justify-between gap-4 text-sm font-medium text-ink">
            <span>{item.label}</span>
            <span className="shrink-0 tabular-nums">{item.value}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-bg" aria-hidden="true">
            <div className="h-full rounded-full bg-teal" style={{ width: `${item.value}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function PostShowStatisticsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Past Editions", href: "/past-editions/2025-edition" },
          { label: "Post-Show Statistics", href: "/past-editions/post-show-statistics" },
        ]}
      />
      <PageHero
        title="Organizer-Reported Statistics from the 2025 Edition"
        breadcrumbs={breadcrumbs}
      />
      <Container as="section" className="py-12 sm:py-16">
        <div>
          <SectionHeading title="Event Scale" />
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {eventScale.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-bg px-4 py-4">
                <dt className="text-sm font-medium text-muted">{stat.label}</dt>
                <dd className="mt-1 text-2xl font-bold text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12">
          <SectionHeading title="Visitor Roles" />
          <PercentList items={visitorRoles} />
        </div>

        <div className="mt-12">
          <SectionHeading title="Visitor Industries" />
          <PercentList items={visitorIndustries} />
        </div>

        <div className="mt-12">
          <SectionHeading title="Business Intent" />
          <PercentList items={businessIntent} />
        </div>

        <div className="mt-12">
          <SectionHeading title="Company Size" />
          <PercentList items={companySize} />
        </div>

        <div className="mt-12">
          <SectionHeading title="Reported Survey Findings" />
          <ul className="mt-6 grid gap-3">
            {surveyFindings.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-xl border border-yellow/40 bg-yellow/10 px-5 py-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-semibold">Methodology note: </span>
            {methodologyNote}
          </p>
        </div>
      </Container>
    </>
  );
}
