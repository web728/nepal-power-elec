import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { AccessibilityFeedbackForm } from "@/components/forms/accessibility-feedback-form";

export const metadata: Metadata = {
  title: { absolute: "Accessibility | Nepal Electric, Power and Lights Expo" },
  description:
    "Read the expo website accessibility commitment and request information in another format or report a barrier.",
  alternates: { canonical: "/accessibility" },
};

const sections: { heading: string; body: string | string[] }[] = [
  {
    heading: "Our Commitment",
    body: "The organizers aim to make the official website usable by a wide range of people, including users of assistive technologies.",
  },
  {
    heading: "Accessibility Measures",
    body: [
      "Logical headings and page structure",
      "Keyboard-accessible navigation and controls",
      "Visible focus states",
      "Readable text and sufficient contrast",
      "Alternative text for meaningful images",
      "Labels and clear errors for forms",
      "Text alternatives for charts and important images",
      "Mobile-responsive layouts",
      "Captions or transcripts for important multimedia where available",
      "Webpage summaries for key PDF documents",
    ],
  },
  {
    heading: "Target Standard",
    body: "The website should be developed and reviewed with reference to WCAG 2.2 Level AA. A full compliance claim should be made only after appropriate testing of the live website and its third-party services.",
  },
  {
    heading: "Alternative Formats",
    body: "Users may request event information by email or in another reasonably available format. Requests should identify the page or document and the preferred format.",
  },
  {
    heading: "Physical Venue Access",
    body: "Visitors requiring assistance at the event should contact the organizing team before attending. Only verified venue facilities should be described as available.",
  },
  {
    heading: "Report a Barrier",
    body: "Accessibility feedback should identify the page or document, the problem experienced, the device or browser used and a preferred contact method. Users are not required to disclose medical information.",
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Accessibility", href: "/accessibility" }]} />
      <PageHero title="Accessibility Statement" breadcrumbs={[{ label: "Accessibility Statement" }]} />
      <Container as="section" className="py-12 sm:py-16">
        <article className="mx-auto max-w-prose">
      
          {sections.map((section) => (
            <div key={section.heading} className="mt-8">
              <h2 className="text-xl font-semibold text-ink sm:text-2xl">{section.heading}</h2>
              {Array.isArray(section.body) ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted">
                  {section.body.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-base leading-relaxed text-muted">{section.body}</p>
              )}
            </div>
          ))}

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Report a Barrier</h2>
            <div className="mt-4">
              <AccessibilityFeedbackForm />
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Organizer Contacts</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {siteConfig.organizers.map((org) => (
                <div key={org.key} className="rounded-lg border border-border bg-bg px-4 py-4 text-sm">
                  <p className="font-semibold text-ink">{org.name}</p>
                  <p className="mt-1 text-muted">{org.contactName}</p>
                  <a href={`mailto:${org.email}`} className="mt-1 block text-sky-dark hover:underline">
                    {org.email}
                  </a>
                  <a href={`tel:${org.phoneHref}`} className="block text-sky-dark hover:underline">
                    {org.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </article>
      </Container>
    </>
  );
}
