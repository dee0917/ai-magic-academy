import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Lock, Sparkles, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';
import SEO from '../components/ui/SEO';

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
    
    // Refs
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const treasureRef = useRef<HTMLDivElement>(null);
    const quizRef = useRef<HTMLDivElement>(null);
    const rewardRef = useRef<HTMLDivElement>(null);
    const firstStepRef = useRef<HTMLDivElement>(null);

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
            setStepsCompleted(new Array(article.steps.length).fill(false));
            setCurrentStep(0);
            stepRefs.current = new Array(article.steps.length).fill(null);
        }
        setQuizAnswer(null);
        setQuizSubmitted(false);
        setBadgeEarned(false);
        setCopied(false);
        setTreasurePhase('locked');
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
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 }, colors: ['#ffffff', '#10b981'] });
        setTimeout(() => setCopied(false), 3000);
    };

    const scrollToFirstStep = () => {
        firstStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleStepComplete = (idx: number) => {
        const updated = [...stepsCompleted];
        updated[idx] = true;
        setStepsCompleted(updated);
        
        if (idx < (article?.steps?.length || 0) - 1) {
            const nextIdx = idx + 1;
            setCurrentStep(nextIdx);
            setTimeout(() => {
                const element = stepRefs.current[nextIdx];
                if (element) {
                    const yOffset = -50; 
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Scroll to treasure area first
            setTimeout(() => {
                const element = treasureRef.current;
                if (element) {
                    const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
                
                // Phase 1: Chest falls from sky
                setTimeout(() => setTreasurePhase('falling'), 500);
                
                // Phase 2: Impact — bounce + screen shake + small burst
                setTimeout(() => {
                    setTreasurePhase('impact');
                    confetti({ particleCount: 40, spread: 30, origin: { y: 0.55 }, colors: ['#fbbf24', '#f59e0b'] });
                }, 1200);
                
                // Phase 3: Explosion — chest shatters + massive confetti
                setTimeout(() => {
                    setTreasurePhase('exploding');
                    confetti({ particleCount: 300, spread: 160, origin: { y: 0.5 }, colors: ['#fbbf24', '#f59e0b', '#10b981', '#ffffff', '#a855f7', '#ec4899'] });
                    // Second wave
                    setTimeout(() => confetti({ particleCount: 150, spread: 120, origin: { y: 0.4, x: 0.3 }, colors: ['#10b981', '#14b8a6', '#fbbf24'] }), 200);
                    setTimeout(() => confetti({ particleCount: 150, spread: 120, origin: { y: 0.4, x: 0.7 }, colors: ['#a855f7', '#ec4899', '#f59e0b'] }), 400);
                }, 1800);
                
                // Phase 4: Content reveals
                setTimeout(() => setTreasurePhase('revealed'), 2600);
            }, 200);
        }
    };

    const handleQuizSubmit = () => {
        if (quizAnswer === null) return;
        setQuizSubmitted(true);
        if (quizAnswer === article?.quiz?.answer) {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
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
            const savedLevel = localStorage.getItem('dee_ai_level');
            const currentLevel = savedLevel ? parseInt(savedLevel) : 1;
            if (article.level >= currentLevel) {
                localStorage.setItem('dee_ai_level', (article.level + 1).toString());
            }
        }
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ['#fbbf24', '#f59e0b', '#d97706'] });
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">SYNCING_DATA...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-bold">404</div>;

    const theme = getColorClasses(article.themeColor || article.theme_color || 'emerald');
    const isNews = article.category === 'AI 新聞';
    const nextArticle = INSIGHTS.find(i => i.id !== article.id && i.difficulty_level >= (article.difficulty_level || 1)) || INSIGHTS[0];
    const hasSteps = article.steps && article.steps.length > 0;
    const hasQuiz = article.quiz;
    const allStepsDone = stepsCompleted.length > 0 && stepsCompleted.every(Boolean);

    return (
        <motion.div 
            animate={treasurePhase === 'impact' ? { x: [-4, 4, -4, 4, -2, 2, 0], y: [-2, 2, -2, 2, -1, 1, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="overflow-x-hidden"
        >
            <motion.div
                className="fixed top-20 left-0 right-0 h-1 z-50 origin-left"
                style={{ scaleX: progress, background: '#10b981' }}
            />

            {/* ═══════════ SECTION 1: THE HOOK ═══════════ */}
            <section className="min-h-[85vh] flex flex-col justify-center items-center px-6 pt-32 pb-12 relative text-center">
                <SEO title={article.title} description={article.summary || article.pain_point || ''} path={`/insights/${article.id}`} />
                <Link to={isNews ? "/news" : "/insights"} className="absolute top-24 left-6 inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest z-10">
                    <ArrowLeft size={14} strokeWidth={3} /> 返回
                </Link>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
                    <span className={`${theme.text} text-[10px] font-black uppercase tracking-[0.4em] mb-4 block`}>{article.category} · {article.readTime}</span>
                    <h1 className="text-3xl md:text-6xl font-black text-white leading-tight mb-10 tracking-tight font-serif">{article.title}</h1>
                    {article.pain_point && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
                             <span className="transition-label">目前的困擾</span>
                             <p className="text-lg md:text-2xl text-zinc-400 leading-relaxed max-w-xl mx-auto font-light">
                                {article.pain_point}
                             </p>
                        </motion.div>
                    )}
                </motion.div>
                
                <motion.button 
                    onClick={scrollToFirstStep}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} 
                    className="absolute bottom-10 flex flex-col items-center gap-3 text-zinc-500 hover:text-emerald-400 transition-colors cursor-pointer group"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">開始修煉</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                        <ChevronDown size={32} strokeWidth={2} />
                    </motion.div>
                </motion.button>
            </section>

            {/* ═══════════ SECTION 2: THE MAGIC ═══════════ */}
            {!isNews && article.example && (
                <section className="min-h-[70vh] flex flex-col justify-center items-center px-5 md:px-6 py-20 text-left">
                    <motion.div {...fadeUp} className="max-w-4xl mx-auto w-full">
                        <div className="text-center mb-16">
                            <span className="transition-label">奇蹟展示</span>
                            <h2 className="text-2xl md:text-4xl font-black text-white text-center justify-center tracking-tight">為什麼一定要學？</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-red-500/5 border border-red-500/10 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group">
                                <div className="text-red-500/10 text-9xl font-black absolute -right-6 -bottom-6 rotate-12">❌</div>
                                <span className="text-red-400 font-black text-[10px] block mb-4 uppercase tracking-[0.3em]">以前的你</span>
                                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed relative z-10">{article.example.wrong}</p>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                                <div className="text-emerald-500/10 text-9xl font-black absolute -right-6 -bottom-6 -rotate-12">✅</div>
                                <span className="text-emerald-400 font-black text-[10px] block mb-4 uppercase tracking-[0.3em]">現在的你</span>
                                <p className="text-white text-lg md:text-xl leading-relaxed font-bold relative z-10">{article.example.right}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* ═══════════ SECTION 3: THE QUEST ═══════════ */}
            {hasSteps && (
                <section className="py-20 px-5 md:px-6 text-left max-w-4xl mx-auto" ref={firstStepRef}>
                    <div className="text-center mb-16">
                        <span className="transition-label">實戰演練</span>
                        <h2 className="text-2xl md:text-4xl font-black text-white text-center justify-center tracking-tight">一步一步跟著做</h2>
                    </div>
                    <div className="space-y-10">
                        {article.steps.map((step: any, idx: number) => {
                            const isDone = stepsCompleted[idx];
                            const isActive = idx === currentStep;
                            const isFuture = idx > currentStep;

                            return (
                                <motion.div
                                    key={idx} ref={el => stepRefs.current[idx] = el}
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    className={`relative rounded-[2.5rem] border p-8 md:p-12 transition-all duration-500 ${isDone ? 'bg-white/[0.02] border-emerald-500/30' : isActive ? 'bg-white/5 border-white/20 shadow-xl' : 'border-white/5 opacity-10 pointer-events-none'}`}
                                >
                                    <div className="flex flex-col md:flex-row items-start gap-8">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-black transition-all duration-500 ${isDone ? 'bg-emerald-500 text-black' : isActive ? 'bg-white text-black' : 'bg-white/5 text-zinc-700'}`}>
                                            {isDone ? '✓' : idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-xl md:text-3xl font-black mb-4 tracking-tight ${isDone ? 'text-emerald-400' : 'text-white'}`}>{step.title}</h3>
                                            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-8">{step.body}</p>
                                            {step.dee_tip && (
                                                <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-2xl mb-8">
                                                    <p className="text-emerald-400 text-base md:text-lg italic font-bold leading-relaxed">💡 Dee's Tip: {step.dee_tip}</p>
                                                </div>
                                            )}
                                            {isActive && !isDone && (
                                                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start gap-4">
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleStepComplete(idx)}
                                                        className="relative group py-4 px-8 rounded-xl bg-emerald-500 text-black font-black text-lg shadow-lg transition-all overflow-hidden"
                                                    >
                                                        <span className="relative z-10 flex items-center gap-3">
                                                            我了解了，下一個 <MousePointer2 size={20} className="animate-bounce" />
                                                        </span>
                                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                                                    </motion.button>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {isFuture && (
                                        <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px] rounded-[2.5rem] flex items-center justify-center pointer-events-none">
                                            <Lock size={40} className="text-white/10" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ═══════════ SECTION 4: THE TREASURE ═══════════ */}
            {!isNews && article.practice_kit && (
                <section className="py-32 px-5 md:px-6 scroll-mt-32 text-left overflow-hidden min-h-screen flex flex-col justify-center items-center relative" ref={treasureRef}>
                    
                    {/* Light beam background — appears during exploding+revealed */}
                    <AnimatePresence>
                        {(treasurePhase === 'exploding' || treasurePhase === 'revealed') && (
                            <motion.div
                                key="light-beam"
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{ opacity: 1, scaleY: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-0 pointer-events-none origin-bottom"
                            >
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-40 md:w-60 h-full bg-gradient-to-t from-emerald-500/20 via-emerald-500/5 to-transparent blur-2xl" />
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 md:w-32 h-full bg-gradient-to-t from-emerald-400/30 via-emerald-400/10 to-transparent blur-xl" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Explosion particles */}
                    <AnimatePresence>
                        {treasurePhase === 'exploding' && (
                            <>
                                {Array.from({ length: 10 }, (_, i) => {
                                    const angle = (i / 10) * Math.PI * 2;
                                    const dist = 120 + Math.random() * 80;
                                    const colors = ['#fbbf24', '#10b981', '#a855f7', '#f43f5e', '#3b82f6', '#f59e0b', '#ec4899', '#14b8a6', '#fff', '#fbbf24'];
                                    return (
                                        <motion.div
                                            key={`particle-${i}`}
                                            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                            animate={{ 
                                                opacity: 0, 
                                                scale: 0,
                                                x: Math.cos(angle) * dist,
                                                y: Math.sin(angle) * dist
                                            }}
                                            transition={{ duration: 0.8, delay: i * 0.03, ease: "easeOut" }}
                                            className="absolute z-30 rounded-full"
                                            style={{ 
                                                width: 8 + Math.random() * 14,
                                                height: 8 + Math.random() * 14,
                                                backgroundColor: colors[i],
                                                boxShadow: `0 0 20px ${colors[i]}`,
                                                top: '50%',
                                                left: '50%',
                                            }}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {/* STATE: LOCKED — ghostly chest waiting */}
                        {treasurePhase === 'locked' && !allStepsDone && (
                            <motion.div key="locked" className="max-w-3xl mx-auto py-32 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-zinc-900 pointer-events-none w-full">
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}><Lock size={80} className="mb-8 opacity-5" /></motion.div>
                                <p className="text-lg font-black uppercase tracking-[0.6em] opacity-10">完成所有步驟以解鎖</p>
                            </motion.div>
                        )}

                        {/* STATE: FALLING — chest drops from sky */}
                        {(treasurePhase === 'falling' || treasurePhase === 'impact') && (
                            <motion.div
                                key="falling-chest"
                                initial={{ y: -400, rotate: -25, scale: 0.6, opacity: 0 }}
                                animate={treasurePhase === 'impact' 
                                    ? { y: 0, rotate: 0, scale: 1, opacity: 1 }
                                    : { y: -50, rotate: -10, scale: 0.9, opacity: 1 }
                                }
                                transition={treasurePhase === 'impact' 
                                    ? { type: "spring", stiffness: 300, damping: 12, mass: 1.2 }
                                    : { duration: 0.5, ease: "easeIn" }
                                }
                                className="relative z-20 flex flex-col items-center"
                            >
                                <motion.div
                                    animate={treasurePhase === 'impact' ? { scale: [1, 1.15, 0.95, 1.05, 1] } : {}}
                                    transition={{ duration: 0.4 }}
                                    className="relative"
                                >
                                    <div className="text-[120px] md:text-[160px] leading-none select-none drop-shadow-2xl">🎁</div>
                                    {treasurePhase === 'impact' && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0.8 }}
                                            animate={{ scale: 3, opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                            className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl"
                                        />
                                    )}
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: treasurePhase === 'impact' ? 1 : 0 }}
                                    className="text-emerald-400 font-black text-2xl mt-6 tracking-widest"
                                >
                                    💥 咚！
                                </motion.p>
                            </motion.div>
                        )}

                        {/* STATE: EXPLODING — chest shatters, transition */}
                        {treasurePhase === 'exploding' && (
                            <motion.div
                                key="exploding"
                                initial={{ scale: 1, opacity: 1 }}
                                animate={{ scale: 0, opacity: 0, rotate: 720 }}
                                transition={{ duration: 0.5, ease: "easeIn" }}
                                className="relative z-20"
                            >
                                <div className="text-[120px] md:text-[160px] leading-none select-none">🎁</div>
                            </motion.div>
                        )}

                        {/* STATE: REVEALED — practice kit content rises */}
                        {treasurePhase === 'revealed' && (
                            <motion.div
                                key="treasure-content"
                                initial={{ opacity: 0, scale: 0.8, y: 60 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="max-w-3xl mx-auto w-full relative z-10"
                            >
                                <div className="absolute -inset-20 bg-emerald-500/10 blur-[100px] rounded-full animate-pulse" />
                                <div className="text-center mb-10 relative z-10">
                                     <motion.span 
                                        initial={{ width: 0 }}
                                        animate={{ width: "auto" }}
                                        className="transition-label !bg-white !text-black !border-white !animate-none px-6 py-2 text-[10px] font-black inline-block overflow-hidden whitespace-nowrap"
                                     >
                                        UNLOCKED / 秘笈已現世
                                     </motion.span>
                                     <h2 className="text-3xl md:text-5xl font-black text-white mt-6 tracking-tight drop-shadow-glow">領取你的指令寶物</h2>
                                </div>
                                <motion.div 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className={`bg-zinc-950 border-2 ${theme.border} rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border-emerald-500/40 z-10`}
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-6 mb-10">
                                            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner">🎁</motion.div>
                                            <div>
                                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">{article.practice_kit.title}</h3>
                                                <p className="text-zinc-400 text-base font-bold">{article.practice_kit.description}</p>
                                            </div>
                                        </div>
                                        <div className="relative group mb-10">
                                            <div className="relative bg-black/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 md:p-10 font-mono text-base md:text-lg leading-relaxed text-emerald-400 whitespace-pre-wrap shadow-inner overflow-x-auto">
                                                {article.practice_kit.command}
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            onClick={() => handleCopy(article.practice_kit.command)}
                                            className={`w-full flex items-center justify-center gap-4 py-6 rounded-2xl font-black text-xl transition-all ${copied ? 'bg-white text-black' : 'bg-emerald-500 text-black btn-glow'}`}
                                        >
                                            {copied ? <><Check size={28} strokeWidth={4} /> 複製成功！</> : <><Copy size={28} strokeWidth={3} /> 領取指令寶物</>}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            )}

            {/* ═══════════ SECTION 5: THE BOSS BATTLE ═══════════ */}
            {hasQuiz && (
                <section className="py-24 px-5 md:px-6 bg-white/[0.01]" ref={quizRef}>
                    <motion.div {...fadeUp} className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="transition-label !bg-amber-500/10 !text-amber-500 !border-amber-500/20">最終考核</span>
                            <h2 className="text-2xl md:text-4xl font-black text-white mt-6 tracking-tight drop-shadow-glow">你真的掌握精髓了嗎？</h2>
                        </div>
                        <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                            <p className="text-white font-black text-lg md:text-2xl mb-12 leading-tight tracking-tight">{article.quiz.question}</p>
                            <div className="space-y-4 mb-12">
                                {article.quiz.options.map((opt: string, idx: number) => {
                                    const isSelected = quizAnswer === idx;
                                    const isCorrect = idx === article.quiz.answer;
                                    const showResult = quizSubmitted;
                                    return (
                                        <motion.button
                                            key={idx} whileTap={!quizSubmitted ? { scale: 0.98 } : {}} onClick={() => !quizSubmitted && setQuizAnswer(idx)}
                                            className={`w-full text-left p-5 md:p-6 rounded-2xl border transition-all text-base md:text-lg font-bold ${showResult && isCorrect ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : showResult && isSelected && !isCorrect ? 'bg-red-500/10 border-red-500/50 text-red-400' : isSelected ? 'bg-white/10 border-white/30 text-white' : 'bg-white/[0.02] border-white/10 text-zinc-500 hover:bg-white/5'}`}
                                            disabled={quizSubmitted}
                                        >
                                            <span className="font-mono text-xs mr-6 opacity-20">{String.fromCharCode(65 + idx)}</span>
                                            {opt}
                                        </motion.button>
                                    );
                                })}
                            </div>
                            {!quizSubmitted ? (
                                <motion.button
                                    whileTap={{ scale: 0.95 }} onClick={handleQuizSubmit} disabled={quizAnswer === null}
                                    className={`w-full py-5 rounded-2xl font-black text-xl transition-all ${quizAnswer !== null ? 'bg-white text-black shadow-2xl' : 'bg-white/5 text-zinc-800 cursor-not-allowed'}`}
                                >
                                    提交考核答案
                                </motion.button>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`mt-8 p-8 rounded-2xl border ${quizAnswer === article.quiz.answer ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                                    <p className={`text-xl md:text-2xl font-black mb-4 ${quizAnswer === article.quiz.answer ? 'text-emerald-400' : 'text-amber-400'}`}>{quizAnswer === article.quiz.answer ? '🎉 完美答對！' : '💡 差一點點！'}</p>
                                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-bold">{article.quiz.explanation}</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </section>
            )}

            {/* ═══════════ SECTION 6: THE REWARD ═══════════ */}
            <section className="py-32 px-5 md:px-6 text-center" ref={rewardRef}>
                <motion.div {...fadeUp} className="max-w-xl mx-auto text-center">
                    {!badgeEarned ? (
                        <motion.button
                            whileTap={{ scale: 0.95 }} onClick={handleEarnBadge} disabled={!allStepsDone || (hasQuiz && !quizSubmitted)}
                            className={`bg-emerald-500 text-black font-black py-8 px-16 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all disabled:opacity-20 disabled:grayscale btn-glow`}
                        >
                            🏆 領取學習勳章
                        </motion.button>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 10 }}>
                            <div className="inline-block bg-zinc-900 border-2 border-emerald-500/40 rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
                                <motion.p animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-8xl mb-10">🏆</motion.p>
                                <p className="text-emerald-500 font-black text-sm tracking-[0.6em] mb-4 uppercase">Mastery Achieved</p>
                                <p className="text-white text-3xl md:text-5xl font-black mb-12 tracking-tight">{article.skill_badge || article.title}</p>
                                <div className="pt-10 border-t border-white/10 flex flex-col items-center gap-6">
                                    <p className="text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-black">Dee's AI Life Lab · 2026</p>
                                    <div className="flex gap-4">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                                        <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {/* 下一篇 */}
            <section className="pb-40 px-5 md:px-6 text-left">
                <div className="max-w-4xl mx-auto border-t border-white/5 pt-24">
                    <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.5em] mb-12">下一場進化挑戰 →</p>
                    <Link to={`/insights/${nextArticle.id}`} className="group block bg-white/[0.03] border border-white/5 hover:border-emerald-500/40 p-10 md:p-16 rounded-[3rem] transition-all shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2">
                        <div className="flex items-center justify-between gap-10">
                            <div>
                                <span className="text-emerald-500/60 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Next Level</span>
                                <h3 className="text-2xl md:text-4xl font-black text-white group-hover:text-emerald-400 transition-colors leading-tight tracking-tight">{nextArticle.title}</h3>
                            </div>
                            <ArrowRight className="text-zinc-800 group-hover:text-emerald-400 group-hover:translate-x-6 transition-all flex-shrink-0" size={60} strokeWidth={4} />
                        </div>
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};
export default ArticleDetail;
