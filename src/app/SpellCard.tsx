"use client";
import React, { useRef, useCallback } from "react";
import { TIER_CONFIG, CAST_LEVELS, getSpellCode } from "./curses_data";
import { Download, Share2, X } from "lucide-react";
import { motion } from "framer-motion";

interface SpellCardProps {
  curse: {
    id: string;
    tier: string;
    tab: string;
    title: string;
    tags: string[];
  };
  castLevel: string;
  onClose: () => void;
}

const TIER_BADGE_BG: Record<string, string> = {
  apprentice: "#6B7280",
  adept: "#2563EB",
  master: "#7C3AED",
  archmage: "#DC2626",
  forbidden: "#B8860B",
};

export default function SpellCard({ curse, castLevel, onClose }: SpellCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tierConfig = TIER_CONFIG[curse.tier];
  const castInfo = CAST_LEVELS.find((c) => c.id === castLevel);
  const spellCode = getSpellCode(curse);
  const timestamp = new Date().toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    // Dynamic import html2canvas
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = `spell-${curse.id}-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [curse.id]);

  const handleShare = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.share && navigator.canShare) {
          const file = new File([blob], `spell-${curse.id}.png`, { type: "image/png" });
          const shareData = {
            title: "AI 魔法學院",
            text: `我在【AI 魔法學院】施放了${tierConfig.label}級咒語「${curse.title}」⚡`,
            url: "https://ai-magic-academy.vercel.app",
            files: [file],
          };
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return;
          }
        }
        // Fallback: download
        const link = document.createElement("a");
        link.download = `spell-${curse.id}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
      }, "image/png");
    } catch (e) {
      console.error(e);
    }
  }, [curse, tierConfig]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: "rgba(42,39,35,0.88)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 250 }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center gap-5 max-w-sm w-full"
      >
        {/* === THE CARD === */}
        <div
          ref={cardRef}
          style={{
            width: 360,
            padding: 0,
            background: "var(--parchment)",
            border: "4px solid var(--ink)",
            boxShadow: "8px 8px 0px var(--ink)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Halftone pattern overlay */}
          <div
            className="halftone-bg"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.3,
              pointerEvents: "none",
            }}
          />

          {/* Top tier color bar */}
          <div
            style={{
              height: 8,
              background: TIER_BADGE_BG[curse.tier] || "#6B7280",
            }}
          />

          {/* Content */}
          <div style={{ padding: "24px 28px 20px", position: "relative" }}>
            {/* Spell code */}
            <div
              style={{
                fontFamily: "var(--font-chivo)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "rgba(42,39,35,0.4)",
                marginBottom: 8,
              }}
            >
              {spellCode}
            </div>

            {/* Tier badge */}
            <div
              style={{
                display: "inline-block",
                background: TIER_BADGE_BG[curse.tier],
                color: "#fff",
                fontSize: 11,
                fontWeight: 900,
                fontFamily: "var(--font-noto-serif-tc)",
                padding: "3px 12px",
                marginBottom: 12,
              }}
            >
              {tierConfig.label}級咒語
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-noto-serif-tc)",
                fontSize: 24,
                fontWeight: 900,
                color: "var(--ink)",
                lineHeight: 1.3,
                marginBottom: 10,
              }}
            >
              {curse.title}
            </h3>

            {/* Divider */}
            <div
              style={{
                height: 3,
                background: "var(--ink)",
                marginBottom: 14,
              }}
            />

            {/* Cast info row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-chivo)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--teal)",
                  border: "2px solid var(--teal)",
                  padding: "2px 10px",
                }}
              >
                ⚡ {castInfo?.label || "標準詠唱"}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-chivo)",
                  fontSize: 11,
                  color: "rgba(42,39,35,0.5)",
                }}
              >
                {timestamp}
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {curse.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "var(--font-chivo)",
                    color: "var(--ink)",
                    background: "rgba(232,168,56,0.2)",
                    border: "2px solid rgba(232,168,56,0.5)",
                    padding: "2px 8px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Category */}
            <div
              style={{
                fontFamily: "var(--font-chivo)",
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(42,39,35,0.35)",
                letterSpacing: "0.08em",
              }}
            >
              {curse.tab}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              background: "var(--ink)",
              padding: "10px 28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-rye, var(--font-display))",
                fontSize: 13,
                color: "var(--mustard)",
                fontWeight: 700,
              }}
            >
              AI 魔法學院
            </span>
            <span
              style={{
                fontFamily: "var(--font-chivo)",
                fontSize: 9,
                color: "rgba(244,238,216,0.4)",
                letterSpacing: "0.1em",
              }}
            >
              ai-magic-academy.vercel.app
            </span>
          </div>
        </div>

        {/* === ACTION BUTTONS === */}
        <div className="flex gap-3 w-full" style={{ maxWidth: 360 }}>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3 font-bold text-sm"
            style={{
              background: "var(--mustard)",
              color: "var(--ink)",
              border: "3px solid var(--ink)",
              boxShadow: "4px 4px 0px var(--ink)",
              fontFamily: "var(--font-noto-sans-tc)",
            }}
          >
            <Download className="w-4 h-4" /> 下載卡片
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 font-bold text-sm"
            style={{
              background: "var(--teal)",
              color: "var(--parchment)",
              border: "3px solid var(--ink)",
              boxShadow: "4px 4px 0px var(--ink)",
              fontFamily: "var(--font-noto-sans-tc)",
            }}
          >
            <Share2 className="w-4 h-4" /> 分享到社群
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="text-sm font-bold"
          style={{
            color: "rgba(244,238,216,0.5)",
            fontFamily: "var(--font-noto-sans-tc)",
          }}
        >
          關閉
        </button>
      </motion.div>
    </motion.div>
  );
}
