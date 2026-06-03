"use client";
import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { SCHOOL_CONFIG, TIER_CONFIG, getTabColor } from "../lib/constants";
import type { SchoolType } from "../curses_data";
import { SchoolSigil } from "../components/SchoolSigil";

const PARCH = "#FEFAF0";
const INK = "var(--ink)";
const WAX = "#8B2626"; // dark-red wax
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

/* ───────────────── shared pieces (all variants keep these) ───────────────── */
function CategoryPill({ curse }: { curse: Sample }) {
  const tabColor = getTabColor(curse.tab);
  return <span className="text-[11px] font-black px-2 py-1" style={{ background: tabColor, fontFamily: "var(--font-chivo)", color: PARCH }}>{curse.tab}</span>;
}
function TierBadge({ curse }: { curse: Sample }) {
  const tier = TIER_CONFIG[curse.tier];
  const c = curse.tier === "forbidden" ? "#D4AF37" : tier.color;
  return <span className="text-[11px] font-black px-2 py-1 tracking-wider" style={{ fontFamily: "var(--font-chivo)", color: c, border: `2px solid ${c}`, background: curse.tier === "forbidden" ? "#1F2937" : "transparent" }}>{tier.label}</span>;
}
function RepIcon({ curse }: { curse: Sample }) {
  return <span className="text-lg" style={{ color: INK, opacity: 0.4 }}>{curse.icon}</span>;
}
function Desc({ curse }: { curse: Sample }) {
  const tabColor = getTabColor(curse.tab);
  return (
    <div className="px-5 py-3 flex-1">
      <div style={{ borderLeft: `3px solid ${tabColor}`, paddingLeft: "12px" }}>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-noto-sans-tc)", color: INK, opacity: 0.75 }}>{curse.desc}</p>
      </div>
    </div>
  );
}
function Footer({ curse }: { curse: Sample }) {
  const tabColor = getTabColor(curse.tab);
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <span className="text-[11px] font-black px-1.5 py-0.5 tracking-wider select-none" style={{ fontFamily: "var(--font-chivo)", color: WAX, border: `1.5px solid ${WAX}`, opacity: 0.8, transform: "rotate(-2deg)" }}>{curse.code}</span>
      <span className="flex items-center gap-1 text-xs font-black" style={{ fontFamily: "var(--font-noto-sans-tc)", color: tabColor }}>詠唱 →</span>
    </div>
  );
}
function shellStyle(curse: Sample): React.CSSProperties {
  const tier = TIER_CONFIG[curse.tier];
  return { border: `4px solid ${tier.borderColor}`, boxShadow: "var(--shadow-sm)", background: PARCH };
}
function TopStripe({ curse }: { curse: Sample }) {
  const tier = TIER_CONFIG[curse.tier];
  return <div style={{ height: "6px", background: tier.color }} />;
}

/* ───────────────── V1 — 垂吊封蠟 (hanging charter seals) ───────────────── */
function V1Pendant({ curse }: { curse: Sample }) {
  const root = useRef<HTMLDivElement>(null);
  const main = SCHOOL_CONFIG[curse.school];
  const sub = SCHOOL_CONFIG[curse.subSchool];
  useEffect(() => {
    const el = root.current; if (!el) return;
    animate(el.querySelectorAll<HTMLElement>(".seal-drop"), { y: [-16, 0], opacity: [0, 1], duration: 600, delay: stagger(120), ease: "outBack" });
    animate(el.querySelectorAll<HTMLElement>(".seal-swing"), { rotate: [-3.5, 3.5], loop: true, alternate: true, ease: "inOutSine", duration: 2600, delay: stagger(300) });
  }, []);
  const Seal = ({ s, big }: { s: typeof main; big?: boolean }) => {
    const d = big ? 44 : 30;
    return (
      <div className="seal-swing flex flex-col items-center" style={{ transformOrigin: "top center" }}>
        <div style={{ width: 2, height: big ? 16 : 11, background: INK, opacity: 0.7 }} />
        <div className="seal-drop flex items-center justify-center" style={{ width: d, height: d, borderRadius: "50%", background: WAX, border: "2px solid var(--ink)", boxShadow: "3px 3px 0 var(--ink)" }}>
          <SchoolSigil school={s === main ? curse.school : curse.subSchool} size={big ? 24 : 17} color={PARCH} strokeWidth={1.6} />
        </div>
        <span className="mt-1 text-[10px] font-black tracking-wide" style={{ fontFamily: "var(--font-noto-serif-tc)", color: INK }}>{s.label}</span>
      </div>
    );
  };
  return (
    <div ref={root} className="flex-shrink-0 w-[300px] flex flex-col relative overflow-hidden" style={shellStyle(curse)}>
      <TopStripe curse={curse} />
      <div className="p-5 pb-3 flex items-start justify-between"><div className="flex items-center gap-1.5 flex-wrap"><CategoryPill curse={curse} /><TierBadge curse={curse} /></div><RepIcon curse={curse} /></div>
      <h3 className="px-5 text-xl leading-tight" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, color: INK }}>{curse.title}</h3>
      <Desc curse={curse} />
      <div className="mx-5" style={{ borderTop: "2px dashed var(--ink)", opacity: 0.3 }} />
      <div className="flex items-start justify-center gap-7 pt-2 pb-1">
        <Seal s={main} big />
        <Seal s={sub} />
      </div>
      <Footer curse={curse} />
    </div>
  );
}

