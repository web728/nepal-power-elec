"use client";

import {
  ExternalLink,
  Newspaper,
  FileText,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
  Zap,
  Eye,
} from "lucide-react";
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
    transition: { staggerChildren: 0.04 },
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

type MediaItem = {
  title: string;
  source: string;
  href: string;
};

type PressAsset = {
  id: string;
  title: string;
  size: string;
  href: string;
  type: "pdf" | "image";
  description: string;
  previewUrl?: string;
};

const pressAssets: PressAsset[] = [
  {
    id: "pdf-1",
    title: "NewsPaper Coverage",
    size: "2.4 MB PDF",
    href: "/media/press-release-official-2026.pdf",
    type: "pdf",
    description: "Official news regarding the 5th Nepal Electric & Consumer Electronics Expo.",
  },
  {
    id: "pdf-2",
    title: "News Release in Nepali",
    size: "4.8 MB PDF",
    href: "/media/expo-guidebook-2026.pdf",
    type: "pdf",
    description: "News paper coverage regarding the 5th Nepal Electric, Power, Light & Consumer Electronics International Expo 2026.",
  },
  {
    id: "img-1",
    title: "Official Expo HD Banner",
    size: "1.8 MB JPG",
    href: "/media/expo-banner-hd.jpeg",
    previewUrl: "/media/expo-banner-hd.jpeg",
    type: "image",
    description: "High-resolution main poster image for news publishing.",
  },
  {
    id: "img-2",
    title: "Inauguration Stage Visual",
    size: "2.1 MB JPG",
    href: "/media/inauguration-ceremony.jpeg",
    previewUrl: "/media/inauguration-ceremony.jpeg",
    type: "image",
    description: "Official stage setup photo with event branding.",
  },
  {
    id: "img-3",
    title: "Exhibition Hall Overview",
    size: "3.5 MB JPG",
    href: "/media/exhibition-floor-view.jpeg",
    previewUrl: "/media/exhibition-floor-view.jpeg",
    type: "image",
    description: "Wide angle shot of Bhrikutimandap expo floor.",
  },
  {
    id: "img-4",
    title: "Consumer Electronics Zone",
    size: "2.9 MB JPG",
    href: "/media/consumer-electronics-zone.jpeg",
    previewUrl: "/media/consumer-electronics-zone.jpeg",
    type: "image",
    description: "Snapshots of home appliances and smart tech stalls.",
  },
  {
    id: "img-5",
    title: "Power & Energy Stalls",
    size: "3.1 MB JPG",
    href: "/media/power-energy-stalls.jpeg",
    previewUrl: "/media/power-energy-stalls.jpeg",
    type: "image",
    description: "Lighting and renewable power tech exhibits.",
  },
];

