"use client";
import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

/**
 * 每個「主流派」專屬的施法動畫，視覺隱喻與顏色各不相同：
 *  防禦=結界護盾組合 / 攻擊=連斬衝擊 / 治癒=生機綻放 / 幻術=幻影分身 / 契約=封印落印 / 洞察=天眼開啟。
 * anime.js 延遲載入（只在按下施法那刻下載，不影響網站開啟速度）；anime 失敗時中央圖示仍會顯示。
 */

type School = "defense" | "attack" | "healing" | "illusion" | "contract" | "insight";

const COLOR: Record<School, string> = {
  defense: "#3B82F6", attack: "#DC2626", healing: "#10B981",
  illusion: "#8B5CF6", contract: "#D97706", insight: "#6366F1",
};
const SUBTITLE: Record<School, string> = {
  defense: "結界展開・護盾成形", attack: "鋒刃凝聚・蓄勢待發", healing: "生機湧現・靈氣流轉",
  illusion: "幻影交疊・虛實難辨", contract: "契文落印・誓約鎖定", insight: "天眼開啟・洞悉萬象",
};

export default function CastRitualAnime({ icon, school }: { icon?: React.ReactNode; school?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const s: School = (["defense", "attack", "healing", "illusion", "contract", "insight"].includes(school || "") ? school : "insight") as School;
  const c = COLOR[s];

  useEffect(() => {
    let alive = true;
    (async () => {
      const el = root.current;
      if (!el) return;
      let mod: any;
      try { mod = await import("animejs"); } catch { return; }
      if (!alive || !root.current) return;
      const { animate, createTimeline, stagger } = mod;
      const Q = (sel: string) => Array.from(el.querySelectorAll(sel));
      const run = (fn: () => void) => { try { fn(); } catch {} };

      // 中央圖示具現（所有流派共用的收尾）
      run(() => animate(Q(".core"), { scale: [0, 1.25, 1], opacity: [0, 1], duration: 700, delay: 1050, ease: "outBack" }));
      run(() => animate(Q(".core"), { scale: [1, 1.1, 1], duration: 1500, delay: 1750, loop: true, ease: "inOutQuad" }));

      if (s === "defense") {
        run(() => animate(Q(".hex"), { scale: [2.6, 1], rotate: [40, 0], opacity: [0, 1], duration: 720, delay: stagger(130), ease: "outBack" }));
        run(() => animate(Q(".ripple"), { scale: [0.2, 2.8], opacity: [0.7, 0], duration: 900, delay: 700, ease: "outExpo" }));
      } else if (s === "attack") {
        const tl = createTimeline();
        tl.add(Q(".slash"), { scaleX: [0, 1], opacity: [0.9, 0], duration: 220, delay: stagger(110), ease: "outQuad" }, 200)
          .add(Q(".flash"), { opacity: [0, 0.85, 0], scale: [0.6, 1.6], duration: 320, ease: "outQuad" }, 760)
          .add(Q(".spark"), { x: (_t: any, i: number) => Math.round(Math.cos((i / 12) * 6.283) * 150), y: (_t: any, i: number) => Math.round(Math.sin((i / 12) * 6.283) * 150), opacity: [0, 1, 0], scale: [0, 1.4, 0], duration: 620, delay: stagger(18), ease: "outQuad" }, 820);
      } else if (s === "healing") {
        run(() => animate(Q(".mote"), { y: [60, -140], x: () => Math.round((Math.random ? 0 : 0)), opacity: [0, 1, 0], scale: [0.5, 1, 0.4], duration: 1800, delay: stagger(120), loop: true, ease: "inOutSine" }));
        run(() => animate(Q(".halo"), { scale: [0.3, 2], opacity: [0.55, 0], duration: 1600, delay: stagger(400), loop: true, ease: "outSine" }));
      } else if (s === "illusion") {
        run(() => animate(Q(".ghost"), {
          x: (_t: any, i: number) => Math.round(Math.cos((i / 5) * 6.283) * 90),
          y: (_t: any, i: number) => Math.round(Math.sin((i / 5) * 6.283) * 90),
          opacity: [0, 0.5, 0], rotate: (_t: any, i: number) => (i % 2 ? 25 : -25), scale: [0.7, 1.1, 0.8],
          duration: 1300, delay: stagger(110), loop: true, ease: "inOutQuad",
        }));
        run(() => animate(Q(".warp"), { rotate: 360, opacity: [0.15, 0.4, 0.15], duration: 2600, loop: true, ease: "linear" }));
      } else if (s === "contract") {
        const tl = createTimeline();
        tl.add(Q(".seal"), { scale: [2.6, 0.92, 1], opacity: [0, 1], rotate: [-90, 0], duration: 760, ease: "outExpo" }, 250)
          .add(Q(".sealglow"), { scale: [1, 1.5], opacity: [0.7, 0], duration: 620, ease: "outExpo" }, 850)
          .add(Q(".crune"), { opacity: [0, 1], scale: [0, 1], duration: 420, delay: stagger(50), ease: "outBack" }, 900);
      } else { // insight 天眼
        const tl = createTimeline();
        tl.add(Q(".lid-top"), { translateY: [0, -34], opacity: [0, 1], duration: 620, ease: "outCubic" }, 200)
          .add(Q(".lid-bot"), { translateY: [0, 34], opacity: [0, 1], duration: 620, ease: "outCubic" }, 200)
          .add(Q(".iris"), { scale: [0, 1], opacity: [0, 1], duration: 520, ease: "outBack" }, 620)
          .add(Q(".scan"), { translateX: [-150, 150], opacity: [0, 1, 0], duration: 900, ease: "inOutSine" }, 760)
          .add(Q(".star"), { opacity: [0, 1, 0.6], scale: [0, 1], duration: 460, delay: stagger(45), ease: "outQuad" }, 900);
        run(() => animate(Q(".iris"), { scale: [1, 1.12, 1], duration: 1400, delay: 1200, loop: true, ease: "inOutSine" }));
      }
    })();
    return () => { alive = false; };
  }, [s]);

  return (
    <div ref={root} className="flex flex-col items-center justify-center">
      <div style={{ position: "relative", width: 280, height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>

        {s === "defense" && (<>
          <div className="ripple" style={{ position: "absolute", width: 110, height: 110, borderRadius: "50%", border: `2px solid ${c}`, opacity: 0 }} />
          {[0, 1, 2].map((i) => (
            <svg key={i} className="hex" width={210 - i * 46} height={210 - i * 46} viewBox="0 0 100 100" style={{ position: "absolute", opacity: 0 }}>
              <polygon points="50,4 91,27 91,73 50,96 9,73 9,27" fill="none" stroke={c} strokeWidth={1.4 - i * 0.2} opacity={0.9 - i * 0.2} />
            </svg>
          ))}
        </>)}

        {s === "attack" && (<>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="slash" style={{ position: "absolute", width: 300, height: 3, background: `linear-gradient(90deg, transparent, ${c}, transparent)`, opacity: 0, transform: `rotate(${[-30, 22, -8, 50][i]}deg)`, transformOrigin: "center" }} />
          ))}
          <div className="flash" style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${c} 0%, transparent 70%)`, opacity: 0 }} />
          {Array.from({ length: 12 }).map((_, i) => (<span key={i} className="spark" style={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", background: c, opacity: 0 }} />))}
        </>)}

        {s === "healing" && (<>
          {[0, 1, 2].map((i) => (<div key={i} className="halo" style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", border: `1.5px solid ${c}`, opacity: 0 }} />))}
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="mote" style={{ position: "absolute", left: `${15 + (i * 70 / 16)}%`, bottom: 40, width: 6, height: 6, borderRadius: "50%", background: c, opacity: 0, boxShadow: `0 0 8px ${c}` }} />
          ))}
        </>)}

        {s === "illusion" && (<>
          <svg className="warp" width="240" height="240" viewBox="0 0 100 100" style={{ position: "absolute", opacity: 0.2 }}>
            <circle cx="50" cy="50" r="46" fill="none" stroke={c} strokeWidth="0.6" strokeDasharray="3 6" />
            <circle cx="50" cy="50" r="34" fill="none" stroke={c} strokeWidth="0.5" strokeDasharray="2 8" />
          </svg>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="ghost" style={{ position: "absolute", color: c, opacity: 0, filter: `drop-shadow(0 0 8px ${c})` }}><div style={{ transform: "scale(2)", display: "flex" }}>{icon || <Sparkles className="w-8 h-8" />}</div></div>
          ))}
        </>)}

        {s === "contract" && (<>
          <div className="sealglow" style={{ position: "absolute", width: 150, height: 150, borderRadius: "50%", background: `radial-gradient(circle, ${c} 0%, transparent 65%)`, opacity: 0 }} />
          <svg className="seal" width="220" height="220" viewBox="0 0 100 100" style={{ position: "absolute", opacity: 0 }}>
            <circle cx="50" cy="50" r="47" fill="none" stroke={c} strokeWidth="2" />
            <circle cx="50" cy="50" r="40" fill="none" stroke={c} strokeWidth="0.8" strokeDasharray="4 3" />
            <polygon points="50,12 84,69 16,69" fill="none" stroke={c} strokeWidth="1" />
          </svg>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="crune" style={{ position: "absolute", width: 8, height: 8, border: `2px solid ${c}`, opacity: 0, transform: `rotate(${i * 45}deg) translateY(-86px)` }} />
          ))}
        </>)}

        {s === "insight" && (<>
          <svg width="260" height="160" viewBox="0 0 130 80" style={{ position: "absolute" }}>
            <path className="lid-top" d="M5 40 Q65 2 125 40" fill="none" stroke={c} strokeWidth="2" opacity="0" />
            <path className="lid-bot" d="M5 40 Q65 78 125 40" fill="none" stroke={c} strokeWidth="2" opacity="0" />
            <circle className="iris" cx="65" cy="40" r="15" fill="none" stroke={c} strokeWidth="1.5" opacity="0" />
          </svg>
          <div className="scan" style={{ position: "absolute", width: 3, height: 150, background: `linear-gradient(180deg, transparent, ${c}, transparent)`, opacity: 0 }} />
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="star" style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: c, opacity: 0, transform: `rotate(${i * 40}deg) translateY(-${70 + (i % 3) * 14}px)`, boxShadow: `0 0 6px ${c}` }} />
          ))}
        </>)}

        {/* 中央咒語圖示具現（共用） */}
        <div className="core" style={{ position: "relative", zIndex: 2, color: c, filter: `drop-shadow(0 0 18px ${c})`, display: "flex", opacity: 0 }}>
          <div style={{ transform: "scale(2.3)", display: "flex" }}>{icon || <Sparkles className="w-8 h-8" />}</div>
        </div>
      </div>

      <p className="text-2xl font-black mt-8 mb-1 tracking-[0.4em]" style={{ fontFamily: "var(--font-noto-serif-tc)", color: c, fontWeight: 900 }}>詠唱中</p>
      <p className="text-[11px] tracking-[0.3em]" style={{ fontFamily: "var(--font-noto-serif-tc)", color: "rgba(244,238,216,0.5)" }}>{SUBTITLE[s]}</p>
    </div>
  );
}
