"use client";
import { useState, useEffect } from "react";

export function useSpellCollection() {
  const [collectedCards, setCollectedCards] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('magic-collection');
      if (saved) setCollectedCards(JSON.parse(saved));
    } catch { /* corrupted data, keep default */ }
  }, []);

  const saveCollection = (cards: string[]) => {
    setCollectedCards(cards);
    if (typeof window !== 'undefined') localStorage.setItem('magic-collection', JSON.stringify(cards));
  };

  return { collectedCards, saveCollection };
}