const mediaCoverage: MediaItem[] = [
  { title: "भृकुटीमण्डपमा विद्युत् र इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी हुने", source: "Kantipur Press", href: "https://kantipurpress.com/2026/3912/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "Banijya Post", href: "https://banijyapost.com/news/electronic-expo" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्स प्रदर्शनी", source: "Britant News", href: "https://britantnews.com/2026/08/20/48945/electrical-and-electronics-exhibition-in-kathmandu-from-bhadra-19/" },
  { title: "भदौ १९ देखि विद्युत् तथा इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी, १०० बढी कम्पनी सहभागी हुने", source: "Bizpati", href: "https://bizpati.com/2026/08/214988/" },
  { title: "'नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३' आयोजना हुँदै", source: "Bizshala", href: "https://bizshala.com/article/31906" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "Equity Nepal", href: "https://equitynepal.com/2026/08/20/97987/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "Mountain Khabar", href: "https://www.mountainkhabar.com/2026/08/20/235570/" },
  { title: "नेपाल इलेक्ट्रिक तथा कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुने", source: "Hamro Artha", href: "https://hamroartha.com/news/134973" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "CNN Khabar", href: "https://cnnkhabar.com/content/15606" },
  { title: "भदौ १९ गतेदेखि २१ गतेसम्म इलेक्ट्रिक तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Corporate Khabar", href: "https://corporatekhabar.com/electric-and-electronics/" },
  { title: "१०० भन्दा बढी इलेक्ट्रिकल तथा इलेक्ट्रोनिक्स कम्पनीहरूको प्रदर्शनी", source: "Aarthik News", href: "https://aarthiknews.com/news/125753/exhibition-of-more-than-100-electrical-and/" },
  { title: "भदौ १९ देखि विद्युत्, इलेक्ट्रोनिक्स तथा होम अप्लायन्सेसको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Arthakoartha", href: "https://arthakoartha.com/archives/115373" },
  { title: "काठमाडौंमा भदौ १९ देखि 'नेपाल इलेक्ट्रिक, पावर, लाइट तथा कन्ज्युमर इलेक्ट्रोनिक्स' प्रदर्शनी हुने", source: "Merolagani", href: "https://merolagani.com/NewsDetail.aspx?newsID=129907" },
  { title: "भदौ १९ देखि भृकुटीमण्डपमा विद्युत् तथा इलेक्ट्रोनिक्ससम्बन्धी अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Arthabazar", href: "https://arthabazar.com/131948" },
  { title: "भदौ १९ देखि प्रदर्शनी हुँदै", source: "Arthapranali", href: "https://arthapranali.com/2026/08/33701/" },
  { title: "भृकुटीमण्डपमा विद्युत, ऊर्जा र विद्युतीय उपकरणको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै, ३० हजारभन्दा बढी आगन्तुकको अपेक्षा", source: "Nepal Profit", href: "https://nepalprofit.com/2026/08/58753/" },
  { title: "नेपाल इलेक्ट्रिक तथा कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "Notebazar", href: "https://notebazar.com/news/2026/08/20/165322/" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Sourya Online", href: "https://www.souryaonline.com/2026/08/727407.html" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी हुँदै", source: "Corporate Nepal", href: "https://www.corporatenepal.com/story/285416" },
  { title: "भदौ १९ देखि भृकुटीमण्डपमा 'नेपाल इलेक्ट्रिक, पावर तथा कन्ज्युमर इलेक्ट्रोनिक्स' अन्तर्राष्ट्रिय प्रदर्शनी हुने", source: "Bittiya Post", href: "https://www.bittiyapost.com/news/2026/08/20/25903" },
  { title: "भदौ १९ देखि विद्युत्, इलेक्ट्रोनिक्स तथा होम अप्लायन्सेसको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Artha Nepal", href: "https://arthanepal.com/2026/08/115866/" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Sagarmatha Pana", href: "https://sagarmathapana.com/news/36952" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "Hulak Sanchar", href: "https://www.hulaksanchar.com/2026/08/20/14/118244/" },
  { title: "भदौ १९ देखि काठमाडौंमा नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी", source: "Arthikpati", href: "https://www.arthikpati.com/content/2026/08/20/143984" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी हुँदै", source: "Karobar Daily", href: "https://www.karobardaily.com/news/407691" },
  { title: "भदौ १९ गतेदेखि २१ गतेसम्म इलेक्ट्रिक तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Pahilo Awaj", href: "https://pahiloawaj.com/2026/08/20/12/593/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट एण्ड नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी आयोजना हुँदै", source: "Nagarik News", href: "https://nagariknews.nagariknetwork.com/Bazar/nepal-electric-power-light-and-nepal-consumer-electronics-and-home-appliances-international-exhibition-being-organized-16-71.html" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Desh Sanchar", href: "https://deshsanchar.com/2026/08/20/1217993/" },
  { title: "काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Arthik Pati", href: "https://www.arthikpati.com/content/2026/08/20/143984" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Ukeraa", href: "https://www.ukeraa.com/news/detail/178951/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी आयोजना हुँदै", source: "News of Nepal", href: "https://newsofnepal.com/2026/08/20/783098/" },
  { title: "भदौ १९ देखि भृकुटीमण्डपमा विद्युत् प्रदर्शनी", source: "Nepal Purbadhar", href: "https://nepalpurbadhar.com/53641/" },
  { title: "विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Corporate Bazar", href: "https://corporatebazar.com/corporate-bazar/45013.html" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी आयोजना हुँदै", source: "Kendrabindu", href: "https://kendrabindu.com/economy/547552/" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Arthatantra", href: "https://www.arthatantra.com/2026/08/20/230699/" },
  { title: "भृकुटीमण्डपमा विद्युत्, इलेक्ट्रोनिक्स तथा होम अप्लायन्सेसको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Kalika Khabar", href: "https://kalikakhabar.com/bhrikutiimn-dpma-wid-yut-ilek-t-ronik-s-ttha-hom-ap-layn-sesko-an-tr-rash-t-riy-p-rdr-shnii-hundai/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी आयोजना हुँदै", source: "Bizness Views", href: "https://biznessviews.com/market/62893/" },
  { title: "प्रदर्शनी सम्बन्धी आधिकारिक अपडेट (Official Notice)", source: "Facebook", href: "https://www.facebook.com/share/1E4A3Nvhe4/" },
];

const uniqueSources = Array.from(new Set(mediaCoverage.map((item) => item.source)));

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
                Featured In <span className="text-[#35a8e0]">{mediaCoverage.length}+</span> Publications
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
                <div className="text-2xl font-black text-white">{uniqueSources.length}+</div>
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
                duration: 80, // Duration badha di hai for slow & smooth movement
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

        {/* 📥 DOWNLOADABLE PRESS ASSETS SECTION */}
        <div className="mt-16">
          <SectionHeading
            title="Press Kit & Downloadable Media"
            // description="Download high-res event images, press releases, and official exhibition guides."
          />

          {/* 📄 PDF SECTION */}
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#05756a] flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4" /> Press Documents (PDF)
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {pdfAssets.map((pdf) => (
                <div
                  key={pdf.id}
                  className="group flex flex-col justify-between rounded-2xl border border-[#dce4e6] bg-white p-5 shadow-sm hover:border-[#05756a] hover:shadow-md transition-all"
                >
                  <div className="flex gap-4">
                    <div className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-rose-50 to-rose-100 border border-rose-200 text-rose-600 shadow-inner">
                      <FileText className="h-7 w-7" />
                      <span className="text-[9px] font-black uppercase mt-0.5">PDF</span>
                    </div>
                    <div>
                    
                      <h4 className="text-base font-bold text-[#14212b] group-hover:text-[#05756a] transition-colors leading-snug">
                        {pdf.title}
                      </h4>
                      <p className="mt-1 text-xs text-[#5b6b74] line-clamp-2">
                        {pdf.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 pt-3 border-t border-[#dce4e6]/60">
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
                      className="inline-flex items-center justify-center rounded-xl border border-[#dce4e6] p-2.5 text-[#5b6b74] hover:bg-[#f5f8f9] hover:text-[#14212b] transition-colors"
                      title="View PDF"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🖼️ HIGH-RES IMAGES SECTION (CLEAN PORTRAIT / CUTOUT FRIENDLY) */}
          <div className="mt-12">
        

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {imageAssets.map((img) => (
                <div
                  key={img.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dce4e6] bg-white shadow-sm hover:border-[#35a8e0] hover:shadow-xl transition-all duration-300"
                >
                  {/* Clean Image Container with Natural Aspect Ratio */}
                  <div className="relative w-full bg-[#f8fafc] p-3 flex items-center justify-center border-b border-[#dce4e6]/60">
                    {/* Size Tag Badge */}
                 

                    <img
                      src={img.previewUrl || "/placeholder.jpg"}
                      alt={img.title || "Press Clipping"}
                      className="w-full h-auto max-h-[420px] object-contain rounded-lg shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Card Content & Download Bar */}
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

        {/* 📰 ONLINE NEWS COVERAGE LISTING */}
        <div className="mt-16">
          <SectionHeading
            description="Verified press links from leading Nepali news platforms."
            title="Press Articles & Media Highlights"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {mediaCoverage.map((item, index) => (
              <motion.a
                key={`${item.href}-${index}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#dce4e6] bg-white p-5 shadow-sm hover:border-[#35a8e0] hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f8f9] border border-[#dce4e6] px-3 py-1 text-[11px] font-bold text-[#05756a]">
                      <Newspaper className="h-3 w-3 text-[#35a8e0]" />
                      {item.source}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#5b6b74] group-hover:text-[#35a8e0] transition-colors" />
                  </div>

                  <h3 className="mt-3 text-sm font-bold leading-snug text-[#14212b] group-hover:text-[#2688b8] transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-[#dce4e6]/60 flex items-center justify-between text-xs font-semibold text-[#5b6b74] group-hover:text-[#05756a] transition-colors">
                  <span>Read full story</span>
                  <span className="text-[#35a8e0]">→</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Container>
    </>
  );
}