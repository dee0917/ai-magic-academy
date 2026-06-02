"use client";
import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

/**
 * anime.js 全力版「召喚法陣」施法儀式（多階段編排時間軸）。
 * 階段：核心點燃 → 法陣逐層描繪而生 → 符文亮起 → 咒語圖示具現 → 衝擊波擴散 → 火花爆射。
 * - anime.js 延遲載入：只在按下施法那一刻才下載，不影響網站初始載入速度。
 * - 優雅降級：anime 失敗時，CSS 旋轉的法陣與中央圖示仍會顯示。
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
      const { animate, createTimeline, svg, stagger } = mod;
      const Q = (s: string) => Array.from(el.querySelectorAll(s));
      const draw = (s: string) => { try { return svg.createDrawable(Q(s)); } catch { return Q(s); } };

      // 多階段召喚時間軸
      try {
        const tl = createTimeline({ defaults: { ease: "outQuad" } });
        tl.add(Q(".core-glow"), { scale: [0, 1], opacity: [0, 0.9], duration: 360 }, 0)
          .add(draw(".ring-1"), { draw: ["0 0", "0 1"], duration: 760, ease: "inOutSine" }, 120)
          .add(draw(".ring-2"), { draw: ["0 0", "0 1"], duration: 760, ease: "inOutSine" }, 320)
          .add(draw(".hexagram"), { draw: ["0 0", "0 1"], duration: 700, ease: "inOutSine" }, 480)
          .add(draw(".ring-3"), { draw: ["0 0", "0 1"], duration: 700, ease: "inOutSine" }, 560)
          .add(Q(".rune"), { opacity: [0, 1], scale: [0, 1], duration: 460, delay: stagger(34) }, 720)
          .add(Q(".core"), { scale: [0, 1.25, 1], rotate: [-45, 0], opacity: [0, 1], duration: 720, ease: "outBack" }, 1080)
          .add(Q(".shockwave"), { scale: [0, 2.4], opacity: [0.65, 0], duration: 820, ease: "outExpo" }, 1180)
          .add(Q(".spark"), {
            x: (_t: any, i: number) => Math.round(Math.cos((i / 14) * Math.PI * 2) * 150),
            y: (_t: any, i: number) => Math.round(Math.sin((i / 14) * Math.PI * 2) * 150),
            opacity: [0, 1, 0], scale: [0, 1.5, 0], duration: 760, delay: stagger(26), ease: "outQuad",
          }, 1300);
      } catch {}

      // 圖示具現後的持續脈動
      try { animate(Q(".core"), { scale: [1, 1.1, 1], duration: 1400, delay: 1800, loop: true, ease: "inOutQuad" }); } catch {}
      // 內層符文環持續旋轉的微光
      try { animate(Q(".inner-glow"), { opacity: [0.3, 0.75, 0.3], duration: 1300, loop: true, ease: "inOutSine" }); } catch {}
    })();
    return () => { alive = false; };
  }, []);

  return (
    <div ref={root} className="flex flex-col items-center justify-center">
      <div style={{ position: "relative", width: 280, height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* 衝擊波 */}
        <div className="shockwave" style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", border: "2px solid #E8A838", opacity: 0, pointerEvents: "none" }} />

        {/* 外層法陣（順時針旋轉） */}
        <svg className="animate-spin" style={{ position: "absolute", animationDuration: "11s" }} width="280" height="280" viewBox="0 0 120 120">
          <circle className="ring-1" cx="60" cy="60" r="56" fill="none" stroke="#E8A838" strokeWidth="0.7" />
          <circle className="ring-3 inner-glow" cx="60" cy="60" r="50" fill="none" stroke="#E8A838" strokeWidth="0.35" strokeDasharray="1 3" />
          {Array.from({ length: 14 }).map((_, i) => (
            <rect key={i} className="rune" x="59.3" y="2.6" width="1.4" height="6" fill="#E8A838" opacity="0" transform={`rotate(${i * (360 / 14)} 60 60)`} style={{ transformOrigin: "60px 60px" }} />
          ))}
        </svg>

        {/* 中層法陣＋六芒星（逆時針旋轉） */}
        <svg className="animate-spin" style={{ position: "absolute", animationDuration: "8s", animationDirection: "reverse" }} width="216" height="216" viewBox="0 0 120 120">
          <circle className="ring-2" cx="60" cy="60" r="54" fill="none" stroke="#1A5C5A" strokeWidth="1" strokeDasharray="7 5" />
          <polygon className="hexagram" points="60,12 101.6,84 18.4,84" fill="none" stroke="#1A5C5A" strokeWidth="0.7" />
          <polygon className="hexagram" points="60,108 18.4,36 101.6,36" fill="none" stroke="#1A5C5A" strokeWidth="0.7" />
        </svg>

        {/* 內圈暗紅環（靜態） */}
        <svg width="150" height="150" viewBox="0 0 120 120" style={{ position: "absolute" }}>
          <circle className="ring-3" cx="60" cy="60" r="40" fill="none" stroke="#8B2626" strokeWidth="2" strokeDasharray="2 4" opacity="0.8" />
        </svg>

        {/* 核心光暈 */}
        <div className="core-glow" style={{ position: "absolute", width: 90, height: 90, borderRadius: "50%", opacity: 0, background: "radial-gradient(circle, rgba(232,168,56,0.55) 0%, rgba(232,168,56,0) 70%)", pointerEvents: "none" }} />

        {/* 放射火花 */}
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="spark" style={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", background: "#E8A838", opacity: 0 }} />
        ))}

        {/* 中央咒語圖示具現 */}
        <div className="core" style={{ position: "relative", zIndex: 2, color: "#E8A838", filter: "drop-shadow(0 0 18px rgba(232,168,56,0.95))", display: "flex", opacity: 0 }}>
          <div style={{ transform: "scale(2.3)", display: "flex" }}>{icon || <Sparkles className="w-8 h-8" />}</div>
        </div>
      </div>

      <p className="text-2xl font-black mt-8 mb-1 tracking-[0.4em]" style={{ fontFamily: "var(--font-noto-serif-tc)", color: "#E8A838", fontWeight: 900 }}>
        詠唱中
      </p>
      <p className="text-[11px] tracking-[0.3em]" style={{ fontFamily: "var(--font-noto-serif-tc)", color: "rgba(244,238,216,0.5)" }}>
        法陣展開・靈力凝聚
      </p>
    </div>
  );
}
