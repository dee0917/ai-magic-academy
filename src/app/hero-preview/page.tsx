"use client";
import { motion } from "framer-motion";
import { Sparkles, Zap, Crosshair, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HeroAccessories() {
  const title = "麻瓜專用AI外掛";
  const subtitle = "將複雜的「提示詞」封裝成一鍵釋放的魔法。應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。";

  return (
    <div className="min-h-screen bg-[#050510] text-slate-200 font-sans p-4 md:p-10 flex flex-col items-center gap-40">
      {/* Back to Home */}
      <Link href="/" className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20 transition-all text-xs font-bold text-purple-300">
        <ArrowLeft className="w-4 h-4" /> 返回學院首頁
      </Link>

      <div className="text-center mt-10">
        <h2 className="text-purple-400 font-mono text-sm tracking-[0.3em] uppercase mb-2">Design Lab</h2>
        <h1 className="text-3xl font-black text-white italic">Hero Accessories Preview</h1>
        <p className="text-slate-500 mt-2">這 10 種不同風格的配件預覽</p>
      </div>

      {/* 🚀 配件 1：權威標籤 (The Authority Badge) */}
      <section className="w-full max-w-4xl border-b border-white/5 pb-20">
        <p className="text-[10px] font-black text-slate-600 mb-10 uppercase tracking-widest text-center">Option 01: The Authority Badge</p>
        <header className="text-center flex flex-col items-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-purple-900/30 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-bold text-purple-200 tracking-wider">2026 最新封裝魔法</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl mb-6">{title}</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </header>
      </section>

      {/* ⚡ 配件 2：雷射底線 (Cyber Underline) */}
      <section className="w-full max-w-4xl border-b border-white/5 pb-20 text-center">
        <p className="text-[10px] font-black text-slate-600 mb-10 uppercase tracking-widest">Option 02: Cyber Underline</p>
        <header className="text-center">
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl md:text-7xl font-black text-white">{title}</h1>
            <motion.div 
              initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-transparent via-pink-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]"
            />
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </header>
      </section>

      {/* 🔦 配件 3：聚光燈光暈 (The Spotlight Aura) */}
      <section className="w-full max-w-4xl border-b border-white/5 pb-20 relative text-center">
        <p className="text-[10px] font-black text-slate-600 mb-10 uppercase tracking-widest">Option 03: The Spotlight Aura</p>
        <header className="text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_70%)] pointer-events-none animate-pulse"></div>
          <h1 className="relative text-5xl md:text-7xl font-black text-white mb-6 z-10">{title}</h1>
          <p className="relative text-slate-400 max-w-2xl mx-auto z-10">{subtitle}</p>
        </header>
      </section>

      {/* 🖍️ 配件 4：重點螢光筆 (Marker Highlight) */}
      <section className="w-full max-w-4xl border-b border-white/5 pb-20 text-center">
        <p className="text-[10px] font-black text-slate-600 mb-10 uppercase tracking-widest">Option 04: Marker Highlight</p>
        <header className="text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            麻瓜專用
            <span className="relative inline-block ml-2 px-4 py-1 bg-purple-600/40 rounded-lg border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)] transform -rotate-2">
              AI外掛
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </header>
      </section>

      {/* 🎯 配件 5：HUD 戰術鎖定 (Tactical Brackets) */}
      <section className="w-full max-w-4xl border-b border-white/5 pb-20 text-center">
        <p className="text-[10px] font-black text-slate-600 mb-10 uppercase tracking-widest">Option 05: Tactical Brackets</p>
        <header className="text-center relative inline-block">
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-lg"></div>
          <div className="px-6 py-4">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">{title}</h1>
            <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
          </div>
        </header>
      </section>

      {/* ✨ 配件 6：魔法粒子漂浮 (Floating Stardust) */}
      <section className="w-full max-w-4xl border-b border-white/5 pb-20 text-center relative">
        <p className="text-[10px] font-black text-slate-600 mb-10 uppercase tracking-widest">Option 06: Floating Stardust</p>
        <header className="text-center relative inline-block">
          <motion.div animate={{ y: [-5, 10, -5], opacity:[0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-6 -left-4">
            <Sparkles className="w-8 h-8 text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
          </motion.div>
          <motion.div animate={{ y:[10, -5, 10], opacity:[0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -bottom-2 -right-6">
            <Zap className="w-6 h-6 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">{title}</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </header>
      </section>

      {/* 🛡️ 配件 7：黑曜石玻璃浮島 (Glassmorphism Island) */}
      <section className="w-full max-w-4xl border-b border-white/5 pb-20 text-center">
        <p className="text-[10px] font-black text-slate-600 mb-10 uppercase tracking-widest">Option 07: Glassmorphism Island</p>
        <header className="text-center">
          <div className="inline-block p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2)]">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-md">{title}</h1>
            <p className="text-slate-400 max-w-xl mx-auto">{subtitle}</p>
          </div>
        </header>
      </section>

      {/* 💥 配件 8：能量撕裂 (Energy Slash) */}
      <section className="w-full max-w-4xl border-b border-white/5 pb-20 text-center relative overflow-hidden">
        <p className="text-[10px] font-black text-slate-600 mb-10 uppercase tracking-widest">Option 08: Energy Slash</p>
        <header className="text-center relative py-10">
          <div className="absolute top-1/2 left-0 w-[200%] h-16 bg-gradient-to-r from-pink-600/20 to-purple-600/20 transform -translate-y-1/2 -rotate-3 blur-md pointer-events-none"></div>
          <div className="absolute top-1/2 left-0 w-[200%] h-1 bg-pink-500/50 transform -translate-y-1/2 -rotate-3 pointer-events-none"></div>
          <h1 className="relative text-5xl md:text-7xl font-black text-white z-10 mb-6">{title}</h1>
          <p className="relative text-slate-400 max-w-2xl mx-auto z-10">{subtitle}</p>
        </header>
      </section>

      {/* 🌀 配件 9：魔法陣背光 (Arcane Glyph Background) */}
      <section className="w-full max-w-4xl border-b border-white/5 pb-20 text-center">
        <p className="text-[10px] font-black text-slate-600 mb-10 uppercase tracking-widest">Option 09: Arcane Glyph Background</p>
        <header className="text-center relative flex flex-col items-center">
          <motion.div 
            animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-900/30 -z-10"
          >
            <Crosshair className="w-64 h-64 stroke-[0.5]" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">{title}</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </header>
      </section>

      {/* 🩸 配件 10：動態流體文字填色 (Fluid Liquid Text) */}
      <section className="w-full max-w-4xl pb-40 text-center">
        <p className="text-[10px] font-black text-slate-600 mb-10 uppercase tracking-widest">Option 10: Fluid Liquid Text</p>
        <header className="text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-purple-300 to-slate-100 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
            {title}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </header>
      </section>

      {/* Global CSS for Option 10 Animation */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
