"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, RotateCcw, Flame, Package, RefreshCw, ChevronRight, Star } from "lucide-react";
import {
  TIER_CONFIG, getSpellCode, FORGE_CHARGES, FRAGMENT_YIELD,
  FUSION_RECIPES, lookupRecipe, getFragmentType, CURSES, CAST_LEVELS,
} from "./curses_data";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Curse {
  id: string;
  tab: string;
  isPro: boolean;
  tier: string;
  outputFormat: string;
  icon: React.ReactNode;
  color: string;
  title: string;
  desc: string;
  tags: string[];
  fields: { id: string; label: string; placeholder: string }[];
  tweak: { id: string; label: string; options: string[] };
  theory: string;
  generate: (inputs: any) => string;
  fused_from?: string[];
  fragments_needed?: number;
  unlock_method?: string;
}

type Phase = "select" | "preview" | "forging" | "result" | "synthesize" | "reforge";

interface FusionSystemProps {
  collection: string[];        // card IDs with duplicates
  allCurses: Curse[];
  onCollectionChange: (newCollection: string[]) => void;
  onMpChange?: (delta: number) => void;
  currentMp?: number;
}

// ── localStorage helpers ───────────────────────────────────────────────────────

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function saveJSON(key: string, value: unknown): void {
  if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(value));
}

// ── Tier helpers ───────────────────────────────────────────────────────────────

const TIER_ORDER = ["apprentice", "adept", "master", "archmage", "forbidden"];

