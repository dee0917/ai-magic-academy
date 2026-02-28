import { insight as heartMethod1 } from './heart-method-1';
import { insight as heartMethod2 } from './heart-method-2';
import { insight as heartMethod3 } from './heart-method-3';
import { insight as anthropicDirect } from './anthropic-direct';
import { insight as nanoBananaGuide } from './nano-banana-guide';
import { insight as parentHero } from './parent-hero';
import { insight as refusalMaster } from './refusal-master';
import { insight as seniorCoach } from './senior-coach';
import { insight as aiNewsReader } from './ai-news-reader';
import { insight as leadGenCover } from './lead-gen-cover';
import { insight as travelPlanner } from './travel-planner';
import { insight as meetingMinutes } from './meeting-minutes';
import { insight as stockTrends } from './stock-trends';
import { insight as stockAudit } from './stock-audit';
import { insight as englishCoach } from './english-coach';
import { insight as mealPlanner } from './meal-planner';
import { insight as antiProcrastination } from './anti-procrastination';
import { insight as petTranslator } from './pet-translator';
import { insight as ch0WhatIsAi } from './ch0-what-is-ai';
import { insight as ch0FirstMessage } from './ch0-first-message';

// ═══════════════════════════════════════════
// Chapter 定義 — 主線任務的學習順序
// ═══════════════════════════════════════════
export const CHAPTERS = [
    {
        id: 0, emoji: '🚀', title: '出發準備', subtitle: '認識三大聊天 AI，完成你的第一段對話',
        articleIds: [100, 101],
    },
    {
        id: 1, emoji: '🌱', title: '認識 AI', subtitle: '建立正確心態，讓 AI 成為你的夥伴',
        articleIds: [201, 202, 203],
    },
    {
        id: 2, emoji: '🔧', title: '指令進化', subtitle: '從「隨便說說」進化到「結構化指令」',
        articleIds: [204, 301, 302],
    },
    {
        id: 3, emoji: '🎯', title: '生活實戰', subtitle: '用 AI 解決每個人都會遇到的生活問題',
        articleIds: [308, 310, 305, 306],
    },
    {
        id: 4, emoji: '🏆', title: '進階挑戰', subtitle: '把 AI 用在需要更深度思考的場景',
        articleIds: [403, 401],
    },
];

// 主線順序表（嚴格順序）
export const MAIN_QUEST_ORDER: number[] = CHAPTERS.flatMap(c => c.articleIds);
// [201, 202, 203, 204, 301, 302, 308, 310, 305, 306, 403, 401]

// 支線任務 IDs
export const SIDE_QUEST_IDS: number[] = [304, 303, 309, 307, 402, 404];

// ═══════════════════════════════════════════
// 文章列表 — 主線 + 支線
// ═══════════════════════════════════════════

// 主線文章（按 Chapter 分配 level）
const mainQuest = [
    // Chapter 0: 出發準備 (level: 0)
    { ...ch0WhatIsAi, level: 0 },
    { ...ch0FirstMessage, level: 0 },
    // Chapter 1: 認識 AI (level: 1)
    { ...heartMethod1, level: 1 },
    { ...heartMethod2, level: 1 },
    { ...heartMethod3, level: 1 },
    // Chapter 2: 指令進化 (level: 2)
    { ...anthropicDirect, level: 2 },
    { ...nanoBananaGuide, level: 2 },
    { ...refusalMaster, level: 2 },
    // Chapter 3: 生活實戰 (level: 3)
    { ...mealPlanner, level: 3 },
    { ...antiProcrastination, level: 3 },
    { ...travelPlanner, level: 3 },
    { ...meetingMinutes, level: 3 },
    // Chapter 4: 進階挑戰 (level: 4)
    { ...englishCoach, level: 4 },
    { ...aiNewsReader, level: 4 },
];

// 支線文章 (level: -1 = 支線)
const sideQuests = [
    { ...parentHero, level: -1 },
    { ...seniorCoach, level: -1 },
    { ...petTranslator, level: -1 },
    { ...leadGenCover, level: -1 },
    { ...stockAudit, level: -1 },
    { ...stockTrends, level: -1 },
];

// 全部文章（主線在前，支線在後）
export const INSIGHTS_LIST = [...mainQuest, ...sideQuests];
