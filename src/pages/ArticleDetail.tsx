import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Lock, Sparkles } from 'lucide-react';
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
    const [isTreasureUnlocking, setIsTreasureUnlocking] = useState(false);
    const treasureRef = useRef<HTMLDivElement>(null);

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
        }
        setQuizAnswer(null);
        setQuizSubmitted(false);
        setBadgeEarned(false);
        setCopied(false);
        setIsTreasureUnlocking(false);
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
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 }, colors: ['#10b981', '#34d399', '#6ee7b7'] });
        setTimeout(() => setCopied(false), 3000);
    };

    const handleStepComplete = (idx: number) => {
        const updated = [...stepsCompleted];
        updated[idx] = true;
        setStepsCompleted(updated);
        
        if (idx < (article?.steps?.length || 0) - 1) {
            setCurrentStep(idx + 1);
        }

        if (updated.every(Boolean)) {
            setIsTreasureUnlocking(true);
            setTimeout(() => {
                treasureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // 震動特效後的重力掉落感
                setTimeout(() => {
                    confetti({ 
                        particleCount: 200, 
                        spread: 100, 
                        origin: { y: 0.6 },
                        colors: ['#fbbf24', '#f59e0b', '#10b981', '#ffffff'] 
                    });
                }, 500);
            }, 800);
        }
    };

    const handleQuizSubmit = () => {
        if (quizAnswer === null) return;
        setQuizSubmitted(true);
        if (quizAnswer === article?.quiz?.answer) {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
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

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-sm">LOADING...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">404</div>;

    const theme = getColorClasses(article.themeColor || article.theme_color || 'emerald');
    const isNews = article.category === 'AI 新聞';
    const nextArticle = INSIGHTS.find(i => i.id !== article.id && i.difficulty_level >= (article.difficulty_level || 1)) || INSIGHTS[0];
    const hasSteps = article.steps && article.steps.length > 0;
    const hasQuiz = article.quiz;
    const allStepsDone = stepsCompleted.length > 0 && stepsCompleted.every(Boolean);

    return (
        <motion.div 
            animate={isTreasureUnlocking && !allStepsDone ? { x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0] } : {}}
            transition={{ duration: 0.1, repeat: 10 }}
        >
            <motion.div
                className="fixed top-20 left-0 right-0 h-1 z-50 origin-left"
                style={{ scaleX: progress, background: 'linear-gradient(90deg, #6b7280, #10b981)' }}
            />

            <section className="min-h-[85vh] flex flex-col justify-center items-center px-6 pt-28 pb-12 relative text-left">
                <SEO title={article.title} description={article.summary || article.pain_point || ''} path={`/insights/${article.id}`} />
                <Link to={isNews ? "/news" : "/insights"} className="absolute top-24 left-6 inline-flex items-center gap-2 text-zinc-600 hover:text-white transition-colors text-xs font-medium z-10">
                    <ArrowLeft size={14} /> 返回
                </Link>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
                    <span className={`${theme.text} text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block`}>{article.category} · {article.readTime}</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">{article.title}</h1>
                    {article.pain_point && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mx-auto">
                            {article.pain_point}
                        </motion.p>
                    )}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="absolute bottom-8 flex flex-col items-center gap-2 text-zinc-600">
                    <span className="text-[10px] uppercase tracking-widest">往下滑</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ChevronDown size={20} /></motion.div>
                </motion.div>
            </section>

            {!isNews && article.example && (
                <section className="min-h-[60vh] flex items-center px-5 md:px-6 py-16 text-left">
                    <motion.div {...fadeUp} className="max-w-3xl mx-auto w-full">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-6 text-center font-bold">以前 vs 現在</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-red-500/5 border border-red-500/15 rounded-2xl p-6 md:p-8">
                                <div className="text-red-400 text-3xl mb-3">❌</div>
                                <p className="text-red-300 font-bold text-sm mb-2">以前的你</p>
                                <p className="text-zinc-400 text-sm leading-relaxed">{article.example.wrong}</p>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-6 md:p-8">
                                <div className="text-emerald-400 text-3xl mb-3">✅</div>
                                <p className="text-emerald-300 font-bold text-sm mb-2">學完之後的你</p>
                                <p className="text-zinc-300 text-sm leading-relaxed">{article.example.right}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            )}

            {hasSteps && (
                <section className="py-16 px-5 md:px-6 text-left">
                    <motion.div {...fadeUp} className="max-w-2xl mx-auto">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-8 text-center font-bold">一步一步來</p>
                        <div className="space-y-4">
                            {article.steps.map((step: any, idx: number) => {
                                const isActive = idx <= currentStep;
                                const isDone = stepsCompleted[idx];
                                return (
                                    <motion.div
                                        key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 ${isDone ? `${theme.bg} ${theme.border} shadow-lg ${theme.glow}` : isActive ? 'bg-white/5 border-white/15' : 'bg-white/[0.02] border-white/5 opacity-40'}`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${isDone ? `${theme.solid} text-white` : 'bg-white/10 text-zinc-400'}`}>{isDone ? '✓' : idx + 1}</div>
                                            <div className="flex-1">
                                                <p className="text-white font-bold mb-1">{step.title}</p>
                                                <p className="text-zinc-400 text-sm leading-relaxed mb-3">{step.body}</p>
                                                {step.dee_tip && <p className={`text-xs ${theme.lightText} italic mb-3`}>💡 {step.dee_tip}</p>}
                                                {isActive && !isDone && (
                                                    <motion.button
                                                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleStepComplete(idx)}
                                                        className={`text-xs font-bold px-4 py-2 rounded-full ${theme.bg} ${theme.lightText} border ${theme.border} hover:brightness-125 transition-all`}
                                                    >
                                                        我了解了 ✓
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </section>
            )}

            {!isNews && article.practice_kit && (
                <section className="py-24 px-5 md:px-6 scroll-mt-32 text-left overflow-hidden" ref={treasureRef}>
                    <AnimatePresence>
                        {allStepsDone ? (
                            <motion.div
                                key="treasure-chest"
                                initial={{ opacity: 0, scale: 0.2, y: -200, rotate: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 400, 
                                    damping: 15,
                                    mass: 1.5,
                                    duration: 0.8
                                }}
                                className="max-w-2xl mx-auto relative"
                            >
                                <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute -inset-8 bg-emerald-500/20 blur-3xl rounded-full z-0"
                                />
                                
                                <p className="text-[10px] text-emerald-400 uppercase tracking-[0.5em] mb-8 text-center font-black drop-shadow-glow">🎁 寶物正式掉落！</p>

                                <div className={`bg-zinc-950 border-4 ${theme.border} rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)] border-emerald-500/40 z-10`}>
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <motion.div 
                                                animate={{ 
                                                    scale: [1, 1.2, 1],
                                                    rotate: [0, -10, 10, -10, 10, 0]
                                                }}
                                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                                className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-4xl"
                                            >
                                                ✨
                                            </motion.div>
                                            <div>
                                                <h3 className="text-2xl md:text-3xl font-black text-white mb-1 uppercase tracking-tight">{article.practice_kit.title}</h3>
                                                <div className="flex items-center gap-2">
                                                    <Sparkles size={14} className="text-emerald-400" />
                                                    <p className="text-zinc-400 text-sm font-medium">{article.practice_kit.description}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative group mb-8">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                            <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-8 font-mono text-sm md:text-base leading-loose text-emerald-300 whitespace-pre-wrap shadow-inner">
                                                {article.practice_kit.command}
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleCopy(article.practice_kit.command)}
                                            className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-lg transition-all ${copied ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.4)]' : 'bg-emerald-500 text-black shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.4)]'}`}
                                        >
                                            {copied ? <><Check size={24} strokeWidth={3} /> 已存入剪貼簿</> : <><Copy size={24} /> 領取指令寶物</>}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="max-w-2xl mx-auto py-20 border-4 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-zinc-800 transition-all">
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                    <Lock size={60} className="mb-6 opacity-10" />
                                </motion.div>
                                <p className="text-sm font-black uppercase tracking-[0.4em] opacity-20">完成修煉以解鎖寶物</p>
                            </div>
                        )}
                    </AnimatePresence>
                </section>
            )}

            {!hasSteps && article.content && (
                <section className="py-16 px-5 md:px-6 text-left">
                    <motion.article {...fadeUp} className="article-content prose prose-invert max-w-3xl mx-auto leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: article.content }} />
                </section>
            )}

            {!isNews && (article.scenario || article.solution) && (
                <section className="py-12 px-5 md:px-6 text-left">
                    <motion.div {...fadeUp} className={`max-w-2xl mx-auto bg-gradient-to-br ${theme.gradient} border ${theme.border} rounded-2xl p-6 md:p-8`}>
                        {article.scenario && <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: article.scenario }} />}
                        {article.solution && <p className={`${theme.lightText} text-sm font-medium leading-relaxed`} dangerouslySetInnerHTML={{ __html: article.solution }} />}
                    </motion.div>
                </section>
            )}

            {article.insight_quote && (
                <section className="py-12 px-5 md:px-6 text-center">
                    <motion.p {...fadeUp} className="text-lg md:text-xl text-zinc-300 text-center max-w-xl mx-auto leading-relaxed italic font-serif">「{article.insight_quote}」</motion.p>
                </section>
            )}

            {hasQuiz && (
                <section className="py-16 px-5 md:px-6 text-left">
                    <motion.div {...fadeUp} className="max-w-2xl mx-auto">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-6 text-center font-bold">⚔️ 最終挑戰</p>
                        <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
                            <p className="text-white font-bold text-xl mb-8 leading-tight">{article.quiz.question}</p>
                            <div className="space-y-4 mb-8">
                                {article.quiz.options.map((opt: string, idx: number) => {
                                    const isSelected = quizAnswer === idx;
                                    const isCorrect = idx === article.quiz.answer;
                                    const showResult = quizSubmitted;
                                    return (
                                        <motion.button
                                            key={idx} whileTap={!quizSubmitted ? { scale: 0.98 } : {}} onClick={() => !quizSubmitted && setQuizAnswer(idx)}
                                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all text-sm md:text-base font-medium ${showResult && isCorrect ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : showResult && isSelected && !isCorrect ? 'bg-red-500/10 border-red-500/50 text-red-400' : isSelected ? 'bg-white/10 border-white/20 text-white' : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:bg-white/5'}`}
                                            disabled={quizSubmitted}
                                        >
                                            <span className="font-mono text-xs mr-4 opacity-40">{String.fromCharCode(65 + idx)}</span>
                                            {opt}
                                        </motion.button>
                                    );
                                })}
                            </div>
                            {!quizSubmitted ? (
                                <motion.button
                                    whileTap={{ scale: 0.95 }} onClick={handleQuizSubmit} disabled={quizAnswer === null}
                                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${quizAnswer !== null ? 'bg-white text-black' : 'bg-white/5 text-zinc-700 cursor-not-allowed'}`}
                                >
                                    提交答案
                                </motion.button>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`mt-6 p-6 rounded-2xl border-2 ${quizAnswer === article.quiz.answer ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                                    <p className={`text-base font-black mb-2 ${quizAnswer === article.quiz.answer ? 'text-emerald-400' : 'text-amber-400'}`}>{quizAnswer === article.quiz.answer ? '🎉 完美答對！' : '💡 差一點點！'}</p>
                                    <p className="text-zinc-400 text-sm leading-relaxed font-medium">{article.quiz.explanation}</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </section>
            )}

            <section className="py-24 px-5 md:px-6 text-center">
                <motion.div {...fadeUp} className="max-w-md mx-auto text-center">
                    {!badgeEarned ? (
                        <motion.button
                            whileTap={{ scale: 0.95 }} onClick={handleEarnBadge} disabled={!allStepsDone || (hasQuiz && !quizSubmitted)}
                            className={`bg-emerald-500 text-black font-black py-6 px-12 rounded-[2rem] text-xl shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-105 transition-all disabled:opacity-20 disabled:grayscale`}
                        >
                            🏆 領取學習勳章
                        </motion.button>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 12 }}>
                            <div className="inline-block bg-zinc-900 border-4 border-emerald-500/30 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
                                <motion.p animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-7xl mb-8">🏆</motion.p>
                                <p className="text-emerald-500 font-black text-sm tracking-[0.5em] mb-2 uppercase">Level Complete</p>
                                <p className="text-white text-3xl font-black mb-8 leading-tight">{article.skill_badge || article.title}</p>
                                <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                                    <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-bold">Dee's AI Life Lab · 2026</p>
                                    <div className="flex gap-3">
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

            <section className="pb-32 px-5 md:px-6 text-left">
                <div className="max-w-2xl mx-auto border-t border-white/5 pt-20">
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mb-8">下一關卡預告 →</p>
                    <Link to={`/insights/${nextArticle.id}`} className="group block bg-white/[0.02] border-2 border-white/5 hover:border-emerald-500/30 p-10 rounded-[2.5rem] transition-all shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-[10px] text-emerald-500/60 font-black uppercase tracking-[0.3em] mb-4 block">Next Challenge</span>
                                <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-emerald-400 transition-colors leading-tight">{nextArticle.title}</h3>
                            </div>
                            <ArrowRight className="text-zinc-800 group-hover:text-emerald-400 group-hover:translate-x-4 transition-all flex-shrink-0" size={40} strokeWidth={3} />
                        </div>
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};
export default ArticleDetail;
