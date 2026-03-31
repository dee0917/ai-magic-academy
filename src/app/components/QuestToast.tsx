"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAcademy } from "../context/AcademyContext";
import { SCHOOL_CONFIG, SchoolType } from "../curses_data";

export default function QuestToast() {
  const { questToast } = useAcademy();

  return (
    <AnimatePresence>
      {questToast && (
        <motion.div
          initial={{ opacity: 0, y: -60, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -60, x: '-50%' }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-4 left-1/2 z-[9999] w-[90%] max-w-md"
          style={{
            background: 'var(--ink)',
            border: '4px solid var(--mustard)',
            boxShadow: '6px 6px 0 rgba(0,0,0,0.4)',
          }}
        >
          <div className="px-5 py-4 flex items-center gap-4">
            {/* School emoji */}
            <motion.span
              className="text-3xl flex-shrink-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 10, stiffness: 200 }}
            >
              {SCHOOL_CONFIG[questToast.quest.school]?.emoji || '✨'}
            </motion.span>

            {/* Quest info */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-[10px] font-black uppercase tracking-widest block"
                  style={{ fontFamily: 'var(--font-chivo)', color: 'var(--mustard)', opacity: 0.8 }}>
                  任務完成
                </span>
                <span className="text-sm font-black block mt-0.5"
                  style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--parchment)' }}>
                  {questToast.quest.title}
                </span>
              </motion.div>
            </div>

            {/* Reward */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", damping: 12 }}
            >
              <span className="text-xs font-black px-3 py-1.5 block"
                style={{
                  fontFamily: 'var(--font-chivo)',
                  background: 'var(--mustard)',
                  color: 'var(--ink)',
                }}>
                {questToast.quest.reward.type === 'mp'
                  ? `+${questToast.quest.reward.value} MP`
                  : `🏅 ${questToast.quest.reward.value}`
                }
              </span>
            </motion.div>
          </div>

          {/* Animated bottom line */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 3, ease: "linear" }}
            className="h-1 origin-left"
            style={{ background: 'var(--mustard)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
