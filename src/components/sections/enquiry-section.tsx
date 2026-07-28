import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuickEnquiryForm } from "@/components/forms/quick-enquiry-form";
import { MapPin, CalendarDays } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const infoPoints = [
  {
    icon: CalendarDays,
    label: "Dates",
    value: siteConfig.dates.display,
  },
  {
    icon: MapPin,
    label: "Venue",
    value: siteConfig.venue.full,
  },
];

export function EnquirySection() {
  return (
    <section id="enquiry" className="bg-bg py-16 sm:py-22 scroll-mt-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Get in Touch"
              title="Interested in the Expo?"
            />
            <p className="mt-4 text-base leading-relaxed text-muted">
              Whether you want to exhibit, visit, or explore partnership opportunities — drop us a
              message and our team will get back to you.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              {infoPoints.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
                    <p className="mt-0.5 text-sm text-ink">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <QuickEnquiryForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
