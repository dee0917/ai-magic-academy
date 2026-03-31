"use client";
import React from "react";
import {
  Sparkles, Copy, ChevronDown, Check, Lock, Share2,
  ArrowLeft, Zap, BookOpen, AlertTriangle, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAcademy } from "../context/AcademyContext";
import {
  CAST_LEVELS, HIDDEN_MARKER,
  getFieldVisibility, getMpCost, getTabColor,
} from "../lib/constants";
import TerminalPrompt from "./shared/TerminalPrompt";

export default function CastingModal() {
  const {
    selectedCurse, setSelectedCurse,
    inputs, setInputs,
    castLevel, setCastLevel,
    mp, isCopied,
    agreedToRisk, setAgreedToRisk,
    showTweakSheet, setShowTweakSheet,
    showRiskScroll, setShowRiskScroll,
    showBrewing,
    handleCopy, handleShare, handleRiskAcceptAndCopy,
  } = useAcademy();

  return (
    <>
      {/* ── SPELL DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedCurse && (
          <div className="fixed inset-0 top-12 z-[100] flex items-end md:items-center justify-center md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
              style={{ background: 'rgba(42,39,35,0.85)' }}
              onClick={() => setSelectedCurse(null)}
            />

            {/* Modal panel */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }}
              className="w-full md:max-w-5xl relative z-10 flex flex-col md:flex-row"
              style={{
                border: '4px solid var(--ink)',
                boxShadow: '12px 12px 0px var(--ink)',
                background: 'var(--parchment)',
                maxHeight: 'calc(100vh - 3rem)',
                overflow: 'hidden',
              }}
            >
              {/* ── MOBILE LAYOUT: single scrollable page + floating CTA ── */}
              <div className="md:hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 3rem)' }}>
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between px-5 py-3" style={{ borderBottom: '4px solid var(--ink)' }}>
                  <button onClick={() => setSelectedCurse(null)}
                    className="flex items-center gap-2 text-xs font-black uppercase"
                    style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.6 }}>
                    <ArrowLeft className="w-4 h-4" /> 返回
                  </button>
                  <h3 className="text-base font-black flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)', fontWeight: 900 }}>
                    <Sparkles className="w-4 h-4" style={{ color: 'var(--mustard)' }} /> 注入魔力
                  </h3>
                  <button onClick={handleShare} style={{ color: 'var(--ink)', opacity: 0.5 }}>
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable: form + terminal preview all in one */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                  {/* Spell title + description */}
                  <div className="px-5 pt-5 pb-3">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 flex-shrink-0" style={{ background: 'var(--mustard)', border: '2px solid var(--ink)' }}>
                        {selectedCurse.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider mb-1"
                          style={{ fontFamily: 'var(--font-chivo)', color: getTabColor(selectedCurse.tab) }}>
                          {selectedCurse.tab}
                        </div>
                        <h2 className="text-xl font-black leading-tight"
                          style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)' }}>
                          {selectedCurse.title.replace(/【|】/g, '')}
                        </h2>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mt-2"
                      style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.65 }}>
                      {selectedCurse.desc}
                    </p>
                  </div>

                  {/* Form area */}
                  <div className="p-5 pt-2">
                    <div style={{ border: '2px dashed var(--ink)', padding: '20px', opacity: 0.9 }}>
                      {/* Cast level selector — 魔力消耗 */}
                      <div className="mb-5">
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2"
                          style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                          魔力消耗 MP COST
                        </label>
                        <div className="flex gap-0" style={{ border: '3px solid var(--ink)' }}>
                          {CAST_LEVELS.map((cl, i) => {
                            const cost = getMpCost(selectedCurse, cl.id);
                            return (
                            <button key={cl.id} type="button"
                              onClick={() => setCastLevel(cl.id as any)}
                              className="flex-1 px-2 py-2 text-[10px] font-black"
                              style={{
                                fontFamily: 'var(--font-chivo)',
                                background: castLevel === cl.id ? 'var(--mustard)' : 'transparent',
                                color: 'var(--ink)',
                                borderLeft: i > 0 ? '3px solid var(--ink)' : 'none',
                              }}>
                              {cl.label}
                              <span className="block text-[9px] opacity-60">{cost} MP</span>
                            </button>
                          )})}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.5 }}>
                            目前魔力：{mp} MP
                          </span>
                          {castLevel === 'full' && (
                            <span className="text-[9px] font-black px-2 py-0.5" style={{ background: 'var(--teal)', color: 'var(--parchment)', fontFamily: 'var(--font-chivo)' }}>
                              ★ 可收集卡片
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Input fields */}
                      {selectedCurse.fields
                        .filter((_f: any, idx: number) =>
                          idx < getFieldVisibility(selectedCurse.fields.length, castLevel)
                        )
                        .map((f: any) => (
                          <div key={f.id} className="mb-5">
                            <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2"
                              style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                              {f.label} {f.id.toUpperCase().replace(/_/g, ' ')}
                            </label>
                            <input type="text" placeholder={f.placeholder}
                              className="w-full py-3 px-4 text-sm"
                              style={{
                                border: '3px solid var(--ink)', background: 'var(--mustard)',
                                fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)',
                              }}
                              onChange={(e) => setInputs({ ...inputs, [f.id]: e.target.value })}
                            />
                          </div>
                        ))}

                      {/* Tweak */}
                      {selectedCurse.tweak && (
                        <div className="mb-2">
                          <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2"
                            style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                            {selectedCurse.tweak.label}
                          </label>
                          <button
                            onClick={() => setShowTweakSheet(true)}
                            className="w-full flex items-center justify-between p-3 text-sm font-bold"
                            style={{ border: '3px solid var(--ink)', boxShadow: '4px 4px 0px var(--ink)', fontFamily: 'var(--font-chivo)', color: 'var(--ink)', background: 'var(--parchment)' }}>
                            <span>{(inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]).split('：')[0]}</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Risk checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer mt-4 mb-2">
                      <input type="checkbox" className="mt-1 w-4 h-4"
                        checked={agreedToRisk}
                        onChange={(e) => setAgreedToRisk(e.target.checked)} />
                      <span className="text-xs italic"
                        style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.6 }}>
                        已簽署魔法契約，自負施法風險。
                      </span>
                    </label>

                  </div>

                  {/* Mobile terminal preview — inline, not accordion */}
                  <div style={{ background: '#1a1f2e', borderTop: '4px solid var(--ink)' }}>
                    <div className="flex items-center gap-2 px-4 py-3"
                      style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                      </div>
                      <span className="text-xs font-black tracking-[0.15em] ml-2"
                        style={{ fontFamily: 'var(--font-chivo)', color: 'rgba(255,255,255,0.5)' }}>
                        咒語預覽終端機 PREVIEW_TERMINAL
                      </span>
                    </div>
                    <div className="p-4">
                      {(() => {
                        const baseInputs: any = {};
                        selectedCurse.fields.forEach((f: any, idx: number) => {
                          const isVisible = idx < getFieldVisibility(selectedCurse.fields.length, castLevel);
                          baseInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : "（由 AI 根據情境自動填充）";
                        });
                        const finalInputs = { ...baseInputs, [selectedCurse.tweak?.id]: (inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0]) };
                        return <TerminalPrompt text={selectedCurse.generate(finalInputs)} />;
                      })()}
                    </div>
                    {/* Terminal footer */}
                    <div className="px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-xs mb-2" style={{ fontFamily: 'monospace', color: 'rgba(26,92,90,0.7)' }}>
                        {'>'} 等待注入魔力數據中...
                      </p>
                      <div className="flex gap-2">
                        {['META_DATA: V2.4', 'STRENGTH: HIGH', `PARAMS: ${selectedCurse.fields?.length || 0}`].map(tag => (
                          <span key={tag} className="text-[9px] font-bold px-2 py-1"
                            style={{ fontFamily: 'var(--font-chivo)', border: '1px solid rgba(139,38,38,0.5)', color: 'rgba(139,38,38,0.8)', background: 'rgba(139,38,38,0.1)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 大魔導師筆記 — below terminal preview */}
                  {selectedCurse.theory && (
                    <div style={{ border: '3px solid var(--ink)', borderTop: 'none', background: 'rgba(26,92,90,0.06)' }}>
                      <div className="flex items-center gap-2 px-4 py-2"
                        style={{ background: 'var(--teal)', borderTop: '3px solid var(--ink)', borderBottom: '3px solid var(--ink)' }}>
                        <BookOpen className="w-4 h-4" style={{ color: 'var(--mustard)' }} />
                        <span className="text-xs font-black uppercase tracking-wider"
                          style={{ fontFamily: 'var(--font-chivo)', color: 'var(--parchment)' }}>
                          大魔導師筆記
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="text-xs leading-relaxed italic"
                          style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.7 }}>
                          {selectedCurse.theory}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating CTA button */}
                <div className="fixed bottom-0 left-0 right-0 z-[110] p-3"
                  style={{ background: 'linear-gradient(to top, var(--parchment) 70%, transparent)' }}>
                  <button onClick={handleCopy}
                    className="w-full py-4 text-base font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all"
                    style={{
                      fontFamily: 'var(--font-rye)', border: '4px solid var(--ink)',
                      boxShadow: isCopied ? 'none' : 'var(--shadow)',
                      background: isCopied ? '#2D6A4F' : 'var(--dark-red)',
                      color: 'var(--parchment)',
                      transform: isCopied ? 'translate(8px, 8px)' : undefined,
                    }}>
                    {isCopied
                      ? <><Check className="w-5 h-5" /> 密咒已封印</>
                      : <><Zap className="w-5 h-5" /> 施放咒語術式</>
                    }
                  </button>
                </div>
              </div>

              {/* ── DESKTOP LAYOUT: Left form + Right terminal ── */}
              {/* LEFT PANEL: Form inputs */}
              <div className="hidden md:flex md:w-[45%] flex-shrink-0 flex-col" style={{ maxHeight: '96vh' }}>
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between px-5 py-3" style={{ borderBottom: '4px solid var(--ink)' }}>
                  <button onClick={() => setSelectedCurse(null)}
                    className="flex items-center gap-2 text-xs font-black uppercase"
                    style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.6 }}>
                    <ArrowLeft className="w-4 h-4" /> 返回
                  </button>
                  <h3 className="text-base font-black flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)', fontWeight: 900 }}>
                    <Sparkles className="w-4 h-4" style={{ color: 'var(--mustard)' }} /> 注入魔力
                  </h3>
                  <button onClick={handleShare} style={{ color: 'var(--ink)', opacity: 0.5 }}>
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable form */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-5">
                  {/* Spell title + description */}
                  <div className="mb-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 flex-shrink-0" style={{ background: 'var(--mustard)', border: '2px solid var(--ink)' }}>
                        {selectedCurse.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider mb-1"
                          style={{ fontFamily: 'var(--font-chivo)', color: getTabColor(selectedCurse.tab) }}>
                          {selectedCurse.tab}
                        </div>
                        <h2 className="text-xl font-black leading-tight"
                          style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)' }}>
                          {selectedCurse.title.replace(/【|】/g, '')}
                        </h2>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mt-2"
                      style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.65 }}>
                      {selectedCurse.desc}
                    </p>
                  </div>

                  <div style={{ border: '2px dashed var(--ink)', padding: '20px', opacity: 0.9 }}>
                    {/* Cast level selector — desktop */}
                    <div className="mb-5">
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2"
                        style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                        魔力消耗 MP COST
                      </label>
                      <div className="flex gap-0" style={{ border: '3px solid var(--ink)' }}>
                        {CAST_LEVELS.map((cl, i) => {
                          const cost = getMpCost(selectedCurse, cl.id);
                          return (
                          <button key={cl.id} type="button"
                            onClick={() => setCastLevel(cl.id as any)}
                            className="flex-1 px-3 py-2 text-xs font-black"
                            style={{
                              fontFamily: 'var(--font-chivo)',
                              background: castLevel === cl.id ? 'var(--mustard)' : 'transparent',
                              color: 'var(--ink)',
                              borderLeft: i > 0 ? '3px solid var(--ink)' : 'none',
                            }}>
                            {cl.label} <span className="opacity-60">({cost}MP)</span>
                          </button>
                        )})}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.5 }}>
                          目前魔力：{mp} MP
                        </span>
                        {castLevel === 'full' && (
                          <span className="text-[9px] font-black px-2 py-0.5" style={{ background: 'var(--teal)', color: 'var(--parchment)', fontFamily: 'var(--font-chivo)' }}>
                            ★ 可收集卡片
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Input fields */}
                    {selectedCurse.fields
                      .filter((_f: any, idx: number) =>
                        idx < getFieldVisibility(selectedCurse.fields.length, castLevel)
                      )
                      .map((f: any) => (
                        <div key={f.id} className="mb-5">
                          <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2"
                            style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                            {f.label} {f.id.toUpperCase().replace(/_/g, ' ')}
                          </label>
                          <input type="text" placeholder={f.placeholder}
                            className="w-full py-3 px-4 text-sm"
                            style={{
                              border: '3px solid var(--ink)', background: 'var(--mustard)',
                              fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)',
                            }}
                            onChange={(e) => setInputs({ ...inputs, [f.id]: e.target.value })}
                          />
                        </div>
                      ))}

                    {/* Tweak */}
                    {selectedCurse.tweak && (
                      <div className="mb-2">
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2"
                          style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                          {selectedCurse.tweak.label}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedCurse.tweak.options.map((opt: string) => (
                            <button key={opt.split('：')[0]}
                              className="px-3 py-2 text-xs font-bold flex-1 transition-all"
                              style={{
                                fontFamily: 'var(--font-chivo)', border: '3px solid var(--ink)',
                                boxShadow: (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'none' : '3px 3px 0px var(--ink)',
                                background: (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'var(--mustard)' : 'var(--parchment)',
                                color: 'var(--ink)',
                                transform: (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'translate(3px,3px)' : undefined,
                              }}
                              onClick={() => setInputs({ ...inputs, [selectedCurse.tweak.id]: opt })}>
                              {opt.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Risk checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer mt-4 mb-2">
                    <input type="checkbox" className="mt-1 w-4 h-4"
                      checked={agreedToRisk}
                      onChange={(e) => setAgreedToRisk(e.target.checked)} />
                    <span className="text-xs italic"
                      style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.6 }}>
                      已簽署魔法契約，自負施法風險。
                    </span>
                  </label>

                </div>

                {/* Cast button — desktop */}
                <div className="flex-shrink-0 p-4" style={{ borderTop: '4px solid var(--ink)', background: 'var(--parchment)' }}>
                  <button onClick={handleCopy}
                    className="w-full py-4 text-base font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all hover:animate-shake"
                    style={{
                      fontFamily: 'var(--font-rye)', border: '4px solid var(--ink)',
                      boxShadow: isCopied ? 'none' : 'var(--shadow)',
                      background: isCopied ? '#2D6A4F' : 'var(--dark-red)',
                      color: 'var(--parchment)',
                      transform: isCopied ? 'translate(8px, 8px)' : undefined,
                    }}>
                    {isCopied
                      ? <><Check className="w-5 h-5" /> 密咒已封印</>
                      : <><Zap className="w-5 h-5" /> 施放咒語術式</>
                    }
                  </button>
                </div>
              </div>

              {/* RIGHT PANEL: Terminal preview (desktop only) */}
              <div className="hidden md:flex md:flex-1 flex-col min-h-0"
                style={{ background: '#1a1f2e', borderLeft: '4px solid var(--ink)' }}>
                {/* Terminal header bar */}
                <div className="flex-shrink-0 flex items-center justify-between px-5 py-3"
                  style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                  </div>
                  <span className="text-xs font-black tracking-[0.15em]"
                    style={{ fontFamily: 'var(--font-chivo)', color: 'rgba(255,255,255,0.5)' }}>
                    咒語預覽終端機 PREVIEW_TERMINAL
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => {
                      const baseInputs: any = {};
                      selectedCurse.fields.forEach((f: any, idx: number) => {
                        const isVisible = idx < getFieldVisibility(selectedCurse.fields.length, castLevel);
                        baseInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : HIDDEN_MARKER;
                      });
                      const finalInputs = { ...baseInputs, [selectedCurse.tweak?.id]: (inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0]) };
                      const spell = selectedCurse.generate(finalInputs).replace(/\[\[/g, '').replace(/\]\]/g, '');
                      // Filter out lines containing hidden marker before copying
                      const visibleSpell = spell.split('\n').filter((l: string) => !l.includes(HIDDEN_MARKER)).join('\n');
                      navigator.clipboard.writeText(visibleSpell);
                    }} className="p-1.5" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.4)' }}>
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Terminal content */}
                <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                  {(() => {
                    const baseInputs: any = {};
                    selectedCurse.fields.forEach((f: any, idx: number) => {
                      const isVisible = idx < getFieldVisibility(selectedCurse.fields.length, castLevel);
                      baseInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : "（由 AI 根據情境自動填充）";
                    });
                    const finalInputs = { ...baseInputs, [selectedCurse.tweak?.id]: (inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0]) };
                    return <TerminalPrompt text={selectedCurse.generate(finalInputs)} />;
                  })()}
                </div>

                {/* Terminal footer */}
                <div className="flex-shrink-0 px-6 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-xs mb-3" style={{ fontFamily: 'monospace', color: 'rgba(26,92,90,0.7)' }}>
                    {'>'} 等待注入魔力數據中...
                  </p>
                  <div className="flex gap-2">
                    {[
                      `META_DATA: V2.4`,
                      `STRENGTH: HIGH`,
                      `PARAMS: ${selectedCurse.fields?.length || 0}`,
                    ].map(tag => (
                      <span key={tag} className="text-[9px] font-bold px-2 py-1"
                        style={{ fontFamily: 'var(--font-chivo)', border: '1px solid rgba(139,38,38,0.5)', color: 'rgba(139,38,38,0.8)', background: 'rgba(139,38,38,0.1)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 大魔導師筆記 — desktop, below terminal */}
                {selectedCurse.theory && (
                  <div className="hidden md:block" style={{ borderLeft: '4px solid var(--ink)', background: 'rgba(26,92,90,0.06)' }}>
                    <div className="flex items-center gap-2 px-5 py-2"
                      style={{ background: 'var(--teal)', borderTop: '3px solid var(--ink)', borderBottom: '3px solid var(--ink)' }}>
                      <BookOpen className="w-4 h-4" style={{ color: 'var(--mustard)' }} />
                      <span className="text-xs font-black uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-chivo)', color: 'var(--parchment)' }}>
                        大魔導師筆記
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-xs leading-relaxed italic"
                        style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.7 }}>
                        {selectedCurse.theory}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── TWEAK BOTTOM SHEET (Mobile) ── */}
      <AnimatePresence>
        {showTweakSheet && selectedCurse?.tweak && (
          <div className="fixed inset-0 z-[250] flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ background: 'rgba(42,39,35,0.7)' }}
              onClick={() => setShowTweakSheet(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full p-6 pb-10 z-10"
              style={{ background: 'var(--parchment)', borderTop: '4px solid var(--ink)', boxShadow: '0 -8px 0px var(--ink)' }}
            >
              <div className="w-12 h-1.5 rounded-full mx-auto mb-6" style={{ background: 'var(--ink)', opacity: 0.3 }} />
              <h3
                className="text-xl font-black mb-6 px-2"
                style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)', fontWeight: 900 }}
              >
                {selectedCurse.tweak.label}
              </h3>
              <div className="space-y-3">
                {selectedCurse.tweak.options.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setInputs({ ...inputs, [selectedCurse.tweak.id]: opt });
                      setShowTweakSheet(false);
                    }}
                    className="w-full p-4 text-left font-bold flex items-center justify-between transition-all"
                    style={{
                      fontFamily: 'var(--font-chivo)',
                      border: '3px solid var(--ink)',
                      boxShadow: (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'none' : '4px 4px 0px var(--ink)',
                      background: (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'var(--mustard)' : 'var(--parchment)',
                      color: 'var(--ink)',
                      transform: (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'translate(4px,4px)' : undefined,
                    }}
                  >
                    <span>{opt.split('：')[0]}</span>
                    {(inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowTweakSheet(false)}
                className="w-full mt-6 py-3 font-bold text-sm"
                style={{
                  fontFamily: 'var(--font-chivo)',
                  border: '3px solid var(--ink)',
                  color: 'var(--ink)',
                  background: 'transparent',
                  opacity: 0.5,
                }}
              >
                取消
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── RISK SCROLL MODAL ── */}
      <AnimatePresence>
        {showRiskScroll && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ background: 'rgba(42,39,35,0.92)' }}
              onClick={() => setShowRiskScroll(false)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="relative w-full max-w-md p-8 md:p-12"
              style={{
                border: '4px solid var(--ink)',
                boxShadow: 'var(--shadow-hover)',
                background: '#FEFAF0',
              }}
            >
              {/* Decorative corner lines */}
              <div className="absolute top-3 left-3 w-6 h-6" style={{ borderTop: '3px solid var(--dark-red)', borderLeft: '3px solid var(--dark-red)' }} />
              <div className="absolute top-3 right-3 w-6 h-6" style={{ borderTop: '3px solid var(--dark-red)', borderRight: '3px solid var(--dark-red)' }} />
              <div className="absolute bottom-3 left-3 w-6 h-6" style={{ borderBottom: '3px solid var(--dark-red)', borderLeft: '3px solid var(--dark-red)' }} />
              <div className="absolute bottom-3 right-3 w-6 h-6" style={{ borderBottom: '3px solid var(--dark-red)', borderRight: '3px solid var(--dark-red)' }} />

              <AlertTriangle className="w-10 h-10 mx-auto mb-5 animate-pulse" style={{ color: 'var(--dark-red)' }} />
              <h3
                className="text-2xl text-center mb-6"
                style={{ fontFamily: 'var(--font-rye)', color: 'var(--dark-red)' }}
              >
                魔法使用契約
              </h3>
              <div
                className="space-y-3 text-sm leading-relaxed max-h-[40vh] overflow-y-auto pr-1 mb-8"
                style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', borderTop: '2px solid var(--ink)', borderBottom: '2px solid var(--ink)', paddingTop: '1rem', paddingBottom: '1rem' }}
              >
                <p>1. 咒語內容僅供參考，生成結果之適法性由使用者自負。</p>
                <p>2. 施法前應評估社交與職涯風險。</p>
                <p>3. 點擊簽署即表示您已年滿 18 歲且同意放棄法律追訴權。</p>
              </div>
              <button
                onClick={handleRiskAcceptAndCopy}
                className="w-full py-4 font-black uppercase tracking-wider transition-all active:translate-x-1 active:translate-y-1"
                style={{
                  fontFamily: 'var(--font-rye)',
                  border: '4px solid var(--ink)',
                  boxShadow: 'var(--shadow)',
                  background: 'var(--dark-red)',
                  color: 'var(--parchment)',
                  letterSpacing: '0.1em',
                  fontSize: '0.85rem',
                }}
              >
                確認理解，正式簽署契約
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── BREWING ANIMATION OVERLAY ── */}
      <AnimatePresence>
        {showBrewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] flex flex-col items-center justify-center"
            style={{ background: 'var(--parchment)' }}
          >
            {/* Halftone dot pattern bg */}
            <div className="absolute inset-0 halftone-bg pointer-events-none" />

            {/* ── Cauldron + bubbles group ── */}
            <div style={{ position: 'relative', width: 160, height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>

              {/* Bubble 1 — large mustard, centre */}
              <motion.div
                style={{ position: 'absolute', left: '44%', bottom: '76%', width: 20, height: 20, borderRadius: '50%', background: '#E8A838', border: '3px solid #1a1a1a', zIndex: 2 }}
                animate={{ y: [0, -90], opacity: [1, 0], scale: [1, 0.3] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.1 }}
              />
              {/* Bubble 2 — small dark, right */}
              <motion.div
                style={{ position: 'absolute', left: '62%', bottom: '80%', width: 12, height: 12, borderRadius: '50%', background: 'transparent', border: '3px solid #1a1a1a', zIndex: 2 }}
                animate={{ y: [0, -70], opacity: [1, 0], scale: [1, 0.2] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut', delay: 0.4, repeatDelay: 0.2 }}
              />
              {/* Bubble 3 — medium dark, left */}
              <motion.div
                style={{ position: 'absolute', left: '28%', bottom: '82%', width: 15, height: 15, borderRadius: '50%', background: 'transparent', border: '3px solid #1a1a1a', zIndex: 2 }}
                animate={{ y: [0, -80], opacity: [1, 0], scale: [1, 0.25] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut', delay: 0.7, repeatDelay: 0.15 }}
              />

              {/* Bobbing cauldron */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <svg width="150" height="140" viewBox="0 0 150 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* === Wide flat rim === */}
                  <rect x="15" y="46" width="120" height="14" fill="#2A2723" />
                  {/* Left handle knob */}
                  <rect x="4"  y="41" width="16" height="13" rx="2" fill="#2A2723" />
                  {/* Right handle knob */}
                  <rect x="130" y="41" width="16" height="13" rx="2" fill="#2A2723" />

                  {/* === Liquid overflowing at rim === */}
                  {/* Flat mustard liquid inside rim */}
                  <rect x="17" y="48" width="116" height="11" fill="#E8A838" />
                  {/* Liquid hump in centre */}
                  <ellipse cx="75" cy="46" rx="22" ry="9" fill="#E8A838" />
                  {/* Liquid shine */}
                  <rect x="30" y="50" width="28" height="4" fill="#F4EED8" opacity="0.28" />

                  {/* === Cauldron body === */}
                  {/* Outer body (rounded bottom) */}
                  <path d="M22 58 Q18 130 75 132 Q132 130 128 58 Z" fill="#232323" />
                  {/* Body highlight band */}
                  <path d="M30 58 Q27 110 75 112 Q123 110 120 58 Z" fill="#1a1a1a" />
                  {/* Centre groove / indent */}
                  <path d="M38 80 Q75 84 112 80 L114 92 Q75 97 36 92 Z" fill="#111111" />

                  {/* === Feet / legs === */}
                  <ellipse cx="52"  cy="131" rx="13" ry="9" fill="#1a1a1a" />
                  <ellipse cx="98"  cy="131" rx="13" ry="9" fill="#1a1a1a" />
                </svg>

                {/* Fire glow beneath (pulsing via Framer) */}
                <motion.div
                  animate={{ opacity: [0.45, 0.85, 0.45], scaleX: [1, 1.25, 1] }}
                  transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 90,
                    height: 24,
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(220,90,70,0.75) 0%, rgba(220,90,70,0) 70%)',
                    filter: 'blur(6px)',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            </div>

            {/* Label */}
            <p
              className="text-2xl font-black mt-3 mb-6"
              style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)', fontWeight: 900 }}
            >
              研磨草藥中...
            </p>

            {/* Progress bar — Framer animated width */}
            <div
              style={{
                width: 240,
                height: 24,
                border: '3px solid var(--ink)',
                boxShadow: '4px 4px 0px var(--ink)',
                background: 'var(--parchment)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'linear' }}
                style={{
                  height: '100%',
                  background: 'repeating-linear-gradient(45deg, #1A5C5A 0px, #1A5C5A 8px, #134A48 8px, #134A48 16px)',
                }}
              />
            </div>

            {/* Warning text */}
            <p
              className="mt-5 text-[11px] font-bold px-4 py-2"
              style={{
                fontFamily: 'var(--font-chivo)',
                color: 'var(--dark-red)',
                border: '2px solid var(--dark-red)',
                background: 'rgba(139,38,38,0.04)',
              }}
            >
              ▲ 施法期間請勿關閉視窗，以免造成法術逆火 ▲
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
