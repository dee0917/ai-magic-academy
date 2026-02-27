import SEO from '../components/ui/SEO';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles, Clock, Shield, Copy, Calendar, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

// AI 開發的專案資料
const projects = [
    {
        id: 1,
        title: 'iHaveTime',
        subtitle: '智慧空閒時間分析器',
        description: '告訴你的行事曆煩惱？這個工具會自動讀取你的 Google 日曆，用 AI 分析出你真正有空的時段，一鍵複製給對方。再也不用手動對時間了！',
        url: 'https://ihavetime.vercel.app',
        status: 'Beta 測試中',
        statusColor: 'text-amber-500',
        features: [
            { icon: Calendar, text: '自動讀取 Google 日曆' },
            { icon: Bot, text: 'AI 智慧分析空閒時段' },
            { icon: Copy, text: '一鍵複製分享給對方' },
            { icon: Shield, text: '資料只在瀏覽器處理，不儲存' }
        ],
        techStack: ['React', 'TypeScript', 'Google Calendar API', 'AI 輔助開發'],
        devTime: '3 天',
        gradient: 'from-violet-500 to-purple-600',
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/20'
    },
    {
        id: 2,
        title: 'Dee\'s AI Life Lab',
        subtitle: '全端個人品牌知識庫',
        description: '這不只是一個靜態網站。這是一個包含完整後台管理、文章發布系統、會員訂閱功能的現代化 Web App。除了 UI 設計，所有功能邏輯、資料庫架構皆由 AI 協作完成。',
        url: '/',
        status: '穩定運行中',
        statusColor: 'text-emerald-500',
        features: [
            { icon: Sparkles, text: '極致深色模式 UI 設計' },
            { icon: Bot, text: '動態內容管理系統 (CMS)' },
            { icon: Shield, text: 'Supabase 資料庫串接' },
            { icon: Copy, text: '響應式 RWD 支援' }
        ],
        techStack: ['React', 'Supabase', 'Tailwind CSS', 'Vercel'],
        devTime: '持續迭代',
        gradient: 'from-emerald-500 to-teal-600',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        isCurrentSite: true
    }
];

const Lab = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen"><SEO title="AI 實驗室" description="用 AI 輔助開發的實際專案展示，不會寫程式也能做到。" path="/lab" />
            {/* 標題區 */}
            <div className="text-center mb-16">
                <span className="text-violet-500 font-bold tracking-widest text-xs uppercase mb-4 block">AI LAB</span>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">AI 實驗室</h1>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    這些都是我用 AI 輔助開發的實際專案。<br />
                    <span className="text-white">不會寫程式也能做到，你也可以。</span>
                </p>
            </div>

            {/* 關鍵訊息 */}
            <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl p-8 mb-16 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="text-violet-500" size={24} />
                    <h2 className="text-xl font-bold text-white">AI 讓「想法」變成「成品」的門檻大幅降低</h2>
                </div>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    以前，把一個想法變成可用的工具，需要學習程式設計、花費數週甚至數月的時間。<br />
                    現在，透過 AI 輔助開發，<span className="text-white font-medium">只需要清晰的想法和正確的方法</span>，就能在幾天內完成。
                </p>
            </div>

            {/* 專案列表 */}
            <div className="space-y-12">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`relative overflow-hidden rounded-3xl border ${project.border} bg-[#0a0a0a]`}
                    >
                        {/* 背景光暈 */}
                        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${project.gradient} opacity-10 blur-3xl`} />

                        <div className="relative p-8 md:p-12">
                            {/* 頂部：標題和狀態 */}
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-3xl font-bold text-white">{project.title}</h2>
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${project.bg} ${project.statusColor}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="text-lg text-zinc-400">{project.subtitle}</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {project.isCurrentSite ? (
                                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
                                            <Sparkles size={18} /> 你正在這裡
                                        </div>
                                    ) : (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white font-bold hover:opacity-90 transition-opacity`}
                                        >
                                            試用看看 <ExternalLink size={18} />
                                        </a>
                                    )}

                                    {/* 只有 iHaveTime 顯示詳細教學按鈕 */}
                                    {project.title === 'iHaveTime' && (
                                        <Link
                                            to="/lab/ihavetime"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors"
                                        >
                                            詳細教學 <ArrowRight size={18} />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* 描述 */}
                            <p className="text-zinc-300 text-lg leading-relaxed mb-8 max-w-3xl">
                                {project.description}
                            </p>

                            {/* 功能列表 */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                {project.features.map((feature, j) => (
                                    <div key={j} className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                        <feature.icon size={20} className="text-violet-400 flex-shrink-0" />
                                        <span className="text-zinc-300 text-sm">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* 底部資訊 */}
                            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-zinc-500" />
                                    <span className="text-zinc-400 text-sm">開發時間：<span className="text-white font-medium">{project.devTime}</span></span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {project.techStack.map((tech, j) => (
                                        <span key={j} className="text-xs px-3 py-1 rounded-full bg-white/5 text-zinc-400">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 底部 CTA */}
            <div className="text-center mt-20 py-12 border-t border-white/5">
                <h3 className="text-2xl font-bold text-white mb-4">想學習如何用 AI 開發自己的工具？</h3>
                <p className="text-zinc-400 mb-8">從免費教學開始，一步步掌握 AI 輔助開發的技巧。</p>
                <Link
                    to="/insights"
                    className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors"
                >
                    開始免費學習 <ArrowRight size={18} />
                </Link>
            </div>
        </motion.div>
    );
};

export default Lab;
