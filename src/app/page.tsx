"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles, Copy, ExternalLink, ChevronDown, X, Search, Check,
  Brain, Bot, MessageSquare, Lock, Share2, AlertTriangle, ArrowRight, BookOpen,
  ArrowLeft
} from "lucide-react";
import { CURSES } from "./curses_data";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";

// Helper: Highlight variables in the spell preview
const HighlightedPrompt = ({ text }: { text: string }) => {
  const parts = text.split(/(\[\[.*?\]\])/g);
  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed" style={{ fontFamily: 'var(--font-noto-sans-tc), monospace', color: 'var(--ink)' }}>
      {parts.map((part, i) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
          const content = part.slice(2, -2);
          return (
            <span key={i} className="font-bold px-1 mx-0.5" style={{ background: 'var(--mustard)', border: '2px solid var(--ink)', color: 'var(--ink)' }}>
              {content}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
};

export default function MagicAcademyMVP() {
  const [selectedCurse, setSelectedCurse] = useState<any>(null);
  const [inputs, setInputs] = useState<any>({});
  const [spellLevel, setSpellLevel] = useState<"初級" | "中級" | "高級">("高級");
  const [isCopied, setIsCopied] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [agreedToRisk, setAgreedToRisk] = useState(false);
  const [activeTab, setActiveTab] = useState("全部");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRiskScroll, setShowRiskScroll] = useState(false);
  const [showTweakSheet, setShowTweakSheet] = useState(false);
  const [activeTrial, setActiveTrial] = useState(0);
  const [isTrialCopied, setIsTrialCopied] = useState(false);

  const TRIAL_DATA = [
    {
      emoji: "😤", label: "被老闆凹加班",
      prompt: `請幫我撰寫一段婉拒加班的訊息。\n語氣需要：\n1. 表達理解公司需求 \n2. 說明自己當晚有不可取消的個人要事 \n3. 提出替代方案（例如明日優先處理） \n4. 全程維持專業，不道歉、不解釋過多。\n字數在100字以內，繁體中文。`
    },
    {
      emoji: "😶", label: "不想參加聚餐",
      prompt: `請幫我撰寫一段禮貌推掉聚餐邀約的訊息。\n需要做到：\n1. 表達感謝對方邀請 \n2. 給出模糊但合理的理由（不需具體） \n3. 留下善意但不承諾下次 \n4. 語氣溫嫩不冷漠，避免對方追問。\n字數80字以內，繁體中文。`
    },
    {
      emoji: "💸", label: "開口談加薪",
      prompt: `請幫我撰寫一段向主管提出加薪請求的開場白。\n需包含：\n1. 點出自己近期具體貢獻（請我填入） \n2. 以市場行情為錨點而非個人需求 \n3. 提出具體數字區間而非開放式詢問 \n4. 語氣自信但不對抗。\n請留下[貢獻內容]的填空處，字數120字以內，繁體中文。`
    },
    {
      emoji: "😨", label: "被親戚問到崩潰",
      prompt: `請幫我撰寫一段應對親戚詢問感情／工作／人生規劃的萬用回應。\n策略：\n1. 用幽默轉移焦點而非正面回答 \n2. 反將一軍讓對方開始說自己 \n3. 保持笑臉不傷和氣 \n4. 可一句話終結話題。\n提供2個版本：溫和版與進階版，繁體中文。`
    }
  ];

  const handleTrialCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsTrialCopied(true);
      setTimeout(() => setIsTrialCopied(false), 2000);
    });
  };

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(CURSES, {
      keys: ["title", "desc", "tags", "tab"],
      threshold: 0.4,
      ignoreLocation: true,
      useExtendedSearch: true
    });
  }, []);

  // Filter and Search Logic
  const filteredCurses = useMemo(() => {
    if (!searchQuery.trim()) return CURSES;
    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery, fuse]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCurse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCurse]);

  const TABS = ["職場求生", "校園生存", "人際擋箭", "日常雜症", "創業/斜槓"];

  const scrollToTab = (tabId: string) => {
    const element = document.getElementById(tabId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Group curses by tab
  const groupedCurses = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    TABS.forEach(tab => {
      groups[tab] = filteredCurses.filter(c => c.tab === tab);
    });
    return groups;
  }, [filteredCurses]);

  const handleCardClick = (curse: any) => {
    if (curse.isPro && !isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setSelectedCurse(curse);
    setAgreedToRisk(false);
    setInputs({});
  };

  const handleCopy = () => {
    if (!agreedToRisk) {
      setShowRiskScroll(true);
      return;
    }
    const autoInputs: any = {}; selectedCurse.fields.forEach((f: any, idx: number) => { const isVisible = spellLevel === "高級" || (spellLevel === "初級" && idx < 2) || (spellLevel === "中級" && idx < 3); autoInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : "（由 AI 根據情境自動填充）"; }); const spell = selectedCurse.generate({ ...autoInputs, [selectedCurse.tweak?.id]: inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0] });
    const cleanSpell = spell.replace(/\[\[/g, '').replace(/\]\]/g, '');
    navigator.clipboard.writeText(cleanSpell).then(() => {
      setIsCopied(true);
      setShowPortal(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  const handleRiskAcceptAndCopy = () => {
    setAgreedToRisk(true);
    setShowRiskScroll(false);
    const autoInputs: any = {}; selectedCurse.fields.forEach((f: any, idx: number) => { const isVisible = spellLevel === "高級" || (spellLevel === "初級" && idx < 2) || (spellLevel === "中級" && idx < 3); autoInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : "（由 AI 根據情境自動填充）"; }); const spell = selectedCurse.generate({ ...autoInputs, [selectedCurse.tweak?.id]: inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0] });
    const cleanSpell = spell.replace(/\[\[/g, '').replace(/\]\]/g, '');
    navigator.clipboard.writeText(cleanSpell).then(() => {
      setIsCopied(true);
      setShowPortal(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `我在【AI 魔法學院】解鎖了「${selectedCurse.title.replace(/|/g, '')}」禁忌咒語。這不是普通的提示詞，這是物理級的生存武裝。進來領取你的法典：`;
    if (navigator.share) {
      navigator.share({ title: 'AI 魔法學院', text, url }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert("已複製專屬魔法分享連結！快去社群擴散吧。");
    }
  };

  const handleDeepLink = (webUrl: string, appScheme: string) => {
    const start = Date.now();
    let isRedirected = false;
    window.location.href = appScheme;
    const handleVisibilityChange = () => {
      if (document.hidden) isRedirected = true;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    setTimeout(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (!isRedirected && !document.hidden && document.hasFocus()) {
        const elapsed = Date.now() - start;
        if (elapsed < 3500) {
          window.open(webUrl, '_blank');
        }
      }
      setShowPortal(false);
    }, 2500);
  };

  const getColorHex = (colorName: string) => {
    const map: any = {
      orange: '#f97316', red: '#ef4444', blue: '#3b82f6', pink: '#ec4899',
      yellow: '#eab308', slate: '#64748b', green: '#22c55e', indigo: '#6366f1',
      amber: '#f59e0b', emerald: '#10b981', purple: '#a855f7', cyan: '#06b6d4',
      rose: '#f43f5e', neutral: '#737373', sky: '#0ea5e9'
    };
    return map[colorName] || '#E8A838';
  };

  return (
    <div className="min-h-screen w-full parchment-bg" style={{ color: 'var(--ink)' }}>

      {/* ── HEADER / MASTHEAD ── */}
      <header className="w-full pt-8 pb-0 px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Top masthead bar */}
          <div className="flex items-center justify-between border-b-4 pb-2 mb-4" style={{ borderColor: 'var(--ink)' }}>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--teal)' }}>
              Vol. I — 現代魔法法典
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.5 }}>
              Est. 2025
            </span>
          </div>

          {/* Main title */}
          <div className="text-center border-b-4 pb-6 mb-6" style={{ borderColor: 'var(--ink)' }}>
            <h1
              className="text-4xl sm:text-5xl md:text-7xl leading-tight mb-3 tracking-tight"
              style={{ fontFamily: 'var(--font-rye)', color: 'var(--ink)' }}
            >
              麻瓜專用<br className="md:hidden" />魔法外掛
            </h1>
            <p
              className="text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-4"
              style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.75 }}
            >
              將複雜的「提示詞」封裝成一鍵釋放的魔法。<br />
              應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。
            </p>
          </div>

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
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 pb-6 tab-scroll-container justify-start md:justify-center">
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
        </div>
      </header>

      {/* ── FREE TRIAL SECTION ── */}
      <section className="w-full max-w-4xl mx-auto mb-16 px-4 relative z-10">
        <div className="text-center mb-8">
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

      {/* ── MAIN LIBRARY ── */}
      <main className="w-full max-w-7xl mx-auto relative z-10 pb-20 px-0">
        {TABS.map(tab => {
          const tabCurses = groupedCurses[tab];
          if (searchQuery && tabCurses.length === 0) return null;

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

              {/* Horizontal card row */}
              <div className="relative">
                <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-20" style={{ background: 'linear-gradient(to left, var(--parchment), transparent)' }} />

                <div className="flex overflow-x-auto gap-5 px-4 pb-8 no-scrollbar snap-x snap-mandatory scroll-smooth tab-scroll-container">
                  {tabCurses.map((curse: any) => (
                    <motion.button
                      layoutId={`card-${curse.id}`}
                      key={curse.id}
                      onClick={() => handleCardClick(curse)}
                      className="magic-card flex-shrink-0 w-[260px] md:w-[320px] snap-start text-left p-5 flex flex-col"
                      style={{ minHeight: '280px' }}
                    >
                      {/* Card top: icon + badge */}
                      <div className="flex justify-between items-start mb-5">
                        <div
                          className="p-3 text-2xl"
                          style={{ border: '3px solid var(--ink)', background: 'var(--mustard)' }}
                        >
                          {curse.icon}
                        </div>
                        {curse.isPro && !isLoggedIn ? (
                          <div
                            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-1"
                            style={{ border: '2px solid var(--dark-red)', background: 'var(--dark-red)', color: 'var(--parchment)', fontFamily: 'var(--font-chivo)' }}
                          >
                            <Lock className="w-3 h-3" /> PRO
                          </div>
                        ) : (
                          <div
                            className="text-[10px] font-black uppercase tracking-wider px-2 py-1"
                            style={{ border: '2px solid var(--teal)', color: 'var(--teal)', fontFamily: 'var(--font-chivo)' }}
                          >
                            {curse.outputFormat?.split(' ')[0] || 'TEXT'}
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        className="text-lg md:text-xl mb-2 leading-tight line-clamp-1"
                        style={{ fontFamily: 'var(--font-rye)', color: 'var(--ink)' }}
                      >
                        {curse.title.replace(/【|】/g, '')}
                      </h3>

                      {/* Desc */}
                      <p
                        className="text-sm leading-relaxed line-clamp-3 mb-4 flex-1"
                        style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.75 }}
                      >
                        {curse.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(curse.tags || []).slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold px-2 py-0.5"
                            style={{ border: '2px solid var(--ink)', fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.6 }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: '2px solid var(--ink)' }}>
                        <span className="text-[10px] font-black uppercase tracking-tight" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--teal)' }}>
                          立即解構咒語
                        </span>
                        <ArrowRight className="w-4 h-4" style={{ color: 'var(--ink)' }} />
                      </div>
                    </motion.button>
                  ))}
                  <div className="flex-shrink-0 w-8 md:w-20" />
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* ── SPELL DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedCurse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ background: 'rgba(42,39,35,0.85)' }}
              onClick={() => setSelectedCurse(null)}
            />

            {/* Modal panel */}
            <motion.div
              layoutId={`card-${selectedCurse.id}`}
              className="w-full max-w-4xl relative z-10 flex flex-col"
              style={{
                border: '4px solid var(--ink)',
                boxShadow: '12px 12px 0px var(--ink)',
                background: 'var(--parchment)',
                maxHeight: '92vh',
                overflow: 'hidden',
              }}
            >
              {/* Modal layout: left teal panel + right parchment panel */}
              <div className="flex flex-col md:flex-row flex-1 min-h-0">

                {/* LEFT PANEL — teal */}
                <div
                  className="md:w-[38%] flex-shrink-0 p-6 md:p-8 flex flex-col gap-6"
                  style={{ background: 'var(--teal)', borderRight: '4px solid var(--ink)' }}
                >
                  {/* Top actions */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedCurse(null)}
                      className="flex items-center gap-2 text-xs font-black uppercase"
                      style={{ fontFamily: 'var(--font-chivo)', color: 'var(--parchment)', opacity: 0.8 }}
                    >
                      <ArrowLeft className="w-4 h-4" /> 返回
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2"
                      style={{ border: '2px solid var(--parchment)', color: 'var(--parchment)' }}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Spell icon */}
                  <div
                    className="text-4xl p-5 self-start"
                    style={{ border: '4px solid var(--parchment)', background: 'rgba(244,238,216,0.15)', boxShadow: '4px 4px 0px rgba(244,238,216,0.3)' }}
                  >
                    {selectedCurse.icon}
                  </div>

                  {/* Category badge */}
                  <div>
                    <div
                      className="inline-block text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 mb-3"
                      style={{ fontFamily: 'var(--font-chivo)', border: '2px solid var(--parchment)', color: 'var(--parchment)' }}
                    >
                      {selectedCurse.tab}
                    </div>
                    <h2
                      className="text-2xl md:text-3xl leading-tight mb-3"
                      style={{ fontFamily: 'var(--font-rye)', color: 'var(--parchment)' }}
                    >
                      {selectedCurse.title.replace(/|/g, '')}
                    </h2>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--parchment)', opacity: 0.85 }}
                    >
                      {selectedCurse.desc}
                    </p>
                  </div>

                  {/* Master's notes (collapsible) */}
                  <details className="group cursor-pointer mt-auto" style={{ borderTop: '2px solid rgba(244,238,216,0.3)', paddingTop: '1rem' }}>
                    <summary
                      className="flex items-center gap-2 text-sm font-black select-none list-none"
                      style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--parchment)', fontWeight: 700 }}
                    >
                      <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--mustard)' }} />
                      大魔導師筆記
                    </summary>
                    <div
                      className="mt-3 text-xs leading-relaxed"
                      style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--parchment)', opacity: 0.8, fontStyle: 'italic' }}
                    >
                      {selectedCurse.theory}
                    </div>
                  </details>
                </div>

                {/* RIGHT PANEL — parchment, scrollable */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto p-5 md:p-7 no-scrollbar">

                    {/* Spell level selector */}
                    <div className="flex items-center justify-between mb-6">
                      <h3
                        className="text-base font-black flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--ink)', fontWeight: 900 }}
                      >
                        <Sparkles className="w-4 h-4" style={{ color: 'var(--mustard)' }} />
                        注入魔力
                      </h3>
                      <div className="flex gap-0" style={{ border: '3px solid var(--ink)' }}>
                        {['初級', '中級', '高級'].map((l, i) => (
                          <button
                            key={l}
                            type="button"
                            onClick={() => setSpellLevel(l as any)}
                            className="px-4 py-2 text-xs font-black uppercase transition-all"
                            style={{
                              fontFamily: 'var(--font-chivo)',
                              background: spellLevel === l ? 'var(--ink)' : 'transparent',
                              color: spellLevel === l ? 'var(--parchment)' : 'var(--ink)',
                              borderLeft: i > 0 ? '3px solid var(--ink)' : 'none',
                            }}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Input fields */}
                    <div className="space-y-4 mb-6">
                      {selectedCurse.fields
                        .filter((_f: any, idx: number) =>
                          spellLevel === '高級' ||
                          (spellLevel === '初級' && idx < 2) ||
                          (spellLevel === '中級' && idx < 3)
                        )
                        .map((f: any) => (
                          <div key={f.id}>
                            <label
                              className="block text-[11px] font-black uppercase tracking-widest mb-2"
                              style={{ fontFamily: 'var(--font-chivo)', color: 'var(--teal)' }}
                            >
                              {f.label}
                            </label>
                            <input
                              type="text"
                              placeholder={f.placeholder}
                              className="magic-input w-full"
                              onChange={(e) => setInputs({ ...inputs, [f.id]: e.target.value })}
                            />
                          </div>
                        ))}
                    </div>

                    {/* Tweak selector */}
                    {selectedCurse.tweak && (
                      <div className="mb-6" style={{ borderTop: '3px solid var(--ink)', paddingTop: '1.25rem' }}>
                        <label
                          className="block text-[11px] font-black uppercase tracking-widest mb-3"
                          style={{ fontFamily: 'var(--font-chivo)', color: 'var(--teal)' }}
                        >
                          {selectedCurse.tweak.label}
                        </label>

                        {/* Desktop: inline grid */}
                        <div className="hidden md:flex flex-wrap gap-2">
                          {selectedCurse.tweak.options.map((opt: string) => (
                            <button
                              key={opt.split('：')[0]}
                              className="px-4 py-2 text-xs font-bold flex-1 transition-all active:translate-x-0.5 active:translate-y-0.5"
                              style={{
                                fontFamily: 'var(--font-chivo)',
                                border: '3px solid var(--ink)',
                                boxShadow: (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'none' : '3px 3px 0px var(--ink)',
                                background: (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'var(--mustard)' : 'var(--parchment)',
                                color: 'var(--ink)',
                                transform: (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'translate(3px,3px)' : undefined,
                              }}
                              onClick={() => setInputs({ ...inputs, [selectedCurse.tweak.id]: opt })}
                            >
                              {opt.split(' ')[0]}
                            </button>
                          ))}
                        </div>

                        {/* Mobile: bottom sheet trigger */}
                        <button
                          onClick={() => setShowTweakSheet(true)}
                          className="md:hidden w-full flex items-center justify-between p-4 text-sm font-bold"
                          style={{
                            border: '3px solid var(--ink)',
                            boxShadow: '4px 4px 0px var(--ink)',
                            fontFamily: 'var(--font-chivo)',
                            color: 'var(--ink)',
                            background: 'var(--parchment)',
                          }}
                        >
                          <span>{(inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]).split('：')[0]}</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Spell preview */}
                    <div
                      className="p-5 mb-4"
                      style={{ border: '3px solid var(--ink)', background: '#FEFAF0', boxShadow: 'inset 2px 2px 0px rgba(42,39,35,0.1)' }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--teal)' }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--teal)' }}>
                          咒語預覽
                        </span>
                      </div>
                      {(() => {
                        const baseInputs: any = {};
                        selectedCurse.fields.forEach((f: any, idx: number) => {
                          const isVisible = spellLevel === "高級" || (spellLevel === "初級" && idx < 2) || (spellLevel === "中級" && idx < 3);
                          baseInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : "（由 AI 根據情境自動填充）";
                        });
                        const finalInputs = { ...baseInputs, [selectedCurse.tweak?.id]: (inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0]) };
                        return <HighlightedPrompt text={selectedCurse.generate(finalInputs)} />;
                      })()}
                    </div>

                    {/* Risk agreement checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 accent-[var(--mustard)]"
                        checked={agreedToRisk}
                        onChange={(e) => setAgreedToRisk(e.target.checked)}
                        style={{ border: '2px solid var(--ink)' }}
                      />
                      <span
                        className="text-xs italic"
                        style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.6 }}
                      >
                        已簽署魔法契約，自負施法風險。
                      </span>
                    </label>
                  </div>

                  {/* CAST BUTTON — bottom sticky */}
                  <div className="shrink-0 p-4 md:p-5" style={{ borderTop: '4px solid var(--ink)', background: 'var(--parchment)' }}>
                    <button
                      onClick={handleCopy}
                      className="w-full py-4 text-base font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all hover:animate-shake"
                      style={{
                        fontFamily: 'var(--font-rye)',
                        border: '4px solid var(--ink)',
                        boxShadow: isCopied ? 'none' : 'var(--shadow)',
                        background: isCopied ? '#2D6A4F' : 'var(--mustard)',
                        color: isCopied ? 'var(--parchment)' : 'var(--ink)',
                        transform: isCopied ? 'translate(8px, 8px)' : undefined,
                        letterSpacing: '0.1em',
                      }}
                    >
                      {isCopied
                        ? <><Check className="w-5 h-5" /> 密咒已封印</>
                        : <><Sparkles className="w-5 h-5" /> 揮舞魔杖 · 複製咒語</>
                      }
                    </button>
                  </div>
                </div>
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

      {/* ── PORTAL MODAL (AI selector) ── */}
      {showPortal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" style={{ background: 'rgba(42,39,35,0.85)' }}>
          <div
            className="max-w-sm w-full text-center p-8"
            style={{ border: '4px solid var(--ink)', boxShadow: 'var(--shadow-hover)', background: 'var(--parchment)' }}
          >
            <h3
              className="text-xl mb-6"
              style={{ fontFamily: 'var(--font-rye)', color: 'var(--ink)' }}
            >
              選擇傳送座標
            </h3>
            <div className="space-y-3">
              {[
                { label: 'ChatGPT', sub: 'OPENAI', icon: <Bot className="w-5 h-5" />, color: '#2D6A4F', web: "https://chatgpt.com", scheme: "chatgpt://" },
                { label: 'Claude', sub: 'ANTHROPIC', icon: <Brain className="w-5 h-5" />, color: '#D4692C', web: "https://claude.ai", scheme: "claude://" },
                { label: 'Gemini', sub: 'GOOGLE', icon: <Sparkles className="w-5 h-5" />, color: '#1A5C5A', web: "https://gemini.google.com/app", scheme: null },
                { label: 'Grok', sub: 'XAI', icon: <MessageSquare className="w-5 h-5" />, color: '#2A2723', web: "https://grok.com", scheme: null },
                { label: 'DeepSeek', sub: 'DEEPSEEK', icon: <div className="w-5 h-5 flex items-center justify-center text-[9px] font-black text-white" style={{ background: '#1a5fcc' }}>DS</div>, color: '#1a5fcc', web: "https://chat.deepseek.com", scheme: "deepseek://" },
              ].map(({ label, sub, icon, color, web, scheme }) => (
                <button
                  key={label}
                  onClick={() => scheme ? handleDeepLink(web, scheme) : window.open(web, '_blank')}
                  className="w-full p-4 flex items-center gap-4 transition-all active:translate-x-1 active:translate-y-1"
                  style={{
                    border: '3px solid var(--ink)',
                    boxShadow: '4px 4px 0px var(--ink)',
                    background: 'var(--parchment)',
                    color: 'var(--ink)',
                    textAlign: 'left',
                  }}
                >
                  <div className="p-2" style={{ background: color, color: '#fff', border: '2px solid var(--ink)' }}>
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-black text-sm" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>{label}</h4>
                    <p className="text-[10px] font-black uppercase" style={{ fontFamily: 'var(--font-chivo)', color, opacity: 0.8 }}>{sub}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPortal(false)}
              className="mt-6 text-xs font-black uppercase"
              style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.4 }}
            >
              [ 留在學院 ]
            </button>
          </div>
        </div>
      )}

      {/* ── AUTH MODAL ── */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(42,39,35,0.85)' }}>
          <div
            className="max-w-sm w-full text-center p-8"
            style={{ border: '4px solid var(--ink)', boxShadow: 'var(--shadow-hover)', background: 'var(--parchment)' }}
          >
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ border: '4px solid var(--ink)', background: 'var(--mustard)', boxShadow: 'var(--shadow-sm)' }}>
              <Lock className="w-6 h-6" style={{ color: 'var(--ink)' }} />
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-rye)', color: 'var(--ink)' }}>解鎖高級咒語</h3>
            <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.65 }}>此咒語需要學院認證才能使用</p>
            <button
              onClick={() => { setIsLoggedIn(true); setShowAuthModal(false); }}
              className="w-full py-3 font-black uppercase transition-all active:translate-x-1 active:translate-y-1 mb-3"
              style={{
                fontFamily: 'var(--font-chivo)',
                border: '3px solid var(--ink)',
                boxShadow: 'var(--shadow-sm)',
                background: 'var(--mustard)',
                color: 'var(--ink)',
              }}
            >
              快速認證（展示通道）
            </button>
            <button
              onClick={() => setShowAuthModal(false)}
              className="text-sm font-bold"
              style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.4 }}
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
