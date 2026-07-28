import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";

export function OrganizersSection() {
  return (
    <section className="bg-bg py-16 sm:py-22">
      <Container>
        <SectionHeading
          eyebrow="Organizers"
          title="Organized Jointly By"
          description="Futurex Trade Fair and Events Pvt. Ltd., Exhibitions & Trade Services India Pvt. Ltd. and Media Space Solutions Pvt. Ltd."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-border bg-white p-6 shadow-sm sm:p-10">
          <div className="relative aspect-[2000/270] w-full">
            <Image
              src={siteConfig.organizersLockupImage}
              alt="Logos of the three joint organizers: Futurex Trade Fair and Events Pvt. Ltd., Exhibitions & Trade Services India Pvt. Ltd., and Media Space Solutions Pvt. Ltd."
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <h3 className="text-center text-lg font-semibold text-ink sm:text-xl">
            For More Details, Please Contact
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {siteConfig.organizers.map((org) => (
              <div
                key={org.key}
                className="flex flex-col rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-teal">
                  {org.name}
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">{org.contactName}</p>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  <a
                    href={`tel:${org.phoneHref}`}
                    className="flex items-center gap-2 text-sky-dark hover:text-teal"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Call / WhatsApp: {org.phone}</span>
                  </a>
                  <a
                    href={`mailto:${org.email}`}
                    className="flex items-center gap-2 break-all text-sky-dark hover:text-teal"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{org.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
