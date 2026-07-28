import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";
import { galleryImageCaption } from "@/lib/content/home-content";

const images = [
  {
    src: "/images/gallery/2025/nepal-electric-expo-2025-glimpses-01.webp",
    alt: "Collage of photographs of exhibitor stands and visitors at the 2025 edition of the Nepal Electric, Power and Lights Expo",
  },
  {
    src: "/images/gallery/2025/nepal-electric-expo-2025-glimpses-02.webp",
    alt: "Collage of photographs of the exhibition floor and business meetings at the 2025 edition of the Nepal Electric, Power and Lights Expo",
  },
];

export function GallerySection() {
  return (
    <section className="bg-bg py-16 sm:py-22">
      <Container>
        <SectionHeading
          eyebrow="Past Edition"
          title="2025 Edition Evidence"
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {images.map((image) => (
            <figure
              key={image.src}
              className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="relative aspect-[1600/1131] w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm text-muted">{galleryImageCaption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/past-editions/photo-gallery" variant="secondary" size="md">
            View Photo Gallery
          </Button>
          <TrackedLink
            event={AnalyticsEvents.REPORT_DOWNLOAD}
            params={{ source: "gallery_section" }}
            href="/downloads/Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-1.5 text-base font-semibold text-teal underline underline-offset-4 hover:text-teal-dark"
          >
            Download Post-Show Report
          </TrackedLink>
        </div>
      </Container>
    </section>
  );
}
