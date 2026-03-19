import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, Clock, Map as MapIcon, ChevronDown, ChevronRight, 
    CheckCircle2, User, Filter, Settings2, Sparkles, Book 
} from 'lucide-react';
import { CHAPTERS, MAIN_QUEST_ORDER, INSIGHTS_LIST } from '../data/insights';
import SEO from '../components/ui/SEO';
import { useIdentity } from '../context/IdentityContext';
import { PERSONAS, UserPersona } from '../data/personas';
import DifficultyStars from '../components/ui/DifficultyStars';

const ChapterNode = ({ chapter, items, completedIds, isLocked, isComplete, isExpanded, onToggle, index }: any) => {
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="relative text-left">
            <div 
                className={`card-magic cursor-pointer ${isLocked ? 'opacity-40 grayscale cursor-not-allowed' : ''} ${isExpanded ? 'bg-magic-primary' : 'bg-magic-bg'}`}
                onClick={isLocked ? undefined : onToggle}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                        <span className="text-6xl flex-shrink-0 drop-shadow-md">{chapter.emoji}</span>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="bg-magic-text text-magic-bg px-3 py-0.5 text-[10px] font-black uppercase tracking-widest">領域.{chapter.id}</span>
                                {isComplete && <span className="badge-magic bg-emerald-700">大圓滿</span>}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-display text-magic-text tracking-tighter truncate">{chapter.title}</h2>
                            <p className="text-magic-text/60 text-sm font-serif italic mt-1 truncate">{chapter.subtitle}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {isLocked ? (
                            <div className="bg-magic-red text-magic-bg border-4 border-magic-text px-6 py-2 font-display text-xs tracking-widest flex items-center gap-2 shadow-brutalist-sm">
                                <Clock size={16} /> 尚未啟蒙
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <ChevronDown size={32} strokeWidth={3} className={`transition-transform text-magic-text ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && !isLocked && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }} 
                            className="overflow-hidden mt-8 pt-8 border-t-4 border-magic-text"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {items.map((item: any, i: number) => {
                                    const isDone = completedIds.includes(item.id);
                                    return (
                                        <Link 
                                            key={item.id} 
                                            to={`/insights/${item.id}`} 
                                            className={`flex items-center gap-6 p-6 border-4 border-magic-text shadow-brutalist transition-all group ${isDone ? 'bg-magic-teal text-magic-bg' : 'bg-magic-bg text-magic-text hover:bg-magic-primary'}`}
                                        >
                                            <div className={`w-14 h-14 border-4 border-magic-text flex items-center justify-center text-2xl font-display flex-shrink-0 ${isDone ? 'bg-magic-bg text-magic-teal' : 'bg-magic-text text-magic-bg shadow-brutalist-sm'}`}>
                                                {isDone ? '✓' : i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xl md:text-2xl font-serif font-black tracking-tight truncate group-hover:underline underline-offset-4">{item.title}</h4>
                                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${isDone ? 'text-magic-bg/70' : 'text-magic-text/40'}`}>
                                                    狀態: {isDone ? '已習得' : '等待修煉'}
                                                </p>
                                            </div>
                                            <ChevronRight size={24} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const InsightCard = ({ insight, idx, completed }: any) => {
    return (
        <Link to={`/insights/${insight.id}`} className="block h-full group">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }}
                className={`bg-magic-bg border-4 p-10 shadow-brutalist h-full flex flex-col transition-all group-hover:shadow-brutalist-hover group-hover:-translate-y-2 relative overflow-hidden ${completed ? 'border-magic-teal' : 'border-magic-text'}`}>
                {completed && (
                    <div className="absolute top-0 right-0 p-4">
                        <div className="bg-magic-teal text-magic-bg px-4 py-1 text-xs font-display rotate-12 shadow-brutalist-sm">MASTERED</div>
                    </div>
                )}
                
                <div className="flex justify-between items-center mb-8">
                    <span className="badge-magic">{insight.category}</span>
                    <span className="text-xs font-display text-magic-text/40">{insight.date}</span>
                </div>
                
                <h4 className="text-3xl md:text-4xl font-display text-magic-text mb-6 leading-none tracking-tighter">
                    {insight.title}
                </h4>
                
                <p className="text-magic-text/70 text-lg font-serif italic line-clamp-3 leading-relaxed mb-12 flex-1">
                    "{insight.summary}"
                </p>
                
                <div className="mt-auto pt-8 border-t-2 border-magic-text/10 flex items-center justify-between">
                    <DifficultyStars level={insight.difficulty_level || 1} />
                    <div className="flex items-center gap-3 text-magic-text font-display text-sm tracking-widest group-hover:text-magic-red transition-colors">
                        翻開秘笈 <ArrowRight size={20} strokeWidth={3} />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const Insights = () => {
    const { persona, setPersona } = useIdentity();
    const [searchParams, setSearchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState<'adventure' | 'free'>('adventure');
    const [loading, setLoading] = useState(true);
    const [completedIds, setCompletedIds] = useState<number[]>([]);
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([0]));
    const [selectedCategory, setSelectedCategory] = useState<string>('全部');
    const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);

    useEffect(() => {
        const personaFromUrl = searchParams.get('persona');
        if (personaFromUrl && (PERSONAS[personaFromUrl as UserPersona] || personaFromUrl === 'general')) {
            setPersona(personaFromUrl as UserPersona);
        }
    }, [searchParams, setPersona]);

    useEffect(() => {
        const comp = localStorage.getItem('dee_ai_completed');
        if (comp) {
            try { setCompletedIds(JSON.parse(comp)); } catch(e) { setCompletedIds([]); }
        }
        setLoading(false);
    }, []);

    const filteredInsights = useMemo(() => {
        let items = [...INSIGHTS_LIST];
        if (viewMode === 'free') {
            items = items.filter(i => !MAIN_QUEST_ORDER.includes(i.id));
        }
        if (selectedCategory !== '全部') {
            items = items.filter(i => i.category === selectedCategory);
        }
        return items;
    }, [viewMode, selectedCategory]);

    const availableCategories = useMemo(() => {
        const cats = new Set(['全部']);
        INSIGHTS_LIST.forEach(i => cats.add(i.category));
        return Array.from(cats);
    }, []);

    const toggleChapter = (id: number) => {
        setExpandedChapters(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    if (loading) return (
        <div className="min-h-screen bg-magic-bg parchment-texture flex items-center justify-center">
            <div className="text-center space-y-8">
                <div className="text-9xl animate-spin halftone-loading rounded-full p-8">🔮</div>
                <h2 className="text-4xl font-display text-magic-text animate-pulse tracking-[0.5em]">魔力注入中...</h2>
            </div>
        </div>
    );

    const currentPersona = PERSONAS[persona as UserPersona] || {
        label: '凡夫俗子',
        description: '從最基礎的啟蒙開始。',
        color: 'magic-text',
        icon: User
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen parchment-texture relative">
            <SEO title="魔法藏書閣" description="掌握 AI 禁忌咒語" path="/insights" />
            <div className="grid-bg-magic opacity-40" />

            {/* HEADER - 報紙報頭風格 */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24 border-b-6 border-magic-text pb-12">
                <div className="flex items-center gap-8">
                    <div className="w-24 h-24 bg-magic-primary border-4 border-magic-text shadow-brutalist flex items-center justify-center rotate-3">
                        <Book size={64} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                        <h1 className="text-6xl md:text-8xl font-display text-magic-text tracking-tighter leading-none mb-2">魔法藏書閣</h1>
                        <p className="text-magic-red font-display text-xl tracking-[0.3em] uppercase opacity-80">Ancient Grimoire of AI</p>
                    </div>
                </div>
                
                <div className="bg-magic-text p-2 shadow-brutalist flex items-center">
                    <button onClick={() => setViewMode('adventure')} 
                        className={`px-10 py-4 font-display text-xl transition-all ${viewMode === 'adventure' ? 'bg-magic-primary text-magic-text' : 'text-magic-bg/40 hover:text-magic-bg'}`}>
                        修煉冒險
                    </button>
                    <button onClick={() => setViewMode('free')} 
                        className={`px-10 py-4 font-display text-xl transition-all ${viewMode === 'free' ? 'bg-magic-primary text-magic-text' : 'text-magic-bg/40 hover:text-magic-bg'}`}>
                        自由翻閱
                    </button>
                </div>
            </div>

            {/* PERSONA STATUS CARD - 復古會員證風格 */}
            <div className="mb-24">
                <div className="bg-magic-teal border-4 border-magic-text p-10 relative overflow-hidden shadow-brutalist">
                    <div className="absolute top-0 right-0 p-10 text-white/5 rotate-12">
                        <Sparkles size={200} />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
                        <div className="flex items-center gap-10">
                            <div className="w-32 h-32 bg-magic-bg border-4 border-magic-text flex items-center justify-center text-magic-teal shadow-brutalist-sm">
                                {React.createElement(currentPersona.icon as any, { size: 80, strokeWidth: 1 })}
                            </div>
                            <div className="text-left text-magic-bg">
                                <span className="font-display text-xs tracking-[0.5em] block mb-4 border-b-2 border-magic-bg/20 pb-2">當前修行位階</span>
                                <h3 className="text-5xl font-display mb-4 tracking-tighter">{currentPersona.label}</h3>
                                <p className="font-serif italic text-xl text-magic-bg/70 leading-relaxed">「{currentPersona.description}」</p>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
                            className="btn-magic bg-magic-primary text-xl border-4"
                        >
                            <Settings2 size={24} className="inline-block mr-2" /> 重塑身份
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENT AREA */}
            {viewMode === 'adventure' ? (
                <div className="space-y-12">
                    {CHAPTERS.map((chapter, ci) => {
                        const items = chapter.articleIds.map(id => INSIGHTS_LIST.find(i => i.id === id)).filter(Boolean);
                        const isDone = items.every(i => completedIds.includes(i!.id));
                        const isLocked = ci > 0 && !CHAPTERS[ci-1].articleIds.every(id => completedIds.includes(id));
                        return (
                            <ChapterNode key={chapter.id} chapter={chapter} items={items} completedIds={completedIds} isLocked={isLocked} isComplete={isDone} isExpanded={expandedChapters.has(chapter.id)} onToggle={() => toggleChapter(chapter.id)} index={ci} />
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-24">
                    <div className="flex items-center gap-4 overflow-x-auto pb-8 scrollbar-hide border-b-4 border-magic-text/10">
                        <Filter size={32} className="text-magic-text mr-4 flex-shrink-0" />
                        {availableCategories.map(cat => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)}
                                className={`flex-shrink-0 px-10 py-4 font-display text-xl border-4 border-magic-text transition-all ${selectedCategory === cat ? 'bg-magic-text text-magic-bg shadow-brutalist-sm translate-y-1' : 'bg-magic-bg text-magic-text hover:bg-magic-primary hover:shadow-brutalist-sm'}`}>{cat}</button>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredInsights.map((item, i) => (
                            <InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} />
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Insights;
