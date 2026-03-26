"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles, Copy, ExternalLink, ChevronDown, X, Search, Check,
  Brain, Bot, MessageSquare, Lock, Share2, AlertTriangle, ArrowRight, BookOpen,
  ArrowLeft, RefreshCw, Zap
} from "lucide-react";
import { CURSES, TIER_CONFIG, CAST_LEVELS, getSpellCode } from "./curses_data";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import SpellCard from "./SpellCard";

// Helper: Terminal-style spell preview with structured formatting
const HIDDEN_MARKER = "（由 AI 根據情境自動填充）";

const TerminalPrompt = ({ text }: { text: string }) => {
  // Split text into lines, then parse each line for structure
  const lines = text.split('\n');
  let ruleCounter = 0;
  // Track consecutive hidden lines to show a single lock hint
  let hiddenGroupShown = false;

  return (
    <div style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'rgba(244,238,216,0.85)' }}>
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lineIdx} className="h-3" />;

        // Check if this line contains a locked parameter
        const isHiddenParam = trimmed.includes(HIDDEN_MARKER);

        // Section headers like 【任務】【規則】【角色】etc.
        const sectionMatch = trimmed.match(/^【(.+?)】/);
        if (sectionMatch && trimmed === `【${sectionMatch[1]}】`) {
          ruleCounter = 0;
          hiddenGroupShown = false;
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
          if (isHiddenParam) {
            if (!hiddenGroupShown) {
              hiddenGroupShown = true;
              return (
                <div key={lineIdx} className="my-3 py-3 px-4 text-center" style={{ border: '1px dashed rgba(232,168,56,0.4)', background: 'rgba(232,168,56,0.05)' }}>
                  <span className="text-xs font-black tracking-wider" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--mustard)' }}>
                    🔒 提升詠唱等級以解鎖更多參數
                  </span>
                </div>
              );
            }
            return null;
          }
          hiddenGroupShown = false;
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

        // Regular text line with hidden param
        if (isHiddenParam) {
          if (!hiddenGroupShown) {
            hiddenGroupShown = true;
            return (
              <div key={lineIdx} className="my-3 py-3 px-4 text-center" style={{ border: '1px dashed rgba(232,168,56,0.4)', background: 'rgba(232,168,56,0.05)' }}>
                <span className="text-xs font-black tracking-wider" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--mustard)' }}>
                  🔒 提升詠唱等級以解鎖更多參數
                </span>
              </div>
            );
          }
          return null;
        }

        hiddenGroupShown = false;
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

