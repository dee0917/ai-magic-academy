"use client";
import { motion } from "framer-motion";
import { Flame, Ghost, Shield, Zap, Skull, Sparkles, Hexagon, Eye, Fingerprint, Crown } from "lucide-react";
import React from "react";

// 符咒的核心物理限制：極窄 (120px)、極長 (380px)
const baseTalismanClass = "relative min-w-[120px] w-[120px] h-[380px] flex flex-col items-center py-6 px-2 rounded-sm cursor-pointer overflow-hidden group shrink-0 snap-center";

// 統一的直書排版引擎 (這段是靈魂，讓文字從右到左直排)
const VerticalTextEngine = ({ t, d, titleColor, descColor }: { t: string, d: string, titleColor: string, descColor: string }) => (
  <div 
    className="flex-1 w-full flex justify-center mt-4 relative z-10"
    style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
  >
    {/* 符膽 (主標題)：字體大、字距極寬 */}
    <h3 className={`text-2xl md:text-3xl font-black ${titleColor} tracking-[0.4em] leading-none drop-shadow-sm`}>
      {t}
    </h3>
    {/* 符腳 (副標題)：字體小、在主標題左側 (直書的後面) */}
    <p className={`text-[10px] font-medium ${descColor} tracking-widest leading-tight ml-2 opacity-90 max-h-[300px] overflow-hidden`}>
      {d}
    </p>
  </div>
);

const Talisman1 = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div whileHover={{ y: -10 }} className={`${baseTalismanClass} bg-[#eab308] border-2 border-[#b45309] shadow-[0_0_20px_rgba(202,138,4,0.4)]`}>
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]"></div>
    <Flame className="w-8 h-8 text-[#991b1b] z-10" />
    <VerticalTextEngine t={title} d={desc} titleColor="text-[#7f1d1d]" descColor="text-[#991b1b]" />
  </motion.div>
);

const Talisman2 = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div whileHover={{ y: -10 }} className={`${baseTalismanClass} bg-black border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]`}>
    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
    <Ghost className="w-8 h-8 text-purple-400 z-10 animate-pulse" />
    <VerticalTextEngine t={title} d={desc} titleColor="text-purple-300 drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]" descColor="text-purple-500" />
  </motion.div>
);

const Talisman3 = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div whileHover={{ y: -10 }} className={`${baseTalismanClass} bg-[#3f0f0f] border border-red-600 shadow-[inset_0_0_30px_rgba(185,28,28,0.4)]`}>
    <Skull className="w-8 h-8 text-red-500 z-10 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
    <VerticalTextEngine t={title} d={desc} titleColor="text-red-400 tracking-[0.5em]" descColor="text-red-600/80" />
  </motion.div>
);

const Talisman4 = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div whileHover={{ y: -10 }} className={`${baseTalismanClass} bg-emerald-950/40 backdrop-blur-md border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]`}>
    <Hexagon className="w-8 h-8 text-emerald-400 z-10" />
    <VerticalTextEngine t={title} d={desc} titleColor="text-emerald-200 drop-shadow-[0_0_5px_rgba(110,231,183,0.8)]" descColor="text-emerald-500" />
  </motion.div>
);

const Talisman5 = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div whileHover={{ y: -10 }} className={`${baseTalismanClass} bg-slate-900 border-l-2 border-cyan-500 border-r-2 border-pink-500`}>
    <Zap className="w-8 h-8 text-cyan-400 z-10" />
    <VerticalTextEngine t={title} d={desc} titleColor="text-white font-mono mix-blend-difference" descColor="text-cyan-400 font-mono" />
  </motion.div>
);

const Talisman6 = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div whileHover={{ y: -10 }} className={`${baseTalismanClass} bg-slate-100 border border-slate-400 shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
    <Shield className="w-8 h-8 text-slate-800 z-10" />
    <VerticalTextEngine t={title} d={desc} titleColor="text-slate-900" descColor="text-slate-500" />
  </motion.div>
);

const Talisman7 = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div whileHover={{ y: -10 }} className={`${baseTalismanClass} bg-blue-950 border border-blue-400/50 shadow-[inset_0_0_15px_rgba(96,165,250,0.3)]`}>
    <Eye className="w-8 h-8 text-blue-300 z-10" />
    <VerticalTextEngine t={title} d={desc} titleColor="text-blue-100 drop-shadow-[0_0_5px_rgba(147,197,253,0.8)]" descColor="text-blue-400" />
  </motion.div>
);

const Talisman8 = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div whileHover={{ y: -10 }} className={`${baseTalismanClass} bg-transparent backdrop-blur-sm border-[0.5px] border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
    <Sparkles className="w-8 h-8 text-white z-10 animate-pulse" />
    <VerticalTextEngine t={title} d={desc} titleColor="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" descColor="text-white/50" />
  </motion.div>
);

const Talisman9 = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div whileHover={{ y: -10 }} className={`${baseTalismanClass} bg-[#0a0a0a] border border-yellow-600 shadow-[0_0_25px_rgba(202,138,4,0.2)]`}>
    <Crown className="w-8 h-8 text-yellow-500 z-10" />
    <VerticalTextEngine t={title} d={desc} titleColor="text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600" descColor="text-yellow-700" />
  </motion.div>
);

const Talisman10 = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div whileHover={{ y: -10 }} className={`${baseTalismanClass} bg-slate-950 border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.15)]`}>
    <Fingerprint className="w-8 h-8 text-pink-500 z-10" />
    <VerticalTextEngine t={title} d={desc} titleColor="text-pink-200 drop-shadow-[0_0_5px_rgba(244,114,182,0.8)]" descColor="text-pink-600" />
  </motion.div>
);

export default function NarrowCyberTalismans() {
  const title = "深夜老闆突襲";
  const desc = "下班LINE交辦，高情商推遲術";

  return (
    <div className="min-h-screen bg-[#050510] py-20 px-4 font-serif flex flex-col items-center">
      <div className="w-full max-w-5xl flex gap-6 overflow-x-auto snap-x pb-12 px-10 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
        <Talisman1 title={title} desc={desc} />
        <Talisman2 title={title} desc={desc} />
        <Talisman3 title={title} desc={desc} />
        <Talisman4 title={title} desc={desc} />
        <Talisman5 title={title} desc={desc} />
        <Talisman6 title={title} desc={desc} />
        <Talisman7 title={title} desc={desc} />
        <Talisman8 title={title} desc={desc} />
        <Talisman9 title={title} desc={desc} />
        <Talisman10 title={title} desc={desc} />
      </div>
    </div>
  );
}

export const Talismans = {
  Talisman1, Talisman2, Talisman3, Talisman4, Talisman5,
  Talisman6, Talisman7, Talisman8, Talisman9, Talisman10
};
