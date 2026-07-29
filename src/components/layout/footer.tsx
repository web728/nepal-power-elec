import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { footerLegalLinks, footerQuickLinks } from "@/lib/content/nav";
import { siteConfig } from "@/lib/site-config";
import { CookieSettingsButton } from "@/components/layout/cookie-settings-button";
import { MapPin, ExternalLink } from "lucide-react";

// Inline SVG Social Icons for zero-dependency build safety
function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  );
}

function TwitterIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
  );
}

export function Footer() {
  const facebookPageUrl = encodeURIComponent("https://www.facebook.com/100940879513531");

  return (
    <footer className="relative overflow-hidden bg-teal-dark text-white/80">
      {/* 1. Background Image */}
      <Image
        src="/images/hero/Electric_Power_Transmission_and_Distribution_Equipment_Market_A.jpg"
        alt="Footer Background"
        fill
        className="object-cover object-center pointer-events-none opacity-20"
        sizes="100vw"
      />

      {/* 2. Dark Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-teal-dark/95 via-teal-dark/90 to-teal-dark/95 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content */}
      <Container className="relative z-10 py-14">
        {/* Top Section: Quick Links & Information */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col justify-between">
            <div>
              <Image src={siteConfig.eventLogo} alt="" width={200} height={54} className="h-20 w-auto" />
              <p className="mt-4 text-sm font-medium leading-relaxed text-white/90">{siteConfig.eventName}</p>
              <p className="mt-1 text-sm text-white/70">{siteConfig.dates.display}</p>
              <p className="mt-1 text-sm text-white/70">{siteConfig.venue.full}</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-yellow">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Jointly Organised By */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
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

          {/* Column 4: Location Map */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Event Venue Map
            </h3>
            <div className="overflow-hidden rounded-xl border border-white/20 shadow-md">
              <iframe
                title="Bhrikuti Mandap Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.482701886867!2d85.31692407632626!3d27.70238397618451!2m3!1f0!0f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ab91cb8ef7%3A0x7d6c6e7bb46376eb!2sBhrikuti%20Mandap!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="135"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.google.com/maps?ll=27.701453,85.319499&z=13&t=m&hl=en-US&gl=US&mapclient=embed&q=Bhrikuti%20Mandap%20Kathmandu%2044600%20Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-yellow hover:underline"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Get Directions on Google Maps &rarr;</span>
            </a>
          </div>
        </div>

        {/* Section 2: Social Media & Newsletter */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Newsletter Column */}
            <div className="lg:col-span-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Stay Updated</h3>
              <p className="mb-4 text-sm text-white/80">
                Receive verified announcements about registration, documents and previous-edition highlights.
              </p>
              <NewsletterForm compact />
            </div>

            {/* Social Media & Widget Column */}
            <div className="lg:col-span-7">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Follow Us On Social Media
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Left Side: Facebook Live Feed Widget */}
                <div className="overflow-hidden rounded-xl border border-white/15 bg-white/5 p-2 shadow-sm">
                  <iframe
                    title="Facebook Page Feed"
                    src={`https://www.facebook.com/plugins/page.php?href=${facebookPageUrl}&tabs=timeline&width=340&height=180&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                    width="100%"
                    height="180"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>

                {/* Right Side: Other Social Platforms */}
                <div className="flex flex-col justify-between gap-3">
                  {/* X / Twitter Card */}
                  <a
                    href="https://x.com/nepalpowerelec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3.5 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/40 text-white">
                        <TwitterIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-yellow">X (Twitter)</p>
                        <p className="text-xs text-white/60">@nepalpowerelec</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-white/40 transition-colors group-hover:text-yellow" />
                  </a>

                  {/* LinkedIn Card */}
                  <a
                    href="https://www.linkedin.com/company/nepalpowerelec/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3.5 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A66C2]/20 text-[#0A66C2]">
                        <LinkedinIcon className="h-5 w-5 fill-current" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-yellow">LinkedIn</p>
                        <p className="text-xs text-white/60">Nepal Power Elec Expo</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-white/40 transition-colors group-hover:text-yellow" />
                  </a>
                </div>
              </div>
            </div>
          </div>
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