// Testimonials data
export default function MagicAcademyMVP() {
  const [selectedCurse, setSelectedCurse] = useState<any>(null);
  const [inputs, setInputs] = useState<any>({});
  const [castLevel, setCastLevel] = useState<"quick" | "standard" | "full">("quick");
  const [mp, setMp] = useState(() => {
    // TODO: 測試模式 — 魔力值滿，正式上線時還原
    return 30;
  });
  const [collectedCards, setCollectedCards] = useState<string[]>([]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('magic-collection');
      if (saved) setCollectedCards(JSON.parse(saved));
    } catch { /* corrupted data, keep default */ }
  }, []);
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
  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({});
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [showSpellBook, setShowSpellBook] = useState(false);
  const [showSpellCard, setShowSpellCard] = useState(false);
  const [lastCastLevel, setLastCastLevel] = useState("standard");
  const [lastCastCurse, setLastCastCurse] = useState<any>(null);
  const [showSharePreview, setShowSharePreview] = useState(false);
  const [shareText, setShareText] = useState("");
  const [shareImageUrl, setShareImageUrl] = useState("");

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
    try { navigator.clipboard.writeText(text).catch(() => {}); } catch {}
    setIsTrialCopied(true);
    setShowBrewing(true);
    setTimeout(() => {
      setShowBrewing(false);
      setIsTrialCopied(false);
      setShowPortal(true);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 6000);
    }, 2000);
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

  // 計算欄位可見性
  const getFieldVisibility = (totalFields: number, castLevelId: string) => {
    const cl = CAST_LEVELS.find(c => c.id === castLevelId);
    if (!cl) return 2;
    return Math.max(2, Math.ceil(totalFields * cl.fieldsRatio));
  };

  // 計算 MP 消耗
  const getMpCost = (curse: any, castLevelId: string) => {
    const cl = CAST_LEVELS.find(c => c.id === castLevelId);
    const tier = TIER_CONFIG[curse?.tier || 'apprentice'];
    if (!cl || !tier) return 1;
    return cl.mpBase * tier.mpMultiplier;
  };

  // 保存 MP 和收集到 localStorage
  const saveMp = (newMp: number) => {
    setMp(newMp);
    if (typeof window !== 'undefined') localStorage.setItem('magic-mp', String(newMp));
  };

  const saveCollection = (cards: string[]) => {
    setCollectedCards(cards);
    if (typeof window !== 'undefined') localStorage.setItem('magic-collection', JSON.stringify(cards));
  };

  const handleCardClick = (curse: any) => {
    setSelectedCurse(curse);
    setAgreedToRisk(false);
    setInputs({});
  };

  const brewAndCopy = () => {
    const cost = getMpCost(selectedCurse, castLevel);
    // TODO: 測試模式 — 跳過 MP 不足檢查和扣除，正式上線時還原
    // if (mp < cost) { alert(`魔力不足！需要 ${cost} MP，目前只有 ${mp} MP`); return; }
    const visibleCount = getFieldVisibility(selectedCurse.fields.length, castLevel);
    const autoInputs: any = {}; selectedCurse.fields.forEach((f: any, idx: number) => { const isVisible = idx < visibleCount; autoInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : HIDDEN_MARKER; }); const spell = selectedCurse.generate({ ...autoInputs, [selectedCurse.tweak?.id]: inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0] });
    // TODO: 測試模式 — 暫停扣除 MP，正式上線時還原
    // saveMp(mp - cost);
    // 全力詠唱解鎖卡片
    if (castLevel === 'full' && !collectedCards.includes(selectedCurse.id)) {
      saveCollection([...collectedCards, selectedCurse.id]);
    }
    const cleanSpell = spell.replace(/\[\[/g, '').replace(/\]\]/g, '');
    // Filter out lines with hidden params so copied spell only contains visible params
    const visibleSpell = cleanSpell.split('\n').filter((l: string) => !l.includes(HIDDEN_MARKER)).join('\n');
    setLastCastLevel(castLevel);
    setLastCastCurse(selectedCurse);
    // Try clipboard, but don't block the flow if it fails
    try { navigator.clipboard.writeText(visibleSpell).catch(() => {}); } catch {}
    setShowBrewing(true);
    setTimeout(() => {
      setShowBrewing(false);
      setIsCopied(true);
      setShowPortal(true);
      setShowCopyToast(true);
      setTimeout(() => setIsCopied(false), 3000);
      setTimeout(() => setShowCopyToast(false), 6000);
    }, 2000);
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
    const text = `我在【AI 魔法學院】解鎖了「${selectedCurse.title.replace(/\|/g, '')}」禁忌咒語。這不是普通的提示詞，這是物理級的生存武裝。進來領取你的法典：`;
    if (navigator.share) {
      navigator.share({ title: 'AI 魔法學院', text, url }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert("已複製專屬魔法分享連結！快去社群擴散吧。");
    }
  };

  const handleDeepLink = (webUrl: string, appScheme: string) => {
    setShowPortal(false);

    // Try custom URL scheme to open app, fallback to web if app not installed
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

  return (
    <div className="min-h-screen w-full parchment-bg" style={{ color: 'var(--ink)' }}>

      {/* ── FIXED NAVIGATION BAR ── */}
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
      </div>

      {/* ── MAIN LIBRARY ── */}
      <main className="w-full max-w-7xl mx-auto relative z-10 pb-24 px-0">
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
                  {(expandedTabs[tab] || searchQuery ? tabCurses : tabCurses.slice(0, 3)).map((curse: any, idx: number) => {
                    const tabColor = getTabColor(curse.tab);
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
                        {/* Category tag + tier badge + icon */}
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <div className="flex items-center gap-1.5">
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
                  {!expandedTabs[tab] && !searchQuery && tabCurses.length > 3 && (
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

      {/* ── PORTAL MODAL (Spell Card + AI selector merged) ── */}
      {showPortal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" style={{ background: 'rgba(42,39,35,0.88)', overflowY: 'auto' }}>
          <div className="max-w-sm w-full my-8">

            {/* ── SPELL CARD (top half) ── */}
            {lastCastCurse && (() => {
              const tc = TIER_CONFIG[lastCastCurse.tier];
              const ci = CAST_LEVELS.find((c: any) => c.id === lastCastLevel);
              const code = getSpellCode(lastCastCurse);
              const tierBg: Record<string, string> = { apprentice: "#6B7280", adept: "#2563EB", master: "#7C3AED", archmage: "#DC2626", forbidden: "#B8860B" };
              return (
                <div className="mb-4" id="spell-card-capture" style={{ border: '4px solid var(--ink)', boxShadow: 'var(--shadow)', background: 'var(--parchment)', position: 'relative', overflow: 'hidden' }}>
                  <div className="halftone-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />
                  <div style={{ height: 6, background: tierBg[lastCastCurse.tier] || '#6B7280' }} />
                  <div style={{ padding: '20px 24px 16px', position: 'relative' }}>
                    {/* Code + Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontFamily: 'var(--font-chivo)', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(42,39,35,0.35)' }}>{code}</span>
                      <span style={{ background: tierBg[lastCastCurse.tier], color: '#fff', fontSize: 10, fontWeight: 900, fontFamily: 'var(--font-noto-serif-tc)', padding: '2px 10px' }}>{tc.label}級</span>
                    </div>
                    {/* Title */}
                    <h3 style={{ fontFamily: 'var(--font-noto-serif-tc)', fontSize: 22, fontWeight: 900, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 8 }}>{lastCastCurse.title}</h3>
                    <div style={{ height: 2, background: 'var(--ink)', marginBottom: 10 }} />
                    {/* Cast info + tags */}
                    <div className="flex items-center justify-between mb-3">
                      <span style={{ fontFamily: 'var(--font-chivo)', fontSize: 11, fontWeight: 700, color: 'var(--teal)', border: '2px solid var(--teal)', padding: '1px 8px' }}>⚡ {ci?.label || '標準詠唱'}</span>
                      <div className="flex gap-1">
                        {lastCastCurse.tags?.slice(0, 3).map((tag: string) => (
                          <span key={tag} style={{ fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-chivo)', color: 'var(--ink)', background: 'rgba(232,168,56,0.2)', border: '1.5px solid rgba(232,168,56,0.5)', padding: '1px 6px' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Bottom brand bar */}
                  <div style={{ background: 'var(--ink)', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-rye, var(--font-display))', fontSize: 11, color: 'var(--mustard)', fontWeight: 700 }}>AI 魔法學院</span>
                    <span style={{ fontFamily: 'var(--font-chivo)', fontSize: 8, color: 'rgba(244,238,216,0.35)', letterSpacing: '0.1em' }}>ai-magic-academy.vercel.app</span>
                  </div>
                </div>
              );
            })()}

            {/* ── Share buttons ── */}
            {lastCastCurse && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={async () => {
                    const el = document.getElementById('spell-card-capture');
                    if (!el) return;
                    const html2canvas = (await import('html2canvas')).default;
                    const canvas = await html2canvas(el, { scale: 2, backgroundColor: null, useCORS: true });
                    const link = document.createElement('a');
                    link.download = `spell-${lastCastCurse.id}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                  style={{ background: 'var(--mustard)', color: 'var(--ink)', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
                >
                  📸 下載卡片
                </button>
                <button
                  onClick={async () => {
                    const el = document.getElementById('spell-card-capture');
                    if (!el) return;
                    const html2canvas = (await import('html2canvas')).default;
                    const canvas = await html2canvas(el, { scale: 2, backgroundColor: null, useCORS: true });
                    setShareImageUrl(canvas.toDataURL('image/png'));
                    const tc = TIER_CONFIG[lastCastCurse.tier];
                    setShareText(`剛在 AI 魔法學院施放了${tc.label}級咒語【${lastCastCurse.title}】⚡ 30 秒搞定原本要想 10 分鐘的事。\n\n你也來試試 → ai-magic-academy.vercel.app`);
                    setShowSharePreview(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                  style={{ background: 'var(--teal)', color: 'var(--parchment)', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
                >
                  ✦ 分享到社群
                </button>
              </div>
            )}

            {/* ── AI Platform selector (horizontal icons) ── */}
            <div
              className="text-center p-5"
              style={{ border: '4px solid var(--ink)', boxShadow: 'var(--shadow)', background: 'var(--parchment)' }}
            >
              <h3
                className="text-base mb-1"
                style={{ fontFamily: 'var(--font-rye)', color: 'var(--ink)' }}
              >
                選擇傳送座標
              </h3>
              <p className="text-[10px] mb-4" style={{ color: 'rgba(42,39,35,0.45)', fontFamily: 'var(--font-noto-sans-tc)' }}>
                咒語已複製，選擇 AI 平台貼上即可施法
              </p>
              <div className="flex justify-center gap-3">
                {[
                  { label: 'ChatGPT', icon: <Bot className="w-5 h-5" />, color: '#2D6A4F', web: "https://chatgpt.com", scheme: "chatgpt://" },
                  { label: 'Claude', icon: <Brain className="w-5 h-5" />, color: '#D4692C', web: "https://claude.ai", scheme: "claude://" },
                  { label: 'Gemini', icon: <Sparkles className="w-5 h-5" />, color: '#1A5C5A', web: "https://gemini.google.com/app", scheme: null },
                  { label: 'Grok', icon: <MessageSquare className="w-5 h-5" />, color: '#2A2723', web: "https://grok.com", scheme: null },
                  { label: 'DS', icon: <div className="w-5 h-5 flex items-center justify-center text-[9px] font-black text-white">DS</div>, color: '#1a5fcc', web: "https://chat.deepseek.com", scheme: "deepseek://" },
                ].map(({ label, icon, color, web, scheme }) => (
                  <button
                    key={label}
                    onClick={() => { if (scheme) { handleDeepLink(web, scheme); } else { setShowPortal(false); window.open(web, '_blank'); } }}
                    className="flex flex-col items-center gap-1 transition-all active:scale-95"
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center"
                      style={{ background: color, color: '#fff', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)' }}
                    >
                      {icon}
                    </div>
                    <span className="text-[9px] font-black" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>{label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowPortal(false)}
                className="mt-4 text-[10px] font-black uppercase"
                style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.3 }}
              >
                [ 留在學院 ]
              </button>
            </div>

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

      {/* ── SHARE PREVIEW MODAL ── */}
      {showSharePreview && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" style={{ background: 'rgba(42,39,35,0.92)' }}>
          <div className="max-w-sm w-full" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            {/* Preview header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black" style={{ color: 'var(--mustard)', fontFamily: 'var(--font-noto-serif-tc)' }}>
                分享預覽
              </h3>
              <button onClick={() => setShowSharePreview(false)}>
                <X className="w-5 h-5" style={{ color: 'rgba(244,238,216,0.5)' }} />
              </button>
            </div>

            {/* Card image preview */}
            {shareImageUrl && (
              <div className="mb-3" style={{ border: '3px solid var(--ink)', boxShadow: 'var(--shadow-sm)' }}>
                <img src={shareImageUrl} alt="施法紀錄" className="w-full block" />
              </div>
            )}

            {/* Editable text */}
            <div className="mb-3">
              <label className="block text-[10px] font-bold mb-1" style={{ color: 'rgba(244,238,216,0.4)', fontFamily: 'var(--font-chivo)', letterSpacing: '0.1em' }}>
                貼文內容（可編輯）
              </label>
              <textarea
                value={shareText}
                onChange={(e) => setShareText(e.target.value)}
                rows={4}
                className="w-full p-3 text-sm resize-none"
                style={{
                  background: 'var(--parchment)',
                  color: 'var(--ink)',
                  border: '3px solid var(--ink)',
                  boxShadow: '3px 3px 0px var(--ink)',
                  fontFamily: 'var(--font-noto-sans-tc)',
                  outline: 'none',
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Platform buttons */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {/* Threads */}
              <button
                onClick={() => {
                  const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText)}`;
                  window.open(url, '_blank');
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{ background: '#000', color: '#fff', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
              >
                ◎ Threads
              </button>

              {/* LINE */}
              <button
                onClick={() => {
                  const url = `https://line.me/R/share?text=${encodeURIComponent(shareText + '\nhttps://ai-magic-academy.vercel.app')}`;
                  window.open(url, '_blank');
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{ background: '#06C755', color: '#fff', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
              >
                💬 LINE
              </button>

              {/* Copy text + image */}
              <button
                onClick={async () => {
                  try { await navigator.clipboard.writeText(shareText); } catch {}
                  alert('文案已複製！再搭配下載的卡片圖一起發佈效果更好');
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{ background: 'var(--mustard)', color: 'var(--ink)', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
              >
                📋 複製文案
              </button>

              {/* Download image */}
              <button
                onClick={() => {
                  if (!shareImageUrl) return;
                  const link = document.createElement('a');
                  link.download = `spell-${lastCastCurse?.id || 'card'}.png`;
                  link.href = shareImageUrl;
                  link.click();
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{ background: 'var(--parchment)', color: 'var(--ink)', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
              >
                📸 下載圖片
              </button>
            </div>

            {/* Native share (mobile) */}
            <button
              onClick={async () => {
                try {
                  const res = await fetch(shareImageUrl);
                  const blob = await res.blob();
                  const file = new File([blob], 'spell.png', { type: 'image/png' });
                  const data = { title: 'AI 魔法學院', text: shareText, url: 'https://ai-magic-academy.vercel.app', files: [file] };
                  if (navigator.share && navigator.canShare && navigator.canShare(data)) {
                    await navigator.share(data);
                  } else {
                    try { await navigator.clipboard.writeText(shareText); } catch {}
                    alert('文案已複製！');
                  }
                } catch {
                  try { await navigator.clipboard.writeText(shareText); } catch {}
                  alert('文案已複製！');
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
              style={{ background: 'var(--teal)', color: 'var(--parchment)', border: '3px solid var(--ink)', boxShadow: '4px 4px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
            >
              ✦ 使用手機分享
            </button>

            <button
              onClick={() => setShowSharePreview(false)}
              className="w-full mt-3 text-[10px] font-black uppercase text-center"
              style={{ fontFamily: 'var(--font-chivo)', color: 'rgba(244,238,216,0.3)' }}
            >
              [ 返回 ]
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
            <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-rye)', color: 'var(--ink)' }}>購買魔力水晶</h3>
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

      {/* ── MAGIC BOOK MODAL ── */}
      <AnimatePresence>
        {showSpellBook && (
          <div className="fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60"
              onClick={() => setShowSpellBook(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative w-full max-w-3xl mx-4 my-8 z-10"
              style={{ background: 'var(--parchment)', border: '4px solid var(--ink)', boxShadow: '8px 8px 0 var(--ink)' }}
            >
              {/* Book header */}
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '4px solid var(--ink)', background: 'var(--ink)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📖</span>
                  <h2 className="text-xl font-black tracking-wider" style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--mustard)' }}>
                    魔法書
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--parchment)', opacity: 0.6 }}>
                    {collectedCards.length} / {CURSES.length} 已收集
                  </span>
                  <button onClick={() => setShowSpellBook(false)} className="text-xl" style={{ color: 'var(--parchment)', opacity: 0.6 }}>✕</button>
                </div>
              </div>

              {/* Collection progress bar */}
              <div className="px-6 py-3" style={{ borderBottom: '2px solid var(--ink)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.5 }}>收集進度</span>
                  <div className="flex-1 h-3 relative" style={{ border: '2px solid var(--ink)', background: 'rgba(0,0,0,0.05)' }}>
                    <div className="absolute top-0 left-0 h-full transition-all duration-700"
                      style={{ width: `${(collectedCards.length / CURSES.length) * 100}%`, background: 'var(--teal)' }} />
                  </div>
                  <span className="text-[10px] font-black" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--teal)' }}>
                    {Math.round((collectedCards.length / CURSES.length) * 100)}%
                  </span>
                </div>
              </div>

              {/* Card grid — grouped by tier */}
              <div className="p-6">
                {(['apprentice', 'adept', 'master', 'archmage', 'forbidden'] as const).map(tierKey => {
                  const tierCurses = CURSES.filter(c => c.tier === tierKey);
                  if (tierCurses.length === 0) return null;
                  const tier = TIER_CONFIG[tierKey];
                  return (
                    <div key={tierKey} className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black px-2 py-0.5 tracking-wider"
                          style={{
                            fontFamily: 'var(--font-chivo)',
                            color: tierKey === 'forbidden' ? '#D4AF37' : tier.color,
                            border: `2px solid ${tierKey === 'forbidden' ? '#D4AF37' : tier.color}`,
                            background: tierKey === 'forbidden' ? '#1F2937' : 'transparent',
                          }}>
                          {tier.label}
                        </span>
                        <span className="text-[10px]" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.4 }}>
                          {tierCurses.filter(c => collectedCards.includes(c.id)).length}/{tierCurses.length}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {tierCurses.map(curse => {
                          const collected = collectedCards.includes(curse.id);
                          return (
                            <div
                              key={curse.id}
                              className="relative p-3 flex flex-col gap-1.5 transition-all"
                              style={{
                                border: `3px solid ${collected ? tier.borderColor : 'rgba(0,0,0,0.1)'}`,
                                background: collected ? tier.bgGlow : 'rgba(0,0,0,0.03)',
                                boxShadow: collected ? `3px 3px 0 ${tier.borderColor}` : 'none',
                                opacity: collected ? 1 : 0.5,
                                filter: collected ? 'none' : 'grayscale(1)',
                              }}
                            >
                              {/* Spell code */}
                              <span className="text-[8px] font-black tracking-wider"
                                style={{ fontFamily: 'var(--font-chivo)', color: tier.color, opacity: collected ? 0.6 : 0.3 }}>
                                {getSpellCode(curse)}
                              </span>

                              {/* Icon + Title */}
                              <div className="flex items-center gap-2">
                                {collected ? (
                                  <span className="text-lg">{curse.icon}</span>
                                ) : (
                                  <span className="text-lg opacity-30">❓</span>
                                )}
                                <span className="text-xs font-black leading-tight"
                                  style={{ fontFamily: 'var(--font-noto-sans-tc)', color: collected ? 'var(--ink)' : 'rgba(0,0,0,0.3)' }}>
                                  {collected ? curse.title.split('：')[0] : '？？？'}
                                </span>
                              </div>

                              {/* Collected badge */}
                              {collected && (
                                <span className="absolute top-1.5 right-1.5 text-[8px] font-black px-1.5 py-0.5"
                                  style={{ background: 'var(--teal)', color: 'var(--parchment)', fontFamily: 'var(--font-chivo)' }}>
                                  ✓
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Collection milestone rewards */}
                <div className="mt-6 pt-4" style={{ borderTop: '2px dashed var(--ink)', opacity: 0.6 }}>
                  <span className="text-[10px] font-black uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                    🏆 收集獎勵
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {[
                      { need: 3, reward: '5 MP', title: '見習法師', emoji: '🧙‍♂️' },
                      { need: 5, reward: '15 MP', title: '中階術士', emoji: '🔮' },
                      { need: 8, reward: '30 MP', title: '高階巫師', emoji: '⚡' },
                      { need: 15, reward: '50 MP', title: '大魔導師', emoji: '👑' },
                    ].map(m => (
                      <div key={m.need} className="flex items-center gap-2 text-[10px] py-1.5 px-2"
                        style={{
                          fontFamily: 'var(--font-chivo)',
                          background: collectedCards.length >= m.need ? 'rgba(26,92,90,0.1)' : 'transparent',
                          border: `1px solid ${collectedCards.length >= m.need ? 'var(--teal)' : 'rgba(0,0,0,0.1)'}`,
                        }}>
                        <span>{m.emoji}</span>
                        <span className="font-black" style={{ color: collectedCards.length >= m.need ? 'var(--teal)' : 'var(--ink)', opacity: collectedCards.length >= m.need ? 1 : 0.4 }}>
                          {m.title}
                        </span>
                        <span style={{ opacity: 0.5 }}>— 收集 {m.need} 張 → +{m.reward}</span>
                        {collectedCards.length >= m.need && <span style={{ color: 'var(--teal)' }}>✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Copy Toast */}
      {showCopyToast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 500,
            background: 'var(--ink)',
            color: 'var(--parchment)',
            border: '3px solid var(--dark-red)',
            boxShadow: '4px 4px 0 var(--dark-red)',
            padding: '14px 24px',
            fontFamily: 'var(--font-chivo)',
            fontWeight: 700,
            fontSize: '15px',
            textAlign: 'center' as const,
            maxWidth: 360,
            width: '90vw',
            animation: 'toastSlideUp 0.4s ease-out',
          }}
        >
          <span style={{ marginRight: 8 }}>📋</span>
          咒語已複製！開啟 AI 對話框，<span style={{ color: 'var(--mustard)' }}>貼上即可施法</span>
        </div>
      )}

      <style jsx>{`
        @keyframes toastSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(30px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
