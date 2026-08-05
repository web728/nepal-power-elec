"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { galleryCategories, galleryImageCaption } from "@/lib/content/home-content";

const breadcrumbs = [
  { label: "Past Editions", href: "/past-editions/2025-edition" },
  { label: "Photo Gallery" },
];

// 50+ Images Array (Yahan aap apni 50+ images ka path add kar sakte hain)
const ALL_GALLERY_IMAGES = [
  {
    id: 1,
    src: "/uploads/0L1A2211-min-1-1024x683.jpg",
    alt: "Inauguration ceremony and ribbon cutting",
  },
  {
    id: 2,
    src: "/uploads/0L1A2244-min-1-1024x683.jpg",
    alt: "Visitors exploring exhibition stalls",
  },
  {
    id: 3,
    src: "/uploads/0L1A2242-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
  }, 
  {
    id: 4,
    src: "/uploads/0L1A2289-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 5,
    src: "/uploads/0L1A2300-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 6,
    src: "/uploads/0L1A2354-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 7,
    src: "/uploads/0L1A2376-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 8,
    src: "/uploads/0L1A2508-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 9,
    src: "/uploads/0L1A2531-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 10,
    src: "/uploads/0L1A2644-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 11,
    src: "/uploads/0L1A2654-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 12,
    src: "/uploads/0L1A2661-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 13,
    src: "/uploads/559A5344-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 14,
    src: "/uploads/559A5345-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 15,
    src: "/uploads/559A5349-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 16,
    src: "/uploads/559A5397-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 17,
    src: "/uploads/559A5399-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 18,
    src: "/uploads/559A5403-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 19,
    src: "/uploads/559A5415-min.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 20,
    src: "/uploads/AYU_7369-min.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 21,
    src: "/uploads/AYU_7371-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 22,
    src: "/uploads/AYU_7380-min-1-1024x683.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 23,
    src: "/uploads/AYU_7429-min-1-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 24,
    src: "/uploads/AYU_7443-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 25,
    src: "/uploads/AYU_7456-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 26,
    src: "/uploads/AYU_7723-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 27,
    src: "/uploads/AYU_7862-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 28,
    src: "/uploads/AYU_7898-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 29,
    src: "/uploads/AYU_7905-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 30,
    src: "/uploads/AYU_7962-min-1536x1024.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 31,
    src: "/uploads/IMG_8240-min-1536x1022.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 32,
    src: "/uploads/IMG_8276-min-300x200.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 33,
    src: "/uploads/IMG_8300-min-2048x1363.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 34,
    src: "/uploads/IMG_8531-min-1536x1022.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 35,
    src: "/uploads/IMG_8549-min-2048x1363.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 36,
    src: "/uploads/IMG_8555-min-1536x1022.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 37,
    src: "/uploads/IMG_8557-min-1536x1022.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 38,
    src: "/uploads/np3-1024x681.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 39,
    src: "/uploads/np7-1024x681.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 40,
    src: "/uploads/np12-1024x681.jpg",
    alt: "Electrical equipment demonstration on floor",
  },
  {
    id: 41,
    src: "/uploads/np18-1024x681.jpg",
    alt: "Exhibitors group photo at the closing event",
  },
];

const INITIAL_LOAD_COUNT = 9; // Pehle 12 load honge
const LOAD_MORE_STEP = 9;     // Har click par 12 extra render honge

export default function PhotoGalleryPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

  const visibleImages = ALL_GALLERY_IMAGES.slice(0, visibleCount);
  const hasMoreImages = visibleCount < ALL_GALLERY_IMAGES.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, ALL_GALLERY_IMAGES.length));
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Past Editions", href: "/past-editions/2025-edition" },
          { label: "Photo Gallery", href: "/past-editions/photo-gallery" },
        ]}
      />
      <PageHero title="Images from the 2025 Edition" breadcrumbs={breadcrumbs} />

      <Container as="section" className="py-12 sm:py-16">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          Explore photographs showing the opening ceremony, exhibition stands, product displays,
          visitor interactions and business discussions during the fourth edition in Kathmandu.
        </p>

        {/* Categories */}
        <div className="mt-10">
          <SectionHeading title="Gallery Categories" />
        </div>

        {/* Performance-Optimized Grid Layout */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleImages.map((image, index) => (
            <figure
              key={image.id}
              className="group overflow-hidden rounded-xl border border-border bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-md"
            >
              <div className="relative aspect-[1600/1131] w-full overflow-hidden rounded-lg bg-bg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  // Pehli 6 images immediate load honge, baaki lazily download hongi performance bachaane ke liye
                  priority={index < 6}
                  loading={index < 6 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                
               
              </div>
            </figure>
          ))}
        </div>

        {/* Load More Trigger */}
        {hasMoreImages && (
          <div className="mt-12 flex flex-col items-center justify-center gap-2">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="border-teal text-teal hover:bg-teal hover:text-white"
            >
              Load More Photos
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-14 flex flex-wrap gap-3 border-t border-border pt-8">
          <Button href="/past-editions/2025-edition" variant="primary">
            View 2025 Edition Summary
          </Button>
          <Button href="/downloads/2025-post-show-report" variant="outline">
            Download Post-Show Report
          </Button>
        </div>
      </Container>
    </>
  );
}