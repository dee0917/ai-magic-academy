"use client";
import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

/**
 * anime.js 版「魔法陣施法儀式」。
 * - anime.js 只在本元件掛載（按下施法那一刻）才動態載入，不影響網站初始載入速度。
 * - 優雅降級：若 anime.js 載入/執行失敗，CSS 旋轉的魔法陣與中央圖示仍會顯示。
 * 招牌效果：魔法陣「描繪而生」(SVG draw-on) + 火花放射 (stagger)。
 */
export default function CastRitualAnime({ icon }: { icon?: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      const el = root.current;
      if (!el) return;
      let mod: any;
      try { mod = await import("animejs"); } catch { return; }
      if (!alive || !root.current) return;
      const { animate, svg, stagger } = mod;
      const Q = (s: string) => Array.from(el.querySelectorAll(s));
      try {
        animate(svg.createDrawable(Q(".rune-draw")), { draw: ["0 0", "0 1"], duration: 1400, ease: "inOutQuad" });
        animate(svg.createDrawable(Q(".prog-draw")), { draw: ["0 0", "0 1"], duration: 1650, ease: "inOutSine" });
      } catch {}
      try {
        animate(Q(".core"), { scale: [0.4, 1.12, 1], opacity: [0, 1], duration: 850, ease: "outBack" });
        animate(Q(".core"), { scale: [1, 1.14, 1], duration: 1500, delay: 850, loop: true, ease: "inOutQuad" });
      } catch {}
      try {
        animate(Q(".spark"), {
          x: (_t: any, i: number) => Math.round(Math.cos((i / 12) * Math.PI * 2) * 138),
          y: (_t: any, i: number) => Math.round(Math.sin((i / 12) * Math.PI * 2) * 138),
          opacity: [0, 1, 0],
          scale: [0, 1.4, 0],
          duration: 1500,
          delay: stagger(70),
          loop: true,
          ease: "outQuad",
        });
      } catch {}
    })();
    return () => { alive = false; };
  }, []);

  return (
    <div ref={root} className="flex flex-col items-center justify-center">
      <div style={{ position: "relative", width: 264, height: 264, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* 外環符文（CSS 順時針旋轉，anime 描繪而生） */}
        <svg className="animate-spin" style={{ position: "absolute", animationDuration: "9s" }} width="264" height="264" viewBox="0 0 100 100">
          <circle className="rune-draw" cx="50" cy="50" r="47" fill="none" stroke="#E8A838" strokeWidth="0.7" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="49.3" y="2.2" width="1.4" height="5" fill="#E8A838" opacity="0.85" transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </svg>
        {/* 中環六芒星（逆時針） */}
        <svg className="animate-spin" style={{ position: "absolute", animationDuration: "7s", animationDirection: "reverse" }} width="198" height="198" viewBox="0 0 100 100">
          <circle className="rune-draw" cx="50" cy="50" r="46" fill="none" stroke="#1A5C5A" strokeWidth="1" strokeDasharray="6 5" />
          <polygon className="rune-draw" points="50,9 85.5,70.5 14.5,70.5" fill="none" stroke="#1A5C5A" strokeWidth="0.6" opacity="0.55" />
          <polygon className="rune-draw" points="50,91 14.5,29.5 85.5,29.5" fill="none" stroke="#1A5C5A" strokeWidth="0.6" opacity="0.55" />
        </svg>
        {/* 進度環（暗紅，描繪填滿） */}
        <svg width="150" height="150" viewBox="0 0 100 100" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(244,238,216,0.1)" strokeWidth="3" />
          <circle className="prog-draw" cx="50" cy="50" r="45" fill="none" stroke="#8B2626" strokeWidth="3" strokeLinecap="round" />
        </svg>
        {/* 放射火花 */}
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="spark" style={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", background: "#E8A838", opacity: 0 }} />
        ))}
        {/* 中央咒語圖示 */}
        <div className="core" style={{ position: "relative", zIndex: 2, color: "#E8A838", filter: "drop-shadow(0 0 16px rgba(232,168,56,0.9))", display: "flex" }}>
          <div style={{ transform: "scale(2.2)", display: "flex" }}>{icon || <Sparkles className="w-8 h-8" />}</div>
        </div>
      </div>
      <p className="text-2xl font-black mt-9 mb-2 tracking-[0.35em]" style={{ fontFamily: "var(--font-noto-serif-tc)", color: "#E8A838", fontWeight: 900 }}>
        詠唱中
      </p>
      <p className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-chivo)", color: "rgba(244,238,216,0.4)" }}>
        SUMMONING · ANIME.JS
      </p>
    </div>
  );
}
