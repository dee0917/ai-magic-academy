import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Users, BookOpen, Zap, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INSIGHTS_LIST } from '../data/insights';
import SEO from '../components/ui/SEO';

const milestones = [
    { year: '2025', event: '開始探索 AI，發現它能徹底改變日常生活的效率' },
    { year: '2025', event: '從零開始，用 AI 輔助開發出第一個 Web App「iHaveTime」' },
    { year: '2026', event: '創立「Dee\'s AI Life Lab」，將所有實驗心得系統化分享' },
    { year: '2026', event: '累積 18+ 篇實戰教學，涵蓋從入門心法到進階工具應用' },
];

const values = [
    { icon: Heart, title: '白話文優先', desc: '不用專業術語，小孩到長輩都能聽懂。' },
    { icon: Zap, title: '實戰驗證', desc: '每個方法都是我親自實驗後整理的心得，不是紙上談兵。' },
    { icon: Users, title: '人人可用', desc: '不需要會寫程式，只需要一顆好奇的心。' },
    { icon: BookOpen, title: '免費開放', desc: '核心教學內容完全免費，知識不該有門檻。' },
];

const About = () => {
    const articleCount = INSIGHTS_LIST.length;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <SEO title="關於 Dee" description="我是 Dee，專門把複雜的 AI 知識變成任何人都能用的實用技能。" path="/about" />

            {/* Hero */}
            <div className="text-center mb-20">
                <span className="text-emerald-500 font-bold tracking-widest text-xs uppercase mb-4 block">ABOUT DEE</span>
                <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6 leading-tight">
                    把複雜的 AI，<br />
                    <span className="text-zinc-400 italic font-normal">變成你的日常超能力。</span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    我是 Dee。不是工程師，也不會寫複雜的程式碼。<br />
                    但我發現了一件事——<span className="text-white font-medium">只要學會跟 AI 溝通，任何人都能讓生活變得更輕鬆。</span>
                </p>
            </div>

            {/* 品牌金句 */}
            <p className="text-xl text-zinc-300 font-serif italic text-center py-10 border-y border-white/5 my-16 leading-relaxed">
                「你想讓 AI 幫你做什麼，我就教你怎麼做到。」
            </p>

            {/* 我的故事 */}
            <section className="mb-20">
                <h2 className="text-2xl font-bold text-white mb-8">我的故事</h2>
                <div className="space-y-6 text-zinc-300 leading-relaxed text-lg">
                    <p>
                        生活中有太多事情在消耗我們的時間和精力。報表、回信、整理檔案、重複性的瑣事⋯⋯這些事情不該佔據你的人生。
                    </p>
                    <p>
                        我花了大量時間研究 AI，從整理資料、撰寫文案、規劃行程，到建立自動化流程——這些以前需要花好幾個小時的工作，現在可以在幾分鐘內完成。
                    </p>
                    <p>
                        更棒的是，<strong className="text-white">你完全不需要會寫程式</strong>。我把這些實驗過程全部記錄下來，變成任何人都能跟著做的教學。
                    </p>
                </div>
            </section>

            {/* 成長時間線 */}
            <section className="mb-20">
                <h2 className="text-2xl font-bold text-white mb-8">成長軌跡</h2>
                <div className="space-y-0">
                    {milestones.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex gap-6 py-5 border-b border-white/5"
                        >
                            <span className="text-emerald-500 font-mono font-bold text-sm w-12 flex-shrink-0 pt-0.5">{m.year}</span>
                            <p className="text-zinc-300">{m.event}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 核心理念 */}
            <section className="mb-20">
                <h2 className="text-2xl font-bold text-white mb-8">核心理念</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="bg-[#111] border border-white/5 rounded-2xl p-6"
                        >
                            <v.icon size={24} className="text-emerald-500 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 數據成就 */}
            <section className="mb-20">
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-10 text-center">
                    <Sparkles className="text-emerald-500 mx-auto mb-4" size={28} />
                    <h2 className="text-xl font-bold text-white mb-8">目前的成績單</h2>
                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <span className="text-4xl font-bold text-white font-mono">{articleCount}</span>
                            <p className="text-zinc-400 text-sm mt-1">篇實戰教學</p>
                        </div>
                        <div>
                            <span className="text-4xl font-bold text-white font-mono">2</span>
                            <p className="text-zinc-400 text-sm mt-1">個 AI 專案</p>
                        </div>
                        <div>
                            <span className="text-4xl font-bold text-white font-mono">0</span>
                            <p className="text-zinc-400 text-sm mt-1">行程式碼需求</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 社群連結 */}
            <section className="mb-20 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">追蹤我的日常</h2>
                <p className="text-zinc-400 mb-8">我會在社群分享更多 AI 實驗與生活靈感。</p>
                <div className="flex justify-center gap-4">
                    <a href="https://www.instagram.com/deedeeboy_xoxo" target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors">
                        <Instagram size={18} /> Instagram
                    </a>
                    <a href="https://www.threads.net/@deedeeboy_xoxo" target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors">
                        @ Threads
                    </a>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center pt-12 border-t border-white/5">
                <p className="text-emerald-500 font-medium text-lg mb-6">準備好把時間還給自己了嗎？</p>
                <Link to="/insights" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors">
                    開始免費學習 <ArrowRight size={18} />
                </Link>
            </div>
        </motion.div>
    );
};

export default About;
