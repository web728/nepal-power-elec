import type { NextConfig } from "next";

// Security headers applied to every route. CSP is intentionally permissive
// enough to allow Google Analytics/Tag Manager (loaded only after cookie
// consent — see src/components/seo/analytics-scripts.tsx) without allowing
// arbitrary third-party script injection.
//
// 'unsafe-eval' is added only in development: React's dev-mode debugging
// features (Fast Refresh call-stack reconstruction) use eval() and React
// itself guarantees it "will never use eval() in production mode" — so
// this relaxation never reaches the deployed site.
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com"
  : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://www.google-analytics.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Applies to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Official PDFs change only when a content administrator replaces
        // them (see CONTENT_ADMIN_GUIDE.md) — a moderate cache lets CDNs
        // and browsers avoid re-downloading a 1-2MB file on every visit,
        // without hiding an update for so long that a replaced brochure
        // stays stale for days.
        source: "/downloads/:path*.pdf",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, must-revalidate" }],
      },
    ];
  },
  async redirects() {
    // No legacy URLs exist yet (this is a new site) — add entries here as
    // `{ source: "/old-path", destination: "/new-path", permanent: true }`
    // if a page is ever moved after launch, per DEVELOPER_HANDOFF.md's
    // "Managing redirects" guidance.
    return [];
  },
};

export default nextConfig;
