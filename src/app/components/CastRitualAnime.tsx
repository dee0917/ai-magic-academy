"use client";
import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

/**
 * 六流派施法特效 v2：用 anime.js 進階武器讓「運動本質」各自不同。
 * - createMotionPath：能量沿各流派專屬軌跡「流動」（粒子是與 path 同座標系的 SVG circle，精準跟線）。
 * - spring / outElastic / steps 緩動：每流派手感不同。
 * - splitText：咒語名逐字燃現收尾。
 * 延遲載入、尊重 prefers-reduced-motion、engine.pauseOnDocumentHidden（手機優先、效能友善）。
 */
type School = "defense" | "attack" | "healing" | "illusion" | "contract" | "insight";
const COLOR: Record<School, string> = { defense: "#3B82F6", attack: "#DC2626", healing: "#10B981", illusion: "#8B5CF6", contract: "#D97706", insight: "#6366F1" };
const SUB: Record<School, string> = { defense: "結界展開", attack: "鋒刃凝聚", healing: "生機湧現", illusion: "幻影交疊", contract: "契文落印", insight: "天眼開啟" };
// 每流派能量流動的軌跡（200x200 座標，粒子沿此流動）
const FLOW: Record<School, string> = {
  defense: "M100,18 L171,59 L171,141 L100,182 L29,141 L29,59 Z",
  attack: "M22,34 L84,92 L46,112 L120,168 L92,118 L182,58",
  healing: "M100,184 Q58,150 100,116 Q142,82 100,48 Q66,24 100,12",
  illusion: "M62,100 C62,42 138,42 138,100 C138,158 62,158 62,100 Z",
  contract: "M100,100 m-72,0 a72,72 0 1,0 144,0 a72,72 0 1,0 -144,0",
  insight: "M100,26 L122,86 L186,88 L134,124 L154,184 L100,146 L46,184 L66,124 L14,88 L78,86 Z",
};
const EASE: Record<School, string> = { defense: "linear", attack: "inOutQuad", healing: "inOutSine", illusion: "inOutQuad", contract: "steps(10)", insight: "linear" };
const DUR: Record<School, number> = { defense: 2200, attack: 950, healing: 2600, illusion: 2000, contract: 1800, insight: 1600 };
const CORE_EASE: Record<School, string> = { defense: "outBack(1.6)", attack: "outElastic(1, .4)", healing: "outElastic(1, .7)", illusion: "outBack(2)", contract: "steps(6)", insight: "outBack(1.4)" };
const CORE_ROT: Record<School, number> = { defense: -20, attack: -10, healing: 0, illusion: 40, contract: -90, insight: -8 };

export default function CastRitualAnime({ icon, school, title }: { icon?: React.ReactNode; school?: string; title?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const s: School = (["defense", "attack", "healing", "illusion", "contract", "insight"].includes(school || "") ? school : "insight") as School;
  const c = COLOR[s];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let alive = true;
    (async () => {
      const el = root.current; if (!el) return;
      let mod: any; try { mod = await import("animejs"); } catch { return; }
      if (!alive || !root.current) return;
      const { animate, stagger, svg, text, engine } = mod;
      try { if (engine) engine.pauseOnDocumentHidden = true; } catch {}
      const Q = (sel: string) => Array.from(el.querySelectorAll(sel));

      // 咒語名逐字燃現
      try {
        const nameEl = el.querySelector(".spell-name");
        if (nameEl && text?.splitText) {
          const sp = text.splitText(nameEl, { chars: true });
          if (reduce) { animate(sp.chars, { opacity: [0, 1], duration: 200 }); }
          else { animate(sp.chars, { opacity: [0, 1], y: [16, 0], scale: [0.4, 1], duration: 520, delay: stagger(45, { start: 850 }), ease: "outExpo" }); }
        }
      } catch {}

      if (reduce) { try { animate(Q(".core"), { opacity: [0, 1], duration: 300 }); } catch {} return; }

      // 中央圖示彈入(各流派緩動不同) + 持續脈動
      try {
        animate(Q(".core"), { scale: [0, 1.12, 1], opacity: [0, 1], rotate: [CORE_ROT[s], 0], duration: 900, ease: CORE_EASE[s] });
        animate(Q(".core"), { scale: [1, 1.08, 1], duration: 1500, delay: 1100, loop: true, ease: "inOutQuad" });
      } catch {}
      // 軌跡描繪而生
      try { animate(svg.createDrawable(Q(".flow-path")), { draw: ["0 0", "0 1"], duration: 1100, ease: "inOutSine" }); } catch {}
      // ★ 能量沿軌道流動（signature）
      try {
        const pathEl = el.querySelector(".flow-path");
        if (pathEl && svg?.createMotionPath) {
          const mp = svg.createMotionPath(pathEl);
          animate(Q(".flow"), { ...mp, opacity: [0, 1, 1, 0], duration: DUR[s], delay: stagger(DUR[s] / 12), loop: true, ease: EASE[s] });
        }
      } catch {}
      // 衝擊波
      try { animate(Q(".shock"), { scale: [0, 2.6], opacity: [0.6, 0], duration: 820, delay: 720, ease: "outExpo" }); } catch {}
    })();
    return () => { alive = false; };
  }, [s]);

  return (
    <div ref={root} className="flex flex-col items-center justify-center">
      <div style={{ position: "relative", width: 288, height: 288, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="shock" style={{ position: "absolute", width: 110, height: 110, borderRadius: "50%", border: `2px solid ${c}`, opacity: 0 }} />
        {/* 流動軌跡 + 沿軌道流動的能量粒子（同 SVG 座標系，精準跟線） */}
        <svg width="288" height="288" viewBox="0 0 200 200" style={{ position: "absolute" }}>
          <path className="flow-path" d={FLOW[s]} fill="none" stroke={c} strokeWidth="0.8" opacity="0.45" />
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} className="flow" cx="0" cy="0" r="2.6" fill={c} opacity="0" />
          ))}
        </svg>
        {/* 中央咒語圖示 */}
        <div className="core" style={{ position: "relative", zIndex: 2, color: c, filter: `drop-shadow(0 0 18px ${c})`, display: "flex", opacity: 0 }}>
          <div style={{ transform: "scale(2.3)", display: "flex" }}>{icon || <Sparkles className="w-8 h-8" />}</div>
        </div>
      </div>
      <p className="spell-name text-xl font-black mt-7 mb-1 text-center px-6" style={{ fontFamily: "var(--font-noto-serif-tc)", color: c, fontWeight: 900 }}>
        {(title || "").replace(/【|】/g, "")}
      </p>
      <p className="text-[11px] tracking-[0.3em]" style={{ fontFamily: "var(--font-noto-serif-tc)", color: "rgba(244,238,216,0.5)" }}>{SUB[s]}・詠唱中</p>
    </div>
  );
}
