"use client";
import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { SCHOOL_CONFIG, TIER_CONFIG, getTabColor } from "../lib/constants";
import type { SchoolType } from "../curses_data";
import { SchoolSigil } from "../components/SchoolSigil";

const PARCH = "#FEFAF0";
const INK = "var(--ink)";
const WAX = "#8B2626";
const GOLD = "var(--mustard)";
const GOLD_HEX = "#E8A838";

type Sample = {
  id: string; tab: string; tier: keyof typeof TIER_CONFIG;
  school: SchoolType; subSchool: SchoolType;
  title: string; desc: string; icon: string; code: string;
};
const SAMPLES: Sample[] = [
  { id: "demo1", tab: "職場求生", tier: "master", school: "attack", subSchool: "insight",
    title: "奪回戰功術", icon: "⚔️", code: "Ⅲ-SV-014",
    desc: "被同事搶了功勞？在不撕破臉的前提下，把成果重新標記回自己名下。" },
  { id: "demo3", tab: "創業/自媒體", tier: "forbidden", school: "contract", subSchool: "defense",
    title: "合夥拆夥保命契", icon: "📜", code: "Ⅴ-BZ-001",
    desc: "合夥要拆夥？先把醜話寫成漂亮條款，保護自己不被坑也不傷和氣。" },
];

/* shared */
function CategoryPill({ curse }: { curse: Sample }) {
  return <span className="text-[11px] font-black px-2 py-1" style={{ background: getTabColor(curse.tab), fontFamily: "var(--font-chivo)", color: PARCH }}>{curse.tab}</span>;
}
function TierBadge({ curse }: { curse: Sample }) {
  const tier = TIER_CONFIG[curse.tier];
  const c = curse.tier === "forbidden" ? "#D4AF37" : tier.color;
  return <span className="text-[11px] font-black px-2 py-1 tracking-wider" style={{ fontFamily: "var(--font-chivo)", color: c, border: `2px solid ${c}`, background: curse.tier === "forbidden" ? "#1F2937" : "transparent" }}>{tier.label}</span>;
}
function RepIcon({ curse }: { curse: Sample }) {
  return <span className="text-lg" style={{ color: INK, opacity: 0.4 }}>{curse.icon}</span>;
}

/* the requested school line: ──✦ [sigil]主 · [sigil]副 ✦── */
function SchoolDivider({ curse }: { curse: Sample }) {
  const main = SCHOOL_CONFIG[curse.school];
  const sub = SCHOOL_CONFIG[curse.subSchool];
  return (
    <div className="flex items-center gap-2 mx-5 my-1 relative z-10">
      <div className="flex-1" style={{ borderTop: "2px dashed var(--ink)", opacity: 0.3 }} />
      <span style={{ color: GOLD, fontSize: 12 }}>✦</span>
      <span className="flex items-center gap-1 text-[12px] font-black" style={{ fontFamily: "var(--font-noto-serif-tc)", color: INK }}>
        <SchoolSigil school={curse.school} size={15} color={main.color} />{main.label}
      </span>
      <span style={{ color: INK, opacity: 0.4 }}>·</span>
      <span className="flex items-center gap-1 text-[12px] font-black" style={{ fontFamily: "var(--font-noto-serif-tc)", color: INK, opacity: 0.88 }}>
        <SchoolSigil school={curse.subSchool} size={13} color={sub.color} />{sub.label}
      </span>
      <span style={{ color: GOLD, fontSize: 12 }}>✦</span>
      <div className="flex-1" style={{ borderTop: "2px dashed var(--ink)", opacity: 0.3 }} />
    </div>
  );
}

function FiligreeCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const place: React.CSSProperties = { tl: { top: 6, left: 6 }, tr: { top: 6, right: 6 }, bl: { bottom: 6, left: 6 }, br: { bottom: 6, right: 6 } }[pos];
  return (
    <svg className="filigree absolute z-10" style={{ ...place, transform: `rotate(${rot}deg)` }} width="34" height="34" viewBox="0 0 34 34" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <path d="M2 14 V2 H14" /><path d="M2 14 C2 7 7 2 14 2" /><path d="M6 6 C12 6 12 12 6 12" /><circle cx="4" cy="4" r="1.4" fill={GOLD} stroke="none" />
    </svg>
  );
}

