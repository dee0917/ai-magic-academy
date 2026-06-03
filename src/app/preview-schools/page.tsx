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

/* shared bits */
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
function SchoolDivider({ curse }: { curse: Sample }) {
  const main = SCHOOL_CONFIG[curse.school]; const sub = SCHOOL_CONFIG[curse.subSchool];
  return (
    <div className="flex items-center gap-2 mx-5 my-1 relative z-20">
      <div className="flex-1" style={{ borderTop: "2px dashed var(--ink)", opacity: 0.3 }} />
      <span style={{ color: GOLD, fontSize: 12 }}>✦</span>
      <span className="flex items-center gap-1 text-[12px] font-black" style={{ fontFamily: "var(--font-noto-serif-tc)", color: INK }}><SchoolSigil school={curse.school} size={15} color={main.color} />{main.label}</span>
      <span style={{ color: INK, opacity: 0.4 }}>·</span>
      <span className="flex items-center gap-1 text-[12px] font-black" style={{ fontFamily: "var(--font-noto-serif-tc)", color: INK, opacity: 0.88 }}><SchoolSigil school={curse.subSchool} size={13} color={sub.color} />{sub.label}</span>
      <span style={{ color: GOLD, fontSize: 12 }}>✦</span>
      <div className="flex-1" style={{ borderTop: "2px dashed var(--ink)", opacity: 0.3 }} />
    </div>
  );
}
function FiligreeCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const place: React.CSSProperties = { tl: { top: 6, left: 6 }, tr: { top: 6, right: 6 }, bl: { bottom: 6, left: 6 }, br: { bottom: 6, right: 6 } }[pos];
  return (
    <svg className="filigree absolute z-20" style={{ ...place, transform: `rotate(${rot}deg)` }} width="32" height="32" viewBox="0 0 34 34" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <path d="M2 14 V2 H14" /><path d="M2 14 C2 7 7 2 14 2" /><path d="M6 6 C12 6 12 12 6 12" /><circle cx="4" cy="4" r="1.4" fill={GOLD} stroke="none" />
    </svg>
  );
}

/* rune glyph row (glowing) for the rune border */
const RUNE_PATHS = ["M3 1V13", "M3 1V13M3 4L8 1M3 8L8 5", "M2 1L8 7L2 13", "M3 1V13M3 1L8 4M3 7L8 4", "M2 7H10M6 2V12", "M3 1V13M8 1V13M3 7H8", "M2 2L8 12M8 2L2 12", "M5 1V13M2 4L5 1L8 4"];
function RuneRow({ n = 9 }: { n?: number }) {
  return (
    <div className="flex gap-2 items-center justify-center">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="bg-rune" width="10" height="13" viewBox="0 0 11 14" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 3px rgba(232,168,56,0.85))" }}><path d={RUNE_PATHS[i % RUNE_PATHS.length]} /></svg>
      ))}
    </div>
  );
}

