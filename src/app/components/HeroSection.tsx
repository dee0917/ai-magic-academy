"use client";
import React from "react";
import { Copy, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAcademy } from "../context/AcademyContext";
import { TRIAL_DATA, CURSES } from "../lib/constants";

export default function HeroSection() {
  const {
    activeTrial, setActiveTrial,
    isTrialCopied, handleTrialCopy,
  } = useAcademy();

  return (
    <>
      {/* ── §01 HEADER / MASTHEAD — Classic Ticket ── */}
      <header className="w-full relative z-10 pb-0">
        <div className="max-w-5xl mx-auto px-6 md:px-8">

          {/* Top meta info bar */}
          <div className="flex justify-between text-[10px] tracking-[0.25em] uppercase font-bold pt-12 md:pt-16 pb-3 mb-8"
            style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.4, borderBottom: '1.5px solid var(--ink)' }}>
            <span>VOL. I — 現代魔法法典</span>
            <span>EST. 2026</span>
          </div>

          {/* Main title — Classic Ticket */}
          <div className="text-center">
            {/* Line 1: 麻瓜專用 with red decorative bars */}
            <div className="flex items-center justify-center gap-5 md:gap-8 mb-8">
              <div style={{ height: '2px', width: '56px', background: 'var(--dark-red)' }} />
              <h1
                className="text-[2.5rem] sm:text-5xl md:text-6xl tracking-[0.25em]"
                style={{ fontFamily: 'var(--font-noto-serif-tc)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.2 }}
              >
                麻瓜專用
              </h1>
              <div style={{ height: '2px', width: '56px', background: 'var(--dark-red)' }} />
            </div>

            {/* Line 2: AI魔法外掛 on black strip with gold text */}
            <div className="inline-block shadow-md" style={{ background: 'var(--ink)', padding: '16px 24px', maxWidth: '100%' }}>
              <h1
                className="text-[2.8rem] sm:text-5xl md:text-7xl tracking-[0.08em]"
                style={{ fontFamily: 'var(--font-noto-serif-tc)', fontWeight: 900, color: 'var(--mustard)', lineHeight: 1.15 }}
              >
                AI魔法外掛
              </h1>
            </div>

            {/* Tagline */}
            <p className="mt-8 mb-0 text-base md:text-lg tracking-wider"
              style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)', opacity: 0.7, fontWeight: 700, fontStyle: 'italic' }}>
              「別人花 3 小時學 AI，你只需要一鍵施法。」<br />
              <span className="text-xs md:text-sm tracking-[0.2em] not-italic"
                style={{ fontFamily: 'var(--font-chivo)', opacity: 0.5 }}>
                —— 大魔導師
              </span>
            </p>
          </div>

        </div>
      </header>

      {/* ── §03 FREE TRIAL SECTION ── */}
      <section className="w-full max-w-4xl mx-auto px-4 pt-6 pb-24 relative z-10">
        <div className="text-center mb-12">
          <div style={{ border: '4px solid var(--ink)', boxShadow: 'var(--shadow)', background: 'var(--teal)', display: 'inline-block', padding: '6px 20px', marginBottom: '12px' }}>
            <span className="font-black text-xs uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--parchment)' }}>
              免費試咒 · 無需登入
            </span>
          </div>
          <h2
            className="text-xl md:text-2xl font-black"
            style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)', fontWeight: 900 }}
          >
            先施放一道，再決定要不要留下
          </h2>
        </div>

        {/* Trial selector buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {TRIAL_DATA.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTrial(idx)}
              className="px-4 py-2 text-sm font-black transition-all active:translate-x-1 active:translate-y-1"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                border: '3px solid var(--ink)',
                boxShadow: activeTrial === idx ? 'none' : '4px 4px 0px var(--ink)',
                background: activeTrial === idx ? 'var(--mustard)' : 'var(--parchment)',
                color: 'var(--ink)',
                transform: activeTrial === idx ? 'translate(4px, 4px)' : undefined,
              }}
            >
              {item.emoji} {item.label}
            </button>
          ))}
        </div>

        {/* Trial prompt box */}
        <motion.div
          key={activeTrial}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ border: '4px solid var(--ink)', boxShadow: 'var(--shadow)', background: '#FEFAF0' }}
        >
          <div className="p-6 md:p-8 pb-4">
            <div
              className="text-sm md:text-base leading-relaxed whitespace-pre-line"
              style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)' }}
            >
              {TRIAL_DATA[activeTrial].prompt}
            </div>
          </div>

          <div className="border-t-4 mx-0" style={{ borderColor: 'var(--ink)' }} />

          <div className="flex items-center justify-between px-6 md:px-8 py-4" style={{ background: 'rgba(42,39,35,0.04)' }}>
            <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.6 }}>
              點擊右側按鈕即可複製
            </span>
            <button
              onClick={() => handleTrialCopy(TRIAL_DATA[activeTrial].prompt)}
              className="px-5 py-2 text-sm font-black flex items-center gap-2 transition-all active:translate-x-1 active:translate-y-1"
              style={{
                fontFamily: 'var(--font-chivo)',
                border: '3px solid var(--ink)',
                boxShadow: isTrialCopied ? 'none' : '4px 4px 0px var(--ink)',
                background: isTrialCopied ? '#2D6A4F' : 'var(--mustard)',
                color: isTrialCopied ? '#FEFAF0' : 'var(--ink)',
                transform: isTrialCopied ? 'translate(4px, 4px)' : undefined,
              }}
            >
              {isTrialCopied
                ? <><Check className="w-4 h-4" /> 已複製</>
                : <><Copy className="w-4 h-4" /> 複製咒語</>
              }
            </button>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <button
            onClick={() => document.getElementById('職場求生')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-black flex items-center justify-center gap-2 mx-auto transition-all hover:gap-4"
            style={{ fontFamily: 'var(--font-chivo)', color: 'var(--teal)' }}
          >
            還有 {CURSES.length} 道進階咒語等你解鎖 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </>
  );
}
