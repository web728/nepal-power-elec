import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Zero-network-dependency social share image: pure JSX/CSS rendered by
// ImageResponse at build/request time (no external image fetching).
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#044f47",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {siteConfig.eventName}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 32,
            fontWeight: 600,
            color: "#EBBC17",
            textAlign: "center",
          }}
        >
          {siteConfig.dates.display} &middot; {siteConfig.venue.full}
        </div>
      </div>
    ),
    { ...size }
  );
}
