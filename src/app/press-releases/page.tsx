"use client";

import { Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PressReleaseCarousel } from "@/components/press-release/press-release-carousel";
import { pressReleaseEditions } from "@/lib/content/press-releases";
import { siteConfig } from "@/lib/site-config";
import { motion, type Variants } from "framer-motion";

const breadcrumbs = [{ label: "Media", href: "/news" }, { label: "Press Releases" }];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PressReleasesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Media", href: "/news" },
          { label: "Press Releases", href: "/press-releases" },
        ]}
      />

      <PageHero
        title="Official Announcements"
        description="Event updates, press materials, and media information from the organizing team."
        breadcrumbs={breadcrumbs}
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-16 sm:space-y-20">
          {/* Each edition gets its own slider — newest release shows first,
              older ones stay one click away instead of stacking the page. */}
          {pressReleaseEditions.map((edition, i) => (
            <motion.div
              key={edition.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            >
              <PressReleaseCarousel edition={edition} />
            </motion.div>
          ))}

          {/* About the Expo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 sm:p-8"
          >
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal">About the Expo</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              The Nepal Electric, Power and Lights International Expo is a B2B trade exhibition dedicated to the electrical, power,
              renewable-energy, lighting, automation and allied industries. It connects manufacturers, exporters, suppliers and technology
              providers with importers, distributors, EPC contractors, project developers, engineers, consultants, procurement
              professionals and institutional buyers.
            </p>
          </motion.div>

          {/* Media Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionHeading
              title="Media Enquiries"
              description="Media representatives may contact the organizing team for official event information, interview requests, press materials, exhibition updates, media registration and coverage-related enquiries."
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3"
            >
              {(() => {
                const orgs = siteConfig.organizers;
                const reorderedOrgs = orgs.length > 0 ? [orgs[orgs.length - 1], ...orgs.slice(0, -1)] : orgs;

                return reorderedOrgs.map((org) => (
                  <motion.div key={org.key} variants={itemVariants} whileHover={{ y: -4 }}>
                    <Card className="flex h-full flex-col justify-between border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:border-teal/50 hover:shadow-lg">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{org.name}</h3>
                        <p className="mt-1 text-xs font-medium text-slate-500">{org.contactName}</p>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 text-sm font-medium">
                        <a
                          href={`tel:${org.phoneHref}`}
                          className="group flex items-center gap-2.5 text-slate-700 transition-colors hover:text-teal"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                          </div>
                          <span className="text-xs sm:text-sm">{org.phone}</span>
                        </a>

                        <a
                          href={`mailto:${org.email}`}
                          className="group flex items-center gap-2.5 text-slate-700 transition-colors hover:text-teal"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                          </div>
                          <span className="break-all text-xs sm:text-sm">{org.email}</span>
                        </a>
                      </div>
                    </Card>
                  </motion.div>
                ));
              })()}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </>
  );
}