/* ───────────────── V2 — 燕尾紋章絲帶 (forked heraldic ribbon) ───────────────── */
function V2Ribbon({ curse }: { curse: Sample }) {
  const root = useRef<HTMLDivElement>(null);
  const main = SCHOOL_CONFIG[curse.school];
  const sub = SCHOOL_CONFIG[curse.subSchool];
  useEffect(() => {
    const el = root.current; if (!el) return;
    animate(el.querySelectorAll<HTMLElement>(".ribbon-main"), { scaleX: [0, 1], opacity: [0, 1], duration: 760, ease: "outExpo" });
    animate(el.querySelectorAll<HTMLElement>(".ribbon-sub"), { scaleX: [0, 1], opacity: [0, 1], duration: 700, delay: 220, ease: "outExpo" });
  }, []);
  return (
    <div ref={root} className="flex-shrink-0 w-[300px] flex flex-col relative overflow-hidden" style={shellStyle(curse)}>
      <TopStripe curse={curse} />
      <div className="p-5 pb-3 flex items-start justify-between"><div className="flex items-center gap-1.5 flex-wrap"><CategoryPill curse={curse} /><TierBadge curse={curse} /></div><RepIcon curse={curse} /></div>
      <h3 className="px-5 text-xl leading-tight" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, color: INK }}>{curse.title}</h3>
      <Desc curse={curse} />
      {/* main ribbon banner with folded ends + swallowtail */}
      <div className="relative mt-1 mb-2" style={{ height: 64 }}>
        <div className="ribbon-main absolute left-0 right-0" style={{ top: 8, transformOrigin: "center" }}>
          {/* fold tabs behind */}
          <div className="absolute" style={{ left: 6, top: -6, width: 16, height: 12, background: main.color, filter: "brightness(0.62)", clipPath: "polygon(0 0,100% 0,100% 100%)" }} />
          <div className="absolute" style={{ right: 6, top: -6, width: 16, height: 12, background: main.color, filter: "brightness(0.62)", clipPath: "polygon(0 0,100% 0,0 100%)" }} />
          <div className="mx-3 flex items-center justify-center gap-2" style={{ height: 30, background: main.color, color: PARCH, boxShadow: "0 3px 0 rgba(0,0,0,0.28)", clipPath: "polygon(0 0,100% 0,100% 70%,92% 100%,50% 78%,8% 100%,0 70%)" }}>
            <SchoolSigil school={curse.school} size={17} color={PARCH} strokeWidth={1.7} />
            <span className="text-[13px] font-black tracking-wide" style={{ fontFamily: "var(--font-noto-serif-tc)" }}>{main.label}</span>
          </div>
        </div>
        {/* sub ribbon tail */}
        <div className="ribbon-sub absolute" style={{ top: 40, left: "50%", transform: "translateX(-50%)", transformOrigin: "center" }}>
          <div className="flex items-center gap-1 px-3" style={{ height: 20, background: sub.color, color: PARCH, opacity: 0.92, clipPath: "polygon(0 0,100% 0,90% 100%,50% 72%,10% 100%)" }}>
            <SchoolSigil school={curse.subSchool} size={12} color={PARCH} strokeWidth={1.8} />
            <span className="text-[10px] font-black" style={{ fontFamily: "var(--font-noto-serif-tc)" }}>{sub.label}</span>
          </div>
        </div>
      </div>
      <Footer curse={curse} />
    </div>
  );
}

