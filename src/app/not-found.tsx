import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page Not Found | Nepal Electric, Power and Lights Expo",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-teal-dark py-16 sm:py-24">
      <Container>
        <h1 className="max-w-2xl text-[32px] leading-[1.15] text-white sm:text-[42px]">
          404 — Page Not Found
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          The page you requested may have moved, been removed or entered incorrectly. Use the
          navigation menu or return to the homepage.
        </p>

        <div className="mt-8 max-w-md rounded-lg border border-white/20 bg-white/10 px-5 py-4 text-sm text-white">
          <p className="font-semibold uppercase tracking-wide text-yellow">Event Reminder</p>
          <p className="mt-1">
            {siteConfig.dates.display} · {siteConfig.venue.full}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" variant="primary">
            Return to Home
          </Button>
          <Button href="/about-the-expo" variant="outline-white">
            View Event Information
          </Button>
          <Button href="/contact" variant="ghost" className="text-white hover:bg-white/10">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
