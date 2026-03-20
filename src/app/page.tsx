"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles, Copy, ExternalLink, ChevronDown, X, Search, Check,
  Brain, Bot, MessageSquare, Lock, Share2, AlertTriangle, ArrowRight, BookOpen,
  ArrowLeft, RefreshCw, Zap
} from "lucide-react";
import { CURSES } from "./curses_data";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";

// Helper: Highlight variables in the spell preview (parchment style)
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

// Helper: Terminal-style spell preview with structured formatting
const TerminalPrompt = ({ text }: { text: string }) => {
  // Split text into lines, then parse each line for structure
  const lines = text.split('\n');
  let ruleCounter = 0;

  return (
    <div style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'rgba(244,238,216,0.85)' }}>
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lineIdx} className="h-3" />;

        // Section headers like 【任務】【規則】【角色】etc.
        const sectionMatch = trimmed.match(/^【(.+?)】/);
        if (sectionMatch && trimmed === `【${sectionMatch[1]}】`) {
          ruleCounter = 0;
          return (
            <div key={lineIdx} className="mt-5 mb-3 first:mt-0">
              <span className="inline-block text-sm font-black px-3 py-1"
                style={{ background: 'var(--mustard)', border: '2px solid rgba(232,168,56,0.6)', color: 'var(--ink)', fontFamily: 'var(--font-noto-serif-tc)' }}>
                【{sectionMatch[1]}】
              </span>
            </div>
          );
        }

        // Numbered rules: lines starting with number + dot or dash
        const numberedMatch = trimmed.match(/^(\d+)[.、．]\s*(.*)/);
        const dashMatchResult = !numberedMatch ? trimmed.match(/^[-–—]\s*(.*)/) : null;

        if (numberedMatch || dashMatchResult) {
          ruleCounter++;
          const content = numberedMatch ? numberedMatch[2] : (dashMatchResult ? dashMatchResult[1] : '');
          return (
            <div key={lineIdx} className="flex gap-3 mb-3 text-sm leading-relaxed">
              <span className="flex-shrink-0 font-black text-base"
                style={{ color: 'var(--dark-red)', fontFamily: 'var(--font-chivo)', minWidth: '32px' }}>
                {String(ruleCounter).padStart(2, '0')}.
              </span>
              <span>{renderTerminalVariables(content)}</span>
            </div>
          );
        }

        // Regular text line
        return (
          <div key={lineIdx} className="text-sm leading-relaxed mb-2">
            {renderTerminalVariables(trimmed)}
          </div>
        );
      })}
    </div>
  );
};

// Highlight [[variables]] in terminal style
const renderTerminalVariables = (text: string) => {
  const parts = text.split(/(\[\[.*?\]\])/g);
  return parts.map((part, i) => {
    if (part.startsWith('[[') && part.endsWith(']]')) {
      return (
        <span key={i} className="font-bold px-1"
          style={{ color: '#E8A838', background: 'rgba(232,168,56,0.15)', border: '1px solid rgba(232,168,56,0.3)' }}>
          [{part.slice(2, -2)}]
        </span>
      );
    }
    // Also highlight inline 【section】 headers within text
    const sectionParts = part.split(/(【.+?】)/g);
    if (sectionParts.length > 1) {
      return sectionParts.map((sp, j) => {
        if (sp.startsWith('【') && sp.endsWith('】')) {
          return (
            <span key={`${i}-${j}`} className="inline-block text-sm font-black px-2 py-0.5 mx-1"
              style={{ background: 'var(--mustard)', border: '2px solid rgba(232,168,56,0.6)', color: 'var(--ink)', fontFamily: 'var(--font-noto-serif-tc)' }}>
              {sp}
            </span>
          );
        }
        return <span key={`${i}-${j}`}>{sp}</span>;
      });
    }
    return <span key={i}>{part}</span>;
  });
};