/* ───────────────── V3 — 泥金邊框 (illuminated gold frame + cartouche) ───────────────── */
function FiligreeCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const place: React.CSSProperties = {
    tl: { top: 6, left: 6 }, tr: { top: 6, right: 6 }, bl: { bottom: 6, left: 6 }, br: { bottom: 6, right: 6 },
  }[pos];
  return (
    <svg className="filigree absolute" style={{ ...place, transform: `rotate(${rot}deg)` }} width="34" height="34" viewBox="0 0 34 34" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <path d="M2 14 V2 H14" />
      <path d="M2 14 C2 7 7 2 14 2" />
      <path d="M6 6 C12 6 12 12 6 12" />
      <circle cx="4" cy="4" r="1.4" fill={GOLD} stroke="none" />
    </svg>
  );
}
function V3Frame({ curse }: { curse: Sample }) {
  const root = useRef<HTMLDivElement>(null);
  const main = SCHOOL_CONFIG[curse.school];
  const sub = SCHOOL_CONFIG[curse.subSchool];
  useEffect(() => {
    const el = root.current; if (!el) return;
    animate(el.querySelectorAll<HTMLElement>(".filigree"), { scale: [0.4, 1], opacity: [0, 1], duration: 700, delay: stagger(110), ease: "outBack" });
    animate(el.querySelectorAll<HTMLElement>(".cartouche"), { y: [10, 0], opacity: [0, 1], duration: 700, delay: 360, ease: "outExpo" });
  }, []);
  return (
    <div ref={root} className="flex-shrink-0 w-[300px] flex flex-col relative overflow-hidden" style={shellStyle(curse)}>
      <TopStripe curse={curse} />
      <FiligreeCorner pos="tl" /><FiligreeCorner pos="tr" /><FiligreeCorner pos="bl" /><FiligreeCorner pos="br" />
      <div className="absolute pointer-events-none" style={{ inset: 12, border: `1px solid ${GOLD}`, opacity: 0.5 }} />
      <div className="p-5 pb-3 flex items-start justify-between relative z-10"><div className="flex items-center gap-1.5 flex-wrap"><CategoryPill curse={curse} /><TierBadge curse={curse} /></div><RepIcon curse={curse} /></div>
      <h3 className="px-5 text-xl leading-tight relative z-10" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, color: INK }}>{curse.title}</h3>
      <Desc curse={curse} />
      {/* gold cartouche carrying the schools */}
      <div className="cartouche mx-auto mb-2 flex items-center gap-2 px-4 py-1.5" style={{ border: `1.5px solid ${GOLD}`, background: "rgba(232,168,56,0.10)", boxShadow: "2px 2px 0 rgba(42,39,35,0.25)" }}>
        <span className="flex items-center gap-1" style={{ color: main.color }}><SchoolSigil school={curse.school} size={16} color={main.color} /><span className="text-[12px] font-black" style={{ fontFamily: "var(--font-noto-serif-tc)", color: INK }}>{main.label}</span></span>
        <span style={{ color: GOLD }}>✦</span>
        <span className="flex items-center gap-1" style={{ opacity: 0.85 }}><SchoolSigil school={curse.subSchool} size={13} color={sub.color} /><span className="text-[11px] font-black" style={{ fontFamily: "var(--font-noto-serif-tc)", color: INK }}>{sub.label}</span></span>
      </div>
      <Footer curse={curse} />
    </div>
  );
}

