import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { footerLegalLinks, footerQuickLinks } from "@/lib/content/nav";
import { siteConfig } from "@/lib/site-config";
import { CookieSettingsButton } from "@/components/layout/cookie-settings-button";
import { MapPin, ExternalLink } from "lucide-react";

// Inline SVG Social Icons (CurrentColor use kar rahe hain taaki parent se color le sakein)
function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function TwitterIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-dark text-white">
      {/* Background Image */}
      <Image
        src="/images/hero/Electric_Power_Transmission_and_Distribution_Equipment_Market_A.jpg"
        alt="Footer Background"
        fill
        className="pointer-events-none object-cover object-center opacity-15"
        sizes="100vw"
        priority
      />

      {/* Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-teal-dark/50 via-teal-dark/80 to-teal-dark"
        aria-hidden="true"
      />

      <Container className="relative z-10 py-12 sm:py-16">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col items-start justify-start">
            <div className="inline-block rounded-xl bg-white p-3 shadow-sm mb-5">
              <Link
                href="/"
                className="flex shrink-0 items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
              >
                <Image
                  src={siteConfig.eventLogo}
                  alt={siteConfig.eventName}
                  width={200}
                  height={60}
                  className="h-16 w-auto max-w-full object-contain"
                />
              </Link>
            </div>
            <p className="text-sm font-semibold leading-relaxed text-white">
              {siteConfig.eventName}
            </p>
            <p className="mt-1.5 text-sm text-white/80">{siteConfig.dates.display}</p>
            <p className="mt-1.5 text-sm text-white/70">{siteConfig.venue.full}</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-5">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white/90">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-white/80 transition-colors hover:text-yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Jointly Organised By (Logo size increased here) */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white/90">
              Jointly Organised By
            </h3>
            <div className="flex flex-col gap-3.5">
              {siteConfig.organizers.map((org: any) => (
                <a
                  key={org.key}
                  href={org.url || "#"}
                  target={org.url ? "_blank" : "_self"}
                  rel={org.url ? "noopener noreferrer" : undefined}
                  title={org.name || "Organizer"}
                  className="group flex h-20 w-full items-center justify-center rounded-xl bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative flex h-full w-full items-center justify-center">
                    {org.logo ? (
                      <Image
                        src={org.logo}
                        alt={org.name || "Organizer Logo"}
                        fill
                        className="object-contain p-0.5 transition-transform duration-200 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    ) : (
                      <span className="text-center text-xs font-bold text-slate-800 px-2 line-clamp-2">
                        {org?.name || "Organizer"}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Location Map */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white/90">
              Event Venue Map
            </h3>
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-md">
              <iframe
                title="Bhrikuti Mandap Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.482701886867!2d85.31692407632626!3d27.70238397618451!2m3!1f0!0f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ab91cb8ef7%3A0x7d6c6e7bb46376eb!2sBhrikuti%20Mandap!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="140"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            <a
              href="https://maps.google.com/maps?ll=27.701453,85.319499&z=13&t=m&hl=en-US&gl=US&mapclient=embed&q=Bhrikuti%20Mandap%20Kathmandu%2044600%20Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs text-yellow transition-opacity hover:opacity-80 hover:underline"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>Get Directions on Google Maps &rarr;</span>
            </a>
          </div>
        </div>

        {/* Section 2: Newsletter & Social Media (Rearranged and Icons Minimized) */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
            
            {/* Newsletter Column */}
            <div className="lg:col-span-6 xl:col-span-7">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Stay Updated
              </h3>
              <p className="mb-5 text-sm text-white/80 max-w-2xl">
                Receive verified announcements about registration, documents and previous-edition highlights straight to your inbox.
              </p>
              <div className="max-w-md">
                <NewsletterForm compact />
              </div>
            </div>

            {/* Social Media Column (Perfectly Arranged & Smaller Icons) */}
            <div className="lg:col-span-6 xl:col-span-5 w-full">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-wider text-white/90">
                  Connect With Us
                </h3>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  {/* Facebook - Compact */}
                  <a
                    href="https://www.facebook.com/100940879513531"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow Nepal Power Elec on Facebook"
                    className="group flex w-full sm:w-auto items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-all duration-200 hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10"
                  >
                    <FacebookIcon className="h-4 w-4 text-[#1877F2] transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                      Facebook
                    </span>
                    <ExternalLink className="h-3 w-3 ml-0.5 text-white/30 group-hover:text-white/60" />
                  </a>

                  {/* X / Twitter - Compact */}
                  <a
                    href="https://x.com/nepalpowerelec"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow @nepalpowerelec on X"
                    className="group flex w-full sm:w-auto items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-all duration-200 hover:border-white/30 hover:bg-black"
                  >
                    <TwitterIcon className="h-4 w-4 text-white transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                      Twitter
                    </span>
                    <ExternalLink className="h-3 w-3 ml-0.5 text-white/30 group-hover:text-white/60" />
                  </a>

                  {/* LinkedIn - Compact */}
                  <a
                    href="https://www.linkedin.com/company/nepalpowerelec/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow Nepal Power Elec on LinkedIn"
                    className="group flex w-full sm:w-auto items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-all duration-200 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10"
                  >
                    <LinkedinIcon className="h-4 w-4 text-[#0A66C2] transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                      LinkedIn
                    </span>
                    <ExternalLink className="h-3 w-3 ml-0.5 text-white/30 group-hover:text-white/60" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/30">
        <Container className="flex flex-col items-center justify-between gap-4 py-5 text-xs text-white/60 sm:flex-row">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {siteConfig.eventName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-yellow">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-l border-white/10 pl-5">
              <CookieSettingsButton />
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}