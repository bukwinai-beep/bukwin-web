import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") ?? "Bukwin AI";
  const subtitle =
    url.searchParams.get("subtitle") ??
    "Never miss a call. Never lose a customer.";
  const theme = url.searchParams.get("theme") === "dark" ? "dark" : "light";

  const bg = theme === "dark" ? "#0A0F1C" : "#0B0E14";
  const fg = theme === "dark" ? "#F8FAFC" : "#FFFFFF";
  const accent = theme === "dark" ? "#818CF8" : "#4F46E5";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: bg,
          color: fg,
          padding: "80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: accent,
              color: bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 600,
            }}
          >
            B
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 500,
              color: fg,
              fontFamily: "serif",
            }}
          >
            Bukwin <span style={{ color: accent }}>&nbsp;AI</span>
          </div>
        </div>

        {/* Headline block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: accent,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              fontWeight: 500,
            }}
          >
            AI Receptionist
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.1,
              fontWeight: 500,
              fontFamily: "serif",
              color: fg,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: `${fg}cc`,
              fontFamily: "sans-serif",
              maxWidth: 800,
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: `${fg}99` }}>
            bukwin-ai.vercel.app
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              color: `${fg}99`,
            }}
          >
            <span style={{ color: "#10B981", fontSize: 14 }}>●</span>
            24/7 · 30+ languages · 48h setup
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
