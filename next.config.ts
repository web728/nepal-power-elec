import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Development me unsafe-eval aur dynamic hot-reloading allow hai
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://connect.facebook.net"
  : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://connect.facebook.net";

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
      // Fixed: Google Fonts & Dynamic Tailwind Chunks
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com",
      // Fixed: Added blob: and relative uploads path for images
      "img-src 'self' data: blob: https: https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://*.facebook.com https://*.fbcdn.net",
      // Fixed: Added fonts.gstatic.com for Google Fonts
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://*.supabase.co https://www.google.com https://stats.g.doubleclick.net",
      "frame-src 'self' https://www.google.com https://maps.google.com https://*.google.com https://recaptcha.google.com https://www.facebook.com https://web.facebook.com https://*.facebook.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Production optimization options
  reactStrictMode: true,
  images: {
    // Large layout shifts ko rokne ke liye responsive sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
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