const TIER_BADGE_BG: Record<string, string> = {
  apprentice: "#6B7280",
  adept: "#2563EB",
  master: "#7C3AED",
  archmage: "#DC2626",
  forbidden: "#B8860B",
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function FusionSystem({
  collection,
  allCurses,
  onCollectionChange,
  onMpChange,
  currentMp = 0,
}: FusionSystemProps) {
  // ── State ──
  const [phase, setPhase] = useState<Phase>("select");
  const [mainCardId, setMainCardId] = useState<string | null>(null);
  const [sacrificeCardId, setSacrificeCardId] = useState<string | null>(null);
  const [fragments, setFragments] = useState<Record<string, number>>(() => loadJSON("magic-fragments", {}));
  const [forgeCharges, setForgeCharges] = useState<Record<string, number>>(() => loadJSON("magic-forge-charges", {}));
  const [synthesized, setSynthesized] = useState<string[]>(() => loadJSON("magic-synthesized", []));
  const [lastFragment, setLastFragment] = useState<{ type: string; count: number } | null>(null);
  const [justSynthesized, setJustSynthesized] = useState<string | null>(null);
  const [reforgeTarget, setReforgeTarget] = useState<string | null>(null);

  // ── Derived ──
  const curseMap = useMemo(() => {
    const map = new Map<string, Curse>();
    allCurses.forEach((c) => map.set(c.id, c));
    return map;
  }, [allCurses]);

  // Count duplicates in collection
  const collectionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    collection.forEach((id) => { counts[id] = (counts[id] || 0) + 1; });
    return counts;
  }, [collection]);

  // Unique card IDs in collection
  const uniqueCardIds = useMemo(() => Object.keys(collectionCounts), [collectionCounts]);

  const mainCard = mainCardId ? curseMap.get(mainCardId) ?? null : null;
  const sacrificeCard = sacrificeCardId ? curseMap.get(sacrificeCardId) ?? null : null;

  // Get remaining charges for a card
  const getCharges = useCallback((cardId: string) => {
    const curse = curseMap.get(cardId);
    if (!curse) return 0;
    if (curse.tier === "forbidden") return 0; // cannot be main card
    if (forgeCharges[cardId] !== undefined) return forgeCharges[cardId];
    return FORGE_CHARGES[curse.tier] ?? 0;
  }, [curseMap, forgeCharges]);

  // Check if a card is worn (no charges left)
  const isWorn = useCallback((cardId: string) => {
    const curse = curseMap.get(cardId);
    if (!curse) return false;
    if (curse.tier === "forbidden") return true;
    return getCharges(cardId) <= 0;
  }, [curseMap, getCharges]);

  // Recipe lookup for current selection
  const recipe = mainCard && sacrificeCard ? lookupRecipe(mainCard.id, sacrificeCard.id) : null;
  const fragmentType = mainCard && sacrificeCard ? getFragmentType(mainCard.id, sacrificeCard.id) : null;
  const fragmentYield = sacrificeCard ? (FRAGMENT_YIELD[sacrificeCard.tier] ?? 0) : 0;

  // Progress toward synthesis
  const currentFragments = fragmentType ? (fragments[fragmentType] ?? 0) : 0;
  const neededFragments = recipe?.fragments_needed ?? 0;

  // Get reforge cost
  const getReforgeCost = useCallback((cardId: string) => {
    const curse = curseMap.get(cardId);
    if (!curse) return 0;
    const fullCastLevel = CAST_LEVELS.find(c => c.id === "full");
    const tierConfig = TIER_CONFIG[curse.tier];
    if (!fullCastLevel || !tierConfig) return 0;
    return fullCastLevel.mpBase * tierConfig.mpMultiplier * 2;
  }, [curseMap]);

  // ── Persist state changes ──
  useEffect(() => { saveJSON("magic-fragments", fragments); }, [fragments]);
  useEffect(() => { saveJSON("magic-forge-charges", forgeCharges); }, [forgeCharges]);
  useEffect(() => { saveJSON("magic-synthesized", synthesized); }, [synthesized]);

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleSelectMain = useCallback((id: string) => {
    if (phase !== "select") return;
    if (mainCardId === id) { setMainCardId(null); return; }
    if (sacrificeCardId === id) { setSacrificeCardId(null); }
    setMainCardId(id);
  }, [phase, mainCardId, sacrificeCardId]);

  const handleSelectSacrifice = useCallback((id: string) => {
    if (phase !== "select") return;
    if (sacrificeCardId === id) { setSacrificeCardId(null); return; }
    if (mainCardId === id && (collectionCounts[id] ?? 0) <= 1) return; // can't sacrifice if only 1 copy and it's main
    setSacrificeCardId(id);
  }, [phase, mainCardId, sacrificeCardId, collectionCounts]);

  const handleReset = useCallback(() => {
    setMainCardId(null);
    setSacrificeCardId(null);
    setPhase("select");
    setLastFragment(null);
    setJustSynthesized(null);
  }, []);

  const handleForge = useCallback(() => {
    if (!mainCard || !sacrificeCard || !recipe || !fragmentType) return;
    if (isWorn(mainCard.id)) return;
    if ((collectionCounts[sacrificeCard.id] ?? 0) < 1) return;

    setPhase("forging");

    setTimeout(() => {
      // 1. Consume sacrifice card (remove one copy from collection)
      const newCollection = [...collection];
      const sacrificeIdx = newCollection.indexOf(sacrificeCard.id);
      if (sacrificeIdx !== -1) newCollection.splice(sacrificeIdx, 1);
      onCollectionChange(newCollection);

      // 2. Deduct forge charge from main card
      const currentCharges = getCharges(mainCard.id);
      const newCharges = { ...forgeCharges, [mainCard.id]: currentCharges - 1 };
      setForgeCharges(newCharges);

      // 3. Add fragments
      const yieldAmount = FRAGMENT_YIELD[sacrificeCard.tier] ?? 1;
      const newFragments = { ...fragments, [fragmentType]: (fragments[fragmentType] ?? 0) + yieldAmount };
      setFragments(newFragments);
      setLastFragment({ type: fragmentType, count: yieldAmount });

      // 4. Check if synthesis is triggered
      const totalFragments = newFragments[fragmentType] ?? 0;
      if (totalFragments >= recipe.fragments_needed && !synthesized.includes(recipe.result)) {
        // Auto-synthesize after showing fragment result
        setTimeout(() => {
          // Consume fragments
          const afterSynth = { ...newFragments, [fragmentType]: totalFragments - recipe.fragments_needed };
          setFragments(afterSynth);

          // Add synthesized card to collection and record
          const synthCollection = [...newCollection, recipe.result];
          onCollectionChange(synthCollection);
          setSynthesized((prev) => [...prev, recipe.result]);
          setJustSynthesized(recipe.result);
          setPhase("synthesize");
        }, 1800);

        setPhase("result");
      } else {
        setPhase("result");
      }
    }, 2000);
  }, [mainCard, sacrificeCard, recipe, fragmentType, isWorn, collectionCounts, collection, onCollectionChange, getCharges, forgeCharges, fragments, synthesized]);

  const handleReforge = useCallback((cardId: string) => {
    const cost = getReforgeCost(cardId);
    if (currentMp < cost) return;
    const curse = curseMap.get(cardId);
    if (!curse) return;

    // Deduct MP
    onMpChange?.(-cost);

    // Restore charges
    const maxCharges = FORGE_CHARGES[curse.tier] ?? 0;
    setForgeCharges((prev) => ({ ...prev, [cardId]: maxCharges }));
    setReforgeTarget(null);
  }, [getReforgeCost, currentMp, curseMap, onMpChange]);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full">
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "4px solid var(--ink)", background: "var(--ink)" }}
      >
        <div className="flex items-center gap-3">
          <Flame className="w-5 h-5" style={{ color: "var(--mustard)" }} />
          <h2
            className="text-lg font-black tracking-wider"
            style={{ fontFamily: "var(--font-noto-serif-tc)", color: "var(--mustard)" }}
          >
            融合爐
          </h2>
        </div>
        <span
          className="text-[10px] font-black"
          style={{ fontFamily: "var(--font-chivo)", color: "var(--parchment)", opacity: 0.5 }}
        >
          {Object.values(fragments).reduce((a, b) => a + b, 0)} 碎片 | {synthesized.length} 合成
        </span>
      </div>

      {/* ── Forge Area ── */}
      <div className="px-6 py-5" style={{ borderBottom: "2px solid var(--ink)" }}>
        <div className="flex items-center justify-center gap-4">
          {/* Main Card Slot */}
          <CardSlot
            curse={mainCard}
            label="主卡"
            sublabel={mainCard ? `剩餘 ${getCharges(mainCard.id)} 次` : undefined}
            isWorn={mainCard ? isWorn(mainCard.id) : false}
            onClear={() => setMainCardId(null)}
            disabled={phase !== "select"}
            animating={phase === "forging"}
            side="left"
          />

          {/* Center indicator */}
          <div className="flex flex-col items-center gap-1">
            {phase === "forging" ? (
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                transition={{
                  rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                  scale: { duration: 0.6, repeat: Infinity },
                }}
              >
                <Flame className="w-8 h-8" style={{ color: "var(--mustard)" }} />
              </motion.div>
            ) : (
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  border: "3px solid var(--ink)",
                  background: mainCard && sacrificeCard
                    ? recipe ? "var(--mustard)" : "var(--dark-red)"
                    : "rgba(0,0,0,0.05)",
                }}
              >
                <Zap
                  className="w-5 h-5"
                  style={{
                    color: mainCard && sacrificeCard
                      ? recipe ? "var(--ink)" : "var(--parchment)"
                      : "rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            )}
            {mainCard && sacrificeCard && !recipe && phase === "select" && (
              <span className="text-[9px] font-black mt-1"
                style={{ fontFamily: "var(--font-noto-sans-tc)", color: "var(--dark-red)" }}>
                無配方
              </span>
            )}
          </div>

          {/* Sacrifice Card Slot */}
          <CardSlot
            curse={sacrificeCard}
            label="祭品"
            sublabel={sacrificeCard ? `x${collectionCounts[sacrificeCard.id] ?? 0}` : undefined}
            onClear={() => setSacrificeCardId(null)}
            disabled={phase !== "select"}
            animating={phase === "forging"}
            side="right"
            isSacrifice
          />
        </div>

        {/* Recipe info */}
        {mainCard && sacrificeCard && recipe && phase === "select" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3"
            style={{ border: "2px dashed var(--mustard)", background: "rgba(232,168,56,0.08)" }}
          >
            <div className="text-center">
              <span className="text-[10px] font-black"
                style={{ fontFamily: "var(--font-noto-sans-tc)", color: "var(--ink)" }}>
                {curseMap.get(recipe.result)?.title ?? recipe.result} 碎片
              </span>
              <span className="text-[9px] ml-2" style={{ color: "var(--teal)", fontFamily: "var(--font-chivo)" }}>
                +{fragmentYield} 碎片
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-2">
              <div className="flex items-center justify-between text-[9px] font-black mb-1"
                style={{ fontFamily: "var(--font-chivo)" }}>
                <span style={{ color: "var(--ink)", opacity: 0.6 }}>
                  {currentFragments}/{neededFragments}
                </span>
                <span style={{ color: currentFragments + fragmentYield >= neededFragments ? "var(--teal)" : "var(--ink)", opacity: 0.6 }}>
                  {currentFragments + fragmentYield >= neededFragments ? "鍛造後可合成!" : `還需 ${neededFragments - currentFragments - fragmentYield} 碎片`}
                </span>
              </div>
              <div className="h-2" style={{ background: "rgba(0,0,0,0.08)", border: "1px solid var(--ink)" }}>
                <div className="h-full transition-all" style={{
                  width: `${Math.min(100, (currentFragments / neededFragments) * 100)}%`,
                  background: "var(--teal)",
                }} />
                {/* Preview of what will be added */}
                <div className="h-full -mt-2 transition-all" style={{
                  width: `${Math.min(100, ((currentFragments + fragmentYield) / neededFragments) * 100)}%`,
                  background: "var(--mustard)",
                  opacity: 0.4,
                }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-3 mt-4">
          {phase === "select" && (
            <>
              <button onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-black transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                style={{
                  fontFamily: "var(--font-noto-sans-tc)", border: "2px solid var(--ink)",
                  boxShadow: "3px 3px 0 var(--ink)", background: "var(--parchment)", color: "var(--ink)",
                }}>
                <RotateCcw className="w-3 h-3" /> 重選
              </button>
              <button
                onClick={handleForge}
                disabled={!recipe || !mainCard || !sacrificeCard || isWorn(mainCard?.id ?? "")}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-black transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                style={{
                  fontFamily: "var(--font-noto-sans-tc)", border: "2px solid var(--ink)",
                  boxShadow: recipe ? "3px 3px 0 var(--ink)" : "none",
                  background: recipe ? "var(--dark-red)" : "rgba(0,0,0,0.08)",
                  color: recipe ? "var(--parchment)" : "rgba(0,0,0,0.25)",
                  cursor: recipe ? "pointer" : "not-allowed",
                }}>
                <Flame className="w-3 h-3" /> 鍛造
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Forging Animation ── */}
      <AnimatePresence>
        {phase === "forging" && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="px-6 py-12 flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ scale: [0.5, 1.8, 0.5], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="w-20 h-20 flex items-center justify-center"
              style={{ background: "radial-gradient(circle, var(--mustard) 0%, transparent 70%)" }}
            >
              <Flame className="w-10 h-10" style={{ color: "var(--ink)" }} />
            </motion.div>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-sm font-black tracking-widest"
              style={{ fontFamily: "var(--font-noto-serif-tc)", color: "var(--ink)" }}
            >
              鍛造中...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Result Phase ── */}
      <AnimatePresence>
        {phase === "result" && lastFragment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 18, stiffness: 200 }}
            className="px-6 py-6 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] font-black tracking-widest uppercase"
              style={{ fontFamily: "var(--font-chivo)", color: "var(--teal)" }}>
              Fragment Acquired
            </span>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-16 h-16 flex items-center justify-center"
              style={{ background: "var(--mustard)", border: "3px solid var(--ink)", boxShadow: "4px 4px 0 var(--ink)" }}
            >
              <Package className="w-8 h-8" style={{ color: "var(--ink)" }} />
            </motion.div>

            <div className="text-center">
              <div className="text-sm font-black" style={{ fontFamily: "var(--font-noto-serif-tc)", color: "var(--ink)" }}>
                {curseMap.get(lastFragment.type)?.title ?? lastFragment.type}
              </div>
              <div className="text-xs mt-1" style={{ fontFamily: "var(--font-chivo)", color: "var(--teal)" }}>
                +{lastFragment.count} 碎片
              </div>
              {recipe && (
                <div className="mt-2 text-[10px]" style={{ fontFamily: "var(--font-chivo)", color: "var(--ink)", opacity: 0.6 }}>
                  進度：{Math.min(fragments[lastFragment.type] ?? 0, neededFragments)}/{neededFragments}
                </div>
              )}
            </div>

            {!justSynthesized && (
              <div className="flex justify-center gap-3 mt-2">
                <button onClick={handleReset}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-black transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                  style={{
                    fontFamily: "var(--font-noto-sans-tc)", border: "2px solid var(--ink)",
                    boxShadow: "3px 3px 0 var(--ink)", background: "var(--parchment)", color: "var(--ink)",
                  }}>
                  <RotateCcw className="w-3 h-3" /> 繼續鍛造
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Synthesize Phase ── */}
      <AnimatePresence>
        {phase === "synthesize" && justSynthesized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-6 py-8 flex flex-col items-center gap-5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.8, times: [0, 0.6, 1] }}
            >
              <Star className="w-12 h-12" style={{ color: "var(--mustard)" }} />
            </motion.div>

            <span className="text-[10px] font-black tracking-widest uppercase"
              style={{ fontFamily: "var(--font-chivo)", color: "var(--mustard)" }}>
              Synthesis Complete!
            </span>

            {(() => {
              const synthCurse = curseMap.get(justSynthesized);
              if (!synthCurse) return null;
              const tier = TIER_CONFIG[synthCurse.tier];
              return (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full max-w-xs p-4"
                  style={{
                    border: `4px solid ${tier.borderColor}`,
                    background: tier.bgGlow,
                    boxShadow: `6px 6px 0 ${tier.borderColor}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] font-black px-1.5 py-0.5"
                      style={{ background: TIER_BADGE_BG[synthCurse.tier], color: "#fff", fontFamily: "var(--font-chivo)" }}>
                      {tier.label}
                    </span>
                    <span className="text-[8px] font-black" style={{ fontFamily: "var(--font-chivo)", color: tier.color }}>
                      {getSpellCode(synthCurse)}
                    </span>
                  </div>
                  <div className="text-sm font-black" style={{ fontFamily: "var(--font-noto-serif-tc)", color: "var(--ink)" }}>
                    {synthCurse.title}
                  </div>
                  <div className="text-[10px] mt-1 leading-snug" style={{ fontFamily: "var(--font-noto-sans-tc)", color: "var(--ink)", opacity: 0.7 }}>
                    {synthCurse.desc.slice(0, 80)}...
                  </div>
                </motion.div>
              );
            })()}

            <button onClick={handleReset}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-black transition-all hover:translate-x-0.5 hover:translate-y-0.5"
              style={{
                fontFamily: "var(--font-noto-sans-tc)", border: "2px solid var(--ink)",
                boxShadow: "3px 3px 0 var(--ink)", background: "var(--teal)", color: "var(--parchment)",
              }}>
              完成
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Card Selection Grid ── */}
      {phase === "select" && (
        <div className="p-6 overflow-y-auto" style={{ maxHeight: "50vh" }}>
          {/* Fragment Progress Section */}
          {Object.keys(fragments).length > 0 && (
            <div className="mb-5 pb-4" style={{ borderBottom: "2px dashed rgba(0,0,0,0.15)" }}>
              <span className="text-[10px] font-black uppercase tracking-wider"
                style={{ fontFamily: "var(--font-chivo)", color: "var(--ink)", opacity: 0.5 }}>
                碎片進度
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(fragments).filter(([, v]) => v > 0).map(([type, count]) => {
                  const targetCurse = curseMap.get(type);
                  const neededEntry = Object.values(FUSION_RECIPES).find(r => r.result === type);
                  const needed = neededEntry?.fragments_needed ?? 0;
                  const isSynthDone = synthesized.includes(type);
                  return (
                    <div key={type} className="p-2" style={{
                      border: `1px solid ${isSynthDone ? "var(--teal)" : "rgba(0,0,0,0.15)"}`,
                      background: isSynthDone ? "rgba(26,92,90,0.1)" : "transparent",
                    }}>
                      <div className="text-[9px] font-black truncate"
                        style={{ fontFamily: "var(--font-noto-sans-tc)", color: "var(--ink)" }}>
                        {targetCurse?.title?.split("\uFF1A")[0] ?? type}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex-1 h-1.5" style={{ background: "rgba(0,0,0,0.08)" }}>
                          <div className="h-full" style={{
                            width: `${Math.min(100, (count / (needed || 1)) * 100)}%`,
                            background: isSynthDone ? "var(--teal)" : "var(--mustard)",
                          }} />
                        </div>
                        <span className="text-[8px] font-black" style={{ fontFamily: "var(--font-chivo)", color: "var(--ink)" }}>
                          {isSynthDone ? "done" : `${count}/${needed}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-wider"
              style={{ fontFamily: "var(--font-chivo)", color: "var(--ink)", opacity: 0.5 }}>
              {mainCardId ? "選擇祭品卡牌" : "選擇主卡（方向卡）"}
            </span>
            <span className="text-[10px] font-black"
              style={{ fontFamily: "var(--font-chivo)", color: "var(--teal)" }}>
              {uniqueCardIds.length} 種卡牌
            </span>
          </div>

          {uniqueCardIds.length === 0 ? (
            <div className="py-12 text-center" style={{ border: "2px dashed rgba(0,0,0,0.15)" }}>
              <span className="text-sm" style={{ fontFamily: "var(--font-noto-sans-tc)", color: "var(--ink)", opacity: 0.4 }}>
                尚未收集任何咒語卡牌
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {uniqueCardIds.map((cardId) => {
                const curse = curseMap.get(cardId);
                if (!curse) return null;
                const tier = TIER_CONFIG[curse.tier];
                const isMain = mainCardId === cardId;
                const isSacrifice = sacrificeCardId === cardId;
                const isSelected = isMain || isSacrifice;
                const count = collectionCounts[cardId] ?? 0;
                const charges = getCharges(cardId);
                const worn = isWorn(cardId);
                const canBeMain = !worn && curse.tier !== "forbidden";
                const canBeSacrifice = mainCardId !== null && (mainCardId !== cardId || count > 1);

                return (
                  <button
                    key={cardId}
                    onClick={() => {
                      if (!mainCardId) {
                        // Selecting main card
                        if (canBeMain) handleSelectMain(cardId);
                      } else if (mainCardId === cardId && !isSacrifice) {
                        // Deselect main
                        handleSelectMain(cardId);
                      } else {
                        // Selecting sacrifice
                        handleSelectSacrifice(cardId);
                      }
                    }}
                    className="relative p-3 flex flex-col gap-1.5 text-left transition-all"
                    style={{
                      border: `3px solid ${isSelected ? "var(--mustard)" : worn ? "rgba(0,0,0,0.2)" : tier.borderColor}`,
                      background: isSelected ? "rgba(232,168,56,0.15)" : worn ? "rgba(0,0,0,0.03)" : tier.bgGlow,
                      boxShadow: isSelected ? "4px 4px 0 var(--mustard)" : `3px 3px 0 ${worn ? "rgba(0,0,0,0.1)" : tier.borderColor}`,
                      transform: isSelected ? "translate(-2px, -2px)" : "none",
                      opacity: worn && !mainCardId ? 0.5 : 1,
                    }}
                  >
                    {/* Selection badge */}
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 text-[8px] font-black px-1.5 py-0.5"
                        style={{ background: isMain ? "var(--mustard)" : "var(--dark-red)", color: isMain ? "var(--ink)" : "var(--parchment)", fontFamily: "var(--font-chivo)" }}>
                        {isMain ? "主" : "祭"}
                      </span>
                    )}

                    {/* Count badge */}
                    {count > 1 && (
                      <span className="absolute top-1.5 left-1.5 text-[8px] font-black px-1 py-0.5"
                        style={{ background: "var(--ink)", color: "var(--parchment)", fontFamily: "var(--font-chivo)" }}>
                        x{count}
                      </span>
                    )}

                    {/* Spell code */}
                    <span className="text-[8px] font-black tracking-wider"
                      style={{ fontFamily: "var(--font-chivo)", color: tier.color, opacity: 0.6 }}>
                      {getSpellCode(curse)}
                    </span>

                    {/* Title */}
                    <span className="text-xs font-black leading-tight"
                      style={{ fontFamily: "var(--font-noto-sans-tc)", color: "var(--ink)" }}>
                      {curse.title.split("\uFF1A")[0]}
                    </span>

                    {/* Tier + charges */}
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[8px] font-black"
                        style={{ fontFamily: "var(--font-chivo)", color: tier.color }}>
                        {tier.label}
                      </span>
                      {curse.tier !== "forbidden" && (
                        <span className="text-[8px] font-black"
                          style={{ fontFamily: "var(--font-chivo)", color: worn ? "var(--dark-red)" : "var(--ink)", opacity: worn ? 1 : 0.4 }}>
                          {worn ? "磨損" : `${charges}次`}
                        </span>
                      )}
                    </div>

                    {/* Reforge button for worn cards */}
                    {worn && curse.tier !== "forbidden" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setReforgeTarget(cardId);
                        }}
                        className="mt-1 text-[8px] font-black px-2 py-0.5 w-full"
                        style={{
                          border: "1px solid var(--mustard)",
                          background: "rgba(232,168,56,0.15)",
                          color: "var(--mustard)",
                          fontFamily: "var(--font-chivo)",
                        }}
                      >
                        <RefreshCw className="w-2.5 h-2.5 inline mr-0.5" /> 重鑄 ({getReforgeCost(cardId)} MP)
                      </button>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Available recipes reference */}
          <div className="mt-6 pt-4" style={{ borderTop: "2px dashed rgba(0,0,0,0.15)" }}>
            <span className="text-[10px] font-black uppercase tracking-wider"
              style={{ fontFamily: "var(--font-chivo)", color: "var(--ink)", opacity: 0.5 }}>
              已知配方
            </span>
            <div className="grid grid-cols-1 gap-1 mt-2">
              {Object.entries(FUSION_RECIPES).map(([key, val]) => {
                const [aId, bId] = key.split("+");
                const a = curseMap.get(aId);
                const b = curseMap.get(bId);
                const result = curseMap.get(val.result);
                const haveA = uniqueCardIds.includes(aId);
                const haveB = uniqueCardIds.includes(bId);
                const done = synthesized.includes(val.result);
                return (
                  <div key={key} className="flex items-center gap-1 text-[9px] py-1"
                    style={{ opacity: done ? 0.4 : 1 }}>
                    <span style={{ color: haveA ? "var(--teal)" : "var(--ink)", fontFamily: "var(--font-noto-sans-tc)", opacity: haveA ? 1 : 0.4 }}>
                      {a?.title?.split("\uFF1A")[0] ?? aId}
                    </span>
                    <span style={{ color: "var(--ink)", opacity: 0.3 }}>+</span>
                    <span style={{ color: haveB ? "var(--teal)" : "var(--ink)", fontFamily: "var(--font-noto-sans-tc)", opacity: haveB ? 1 : 0.4 }}>
                      {b?.title?.split("\uFF1A")[0] ?? bId}
                    </span>
                    <ChevronRight className="w-3 h-3" style={{ color: "var(--ink)", opacity: 0.3 }} />
                    <span className="font-black" style={{ color: done ? "var(--teal)" : "var(--mustard)", fontFamily: "var(--font-noto-sans-tc)" }}>
                      {result?.title?.split("\uFF1A")[0] ?? val.result}
                    </span>
                    {done && <span className="text-[8px]" style={{ color: "var(--teal)" }}>&#10003;</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Reforge Modal ── */}
      <AnimatePresence>
        {reforgeTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={() => setReforgeTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="p-6 w-72"
              style={{ background: "var(--parchment)", border: "4px solid var(--ink)", boxShadow: "8px 8px 0 var(--ink)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <RefreshCw className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--mustard)" }} />
                <div className="text-sm font-black mb-2" style={{ fontFamily: "var(--font-noto-serif-tc)", color: "var(--ink)" }}>
                  重鑄確認
                </div>
                <div className="text-xs mb-4" style={{ fontFamily: "var(--font-noto-sans-tc)", color: "var(--ink)", opacity: 0.7 }}>
                  消耗 {getReforgeCost(reforgeTarget)} MP 重鑄
                  <br />
                  <span className="font-black">{curseMap.get(reforgeTarget)?.title?.split("\uFF1A")[0]}</span>
                  <br />
                  恢復所有鍛造次數
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setReforgeTarget(null)}
                    className="px-4 py-2 text-xs font-black"
                    style={{ border: "2px solid var(--ink)", background: "var(--parchment)", color: "var(--ink)", fontFamily: "var(--font-noto-sans-tc)" }}
                  >
                    取消
                  </button>
                  <button
                    onClick={() => handleReforge(reforgeTarget)}
                    disabled={currentMp < getReforgeCost(reforgeTarget)}
                    className="px-4 py-2 text-xs font-black"
                    style={{
                      border: "2px solid var(--ink)",
                      background: currentMp >= getReforgeCost(reforgeTarget) ? "var(--mustard)" : "rgba(0,0,0,0.1)",
                      color: currentMp >= getReforgeCost(reforgeTarget) ? "var(--ink)" : "rgba(0,0,0,0.3)",
                      fontFamily: "var(--font-noto-sans-tc)",
                      cursor: currentMp >= getReforgeCost(reforgeTarget) ? "pointer" : "not-allowed",
                    }}
                  >
                    重鑄
                  </button>
                </div>
                {currentMp < getReforgeCost(reforgeTarget) && (
                  <div className="text-[9px] mt-2" style={{ color: "var(--dark-red)", fontFamily: "var(--font-chivo)" }}>
                    MP 不足（需要 {getReforgeCost(reforgeTarget)}，目前 {currentMp}）
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Card Slot Sub-component ────────────────────────────────────────────────────

function CardSlot({
  curse,
  label,
  sublabel,
  isWorn,
  onClear,
  disabled,
  animating,
  side,
  isSacrifice,
}: {
  curse: Curse | null;
  label: string;
  sublabel?: string;
  isWorn?: boolean;
  onClear: () => void;
  disabled: boolean;
  animating: boolean;
  side: "left" | "right";
  isSacrifice?: boolean;
}) {
  const tier = curse ? TIER_CONFIG[curse.tier] : null;

  if (animating && curse) {
    return (
      <motion.div
        animate={isSacrifice ? {
          x: side === "right" ? -60 : 60,
          opacity: [1, 0.5, 0],
          scale: [1, 0.6, 0],
          rotate: [0, 15, 30],
        } : {
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-28 h-28 p-2 flex flex-col items-center justify-center"
        style={{
          border: `3px solid ${tier?.borderColor ?? "var(--ink)"}`,
          background: tier?.bgGlow ?? "transparent",
        }}
      >
        <span className="text-xs font-black text-center" style={{ fontFamily: "var(--font-noto-sans-tc)", color: "var(--ink)" }}>
          {curse.title.split("\uFF1A")[0]}
        </span>
      </motion.div>
    );
  }

  if (!curse) {
    return (
      <div
        className="w-28 h-28 flex flex-col items-center justify-center gap-1"
        style={{ border: "3px dashed rgba(0,0,0,0.2)", background: "rgba(0,0,0,0.02)" }}
      >
        <span className="text-[10px] font-black" style={{ fontFamily: "var(--font-chivo)", color: "var(--ink)", opacity: 0.3 }}>
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className="w-28 h-28 p-2 flex flex-col items-center justify-center gap-1 relative"
      style={{
        border: `3px solid ${isWorn ? "rgba(0,0,0,0.2)" : tier?.borderColor ?? "var(--ink)"}`,
        background: tier?.bgGlow ?? "transparent",
        boxShadow: `3px 3px 0 ${tier?.borderColor ?? "var(--ink)"}`,
        opacity: isWorn ? 0.5 : 1,
      }}
    >
      {!disabled && (
        <button
          onClick={onClear}
          className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center"
          style={{ background: "var(--ink)", color: "var(--parchment)" }}
        >
          <X className="w-3 h-3" />
        </button>
      )}
      <span className="text-[8px] font-black" style={{ fontFamily: "var(--font-chivo)", color: tier?.color ?? "#666" }}>
        {tier?.label}
      </span>
      <span className="text-[10px] font-black text-center leading-tight" style={{ fontFamily: "var(--font-noto-sans-tc)", color: "var(--ink)" }}>
        {curse.title.split("\uFF1A")[0]}
      </span>
      {sublabel && (
        <span className="text-[8px] font-black" style={{ fontFamily: "var(--font-chivo)", color: isSacrifice ? "var(--dark-red)" : "var(--teal)" }}>
          {sublabel}
        </span>
      )}
    </div>
  );
}
