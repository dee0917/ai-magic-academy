"use client";
import React from "react";
import { Lock, Zap } from "lucide-react";
import { useAcademy } from "../context/AcademyContext";

export default function NavBar() {
  const {
    collectedCards, setShowSpellBook, setShowFusion,
  } = useAcademy();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[200] backdrop-blur-md"
        style={{ background: 'rgba(254,250,240,0.92)', borderBottom: '3px solid var(--ink)' }}>
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-wider"
              style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)' }}>
              AI 魔法學院
            </span>
          </div>

          {/* Right side: MP + Collection + Login */}
          <div className="flex items-center gap-3">
            {/* Beta unlimited indicator */}
            <div className="flex items-center gap-1 px-2 py-1"
              style={{ border: '2px solid var(--ink)', boxShadow: '2px 2px 0 var(--ink)', background: 'var(--teal)' }}>
              <span className="text-[10px]" style={{ color: 'var(--mustard)' }}>⚡</span>
              <span className="text-[10px] font-black tracking-wider"
                style={{ fontFamily: 'var(--font-chivo)', color: 'var(--parchment)' }}>
                BETA · 魔力無限
              </span>
            </div>

            {/* Magic Book button */}
            <button
              className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-black transition-all hover:translate-x-0.5 hover:translate-y-0.5"
              style={{
                fontFamily: 'var(--font-chivo)',
                border: '2px solid var(--ink)',
                boxShadow: '2px 2px 0 var(--ink)',
                background: 'var(--parchment)',
                color: 'var(--ink)',
              }}
              onClick={() => setShowSpellBook(true)}
            >
              📖 <span className="hidden sm:inline">魔法書</span>
              <span className="text-[9px] px-1 font-black" style={{ background: 'var(--mustard)', color: 'var(--ink)' }}>
                {collectedCards.length}
              </span>
            </button>

            {/* Fusion button */}
            <button
              className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-black transition-all hover:translate-x-0.5 hover:translate-y-0.5"
              style={{
                fontFamily: 'var(--font-chivo)',
                border: '2px solid var(--ink)',
                boxShadow: '2px 2px 0 var(--ink)',
                background: 'var(--mustard)',
                color: 'var(--ink)',
              }}
              onClick={() => setShowFusion(true)}
            >
              <Zap className="w-3 h-3" /> <span className="hidden sm:inline">融合爐</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Nav spacer */}
      <div className="h-12" />
    </>
  );
}
