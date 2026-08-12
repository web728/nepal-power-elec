"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Sparkles, 
  ArrowRight,
  Download
} from "lucide-react";

const breadcrumbs = [
  { label: "Past Editions", href: "/past-editions/2025-edition" },
  { label: "Photo Gallery" },
];

const ALL_GALLERY_IMAGES = [
  {
    id: 1,
    src: "/uploads/0L1A2211-min-1-1024x683.jpg",
    alt: "Inauguration ceremony and ribbon cutting",
    category: "Inauguration",
  },
  {
    id: 2,
    src: "/uploads/0L1A2244-min-1-1024x683.jpg",
    alt: "Visitors exploring exhibition stalls",
    category: "Exhibition Floor",
  },
  {
    id: 3,
    src: "/uploads/0L1A2242-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Products & Demos",
  },
  {
    id: 4,
    src: "/uploads/0L1A2289-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Products & Demos",
  },
  {
    id: 5,
    src: "/uploads/0L1A2300-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 6,
    src: "/uploads/0L1A2354-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 7,
    src: "/uploads/0L1A2376-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Products & Demos",
  },
  {
    id: 8,
    src: "/uploads/0L1A2508-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 9,
    src: "/uploads/0L1A2531-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "B2B Meetings",
  },
  {
    id: 10,
    src: "/uploads/0L1A2644-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 11,
    src: "/uploads/0L1A2654-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Products & Demos",
  },
  {
    id: 12,
    src: "/uploads/0L1A2661-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Products & Demos",
  },
  {
    id: 13,
    src: "/uploads/559A5344-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 14,
    src: "/uploads/559A5345-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 15,
    src: "/uploads/559A5349-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "B2B Meetings",
  },
  {
    id: 16,
    src: "/uploads/559A5397-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 17,
    src: "/uploads/559A5399-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Products & Demos",
  },
  {
    id: 18,
    src: "/uploads/559A5403-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 19,
    src: "/uploads/559A5415-min.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 20,
    src: "/uploads/AYU_7369-min.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Inauguration",
  },
  {
    id: 21,
    src: "/uploads/AYU_7371-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Inauguration",
  },
  {
    id: 22,
    src: "/uploads/AYU_7380-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 23,
    src: "/uploads/AYU_7429-min-1-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 24,
    src: "/uploads/AYU_7443-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Products & Demos",
  },
  {
    id: 25,
    src: "/uploads/AYU_7456-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 26,
    src: "/uploads/AYU_7723-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Products & Demos",
  },
  {
    id: 27,
    src: "/uploads/AYU_7862-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "B2B Meetings",
  },
  {
    id: 28,
    src: "/uploads/AYU_7898-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 29,
    src: "/uploads/AYU_7905-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 30,
    src: "/uploads/AYU_7962-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Products & Demos",
  },
  {
    id: 31,
    src: "/uploads/IMG_8240-min-1536x1022.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 32,
    src: "/uploads/IMG_8276-min-300x200.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 33,
    src: "/uploads/IMG_8300-min-2048x1363.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Products & Demos",
  },
  {
    id: 34,
    src: "/uploads/IMG_8531-min-1536x1022.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 35,
    src: "/uploads/IMG_8549-min-2048x1363.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "B2B Meetings",
  },
  {
    id: 36,
    src: "/uploads/IMG_8555-min-1536x1022.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 37,
    src: "/uploads/np3-1024x681.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 38,
    src: "/uploads/np12-1024x681.jpg",
    alt: "Electrical equipment demonstration on floor",
    category: "Exhibition Floor",
  },
  {
    id: 39,
    src: "/uploads/np18-1024x681.jpg",
    alt: "Exhibitors group photo at the closing event",
    category: "Closing Ceremony",
  },
];

const INITIAL_LOAD_COUNT = 9;
const LOAD_MORE_STEP = 9;

export default function PhotoGalleryPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const visibleImages = ALL_GALLERY_IMAGES.slice(0, visibleCount);
  const hasMoreImages = visibleCount < ALL_GALLERY_IMAGES.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, ALL_GALLERY_IMAGES.length));
  };

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const navigateLightbox = useCallback((direction: "next" | "prev") => {
    if (activeImageIndex === null) return;
    if (direction === "next") {
      setActiveImageIndex((prev) => (prev! + 1) % ALL_GALLERY_IMAGES.length);
    } else {
      setActiveImageIndex((prev) => (prev! - 1 + ALL_GALLERY_IMAGES.length) % ALL_GALLERY_IMAGES.length);
    }
  }, [activeImageIndex]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Past Editions", href: "/past-editions/2025-edition" },
          { label: "Photo Gallery", href: "/past-editions/photo-gallery" },
        ]}
      />
      
      <PageHero title="Official Photo Gallery — 2025 Edition" breadcrumbs={breadcrumbs} />

      <Container as="section" className="py-12 sm:py-20">
        
        {/* Intro Meta Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
              <Camera className="h-3.5 w-3.5" />
              <span>Event Highlights</span>
            </div>
            <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
              Highlights from the 4th Nepal Electric Expo
            </h2>
            <p className="mt-2 text-base leading-relaxed text-slate-600">
              Browse through high-resolution captures of inaugural ceremonies, live product demonstrations, 
              high-impact B2B networking sessions, and trade visitor crowds in Kathmandu.
            </p>
          </div>

          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
              <Sparkles className="h-4 w-4 text-teal" />
              <span>Showing Photos</span>
            </div>
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleImages.map((image, index) => (
            <figure
              key={image.id}
              onClick={() => openLightbox(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={index < 6}
                  loading={index < 6 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-between p-4">
                  <span className="text-xs font-semibold text-white drop-shadow-xs line-clamp-1">
                    {image.alt}
                  </span>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition-transform group-hover:scale-110">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </figure>
          ))}
        </div>

        {/* Load More Controller */}
        {hasMoreImages && (
          <div className="mt-12 flex flex-col items-center justify-center gap-3">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="border-teal text-teal hover:bg-teal hover:text-white transition-all duration-200 px-8 py-2.5 rounded-full font-bold shadow-2xs"
            >
                 Photos
            </Button>
          </div>
        )}

        {/* Action Callout Bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Want full event statistics and coverage?</h3>
            <p className="mt-1 text-sm text-slate-600">Download the complete post-show report with comprehensive data.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button href="/past-editions/2025-edition" variant="outline" className="gap-2">
              <span>2025 Summary</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/downloads/2025-post-show-report" variant="primary" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Post-Show Report</span>
            </Button>
          </div>
        </div>

      </Container>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Lightbox Header Controls */}
          <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
              {activeImageIndex + 1} / {ALL_GALLERY_IMAGES.length}
            </span>
            <button
              onClick={closeLightbox}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-800 transition-colors"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Lightbox Image View */}
          <div 
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={ALL_GALLERY_IMAGES[activeImageIndex].src}
              alt={ALL_GALLERY_IMAGES[activeImageIndex].alt}
              width={1600}
              height={1000}
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
            <div className="bg-slate-900/90 p-4 text-center border-t border-slate-800">
              <p className="text-sm font-medium text-slate-200">
                {ALL_GALLERY_IMAGES[activeImageIndex].alt}
              </p>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-800 transition-colors"
            aria-label="Next Image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}