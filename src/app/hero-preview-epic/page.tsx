"use client";
import { motion } from "framer-motion";
import { Sparkles, Flame, Star, Moon, Hexagon, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EpicMagicHeroes() {
  const title = "麻瓜專用AI外掛";
  const subtitle = "將複雜的「提示詞」封裝成一鍵釋放的魔法。應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。";

  return (
    <div className="min-h-screen bg-[#030108] flex flex-col items-center gap-40 py-20 px-4 font-serif overflow-hidden">
      {/* Back to Home */}
      <Link href="/" className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20 transition-all text-xs font-bold text-purple-300 font-sans">
        <ArrowLeft className="w-4 h-4" /> 返回學院首頁
      </Link>

      {/* 🔮 方案 1：大賢者的魔法陣 (The Arcane Summoning Circle) */}
      {/* 審計師點評：背後有一個緩慢旋轉的巨大魔法陣，最正統的日系 RPG 魔法感。 */}
      <header className="relative text-center flex flex-col items-center justify-center py-20 w-full">
        <p className="absolute -top-10 text-[10px] font-black text-purple-500/50 uppercase tracking-[0.5em] font-sans">Option 01</p>
        <motion.div 
          animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] border-[1px] border-purple-500/30 rounded-full flex items-center justify-center -z-10 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
        >
          <div className="w-[380px] h-[380px] border-[1px] border-purple-500/20 rounded-full border-dashed"></div>
          <Hexagon className="absolute w-[360px] h-[360px] text-purple-900/40 stroke-[0.5]" />
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-100 to-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.8)] tracking-widest mb-6">
          {title}
        </h1>
        <p className="text-purple-200/70 max-w-2xl text-lg font-sans">{subtitle}</p>
      </header>

      {/* ✨ 方案 2：精靈之塵 (Fairy Dust Ascension) */}
      {/* 審計師點評：無數金色的魔力光點從文字下方緩緩升起，充滿神聖感。 */}
      <header className="relative text-center py-10 w-full">
        <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-yellow-500/50 uppercase tracking-[0.5em] font-sans">Option 02</p>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, x: (i * 30) - 225 }}
            animate={{ opacity: [0, 1, 0], y: -100 }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            className="absolute left-1/2 bottom-0 w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,1)]"
          />
        ))}
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-100 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)] mb-6">
          {title}
        </h1>
        <p className="text-yellow-100/60 max-w-2xl mx-auto font-sans">{subtitle}</p>
      </header>

      {/* 🌫️ 方案 3：深淵迷霧 (The Void Mist) */}
      {/* 審計師點評：文字像是在濃濃的紫黑色迷霧中發光，黑魔法/死靈法師專用。 */}
      <header className="relative text-center w-full">
        <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-500/50 uppercase tracking-[0.5em] font-sans">Option 03</p>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030108] via-transparent to-transparent z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[100px] bg-purple-900/40 blur-[40px] rounded-full"></div>
        <h1 className="text-6xl md:text-8xl font-black text-white mix-blend-overlay drop-shadow-[0_10px_20px_rgba(147,51,234,1)] relative z-20 mb-6">
          {title}
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto relative z-20 font-sans">{subtitle}</p>
      </header>

      {/* 📜 方案 4：燃燒的古卷 (Burning Grimoire) */}
      {/* 審計師點評：文字帶有火焰般的橘紅邊緣光，像剛剛用魔杖刻上去的餘燼。 */}
      <header className="text-center w-full relative">
        <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-orange-500/50 uppercase tracking-[0.5em] font-sans">Option 04</p>
        <h1 className="text-6xl md:text-8xl font-black text-orange-100 mb-6" style={{ textShadow: "0 0 10px #f97316, 0 0 40px #ea580c, 0 0 80px #9a3412" }}>
          {title}
        </h1>
        <p className="text-orange-200/60 max-w-2xl mx-auto font-sans">{subtitle}</p>
      </header>

      {/* 🌌 方案 5：星界凝視 (Astral Projection) */}
      {/* 審計師點評：深藍色的宇宙魔法，文字像是由星光匯聚而成。 */}
      <header className="text-center relative w-full">
        <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-cyan-500/50 uppercase tracking-[0.5em] font-sans">Option 05</p>
        <motion.div animate={{ scale:[1, 1.2, 1], opacity:[0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-cyan-600/30 blur-[60px] rounded-full"></motion.div>
        <h1 className="text-6xl md:text-8xl font-light text-cyan-50 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] tracking-widest mb-6 relative">
          {title}
        </h1>
        <p className="text-cyan-200/50 max-w-2xl mx-auto font-sans relative">{subtitle}</p>
      </header>

      {/* 🧿 方案 6：魔力共鳴環 (Resonance Rings) */}
      {/* 審計師點評：字體背後有多重擴散的發光光環，像是施法瞬間的衝擊波。 */}
      <header className="text-center relative flex flex-col items-center justify-center py-10 w-full">
        <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-pink-500/50 uppercase tracking-[0.5em] font-sans">Option 06</p>
        <motion.div initial={{ scale: 0.8, opacity: 1 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 2, repeat: Infinity }} className="absolute w-[300px] h-[80px] border-2 border-pink-500/50 rounded-full top-1/2 -translate-y-1/2"></motion.div>
        <motion.div initial={{ scale: 0.8, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className="absolute w-[300px] h-[80px] border border-purple-500/30 rounded-full top-1/2 -translate-y-1/2"></motion.div>
        <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(236,72,153,1)] mb-6 relative">
          {title}
        </h1>
      </header>

      {/* 🗡️ 方案 7：聖劍銘文 (Excalibur Inscription) */}
      {/* 審計師點評：極度銳利的金屬反光感，神聖且不可侵犯的光魔法。 */}
      <header className="text-center w-full relative">
        <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400/50 uppercase tracking-[0.5em] font-sans">Option 07</p>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-600 drop-shadow-[0_5px_15px_rgba(255,255,255,0.4)] relative">
          <span className="absolute -inset-1 bg-white/10 blur-xl rounded-full"></span>
          {title}
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto font-sans">{subtitle}</p>
      </header>

      {/* 🧪 方案 8：煉金矩陣 (Alchemic Matrix) */}
      {/* 審計師點評：綠色的毒液/煉金術風格，帶有微弱的螢光與幾何感。 */}
      <header className="text-center border-t-2 border-b-2 border-emerald-500/30 py-10 relative bg-emerald-900/10 w-full">
        <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.5em] font-sans">Option 08</p>
        <h1 className="text-6xl md:text-8xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] mb-6">
          {title}
        </h1>
        <p className="text-emerald-200/60 max-w-2xl mx-auto font-sans tracking-wide">{subtitle}</p>
      </header>

      {/* 🦇 方案 9：血族之擁 (Vampiric Crimson) */}
      {/* 審計師點評：暗黑破壞神風格，血紅色的文字與深邃的黑，極具壓迫感。 */}
      <header className="text-center w-full relative">
        <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-red-600/50 uppercase tracking-[0.5em] font-sans">Option 09</p>
        <h1 className="text-6xl md:text-8xl font-black text-red-600 mb-6" style={{ textShadow: "0 4px 20px rgba(220, 38, 38, 0.8), 0 0 50px rgba(153, 27, 27, 0.5)" }}>
          {title}
        </h1>
        <p className="text-red-200/40 max-w-2xl mx-auto font-sans">{subtitle}</p>
      </header>

      {/* 🌙 方案 10：月之祭司 (Lunar Priestess) */}
      {/* 審計師點評：最優雅的魔法。文字上方有一輪發光的彎月，純銀白色的光輝。 */}
      <header className="text-center flex flex-col items-center relative py-12 w-full">
        <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400/50 uppercase tracking-[0.5em] font-sans">Option 10</p>
        <motion.div animate={{ y:[0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <Moon className="w-16 h-16 text-slate-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] mb-4" />
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-serif text-slate-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-6">
          {title}
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto font-sans">{subtitle}</p>
      </header>
    </div>
  );
}
