import SEO from '../components/ui/SEO';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, 
    Star, 
    LayoutGrid, 
    Map as MapIcon,
    Lock,
    CheckCircle2,
    Sparkles,
    Zap,
    BookOpen,
    Gamepad2,
    Trophy
} from 'lucide-react';
import { INSIGHTS } from '../data/mock';

/* ═══════════════════════════════════════════
   ONBOARDING — Chat-style welcome screen
   ═══════════════════════════════════════════ */
const OnboardingScreen = ({ onComplete }: { onComplete: (mode: 'guided' | 'free', level?: number) => void }) => {
    const [phase, setPhase] = useState<'welcome' | 'quiz' | 'result'>('welcome');
    const [quizStep, setQuizStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [resultLevel, setResultLevel] = useState(1);

    const quizQuestions = [
        { q: "你平常多久用一次 AI？", options: ["幾乎沒用過 🤷", "偶爾問問問題 🙂", "每天都在用 🚀"] },
        { q: "你能分辨「好的指令」和「爛的指令」嗎？", options: ["什麼是指令？ 😅", "大概知道 🤔", "閉著眼都能寫 😎"] },
        { q: "對你來說，AI 像什麼？", options: ["看不懂的科技 🤖", "偶爾派上用場的工具 🔧", "生活離不開的助理 🧠"] },
    ];

    const handleQuizAnswer = (idx: number) => {
        const newAnswers = [...answers, idx];
        setAnswers(newAnswers);
        if (quizStep < quizQuestions.length - 1) {
            setQuizStep(quizStep + 1);
        } else {
            const avg = newAnswers.reduce((a, b) => a + b, 0) / newAnswers.length;
            const level = avg < 0.8 ? 1 : avg < 1.8 ? 2 : 3;
            setResultLevel(level);
            setPhase('result');
        }
    };

    const levelNames = ['', '🌱 Lv.1 新手村', '⚔️ Lv.2 實戰平原', '👑 Lv.3 巔峰聖殿'];

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl text-left"
        >
            <AnimatePresence mode="wait">
                {/* WELCOME */}
                {phase === 'welcome' && (
                    <motion.div 
                        key="welcome"
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-zinc-900/90 border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />
                        <div className="relative z-10">
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-center mb-10">
                                <div className="text-6xl mb-6">👋</div>
                                <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">嗨！歡迎來到 Dee's AI Lab</h2>
                                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">我是 Dee，一個跟你一樣從零開始學 AI 的普通人。<br/>這裡有 18 篇免費教學，從入門到進階都有。</p>
                            </motion.div>
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-4">
                                <button 
                                    onClick={() => setPhase('quiz')} 
                                    className="w-full py-5 px-6 rounded-2xl bg-emerald-500 text-black font-black text-lg flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    <Sparkles size={22} /> 我是新手，帶我逛逛
                                </button>
                                <button 
                                    onClick={() => setPhase('quiz')} 
                                    className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                                >
                                    <Gamepad2 size={22} /> 我有基礎，快速分級
                                </button>
                                <button 
                                    onClick={() => onComplete('free')} 
                                    className="w-full py-5 px-6 rounded-2xl bg-transparent border border-white/5 text-zinc-500 font-bold text-base flex items-center justify-center gap-3 hover:text-white hover:border-white/20 transition-all"
                                >
                                    <BookOpen size={20} /> 跳過教學，看全部文章
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* QUIZ */}
                {phase === 'quiz' && (
                    <motion.div 
                        key="quiz"
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-zinc-900/90 border border-white/10 p-8 md:p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                            <motion.div 
                                className="h-full bg-emerald-500"
                                animate={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <div className="relative z-10">
                            <p className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-6 text-center">Q{quizStep + 1} / {quizQuestions.length}</p>
                            <h4 className="text-xl font-black text-white mb-8 text-center leading-tight">{quizQuestions[quizStep].q}</h4>
                            <div className="space-y-3">
                                {quizQuestions[quizStep].options.map((opt, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleQuizAnswer(idx)}
                                        className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-zinc-300 hover:text-white font-bold transition-all text-base text-left"
                                    >
                                        {opt}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* RESULT */}
                {phase === 'result' && (
                    <motion.div 
                        key="result"
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-zinc-900/90 border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden text-center"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="text-6xl mb-6">
                            {resultLevel === 1 ? '🌱' : resultLevel === 2 ? '⚔️' : '👑'}
                        </motion.div>
                        <h3 className="text-2xl font-black text-white mb-3">你的起始等級</h3>
                        <p className="text-emerald-400 font-black text-xl mb-6">{levelNames[resultLevel]}</p>
                        <p className="text-zinc-400 text-base mb-10 leading-relaxed">
                            {resultLevel === 1 && "完美的起點！我們會從最基本的 AI 思維開始，一步步帶你變強。"}
                            {resultLevel === 2 && "你已經有基礎了！直接進入實戰關卡，用 AI 解決生活中的真實問題。"}
                            {resultLevel === 3 && "高手就是不一樣！直接挑戰最高級別的進階技巧。"}
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => onComplete('guided', resultLevel)}
                                className="w-full py-5 px-6 rounded-2xl bg-emerald-500 text-black font-black text-lg hover:bg-emerald-400 transition-all shadow-lg"
                            >
                                🎮 開始冒險模式
                            </button>
                            <button
                                onClick={() => onComplete('free', resultLevel)}
                                className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 font-bold text-base hover:text-white transition-all"
                            >
                                📚 改用自由模式（全部解鎖）
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   SKIP LEVEL QUIZ — Quick 3-question test
   ═══════════════════════════════════════════ */
const SkipLevelModal = ({ targetLevel, onPass, onClose }: { targetLevel: number; onPass: () => void; onClose: () => void }) => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const quizzes: Record<number, { q: string; options: string[]; answer: number }[]> = {
        2: [
            { q: "用 AI 寫指令時，「給身份」最主要的作用是？", options: ["讓 AI 更快回覆", "決定回答的深度和語氣", "減少字數", "避免 AI 說廢話"], answer: 1 },
            { q: "AI 回答不滿意時，最好的做法是？", options: ["關掉重開", "給更多具體回饋繼續對話", "換一個 AI 試試", "加上「請認真回答」"], answer: 1 },
            { q: "「背景懶人包」的主要用途是？", options: ["讓 AI 記住你是誰", "在新對話中快速設定你的偏好", "增加 AI 的記憶力", "解鎖進階功能"], answer: 1 },
        ],
        3: [
            { q: "讓 AI 幫你規劃旅行時，最後 10% 應該交給誰確認？", options: ["AI 就夠了", "旅行社", "Google Maps 等即時工具", "旅遊部落格"], answer: 2 },
            { q: "用 AI 整理會議紀錄時，最重要的是抓出什麼？", options: ["每個人講的每一句話", "達成的共識與行動待辦", "開會的氣氛", "會議時長"], answer: 1 },
            { q: "AI 給的「限制條件」中，哪項最能產出可執行的結果？", options: ["用什麼字型排版", "明確的時間和設備限制", "要求用華麗的詞彙", "指定要幾個段落"], answer: 1 },
        ],
    };

    const questions = quizzes[targetLevel] || quizzes[2];

    const handleAnswer = (idx: number) => {
        const correct = idx === questions[current].answer;
        const newScore = score + (correct ? 1 : 0);
        setScore(newScore);
        if (current < questions.length - 1) {
            setCurrent(current + 1);
        } else {
            setFinished(true);
            if (newScore >= 2) setTimeout(onPass, 1500);
        }
    };

    const passed = score >= 2;

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
                                    className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-amber-500/10 hover:border-amber-500/30 text-zinc-300 hover:text-white font-bold transition-all text-base text-left"
                                >{opt}</motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
                        <div className="text-6xl mb-6">{passed ? '🎉' : '💪'}</div>
                        <h3 className="text-2xl font-black text-white mb-3">{passed ? '跳級成功！' : '差一點點！'}</h3>
                        <p className="text-zinc-400 text-base mb-8">
                            {passed ? `答對 ${score}/${questions.length}，直接進入下一級！` : `答對 ${score}/${questions.length}，先把這一級練完會更扎實哦。`}
                        </p>
                        {!passed && <button onClick={onClose} className="bg-white/10 text-white font-bold py-3 px-8 rounded-2xl hover:bg-white/20 transition-all">繼續學習</button>}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   MAIN INSIGHTS PAGE
   ═══════════════════════════════════════════ */
const Insights = () => {
    const [viewMode, setViewMode] = useState<'adventure' | 'free'>('adventure');
    const [insights, setInsights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [userLevel, setUserLevel] = useState(1);
    const [completedIds, setCompletedIds] = useState<number[]>([]);
    const [skipLevelTarget, setSkipLevelTarget] = useState<number | null>(null);

    useEffect(() => {
        const onboardDone = localStorage.getItem('dee_onboarding_done');
        const savedLevel = localStorage.getItem('dee_ai_level');
        const savedCompleted = localStorage.getItem('dee_ai_completed');
        const savedMode = localStorage.getItem('dee_view_preference');

        if (!onboardDone) {
            setShowOnboarding(true);
        } else {
            if (savedLevel) setUserLevel(parseInt(savedLevel));
            if (savedMode === 'free') setViewMode('free');
        }
        if (savedCompleted) setCompletedIds(JSON.parse(savedCompleted));
        setInsights(INSIGHTS.filter(i => i.category !== 'AI 新聞'));
        setLoading(false);
    }, []);

    const handleOnboardingComplete = (mode: 'guided' | 'free', level?: number) => {
        const finalLevel = level || 1;
        setUserLevel(finalLevel);
        setViewMode(mode === 'free' ? 'free' : 'adventure');
        localStorage.setItem('dee_onboarding_done', 'true');
        localStorage.setItem('dee_ai_level', finalLevel.toString());
        localStorage.setItem('dee_view_preference', mode === 'free' ? 'free' : 'adventure');
        setShowOnboarding(false);
    };

    const handleModeSwitch = (mode: 'adventure' | 'free') => {
        setViewMode(mode);
        localStorage.setItem('dee_view_preference', mode);
    };

    const handleSkipLevel = (targetLevel: number) => {
        setSkipLevelTarget(targetLevel);
    };

    const handleSkipPassed = () => {
        const newLevel = skipLevelTarget || 2;
        setUserLevel(newLevel);
        localStorage.setItem('dee_ai_level', newLevel.toString());
        setSkipLevelTarget(null);
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">LOADING...</div>;

    const level1 = insights.filter(i => (i.level || 1) === 1);
    const level2 = insights.filter(i => (i.level || 1) === 2);
    const level3 = insights.filter(i => (i.level || 1) === 3);

    const completedInLevel = (items: any[]) => items.filter(i => completedIds.includes(i.id)).length;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen text-left">
            <SEO title="免費 AI 實用教學" description="從新手到高手的 AI 學習地圖，18 篇免費教學" path="/insights" />
            
            <AnimatePresence>{showOnboarding && <OnboardingScreen onComplete={handleOnboardingComplete} />}</AnimatePresence>
            <AnimatePresence>{skipLevelTarget && <SkipLevelModal targetLevel={skipLevelTarget} onPass={handleSkipPassed} onClose={() => setSkipLevelTarget(null)} />}</AnimatePresence>

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="text-left">
                    <span className="text-emerald-500 font-bold tracking-widest text-[10px] uppercase mb-4 block">
                        {viewMode === 'adventure' ? `LEVEL ${userLevel} · ADVENTURE MODE` : 'FREE MODE · ALL UNLOCKED'}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">AI 實踐教學</h1>
                    <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">
                        {viewMode === 'adventure' 
                            ? '按部就班解鎖每一關，或挑戰跳級考試直接進階。' 
                            : '全部教學已解鎖，自由選擇你感興趣的主題。'}
                    </p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                    <button onClick={() => handleModeSwitch('adventure')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'adventure' ? 'bg-emerald-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
                        <Gamepad2 size={14} /> 冒險模式
                    </button>
                    <button onClick={() => handleModeSwitch('free')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'free' ? 'bg-emerald-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
                        <BookOpen size={14} /> 自由模式
                    </button>
                </div>
            </div>

            {/* ADVENTURE MODE */}
            {viewMode === 'adventure' ? (
                <div className="space-y-24 relative">
                    <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-zinc-800/50 hidden md:block border-l border-dashed border-zinc-700" />
                    <LevelSection 
                        level={1} title="🌱 新手村：打好基礎心法" subtitle="從建立正確思維開始，讓 AI 成為你的分身"
                        items={level1} userLevel={userLevel} completedIds={completedIds} 
                        completedCount={completedInLevel(level1)} totalCount={level1.length}
                        onSkipLevel={() => handleSkipLevel(2)}
                    />
                    <LevelSection 
                        level={2} title="⚔️ 實戰平原：解決生活瑣事" subtitle="育兒、旅行、溝通，AI 幫你省下大把時間"
                        items={level2} userLevel={userLevel} completedIds={completedIds}
                        completedCount={completedInLevel(level2)} totalCount={level2.length}
                        onSkipLevel={() => handleSkipLevel(3)}
                    />
                    <LevelSection 
                        level={3} title="👑 巔峰聖殿：高階生產力" subtitle="專業文案、理財助理，掌握高級進化技巧"
                        items={level3} userLevel={userLevel} completedIds={completedIds}
                        completedCount={completedInLevel(level3)} totalCount={level3.length}
                    />
                </div>
            ) : (
                /* FREE MODE — all unlocked grid */
                <div className="space-y-12">
                    <FreeSection title="🌱 入門心法" items={level1} completedIds={completedIds} />
                    <FreeSection title="⚔️ 生活實戰" items={level2} completedIds={completedIds} />
                    <FreeSection title="👑 進階生產力" items={level3} completedIds={completedIds} />
                </div>
            )}

            {/* TOTAL PROGRESS */}
            <div className="mt-20 pt-10 border-t border-white/5 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <Trophy size={18} className="text-emerald-500" />
                    <span className="text-zinc-500 text-sm font-bold">總進度：{completedIds.length} / {insights.length} 篇完成</span>
                </div>
                <div className="w-full max-w-xs mx-auto h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-emerald-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedIds.length / insights.length) * 100}%` }}
                        transition={{ duration: 0.8 }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   LEVEL SECTION — Adventure mode
   ═══════════════════════════════════════════ */
const LevelSection = ({ level, title, subtitle, items, userLevel, completedIds, completedCount, totalCount, onSkipLevel }: any) => {
    const isLocked = level > userLevel;
    const isComplete = completedCount >= totalCount;
    
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`relative pl-0 md:pl-20 ${isLocked ? 'opacity-30' : 'opacity-100'}`}>
            {/* Timeline node */}
            <div className={`hidden md:flex absolute left-4 top-0 w-10 h-10 rounded-full items-center justify-center border-2 z-10 transition-all ${
                isComplete ? 'bg-emerald-500 border-emerald-400 text-black shadow-lg shadow-emerald-500/30' :
                isLocked ? 'bg-zinc-900 border-zinc-800 text-zinc-700' : 
                'bg-emerald-500 border-emerald-400 text-black shadow-lg shadow-emerald-500/20'
            }`}>
                {isLocked ? <Lock size={16} /> : isComplete ? <CheckCircle2 size={16} /> : <span className="font-bold">{level}</span>}
            </div>
            
            <div className="mb-8 text-left">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    {isLocked && <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">未解鎖</span>}
                    {isComplete && <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">已完成 ✓</span>}
                </div>
                <p className="text-zinc-500 text-sm mb-3">{subtitle}</p>
                
                {/* Progress bar + skip button */}
                {!isLocked && (
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex-1 max-w-xs">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">{completedCount} / {totalCount}</span>
                            </div>
                            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div className="h-full bg-emerald-500 rounded-full" animate={{ width: `${(completedCount / totalCount) * 100}%` }} />
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Skip level button */}
                {isLocked && onSkipLevel && (
                    <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={onSkipLevel}
                        className="mt-4 flex items-center gap-2 text-amber-500 text-xs font-bold hover:text-amber-400 transition-colors bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20"
                    >
                        <Zap size={14} /> 跳級考試
                    </motion.button>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item: any, i: number) => (
                    <InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} locked={isLocked} />
                ))}
            </div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   FREE SECTION — No locks, simple grid
   ═══════════════════════════════════════════ */
const FreeSection = ({ title, items, completedIds }: any) => (
    <div>
        <h2 className="text-xl font-bold text-white mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: any, i: number) => (
                <InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} />
            ))}
        </div>
    </div>
);

/* ═══════════════════════════════════════════
   INSIGHT CARD
   ═══════════════════════════════════════════ */
const InsightCard = ({ insight, idx, completed, locked }: any) => {
    const theme: any = {
        emerald: { text: 'text-emerald-500', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/30' },
        yellow: { text: 'text-yellow-500', tag: 'bg-yellow-500/10 text-yellow-500', border: 'hover:border-yellow-500/30' },
        amber: { text: 'text-amber-500', tag: 'bg-amber-500/10 text-amber-500', border: 'hover:border-amber-500/30' },
        blue: { text: 'text-blue-500', tag: 'bg-blue-500/10 text-blue-500', border: 'hover:border-blue-500/30' },
        violet: { text: 'text-violet-500', tag: 'bg-violet-500/10 text-violet-500', border: 'hover:border-violet-500/30' },
        rose: { text: 'text-rose-500', tag: 'bg-rose-500/10 text-rose-500', border: 'hover:border-rose-500/30' },
        teal: { text: 'text-teal-500', tag: 'bg-teal-500/10 text-teal-500', border: 'hover:border-teal-500/30' },
        zinc: { text: 'text-zinc-300', tag: 'bg-white/5 text-zinc-400', border: 'hover:border-zinc-300/30' },
        indigo: { text: 'text-indigo-500', tag: 'bg-indigo-500/10 text-indigo-500', border: 'hover:border-indigo-500/30' },
    }[insight.themeColor as string || 'emerald'] || { text: 'text-emerald-500', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/30' };

    const CardContent = (
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }} className={`bg-[#111] border border-white/5 ${locked ? '' : theme.border} p-6 rounded-3xl h-full flex flex-col relative transition-all duration-300 text-left ${completed ? 'bg-emerald-500/[0.02] border-emerald-500/10' : ''}`}>
            {completed && <div className="absolute -top-2 -right-2 bg-emerald-500 text-black p-1 rounded-full shadow-lg"><CheckCircle2 size={16} /></div>}
            <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${theme.tag}`}>{insight.category}</span>
                <span className="text-zinc-700 text-[10px] font-mono">⏱ {insight.readTime || insight.read_time}</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-tight">{insight.title}</h4>
            <p className="text-zinc-500 text-xs line-clamp-2 mb-6 leading-relaxed">{insight.summary}</p>
            <div className="mt-auto flex items-center justify-between">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} size={8} className={i < (insight.difficulty_level || 1) ? theme.text : 'text-zinc-800'} fill="currentColor" />))}</div>
                <ArrowRight size={14} className="text-zinc-700 group-hover:text-emerald-500 transition-all" />
            </div>
        </motion.div>
    );

    if (locked) return <div className="cursor-not-allowed">{CardContent}</div>;
    return (<Link to={`/insights/${insight.id}`} className="group block">{CardContent}</Link>);
};

export default Insights;
