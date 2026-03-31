"use client";
import { useState } from "react";

export function useMPSystem() {
  const [mp, setMp] = useState(() => {
    // TODO: 測試模式 — 魔力值滿，正式上線時還原
    return 30;
  });

  const saveMp = (newMp: number) => {
    setMp(newMp);
    if (typeof window !== 'undefined') localStorage.setItem('magic-mp', String(newMp));
  };

  return { mp, saveMp };
}
