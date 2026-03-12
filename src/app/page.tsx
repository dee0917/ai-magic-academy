"use client";
import React, { useState, useEffect, useMemo } from "react";
import { 
  Sparkles, Copy, ExternalLink, ChevronDown, X, Search, Check,
  Brain, Bot, MessageSquare, Lock, Share2, AlertTriangle, ArrowRight, BookOpen,
  ArrowLeft
} from "lucide-react";
import { CURSES } from "./curses_data";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isCopied, setIsCopied] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [agreedToRisk, setAgreedToRisk] = useState(false);
  const [activeTab, setActiveTab] = useState("全部");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (showPortal) {
      const timer = setTimeout(() => {
        handleDeepLink("https://gemini.google.com/app", "google-gemini://");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showPortal]);

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
  
  // Group curses by tab
  const groupedCurses = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    TABS.forEach(tab => {
      groups[tab] = CURSES.filter(c => c.tab === tab);
    });
    return groups;
  }, []);

  const HOT_TAGS = useMemo(() => {
    const allTags = CURSES.flatMap(curse => (curse as any).tags || []);
    const twoCharTags = allTags.filter(tag => tag.length === 2);
    const tagCounts: { [key: string]: number } = {};
    twoCharTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => `#${tag}`);
  }, []);

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
      alert("請勾選免責聲明以解鎖施咒。");
      return;
    }
    const spell = selectedCurse.generate(inputs);
    const cleanSpell = spell.replace(/\[\[/g, '').replace(/\]\]/g, '');
    navigator.clipboard.writeText(cleanSpell).then(() => {
      setIsCopied(true);
      setShowPortal(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `剛在【AI魔法學院】施放了「${selectedCurse.title}」咒語，太好用了！一起來提升職場生存力吧：`;
    if (navigator.share) {
      navigator.share({ title: 'AI 魔法學院', text, url }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert("已複製專屬魔法分享連結！快去社群擴散吧。");
    }
  };

  const handleDeepLink = (webUrl: string, appScheme: string) => {
    const start = Date.now();
    window.location.href = appScheme;
    setTimeout(() => {
      if (!document.hidden && document.hasFocus()) {
        const elapsed = Date.now() - start;
        if (elapsed < 3000) {
          window.open(webUrl, '_blank');
        }
      }
    }, 2000);
    setTimeout(() => setShowPortal(false), 5000);
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
        <h1 className="text-4xl md:text-7xl font-serif font-black mb-3 md:mb-6 leading-[1.1] tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
            {`{麻瓜專用AI外掛}`}
          </span>
        </h1>
        <p className="text-sm md:text-xl text-slate-400 max-w-2xl mx-auto mb-6 md:mb-10 font-medium leading-relaxed">
          將複雜的「提示詞」封裝成一鍵釋放的魔法。<br className="hidden md:block" />
          應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。
        </p>

        <div className="max-w-xl mx-auto w-full relative z-10">
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
      </header>

      {/* 方案三改良版：橫向魔法卷軸 (四列/分類) */}
      <main className="w-full max-w-7xl relative z-10 pb-20">
        {TABS.map(tab => (
          <section key={tab} className="mb-12 md:mb-16 last:mb-0">
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
              {/* Scroll Indicators */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#050510] to-transparent z-20 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#050510] to-transparent z-20 pointer-events-none opacity-100 transition-opacity flex items-center justify-end pr-2">
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center backdrop-blur-md md:hidden">
                   <ArrowRight className="w-4 h-4 text-purple-400" />
                </motion.div>
              </div>

              <div className="flex overflow-x-auto gap-4 md:gap-6 px-4 pb-8 no-scrollbar snap-x snap-mandatory scroll-smooth">
                {groupedCurses[tab]?.map((curse: any) => (
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
                {/* End placeholder to allow last card full view */}
                <div className="flex-shrink-0 w-8 md:w-20"></div>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* 狀態二：魔法工房 (彈出顯示) */}
      <AnimatePresence>
      {selectedCurse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-10">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => { setSelectedCurse(null); setInputs({}); setShowPortal(false); }}
          ></motion.div>
          
          <motion.div layoutId={`card-${selectedCurse.id}`} className="w-full max-w-4xl bg-[#0a0a15] bg-gradient-to-br from-white/[0.08] to-transparent border border-purple-500/30 rounded-3xl backdrop-blur-2xl relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden z-10">
            {/* Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <div className="flex justify-end gap-3 mb-6">
                <button onClick={handleShare} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-purple-400 transition-all border border-white/10 shadow-lg">
                  <Share2 className="w-5 h-5" />
                </button>
                <button onClick={() => { setSelectedCurse(null); setInputs({}); setShowPortal(false); }} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/10 shadow-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 border-b border-white/10 pb-10">
                <motion.div layoutId={`icon-${selectedCurse.id}`} className="flex-shrink-0 p-5 bg-black/40 rounded-2xl ring-1 ring-white/10 shadow-2xl overflow-hidden relative group" style={{ filter: `drop-shadow(0 0 15px ${getColorHex(selectedCurse.color)}60)` }}>
                  <div className="scale-125">
                    {selectedCurse.icon}
                  </div>
                </motion.div>
                
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                      {selectedCurse.tab}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-white tracking-tight leading-tight mb-3">
                    {selectedCurse.title.replace(/【|】/g, '')}
                  </h2>
                  <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed max-w-2xl">
                    {selectedCurse.desc}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> 注入魔力
                  </h3>
                  {selectedCurse.fields.map((f: any) => (
                    <div key={f.id} className="group/field">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 group-focus-within/field:text-purple-400 transition-colors">{f.label}</label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 focus:bg-purple-900/10 transition-all shadow-inner placeholder:text-slate-600"
                        onChange={(e) => setInputs({ ...inputs, [f.id]: e.target.value })}
                      />
                    </div>
                  ))}
                  
                  {selectedCurse.tweak && (
                    <div className="pt-6 border-t border-white/10">
                      <label className="block text-xs font-black uppercase tracking-widest text-purple-300 mb-3">{selectedCurse.tweak.label}</label>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/10">
                          {selectedCurse.tweak.options.map((opt: string) => {
                            const isSelected = (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt;
                            return (
                              <button
                                key={opt}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-1 min-w-max ${isSelected ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                onClick={() => setInputs({ ...inputs, [selectedCurse.tweak.id]: opt })}
                              >
                                {opt.split(' ')[0]}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col h-full space-y-4">
                  <div className="flex-grow bg-[#0a0a0a] rounded-xl p-5 border-l-4 border-l-emerald-500 text-emerald-400 font-mono shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-y-auto min-h-[350px]">
                    <div className="flex items-center gap-2 mb-4 text-[10px] text-emerald-500/50 uppercase tracking-[0.2em]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      咒語預覽終端機 v4.0.1
                    </div>
                    {Object.keys(inputs).length === 0 ? (
                      <div className="text-emerald-400 font-mono text-sm">
                        等待魔力注入... <span className="animate-pulse">|</span>
                      </div>
                    ) : (
                      <HighlightedPrompt text={selectedCurse.generate({ ...inputs, [selectedCurse.tweak?.id]: inputs[selectedCurse.tweak?.id] || selectedCurse.tweak?.options[0] })} />
                    )}
                  </div>
                  
                  <label className="flex items-start gap-3 mb-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center pt-0.5">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 appearance-none rounded border border-white/30 checked:bg-pink-500 checked:border-pink-500 transition-colors"
                        checked={agreedToRisk}
                        onChange={(e) => setAgreedToRisk(e.target.checked)}
                      />
                      {agreedToRisk && <Check className="w-3 h-3 text-white absolute pointer-events-none" />}
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed">
                      免責聲明：我已知悉 AI 生成內容僅供參考，風險自負。
                    </span>
                  </label>
                </div>
              </div>

              <details className="mt-8 group cursor-pointer border border-white/10 rounded-2xl overflow-hidden bg-[#150a1c] mb-12 md:mb-0">
                <summary className="font-serif font-black text-purple-300 flex items-center p-6 outline-none marker:content-none select-none hover:bg-white/5 transition-colors">
                  <BookOpen className="w-5 h-5 mr-3 text-yellow-500" /> 
                  <span className="italic text-lg border-b border-purple-500/30">大魔導師筆記 (Level 3 原理)</span>
                  <span className="ml-auto text-yellow-500/50 group-open:rotate-180 transition-transform"><ChevronDown className="w-5 h-5"/></span>
                </summary>
                <div className="px-6 pb-6 pt-0 text-yellow-100/80 italic text-sm leading-relaxed border-t border-yellow-500/20 mt-4">
                  {selectedCurse.theory}
                </div>
              </details>
            </div>

            {/* Action Bar */}
            <div className="shrink-0 p-4 md:p-6 bg-black/90 backdrop-blur-2xl border-t border-white/10">
              <button 
                onClick={handleCopy}
                disabled={!agreedToRisk}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-95 ${
                  !agreedToRisk 
                    ? 'bg-white/5 text-slate-500 cursor-not-allowed' 
                    : isCopied 
                      ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]' 
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_200%] animate-gradient-xy text-white shadow-[0_0_40px_rgba(219,39,119,0.5)]'
                }`}
              >
                {isCopied ? <><Check className="w-6 h-6"/> 密咒已封印</> : <><Sparkles className="w-6 h-6"/> {agreedToRisk ? '揮舞魔杖 (複製咒語)' : '等待注入魔力'}</>}
              </button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* 狀態三：傳送門 Modal */}
      {showPortal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div className="bg-[#100820] border border-purple-500/50 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
            <div className="w-20 h-20 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <ExternalLink className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">異界通道已開啟</h3>
            <p className="text-slate-400 mb-6 font-mono text-[10px] tracking-widest uppercase">傳送通道將在 5 秒後自動開啟...</p>
            <div className="space-y-4">
              <button onClick={() => handleDeepLink("https://gemini.google.com/app", "google-gemini://")} className="w-full bg-[#1a1025] hover:bg-[#251835] border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all group">
                <Sparkles className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                <div className="text-left"><h4 className="text-white font-bold">穿越星門</h4><p className="text-[10px] text-slate-500">Gemini</p></div>
              </button>
              <button onClick={() => handleDeepLink("https://chatgpt.com", "chatgpt://")} className="w-full bg-[#1a1025] hover:bg-[#251835] border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all group">
                <Bot className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="text-left"><h4 className="text-white font-bold">啟動萬象之扉</h4><p className="text-[10px] text-slate-500">ChatGPT</p></div>
              </button>
            </div>
            <button onClick={() => setShowPortal(false)} className="mt-6 text-sm text-slate-500 hover:text-white">留在學院</button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
           <div className="bg-[#100820] border border-amber-500/50 p-8 rounded-3xl max-w-sm w-full text-center">
              <Lock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">解鎖高級咒語</h3>
              <p className="text-sm text-slate-300 mb-6">此咒語具有較高的職場風險，需確認魔導師級別。</p>
              <button onClick={() => { setIsLoggedIn(true); setShowAuthModal(false); }} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition">快速認證 (展示通道)</button>
              <button onClick={() => setShowAuthModal(false)} className="mt-4 text-sm text-slate-500 hover:text-white">取消</button>
           </div>
        </div>
      )}
    </div>
  );
}
