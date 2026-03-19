import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    ArrowLeft, ArrowRight, Copy, Check, ChevronDown, Sparkles, 
    MousePointer2, X, Target, Send, Flame, BrainCircuit, Star, Scroll, Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';
import SEO from '../components/ui/SEO';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';
import { useIdentity } from '../context/IdentityContext';
import { judgeUserResponse } from '../lib/khojJudge';
import DifficultyStars from '../components/ui/DifficultyStars';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([]);
    const [badgeEarned, setBadgeEarned] = useState(false);
    const [treasurePhase, setTreasurePhase] = useState<'locked' | 'falling' | 'impact' | 'exploding' | 'revealed'>('locked');
    const [showAiJumpModal, setShowAiJumpModal] = useState(false);
    
    // 🎮 Practice Mode State
    const [isPracticeMode, setIsPracticeMode] = useState(false);
    const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
    const [userInput, setUserInput] = useState('');
    const [practiceStep, setPracticeStep] = useState(0);
    const [failCount, setFailCount] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [isJudging, setIsJudging] = useState(false);
    const [currentHint, setCurrentHint] = useState('');
    const [previousResponses, setPreviousResponses] = useState<string[]>([]);

    // Refs
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const treasureRef = useRef<HTMLDivElement>(null);
    const hookRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isPracticeMode) scrollToBottom();
    }, [messages, isJudging]);

    useEffect(() => {
        if (id) fetchArticle(parseInt(id));
    }, [id]);

    const fetchArticle = async (articleId: number) => {
        try {
            setLoading(true);
            const localArticle = INSIGHTS.find(i => i.id === articleId);
            const dbData = await api.getInsightById(articleId);
            const finalData = localArticle ? { ...dbData, ...localArticle } : dbData;
            setArticle(finalData);
            
            setMessages([
                { 
                    role: 'ai', 
                    text: `我是您的 AI 助教。本關修行目標：\n「${finalData.practice_kit?.title}」\n\n具體任務：${finalData.practice_kit?.description}\n\n這關需要獲得我兩次的認可。請告訴我，您的第一步實體操作會是什麼？（例如：我會先開啟...）` 
                }
            ]);

            if (finalData.steps) {
                setStepsCompleted(new Array(finalData.steps.length).fill(false));
            }
        } catch (e) {
            setArticle(null);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        if (!userInput.trim() || isJudging) return;
        
        const text = userInput;
        const newMessages = [...messages, { role: 'user', text }];
        setMessages(newMessages as any);
        setUserInput('');
        setIsJudging(true);
        
        try {
            const historyContext = previousResponses.slice(-3).join('|');
            const result = await judgeUserResponse(
                article?.title || '', 
                text, 
                `${article?.practice_kit?.description} (歷史紀錄：${historyContext})`
            );
            
            setMessages(prev => [...prev, { role: 'ai', text: result.feedback }] as any);
            setPreviousResponses(prev => [...prev, result.feedback]);
            
            if (result.passed) {
                const nextStepCount = practiceStep + 1;
                setPracticeStep(nextStepCount);
                setFailCount(0);
                setShowHint(false);
                
                if (nextStepCount < 2) {
                    setTimeout(() => {
                        setMessages(prev => [...prev, { 
                            role: 'ai', 
                            text: `✨ 第一階段認可達成！\n\n【下一步引導】：現在你已經知道如何開始了，請接著說明：你會如何下達具體的『咒語指令』來完成任務？（你可以參考右側任務手冊中的提示喔！）` 
                        }] as any);
                    }, 800);
                } else {
                    triggerSuccess();
                }
            } else {
                setFailCount(prev => prev + 1);
                if (result.hint) setCurrentHint(result.hint);
                if (failCount >= 0) setShowHint(true);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: "魔力連線不穩，請再次詠唱。" }] as any);
        } finally {
            setIsJudging(false);
        }
    };

    const triggerSuccess = () => {
        setTreasurePhase('falling');
        setTimeout(() => {
            setTreasurePhase('impact');
            confetti({ particleCount: 60, spread: 45, origin: { y: 0.6 }, colors: ['#E8A838', '#2A2723'] });
        }, 800);
        setTimeout(() => {
            setTreasurePhase('exploding');
            confetti({ particleCount: 250, spread: 160, origin: { y: 0.5 }, colors: ['#8B2626', '#E8A838', '#1A5C5A'] });
        }, 1500);
        setTimeout(() => {
            setTreasurePhase('revealed');
            treasureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 2200);

        setMessages(prev => [...prev, { 
            role: 'ai', 
            text: `🎉 恭喜！修行大圓滿！\n\n我已經幫您開啟了下方的【咒語寶箱】。這是您應得的秘術，請領取後繼續點擊底部的【修行印章】來完成本卷軸。` 
        }] as any);
    };

    const handleClaimCommand = () => {
        if (article?.practice_kit?.command) {
            navigator.clipboard.writeText(article.practice_kit.command);
            setShowAiJumpModal(true);
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
        }
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
                    const rect = element.getBoundingClientRect();
                    const middle = rect.top + window.pageYOffset - (window.innerHeight / 2) + (rect.height / 2);
                    window.scrollTo({ top: middle, behavior: 'smooth' });
                }
            }, 300);
        } else {
            setTreasurePhase('revealed');
            setTimeout(() => {
                treasureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 200);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-magic-bg parchment-texture flex items-center justify-center">
            <div className="text-center space-y-8">
                <div className="text-9xl animate-spin halftone-loading rounded-full p-8">🔮</div>
                <h2 className="text-4xl font-display text-magic-text animate-pulse tracking-[0.5em]">秘笈展開中...</h2>
            </div>
        </div>
    );

    if (!article) return <div className="min-h-screen bg-magic-bg flex items-center justify-center font-display text-4xl">404 NOT FOUND</div>;

    const hasSteps = article.steps && article.steps.length > 0;

    return (
        <div className="min-h-screen bg-magic-bg text-magic-text parchment-texture">
            <SEO title={article.title} description={article.summary} path={`/insights/${article.id}`} />
            
            {/* HERO - 復古滿版海報風格 */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-32 border-b-6 border-magic-text">
                <div className="absolute inset-0 bg-magic-teal opacity-10 halftone-loading" />
                
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl w-full text-center relative z-10">
                    <Link to="/insights" className="inline-flex items-center gap-4 bg-magic-text text-magic-bg px-6 py-2 border-4 border-magic-text shadow-brutalist mb-16 font-display text-xs tracking-widest hover:bg-magic-red transition-all">
                        <ArrowLeft size={16} strokeWidth={3} /> 返回圖書館
                    </Link>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className="badge-magic text-sm px-6 py-2">{article.category}</span>
                        <DifficultyStars level={article.difficulty_level || 1} />
                    </div>

                    <h1 className="text-6xl md:text-9xl font-display text-magic-text mb-16 tracking-tighter leading-[0.8]">
                        {article.title}
                    </h1>
                    
                    <div className="flex items-center justify-center gap-0 bg-magic-text p-1 shadow-brutalist w-fit mx-auto mb-20">
                        <button onClick={() => setIsPracticeMode(false)} 
                            className={`px-10 py-4 font-display text-xl transition-all ${!isPracticeMode ? 'bg-magic-primary text-magic-text' : 'text-magic-bg/40 hover:text-magic-bg'}`}>
                            研讀秘笈
                        </button>
                        <button onClick={() => setIsPracticeMode(true)} 
                            className={`px-10 py-4 font-display text-xl transition-all ${isPracticeMode ? 'bg-magic-primary text-magic-text' : 'text-magic-bg/40 hover:text-magic-bg'} flex items-center gap-3`}>
                            <Flame size={20} /> 實戰詠唱
                        </button>
                    </div>

                    {isPracticeMode ? (
                        <div className="w-full max-w-3xl mx-auto bg-magic-bg border-6 border-magic-text shadow-[16px_16px_0px_#2A2723] relative overflow-hidden">
                            <div className="bg-magic-text p-6 flex items-center justify-between">
                                <div className="flex items-center gap-6 text-left">
                                    <div className="w-12 h-12 bg-magic-primary border-2 border-magic-bg flex items-center justify-center text-magic-text">
                                        <BrainCircuit size={24} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-magic-bg/50 uppercase tracking-[0.3em] block mb-1">判官審核中</span>
                                        <h4 className="text-magic-bg font-display text-lg tracking-widest uppercase">修煉進度 ({practiceStep}/2)</h4>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {[...Array(2)].map((_, i) => (
                                        <div key={i} className={`w-4 h-4 border-2 border-magic-bg ${i < practiceStep ? 'bg-magic-primary' : 'bg-transparent'}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="h-[450px] overflow-y-auto p-10 space-y-10 text-left bg-zinc-900/5 parchment-texture">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-[85%] p-8 border-4 border-magic-text text-lg leading-relaxed shadow-brutalist-sm ${
                                            m.role === 'ai' ? 'bg-magic-bg text-magic-text' : 'bg-magic-teal text-magic-bg'
                                        }`}>
                                            {m.text.split('\n').map((line, li) => <p key={li} className="mb-4 last:mb-0 font-serif">{line}</p>)}
                                        </div>
                                    </div>
                                ))}
                                {isJudging && (
                                    <div className="flex justify-start">
                                        <div className="bg-magic-text text-magic-bg p-4 flex items-center gap-4 shadow-brutalist-sm">
                                            <div className="animate-pulse font-display text-xs">COMMUNING WITH SPIRITS...</div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            <AnimatePresence>
                                {showHint && (
                                    <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="bg-magic-red text-magic-bg p-6 border-t-4 border-magic-text flex items-start gap-4">
                                        <Lightbulb className="flex-shrink-0" size={24} />
                                        <p className="text-sm font-black italic">{currentHint}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="p-8 bg-magic-primary border-t-4 border-magic-text">
                                <div className="flex gap-4">
                                    <textarea 
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="請描述您的修行策略..."
                                        className="flex-1 bg-magic-bg border-4 border-magic-text p-6 text-xl font-serif outline-none focus:bg-white transition-colors h-32 resize-none"
                                    />
                                    <button onClick={handleSendMessage} disabled={!userInput.trim() || isJudging}
                                        className="btn-magic bg-magic-red text-magic-bg flex items-center justify-center w-24">
                                        <Send size={32} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto">
                            <p className="text-3xl md:text-4xl text-magic-text/80 font-serif italic mb-20 leading-snug">
                                "{article.summary}"
                            </p>
                            <button onClick={() => hookRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-magic bg-magic-text text-magic-bg text-3xl px-16 py-8">
                                翻開第一章
                            </button>
                        </div>
                    )}
                </motion.div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-magic-text opacity-40"><ChevronDown size={64} /></div>
            </section>

            {/* CONTENT - 左右對開海報設計 */}
            <section className="relative min-h-screen py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 border-6 border-magic-text shadow-[24px_24px_0px_#2A2723]">
                    
                    {/* 左側：痛點與視覺 */}
                    <div className="bg-magic-teal p-12 md:p-24 text-magic-bg border-b-6 lg:border-b-0 lg:border-r-6 border-magic-text" ref={hookRef}>
                        <motion.div {...fadeUp} className="space-y-12">
                            <span className="bg-magic-bg text-magic-teal px-6 py-2 border-4 border-magic-text font-display text-lg shadow-brutalist-sm inline-block">HISTORY</span>
                            <h2 className="text-5xl md:text-7xl font-display tracking-tight leading-none italic">
                                修行之始：<br />打破現狀的枷鎖
                            </h2>
                            <p className="text-2xl font-serif leading-relaxed text-magic-bg/80 border-l-8 border-magic-primary pl-8 italic">
                                {article.pain_point}
                            </p>
                            
                            <div className="pt-12 space-y-8">
                                <div className="bg-magic-red/20 border-4 border-magic-red p-8 shadow-brutalist-sm">
                                    <div className="text-4xl mb-4 text-magic-red font-display">THE WRONG WAY</div>
                                    <p className="text-xl font-serif">{article.example?.wrong}</p>
                                </div>
                                <div className="bg-magic-bg/10 border-4 border-magic-bg p-8">
                                    <div className="text-4xl mb-4 text-magic-primary font-display">THE RIGHT WAY</div>
                                    <p className="text-xl font-serif font-black">{article.example?.right}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 右側：修煉步驟與任務手冊 */}
                    <div className="bg-magic-bg p-12 md:p-24 space-y-16">
                        <div className="text-left mb-16">
                            <span className="bg-magic-primary text-magic-text px-6 py-2 border-4 border-magic-text font-display text-lg shadow-brutalist-sm inline-block mb-8">SCROLL STEPS</span>
                            <h2 className="text-5xl md:text-6xl font-display text-magic-text tracking-tighter">詠唱路徑圖</h2>
                        </div>

                        {hasSteps && (
                            <div className="space-y-8">
                                {article.steps.map((step: any, idx: number) => {
                                    const isDone = stepsCompleted[idx];
                                    const isActive = idx === currentStep;
                                    return (
                                        <motion.div key={idx} ref={el => stepRefs.current[idx] = el}
                                            className={`p-10 border-4 border-magic-text transition-all ${isDone ? 'bg-magic-teal/10' : isActive ? 'bg-magic-primary shadow-brutalist scale-[1.02]' : 'opacity-20 grayscale'}`}>
                                            <div className="flex gap-8">
                                                <div className={`w-16 h-16 border-4 border-magic-text flex items-center justify-center text-3xl font-display flex-shrink-0 ${isDone ? 'bg-magic-teal text-magic-bg' : 'bg-magic-text text-magic-bg'}`}>
                                                    {isDone ? '✓' : idx + 1}
                                                </div>
                                                <div className="space-y-6">
                                                    <h3 className="text-3xl font-display text-magic-text leading-tight">{step.title}</h3>
                                                    <p className="text-xl font-serif leading-relaxed">{step.body}</p>
                                                    {isActive && !isDone && (
                                                        <button onClick={() => handleStepComplete(idx)}
                                                            className="btn-magic bg-magic-text text-magic-bg text-lg flex items-center gap-3">
                                                            我已領悟 <MousePointer2 size={24} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}

                        {/* 任務手冊區塊 */}
                        <div className="mt-24 bg-magic-text text-magic-bg p-12 border-4 border-magic-text shadow-brutalist relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 halftone-loading w-40 h-40 opacity-10" />
                            <h3 className="text-4xl font-display mb-10 flex items-center gap-4">
                                <Target size={32} className="text-magic-primary" /> 當前修行任務
                            </h3>
                            <div className="space-y-8">
                                <div className="border-l-4 border-magic-primary pl-8">
                                    <span className="text-magic-primary font-display text-xs tracking-widest block mb-4 uppercase">Target Objective</span>
                                    <p className="text-2xl font-serif italic">「{article.practice_kit?.description}」</p>
                                </div>
                                
                                <div className={`pt-12 border-t border-magic-bg/20 text-center ${treasurePhase === 'revealed' ? 'opacity-100' : 'opacity-30'}`} ref={treasureRef}>
                                    <AnimatePresence mode="wait">
                                        {treasurePhase === 'locked' && (
                                            <div className="space-y-6 flex flex-col items-center">
                                                <div className="text-9xl grayscale">🔒</div>
                                                <p className="font-display text-sm tracking-widest text-magic-bg/40 uppercase">請先通過助教邏輯判定</p>
                                            </div>
                                        )}
                                        {treasurePhase === 'revealed' && (
                                            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-8 flex flex-col items-center w-full">
                                                <div className="text-9xl drop-shadow-[0_0_30px_rgba(232,168,56,0.5)]">🔓</div>
                                                <button onClick={handleClaimCommand} className="btn-magic w-full py-8 text-2xl">
                                                    領取修行寶箱
                                                </button>
                                            </motion.div>
                                        )}
                                        {(['falling', 'impact', 'exploding'].includes(treasurePhase)) && (
                                            <div className="text-9xl">🎁</div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BADGE SECTION - 勳章領取 */}
            <section className="py-60 px-6 text-center border-t-6 border-magic-text relative overflow-hidden">
                <div className="absolute inset-0 bg-magic-teal/5 halftone-loading" />
                <motion.div {...fadeUp} className="max-w-2xl mx-auto relative z-10">
                    {badgeEarned ? (
                        <div className="bg-magic-bg border-6 border-magic-text p-20 shadow-[32px_32px_0px_#1A5C5A] relative">
                            <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="text-[12rem] mb-12">🏆</motion.div>
                            <p className="font-display text-2xl text-magic-teal tracking-[0.8em] mb-8 uppercase">QUEST MASTERED</p>
                            <h2 className="text-5xl md:text-7xl font-display text-magic-text leading-tight">{article.skill_badge || article.title}</h2>
                            <div className="mt-16 pt-8 border-t-4 border-magic-text/10">
                                <Link to="/insights" className="text-magic-red font-display text-2xl hover:underline underline-offset-8">
                                    繼續下一段冒險 →
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <button onClick={handleEarnBadge} disabled={treasurePhase !== 'revealed'}
                            className="btn-magic-red text-5xl px-20 py-10 shadow-[24px_24px_0px_#2A2723] hover:shadow-[30px_30px_0px_#2A2723] disabled:opacity-20 disabled:grayscale">
                            🏆 蓋上修行印章
                        </button>
                    )}
                </motion.div>
            </section>

            <AnimatePresence>
                {showAiJumpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-magic-text/95 parchment-texture backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, rotate: -2 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.9, rotate: 2 }} 
                            className="bg-magic-bg border-6 border-magic-text p-16 max-w-lg w-full shadow-[32px_32px_0px_#1A5C5A] relative overflow-hidden text-center">
                            <button onClick={() => setShowAiJumpModal(false)} className="absolute top-8 right-8 text-magic-text hover:text-magic-red transition-colors">
                                <X size={48} strokeWidth={3} />
                            </button>
                            
                            <div className="text-center mb-12">
                                <div className="w-24 h-24 bg-magic-primary border-4 border-magic-text flex items-center justify-center mx-auto mb-8 shadow-brutalist-sm rotate-6">
                                    <Scroll className="text-magic-text" size={48} strokeWidth={2} />
                                </div>
                                <h3 className="text-4xl font-display text-magic-text mb-6 tracking-tighter uppercase leading-none">咒語已寫入卷軸！</h3>
                                <p className="text-xl font-serif italic text-magic-text/60">修行成功，請至大釜進行詠唱。</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    { name: 'CHATGTP 大釜', logo: ChatGPTLogo, web: 'https://chat.openai.com' },
                                    { name: 'CLAUDE 大釜', logo: ClaudeLogo, web: 'https://claude.ai' },
                                    { name: 'GEMINI 大釜', logo: GeminiLogo, web: 'https://gemini.google.com' }
                                ].map((ai, i) => (
                                    <a key={i} href={ai.web} target="_blank" rel="noopener noreferrer" 
                                        className="flex items-center justify-between p-8 border-4 border-magic-text bg-white shadow-brutalist hover:bg-magic-primary hover:shadow-brutalist-hover transition-all group">
                                        <div className="flex items-center gap-6">
                                            <ai.logo size={40} />
                                            <span className="font-display text-xl tracking-widest">{ai.name}</span>
                                        </div>
                                        <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArticleDetail;
