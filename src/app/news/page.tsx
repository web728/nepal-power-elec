"use client";

import { ExternalLink, Newspaper } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const breadcrumbs = [{ label: "Media", href: "/news" }, { label: "News" }];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const mediaCoverage: { title: string; source: string; href: string }[] = [
  {
    title: "भृकुटीमण्डपमा विद्युत् र इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी हुने",
    source: "Kantipur Press",
    href: "https://kantipurpress.com/2026/3912/",
  },
  {
    title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    source: "Banijya Post",
    href: "https://banijyapost.com/news/electronic-expo",
  },
  {
    title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्स प्रदर्शनी",
    source: "Britant News",
    href: "https://britantnews.com/2026/08/20/48945/electrical-and-electronics-exhibition-in-kathmandu-from-bhadra-19/",
  },
  {
    title: "प्रदर्शनी सम्बन्धी आधिकारिक अपडेट",
    source: "Facebook",
    href: "https://www.facebook.com/share/p/1CtxuXtHeF/",
  },
  {
    title: "भदौ १९ देखि विद्युत् तथा इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी, १०० बढी कम्पनी सहभागी हुने",
    source: "Bizpati",
    href: "https://bizpati.com/2026/08/214988/",
  },
  {
    title: "'नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३' आयोजना हुँदै",
    source: "Bizshala",
    href: "https://bizshala.com/article/31906",
  },
  {
    title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    source: "Equity Nepal",
    href: "https://equitynepal.com/2026/08/20/97987/",
  },
  {
    title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    source: "Mountain Khabar",
    href: "https://www.mountainkhabar.com/2026/08/20/235570/",
  },
  {
    title: "नेपाल इलेक्ट्रिक तथा कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुने",
    source: "Hamro Artha",
    href: "https://hamroartha.com/news/134973",
  },
  {
    title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै",
    source: "CNN Khabar",
    href: "https://cnnkhabar.com/content/15606",
  },
  {
    title: "भदौ १९ गतेदेखि २१ गतेसम्म इलेक्ट्रिक तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी",
    source: "Corporate Khabar",
    href: "https://corporatekhabar.com/electric-and-electronics/",
  },
  {
    title: "१०० भन्दा बढी इलेक्ट्रिकल तथा इलेक्ट्रोनिक्स कम्पनीहरूको प्रदर्शनी",
    source: "Aarthik News",
    href: "https://aarthiknews.com/news/125753/exhibition-of-more-than-100-electrical-and/",
  },
];

export default function NewsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Media", href: "/news" },
          { label: "News", href: "/news" },
        ]}
      />
      <PageHero title="Latest Official Expo Updates" breadcrumbs={breadcrumbs} />

      <Container as="section" className="py-12 sm:py-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg"
        >
          Read verified announcements about the 5th Nepal Electric, Power and Lights
          International Expo 2026, including event information, registration, documents and
          previous-edition highlights.
        </motion.p>

        {/* Featured In masthead strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative mt-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 px-6 py-7 sm:px-10 sm:py-9"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-teal/10 blur-3xl" />
          <div className="relative flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-200 ring-1 ring-inset ring-white/15">
              <Newspaper className="h-3.5 w-3.5" />
              As Featured In
            </span>
          </div>
          <div className="relative mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
            {[...new Set(mediaCoverage.map((item) => item.source))].map((source) => (
              <span
                key={source}
                className="text-sm font-semibold tracking-wide text-white/70 transition-colors hover:text-white sm:text-base"
              >
                {source}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Media Coverage grid */}
        <div className="mt-14">
          <SectionHeading
            title="Media Coverage"
            description="Independent press coverage of the 5th Nepal Electric, Power and Lights International Expo 2026 from leading Nepali news portals."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {mediaCoverage.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-teal/10"
              >
                {/* Gradient border glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-teal/40 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal/0 blur-2xl transition-all duration-500 group-hover:bg-teal/15" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal">
                      {item.source}
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal" />
                  </div>

                  <h3 className="mt-4 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-700">
                    {item.title}
                  </h3>
                </div>

                <span className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors group-hover:text-teal">
                  Read full coverage
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Container>
    </>
  );
}