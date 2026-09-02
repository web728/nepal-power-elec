import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileBar } from "@/components/layout/sticky-mobile-bar";
import { ConsentBanner } from "@/components/layout/consent-banner";
import { ToastProvider } from "@/components/ui/toast";
import { OrganizationJsonLd, EventJsonLd } from "@/components/seo/json-ld";
import { AnalyticsScripts } from "@/components/seo/analytics-scripts";
import { siteConfig } from "@/lib/site-config";

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
  const baseUrl = siteConfig.siteUrl.replace(/\/+$/, "");

  // Google ke valid ItemList / SiteNavigationElement format ke anusaar
  const sitelinksSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": siteConfig.eventName,
        "description": siteConfig.tagline,
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/#navigation`,
        "name": "Main Navigation",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Register to Visit",
            "url": `${baseUrl}/register-to-visit`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Why Exhibit",
            "url": `${baseUrl}/why-exhibit`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Book a Stand",
            "url": `${baseUrl}/book-a-stand`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "About the Expo",
            "url": `${baseUrl}/about-the-expo`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "Venue",
            "url": `${baseUrl}/venue`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 6,
            "name": "Contact",
            "url": `${baseUrl}/contact`,
          },
        ],
      },
    ],
  };

  return (
    <html 
      lang="en" 
      className={`${poppins.variable} h-full antialiased scroll-smooth`} 
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-ink overflow-x-hidden" suppressHydrationWarning>
        <AnalyticsScripts />
        <OrganizationJsonLd />
        <EventJsonLd />
        <ToastProvider>
          <Header />
          <main id="main-content" className="relative flex-1 w-full overflow-x-hidden pb-16 xl:pb-0">
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