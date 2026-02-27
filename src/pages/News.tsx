import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Newspaper, Calendar, Clock } from 'lucide-react';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';

const News = () => {
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            // 從 Mock 中篩選新聞分類
            const mockNews = INSIGHTS.filter(i => i.category === 'AI 新聞');
            setNewsItems(mockNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        } catch (error) {
            console.error('Failed to fetch news', error);
        }
        setLoading(false);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
            <div className="text-center mb-16">
                <span className="text-zinc-500 font-bold tracking-widest text-xs uppercase mb-4 block flex items-center justify-center gap-2">
                    <Newspaper size={14} /> AI DAILY NEWS
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">AI 新聞快報</h1>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                    只講小白聽得懂的 AI 趨勢。不談艱深技術，只談這些變化如何影響你的生活。
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {newsItems.map((news, i) => (
                    <Link to={`/insights/${news.id}`} key={news.id} className="group">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#111] border border-white/5 hover:border-white/20 p-8 rounded-3xl transition-all flex flex-col md:flex-row gap-8 items-start"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4 text-xs font-mono text-zinc-500">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {news.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {news.readTime}</span>
                                    <span className="bg-white/5 px-2 py-0.5 rounded text-zinc-300">理解難度：⭐</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-google-blue transition-colors">
                                    {news.title}
                                </h2>
                                <p className="text-zinc-400 leading-relaxed mb-6">
                                    {news.summary}
                                </p>
                                <div className="flex items-center gap-2 text-google-blue font-bold text-sm">
                                    閱讀全文 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* 訂閱區 */}
            <div className="mt-20 p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">不想錯過最新的 AI 趨勢？</h3>
                <p className="text-zinc-400 mb-8">訂閱電子報，我們每週為你整理最重要的小白 AI 新聞。</p>
                <Link to="/" className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors">
                    訂閱週報
                </Link>
            </div>
        </motion.div>
    );
};

export default News;
