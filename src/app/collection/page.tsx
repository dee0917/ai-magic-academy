import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "魔法書收藏 | AI 魔法學院",
  description: "查看你在 AI 魔法學院收集的咒語卡牌。全力詠唱解鎖稀有卡片，成為真正的大魔導師。",
  openGraph: {
    title: "魔法書收藏 | AI 魔法學院",
    description: "查看你在 AI 魔法學院收集的咒語卡牌。全力詠唱解鎖稀有卡片，成為真正的大魔導師。",
    url: "https://ai-magic-academy.vercel.app/collection",
    siteName: "AI 魔法學院",
  },
};

export default function CollectionPage() {
  return (
    <div
      className="min-h-screen w-full parchment-bg flex flex-col items-center justify-center px-4 py-12"
      style={{ color: "var(--ink)" }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          background: "var(--parchment)",
          border: "4px solid var(--ink)",
          boxShadow: "8px 8px 0px var(--ink)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Halftone overlay */}
        <div
          className="halftone-bg"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />

        <div style={{ padding: "48px 32px 40px", position: "relative" }}>
          {/* Icon */}
          <div style={{ fontSize: 48, marginBottom: 16 }}>📖</div>

          <h1
            style={{
              fontFamily: "var(--font-noto-serif-tc)",
              fontSize: 26,
              fontWeight: 900,
              color: "var(--ink)",
              marginBottom: 12,
            }}
          >
            查看你的魔法書收藏
          </h1>

          <p
            style={{
              fontFamily: "var(--font-noto-sans-tc)",
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(42,39,35,0.6)",
              marginBottom: 32,
            }}
          >
            全力詠唱解鎖咒語卡片，收集五大學派的魔法，
            <br />
            成為真正的大魔導師。
          </p>

          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "var(--mustard)",
              color: "var(--ink)",
              border: "3px solid var(--ink)",
              boxShadow: "4px 4px 0px var(--ink)",
              padding: "14px 40px",
              fontFamily: "var(--font-noto-serif-tc)",
              fontSize: 18,
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            進入魔法學院
          </Link>
        </div>
      </div>
    </div>
  );
}
