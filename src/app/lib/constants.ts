import { CURSES as _CURSES, TIER_CONFIG as _TIER_CONFIG, CAST_LEVELS as _CAST_LEVELS, getSpellCode as _getSpellCode } from "../curses_data";
export const CURSES = _CURSES;
export const TIER_CONFIG = _TIER_CONFIG;
export const CAST_LEVELS = _CAST_LEVELS;
export const getSpellCode = _getSpellCode;

export const TABS = ["職場求生", "校園生存", "人際擋箭", "日常雜症", "創業/斜槓"];

export const HIDDEN_MARKER = "（由 AI 根據情境自動填充）";

export const getTabColor = (tab: string) => {
  const map: Record<string, string> = {
    '職場求生': '#1A5C5A',
    '校園生存': '#2D6A4F',
    '人際擋箭': '#8B2626',
    '日常雜症': '#B8860B',
    '創業/斜槓': '#4A3580',
  };
  return map[tab] || '#1A5C5A';
};

export const TRIAL_DATA = [
  {
    emoji: "😤", label: "被老闆凹加班",
    prompt: `請幫我撰寫一段婉拒加班的訊息。

情境：主管臨時在下班前要求你留下來加班，但你今晚有不可取消的私人安排。

語氣需要：
1. 第一句話先展現你有掌握專案進度（不是在逃避）
2. 說明今晚有已確認的個人安排，無法更動
3. 主動提出替代方案（例如明早優先處理、或遠端支援關鍵部分）
4. 全程語氣穩定，不道歉、不解釋過多、不討好

字數在 80 字以內，繁體中文，可直接複製貼到 LINE。`
  },
  {
    emoji: "😶", label: "被已讀不回",
    prompt: `我傳了一則訊息給在意的人，結果被已讀不回超過 24 小時。

請幫我生成 3 則後續訊息，分別是：
① 若無其事型：聊一個完全不同的話題，自然重啟對話
② 價值展示型：不追問，改分享一則讓對方「想回」的內容
③ 輕鬆試探型：用一句帶點幽默的話直接點破，不卑不亢

規則：
1. 每則不超過 20 字——已讀不回的場景下，訊息越長越像在卑微
2. 禁止出現：「你是不是很忙？」「我是不是打擾你了？」
3. 潛台詞必須是「我的生活很好，你的回覆是加分不是必需」
4. 每則附上最佳傳送時間建議

繁體中文。`
  },
  {
    emoji: "🥲", label: "被親戚問到崩潰",
    prompt: `過年回家，親戚一定會問我「怎麼還沒交男/女朋友？」

請幫我準備 3 種不同風格的擋招話術：
① 太極推手型：笑著把問題推回去，四兩撥千斤（15字內）
② 荒謬核彈型：回答荒謬到讓全桌笑出來、對方不好意思追問（15字內）
③ 溫柔封印型：用一句讓長輩感動的話直接封住話題（15字內）

規則：
1. 說完不能讓場面冷掉，要讓氣氛維持歡樂或溫馨
2. 禁止「反攻」其他親戚（不能說「那表哥呢？」會製造新敵人）
3. 額外給我一句「緊急撤退藉口」——當話題失控時可以自然離開座位

繁體中文，口語化，能直接背起來用。`
  },
  {
    emoji: "⭐️", label: "幫我寫負評",
    prompt: `我剛在一家餐廳有了極差的用餐體驗。

請幫我寫一則 Google Maps 一星評論。

風格：米其林美食評論家式毒舌——優雅到不行，但每個字都是刀。

規則：
1. 全文 150 字以內，禁止任何髒話或人身攻擊
2. 必須包含至少 2 個「畫面感比喻」（例：「這道菜讓我重新理解了塑膠的可能性」）
3. 如果有任何優點，先真心稱讚，再用反差讓殺傷力加倍
4. 結尾必須有一句「金句」——讓人看完想截圖分享的程度
5. 讓讀者覺得你很有才華，同時完全不想踏進這家店

繁體中文。`
  }
];

// Utility functions shared across components
export const getFieldVisibility = (totalFields: number, castLevelId: string) => {
  const cl = CAST_LEVELS.find(c => c.id === castLevelId);
  if (!cl) return 2;
  return Math.max(2, Math.ceil(totalFields * cl.fieldsRatio));
};

export const getMpCost = (curse: any, castLevelId: string) => {
  const cl = CAST_LEVELS.find(c => c.id === castLevelId);
  const tier = TIER_CONFIG[curse?.tier || 'apprentice'];
  if (!cl || !tier) return 1;
  return cl.mpBase * tier.mpMultiplier;
};

export const scrollToTab = (tabId: string) => {
  const element = document.getElementById(tabId);
  if (element) {
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};
