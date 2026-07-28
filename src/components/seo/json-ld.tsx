import { siteConfig } from "@/lib/site-config";

export function OrganizationJsonLd() {
  return (
    <>
      {siteConfig.organizers.map((org) => {
        const data = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: org.name,
          email: org.email,
          telephone: org.phone,
        };
        return (
          <script
            key={org.key}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        );
      })}
    </>
  );
}

export function EventJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: siteConfig.eventName,
    startDate: siteConfig.dates.start,
    endDate: siteConfig.dates.end,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: siteConfig.venue.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.venue.city,
        addressCountry: "NP",
      },
    },
    organizer: siteConfig.organizers.map((org) => ({
      "@type": "Organization",
      name: org.name,
    })),
    description: siteConfig.tagline,
    url: siteConfig.siteUrl,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { label: string; href: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.siteUrl}${item.href}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
