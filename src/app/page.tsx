"use client";
import React, { useState, useEffect } from "react";
import { 
  Sparkles, Copy, ExternalLink, ChevronDown, X, Search, Check,
  Brain, Bot, MessageSquare, Lock, Share2, AlertTriangle, ArrowRight
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [agreedToRisk, setAgreedToRisk] = useState(false);
  const [activeTab, setActiveTab] = useState("全部");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 模擬登入狀態

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

  const TABS = ["全部", "職場求生", "校園生存", "人際擋箭", "日常雜症"];
  
  // Dynamically extract hot tags (strictly 2 characters long) from CURSES data
  const HOT_TAGS = React.useMemo(() => {
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

  const handleTitleClick = (e: React.MouseEvent, curse: any) => {
    e.stopPropagation(); // Prevent card selection from triggering
    if (curse.tags && curse.tags.length > 0) {
      setSearchQuery(curse.tags[0]);
      setActiveTab("全部"); // 確保點擊後能看到結果
    }
  };

  const filteredCurses = CURSES.filter((curse: any) => {
    const tags = curse.tags || [];
    const cleanQuery = searchQuery.startsWith('#') ? searchQuery.slice(1) : searchQuery;
    const q = cleanQuery.toLowerCase();
    
    const matchesSearch = 
      curse.title.toLowerCase().includes(q) ||
      curse.desc.toLowerCase().includes(q) ||
      tags.some((tag: string) => tag.toLowerCase().includes(q));
    
    const matchesTab = activeTab === "全部" || curse.tab === activeTab;
    return matchesSearch && matchesTab;
  });

  const getMergedInputs = () => {
    return {
      ...inputs,
      // Ensure dropdown values are always passed to prompt generator even if user never clicked
      ...(selectedCurse?.tweak && { [selectedCurse.tweak.id]: inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0] }),
    };
  };

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
    const spell = selectedCurse.generate(getMergedInputs());
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
    
    // Check after a delay to see if we've successfully left the browser
    setTimeout(() => {
      // If the browser is still visible and focused, the app likely failed to open
      if (!document.hidden && document.hasFocus()) {
        const elapsed = Date.now() - start;
        // If the timer fired "on time" (meaning execution wasn't paused by app opening), 
        // we can assume the app didn't open.
        if (elapsed < 3000) {
          window.open(webUrl, '_blank');
        }
      }
    }, 2000);

    // Auto-close the portal after a while
    setTimeout(() => setShowPortal(false), 5000);
  };

  // Helper to map color strings to HEX for drop-shadows and borders
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
    <div className="min-h-screen relative bg-[#050510] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050510] to-[#050510] text-slate-200 font-sans selection:bg-purple-500/30 p-4 md:p-6 flex flex-col items-center overflow-x-hidden">
      <div className="w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse absolute top-[-10%] left-[-10%] pointer-events-none z-0"></div>
      <div className="w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse absolute bottom-[-10%] right-[-10%] pointer-events-none z-0" style={{ animationDelay: '2s' }}></div>

      <header className="text-center max-w-4xl mt-6 md:mt-16 mb-6 md:mb-12 relative z-10 px-4">
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
                placeholder="搜尋魔法..."
                className="w-full bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl py-3.5 md:py-4 pl-11 md:pl-12 pr-11 md:pr-12 text-sm md:text-base text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/40 focus:border-purple-400/50 transition-all shadow-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("全部");
                  }}
                  className="absolute right-4 text-slate-500 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="flex-shrink-0 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-purple-500/80 mr-1">
              <Sparkles className="w-3 h-3" />
              <span className="hidden xs:inline">TRENDING:</span>
            </div>
            <div className="flex gap-1.5">
              {HOT_TAGS.map(tag => (
                <button 
                  key={tag} 
                  onClick={() => {
                    setSearchQuery(tag);
                    setActiveTab("全部");
                  }}
                  className={`px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold transition-all duration-300 border backdrop-blur-md whitespace-nowrap
                    ${searchQuery === tag 
                      ? 'bg-purple-500/40 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                      : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10 hover:text-purple-300'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 導航 Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-6 md:mb-10 max-w-5xl w-full scrollbar-hide pb-2 px-2 relative z-10 justify-center md:justify-center">
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl shrink-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${activeTab === tab ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 狀態一：詛咒看板 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl">
        {filteredCurses.length > 0 ? (
          filteredCurses.map((curse: any) => {
            const rois = ['⚡ 節省 30 分鐘', '🛡️ 存活率 +99%', '🔥 壓力 -80%', '💎 價值提升'];
            const roi = rois[curse.title.length % rois.length];
            return (
            <motion.button
              layoutId={`card-${curse.id}`}
              key={curse.id}
              onClick={() => handleCardClick(curse)}
              style={{ '--card-color': getColorHex(curse.color) } as React.CSSProperties}
              className="group relative text-left p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-md border border-white/10 border-t-2 border-t-[var(--card-color)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.4)] hover:border-purple-500/50 transition-all duration-300 flex flex-row md:flex-col h-full overflow-hidden gap-4 md:gap-0"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 blur opacity-0 group-hover:opacity-10 transition duration-500 pointer-events-none"></div>
              
              <div className="flex-shrink-0 flex flex-col items-center md:items-start md:mb-4 relative z-10 w-16 md:w-auto">
                <motion.div layoutId={`icon-${curse.id}`} className="p-3 bg-black/40 rounded-xl group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10 shadow-xl mb-2 md:mb-0" style={{ filter: `drop-shadow(0 0 12px ${getColorHex(curse.color)}80)` }}>
                  {curse.icon}
                </motion.div>
              </div>

              <div className="flex-grow flex flex-col relative z-10 max-w-full overflow-hidden">
                <div className="flex justify-between items-start mb-1 md:mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-[10px] font-black text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 uppercase tracking-widest leading-none">
                      {curse.tab === "生活瑣事" ? "🍎 日常" : curse.tab}
                    </span>
                    <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                      {roi}
                    </span>
                  </div>
                  
                  {curse.isPro && !isLoggedIn ? (
                     <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 md:px-2 py-0.5 rounded-md border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)] ml-2">
                       <Lock className="w-3 h-3" /> PRO
                     </div>
                  ) : (
                    <div className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-purple-300 bg-purple-500/10 px-1.5 md:px-2 py-0.5 rounded-md border border-purple-500/20 ml-2">
                      {curse.outputFormat || 'TEXT'}
                    </div>
                  )}
                </div>

                <h3 className="text-lg md:text-xl font-serif font-bold text-white mb-1.5 md:mb-2 group-hover:text-purple-300 transition-colors">
                  {curse.title}
                </h3>

                <p className="text-sm md:text-sm text-slate-400 leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">{curse.desc}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto relative z-20 pointer-events-auto">
                  {(curse.tags || []).slice(0, 3).map((tag: string) => (
                    <span 
                      key={tag}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery(tag);
                        setActiveTab("全部");
                      }}
                      className="text-[10px] md:text-[9px] font-bold text-slate-400 hover:text-purple-200 bg-white/10 hover:bg-purple-500/30 px-2 py-1 md:px-2 md:py-0.5 rounded-lg transition-all cursor-pointer border border-white/10 hover:border-purple-500/40 relative active:scale-95 inline-block"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-white/5 hidden md:flex items-center justify-between text-purple-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 relative z-10 w-full">
                <span className="text-xs font-black uppercase tracking-tighter">立即解構詛咒</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>
          )})
        ) : (
          <div className="col-span-full text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl">
            <p className="text-slate-400">找不到相關魔法，請嘗試其他關鍵字</p>
          </div>
        )}
      </div>

      {/* 狀態二：魔法工房 (彈出顯示) */}
      <AnimatePresence>
      {selectedCurse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-10">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => { setSelectedCurse(null); setInputs({}); setShowPortal(false); setIsDropdownOpen(false); }}
          ></motion.div>
          
          <motion.div layoutId={`card-${selectedCurse.id}`} className="w-full max-w-4xl bg-[#0a0a15] bg-gradient-to-br from-white/[0.08] to-transparent border border-purple-500/30 rounded-3xl p-6 md:p-8 pb-32 md:pb-8 backdrop-blur-2xl relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-end gap-3 mb-6 relative z-20">
              <button onClick={handleShare} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-purple-400 transition-all border border-white/10 shadow-lg" title="分享咒語">
                <Share2 className="w-5 h-5" />
              </button>
              <button onClick={() => { setSelectedCurse(null); setInputs({}); setShowPortal(false); setIsDropdownOpen(false); }} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/10 shadow-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 border-b border-white/10 pb-10">
              <motion.div layoutId={`icon-${selectedCurse.id}`} className="flex-shrink-0 p-5 bg-black/40 rounded-2xl ring-1 ring-white/10 shadow-2xl overflow-hidden relative group" style={{ filter: `drop-shadow(0 0 15px ${getColorHex(selectedCurse.color)}60)` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:scale-110 transition-transform"></div>
                <div className="scale-110 md:scale-125">
                  {selectedCurse.icon}
                </div>
              </motion.div>
              
              <div className="flex-grow text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)] whitespace-nowrap">
                    {selectedCurse.tab}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-pink-400 bg-pink-500/10 px-3 py-1 rounded-lg border border-pink-500/20 whitespace-nowrap">
                    {selectedCurse.outputFormat || 'TEXT'}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-black text-white tracking-tight leading-tight mb-3">
                  {selectedCurse.title}
                </h2>
                <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed max-w-2xl">
                  {selectedCurse.desc}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> 注入魔力 (Level 1)
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
                    <label className="block text-xs font-black uppercase tracking-widest text-purple-300 mb-3">{selectedCurse.tweak.label} (Level 2)</label>
                    <div className="flex flex-col gap-2 shrink-0 overflow-x-auto w-full max-w-full">
                      <div className="flex items-center justify-between relative bg-black/40 p-1.5 rounded-2xl border border-white/10 min-w-max md:min-w-0 md:w-full">
                        {selectedCurse.tweak.options.map((opt: string) => {
                          const isSelected = (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt;
                          return (
                            <button
                              key={opt}
                              className={`relative px-3 py-2 md:px-4 md:py-2 rounded-xl text-xs font-bold transition-all z-10 mx-0.5 flex-1 w-full text-center ${isSelected ? 'bg-purple-600 border border-purple-400/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'}`}
                              onClick={() => setInputs({ ...inputs, [selectedCurse.tweak.id]: opt })}
                            >
                              <span className="whitespace-nowrap">{opt.split(' ')[0]}</span>
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
                    <div className="text-emerald-400 font-mono text-sm drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">
                      等待魔力注入... <span className="animate-pulse">|</span>
                    </div>
                  ) : (
                    <HighlightedPrompt text={selectedCurse.generate(getMergedInputs())} />
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
                    <span className="font-bold text-slate-300">免責聲明：</span>我已知悉 AI 生成內容僅供參考，請依實際情況微調。如直接複製導致任何爭議或損失，風險由使用者自負。
                  </span>
                </label>

                <div className="fixed md:static bottom-0 left-0 right-0 p-4 md:p-0 z-40 bg-black/60 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none border-t border-white/10 md:border-none shadow-[0_-20px_40px_rgba(0,0,0,0.5)] md:shadow-none">
                  <button 
                    onClick={handleCopy}
                    disabled={!agreedToRisk}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all transform active:scale-95 relative overflow-hidden ${
                      !agreedToRisk 
                        ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/10' 
                        : isCopied 
                          ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]' 
                          : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_200%] animate-gradient-xy text-white hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] border border-white/10 group/btn'
                    }`}
                  >
                    {agreedToRisk && !isCopied && (
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite] skew-x-[-45deg] z-10 w-[50%]"></div>
                    )}
                    <div className="relative z-20 flex items-center gap-3">
                      {isCopied ? <><Check className="w-6 h-6"/> 密咒已封印</> : <><Sparkles className="w-6 h-6"/> {agreedToRisk ? '揮舞魔杖 (複製咒語)' : '等待注入魔力'}</>}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <details className="mt-8 group cursor-pointer border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#150a1c] mb-12 md:mb-0 pb-0">
              <summary className="font-serif font-black text-purple-300 flex items-center p-6 md:p-8 outline-none marker:content-none select-none hover:bg-white/5 transition-colors">
                <BookOpen className="w-5 h-5 mr-3 text-yellow-500 group-open:text-yellow-400 group-open:drop-shadow-[0_0_8px_rgba(234,179,8,0.8)] transition-all" /> 
                <span className="italic text-lg tracking-wide border-b border-purple-500/30">大魔導師筆記 (Level 3 原理)</span>
                <span className="ml-auto text-yellow-500/50 group-open:rotate-180 transition-transform"><ChevronDown className="w-5 h-5"/></span>
              </summary>
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 text-yellow-100/80 italic text-sm md:text-base leading-relaxed border-t border-yellow-500/20 shadow-[inset_0_20px_20px_-20px_rgba(0,0,0,0.5)] mt-4">
                {selectedCurse.theory}
              </div>
            </details>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* 狀態三：傳送門 Modal */}
      {showPortal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#100820] border border-purple-500/50 p-8 rounded-3xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(168,85,247,0.2)]">
            <div className="w-20 h-20 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <ExternalLink className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">異界通道已開啟</h3>
            <p className="text-slate-400 mb-4 font-medium">帶著你的咒語，前往異位面釋放魔力吧。</p>
            
            <div className="w-full bg-white/10 rounded-full h-1.5 mb-2 overflow-hidden">
              <div className="bg-purple-500 h-1.5 rounded-full animate-[progress_5s_linear_forwards] w-full" style={{ animationDirection: 'normal', animationFillMode: 'forwards' }}></div>
            </div>
            <p className="text-[10px] text-purple-400/80 mb-6 font-mono tracking-widest uppercase">傳送通道將在 5 秒後自動開啟...</p>
            
            <div className="space-y-4">
              <button onClick={() => handleDeepLink("https://gemini.google.com/app", "google-gemini://")} className="group relative block w-full text-left">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-[#1a1025] hover:bg-[#251835] border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all w-full">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">穿越星門</h4>
                    <p className="text-xs text-slate-400">Gemini (優先開啟 App)</p>
                  </div>
                </div>
              </button>

              <button onClick={() => handleDeepLink("https://chatgpt.com", "chatgpt://")} className="group relative block w-full text-left">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-[#1a1025] hover:bg-[#251835] border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all w-full">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Bot className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">啟動萬象之扉</h4>
                    <p className="text-xs text-slate-400">ChatGPT (優先開啟 App)</p>
                  </div>
                </div>
              </button>

              <button onClick={() => handleDeepLink("https://claude.ai", "claude://")} className="group relative block w-full text-left">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-[#1a1025] hover:bg-[#251835] border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all w-full">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                    <Brain className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">進入靈知聖所</h4>
                    <p className="text-xs text-slate-400">Claude (優先開啟 App)</p>
                  </div>
                </div>
              </button>
            </div>
            
            <button onClick={() => setShowPortal(false)} className="mt-6 text-sm text-slate-500 hover:text-white font-bold">留在學院</button>
          </div>
        </div>
      )}

      {/* 假裝 Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-[#100820] border border-amber-500/50 p-8 rounded-3xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(245,158,11,0.2)]">
              <div className="w-16 h-16 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">解鎖高級咒語</h3>
              <p className="text-sm text-slate-300 mb-6">此咒語具有較高的職場與商務風險，我們需要確認您的魔導師級別。</p>
              
              <button 
                onClick={() => {
                  setIsLoggedIn(true);
                  setShowAuthModal(false);
                  // Optional: Automatically open the previously clicked pro curse
                }} 
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition"
              >
                快速註冊 / 登入 (展示通道)
              </button>
              <button onClick={() => setShowAuthModal(false)} className="mt-4 text-sm text-slate-500 hover:text-white">取消</button>
           </div>
        </div>
      )}
    </div>
  );
}

// Ensure proper Lucide Icon matching
const BookOpen = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
)
