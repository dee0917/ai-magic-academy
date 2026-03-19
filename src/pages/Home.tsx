import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Rocket, Sparkles, Coffee, Scroll } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import Typewriter from '../components/ui/Typewriter';
import { CHAPTERS, MAIN_QUEST_ORDER } from '../data/insights';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const Home = () => {
    const totalArticles = MAIN_QUEST_ORDER.length;

    return (
        <div className="relative parchment-texture overflow-x-hidden pt-20">
            <SEO path="/" />
            <div className="grid-bg-magic" />
            
            {/* 魔法符文背景動畫 */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
                {[...Array(15)].map((_, i) => (
                    <div 
                        key={i} 
                        className="magic-stream"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 5 + 5}s`,
                            animationDelay: `${Math.random() * 10}s`,
                            width: '2px',
                        }}
                    />
                ))}
            </div>

            {/* HERO SECTION - 復古海報風格 */}
            <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20 border-b-6 border-magic-text">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="text-left space-y-8">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 border-4 border-magic-text bg-magic-teal text-magic-bg px-6 py-2 font-display text-sm shadow-brutalist animate-bounce">
                            <Rocket size={18} /> 
                            麻瓜專用魔法外掛已上線
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-6xl md:text-8xl font-display text-magic-text leading-[0.9] tracking-tighter">
                            將繁瑣交給 AI，<br />
                            <span className="text-magic-red underline decoration-8 decoration-magic-text underline-offset-4 inline-block mt-4">
                                把時間留給 <Typewriter texts={['生活', '思考', '家人', '創意']} className="not-italic" />
                            </span>
                        </motion.h1>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl text-magic-text/80 font-serif leading-relaxed max-w-xl border-l-6 border-magic-teal pl-6">
                            拒絕生硬科技感。用最白話的方式施放 AI 咒語，<br />
                            <span className="bg-magic-primary px-2 font-black">完全免費的 {totalArticles} 段修行之旅</span>，從此掌握未來。
                        </motion.p>

                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-6">
                            <Link to="/insights" className="btn-magic text-center text-2xl flex items-center justify-center gap-4 py-6 px-12">
                                進入魔法閣 <ArrowRight size={32} strokeWidth={3} />
                            </Link>
                            <Link to="/about" className="btn-magic bg-magic-bg text-center text-2xl">
                                認識大法師
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div initial={{ opacity: 0, rotate: 10, scale: 0.8 }} animate={{ opacity: 1, rotate: -2, scale: 1 }} transition={{ type: "spring", delay: 0.3 }}
                        className="relative hidden lg:block">
                        <div className="w-full aspect-square bg-magic-primary border-6 border-magic-text shadow-brutalist p-8 flex flex-col justify-between">
                            <div className="text-8xl">🔮</div>
                            <div className="space-y-4">
                                <div className="h-4 bg-magic-text/20 w-3/4" />
                                <div className="h-4 bg-magic-text/20 w-full" />
                                <div className="h-4 bg-magic-text/20 w-1/2" />
                            </div>
                            <div className="text-right font-display text-4xl text-magic-red">LV.99 MAGE</div>
                        </div>
                        {/* 裝飾性元素 */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-magic-red border-6 border-magic-text rotate-12 -z-10 shadow-brutalist" />
                    </div>
                </div>
            </section>

            {/* JOURNEY SECTION - 章節卡片牆 */}
            <section id="journey" className="py-32 px-6 bg-magic-teal parchment-texture">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <span className="bg-magic-primary text-magic-text px-6 py-2 border-4 border-magic-text font-display text-lg shadow-brutalist inline-block mb-8">LEARNING JOURNEY</span>
                        <h2 className="text-5xl md:text-7xl font-display text-magic-bg tracking-tighter">5 大魔法領域，{totalArticles} 篇秘笈</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {CHAPTERS.map((chapter, i) => (
                            <motion.div key={chapter.id} {...fadeUp} transition={{ delay: i * 0.1 }}>
                                <Link to="/insights" className="group block h-full bg-magic-bg border-4 border-magic-text shadow-brutalist hover:shadow-brutalist-hover hover:-translate-y-2 transition-all p-8 relative overflow-hidden">
                                    <span className="text-6xl block mb-6">{chapter.emoji}</span>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-magic-text text-magic-bg px-3 py-1 text-xs font-black uppercase tracking-widest">CH.{chapter.id}</span>
                                        <span className="text-magic-teal text-xs font-black uppercase tracking-tight">{chapter.articleIds.length} 篇修行</span>
                                    </div>
                                    <h3 className="text-2xl font-serif font-black text-magic-text mb-4 leading-tight group-hover:text-magic-red transition-colors">{chapter.title}</h3>
                                    <p className="text-magic-text/60 text-sm leading-relaxed font-medium">{chapter.subtitle}</p>
                                    
                                    <div className="absolute -right-4 -bottom-4 text-magic-text/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                        <Scroll size={120} strokeWidth={1} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VALUE SECTION - 核心特點 */}
            <section className="py-32 px-6 border-b-6 border-magic-text">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {[
                        {
                            emoji: '🎮',
                            title: '闖關式修行',
                            desc: '不是單調的閱讀。每個技巧都有互動環節、邏輯考驗，讓學習像遊戲一樣有趣。',
                            detail: '解鎖更高階咒語 🔓',
                        },
                        {
                            emoji: '📜',
                            title: '零術語 ‧ 全白話',
                            desc: '大釜裡不放難懂的縮寫。我們將複雜的 AI 理論拆解成貓咪也能聽懂的比喻。',
                            detail: '告別科技焦慮 🤝',
                        },
                        {
                            emoji: '🔥',
                            title: '詠唱即刻生效',
                            desc: '每篇均附「一鍵複製咒語」。學完立刻貼進大釜（GPT/Claude），三分鐘搞定工作。',
                            detail: '領取專屬指令模板 📋',
                        },
                    ].map((item, i) => (
                        <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }}
                            className="bg-white border-4 border-magic-text p-10 shadow-brutalist relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-magic-primary" />
                            <span className="text-7xl block mb-8 group-hover:scale-110 transition-transform">{item.emoji}</span>
                            <h3 className="text-3xl font-display text-magic-text mb-6">{item.title}</h3>
                            <p className="text-magic-text/70 text-lg leading-relaxed mb-8 font-medium">{item.desc}</p>
                            <span className="badge-magic">{item.detail}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TRANSFORMATION SECTION - 學會之後 */}
            <section className="py-32 px-6 bg-magic-text parchment-texture relative">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div {...fadeUp} className="mb-24">
                        <span className="bg-magic-red text-magic-bg px-6 py-2 border-4 border-magic-bg font-display text-lg shadow-[8px_8px_0px_#8B2626] inline-block mb-8">THE TRANSFORMATION</span>
                        <h2 className="text-5xl md:text-7xl font-display text-magic-bg tracking-tight">從麻瓜到魔法師的蛻變</h2>
                    </motion.div>

                    <div className="space-y-12">
                        {[
                            {
                                scene: '📧 職場防禦術',
                                before: '糾結回信內容 30 分鐘，還怕老闆生氣',
                                after: '告知 AI 重點，3 分鐘產出專業回覆，深得人心',
                            },
                            {
                                scene: '🍳 鍊金食譜',
                                before: '看著冰箱發呆半小時，最後吃泡麵',
                                after: '拍照給 AI，30 秒獲得三道米其林等級推薦',
                            },
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                                className="grid grid-cols-1 md:grid-cols-[1fr_20px_1fr] items-center gap-8 bg-magic-bg border-4 border-magic-bg p-8 shadow-[12px_12px_0px_#1A5C5A]">
                                <div className="bg-magic-red/10 p-8 border-4 border-dashed border-magic-red/30">
                                    <span className="text-magic-red font-display text-xs tracking-widest block mb-4">BEFORE 傳統操作</span>
                                    <p className="text-magic-text/60 font-serif text-lg italic">{item.before}</p>
                                </div>
                                <div className="text-magic-teal font-display text-4xl hidden md:block">→</div>
                                <div className="bg-magic-teal/10 p-8 border-4 border-magic-teal">
                                    <span className="text-magic-teal font-display text-xs tracking-widest block mb-4">AFTER 魔法加持</span>
                                    <p className="text-magic-text font-serif text-xl font-black">{item.after}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-40 px-6 border-t-6 border-magic-text text-center">
                <motion.div {...fadeUp}>
                    <Sparkles size={64} className="text-magic-primary mx-auto mb-12 animate-pulse" />
                    <h2 className="text-5xl md:text-8xl font-display text-magic-text mb-12 tracking-tighter leading-none">準備好翻開這本魔法書了嗎？</h2>
                    
                    <Link to="/insights"
                        className="btn-magic-red text-4xl px-20 py-10 shadow-[16px_16px_0px_#2A2723] hover:shadow-[20px_20px_0px_#2A2723] inline-flex items-center gap-6">
                        開始我的魔法冒險 <ArrowRight size={48} strokeWidth={3} />
                    </Link>

                    <div className="mt-40 bg-magic-bg border-6 border-magic-text p-12 md:p-24 relative shadow-brutalist max-w-5xl mx-auto text-left group">
                        <div className="absolute top-0 right-0 p-8 halftone-loading w-40 h-40 opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="flex-1 space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 bg-magic-primary border-4 border-magic-text flex items-center justify-center shadow-brutalist-sm rotate-3">
                                        <Coffee size={40} />
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-display text-magic-text">贊助實驗室進化</h3>
                                </div>
                                <p className="text-xl md:text-2xl text-magic-text/80 font-serif leading-relaxed italic">
                                    教學將永遠保持免費。你的支持將轉化為魔藥材料，<br />
                                    助我研發更高階的咒語關卡。
                                </p>
                            </div>
                            <a href="https://pay.ecpay.com.tw/CreditPayment/ExpressCredit?MerchantID=3378826" target="_blank" rel="noopener noreferrer"
                                className="btn-magic bg-magic-primary text-3xl px-12 py-8 flex items-center gap-4">
                                <Coffee size={32} strokeWidth={3} /> 請喝杯魔藥
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

            <footer className="py-20 text-center border-t-6 border-magic-text bg-magic-primary text-magic-text font-display text-sm tracking-[0.4em]">
                DEE'S AI MAGIC LAB · EST 2026 · NO MUGGLES ALLOWED
            </footer>
        </div>
    );
};

export default Home;
