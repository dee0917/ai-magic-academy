"use client";
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useSpellCollection } from "../hooks/useSpellCollection";
import { useMPSystem } from "../hooks/useMPSystem";
import { useQuestSystem, QuestCompletionEvent } from "../hooks/useQuestSystem";
import { SchoolType } from "../curses_data";
import { Quest } from "../lib/quests";
import {
  CURSES, CAST_LEVELS, TIER_CONFIG, TABS,
  HIDDEN_MARKER, getFieldVisibility, getMpCost,
} from "../lib/constants";
import Fuse from "fuse.js";

interface AcademyContextType {
  // Spell selection
  selectedCurse: any;
  setSelectedCurse: (curse: any) => void;
  inputs: any;
  setInputs: (inputs: any) => void;
  castLevel: "quick" | "standard" | "full";
  setCastLevel: (level: "quick" | "standard" | "full") => void;

  // MP
  mp: number;
  saveMp: (newMp: number) => void;
  mpBlocked: boolean;
  mpBlockMessage: string;

  // Collection
  collectedCards: string[];
  saveCollection: (cards: string[]) => void;

  // UI state
  isCopied: boolean;
  setIsCopied: (v: boolean) => void;
  showPortal: boolean;
  setShowPortal: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  agreedToRisk: boolean;
  setAgreedToRisk: (v: boolean) => void;
  activeTab: string;
  setActiveTab: (v: string) => void;
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  showRiskScroll: boolean;
  setShowRiskScroll: (v: boolean) => void;
  showTweakSheet: boolean;
  setShowTweakSheet: (v: boolean) => void;
  activeTrial: number;
  setActiveTrial: (v: number) => void;
  isTrialCopied: boolean;
  setIsTrialCopied: (v: boolean) => void;
  showBrewing: boolean;
  setShowBrewing: (v: boolean) => void;
  expandedTabs: Record<string, boolean>;
  setExpandedTabs: (v: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
  showCopyToast: boolean;
  setShowCopyToast: (v: boolean) => void;
  showSpellBook: boolean;
  setShowSpellBook: (v: boolean) => void;
  showFusion: boolean;
  setShowFusion: (v: boolean) => void;
  showSpellCard: boolean;
  setShowSpellCard: (v: boolean) => void;
  lastCastLevel: string;
  setLastCastLevel: (v: string) => void;
  lastCastCurse: any;
  setLastCastCurse: (v: any) => void;
  showSharePreview: boolean;
  setShowSharePreview: (v: boolean) => void;
  shareText: string;
  setShareText: (v: string) => void;
  shareImageUrl: string;
  setShareImageUrl: (v: string) => void;

  // School filter
  activeSchool: string;
  setActiveSchool: (v: string) => void;

  // Quest system
  completedQuests: string[];
  earnedTitles: string[];
  getSchoolProgress: (school: SchoolType) => { completed: number; total: number };
  getActiveQuests: () => Quest[];
  getRequirementStatus: (quest: Quest, collectedCards: string[]) => string;
  questToast: QuestCompletionEvent | null;

  // Derived data
  filteredCurses: any[];
  groupedCurses: { [key: string]: any[] };

  // Actions
  handleFusionComplete: (mainSchool: string, sacrificeSchool: string) => void;
  handleCardClick: (curse: any) => void;
  handleTrialCopy: (text: string) => void;
  brewAndCopy: () => void;
  handleCopy: () => void;
  handleRiskAcceptAndCopy: () => void;
  handleShare: () => void;
  handleDeepLink: (webUrl: string, appScheme: string) => void;
}

const AcademyContext = createContext<AcademyContextType | null>(null);

export function useAcademy() {
  const ctx = useContext(AcademyContext);
  if (!ctx) throw new Error("useAcademy must be used within AcademyProvider");
  return ctx;
}

export function AcademyProvider({ children }: { children: React.ReactNode }) {
  // Hooks
  const { collectedCards, saveCollection } = useSpellCollection();
  const { mp, saveMp, checkMilestoneRewards } = useMPSystem();
  const {
    completedQuests, earnedTitles,
    checkQuestProgress, getSchoolProgress, getActiveQuests, getRequirementStatus,
  } = useQuestSystem();
  const [questToast, setQuestToast] = useState<QuestCompletionEvent | null>(null);

  // State
  const [selectedCurse, setSelectedCurse] = useState<any>(null);
  const [inputs, setInputs] = useState<any>({});
  const [castLevel, setCastLevel] = useState<"quick" | "standard" | "full">("quick");
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
  const [showFusion, setShowFusion] = useState(false);
  const [showSpellCard, setShowSpellCard] = useState(false);
  const [lastCastLevel, setLastCastLevel] = useState("standard");
  const [lastCastCurse, setLastCastCurse] = useState<any>(null);
  const [showSharePreview, setShowSharePreview] = useState(false);
  const [shareText, setShareText] = useState("");
  const [shareImageUrl, setShareImageUrl] = useState("");
  const [activeSchool, setActiveSchool] = useState("all");
  const [mpBlocked, setMpBlocked] = useState(false);
  const [mpBlockMessage, setMpBlockMessage] = useState("");

  // Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(CURSES, {
      keys: ["title", "desc", "tags", "tab"],
      threshold: 0.4,
      ignoreLocation: true,
      useExtendedSearch: true
    });
  }, []);

  const filteredCurses = useMemo(() => {
    let results = !searchQuery.trim() ? CURSES : fuse.search(searchQuery).map(result => result.item);
    if (activeSchool !== "all") {
      results = results.filter((c: any) => c.school === activeSchool || c.subSchool === activeSchool);
    }
    return results;
  }, [searchQuery, fuse, activeSchool]);

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

  // Group curses by tab
  const groupedCurses = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    const reversed = [...filteredCurses].reverse();
    TABS.forEach(tab => {
      groups[tab] = reversed.filter(c => c.tab === tab);
    });
    return groups;
  }, [filteredCurses]);

  // Fusion quest handler
  const handleFusionComplete = (mainSchool: string, sacrificeSchool: string) => {
    const schools = new Set([mainSchool, sacrificeSchool].filter(Boolean));
    const allResults: QuestCompletionEvent[] = [];
    for (const school of schools) {
      const results = checkQuestProgress('fuse', { fuseSchool: school as SchoolType });
      allResults.push(...results);
    }
    // Grant MP rewards
    let questMpBonus = 0;
    for (const event of allResults) {
      if (event.quest.reward.type === 'mp') {
        questMpBonus += event.quest.reward.value as number;
      }
    }
    if (questMpBonus > 0) {
      saveMp(mp + questMpBonus);
    }
    if (allResults.length > 0) {
      setQuestToast(allResults[0]);
      setTimeout(() => setQuestToast(null), 3000);
    }
  };

  // Actions
  const handleCardClick = (curse: any) => {
    setSelectedCurse(curse);
    setAgreedToRisk(false);
    setInputs({});
  };

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

  const brewAndCopy = () => {
    const cost = getMpCost(selectedCurse, castLevel);
    if (mp < cost) {
      setMpBlocked(true);
      setMpBlockMessage(`魔力不足！需要 ${cost} MP，目前只有 ${mp} MP。每日登入可回復 5 MP。`);
      setTimeout(() => setMpBlocked(false), 3000);
      return;
    }
    const visibleCount = getFieldVisibility(selectedCurse.fields.length, castLevel);
    const autoInputs: any = {}; selectedCurse.fields.forEach((f: any, idx: number) => { const isVisible = idx < visibleCount; autoInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : HIDDEN_MARKER; }); const spell = selectedCurse.generate({ ...autoInputs, [selectedCurse.tweak?.id]: inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0] });
    saveMp(mp - cost);

    // Quest check: cast action
    const castResults = checkQuestProgress('cast', {
      spellId: selectedCurse.id,
      school: selectedCurse.school as SchoolType,
      castLevel,
    });

    // 全力詠唱解鎖卡片（允許重複收集）
    if (castLevel === 'full') {
      const newCollection = [...collectedCards, selectedCurse.id];
      saveCollection(newCollection);
      // Check milestone rewards
      const uniqueCount = [...new Set(newCollection)].length;
      checkMilestoneRewards(uniqueCount);

      // Quest check: collect action
      const collectResults = checkQuestProgress('collect', {
        collectedCards: newCollection,
      });
      castResults.push(...collectResults);
    }

    // Grant MP rewards from completed quests
    let questMpBonus = 0;
    for (const event of castResults) {
      if (event.quest.reward.type === 'mp') {
        questMpBonus += event.quest.reward.value as number;
      }
    }
    if (questMpBonus > 0) {
      saveMp(mp - cost + questMpBonus);
    }

    // Show toast for first completed quest
    if (castResults.length > 0) {
      setQuestToast(castResults[0]);
      setTimeout(() => setQuestToast(null), 3000);
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

  const value: AcademyContextType = {
    selectedCurse, setSelectedCurse,
    inputs, setInputs,
    castLevel, setCastLevel,
    mp, saveMp, mpBlocked, mpBlockMessage,
    collectedCards, saveCollection,
    isCopied, setIsCopied,
    showPortal, setShowPortal,
    searchQuery, setSearchQuery,
    agreedToRisk, setAgreedToRisk,
    activeTab, setActiveTab,
    showAuthModal, setShowAuthModal,
    isLoggedIn, setIsLoggedIn,
    showRiskScroll, setShowRiskScroll,
    showTweakSheet, setShowTweakSheet,
    activeTrial, setActiveTrial,
    isTrialCopied, setIsTrialCopied,
    showBrewing, setShowBrewing,
    expandedTabs, setExpandedTabs,
    showCopyToast, setShowCopyToast,
    showSpellBook, setShowSpellBook,
    showFusion, setShowFusion,
    showSpellCard, setShowSpellCard,
    lastCastLevel, setLastCastLevel,
    lastCastCurse, setLastCastCurse,
    showSharePreview, setShowSharePreview,
    shareText, setShareText,
    shareImageUrl, setShareImageUrl,
    activeSchool, setActiveSchool,
    completedQuests,
    earnedTitles,
    getSchoolProgress,
    getActiveQuests,
    getRequirementStatus,
    questToast,
    filteredCurses,
    groupedCurses,
    handleFusionComplete,
    handleCardClick,
    handleTrialCopy,
    brewAndCopy,
    handleCopy,
    handleRiskAcceptAndCopy,
    handleShare,
    handleDeepLink,
  };

  return (
    <AcademyContext.Provider value={value}>
      {children}
    </AcademyContext.Provider>
  );
}