/* ───────────────── V4 — 星盤符環 (rotating arcane sigil ring) ───────────────── */
function V4SigilRing({ curse }: { curse: Sample }) {
  const root = useRef<HTMLDivElement>(null);
  const main = SCHOOL_CONFIG[curse.school];
  const sub = SCHOOL_CONFIG[curse.subSchool];
  useEffect(() => {
    const el = root.current; if (!el) return;
    animate(el.querySelectorAll<HTMLElement>(".ring-spin"), { rotate: "1turn", loop: true, ease: "linear", duration: 44000 });
    animate(el.querySelectorAll<HTMLElement>(".ring-fade"), { scale: [0.6, 1], opacity: [0, 0.16], duration: 1000, ease: "outQuad" });
  }, []);
  const ticks = Array.from({ length: 24 });
  return (
    <div ref={root} className="flex-shrink-0 w-[300px] flex flex-col relative overflow-hidden" style={shellStyle(curse)}>
      <TopStripe curse={curse} />
      {/* watermark arcane ring */}
      <div className="ring-fade absolute" style={{ right: -34, top: 34, width: 200, height: 200, opacity: 0.16, color: INK }}>
        <div className="ring-spin absolute inset-0" style={{ transformOrigin: "50% 50%" }}>
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" stroke={INK} strokeWidth="1.4">
            <circle cx="100" cy="100" r="92" /><circle cx="100" cy="100" r="74" /><circle cx="100" cy="100" r="50" />
            {ticks.map((_, i) => { const a = (i / 24) * Math.PI * 2; return <line key={i} x1={100 + Math.cos(a) * 74} y1={100 + Math.sin(a) * 74} x2={100 + Math.cos(a) * 92} y2={100 + Math.sin(a) * 92} />; })}
            <path d="M100 26 L130 100 L100 174 L70 100 Z" />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center"><SchoolSigil school={curse.school} size={56} color={INK} strokeWidth={1.2} /></div>
      </div>
      <div className="p-5 pb-3 flex items-start justify-between relative z-10"><div className="flex items-center gap-1.5 flex-wrap"><CategoryPill curse={curse} /><TierBadge curse={curse} /></div><RepIcon curse={curse} /></div>
      <h3 className="px-5 text-xl leading-tight relative z-10" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, color: INK }}>{curse.title}</h3>
      <Desc curse={curse} />
      <div className="mx-5" style={{ borderTop: "2px dashed var(--ink)", opacity: 0.3 }} />
      <div className="relative z-10 flex items-center gap-2 px-5 py-2 text-[12px] font-black" style={{ fontFamily: "var(--font-noto-serif-tc)", color: INK }}>
        <SchoolSigil school={curse.school} size={15} color={main.color} />{main.label}
        <span style={{ opacity: 0.4 }}>·</span>
        <SchoolSigil school={curse.subSchool} size={13} color={sub.color} /><span style={{ opacity: 0.85 }}>{sub.label}</span>
      </div>
      <Footer curse={curse} />
    </div>
  );
}

