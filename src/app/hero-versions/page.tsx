"use client";
import React, { useState } from "react";

const versions = [
  {
    id: 1,
    name: "版本 A — 報紙大標",
    desc: "復古報紙風，標題極大，副標在細線框內",
  },
  {
    id: 2,
    name: "版本 B — 印章徽章",
    desc: "標題置中，副標放入黃色印章方框",
  },
  {
    id: 3,
    name: "版本 C — 左對齊編輯",
    desc: "標題靠左，副標靠右，報紙欄位感",
  },
  {
    id: 4,
    name: "版本 D — 極簡呼吸",
    desc: "大留白，小標題，副標字體更大更主體",
  },
  {
    id: 5,
    name: "版本 E — 雙行裝飾",
    desc: "標題分兩行加裝飾符號，副標在虛線框",
  },
];

function VersionA() {
  return (
    <div className="w-full pt-8 pb-6 px-6" style={{ borderBottom: "4px solid #2A2723" }}>
      {/* Masthead top bar */}
      <div className="flex items-center justify-between mb-3" style={{ borderBottom: "3px solid #2A2723", paddingBottom: "8px" }}>
        <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.3em", color: "#1A5C5A", textTransform: "uppercase" }}>
          Vol. I — 現代魔法法典
        </span>
        <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#2A2723", opacity: 0.45, textTransform: "uppercase" }}>
          Est. 2025
        </span>
      </div>

      {/* Giant newspaper headline */}
      <div className="text-center mb-0">
        <h1 style={{
          fontFamily: "var(--font-rye)",
          fontSize: "clamp(3rem, 12vw, 6rem)",
          lineHeight: 1,
          color: "#2A2723",
          letterSpacing: "-0.02em",
          marginBottom: "0px",
        }}>
          麻瓜專用
        </h1>
        {/* Thick rule between title lines */}
        <div style={{ height: "4px", background: "#2A2723", margin: "6px 0" }} />
        <h1 style={{
          fontFamily: "var(--font-rye)",
          fontSize: "clamp(3rem, 12vw, 6rem)",
          lineHeight: 1,
          color: "#2A2723",
          letterSpacing: "-0.02em",
          marginBottom: "16px",
        }}>
          魔法外掛
        </h1>

        {/* Subtitle in fine-border box */}
        <div style={{
          border: "2px solid #2A2723",
          padding: "10px 20px",
          maxWidth: "540px",
          margin: "0 auto",
          background: "transparent",
        }}>
          <p style={{
            fontFamily: "var(--font-noto-sans-tc)",
            fontSize: "13px",
            color: "#2A2723",
            opacity: 0.8,
            lineHeight: 1.7,
            margin: 0,
          }}>
            將複雜的「提示詞」封裝成一鍵釋放的魔法。<br />
            應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。
          </p>
        </div>
      </div>
    </div>
  );
}

function VersionB() {
  return (
    <div className="w-full pt-8 pb-6 px-6 text-center" style={{ borderBottom: "4px solid #2A2723" }}>
      {/* Masthead top bar */}
      <div className="flex items-center justify-between mb-5" style={{ borderBottom: "3px solid #2A2723", paddingBottom: "8px" }}>
        <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.3em", color: "#1A5C5A", textTransform: "uppercase" }}>
          Vol. I — 現代魔法法典
        </span>
        <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#2A2723", opacity: 0.45, textTransform: "uppercase" }}>
          Est. 2025
        </span>
      </div>

      {/* Ornament line above */}
      <p style={{ fontFamily: "var(--font-chivo)", fontSize: "11px", fontWeight: 900, letterSpacing: "0.5em", color: "#1A5C5A", textTransform: "uppercase", marginBottom: "12px" }}>
        ── ✦ MODERN SPELL CODEX ✦ ──
      </p>

      {/* Title */}
      <h1 style={{
        fontFamily: "var(--font-rye)",
        fontSize: "clamp(2.8rem, 10vw, 5.5rem)",
        lineHeight: 1.05,
        color: "#2A2723",
        marginBottom: "20px",
      }}>
        麻瓜專用<br />魔法外掛
      </h1>

      {/* Subtitle in mustard stamp box */}
      <div style={{
        background: "#E8A838",
        border: "4px solid #2A2723",
        boxShadow: "6px 6px 0px #2A2723",
        padding: "12px 24px",
        maxWidth: "480px",
        margin: "0 auto",
        display: "inline-block",
      }}>
        <p style={{
          fontFamily: "var(--font-noto-sans-tc)",
          fontSize: "13px",
          fontWeight: 700,
          color: "#2A2723",
          lineHeight: 1.7,
          margin: 0,
        }}>
          將複雜的「提示詞」封裝成一鍵釋放的魔法。<br />
          應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。
        </p>
      </div>
    </div>
  );
}

