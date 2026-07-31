// Central, editable source of truth for confirmed event facts.
// Update this file (or wire it to the CMS `event_settings` table) to change
// event details site-wide. Every fact here is sourced from the official 2026
// brochure, the 2025 post-show report, and the verified facts supplied in the
// build brief — see docs/FILE_INVENTORY.md for the source-to-fact mapping.

export const siteConfig = {
  eventName: "5th Nepal Electric, Power and Lights International Expo 2026",
  shortName: "Nepal Electric, Power and Lights Expo",
  edition: "5th",
  tagline:
    "Nepal's trade exhibition for the electrical, power, energy and lighting industries — 4-6 September 2026, Kathmandu.",
  marketingLine: "Powering Connections. Advancing Electrical and Energy Business.",
  dates: {
    start: "2026-09-04",
    end: "2026-09-06",
    display: "4-6 September 2026",
  },
  venue: {
    name: "Bhrikuti Mandap Exhibition Hall",
    line1: "Bhrikuti Mandap Exhibition Hall",
    city: "Kathmandu",
    country: "Nepal",
    full: "Bhrikuti Mandap Exhibition Hall, Kathmandu, Nepal",
    mapQuery: "Bhrikuti Mandap Exhibition Hall, Kathmandu",
  },
  previousEdition: {
    edition: "4th",
    dates: { start: "2025-08-29", end: "2025-08-31", display: "29-31 August 2025" },
    venue: "Bhrikuti Mandap Exhibition Hall, Kathmandu, Nepal",
    stats: {
      exhibitors: "150+",
      countries: "5+",
      visitors: "15,000+",
    },
    qualifier: "Organizer-reported results from the 2025 edition.",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.nepalpowerelec.com",
  // The three joint organizers. All three must always receive equal
  // prominence — do not reorder, resize, or otherwise imply a primary/
  // secondary/lead/supporting relationship anywhere in the UI.
  organizers: [
    {
      key: "futurex",
      name: "Futurex Trade Fair and Events Pvt. Ltd.",
      contactName: "Mr. Namit Gupta",
      phone: "+91 9810855697",
      phoneHref: "+919810855697",
      email: "namit@futurextrade.com",
      logo: "/images/brand/organizers/futurex-trade-fair-events-logo.png",
    },
    {
      key: "etsipl",
      name: "Exhibitions & Trade Services India Pvt. Ltd.",
      contactName: "Mr. Vijyanka Brighuvanshi",
      phone: "+91 9324232529",
      phoneHref: "+919324232529",
      email: "vijayanka@etsipl.in",
      logo: null as string | null,
    },
    {
      key: "mediaspace",
      name: "Media Space Solutions Pvt. Ltd.",
      contactName: "Mr. Srijal Bhattarai",
      phone: "+977 9801171141",
      phoneHref: "+9779801171141",
      email: "info@mss.com.np",
      logo: null as string | null,
    },
  ],
  organizersLockupImage: "/images/brand/organizers/nepal-expo-2026-organizers-lockup.jpg",
  eventLogo: "/images/brand/event/nepal-electric-power-lights-expo-2026-primary-logo.png",
  registration: {
    visitor: "https://exporegistration.in/nepalpowerelec-visitor.aspx",
    exhibitor: "https://nepalpowerelec.com/book-a-stand/",
  },
  social: {
    linkedin: null as string | null,
    twitter: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
    youtube: null as string | null,
  },
} as const;

export const dataQualifier =
  "These figures are organizer-reported and are not presented as independently audited results.";

export const editorialNote =
  "Content requiring confirmation from the organizing team (exhibitor listings, stand pricing, schedules) is intentionally omitted until verified — see docs/FILE_INVENTORY.md for the full list of omitted items.";
