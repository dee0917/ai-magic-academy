import React from "react";
import { SCHOOL_CONFIG, TIER_CONFIG, getTabColor } from "../lib/constants";
import type { SchoolType } from "../curses_data";

export const metadata = {
  title: "流派呈現方案預覽",
  robots: { index: false, follow: false },
};

type Sample = {
  id: string;
  tab: string;
  tier: keyof typeof TIER_CONFIG;
  school: SchoolType;
  subSchool: SchoolType;
  title: string;
  desc: string;
  icon: string;
  code: string;
};

const SAMPLES: Sample[] = [
  {
    id: "demo1", tab: "職場求生", tier: "master",
    school: "attack", subSchool: "insight",
    title: "奪回戰功術", icon: "⚔️", code: "Ⅲ-SV-014",
    desc: "被同事搶了功勞？這道咒語幫你在不撕破臉的前提下，把成果重新標記回自己名下。",
  },
  {
    id: "demo2", tab: "人際擋箭", tier: "archmage",
    school: "illusion", subSchool: "attack",
    title: "親戚提問防護罩", icon: "🛡️", code: "Ⅳ-AR-003",
    desc: "過年被問薪水感情？一鍵生成讓全桌笑場、對方不好追問的擋招話術。",
  },
  {
    id: "demo3", tab: "創業/自媒體", tier: "forbidden",
    school: "contract", subSchool: "defense",
    title: "合夥拆夥保命契", icon: "📜", code: "Ⅴ-BZ-001",
    desc: "合夥要拆夥？先把醜話寫成漂亮條款，保護自己不被坑也不傷和氣。",
  },
];

type Variant = "current" | "divider" | "sash" | "crest";

function Card({ curse, variant }: { curse: Sample; variant: Variant }) {
  const tier = TIER_CONFIG[curse.tier];
  const tabColor = getTabColor(curse.tab);
  const main = SCHOOL_CONFIG[curse.school];
  const sub = SCHOOL_CONFIG[curse.subSchool];
  const schoolTitle = `主流派：${main.label}　副流派：${sub.label}`;

  return (
    <div
      className="flex-shrink-0 w-[300px] flex flex-col relative overflow-hidden"
      style={{ border: `4px solid ${tier.borderColor}`, boxShadow: "var(--shadow-sm)", background: tier.bgGlow }}
    >
      {/* top stripe */}
      <div style={{ height: "6px", background: tier.color }} />

      {/* VARIANT 2 — diagonal corner sash */}
      {variant === "sash" && (
        <div className="absolute top-0 left-0 z-20 pointer-events-none" title={schoolTitle}>
          <div
            className="absolute"
            style={{
              top: "16px", left: "-44px", width: "150px", textAlign: "center",
              transform: "rotate(-45deg)", transformOrigin: "center",
              background: main.color, color: "#FEFAF0",
              fontFamily: "var(--font-noto-sans-tc)", fontWeight: 900, fontSize: "11px",
              padding: "3px 0", boxShadow: "0 2px 0 rgba(0,0,0,0.3)", letterSpacing: "0.05em",
            }}
          >
            {main.emoji}{main.label}
          </div>
          <div
            className="absolute"
            style={{
              top: "38px", left: "-44px", width: "150px", textAlign: "center",
              transform: "rotate(-45deg)", transformOrigin: "center",
              background: sub.color, color: "#FEFAF0",
              fontFamily: "var(--font-noto-sans-tc)", fontWeight: 900, fontSize: "9px",
              padding: "2px 0", opacity: 0.9,
            }}
          >
            {sub.emoji}{sub.label}
          </div>
        </div>
      )}

      {/* header */}
      <div className="p-5 pb-3 relative" style={variant === "sash" ? { paddingTop: "30px" } : undefined}>
        <div className="flex items-start justify-between mb-3 relative z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="text-[11px] font-black px-2 py-1" style={{ background: tabColor, fontFamily: "var(--font-chivo)", color: "#FEFAF0" }}>
              {curse.tab}
            </div>
            <div
              className="text-[11px] font-black px-2 py-1 tracking-wider"
              style={{
                fontFamily: "var(--font-chivo)",
                color: curse.tier === "forbidden" ? "#D4AF37" : tier.color,
                border: `2px solid ${curse.tier === "forbidden" ? "#D4AF37" : tier.color}`,
                background: curse.tier === "forbidden" ? "#1F2937" : "transparent",
              }}
            >
              {tier.label}
            </div>

            {/* VARIANT current — school pills inline (the crowded original) */}
            {variant === "current" && (
              <>
                <div className="text-[11px] font-black px-2 py-1 tracking-wider flex items-center gap-1"
                  style={{ fontFamily: "var(--font-chivo)", color: main.color, border: `2px solid ${main.color}`, background: "transparent" }}>
                  <span>{main.emoji}</span>{main.label}
                </div>
                <div className="text-[11px] font-black px-2 py-1 tracking-wider flex items-center gap-1"
                  style={{ fontFamily: "var(--font-chivo)", color: sub.color, border: `2px dashed ${sub.color}`, background: "transparent", opacity: 0.75 }}>
                  <span>{sub.emoji}</span>{sub.label}
                </div>
              </>
            )}
          </div>

          {/* original representative icon — kept in every variant */}
          <div className="text-lg" style={{ color: "var(--ink)", opacity: 0.4 }}>
            {curse.icon}
          </div>
        </div>

        {/* title */}
        <h3 className="text-xl leading-tight mb-0 relative z-10 flex items-center gap-2" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, color: "var(--ink)" }}>
          {/* VARIANT 3 — two-color geometric crest before the title */}
          {variant === "crest" && (
            <span className="relative inline-block flex-shrink-0" style={{ width: "22px", height: "22px" }} title={schoolTitle}>
              <span className="absolute" style={{ width: "13px", height: "13px", right: 0, bottom: 0, background: sub.color, transform: "rotate(45deg)", boxShadow: "1.5px 1.5px 0 var(--ink)" }} />
              <span className="absolute" style={{ width: "15px", height: "15px", left: 0, top: 0, background: main.color, transform: "rotate(45deg)", boxShadow: "1.5px 1.5px 0 var(--ink)" }} />
            </span>
          )}
          <span>{curse.title}</span>
        </h3>
      </div>

      {/* description */}
      <div className="px-5 py-3 flex-1">
        <div style={{ borderLeft: `3px solid ${tabColor}`, paddingLeft: "12px" }}>
          <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-noto-sans-tc)", color: "var(--ink)", opacity: 0.75 }}>
            {curse.desc}
          </p>
        </div>
      </div>

      {/* VARIANT 1 — illuminated divider medallion carrying the schools */}
      {variant === "divider" ? (
        <div className="mx-5 my-1 flex items-center gap-2" title={schoolTitle}>
          <div className="flex-1" style={{ borderTop: "2px dashed var(--ink)", opacity: 0.3 }} />
          <span style={{ color: "var(--mustard)", fontSize: "12px" }}>✦</span>
          <span className="flex items-center gap-1 text-[12px] font-black tracking-wide" style={{ fontFamily: "var(--font-noto-serif-tc)", color: main.color }}>
            {main.emoji}{main.label}
          </span>
          <span style={{ color: "var(--ink)", opacity: 0.4 }}>·</span>
          <span className="flex items-center gap-1 text-[12px] font-black tracking-wide" style={{ fontFamily: "var(--font-noto-serif-tc)", color: sub.color, opacity: 0.85 }}>
            {sub.emoji}{sub.label}
          </span>
          <span style={{ color: "var(--mustard)", fontSize: "12px" }}>✦</span>
          <div className="flex-1" style={{ borderTop: "2px dashed var(--ink)", opacity: 0.3 }} />
        </div>
      ) : (
        <div className="mx-5" style={{ borderTop: "2px dashed var(--ink)", opacity: 0.3 }} />
      )}

      {/* footer */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-[11px] font-black px-1.5 py-0.5 tracking-wider select-none"
          style={{ fontFamily: "var(--font-chivo)", color: "var(--dark-red)", border: "1.5px solid var(--dark-red)", opacity: 0.8, transform: "rotate(-2deg)" }}>
          {curse.code}
        </span>
        <span className="flex items-center gap-1 text-xs font-black" style={{ fontFamily: "var(--font-noto-sans-tc)", color: tabColor }}>
          詠唱 →
        </span>
      </div>
    </div>
  );
}

