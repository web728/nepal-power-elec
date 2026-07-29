import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { footerLegalLinks, footerQuickLinks } from "@/lib/content/nav";
import { siteConfig } from "@/lib/site-config";
import { CookieSettingsButton } from "@/components/layout/cookie-settings-button";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-dark text-white/80">
      {/* 1. Background Image */}
      <Image
        src="/images/hero/Electric_Power_Transmission_and_Distribution_Equipment_Market_A.jpg" 
        alt="Footer Background"
        fill
        className="object-cover object-center pointer-events-none opacity-110" 
        sizes="100vw"
      />

      {/* 2. Dark Overlay / Gradient (Text readability ke liye) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-teal-dark/95 via-teal-dark/90 to-teal-dark/95 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content (Z-Index ke sath) */}
      <Container className="relative z-10 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src={siteConfig.eventLogo} alt="" width={200} height={54} className="h-23 w-auto" />
            <p className="mt-4 text-sm leading-relaxed">{siteConfig.eventName}</p>
            <p className="mt-2 text-sm leading-relaxed">{siteConfig.dates.display}</p>
            <p className="mt-2 text-sm leading-relaxed">{siteConfig.venue.full}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Quick Links</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-yellow">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
              Jointly Organised By
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {siteConfig.organizers.map((org) => (
                <li key={org.key} className="text-white/80">
                  {org.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-10">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Stay Updated</h3>
          <p className="mb-4 max-w-md text-sm">
            Receive verified announcements about registration, documents and previous-edition highlights.
          </p>
          <NewsletterForm compact />
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.eventName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-yellow">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}