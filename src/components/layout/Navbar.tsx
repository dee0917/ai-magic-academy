import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Newspaper, BookOpen, FlaskConical, Package, User, Coffee, Zap, ChevronRight, Star } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
    
    return (
        <nav className="fixed top-0 w-full z-50 border-b-4 border-magic-text bg-magic-primary parchment-texture">
            <div className="max-w-[1400px] mx-auto px-6 h-[100px] flex items-center justify-between gap-4">
                <Link to="/" className="flex flex-col items-start cursor-pointer group flex-shrink-0">
                    <span className="font-display text-4xl text-magic-text group-hover:skew-x-6 transition-transform leading-none">DEE'S</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-magic-text/60 mt-1">AI Magic Lab</span>
                </Link>

                {/* 桌面版導航 - 報紙排版風格 */}
                <div className="hidden xl:flex items-center gap-8 h-full">
                    {[
                        { to: "/insights", label: "魔法藏書閣", icon: BookOpen },
                        { to: "/news", label: "真理時報", icon: Newspaper },
                        { to: "/lab/templates", label: "禁忌咒語", icon: Zap },
                        { to: "/solutions", label: "鍊金道具", icon: Package },
                        { to: "/about", label: "關於大法師", icon: User },
                    ].map((link) => (
                        <Link 
                            key={link.to} 
                            to={link.to} 
                            className={`h-full flex items-center px-4 border-x-2 border-magic-text/10 hover:bg-magic-text/5 transition-all text-sm font-black tracking-widest relative ${isActive(link.to) ? 'bg-magic-teal text-magic-bg border-x-magic-text' : 'text-magic-text'}`}
                        >
                            {link.label}
                            {isActive(link.to) && (
                                <motion.div layoutId="nav-active" className="absolute bottom-0 left-0 w-full h-2 bg-magic-red" />
                            )}
                        </Link>
                    ))}
                    
                    <a 
                        href="https://pay.ecpay.com.tw/CreditPayment/ExpressCredit?MerchantID=3378826" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-magic-red text-magic-bg px-6 py-3 border-4 border-magic-text shadow-brutalist hover:shadow-brutalist-hover transition-all font-display text-xs tracking-[0.2em]"
                    >
                        贊助魔藥
                    </a>
                </div>

                <button className="xl:hidden text-magic-text p-2 border-4 border-magic-text bg-magic-bg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={32} strokeWidth={3} /> : <Menu size={32} strokeWidth={3} />}
                </button>
            </div>

            {/* 📱 手機版選單 (高飽和度粗野主義) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="xl:hidden fixed inset-0 top-[100px] bg-magic-bg parchment-texture z-40 p-8 flex flex-col gap-4 border-t-4 border-magic-text"
                    >
                        {[
                            { to: "/insights", label: "魔法藏書閣", icon: BookOpen },
                            { to: "/news", label: "真理時報", icon: Newspaper },
                            { to: "/lab/templates", label: "禁忌咒語", icon: Zap },
                            { to: "/solutions", label: "鍊金道具", icon: Package },
                            { to: "/about", label: "關於大法師", icon: User },
                        ].map((link) => (
                            <Link 
                                key={link.to}
                                to={link.to} 
                                onClick={() => setMobileMenuOpen(false)} 
                                className={`flex items-center justify-between p-6 border-4 border-magic-text shadow-brutalist ${isActive(link.to) ? 'bg-magic-teal text-magic-bg' : 'bg-magic-primary text-magic-text'}`}
                            >
                                <span className="text-2xl font-display tracking-widest">{link.label}</span>
                                <ChevronRight size={24} strokeWidth={3} />
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
