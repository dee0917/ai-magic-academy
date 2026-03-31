"use client";
import { useState, useEffect, useCallback } from "react";

const MP_KEY = 'magic-mp';
const LOGIN_DATE_KEY = 'magic-last-login';
const MILESTONES_KEY = 'magic-milestones-claimed';
const MAX_MP = 30;
const DAILY_MP = 5;

// Collection milestone rewards: { threshold: bonus MP }
export const COLLECTION_MILESTONES: Record<number, number> = {
  3: 3,
  5: 5,
  8: 8,
  15: 15,
};

export function useMPSystem() {
  const [mp, setMp] = useState(() => {
    if (typeof window === 'undefined') return MAX_MP;
    const saved = localStorage.getItem(MP_KEY);
    return saved !== null ? Math.min(Number(saved), MAX_MP) : MAX_MP;
  });

  const [claimedMilestones, setClaimedMilestones] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(MILESTONES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Daily login MP recovery
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const lastLogin = localStorage.getItem(LOGIN_DATE_KEY);
    if (lastLogin !== today) {
      localStorage.setItem(LOGIN_DATE_KEY, today);
      setMp(prev => {
        const newMp = Math.min(prev + DAILY_MP, MAX_MP);
        localStorage.setItem(MP_KEY, String(newMp));
        return newMp;
      });
    }
  }, []);

  const saveMp = useCallback((newMp: number) => {
    const clamped = Math.max(0, Math.min(newMp, MAX_MP));
    setMp(clamped);
    if (typeof window !== 'undefined') localStorage.setItem(MP_KEY, String(clamped));
  }, []);

  // Check and grant milestone rewards based on collection count
  const checkMilestoneRewards = useCallback((collectionCount: number) => {
    let bonus = 0;
    const newClaimed = [...claimedMilestones];
    for (const [threshold, reward] of Object.entries(COLLECTION_MILESTONES)) {
      const t = Number(threshold);
      if (collectionCount >= t && !claimedMilestones.includes(t)) {
        bonus += reward;
        newClaimed.push(t);
      }
    }
    if (bonus > 0) {
      setClaimedMilestones(newClaimed);
      if (typeof window !== 'undefined') {
        localStorage.setItem(MILESTONES_KEY, JSON.stringify(newClaimed));
      }
      setMp(prev => {
        const newMp = Math.min(prev + bonus, MAX_MP);
        localStorage.setItem(MP_KEY, String(newMp));
        return newMp;
      });
      return bonus;
    }
    return 0;
  }, [claimedMilestones]);

  return { mp, saveMp, checkMilestoneRewards, MAX_MP };
}
