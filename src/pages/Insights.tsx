import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';

const Insights = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [insights, setInsights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getColorClasses = (themeColor: string) => {
        const colors: Record<string, any> = {
            emerald: { text: 'text-emerald-500', active: 'bg-emerald-500 text-black', border: 'hover:border-emerald-500/30', arrow: 'group-hover:text-emerald-400', tag: 'text-emerald-500 bg-emerald-500/10' },
            yellow: { text: 'text-yellow-500', active: 'bg-yellow-500 text-black', border: 'hover:border-yellow-500/30', arrow: 'group-hover:text-yellow-400', tag: 'text-yellow-500 bg-yellow-500/10' },
            amber: { text: 'text-amber-500', active: 'bg-amber-500 text-black', border: 'hover:border-amber-500/30', arrow: 'group-hover:text-amber-400', tag: 'text-amber-500 bg-amber-500/10' },
            blue: { text: 'text-blue-500', active: 'bg-blue-500 text-black', border: 'hover:border-blue-500/30', arrow: 'group-hover:text-blue-400', tag: 'text-blue-500 bg-blue-500/10' },
            violet: { text: 'text-violet-500', active: 'bg-violet-500 text-black', border: 'hover:border-violet-500/30', arrow: 'group-hover:text-violet-400', tag: 'text-violet-500 bg-violet-500/10' },
            rose: { text: 'text-rose-500', active: 'bg-rose-500 text-black', border: 'hover:border-rose-500/30', arrow: 'group-hover:text-rose-400', tag: 'text-rose-500 bg-rose-500/10' },
            teal: { text: 'text-teal-500', active: 'bg-teal-500 text-black', border: 'hover:border-teal-500/30', arrow: 'group-hover:text-teal-400', tag: 'text-teal-500 bg-teal-500/10' },
            zinc: { text: 'text-zinc-300', active: 'bg-zinc-300 text-black', border: 'hover:border-zinc-300/30', arrow: 'group-hover:text-white', tag: 'text-zinc-400 bg-white/5' }
        };
        return colors[themeColor] || colors.emerald;
    };

    const getCategoryTheme = (categoryName: string) => {
        const article = insights.find(i => i.category === categoryName);
        return article?.themeColor || article?.theme_color || 'emerald';
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    const fetchInsights = async () => {
        setLoading(true);
        try {
            const data = await api.getInsights();
            let combined: any[] = [...INSIGHTS];
            if (data && data.length > 0) {
                const mockIds = new Set(INSIGHTS.map(i => i.id));
                const dbInsights = data.filter((i: any) => !mockIds.has(i.id));
                combined = [...combined, ...dbInsights];
            }
            combined.sort((a: any, b: any) => {
                const dateA = new Date(a.date || a.published_at || 0).getTime();
                const dateB = new Date(b.date || b.published_at || 0).getTime();
                return dateB - dateA;
            });
            setInsights(combined);
        } catch (e) {
            setInsights(INSIGHTS);
        }
        setLoading(false);
    };

    const categories = Array.from(new Set(insights.map(i => i.category)));
    const filteredInsights = selectedCategory ? insights.filter(i => i.category === selectedCategory) : insights;

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">載入中...</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen">
            <div className="text-center mb-12">
                <span className="text-emerald-500 font-bold tracking-widest text-xs uppercase mb-4 block">KNOWLEDGE LADDER</span>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">跟著 Dee 一起進化</h1>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                    從簡單的對話心法，到解決複雜的生活瑣事。<br/>
                    這是一條讓每個人都能成為 AI 管理者的階梯。
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
                <button onClick={() => setSelectedCategory(null)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}>
                    全部內容
                </button>
                {categories.map(category => {
                    const theme = getColorClasses(getCategoryTheme(category));
                    return (
                        <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category ? theme.active : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}>
                            {category}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredInsights.map((insight, i) => {
                    const theme = getColorClasses(insight.themeColor || insight.theme_color || 'emerald');
                    return (
                        <Link to={`/insights/${insight.id}`} key={insight.id} className="group block">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className={`bg-[#111] border border-white/5 ${theme.border} p-6 rounded-xl transition-all hover:-translate-y-1 h-full flex flex-col`}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${theme.tag}`}>{insight.category}</span>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, idx) => {
                                            const starsCount = Math.min(5, Math.max(0, insight.difficulty_level || 1));
                                            return (
                                                <Star key={idx} size={10} className={idx < starsCount ? theme.text : 'text-zinc-800'} fill="currentColor" />
                                            );
                                        })}
                                    </div>
                                </div>

                                <h4 className={`text-lg font-bold text-white mb-3 group-hover:${theme.text.split(' ')[0]} transition-colors line-clamp-2`}>
                                    {insight.title}
                                </h4>

                                <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow">{insight.summary}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {insight.tags?.map((tag: string) => (
                                        <span key={tag} className="text-[10px] text-zinc-600">#{tag.replace('#','')}</span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className="text-xs text-zinc-500">{insight.readTime || insight.read_time}</span>
                                    <ArrowRight size={16} className={`text-zinc-600 ${theme.arrow} group-hover:translate-x-1 transition-all`} />
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Insights;
