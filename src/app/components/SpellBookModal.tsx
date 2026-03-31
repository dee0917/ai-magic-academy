"use client";
import React, { useState } from "react";
import { X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAcademy } from "../context/AcademyContext";
import { CURSES, TIER_CONFIG, getSpellCode, SCHOOL_CONFIG } from "../lib/constants";
import { QUESTS, getSchoolQuests } from "../lib/quests";
import { SchoolType } from "../curses_data";
import FusionSystem from "../FusionSystem";

type SpellBookTab = 'collection' | 'quests';

export default function SpellBookModal() {
  const {
    showSpellBook, setShowSpellBook,
    showFusion, setShowFusion,
    collectedCards, saveCollection,
    mp, saveMp,
    completedQuests,
    earnedTitles,
    getSchoolProgress,
    getRequirementStatus,
    handleFusionComplete,
  } = useAcademy();

  const [activeTab, setActiveTab] = useState<SpellBookTab>('collection');

  const schools: SchoolType[] = ['defense', 'attack', 'healing', 'illusion', 'contract', 'insight'];

  return (
    <>
      {/* ── MAGIC BOOK MODAL ── */}
      <AnimatePresence>
        {showSpellBook && (
          <div className="fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60"
              onClick={() => setShowSpellBook(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative w-full max-w-3xl mx-4 my-8 z-10"
              style={{ background: 'var(--parchment)', border: '4px solid var(--ink)', boxShadow: '8px 8px 0 var(--ink)' }}
            >
              {/* Book header */}
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '4px solid var(--ink)', background: 'var(--ink)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📖</span>
                  <h2 className="text-xl font-black tracking-wider" style={{ fontFamily: 'var(--font-noto-serif-tc)', color: 'var(--mustard)' }}>
                    魔法書
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--parchment)', opacity: 0.6 }}>
                    {collectedCards.length} / {CURSES.length} 已收集
                  </span>
                  <button onClick={() => setShowSpellBook(false)} className="text-xl" style={{ color: 'var(--parchment)', opacity: 0.6 }}>✕</button>
                </div>
              </div>

              {/* Tab switcher */}
              <div className="flex" style={{ borderBottom: '2px solid var(--ink)' }}>
                {([
                  { key: 'collection' as SpellBookTab, label: '收藏' },
                  { key: 'quests' as SpellBookTab, label: '任務' },
                ]).map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex-1 py-3 text-sm font-black tracking-wider transition-all"
                    style={{
                      fontFamily: 'var(--font-noto-serif-tc)',
                      color: activeTab === tab.key ? 'var(--parchment)' : 'var(--ink)',
                      background: activeTab === tab.key ? 'var(--ink)' : 'transparent',
                      borderRight: tab.key === 'collection' ? '2px solid var(--ink)' : 'none',
                    }}
                  >
                    {tab.label}
                    {tab.key === 'quests' && (
                      <span className="ml-2 text-[10px]" style={{ opacity: 0.6 }}>
                        {completedQuests.length}/{QUESTS.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Collection tab */}
              {activeTab === 'collection' && (
                <>
                  {/* Collection progress bar */}
                  <div className="px-6 py-3" style={{ borderBottom: '2px solid var(--ink)' }}>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.5 }}>收集進度</span>
                      <div className="flex-1 h-3 relative" style={{ border: '2px solid var(--ink)', background: 'rgba(0,0,0,0.05)' }}>
                        <div className="absolute top-0 left-0 h-full transition-all duration-700"
                          style={{ width: `${(collectedCards.length / CURSES.length) * 100}%`, background: 'var(--teal)' }} />
                      </div>
                      <span className="text-[10px] font-black" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--teal)' }}>
                        {Math.round((collectedCards.length / CURSES.length) * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Card grid — grouped by tier */}
                  <div className="p-6">
                    {(['apprentice', 'adept', 'master', 'archmage', 'forbidden'] as const).map(tierKey => {
                      const tierCurses = CURSES.filter(c => c.tier === tierKey);
                      if (tierCurses.length === 0) return null;
                      const tier = TIER_CONFIG[tierKey];
                      return (
                        <div key={tierKey} className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] font-black px-2 py-0.5 tracking-wider"
                              style={{
                                fontFamily: 'var(--font-chivo)',
                                color: tierKey === 'forbidden' ? '#D4AF37' : tier.color,
                                border: `2px solid ${tierKey === 'forbidden' ? '#D4AF37' : tier.color}`,
                                background: tierKey === 'forbidden' ? '#1F2937' : 'transparent',
                              }}>
                              {tier.label}
                            </span>
                            <span className="text-[10px]" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.4 }}>
                              {tierCurses.filter(c => collectedCards.includes(c.id)).length}/{tierCurses.length}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {tierCurses.map(curse => {
                              const collected = collectedCards.includes(curse.id);
                              return (
                                <div
                                  key={curse.id}
                                  className="relative p-3 flex flex-col gap-1.5 transition-all"
                                  style={{
                                    border: `3px solid ${collected ? tier.borderColor : 'rgba(0,0,0,0.1)'}`,
                                    background: collected ? tier.bgGlow : 'rgba(0,0,0,0.03)',
                                    boxShadow: collected ? `3px 3px 0 ${tier.borderColor}` : 'none',
                                    opacity: collected ? 1 : 0.5,
                                    filter: collected ? 'none' : 'grayscale(1)',
                                  }}
                                >
                                  {/* Spell code */}
                                  <span className="text-[8px] font-black tracking-wider"
                                    style={{ fontFamily: 'var(--font-chivo)', color: tier.color, opacity: collected ? 0.6 : 0.3 }}>
                                    {getSpellCode(curse)}
                                  </span>

                                  {/* Icon + Title */}
                                  <div className="flex items-center gap-2">
                                    {collected ? (
                                      <span className="text-lg">{curse.icon}</span>
                                    ) : (
                                      <span className="text-lg opacity-30">❓</span>
                                    )}
                                    <span className="text-xs font-black leading-tight"
                                      style={{ fontFamily: 'var(--font-noto-sans-tc)', color: collected ? 'var(--ink)' : 'rgba(0,0,0,0.3)' }}>
                                      {collected ? curse.title.split('：')[0] : '？？？'}
                                    </span>
                                  </div>

                                  {/* Collected badge */}
                                  {collected && (
                                    <span className="absolute top-1.5 right-1.5 text-[8px] font-black px-1.5 py-0.5"
                                      style={{ background: 'var(--teal)', color: 'var(--parchment)', fontFamily: 'var(--font-chivo)' }}>
                                      ✓
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {/* Collection milestone rewards */}
                    <div className="mt-6 pt-4" style={{ borderTop: '2px dashed var(--ink)', opacity: 0.6 }}>
                      <span className="text-[10px] font-black uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                        🏆 收集獎勵
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {[
                          { need: 3, reward: '5 MP', title: '見習法師', emoji: '🧙‍♂️' },
                          { need: 5, reward: '15 MP', title: '中階術士', emoji: '🔮' },
                          { need: 8, reward: '30 MP', title: '高階巫師', emoji: '⚡' },
                          { need: 15, reward: '50 MP', title: '大魔導師', emoji: '👑' },
                        ].map(m => (
                          <div key={m.need} className="flex items-center gap-2 text-[10px] py-1.5 px-2"
                            style={{
                              fontFamily: 'var(--font-chivo)',
                              background: collectedCards.length >= m.need ? 'rgba(26,92,90,0.1)' : 'transparent',
                              border: `1px solid ${collectedCards.length >= m.need ? 'var(--teal)' : 'rgba(0,0,0,0.1)'}`,
                            }}>
                            <span>{m.emoji}</span>
                            <span className="font-black" style={{ color: collectedCards.length >= m.need ? 'var(--teal)' : 'var(--ink)', opacity: collectedCards.length >= m.need ? 1 : 0.4 }}>
                              {m.title}
                            </span>
                            <span style={{ opacity: 0.5 }}>— 收集 {m.need} 張 → +{m.reward}</span>
                            {collectedCards.length >= m.need && <span style={{ color: 'var(--teal)' }}>✓</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Quests tab */}
              {activeTab === 'quests' && (
                <div className="p-6">
                  {/* Earned titles */}
                  {earnedTitles.length > 0 && (
                    <div className="mb-6 pb-4" style={{ borderBottom: '2px dashed var(--ink)' }}>
                      <span className="text-[10px] font-black uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>
                        🏅 獲得稱號
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {earnedTitles.map(title => (
                          <span key={title} className="text-[11px] font-black px-3 py-1"
                            style={{
                              fontFamily: 'var(--font-noto-serif-tc)',
                              background: 'var(--ink)',
                              color: 'var(--mustard)',
                              boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                            }}>
                            {title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* School quest sections */}
                  {schools.map(school => {
                    const config = SCHOOL_CONFIG[school];
                    const progress = getSchoolProgress(school);
                    const quests = getSchoolQuests(school);

                    return (
                      <div key={school} className="mb-6">
                        {/* School header with progress */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-lg">{config.emoji}</span>
                          <span className="text-sm font-black tracking-wider"
                            style={{ fontFamily: 'var(--font-noto-serif-tc)', color: config.color }}>
                            {config.label}學派
                          </span>
                          <span className="text-[10px] font-black"
                            style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.5 }}>
                            {progress.completed}/{progress.total}
                          </span>
                          {/* Progress bar */}
                          <div className="flex-1 h-2 relative" style={{ border: '2px solid var(--ink)', background: 'rgba(0,0,0,0.05)' }}>
                            <div className="absolute top-0 left-0 h-full transition-all duration-700"
                              style={{
                                width: `${progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}%`,
                                background: config.color,
                              }} />
                          </div>
                        </div>

                        {/* Quest list */}
                        <div className="grid gap-2 ml-2">
                          {quests.map(quest => {
                            const isCompleted = completedQuests.includes(quest.id);
                            const isLocked = quest.prerequisite && !completedQuests.includes(quest.prerequisite);
                            const status = getRequirementStatus(quest, collectedCards);

                            return (
                              <div
                                key={quest.id}
                                className="flex items-center gap-3 p-3 transition-all"
                                style={{
                                  border: `2px solid ${isCompleted ? config.color : 'rgba(0,0,0,0.1)'}`,
                                  background: isCompleted ? `${config.color}10` : isLocked ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.03)',
                                  opacity: isLocked ? 0.4 : 1,
                                }}
                              >
                                {/* Status icon */}
                                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                                  style={{
                                    border: `2px solid ${isCompleted ? config.color : 'rgba(0,0,0,0.2)'}`,
                                    background: isCompleted ? config.color : 'transparent',
                                    color: isCompleted ? 'var(--parchment)' : 'var(--ink)',
                                  }}>
                                  {isCompleted ? (
                                    <span className="text-xs font-black">✓</span>
                                  ) : isLocked ? (
                                    <span className="text-[10px]">🔒</span>
                                  ) : (
                                    <span className="text-[10px] font-black" style={{ color: 'var(--ink)', opacity: 0.3 }}>{quest.order}</span>
                                  )}
                                </div>

                                {/* Quest info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-black"
                                      style={{
                                        fontFamily: 'var(--font-noto-serif-tc)',
                                        color: isCompleted ? config.color : 'var(--ink)',
                                      }}>
                                      {quest.title}
                                    </span>
                                  </div>
                                  <span className="text-[10px] block mt-0.5"
                                    style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.6 }}>
                                    {quest.description}
                                  </span>
                                  {!isCompleted && !isLocked && (
                                    <span className="text-[9px] block mt-1 font-black"
                                      style={{ fontFamily: 'var(--font-chivo)', color: config.color, opacity: 0.8 }}>
                                      {status}
                                    </span>
                                  )}
                                </div>

                                {/* Reward */}
                                <div className="flex-shrink-0 text-right">
                                  <span className="text-[10px] font-black px-2 py-1"
                                    style={{
                                      fontFamily: 'var(--font-chivo)',
                                      background: isCompleted ? `${config.color}20` : 'rgba(0,0,0,0.05)',
                                      color: isCompleted ? config.color : 'var(--ink)',
                                      opacity: isCompleted ? 1 : 0.5,
                                      border: `1px solid ${isCompleted ? config.color : 'rgba(0,0,0,0.1)'}`,
                                    }}>
                                    {quest.reward.type === 'mp'
                                      ? `+${quest.reward.value} MP`
                                      : `🏅 ${quest.reward.value}`
                                    }
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── FUSION SYSTEM MODAL ── */}
      <AnimatePresence>
        {showFusion && (
          <div className="fixed inset-0 z-[400] flex items-start justify-center overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70"
              onClick={() => setShowFusion(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              className="relative w-full max-w-2xl mx-4 my-8 z-10"
              style={{ background: 'var(--parchment)', border: '4px solid var(--ink)', boxShadow: '8px 8px 0 var(--ink)' }}
            >
              {/* Close button overlaid */}
              <button
                onClick={() => setShowFusion(false)}
                className="absolute top-4 right-4 z-20"
                style={{ color: 'var(--parchment)', opacity: 0.6 }}
              >
                <X className="w-5 h-5" />
              </button>
              <FusionSystem
                collection={collectedCards}
                allCurses={CURSES as any[]}
                onCollectionChange={saveCollection}
                onMpChange={(delta) => saveMp(mp + delta)}
                onFusionComplete={handleFusionComplete}
                currentMp={mp}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
