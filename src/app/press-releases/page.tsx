"use client";

import { Phone, Mail, MapPin, Clock, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { motion, type Variants } from "framer-motion"; // 1. Variants type import kiya

const breadcrumbs = [{ label: "Media", href: "/news" }, { label: "Press Releases" }];

// 2. Variants explicitly type kar diye
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
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
        <div className="mx-auto max-w-4xl space-y-12 sm:space-y-16">

          {/* Main Press Release Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="relative overflow-hidden border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10 md:p-12 transition-all hover:shadow-md">
              {/* Header Badge & Location */}
              <div className="border-b border-slate-100 pb-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
                    <Sparkles className="h-3.5 w-3.5" />
                    FOR IMMEDIATE RELEASE
                  </span>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <MapPin className="h-4 w-4 text-teal" />
                    <span>Kathmandu, Nepal</span>
                  </div>
                </div>

                <h1 className="mt-5 text-2xl font-black leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  5th Nepal Electric, Power and Lights International Expo to Be Held in Kathmandu from 4–6 September 2026
                </h1>
              </div>

              {/* Main Content */}
              <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-slate-700">
                <p>
                  <strong>Kathmandu, Nepal —</strong> The 5th Nepal Electric, Power and Lights International Expo 2026
                  will be held from 4–6 September 2026 at Bhrikuti Mandap Exhibition Hall, Kathmandu, Nepal. The three-day
                  international trade exhibition will bring together manufacturers, exporters, suppliers, distributors,
                  technology providers, EPC contractors, project developers, consultants, engineers, procurement professionals,
                  utility representatives and other industry stakeholders from Nepal and international markets.
                </p>

                <p>
                  The exhibition will provide a focused business platform for companies operating across the electrical, power,
                  renewable-energy, lighting, automation and allied industries. Participating companies will be able to present new
                  products, technologies and solutions, meet potential buyers and channel partners, explore distributorship opportunities
                  and develop business relationships within Nepal's growing electrical and energy market.
                </p>

                <p>
                  The 2026 edition will feature products and solutions related to power generation, transmission and distribution,
                  transformers, switchgear, wires and cables, renewable energy, solar technology, batteries, inverters, UPS systems,
                  energy storage, LED and professional lighting, electrical equipment, electronic components, industrial automation,
                  smart metering, energy-management systems, EV charging infrastructure, home appliances, consumer electronics, testing
                  equipment and related services.
                </p>

                <p>
                  The expo is expected to attract business owners, company directors, purchase managers, procurement professionals,
                  engineers, EPC contractors, project developers, utilities, importers, distributors, dealers, consultants, architects,
                  government representatives, institutional buyers and professionals from the construction, infrastructure and industrial sectors.
                </p>

                <p>
                  The forthcoming edition will build on the success of the 2025 exhibition, which welcomed more than 150 exhibitors, over 300 brands
                  and solutions, participation from more than five countries and more than 15,000 trade visitors over three days of business networking.
                </p>

                <p>
                  The Nepal Electric, Power and Lights International Expo is designed to support product sourcing, technical discussions,
                  project enquiries, distributor development, strategic partnerships and regional market expansion. The event also provides
                  manufacturers and technology companies with an opportunity to understand local demand, strengthen brand visibility and engage
                  directly with Nepalese buyers and industry professionals.
                </p>

                {/* Expo Timing Highlight Box */}
                <div className="my-2 rounded-2xl border border-teal/20 bg-teal/5 p-5 text-slate-800">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                    <div>
                      <p className="font-semibold text-slate-900">Exhibition Schedule:</p>
                      <p className="mt-1">
                        The exhibition will be open daily from <strong>10:00 AM to 6:00 PM on 4, 5 and 6 September 2026</strong>. Visitor entry is free
                        with registration. Visitors below 18 years of age must be accompanied by a parent or legal guardian.
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  The event is jointly organized by <strong>Futurex Trade Fair and Events Pvt. Ltd.</strong>, <strong>Exhibitions &amp; Trade Services India Pvt. Ltd.</strong>,
                  and <strong>Media Space Solutions Pvt. Ltd.</strong> The organizing partners bring experience in international trade exhibitions,
                  exhibitor coordination, visitor outreach, marketing, media engagement and event operations.
                </p>

                <p>
                  Companies interested in participating as exhibitors may submit a stand enquiry through the official Book a Stand section of
                  the website. Trade visitors may complete advance registration through the official Visitor Registration section. Advance registration
                  is recommended for faster entry at the venue.
                </p>
              </div>
            </Card>
          </motion.div>

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
  {/* Array ko reverse karke 1st waale card ko sabse pehle laaya gaya hai */}
 {/* Array items ko rotate karke 1st -> 2nd, 2nd -> 3rd, aur 3rd -> 1st banaya gaya hai */}
{(() => {
  const orgs = siteConfig.organizers;
  // Last element ko sabse aage shift kar rahe hain
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