import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Lock, Sparkles, MousePointer2, ExternalLink, Smartphone, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';
import { MAIN_QUEST_ORDER, CHAPTERS, SIDE_QUEST_IDS } from '../data/insights';
import SEO from '../components/ui/SEO';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, ease: "easeOut" }
};

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([]);
    const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [badgeEarned, setBadgeEarned] = useState(false);
    const [treasurePhase, setTreasurePhase] = useState<'locked' | 'falling' | 'impact' | 'exploding' | 'revealed'>('locked');
    const [freeMode, setFreeMode] = useState(false);
    const [rippleStep, setRippleStep] = useState<number | null>(null);
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);
    
    // Refs
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const treasureRef = useRef<HTMLDivElement>(null);
    const quizRef = useRef<HTMLDivElement>(null);
    const rewardRef = useRef<HTMLDivElement>(null);
    const firstStepRef = useRef<HTMLDivElement>(null);
    const hookRef = useRef<HTMLDivElement>(null);

    const getColorClasses = (themeColor: string) => {
        const colors: Record<string, any> = {
            emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', gradient: 'from-emerald-500/20 to-teal-500/10', glow: 'shadow-emerald-500/20', solid: 'bg-emerald-500' },
            yellow: { text: 'text-yellow-500', lightText: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', gradient: 'from-yellow-500/10 to-orange-500/10', glow: 'shadow-yellow-500/20', solid: 'bg-yellow-500' },
            amber: { text: 'text-amber-500', lightText: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', gradient: 'from-amber-500/20 to-yellow-500/10', glow: 'shadow-amber-500/20', solid: 'bg-amber-500' },
            blue: { text: 'text-blue-500', lightText: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', gradient: 'from-blue-500/20 to-indigo-500/10', glow: 'shadow-blue-500/20', solid: 'bg-blue-500' },
            violet: { text: 'text-violet-500', lightText: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', gradient: 'from-violet-500/20 to-purple-500/10', glow: 'shadow-violet-500/20', solid: 'bg-violet-500' },
            rose: { text: 'text-rose-500', lightText: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', gradient: 'from-rose-500/20 to-pink-500/10', glow: 'shadow-rose-500/20', solid: 'bg-rose-500' },
            teal: { text: 'text-teal-500', lightText: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', gradient: 'from-teal-500/20 to-cyan-500/10', glow: 'shadow-teal-500/20', solid: 'bg-teal-500' },
            zinc: { text: 'text-zinc-300', lightText: 'text-zinc-200', bg: 'bg-white/5', border: 'border-white/10', gradient: 'from-white/5 to-zinc-900', glow: 'shadow-white/10', solid: 'bg-zinc-500' }
        };
        return colors[themeColor] || colors.emerald;
    };

    useEffect(() => {
        const handler = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
        };
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => {
        if (id) fetchArticle(parseInt(id));
    }, [id]);

    useEffect(() => {
        if (article?.steps) {
            const isFree = localStorage.getItem('dee_view_preference') === 'free';
            setFreeMode(isFree);
            if (isFree) {
                setStepsCompleted(new Array(article.steps.length).fill(true));
                setCurrentStep(article.steps.length - 1);
                setTreasurePhase('revealed');
            } else {
                setStepsCompleted(new Array(article.steps.length).fill(false));
                setCurrentStep(0);
            }
            stepRefs.current = new Array(article.steps.length).fill(null);
        }
        setQuizAnswer(null);
        setQuizSubmitted(false);
        setBadgeEarned(false);
        setCopied(false);
        setTreasurePhase('locked');
        setShowAiJumpModal(false);
    }, [article?.id, article?.steps?.length]);

    const fetchArticle = async (articleId: number) => {
        setLoading(true);
        const localArticle = INSIGHTS.find(i => i.id === articleId);
        const dbData = await api.getInsightById(articleId);
        if (localArticle) setArticle({ ...dbData, ...localArticle });
        else if (dbData) setArticle(dbData);
        else setArticle(null);
        setLoading(false);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        // Show AI jump modal after copy
        setTimeout(() => setShowAiJumpModal(true), 500);
    };

    const scrollToHook = () => {
        hookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleStepComplete = (idx: number) => {
        const updated = [...stepsCompleted];
        updated[idx] = true;
        setStepsCompleted(updated);
        setRippleStep(idx);
        setTimeout(() => setRippleStep(null), 800);
        
        if (idx < (article?.steps?.length || 0) - 1) {
            const nextIdx = idx + 1;
            setCurrentStep(nextIdx);
            setTimeout(() => {
                const element = stepRefs.current[nextIdx];
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        } else {
            setTimeout(() => {
                const element = treasureRef.current;
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                setTimeout(() => setTreasurePhase('falling'), 500);
                setTimeout(() => {
                    setTreasurePhase('impact');
                    confetti({ particleCount: 40, spread: 30, origin: { y: 0.55 }, colors: ['#fbbf24', '#f59e0b'] });
                }, 1200);
                setTimeout(() => {
                    setTreasurePhase('exploding');
                    confetti({ particleCount: 300, spread: 160, origin: { y: 0.5 }, colors: ['#fbbf24', '#f59e0b', '#10b981', '#ffffff', '#a855f7', '#ec4899'] });
                    setTimeout(() => confetti({ particleCount: 150, spread: 120, origin: { y: 0.4, x: 0.3 }, colors: ['#10b981', '#14b8a6', '#fbbf24'] }), 200);
                    setTimeout(() => confetti({ particleCount: 150, spread: 120, origin: { y: 0.4, x: 0.7 }, colors: ['#a855f7', '#ec4899', '#f59e0b'] }), 400);
                }, 1800);
                setTimeout(() => setTreasurePhase('revealed'), 2600);
            }, 200);
        }
    };

    const [quizStars, setQuizStars] = useState(false);
    const [badgeGlow, setBadgeGlow] = useState(false);

    const handleQuizSubmit = () => {
        if (quizAnswer === null) return;
        setQuizSubmitted(true);
        if (quizAnswer === article?.quiz?.answer) {
            setQuizStars(true);
            setTimeout(() => setQuizStars(false), 1500);
            setTimeout(() => {
                rewardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1000);
        }
    };

    const handleEarnBadge = () => {
        setBadgeEarned(true);
        if (article?.id) {
            const savedCompleted = localStorage.getItem('dee_ai_completed');
            let completed = savedCompleted ? JSON.parse(savedCompleted) : [];
            if (!completed.includes(article.id)) {
                completed.push(article.id);
                localStorage.setItem('dee_ai_completed', JSON.stringify(completed));
            }
            const currentChapter = CHAPTERS.find(c => c.articleIds.includes(article.id));
            if (currentChapter) {
                const chapterArticles = currentChapter.articleIds;
                const allChapterDone = chapterArticles.every((id: number) => completed.includes(id));
                if (allChapterDone) {
                    const nextChapterId = currentChapter.id + 1;
                    const savedLevel = localStorage.getItem('dee_ai_level');
                    const currentLevel = savedLevel ? parseInt(savedLevel) : 1;
                    if (nextChapterId > currentLevel) {
                        localStorage.setItem('dee_ai_level', nextChapterId.toString());
                    }
                }
            }
        }
        setBadgeGlow(true);
        setTimeout(() => setBadgeGlow(false), 3000);
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">SYNCING_DATA...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-bold">404</div>;

    const theme = getColorClasses(article.themeColor || 'emerald');
    const hasSteps = article.steps && article.steps.length > 0;
    const hasQuiz = article.quiz && article.quiz.question;
    const allStepsDone = stepsCompleted.every(s => s === true);

    const mainIndex = MAIN_QUEST_ORDER.indexOf(article.id);
    const isMainQuest = mainIndex !== -1;
    const isSideQuest = SIDE_QUEST_IDS.includes(article.id);
    const nextArticleId = isMainQuest ? MAIN_QUEST_ORDER[mainIndex + 1] : null;
    const nextArticle = nextArticleId ? INSIGHTS.find(i => i.id === nextArticleId) : null;
    const isFinale = isMainQuest && mainIndex === MAIN_QUEST_ORDER.length - 1;

    let nextLabel = "下一篇教學";
    if (nextArticle) {
        const nextChapter = CHAPTERS.find(c => c.articleIds.includes(nextArticle.id));
        const currentChapter = CHAPTERS.find(c => c.articleIds.includes(article.id));
        if (nextChapter && currentChapter && nextChapter.id > currentChapter.id) {
            nextLabel = `🎉 進入新章節：${nextChapter.title}`;
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-emerald-500/30">
            <SEO title={article.title} description={article.summary} path={`/insights/${article.id}`} />
            <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-white/5">
                <motion.div className="h-full bg-emerald-500" style={{ width: `${progress * 100}%` }} />
            </div>

            <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${theme.gradient} opacity-20 pointer-events-none`} />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl w-full text-center relative z-10">
                    <Link to="/insights" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 離開修煉
                    </Link>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest ${theme.bg} ${theme.text} border ${theme.border}`}>{article.category}</span>
                        <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < (article.difficulty_level || 1) ? theme.text : 'text-zinc-800'} fill="currentColor" />)}</div>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">{article.title}</h1>
                    <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">{article.summary}</p>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollToHook}
                        className="bg-white text-black font-black py-5 px-10 rounded-2xl text-lg flex items-center gap-3 mx-auto shadow-2xl hover:bg-emerald-500 transition-colors group">
                        <Gamepad2 size={24} /> 進入挑戰 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </motion.div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20"><ChevronDown size={32} /></div>
            </section>

            <section className="py-32 px-5 md:px-6 bg-zinc-900/30" ref={hookRef}>
                <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-24">
                    <span className="transition-label">痛點切入</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">你也正為了這件事煩惱嗎？</h2>
                    <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed">{article.pain_point}</p>
                </motion.div>

                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
                    <motion.div {...fadeUp} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group">
                        <div className="text-white/5 text-9xl font-black absolute -right-6 -bottom-6 rotate-12">❌</div>
                        <span className="text-zinc-600 font-black text-[10px] block mb-4 uppercase tracking-[0.3em]">過去的你</span>
                        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed relative z-10">{article.example?.wrong}</p>
                    </motion.div>
                    <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-emerald-500/[0.03] border border-emerald-500/20 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                        <div className="text-emerald-500/10 text-9xl font-black absolute -right-6 -bottom-6 -rotate-12">✅</div>
                        <span className="text-emerald-400 font-black text-[10px] block mb-4 uppercase tracking-[0.3em]">現在的你</span>
                        <p className="text-white text-lg md:text-xl leading-relaxed font-bold relative z-10">{article.example?.right}</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-32 px-5 md:px-6 border-y border-white/5 bg-gradient-to-b from-transparent to-zinc-900/50">
                <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
                    <Sparkles className="text-emerald-400 mx-auto mb-8" size={40} />
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight leading-tight">Dee 的解法：{article.title}</h2>
                    <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-medium bg-emerald-500/5 p-8 rounded-3xl border border-emerald-500/10 italic">
                        "{article.solution}"
                    </p>
                </motion.div>
            </section>

            {hasSteps && (
                <section className="py-32 px-5 md:px-6 text-left max-w-4xl mx-auto" ref={firstStepRef}>
                    <div className="text-center mb-24">
                        <span className="transition-label">實戰演練</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">一步一步跟著做</h2>
                    </div>
                    <div className="space-y-12">
                        {article.steps.map((step: any, idx: number) => {
                            const isDone = stepsCompleted[idx];
                            const isActive = freeMode ? !isDone : idx === currentStep;
                            const isFuture = freeMode ? false : idx > currentStep;
                            return (
                                <motion.div key={idx} ref={el => stepRefs.current[idx] = el}
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    className={`relative rounded-[3rem] border p-8 md:p-14 transition-all duration-500 overflow-hidden ${isDone ? 'bg-white/[0.01] border-emerald-500/20' : isActive ? 'bg-zinc-900 border-white/20 shadow-2xl scale-[1.02]' : 'border-white/5 opacity-10 pointer-events-none'}`}>
                                    {rippleStep === idx && (
                                        <>
                                            <motion.div initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}
                                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-emerald-500/20 pointer-events-none z-20" />
                                            <motion.div initial={{ scale: 0, opacity: 0.3 }} animate={{ scale: 3, opacity: 0 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-emerald-400/15 pointer-events-none z-20" />
                                        </>
                                    )}
                                    <div className="flex flex-col md:flex-row items-start gap-10">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-black transition-all duration-500 ${isDone ? 'bg-emerald-500 text-black' : isActive ? 'bg-white text-black' : 'bg-white/5 text-zinc-700'}`}>
                                            {isDone ? '✓' : idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-2xl md:text-4xl font-black mb-6 tracking-tight ${isDone ? 'text-emerald-400' : 'text-white'}`}>{step.title}</h3>
                                            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-10 font-medium">{step.body}</p>
                                            {step.external_links && step.external_links.length > 0 && (
                                                <div className="flex flex-wrap gap-4 mb-10">
                                                    {step.external_links.map((link: any, lidx: number) => (
                                                        <a key={lidx} href={link.url} target="_blank" rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-bold hover:bg-white/20 transition-all">
                                                            {link.label} <ArrowRight size={16} />
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                            {step.dee_tip && (
                                                <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-8 rounded-r-[2rem] mb-10">
                                                    <p className="text-emerald-400 text-lg md:text-xl italic font-black leading-relaxed">💡 Dee's Tip: {step.dee_tip}</p>
                                                </div>
                                            )}
                                            {isActive && !isDone && (
                                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleStepComplete(idx)}
                                                    className="relative group py-5 px-10 rounded-2xl bg-emerald-500 text-black font-black text-xl shadow-xl transition-all overflow-hidden flex items-center gap-3">
                                                    我了解了，下一個 <MousePointer2 size={24} className="animate-bounce" />
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                    {isFuture && (
                                        <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[4px] flex items-center justify-center pointer-events-none">
                                            <Lock size={48} className="text-white/10" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            <section className="py-40 px-5 md:px-6 text-center border-t border-white/5 relative overflow-hidden" ref={treasureRef}>
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} opacity-5 pointer-events-none`} />
                <motion.div {...fadeUp} className="max-w-3xl mx-auto relative z-10">
                    {treasurePhase === 'locked' && (
                        <div className="flex flex-col items-center gap-12 py-20 grayscale opacity-30">
                            <div className="text-9xl">🎁</div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-[0.5em]">Treasure Locked</h2>
                            <p className="text-zinc-500">完成所有步驟以開啟寶箱</p>
                        </div>
                    )}

                    {(treasurePhase === 'falling' || treasurePhase === 'impact') && (
                        <motion.div initial={{ y: -500, rotate: -20 }} animate={{ y: 0, rotate: 0 }} transition={{ type: "spring", damping: 12, stiffness: 100 }} className="text-9xl py-20 relative">
                            🎁
                            <div className="absolute -inset-10 bg-amber-500/20 blur-[100px] rounded-full animate-pulse" />
                        </motion.div>
                    )}

                    {treasurePhase === 'exploding' && (
                        <motion.div animate={{ scale: [1, 1.5, 0], rotate: [0, 10, -10, 0], opacity: [1, 1, 0] }} transition={{ duration: 0.6 }} className="text-9xl py-20">
                            💥
                        </motion.div>
                    )}

                    {treasurePhase === 'revealed' && (
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
                            <div className="bg-zinc-900 border-2 border-emerald-500/30 rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden mb-16">
                                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                                <span className="text-emerald-500 font-black text-sm tracking-[0.8em] mb-10 block uppercase opacity-60">Ready to execute</span>
                                <h2 className="text-3xl md:text-6xl font-black text-white mb-10 tracking-tight leading-tight">{article.practice_kit?.title}</h2>
                                <p className="text-zinc-400 text-xl md:text-2xl mb-12 leading-relaxed">{article.practice_kit?.description}</p>
                                <div className="bg-black/50 border border-white/5 rounded-[2rem] p-8 md:p-12 mb-10 text-left relative group">
                                    <pre className="text-zinc-300 text-base md:text-lg whitespace-pre-wrap font-mono leading-relaxed">{article.practice_kit?.command}</pre>
                                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleCopy(article.practice_kit?.command)}
                                        className={`absolute top-6 right-6 p-4 rounded-xl transition-all ${copied ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                                        {copied ? <Check size={20} /> : <Copy size={20} />}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {hasQuiz && (
                <section className="py-40 px-5 md:px-6 bg-zinc-900/20 border-t border-white/5" ref={quizRef}>
                    <motion.div {...fadeUp} className="max-w-3xl mx-auto">
                        <div className="text-center mb-20">
                            <span className="transition-label">終極考驗</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">驗收你的修行成果</h2>
                        </div>
                        <div className="bg-zinc-900 border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative">
                            <p className="text-2xl md:text-3xl font-black text-white mb-12 leading-tight">{article.quiz.question}</p>
                            <div className="space-y-4">
                                {article.quiz.options.map((opt: string, i: number) => (
                                    <motion.button key={i} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }} disabled={quizSubmitted} onClick={() => setQuizAnswer(i)}
                                        className={`w-full py-6 px-8 rounded-2xl text-left text-lg font-bold transition-all border ${quizAnswer === i ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-lg' : 'border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/20'}`}>
                                        <div className="flex items-center gap-4">
                                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${quizAnswer === i ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>{String.fromCharCode(65 + i)}</span>
                                            {opt}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                            {!quizSubmitted ? (
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleQuizSubmit} disabled={quizAnswer === null}
                                    className="w-full mt-12 py-6 rounded-2xl bg-white text-black font-black text-xl shadow-xl disabled:opacity-20 hover:bg-emerald-500 transition-colors">
                                    確認答案
                                </motion.button>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`mt-12 p-10 rounded-[2rem] border relative overflow-hidden ${quizAnswer === article.quiz.answer ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                                    {quizStars && quizAnswer === article.quiz.answer && (
                                        <div className="absolute inset-0 pointer-events-none">
                                            {Array.from({ length: 12 }, (_, i) => {
                                                const angle = (i / 12) * Math.PI * 2;
                                                const dist = 100 + Math.random() * 80;
                                                return (
                                                    <motion.span key={`star-${i}`} initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0 }} transition={{ duration: 0.8, delay: i * 0.03 }} className="absolute left-1/2 top-1/2 text-2xl">⭐</motion.span>
                                                );
                                            })}
                                        </div>
                                    )}
                                    <p className={`text-2xl md:text-3xl font-black mb-6 ${quizAnswer === article.quiz.answer ? 'text-emerald-400' : 'text-amber-400'}`}>{quizAnswer === article.quiz.answer ? '🎉 完美答對！' : '💡 差一點點！'}</p>
                                    <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-black">{article.quiz.explanation}</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </section>
            )}

            <section className="py-40 px-5 md:px-6 text-center" ref={rewardRef}>
                <motion.div {...fadeUp} className="max-w-xl mx-auto">
                    {!badgeEarned ? (
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleEarnBadge} disabled={!allStepsDone || (hasQuiz && !quizSubmitted)}
                            className="bg-emerald-500 text-black font-black py-8 px-16 rounded-[2rem] text-2xl shadow-2xl hover:scale-105 transition-all disabled:opacity-20 disabled:grayscale btn-glow">
                            🏆 領取修行勳章
                        </motion.button>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 10 }}>
                            <div className="inline-block bg-zinc-900 border-2 border-emerald-500/40 rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
                                {badgeGlow && (
                                    <>
                                        <motion.div initial={{ scale: 0, opacity: 0.6 }} animate={{ scale: 3, opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 m-auto w-32 h-32 rounded-full border-4 border-amber-400 pointer-events-none" />
                                        <motion.div initial={{ scale: 0, opacity: 0.4 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 1.5, delay: 0.3 }} className="absolute inset-0 m-auto w-32 h-32 rounded-full border-4 border-amber-300 pointer-events-none" />
                                    </>
                                )}
                                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]" />
                                <motion.p animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-9xl mb-12">🏆</motion.p>
                                <p className="text-emerald-500 font-black text-sm tracking-[0.8em] mb-6 uppercase opacity-60">Quest Mastered</p>
                                <p className="text-white text-3xl md:text-5xl font-black mb-12 tracking-tight">{article.skill_badge || article.title}</p>
                                <div className="pt-12 border-t border-white/10 flex flex-col items-center gap-8">
                                    <p className="text-zinc-600 text-[11px] uppercase tracking-[0.6em] font-black">Dee's AI Life Lab · 2026</p>
                                    <div className="flex gap-6">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/10" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            <section className="pb-48 px-5 md:px-6 text-left">
                <div className="max-w-4xl mx-auto border-t border-white/10 pt-32">
                    {isFinale ? (
                        <motion.div {...fadeUp} className="text-center py-20 bg-emerald-500/5 rounded-[4rem] border border-emerald-500/10">
                            <div className="text-8xl mb-10">🎓</div>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">恭喜大圓滿！</h2>
                            <p className="text-zinc-400 text-xl md:text-2xl mb-14 max-w-lg mx-auto leading-relaxed font-medium">你已經完成了所有 12 篇主線任務。現在的你，已經具備了駕馭 AI 的核心靈魂。</p>
                            <Link to="/insights" className="inline-flex items-center gap-4 bg-emerald-500 text-black font-black py-6 px-12 rounded-[2rem] text-2xl hover:bg-emerald-400 transition-all shadow-2xl">
                                🗺️ 探索更多支線
                            </Link>
                        </motion.div>
                    ) : nextArticle ? (
                        <>
                            <p className="text-zinc-600 text-xs font-black uppercase tracking-[0.5em] mb-6">{nextLabel}</p>
                            <Link to={`/insights/${nextArticle.id}`} className="group block bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 p-12 md:p-20 rounded-[4rem] transition-all shadow-2xl hover:-translate-y-2">
                                <div className="flex items-center justify-between gap-12">
                                    <div>
                                        <span className="text-emerald-500/60 font-black text-xs uppercase tracking-[0.4em] mb-8 block">{isMainQuest ? `STAGE ${mainIndex + 2} / 12` : 'NEXT LEVEL'}</span>
                                        <h3 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">{nextArticle.title}</h3>
                                        <p className="text-zinc-500 text-lg md:text-xl line-clamp-2 max-w-2xl font-medium">{nextArticle.summary}</p>
                                    </div>
                                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all flex-shrink-0 shadow-lg">
                                        <ArrowRight size={40} />
                                    </div>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <Link to="/insights" className="inline-flex items-center gap-3 text-emerald-500 font-black text-xl hover:underline group">
                                <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" /> 返回冒險地圖
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-zinc-900 border border-white/10 p-10 md:p-14 rounded-[3rem] max-w-2xl w-full shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                            <button onClick={() => setShowAiJumpModal(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"><X size={32} /></button>
                            
                            <div className="text-center mb-12">
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                    <Smartphone className="text-emerald-400" size={40} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">指令已複製！</h3>
                                <p className="text-zinc-400 text-lg">選一個 AI 工具直接貼上開始對話：</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { name: 'ChatGPT', logo: ChatGPTLogo, app: 'chatgpt://', web: 'https://chat.openai.com', color: 'hover:bg-[#10a37f]/10 hover:border-[#10a37f]/30' },
                                    { name: 'Claude', logo: ClaudeLogo, app: 'claude://', web: 'https://claude.ai', color: 'hover:bg-[#D97757]/10 hover:border-[#D97757]/30' },
                                    { name: 'Gemini', logo: GeminiLogo, app: 'googleapp://', web: 'https://gemini.google.com', color: 'hover:bg-[#1C7DEB]/10 hover:border-[#1C7DEB]/30' }
                                ].map((ai, i) => (
                                    <a key={i} href={ai.web} target="_blank" rel="noopener noreferrer" onClick={() => {
                                        const timer = setTimeout(() => { window.location.href = ai.web; }, 500);
                                        window.location.href = ai.app;
                                        clearTimeout(timer);
                                        setShowAiJumpModal(false);
                                    }} className={`flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 transition-all group ${ai.color}`}>
                                        <ai.logo size={48} />
                                        <span className="text-white font-black text-lg">{ai.name}</span>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Open App</span>
                                    </a>
                                ))}
                            </div>
                            
                            <p className="mt-12 text-center text-zinc-600 text-xs font-medium italic">提示：如果手機已安裝 App 會自動開啟，否則將開啟網頁版</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const X = ({ size, className }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const Star = ({ size, className, fill }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

export default ArticleDetail;
