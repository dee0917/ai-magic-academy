import SEO from '../components/ui/SEO';
import { useState } from 'react';
import { ArrowRight, X, Sparkles, Users, Zap, BookOpen, MessageCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 與首頁完全一致的方案資料
const enhancedSolutions = [
    {
        id: 1,
        title: 'AI 入門懶人包',
        type: '免費資源',
        description: '從零開始學 AI，用最白話的方式帶你入門，保證看得懂。',
        detail: '這份懶人包包含了我精心整理的入門知識，讓你用最短的時間搞懂 AI 能為你做什麼。',
        action_text: '免費下載',
        action_url: '#',
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
        description: '專為家庭設計，讓大人小孩一起學，邊玩邊學會 AI。',
        detail: '透過有趣的互動練習，讓全家人一起探索 AI 的世界，增進親子關係的同時也學會實用技能。',
        action_text: '查看詳情',
        action_url: '#',
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
        description: '不知道從哪開始？讓 Dee 親自帶你跨出第一步。',
        detail: '針對你的需求和背景，量身打造專屬的學習計畫，讓你少走彎路、快速上手。',
        action_text: '預約諮詢',
        action_url: '#',
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

const Solutions = () => {
    const [selected, setSelected] = useState<typeof enhancedSolutions[0] | null>(null);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen"><SEO title="學習資源" description="系統化的 AI 學習路徑，從免費懶人包到一對一諮詢。" path="/solutions" />
            {/* 標題區 - 與首頁語氣一致 */}
            <div className="mb-16 text-center">
                <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-4 block">LEARNING PATHS</span>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">想要更進一步？</h1>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">如果你喜歡我的免費內容，這裡有更系統化的學習資源。</p>
            </div>

            {/* 方案卡片 - 與首頁完全一致 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {enhancedSolutions.map((solution, i) => {
                    const Icon = solution.icon;

                    return (
                        <motion.div
                            key={solution.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelected(solution)}
                            className={`relative overflow-hidden rounded-2xl border ${solution.border} ${solution.hoverBorder} bg-[#0a0a0a] cursor-pointer group transition-all duration-300 hover:-translate-y-2 flex flex-col`}
                        >
                            {/* 背景漸層效果 */}
                            <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${solution.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />

                            {/* 上半部：基本資訊 */}
                            <div className="p-6 flex-grow">
                                {/* 圖示 */}
                                <div className={`w-12 h-12 rounded-xl ${solution.bg} flex items-center justify-center mb-4`}>
                                    <Icon size={24} style={{ color: solution.color }} />
                                </div>

                                {/* 類型標籤 */}
                                <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-2">{solution.type}</div>

                                {/* 標題 */}
                                <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>

                                {/* 描述 */}
                                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{solution.description}</p>

                                {/* 適合誰 */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-xs text-zinc-400 mb-4">
                                    <Users size={12} />
                                    適合：{solution.targetAudience}
                                </div>

                                {/* 你會得到什麼 */}
                                <div className="space-y-2">
                                    {solution.benefits.map((benefit, j) => (
                                        <div key={j} className="flex items-start gap-2 text-sm">
                                            <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-zinc-400">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 下半部：CTA 按鈕 */}
                            <div className="p-6 pt-0">
                                <div className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${solution.bg} text-sm font-bold group-hover:gap-3 transition-all`}
                                    style={{ color: solution.color }}>
                                    {solution.action_text}
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Modal 彈窗 */}
            <AnimatePresence>
                {selected && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setSelected(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className={`relative bg-[#111] border ${selected.border} w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl z-10`}
                        >
                            {/* 頂部裝飾 */}
                            <div className={`h-2 bg-gradient-to-r ${selected.gradient} w-full`} />

                            <button onClick={() => setSelected(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} />
                            </button>

                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 rounded-xl ${selected.bg}`}>
                                        <selected.icon size={24} style={{ color: selected.color }} />
                                    </div>
                                    <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">{selected.type}</span>
                                </div>

                                <h2 className="text-3xl font-bold text-white mb-4 leading-tight">{selected.title}</h2>
                                <p className="text-zinc-300 mb-6 leading-relaxed text-lg">{selected.description}</p>

                                {/* 適合誰 */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm text-zinc-400 mb-6">
                                    <Users size={14} />
                                    適合：{selected.targetAudience}
                                </div>

                                {/* 你會得到什麼 */}
                                <div className="bg-white/5 p-6 rounded-xl mb-6 border border-white/5">
                                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <Sparkles size={14} style={{ color: selected.color }} />
                                        你會得到什麼
                                    </h4>
                                    <div className="space-y-3">
                                        {selected.benefits.map((benefit, j) => (
                                            <div key={j} className="flex items-start gap-3">
                                                <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-zinc-300">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {selected.detail && (
                                    <p className="text-zinc-500 text-sm mb-8 leading-relaxed">{selected.detail}</p>
                                )}

                                <a
                                    href={selected.action_url || "#"}
                                    target={selected.action_url ? "_blank" : "_self"}
                                    className={`w-full bg-gradient-to-r ${selected.gradient} text-white font-bold py-4 rounded-xl hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group`}
                                >
                                    {selected.action_text}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Solutions;