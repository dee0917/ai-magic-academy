"use client";
import { motion } from "framer-motion";
import { Sparkles, Flame, Star, Moon, Hexagon, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EpicMagicHeroes() {
  const title = "麻瓜專用AI外掛";
  const subtitle = "將複雜的「提示詞」封裝成一鍵釋放的魔法。應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。";

  return (
    <div className="min-h-screen bg-[#030108] text-slate-200 font-serif p-4 md:p-10 flex flex-col items-center gap-40 overflow-hidden">
      {/* Back to Home */}
      <Link href="/" className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20 transition-all text-xs font-bold text-purple-300 font-sans">
        <ArrowLeft className="w-4 h-4" /> 返回學院首頁
      </Link>

      <div className="text-center mt-10 font-sans">
        <h2 className="text-purple-400 font-mono text-sm tracking-[0.3em] uppercase mb-2">Arcane Design Lab</h2>
        <h1 className="text-3xl font-black text-white italic">Epic Magic Hero Preview</h1>
        <p className="text-slate-500 mt-2">10 種史詩級魔法風格 Hero 預覽</p>
      </div>

      {/* 🔮 方案 1：大賢者的魔法陣 (The Arcane Summoning Circle) */}
      <section className="w-full max-w-5xl border-b border-white/5 pb-40 relative flex flex-col items-center">
        <p className="text-[10px] font-black text-purple-500/50 mb-20 uppercase tracking-[0.5em] font-sans">Option 01: Arcane Summoning Circle</p>
        <header className="relative text-center flex flex-col items-center justify-center py-20">
          <motion.div 
            animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border-[1px] border-purple-500/30 rounded-full flex items-center justify-center -z-10 shadow-[0_0_60px_rgba(168,85,247,0.2)]"
          >
            <div className="w-[95%] h-[95%] border-[1px] border-purple-500/20 rounded-full border-dashed"></div>
            <Hexagon className="absolute w-[90%] h-[90%] text-purple-900/40 stroke-[0.5]" />
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-100 to-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.8)] tracking-widest mb-8">
            {title}
          </h1>
          <p className="text-purple-200/70 max-w-2xl text-lg font-sans px-4">{subtitle}</p>
        </header>
      </section>

      {/* ✨ 方案 2：精靈之塵 (Fairy Dust Ascension) */}
      <section className="w-full max-w-5xl border-b border-white/5 pb-40 relative flex flex-col items-center">
        <p className="text-[10px] font-black text-yellow-500/50 mb-20 uppercase tracking-[0.5em] font-sans">Option 02: Fairy Dust Ascension</p>
        <header className="relative text-center py-10 w-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, x: (i * 40) - 400 }}
              animate={{ opacity: [0, 1, 0], y: -150 }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              className="absolute left-1/2 bottom-0 w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,1)]"
            />
          ))}
          <h1 className="text-5xl md:text-8xl font-bold text-yellow-100 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)] mb-8">
            {title}
          </h1>
          <p className="text-yellow-100/60 max-w-2xl mx-auto font-sans px-4">{subtitle}</p>
        </header>
      </section>

      {/* 🌫️ 方案 3：深淵迷霧 (The Void Mist) */}
      <section className="w-full max-w-5xl border-b border-white/5 pb-40 relative flex flex-col items-center">
        <p className="text-[10px] font-black text-slate-500 mb-20 uppercase tracking-[0.5em] font-sans">Option 03: The Void Mist</p>
        <header className="relative text-center w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120px] bg-purple-900/40 blur-[50px] rounded-full -z-10"></div>
          <h1 className="text-5xl md:text-8xl font-black text-white drop-shadow-[0_10px_20px_rgba(147,51,234,1)] relative z-20 mb-8">
            {title}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto relative z-20 font-sans px-4">{subtitle}</p>
        </header>
      </section>

      {/* 📜 方案 4：燃燒的古卷 (Burning Grimoire) */}
      <section className="w-full max-w-5xl border-b border-white/5 pb-40 relative flex flex-col items-center">
        <p className="text-[10px] font-black text-orange-500/50 mb-20 uppercase tracking-[0.5em] font-sans">Option 04: Burning Grimoire</p>
        <header className="text-center w-full">
          <h1 className="text-5xl md:text-8xl font-black text-orange-100 mb-8" style={{ textShadow: "0 0 10px #f97316, 0 0 40px #ea580c, 0 0 80px #9a3412" }}>
            {title}
          </h1>
          <p className="text-orange-200/60 max-w-2xl mx-auto font-sans px-4">{subtitle}</p>
        </header>
      </section>

      {/* 🌌 方案 5：星界凝視 (Astral Projection) */}
      <section className="w-full max-w-5xl border-b border-white/5 pb-40 relative flex flex-col items-center">
        <p className="text-[10px] font-black text-cyan-500/50 mb-20 uppercase tracking-[0.5em] font-sans">Option 05: Astral Projection</p>
        <header className="text-center relative w-full">
          <motion.div animate={{ scale:[1, 1.2, 1], opacity:[0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120px] bg-cyan-600/30 blur-[60px] rounded-full -z-10"></motion.div>
          <h1 className="text-5xl md:text-8xl font-light text-cyan-50 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] tracking-[0.2em] mb-8 relative">
            {title}
          </h1>
          <p className="text-cyan-200/50 max-w-2xl mx-auto font-sans relative px-4">{subtitle}</p>
        </header>
      </section>

      {/* 🧿 方案 6：魔力共鳴環 (Resonance Rings) */}
      <section className="w-full max-w-5xl border-b border-white/5 pb-40 relative flex flex-col items-center">
        <p className="text-[10px] font-black text-pink-500/50 mb-20 uppercase tracking-[0.5em] font-sans">Option 06: Resonance Rings</p>
        <header className="text-center relative flex justify-center py-20 w-full">
          <motion.div initial={{ scale: 0.8, opacity: 1 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 2, repeat: Infinity }} className="absolute w-[300px] h-[100px] md:w-[600px] md:h-[150px] border-2 border-pink-500/50 rounded-[100%] top-1/2 -translate-y-1/2"></motion.div>
          <motion.div initial={{ scale: 0.8, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className="absolute w-[300px] h-[100px] md:w-[600px] md:h-[150px] border border-purple-500/30 rounded-[100%] top-1/2 -translate-y-1/2"></motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(236,72,153,1)] mb-8 relative">
            {title}
          </h1>
        </header>
      </section>

      {/* 🗡️ 方案 7：聖劍銘文 (Excalibur Inscription) */}
      <section className="w-full max-w-5xl border-b border-white/5 pb-40 relative flex flex-col items-center">
        <p className="text-[10px] font-black text-slate-400 mb-20 uppercase tracking-[0.5em] font-sans">Option 07: Excalibur Inscription</p>
        <header className="text-center w-full">
          <div className="relative inline-block">
            <span className="absolute -inset-4 bg-white/5 blur-2xl rounded-full"></span>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-600 drop-shadow-[0_5px_15px_rgba(255,255,255,0.4)] relative">
              {title}
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto font-sans px-4">{subtitle}</p>
        </header>
      </section>

      {/* 🧪 方案 8：煉金矩陣 (Alchemic Matrix) */}
      <section className="w-full max-w-5xl border-b border-white/5 pb-40 relative flex flex-col items-center">
        <p className="text-[10px] font-black text-emerald-500/50 mb-20 uppercase tracking-[0.5em] font-sans">Option 08: Alchemic Matrix</p>
        <header className="text-center border-t border-b border-emerald-500/30 py-16 w-full bg-emerald-900/5 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <h1 className="text-5xl md:text-8xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] mb-8 relative">
            {title}
          </h1>
          <p className="text-emerald-200/60 max-w-2xl mx-auto font-sans tracking-wide px-4 relative">{subtitle}</p>
        </header>
      </section>

      {/* 🦇 方案 9：血族之擁 (Vampiric Crimson) */}
      <section className="w-full max-w-5xl border-b border-white/5 pb-40 relative flex flex-col items-center">
        <p className="text-[10px] font-black text-red-600/50 mb-20 uppercase tracking-[0.5em] font-sans">Option 09: Vampiric Crimson</p>
        <header className="text-center w-full">
          <h1 className="text-5xl md:text-8xl font-black text-red-600 mb-8" style={{ textShadow: "0 4px 20px rgba(220, 38, 38, 0.8), 0 0 50px rgba(153, 27, 27, 0.5)" }}>
            {title}
          </h1>
          <p className="text-red-200/40 max-w-2xl mx-auto font-sans px-4">{subtitle}</p>
        </header>
      </section>

      {/* 🌙 方案 10：月之祭司 (Lunar Priestess) */}
      <section className="w-full max-w-5xl pb-60 relative flex flex-col items-center">
        <p className="text-[10px] font-black text-slate-400 mb-20 uppercase tracking-[0.5em] font-sans">Option 10: Lunar Priestess</p>
        <header className="text-center flex flex-col items-center relative py-12 w-full">
          <motion.div animate={{ y:[0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <Moon className="w-16 h-16 text-slate-100 drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] mb-6" />
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-serif text-slate-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-8">
            {title}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-sans px-4">{subtitle}</p>
        </header>
      </section>
    </div>
  );
}
