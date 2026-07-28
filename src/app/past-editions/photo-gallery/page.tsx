import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: { absolute: "Photo Gallery | Nepal Electric, Power and Lights Expo" },
  description: "View photographs from the 2025 Nepal Electric, Power and Lights International Expo in Kathmandu.",
  alternates: { canonical: "/past-editions/photo-gallery" },
};

const galleryImages = [
  {
    src: "/images/gallery/2025/nepal-electric-expo-2025-glimpses-01.webp",
    alt: "Exhibition floor, stands and visitor activity at the 2025 Nepal Electric, Power and Lights Expo",
  },
  {
    src: "/images/gallery/2025/nepal-electric-expo-2025-glimpses-02.webp",
    alt: "Exhibitor product displays and business discussions at the 2025 Nepal Electric, Power and Lights Expo",
  },
];

export default function PhotoGalleryPage() {
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

        <div className="mt-10">
          <SectionHeading title="Gallery Categories" />
          <div className="mt-4 flex flex-wrap gap-2">
            {galleryCategories.map((category) => (
              <Badge key={category} tone="teal">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {galleryImages.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-xl border border-border">
              <Image
                src={image.src}
                alt={image.alt}
                width={1600}
                height={1131}
                className="h-auto w-full"
              />
              <figcaption className="border-t border-border bg-bg px-4 py-3 text-sm text-muted">
                {galleryImageCaption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-yellow/40 bg-yellow/10 px-5 py-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-semibold">Image notice: </span>
            Companies or individuals shown in photographs from the 2025 edition are not
            automatically confirmed for the 2026 edition. Images should be used only where the
            organizers hold the relevant publication rights.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/past-editions/2025-edition" variant="primary">
            View 2025 Edition
          </Button>
          <Button href="/downloads/2025-post-show-report" variant="outline">
            Download Post-Show Report
          </Button>
        </div>
      </Container>
    </>
  );
}
