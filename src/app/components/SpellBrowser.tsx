"use client";
import React from "react";
import { Sparkles, X, Search, Lock, ArrowRight, RefreshCw } from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { TABS, TIER_CONFIG, getSpellCode, getTabColor, scrollToTab, CURSES, SCHOOL_CONFIG } from "../lib/constants";
import type { SchoolType } from "../curses_data";

const SCHOOL_KEYS: SchoolType[] = ['defense', 'attack', 'healing', 'illusion', 'contract', 'insight'];

export default function SpellBrowser() {
  const {
    searchQuery, setSearchQuery,
    groupedCurses, expandedTabs, setExpandedTabs,
    isLoggedIn, handleCardClick,
    activeSchool, setActiveSchool,
  } = useAcademy();

  return (
    <>
      {/* ── §05 SEARCH + TAB NAV ── */}
      <div className="w-full max-w-5xl mx-auto px-4 pt-8 mb-8 relative z-10">
        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="relative flex items-center" style={{ border: '3px solid var(--ink)', background: '#FEFAF0', boxShadow: '4px 4px 0px var(--ink)' }}>
            <Search className="absolute left-4 w-4 h-4" style={{ color: 'var(--ink)', opacity: 0.5 }} />
            <input
              type="text"
              placeholder="搜尋全站魔法..."
              className="w-full py-3 pl-11 pr-10 text-sm bg-transparent focus:outline-none"
              style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 p-1" style={{ color: 'var(--ink)', opacity: 0.5 }}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 pb-2 tab-scroll-container justify-start md:justify-center">
          <button
            onClick={() => { setSearchQuery(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex-shrink-0 px-4 py-2 text-xs font-black uppercase tracking-wide transition-all active:translate-x-1 active:translate-y-1"
            style={{
              fontFamily: 'var(--font-chivo)',
              border: '3px solid var(--ink)',
              boxShadow: '3px 3px 0px var(--ink)',
              background: 'var(--mustard)',
              color: 'var(--ink)',
            }}
          >
            全部
          </button>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => { setSearchQuery(""); setTimeout(() => scrollToTab(tab), 100); }}
              className="flex-shrink-0 px-4 py-2 text-xs font-black uppercase tracking-wide transition-all active:translate-x-1 active:translate-y-1 hover:bg-[var(--mustard)]"
              style={{
                fontFamily: 'var(--font-chivo)',
                border: '3px solid var(--ink)',
                boxShadow: '3px 3px 0px var(--ink)',
                background: 'var(--parchment)',
                color: 'var(--ink)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* School filter pills */}
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 pt-3 pb-1 tab-scroll-container justify-start md:justify-center">
          <button
            onClick={() => setActiveSchool("all")}
            className="flex-shrink-0 px-3 py-1.5 text-[11px] font-black tracking-wide transition-all active:translate-x-0.5 active:translate-y-0.5"
            style={{
              fontFamily: 'var(--font-noto-sans-tc)',
              border: `2px solid ${activeSchool === 'all' ? 'var(--ink)' : 'rgba(0,0,0,0.2)'}`,
              boxShadow: activeSchool === 'all' ? '2px 2px 0px var(--ink)' : 'none',
              background: activeSchool === 'all' ? 'var(--mustard)' : 'transparent',
              color: 'var(--ink)',
              opacity: activeSchool === 'all' ? 1 : 0.6,
            }}
          >
            全流派
          </button>
          {SCHOOL_KEYS.map(key => {
            const school = SCHOOL_CONFIG[key];
            const isActive = activeSchool === key;
            return (
              <button
                key={key}
                onClick={() => setActiveSchool(isActive ? "all" : key)}
                className="flex-shrink-0 px-3 py-1.5 text-[11px] font-black tracking-wide transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{
                  fontFamily: 'var(--font-noto-sans-tc)',
                  border: `2px solid ${isActive ? school.color : 'rgba(0,0,0,0.2)'}`,
                  boxShadow: isActive ? `2px 2px 0px ${school.color}` : 'none',
                  background: isActive ? `${school.color}18` : 'transparent',
                  color: isActive ? school.color : 'var(--ink)',
                  opacity: isActive ? 1 : 0.6,
                  whiteSpace: 'nowrap',
                }}
              >
                {school.emoji} {school.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN LIBRARY ── */}
      <main className="w-full max-w-7xl mx-auto relative z-10 pb-24 px-0">
        {TABS.map(tab => {
          const tabCurses = groupedCurses[tab];
          if (searchQuery && tabCurses.length === 0) return null;
          if (activeSchool !== "all" && tabCurses.length === 0) return null;

          return (
            <section key={tab} id={tab} className="mb-12 md:mb-16 last:mb-0 scroll-mt-32">
              {/* Section header */}
              <div className="flex items-center gap-0 px-4 mb-6">
                <div
                  className="px-5 py-3"
                  style={{
                    fontFamily: 'var(--font-noto-serif-tc)',
                    fontWeight: 900,
                    fontSize: '1.3rem',
                    color: 'var(--parchment)',
                    background: 'var(--ink)',
                    border: '4px solid var(--ink)',
                  }}
                >
                  {tab}
                </div>
                <div
                  className="flex-1 h-4"
                  style={{ borderTop: '4px solid var(--ink)', borderBottom: '4px solid var(--ink)', background: 'var(--mustard)', opacity: 0.5 }}
                />
                <div className="flex items-center gap-2 px-4 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--ink)', opacity: 0.4, fontFamily: 'var(--font-chivo)' }}>
                  Scroll <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Horizontal card row (swipe left for more) */}
              <div className="relative">
                <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-20" style={{ background: 'linear-gradient(to left, var(--parchment), transparent)' }} />

                <div className="flex overflow-x-auto gap-5 px-4 pb-8 no-scrollbar snap-x snap-mandatory scroll-smooth tab-scroll-container">
                  {(expandedTabs[tab] || searchQuery || activeSchool !== "all" ? tabCurses : tabCurses.slice(0, 3)).map((curse: any, idx: number) => {
                    const tabColor = getTabColor(curse.tab);
                    const schoolInfo = curse.school && SCHOOL_CONFIG[curse.school as SchoolType] ? SCHOOL_CONFIG[curse.school as SchoolType] : null;
                    return (
                    <div
                      key={curse.id}
                      onPointerDown={(e) => { (e.currentTarget as any)._startX = e.clientX; (e.currentTarget as any)._startY = e.clientY; (e.currentTarget as any)._startT = Date.now(); }}
                      onPointerUp={(e) => {
                        const dx = Math.abs(e.clientX - ((e.currentTarget as any)._startX || 0));
                        const dy = Math.abs(e.clientY - ((e.currentTarget as any)._startY || 0));
                        const dt = Date.now() - ((e.currentTarget as any)._startT || 0);
                        if (dx < 15 && dy < 15 && dt < 300) handleCardClick(curse);
                      }}
                      className="flex-shrink-0 w-[260px] md:w-[300px] snap-start text-left p-0 flex flex-col relative overflow-hidden cursor-pointer"
                      style={{
                        border: `4px solid ${curse.tier && TIER_CONFIG[curse.tier] ? TIER_CONFIG[curse.tier].borderColor : 'var(--ink)'}`,
                        boxShadow: 'var(--shadow)',
                        background: curse.tier && TIER_CONFIG[curse.tier] ? TIER_CONFIG[curse.tier].bgGlow : '#FEFAF0',
                        transition: 'box-shadow 0.12s ease, transform 0.12s ease',
                      }}
                    >
                      {/* Colored top stripe */}
                      <div style={{ height: '6px', background: curse.tier && TIER_CONFIG[curse.tier] ? TIER_CONFIG[curse.tier].color : tabColor }} />

                      {/* Big background number — card center-right */}
                      <span
                        className="absolute top-1/2 -translate-y-1/2 right-4 text-8xl font-black leading-none select-none pointer-events-none z-0"
                        style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.06 }}
                      >
                        {getSpellCode(curse).split('-').pop()}
                      </span>

                      {/* Card header area */}
                      <div className="p-5 pb-3 relative">
                        {/* Category tag + tier badge + school icon + icon */}
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <div
                              className="text-[10px] font-black px-2 py-1"
                              style={{ background: tabColor, fontFamily: 'var(--font-chivo)', color: '#FEFAF0' }}
                            >
                              {curse.tab}
                            </div>
                            {curse.tier && TIER_CONFIG[curse.tier] && (
                              <div
                                className="text-[9px] font-black px-2 py-1 tracking-wider"
                                style={{
                                  fontFamily: 'var(--font-chivo)',
                                  color: curse.tier === 'forbidden' ? '#D4AF37' : TIER_CONFIG[curse.tier].color,
                                  border: `2px solid ${curse.tier === 'forbidden' ? '#D4AF37' : TIER_CONFIG[curse.tier].color}`,
                                  background: curse.tier === 'forbidden' ? '#1F2937' : 'transparent',
                                }}
                              >
                                {TIER_CONFIG[curse.tier].label}
                              </div>
                            )}
                            {schoolInfo && (
                              <div
                                className="text-[10px] font-black px-1.5 py-0.5"
                                style={{
                                  fontFamily: 'var(--font-noto-sans-tc)',
                                  color: schoolInfo.color,
                                  border: `1.5px solid ${schoolInfo.color}`,
                                  opacity: 0.8,
                                }}
                                title={`${schoolInfo.emoji} ${schoolInfo.label}流派`}
                              >
                                {schoolInfo.emoji}
                              </div>
                            )}
                          </div>
                          {curse.isPro && !isLoggedIn ? (
                            <div className="flex items-center gap-1 text-[10px] font-black px-2 py-1"
                              style={{ background: 'var(--dark-red)', border: '2px solid var(--ink)', color: 'var(--parchment)', fontFamily: 'var(--font-chivo)' }}>
                              <Lock className="w-3 h-3" /> PRO
                            </div>
                          ) : (
                            <div className="text-lg" style={{ color: 'var(--ink)', opacity: 0.4 }}>
                              {curse.icon}
                            </div>
                          )}
                        </div>

                        {/* Title — large bold */}
                        <h3
                          className="text-xl md:text-2xl leading-tight mb-0 relative z-10"
                          style={{ fontFamily: 'var(--font-noto-serif-tc)', fontWeight: 900, color: 'var(--ink)' }}
                        >
                          {curse.title.replace(/【|】/g, '').replace(/\n/g, '')}
                        </h3>
                      </div>

                      {/* Description area with left accent border */}
                      <div className="px-5 py-3 flex-1">
                        <div style={{ borderLeft: `3px solid ${tabColor}`, paddingLeft: '12px' }}>
                          <p
                            className="text-sm leading-relaxed line-clamp-3"
                            style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.75 }}
                          >
                            {curse.desc}
                          </p>
                        </div>
                      </div>

                      {/* Dashed divider */}
                      <div className="mx-5" style={{ borderTop: '2px dashed var(--ink)', opacity: 0.3 }} />

                      {/* Footer */}
                      <div className="flex items-center justify-between px-5 py-3">
                        {/* Stamp-style spell code */}
                        <span className="text-[9px] font-black px-1.5 py-0.5 tracking-wider select-none"
                          style={{
                            fontFamily: 'var(--font-chivo)',
                            color: 'var(--dark-red)',
                            border: '1.5px solid var(--dark-red)',
                            opacity: 0.45,
                            transform: 'rotate(-2deg)',
                          }}>
                          {getSpellCode(curse)}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-black" style={{ fontFamily: 'var(--font-noto-sans-tc)', color: tabColor }}>
                          詠唱 <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                    );
                  })}

                  {/* 查看全部咒語 button */}
                  {!expandedTabs[tab] && !searchQuery && activeSchool === "all" && tabCurses.length > 3 && (
                    <button
                      onClick={() => setExpandedTabs(prev => ({ ...prev, [tab]: true }))}
                      className="flex-shrink-0 w-[260px] md:w-[300px] snap-start flex flex-col items-center justify-center text-center p-6 transition-all active:translate-x-1 active:translate-y-1"
                      style={{ border: '4px solid var(--ink)', boxShadow: 'var(--shadow)', background: 'var(--mustard)' }}
                    >
                      <Sparkles className="w-8 h-8 mb-3" style={{ color: 'var(--ink)' }} />
                      <span className="text-base font-black" style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)' }}>
                        查看全部咒語 →
                      </span>
                      <span className="text-xs mt-2" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.5 }}>
                        還有 {tabCurses.length - 3} 道
                      </span>
                    </button>
                  )}

                  {/* 魔力凝結中... placeholder card */}
                  <div
                    className="magic-card flex-shrink-0 w-[260px] md:w-[300px] snap-start flex flex-col items-center justify-center text-center p-6"
                    style={{ opacity: 0.7 }}
                  >
                    <RefreshCw className="w-10 h-10 mb-4 animate-spin" style={{ color: 'var(--ink)', opacity: 0.3, animationDuration: '3s' }} />
                    <div
                      className="text-sm font-black px-4 py-2"
                      style={{ background: 'var(--mustard)', border: '3px solid var(--ink)', fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)' }}
                    >
                      魔力凝結中...
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-8 md:w-20" />
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