const RUNE_PATHS = ["M3 1V13", "M3 1V13M3 4L8 1M3 8L8 5", "M2 1L8 7L2 13", "M3 1V13M3 1L8 4M3 7L8 4", "M2 7H10M6 2V12", "M3 1V13M8 1V13M3 7H8", "M2 2L8 12M8 2L2 12", "M5 1V13M2 4L5 1L8 4"];
const RUNE_POS = [{ t: 26, l: 24 }, { t: 60, l: 250 }, { t: 110, l: 40 }, { t: 150, l: 232 }, { t: 96, l: 150 }, { t: 200, l: 60 }, { t: 188, l: 246 }, { t: 230, l: 150 }];
const DUST = Array.from({ length: 14 });

type BG = "runes" | "ring" | "dust" | "halftone" | "shimmer";

function FrameCard({ curse, bg }: { curse: Sample; bg: BG }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current; if (!el) return;
    animate(el.querySelectorAll<HTMLElement>(".filigree"), { scale: [0.4, 1], opacity: [0, 1], duration: 700, delay: stagger(110), ease: "outBack" });
    if (bg === "runes") animate(el.querySelectorAll<HTMLElement>(".bg-rune"), { translateY: [8, -8], opacity: [0.05, 0.22], loop: true, alternate: true, ease: "inOutSine", duration: 3000, delay: stagger(260) });
    if (bg === "ring") animate(el.querySelectorAll<HTMLElement>(".bg-ring"), { rotate: "1turn", loop: true, ease: "linear", duration: 42000 });
    if (bg === "dust") animate(el.querySelectorAll<HTMLElement>(".bg-dust"), { translateY: [0, -46], opacity: [0.5, 0], scale: [1, 0.3], loop: true, ease: "outQuad", duration: 2800, delay: stagger(190) });
    if (bg === "halftone") animate(el.querySelectorAll<HTMLElement>(".bg-halftone"), { opacity: [0.05, 0.13], scale: [1, 1.06], loop: true, alternate: true, ease: "inOutSine", duration: 2800 });
    if (bg === "shimmer") animate(el.querySelectorAll<HTMLElement>(".bg-shimmer"), { translateX: ["-130%", "130%"], loop: true, ease: "linear", duration: 3600 });
  }, [bg]);

  const tabColor = getTabColor(curse.tab);
  const tier = TIER_CONFIG[curse.tier];

  return (
    <div ref={root} className="flex-shrink-0 w-[300px] flex flex-col relative overflow-hidden" style={{ border: `4px solid ${tier.borderColor}`, boxShadow: "var(--shadow-sm)", background: PARCH }}>
      <div style={{ height: 6, background: tier.color }} />

      {/* ── animated background (z0, faint) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {bg === "runes" && RUNE_POS.map((p, i) => (
          <svg key={i} className="bg-rune absolute" style={{ top: p.t, left: p.l, opacity: 0.1 }} width="12" height="15" viewBox="0 0 11 14" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round"><path d={RUNE_PATHS[i % RUNE_PATHS.length]} /></svg>
        ))}
        {bg === "ring" && (
          <div className="bg-ring absolute" style={{ left: "50%", top: "52%", width: 220, height: 220, marginLeft: -110, marginTop: -110, transformOrigin: "50% 50%", opacity: 0.12 }}>
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none" stroke={INK} strokeWidth="1.3">
              <circle cx="110" cy="110" r="104" /><circle cx="110" cy="110" r="80" /><circle cx="110" cy="110" r="54" />
              {Array.from({ length: 24 }).map((_, i) => { const a = (i / 24) * Math.PI * 2; return <line key={i} x1={110 + Math.cos(a) * 80} y1={110 + Math.sin(a) * 80} x2={110 + Math.cos(a) * 104} y2={110 + Math.sin(a) * 104} />; })}
              <path d="M110 30 L150 110 L110 190 L70 110 Z" />
            </svg>
          </div>
        )}
        {bg === "dust" && DUST.map((_, i) => (
          <span key={i} className="bg-dust absolute" style={{ bottom: 14, left: 18 + (i * 19) % 264, width: 4 + (i % 3), height: 4 + (i % 3), borderRadius: "50%", background: GOLD_HEX, opacity: 0.4 }} />
        ))}
        {bg === "halftone" && (
          <div className="bg-halftone absolute inset-0" style={{ opacity: 0.08, backgroundImage: `radial-gradient(${INK} 1.4px, transparent 1.4px)`, backgroundSize: "12px 12px", transformOrigin: "center" }} />
        )}
        {bg === "shimmer" && (
          <div className="bg-shimmer absolute" style={{ top: 0, bottom: 0, width: "55%", left: 0, background: `linear-gradient(105deg, transparent, rgba(232,168,56,0.32), transparent)`, transform: "skewX(-16deg)" }} />
        )}
      </div>

      {/* ── gold illuminated frame ── */}
      <FiligreeCorner pos="tl" /><FiligreeCorner pos="tr" /><FiligreeCorner pos="bl" /><FiligreeCorner pos="br" />
      <div className="absolute pointer-events-none z-10" style={{ inset: 12, border: `1px solid ${GOLD}`, opacity: 0.5 }} />

      {/* ── content ── */}
      <div className="p-5 pb-3 flex items-start justify-between relative z-10">
        <div className="flex items-center gap-1.5 flex-wrap"><CategoryPill curse={curse} /><TierBadge curse={curse} /></div>
        <RepIcon curse={curse} />
      </div>
      <h3 className="px-5 text-xl leading-tight relative z-10 mb-2" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, color: INK }}>{curse.title}</h3>
      <div className="px-5 pb-2 flex-1 relative z-10">
        <div style={{ borderLeft: `3px solid ${tabColor}`, paddingLeft: 12 }}>
          <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-noto-sans-tc)", color: INK, opacity: 0.78 }}>{curse.desc}</p>
        </div>
      </div>
      <SchoolDivider curse={curse} />
      <div className="flex items-center justify-between px-5 py-3 relative z-10">
        <span className="text-[11px] font-black px-1.5 py-0.5 tracking-wider select-none" style={{ fontFamily: "var(--font-chivo)", color: WAX, border: `1.5px solid ${WAX}`, opacity: 0.8, transform: "rotate(-2deg)" }}>{curse.code}</span>
        <span className="flex items-center gap-1 text-xs font-black" style={{ fontFamily: "var(--font-noto-sans-tc)", color: tabColor }}>詠唱 →</span>
      </div>
    </div>
  );
}

