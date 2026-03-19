import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from './components/ui/SEO';
import { Newspaper, Scroll, Zap, BookOpen, User, Flame, Coffee, Sparkles } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-magic-bg parchment-texture flex items-center justify-center px-6 pt-20">
            <SEO title="404 - 傳送失敗" path="/404" />
            <div className="grid-bg-magic opacity-40" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                className="max-w-2xl w-full bg-white border-6 border-magic-text p-12 md:p-24 text-center shadow-[32px_32px_0px_#2A2723] relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 p-8 halftone-loading w-48 h-48 opacity-10" />
                <div className="absolute bottom-0 right-0 p-8 halftone-loading w-48 h-48 opacity-10" />

                <div className="relative z-10 space-y-12">
                    <div className="text-9xl mb-8">👻</div>
                    
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-display text-magic-text leading-none tracking-tighter">
                            404<br />
                            <span className="text-magic-red text-3xl md:text-5xl uppercase tracking-[0.2em]">傳送逆火</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-serif italic text-magic-text/60 leading-relaxed border-y-4 border-magic-text/10 py-8">
                            「糟糕，這道傳送門似乎通往了虛無之地。可能是咒語唸錯了，或者是這頁秘笈已經被焚毀。」
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 pt-8">
                        <Link to="/" className="btn-magic text-2xl py-6">
                            返回大廳
                        </Link>
                        <Link to="/insights" className="btn-magic bg-magic-teal text-magic-bg text-xl py-4 border-4">
                            前往藏書閣
                        </Link>
                    </div>
                    
                    <p className="font-display text-xs tracking-[0.5em] text-magic-text/30">Mage Error Code: VOID_REACHED</p>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;
