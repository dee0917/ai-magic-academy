import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Zap, CheckCircle, BookOpen, MessageCircle, Rocket, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Typewriter from '../components/ui/Typewriter';
import NewsletterForm from '../components/ui/NewsletterForm';
import ProcessSection from '../components/sections/ProcessSection';
import ROICalculator from '../components/sections/ROICalculator';
import { INSIGHTS, TESTIMONIALS } from '../data/mock';

const Home = () => {
    const navigate = useNavigate();

    // 升級版方案資料
    const enhancedSolutions = [
        {
            id: 1,
            title: 'AI 入門懶人包',
            type: '免費資源',
            desc: '從零開始學 AI，用最白話的方式帶你入門，保證看得懂。',
            action: '免費下載',
            targetAudience: '完全沒接觸過 AI 的新手',
            benefits: ['5 分鐘搞懂 AI 能幫你做什麼', '最常用的 3 個免費工具介紹', 'Prompt 撰寫入門技巧'],
            icon: BookOpen,
            gradient: 'from-emerald-500 to-teal-600',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            hoverBorder: 'hover:border-emerald-500/50',
            color: '#10b981'
        },
        {
            id: 2,
            title: '全家學 AI 工作坊',
            type: '線上課程',
            desc: '專為家庭設計，讓大人小孩一起學，邊玩邊學會 AI。',
            action: '查看詳情',
            targetAudience: '想和家人一起學習的你',
            benefits: ['適合 8 歲以上全年齡層', '互動式教學，不枯燥', '學完立刻能應用在生活中'],
            icon: Users,
            gradient: 'from-violet-500 to-purple-600',
            bg: 'bg-violet-500/10',
            border: 'border-violet-500/20',
            hoverBorder: 'hover:border-violet-500/50',
            color: '#8b5cf6'
        },
        {
            id: 3,
            title: '1 對 1 AI 入門諮詢',
            type: '個人指導',
            desc: '不知道從哪開始？讓 Dee 親自帶你跨出第一步。',
            action: '預約諮詢',
            targetAudience: '想要客製化學習路徑的你',
            benefits: ['30 分鐘深度諮詢', '針對你的需求量身規劃', '專屬學習資源推薦'],
            icon: MessageCircle,
            gradient: 'from-amber-500 to-orange-600',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            hoverBorder: 'hover:border-amber-500/50',
            color: '#f59e0b'
        }
    ];

    // 顏色映射邏輯
    const getColorClasses = (themeColor: string) => {
        const colors: Record<string, any> = {
            emerald: {
                text: 'text-emerald-500',
                bg: 'bg-emerald-500/10',
                border: 'hover:border-emerald-500/30',
                arrow: 'group-hover:text-emerald-400',
                tag: 'text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20'
            },
            amber: {
                text: 'text-amber-500',
                bg: 'bg-amber-500/10',
                border: 'hover:border-amber-500/30',
                arrow: 'group-hover:text-amber-400',
                tag: 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20'
            },
            blue: {
                text: 'text-blue-500',
                bg: 'bg-blue-500/10',
                border: 'hover:border-blue-500/30',
                arrow: 'group-hover:text-blue-400',
                tag: 'text-blue-500 bg-blue-500/10 hover:bg-blue-500/20'
            },
            violet: {
                text: 'text-violet-500',
                bg: 'bg-violet-500/10',
                border: 'hover:border-violet-500/30',
                arrow: 'group-hover:text-violet-400',
                tag: 'text-violet-500 bg-violet-500/10 hover:bg-violet-500/20'
            },
            rose: {
                text: 'text-rose-500',
                bg: 'bg-rose-500/10',
                border: 'hover:border-rose-500/30',
                arrow: 'group-hover:text-rose-400',
                tag: 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20'
            },
            sky: {
                text: 'text-sky-500',
                bg: 'bg-sky-500/10',
                border: 'hover:border-sky-500/30',
                arrow: 'group-hover:text-sky-400',
                tag: 'text-sky-500 bg-sky-500/10 hover:bg-sky-500/20'
            },
            cyan: {
                text: 'text-cyan-500',
                bg: 'bg-cyan-500/10',
                border: 'hover:border-cyan-500/30',
                arrow: 'group-hover:text-cyan-400',
                tag: 'text-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20'
            }
        };
        return colors[themeColor] || colors.emerald;
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            {/* ========== 1. Hero - 純粹的使命宣言，不含訂閱表單 ========== */}
            <section className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
                <div className="text-center">
                    <div className="flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 border border-google-blue/30 bg-google-blue/10 text-google-blue px-4 py-1.5 rounded-full text-xs mb-8 font-medium relative group">
                            <Rocket size={14} /> 讓 AI 成為你的好夥伴
                            <span className="absolute -top-2 -right-12 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-black rounded-lg shadow-lg shadow-orange-500/20 animate-pulse uppercase tracking-tighter">Beta</span>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        將繁瑣交給 AI，<br />
                        <span className="font-serif italic font-normal text-zinc-400">把時間留給 <Typewriter texts={['思考', '生活', '家人', '創意']} /></span>
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-6">
                        不教你 1000 個工具，<span className="text-white font-medium">只幫你找到最適合你的那一個。</span>
                    </p>

                    <p className="text-base text-zinc-500 max-w-xl mx-auto leading-relaxed mb-10">
                        我是 Dee，專門把複雜的 AI 知識變成小孩到長輩都能懂的實用技能。<br />
                        這裡沒有艱深的術語，只有你能立刻用上的方法。
                    </p>

                    {/* CTA 按鈕 - 引導到免費內容 */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/insights"
                            className="inline-flex items-center justify-center gap-2 bg-google-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3367D6] transition-colors"
                        >
                            開始免費學習 <ArrowRight size={18} />
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-4 rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            認識 Dee
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========== 2. 最新洞察 - 先展示免費價值 ========== */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-emerald-500 font-bold tracking-widest text-xs uppercase mb-4 block">FREE CONTENT</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">最新 AI 實用教學</h2>
                    <p className="text-zinc-400 max-w-xl mx-auto">這些都是免費的！每一篇都是我親自實驗後整理的心得。</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {INSIGHTS.slice(0, 3).map((insight: any, i) => {
                        const theme = getColorClasses(insight.themeColor || 'emerald');
                        return (
                            <motion.div
                                key={insight.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => navigate(`/insights/${insight.id}`)}
                                className={`bg-[#111] border border-white/5 ${theme.border} p-6 rounded-xl cursor-pointer group transition-all hover:-translate-y-1`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`text-xs font-medium px-2 py-1 rounded ${theme.tag}`}>{insight.category}</span>
                                    <span className="text-xs text-zinc-500">免費閱讀</span>
                                </div>
                                <h4 className={`text-lg font-bold text-white mb-3 group-hover:${theme.text.split(' ')[0]} transition-colors`}>{insight.title}</h4>
                                <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{insight.summary}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-zinc-500">{insight.readTime}</span>
                                    <ArrowRight size={16} className={`text-zinc-600 ${theme.arrow} group-hover:translate-x-1 transition-all`} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                <div className="text-center mt-10">
                    <Link to="/insights" className="inline-flex items-center gap-2 text-emerald-500 hover:underline font-medium">
                        查看所有免費文章 <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* ========== 3. 關於 Dee - 建立信任 ========== */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-google-blue font-bold tracking-widest text-xs uppercase mb-4 block">ABOUT DEE</span>
                            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6 leading-tight">
                                我的使命：<br />
                                <span className="text-zinc-400">讓每個人都能輕鬆駕馭 AI</span>
                            </h2>
                            <div className="space-y-4 text-zinc-400 leading-relaxed">
                                <p>
                                    我相信 <span className="text-white">AI 不是來取代人類的</span>，而是讓我們把時間花在更重要的事情上。
                                </p>
                                <p>
                                    從 2023 年開始，我持續研究各種 AI 工具的實際應用，並把這些經驗整理成任何人都能理解的教學內容。
                                </p>
                                <p>
                                    <span className="text-white">不賣焦慮、不講術語</span>，只分享真正實用的技巧。
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
                                <div>
                                    <div className="text-2xl font-bold text-white">100+</div>
                                    <div className="text-xs text-zinc-500">篇免費教學</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">50+</div>
                                    <div className="text-xs text-zinc-500">AI 工具實測</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">全年齡</div>
                                    <div className="text-xs text-zinc-500">適用對象</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
                                <h3 className="text-lg font-bold text-white mb-6">我專注的領域</h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: Sparkles, label: 'Prompt 工程與技巧', desc: '讓 AI 真正聽懂你的需求' },
                                        { icon: Zap, label: 'AI 效率提升', desc: '自動化你的日常工作流程' },
                                        { icon: Users, label: '全齡化 AI 教育', desc: '從小孩到長輩都能學會' },
                                        { icon: BookOpen, label: '實用工具評測', desc: '幫你篩選真正好用的工具' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                            <div className="w-10 h-10 rounded-lg bg-google-blue/10 flex items-center justify-center flex-shrink-0">
                                                <item.icon size={20} className="text-google-blue" />
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">{item.label}</div>
                                                <div className="text-zinc-500 text-sm">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== 新增：AI 實戰案例 ========== */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-violet-500 font-bold tracking-widest text-xs uppercase mb-4 block">REAL PROJECT</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">AI 可以做到什麼？</h2>
                        <p className="text-zinc-400 max-w-xl mx-auto">這是我用 AI 輔助開發的實際工具，從想法到上線只花了 3 天。</p>
                    </div>

                    {/* 專案 Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* 專案 1: iHaveTime */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-[#0a0a0a] p-8 min-h-[500px] flex flex-col"
                        >
                            {/* 背景光暈 */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-violet-500 to-purple-600 opacity-10 blur-3xl" />

                            <div className="relative flex-1 flex flex-col">
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-2xl font-bold text-white">iHaveTime</h3>
                                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-violet-500/10 text-amber-500">
                                            Beta
                                        </span>
                                    </div>
                                    <p className="text-lg text-zinc-400 mb-4 font-medium">還在為了「約時間」來回確認嗎？</p>
                                    <p className="text-zinc-300 leading-relaxed mb-4">
                                        這不只是一個日曆工具。它就像你的<span className="text-white font-bold">私人 AI 秘書</span>，能直接讀懂你的行程，自動過濾掉忙碌時段，並根據空檔長度建議你「適合喝咖啡」還是「專注工作」。
                                    </p>
                                    <p className="text-zinc-400 text-sm">
                                        我用 AI 在 3 天內解決了這個困擾無數人的痛點——證明了只要有想法，技術不再是阻礙。
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {['Google Calendar API', 'AI 語意分析', 'PWA 應用', '隱私優先'].map((feature, i) => (
                                        <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <a
                                            href="https://ihavetime.vercel.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
                                        >
                                            試用看看 <ArrowRight size={18} />
                                        </a>
                                        <Link
                                            to="/lab/ihavetime"
                                            className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors whitespace-nowrap"
                                        >
                                            詳細教學
                                        </Link>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-xs text-zinc-500">
                                        <span>開發時間：3 天</span>
                                        <span>AI 全程輔助開發</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 專案 2: Dee's AI Life Lab (本站) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-[#0a0a0a] p-8 min-h-[500px] flex flex-col"
                        >
                            {/* 背景光暈 - 綠色系 */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-10 blur-3xl" />

                            <div className="relative flex-1 flex flex-col">
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-2xl font-bold text-white">Dee's AI Life Lab</h3>
                                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-lg text-zinc-400 mb-4 font-medium">別被它的外表騙了，這不是套版。</p>
                                    <p className="text-zinc-300 leading-relaxed mb-4">
                                        這是一個擁有完整靈魂的 <span className="text-white font-bold">現代化 SaaS 系統</span>。從無到有構建了獨立的 CMS 後台管理、會員資料庫、自動化電子報與伺服器邏輯。
                                    </p>
                                    <p className="text-zinc-400 text-sm">
                                        它證明了：只要會問對問題，<span className="text-white">AI 能讓你一個人抵過一支全端工程團隊</span>。
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {['CMS 後台管理', 'Supabase 資料庫', 'Edge Functions', 'JWT 身份驗證'].map((feature, i) => (
                                        <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                                        <span className="text-emerald-400 font-medium flex items-center justify-center gap-2">
                                            ✨ 你正在體驗這個專案
                                        </span>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-xs text-zinc-500">
                                        <span>開發模式：持續迭代</span>
                                        <span>複雜系統架構實踐</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/lab"
                            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
                        >
                            查看更多專案 <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========== 4. 學習流程 ========== */}
            <ProcessSection />

            {/* ========== 5. 學員回饋 ========== */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-violet-500 font-bold tracking-widest text-xs uppercase mb-4 block">TESTIMONIALS</span>
                    <h2 className="text-3xl font-bold text-white font-serif mb-4">學員真實回饋</h2>
                    <p className="text-zinc-400">看看其他人怎麼說</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#111] p-8 rounded-xl border border-white/5"
                        >
                            <p className="text-zinc-300 mb-6 leading-relaxed text-sm">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">{t.name.charAt(0)}</div>
                                <div>
                                    <div className="text-white text-sm font-bold">{t.name}</div>
                                    <div className="text-zinc-500 text-xs">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ========== 6. ROI 計算機 ========== */}
            <ROICalculator />

            {/* ========== 7. 學習方案 - 現在才展示 ========== */}
            <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5">
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-4 block">LEARNING PATHS</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">想要更進一步？</h2>
                    <p className="text-zinc-400 max-w-xl mx-auto">如果你喜歡我的免費內容，這裡有更系統化的學習資源。</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {enhancedSolutions.map((solution, i) => {
                        const Icon = solution.icon;

                        return (
                            <motion.div
                                key={solution.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => navigate('/solutions')}
                                className={`relative overflow-hidden rounded-2xl border ${solution.border} ${solution.hoverBorder} bg-[#0a0a0a] cursor-pointer group transition-all duration-300 hover:-translate-y-2 flex flex-col`}
                            >
                                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${solution.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />

                                <div className="p-6 flex-grow">
                                    <div className={`w-12 h-12 rounded-xl ${solution.bg} flex items-center justify-center mb-4`}>
                                        <Icon size={24} style={{ color: solution.color }} />
                                    </div>

                                    <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-2">{solution.type}</div>
                                    <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">{solution.desc}</p>

                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-xs text-zinc-400 mb-4">
                                        <Users size={12} />
                                        適合：{solution.targetAudience}
                                    </div>

                                    <div className="space-y-2">
                                        {solution.benefits.map((benefit, j) => (
                                            <div key={j} className="flex items-start gap-2 text-sm">
                                                <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-zinc-400">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 pt-0">
                                    <div className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${solution.bg} text-sm font-bold group-hover:gap-3 transition-all`}
                                        style={{ color: solution.color }}>
                                        {solution.action}
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link to="/solutions" className="inline-flex items-center gap-2 text-google-blue hover:underline">
                        查看所有方案詳情 <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* ========== 8. 訂閱週報 - 底部溫和的 CTA ========== */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-16 h-16 rounded-full bg-google-blue/10 flex items-center justify-center mx-auto mb-6">
                        <Send size={28} className="text-google-blue" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">喜歡這些內容嗎？</h2>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        訂閱我的週報，每週收到一篇精選 AI 實用技巧。<br />
                        <span className="text-zinc-500">完全免費，隨時可以取消。</span>
                    </p>
                    <NewsletterForm variant="default" className="max-w-md mx-auto" />
                </div>
            </section>

        </motion.div>
    );
};

export default Home;