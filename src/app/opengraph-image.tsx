import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #081723 0%, #102842 60%, #1b3553 100%)",
          color: "white",
          padding: "56px",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "72%" }}>
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#c8a96e" }}>
            Brains Clinical Intelligence
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.04, fontWeight: 600, maxWidth: 760 }}>
            Live cannabinoid trial intelligence for strategic asset discovery.
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.72)", maxWidth: 720 }}>
            Track the landscape. Identify the right institutions, sponsors, and studies. Score what matters commercially.
          </div>
        </div>
        <div style={{ width: 240, height: 240, borderRadius: 40, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ fontSize: 168, fontWeight: 700, color: "white" }}>B</div>
        </div>
      </div>
    ),
    size,
  );
}
