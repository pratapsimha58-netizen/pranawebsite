import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background: "linear-gradient(145deg, #24302a 0%, #3f5f4f 55%, #6b9a96 100%)",
          color: "#f7f3ed",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", opacity: 0.75 }}>
          Coaching in Bengaluru & online
        </div>
        <div style={{ marginTop: 24, fontSize: 72, lineHeight: 1.05, maxWidth: 900 }}>
          {site.name}
        </div>
        <div style={{ marginTop: 18, fontSize: 36, opacity: 0.9, maxWidth: 820 }}>
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