function VersionC() {
  return (
    <div className="w-full pt-8 pb-6 px-6" style={{ borderBottom: "4px solid #2A2723" }}>
      {/* Masthead top bar */}
      <div className="flex items-center justify-between mb-5" style={{ borderBottom: "3px solid #2A2723", paddingBottom: "8px" }}>
        <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.3em", color: "#1A5C5A", textTransform: "uppercase" }}>
          Vol. I — 現代魔法法典
        </span>
        <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#2A2723", opacity: 0.45, textTransform: "uppercase" }}>
          Est. 2025
        </span>
      </div>

      {/* Two-column editorial layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "0 24px", alignItems: "center" }}>
        {/* Left: big title */}
        <div>
          <h1 style={{
            fontFamily: "var(--font-rye)",
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            lineHeight: 1,
            color: "#2A2723",
            margin: 0,
          }}>
            麻瓜<br />專用<br />魔法<br />外掛
          </h1>
        </div>

        {/* Divider */}
        <div style={{ background: "#2A2723", width: "2px", alignSelf: "stretch" }} />

        {/* Right: subtitle + badge */}
        <div style={{ paddingLeft: "8px" }}>
          <div style={{
            background: "#E8A838",
            border: "3px solid #2A2723",
            padding: "4px 10px",
            display: "inline-block",
            marginBottom: "12px",
          }}>
            <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              現代魔法書
            </span>
          </div>
          <p style={{
            fontFamily: "var(--font-noto-sans-tc)",
            fontSize: "14px",
            color: "#2A2723",
            opacity: 0.85,
            lineHeight: 1.8,
            margin: 0,
          }}>
            將複雜的「提示詞」封裝成一鍵釋放的魔法。
          </p>
          <p style={{
            fontFamily: "var(--font-noto-sans-tc)",
            fontSize: "13px",
            color: "#2A2723",
            opacity: 0.65,
            lineHeight: 1.7,
            marginTop: "8px",
          }}>
            應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。
          </p>
        </div>
      </div>
    </div>
  );
}

function VersionD() {
  return (
    <div className="w-full pt-6 pb-6 px-6 text-center" style={{ borderBottom: "4px solid #2A2723" }}>
      {/* Masthead top bar */}
      <div className="flex items-center justify-between mb-6" style={{ borderBottom: "3px solid #2A2723", paddingBottom: "8px" }}>
        <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.3em", color: "#1A5C5A", textTransform: "uppercase" }}>
          Vol. I — 現代魔法法典
        </span>
        <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#2A2723", opacity: 0.45, textTransform: "uppercase" }}>
          Est. 2025
        </span>
      </div>

      {/* Subtitle FIRST — bigger, prominent */}
      <p style={{
        fontFamily: "var(--font-noto-sans-tc)",
        fontSize: "clamp(15px, 2.5vw, 18px)",
        fontWeight: 700,
        color: "#1A5C5A",
        letterSpacing: "0.06em",
        marginBottom: "20px",
      }}>
        將複雜提示詞封裝成一鍵魔法
      </p>

      {/* Title — still large but breathing room */}
      <h1 style={{
        fontFamily: "var(--font-rye)",
        fontSize: "clamp(2.8rem, 9vw, 5rem)",
        lineHeight: 1.1,
        color: "#2A2723",
        marginBottom: "20px",
      }}>
        麻瓜專用魔法外掛
      </h1>

      {/* Thin rule */}
      <div style={{ height: "2px", background: "#2A2723", opacity: 0.2, maxWidth: "300px", margin: "0 auto 16px" }} />

      {/* Secondary subtitle */}
      <p style={{
        fontFamily: "var(--font-noto-sans-tc)",
        fontSize: "13px",
        color: "#2A2723",
        opacity: 0.65,
        lineHeight: 1.8,
        maxWidth: "420px",
        margin: "0 auto",
      }}>
        應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。
      </p>
    </div>
  );
}

