"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Fingerprint, Hexagon, Zap, Orbit, Flame } from "lucide-react";

const h1Text = "麻瓜專用AI外掛";
const h2Text = "一鍵封裝複雜提示詞。應付奧客、自動報告，你的無腦求生指南。";
const ctaText = "抽取你的本命符咒";

const versions = [
  { id: 1, name: "01. 賽博神龕", desc: "Cyber Shrine — 巨大發光框線，視線集中" },
  { id: 2, name: "02. 深淵法陣", desc: "Void Portal — 深紫光暈，極致神秘" },
  { id: 3, name: "03. 終端機道士", desc: "Terminal Hacker — 等寬字體，打字機光標" },
  { id: 4, name: "04. 兩極陰陽", desc: "Yin-Yang Split — 直書+橫書張力" },
  { id: 5, name: "05. 黑曜石祭壇", desc: "Obsidian Altar — 毛玻璃 SaaS 風" },
  { id: 6, name: "06. 靈魂印記", desc: "Biometric Seal — 巨大指紋科幻感" },
  { id: 7, name: "07. 絕對極簡", desc: "Brutalist Minimal — 純粹大字負空間" },
  { id: 8, name: "08. 星軌核心", desc: "Orbiting Core — 動態星軌環繞" },
  { id: 9, name: "09. 禁忌血咒", desc: "Forbidden Curse — 暗紅職場腹黑風" },
  { id: 10, name: "10. 幻影錯位", desc: "Glitch Illusion — 駭客文字錯位衝擊" },
];

function V01() {
  return (
    <header className="relative w-full max-w-4xl mx-auto flex flex-col items-center text-center py-24 border-x border-purple-900/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_rgba(168,85,247,1)]" />
      <Flame className="w-8 h-8 text-purple-500 mb-6 animate-pulse" />
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-6">{h1Text}</h1>
      <p className="text-purple-200/60 max-w-xl text-lg mb-12">{h2Text}</p>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex flex-col items-center text-purple-400">
        <span className="text-sm tracking-widest mb-2 uppercase opacity-70">{ctaText}</span>
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </header>
  );
}

function V02() {
  return (
    <header className="relative w-full text-center flex flex-col items-center justify-center py-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none" />
      <h1 className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-900 mb-6 z-10">{h1Text}</h1>
      <p className="relative text-slate-400 max-w-2xl text-lg z-10 mb-10">{h2Text}</p>
      <div className="relative z-10 w-[1px] h-24 bg-gradient-to-b from-purple-500 to-transparent opacity-50" />
    </header>
  );
}

function V03() {
  return (
    <header className="w-full max-w-3xl mx-auto text-left border border-emerald-900/30 bg-[#020804] p-8 md:p-12 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent" />
      <div className="flex items-center gap-2 mb-8 text-emerald-500 font-mono text-sm opacity-50">
        <Zap className="w-4 h-4" /> System.Init(Magic_Protocol)
      </div>
      <h1 className="text-4xl md:text-6xl font-mono font-bold text-emerald-400 mb-6 border-r-4 border-emerald-400 pr-2 animate-[pulse_1s_infinite]">
        {h1Text}
      </h1>
      <p className="text-emerald-100/50 font-mono mb-12">{`> ${h2Text}`}</p>
      <p className="text-emerald-500 text-sm font-mono tracking-widest animate-pulse">↓ {ctaText} ↓</p>
    </header>
  );
}

function V04() {
  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-20 relative max-w-4xl mx-auto">
      <h1 className="text-7xl md:text-9xl font-black text-white/5 md:absolute md:left-4 md:top-0 -z-10" style={{ writingMode: 'vertical-rl' as any }}>AI外掛</h1>
      <div className="text-center md:text-left z-10">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">{h1Text}</h2>
        <p className="text-slate-400 max-w-xl text-lg mb-8">{h2Text}</p>
        <div className="inline-flex items-center gap-2 text-white/50 border border-white/10 rounded-full px-6 py-2">
          <ChevronDown className="w-4 h-4 animate-bounce" /> <span className="text-sm tracking-widest">{ctaText}</span>
        </div>
      </div>
    </header>
  );
}

