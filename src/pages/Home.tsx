import { Link } from 'react-router-dom';
import { ArrowRight, Gamepad2, MessageSquare, Zap, Sparkles, Coffee, Rocket, Trophy } from 'lucide-react';
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
        if (comp) {
            try {
                setCompletedCount(JSON.parse(comp).length);
            } catch(e) {
                setCompletedCount(0);
            }
        }
    }, []);

    const totalArticles = MAIN_QUEST_ORDER.length + SIDE_QUEST_IDS.length;
    const playerLevel = Math.floor(completedCount / 1.5) + 1;
    const xp = completedCount * 200;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SEO path="/" />

            {/* ═══════════ HERO — 遊戲開始畫面 (可讀性優化版) ═══════════ */}
            <section className="relative min-h-[95vh] flex items-center justify-center px-6 overflow-hidden pt-20">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.04] blur-[150px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/[0.03] blur-[120px] rounded-full" />
                    <motion.div animate={{ y: [0, -15, 0], x: [0, 8, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/3 left-[10%] w-2 h-2 bg-emerald-500/20 rounded-full" />
                    <motion.div animate={{ y: [0, 12, 0], x: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} className="absolute top-1/2 right-[15%] w-1.5 h-1.5 bg-teal-400/25 rounded-full" />
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    {/* Header: Beta + Brain Emoji */}
                    <div className="flex flex-col items-center mb-8">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-5 py-2 rounded-full text-sm mb-10 font-bold relative group">
                            <Rocket size={16} /> 讓 AI 成為你的好夥伴
                            <span className="absolute -top-2 -right-12 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[11px] font-black rounded-lg shadow-lg shadow-orange-500/30 animate-pulse uppercase tracking-tighter">Beta</span>
                        </motion.div>
                        
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                            <span className="text-7xl md:text-8xl block mb-6">🧠</span>
                        </motion.div>
                    </div>

                    {/* The靈魂文字 (From image, with Typewriter) */}
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-12 tracking-tight leading-[1.1]">
                        將繁瑣交給 AI，<br />
                        <span className="font-serif italic font-normal text-zinc-400 text-4xl md:text-6xl lg:text-7xl">
                            把時間留給 <Typewriter texts={['家人', '思考', '生活', '創意']} className="text-[#4285F4] not-italic font-black" />
                        </span>
                    </motion.h1>

                    {/* THE CRITICAL SUBTITLE (Contrast increased) */}
                    <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                        className="text-xl md:text-2xl text-zinc-200 mb-14 leading-relaxed max-w-2xl mx-auto font-medium">
                        用最白話的方式學 AI。<br />
                        <span className="text-white font-black underline decoration-emerald-500 decoration-4 underline-offset-8">{totalArticles} 篇免費互動教學</span>，從完全不會到熟練運用。
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link to="/insights"
                            className="group inline-flex items-center gap-3 bg-emerald-500 text-black px-12 py-6 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1">
                            開始冒險之旅
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/about"
                            className="inline-flex items-center gap-2 bg-white/5 text-white px-8 py-5 rounded-2xl font-black text-lg border border-white/10 hover:bg-white/10 transition-all">
                            認識 Dee
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ 旅程預覽 — 章節時間線 ═══════════ */}
            <section id="journey" className="py-24 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className="text-emerald-500 font-black tracking-[0.4em] text-xs uppercase mb-4 block">LEARNING JOURNEY</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">5 個章節，{totalArticles} 篇教學，1 段冒險</h2>
                        <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">從「AI 是什麼？」到「用 AI 搞定生活大小事」，每篇都有互動練習、小測驗與專屬勳章。</p>
                    </motion.div>

                    <div className="overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide">
                        <div className="flex gap-6 min-w-max md:min-w-0 md:grid md:grid-cols-5">
                            {CHAPTERS.map((chapter, i) => (
                                <motion.div key={chapter.id} {...fadeUp} transition={{ delay: i * 0.08 }}>
                                    <Link to="/insights"
                                        className="group block w-56 md:w-auto bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 rounded-3xl p-7 transition-all hover:-translate-y-2 shadow-lg">
                                        <span className="text-4xl block mb-4">{chapter.emoji}</span>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-zinc-400 text-xs font-black font-mono tracking-widest">CH.{chapter.id}</span>
                                            <span className="text-emerald-500/80 text-xs font-black uppercase tracking-tight">{chapter.articleIds.length} 篇攻略</span>
                                        </div>
                                        <h3 className="text-white font-black text-lg mb-2 group-hover:text-emerald-300 transition-colors">{chapter.title}</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 font-medium">{chapter.subtitle}</p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div {...fadeUp} className="text-center mt-12">
                        <div className="inline-flex items-center gap-3 bg-white/[0.03] px-6 py-2 rounded-full border border-white/5">
                            <span className="text-zinc-400 text-xs font-black uppercase tracking-widest">+ 🎲 {SIDE_QUEST_IDS.length} 篇支線任務</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-800" />
                            <span className="text-zinc-500 text-xs font-medium">育兒、寵物、投資...隨時探索</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ 三大賣點 ═══════════ */}
            <section className="py-24 px-6 border-t border-white/5 bg-zinc-900/30">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className="text-emerald-500 font-black tracking-[0.4em] text-xs uppercase mb-4 block">CORE VALUE</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">為什麼大家都推薦這裡？</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                emoji: '🎮',
                                title: '闖關式學習',
                                desc: '不是看完一篇就結束。每個技巧都有互動步驟、小測驗和勳章，像玩遊戲一樣學 AI。',
                                detail: '完成一關，解鎖下一關 🔓',
                            },
                            {
                                emoji: '💬',
                                title: '零術語，全白話',
                                desc: '不會出現「Large Language Model」這種詞。所有概念都用生活中的比喻解釋，全齡通吃。',
                                detail: 'AI = 很會打字的朋友 🤝',
                            },
                            {
                                emoji: '⚡',
                                title: '學完立刻能用',
                                desc: '每篇都附「一鍵複製指令」，學完直接貼進 ChatGPT / Claude / Gemini，3 分鐘搞定。',
                                detail: '附贈即用指令模板 📋',
                            },
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                                className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-emerald-500/30 rounded-3xl p-8 transition-all group shadow-xl">
                                <span className="text-5xl block mb-6">{item.emoji}</span>
                                <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                                <p className="text-zinc-300 text-base leading-relaxed mb-6 font-medium">{item.desc}</p>
                                <span className="text-emerald-400 font-black text-xs uppercase tracking-widest">{item.detail}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ Before / After ═══════════ */}
            <section className="py-24 px-6 border-t border-white/5 bg-black">
                <div className="max-w-4xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className="text-emerald-500 font-black tracking-[0.4em] text-xs uppercase mb-4 block">THE TRANSFORMATION</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">學會之後，生活大不同</h2>
                    </motion.div>

                    <div className="space-y-8">
                        {[
                            {
                                scene: '📧 回覆工作信件',
                                before: '糾結措辭 30 分鐘，還怕寫錯',
                                after: '告訴 AI 重點，3 分鐘搞定，專業又得體',
                            },
                            {
                                scene: '🍽️ 想今天要煮什麼',
                                before: '滑食譜 30 分鐘，還是沒主意',
                                after: '給 AI 冰箱食材，30 秒出三個推薦方案',
                            },
                            {
                                scene: '🧠 看到難懂的概念',
                                before: 'Google 搜半天，看完還是很模糊',
                                after: '「用 10 歲小孩聽得懂的話解釋」→ 秒懂',
                            },
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                                className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-4 items-center">
                                <div className="flex items-center justify-center md:justify-end">
                                    <span className="text-white font-black text-lg md:text-right">{item.scene}</span>
                                </div>
                                <div className="bg-red-500/[0.06] border border-red-500/20 rounded-2xl p-5 relative shadow-lg">
                                    <span className="text-red-400 font-black text-[11px] uppercase tracking-widest block mb-2 opacity-80">BEFORE</span>
                                    <p className="text-zinc-400 text-sm leading-relaxed font-medium">{item.before}</p>
                                </div>
                                <div className="bg-emerald-500/[0.08] border border-emerald-500/30 rounded-2xl p-5 relative shadow-[0_0_25px_rgba(16,185,129,0.05)]">
                                    <span className="text-emerald-400 font-black text-[11px] uppercase tracking-widest block mb-2">AFTER</span>
                                    <p className="text-white text-base leading-relaxed font-black">{item.after}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ Dee 介紹 — 極簡版 ═══════════ */}
            <section className="py-24 px-6 border-t border-white/5 bg-zinc-900/20">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div {...fadeUp}>
                        <span className="text-5xl block mb-8">👋</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">我是 Dee</h2>
                        <p className="text-zinc-200 text-lg md:text-xl leading-relaxed mb-10 font-medium">
                            一個跟你一樣從零開始學 AI 的普通人。<br />
                            這裡沒有艱深術語，<span className="text-emerald-400 font-black">只有你能立刻用上的方法。</span>
                        </p>
                        <div className="flex items-center justify-center gap-10">
                            <a href="https://www.instagram.com/deedeeboy_xoxo" target="_blank" rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-white text-base font-black transition-all flex items-center gap-2 hover:scale-105">
                                📷 @deedeeboy_xoxo
                            </a>
                            <a href="https://www.threads.net/@deedeeboy_xoxo" target="_blank" rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-white text-base font-black transition-all flex items-center gap-2 hover:scale-105">
                                🧵 Threads
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ 最終 CTA + Sponsor ═══════════ */}
            <section className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-black to-zinc-900">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div {...fadeUp}>
                        <Sparkles size={40} className="text-emerald-400 mx-auto mb-8 animate-pulse" />
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">準備好了嗎？</h2>
                        <p className="text-zinc-300 text-lg md:text-xl mb-16 leading-relaxed font-medium">
                            {totalArticles} 篇免費教學。5 個章節。1 段冒險旅程。<br />
                            <span className="text-white font-black underline decoration-emerald-500/50 decoration-2 underline-offset-4">全程免費，無隱藏費用。</span>
                        </p>
                        
                        <Link to="/insights"
                            className="group inline-flex items-center gap-4 bg-emerald-500 text-black px-14 py-7 rounded-[2rem] font-black text-2xl hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/50 hover:-translate-y-2 mb-32">
                            開始我的 AI 之旅
                            <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </Link>

                        {/* Sponsor Card (Redesigned for better impact and clarity) */}
                        <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-emerald-500/30 rounded-[3rem] p-10 md:p-16 relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.03)]">
                            <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full" />
                            
                            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                                <div className="text-left flex-1">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 flex items-center justify-center shadow-lg shadow-amber-500/5">
                                            <Coffee size={30} className="text-amber-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl md:text-4xl font-black text-white">贊助實驗室進化</h3>
                                            <span className="text-amber-500/80 text-[10px] font-black uppercase tracking-[0.4em] block mt-1">Support the Mission</span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-200 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                                        如果你覺得這些教學對你有幫助，歡迎請 Dee 喝杯咖啡。<br />
                                        你的支持會直接用於 **「開發新關卡」** 與 **「系統營運」**，讓教學永遠免費。
                                    </p>
                                </div>

                                <div className="w-full lg:w-auto">
                                    <a href="https://pay.ecpay.com.tw/CreditPayment/ExpressCredit?MerchantID=3378826" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-4 bg-amber-500 text-black px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/20 hover:-translate-y-1 group/btn">
                                        <Coffee size={24} className="group-hover/btn:rotate-12 transition-transform" />
                                        請 Dee 喝杯咖啡
                                    </a>
                                    <p className="mt-4 text-zinc-500 text-xs font-medium italic text-center">支援 信用卡 / ATM / 超商支付 (綠界)</p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-20 text-zinc-700 text-[11px] font-black tracking-[0.6em] uppercase">Dee's AI Life Lab · 2026</p>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