const SECTIONS: { variant: Variant; name: string; blurb: string }[] = [
  { variant: "current", name: "現況（目前線上）", blurb: "主副流派是上排兩顆獨立標籤，4 顆擠在一起會換行、把標題往下推。" },
  { variant: "divider", name: "方案一　紋章飾帶分隔線", blurb: "流派搬到卡片中段的虛線上，做成手抄本花式分隔飾帶（✦ 星花）。上排只剩分類＋階級＋圖示，最乾淨、風險最低。" },
  { variant: "sash", name: "方案二　斜角紋章絲帶", blurb: "左上角斜貼雙層硬邊絲帶：主流派在上、副流派在下。最有卷軸／紋章氣勢、最顯眼，上排排版動最多。" },
  { variant: "crest", name: "方案三　標題前雙色紋章", blurb: "標題前加一顆雙色菱形紋章（畫的、非 emoji），主色＋副色各一塊。省空間、像首字章。" },
];

export default function PreviewSchoolsPage() {
  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh", color: "var(--ink)" }}>
      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900 }}>
          流派呈現方案預覽
        </h1>
        <p className="text-sm mb-1" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.75 }}>
          每個方案都保留全部元素（右上代表圖示照舊）。手機長按色塊可看主副流派全名。看完跟我說選哪個，我再套到正式網站。
        </p>
        <p className="text-xs mb-10" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.5 }}>
          這是測試頁，不影響正式首頁。
        </p>

        {SECTIONS.map((s) => (
          <section key={s.variant} className="mb-14">
            <div className="mb-2 inline-block px-4 py-2"
              style={{ fontFamily: "var(--font-noto-serif-tc)", fontWeight: 900, fontSize: "1.15rem", color: "var(--parchment)", background: "var(--ink)" }}>
              {s.name}
            </div>
            <p className="text-sm mb-5" style={{ fontFamily: "var(--font-noto-sans-tc)", opacity: 0.8, maxWidth: "640px" }}>
              {s.blurb}
            </p>
            <div className="flex flex-wrap gap-6">
              {SAMPLES.map((c) => (
                <Card key={c.id} curse={c} variant={s.variant} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
