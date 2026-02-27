import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    ArrowRight, 
    Star, 
    LayoutGrid, 
    Zap, 
    Wrench, 
    Baby, 
    MessageCircle, 
    Heart, 
    Camera, 
    Home as HomeIcon, 
    Briefcase, 
    TrendingUp, 
    Rocket,
    ChevronRight
} from 'lucide-react';
import { api } from '../lib/supabase';
import { INSIGHTS } from '../data/mock';

const Insights = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [insights, setInsights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // 滾動與拖拽相關 Ref
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

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

    const getCategoryIcon = (categoryName: string) => {
        const icons: Record<string, any> = {
            '入門心法': Zap,
            '工具指南': Wrench,
            '神隊友育兒': Baby,
            '社交救星': MessageCircle,
            '長輩數位教練': Heart,
            '自媒體實踐': Camera,
            '生活應用': HomeIcon,
            '工作效率': Briefcase,
            '投資人 AI 攻略': TrendingUp,
            '進階實踐': Rocket
        };
        return icons[categoryName] || Zap;
    };

    const getCategoryTheme = (categoryName: string) => {
        const article = insights.find(i => i.category === categoryName);
        return article?.themeColor || article?.theme_color || 'emerald';
    };

    // 檢查滾動狀態
    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // 如果還沒滾動到底，就顯示提示
        setShowScrollIndicator(scrollLeft + clientWidth < scrollWidth - 10);
    };

    // 處理電腦版拖拽滾動
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // 滾動速度倍率
        scrollRef.current.scrollLeft = scrollLeft - walk;
        checkScroll();
    };

    // 點擊分類置中邏輯
    const handleCategoryClick = (category: string | null, e: React.MouseEvent) => {
        setSelectedCategory(category);
        
        if (!scrollRef.current) return;
        const target = e.currentTarget as HTMLElement;
        const container = scrollRef.current;
        
        const scrollTarget = target.offsetLeft - (container.offsetWidth / 2) + (target.offsetWidth / 2);
        container.scrollTo({
            left: scrollTarget,
            behavior: 'smooth'
        });
        setTimeout(checkScroll, 500); // 延遲檢查滾動狀態，等待平滑滾動結束
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    const fetchInsights = async () => {
        setLoading(true);
        try {
            const cleanInsights = INSIGHTS.filter(i => i.category !== 'AI 新聞');
            setInsights(cleanInsights);
            // 資料加載後檢查一次滾動
            setTimeout(checkScroll, 100);
        } catch (e) {
            setInsights(INSIGHTS.filter(i => i.category !== 'AI 新聞'));
        }
        setLoading(false);
    };

    const categories = Array.from(new Set(insights.map(i => i.category)));
    const filteredInsights = selectedCategory ? insights.filter(i => i.category === selectedCategory) : insights;

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">載入中...</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen text-left">
            <div className="text-left mb-12">
                <span className="text-emerald-500 font-bold tracking-widest text-[10px] uppercase mb-4 block">KNOWLEDGE LADDER</span>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">免費 AI 實用教學</h1>
                <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                    我們已經移除了新聞雜訊。這裡只有高品質、帶領你進化的 AI 實踐指南。
                </p>
            </div>

            {/* 優化後的滾動分類列 - 支援電腦版拖拽、置中、與右滑提示 */}
            <div className="relative mb-16 group/scroll">
                <div 
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onScroll={checkScroll}
                    className={`flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar cursor-grab active:cursor-grabbing ${isDragging ? 'scroll-auto select-none' : 'scroll-smooth'}`}
                >
                    <button 
                        onClick={(e) => handleCategoryClick(null, e)} 
                        className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${selectedCategory === null 
                            ? 'bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10'}`}
                    >
                        <LayoutGrid size={14} /> 全部內容
                    </button>
                    {categories.map(category => {
                        const theme = getColorClasses(getCategoryTheme(category));
                        const Icon = getCategoryIcon(category);
                        const isSelected = selectedCategory === category;
                        return (
                            <button 
                                key={category} 
                                onClick={(e) => handleCategoryClick(category, e)} 
                                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${isSelected 
                                    ? `${theme.active} border-transparent shadow-lg` 
                                    : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10'}`}
                                style={isSelected ? { boxShadow: `0 10px 15px -3px ${theme.text.replace('text-', 'rgba(')}, 0 4px 6px -4px ${theme.text.replace('text-', 'rgba(')}` } : {}}
                            >
                                <Icon size={14} /> {category}
                            </button>
                        );
                    })}
                </div>

                {/* 向右滑動提示圖標 */}
                <AnimatePresence>
                    {showScrollIndicator && (
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="absolute right-0 top-0 bottom-4 flex items-center pr-2 pointer-events-none"
                        >
                            <div className="flex flex-col items-center gap-1 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A] to-transparent pl-12 py-2">
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="bg-emerald-500/20 p-2 rounded-full border border-emerald-500/30"
                                >
                                    <ChevronRight size={16} className="text-emerald-400" />
                                </motion.div>
                                <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-tighter">向右滑動</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredInsights.map((insight, i) => {
                    const theme = getColorClasses(insight.themeColor || 'emerald');
                    return (
                        <Link to={`/insights/${insight.id}`} key={insight.id} className="group block">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className={`bg-[#111] border border-white/5 ${theme.border} p-8 rounded-3xl transition-all hover:-translate-y-1 h-full flex flex-col text-left`}>
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${theme.tag}`}>{insight.category}</span>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, idx) => {
                                            const starsCount = Math.min(5, Math.max(0, insight.difficulty_level || 1));
                                            return (
                                                <Star key={idx} size={10} className={idx < starsCount ? theme.text : 'text-zinc-800'} fill="currentColor" />
                                            );
                                        })}
                                    </div>
                                </div>

                                <h4 className={`text-xl font-bold text-white mb-4 group-hover:${theme.text.split(' ')[0]} transition-colors line-clamp-2 text-left leading-snug`}>
                                    {insight.title}
                                </h4>

                                <p className="text-zinc-500 text-sm line-clamp-3 mb-8 flex-grow text-left leading-relaxed">{insight.summary}</p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <span className="text-xs font-mono text-zinc-600">{insight.readTime || insight.read_time}</span>
                                    <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-all group-hover:${theme.bg}`}>
                                        <ArrowRight size={14} className={`text-zinc-600 ${theme.arrow} transition-all`} />
                                    </div>
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
