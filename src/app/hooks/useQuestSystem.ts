"use client";
import { useState, useEffect, useCallback } from "react";
import { SchoolType } from "../curses_data";
import { QUESTS, Quest } from "../lib/quests";
import { CURSES } from "../lib/constants";

const QUEST_KEY = 'magic-quests';
const TITLES_KEY = 'magic-titles';

export interface QuestCompletionEvent {
  quest: Quest;
  isNew: boolean;
}

export function useQuestSystem() {
  const [completedQuests, setCompletedQuests] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(QUEST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [earnedTitles, setEarnedTitles] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(TITLES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Persist completed quests
  const saveCompletedQuests = useCallback((ids: string[]) => {
    setCompletedQuests(ids);
    if (typeof window !== 'undefined') {
      localStorage.setItem(QUEST_KEY, JSON.stringify(ids));
    }
  }, []);

  const saveEarnedTitles = useCallback((titles: string[]) => {
    setEarnedTitles(titles);
    if (typeof window !== 'undefined') {
      localStorage.setItem(TITLES_KEY, JSON.stringify(titles));
    }
  }, []);

  // Check if a quest's prerequisite is met
  const isPrerequisiteMet = useCallback((quest: Quest, completed: string[]): boolean => {
    if (!quest.prerequisite) return true;
    return completed.includes(quest.prerequisite);
  }, []);

  // Check quest progress after an action
  // Returns array of newly completed quests
  const checkQuestProgress = useCallback((
    action: 'cast' | 'collect' | 'fuse',
    payload: {
      spellId?: string;
      school?: SchoolType;
      castLevel?: string;
      collectedCards?: string[];
      fuseSchool?: SchoolType;
    }
  ): QuestCompletionEvent[] => {
    const newlyCompleted: QuestCompletionEvent[] = [];
    let updated = [...completedQuests];

    for (const quest of QUESTS) {
      // Skip already completed
      if (updated.includes(quest.id)) continue;
      // Skip if prerequisite not met
      if (!isPrerequisiteMet(quest, updated)) continue;

      let satisfied = false;
      const req = quest.requirement;

      switch (req.type) {
        case 'cast_any': {
          if (action === 'cast' && payload.school) {
            // Check if the cast spell belongs to the required school
            const spell = CURSES.find((c: any) => c.id === payload.spellId);
            if (spell && (spell.school === req.school || (spell as any).subSchool === req.school)) {
              satisfied = true;
            }
          }
          break;
        }
        case 'cast_full': {
          if (action === 'cast' && payload.castLevel === 'full' && payload.spellId) {
            if (req.spellIds?.includes(payload.spellId)) {
              satisfied = true;
            }
          }
          break;
        }
        case 'collect_school': {
          if (action === 'collect' && payload.collectedCards && req.school && req.count) {
            const schoolSpellIds = CURSES
              .filter((c: any) => c.school === req.school || (c as any).subSchool === req.school)
              .map((c: any) => c.id);
            const uniqueCollected = [...new Set(payload.collectedCards)];
            const schoolCollected = uniqueCollected.filter(id => schoolSpellIds.includes(id));
            if (schoolCollected.length >= req.count) {
              satisfied = true;
            }
          }
          break;
        }
        case 'collect_total': {
          if (action === 'collect' && payload.collectedCards && req.count) {
            const uniqueCollected = [...new Set(payload.collectedCards)];
            if (uniqueCollected.length >= req.count) {
              satisfied = true;
            }
          }
          break;
        }
        case 'fuse_once': {
          if (action === 'fuse') {
            // If quest requires a specific school, check payload
            if (req.school) {
              if (payload.fuseSchool === req.school) {
                satisfied = true;
              }
            } else {
              satisfied = true;
            }
          }
          break;
        }
      }

      if (satisfied) {
        updated.push(quest.id);
        newlyCompleted.push({ quest, isNew: true });

        // Grant title reward
        if (quest.reward.type === 'title') {
          const title = quest.reward.value as string;
          if (!earnedTitles.includes(title)) {
            const newTitles = [...earnedTitles, title];
            saveEarnedTitles(newTitles);
          }
        }
      }
    }

    if (newlyCompleted.length > 0) {
      saveCompletedQuests(updated);
    }

    return newlyCompleted;
  }, [completedQuests, earnedTitles, isPrerequisiteMet, saveCompletedQuests, saveEarnedTitles]);

  // Get progress for a specific school
  const getSchoolProgress = useCallback((school: SchoolType): { completed: number; total: number } => {
    const schoolQuests = QUESTS.filter(q => q.school === school);
    const completed = schoolQuests.filter(q => completedQuests.includes(q.id)).length;
    return { completed, total: schoolQuests.length };
  }, [completedQuests]);

  // Get the next uncompleted quest per school
  const getActiveQuests = useCallback((): Quest[] => {
    const active: Quest[] = [];
    const schools: SchoolType[] = ['defense', 'attack', 'healing', 'illusion', 'contract', 'insight'];

    for (const school of schools) {
      const schoolQuests = QUESTS
        .filter(q => q.school === school)
        .sort((a, b) => a.order - b.order);

      const nextQuest = schoolQuests.find(q =>
        !completedQuests.includes(q.id) && isPrerequisiteMet(q, completedQuests)
      );
      if (nextQuest) {
        active.push(nextQuest);
      }
    }

    return active;
  }, [completedQuests, isPrerequisiteMet]);

  // Get requirement status text for UI
  const getRequirementStatus = useCallback((quest: Quest, collectedCards: string[]): string => {
    if (completedQuests.includes(quest.id)) return '已完成';

    const req = quest.requirement;
    switch (req.type) {
      case 'cast_any':
        return '施放任意咒語';
      case 'cast_full':
        return '全力詠唱指定咒語';
      case 'collect_school': {
        if (req.school && req.count) {
          const schoolSpellIds = CURSES
            .filter((c: any) => c.school === req.school || (c as any).subSchool === req.school)
            .map((c: any) => c.id);
          const uniqueCollected = [...new Set(collectedCards)];
          const current = uniqueCollected.filter(id => schoolSpellIds.includes(id)).length;
          return `${current}/${req.count} 張`;
        }
        return '收集卡牌';
      }
      case 'fuse_once':
        return '完成融合';
      default:
        return '進行中';
    }
  }, [completedQuests]);

  return {
    completedQuests,
    earnedTitles,
    checkQuestProgress,
    getSchoolProgress,
    getActiveQuests,
    getRequirementStatus,
  };
}
