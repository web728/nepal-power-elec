"use client";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { motion, type Variants } from "framer-motion"; // 1. Variants type import kiya
import {
  eventScale,
  visitorRoles,
  visitorIndustries,
  businessIntent,
  companySize,
  surveyFindings,
} from "@/lib/content/stats";
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Target, 
  Building, 
  ClipboardCheck 
} from "lucide-react";

const breadcrumbs = [
  { label: "Past Editions", href: "/past-editions/2025-edition" },
  { label: "Post-Show Statistics" },
];

// 2. Explicitly Variants type add kar diya hai
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// 3. Item animation variants par bhi type definition lagayi hai
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

function PercentList({ items }: { items: { label: string; value: number }[] }) {
  return (
    <motion.ul 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="mt-6 flex max-w-3xl flex-col gap-4"
    >
      {items.map((item) => (
        <motion.li 
          key={item.label} 
          variants={itemVariants}
          className="group rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all hover:border-teal/40 hover:shadow-md"
        >
          <div className="flex items-center justify-between gap-4 text-sm font-bold text-slate-800">
            <span>{item.label}</span>
            <span className="shrink-0 font-mono text-base font-extrabold text-teal tabular-nums">
              {item.value}%
            </span>
          </div>
          <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-teal/80 to-teal"
            />
          </div>
        </motion.li>
      ))}
    </motion.ul>
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
        {/* Event Scale */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <BarChart3 className="h-5 w-5" />
            </div>
            <SectionHeading title="Event Scale" />
          </div>

          <motion.dl 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {eventScale.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-teal/40 hover:shadow-md"
              >
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</dt>
                <dd className="mt-2 text-3xl font-black text-slate-900">{stat.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Visitor Roles */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <Users className="h-5 w-5" />
            </div>
            <SectionHeading title="Visitor Roles" />
          </div>
          <PercentList items={visitorRoles} />
        </div>

        {/* Visitor Industries */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <Briefcase className="h-5 w-5" />
            </div>
            <SectionHeading title="Visitor Industries" />
          </div>
          <PercentList items={visitorIndustries} />
        </div>

        {/* Business Intent */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <Target className="h-5 w-5" />
            </div>
            <SectionHeading title="Business Intent" />
          </div>
          <PercentList items={businessIntent} />
        </div>

        {/* Company Size */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <Building className="h-5 w-5" />
            </div>
            <SectionHeading title="Company Size" />
          </div>
          <PercentList items={companySize} />
        </div>

        {/* Reported Survey Findings */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <SectionHeading title="Reported Survey Findings" />
          </div>

          <motion.ul 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-3.5"
          >
            {surveyFindings.map((item) => (
              <motion.li
                key={item}
                variants={itemVariants}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="rounded-xl border border-slate-200/80 bg-white p-4.5 text-sm font-semibold leading-relaxed text-slate-800 shadow-xs transition-all hover:border-teal/40 hover:shadow-md sm:p-5"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </>
  );
}