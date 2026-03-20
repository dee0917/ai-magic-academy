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

// Helper: Highlight variables and remove special format strings in the UI display
const HighlightedPrompt = ({ text }: { text: string }) => {
  const parts = text.split(/(\[\[.*?\]\])/g);
  return (
    <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">
      {parts.map((part, i) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
          const content = part.slice(2, -2);
          return (
            <span key={i} className="text-yellow-400 font-bold border-b border-yellow-500/30 pb-0.5 mx-0.5 transition-colors">
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
      threshold: 0.4, // Lower is stricter, 0.4 is a good balance
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
      const offset = 100; // Account for any fixed headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
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
    
    // Perform copy logic directly here
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
    return map[colorName] || '#a855f7';
  };

  return (
    <div className="min-h-screen w-full relative bg-[#050510] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050510] to-[#050510] text-slate-200 font-sans selection:bg-purple-500/30 p-4 md:p-6 flex flex-col items-center">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse absolute top-[-10%] left-[-10%]"></div>
        <div className="w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse absolute bottom-[-10%] right-[-10%]" style={{ animationDelay: '2s' }}></div>
      </div>

      <header className="text-center max-w-4xl mt-6 md:mt-16 mb-12 relative z-10 px-4">
        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-purple-400 mb-4 animate-pulse">
          Next-Gen AI Solution
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-serif font-black mb-3 md:mb-6 leading-tight tracking-tighter break-words px-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
            {`{麻瓜專用AI外掛}`}
          </span>
        </h1>
        <p className="text-sm md:text-xl text-slate-400 max-w-[90%] md:max-w-2xl mx-auto mb-6 md:mb-10 font-medium leading-relaxed text-center">
          將複雜的「提示詞」封裝成一鍵釋放的魔法。<br className="hidden md:block" />
          應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。
        </p>

        <div className="max-w-xl mx-auto w-full relative z-10 mb-8 px-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none">
                <Search className="w-4 h-4 md:w-5 md:h-5 text-purple-400 opacity-50 group-focus-within:opacity-100 transition-opacity" />
              </div>
              <input 
                type="text"
                placeholder="搜尋全站魔法..."
                className="w-full bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl py-3.5 md:py-4 pl-11 md:pl-12 pr-11 md:pr-12 text-sm md:text-base text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/40 focus:border-purple-400/50 transition-all shadow-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/10">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar justify-start md:justify-center gap-2 relative z-10 px-4 md:px-0 whitespace-nowrap tab-scroll-container">
          <button
            onClick={() => { setSearchQuery(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex-shrink-0 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-bold text-purple-300 transition-all active:scale-95"
          >
            全部
          </button>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => { setSearchQuery(""); setTimeout(() => scrollToTab(tab), 100); }}
              className="flex-shrink-0 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/30 transition-all active:scale-95"
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Free Trial Section */}
      <section className="w-full max-w-4xl mx-auto mb-16 relative z-10 px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-black text-white mb-2 italic">先施放一道，再決定要不要留下</h2>
          <p className="text-sm text-slate-500 font-bold">免費咒語・無需登入・直接複製使用</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {TRIAL_DATA.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTrial(idx)}
              className={`px-4 py-2 rounded-full border transition-all text-sm font-bold ${activeTrial === idx ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-white/5 border-white/10 text-slate-400 hover:border-purple-500/50'}`}
            >
              {item.emoji} {item.label}
            </button>
          ))}
        </div>

                <motion.div 
          key={activeTrial}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-[#0a0a15] border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden"
        >
          {/* 上方：提示詞文字區 */}
          <div className="p-6 md:p-8 pb-4">
            <div className="font-mono text-sm md:text-base text-emerald-300/90 leading-relaxed whitespace-pre-line">
              {TRIAL_DATA[activeTrial].prompt}
            </div>
          </div>

          {/* 分隔線 */}
          <div className="border-t border-white/10 mx-6 md:mx-8" />

          {/* 下方：操作列 */}
          <div className="flex items-center justify-between px-6 md:px-8 py-4 bg-white/[0.02]">
            <span className="text-xs text-slate-500 font-medium">
              點擊右側按鈕即可複製
            </span>
            <button 
              onClick={() => handleTrialCopy(TRIAL_DATA[activeTrial].prompt)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isTrialCopied ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]' : 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]'}`}
            >
              {isTrialCopied ? <><Check className="w-4 h-4" /> 已複製</> : <><Copy className="w-4 h-4" /> 複製咒語</>}
            </button>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => document.getElementById('職場求生')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-black text-purple-400 hover:text-purple-300 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            還有 {CURSES.length} 道進階咒語等你解鎖 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>


      <main className="w-full max-w-7xl relative z-10 pb-20">
        {TABS.map(tab => {
          const tabCurses = groupedCurses[tab];
          if (searchQuery && tabCurses.length === 0) return null;

          return (
            <section key={tab} id={tab} className="mb-12 md:mb-16 last:mb-0 scroll-mt-32">
              <div className="flex items-center justify-between px-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
                  <h2 className="text-2xl md:text-3xl font-serif font-black tracking-tight text-white italic">{tab}</h2>
                </div>
                <div className="flex items-center gap-2 text-purple-400/60 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                  Swipe Magic <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="relative group/scroll">
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#050510] to-transparent z-20 pointer-events-none opacity-100 transition-opacity flex items-center justify-end pr-2">
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center backdrop-blur-md md:hidden">
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                  </motion.div>
                </div>

                <div className="flex overflow-x-auto gap-4 md:gap-6 px-4 pb-8 no-scrollbar snap-x snap-mandatory scroll-smooth w-full">
                  {tabCurses.map((curse: any) => (
                    <motion.button
                      layoutId={`card-${curse.id}`}
                      key={curse.id}
                      onClick={() => handleCardClick(curse)}
                      style={{ '--card-color': getColorHex(curse.color) } as React.CSSProperties}
                      className="flex-shrink-0 w-[280px] md:w-[350px] snap-start group/card relative text-left p-6 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl border border-white/10 border-t-2 border-t-[var(--card-color)] shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 blur opacity-0 group-hover/card:opacity-10 transition duration-500"></div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-black/40 rounded-2xl ring-1 ring-white/10 shadow-xl group-hover/card:scale-110 transition-transform" style={{ filter: `drop-shadow(0 0 12px ${getColorHex(curse.color)}80)` }}>
                          {curse.icon}
                        </div>
                        {curse.isPro && !isLoggedIn ? (
                          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                            <Lock className="w-3 h-3" /> PRO
                          </div>
                        ) : (
                          <div className="text-[10px] font-black uppercase tracking-wider text-purple-300 bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20">
                            {curse.outputFormat?.split(' ')[0] || 'TEXT'}
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2 group-hover/card:text-purple-300 transition-colors line-clamp-1">
                        {curse.title.replace(/【|】/g, '')}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6 min-h-[4.5rem]">{curse.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(curse.tags || []).slice(0, 3).map((tag: string) => (
                          <span key={tag} className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">#{tag}</span>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-purple-400 group-hover/card:text-pink-400 transition-colors">
                        <span className="text-[10px] font-black uppercase tracking-tighter">立即解構咒語</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.button>
                  ))}
                  <div className="flex-shrink-0 w-8 md:w-20"></div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <AnimatePresence>
      {selectedCurse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedCurse(null)}></motion.div>
          <motion.div layoutId={`card-${selectedCurse.id}`} className="w-full max-w-4xl bg-[#0a0a15] bg-gradient-to-br from-white/[0.08] to-transparent border border-purple-500/30 rounded-3xl backdrop-blur-2xl relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden z-10">
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <div className="flex justify-end gap-3 mb-6">
                <button onClick={handleShare} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-purple-400 transition-all border border-white/10 shadow-lg"><Share2 className="w-5 h-5" /></button>
                <button onClick={() => setSelectedCurse(null)} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/10 shadow-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 border-b border-white/10 pb-10">
                <div className="flex-shrink-0 p-5 bg-black/40 rounded-2xl ring-1 ring-white/10 shadow-2xl" style={{ filter: `drop-shadow(0 0 15px ${getColorHex(selectedCurse.color)}60)` }}>{selectedCurse.icon}</div>
                <div className="flex-grow text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20 mb-4 inline-block">{selectedCurse.tab}</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-white tracking-tight mb-3">{selectedCurse.title.replace(/|/g, '')}</h2>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">{selectedCurse.desc}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6"><h3 className="text-lg font-bold text-purple-300 flex items-center gap-2"><Sparkles className="w-5 h-5" /> 注入魔力</h3><div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/20 shadow-inner">{['初級', '中級', '高級'].map((l) => (<button key={l} type="button" onClick={() => setSpellLevel(l as any)} className={'px-5 py-2.5 rounded-xl text-xs font-black transition-all ' + (spellLevel === l ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300')}>{l}</button>))}</div></div>
                  {selectedCurse.fields.filter((_f: any, idx: number) => (spellLevel === '高級' || (spellLevel === '初級' && idx < 2) || (spellLevel === '中級' && idx < 3))).map((f: any) => (
                    <div key={f.id}><label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{f.label}</label>
                      <input type="text" placeholder={f.placeholder} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400 transition-all shadow-inner" onChange={(e) => setInputs({ ...inputs, [f.id]: e.target.value })} />
                    </div>
                  ))}
                  {selectedCurse.tweak && (
                    <div className="pt-6 border-t border-white/10">
                      <label className="block text-xs font-black uppercase tracking-widest text-purple-300 mb-3">{selectedCurse.tweak.label}</label>
                      
                      {/* Desktop View: Original Grid */}
                      <div className="hidden md:flex flex-wrap gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/10">
                        {selectedCurse.tweak.options.map((opt: string) => (
                          <button key={opt.split('：')[0]} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-1 ${ (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-400 hover:text-white'}`} onClick={() => setInputs({ ...inputs, [selectedCurse.tweak.id]: opt })}>{opt.split(' ')[0]}</button>
                        ))}
                      </div>

                      {/* Mobile View: Bottom Sheet Trigger */}
                      <button 
                        onClick={() => setShowTweakSheet(true)}
                        className="md:hidden w-full flex items-center justify-between p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-sm font-bold text-purple-300"
                      >
                        <span>{(inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]).split('：')[0]}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col h-full space-y-4">
                  <div className="flex-grow bg-[#0a0a15] rounded-xl p-5 border-l-4 border-l-emerald-500 text-emerald-400 font-mono shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-y-auto min-h-[350px]">
                    <div className="flex items-center gap-2 mb-4 text-[10px] text-emerald-500/50 uppercase tracking-[0.2em]"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>咒語預覽終端機</div>
                    {(() => { const baseInputs: any = {}; selectedCurse.fields.forEach((f: any, idx: number) => { const isVisible = spellLevel === "高級" || (spellLevel === "初級" && idx < 2) || (spellLevel === "中級" && idx < 3); baseInputs[f.id] = isVisible ? (inputs[f.id] || "「尚未輸入內容」") : "（由 AI 根據情境自動填充）"; }); const finalInputs = { ...baseInputs, [selectedCurse.tweak?.id]: (inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0]) }; return <HighlightedPrompt text={selectedCurse.generate(finalInputs)} />; })()}
                  </div>
                  <label className="flex items-start gap-3 mb-4 cursor-pointer group">
                    <input type="checkbox" className="mt-1" checked={agreedToRisk} onChange={(e) => setAgreedToRisk(e.target.checked)} />
                    <span className="text-xs text-slate-500 italic">已簽署魔法契約，自負施法風險。</span>
                  </label>
                </div>
              </div>
              <details className="mt-8 group cursor-pointer border border-white/10 rounded-2xl overflow-hidden bg-[#150a1c]">
                <summary className="p-6 font-serif font-black text-purple-300 flex items-center outline-none select-none hover:bg-white/5 transition-colors"><BookOpen className="w-5 h-5 mr-3 text-yellow-500" /> <span className="italic text-lg">大魔導師筆記 (Level 3 原理)</span></summary>
                <div className="px-6 pb-6 text-yellow-100/80 italic text-sm leading-relaxed border-t border-yellow-500/20 pt-4">{selectedCurse.theory}</div>
              </details>
            </div>
            <div className="shrink-0 p-4 md:p-6 bg-black/90 border-t border-white/10">
              <button onClick={handleCopy} className={`w-full py-5 rounded-2xl font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all ${isCopied ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_40px_rgba(219,39,119,0.5)]'} text-white`}>
                {isCopied ? <><Check className="w-6 h-6"/> 密咒已封印</> : <><Sparkles className="w-6 h-6"/> 揮舞魔杖 (複製咒語)</>}
              </button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* Bottom Sheet for Tweaks (Mobile) */}
      <AnimatePresence>
        {showTweakSheet && selectedCurse?.tweak && (
          <div className="fixed inset-0 z-[250] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowTweakSheet(false)}
            />
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full bg-[#100820] border-t border-purple-500/30 rounded-t-[32px] p-6 pb-12 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-10"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              <h3 className="text-xl font-black text-white mb-6 italic px-2">{selectedCurse.tweak.label}</h3>
              <div className="space-y-3">
                {selectedCurse.tweak.options.map((opt: string) => (
                  <button 
                    key={opt}
                    onClick={() => {
                      setInputs({ ...inputs, [selectedCurse.tweak.id]: opt });
                      setShowTweakSheet(false);
                    }}
                    className={`w-full p-5 rounded-2xl text-left font-bold transition-all flex items-center justify-between ${ (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'bg-purple-600 text-white shadow-xl shadow-purple-900/40' : 'bg-white/5 text-slate-300 border border-white/5'}`}
                  >
                    <span>{opt.split('：')[0]}</span>
                    {(inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt && <Check className="w-5 h-5" />}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowTweakSheet(false)}
                className="w-full mt-6 py-4 rounded-xl bg-white/5 text-slate-500 font-bold"
              >
                取消
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRiskScroll && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowRiskScroll(false)} />
            <motion.div initial={{ scale: 0.9, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 50, opacity: 0 }} className="relative w-full max-w-xl bg-[#1a0b2e] border-2 border-purple-500/50 rounded-3xl p-8 md:p-12 shadow-[0_0_100px_rgba(168,85,247,0.4)]">
                <AlertTriangle className="w-12 h-12 text-purple-400 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl font-serif font-black text-center text-white mb-6 italic">魔法使用契約</h3>
                <div className="space-y-4 text-sm text-purple-100/80 leading-relaxed max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  <p>1. 咒語內容僅供參考，生成結果之適法性由使用者自負。</p>
                  <p>2. 施法前應評估社交與職涯風險。</p>
                  <p>3. 點擊簽署即表示您已年滿 18 歲且同意放棄法律追訴權。</p>
                </div>
                <button onClick={handleRiskAcceptAndCopy} className="w-full py-4 mt-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-95 transition-all">確認理解，正式簽署契約</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showPortal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div className="bg-[#100820] border border-purple-500/50 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-6 italic">選擇傳送座標</h3>
            <div className="space-y-3">
              <button onClick={() => handleDeepLink("https://chatgpt.com", "chatgpt://")} className="w-full bg-[#1a1025] hover:bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-4 transition-all">
                <Bot className="w-6 h-6 text-emerald-400" />
                <div className="text-left"><h4 className="text-white font-bold">ChatGPT</h4><p className="text-[10px] text-emerald-500/70 font-black">OPENAI</p></div>
              </button>
              <button onClick={() => handleDeepLink("https://claude.ai", "claude://")} className="w-full bg-[#1a1025] hover:bg-orange-500/10 border border-orange-500/30 p-4 rounded-2xl flex items-center gap-4 transition-all">
                <Brain className="w-6 h-6 text-orange-400" />
                <div className="text-left"><h4 className="text-white font-bold">Claude</h4><p className="text-[10px] text-orange-500/70 font-black">ANTHROPIC</p></div>
              </button>
              <button onClick={() => window.open("https://gemini.google.com/app", "_blank")} className="w-full bg-[#1a1025] hover:bg-blue-500/10 border border-blue-500/30 p-4 rounded-2xl flex items-center gap-4 transition-all">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <div className="text-left"><h4 className="text-white font-bold">Gemini</h4><p className="text-[10px] text-blue-500/70 font-black">GOOGLE</p></div>
              </button>
              <button onClick={() => window.open("https://grok.com", "_blank")} className="w-full bg-[#1a1025] hover:bg-slate-300/10 border border-slate-300/30 p-4 rounded-2xl flex items-center gap-4 transition-all">
                <MessageSquare className="w-6 h-6 text-slate-300" />
                <div className="text-left"><h4 className="text-white font-bold">Grok</h4><p className="text-[10px] text-slate-300/70 font-black">XAI</p></div>
              </button>
              <button onClick={() => handleDeepLink("https://chat.deepseek.com", "deepseek://")} className="w-full bg-[#1a1025] hover:bg-blue-400/10 border border-blue-400/30 p-4 rounded-2xl flex items-center gap-4 transition-all">
                <div className="w-6 h-6 flex items-center justify-center bg-blue-600 rounded-lg text-[10px] font-black text-white">DS</div>
                <div className="text-left"><h4 className="text-white font-bold">DeepSeek</h4><p className="text-[10px] text-blue-400/70 font-black">DEEPSEEK</p></div>
              </button>
            </div>
            <button onClick={() => setShowPortal(false)} className="mt-8 text-xs font-black uppercase text-slate-600 hover:text-white transition-colors">[ 留在學院 ]</button>
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
           <div className="bg-[#100820] border border-amber-500/50 p-8 rounded-3xl max-w-sm w-full text-center">
              <Lock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-6">解鎖高級咒語</h3>
              <button onClick={() => { setIsLoggedIn(true); setShowAuthModal(false); }} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition">快速認證 (展示通道)</button>
              <button onClick={() => setShowAuthModal(false)} className="mt-4 text-sm text-slate-500">取消</button>
           </div>
        </div>
      )}
    </div>
  );
}
