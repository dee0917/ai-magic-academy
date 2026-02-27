import SEO from '../components/ui/SEO';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { INSIGHTS_LIST } from '../data/insights';

const News = () => {
    const navigate = useNavigate();
    const newsArticles = INSIGHTS_LIST.filter(a => a.category === 'AI 新聞');

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen"><SEO title="AI 新聞" description="追蹤最新 AI 動態，用最白話的方式帶你了解科技趨勢。" path="/news" />
            <div className="text-center mb-16">
                <span className="text-zinc-400 font-bold tracking-widest text-xs uppercase mb-4 block">AI NEWS</span>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">AI 新聞</h1>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">追蹤最新的 AI 動態，用最白話的方式帶你了解科技趨勢。</p>
            </div>

            {newsArticles.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-zinc-500 text-lg">新聞專欄即將上線，敬請期待！</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsArticles.map((article, i) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            onClick={() => navigate(`/insights/${article.id}`)}
                            className="bg-[#111] border border-white/5 hover:border-white/20 p-6 rounded-xl cursor-pointer group transition-all hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">{article.category}</span>
                                <span className="text-zinc-700 text-[10px]">{article.date}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-zinc-300 transition-colors leading-snug">{article.title}</h3>
                            <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{article.summary}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-zinc-600">{article.readTime}</span>
                                <ArrowRight size={16} className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default News;
