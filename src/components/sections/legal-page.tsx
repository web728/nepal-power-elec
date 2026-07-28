import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

export type LegalSection = {
  heading: string;
  body: string | string[];
};

export function LegalPage({
  title,
  effectiveNote,
  sections,
}: {
  title: string;
  effectiveNote?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero title={title} breadcrumbs={[{ label: title }]} />
      <Container as="section" className="py-12 sm:py-16">
        <article className="mx-auto max-w-prose">
          {effectiveNote && <p className="italic text-muted">{effectiveNote}</p>}
          {sections.map((section) => (
            <div key={section.heading} className="mt-8 first:mt-8">
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
        </article>
      </Container>
    </>
  );
}
