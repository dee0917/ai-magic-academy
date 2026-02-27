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
        try {
            const data = await api.getInsightById(articleId);
            if (data) setArticle(data);
            else setArticle(INSIGHTS.find(i => i.id === articleId) || null);
        } catch (e) {
            setArticle(INSIGHTS.find(i => i.id === articleId) || null);
        }
        setLoading(false);
    };

    const handleCopy = (text: string) => {
        const cleanText = text.replace(/<[^>]*>?/gm, '');
        navigator.clipboard.writeText(cleanText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono">LOADING_CONTENT...</div>;
    if (!article) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">404_NOT_FOUND</div>;

    const theme = getColorClasses(article.themeColor || article.theme_color || 'emerald');
    const isNews = article.category === 'AI 新聞';
    const nextArticle = INSIGHTS.find(i => i.difficulty_level === (Math.min(5, Math.max(0, article.difficulty_level || 1))) + 1) || INSIGHTS[0];

    const extractCommand = (content: string) => {
        const match = content.match(/<code[^>]*>([\s\S]*?)<\/code>/);
        return match ? match[1] : "";
    };
    const practiceCommand = extractCommand(article.content || "");
    const cleanedContent = article.content?.replace(/<code[^>]*>[\s\S]*?<\/code>/g, '') || "";

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
                                    <p className="text-zinc-300 leading-relaxed text-left">{article.pain_point}</p>
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
                                    <p className="text-zinc-300 leading-relaxed text-left">{article.scenario}</p>
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
                                    <p className="text-zinc-300 leading-relaxed text-left">{article.solution}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <motion.article 
                className="article-content prose prose-invert prose-lg max-w-none leading-relaxed mb-16 text-left"
                dangerouslySetInnerHTML={{ __html: cleanedContent || '' }}
            />

            {!isNews && practiceCommand && (
                <div className={`bg-gradient-to-br ${theme.gradient} border ${theme.border} rounded-3xl p-8 mb-20 relative overflow-hidden text-left`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${theme.bg} flex items-center justify-center`}>
                                <Code size={20} className={theme.lightText} />
                            </div>
                            <h3 className="text-xl font-bold text-white">生活實戰包</h3>
                        </div>
                        <button 
                            onClick={() => handleCopy(practiceCommand)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${copied ? 'bg-emerald-500 text-white' : `${theme.bg} ${theme.lightText} hover:brightness-125`}`}
                        >
                            {copied ? <><Check size={16} /> 已複製</> : <><Copy size={16} /> 一鍵複製指令</>}
                        </button>
                    </div>
                    <div className={`bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl p-6 font-mono text-sm leading-relaxed ${theme.lightText} whitespace-pre-wrap text-left`}>
                        {practiceCommand.replace(/<[^>]*>?/gm, '')}
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