/* ───────────────── V5 — 烙印符牌 (letterpress sigil cartouche, stamp-in) ───────────────── */
function V5Cartouche({ curse }: { curse: Sample }) {
  const root = useRef<HTMLDivElement>(null);
  const main = SCHOOL_CONFIG[curse.school];
  const sub = SCHOOL_CONFIG[curse.subSchool];
  useEffect(() => {
    const el = root.current; if (!el) return;
    animate(el.querySelectorAll<HTMLElement>(".stamp"), { scale: [1.5, 1], rotate: [-9, 0], opacity: [0, 1], duration: 720, ease: "outBack" });
  }, []);
  return (
    <div ref={root} className="flex-shrink-0 w-[300px] flex flex-col relative overflow-hidden" style={shellStyle(curse)}>
      <TopStripe curse={curse} />
      {/* stamped rectangular sigil plaque, top-right */}
      <div className="stamp absolute z-20" style={{ top: 14, right: 14, transformOrigin: "center" }}>
        <div className="flex flex-col items-center px-2.5 py-1.5" style={{ border: `2px solid ${main.color}`, background: PARCH, boxShadow: "3px 3px 0 var(--ink)", transform: "rotate(-3deg)" }}>
          <SchoolSigil school={curse.school} size={22} color={main.color} strokeWidth={1.8} />
          <span className="mt-0.5 text-[11px] font-black tracking-widest" style={{ fontFamily: "var(--font-noto-serif-tc)", color: INK }}>{main.label}</span>
          <span className="mt-0.5 flex items-center gap-1 text-[9px] font-bold" style={{ fontFamily: "var(--font-noto-serif-tc)", color: sub.color, borderTop: `1px dashed ${sub.color}`, paddingTop: 2 }}>
            <SchoolSigil school={curse.subSchool} size={10} color={sub.color} strokeWidth={2} />{sub.label}
          </span>
        </div>
      </div>
      <div className="p-5 pb-3 flex items-start" style={{ paddingRight: 96 }}><div className="flex items-center gap-1.5 flex-wrap"><CategoryPill curse={curse} /><TierBadge curse={curse} /></div></div>
      <h3 className="px-5 text-xl leading-tight" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, color: INK, paddingRight: 96 }}>{curse.title}</h3>
      <Desc curse={curse} />
      <div className="mx-5" style={{ borderTop: "2px dashed var(--ink)", opacity: 0.3 }} />
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-[11px] font-black px-1.5 py-0.5 tracking-wider select-none" style={{ fontFamily: "var(--font-chivo)", color: WAX, border: `1.5px solid ${WAX}`, opacity: 0.8, transform: "rotate(-2deg)" }}>{curse.code}</span>
        <span className="flex items-center gap-1.5 text-xs font-black" style={{ fontFamily: "var(--font-noto-sans-tc)", color: getTabColor(curse.tab) }}><RepIcon curse={curse} />詠唱 →</span>
      </div>
    </div>
  );
}

/* ───────────────── page ───────────────── */
const SECTIONS = [
  { Comp: V1Pendant, name: "版本一　垂吊封蠟", blurb: "從中縫垂下兩枚火漆封印（主大、副小），印面是該流派的手繪符印，下方標名。載入時封印落下、之後像吊牌一樣輕輕擺動。" },
  { Comp: V2Ribbon, name: "版本二　燕尾紋章絲帶", blurb: "真正的絲帶：兩端有回摺暗面、底邊燕尾開叉，帶上是符印＋流派名。副流派是下方小尾旗。載入時由中心展開。不擋分類與階級。" },
  { Comp: V3Frame, name: "版本三　泥金邊框", blurb: "四角泥金捲草飾＋內金線框，像泥金裝飾手抄本。流派收進底部金邊飾牌（符印＋名）。載入時四角逐一綻放、飾牌升起。" },
  { Comp: V4SigilRing, name: "版本四　星盤符環", blurb: "背景一枚緩慢旋轉的占星符環（刻度＋菱星＋中心符印）當暗紋，流派名收在下方一行。最有古魔法陣的氛圍。" },
  { Comp: V5Cartouche, name: "版本五　烙印符牌", blurb: "右上角一塊長方形烙印符牌（非圓章）：符印＋主流派名，下緣虛線接副流派。載入時像蓋章般砸下。代表圖示移到頁腳詠唱旁。" },
] as const;

export default function PreviewSchoolsPage() {
  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh", color: INK }}>
      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900 }}>流派呈現　五版設計</h1>
        <p className="text-sm mb-1" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.78 }}>融合魔法卷軸元素（封蠟／絲帶／泥金邊框／符環／烙印），全部用手繪符印取代 emoji，流派名直接寫出來（不靠長按）。每版都有 anime.js 載入動畫。</p>
        <p className="text-xs mb-10" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.5 }}>獨立測試頁，不影響正式首頁。看完跟我說選哪版，我再套上去。</p>
        {SECTIONS.map(({ Comp, name, blurb }) => (
          <section key={name} className="mb-14">
            <div className="mb-2 inline-block px-4 py-2" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, fontSize: "1.15rem", color: "var(--parchment)", background: "var(--ink)" }}>{name}</div>
            <p className="text-sm mb-5" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.8, maxWidth: 660 }}>{blurb}</p>
            <div className="flex flex-wrap gap-6">{SAMPLES.map((c) => <Comp key={c.id} curse={c} />)}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