function V05() {
  return (
    <header className="relative w-full flex justify-center py-20">
      <div className="relative z-10 flex flex-col items-center text-center p-12 md:p-16 rounded-[3rem] bg-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)]">
        <Sparkles className="w-10 h-10 text-pink-400 mb-6" />
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 mb-6">{h1Text}</h1>
        <p className="text-slate-400 max-w-lg mb-8">{h2Text}</p>
      </div>
    </header>
  );
}

function V06() {
  return (
    <header className="relative w-full text-center flex flex-col items-center py-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none -z-10">
        <Fingerprint className="w-[400px] h-[400px] text-pink-500" />
      </div>
      <div className="px-4 py-1 mb-6 rounded-full border border-pink-500/30 text-pink-400 text-xs tracking-[0.2em] bg-pink-500/10">VERIFIED MAGIC</div>
      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-[0_0_20px_rgba(244,114,182,0.3)]">{h1Text}</h1>
      <p className="text-pink-100/40 max-w-xl text-lg">{h2Text}</p>
    </header>
  );
}

function V07() {
  return (
    <header className="w-full text-center py-32">
      <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 uppercase">{h1Text}</h1>
      <p className="text-slate-500 text-xl max-w-2xl mx-auto font-light leading-relaxed">{h2Text}</p>
    </header>
  );
}

function V08() {
  return (
    <header className="relative w-full text-center flex flex-col items-center py-20">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="mb-8 text-cyan-500/30">
        <Orbit className="w-24 h-24" />
      </motion.div>
      <h1 className="text-5xl md:text-7xl font-black text-cyan-50 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] mb-6">{h1Text}</h1>
      <p className="text-cyan-200/50 max-w-xl">{h2Text}</p>
    </header>
  );
}

function V09() {
  return (
    <header className="w-full text-center py-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-red-600 to-transparent" />
      <h1 className="text-6xl md:text-8xl font-black text-red-600 mt-20 mb-6 drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] tracking-wider">
        {h1Text}
      </h1>
      <p className="text-red-200/30 max-w-2xl mx-auto">{h2Text}</p>
    </header>
  );
}

function V10() {
  return (
    <header className="w-full text-center py-20">
      <h1
        className="text-6xl md:text-8xl font-black text-white mb-6"
        style={{ textShadow: "-4px 0 #0ff, 4px 0 #f0f" }}
      >
        {h1Text}
      </h1>
      <p className="text-slate-400 max-w-xl mx-auto bg-white/5 py-2 px-4 rounded border border-white/10">{h2Text}</p>
    </header>
  );
}

const COMPONENTS = [V01, V02, V03, V04, V05, V06, V07, V08, V09, V10];

export default function HeroVersions() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans overflow-x-hidden">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#050510]/95 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-black tracking-wider text-purple-400">HERO 版型預覽 — 共 10 款</span>
        <a href="/" className="text-xs text-white/40 hover:text-white/70 transition">← 返回主站</a>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-b border-white/10 px-6 py-3">
        <p className="text-sm text-purple-200/80 font-medium text-center">
          下方 10 種設計皆可預覽。決定後回傳「我選版本 XX」即可套用到正式網站。
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-16">
        {versions.map((v, idx) => {
          const Component = COMPONENTS[idx];
          return (
            <div key={v.id}>
              {/* Version label */}
              <div className="flex items-center gap-4 mb-4 px-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-white/90">{v.name}</span>
                  <span className="text-xs text-white/30 tracking-wider">{v.desc}</span>
                </div>
              </div>

              {/* Preview card */}
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#050510] relative">
                {/* Simulated dark background */}
                <div className="w-full overflow-hidden">
                  <Component />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pb-16">
        <p className="text-xs text-white/20">此為臨時預覽頁，決定後將刪除。路徑：/hero-versions</p>
      </div>
    </div>
  );
}
