import type { NextConfig } from "next";

// Security headers applied to every route. CSP includes Google Analytics/Tag Manager
// as well as Google reCAPTCHA v2 (script-src, frame-src, connect-src, img-src).
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com"
  : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com";

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
      "style-src 'self' 'unsafe-inline' https://www.gstatic.com",
      "img-src 'self' data: https://www.google-analytics.com https://www.google.com https://www.gstatic.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://*.supabase.co https://www.google.com",
      "frame-src 'self' https://www.google.com https://recaptcha.google.com",
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
        source: "/downloads/:path*.pdf",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, must-revalidate" }],
      },
    ];
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;