/* the glowing magic circle, several styles */
type CircleStyle = "ticks" | "double" | "runerim" | "star" | "constellation";
function MagicCircle({ size, style, sigilColor, school }: { size: number; style: CircleStyle; sigilColor: string; school: SchoolType }) {
  const c = size / 2; const ro = size / 2 - 4; const ri = ro - 18;
  const glow = "drop-shadow(0 0 4px rgba(232,168,56,0.8))";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="mc-glow absolute inset-0" style={{ background: "radial-gradient(circle, rgba(232,168,56,0.45), rgba(232,168,56,0) 62%)", opacity: 0.4 }} />
      {/* outer rotating layer */}
      <div className="mc-outer absolute inset-0" style={{ transformOrigin: "50% 50%", filter: glow, opacity: 0.55 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" stroke={GOLD} strokeWidth="1.3">
          <circle cx={c} cy={c} r={ro} /><circle cx={c} cy={c} r={ri} />
          {style === "runerim"
            ? Array.from({ length: 16 }).map((_, i) => (<g key={i} transform={`rotate(${(i / 16) * 360} ${c} ${c})`}><path d="M0 -4V4M0 -1L3 -4" transform={`translate(${c} ${size / 2 - (ro + ri) / 2})`} strokeWidth="1.4" /></g>))
            : Array.from({ length: 24 }).map((_, i) => { const a = (i / 24) * Math.PI * 2; return <line key={i} x1={c + Math.cos(a) * ri} y1={c + Math.sin(a) * ri} x2={c + Math.cos(a) * ro} y2={c + Math.sin(a) * ro} />; })}
        </svg>
      </div>
      {/* inner layer (counter-rotatable) */}
      <div className="mc-inner absolute inset-0 flex items-center justify-center" style={{ transformOrigin: "50% 50%", filter: glow, opacity: 0.6 }}>
        <svg width={ri * 2} height={ri * 2} viewBox={`0 0 ${ri * 2} ${ri * 2}`} fill="none" stroke={GOLD} strokeWidth="1.3">
          {style === "double" && (<><circle cx={ri} cy={ri} r={ri - 8} /><path d={`M${ri} 4 L${2 * ri - 4} ${ri} L${ri} ${2 * ri - 4} L4 ${ri} Z`} /></>)}
          {(style === "star") && (<><circle cx={ri} cy={ri} r={ri - 10} /><path d={`M${ri} 5 L${ri + (ri - 7) * 0.866} ${ri + (ri - 7) * 0.5} L${ri - (ri - 7) * 0.866} ${ri + (ri - 7) * 0.5} Z`} /><path d={`M${ri} ${2 * ri - 5} L${ri + (ri - 7) * 0.866} ${ri - (ri - 7) * 0.5} L${ri - (ri - 7) * 0.866} ${ri - (ri - 7) * 0.5} Z`} /></>)}
          {style === "constellation" && (<>
            {[[ri, 8], [2 * ri - 10, ri - 6], [ri + 8, 2 * ri - 12], [12, ri + 8], [ri - 14, ri]].map((p, i) => <circle key={i} className="mc-twinkle" cx={p[0]} cy={p[1]} r="2.2" fill={GOLD} stroke="none" />)}
            <path d={`M${ri} 8 L${2 * ri - 10} ${ri - 6} L${ri + 8} ${2 * ri - 12} L12 ${ri + 8} L${ri - 14} ${ri} Z`} strokeWidth="1" opacity="0.7" />
          </>)}
          {style === "ticks" && <circle cx={ri} cy={ri} r={ri - 10} />}
          {style === "runerim" && <path d={`M${ri} 6 L${ri + (ri - 8) * 0.866} ${ri + (ri - 8) * 0.5} L${ri - (ri - 8) * 0.866} ${ri + (ri - 8) * 0.5} Z`} />}
        </svg>
      </div>
      {/* sigil core */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ filter: `drop-shadow(0 0 5px ${sigilColor})` }}>
        <SchoolSigil school={school} size={Math.round(size * 0.22)} color={sigilColor} strokeWidth={1.5} />
      </div>
    </div>
  );
}

type Anim = "pulse" | "rotate" | "counter" | "drift" | "shimmer";
type Opts = { runeBorder: boolean; size: number; style: CircleStyle; anim: Anim };

