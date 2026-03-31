"use client";
import React from "react";
import { Lock, Zap } from "lucide-react";
import { useAcademy } from "../context/AcademyContext";

export default function NavBar() {
  const {
    mp, isLoggedIn, setIsLoggedIn, setShowAuthModal,
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
            {/* MP Display — visual bar */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: 'var(--teal)' }}>⚡</span>
              <div className="relative w-20 h-4" style={{ border: '2px solid var(--ink)', background: 'rgba(0,0,0,0.05)' }}>
                <div
                  className="absolute top-0 left-0 h-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (mp / 30) * 100)}%`,
                    background: mp > 10 ? 'var(--teal)' : mp > 3 ? 'var(--mustard)' : 'var(--dark-red)',
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black"
                  style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', mixBlendMode: 'multiply' }}>
                  {mp} MP
                </span>
              </div>
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

            {/* Login button */}
            <button
              className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-black transition-all hover:translate-x-0.5 hover:translate-y-0.5"
              style={{
                fontFamily: 'var(--font-chivo)',
                border: '2px solid var(--ink)',
                boxShadow: '2px 2px 0 var(--ink)',
                background: isLoggedIn ? 'var(--teal)' : 'var(--dark-red)',
                color: 'var(--parchment)',
              }}
              onClick={() => isLoggedIn ? setIsLoggedIn(false) : setShowAuthModal(true)}
            >
              {isLoggedIn ? '👤 已登入' : '🔑 登入'}
            </button>
          </div>
        </div>
      </nav>

      {/* Nav spacer */}
      <div className="h-12" />
    </>
  );
}
