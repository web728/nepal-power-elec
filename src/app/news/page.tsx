"use client";

import {
  ExternalLink,
  Newspaper,
  FileText,
  Download,
  Sparkles,
  Zap,
  Eye,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  Image,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  pressAssets,
  mediaCoverage,
  uniqueSources,
} from "@/lib/content/news-data";

const breadcrumbs = [{ label: "Media", href: "/news" }, { label: "News" }];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function NewsPage() {
  const pdfAssets = pressAssets.filter((item) => item.type === "pdf");
  const imageAssets = pressAssets.filter((item) => item.type === "image");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Media", href: "/news" },
          { label: "News & Coverage", href: "/news" },
        ]}
      />
      <PageHero
        title="Official News & Media Coverage"
        breadcrumbs={breadcrumbs}
      />

      <Container as="section" className="py-10 sm:py-16 bg-[#f5f8f9]">
        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl text-base leading-relaxed text-[#5b6b74] sm:text-lg"
        >
          Stay updated with verified press announcements, press release downloads, and news coverage of the{" "}
          <strong className="font-semibold text-[#14212b]">
            5th Nepal Electric, Power & Lights International Expo 2026
          </strong>
          .
        </motion.p>

        {/* 🌟 HERO MASTHEAD */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative mt-8 overflow-hidden rounded-3xl border border-[#dce4e6] bg-gradient-to-br from-[#14212b] via-[#044f47] to-[#05756a] p-6 sm:p-10 shadow-xl"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#35a8e0]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-[#ebbc17]/15 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#ebbc17]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ebbc17] border border-[#ebbc17]/30">
                <Sparkles className="h-3.5 w-3.5" />
                Media Coverage Spotlight
              </div>
              <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
                Featured In
              </h2>
              <p className="mt-1 text-sm text-[#dce4e6] max-w-xl">
                Leading news portals and media publications covering the biggest electrical and electronics expo in Nepal.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-md self-start md:self-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#35a8e0] text-white shadow-md">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                {/* <div className="text-2xl font-black text-white">{uniqueSources.length}+</div> */}
                <div className="text-xs font-medium text-[#dce4e6]">Media Portals</div>
              </div>
            </div>
          </div>

          {/* 🎡 SLOW & SMOOTH MARQUEE SCROLL */}
          <div className="relative mt-8 pt-6 border-t border-white/15 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex gap-4 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 80,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...uniqueSources, ...uniqueSources, ...uniqueSources].map((source, index) => (
                <span
                  key={`${source}-${index}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/15 transition-colors cursor-default shrink-0"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#ebbc17]" />
                  {source}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* 📥 PRESS ASSETS & MEDIA GALLERY SECTION */}
        <div className="mt-16">
          <SectionHeading
            title="Press Kit & Assets"
            description="Download press releases."
          />

          {/* 📄 PDF SECTION */}
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#05756a] flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4" /> Official Press Documents & Releases
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {pdfAssets.map((pdf) => (
                <div
                  key={pdf.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dce4e6] bg-white p-6 shadow-sm hover:border-[#05756a] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#dce4e6]/60">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#05756a]/10 border border-[#05756a]/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#05756a]">
                      <Sparkles className="h-3 w-3 text-[#ebbc17]" />
                      2026 OFFICIAL PDF
                    </span>
                  </div>

                  <div className="my-6 flex items-start gap-4">
                    <div className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-rose-50 to-rose-100 border border-rose-200 text-rose-600 shadow-inner group-hover:scale-105 transition-transform">
                      <FileText className="h-7 w-7" />
                      <span className="text-[9px] font-black uppercase mt-0.5">PDF</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#14212b] group-hover:text-[#05756a] transition-colors leading-snug">
                        {pdf.title}
                      </h4>
                      <p className="mt-1.5 text-xs text-[#5b6b74] leading-relaxed line-clamp-2">
                        {pdf.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#dce4e6]/60 flex items-center gap-2">
                    <a
                      href={pdf.href}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#05756a] hover:bg-[#044f47] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all active:scale-95"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </a>
                    <a
                      href={pdf.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#dce4e6] px-3.5 py-2.5 text-xs font-bold text-[#5b6b74] hover:bg-[#f5f8f9] hover:text-[#14212b] transition-colors"
                      title="View PDF"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🖼️ HIGH-RES IMAGES SECTION */}
          <div className="mt-12">
          
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {imageAssets.map((img) => (
                <div
                  key={img.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dce4e6] bg-white shadow-sm hover:border-[#35a8e0] hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-full bg-[#f8fafc] p-3 flex items-center justify-center border-b border-[#dce4e6]/60">
                    <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-1 rounded-full bg-[#14212b]/80 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white border border-white/20 shadow-md">
                      <Calendar className="h-3 w-3 text-[#ebbc17]" />
                      EXPO 2026
                    </div>

                    <img
                      src={img.previewUrl || "/placeholder.jpg"}
                      // alt={img.title || "Press Clipping"}
                      className="w-full h-auto max-h-[380px] object-contain rounded-lg shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                 

                    <div className="mt-5 flex items-center gap-2 pt-3 border-t border-[#dce4e6]/60">
                      <a
                        href={img.href}
                        download
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#35a8e0] hover:bg-[#2688b8] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all active:scale-95"
                      >
                        <Download className="h-4 w-4" />
                        Download High-Res
                      </a>
                      <a
                        href={img.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl border border-[#dce4e6] p-2.5 text-[#5b6b74] hover:bg-[#f5f8f9] hover:text-[#14212b] transition-colors"
                        title="View Full Size"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 📰 REDESIGNED EDITORIAL NEWS COVERAGE CARDS */}
        <div className="mt-16">
          <SectionHeading
            description="Verified press articles published across national and international media houses."
            title="Press Coverage & Articles"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {mediaCoverage.map((item, index) => (
              <motion.a
                key={`${item.href}-${index}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#dce4e6] bg-white p-6 shadow-sm hover:border-[#05756a] hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#05756a] to-[#35a8e0] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f0f7f7] border border-[#05756a]/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#05756a]">
                      <Newspaper className="h-3.5 w-3.5 text-[#05756a]" />
                      {item.source}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f8f9] text-[#5b6b74] group-hover:bg-[#05756a] group-hover:text-white transition-all">
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-base font-bold leading-snug text-[#14212b] group-hover:text-[#05756a] transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[#dce4e6]/60 flex items-center justify-between text-xs font-bold text-[#5b6b74] group-hover:text-[#05756a] transition-colors">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#05756a]" />
                    Read Article
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#35a8e0]" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Container>
    </>
  );
}