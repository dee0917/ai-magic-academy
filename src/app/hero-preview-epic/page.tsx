"use client";
import { motion } from "framer-motion";
import { Hexagon, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EpicMagicHeroes() {
  const title = "麻瓜專用AI外掛";
  const subtitle = "將複雜的「提示詞」封裝成一鍵釋放的魔法。應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。";

  return (
    <div className="min-h-screen bg-[#030108] flex flex-col items-center justify-center p-4 font-serif overflow-hidden">
      {/* Back to Home */}
      <Link href="/" className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20 transition-all text-xs font-bold text-purple-300 font-sans">
        <ArrowLeft className="w-4 h-4" /> 返回學院首頁
      </Link>

      {/* 🔮 方案 1：大賢者的魔法陣 (The Arcane Summoning Circle) */}
      <header className="relative text-center flex flex-col items-center justify-center py-40 w-full min-h-[600px]">
        {/* 背景旋轉魔法陣 - 增加對比度與發光 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px] flex items-center justify-center"
          >
            {/* 最外層光環 */}
            <div className="absolute inset-0 border-[2px] border-purple-500/40 rounded-full shadow-[0_0_50px_rgba(168,85,247,0.3)]"></div>
            
            {/* 中層虛線環 */}
            <div className="absolute w-[92%] h-[92%] border-[1px] border-purple-400/30 border-dashed rounded-full"></div>
            
            {/* 內層六角形 - 強制高對比 */}
            <Hexagon className="absolute w-[80%] h-[80%] text-purple-500/40 stroke-[1]" />
            
            {/* 最內層核心環 */}
            <div className="absolute w-[60%] h-[60%] border-[1px] border-purple-500/50 rounded-full"></div>
            
            {/* 額外裝飾：四角定位符 */}
            {[0, 90, 180, 270].map((angle) => (
              <div 
                key={angle}
                style={{ transform: `rotate(${angle}deg) translateY(-50%)` }}
                className="absolute top-1/2 w-4 h-1 bg-purple-400/60 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
              ></div>
            ))}
          </motion.div>
        </div>

        {/* 標題文字 - 強化漸層與發光 */}
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-200 to-purple-600 drop-shadow-[0_0_40px_rgba(168,85,247,1)] tracking-tighter mb-8 relative z-20"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-purple-100/80 max-w-2xl text-xl font-sans relative z-20 px-4 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* 底部發光基座 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
      </header>
    </div>
  );
}