function VersionE() {
  return (
    <div className="w-full pt-8 pb-6 px-6 text-center" style={{ borderBottom: "4px solid #2A2723" }}>
      {/* Masthead top bar */}
      <div className="flex items-center justify-between mb-4" style={{ borderBottom: "3px solid #2A2723", paddingBottom: "8px" }}>
        <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.3em", color: "#1A5C5A", textTransform: "uppercase" }}>
          Vol. I — 現代魔法法典
        </span>
        <span style={{ fontFamily: "var(--font-chivo)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#2A2723", opacity: 0.45, textTransform: "uppercase" }}>
          Est. 2025
        </span>
      </div>

      {/* Line 1 of title with decorative prefix */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "4px" }}>
        <div style={{ height: "3px", width: "40px", background: "#8B2626" }} />
        <h1 style={{
          fontFamily: "var(--font-rye)",
          fontSize: "clamp(2.2rem, 8vw, 4.5rem)",
          lineHeight: 1,
          color: "#2A2723",
          margin: 0,
        }}>
          麻瓜專用
        </h1>
        <div style={{ height: "3px", width: "40px", background: "#8B2626" }} />
      </div>

      {/* Line 2 — contrast background strip */}
      <div style={{
        background: "#2A2723",
        padding: "4px 0",
        marginBottom: "16px",
      }}>
        <h1 style={{
          fontFamily: "var(--font-rye)",
          fontSize: "clamp(2.2rem, 8vw, 4.5rem)",
          lineHeight: 1,
          color: "#E8A838",
          margin: 0,
        }}>
          魔法外掛
        </h1>
      </div>

      {/* Subtitle in dashed border */}
      <div style={{
        border: "2px dashed #2A2723",
        padding: "10px 20px",
        maxWidth: "500px",
        margin: "0 auto",
      }}>
        <p style={{
          fontFamily: "var(--font-noto-sans-tc)",
          fontSize: "13px",
          color: "#2A2723",
          opacity: 0.8,
          lineHeight: 1.75,
          margin: 0,
        }}>
          將複雜的「提示詞」封裝成一鍵釋放的魔法。<br />
          應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。
        </p>
      </div>
    </div>
  );
}

const COMPONENTS = [VersionA, VersionB, VersionC, VersionD, VersionE];

export default function HeroVersions() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F4EED8",
      backgroundImage: "radial-gradient(circle, rgba(42,39,35,0.18) 1px, transparent 1px)",
      backgroundSize: "18px 18px",
      color: "#2A2723",
    }}>
      {/* Page header */}
      <div style={{
        background: "#2A2723",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "var(--font-chivo)", fontWeight: 900, color: "#E8A838", fontSize: "14px", letterSpacing: "0.1em" }}>
          HEADER 版型預覽 — 選一個告訴我
        </span>
        <a href="/" style={{ fontFamily: "var(--font-chivo)", fontSize: "12px", color: "#F4EED8", opacity: 0.7, textDecoration: "none" }}>
          ← 返回主站
        </a>
      </div>

      {/* Instructions */}
      <div style={{ padding: "16px 24px", borderBottom: "3px solid #2A2723", background: "#E8A838" }}>
        <p style={{ fontFamily: "var(--font-noto-sans-tc)", fontSize: "13px", margin: 0, fontWeight: 700 }}>
          點擊版本標題可展開全寬預覽。決定後回傳「我選版本 X」即可套用到正式網站。
        </p>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
        {versions.map((v, idx) => {
          const Component = COMPONENTS[idx];
          const isOpen = active === v.id;
          return (
            <div key={v.id} style={{
              border: "4px solid #2A2723",
              boxShadow: isOpen ? "10px 10px 0px #2A2723" : "6px 6px 0px #2A2723",
              marginBottom: "32px",
              background: "#F4EED8",
              backgroundImage: "radial-gradient(circle, rgba(42,39,35,0.18) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              transition: "box-shadow 0.15s",
            }}>
              {/* Version header bar */}
              <button
                onClick={() => setActive(isOpen ? null : v.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 20px",
                  background: isOpen ? "#2A2723" : "#1A5C5A",
                  border: "none",
                  cursor: "pointer",
                  borderBottom: "4px solid #2A2723",
                }}
              >
                <span style={{ fontFamily: "var(--font-chivo)", fontWeight: 900, color: "#F4EED8", fontSize: "14px", letterSpacing: "0.08em" }}>
                  {v.name}
                </span>
                <span style={{ fontFamily: "var(--font-noto-sans-tc)", fontSize: "12px", color: "#F4EED8", opacity: 0.7 }}>
                  {v.desc}　{isOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* Preview area */}
              <Component />
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", paddingBottom: "40px" }}>
        <p style={{ fontFamily: "var(--font-noto-sans-tc)", fontSize: "13px", color: "#2A2723", opacity: 0.5 }}>
          此為臨時預覽頁，決定後將刪除。路徑：/hero-versions
        </p>
      </div>
    </div>
  );
}
