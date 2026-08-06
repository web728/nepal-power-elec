export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// Final public navigation. "Exhibitors" is intentionally absent — it stays
// hidden until verified 2026 exhibitor profiles exist (see FILE_INVENTORY.md
// and the design spec's IA rules).
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about-the-expo",
    children: [
      { label: "About the Expo", href: "/about-the-expo" },
      { label: "Event History", href: "/event-history" },
      { label: "Organizers", href: "/organizers" },
      { label: "Venue", href: "/venue" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "Exhibit",
    href: "/why-exhibit",
    children: [
      { label: "Why Exhibit", href: "/why-exhibit" },
      { label: "Exhibitor Profile", href: "/exhibitor-profile" },
      { label: "Exhibitor Categories", href: "/exhibitor-categories" },
      { label: "Book a Stand", href: "/book-a-stand" },
      { label: "Exhibitor FAQ", href: "/exhibitor-faq" },
    ],
  },
  {
    label: "Visit",
    href: "/why-visit",
    children: [
      { label: "Why Visit", href: "/why-visit" },
      { label: "Visitor Profile", href: "/visitor-profile" },
      { label: "Register to Visit", href: "https://exporegistration.in/nepalpowerelec-visitor.aspx" },
      { label: "Plan Your Visit", href: "/plan-your-visit" },
      { label: "Visitor FAQ", href: "/visitor-faq" },
    ],
  },
  {
    label: "Past Editions",
    href: "/past-editions/2025-edition",
    children: [
      { label: "2025 Edition", href: "/past-editions/2025-edition" },
      { label: "Post-Show Statistics", href: "/past-editions/post-show-statistics" },
      { label: "Media Coverage", href: "/past-editions/media-coverage" },
    ],
  },
  {
    label: "Media",
    href: "/news",
    children: [
      { label: "News", href: "/news" },
      { label: "Press Releases", href: "/press-releases" },
      { label: "Photo Gallery", href: "/past-editions/photo-gallery" },
      // { label: "Media Enquiry", href: "/media-enquiry" },
    ],
  },
  {
    label: "Downloads",
    href: "/downloads",
    children: [
      { label: "2026 Event Brochure", href: "/downloads/2026-event-brochure" },
      { label: "2025 Post-Show Report", href: "/downloads/2025-post-show-report" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks = [
  { label: "About the Expo", href: "/about-the-expo" },
  { label: "Why Exhibit", href: "/why-exhibit" },
  { label: "Register to Visit", href: "https://exporegistration.in/nepalpowerelec-visitor.aspx" },
  { label: "Downloads", href: "/downloads" },
  { label: "Contact Us", href: "/contact" },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Sitemap", href: "/sitemap" },
];
