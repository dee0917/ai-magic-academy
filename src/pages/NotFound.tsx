import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
        <span className="text-8xl font-bold text-zinc-800 font-mono mb-4">404</span>
        <h1 className="text-3xl font-bold text-white mb-4 font-serif">找不到這個頁面</h1>
        <p className="text-zinc-400 mb-10 max-w-md">你可能輸入了錯誤的網址，或是這個頁面已經被移動。別擔心，讓我帶你回到正軌。</p>
        <div className="flex gap-4">
            <Link to="/" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors">
                <Home size={18} /> 回到首頁
            </Link>
            <Link to="/insights" className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-colors">
                免費教學 <ArrowRight size={18} />
            </Link>
        </div>
    </motion.div>
);

export default NotFound;