function ScrollCard({ curse, opts }: { curse: Sample; opts: Opts }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current; if (!el) return;
    const q = (s: string) => el.querySelectorAll<HTMLElement>(s);
    animate(q(".filigree"), { scale: [0.4, 1], opacity: [0, 1], duration: 650, delay: stagger(100), ease: "outBack" });
    if (opts.runeBorder) animate(q(".bg-rune"), { opacity: [0, 1], duration: 460, delay: stagger(55), ease: "outQuad" });
    const { anim } = opts;
    if (anim === "rotate") animate(q(".mc-outer"), { rotate: "1turn", loop: true, ease: "linear", duration: 42000 });
    if (anim === "counter") { animate(q(".mc-outer"), { rotate: "1turn", loop: true, ease: "linear", duration: 44000 }); animate(q(".mc-inner"), { rotate: "-1turn", loop: true, ease: "linear", duration: 30000 }); }
    if (anim === "pulse") { animate(q(".mc-glow"), { opacity: [0.25, 0.6], scale: [0.95, 1.07], loop: true, alternate: true, ease: "inOutSine", duration: 2200 }); animate(q(".mc-outer"), { rotate: "1turn", loop: true, ease: "linear", duration: 70000 }); }
    if (anim === "drift") { animate(q(".bg-rune"), { translateY: [6, -6], opacity: [0.45, 1], loop: true, alternate: true, ease: "inOutSine", duration: 3000, delay: stagger(180) }); animate(q(".mc-glow"), { opacity: [0.25, 0.55], loop: true, alternate: true, duration: 2400, ease: "inOutSine" }); }
    if (anim === "shimmer") { animate(q(".bg-shimmer"), { translateX: ["-130%", "130%"], loop: true, ease: "linear", duration: 3600 }); animate(q(".mc-outer"), { rotate: "1turn", loop: true, ease: "linear", duration: 80000 }); }
    if (opts.style === "constellation") animate(q(".mc-twinkle"), { opacity: [0.2, 0.95], loop: true, alternate: true, ease: "inOutSine", duration: 1400, delay: stagger(160) });
  }, [opts]);

  const tabColor = getTabColor(curse.tab); const tier = TIER_CONFIG[curse.tier];
  return (
    <div ref={root} className="flex-shrink-0 w-[300px] flex flex-col relative overflow-hidden" style={{ border: `4px solid ${tier.borderColor}`, boxShadow: "var(--shadow-sm)", background: PARCH }}>
      <div style={{ height: 6, background: tier.color }} />

      {/* magic circle behind everything */}
      <div className="absolute z-0 pointer-events-none" style={{ left: "50%", top: "53%", transform: "translate(-50%,-50%)" }}>
        <MagicCircle size={opts.size} style={opts.style} school={curse.school} sigilColor={SCHOOL_CONFIG[curse.school].color} />
      </div>
      {opts.anim === "shimmer" && <div className="bg-shimmer absolute z-0 pointer-events-none" style={{ top: 0, bottom: 0, width: "55%", left: 0, background: "linear-gradient(105deg, transparent, rgba(232,168,56,0.3), transparent)", transform: "skewX(-16deg)" }} />}

      {/* gold frame */}
      <FiligreeCorner pos="tl" /><FiligreeCorner pos="tr" /><FiligreeCorner pos="bl" /><FiligreeCorner pos="br" />
      <div className="absolute pointer-events-none z-20" style={{ inset: 12, border: `1px solid ${GOLD}`, opacity: 0.5 }} />

      {/* top rune border */}
      {opts.runeBorder && <div className="relative z-20 pt-4 pb-1"><RuneRow /></div>}

      {/* content */}
      <div className={`px-5 ${opts.runeBorder ? "pt-1" : "pt-5"} pb-3 flex items-start justify-between relative z-20`}>
        <div className="flex items-center gap-1.5 flex-wrap"><CategoryPill curse={curse} /><TierBadge curse={curse} /></div><RepIcon curse={curse} />
      </div>
      <h3 className="px-5 text-xl leading-tight relative z-20 mb-2" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, color: INK }}>{curse.title}</h3>
      <div className="px-5 pb-2 flex-1 relative z-20">
        <div style={{ borderLeft: `3px solid ${tabColor}`, paddingLeft: 12 }}>
          <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-noto-sans-tc)", color: INK, opacity: 0.78 }}>{curse.desc}</p>
        </div>
      </div>
      <SchoolDivider curse={curse} />
      {opts.runeBorder && <div className="relative z-20 pb-2 pt-1"><RuneRow n={9} /></div>}
      <div className="flex items-center justify-between px-5 py-3 relative z-20">
        <span className="text-[11px] font-black px-1.5 py-0.5 tracking-wider select-none" style={{ fontFamily: "var(--font-chivo)", color: WAX, border: `1.5px solid ${WAX}`, opacity: 0.8, transform: "rotate(-2deg)" }}>{curse.code}</span>
        <span className="flex items-center gap-1 text-xs font-black" style={{ fontFamily: "var(--font-noto-sans-tc)", color: tabColor }}>詠唱 →</span>
      </div>
    </div>
  );
}

