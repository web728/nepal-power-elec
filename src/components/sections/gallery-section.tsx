import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";
import { galleryImageCaption } from "@/lib/content/home-content";

// 6 Images configuration with titles using your exact assets
const images = [
  {
    src: "/uploads/0L1A2244-min-1-1024x683.jpg",
    alt: "Collage of photographs of exhibitor stands and visitors at the 2025 edition of the Nepal Electric, Power and Lights Expo",
    title: "Exhibition Floor Highlights",
  },
  {
    src: "/uploads/np18-1024x681.jpg",
    alt: "Collage of photographs of the exhibition floor and business meetings at the 2025 edition of the Nepal Electric, Power and Lights Expo",
    title: "Business & B2B Meetings",
  },
  {
    src: "/uploads/559A5415-min.jpg",
    alt: "Inauguration ceremony and keynote speeches",
    title: "Inauguration Ceremony",
  },
  {
    src: "/uploads/AYU_7443-min-1536x1024.jpg",
    alt: "Product demonstrations on the expo floor",
    title: "Product Demonstrations",
  },
  {
    src: "/uploads/AYU_7369-min.jpg",
    alt: "International delegates visiting exhibition stalls",
    title: "Global Trade Delegates",
  },
  {
    src: "/uploads/np7-1024x681.jpg",
    alt: "Power and lighting technology showcases",
    title: "Power Tech Showcase",
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

        {/* Premium 6-Image Grid Layout */}
        <div className="mx-auto mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <figure
              key={image.src + index}
              className="group overflow-hidden rounded-xl border border-border bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-md"
            >
              <div className="relative aspect-[1600/1131] w-full overflow-hidden rounded-lg bg-bg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-teal-dark/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Top Badge */}
                <span className="absolute top-2.5 left-2.5 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-dark shadow-sm backdrop-blur-sm border border-border/50">
                  Glimpse #{index + 1}
                </span>
              </div>

              <div className="px-2 pt-3 pb-1">
                <h3 className="text-sm font-bold text-teal-dark">
                  {image.title}
                </h3>
                <figcaption className="mt-1 text-xs leading-relaxed text-muted">
                  {galleryImageCaption}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Button href="/past-editions/photo-gallery" variant="secondary" size="md">
            View Photo Gallery
          </Button>

          <TrackedLink
            event={AnalyticsEvents.REPORT_DOWNLOAD}
            params={{ source: "gallery_section" }}
            href="/downloads/Nepal-Electric-Power-Lights-Expo-2025-Post-Show-Report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-1.5 text-base font-semibold text-teal underline underline-offset-4 transition-colors hover:text-teal-dark"
          >
            Download Post-Show Report
          </TrackedLink>
        </div>
      </Container>
    </section>
  );
}