const SECTIONS: { bg: BG; name: string; blurb: string }[] = [
  { bg: "runes", name: "版本一　浮動符文", blurb: "金色符文在背景上下緩緩飄動、忽明忽暗。" },
  { bg: "ring", name: "版本二　旋轉符陣", blurb: "背景一枚淡淡的占星符陣持續緩慢旋轉。" },
  { bg: "dust", name: "版本三　金塵微光", blurb: "底部金色微粒不斷往上飄散、淡出。" },
  { bg: "halftone", name: "版本四　半色調脈動", blurb: "全站招牌的點陣半色調當底，輕輕呼吸般脈動。" },
  { bg: "shimmer", name: "版本五　流金掃光", blurb: "一道斜向金光固定週期掃過卡面。" },
];

export default function PreviewSchoolsPage() {
  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh", color: INK }}>
      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900 }}>泥金邊框 × 符印分隔線　五種背景動畫</h1>
        <p className="text-sm mb-1" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.78 }}>都是版本三的泥金邊框＋四角捲草飾，流派改成「──✦ 主 · 副 ✦──」分隔線，符號換成手繪魔法符印（無 emoji）。差別只在背景動畫，五選一。</p>
        <p className="text-xs mb-10" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.5 }}>獨立測試頁，不影響正式首頁。看完跟我說選哪個背景。</p>
        {SECTIONS.map(({ bg, name, blurb }) => (
          <section key={bg} className="mb-14">
            <div className="mb-2 inline-block px-4 py-2" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, fontSize: "1.15rem", color: "var(--parchment)", background: "var(--ink)" }}>{name}</div>
            <p className="text-sm mb-5" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.8, maxWidth: 660 }}>{blurb}</p>
            <div className="flex flex-wrap gap-6">{SAMPLES.map((c) => <FrameCard key={c.id} curse={c} bg={bg} />)}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