export default function MagicAcademyMVP() {
  const [selectedCurse, setSelectedCurse] = useState<any>(null);
  const [inputs, setInputs] = useState<any>({});
  const [spellLevel, setSpellLevel] = useState<"初級" | "中級" | "高級">("初級");
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
  const [showBrewing, setShowBrewing] = useState(false);

  const TRIAL_DATA = [
    {
      emoji: "😤", label: "被老闆凹加班",
      prompt: `請幫我撰寫一段婉拒加班的訊息。

情境：主管臨時在下班前要求你留下來加班，但你今晚有不可取消的私人安排。

語氣需要：
1. 第一句話先展現你有掌握專案進度（不是在逃避）
2. 說明今晚有已確認的個人安排，無法更動
3. 主動提出替代方案（例如明早優先處理、或遠端支援關鍵部分）
4. 全程語氣穩定，不道歉、不解釋過多、不討好

字數在 80 字以內，繁體中文，可直接複製貼到 LINE。`
    },
    {
      emoji: "😶", label: "被已讀不回",
      prompt: `我傳了一則訊息給在意的人，結果被已讀不回超過 24 小時。

請幫我生成 3 則後續訊息，分別是：
① 若無其事型：聊一個完全不同的話題，自然重啟對話
② 價值展示型：不追問，改分享一則讓對方「想回」的內容
③ 輕鬆試探型：用一句帶點幽默的話直接點破，不卑不亢

規則：
1. 每則不超過 20 字——已讀不回的場景下，訊息越長越像在卑微
2. 禁止出現：「你是不是很忙？」「我是不是打擾你了？」
3. 潛台詞必須是「我的生活很好，你的回覆是加分不是必需」
4. 每則附上最佳傳送時間建議

繁體中文。`
    },
    {
      emoji: "🥲", label: "被親戚問到崩潰",
      prompt: `過年回家，親戚一定會問我「怎麼還沒交男/女朋友？」

請幫我準備 3 種不同風格的擋招話術：
① 太極推手型：笑著把問題推回去，四兩撥千斤（15字內）
② 荒謬核彈型：回答荒謬到讓全桌笑出來、對方不好意思追問（15字內）
③ 溫柔封印型：用一句讓長輩感動的話直接封住話題（15字內）

規則：
1. 說完不能讓場面冷掉，要讓氣氛維持歡樂或溫馨
2. 禁止「反攻」其他親戚（不能說「那表哥呢？」會製造新敵人）
3. 額外給我一句「緊急撤退藉口」——當話題失控時可以自然離開座位

繁體中文，口語化，能直接背起來用。`
    },
    {
      emoji: "⭐️", label: "幫我寫負評",
      prompt: `我剛在一家餐廳有了極差的用餐體驗。

請幫我寫一則 Google Maps 一星評論。

風格：米其林美食評論家式毒舌——優雅到不行，但每個字都是刀。

規則：
1. 全文 150 字以內，禁止任何髒話或人身攻擊
2. 必須包含至少 2 個「畫面感比喻」（例：「這道菜讓我重新理解了塑膠的可能性」）
3. 如果有任何優點，先真心稱讚，再用反差讓殺傷力加倍
4. 結尾必須有一句「金句」——讓人看完想截圖分享的程度
5. 讓讀者覺得你很有才華，同時完全不想踏進這家店

繁體中文。`
    }
  ];

  const handleTrialCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsTrialCopied(true);
      setShowBrewing(true);
      setTimeout(() => {
        setShowBrewing(false);
        setIsTrialCopied(false);
        setShowPortal(true);
      }, 2000);
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

  // Prevent body scroll when modal is open (iOS-safe)
  useEffect(() => {
    if (selectedCurse) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [selectedCurse]);

  const TABS = ["職場求生", "校園生存", "人際擋箭", "日常雜症", "創業/斜槓"];

  const getTabColor = (tab: string) => {
    const map: Record<string, string> = {
      '職場求生': '#1A5C5A',
      '校園生存': '#2D6A4F',
      '人際擋箭': '#8B2626',
      '日常雜症': '#B8860B',
      '創業/斜槓': '#4A3580',
    };
    return map[tab] || '#1A5C5A';
  };

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
    const reversed = [...filteredCurses].reverse();
    TABS.forEach(tab => {
      groups[tab] = reversed.filter(c => c.tab === tab);
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

  const brewAndCopy = () => {
    const autoInputs: any = {}; selectedCurse.fields.forEach((f: any, idx: number) => { const isVisible = spellLevel === "高級" || (spellLevel === "初級" && idx < 2) || (spellLevel === "中級" && idx < 3); autoInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : "（由 AI 根據情境自動填充）"; }); const spell = selectedCurse.generate({ ...autoInputs, [selectedCurse.tweak?.id]: inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0] });
    const cleanSpell = spell.replace(/\[\[/g, '').replace(/\]\]/g, '');
    navigator.clipboard.writeText(cleanSpell).then(() => {
      setShowBrewing(true);
      setTimeout(() => {
        setShowBrewing(false);
        setIsCopied(true);
        setShowPortal(true);
        setTimeout(() => setIsCopied(false), 3000);
      }, 2000);
    });
  };

  const handleCopy = () => {
    if (!agreedToRisk) {
      setShowRiskScroll(true);
      return;
    }
    brewAndCopy();
  };

  const handleRiskAcceptAndCopy = () => {
    setAgreedToRisk(true);
    setShowRiskScroll(false);
    brewAndCopy();
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
    setShowPortal(false);

    // For schemes that are actually https universal links (like Gemini),
    // just open them directly — iOS/Android will intercept and open the app
    if (appScheme.startsWith('https://')) {
      window.open(appScheme, '_blank');
      return;
    }

    // For custom URL schemes (chatgpt://, claude://, etc.)
    // Use window.location.href to trigger app — iframe doesn't work on iOS
    let didLeave = false;
    const onVisibility = () => { if (document.hidden) didLeave = true; };
    document.addEventListener("visibilitychange", onVisibility);

    window.location.href = appScheme;

    // After 2s: if app didn't open (user still here), fallback to web
    setTimeout(() => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (!didLeave && !document.hidden && document.hasFocus()) {
        window.open(webUrl, '_blank');
      }
    }, 2000);
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

      {/* ── HEADER / MASTHEAD — Classic Ticket ── */}
      <header className="w-full relative z-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8">

          {/* Top meta info bar */}
          <div className="flex justify-between text-xs tracking-[0.2em] uppercase font-bold pt-8 pb-3 mb-12 md:mb-16"
            style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.45, borderBottom: '2px solid var(--ink)' }}>
            <span>VOL. I — 現代魔法法典</span>
            <span>EST. 2026</span>
          </div>

          {/* Main title — Classic Ticket */}
          <div className="text-center mb-10 md:mb-12">
            {/* Line 1: 麻瓜專用 with red decorative bars */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
              <div style={{ height: '2px', width: '48px', background: 'var(--dark-red)' }} />
              <h1
                className="text-4xl sm:text-5xl md:text-6xl tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-noto-serif-tc)', fontWeight: 300, color: 'var(--ink)' }}
              >
                麻瓜專用
              </h1>
              <div style={{ height: '2px', width: '48px', background: 'var(--dark-red)' }} />
            </div>

            {/* Line 2: 魔法外掛 on black strip with gold text */}
            <div className="inline-block shadow-md" style={{ background: 'var(--ink)', padding: '16px 48px' }}>
              <h1
                className="text-5xl sm:text-6xl md:text-8xl tracking-widest"
                style={{ fontFamily: 'var(--font-noto-serif-tc)', fontWeight: 900, color: 'var(--mustard)' }}
              >
                魔法外掛
              </h1>
            </div>
          </div>

          {/* Subtitle in dashed border box */}
          <div className="mb-16 md:mb-20" style={{ border: '2px dashed var(--ink)', padding: '24px', maxWidth: '640px', margin: '0 auto' }}>
            <p
              className="text-base md:text-lg leading-loose tracking-wider text-center"
              style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.75, margin: 0 }}
            >
              將複雜的「提示詞」封裝成一鍵釋放的魔法。應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。
            </p>
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

      {/* ── SEARCH + TAB NAV ── */}
      <div className="w-full max-w-5xl mx-auto px-4 mb-8 relative z-10">
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
      </div>

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

              {/* Horizontal card row (swipe left for more) */}
              <div className="relative">
                <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-20" style={{ background: 'linear-gradient(to left, var(--parchment), transparent)' }} />

                <div className="flex overflow-x-auto gap-5 px-4 pb-8 no-scrollbar snap-x snap-mandatory scroll-smooth tab-scroll-container">
                  {tabCurses.map((curse: any, idx: number) => {
                    const tabColor = getTabColor(curse.tab);
                    return (
                    <motion.button
                      key={curse.id}
                      onClick={() => handleCardClick(curse)}
                      className="flex-shrink-0 w-[260px] md:w-[300px] snap-start text-left p-0 flex flex-col relative overflow-hidden"
                      style={{
                        border: '4px solid var(--ink)',
                        boxShadow: 'var(--shadow)',
                        background: '#FEFAF0',
                        transition: 'box-shadow 0.12s ease, transform 0.12s ease',
                      }}
                    >
                      {/* Colored top stripe */}
                      <div style={{ height: '6px', background: tabColor }} />

                      {/* Card header area */}
                      <div className="p-5 pb-3 relative">
                        {/* Big background number */}
                        <span
                          className="absolute top-2 right-3 text-7xl font-black leading-none select-none pointer-events-none"
                          style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.06 }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>

                        {/* Category tag + icon */}
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <div
                            className="text-[10px] font-black px-2 py-1"
                            style={{ background: tabColor, fontFamily: 'var(--font-chivo)', color: '#FEFAF0' }}
                          >
                            {curse.tab}
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
                        <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.5 }}>
                          所需參數: {curse.fields?.length || 0}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-black" style={{ fontFamily: 'var(--font-noto-sans-tc)', color: tabColor }}>
                          詠唱 <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </motion.button>
                    );
                  })}

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

      {/* ── SPELL DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedCurse && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-6">
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
              className="w-full md:max-w-5xl relative z-10 flex flex-col md:flex-row"
              style={{
                border: '4px solid var(--ink)',
                boxShadow: '12px 12px 0px var(--ink)',
                background: 'var(--parchment)',
                maxHeight: '96vh',
                overflow: 'hidden',
              }}
            >
              {/* ── MOBILE LAYOUT: single scrollable page + floating CTA ── */}
              <div className="md:hidden flex flex-col" style={{ maxHeight: '96vh' }}>
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
                      {/* Level selector */}
                      <div className="mb-5">
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2"
                          style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                          魔力等級 MAGIC GRADE
                        </label>
                        <div className="flex gap-0" style={{ border: '3px solid var(--ink)' }}>
                          {['初級', '中級', '高級'].map((l, i) => (
                            <button key={l} type="button"
                              onClick={() => setSpellLevel(l as any)}
                              className="flex-1 px-3 py-2 text-xs font-black uppercase"
                              style={{
                                fontFamily: 'var(--font-chivo)',
                                background: spellLevel === l ? 'var(--mustard)' : 'transparent',
                                color: 'var(--ink)',
                                borderLeft: i > 0 ? '3px solid var(--ink)' : 'none',
                              }}>
                              {l}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Input fields */}
                      {selectedCurse.fields
                        .filter((_f: any, idx: number) =>
                          spellLevel === '高級' ||
                          (spellLevel === '初級' && idx < 2) ||
                          (spellLevel === '中級' && idx < 3)
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

                    {/* 大魔導師筆記 */}
                    {selectedCurse.theory && (
                      <div className="mt-4" style={{ border: '3px solid var(--ink)', background: 'rgba(26,92,90,0.06)' }}>
                        <div className="flex items-center gap-2 px-4 py-2"
                          style={{ background: 'var(--teal)', borderBottom: '3px solid var(--ink)' }}>
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
                          const isVisible = spellLevel === "高級" || (spellLevel === "初級" && idx < 2) || (spellLevel === "中級" && idx < 3);
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
                    {/* Level selector */}
                    <div className="mb-5">
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2"
                        style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                        魔力等級 MAGIC GRADE
                      </label>
                      <div className="flex gap-0" style={{ border: '3px solid var(--ink)' }}>
                        {['初級', '中級', '高級'].map((l, i) => (
                          <button key={l} type="button"
                            onClick={() => setSpellLevel(l as any)}
                            className="flex-1 px-3 py-2 text-xs font-black uppercase"
                            style={{
                              fontFamily: 'var(--font-chivo)',
                              background: spellLevel === l ? 'var(--mustard)' : 'transparent',
                              color: 'var(--ink)',
                              borderLeft: i > 0 ? '3px solid var(--ink)' : 'none',
                            }}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Input fields */}
                    {selectedCurse.fields
                      .filter((_f: any, idx: number) =>
                        spellLevel === '高級' ||
                        (spellLevel === '初級' && idx < 2) ||
                        (spellLevel === '中級' && idx < 3)
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

                  {/* 大魔導師筆記 — desktop */}
                  {selectedCurse.theory && (
                    <div className="mt-4" style={{ border: '3px solid var(--ink)', background: 'rgba(26,92,90,0.06)' }}>
                      <div className="flex items-center gap-2 px-4 py-2"
                        style={{ background: 'var(--teal)', borderBottom: '3px solid var(--ink)' }}>
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
                        const isVisible = spellLevel === "高級" || (spellLevel === "初級" && idx < 2) || (spellLevel === "中級" && idx < 3);
                        baseInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : "（由 AI 根據情境自動填充）";
                      });
                      const finalInputs = { ...baseInputs, [selectedCurse.tweak?.id]: (inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0]) };
                      const spell = selectedCurse.generate(finalInputs).replace(/\[\[/g, '').replace(/\]\]/g, '');
                      navigator.clipboard.writeText(spell);
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
                      const isVisible = spellLevel === "高級" || (spellLevel === "初級" && idx < 2) || (spellLevel === "中級" && idx < 3);
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
                { label: 'Gemini', sub: 'GOOGLE', icon: <Sparkles className="w-5 h-5" />, color: '#1A5C5A', web: "https://gemini.google.com/app", scheme: "https://gemini.google.com/app" },
                { label: 'Grok', sub: 'XAI', icon: <MessageSquare className="w-5 h-5" />, color: '#2A2723', web: "https://grok.com", scheme: "https://grok.com" },
                { label: 'DeepSeek', sub: 'DEEPSEEK', icon: <div className="w-5 h-5 flex items-center justify-center text-[9px] font-black text-white" style={{ background: '#1a5fcc' }}>DS</div>, color: '#1a5fcc', web: "https://chat.deepseek.com", scheme: "deepseek://" },
              ].map(({ label, sub, icon, color, web, scheme }) => (
                <button
                  key={label}
                  onClick={() => handleDeepLink(web, scheme)}
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
