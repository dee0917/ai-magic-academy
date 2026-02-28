import { Link } from 'react-router-dom';
import { ArrowRight, Gamepad2, MessageSquare, Zap, Sparkles, Coffee, Rocket, Shield, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import Typewriter from '../components/ui/Typewriter';
import { CHAPTERS, MAIN_QUEST_ORDER, SIDE_QUEST_IDS } from '../data/insights';
import { useEffect, useState } from 'react';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const Home = () => {
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        const comp = localStorage.getItem('dee_ai_completed');
        if (comp) setCompletedCount(JSON.parse(comp).length);
    }, []);

    const totalArticles = MAIN_QUEST_ORDER.length + SIDE_QUEST_IDS.length;
    const playerLevel = Math.floor(completedCount / 1.5) + 1;
    const xp = completedCount * 200;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SEO path="/" />

            {/* ═══════════ HERO — 遊戲開始畫面 (融合說明版) ═══════════ */}
            <section className="relative min-h-[95vh] flex items-center justify-center px-6 overflow-hidden pt-20">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.04] blur-[150px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/[0.03] blur-[120px] rounded-full" />
                    <motion.div animate={{ y: [0, -15, 0], x: [0, 8, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/3 left-[10%] w-2 h-2 bg-emerald-500/20 rounded-full" />
                    <motion.div animate={{ y: [0, 12, 0], x: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} className="absolute top-1/2 right-[15%] w-1.5 h-1.5 bg-teal-400/25 rounded-full" />
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 12, repeat: Infinity, delay: 4 }} className="absolute bottom-1/3 left-[60%] w-1 h-1 bg-emerald-400/30 rounded-full" />
                    <motion.div animate={{ y: [0, 10, 0], x: [0, -6, 0] }} transition={{ duration: 9, repeat: Infinity, delay: 1 }} className="absolute top-[15%] right-[40%] w-1.5 h-1.5 bg-emerald-300/15 rounded-full" />
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    {/* Header: Beta + Brain Emoji */}
                    <div className="flex flex-col items-center mb-6">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-xs mb-8 font-medium relative group">
                            <Rocket size={14} /> 讓 AI 成為你的好夥伴
                            <span className="absolute -top-2 -right-12 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-black rounded-lg shadow-lg shadow-orange-500/20 animate-pulse uppercase tracking-tighter">Beta</span>
                        </motion.div>
                        
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                            <span className="text-6xl md:text-7xl block mb-6">🧠</span>
                        </motion.div>
                    </div>

                    {/* The靈魂文字 (From image, with Typewriter) */}
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-10 tracking-tight leading-[1.1]">
                        將繁瑣交給 AI，<br />
                        <span className="font-serif italic font-normal text-zinc-500 text-4xl md:text-6xl lg:text-7xl">
                            把時間留給 <Typewriter texts={['家人', '思考', '生活', '創意']} className="text-[#4285F4] not-italic font-black" />
                        </span>
                    </motion.h1>

                    {/* THE CRITICAL SUBTITLE (Re-integrated for clarity) */}
                    <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                        className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                        用最白話的方式學 AI。<br />
                        <span className="text-white font-bold">{totalArticles} 篇免費互動教學</span>，從完全不會到熟練運用。
                    </motion.p>

                    {/* Stats Card */}
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center gap-8 px-8 py-4 rounded-3xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm">
                            <div className="text-center">
                                <p className="text-2xl font-black text-emerald-400">Lv.{playerLevel}</p>
                                <p className="text-zinc-600 text-[9px] font-bold tracking-widest uppercase">Rank</p>
                            </div>
                            <div className="w-px h-8 bg-zinc-800" />
                            <div className="text-center">
                                <p className="text-xl font-black text-amber-400">{xp.toLocaleString()}</p>
                                <p className="text-zinc-600 text-[9px] font-bold tracking-widest uppercase">XP</p>
                            </div>
                            <div className="w-px h-8 bg-zinc-800" />
                            <div className="text-center">
                                <p className="text-xl font-black text-white">{completedCount}/{totalArticles}</p>
                                <p className="text-zinc-600 text-[9px] font-bold tracking-widest uppercase">Tasks</p>
                            </div>
                        </div>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link to="/insights"
                            className="group inline-flex items-center gap-3 bg-emerald-500 text-black px-12 py-6 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5">
                            開始冒險
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/about"
                            className="inline-flex items-center gap-2 bg-white/5 text-white px-8 py-4 rounded-2xl font-bold text-base border border-white/10 hover:bg-white/10 transition-all">
                            認識 Dee
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ 旅程預覽 — 章節時間線 ═══════════ */}
            <section id="journey" className="py-20 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <span className="text-emerald-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">LEARNING JOURNEY</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">5 個章節，{totalArticles} 篇教學，1 段冒險</h2>
                        <p className="text-zinc-500 max-w-lg mx-auto">從「AI 是什麼？」到「用 AI 搞定生活大小事」，每篇都有互動練習和小測驗。</p>
                    </motion.div>

                    <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                        <div className="flex gap-4 min-w-max md:min-w-0 md:grid md:grid-cols-5">
                            {CHAPTERS.map((chapter, i) => (
                                <motion.div key={chapter.id} {...fadeUp} transition={{ delay: i * 0.08 }}>
                                    <Link to="/insights"
                                        className="group block w-48 md:w-auto bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 rounded-2xl p-5 transition-all hover:-translate-y-1">
                                        <span className="text-3xl block mb-3">{chapter.emoji}</span>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-zinc-600 text-[10px] font-mono">Ch.{chapter.id}</span>
                                            <span className="text-zinc-700 text-[10px]">· {chapter.articleIds.length} 篇</span>
                                        </div>
                                        <h3 className="text-white font-bold text-base mb-1 group-hover:text-emerald-300 transition-colors">{chapter.title}</h3>
                                        <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2">{chapter.subtitle}</p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div {...fadeUp} className="text-center mt-8">
                        <span className="text-zinc-700 text-xs">+ 🎲 {SIDE_QUEST_IDS.length} 篇支線任務（育兒、寵物、投資⋯⋯）隨時可以探索</span>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ 三大賣點 ═══════════ */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <span className="text-emerald-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">WHY HERE</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">這裡跟其他教學有什麼不同？</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                emoji: '🎮',
                                title: '闖關式學習',
                                desc: '不是看完一篇就結束。每個技巧都有互動步驟、小測驗和勳章，像玩遊戲一樣學 AI。',
                                detail: '完成一關，解鎖下一關',
                            },
                            {
                                emoji: '💬',
                                title: '零術語，全白話',
                                desc: '不會出現「Large Language Model」這種詞。所有概念都用生活中的比喻解釋，8 歲到 80 歲都看得懂。',
                                detail: 'AI = 很會打字的朋友',
                            },
                            {
                                emoji: '⚡',
                                title: '學完立刻能用',
                                desc: '每篇都附「一鍵複製指令」，學完直接貼進 ChatGPT / Claude / Gemini，3 分鐘搞定一件事。',
                                detail: '附贈即用指令模板',
                            },
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                                className="bg-white/[0.02] border border-white/5 hover:border-emerald-500/15 rounded-2xl p-7 transition-all group">
                                <span className="text-4xl block mb-4">{item.emoji}</span>
                                <h3 className="text-xl font-black text-white mb-3">{item.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                                <span className="text-emerald-500/60 text-xs font-bold">{item.detail}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ Before / After ═══════════ */}
            <section className="py-20 px-6 border-t border-white/5 bg-black/10">
                <div className="max-w-4xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <span className="text-emerald-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">REAL RESULTS</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">學會之後，生活會變怎樣？</h2>
                    </motion.div>

                    <div className="space-y-6">
                        {[
                            {
                                scene: '📧 回覆一封工作信',
                                before: '糾結措辭 30 分鐘，還怕寫錯',
                                after: '告訴 AI 重點，3 分鐘搞定，寫得比自己更得體',
                            },
                            {
                                scene: '🍽️ 想今天晚餐吃什麼',
                                before: '滑食譜 APP 30 分鐘，越看越不知道要煮什麼',
                                after: '「冰箱有雞腿和花椰菜，15 分鐘內能做好的菜」→ 3 個選擇秒出',
                            },
                            {
                                scene: '🧠 看到一個不懂的概念',
                                before: 'Google 搜一堆專業文章，看完還是不懂',
                                after: '「請用我 10 歲小孩聽得懂的方式解釋」→ 30 秒搞懂',
                            },
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4 items-stretch">
                                <div className="flex items-center justify-center md:justify-end">
                                    <span className="text-white font-bold text-base md:text-right">{item.scene}</span>
                                </div>
                                <div className="bg-red-500/[0.04] border border-red-500/10 rounded-xl p-4 relative">
                                    <span className="text-red-400/60 text-[10px] font-bold uppercase tracking-widest block mb-1">Before</span>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{item.before}</p>
                                </div>
                                <div className="bg-emerald-500/[0.04] border border-emerald-500/10 rounded-xl p-4 relative">
                                    <span className="text-emerald-400/60 text-[10px] font-bold uppercase tracking-widest block mb-1">After</span>
                                    <p className="text-white text-sm leading-relaxed font-medium">{item.after}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ Dee 介紹 — 極簡版 ═══════════ */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div {...fadeUp}>
                        <span className="text-4xl block mb-6">👋</span>
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">我是 Dee</h2>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6">
                            一個跟你一樣從零開始學 AI 的普通人。<br />
                            這裡沒有術語、沒有付費牆，<span className="text-white">只有你能立刻用上的方法。</span>
                        </p>
                        <div className="flex items-center justify-center gap-6">
                            <a href="https://www.instagram.com/deedeeboy_xoxo" target="_blank" rel="noopener noreferrer"
                                className="text-zinc-600 hover:text-white text-sm font-bold transition-colors flex items-center gap-2">
                                📷 @deedeeboy_xoxo
                            </a>
                            <a href="https://www.threads.net/@deedeeboy_xoxo" target="_blank" rel="noopener noreferrer"
                                className="text-zinc-600 hover:text-white text-sm font-bold transition-colors flex items-center gap-2">
                                🧵 Threads
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ 最終 CTA + Sponsor ═══════════ */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div {...fadeUp}>
                        <Sparkles size={28} className="text-emerald-500 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">準備好了嗎？</h2>
                        <p className="text-zinc-500 text-base mb-14 leading-relaxed">
                            {totalArticles} 篇免費教學。5 個章節。1 段冒險旅程。<br />
                            <span className="text-zinc-400">全程免費，沒有付費牆。</span>
                        </p>
                        
                        <Link to="/insights"
                            className="group inline-flex items-center gap-3 bg-emerald-500 text-black px-12 py-6 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 mb-24">
                            開始我的 AI 之旅
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* Sponsor Card */}
                        <div className="bg-gradient-to-br from-zinc-900 to-black border border-emerald-500/20 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden group">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-all" />
                            
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="text-left">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                                            <Coffee size={24} className="text-amber-500" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white">贊助實驗室進化</h3>
                                    </div>
                                    <p className="text-zinc-400 text-base md:text-lg max-w-md leading-relaxed">
                                        如果你覺得這些教學對你有幫助，歡迎支持我。你的贊助會讓實驗室開發出更多、更酷的免費關卡。
                                    </p>
                                </div>

                                <div className="w-full md:w-auto">
                                    <a href="https://p.ecpay.com.tw/XXXXXX" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 bg-amber-500 text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 hover:-translate-y-0.5">
                                        <Coffee size={24} />
                                        請 Dee 喝杯咖啡
                                    </a>
                                </div>
                            </div>
                        </div>

                        <p className="mt-12 text-zinc-700 text-[10px] font-bold tracking-[0.5em] uppercase">Dee's AI Life Lab · 2026</p>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