/* 甲 = 版本三 泥金邊框衍生（金框＋符文邊＋中型符陣）；乙 = 版本四 星盤符環衍生（大符陣為主） */
const GROUP_A: { name: string; blurb: string; opts: Opts }[] = [
  { name: "甲一　符文呼吸", blurb: "金框＋上下發光符文邊，中央小符陣，符文與光暈呼吸般明滅。", opts: { runeBorder: true, size: 150, style: "ticks", anim: "pulse" } },
  { name: "甲二　符陣慢轉", blurb: "符文邊靜置發光，中央符陣持續緩慢旋轉。", opts: { runeBorder: true, size: 150, style: "ticks", anim: "rotate" } },
  { name: "甲三　雙環逆旋", blurb: "中央雙環＋菱形，內外環反向旋轉。", opts: { runeBorder: true, size: 150, style: "double", anim: "counter" } },
  { name: "甲四　符文流動", blurb: "上下符文上下飄動明滅，符陣光暈緩緩脈動。", opts: { runeBorder: true, size: 150, style: "ticks", anim: "drift" } },
  { name: "甲五　流金掃光", blurb: "中央六芒星核，一道斜金光週期掃過。", opts: { runeBorder: true, size: 150, style: "star", anim: "shimmer" } },
];
const GROUP_B: { name: string; blurb: string; opts: Opts }[] = [
  { name: "乙一　單環刻度", blurb: "大型符陣為主視覺：外環刻度＋內環，緩慢旋轉。", opts: { runeBorder: false, size: 224, style: "ticks", anim: "rotate" } },
  { name: "乙二　雙環逆旋", blurb: "大符陣，外環與內部菱形反向旋轉，最有法陣感。", opts: { runeBorder: false, size: 224, style: "double", anim: "counter" } },
  { name: "乙三　符文外環", blurb: "外環鑲一圈符文刻記，整圈緩慢旋轉。", opts: { runeBorder: false, size: 224, style: "runerim", anim: "rotate" } },
  { name: "乙四　星核脈光", blurb: "中央六芒星核，光暈脈動、外環極慢旋轉。", opts: { runeBorder: false, size: 224, style: "star", anim: "pulse" } },
  { name: "乙五　星座連線", blurb: "符陣化為星座連線，星點忽明忽暗閃爍。", opts: { runeBorder: false, size: 224, style: "constellation", anim: "pulse" } },
];

function Group({ title, items }: { title: string; items: typeof GROUP_A }) {
  return (
    <>
      <h2 className="text-2xl mt-6 mb-4" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, color: WAX }}>{title}</h2>
      {items.map((s) => (
        <section key={s.name} className="mb-12">
          <div className="mb-2 inline-block px-4 py-2" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, fontSize: "1.1rem", color: "var(--parchment)", background: "var(--ink)" }}>{s.name}</div>
          <p className="text-sm mb-5" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.8, maxWidth: 660 }}>{s.blurb}</p>
          <div className="flex flex-wrap gap-6">{SAMPLES.map((c) => <ScrollCard key={c.id} curse={c} opts={s.opts} />)}</div>
        </section>
      ))}
    </>
  );
}

export default function PreviewSchoolsPage() {
  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh", color: INK }}>
      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900 }}>符文 × 魔法陣　兩組各五版</h1>
        <p className="text-sm mb-1" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.78 }}>取你那張卷軸的「發光符文＋中央魔法陣」感覺。甲組＝版本三泥金邊框（金框＋符文邊＋中型符陣），乙組＝版本四星盤符環（大型符陣當主視覺）。流派一律用手繪符印（無 emoji），發光統一金黃以配合調性。</p>
        <p className="text-xs mb-8" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.5 }}>獨立測試頁，不影響正式首頁。看完跟我說「甲幾」或「乙幾」。</p>
        <Group title="甲組　泥金邊框（版本三）" items={GROUP_A} />
        <Group title="乙組　星盤符環（版本四）" items={GROUP_B} />
      </div>
    </div>
  );
}
