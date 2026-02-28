import SEO from '../components/ui/SEO';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Star, BookOpen, Lock, CheckCircle2, Sparkles,
    Zap, Gamepad2, Trophy, ChevronDown, ChevronRight, Filter,
    Compass, Map, Shield
} from 'lucide-react';
import { INSIGHTS } from '../data/mock';
import { CHAPTERS, MAIN_QUEST_ORDER, SIDE_QUEST_IDS } from '../data/insights';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';

/* ═══════════════════════════════════════════
   ONBOARDING
   ═══════════════════════════════════════════ */
const OnboardingScreen = ({ onComplete }: { onComplete: (mode: 'guided' | 'free', chapter?: number) => void }) => {
    const [phase, setPhase] = useState<'welcome' | 'platform' | 'never-used' | 'experience' | 'result'>('welcome');
    const [platform, setPlatform] = useState('');
    const [resultChapter, setResultChapter] = useState(0);

    const handlePlatform = (p: string) => {
        setPlatform(p);
        localStorage.setItem('dee_ai_platform', p);
        if (p === 'none') {
            setResultChapter(0); // Ch.0
            setPhase('never-used');
        } else {
            setPhase('experience');
        }
    };

    const handleExperience = (level: number) => {
        // 0 = casual, 1 = medium, 2 = advanced
        const ch = level === 0 ? 1 : level === 1 ? 2 : 3;
        setResultChapter(ch);
        setPhase('result');
    };

    const chapterEmojis: Record<number, string> = { 0: '🚀', 1: '🌱', 2: '🔧', 3: '🎯', 4: '🏆' };
    const chapterNames: Record<number, string> = { 0: '🚀 Ch.0 出發準備', 1: '🌱 Ch.1 認識 AI', 2: '🔧 Ch.2 指令進化', 3: '🎯 Ch.3 生活實戰', 4: '🏆 Ch.4 進階挑戰' };
    const chapterDescs: Record<number, string> = {
        0: "沒關係，5 分鐘就能學會！我們先來認識三大 AI，完成你的第一段對話。",
        1: "完美的起點！從最基本的 AI 思維開始，一步步帶你變強。",
        2: "你有基礎了！直接學習結構化指令技巧。",
        3: "不錯喔！直接用 AI 解決生活中的實際問題。",
        4: "高手！直接挑戰最終的進階任務。"
    };

    const ModalShell = ({ children, kkey }: { children: React.ReactNode; kkey: string }) => (
        <motion.div key={kkey} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="bg-zinc-900/90 border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
            <AnimatePresence mode="wait">
                {/* WELCOME */}
                {phase === 'welcome' && (
                    <ModalShell kkey="w">
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-10">
                            <div className="text-6xl mb-6">👋</div>
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">嗨！歡迎來到 Dee's AI Lab</h2>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">我是 Dee，一個跟你一樣從零開始學 AI 的普通人。<br />這裡有 20 篇免費教學，帶你輕鬆上手。</p>
                        </motion.div>
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
                            <button onClick={() => setPhase('platform')}
                                className="w-full py-5 px-6 rounded-2xl bg-emerald-500 text-black font-black text-lg flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
                                <Sparkles size={22} /> 開始我的 AI 旅程
                            </button>
                            <button onClick={() => onComplete('free')}
                                className="w-full py-4 px-6 rounded-2xl bg-transparent border border-white/5 text-zinc-500 font-bold text-base flex items-center justify-center gap-3 hover:text-white hover:border-white/20 transition-all">
                                <BookOpen size={20} /> 跳過，直接看全部教學
                            </button>
                        </motion.div>
                    </ModalShell>
                )}

                {/* PLATFORM SELECTION */}
                {phase === 'platform' && (
                    <ModalShell kkey="p">
                        <div className="text-center mb-8">
                            <h3 className="text-xl md:text-2xl font-black text-white mb-2">你目前有在用哪個 AI 嗎？</h3>
                            <p className="text-zinc-500 text-sm">選一個你最常用的，我們會根據你的經驗安排學習路線。</p>
                        </div>
                        <div className="space-y-3">
                            <button onClick={() => handlePlatform('chatgpt')}
                                className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-white font-bold text-lg transition-all text-left flex items-center gap-4">
                                <div className="w-9 h-9 rounded-xl bg-[#10a37f]/15 flex items-center justify-center flex-shrink-0"><ChatGPTLogo size={22} /></div>
                                <div><div className="font-black">ChatGPT</div><div className="text-zinc-500 text-xs">OpenAI · 全球最多人用</div></div>
                            </button>
                            <button onClick={() => handlePlatform('claude')}
                                className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-violet-500/10 hover:border-violet-500/30 text-white font-bold text-lg transition-all text-left flex items-center gap-4">
                                <div className="w-9 h-9 rounded-xl bg-[#D97757]/15 flex items-center justify-center flex-shrink-0"><ClaudeLogo size={22} /></div>
                                <div><div className="font-black">Claude</div><div className="text-zinc-500 text-xs">Anthropic · 最會聽話</div></div>
                            </button>
                            <button onClick={() => handlePlatform('gemini')}
                                className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 text-white font-bold text-lg transition-all text-left flex items-center gap-4">
                                <div className="w-9 h-9 rounded-xl bg-[#1C7DEB]/15 flex items-center justify-center flex-shrink-0"><GeminiLogo size={22} /></div>
                                <div><div className="font-black">Gemini</div><div className="text-zinc-500 text-xs">Google · 搜尋最即時</div></div>
                            </button>
                            <button onClick={() => handlePlatform('none')}
                                className="w-full py-5 px-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-amber-500/10 hover:border-amber-500/20 text-zinc-400 hover:text-white font-bold text-lg transition-all text-left flex items-center gap-4">
                                <span className="text-2xl">😶</span>
                                <div><div className="font-black">我還沒用過任何一個</div><div className="text-zinc-600 text-xs">完全沒關係，5 分鐘就能學會</div></div>
                            </button>
                        </div>
                    </ModalShell>
                )}

                {/* NEVER USED AI */}
                {phase === 'never-used' && (
                    <ModalShell kkey="n">
                        <div className="text-center">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-6xl mb-6">🚀</motion.div>
                            <h3 className="text-2xl font-black text-white mb-3">太好了，從頭開始最棒！</h3>
                            <p className="text-zinc-400 text-base mb-10 leading-relaxed">我們會先帶你認識三大聊天 AI，<br />然後手把手完成你的第一段 AI 對話。<br />只需要 5 分鐘！</p>
                            <div className="space-y-3">
                                <button onClick={() => onComplete('guided', 0)}
                                    className="w-full py-5 px-6 rounded-2xl bg-emerald-500 text-black font-black text-lg hover:bg-emerald-400 transition-all shadow-lg">
                                    🎮 開始冒險模式
                                </button>
                                <button onClick={() => onComplete('free', 0)}
                                    className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 font-bold text-base hover:text-white transition-all">
                                    📚 先看看全部教學
                                </button>
                            </div>
                        </div>
                    </ModalShell>
                )}

                {/* EXPERIENCE LEVEL */}
                {phase === 'experience' && (
                    <ModalShell kkey="e">
                        <div className="text-center mb-8">
                            <h3 className="text-xl md:text-2xl font-black text-white mb-2">你平常用 {platform === 'chatgpt' ? 'ChatGPT' : platform === 'claude' ? 'Claude' : 'Gemini'} 做什麼？</h3>
                            <p className="text-zinc-500 text-sm">選最接近你的描述。</p>
                        </div>
                        <div className="space-y-3">
                            <button onClick={() => handleExperience(0)}
                                className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-white font-bold transition-all text-left">
                                <div className="font-black mb-1">🌱 隨便聊聊、查查問題</div>
                                <div className="text-zinc-500 text-xs">知道怎麼用，但不太確定怎麼問才能得到好答案</div>
                            </button>
                            <button onClick={() => handleExperience(1)}
                                className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-white font-bold transition-all text-left">
                                <div className="font-black mb-1">🔧 寫文章、翻譯、整理資料</div>
                                <div className="text-zinc-500 text-xs">已經用 AI 處理過實際任務，想學更有效率的方法</div>
                            </button>
                            <button onClick={() => handleExperience(2)}
                                className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-white font-bold transition-all text-left">
                                <div className="font-black mb-1">🏆 已經很熟了，想學進階技巧</div>
                                <div className="text-zinc-500 text-xs">每天都在用，想看看有什麼我還不知道的</div>
                            </button>
                        </div>
                    </ModalShell>
                )}

                {/* RESULT */}
                {phase === 'result' && (
                    <ModalShell kkey="r">
                        <div className="text-center">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="text-6xl mb-6">
                                {chapterEmojis[resultChapter] || '🌱'}
                            </motion.div>
                            <h3 className="text-2xl font-black text-white mb-3">你的起始章節</h3>
                            <p className="text-emerald-400 font-black text-xl mb-4">{chapterNames[resultChapter]}</p>
                            <p className="text-zinc-400 text-base mb-10 leading-relaxed">{chapterDescs[resultChapter]}</p>
                            <div className="space-y-3">
                                <button onClick={() => onComplete('guided', resultChapter)}
                                    className="w-full py-5 px-6 rounded-2xl bg-emerald-500 text-black font-black text-lg hover:bg-emerald-400 transition-all shadow-lg">
                                    🎮 開始冒險模式
                                </button>
                                <button onClick={() => onComplete('free', resultChapter)}
                                    className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 font-bold text-base hover:text-white transition-all">
                                    📚 改用自由模式
                                </button>
                            </div>
                        </div>
                    </ModalShell>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   SKIP CHAPTER QUIZ
   ═══════════════════════════════════════════ */
const SkipChapterModal = ({ targetChapter, onPass, onClose }: { targetChapter: number; onPass: () => void; onClose: () => void }) => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const quizzes: Record<number, { q: string; options: string[]; answer: number }[]> = {
        2: [
            { q: "用 AI 寫指令時，「給身份」最主要的作用是？", options: ["讓 AI 更快回覆", "決定回答的深度和語氣", "減少字數", "避免 AI 說廢話"], answer: 1 },
            { q: "AI 回答不滿意時，最好的做法是？", options: ["關掉重開", "給更多具體回饋繼續對話", "換一個 AI", "加上「請認真」"], answer: 1 },
            { q: "「背景懶人包」的主要用途是？", options: ["增加記憶力", "快速設定偏好", "解鎖功能", "加速回覆"], answer: 1 },
        ],
        3: [
            { q: "寫指令時，最有效的開頭是？", options: ["嗨你好", "用動詞開頭（撰寫、分析...）", "請問可以嗎", "你是 AI 對吧"], answer: 1 },
            { q: "萬用指令公式的四個框是？", options: ["人事時地", "角色/任務/限制/目標", "開頭/中間/結尾/署名", "主題/大綱/內文/結論"], answer: 1 },
            { q: "用 AI 寫道歉信最忌諱的句型是？", options: ["我很抱歉", "雖然...但是...", "造成了影響", "提出補救方案"], answer: 1 },
        ],
        4: [
            { q: "讓 AI 排旅行行程時，最後 10% 該交給？", options: ["AI 就夠了", "旅行社", "Google Maps 等即時工具", "部落格"], answer: 2 },
            { q: "用 AI 整理會議紀錄，最重要的是抓出？", options: ["每句話", "共識與行動待辦", "氣氛", "時長"], answer: 1 },
            { q: "用 AI 規劃食譜時，哪項限制最實用？", options: ["廚具設備限制", "要漂亮的盤子", "食譜歷史", "搭配音樂"], answer: 0 },
        ],
    };

    const questions = quizzes[targetChapter] || quizzes[2];

    const handleAnswer = (idx: number) => {
        const newScore = score + (idx === questions[current].answer ? 1 : 0);
        setScore(newScore);
        if (current < questions.length - 1) setCurrent(current + 1);
        else { setFinished(true); if (newScore >= 2) setTimeout(onPass, 1500); }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-zinc-900 border border-white/10 p-8 md:p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                    <motion.div className="h-full bg-amber-500" animate={{ width: `${((current + 1) / questions.length) * 100}%` }} />
                </div>
                {!finished ? (
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-amber-400 font-mono text-[10px] uppercase tracking-widest">跳級考試 · Q{current + 1}/{questions.length}</span>
                            <button onClick={onClose} className="text-zinc-600 hover:text-white text-xs font-bold">取消</button>
                        </div>
                        <p className="text-white font-black text-lg mb-8 leading-tight">{questions[current].q}</p>
                        <div className="space-y-3">
                            {questions[current].options.map((opt, idx) => (
                                <motion.button key={idx} whileTap={{ scale: 0.97 }} onClick={() => handleAnswer(idx)}
                                    className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-amber-500/10 hover:border-amber-500/30 text-zinc-300 hover:text-white font-bold transition-all text-base text-left">
                                    {opt}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
                        <div className="text-6xl mb-6">{score >= 2 ? '🎉' : '💪'}</div>
                        <h3 className="text-2xl font-black text-white mb-3">{score >= 2 ? '跳級成功！' : '差一點點！'}</h3>
                        <p className="text-zinc-400 text-base mb-8">{score >= 2 ? `答對 ${score}/3，直接進入下一章！` : `答對 ${score}/3，先完成這章會更扎實。`}</p>
                        {score < 2 && <button onClick={onClose} className="bg-white/10 text-white font-bold py-3 px-8 rounded-2xl hover:bg-white/20 transition-all">繼續學習</button>}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   MAIN PAGE — Phase D: Immersive Game UI
   ═══════════════════════════════════════════ */
const Insights = () => {
    const [viewMode, setViewMode] = useState<'adventure' | 'free'>('adventure');
    const [loading, setLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [unlockedChapter, setUnlockedChapter] = useState(1);
    const [completedIds, setCompletedIds] = useState<number[]>([]);
    const [skipTarget, setSkipTarget] = useState<number | null>(null);
    const [freeFilter, setFreeFilter] = useState<string>('全部');
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

    const allInsights = INSIGHTS.filter(i => i.category !== 'AI 新聞');
    const mainQuests = allInsights.filter(i => MAIN_QUEST_ORDER.includes(i.id));
    const sideQuests = allInsights.filter(i => SIDE_QUEST_IDS.includes(i.id));

    useEffect(() => {
        const done = localStorage.getItem('dee_onboarding_done');
        const saved = localStorage.getItem('dee_ai_level');
        const mode = localStorage.getItem('dee_view_preference');
        const comp = localStorage.getItem('dee_ai_completed');

        if (!done) setShowOnboarding(true);
        else {
            if (saved) setUnlockedChapter(parseInt(saved));
            if (mode === 'free') setViewMode('free');
        }
        if (comp) setCompletedIds(JSON.parse(comp));
        setLoading(false);
    }, []);

    // Auto-expand current chapter in adventure mode
    useEffect(() => {
        const currentChapter = CHAPTERS.find(c => {
            const items = c.articleIds;
            const done = items.filter(id => completedIds.includes(id)).length;
            return c.id <= unlockedChapter && done < items.length;
        });
        if (currentChapter) {
            setExpandedChapters(new Set([currentChapter.id]));
        }
    }, [unlockedChapter, completedIds]);

    const handleOnboardingComplete = (mode: 'guided' | 'free', chapter?: number) => {
        const ch = chapter || 1;
        setUnlockedChapter(ch);
        setViewMode(mode === 'free' ? 'free' : 'adventure');
        localStorage.setItem('dee_onboarding_done', 'true');
        localStorage.setItem('dee_ai_level', ch.toString());
        localStorage.setItem('dee_view_preference', mode === 'free' ? 'free' : 'adventure');
        setShowOnboarding(false);
    };

    const handleModeSwitch = (m: 'adventure' | 'free') => {
        setViewMode(m);
        localStorage.setItem('dee_view_preference', m);
    };

    const handleSkipPassed = () => {
        const newCh = skipTarget || 2;
        setUnlockedChapter(newCh);
        localStorage.setItem('dee_ai_level', newCh.toString());
        setSkipTarget(null);
    };

    const toggleChapter = (id: number) => {
        setExpandedChapters(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">SYNCING...</div>;

    const totalMain = MAIN_QUEST_ORDER.length;
    const completedMain = completedIds.filter(id => MAIN_QUEST_ORDER.includes(id)).length;
    const totalAll = allInsights.length;
    const xp = completedIds.length * 200;
    const playerLevel = Math.floor(completedIds.length / 1.5) + 1;
    const progressPct = viewMode === 'adventure' ? (completedMain / totalMain) || 0 : (completedIds.length / totalAll) || 0;

    // Smart recommendation for free mode
    const nextRecommended = allInsights.find(i =>
        !completedIds.includes(i.id) && MAIN_QUEST_ORDER.includes(i.id)
    );

    // Free mode filter
    const filterTags = ['全部', '入門', '技巧', '實戰', '進階', '支線', '已完成', '未完成'];
    const filteredInsights = allInsights.filter(i => {
        if (freeFilter === '全部') return true;
        if (freeFilter === '已完成') return completedIds.includes(i.id);
        if (freeFilter === '未完成') return !completedIds.includes(i.id);
        if (freeFilter === '入門') return i.category === '出發準備' || i.category === '入門心法';
        if (freeFilter === '技巧') return i.category === '指令技巧';
        if (freeFilter === '實戰') return i.category === '生活實戰';
        if (freeFilter === '進階') return i.category === '進階挑戰';
        if (freeFilter === '支線') return i.category === '支線任務';
        return true;
    });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 pb-20 min-h-screen text-left">
            <SEO title="免費 AI 實用教學" description="從新手到高手的 AI 學習旅程，20 篇免費教學" path="/insights" />

            <AnimatePresence>{showOnboarding && <OnboardingScreen onComplete={handleOnboardingComplete} />}</AnimatePresence>
            <AnimatePresence>{skipTarget && <SkipChapterModal targetChapter={skipTarget} onPass={handleSkipPassed} onClose={() => setSkipTarget(null)} />}</AnimatePresence>

            {/* ═══════════ HERO AREA ═══════════ */}
            <div className="relative overflow-hidden mb-12">
                {/* Subtle particle/glow background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full" />
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-500/5 blur-[100px] rounded-full" />
                    <motion.div animate={{ y: [0, -10, 0], x: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-500/20 rounded-full" />
                    <motion.div animate={{ y: [0, 8, 0], x: [0, -3, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-teal-400/20 rounded-full" />
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-emerald-400/30 rounded-full" />
                </div>

                <div className="relative z-10 px-6 max-w-5xl mx-auto">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 border border-white/[0.06] rounded-[2rem] p-8 md:p-12 backdrop-blur-sm">

                        {/* Top row: Mode switcher */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                    {viewMode === 'adventure' ? <Map size={18} className="text-emerald-400" /> : <Compass size={18} className="text-emerald-400" />}
                                </div>
                                <div>
                                    <span className="text-emerald-400 font-mono text-[10px] tracking-[0.3em] uppercase block">
                                        {viewMode === 'adventure' ? 'ADVENTURE MODE' : 'FREE EXPLORE'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
                                <button onClick={() => handleModeSwitch('adventure')}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${viewMode === 'adventure' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-600 hover:text-white'}`}>
                                    <Gamepad2 size={14} /> 冒險
                                </button>
                                <button onClick={() => handleModeSwitch('free')}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${viewMode === 'free' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-600 hover:text-white'}`}>
                                    <BookOpen size={14} /> 自由
                                </button>
                            </div>
                        </div>

                        {/* Title + stats */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">🧠 AI 修煉之路</h1>
                                <p className="text-zinc-500 text-sm md:text-base max-w-lg leading-relaxed">
                                    {viewMode === 'adventure'
                                        ? '14 篇主線任務 + 6 篇支線冒險。按章節推進，一步一腳印變成 AI 高手。'
                                        : '全部 20 篇已解鎖，自由選擇你感興趣的主題深入探索。'}
                                </p>
                            </div>
                            <div className="flex items-center gap-6 flex-shrink-0">
                                <div className="text-center">
                                    <motion.p animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="text-3xl md:text-4xl font-black text-emerald-400">
                                        Lv.{playerLevel}
                                    </motion.p>
                                    <p className="text-zinc-600 text-[10px] font-bold tracking-widest uppercase">LEVEL</p>
                                </div>
                                <div className="w-px h-10 bg-zinc-800" />
                                <div className="text-center">
                                    <p className="text-2xl md:text-3xl font-black text-amber-400">{xp.toLocaleString()}</p>
                                    <p className="text-zinc-600 text-[10px] font-bold tracking-widest uppercase">XP</p>
                                </div>
                            </div>
                        </div>

                        {/* Large progress bar */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-zinc-500 text-xs font-bold">
                                    {viewMode === 'adventure' ? `主線進度` : `總進度`}
                                </span>
                                <span className="text-emerald-400 text-xs font-mono font-bold">
                                    {viewMode === 'adventure' ? `${completedMain} / ${totalMain}` : `${completedIds.length} / ${totalAll}`}
                                    <span className="text-zinc-600 ml-2">{Math.round(progressPct * 100)}%</span>
                                </span>
                            </div>
                            <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 relative"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPct * 100}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ═══════════ CONTENT AREA ═══════════ */}
            <div className="px-6 max-w-5xl mx-auto">
                {viewMode === 'adventure' ? (
                    <>
                        {/* ═══════════ ADVENTURE: ROUTE MAP ═══════════ */}
                        <div className="space-y-4 relative">
                            {/* Vertical connecting line */}
                            <div className="absolute left-[23px] top-6 bottom-6 w-px bg-gradient-to-b from-emerald-500/30 via-zinc-800/50 to-zinc-800/20 hidden md:block" />

                            {CHAPTERS.map((chapter, ci) => {
                                const items = chapter.articleIds.map(id => mainQuests.find(i => i.id === id)).filter(Boolean);
                                const done = items.filter(i => completedIds.includes(i!.id)).length;
                                const isLocked = chapter.id > unlockedChapter;
                                const isComplete = done >= items.length;
                                const isCurrent = chapter.id <= unlockedChapter && !isComplete;
                                const isExpanded = expandedChapters.has(chapter.id);

                                return (
                                    <ChapterNode
                                        key={chapter.id}
                                        chapter={chapter}
                                        items={items as any[]}
                                        completedIds={completedIds}
                                        completedCount={done}
                                        isLocked={isLocked}
                                        isComplete={isComplete}
                                        isCurrent={isCurrent}
                                        isExpanded={isExpanded}
                                        onToggle={() => toggleChapter(chapter.id)}
                                        onSkip={chapter.id > unlockedChapter ? () => setSkipTarget(chapter.id) : undefined}
                                        index={ci}
                                    />
                                );
                            })}
                        </div>

                        {/* SIDE QUESTS */}
                        <div className="mt-16 pt-12 border-t border-white/5">
                            <div className="mb-8 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                    <Sparkles size={18} className="text-amber-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white">支線任務</h2>
                                    <p className="text-zinc-600 text-xs">不受主線限制，隨時可以探索</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {sideQuests.map((item, i) => (
                                    <InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} />
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    /* ═══════════ FREE MODE: FILTERED GRID ═══════════ */
                    <div>
                        {/* Smart recommendation */}
                        {nextRecommended && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                                <Link to={`/insights/${nextRecommended.id}`} className="group block">
                                    <div className="bg-gradient-to-r from-emerald-500/[0.06] to-teal-500/[0.04] border border-emerald-500/10 hover:border-emerald-500/30 rounded-2xl p-5 md:p-6 transition-all">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Compass size={16} className="text-emerald-400" />
                                            <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase">推薦下一篇</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-white font-bold text-lg group-hover:text-emerald-300 transition-colors">{nextRecommended.title}</h3>
                                                <p className="text-zinc-500 text-xs mt-1">{nextRecommended.summary?.slice(0, 60)}...</p>
                                            </div>
                                            <ArrowRight size={20} className="text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )}

                        {/* Filter tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            <Filter size={14} className="text-zinc-600 mt-1.5 mr-1" />
                            {filterTags.map(tag => (
                                <button key={tag} onClick={() => setFreeFilter(tag)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${freeFilter === tag
                                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                                        : 'bg-white/[0.03] border border-white/5 text-zinc-500 hover:text-white hover:border-white/10'
                                    }`}>
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredInsights.map((item, i) => (
                                <InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} />
                            ))}
                        </div>

                        {filteredInsights.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-zinc-600 text-lg font-bold">沒有符合條件的文章</p>
                                <button onClick={() => setFreeFilter('全部')} className="mt-4 text-emerald-400 text-sm font-bold hover:underline">查看全部</button>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══════════ TOTAL PROGRESS FOOTER ═══════════ */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="mt-20 pt-10 border-t border-white/5 text-center">
                    <div className="flex items-center justify-center gap-6 mb-6">
                        <div className="flex items-center gap-2">
                            <Shield size={14} className="text-emerald-500" />
                            <span className="text-zinc-500 text-xs font-bold">Lv.{playerLevel}</span>
                        </div>
                        <div className="w-px h-4 bg-zinc-800" />
                        <div className="flex items-center gap-2">
                            <Trophy size={14} className="text-amber-500" />
                            <span className="text-zinc-500 text-xs font-bold">{xp.toLocaleString()} XP</span>
                        </div>
                        <div className="w-px h-4 bg-zinc-800" />
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-500" />
                            <span className="text-zinc-500 text-xs font-bold">{completedIds.length}/{totalAll} 完成</span>
                        </div>
                    </div>
                    <p className="text-zinc-700 text-[10px] font-bold tracking-[0.5em] uppercase">Dee's AI Life Lab · 2026</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   CHAPTER NODE — RPG-style route map node
   ═══════════════════════════════════════════ */
const ChapterNode = ({ chapter, items, completedIds, completedCount, isLocked, isComplete, isCurrent, isExpanded, onToggle, onSkip, index }: any) => {
    const statusColor = isComplete
        ? 'border-emerald-500 bg-emerald-500 shadow-emerald-500/30'
        : isCurrent
        ? 'border-emerald-400 bg-emerald-500 shadow-emerald-500/20 animate-pulse'
        : isLocked
        ? 'border-zinc-800 bg-zinc-900'
        : 'border-emerald-500/50 bg-emerald-500/50';

    return (
        <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}
            className={`relative pl-0 md:pl-16 ${isLocked ? 'opacity-40' : ''}`}>
            {/* Node dot on timeline */}
            <div className={`hidden md:flex absolute left-[11px] top-6 w-6 h-6 rounded-full items-center justify-center border-2 z-10 shadow-lg ${statusColor}`}>
                {isLocked ? <Lock size={10} className="text-zinc-600" /> : isComplete ? <CheckCircle2 size={10} className="text-black" /> : <span className="w-2 h-2 bg-black rounded-full" />}
            </div>

            {/* Chapter card */}
            <motion.div
                className={`border rounded-2xl transition-all cursor-pointer group ${
                    isCurrent ? 'border-emerald-500/30 bg-emerald-500/[0.03] shadow-lg shadow-emerald-500/5' :
                    isComplete ? 'border-emerald-500/10 bg-emerald-500/[0.02]' :
                    isLocked ? 'border-zinc-800/50 bg-zinc-900/30' :
                    'border-white/5 bg-white/[0.02] hover:border-white/10'
                }`}
                onClick={isLocked ? undefined : onToggle}
            >
                {/* Header — always visible */}
                <div className="p-5 md:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="text-2xl flex-shrink-0">{chapter.emoji}</span>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-lg md:text-xl font-black text-white truncate">{chapter.title}</h2>
                                {isCurrent && <span className="text-[9px] bg-emerald-500 text-black px-2 py-0.5 rounded-full font-black uppercase tracking-wider animate-pulse">進行中</span>}
                                {isComplete && <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">完成 ✓</span>}
                                {isLocked && <span className="text-[9px] bg-zinc-800 text-zinc-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">🔒 未解鎖</span>}
                            </div>
                            <p className="text-zinc-600 text-xs mt-0.5 truncate">{chapter.subtitle}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                        {/* Article dots */}
                        <div className="flex gap-1.5 items-center">
                            {items.map((item: any) => (
                                <div key={item.id} className={`w-3 h-3 rounded-full transition-all ${
                                    completedIds.includes(item.id) ? 'bg-emerald-500 shadow-sm shadow-emerald-500/30' : isLocked ? 'bg-zinc-800' : 'bg-zinc-700'
                                }`} />
                            ))}
                            <span className="text-zinc-600 text-[10px] font-mono ml-1">{completedCount}/{items.length}</span>
                        </div>
                        {!isLocked && (
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-zinc-600 group-hover:text-zinc-400">
                                <ChevronDown size={18} />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Skip exam button for locked chapters */}
                {isLocked && onSkip && (
                    <div className="px-5 pb-4">
                        <motion.button whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); onSkip(); }}
                            className="flex items-center gap-2 text-amber-500 text-[11px] font-bold hover:text-amber-400 transition-colors bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20">
                            <Zap size={13} /> 跳級考試
                        </motion.button>
                    </div>
                )}

                {/* Expandable article list */}
                <AnimatePresence>
                    {isExpanded && !isLocked && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                            <div className="px-5 pb-5 border-t border-white/5 pt-4">
                                <div className="space-y-2">
                                    {items.map((item: any, i: number) => {
                                        const isDone = completedIds.includes(item.id);
                                        return (
                                            <Link key={item.id} to={`/insights/${item.id}`}
                                                className={`group/item flex items-center gap-4 p-3 rounded-xl transition-all ${isDone ? 'bg-emerald-500/[0.04] hover:bg-emerald-500/[0.08]' : 'hover:bg-white/[0.03]'}`}>
                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${
                                                    isDone ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'
                                                }`}>
                                                    {isDone ? <CheckCircle2 size={14} /> : i + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-white truncate group-hover/item:text-emerald-300 transition-colors">{item.title}</h4>
                                                    <p className="text-zinc-600 text-[10px] font-mono">⏱ {item.readTime || item.read_time}</p>
                                                </div>
                                                <ChevronRight size={14} className="text-zinc-700 group-hover/item:text-emerald-400 group-hover/item:translate-x-0.5 transition-all flex-shrink-0" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   INSIGHT CARD — Enhanced with richer visuals
   ═══════════════════════════════════════════ */
const InsightCard = ({ insight, idx, completed, locked }: any) => {
    const themes: Record<string, any> = {
        emerald: { text: 'text-emerald-500', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/5' },
        yellow: { text: 'text-yellow-500', tag: 'bg-yellow-500/10 text-yellow-500', border: 'hover:border-yellow-500/20', glow: 'group-hover:shadow-yellow-500/5' },
        amber: { text: 'text-amber-500', tag: 'bg-amber-500/10 text-amber-500', border: 'hover:border-amber-500/20', glow: 'group-hover:shadow-amber-500/5' },
        blue: { text: 'text-blue-500', tag: 'bg-blue-500/10 text-blue-500', border: 'hover:border-blue-500/20', glow: 'group-hover:shadow-blue-500/5' },
        violet: { text: 'text-violet-500', tag: 'bg-violet-500/10 text-violet-500', border: 'hover:border-violet-500/20', glow: 'group-hover:shadow-violet-500/5' },
        rose: { text: 'text-rose-500', tag: 'bg-rose-500/10 text-rose-500', border: 'hover:border-rose-500/20', glow: 'group-hover:shadow-rose-500/5' },
        teal: { text: 'text-teal-500', tag: 'bg-teal-500/10 text-teal-500', border: 'hover:border-teal-500/20', glow: 'group-hover:shadow-teal-500/5' },
        zinc: { text: 'text-zinc-300', tag: 'bg-white/5 text-zinc-400', border: 'hover:border-zinc-300/20', glow: '' },
        indigo: { text: 'text-indigo-500', tag: 'bg-indigo-500/10 text-indigo-500', border: 'hover:border-indigo-500/20', glow: 'group-hover:shadow-indigo-500/5' },
    };
    const theme = themes[insight.themeColor || 'emerald'] || themes.emerald;

    const CardContent = (
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} viewport={{ once: true }}
            className={`bg-[#111] border border-white/[0.04] ${locked ? '' : theme.border} p-5 md:p-6 rounded-2xl h-full flex flex-col relative transition-all duration-300 group-hover:shadow-xl ${theme.glow} ${completed ? 'bg-emerald-500/[0.02] border-emerald-500/10' : ''}`}>
            {completed && (
                <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-black p-1 rounded-full shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 size={14} />
                </div>
            )}
            <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${theme.tag}`}>{insight.category}</span>
                <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={7} className={i < (insight.difficulty_level || 1) ? theme.text : 'text-zinc-800/50'} fill="currentColor" />)}</div>
                </div>
            </div>
            <h4 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-emerald-100 transition-colors">{insight.title}</h4>
            <p className="text-zinc-600 text-xs line-clamp-2 mb-5 leading-relaxed">{insight.summary}</p>
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/[0.03]">
                <span className="text-zinc-700 text-[10px] font-mono flex items-center gap-1">⏱ {insight.readTime || insight.read_time}</span>
                <div className="flex items-center gap-1 text-zinc-700 group-hover:text-emerald-400 transition-all">
                    <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">開始</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
        </motion.div>
    );

    if (locked) return <div className="cursor-not-allowed">{CardContent}</div>;
    return <Link to={`/insights/${insight.id}`} className="group block">{CardContent}</Link>;
};

export default Insights;
