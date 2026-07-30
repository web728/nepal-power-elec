import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/layout/skip-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileBar } from "@/components/layout/sticky-mobile-bar";
import { ConsentBanner } from "@/components/layout/consent-banner";
import { ToastProvider } from "@/components/ui/toast";
import { OrganizationJsonLd, EventJsonLd } from "@/components/seo/json-ld";
import { AnalyticsScripts } from "@/components/seo/analytics-scripts";
import { siteConfig } from "@/lib/site-config";

// Poppins is the branding guide's only approved typeface (Regular/Medium/
// Bold) — see docs/FILE_INVENTORY.md, conflict #2, for why this overrides
// the design spec's "Inter" recommendation.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.eventName} | ${siteConfig.dates.display}, ${siteConfig.venue.city}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "Nepal electric expo",
    "Nepal power exhibition",
    "electrical exhibition Kathmandu",
    "lighting expo Nepal",
    "renewable energy expo Nepal",
    "power and energy trade show Nepal",
    "Bhrikuti Mandap exhibition",
    "electrical trade fair Nepal 2026",
  ],
  authors: siteConfig.organizers.map((o) => ({ name: o.name })),
  verification: {
    google: "TDIdPkUrusKHPTwtgGrFVVXlKAcfT0G14yTkocbOS4E",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.eventName,
    title: siteConfig.eventName,
    description: siteConfig.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.eventName,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-ink">
        <AnalyticsScripts />
        <OrganizationJsonLd />
        <EventJsonLd />
        <ToastProvider>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1 pb-16 xl:pb-0">
            {children}
          </main>
          <Footer />
          <StickyMobileBar />
          <ConsentBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
