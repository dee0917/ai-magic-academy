import SEO from '../components/ui/SEO';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Star, BookOpen, Lock, CheckCircle2, Sparkles,
    Zap, Gamepad2, Trophy, ChevronDown, ChevronRight, Filter,
    Compass, Map, Shield, Search, X
} from 'lucide-react';
import { INSIGHTS } from '../data/mock';
import { CHAPTERS, MAIN_QUEST_ORDER, SIDE_QUEST_IDS } from '../data/insights';
import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '../components/AILogos';

// ═══════════════════════════════════════════
// 全域分類配色定義 — 確保全站一致
// ═══════════════════════════════════════════
const CATEGORY_THEMES: Record<string, string> = {
    '出發準備': 'teal',
    '入門心法': 'emerald',
    '指令技巧': 'violet',
    '生活實戰': 'blue',
    '進階挑戰': 'rose',
    '支線任務': 'amber'
};

const THEME_CONFIG: Record<string, any> = {
    emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', tag: 'bg-emerald-500/10 text-emerald-500', border: 'hover:border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10' },
    yellow: { text: 'text-yellow-500', lightText: 'text-yellow-400', tag: 'bg-yellow-500/10 text-yellow-500', border: 'hover:border-yellow-500/20', glow: 'group-hover:shadow-yellow-500/10' },
    amber: { text: 'text-amber-500', lightText: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-500', border: 'hover:border-amber-500/20', glow: 'group-hover:shadow-amber-500/10' },
    blue: { text: 'text-blue-500', lightText: 'text-blue-400', tag: 'bg-blue-500/10 text-blue-500', border: 'hover:border-blue-500/20', glow: 'group-hover:shadow-blue-500/10' },
    violet: { text: 'text-violet-500', lightText: 'text-violet-400', tag: 'bg-violet-500/10 text-violet-500', border: 'hover:border-violet-500/20', glow: 'group-hover:shadow-violet-500/10' },
    rose: { text: 'text-rose-500', lightText: 'text-rose-400', tag: 'bg-rose-500/10 text-rose-500', border: 'hover:border-rose-500/20', glow: 'group-hover:shadow-rose-500/10' },
    teal: { text: 'text-teal-500', lightText: 'text-teal-400', tag: 'bg-teal-500/10 text-teal-500', border: 'hover:border-teal-500/20', glow: 'group-hover:shadow-teal-500/10' },
    zinc: { text: 'text-zinc-300', lightText: 'text-zinc-200', tag: 'bg-white/5 text-zinc-400', border: 'hover:border-zinc-300/20', glow: '' },
    indigo: { text: 'text-indigo-500', lightText: 'text-indigo-400', tag: 'bg-indigo-500/10 text-indigo-500', border: 'hover:border-indigo-500/20', glow: 'group-hover:shadow-indigo-500/10' },
};

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
                                className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-white font-bold transition-all text-left">
                                <div className="font-black mb-1">🌱 隨便聊聊、查查問題</div>
                                <div className="text-zinc-500 text-xs">知道怎麼用，但不太確定怎麼問才能得到好答案</div>
                            </button>
                            <button onClick={() => handleExperience(1)}
                                className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-white font-bold transition-all text-left">
                                <div className="font-black mb-1">🔧 寫文章、翻譯、整理資料</div>
                                <div className="text-zinc-500 text-xs">已經用 AI 處理過實際任務，想學更有效率的方法</div>
                            </button>
                            <button onClick={() => handleExperience(2)}
                                className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-white font-bold transition-all text-left">
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
            { q: "用 AI 寫指令時，「給身份」最主要的作用是？", options: ["讓 AI 更快回覆", "決定回答的深度 and 語氣", "減少字數", "避免 AI 說廢話"], answer: 1 },
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
   MAIN PAGE
   ═══════════════════════════════════════════ */
const Insights = () => {
    const [viewMode, setViewMode] = useState<'adventure' | 'free'>('adventure');
    const [loading, setLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [unlockedChapter, setUnlockedChapter] = useState(1);
    const [completedIds, setCompletedIds] = useState<number[]>([]);
    const [skipTarget, setSkipTarget] = useState<number | null>(null);
    const [freeFilter, setFreeFilter] = useState<string>('全部');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

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
        if (comp) {
            try {
                setCompletedIds(JSON.parse(comp));
            } catch(e) {
                setCompletedIds([]);
            }
        }
        setLoading(false);
    }, []);

    const allInsights = useMemo(() => INSIGHTS.filter(i => i.category !== 'AI 新聞'), []);
    const mainQuests = useMemo(() => allInsights.filter(i => MAIN_QUEST_ORDER.includes(i.id)), [allInsights]);
    const sideQuests = useMemo(() => allInsights.filter(i => SIDE_QUEST_IDS.includes(i.id)), [allInsights]);

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

    // Free mode filter & search
    const filterTags = ['全部', '入門', '技巧', '實戰', '進階', '支線', '已完成', '未完成'];
    
    const filteredInsights = useMemo(() => {
        return allInsights.filter(i => {
            // Filter by Tag
            let tagMatch = true;
            if (freeFilter === '已完成') tagMatch = completedIds.includes(i.id);
            else if (freeFilter === '未完成') tagMatch = !completedIds.includes(i.id);
            else if (freeFilter === '入門') tagMatch = i.category === '出發準備' || i.category === '入門心法';
            else if (freeFilter === '技巧') tagMatch = i.category === '指令技巧';
            else if (freeFilter === '實戰') tagMatch = i.category === '生活實戰';
            else if (freeFilter === '進階') tagMatch = i.category === '進階挑戰';
            else if (freeFilter === '支線') tagMatch = i.category === '支線任務';

            if (!tagMatch) return false;

            // Filter by Search Query
            if (!searchQuery || searchQuery.trim() === '') return true;
            
            const query = searchQuery.toLowerCase();
            const searchableText = [
                i.title,
                i.summary,
                i.category,
                ...(i.tags || []),
                i.pain_point,
                i.scenario,
                i.solution,
                ...(i.steps || []).map((s: any) => `${s.title} ${s.body}`),
                i.practice_kit?.title,
                i.practice_kit?.description
            ].filter(Boolean).join(' ').toLowerCase();
            
            return searchableText.includes(query);
        });
    }, [allInsights, freeFilter, searchQuery, completedIds]);

    const playerLevel = Math.floor(completedIds.length / 1.5) + 1;
    const xp = completedIds.length * 200;

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono text-xs tracking-widest animate-pulse">SYNCING...</div>;

    const totalMain = MAIN_QUEST_ORDER.length;
    const completedMain = completedIds.filter(id => MAIN_QUEST_ORDER.includes(id)).length;
    const totalAll = allInsights.length;
    const progressPct = (viewMode === 'adventure' ? (completedMain / totalMain) : (completedIds.length / totalAll)) || 0;

    // Smart recommendation for free mode
    const nextRecommended = allInsights.find(i =>
        !completedIds.includes(i.id) && MAIN_QUEST_ORDER.includes(i.id)
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 pb-20 min-h-screen text-left relative z-0">
            <SEO title="免費 AI 實用教學" description="從新手到高手的 AI 學習旅程，20 篇免費教學" path="/insights" />

            <AnimatePresence>{showOnboarding && <OnboardingScreen onComplete={handleOnboardingComplete} />}</AnimatePresence>
            <AnimatePresence>{skipTarget && <SkipChapterModal targetChapter={skipTarget} onPass={handleSkipPassed} onClose={() => setSkipTarget(null)} />}</AnimatePresence>

            {/* ═══════════ HERO AREA ═══════════ */}
            <div className="relative overflow-hidden mb-12 px-6 max-w-5xl mx-auto">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 border border-white/[0.06] rounded-[2rem] p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
                    
                    {/* Background effects */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
                        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-500/10 blur-[100px] rounded-full" />
                    </div>

                    {/* Top row: Mode switcher */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/5">
                                {viewMode === 'adventure' ? <Map size={22} className="text-emerald-400" /> : <Compass size={22} className="text-emerald-400" />}
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">AI 修煉之路</h1>
                                <span className="text-emerald-500/60 font-mono text-[9px] tracking-[0.4em] uppercase block mt-1">
                                    {viewMode === 'adventure' ? 'ADVENTURE' : 'FREE EXPLORE'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="bg-black/40 p-1.5 rounded-2xl border border-white/[0.08] flex items-center shadow-inner group">
                            <button onClick={() => handleModeSwitch('adventure')}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${viewMode === 'adventure' ? 'bg-emerald-500 text-black shadow-lg scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}>
                                <Gamepad2 size={14} className={viewMode === 'adventure' ? 'animate-bounce' : ''} /> 冒險
                            </button>
                            <button onClick={() => handleModeSwitch('free')}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${viewMode === 'free' ? 'bg-emerald-500 text-black shadow-lg scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}>
                                <BookOpen size={14} className={viewMode === 'free' ? 'animate-pulse' : ''} /> 自由
                            </button>
                        </div>
                    </div>

                    {/* Large progress bar */}
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-zinc-400 text-[10px] font-black tracking-widest uppercase">
                                {viewMode === 'adventure' ? 'Main Quest Progress' : 'Total Exploration'}
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="text-emerald-400 text-sm font-black font-mono">
                                    {viewMode === 'adventure' ? `${completedMain}/${totalMain}` : `${completedIds.length}/${totalAll}`}
                                </span>
                                <span className="text-white/20 text-xs">/</span>
                                <span className="text-zinc-500 text-sm font-black font-mono">{Math.round(progressPct * 100)}%</span>
                            </div>
                        </div>
                        <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/5 relative">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 relative"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPct * 100}%` }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ═══════════ CONTENT AREA ═══════════ */ }
            <div className="px-6 max-w-5xl mx-auto relative z-10">
                {viewMode === 'adventure' ? (
                    <div className="space-y-4 relative">
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
                                    onTagClick={setSearchQuery}
                                    index={ci}
                                />
                            );
                        })}
                        {/* SIDE QUESTS IN ADVENTURE */}
                        <div className="mt-20 pt-12 border-t border-white/5">
                            <div className="mb-8 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-500/5">
                                    <Sparkles size={22} className="text-amber-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white">支線任務</h2>
                                    <p className="text-zinc-500 text-xs mt-0.5">不受主線限制，隨時可以探索的特別篇</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {sideQuests.map((item, i) => (
                                    <InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} onTagClick={setSearchQuery} />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* ═══════════ FREE MODE ═══════════ */
                    <div>
                        {/* Search Bar Section */}
                        <div className="mb-14 relative max-w-2xl mx-auto group">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                                <Search size={22} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="輸入困難、煩惱或關鍵字... (例如: 寫信、排行程)"
                                className="w-full bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] hover:border-emerald-500/30 focus:border-emerald-500/50 rounded-[2rem] py-6 pl-16 pr-16 text-white text-lg transition-all outline-none shadow-2xl focus:shadow-emerald-500/10"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-6 flex items-center text-zinc-500 hover:text-white transition-colors">
                                    <X size={22} />
                                </button>
                            )}
                            <div className="absolute -bottom-7 left-6">
                                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest flex items-center gap-2">
                                    <Shield size={10} /> {searchQuery ? `找到 ${filteredInsights.length} 篇攻略` : '探索實驗室全卷'}
                                </p>
                            </div>
                        </div>

                        {/* Filter Tags Bar */}
                        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                            <div className="flex-shrink-0 text-zinc-700"><Filter size={16} /></div>
                            {filterTags.map(tag => (
                                <button key={tag} onClick={() => setFreeFilter(tag)}
                                    className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 ${freeFilter === tag
                                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 scale-105'
                                        : 'bg-white/[0.03] border border-white/[0.06] text-zinc-500 hover:text-white hover:border-white/20'
                                    }`}>
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredInsights.map((item, i) => (
                                <InsightCard key={item.id} insight={item} idx={i} completed={completedIds.includes(item.id)} onTagClick={setSearchQuery} />
                            ))}
                        </div>

                        {filteredInsights.length === 0 && (
                            <div className="text-center py-32">
                                <div className="text-6xl mb-6 opacity-20">🔍</div>
                                <p className="text-zinc-500 text-lg font-bold">找不到相關教學... 換個詞試試？</p>
                                <button onClick={() => { setFreeFilter('全部'); setSearchQuery(''); }} 
                                    className="mt-6 text-emerald-400 text-sm font-black hover:underline tracking-widest uppercase">重置所有過濾</button>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══════════ FOOTER STATS ═══════════ */}
                <div className="mt-24 pt-10 border-t border-white/5 text-center">
                    <div className="flex flex-wrap justify-center gap-8 mb-8">
                        <div className="flex items-center gap-3 bg-white/[0.02] px-5 py-2 rounded-full border border-white/5">
                            <Shield size={16} className="text-emerald-500" />
                            <span className="text-zinc-500 text-[11px] font-black uppercase tracking-widest">Level {playerLevel}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/[0.02] px-5 py-2 rounded-full border border-white/5">
                            <Trophy size={16} className="text-amber-500" />
                            <span className="text-zinc-500 text-[11px] font-black uppercase tracking-widest">{xp.toLocaleString()} XP</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/[0.02] px-5 py-2 rounded-full border border-white/5">
                            <CheckCircle2 size={16} className="text-emerald-500" />
                            <span className="text-zinc-500 text-[11px] font-black uppercase tracking-widest">{completedIds.length} Cleared</span>
                        </div>
                    </div>
                    <p className="text-zinc-700 text-[9px] font-black tracking-[0.6em] uppercase">Dee's AI Life Lab · 2026</p>
                </div>
            </div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   CHAPTER NODE
   ═══════════════════════════════════════════ */
const ChapterNode = ({ chapter, items, completedIds, completedCount, isLocked, isComplete, isCurrent, isExpanded, onToggle, onSkip, onTagClick, index }: any) => {
    const themeColor = CATEGORY_THEMES[chapter.title] || 'emerald';
    const theme = THEME_CONFIG[themeColor];
    
    const statusColor = isComplete
        ? `border-${themeColor}-500 bg-${themeColor}-500`
        : isCurrent
        ? `border-${themeColor}-400 bg-${themeColor}-500 shadow-lg shadow-${themeColor}-500/20 animate-pulse`
        : 'border-zinc-800 bg-zinc-900';

    return (
        <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
            className={`relative pl-0 md:pl-16 ${isLocked ? 'opacity-40' : ''}`}>
            <div className={`hidden md:flex absolute left-[11px] top-7 w-6 h-6 rounded-full items-center justify-center border-2 z-10 shadow-lg ${statusColor}`}>
                {isLocked ? <Lock size={10} className="text-zinc-700" /> : isComplete ? <CheckCircle2 size={10} className="text-black" /> : <span className="w-1.5 h-1.5 bg-black rounded-full" />}
            </div>

            <motion.div
                className={`border rounded-[1.5rem] transition-all duration-300 cursor-pointer group ${
                    isCurrent ? `border-${themeColor}-500/30 bg-${themeColor}-500/[0.03] shadow-xl shadow-${themeColor}-500/[0.02]` :
                    isComplete ? `border-${themeColor}-500/10 bg-${themeColor}-500/[0.01]` :
                    isLocked ? 'border-zinc-800/50 bg-transparent' :
                    'border-white/[0.05] bg-white/[0.01] hover:border-white/10'
                }`}
                onClick={isLocked ? undefined : onToggle}
            >
                <div className="p-6 md:p-8 flex items-center justify-between">
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                        <span className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-500">{chapter.emoji}</span>
                        <div className="min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h2 className="text-xl font-black text-white truncate">{chapter.title}</h2>
                                {isCurrent && <span className={`text-[8px] bg-${themeColor}-500 text-black px-2 py-0.5 rounded font-black uppercase tracking-wider animate-pulse`}>Questing</span>}
                                {isComplete && <span className={`text-[8px] bg-${themeColor}-500/10 text-${themeColor}-400 px-2 py-0.5 rounded font-black uppercase tracking-wider`}>Done</span>}
                            </div>
                            <p className="text-zinc-600 text-xs mt-1 truncate">{chapter.subtitle}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                        <div className="hidden sm:flex gap-1.5 items-center bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                            {items.map((item: any) => (
                                <div key={item.id} className={`w-2 h-2 rounded-full transition-all duration-700 ${
                                    completedIds.includes(item.id) ? `bg-${themeColor}-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]` : isLocked ? 'bg-zinc-800' : 'bg-zinc-700'
                                }`} />
                            ))}
                        </div>
                        {!isLocked && (
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-zinc-600 group-hover:text-white transition-colors">
                                <ChevronDown size={20} />
                            </motion.div>
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && !isLocked && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} className="overflow-hidden">
                            <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/[0.04] pt-6">
                                <div className="space-y-2">
                                    {items.map((item: any, i: number) => {
                                        const isDone = completedIds.includes(item.id);
                                        return (
                                            <Link key={item.id} to={`/insights/${item.id}`}
                                                className={`group/item flex items-center gap-5 p-4 rounded-2xl transition-all duration-300 ${isDone ? `bg-${themeColor}-500/[0.04] hover:bg-${themeColor}-500/[0.07]` : 'hover:bg-white/[0.03]'}`}>
                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 transition-all ${
                                                    isDone ? `bg-${themeColor}-500 text-black shadow-lg shadow-${themeColor}-500/20` : 'bg-zinc-800 text-zinc-500 group-hover/item:bg-zinc-700'
                                                }`}>
                                                    {isDone ? <CheckCircle2 size={16} /> : i + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm md:text-base font-black text-white truncate group-hover/item:text-emerald-300 transition-colors">{item.title}</h4>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-zinc-700 text-[9px] font-mono flex items-center gap-1"><Zap size={8} /> {item.readTime}</span>
                                                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick?.(item.category); }} 
                                                            className={`text-${themeColor}-500/50 text-[8px] font-black uppercase tracking-tighter hover:text-${themeColor}-400`}>
                                                            {item.category}
                                                        </button>
                                                    </div>
                                                </div>
                                                <ChevronRight size={18} className={`text-zinc-800 group-hover:text-${themeColor}-400 group-hover:item:translate-x-1 transition-all flex-shrink-0`} />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {isLocked && onSkip && (
                    <div className="px-6 md:px-8 pb-6">
                        <button onClick={(e) => { e.stopPropagation(); onSkip(); }}
                            className="flex items-center gap-2 text-amber-500 text-[10px] font-black tracking-widest uppercase hover:text-amber-400 transition-colors bg-amber-500/10 px-5 py-2.5 rounded-full border border-amber-500/20 hover:border-amber-500/40">
                            <Zap size={12} /> Start Challenge
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   INSIGHT CARD
   ═══════════════════════════════════════════ */
const InsightCard = ({ insight, idx, completed, locked, onTagClick }: any) => {
    const themeColor = CATEGORY_THEMES[insight.category] || insight.themeColor || 'emerald';
    const theme = THEME_CONFIG[themeColor] || THEME_CONFIG.emerald;

    const CardContent = (
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} viewport={{ once: true }}
            className={`bg-zinc-900/50 backdrop-blur-sm border border-white/[0.05] ${locked ? '' : theme.border} p-6 md:p-7 rounded-[2rem] h-full flex flex-col relative transition-all duration-500 group-hover:shadow-2xl ${theme.glow} ${completed ? `bg-${themeColor}-500/[0.03] border-${themeColor}-500/20` : ''}`}>
            
            {completed && (
                <div className={`absolute -top-1.5 -right-1.5 bg-${themeColor}-500 text-black p-1.5 rounded-full shadow-lg shadow-${themeColor}-500/40 z-10`}>
                    <CheckCircle2 size={16} />
                </div>
            )}
            
            <div className="flex flex-wrap items-center gap-2 mb-5">
                <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick?.(insight.category); }}
                    className={`text-[9px] font-black px-3 py-1.5 rounded-lg tracking-[0.1em] uppercase transition-all hover:brightness-125 ${theme.tag}`}
                >
                    {insight.category}
                </button>
                {insight.tags?.slice(0, 3).map((tag: string, ti: number) => (
                    <button key={ti}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick?.(tag.replace('#', '')); }}
                        className={`text-[9px] font-bold text-zinc-500 bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/[0.04] hover:border-${themeColor}-500/30 hover:text-${themeColor}-400 transition-all`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <h4 className="text-xl font-black text-white mb-3 line-clamp-2 leading-tight group-hover:text-emerald-100 transition-colors">{insight.title}</h4>
            <p className="text-zinc-500 text-sm line-clamp-2 mb-8 leading-relaxed font-medium">{insight.summary}</p>
            
            <div className="mt-auto">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={8} className={i < (insight.difficulty_level || 1) ? theme.text : 'text-zinc-800'} fill="currentColor" />)}</div>
                    <span className="text-zinc-600 text-[10px] font-black tracking-widest uppercase">Quest Lv.{insight.difficulty_level}</span>
                </div>
                <div className="pt-5 border-t border-white/[0.05] flex items-center justify-between group-hover:border-white/[0.12] transition-colors">
                    <span className="text-zinc-700 text-[10px] font-mono flex items-center gap-1.5">
                        <Zap size={10} className="text-amber-500/50" /> {insight.readTime}
                    </span>
                    <div className={`flex items-center gap-1.5 text-${themeColor}-500/50 group-hover:text-${themeColor}-400 transition-all`}>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">Start</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );

    if (locked) return <div className="cursor-not-allowed">{CardContent}</div>;
    return <Link to={`/insights/${insight.id}`} className="group block">{CardContent}</Link>;
};

export default Insights;
