// trackEvent() sends to gtag/dataLayer only if analytics has been loaded
// (which only happens after cookie consent — see analytics-scripts.tsx and
// consent-banner.tsx). Never pass personal data (names, emails, message
// content) as event params.

export const AnalyticsEvents = {
  BOOK_STAND_START: "book_stand_start",
  BOOK_STAND_SUBMIT: "book_stand_submit",
  VISITOR_REGISTER_START: "visitor_register_start",
  VISITOR_REGISTER_SUBMIT: "visitor_register_submit",
  MEDIA_ENQUIRY_SUBMIT: "media_enquiry_submit",
  CONTACT_SUBMIT: "contact_submit",
  BROCHURE_DOWNLOAD: "brochure_download",
  REPORT_DOWNLOAD: "report_download",
  PHONE_CLICK: "phone_click",
  EMAIL_CLICK: "email_click",
  OUTBOUND_EXHIBITOR_CLICK: "outbound_exhibitor_click",
  SEARCH_NO_RESULTS: "search_no_results",
} as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  window.gtag?.("event", name, params);
}
