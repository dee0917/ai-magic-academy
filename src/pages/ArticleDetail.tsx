import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, MapPin, Lightbulb, Code, CheckCircle, Star, ArrowRight, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const getColorClasses = (themeColor: string) => {
        const colors: Record<string, any> = {
            emerald: { text: 'text-emerald-500', lightText: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', gradient: 'from-emerald-500/10 to-teal-500/10' },
            yellow: { text: 'text-yellow-500', lightText: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', gradient: 'from-yellow-500/10 to-orange-500/10' },
            amber: { text: 'text-amber-500', lightText: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', gradient: 'from-amber-500/10 to-yellow-500/10' },
            blue: { text: 'text-blue-500', lightText: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', gradient: 'from-blue-500/10 to-indigo-500/10' },
            violet: { text: 'text-violet-500', lightText: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', gradient: 'from-violet-500/10 to-purple-500/10' },
            rose: { text: 'text-rose-500', lightText: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', gradient: 'from-rose-500/10 to-pink-500/10' },
            teal: { text: 'text-teal-500', lightText: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', gradient: 'from-teal-500/10 to-cyan-500/10' },
            zinc: { text: 'text-zinc-300', lightText: 'text-zinc-200', bg: 'bg-white/5', border: 'border-white/10', gradient: 'from-white/5 to-zinc-900' }
        };
        return colors[themeColor] || colors.emerald;
    };

    useEffect(() => {
        if (id) fetchArticle(parseInt(id));
    }, [id]);

    const fetchArticle = async (articleId: number) => {
        setLoading(true);
        // 優先從本地 mock 資料讀取，確保「深度洞察」等硬編碼內容能正確顯示
        const localArticle = INSIGHTS.find(i => i.id === articleId);
        
        // 嘗試從資料庫讀取
        const dbData = await api.getInsightById(articleId);
        
        if (localArticle) {
            // 合併本地與資料庫數據，以本地（程式碼）為準
            setArticle({ ...dbData, ...localArticle });
        } else if (dbData) {
            setArticle(dbData);
        } else {
            setArticle(null);
        }
        setLoading(false);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono">LOADING_CONTENT...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">404_NOT_FOUND</div>;

    const theme = getColorClasses(article.themeColor || article.theme_color || 'emerald');
    const isNews = article.category === 'AI 新聞';
    const nextArticle = INSIGHTS.find(i => i.difficulty_level === (Math.min(5, Math.max(0, article.difficulty_level || 1))) + 1) || INSIGHTS[0];

    const stars = Math.min(5, Math.max(0, article.difficulty_level || 1));

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen text-left">
            <Link to={isNews ? "/news" : "/insights"} className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 text-sm font-medium">
                <ArrowLeft size={16} /> 返回{isNews ? "新聞" : "教學"}列表
            </Link>

            <header className="mb-12 text-left">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <span className={`${theme.text} font-bold uppercase tracking-widest text-xs`}>{article.category}</span>
                        {!isNews && (
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} size={10} className={idx < stars ? theme.text : 'text-zinc-800'} fill="currentColor" />
                                ))}
                            </div>
                        )}
                    </div>
                    <span className="text-zinc-600 text-xs font-mono">{article.date}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight font-serif text-left">{article.title}</h1>
                <div className="flex flex-wrap gap-2 mb-8">
                    {article.tags?.map((tag: string) => (
                        <span key={tag} className="text-[10px] text-zinc-500 border border-white/10 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
            </header>

            {!isNews && (
                <div className="space-y-8 mb-16 text-left">
                    {article.pain_point && (
                        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6 text-left">
                            <div className="flex items-start gap-4">
                                <AlertTriangle size={24} className="text-red-400 flex-shrink-0" />
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">生活痛點</h2>
                                    <p className="text-zinc-300 leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: article.pain_point || "" }} />
                                </div>
                            </div>
                        </div>
                    )}
                    {article.scenario && (
                        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-2xl p-6 text-left">
                            <div className="flex items-start gap-4">
                                <MapPin size={24} className="text-amber-400 flex-shrink-0" />
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">應用場景</h2>
                                    <p className="text-zinc-300 leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: article.scenario || "" }} />
                                </div>
                            </div>
                        </div>
                    )}
                    {article.solution && (
                        <div className={`bg-gradient-to-r ${theme.gradient} border ${theme.border} rounded-2xl p-6 text-left`}>
                            <div className="flex items-start gap-4">
                                <Lightbulb size={24} className={theme.lightText} flex-shrink-0 />
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">AI 解決方案</h2>
                                    <p className="text-zinc-300 leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: article.solution || "" }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <motion.article 
                className="article-content prose prose-invert prose-lg max-w-none leading-relaxed mb-16 text-left"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />

            {/* 💡 靈感金句 (參照 201 文章風格) */}
            {article.insight_quote && (
                <p className="text-xl text-zinc-300 font-serif italic text-center py-10 border-y border-white/5 my-10 leading-relaxed">
                    「{article.insight_quote}」
                </p>
            )}

            {/* 融合後的【終極生活實戰包】 */}

            {/* 融合後的【終極生活實戰包】 */}
            {!isNews && article.practice_kit && (
                <div className={`bg-[#0a0a0a] border ${theme.border} rounded-[2rem] p-10 mb-20 relative overflow-hidden`}>
                    {/* 裝飾背光 */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${theme.gradient} opacity-5 blur-3xl`} />
                    
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${theme.bg} flex items-center justify-center`}>
                                    <Code size={24} className={theme.lightText} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">生活實戰包</h3>
                                    <p className={`${theme.lightText} text-sm font-medium`}>{article.practice_kit.title}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleCopy(article.practice_kit.command)}
                                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : `${theme.bg} ${theme.lightText} hover:brightness-125 border ${theme.border}`}`}
                            >
                                {copied ? <><Check size={18} /> 已複製到剪貼簿</> : <><Copy size={18} /> 一鍵複製指令</>}
                            </button>
                        </div>

                        <p className="text-zinc-400 mb-6 leading-relaxed">
                            {article.practice_kit.description}
                        </p>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none" />
                            <div className={`bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 font-mono text-base leading-loose ${theme.lightText} whitespace-pre-wrap text-left shadow-2xl`}>
                                {article.practice_kit.command}
                            </div>
                        </div>
                        
                        <p className="mt-6 text-[10px] text-zinc-600 text-center uppercase tracking-widest">
                            — Copy and paste into your favorite AI assistant —
                        </p>
                    </div>
                </div>
            )}

            {!isNews && article.example && (
                <div className="bg-[#111] border border-white/5 rounded-2xl p-8 mb-20">
                     <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle size={20} className="text-emerald-400" />
                        簡單實例對比
                     </h2>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-6">
                            <span className="text-red-400 font-bold text-xs block mb-3 uppercase tracking-tighter">❌ 糟糕做法</span>
                            <p className="text-zinc-500 text-sm">{article.example.wrong}</p>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-6">
                            <span className="text-emerald-400 font-bold text-xs block mb-3 uppercase tracking-tighter">✅ 正確用法</span>
                            <p className="text-zinc-300 text-sm whitespace-pre-line">{article.example.right}</p>
                        </div>
                     </div>
                </div>
            )}

            <div className="pt-16 border-t border-white/5 text-left">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">下一階挑戰</p>
                <Link to={`/insights/${nextArticle.id}`} className="group block bg-white/5 border border-white/10 hover:border-white/20 p-8 rounded-3xl transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 block">Level Up</span>
                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{nextArticle.title}</h3>
                        </div>
                        <ArrowRight className="text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all" size={32} />
                    </div>
                </Link>
            </div>
        </motion.div>
    );
};
export default ArticleDetail;
