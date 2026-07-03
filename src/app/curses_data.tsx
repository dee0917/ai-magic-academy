import {
  Clock, Swords, Skull, Coins, Shield, Heart, Eye, Target, Sparkles, Lock, BookOpen, Users, Film, Compass, LogOut, Magnet, Video, PenTool, RefreshCcw, Map, Utensils, Tag, Gift, Shirt, PawPrint, Presentation, Dumbbell, GraduationCap, ScrollText, PartyPopper, ShoppingBag, Highlighter, Stethoscope, Mail, CalendarDays, Popcorn, Baby, Handshake, KeyRound, Award, HeartHandshake, TrendingUp, NotebookPen, Palette, Mic, PhoneCall, Youtube, Activity, Luggage, Languages, Lightbulb, MessageCircle, ClipboardList, Headset, PiggyBank, Send, Megaphone, CalendarCheck, MessagesSquare, ClipboardCheck, ShieldAlert, HeartCrack, FileText, Salad, Calculator, Wand2, Star, Briefcase, Volume2, Brain, Bird, BadgeCheck, BedDouble, Home, DoorOpen, ListChecks, Clapperboard, Camera, Scale, Stamp, Gamepad2, Sprout, Music, FileSearch, Receipt
} from "lucide-react";
import React from "react";

// 學派類型
export type SchoolType = 'defense' | 'attack' | 'healing' | 'illusion' | 'contract' | 'insight';

// 咒語模組類型 — Prompt 結構教學用
export type ModuleType = 'role' | 'behavior' | 'output' | 'safety' | 'decision' | 'example';

export interface SpellModule {
  type: ModuleType;
  label: string;    // Chinese label
  preview: string;  // Short preview text (under 25 chars)
}

export const MODULE_CONFIG: Record<ModuleType, { icon: string; label: string; color: string }> = {
  role:     { icon: '\u{1F3AD}', label: '角色設定', color: '#8B5CF6' },
  behavior: { icon: '\u{1F4CF}', label: '行為規則', color: '#F59E0B' },
  output:   { icon: '\u{1F4CB}', label: '輸出格式', color: '#10B981' },
  safety:   { icon: '\u{1F6E1}\u{FE0F}', label: '安全邊界', color: '#EF4444' },
  decision: { icon: '\u{1F500}', label: '判斷邏輯', color: '#3B82F6' },
  example:  { icon: '\u{1F4A1}', label: '範例對比', color: '#EC4899' },
};

export const MODULE_EXPLANATIONS: Record<ModuleType, string> = {
  role:     '告訴 AI 扮演什麼角色，直接影響回答的專業度和語氣',
  behavior: '明確規定 AI 該做什麼、不該做什麼，避免偏離主題',
  output:   '指定回覆的結構和格式，讓結果更有條理',
  safety:   '設定禁止事項和邊界，防止不當內容',
  decision: '讓 AI 根據不同情況自動調整策略',
  example:  '用好壞對比教 AI 什麼是正確的輸出',
};

export const SCHOOL_CONFIG: Record<SchoolType, { label: string; emoji: string; color: string }> = {
  defense:  { label: '防禦', emoji: '\u{1F6E1}', color: '#3B82F6' },
  attack:   { label: '攻擊', emoji: '\u{2694}', color: '#DC2626' },
  healing:  { label: '治癒', emoji: '\u{1FA79}', color: '#10B981' },
  illusion: { label: '幻術', emoji: '\u{1F3AD}', color: '#8B5CF6' },
  contract: { label: '契約', emoji: '\u{1F4DC}', color: '#D97706' },
  insight:  { label: '洞察', emoji: '\u{1F52E}', color: '#6366F1' },
};

// 階級定義
export const TIER_CONFIG: Record<string, { label: string; color: string; borderColor: string; bgGlow: string; mpMultiplier: number }> = {
  apprentice: { label: "見習", color: "#9CA3AF", borderColor: "#9CA3AF", bgGlow: "rgba(156,163,175,0.08)", mpMultiplier: 1 },
  adept:      { label: "中階", color: "#3B82F6", borderColor: "#3B82F6", bgGlow: "rgba(59,130,246,0.08)", mpMultiplier: 2 },
  master:     { label: "高階", color: "#8B5CF6", borderColor: "#8B5CF6", bgGlow: "rgba(139,92,246,0.08)", mpMultiplier: 3 },
  archmage:   { label: "大魔導", color: "#DC2626", borderColor: "#DC2626", bgGlow: "rgba(220,38,38,0.08)", mpMultiplier: 5 },
  forbidden:  { label: "禁忌", color: "#D4AF37", borderColor: "#1F2937", bgGlow: "rgba(212,175,55,0.06)", mpMultiplier: 8 },
};

// 魔力消耗等級
export const CAST_LEVELS = [
  { id: "quick", label: "速詠", mpBase: 1, fieldsRatio: 0.4 },
  { id: "standard", label: "標準詠唱", mpBase: 2, fieldsRatio: 0.7 },
  { id: "full", label: "全力詠唱", mpBase: 3, fieldsRatio: 1.0, unlocksCard: true },
] as const;

// 魔法編號系統
const TIER_CODE: Record<string, string> = { apprentice: 'Ⅰ', adept: 'Ⅱ', master: 'Ⅲ', archmage: 'Ⅳ', forbidden: 'Ⅴ' };
const TAB_CODE: Record<string, string> = { '人際擋箭': 'AR', '職場求生': 'SV', '日常雜症': 'DX', '創業/自媒體': 'BZ', '校園生存': 'CS', '生活娛樂': 'EN' };

export function getSpellCode(curse: { tier: string; tab: string; id: string }): string {
  const tierSymbol = TIER_CODE[curse.tier] || 'Ⅰ';
  const tabCode = TAB_CODE[curse.tab] || 'XX';
  // 用 CURSES 中同 tier+tab 的索引作序號
  const sameGroup = CURSES.filter(c => c.tier === curse.tier && c.tab === curse.tab);
  const idx = sameGroup.findIndex(c => c.id === curse.id);
  const seq = String(idx + 1).padStart(3, '0');
  return `${tierSymbol}-${tabCode}-${seq}`;
}

export const CURSES = [
  // ━━━ 📜 見習咒文 | 日常雜症 | Free ━━━
  {
    id: "late_smoke_screen",
    tab: "日常雜症",
    isPro: false,
    tier: "apprentice",
    school: "illusion" as SchoolType,
    outputFormat: "LINE 遲到通知",
    icon: <Clock className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "遲到煙幕：踩線求生術",
    desc: "每次遲到都只會傳『快到了sorry』？把遲到通知從卑微道歉變成從容安排，讓等你的人覺得你是在忙正事、不是在賴床。",
    tags: ["遲到", "社交急救", "LINE訊息"],
    fields: [
      { id: "target", label: "對象", placeholder: "例：朋友小美 / 主管阿國" },
      { id: "delay", label: "預計遲到時間", placeholder: "例：15 分鐘" },
      { id: "reason", label: "真實原因", placeholder: "例：鬧鐘沒響 / 捷運等超久" },
    ],
    tweak: {
      id: "strat",
      label: "煙幕策略",
      options: [
        "從容掌控型：語氣像行程微調，遲到只是小插曲不是大過錯",
        "幽默自嘲型：用搞笑破冰，讓對方笑著等不生氣",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '社交場景溝通教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用卑微道歉語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '通知+開場白+備用版本' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依對象調整正式度' },
    ],
    theory: "基於 Goffman 印象管理理論：遲到時人最怕的不是對方生氣，而是被貼上『不尊重別人時間』的標籤。本咒語將通知從『求原諒』重新框架為『主動掌控節奏』。",
    generate: (inputs: any) => `你是一位專門處理社交場景的溝通教練，輔導過上百位「慣性遲到者」改善人際關係。\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我即將遲到，需要一則得體的通知訊息。\n- 對象：[[${inputs.target}]]\n- 預計遲到：[[${inputs.delay}]]\n- 真實原因：[[${inputs.reason}]]\n\n請輸出：\n① 【遲到通知訊息】— 一則 LINE 訊息，40 字以內，語氣穩定不卑微\n② 【到場後開場白】— 一句見面時說的話，15 字以內，化解尷尬\n③ 【備用版本】— 如果對象是長輩或主管，語氣更正式的版本，50 字以內\n\n【規則】\n1. 訊息必須 40 字以內，能直接複製貼到 LINE 送出，口語化、不能有書面腔。\n2. 嚴禁使用：「不好意思」「真的很抱歉」「sorry」「拍謝」——這些只會讓你看起來更心虛。\n3. 運用印象管理原則：訊息要讓對方覺得你「正在處理事情」而非「剛睡醒在趕路」，重點是掌控感而非歉意。\n4. 語氣必須像在「通知」不是在「求原諒」——用陳述句，不用問句或驚嘆號連發。\n5. LINE 測試：這則訊息傳出去後，對方的反應應該是「好～」而不是「你每次都這樣」。`
  },

  // ━━━ 🔵 中階秘術 | 人際擋箭 | Free ━━━
  {
    id: "allowance_alchemy",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "要錢話術組合",
    icon: <Coins className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "煉金話術：零用錢翻倍術",
    desc: "月底吃土了想跟爸媽預支生活費？把『要錢』包裝成『自我投資』，讓長輩心甘情願掏錢還覺得你很上進。",
    tags: ["跟長輩要錢", "家庭溝通", "包裝話術"],
    fields: [
      { id: "target", label: "要跟誰開口", placeholder: "例：爸爸 / 媽媽 / 阿姨" },
      { id: "amount", label: "需要多少錢", placeholder: "例：5000 / 一萬" },
      { id: "real_reason", label: "真正要幹嘛", placeholder: "例：繳房租 / 朋友生日要包紅包 / 買課程" },
      { id: "parent_style", label: "長輩個性", placeholder: "例：精打細算型 / 疼小孩但愛念型 / 嚴格型" },
    ],
    tweak: {
      id: "strat",
      label: "煉金策略",
      options: [
        "投資包裝型：把花費說成自我成長投資，讓長輩覺得這筆錢花得值",
        "先報喜型：先講一個最近的好成績再自然帶到需要支援，降低防備心",
        "分期暗示型：主動提出還款計畫或回饋方案，展現負責任態度",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '親子關係溝通顧問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用窮人語言' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '鋪墊+話術+回答+暗示' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依長輩個性切換策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '阿嬤測試把關語氣' },
    ],
    theory: "基於 Cialdini 互惠原則與框架效應：長輩拒絕給錢的核心不是捨不得，而是怕「養出伸手牌」。本咒語將請求從「消費支出」重新框架為「成長投資」，觸發長輩的「栽培本能」而非「警戒本能」。",
    generate: (inputs: any) => `你是一位深諳華人家庭溝通動態的親子關係顧問，輔導過 200+ 個家庭處理金錢話題，自己也是從窮學生過來的。你的信條：「會開口不是沒骨氣，是懂得經營關係。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要跟長輩開口要一筆錢，但不想被念或被看扁。\n- 對象：[[${inputs.target}]]\n- 金額：[[${inputs.amount}]]\n- 真正用途：[[${inputs.real_reason}]]\n- 長輩個性：[[${inputs.parent_style}]]\n\n請輸出：\n① 【開場鋪墊】— 在正式開口前要先說什麼話暖場，2-3 句，每句 20 字以內\n② 【核心請求話術】— 正式開口的那段話，50 字以內，必須包含「投資/成長」框架\n③ 【被追問時的回答】— 長輩問「為什麼需要這筆錢」時的 2 個版本回答\n④ 【心理暗示語】— 按下送出前默念的一句話，15 字以內\n\n【規則】\n1. 所有話術加起來不超過 200 字，口語化到可以直接在晚餐桌上說。\n2. 嚴禁使用：「我沒錢了」「可以借我嗎」「拜託」「我保證還」——這些是窮人語言，會觸發長輩的「又來了」反射。\n3. 運用框架效應：同一筆錢，「繳房租」聽起來是負擔，「確保住處穩定好專心衝事業」聽起來是投資。你必須完成這個轉換。\n4. 語氣像在「分享近況順便提到一個需求」而非「求救」——穩定、自然、不卑不亢。\n5. 阿嬤測試：這段話如果讓阿嬤聽到，她會覺得「這孫子真懂事」而不是「又來要錢」。`
  },

  // ━━━ 🟣 高階禁咒 | 職場求生 | Free ━━━
  {
    id: "credit_thief_slayer",
    tab: "職場求生",
    isPro: false,
    tier: "master",
    school: "attack" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "反搶功作戰計畫",
    icon: <Swords className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "奪回戰功：搶功反殺術",
    desc: "明明是你做的企劃，報告時功勞卻被同事攬走？用結構化證據鏈把功勞拿回來，不撕破臉但讓全場都知道真相。",
    tags: ["職場政治", "搶功勞", "自我保護"],
    fields: [
      { id: "project", label: "被搶的成果", placeholder: "例：Q3 行銷企劃案 / 新客戶簽約" },
      { id: "thief", label: "搶功的人", placeholder: "例：同部門的 Kevin" },
      { id: "evidence", label: "你有什麼證據", placeholder: "例：email 紀錄 / 會議錄音 / 文件版本" },
      { id: "audience", label: "誰需要知道真相", placeholder: "例：直屬主管 / 部門總監" },
      { id: "relationship", label: "跟搶功者的關係", placeholder: "例：平級同事 / 他是前輩" },
    ],
    tweak: {
      id: "strat",
      label: "反殺策略",
      options: [
        "證據碾壓型：用時間軸和文件版本讓事實自己說話，不需要指控任何人",
        "借刀殺人型：透過第三方（主管/會議）自然暴露真相，你完全不用出手",
        "溫柔收割型：公開場合『感謝對方的協助』然後順勢展示自己才是主導者",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '組織行為顧問18年經驗' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '用事實不用指控' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '行動計畫+腳本+檢查表' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '老闆測試防辦公室政治' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係調整反殺策略' },
    ],
    theory: "基於歸因理論與組織政治學：搶功者利用的是「資訊不對稱」——決策者不知道誰才是真正的貢獻者。本咒語透過建立「證據能見度」來消除資訊差，同時運用面子協商理論避免正面衝突。",
    generate: (inputs: any) => `你是一位擁有 18 年經驗的組織行為顧問，專門處理職場歸因衝突與功勞爭議，曾輔導超過 300 位中階主管處理類似情境。你的信條是：「最高明的反擊，是讓真相自己走到聚光燈下。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我的工作成果被搶功，需要一套不撕破臉但能奪回功勞的作戰計畫。\n- 被搶的成果：[[${inputs.project}]]\n- 搶功的人：[[${inputs.thief}]]\n- 我持有的證據：[[${inputs.evidence}]]\n- 需要知道真相的人：[[${inputs.audience}]]\n- 與搶功者的關係：[[${inputs.relationship}]]\n\n請輸出：\n① 【48 小時行動計畫】— 分「今天」「明天」「後天」三階段，每階段 2-3 個具體動作\n② 【關鍵對話腳本】— 跟主管/決策者說明時的 3 句話，每句不超過 30 字\n③ 【證據展示策略】— 如何在不直接指控的情況下讓證據「被看見」\n④ 【防禦佈局】— 未來如何防止再次被搶功的 3 個習慣\n⑤ 【檢查清單】— 執行前確認的 5 個檢查點\n\n【規則】\n1. 每個行動步驟必須具體到「幾點做什麼」，不能只寫「找機會跟主管聊」這種模糊指令。\n2. 嚴禁使用：「我覺得他搶了我的功勞」「那個是我做的耶」「不公平」——這些只會讓你看起來像在抱怨而非在陳述事實。\n3. 運用歸因理論：所有話術必須以「事實 + 時間線 + 文件」為核心，讓對方自己得出結論，而非你直接指控。\n4. 語氣必須專業冷靜——你是在「釐清貢獻歸屬」而非「告狀」或「訴苦」。\n5. 老闆測試：你輸出的每一句話，拿給老闆看都不會覺得你在搞辦公室政治，而是在做負責任的專案回顧。`
  },

  // ━━━ 🔴 大魔導術 | 創業/自媒體 | Pro ━━━
  {
    id: "partnership_nuclear_pact",
    tab: "創業/自媒體",
    isPro: true,
    tier: "archmage",
    school: "contract" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "合夥協議 + 退場機制",
    icon: <Shield className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "鐵血盟約：合夥防爆術",
    desc: "朋友找你一起創業好興奮？先別急——90% 的合夥翻臉不是因為失敗，而是因為沒講清楚『誰出多少、誰做什麼、散夥怎麼分』。這個咒語幫你把醜話說在前頭。",
    tags: ["合夥創業", "合約保護", "風險預防"],
    fields: [
      { id: "partner", label: "合夥人是誰", placeholder: "例：大學同學阿明 / 前同事 Jenny" },
      { id: "business", label: "要做什麼生意", placeholder: "例：手搖飲加盟 / 接案工作室 / 電商品牌" },
      { id: "my_contribution", label: "你出什麼", placeholder: "例：出技術 + 50萬 / 出人脈 + 全職投入" },
      { id: "their_contribution", label: "對方出什麼", placeholder: "例：出資金 100萬 / 出店面 + 兼職" },
      { id: "concern", label: "你最擔心什麼", placeholder: "例：他做一半跑掉 / 虧錢誰扛 / 賺錢怎麼分" },
      { id: "relationship", label: "你們的關係", placeholder: "例：死黨 / 普通朋友 / 前同事" },
    ],
    tweak: {
      id: "strat",
      label: "盟約策略",
      options: [
        "先禮後兵型：從「我們一起保護這個夢想」的角度帶入合約討論，降低對方戒心",
        "案例恐嚇型：先分享合夥翻臉的真實案例，讓對方自己說「那我們也來簽一份吧」",
        "專業代言型：提議『找律師/會計師幫我們規劃』，用第三方權威降低個人壓力",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '商務律師+創業教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '白話文寫合約條款' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '話術+條款+分潤+退場' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '阿嬤測試確保易懂' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依投入比例調整方案' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '翻臉場景預防條款' },
    ],
    theory: "基於賽局理論的承諾機制與 Williamson 交易成本經濟學：合夥最大的風險不是「對方是壞人」，而是「好人在壓力下也會做出自利選擇」。本咒語在蜜月期建立退場機制和明確分工，因為事前寫在紙上的規則，永遠比事後的爭吵更便宜。",
    generate: (inputs: any) => `你同時具備兩個專家視角：\n① 商務律師（專精中小企業合夥糾紛，自己也當過 Freelancer 再合夥創業，處理過 200+ 合夥拆夥案件）\n② 創業教練（輔導過 150 組合夥團隊，見證 90% 翻臉都是因為「沒寫清楚」而非「人品問題」）\n\n你的共同信條：「敢把醜話說在前頭的合夥人，才是真正想把事情做好的人。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我正要跟人合夥，需要一套完整的保護方案和開口話術。\n- 合夥人：[[${inputs.partner}]]\n- 生意內容：[[${inputs.business}]]\n- 我的投入：[[${inputs.my_contribution}]]\n- 對方的投入：[[${inputs.their_contribution}]]\n- 最大擔憂：[[${inputs.concern}]]\n- 彼此關係：[[${inputs.relationship}]]\n\n請輸出：\n① 【開口話術】— 如何跟合夥人提議「我們來簽合約」而不傷感情，3 句話，每句 30 字以內\n② 【合約必備條款清單】— 列出 8 個絕對不能少的條款，每條用一句話解釋為什麼重要\n③ 【分潤方案建議】— 根據雙方投入，建議 2 種分潤比例方案 + 各自的優缺點\n④ 【退場機制】— 如果有人要退出，明確寫出 3 步退場流程\n⑤ 【最壞情況劇本】— 列出 3 個最可能翻臉的場景 + 每個場景的預防條款\n⑥ 【30 天行動計畫】— 從今天到正式簽約的每週里程碑\n\n【規則】\n1. 合約條款必須用白話文寫，不能出現法律術語——因為他們可能不會真的找律師，這份清單就是他們唯一的保護。\n2. 嚴禁使用：「應該沒問題吧」「到時候再說」「我們這麼好的關係不用擔心」——這些是定時炸彈。\n3. 運用承諾機制理論：每一個條款都必須回答「如果 X 發生，誰做什麼、誰出多少、期限多久」，不能有模糊空間。\n4. 語氣必須像「兩個大人在規劃一個重要的事業」而非「一方在防另一方」——合約是保護雙方，不是監視。\n5. 阿嬤測試：每一個條款念給阿嬤聽，她都能理解「喔～所以如果他不做了，錢要這樣分對不對」。`
  },

  // ━━━ ⚫ 禁忌奧義 | 人際擋箭 | Pro ━━━
  {
    id: "emotional_blackmail_breaker",
    tab: "人際擋箭",
    isPro: true,
    tier: "forbidden",
    school: "defense" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "情勒脫困全系統",
    icon: <Skull className="w-8 h-8 text-yellow-600" />,
    color: "yellow",
    title: "破繭斬鎖：情勒終結術",
    desc: "被爸媽說『我這麼辛苦都是為了你』、被另一半說『你不答應就是不愛我』？拆解情緒勒索的套路，建立鋼鐵邊界但不毀掉關係。",
    tags: ["情緒勒索", "心理防禦", "邊界建立"],
    fields: [
      { id: "blackmailer", label: "情勒你的人", placeholder: "例：媽媽 / 男友 / 閨蜜" },
      { id: "script", label: "對方的慣用台詞", placeholder: "例：『我這麼辛苦都是為了你，你怎麼可以...』" },
      { id: "demand", label: "對方要你做什麼", placeholder: "例：不准搬出去住 / 每天打電話報備" },
      { id: "feeling", label: "你聽到後的感受", placeholder: "例：愧疚到想妥協 / 窒息但不敢說" },
      { id: "history", label: "這招他用多久了", placeholder: "例：從小到大 / 交往後開始" },
      { id: "bottom_line", label: "你的底線是什麼", placeholder: "例：我可以常回家但不接受每天查勤" },
    ],
    tweak: {
      id: "strat",
      label: "破繭策略",
      options: [
        "溫柔堅壁型：承認對方的情感但不接受綑綁，用『我知道你擔心，但我需要...』結構",
        "鏡像反射型：讓對方聽見自己的話有多荒謬，用『所以你的意思是...』複述法",
        "系統重設型：不處理單次事件，直接重新定義整段關係的溝通規則",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '心理師+家族治療師+策略師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用示弱反擊語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '拆解+宣言+劇本+計畫' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '鏡子測試保護自尊' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依FOG類型選破繭法' },
    ],
    theory: "基於 Susan Forward 情緒勒索理論（FOG：Fear, Obligation, Guilt）與 Murray Bowen 家族系統理論：情勒者利用的是你內建的「愧疚迴路」——從小被訓練成「讓對方失望 = 我是壞人」。本咒語不是教你反擊，而是重新接線：把「我讓他難過了」改寫為「他正在用情緒控制我的選擇權」。結合 Bowlby 依附理論理解為什麼離不開，再用認知行為治療的認知重構技術打破自動化愧疚反應。",
    generate: (inputs: any) => `你同時具備三個專家視角：\n① 臨床心理師（專精情緒勒索與依附創傷，持有 Gottman 認證，15 年臨床經驗）\n② 家族治療師（處理過 500+ 個華人家庭的邊界議題，深諳「孝順」文化下的情勒變體）\n③ 溝通策略師（曾任企業談判顧問，擅長在不破壞關係的前提下重設權力結構）\n\n你的共同信條：「保護自己不是自私，是你對這段關係能做的最誠實的事。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我正在經歷情緒勒索，需要一套完整的脫困系統。\n- 情勒者：[[${inputs.blackmailer}]]\n- 對方慣用台詞：[[${inputs.script}]]\n- 對方的要求：[[${inputs.demand}]]\n- 我的感受：[[${inputs.feeling}]]\n- 持續時間：[[${inputs.history}]]\n- 我的底線：[[${inputs.bottom_line}]]\n\n請輸出：\n① 【情勒拆解報告】— 分析對方用了哪種 FOG 手法（恐懼/義務/愧疚），以及為什麼這招對你特別有效，200 字以內\n② 【鋼鐵邊界宣言】— 3 句可以直接對對方說的話，每句 30 字以內，語氣堅定但不冷血\n③ 【內心防護咒】— 當愧疚感湧上來時默念的 1 句話，20 字以內，用來中斷自動化妥協反應\n④ 【最壞情況劇本】— 如果對方聽完爆炸了（哭/冷戰/威脅），你的 3 步應對流程\n⑤ 【長期重設計畫】— 未來 30 天內重建關係邊界的 3 個里程碑行動\n⑥ 【風險地圖】— 這套策略可能的副作用和對應的緩衝方案\n\n【規則】\n1. 邊界宣言必須 30 字以內，能直接當面說出口，不能像在念心理學教科書。\n2. 嚴禁使用：「你不要這樣」「你讓我很受傷」「你能不能尊重我」——這些是在對方框架裡打仗，永遠贏不了。\n3. 必須同時運用 FOG 模型拆解 + 依附理論解釋 + 認知重構技術，三層防護缺一不可。\n4. 語氣指南：對外（對情勒者）像溫柔的牆——不攻擊但不退讓；對內（給自己）像教練——理性、堅定、不批判自己。\n5. 鏡子測試：你寫的每一句邊界宣言，使用者對著鏡子練習時不會覺得自己是壞人，而是覺得「我終於在保護自己了」。`
  },

  // ━━━ 📜 見習咒文 | 人際擋箭 | Free ━━━
  {
    id: "polite_refusal",
    tab: "人際擋箭",
    isPro: false,
    tier: "apprentice",
    school: "defense" as SchoolType,
    outputFormat: "溫柔拒絕訊息",
    icon: <Shield className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "禮貌結界：委婉拒絕術",
    desc: "朋友借錢、同事推工作、親戚介紹對象——每次都不好意思說不，結果委屈自己？這個咒語讓你溫柔地畫出界線，對方還覺得你很貼心。",
    tags: ["拒絕", "人際邊界", "社交保護"],
    fields: [
      { id: "target", label: "對象", placeholder: "例：同事小王 / 阿姨 / 大學同學" },
      { id: "request", label: "對方要求什麼", placeholder: "例：借五千塊 / 幫忙加班趕報告 / 介紹他表妹給我認識" },
      { id: "relationship", label: "關係親密度", placeholder: "例：很熟的死黨 / 普通同事 / 不太熟的親戚" },
      { id: "reason", label: "真正不想答應的原因", placeholder: "例：上次借了沒還 / 我自己也很忙 / 我根本沒興趣" },
    ],
    tweak: {
      id: "strat",
      label: "拒絕風格",
      options: [
        "溫柔轉移型：不直接說不，把焦點轉移到替代方案或其他資源，讓對方感覺被幫助而非被拒絕",
        "正當理由型：給出一個合理且無法反駁的理由，讓對方自己覺得「那確實沒辦法」",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '人際邊界溝通心理師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用卑微拖延語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '拒絕+備用+替代+護盾' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '好人測試不傷關係' },
    ],
    theory: "基於 Goffman 面子協商理論與 Brown & Levinson 禮貌策略：拒絕之所以難開口，是因為我們怕威脅對方的「正面面子」（被喜歡的需求）。本咒語運用「負面禮貌策略」——在拒絕的同時維護對方的自主權感受，讓對方覺得「你不是不想幫，而是真的不行」。",
    generate: (inputs: any) => `你是一位專精人際邊界管理的溝通心理師，輔導過 300+ 位「不會拒絕」的好人建立健康邊界，深諳華人社會的人情壓力結構。你的信條：「真正的善良，是在保護自己的前提下對人好。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要拒絕一個人的請求，但不能讓對方覺得被冒犯或關係變差。\n- 對象：[[${inputs.target}]]\n- 對方的要求：[[${inputs.request}]]\n- 關係親密度：[[${inputs.relationship}]]\n- 真正不想答應的原因：[[${inputs.reason}]]\n\n請輸出：\n① 【拒絕訊息】— 一段 50 字以內的回覆，可以直接傳 LINE 或當面說，語氣溫暖但立場堅定\n② 【備用版本】— 如果對方追問或施壓，第二句回覆，30 字以內\n③ 【替代方案】— 一個你可以順手給的替代建議，讓對方覺得你有在想辦法幫他\n④ 【心理護盾】— 拒絕後如果愧疚感湧上來，默念的一句話，15 字以內\n\n【規則】\n1. 拒絕訊息必須 50 字以內，口語化到能直接複製貼上或開口說。\n2. 嚴禁使用：「不好意思」「真的很抱歉」「下次一定」「我考慮看看」——前兩個讓你顯得卑微，後兩個是拖延炸彈會讓對方以為還有機會。\n3. 運用禮貌策略理論：拒絕的核心是「維護對方面子的同時守住自己底線」，所以要先肯定對方（「我知道你會來找我是信任我」）再轉到無法答應。\n4. 語氣像在「分享一個遺憾的事實」而非「拒絕一個人」——用陳述句，表達客觀限制而非主觀不願。\n5. 好人測試：說完這段話後，對方的反應應該是「好吧～那沒關係」而不是「你變了」。`
  },

  // ━━━ 📜 見習咒文 | 職場求生 | Free ━━━
  {
    id: "persuasion_dart",
    tab: "職場求生",
    isPro: false,
    tier: "apprentice",
    school: "attack" as SchoolType,
    outputFormat: "一句致命說服話術",
    icon: <Target className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "說服飛鏢：一句入魂術",
    desc: "開會提案被打槍、跟客戶談判卡關、想說服主管給你升遷機會？與其長篇大論，不如一句話正中對方的「在意點」，讓他自己說服自己。",
    tags: ["說服", "話術", "職場溝通"],
    fields: [
      { id: "target", label: "說服對象", placeholder: "例：部門主管 / 客戶林總 / 同事阿華" },
      { id: "goal", label: "想達成什麼", placeholder: "例：通過我的提案 / 接受降價 / 讓我轉調部門" },
      { id: "target_concern", label: "對方最在意什麼", placeholder: "例：風險控管 / 面子 / 業績數字 / 不想多花時間" },
      { id: "context", label: "場景", placeholder: "例：週會報告時 / 一對一午餐 / LINE 訊息" },
    ],
    tweak: {
      id: "strat",
      label: "說服策略",
      options: [
        "利益誘導型：直接點出對方答應後能得到什麼好處，讓他覺得說 Yes 是在幫自己",
        "恐懼驅動型：暗示不行動的風險或損失，觸發對方的損失厭惡本能",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '說服心理學教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用弱者乞求語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '一句+鋪墊+收尾+解說' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依在意點選觸發策略' },
    ],
    theory: "基於 Kahneman 展望理論的損失厭惡效應與 Cialdini 說服六原則：人對「失去」的痛感是「得到」快感的 2 倍。本咒語根據策略選擇，精準觸發對方的利益渴望或損失恐懼，用一句話完成認知錨定。",
    generate: (inputs: any) => `你是一位頂尖的說服心理學教練，曾為 Fortune 500 高階主管設計關鍵對話策略，專精「一句話改變決策」的微說服技術。你的信條：「最強的說服不是讓對方同意你，而是讓對方覺得這本來就是他自己的想法。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要在一句話內說服一個人，讓他答應我的請求或接受我的觀點。\n- 說服對象：[[${inputs.target}]]\n- 想達成的目標：[[${inputs.goal}]]\n- 對方最在意的事：[[${inputs.target_concern}]]\n- 場景：[[${inputs.context}]]\n\n請輸出：\n① 【致命一句】— 一句 30 字以內的說服話術，直擊對方在意點\n② 【鋪墊句】— 在說出致命一句之前的暖場話，20 字以內，讓對方進入接收模式\n③ 【收尾句】— 對方猶豫時的推一把話術，20 字以內，製造緊迫感或確定感\n④ 【原理解說】— 這句話為什麼有效，50 字以內，幫助使用者理解背後邏輯\n\n【規則】\n1. 致命一句必須 30 字以內，像飛鏢一樣精準，一句定勝負。\n2. 嚴禁使用：「拜託」「你就幫幫忙」「可不可以」「希望你能考慮」——這些是弱者語言，把決定權拱手讓人。\n3. 運用展望理論：如果是利益誘導型，話術必須讓對方「看見答應後的畫面」；如果是恐懼驅動型，話術必須讓對方「感受不行動的損失」。\n4. 語氣必須像在「陳述一個事實」或「分享一個洞察」，而非「請求」或「推銷」。\n5. 老闆測試：這句話如果是在會議上說的，全場會覺得你有 insight，而不是覺得你在拍馬屁或施壓。`
  },

  // ━━━ 📜 見習咒文 | 日常雜症 | Free ━━━
  {
    id: "awkward_heal",
    tab: "日常雜症",
    isPro: false,
    tier: "apprentice",
    school: "healing" as SchoolType,
    outputFormat: "尷尬修復台詞",
    icon: <Heart className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "急救繃帶：尷尬修復術",
    desc: "叫錯主管名字、群組發錯訊息、不小心說了超白目的話——當場想挖洞鑽進去？這個咒語幫你 3 秒內化解尷尬，把社死現場變成好感加分。",
    tags: ["社交急救", "出糗", "化解尷尬"],
    fields: [
      { id: "situation", label: "出糗場景", placeholder: "例：把主管叫成前主管的名字 / 群組裡發了私人訊息 / 跟客戶說錯價格" },
      { id: "severity", label: "嚴重程度", placeholder: "例：小尷尬大家笑笑就過 / 中等有點丟臉 / 超級嚴重想離職" },
      { id: "audience", label: "在場的人", placeholder: "例：只有我跟主管 / 整個部門 / 客戶跟老闆都在" },
    ],
    tweak: {
      id: "strat",
      label: "修復模式",
      options: [
        "幽默自嘲型：用笑點化解尷尬，讓全場一起笑，把出糗變成你的人格魅力",
        "優雅化解型：用從容的態度和得體的回應，讓尷尬瞬間消失，展現你的 EQ 和穩定度",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '社交危機專家+脫口秀編劇' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用放大尷尬的語句' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '急救+補救+事後+自慰' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依嚴重度切換風格' },
    ],
    theory: "基於 Cupach & Metts 面子修復理論與 Benoit 形象修復策略：社交出糗的核心傷害不是事件本身，而是「公眾形象受損」的感知。研究顯示幽默化的自我貶抑策略能將負面印象轉化為「真實、有親和力」的正面評價，而快速得體的修復則觸發觀眾的「能力歸因」。",
    generate: (inputs: any) => `你是一位社交危機處理專家，同時也是脫口秀編劇，專門研究「如何在 3 秒內把社死現場變成高光時刻」。你輔導過公眾人物、企業高管和普通人處理各種出糗場景，你的信條：「尷尬不會殺死你，但你的反應會決定別人怎麼記住這件事。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我剛剛社交出糗了，需要一句話立刻化解尷尬。\n- 出糗場景：[[${inputs.situation}]]\n- 嚴重程度：[[${inputs.severity}]]\n- 在場的人：[[${inputs.audience}]]\n\n請輸出：\n① 【3 秒急救台詞】— 出糗後立刻說的一句話，20 字以內，當場化解\n② 【補救動作】— 說完台詞後要做的一個肢體語言或小動作，10 字以內\n③ 【事後修復訊息】— 如果事後需要私訊道歉或補救的訊息，40 字以內\n④ 【自我安慰咒】— 回家路上默念的一句話，讓自己不要反覆回想到失眠，15 字以內\n\n【規則】\n1. 急救台詞必須 20 字以內，能在 3 秒內脫口而出，不能像在背稿。\n2. 嚴禁使用：「天啊我好丟臉」「挖個洞讓我鑽進去」「我是不是完蛋了」——這些是把尷尬放大十倍的自殺式發言。\n3. 運用面子修復理論：如果是幽默自嘲型，笑點必須指向自己而非任何在場的人，且笑完後所有人對你的印象是「這人好有趣」而非「這人好可憐」。\n4. 如果是優雅化解型，語氣必須像「我本來就預期會這樣」——從容、不慌、輕描淡寫。\n5. 社死測試：這句急救台詞說出來後，現場氣氛應該從「尷尬的沉默」變成「輕鬆的微笑」或「佩服的點頭」。`
  },

  // ━━━ 📜 見習咒文 | 日常雜症 | Free ━━━
  {
    id: "price_scout",
    tab: "日常雜症",
    isPro: false,
    tier: "apprentice",
    school: "insight" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "殺價話術 + 行情分析提示",
    icon: <Eye className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "比價透視：殺價偵查術",
    desc: "手機報價三萬五合理嗎？裝潢師傅開價是不是灌水？買東西怕當盤子又不會殺價？這個咒語幫你看穿合理價格，再給你一套讓賣家主動降價的話術。",
    tags: ["殺價", "比價", "消費防坑"],
    fields: [
      { id: "item", label: "想買的東西", placeholder: "例：iPhone 16 Pro / 全室裝潢 / 二手車" },
      { id: "seller_type", label: "賣家類型", placeholder: "例：專櫃 / 網拍賣家 / 裝潢師傅 / 二手車商" },
      { id: "budget", label: "預算", placeholder: "例：三萬以內 / 五十萬左右 / 越便宜越好" },
      { id: "current_quote", label: "對方開價", placeholder: "例：35,000 / 八十萬 / 還沒問" },
    ],
    tweak: {
      id: "strat",
      label: "殺價風格",
      options: [
        "資訊戰型：用數據、比價資料和市場行情壓價，讓賣家知道你做過功課不好騙",
        "人情型：建立關係、展現長期合作意願，讓賣家主動給你折扣換你的忠誠度",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '市場分析師+談判教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用最弱殺價方式' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '行情+開場+三連擊+底牌' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依賣家類型選戰術' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '老闆娘測試確保實用' },
    ],
    theory: "基於 Kahneman 錨定效應與 Fisher & Ury 原則式談判理論：殺價的關鍵不是「態度兇」，而是「誰先設定錨點」。賣家開價就是第一個錨點，你的反報價必須打破這個錨。同時運用 BATNA（最佳替代方案）概念，讓賣家知道「你不是非買不可」。",
    generate: (inputs: any) => `你同時具備兩個專家視角：\n① 消費市場分析師（追蹤各品類價格趨勢 10 年，熟悉廠商定價策略和利潤結構）\n② 談判教練（訓練過 500+ 位學員掌握日常殺價技巧，自己買東西從來不付原價）\n\n你的共同信條：「殺價不是佔便宜，是拿回你本來就不該多付的錢。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要買東西，需要殺價話術和行情判斷。\n- 想買的東西：[[${inputs.item}]]\n- 賣家類型：[[${inputs.seller_type}]]\n- 我的預算：[[${inputs.budget}]]\n- 對方開價：[[${inputs.current_quote}]]\n\n請輸出：\n① 【行情快報】— 這個東西的合理價格區間和判斷依據，80 字以內，讓我知道對方開價是偏高、合理還是佛心\n② 【開場話術】— 跟賣家開始談價時的第一句話，30 字以內，設定有利錨點\n③ 【殺價三連擊】— 三句漸進式殺價話術，每句 25 字以內，從試探到收網\n④ 【底牌句】— 如果對方不降，你的最後一句話，20 字以內，給對方台階下同時逼出底價\n⑤ 【離場話術】— 如果真的談不攏，優雅離場的一句話，15 字以內，留下回頭的空間\n\n【規則】\n1. 所有話術必須口語化，能直接在店面或 LINE 上使用，不能像在念商學院教案。\n2. 嚴禁使用：「便宜一點啦」「算我便宜一點」「可以打折嗎」——這些是最弱的殺價方式，讓賣家知道你不專業。\n3. 運用錨定效應：你的反報價必須先丟出一個合理但偏低的數字，讓對方從你的錨點往上談，而不是從他的開價往下砍。\n4. 資訊戰型必須提供具體的比價來源建議（例：去哪裡查價格、問什麼關鍵問題能暴露賣家利潤空間）。\n5. 人情型必須建立「我是長期客戶」的暗示，讓賣家覺得這次降價是在投資未來的生意關係。\n6. 老闆娘測試：這些話術拿去夜市或建材行實戰，賣家的反應應該是「你很懂喔」而不是「這個客人很盧」。`
  },

  // ━━━ 📜 見習咒文 | 人際擋箭 | Free ━━━
  {
    id: "promise_seal",
    tab: "人際擋箭",
    isPro: false,
    tier: "apprentice",
    school: "contract" as SchoolType,
    outputFormat: "承諾確認訊息/對話腳本",
    icon: <Lock className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "口頭封印：承諾鎖定術",
    desc: "別人口頭答應的事情怕他反悔？朋友說『下次請你吃飯』然後就沒有下次？用話術把口頭承諾『釘死』在對方的社會信用上，讓他自己覺得不做到很丟臉。",
    tags: ["承諾確認", "防反悔", "社交話術"],
    fields: [
      { id: "promiser", label: "誰做了承諾", placeholder: "例：同事小王 / 房東陳先生 / 前輩學姊" },
      { id: "promise_content", label: "承諾內容", placeholder: "例：說好下週幫我介紹客戶 / 答應加薪 / 說要還我三千" },
      { id: "context", label: "什麼場合說的", placeholder: "例：聚餐時酒後說的 / 一對一面談 / 群組裡公開說的" },
      { id: "witnesses", label: "有沒有其他人在場", placeholder: "例：有，當時老闆也在 / 沒有，只有我們兩個 / LINE 群組裡很多人看到" },
    ],
    tweak: {
      id: "strat",
      label: "封印模式",
      options: [
        "文字紀錄型：用訊息確認對方的承諾，建立白紙黑字的證據鏈",
        "社會壓力型：利用第三方見證或公開場合，讓對方自己不好意思反悔",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '口頭協議溝通策略師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用指控式提醒語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '封印+釘子+提醒+回擊' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依見證情況選封印法' },
    ],
    theory: "基於 Cialdini 承諾一致性原則（Commitment & Consistency）：人一旦公開做出承諾，會為了維護自我形象而傾向履行。結合 Deutsch & Gerard 的規範性社會影響理論——當承諾被他人知曉時，違約的社會成本大幅上升，履行機率顯著提高。",
    generate: (inputs: any) => `你是一位專精口頭協議管理的溝通策略師，處理過 300+ 件「對方答應了卻裝死」的案例。你深諳承諾心理學，知道如何用不傷感情的方式把口頭承諾變成社會契約。你的信條：「不是不信任對方，是幫對方更容易做到。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n有人對我做了口頭承諾，我需要用話術把這個承諾「釘死」，降低對方反悔的機率。\n- 誰做了承諾：[[${inputs.promiser}]]\n- 承諾內容：[[${inputs.promise_content}]]\n- 什麼場合說的：[[${inputs.context}]]\n- 在場見證：[[${inputs.witnesses}]]\n\n請輸出：\n① 【即時封印訊息】— 在承諾發生後 24 小時內發送的確認訊息，50 字以內，語氣自然像在「確認細節」而非「抓把柄」\n② 【社交釘子話術】— 在有第三方在場時可以說的一句話，讓承諾變成公開紀錄，25 字以內\n③ 【到期提醒訊息】— 如果承諾快到期對方還沒動作，用來溫和提醒的訊息，40 字以內\n④ 【對方想賴帳時的回應】— 如果對方說「我有說過嗎」或「再看看吧」，你的 2 句回擊，每句 30 字以內\n\n【規則】\n1. 所有訊息必須口語化，能直接貼到 LINE 或當面說出口，不能有書面腔或合約感。\n2. 嚴禁使用：「你答應過的喔」「你不是說好了嗎」「你不要反悔喔」——這些是在指控，只會讓對方惱羞或找藉口。\n3. 運用承諾一致性原則：讓對方自己「再次確認」承諾，而不是你去「提醒」他——主動確認和被動提醒的心理效果天差地別。\n4. 語氣像在「推進合作」而非「抓犯人」——你是在幫雙方把事情做成，不是在監視對方。\n5. 朋友測試：這些訊息傳出去後，對方不會覺得你在逼他，而是覺得「這個人做事很靠譜」。`
  },

  // ━━━ 📜 見習咒文 | 日常雜症 | Free ━━━
  {
    id: "social_radar",
    tab: "日常雜症",
    isPro: false,
    tier: "apprentice",
    school: "insight" as SchoolType,
    outputFormat: "社交場景讀心分析 + 避雷話術",
    icon: <Eye className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "讀空氣：察言觀色術",
    desc: "飯局上突然安靜了是因為你說錯話嗎？主管笑著說『沒關係』是真的沒關係嗎？這個咒語幫你解讀社交場景的「空氣」，告訴你什麼該說、什麼千萬別說。",
    tags: ["讀空氣", "察言觀色", "社交洞察"],
    fields: [
      { id: "scene", label: "場景描述", placeholder: "例：部門聚餐，主管剛被老闆罵完 / 朋友聚會，有人剛分手" },
      { id: "people", label: "在場的人", placeholder: "例：主管+3個同事 / 5個大學好友" },
      { id: "tension", label: "你感受到的氛圍", placeholder: "例：突然安靜 / 有人表情僵硬 / 氣氛莫名尷尬" },
      { id: "your_role", label: "你的角色", placeholder: "例：新人 / 主辦人 / 純粹赴約的朋友" },
    ],
    tweak: {
      id: "strat",
      label: "讀心模式",
      options: [
        "氣氛偵測型：分析場上每個人的情緒狀態和潛在地雷，告訴你哪些話題安全、哪些會爆炸",
        "主動導航型：不只讀空氣，還教你怎麼「換空氣」——用話題轉換和氣氛調節把場面救回來",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '社交場景分析師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用輕描淡寫的安慰' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '解讀+安全+地雷+救場' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依場景角色調整建議' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '文化測試適用華人場景' },
    ],
    theory: "基於 Hall 的高語境溝通理論（High-Context Communication）與 Goleman 的社會智能模型：在華人文化中，70% 的重要訊息不在話語本身，而在語氣、表情、沉默和時機裡。本咒語訓練你的「社交雷達」——不是讀心術，而是讀「空氣」術：察覺那些沒說出口但所有人都感覺得到的東西。",
    generate: (inputs: any) => `你是一位社交場景分析師，結合了微表情專家和高語境文化顧問的能力。你在華人社交圈摸爬滾打 15 年，最擅長的就是「讀懂房間裡沒人說出口的那句話」。你的信條：「會說話是本事，知道什麼時候不說話是智慧。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我正在（或即將進入）一個社交場景，需要你幫我讀懂「空氣」。\n- 場景：[[${inputs.scene}]]\n- 在場的人：[[${inputs.people}]]\n- 感受到的氛圍：[[${inputs.tension}]]\n- 我的角色：[[${inputs.your_role}]]\n\n請輸出：\n① 【空氣解讀報告】— 分析場上目前的情緒溫度、可能的地雷區、每個人大概在想什麼，100 字以內\n② 【安全話題清單】— 3 個現在可以聊的安全話題，每個附一句開場白，各 20 字以內\n③ 【地雷清單】— 3 個現在千萬不能碰的話題或行為，每個 15 字以內\n④ 【救場話術】— 如果氣氛已經凝結了，一句話破冰，20 字以內\n⑤ 【觀察指南】— 教你接下來 10 分鐘觀察哪些信號（表情/動作/語氣），判斷情勢是否好轉\n\n【規則】\n1. 分析必須基於場景合理推測，不能太玄學——是社會心理學不是算命。\n2. 嚴禁使用：「你想太多了」「應該沒什麼」「別在意」——使用者的直覺通常是對的，你的工作是幫他驗證和應對。\n3. 安全話題必須真的安全——不能推薦「聊工作」然後場上有人剛被裁員。\n4. 語氣像一個坐在你旁邊的社交達人在耳邊小聲提醒你——溫暖、實用、即時。\n5. 文化測試：所有建議必須在華人社交場景中適用，考慮面子文化和潛規則。`
  },

  // ━━━ 📜 見習咒文 | 職場求生 | Free ━━━
  {
    id: "meeting_shield",
    tab: "職場求生",
    isPro: false,
    tier: "apprentice",
    school: "defense" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "會議應答話術",
    icon: <Target className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "會議護盾：提問防禦術",
    desc: "開會被老闆突然 cue 到、被同事當場質疑、被問到完全沒準備的問題？別再說『這個我回去確認一下』——用結構化話術接住任何提問，讓人覺得你深思熟慮而非措手不及。",
    tags: ["會議", "提問防禦", "職場話術"],
    fields: [
      { id: "question_type", label: "被問什麼類型的問題", placeholder: "例：進度報告 / 數據細節 / 對方案的看法 / 為什麼沒做到" },
      { id: "asker", label: "誰問的", placeholder: "例：直屬主管 / CEO / 其他部門主管 / 同級同事" },
      { id: "preparation_level", label: "你的準備程度", placeholder: "例：完全沒準備 / 大概知道但細節不確定 / 有準備但被問到意料外的角度" },
      { id: "meeting_context", label: "什麼會議", placeholder: "例：週會 / 專案審查 / 跨部門會議 / 老闆一對一" },
    ],
    tweak: {
      id: "strat",
      label: "防禦策略",
      options: [
        "轉守為攻型：用反問把球丟回去，讓提問者變成回答者，爭取思考時間",
        "緩兵之計型：用結構化的「確認—框架—延遲」三步驟拖時間，同時展現專業感",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '企業溝通教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用職場自殺句' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '開場+框架+反問+補救' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依準備程度選防禦法' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '老闆測試展現專業感' },
    ],
    theory: "基於 Kahneman 的系統一/系統二思維理論：被突然提問時大腦處於系統一（快速反應）模式，容易說出蠢話。本咒語提供結構化的「緩衝句型」讓你切換到系統二（深度思考）模式。結合 Aristotle 修辭學三要素（Ethos/Pathos/Logos）——即使沒有答案，展現思考框架本身就能建立可信度。",
    generate: (inputs: any) => `你是一位資深企業溝通教練，專門訓練中高階主管的會議應對能力，曾輔導過 400+ 位「會議恐懼症」患者。你自己也經歷過在董事會上被問到啞口無言的慘痛經驗。你的信條：「沒有答不了的問題，只有不會拖的人。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我在會議中可能被突然提問，需要一套應對話術讓我不管被問什麼都能穩住場面。\n- 被問的問題類型：[[${inputs.question_type}]]\n- 提問者：[[${inputs.asker}]]\n- 我的準備程度：[[${inputs.preparation_level}]]\n- 會議場景：[[${inputs.meeting_context}]]\n\n請輸出：\n① 【黃金三秒開場】— 被問到的瞬間先說的一句話，15 字以內，用來爭取 3-5 秒思考時間，同時展現你在「思考」而非「發呆」\n② 【框架回應模板】— 一個萬用回答框架，用「確認問題 → 提供已知 → 承諾補充」三段式結構，總共 60 字以內\n③ 【反問武器庫】— 3 句可以反問回去的話，每句 20 字以內，讓提問者需要先釐清自己的問題\n④ 【最壞情況台詞】— 如果真的完全不知道答案，一句話體面收場，25 字以內\n⑤ 【會後補救訊息】— 會議結束後發給提問者的跟進訊息，50 字以內，把「不知道」變成「負責任的後續追蹤」\n\n【規則】\n1. 所有話術必須在會議情境中自然，能直接開口說，不能像在背稿。\n2. 嚴禁使用：「這個我不太確定」「我沒有準備到這個」「可以跳過嗎」「下次再報告」——這些是職場自殺句，說出來等於告訴全場你沒做功課。\n3. 運用修辭學原則：即使內容不足，用「思考框架」展現專業度——說「我從三個維度看這個問題」比說「我覺得應該可以」高級十倍。\n4. 語氣像一個「正在深度思考的專業人士」而非「一個被抓到沒準備的員工」——穩定、有節奏、不急不躁。\n5. 老闆測試：你輸出的每一句話，提問的老闆聽完會覺得「這個人有在想事情」而不是「這個人在鬼扯」。`
  },

  // ━━━ 📜 見習咒文 | 人際擋箭 | Free ━━━
  {
    id: "apology_craft",
    tab: "人際擋箭",
    isPro: false,
    tier: "apprentice",
    school: "healing" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "道歉訊息/對話腳本",
    icon: <Heart className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "致歉煉成：真誠道歉術",
    desc: "做錯事需要道歉，但跪著道歉丟臉、站著道歉沒誠意？煉成一封讓對方覺得『你真的懂我為什麼生氣』的道歉，不卑不亢但直擊心坎。",
    tags: ["道歉", "關係修復", "溝通話術"],
    fields: [
      { id: "victim", label: "要跟誰道歉", placeholder: "例：女友 / 好朋友阿明 / 直屬主管" },
      { id: "offense", label: "做了什麼", placeholder: "例：忘記紀念日 / 在背後說了對方壞話 / 工作上出包連累對方" },
      { id: "severity", label: "嚴重程度", placeholder: "例：對方已讀不回三天 / 大吵了一架 / 對方表面沒事但明顯冷淡" },
      { id: "goal", label: "道歉後希望達到什麼效果", placeholder: "例：恢復正常關係 / 讓對方願意再給一次機會 / 至少不要被記恨" },
    ],
    tweak: {
      id: "strat",
      label: "道歉策略",
      options: [
        "深度理解型：展現你真的懂對方為什麼生氣，讓對方覺得被看見和被理解",
        "行動承諾型：用具體的改變行動取代空洞的「我會改」，讓對方看到誠意",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '關係修復溝通心理師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用假道歉與反指控' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '道歉+破冰+炸彈+行動' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依嚴重度調整策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '閨蜜測試驗證誠意' },
    ],
    theory: "基於 Lazare 的道歉四要素模型（承認錯誤、提供解釋、表達悔意、提出補償）與 Rogers 的同理心理論：有效道歉的核心不是「我很抱歉」，而是「我理解我的行為對你造成了什麼影響」。研究顯示，讓對方感到「被理解」的道歉，接受率是單純說「對不起」的 3.5 倍。",
    generate: (inputs: any) => `你是一位專精關係修復的溝通心理師，處理過 350+ 件「道歉失敗導致關係惡化」的案例。你自己也曾因為一次糟糕的道歉失去重要的友誼，從此鑽研道歉的藝術。你的信條：「道歉不是認輸，是告訴對方『你的感受比我的面子重要』。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我做錯了事需要道歉，但我不想卑微跪舔，也不想敷衍了事。我需要一套有尊嚴但有誠意的道歉方案。\n- 道歉對象：[[${inputs.victim}]]\n- 我做了什麼：[[${inputs.offense}]]\n- 嚴重程度：[[${inputs.severity}]]\n- 希望達到的效果：[[${inputs.goal}]]\n\n請輸出：\n① 【道歉核心訊息】— 一段完整的道歉文字，80 字以內，包含「承認影響 → 表達理解 → 行動承諾」三段式結構\n② 【開場破冰句】— 如果對方在冷戰中，用來打破沉默的第一句話，20 字以內\n③ 【同理心炸彈】— 一句展現你真的理解對方感受的話，讓對方心防瞬間鬆動，25 字以內\n④ 【具體行動方案】— 2 個你可以立刻做的補償行動，每個 20 字以內，必須是具體可執行的\n⑤ 【對方不接受時的回應】— 如果對方說「不用了」或繼續冷淡，你的跟進方式，30 字以內\n\n【規則】\n1. 道歉訊息必須口語化，能直接傳 LINE 或當面說，不能像在讀道歉聲明稿。\n2. 嚴禁使用：「如果我讓你不舒服的話」「我不是故意的」「你也有你的問題」「希望你能理解」——前兩句是假道歉，後兩句是反指控，全都會讓情況更糟。\n3. 運用同理心理論：道歉的重點不是解釋你為什麼做錯，而是證明你理解對方「為什麼受傷」——先處理情緒，再處理事情。\n4. 語氣像「一個犯了錯但有擔當的成年人」——不卑微、不防禦、不找藉口。承認就是承認，但保有自己的尊嚴。\n5. 閨蜜測試：如果對方把你的道歉訊息截圖給閨蜜看，閨蜜會說「他是真的知道錯了」而不是「又在敷衍你」。`
  },
  // ━━━ 🔵 中階融合術 | 日常雜症 | Free | FUSION ━━━
  {
    id: "smooth_operator",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "社交失誤轉機劇本",
    icon: <Sparkles className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "從容大師：全場掌控術",
    desc: "遲到、說錯話、打翻咖啡、叫錯名字——社交出包人人都會，但高手能把災難現場變成個人魅力秀。不只化解尷尬，還讓全場對你印象更深。",
    tags: ["社交急救", "尷尬化解", "印象管理", "危機反轉"],
    fused_from: ["late_smoke_screen", "awkward_heal"],
    fragments_needed: 3,
    unlock_method: "fusion_only",
    fields: [
      { id: "situation", label: "出包場景", placeholder: "例：在客戶面前打翻整杯咖啡 / 叫錯主管名字 / 簡報時螢幕當機" },
      { id: "audience", label: "在場的人", placeholder: "例：5個同事+主管 / 第一次見面的相親對象 / 客戶高層" },
      { id: "desired_impression", label: "想留下什麼印象", placeholder: "例：幽默可靠 / 沉穩大氣 / 親切隨和" },
    ],
    tweak: {
      id: "strat",
      label: "掌控策略",
      options: [
        "幽默反轉型：用自嘲和機智把出糗變成笑點，讓全場記住你的幽默而不是你的失誤",
        "從容掌控型：用穩定的語氣和肢體語言把意外處理成『小插曲』，展現大將之風",
        "借力使力型：把出包場景變成破冰契機，利用共同經歷拉近與在場者的距離",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '社交危機師+即興演員' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁放大失誤的自殺語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '急救+話術+加分+補刀' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依在場者心理調整' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '觀眾測試保住印象' },
    ],
    theory: "融合 Goffman 印象管理理論的「修復儀式」與 face management theory 的面子協商機制：社交出包的殺傷力不在事件本身，而在你的反應速度和方式。研究顯示，優雅處理失誤的人反而比從未出錯的人獲得更高的好感度（pratfall effect）。本咒語結合 reframing 認知重構技術，將「災難現場」轉化為「魅力展示場」，同時運用 Goffman 的 corrective interchange 四步驟（挑戰→補救→接受→感謝）設計完整修復流程。",
    generate: (inputs: any) => `你是一位頂級社交危機處理師，同時具備即興喜劇演員的反應力和外交官的優雅。你輔導過 300+ 位高階主管處理公開場合的社交失誤，從打翻紅酒到叫錯總統名字都處理過。你的信條：「出糗不是結束，是你個人品牌最好的廣告。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我剛在社交場合出包了（或即將面對一個容易出包的場景），需要一套完整的轉危為機劇本。\n- 出包場景：[[${inputs.situation}]]\n- 在場的人：[[${inputs.audience}]]\n- 想留下的印象：[[${inputs.desired_impression}]]\n\n請輸出：\n① 【黃金三秒反應】— 出包後前 3 秒內要做的表情和動作，具體到臉部表情和手勢，30 字以內\n② 【化解開場白】— 出包後第一句話，20 字以內，能直接說出口，語氣符合我想要的印象\n③ 【反轉話術腳本】— 3 句後續對話，把場面從「尷尬」推向「好感」，每句 25 字以內，標註語氣和表情\n④ 【加分動作】— 化解尷尬後的 1 個追加動作，把「出包→化解」升級為「出包→化解→加分」，30 字以內\n⑤ 【事後補刀】— 事後傳給在場者的一則訊息（LINE/email），利用這次出包建立更深的連結，50 字以內\n⑥ 【最壞劇本】— 如果化解失敗、場面更尷尬了，你的 Plan B 緊急撤退方案\n⑦ 【心理錨定咒】— 出包瞬間內心默念的一句話，阻止慌張反應，15 字以內\n\n【規則】\n1. 所有話術必須口語化到可以直接說出口，不能有書面腔——你是在真實場景即時反應，不是在寫作文。\n2. 嚴禁使用：「不好意思」「抱歉抱歉」「天啊好丟臉」「哎呀我好笨」——這些是把聚光燈打在失誤上的自殺行為。\n3. 運用 pratfall effect（出醜效應）：研究證明，能力強的人偶爾出糗反而更討喜。你的話術必須同時展現「我知道我出糗了」的自知 + 「但這不影響我的從容」的自信。\n4. 語氣公式：40% 自嘲 + 40% 掌控感 + 20% 溫暖。自嘲是武器不是示弱，掌控感是核心不是裝腔，溫暖是讓對方願意接受你的修復。\n5. 反應速度測試：你設計的反應必須是「0.5 秒內大腦能調出來」的等級——太長、太複雜、需要背台詞的都不合格。\n6. 在場者心理模擬：針對我列出的在場者，分析他們看到我出包時的心理狀態（尷尬？幸災樂禍？同情？），並確保話術能同時安撫所有人。\n7. 觀眾測試：你設計的反轉，讓在場的人事後回想起來會說「那次超好笑但他處理得超好」而不是「那次他好丟臉」。`
  },

  // ━━━ 🔵 中階融合術 | 職場求生 | Free | FUSION ━━━
  {
    id: "mind_reader_persuasion",
    tab: "職場求生",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "目標心理檔案 + 說服話術腳本",
    icon: <Eye className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "讀心話術：精準說服術",
    desc: "說服不是靠嘴砲，是靠讀心。先解析對方的決策模式和在意的事，再用量身打造的話術精準命中。像狙擊手一樣，一句話解決戰鬥。",
    tags: ["說服術", "心理分析", "談判", "精準溝通"],
    fused_from: ["persuasion_dart", "price_scout"],
    fragments_needed: 3,
    unlock_method: "fusion_only",
    fields: [
      { id: "target", label: "說服對象", placeholder: "例：直屬主管 Lisa / 潛在客戶王總 / 投資人 David" },
      { id: "goal", label: "目標", placeholder: "例：加薪 20% / 簽下年度合約 / 批准我的提案" },
      { id: "known_info", label: "已知對方的資訊", placeholder: "例：她很在意 KPI、最近被上面施壓 / 他是理工背景、重數據" },
      { id: "deadline", label: "時限", placeholder: "例：這週五前 / 下次開會時 / 沒有硬期限但越快越好" },
    ],
    tweak: {
      id: "strat",
      label: "說服策略",
      options: [
        "利益綁定型：讓對方覺得答應你就是在幫自己，把你的需求包裝成他的利益",
        "損失框架型：不強調答應的好處，而是強調不答應會失去什麼，觸發損失厭惡",
        "社會證明型：用『別人都這樣做了』的框架降低對方的決策風險感",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '行為心理學家+談判教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用弱勢方乞求語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '心理檔案+話術+異議庫' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依決策風格選武器' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '道德底線防操控' },
    ],
    theory: "融合 Kahneman 展望理論（Prospect Theory）的損失框架效應與 Cialdini 六大影響力原則：人的決策不是理性的，而是基於「感知到的得失」。本咒語先透過有限資訊建構對方的心理決策模型——他是風險趨避型還是風險追求型？他的決策錨點在哪裡？他的 BATNA（最佳替代方案）是什麼？——然後針對這個模型選擇最有效的影響力武器（互惠、稀缺、權威、一致性、喜好、社會證明），設計出一套「對方覺得是自己做的決定」的說服流程。",
    generate: (inputs: any) => `你同時具備兩個專家視角：\n① 行為心理學家（專精決策科學與認知偏誤，發表過 20+ 篇關於說服力的研究論文，能從有限資訊推測一個人的決策模式）\n② 商務談判教練（15 年實戰經驗，輔導過從加薪談判到億元併購案，信奉「最好的談判是對方覺得自己贏了」）\n\n你的共同信條：「說服的最高境界不是讓對方被你說服，是讓對方覺得這本來就是他的想法。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要說服一個特定對象達成我的目標，請先分析對方心理再設計精準話術。\n- 說服對象：[[${inputs.target}]]\n- 我的目標：[[${inputs.goal}]]\n- 已知對方資訊：[[${inputs.known_info}]]\n- 時限：[[${inputs.deadline}]]\n\n請輸出：\n① 【目標心理檔案】— 根據已知資訊推測：決策風格（分析型/直覺型/恐懼驅動型/利益驅動型）、核心在意的事（前 3 名）、最可能的拒絕理由（前 2 名）、決策時的情緒觸發點，共 150 字以內\n② 【說服路線圖】— 從開口到成交的 4 步流程，每步標註「這一步的心理學目的」\n③ 【開場破冰句】— 見面/開口前的第一句話，25 字以內，目的是啟動正面框架\n④ 【核心說服話術】— 正式提出要求的那段話，80 字以內，必須精準命中對方的核心在意點\n⑤ 【異議處理庫】— 對方最可能說的 3 句拒絕語 + 每句的即時回應話術，回應各 30 字以內\n⑥ 【臨門一腳】— 對方猶豫時的最後推力句，20 字以內，觸發行動而非繼續思考\n⑦ 【時機推薦】— 根據對方心理檔案，建議最佳開口時機（星期幾、什麼場合、對方什麼狀態下）\n⑧ 【失敗預案】— 如果這次被拒絕，如何在不燒橋的情況下保留下次機會\n\n【規則】\n1. 心理檔案必須基於已知資訊合理推測，不能憑空捏造——標註哪些是「根據資訊推測」哪些是「一般假設」。\n2. 嚴禁使用：「你能不能」「拜託」「我真的很需要」「給我一個機會」——這些是弱勢方語言，會把你放在乞求者位置。\n3. 運用損失框架：比起「答應我你會得到 X」，更有效的是「如果不做 X，你可能會失去 Y」。所有核心話術必須包含至少一個損失框架元素。\n4. Cialdini 武器選擇：根據對方心理檔案，明確標註你在每句話術中使用了哪個影響力原則（互惠/稀缺/權威/一致性/喜好/社會證明）。\n5. 語氣必須像「兩個對等的人在討論一個雙贏方案」而非「下屬在跟上司懇求」——即使對方地位比你高。\n6. 自然對話測試：所有話術串起來必須像一段自然對話，不能像在背銷售腳本。\n7. 道德底線：說服是讓對方看到他沒注意到的角度，不是操控。如果目標本質上對對方有害，必須在輸出中警告使用者。`
  },

  // ━━━ 🔵 中階融合術 | 人際擋箭 | Free | FUSION ━━━
  {
    id: "graceful_no",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "defense" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "溫柔拒絕全流程腳本",
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "優雅拒絕：不傷人擋箭術",
    desc: "朋友借錢、同事推工作、親戚介紹對象、前任要復合——說不是必要的，但怎麼說不才是藝術。讓對方被拒絕後反而覺得你很體貼、很有原則。",
    tags: ["拒絕話術", "人際邊界", "溫柔堅定", "關係維護"],
    fused_from: ["polite_refusal", "apology_craft"],
    fragments_needed: 3,
    unlock_method: "fusion_only",
    fields: [
      { id: "request", label: "對方要求", placeholder: "例：借我三萬 / 幫我加班趕報告 / 我媽介紹的對象你見一下" },
      { id: "requester", label: "對象", placeholder: "例：大學好友阿嘉 / 同部門的學姐 / 三姑六婆" },
      { id: "relationship_value", label: "這段關係重不重要", placeholder: "例：非常重要的閨蜜 / 普通同事 / 不太熟的親戚" },
      { id: "bottom_line", label: "你的底線", placeholder: "例：絕對不借錢 / 可以幫忙但不能加班 / 完全不想去相親" },
    ],
    tweak: {
      id: "strat",
      label: "拒絕策略",
      options: [
        "三明治拒絕型：肯定→拒絕→替代方案，讓對方被包在溫暖裡消化掉被拒絕的失落",
        "原則盾牌型：把拒絕歸因於『我的原則/規定』而非『我不想幫你』，去個人化",
        "延遲轉移型：不在當下直接拒絕，先爭取時間再用文字優雅回絕，避免面對面的壓力",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '衝突調解+人際策略師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用留談判空間語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '面對面+訊息+替代' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係層級調強度' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '底線鐵律不退讓' },
    ],
    theory: "融合 Marshall Rosenberg 的非暴力溝通（NVC）四步驟（觀察→感受→需要→請求）與 Brown & Levinson 的禮貌理論（Politeness Theory）中的面子威脅行為管理：拒絕之所以痛苦，不是因為「說不」本身，而是因為我們把「拒絕請求」等同於「拒絕這個人」。本咒語將兩者解耦——用 NVC 結構確保你拒絕的是「事」不是「人」，用禮貌理論保護對方的正面面子（被喜歡的需求）和負面面子（不被打擾的需求），最終實現「你的底線守住了，對方的尊嚴也守住了」。",
    generate: (inputs: any) => `你是一位同時精通衝突調解和人際溝通的關係策略師，輔導過 400+ 位「不會拒絕」的人建立健康邊界。你深諳華人社會「人情壓力」的運作方式——為什麼我們寧可委屈自己也不敢說不。你的信條：「真正的體貼不是有求必應，是讓對方被拒絕後依然感受到被在乎。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要拒絕一個人的請求，但不能傷害這段關係（或至少把傷害降到最低）。\n- 對方的要求：[[${inputs.request}]]\n- 對象：[[${inputs.requester}]]\n- 關係重要性：[[${inputs.relationship_value}]]\n- 我的底線：[[${inputs.bottom_line}]]\n\n請輸出：\n① 【關係風險評估】— 分析拒絕這個請求可能對關係造成的影響等級（低/中/高），以及對方被拒絕後最可能的情緒反應，80 字以內\n② 【拒絕話術（面對面版）】— 當面說的完整腳本，分 3 段：暖場→核心拒絕→收尾，總計 100 字以內，標註每段的語氣指引\n③ 【拒絕話術（訊息版）】— 同樣的拒絕，改成 LINE/訊息版本，60 字以內，可以直接複製貼上\n④ 【替代方案】— 2 個你可以提供的替代選項（不違反底線但讓對方覺得你有在想辦法），每個 30 字以內\n⑤ 【追殺防禦】— 如果對方不接受拒絕繼續盧你，3 句逐級加強的回應（溫柔→堅定→最終防線），每句 25 字以內\n⑥ 【關係修復】— 拒絕後 48 小時內做的 1 個動作，讓對方知道「我拒絕的是這件事，不是你這個人」，30 字以內\n⑦ 【內心定心咒】— 對方露出失望表情時默念的一句話，阻止愧疚驅動的妥協衝動，15 字以內\n\n【規則】\n1. 面對面話術必須口語到可以直接在咖啡廳說出來，訊息版必須能直接複製貼到 LINE——不能有任何書面腔或心理學術語。\n2. 嚴禁使用：「我也很為難」「我真的沒辦法」「你不要生氣」「下次一定」——這些只會讓對方覺得「所以還有談判空間」或「你在敷衍我」。\n3. 運用 NVC 結構：拒絕語必須包含「我理解你的需要（同理）」+「我有我的考量（立場）」+「我能做的是（替代）」三元素，缺一就會變成冷血拒絕或虛偽客套。\n4. 關係層級適配：根據關係重要性調整話術強度——越重要的關係用越多同理和替代方案，越不重要的關係可以越直接。\n5. 底線鐵律：無論使用哪種策略，最終結果必須是「底線守住了」。如果替代方案會讓使用者違反自己的底線，寧可不給替代方案。\n6. 連續施壓測試：你的追殺防禦三句話必須逐級升級但不翻臉——第一句是重申，第二句是劃線，第三句是結案。三句說完如果對方還盧，使用者有權已讀不回。\n7. 文化敏感度：考慮華人社會的面子文化和人情債意識，話術必須在「守住邊界」和「給足面子」之間取得平衡。`
  },

  // ━━━ 🔵 中階融合術 | 人際擋箭 | Free | FUSION ━━━
  {
    id: "agreement_guardian",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "contract" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "承諾追索計畫 + 預防性協議模板",
    icon: <Target className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "契約守護：口頭協議鎖死術",
    desc: "說好的加薪沒下文、答應要還的錢裝死、承諾的資源突然縮水——別人的嘴最不可靠，但你可以讓他自己說過的話變成逃不掉的鎖鏈。",
    tags: ["承諾追蹤", "口頭協議", "防反悔", "契約精神"],
    fused_from: ["promise_seal", "polite_refusal"],
    fragments_needed: 3,
    unlock_method: "fusion_only",
    fields: [
      { id: "promiser", label: "反悔者", placeholder: "例：主管阿國 / 合作夥伴老張 / 借錢的朋友小李" },
      { id: "original_promise", label: "原本承諾", placeholder: "例：說好 Q3 加薪 15% / 答應月底還三萬 / 說好一起分攤房租" },
      { id: "current_behavior", label: "現在怎麼反悔", placeholder: "例：開始裝傻沒提過 / 已讀不回 / 突然說『我記得不是這樣講的』" },
      { id: "evidence", label: "有什麼證據", placeholder: "例：LINE 對話截圖 / 會議紀錄 / 第三方見證人 / 什麼都沒有" },
    ],
    tweak: {
      id: "strat",
      label: "鎖死策略",
      options: [
        "溫水煮蛙型：不直接對質，而是用『順便確認一下之前說的那件事』慢慢縮緊包圍圈",
        "證據亮劍型：直接拿出證據，用事實堵住對方的退路，快速鎖死承諾",
        "第三方見證型：在有其他人在場的場合『自然地』提起這個承諾，讓社會壓力替你執法",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '契約心理學家+調解師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用情緒指控語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '確認+錨定+施壓+佈局' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依反悔型選追索法' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '證據意識防上法院' },
    ],
    theory: "融合 Cialdini 的承諾一致性原則（Commitment-Consistency Principle）與 Tversky & Kahneman 的錨定效應（Anchoring Effect）：人一旦公開做出承諾，會因為自我形象維護的需要而傾向遵守——但前提是承諾被「錨定」住了。反悔者利用的是「口頭承諾的可否認性」和「時間沖淡記憶」。本咒語透過建立承諾的「物理錨點」（文字紀錄、見證人、時間戳記）和「社會錨點」（讓更多人知道這個承諾存在），讓對方反悔的心理成本和社會成本高到不值得。",
    generate: (inputs: any) => `你同時具備兩個專家視角：\n① 契約心理學家（專精承諾行為與毀約心理，研究過 500+ 個口頭協議糾紛案例，深諳「為什麼好人也會反悔」的心理機制）\n② 非訴訟糾紛調解師（12 年經驗，擅長在不上法院、不撕破臉的情況下讓對方履行承諾，處理過從朋友借錢到商業合約的各種場景）\n\n你的共同信條：「最好的契約不是寫在紙上的，是刻在對方的社會形象上的。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n有人對我做出的承諾正在反悔，我需要一套讓他無法賴帳的追索計畫。\n- 反悔者：[[${inputs.promiser}]]\n- 原本承諾：[[${inputs.original_promise}]]\n- 反悔方式：[[${inputs.current_behavior}]]\n- 手上的證據：[[${inputs.evidence}]]\n\n請輸出：\n① 【反悔者心理分析】— 分析對方為什麼反悔（健忘型/僥倖型/惡意型/壓力型），以及對應的弱點，100 字以內\n② 【證據鏈建構】— 根據我現有的證據，列出 3 步補強計畫（如何把薄弱的證據變成鐵證），每步 30 字以內。如果完全沒證據，教我如何「事後補建」證據鏈\n③ 【追索話術腳本】— 分 3 個階段的對話腳本：\n   · 第一階段「確認」：假裝不知道對方要反悔，『順便確認』承諾內容，30 字以內\n   · 第二階段「錨定」：把承諾用文字再次釘死（例如發訊息確認），40 字以內\n   · 第三階段「施壓」：如果對方繼續裝死，溫柔但明確地表達後果，40 字以內\n④ 【社會壓力佈局】— 2 個不動聲色地讓第三方知道這個承諾的方法，每個 30 字以內\n⑤ 【預防性協議模板】— 未來如何在對方做出承諾的「當下」就鎖死，3 個具體動作，每個 25 字以內\n⑥ 【停損判斷】— 什麼情況下應該放棄追索（成本效益分析），以及如何優雅退場，60 字以內\n⑦ 【最壞情況】— 如果對方完全翻臉不認帳，你的 2 個最後手段（法律途徑/社會途徑），各 40 字以內\n\n【規則】\n1. 追索話術必須自然到像日常對話，不能讓對方感覺「你在蒐證」或「你在威脅我」——至少在前兩個階段。\n2. 嚴禁使用：「你不是說好的嗎」「你怎麼可以反悔」「你太過分了」——這些是情緒發洩，不是策略執行。情緒暴露 = 主動權喪失。\n3. 運用承諾一致性原則：所有話術的核心邏輯是「我只是在幫你完成你自己說過要做的事」——你不是在逼他，你是在「幫他做到他承諾的事」。\n4. 錨定效應應用：在追索過程中反覆使用對方的原話、原始數字、原始時間點，讓這些錨點在對方腦中生根，反悔的認知失調越大，履約的動機越強。\n5. 升級控制：三個階段的壓力必須逐級上升但始終可控——第一階段對方不應該察覺任何壓力，第二階段感到「被記住了」，第三階段感到「不做不行了」。\n6. 道德底線：如果使用者的描述顯示原本的承諾可能有誤解或合理的反悔原因，必須在分析中誠實提出，不能一味站在使用者這邊。\n7. 證據意識：所有對話建議都必須同時考慮「如果有一天要上法院或找調解，這段對話能不能當證據」。`
  },

  // ━━━ 🔵 中階融合術 | 日常雜症 | Free | FUSION ━━━
  {
    id: "tactical_retreat",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "脫身作戰計畫",
    icon: <Clock className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "煙幕撤退：全身而退術",
    desc: "被拉進無聊飯局、被點名做不想做的事、被困在永無止盡的會議——你需要的不是拒絕，是一套讓你「不知不覺就消失了」的脫身計畫。",
    tags: ["脫身術", "藉口生成", "會議逃脫", "戰略撤退"],
    fused_from: ["social_radar", "meeting_shield"],
    fragments_needed: 3,
    unlock_method: "fusion_only",
    fields: [
      { id: "situation", label: "想脫身的場景", placeholder: "例：同事揪的假日團建 / 主管臨時加的週五晚會議 / 親戚的直銷說明會" },
      { id: "opponent", label: "誰在逼你", placeholder: "例：很難拒絕的學長 / 直屬主管 / 熱情過頭的阿姨" },
      { id: "stakes", label: "不脫身的後果", placeholder: "例：浪費整個週末 / 要免費加班到半夜 / 被推銷一整晚" },
      { id: "available_time", label: "還有多少時間", placeholder: "例：活動是明天 / 會議 30 分鐘後開始 / 現在已經在現場了" },
    ],
    tweak: {
      id: "strat",
      label: "撤退策略",
      options: [
        "預謀脫身型：提前佈局完美藉口，從未參加到臨時離開都有劇本，自然到沒人起疑",
        "緊急撤離型：已經在現場了需要立刻脫身，用突發狀況製造合理離場契機",
        "漸進消失型：不突然離開，而是慢慢降低存在感，讓你的缺席像溫水煮青蛙一樣無人察覺",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '戰略顧問+即興劇導演' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用會被追問的弱藉口' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '評估+藉口+時間軸+善後' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依場景選撤退策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '重要場合誠實勸留' },
    ],
    theory: "融合 strategic communication 的訊息框架理論與 Goffman 印象管理中的「台前/台後」概念：成功的脫身不是「說一個好藉口」那麼簡單，而是一整套包含「預告→執行→善後」的戲劇化演出。本咒語運用訊息設計的時機理論（timing theory）——什麼時候說比說什麼更重要——配合印象管理的「可信度校準」——你平時的人設能不能支撐這個藉口——設計出一套從佈局到收尾滴水不漏的撤退計畫。",
    generate: (inputs: any) => `你是一位結合戰略顧問和即興劇場導演的「專業脫身策劃師」，你輔導過 500+ 位社恐人士和過勞上班族從各種不想參加的場合全身而退。從董事會到家族聚餐，從相親飯局到直銷說明會，沒有你脫不了的身。你的信條：「最高明的脫身，是你離開後大家都覺得你去忙正事了，而不是你在逃避。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我被困在（或即將被拉進）一個不想參加的場合，需要一套完整的脫身作戰計畫。\n- 想脫身的場景：[[${inputs.situation}]]\n- 誰在逼我：[[${inputs.opponent}]]\n- 不脫身的後果：[[${inputs.stakes}]]\n- 剩餘時間：[[${inputs.available_time}]]\n\n請輸出：\n① 【戰場評估】— 分析這個場景的脫身難度（S/A/B/C 級），對手的追擊能力（容易放手/會追問/會翻臉），以及最佳脫身時機視窗，80 字以內\n② 【藉口方案 A】— 主要藉口 + 完整話術腳本（包含開場白、核心藉口、收尾語），總計 80 字以內，標註「需要準備什麼道具或前置動作」\n③ 【藉口方案 B】— 備用藉口（萬一方案 A 被識破），50 字以內\n④ 【時間軸部署】— 從「現在」到「成功脫身」的分鐘級行動計畫：幾分鐘前做什麼、說什麼、然後什麼時候離開，至少 4 個時間節點\n⑤ 【煙幕彈道具】— 增加藉口可信度的 2 個小道具或小動作（例：提前設定手機鬧鈴假裝來電），每個 25 字以內\n⑥ 【善後訊息】— 離開後傳給逼你的人的一則訊息，維護關係+強化藉口可信度，40 字以內\n⑦ 【反追擊防線】— 如果對方說「沒關係等你忙完再來」或「那改天補」，你的 2 句回擋語，每句 20 字以內\n⑧ 【長期免疫】— 如何在未來從源頭減少被拉進這類場合的頻率，2 個習慣建議，每個 30 字以內\n\n【規則】\n1. 所有藉口必須通過「自然度測試」：這個藉口從你嘴裡說出來，以你的身份和人設，聽起來合理嗎？不能用明顯不符合你人設的藉口（例：從不運動的人突然說要去健身）。\n2. 嚴禁使用：「我不太想去欸」「可是我很累」「我有點不舒服」——這些是弱藉口，會被追問到破功。好的藉口必須是「對方無法驗證且不好意思追問」的等級。\n3. 運用時機理論：藉口的可信度 = 內容合理度 × 時機精準度。太早說顯得你在找藉口，太晚說顯得你在逃跑。你必須標註精確的開口時機。\n4. 煙幕彈原則：最好的藉口不是「我不能來」而是「我必須去另一個地方」——把「逃離」轉化為「趕赴」，讓你的離開充滿正當性。\n5. 善後不能斷：脫身不是結束，善後訊息是整個計畫的最後一環。沒有善後的脫身 = 留下一個定時炸彈。\n6. 升級應對：反追擊防線的兩句話必須逐級升級——第一句是「婉拒再約」，第二句是「關閉話題」。\n7. 良心條款：如果這個場合其實很重要（例如：主管的重要會議、好友的婚禮），必須在戰場評估中誠實提醒使用者「這次不建議脫身」並說明原因。`
  },
  // ━━━ FUSION SPELLS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ 🔵 融合中階 | 人際擋箭 | Free ━━━
  {
    id: "know_thy_enemy",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "讀心防壁分析報告",
    icon: <Eye className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "讀心防壁：知己知彼術",
    desc: "有人對你笑裡藏刀、檯面下暗中佈局？這個融合咒語讓你同時「看穿意圖」和「佈好防線」——在對方出手前，你已經知道他要走哪一步，也擋好了每一條路。",
    tags: ["讀心", "防禦", "談判", "融合咒語"],
    fused_from: ["price_scout", "meeting_shield"],
    fragments_needed: 3,
    unlock_method: "收集「比價偵察術」與「會議護盾術」後在融合爐中合成",
    fields: [
      { id: "opponent", label: "對手", placeholder: "例：新來的部門主管 / 合作方的業務代表" },
      { id: "observed_behavior", label: "觀察到的行為", placeholder: "例：開會時總是對我微笑但私下跟老闆打小報告" },
      { id: "context", label: "場景", placeholder: "例：即將到來的專案分工會議 / 合約談判" },
      { id: "your_position", label: "你的立場", placeholder: "例：我想保住專案主導權 / 我不想被邊緣化" },
    ],
    tweak: {
      id: "strat",
      label: "讀心防壁策略",
      options: [
        "冷讀先行型：先透過行為分析判斷對方意圖，再針對性佈防",
        "鏡像防禦型：用模仿對方的溝通風格來套話，同時建立心理屏障",
        "資訊不對稱型：讓對方以為你什麼都不知道，暗中收集情報並預設防線",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '行為分析+防禦策略師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用安撫使用者的話' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '意圖+預測+防壁+試探' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依策略選讀心防壁法' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '紅線警報及時啟動' },
    ],
    theory: "融合 Porter 競爭分析的「對手意圖解讀」與 Cialdini 的「預先說服」防禦框架。單獨的洞察力讓你看穿對方但無法防禦；單獨的防禦讓你擋住攻擊但不知來源。兩者融合後形成「攻防一體」——你的每一次觀察都自動轉化為防禦策略，你的每一道防線都基於精準的意圖判讀。",
    generate: (inputs: any) => `你同時具備兩個專家視角：\n① 行為分析專家（專精微表情與語言模式解讀，曾為執法機構訓練偵訊技巧，12 年實務經驗）\n② 防禦策略師（專精組織內部政治防護，輔導過 300+ 位中階主管應對職場暗箭）\n\n你的信條：「看穿對方不是為了攻擊，而是為了讓防禦精準到浪費不了一絲力氣。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我面對一個可能有惡意的對手，需要同時讀懂他的意圖並建立防線。\n- 對手：[[${inputs.opponent}]]\n- 觀察到的行為：[[${inputs.observed_behavior}]]\n- 場景：[[${inputs.context}]]\n- 我的立場：[[${inputs.your_position}]]\n\n請輸出：\n① 【意圖解讀報告】— 根據觀察到的行為，分析對方最可能的 2 種真實意圖，每種 50 字以內，標註可信度（高/中/低）\n② 【行為預測】— 在你描述的場景中，對方最可能的 3 個下一步動作\n③ 【防壁部署】— 針對每個預測動作的防禦對策，每條 30 字以內\n④ 【試探話術】— 2 句可以在互動中自然丟出來測試對方意圖的話，每句 20 字以內\n⑤ 【紅線警報】— 3 個信號，一旦出現代表對方已經在行動，必須立刻啟動防禦\n\n【規則】\n1. 意圖分析必須基於具體行為推導，不能用「他可能不喜歡你」這種空洞判斷。\n2. 嚴禁使用：「也許他沒有惡意」「可能是你想太多」——使用者來找你就是因為直覺響了，你的工作是驗證和防護，不是安撫。\n3. 防禦對策必須是「明天就能做」的具體行動，不能只寫「注意觀察」「保持警覺」。\n4. 試探話術必須像正常對話，不能讓對方察覺你在試探——自然到像在閒聊。\n5. 語氣像棋手在分析棋局——冷靜、精準、不帶情緒，但每一步都是為了保護使用者。`
  },

  // ━━━ 🟣 融合高階 | 職場求生 | Pro ━━━
  {
    id: "career_alchemy",
    tab: "職場求生",
    isPro: true,
    tier: "master",
    school: "attack" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "升遷加速作戰系統",
    icon: <Sparkles className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "職場煉金：升遷加速術",
    desc: "想加薪升遷但不知道怎麼開口？融合煉金話術的包裝力與讀心說服的洞察力，讓老闆覺得升你是他自己的英明決策，而不是你在邀功。",
    tags: ["加薪", "升遷", "職場策略", "融合咒語"],
    fused_from: ["allowance_alchemy", "mind_reader_persuasion"],
    fragments_needed: 5,
    unlock_method: "收集「零用錢翻倍術」與「讀心說服術」後在融合爐中合成",
    fields: [
      { id: "current_role", label: "目前職位", placeholder: "例：行銷專員 / 資深工程師 / 副理" },
      { id: "target", label: "目標", placeholder: "例：升主管 / 加薪 20% / 轉調新部門" },
      { id: "boss_personality", label: "主管風格", placeholder: "例：數據導向理性派 / 感覺決策型 / 權威控制型" },
      { id: "timing", label: "什麼時候提", placeholder: "例：年底績效面談 / 剛完成大案子 / 公司正在擴編" },
    ],
    tweak: {
      id: "strat",
      label: "煉金策略",
      options: [
        "種子播種型：提前 2-4 週開始鋪墊，讓老闆自己「發現」你該升了",
        "數據碾壓型：準備完整的貢獻量化報告，用事實讓老闆無法說不",
        "借勢上位型：利用外部機會（獵頭、同業挖角）作為談判籌碼，但不是威脅",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '組織心理+薪酬+政治顧問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用乞討式努力語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '側寫+鋪墊+腳本+反駁' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依主管風格調策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '老闆測試防算計感' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '隱形加分微行為' },
    ],
    theory: "融合 Cialdini 的框架效應（把「我要加薪」重構為「這對團隊最好」）與 Kahneman 的系統一思維操控（讓老闆的直覺先說 yes，理性再來合理化）。煉金術負責包裝——同一件事換個說法價值翻倍；讀心術負責定位——精準擊中老闆最在意的點。兩者融合後，你的升遷請求不再是「員工的需求」而是「老闆的洞見」。",
    generate: (inputs: any) => `你同時具備三個專家視角：\n① 組織心理學家（研究主管決策心理 15 年，發表過「為什麼老闆升錯人」的研究論文）\n② 薪酬談判教練（輔導過 500+ 位職場人成功加薪，平均漲幅 23%，從未有學員被秋後算帳）\n③ 職場政治顧問（擅長解讀組織內部權力動態，知道什麼話在什麼時機說最有殺傷力）\n\n你的信條：「升遷不是你夠不夠格的問題，是你有沒有讓對的人在對的時間用對的方式知道你夠格。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我想加薪或升遷，需要一套讓老闆覺得「升你是我的好主意」的完整系統。\n- 目前職位：[[${inputs.current_role}]]\n- 目標：[[${inputs.target}]]\n- 主管風格：[[${inputs.boss_personality}]]\n- 時機：[[${inputs.timing}]]\n\n請輸出：\n① 【老闆心理側寫】— 分析這類型主管做升遷決策時最看重什麼、最討厭什麼，100 字以內\n② 【4 週鋪墊計畫】— 每週 1-2 個具體動作，讓老闆在正式談話前已經「覺得你該升了」\n③ 【關鍵對話腳本】— 正式提出時的完整話術，分「開場」「核心訴求」「收尾」三段，每段 40 字以內\n④ 【預設反駁】— 老闆最可能的 3 個拒絕理由 + 你的即時回應，每組 30 字以內\n⑤ 【退路設計】— 如果這次沒成功，如何優雅收場並為下次鋪路\n⑥ 【隱形加分】— 3 個大多數人不知道但會影響升遷的微小行為\n\n【規則】\n1. 所有話術必須口語化到可以直接在辦公室說出口，不能有任何書面腔或教科書味。\n2. 嚴禁使用：「我覺得我很努力」「我付出了很多」「我應該值得」——這些是乞討語言，觸發老闆的「又一個覺得自己該升的人」反射。\n3. 核心原則：讓老闆覺得升你是「他的決策」而非「你的請求」——人只會為自己的決定買單。\n4. 4 週計畫必須具體到「跟誰說什麼話」「在哪個會議做什麼」，不能只寫「展現領導力」。\n5. 老闆測試：你輸出的每一句話，如果老闆聽到，他的反應是「嗯這人有格局」而不是「他在算計我」。\n6. 備用路線必須真的有用——不是「再等半年」這種廢話，而是「做 X 讓下次的勝率提高 Y」。`
  },

  // ━━━ 🟣 融合高階 | 人際擋箭 | Pro ━━━
  {
    id: "relationship_alchemy",
    tab: "人際擋箭",
    isPro: true,
    tier: "master",
    school: "healing" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "衝突轉化全系統",
    icon: <Heart className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "關係煉金：衝突轉化術",
    desc: "吵架不是問題，吵完關係倒退才是。融合圓場力的修復技巧與優雅拒絕的邊界功力，不只修復衝突到原狀，還讓每次吵架都變成關係升級的催化劑。",
    tags: ["關係修復", "衝突處理", "溝通", "融合咒語"],
    fused_from: ["smooth_operator", "graceful_no"],
    fragments_needed: 5,
    unlock_method: "收集「圓場術」與「優雅拒絕術」後在融合爐中合成",
    fields: [
      { id: "conflict", label: "衝突內容", placeholder: "例：我忘了紀念日對方大爆炸 / 室友覺得我太吵" },
      { id: "relationship_type", label: "關係類型", placeholder: "例：交往 3 年的伴侶 / 住一起的室友 / 多年好友" },
      { id: "history", label: "過去相處模式", placeholder: "例：平時相處好但一吵就冷戰 / 累積太多小事一次爆發" },
      { id: "ideal_outcome", label: "理想結果", placeholder: "例：不只和好還建立以後吵架的SOP / 讓對方更信任我" },
    ],
    tweak: {
      id: "strat",
      label: "煉金策略",
      options: [
        "先降溫再升級型：先處理情緒面讓雙方冷靜，再趁機重設關係規則",
        "翻譯機型：把雙方的「攻擊語言」翻譯成「需求語言」，讓彼此聽見真正想說的話",
        "共同敵人型：把問題外部化——不是「你 vs 我」而是「我們 vs 這個問題」",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '關係治療+調解+NVC教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用諮商腔與判罪語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: 'X光+急救+腳本+協議' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係類型調煉金法' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '鏡子測試不演戲' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '需求翻譯對照表' },
    ],
    theory: "融合 Gottman 的關係修復理論（成功伴侶不是不吵架，而是修復嘗試的成功率高達 86%）與邊界心理學（健康的 No 是關係的地基，不是關係的敵人）。圓場術處理「怎麼和好」，拒絕術處理「怎麼設界」。融合後產生「轉化效應」——衝突不再是關係的傷口，而是關係的成長點。每一次成功修復都讓關係的「信任帳戶」存入更多。",
    generate: (inputs: any) => `你同時具備三個專家視角：\n① 關係治療師（Gottman Method 認證，處理過 400+ 對伴侶與關係衝突，專精華人關係動態）\n② 衝突調解專家（曾任跨國企業內部調解人，擅長在雙方都覺得自己對的情況下找到第三條路）\n③ 溝通教練（專精非暴力溝通 NVC，能把「你每次都這樣！」翻譯成「我需要你在 X 時候做 Y」）\n\n你的信條：「最好的關係不是不吵架的關係，而是每次吵完都比之前更好的關係。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我正在經歷一場關係衝突，不只想和好，還想讓關係比衝突前更好。\n- 衝突內容：[[${inputs.conflict}]]\n- 關係類型：[[${inputs.relationship_type}]]\n- 過去相處模式：[[${inputs.history}]]\n- 理想結果：[[${inputs.ideal_outcome}]]\n\n請輸出：\n① 【衝突 X 光】— 分析這次衝突的表層原因和深層原因（通常是不同的），各 50 字以內\n② 【情緒急救包】— 現在立刻可以做的 3 件事來止血（不是解決問題，是停止惡化），每件 20 字以內\n③ 【修復對話腳本】— 等雙方冷靜後的完整對話，分「破冰」「核心表達」「未來約定」三段，每段 50 字以內\n④ 【需求翻譯表】— 把雙方的攻擊語言翻譯成需求語言，格式：「他說 X → 他其實需要 Y」「你說 X → 你其實需要 Y」\n⑤ 【關係升級協議】— 利用這次衝突建立 3 條新的相處規則，讓以後類似問題不再爆炸\n⑥ 【72 小時追蹤計畫】— 和好之後 3 天內的 3 個鞏固動作，確保不是假性和好\n\n【規則】\n1. 對話腳本必須是真人會說的話，不能出現「我感受到你的情緒」這種心理諮商腔。\n2. 嚴禁使用：「你應該道歉」「這是你的錯」「他不對」——你不是法官，你是煉金師，你的工作是把衝突轉化成黃金。\n3. 需求翻譯必須精準——「你從來不關心我」的背後可能是「我需要你主動問我今天過得好不好」，你要挖到這一層。\n4. 關係升級協議必須雙方都能接受——不能只要求一方改變，那不是協議是命令。\n5. 鏡子測試：使用者對著鏡子練習你的對話腳本時，不會覺得在演戲或卑微，而是覺得「這就是我想說但說不出口的話」。`
  },

  // ━━━ 🟣 融合高階 | 職場求生 | Pro ━━━
  {
    id: "shadow_broker",
    tab: "職場求生",
    isPro: true,
    tier: "master",
    school: "insight" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "幕後操盤作戰地圖",
    icon: <Eye className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "暗影斡旋：幕後操盤術",
    desc: "檯面上笑嘻嘻，檯面下各懷鬼胎？當多方利益糾纏，正面衝突只會兩敗俱傷。這個融合咒語讓你在幕後佈局，不動聲色地讓結果往你要的方向傾斜。",
    tags: ["幕後操作", "多方博弈", "策略", "融合咒語"],
    fused_from: ["tactical_retreat", "mind_reader_persuasion"],
    fragments_needed: 5,
    unlock_method: "收集「戰術撤退術」與「讀心說服術」後在融合爐中合成",
    fields: [
      { id: "parties", label: "涉及哪些人", placeholder: "例：我、主管A、同事B、客戶C" },
      { id: "interests", label: "各方利益", placeholder: "例：A想搶功、B想少做事、C想壓價、我想升遷" },
      { id: "your_goal", label: "你的目標", placeholder: "例：讓專案成功且功勞歸我 / 讓兩個老闆別再互扯後腿" },
      { id: "constraints", label: "限制條件", placeholder: "例：不能得罪A因為他是老闆紅人 / 時間只剩兩週" },
    ],
    tweak: {
      id: "strat",
      label: "斡旋策略",
      options: [
        "資訊差利用型：控制誰知道什麼，讓各方基於不完整資訊做出你想要的決定",
        "利益重組型：找到隱藏的共同利益，把零和遊戲改寫成正和遊戲，你拿最大份",
        "代理人型：找到每一方信任的人，透過他們傳遞你想傳的訊息，你永遠不在前線",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '賽局學者+政治顧問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用正面攤牌建議' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '權力圖+槓桿+三步暗棋' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依限制選斡旋策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不造成不應得損失' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '識破後脫身方案' },
    ],
    theory: "融合博弈論的「不完全資訊賽局」與 Robert Greene 的「間接策略」理論。戰術撤退提供「何時不出手」的智慧——最強的棋手不是每步都下，而是知道什麼時候讓別人替你下；讀心說服提供「出手必中」的精準度。融合後形成「暗影操盤」——你不需要控制每個人，只需要在關鍵節點施加微小的力，讓整個系統往你要的方向演化。",
    generate: (inputs: any) => `你同時具備三個專家視角：\n① 賽局理論學者（專精多人不完全資訊賽局，曾用博弈模型幫企業解決過 200+ 場多方衝突）\n② 政治顧問（曾任政黨幕僚，擅長在多方勢力中為客戶爭取最大利益，從不留指紋）\n③ 組織行為學家（研究非正式權力結構 20 年，知道每個組織裡真正說了算的人是誰）\n\n你的信條：「最高明的操盤，是讓所有人都覺得結果是自然發生的。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我身處一個多方利益衝突的局面，需要一份幕後操盤計畫。\n- 涉及的人：[[${inputs.parties}]]\n- 各方利益：[[${inputs.interests}]]\n- 我的目標：[[${inputs.your_goal}]]\n- 限制條件：[[${inputs.constraints}]]\n\n請輸出：\n① 【權力地圖】— 畫出各方的利益關係、聯盟可能性、衝突點，用文字呈現，150 字以內\n② 【關鍵節點分析】— 找出 2-3 個「只要改變這個，全局就會傾斜」的槓桿點\n③ 【三步暗棋計畫】— 分「佈局」「引導」「收割」三階段，每階段的具體動作和時機\n④ 【話術工具箱】— 跟每一方說話時的關鍵語句，讓每個人都覺得你站在他那邊\n⑤ 【風險控制】— 如果某一步被識破，你的 3 個脫身方案\n⑥ 【終局預測】— 如果一切按計畫進行，最終各方的狀態和你的收益\n\n【規則】\n1. 計畫必須在限制條件內可執行，不能出現「如果沒有限制就好了」這種廢話。\n2. 嚴禁使用：「直接跟大家說清楚」「開個會把話講開」——如果正面溝通能解決，使用者就不需要這個咒語了。\n3. 話術工具箱必須確保：你對 A 說的話和對 B 說的話不會互相矛盾——萬一他們對質，你的說法必須能自圓其說。\n4. 每一步都必須有「看起來的理由」和「真正的目的」——表面上你在做 X，實際上你在佈局 Y。\n5. 道德底線：操盤是為了在複雜局面中保護自己的合理利益，不是為了傷害任何人。所有策略的底線是「不造成他人不應得的損失」。`
  },

  // ━━━ 🟣 融合高階 | 人際擋箭 | Pro ━━━
  {
    id: "absolute_territory",
    tab: "人際擋箭",
    isPro: true,
    tier: "master",
    school: "defense" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "心理鐵壁建構系統",
    icon: <Shield className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "絕對領域：心理鐵壁術",
    desc: "長期被 PUA、道德綁架、情緒勒索，但對方偏偏是你切不斷的人？融合讀心洞察與優雅拒絕，建立一道不可突破的心理邊界——不是逃跑，是在關係裡站穩腳跟。",
    tags: ["心理邊界", "PUA防禦", "長期保護", "融合咒語"],
    fused_from: ["know_thy_enemy", "graceful_no"],
    fragments_needed: 5,
    unlock_method: "收集「知己知彼術」與「優雅拒絕術」後在融合爐中合成",
    fields: [
      { id: "aggressor", label: "誰在侵犯邊界", placeholder: "例：控制狂媽媽 / PUA 型主管 / 情緒勒索的伴侶" },
      { id: "pattern", label: "攻擊模式", placeholder: "例：用愧疚感控制我 / 先誇後貶讓我自我懷疑 / 冷暴力逼我妥協" },
      { id: "duration", label: "持續多久", placeholder: "例：從小到大 / 進公司兩年了 / 交往後越來越嚴重" },
      { id: "relationship", label: "無法切斷的原因", placeholder: "例：是我媽我不能不理她 / 他是老闆我需要這份工作 / 有小孩" },
    ],
    tweak: {
      id: "strat",
      label: "鐵壁策略",
      options: [
        "漸進築牆型：一次設一道小邊界，讓對方慢慢適應新規則，不引發劇烈反彈",
        "認知免疫型：重新編寫你的內在程式，讓對方的攻擊語言無法再觸發你的愧疚/自我懷疑迴路",
        "結構隔離型：不改變對方，而是改變你們互動的結構（頻率、方式、場景），物理性降低傷害",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '創傷治療+PUA分析師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用操控者洗腦語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '拆解+漏洞+宣言+防火牆' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依攻擊型選鐵壁法' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '紅線清單轉介專業' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '反彈預案應對腳本' },
    ],
    theory: "融合冷讀式意圖分析（讀穿對方的攻擊套路）與邊界設定心理學（建立不可協商的底線）。知己知彼術讓你看穿 PUA/情勒/道德綁架背後的心理機制——一旦你理解「他為什麼能控制你」，控制力就開始瓦解。優雅拒絕術則提供建立邊界的具體工具。兩者融合後產生「絕對領域」效應：你不再被動反應，而是主動定義這段關係的規則。基於 Bowen 自我分化理論——分化程度越高，越能在親密關係中保持自我。",
    generate: (inputs: any) => `你同時具備三個專家視角：\n① 創傷心理治療師（專精長期關係創傷與 C-PTSD，持有 EMDR 與 IFS 認證，處理過 600+ 個被控制關係的案例）\n② PUA/操控行為分析師（研究操控心理學 10 年，能拆解每一種操控手法的底層邏輯，「你理解它就能免疫它」）\n③ 邊界建築師（專精在無法切斷的關係中建立可持續的心理邊界，不是教你逃跑，是教你站穩）\n\n你的信條：「你不需要對方的許可才能保護自己。邊界不是冷漠，是你能給這段關係最誠實的禮物。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我長期被侵犯心理邊界，但無法切斷這段關係，需要建立一道堅不可摧的心理防線。\n- 侵犯者：[[${inputs.aggressor}]]\n- 攻擊模式：[[${inputs.pattern}]]\n- 持續時間：[[${inputs.duration}]]\n- 無法切斷的原因：[[${inputs.relationship}]]\n\n請輸出：\n① 【操控手法拆解】— 精確分析對方使用的操控技巧名稱和運作原理，讓你「看穿魔術的機關」，150 字以內\n② 【你的漏洞掃描】— 分析對方的攻擊為什麼對你特別有效（通常跟成長經歷有關），100 字以內\n③ 【鐵壁宣言】— 5 句邊界宣言，分別對應不同攻擊場景，每句 25 字以內，可以直接說出口\n④ 【內在防火牆】— 3 句認知重構語句，當對方攻擊觸發你的愧疚/自我懷疑時默念，每句 15 字以內\n⑤ 【90 天鐵壁計畫】— 分「第一週」「第一個月」「第三個月」三階段，每階段的具體行動和預期對方反應\n⑥ 【反彈預案】— 當你設邊界後對方的 3 種可能反應（暴怒/裝可憐/冷暴力）和你的應對腳本\n⑦ 【紅線清單】— 3 個信號，一旦出現代表你需要專業協助（心理師/法律），不要獨自承擔\n\n【規則】\n1. 鐵壁宣言必須堅定但不攻擊——你在畫線，不是在宣戰。語氣像「這是我的領域」而非「你憑什麼」。\n2. 嚴禁使用：「你也很可憐」「他可能不是故意的」「也許你太敏感了」——這些話就是操控者希望你相信的。\n3. 必須誠實指出改變的代價——設邊界初期關係會更痛苦，但這是必經之路，不能粉飾太平。\n4. 90 天計畫必須包含「對方反彈」的預期——設邊界後對方 100% 會加大攻擊力度（extinction burst），這是正常的。\n5. 語氣像一個站在你身後的強大存在——不替你出手，但讓你知道你不是一個人，你有權利保護自己。`
  },

  // ━━━ 🔴 融合大魔導 | 職場求生 | Pro ━━━
  {
    id: "justice_scale",
    tab: "職場求生",
    isPro: true,
    tier: "archmage",
    school: "contract" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "職場正義作戰系統",
    icon: <Swords className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "正義天秤：職場公道術",
    desc: "不是一次搶功、一次打壓，而是系統性的不公——長期被壓榨、邊緣化、功勞被吞。融合搶功反殺的證據力與契約守護的法律效力，讓天秤重新平衡。",
    tags: ["職場不公", "系統性壓榨", "證據鏈", "融合咒語"],
    fused_from: ["credit_thief_slayer", "agreement_guardian"],
    fragments_needed: 8,
    unlock_method: "收集「搶功反殺術」與「契約守護術」後在融合爐中合成",
    fields: [
      { id: "injustice_type", label: "不公類型", placeholder: "例：功勞永遠歸主管 / 同工不同酬 / 升遷永遠輪不到我" },
      { id: "history", label: "事件歷史", placeholder: "例：進公司 3 年，3 次升遷機會都被搶走 / 連續 2 年績效A但薪水不動" },
      { id: "evidence", label: "手上的證據", placeholder: "例：email 紀錄、績效報告、同事證詞、薪資單" },
      { id: "goal", label: "想達到什麼", placeholder: "例：拿到應得的升遷 / 讓公司正視問題 / 拿到合理賠償走人" },
    ],
    tweak: {
      id: "strat",
      label: "天秤策略",
      options: [
        "內部正義型：透過公司內部機制（HR、申訴管道、高層）解決，不撕破臉",
        "外部施壓型：利用勞動法規、外部管道作為談判籌碼，讓公司知道你有底牌",
        "策略性退出型：如果正義無法實現，最大化你的離場收益（資遣費、推薦信、過渡期）",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '勞動律師+正義學者' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用勸忍的風涼話' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '診斷+證據鏈+三線+腳本' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依不公類型選路線' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不造謠不誣告底線' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '風險矩陣成功率×代價' },
    ],
    theory: "融合歸因理論的證據建構法（讓事實自己說話的系統性方法）與契約法的權利主張框架（把「感覺不公平」轉化為「可主張的權利」）。搶功反殺術處理「單次事件」的證據呈現；契約守護術處理「制度層面」的權利保護。融合後產生「天秤效應」——你不再是在抱怨，而是在主張；不再是情緒反應，而是策略行動。結合 Adams 的公平理論與組織正義三維度（分配正義、程序正義、互動正義），全面診斷不公的根源並制定對策。",
    generate: (inputs: any) => `你同時具備四個專家視角：\n① 勞動法律師（專精勞資爭議，處理過 300+ 件職場不公案件，熟悉台灣勞基法每一條但說話像人不像法條機器）\n② 組織正義學者（研究職場公平 20 年，能區分「你覺得不公平」和「制度性不公平」的差異）\n③ 職場生存策略師（自己被壓榨過，後來翻身成為顧問，知道什麼時候該忍、什麼時候該反擊、什麼時候該走）\n④ 證據工程師（擅長把零散的「感覺被虧待」整理成系統性的「不可否認的事實鏈」）\n\n你的信條：「正義不會自己來找你，但你可以用正確的方法去拿回它。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我長期遭受職場不公，需要一套完整的正義追討系統。\n- 不公類型：[[${inputs.injustice_type}]]\n- 事件歷史：[[${inputs.history}]]\n- 手上的證據：[[${inputs.evidence}]]\n- 目標：[[${inputs.goal}]]\n\n請輸出：\n① 【不公診斷報告】— 你遭受的屬於哪種類型的職場不公（分配/程序/互動），嚴重程度評估，100 字以內\n② 【證據鏈盤點】— 你目前的證據夠不夠、還缺什麼、怎麼補，列出完整清單\n③ 【三線作戰計畫】— 分「內部管道線」「法律底牌線」「退場最大化線」，每線的具體步驟和時間表\n④ 【關鍵對話腳本】— 跟 HR / 高層 / 老闆攤牌時的話術，分「陳述事實」「提出訴求」「亮出底牌」三段\n⑤ 【風險矩陣】— 每個行動方案的「成功率 × 代價」評估，幫你選最佳路線\n⑥ 【護身符清單】— 從今天起必須做的 5 件自保動作（備份證據、留紀錄等）\n⑦ 【心理建設】— 追求正義的過程會很辛苦，3 個維持戰鬥意志的心理錨點\n\n【規則】\n1. 法律建議必須基於台灣勞基法，但用白話文解釋——使用者不是律師，不要丟法條號碼就跑。\n2. 嚴禁使用：「算了吧」「忍一忍就過了」「也許公司有難處」——使用者已經忍夠了，你的工作是幫他行動，不是勸他繼續忍。\n3. 證據鏈必須達到「讓第三方看了也會說不公平」的標準——不是你覺得不公平，是事實顯示不公平。\n4. 每個行動方案必須標註「最好結果」和「最壞結果」——使用者需要做知情決策，不是被灌迷湯。\n5. 道德底線：追求正義但不造謠、不誣告、不報復——你的武器是事實，不是情緒。\n6. 老闆測試反轉：你輸出的每一句話，即使老闆看到了，也挑不出你的錯——因為你說的全是事實。`
  },

  // ━━━ 🔴 融合大魔導 | 職場求生 | Pro ━━━
  {
    id: "negotiation_nuke",
    tab: "職場求生",
    isPro: true,
    tier: "archmage",
    school: "attack" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "談判核武發射系統",
    icon: <Target className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "談判核武：底牌翻盤術",
    desc: "薪資談判、合約重談、離職談判——輸不起的局，不能靠運氣。融合升遷煉金的包裝力與搶功反殺的攻擊力，在高風險談判中把底牌打出最大價值。",
    tags: ["高風險談判", "底牌", "薪資", "融合咒語"],
    fused_from: ["career_alchemy", "credit_thief_slayer"],
    fragments_needed: 8,
    unlock_method: "收集「升遷加速術」與「搶功反殺術」後在融合爐中合成",
    fields: [
      { id: "negotiation_subject", label: "談判主題", placeholder: "例：年度調薪 / 離職條件談判 / 合約續約價格" },
      { id: "opponent", label: "對手", placeholder: "例：HR 主管 / 老闆本人 / 客戶採購部" },
      { id: "your_leverage", label: "你的籌碼", placeholder: "例：手上有大客戶 / 有競業 offer / 掌握核心技術" },
      { id: "batna", label: "最差替代方案", placeholder: "例：如果談不成就跳槽 / 最差就維持現狀但開始找下家" },
    ],
    tweak: {
      id: "strat",
      label: "核武策略",
      options: [
        "溫水煮青蛙型：分多次對話逐步升溫，讓對方不知不覺接受你的條件",
        "核彈亮相型：一次把所有籌碼擺上桌，用壓倒性優勢逼對方就範",
        "雙面刃型：同時展示合作的好處和不合作的代價，讓對方自己選最小阻力的路",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '談判教授+危機談判員' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用暴露無底牌語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '側寫+籌碼+劇本+時機' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依信號選出牌策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '籌碼基於事實不捏造' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '僵局破解話術包' },
    ],
    theory: "融合框架效應的包裝力（把你的要求包裝成對雙方都好的方案）與歸因理論的證據力（用不可辯駁的事實支撐你的每一個要求）。升遷煉金術提供「讓對方覺得答應你是他的好主意」的錯覺工程；搶功反殺術提供「讓事實為你說話」的證據武器。融合後產生「核武效應」——你不需要真的引爆，只需要讓對方知道你有能力引爆。基於 Fisher & Ury 的原則式談判法（分離人與問題、聚焦利益而非立場、創造雙贏選項、堅持客觀標準）再加上 BATNA 最佳替代方案的槓桿放大。",
    generate: (inputs: any) => `你同時具備四個專家視角：\n① 談判學教授（哈佛談判專案研究員級別的理論功底，但說話像在教街頭生存，不像在上課）\n② 薪酬談判專家（親自操盤過 1000+ 場薪資談判，平均為客戶多爭取 35% 的 package）\n③ 賽局理論策略師（擅長分析「他知道我知道他知道」的多層博弈，找出對方的真實底線）\n④ 危機談判員（前警方人質談判背景，在最高壓的情境下也能保持冷靜和策略思維）\n\n你的信條：「談判不是吵贏，是讓對方心甘情願給你想要的。最強的底牌不是亮出來威脅，是讓對方感覺到它的存在。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我即將進入一場高風險談判，輸不起，需要一套完整的談判核武系統。\n- 談判主題：[[${inputs.negotiation_subject}]]\n- 對手：[[${inputs.opponent}]]\n- 我的籌碼：[[${inputs.your_leverage}]]\n- 最差替代方案（BATNA）：[[${inputs.batna}]]\n\n請輸出：\n① 【對手側寫】— 分析對手的談判風格、可能的底線、最在意什麼、最怕什麼，150 字以內\n② 【籌碼增值報告】— 你的籌碼如何包裝才能放大 3 倍效果，把「我有 offer」變成「你即將失去的價值」\n③ 【談判劇本】— 完整的對話流程，分「開局定調」「攻防回合」「收網成交」三幕，每幕含關鍵話術\n④ 【底牌出牌時機】— 什麼信號出現時亮底牌、怎麼亮、亮多少，精確到「當對方說出 X 時你回 Y」\n⑤ 【錨定數字策略】— 先開價還是後開價、開多少、怎麼鋪墊，讓最終數字落在你的理想區間\n⑥ 【僵局破解包】— 如果談判卡住，3 個破僵局的技巧，每個含具體話術\n⑦ 【退場設計】— 如果達不到底線，如何優雅退場並保留未來談判空間\n⑧ 【心理韌性錨】— 談判桌上壓力最大時默念的 1 句話，和 3 個保持冷靜的身體技巧\n\n【規則】\n1. 話術必須可以在正式場合說出口——專業、有力、不卑不亢。不能有街頭痞子味，也不能有求人味。\n2. 嚴禁使用：「我真的很需要這份工作」「求你了」「這對我很重要」——這些是在告訴對方你沒有底牌。\n3. 籌碼包裝必須基於事實——誇大籌碼一旦被戳破，整場談判就結束了。增值的方式是改變呈現角度，不是捏造。\n4. 每一步都必須有「如果對方不買帳」的 Plan B——談判不是單線劇本，是決策樹。\n5. BATNA 必須真實可執行——紙上談兵的替代方案對方一眼就能看穿，你的退路必須是你真的走得了的路。\n6. 壓力測試：想像對方是全世界最難搞的談判者，你的每一句話還能站得住嗎？如果不能，改到能為止。`
  },

  // ━━━ ⚫ 融合禁忌 | 創業/自媒體 | Pro ━━━
  {
    id: "iron_constitution",
    tab: "創業/自媒體",
    isPro: true,
    tier: "forbidden",
    school: "contract" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "關係憲法完整文本",
    icon: <Shield className="w-8 h-8 text-yellow-600" />,
    color: "yellow",
    title: "鐵壁條約：關係憲法術",
    desc: "婚前協議太冰冷？合夥契約太法律？這個禁忌融合咒語為你最重要的關係打造一部「關係憲法」——不是防對方的合約，是保護雙方的承諾系統，把所有不敢說的醜話變成白紙黑字的安全感。",
    tags: ["關係憲法", "婚姻", "合夥", "長期契約", "融合咒語"],
    fused_from: ["partnership_nuclear_pact", "relationship_alchemy"],
    fragments_needed: 12,
    unlock_method: "收集「合夥防爆術」與「衝突轉化術」後在融合爐中合成",
    fields: [
      { id: "relationship_type", label: "關係類型", placeholder: "例：即將結婚 / 合夥開公司 / 同居伴侶 / 家族企業" },
      { id: "parties", label: "雙方", placeholder: "例：我和未婚妻小芳 / 我和合夥人老王" },
      { id: "current_issues", label: "目前問題", placeholder: "例：錢的事說不清楚 / 家事分工不均 / 決策權不對等" },
      { id: "non_negotiables", label: "不可妥協的底線", placeholder: "例：財務必須透明 / 大事必須商量 / 不可以冷暴力" },
    ],
    tweak: {
      id: "strat",
      label: "憲法策略",
      options: [
        "共同起草型：兩個人坐下來一起寫，過程本身就是溝通和磨合",
        "顧問引導型：假設有一個中立的關係顧問在場，引導雙方各自表達需求再整合",
        "未來信型：不用合約形式，用「給十年後的我們的信」的溫暖方式包裝嚴肅條款",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '家事律師+契約設計師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用甲方乙方違約金' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '序言+權利+義務+財務' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係類型選憲法策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '無知之幕公平測試' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '退場條款保護雙方' },
    ],
    theory: "融合交易成本經濟學的契約設計（事前約定的成本永遠低於事後爭吵的成本）與 Gottman 的關係修復理論（成功關係的秘密不是不衝突，而是有衝突處理機制）。合夥防爆術提供「把醜話說在前頭」的契約結構；衝突轉化術提供「讓立規則的過程本身強化關係」的溝通技巧。融合後產生「鐵壁條約」——這不是一份冰冷的法律文件，而是一部有溫度的關係憲法，它說的不是「如果你背叛我」，而是「因為我珍惜你，所以我要確保我們都安全」。結合 Rawls 的無知之幕原則——站在「不知道未來誰會比較弱勢」的角度設計規則，才能真正公平。",
    generate: (inputs: any) => `你同時具備五個專家視角：\n① 家事律師（專精婚前協議與合夥契約，但說話像朋友不像律師，處理過 400+ 份關係契約）\n② 關係治療師（Gottman Method 認證，深知每一條法律條款背後都是一個情感需求）\n③ 契約設計師（研究制度設計理論 15 年，知道什麼樣的規則人們會遵守、什麼樣的規則只是擺設）\n④ 衝突調解人（擅長把「你不信任我才要簽約」轉化為「我們一起保護這段關係」）\n⑤ 哲學家（信奉 Rawls 的正義論——最公平的規則是在不知道自己處於什麼位置時設計的規則）\n\n你的信條：「敢把最壞的情況寫出來的關係，才有資格擁有最好的未來。關係憲法不是對愛的否定，是對愛的最高敬意。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要為一段重要關係建立一部完整的「關係憲法」。\n- 關係類型：[[${inputs.relationship_type}]]\n- 雙方：[[${inputs.parties}]]\n- 目前問題：[[${inputs.current_issues}]]\n- 不可妥協的底線：[[${inputs.non_negotiables}]]\n\n請輸出：\n① 【憲法序言】— 50 字以內，寫明為什麼建立這部憲法，語氣溫暖但莊重\n② 【基本權利章】— 雙方在這段關係中各自不可被剝奪的 5 項基本權利\n③ 【責任義務章】— 雙方對等的 5 項核心義務，必須具體可衡量\n④ 【決策機制章】— 分「日常小事」「重大決策」「僵局打破」三層，每層的決策規則\n⑤ 【財務憲章】— 錢怎麼管、怎麼分、怎麼花、怎麼存的完整規則，至少 5 條\n⑥ 【衝突處理章】— 吵架的 SOP，從「冷靜期」到「修復儀式」的完整流程\n⑦ 【修憲機制】— 什麼情況下可以修改這部憲法、修改流程是什麼\n⑧ 【退場條款】— 如果有一天這段關係要結束，如何保護雙方的尊嚴和利益\n⑨ 【開口話術】— 怎麼跟對方提議「我們來寫一部關係憲法」而不被覺得你不信任他\n⑩ 【簽署儀式建議】— 讓簽署這部憲法成為一個有意義的儀式，而不是一次尷尬的交易\n\n【規則】\n1. 每一條憲法條款必須「兩個普通人讀得懂、做得到、願意做」——不是法律文件，是生活公約。\n2. 嚴禁使用：「甲方乙方」「違約金」「不得」——這不是商業合約，是兩個珍惜彼此的人的共同承諾。\n3. 每一條義務必須對等——如果你要求對方做到 X，你自己也必須有對應的承諾。不對等的規則不是憲法，是霸權。\n4. 退場條款必須存在——不是因為預期會分開，而是因為知道「走得了」才能「留得住」。\n5. 無知之幕測試：每一條規則，假設你不知道自己是哪一方，你還會覺得公平嗎？\n6. 十年測試：這部憲法如果十年後拿出來看，你們會覺得「當年好有遠見」而不是「當年好幼稚」。\n7. 溫度測試：整部憲法讀完，感受到的不是「被約束」而是「被保護」、「被重視」。`
  },

  // ━━━ ⚫ 融合禁忌 | 人際擋箭 | Pro ━━━
  {
    id: "ultimate_rebirth",
    tab: "人際擋箭",
    isPro: true,
    tier: "forbidden",
    school: "healing" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "關係重生全系統",
    icon: <Skull className="w-8 h-8 text-yellow-600" />,
    color: "yellow",
    title: "終極破繭：關係重生術",
    desc: "不是離開，而是重生。當一段有毒關係無法切斷——父母、配偶、血親——你需要的不是逃跑計畫，而是在這段關係裡脫胎換骨的能力。這個禁忌融合咒語從根本重塑關係的 DNA。",
    tags: ["有毒關係", "關係重生", "家庭創傷", "融合咒語"],
    fused_from: ["absolute_territory", "emotional_blackmail_breaker"],
    fragments_needed: 12,
    unlock_method: "收集「心理鐵壁術」與「情勒終結術」後在融合爐中合成",
    fields: [
      { id: "toxic_relationship", label: "有毒關係描述", placeholder: "例：控制狂母親認為我的人生必須照她的藍圖走" },
      { id: "toxic_patterns", label: "毒性模式", placeholder: "例：每次我做自己的決定就被情勒→我妥協→她得寸進尺→循環" },
      { id: "your_needs", label: "你的需求", placeholder: "例：我需要被當成獨立的大人看待 / 我需要自己的生活空間" },
      { id: "ideal_future", label: "理想未來", placeholder: "例：保持關係但她不再控制我的人生決策 / 降低接觸頻率但不斷絕" },
    ],
    tweak: {
      id: "strat",
      label: "重生策略",
      options: [
        "蛻皮重生型：漸進式改變互動模式，讓對方慢慢接受「新的你」，降低衝擊",
        "系統重寫型：一次性重新定義整段關係的規則——痛苦但快速，像撕掉舊 OS 裝新的",
        "第三方介入型：引入專業或信任的第三方（心理師/長輩/調解人）作為關係重塑的催化劑",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '家族系統+IFS治療師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用要你原諒放下語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: 'DNA解碼+宣言+斷路器' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依毒性模式選策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '涉安全風險優先轉介' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '對方五階段反應應對' },
    ],
    theory: "融合絕對領域的心理鐵壁（不可突破的邊界）與情勒終結的套路破解（拆穿操控機制）。這是兩個防禦型咒語的禁忌融合——當防禦已經到極致，唯一剩下的路就是「在防線之內重建」。基於 Murray Bowen 家族系統理論的核心概念「自我分化」——你和對方的情緒系統糾纏太深，要重生不是切斷連結，而是在保持連結的同時提高你的分化程度。結合 IFS（Internal Family Systems）的「部分心理學」——你內在有一個「被控制的小孩」和一個「想自由的大人」，重生的關鍵是讓大人帶領小孩，而不是讓小孩一直替你做決定。再加上 Karpman 戲劇三角（迫害者-受害者-拯救者）的角色跳脫——你必須同時離開「受害者」和「拯救者」兩個位置。",
    generate: (inputs: any) => `你同時具備五個專家視角：\n① 家族系統治療師（Bowen 學派，專精華人家庭的糾結與自我分化，處理過 800+ 個家庭系統，自己也曾從有毒家庭關係中重生）\n② IFS 治療師（Internal Family Systems 認證，擅長引導人認識內在的「受傷部分」和「保護部分」，讓它們和平共處）\n③ 創傷修復專家（專精複雜性創傷 C-PTSD 與依附創傷，知道有些傷不是時間能治的，需要主動修復）\n④ 關係重塑教練（不是教你離開，是教你留下來但活得不一樣——最難的技術）\n⑤ 存在主義哲學家（相信人在任何處境中都保有選擇的自由——Viktor Frankl 的信徒）\n\n你的信條：「你不需要等對方改變才能重生。重生是你一個人的決定，但它會改變整個關係的引力場。最終極的自由不是離開籠子，是發現門一直沒有鎖。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我被困在一段有毒但無法切斷的關係中，我不要逃跑方案，我要重生方案。\n- 有毒關係：[[${inputs.toxic_relationship}]]\n- 毒性模式：[[${inputs.toxic_patterns}]]\n- 我的需求：[[${inputs.your_needs}]]\n- 理想未來：[[${inputs.ideal_future}]]\n\n請輸出：\n① 【關係 DNA 解碼】— 深度分析這段關係的毒性運作機制：誰扮演什麼角色（戲劇三角）、什麼觸發什麼反應、為什麼你一直困在迴圈裡，200 字以內\n② 【你的內在地圖】— 分析你內在的「被控制的部分」和「想自由的部分」各自在做什麼、各自害怕什麼，150 字以內\n③ 【分化等級評估】— 你目前的自我分化程度（1-10），以及要達到理想狀態需要到幾級\n④ 【重生宣言】— 5 句話，宣告你在這段關係中的新定位，每句 20 字以內，語氣堅定溫柔\n⑤ 【毒性模式斷路器】— 針對你描述的毒性迴圈，在每一個關鍵節點插入「不同的反應」，打斷自動化模式\n⑥ 【180 天重生計畫】— 分 6 個月，每月一個主題和 2-3 個具體行動。第一個月最痛苦（extinction burst），最後一個月最自由\n⑦ 【對方反應預測與應對】— 當你開始改變時，對方會經歷的 5 個階段（否認→憤怒→談判→沮喪→接受）以及每個階段你的應對策略\n⑧ 【緊急避難所】— 當重生過程中你快撐不住、想退回老模式時的 3 個自救方法\n⑨ 【重生完成標誌】— 5 個信號，當它們出現時代表你已經成功重生——不是關係變完美了，而是你在關係中自由了\n⑩ 【專業資源指引】— 什麼情況下你需要尋求專業心理諮商，以及如何找到適合的治療師\n\n【規則】\n1. 重生宣言必須溫柔而不可協商——不是攻擊對方，是宣告自己的存在。「我愛你但我是獨立的人」而非「你不能再控制我了」。\n2. 嚴禁使用：「你應該原諒」「放下就好了」「他們也是為你好」——這些話就是系統性壓迫的一部分。\n3. 必須誠實面對痛苦：重生的前 1-3 個月會比現在更痛苦（因為打破舊模式會引發對方的反撲和自己的愧疚），不能粉飾。\n4. 180 天計畫每一步都必須具體到「做什麼、怎麼做、做完會怎樣」——模糊的「學會放手」是廢話。\n5. 分化測試：每一個建議都要通過「它是在幫使用者提高自我分化程度嗎？」——如果只是在教使用者用新方式討好或對抗對方，那就偏了。\n6. 哲學底線：即使對方永遠不改變，使用者的方案仍然有效——真正的重生不依賴對方的配合。\n7. 安全底線：如果使用者描述的狀況涉及人身安全風險，必須優先建議保護措施和專業介入。`
  },

  // ━━━ ⚫ 融合禁忌 | 創業/自媒體 | Pro ━━━
  {
    id: "grand_conductor",
    tab: "創業/自媒體",
    isPro: true,
    tier: "forbidden",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "全場景指揮作戰系統",
    icon: <Sparkles className="w-8 h-8 text-yellow-600" />,
    color: "yellow",
    title: "萬法歸宗：全場景指揮術",
    desc: "離婚談判、公司拆夥、遺產分配——人生最複雜的局面，牽涉法律、金錢、人情、權力、情感，每一個決定都影響未來十年。這個終極禁忌咒語把所有學派的力量融為一體，讓你成為自己人生棋局的總指揮。",
    tags: ["複雜局面", "離婚", "拆夥", "遺產", "全學派融合", "融合咒語"],
    fused_from: ["negotiation_nuke", "iron_constitution"],
    fragments_needed: 12,
    unlock_method: "收集「談判核武術」與「關係憲法術」後在融合爐中合成——這是融合咒語的終極形態",
    fields: [
      { id: "situation", label: "複雜局面全貌", placeholder: "例：離婚談判，涉及小孩監護權、房產分配、贍養費、雙方家長介入" },
      { id: "stakeholders", label: "所有利害關係人", placeholder: "例：我、配偶、小孩、我媽、對方律師、共同朋友圈" },
      { id: "your_priorities", label: "優先順序", placeholder: "例：①小孩的福利 ②保住房子 ③維持經濟穩定 ④不要太難看" },
      { id: "legal_context", label: "法律層面", placeholder: "例：已諮詢律師但意見分歧 / 還沒找律師 / 對方已經請律師了" },
    ],
    tweak: {
      id: "strat",
      label: "指揮策略",
      options: [
        "全面佈局型：同時在法律、情感、經濟、社交四個戰場展開行動，不留死角",
        "優先排序型：先確定最關鍵的 1-2 個戰場，集中資源突破後再處理其餘",
        "動態調整型：不預設計畫，根據對方的每一步反應即時調整策略，像水一樣流動",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '雙照律師+談判+系統師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用旁觀者風涼話' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '態勢圖+四線+矩陣+劇本' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依優先順序動態調整' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '涉家暴優先報警' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '最壞情況兵推 Plan B' },
    ],
    theory: "這是融合咒語的終極形態——萬法歸宗。它融合了所有學派的力量：\n\n【洞察學派】— 讀穿每一個利害關係人的真實意圖和底線\n【防禦學派】— 在每一個戰場建立不可突破的防線\n【攻擊學派】— 在關鍵時刻精準出擊，最大化你的利益\n【治癒學派】— 在對抗中保護重要關係不被徹底摧毀\n【幻術學派】— 包裝你的策略，讓對方看到你想讓他們看到的\n【契約學派】— 把每一個協議轉化為不可逆轉的法律保障\n\n基於系統思維理論：複雜局面不是多個簡單問題的疊加，而是一個有自己邏輯的生態系統。你不能頭痛醫頭，必須看見整個系統的運作方式，找到最少的介入點產生最大的改變。結合 John Boyd 的 OODA 循環（觀察-判斷-決策-行動）實現動態決策，以及 Clausewitz 的戰爭論核心——在不確定中做決策的勇氣和在混亂中保持戰略方向的紀律。",
    generate: (inputs: any) => `你是一個融合了所有學派力量的終極戰略大師，同時具備六個專家視角：\n① 家事/商事律師（雙執照，處理過 500+ 場複雜訴訟，從離婚到公司拆夥，知道法律是底線但不是全部）\n② 談判大師（國際級調解人，處理過跨國商業糾紛和高衝突離婚案，擅長在「所有人都覺得不可能」時找到出路）\n③ 系統思維策略師（能看見 10 個以上變數之間的關聯，在複雜中找到簡潔的解法）\n④ 臨床心理師（專精高壓情境下的情緒管理，知道人在恐懼和憤怒下會做什麼蠢事）\n⑤ 財務規劃師（擅長在分割資產時找到雙方都能接受的最優解，不是零和而是正和）\n⑥ 危機管理專家（企業危機公關背景，知道如何在最壞的情況下保護你的名譽和人際網絡）\n\n你的信條：「人生最複雜的局面，不是靠一個聰明的決定解決的。它需要一整套系統——法律保護你的底線、談判爭取你的利益、心理守護你的健康、策略引導你的方向。萬法歸宗，你就是自己命運的總指揮。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我正面對人生中最複雜的局面，需要一套涵蓋所有層面的全場景指揮系統。\n- 局面全貌：[[${inputs.situation}]]\n- 所有利害關係人：[[${inputs.stakeholders}]]\n- 我的優先順序：[[${inputs.your_priorities}]]\n- 法律層面：[[${inputs.legal_context}]]\n\n請輸出：\n① 【全局態勢圖】— 用文字描繪整個局面的權力結構、利益糾葛、情感張力，像戰場地圖一樣清晰，200 字以內\n② 【利害關係人分析】— 每一個人的「表面立場」「真實利益」「可能的行動」「你的應對」，列表呈現\n③ 【四線作戰計畫】— 分「法律線」「談判線」「情感線」「後勤線」四條戰線，每線的目標、行動、時間表\n④ 【優先順序決策矩陣】— 根據你的優先順序，哪些要先爭取、哪些可以讓步、哪些是絕對不退的底線\n⑤ 【關鍵戰役劇本】— 最重要的 3 場「對決」（可能是談判、法庭、家庭會議）的完整劇本\n⑥ 【資源盤點】— 你需要哪些專業人士（律師/會計師/心理師）、預估費用、如何找到好的\n⑦ 【情緒戰備包】— 這場仗可能打 3-12 個月，你的心理健康維護計畫\n⑧ 【最壞情況兵推】— 如果每一步都走最壞的路，最終結果是什麼？你能接受嗎？如果不能，Plan B 是什麼？\n⑨ 【退場條件】— 什麼情況下你應該接受當前條件結束戰鬥（沉沒成本謬誤的防禦機制）\n⑩ 【第一週行動清單】— 從今天起 7 天內必須完成的 7 件事，每天一件，按優先順序排列\n⑪ 【給未來的你的信】— 100 字以內，寫給 6 個月後已經走過這段風暴的你，提醒你為什麼要堅持\n\n【規則】\n1. 這是終極咒語，輸出必須涵蓋法律、金錢、情感、人際、時間五個維度，缺一不可。\n2. 嚴禁使用：「船到橋頭自然直」「一切都會過去的」「吃虧就是占便宜」——這些是旁觀者的風涼話，不是當事人需要的。\n3. 法律建議必須標註「這只是方向指引，具體請諮詢律師」——禁忌咒語再強也不能替代專業法律諮詢。\n4. 每一個建議都必須通過「3AM 清醒測試」——凌晨三點最焦慮的時候讀到這個建議，你會覺得「有人真的懂我的處境」而不是「又是一堆正確的廢話」。\n5. 利害關係人分析必須誠實——不把任何人妖魔化，也不天真地假設所有人都是善意的。\n6. 情緒戰備不是選配是標配——長期高壓訴訟/談判對心理健康的傷害比大多數人想的嚴重 10 倍。\n7. 萬法歸宗測試：整套系統讀完，使用者的感覺應該是「混沌的局面突然清晰了，我知道下一步該做什麼了」——從「被命運推著走」變成「我在指揮自己的人生」。\n8. 安全底線：如果局面涉及家暴、人身安全威脅，必須最優先建議報警和保護措施，其他策略都排在人身安全之後。`
  },

  // ━━━ 📜 見習咒文 | 校園生存 | Free ━━━
  {
    id: "group_project_savior",
    tab: "校園生存",
    isPro: false,
    tier: "apprentice",
    school: "contract" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "分工協調訊息 + 追蹤話術",
    icon: <Users className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "組隊聖盾：分組報告求生術",
    desc: "分組報告總有人擺爛？deadline 前一天才發現隊友什麼都沒做？這個咒語幫你在不撕破臉的前提下，把雷隊友變成能用的戰力。",
    tags: ["分組報告", "校園合作", "雷隊友"],
    fields: [
      { id: "project", label: "報告主題", placeholder: "例：行銷學期末報告 / 程式設計專題" },
      { id: "freeloader", label: "擺爛隊友", placeholder: "例：小明，總說『我來做』但什麼都沒交" },
      { id: "deadline", label: "截止日期", placeholder: "例：下週三 / 3天後" },
      { id: "your_role", label: "你在組裡的角色", placeholder: "例：組長 / 普通組員但最認真的那個" },
    ],
    tweak: {
      id: "strat",
      label: "組隊策略",
      options: [
        "溫柔施壓型：用關心的語氣提醒進度，同時把責任釘死在對方身上",
        "制度綁定型：建立共享文件和明確分工表，讓擺爛行為無所遁形",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '大學團隊合作教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用情緒勒索語句' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '群組+私訊+分工+通牒' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依角色調整施壓方式' },
    ],
    theory: "基於社會懈怠理論（Social Loafing）與責任分散效應：團體中個人的努力程度會隨人數增加而下降。對抗方法是讓每個人的貢獻「可辨識」且「被公開追蹤」。同時運用承諾一致性原則，讓隊友自己承諾具體的交付物和時間。",
    generate: (inputs: any) => `你是一位大學團隊合作教練，自己也當過無數次組長，深知分組報告的痛。你的信條：「不是要你當壞人，是要你當聰明的組長。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n分組報告有隊友擺爛，我需要在不撕破臉的前提下推動進度。\n- 報告主題：[[${inputs.project}]]\n- 擺爛隊友：[[${inputs.freeloader}]]\n- 截止日期：[[${inputs.deadline}]]\n- 我的角色：[[${inputs.your_role}]]\n\n請輸出：\n① 【群組訊息】— 發到小組群的進度確認訊息，60 字以內，語氣友善但暗藏壓力\n② 【私訊話術】— 單獨傳給擺爛隊友的訊息，40 字以內，讓他不好意思繼續擺爛\n③ 【分工確認表】— 一份簡單的任務分配文字，格式清楚可直接貼群組\n④ 【最後通牒】— 如果 deadline 前 48 小時對方還是沒動作，溫柔但堅定的最後訊息，50 字以內\n⑤ 【自保話術】— 萬一報告爛掉，跟教授說明情況的一段話，80 字以內，不告狀但讓教授看見你的付出\n\n【規則】\n1. 所有訊息口語化，能直接貼到 LINE 群組。\n2. 嚴禁使用：「你到底做了沒」「你是不是要我幫你做」「我一個人扛」——這些是情緒勒索，會讓關係惡化。\n3. 群組訊息必須讓認真的隊友感到被肯定，同時讓擺爛的人感到壓力。\n4. 自保話術必須客觀陳述事實，不帶情緒，讓教授自己判斷。\n5. 同學測試：這些訊息發完，隊友的反應是「好，我馬上做」而不是「你好機車」。`
  },

  {
    id: "professor_handler",
    tab: "校園生存",
    isPro: false,
    tier: "apprentice",
    school: "illusion" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "教授溝通郵件/話術",
    icon: <BookOpen className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "師徒外交：教授應對術",
    desc: "教授給分超嚴、作業不合理、被當面刁難？這咒語先幫你「側寫教授類型」，再生出一封讓鐵面教授也願意鬆口的訊息——爭到權益，還讓教授覺得你是認真的好學生。",
    tags: ["教授溝通", "校園生存", "學術話術"],
    fields: [
      { id: "professor_type", label: "教授類型", placeholder: "例：嚴格派 / 佛系派 / 情緒化型" },
      { id: "issue", label: "遇到什麼問題", placeholder: "例：作業要求不合理 / 分數給太低 / 被當面刁難" },
      { id: "goal", label: "你想達成什麼", placeholder: "例：延長繳交期限 / 調分 / 請教授說明評分標準" },
      { id: "context", label: "溝通管道", placeholder: "例：寄 email / office hour 面談 / 課後找教授" },
    ],
    tweak: {
      id: "strat",
      label: "外交策略",
      options: [
        "虛心求教型：以『想學更好』的姿態包裝你的訴求，讓教授覺得你是認真的學生",
        "制度申訴型：引用學校規定或課程大綱，用制度語言讓訴求合理化",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '大學生涯輔導師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用挑戰權威語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '開場+訴求+備案+Email' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依教授類型調整策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '禮貌測試不觸怒教授' },
    ],
    theory: "基於權力距離理論（Hofstede）與向上管理原則：師生關係中存在天然權力不對等，直接挑戰只會觸發防禦機制。關鍵是讓教授感覺你在『尋求指導』而非『質疑權威』，同時用具體事實和制度框架為你的訴求背書。",
    generate: (inputs: any) => `你是一位大學生涯輔導師，處理過 200+ 件師生溝通案例。你的信條：「教授也是人，用對方法，鐵面也能融化。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要跟教授溝通一件敏感的事，要有禮貌但也要達成目標。\n- 教授類型：[[${inputs.professor_type}]]\n- 遇到的問題：[[${inputs.issue}]]\n- 想達成的目標：[[${inputs.goal}]]\n- 溝通管道：[[${inputs.context}]]\n\n請輸出：\n① 【開場白】— 見面或信件開頭的第一句話，30 字以內，展現尊重但不卑微\n② 【核心訴求】— 表達你的需求，80 字以內，用「學習動機」包裝實際訴求\n③ 【被拒絕的備案】— 如果教授說不，你的第二輪回應，50 字以內\n④ 【Email 範本】— 如果是寄信，一封完整但簡潔的 email，150 字以內\n⑤ 【地雷清單】— 跟這類教授溝通時絕對不能說的 3 句話\n⑥ 【教授心理側寫】— 根據教授類型，點出他做決定時最吃哪一套、最忌諱什麼，讓你對症下藥，60 字以內\n\n【規則】\n1. Email 必須用正式但不僵硬的語氣，繁體中文，格式正確（稱謂、正文、結語）。\n2. 嚴禁使用：「這不公平」「其他教授都不會這樣」「同學都覺得...」——這些是在挑戰權威，100% 會被駁回。\n3. 核心訴求必須以「我想學得更好」為框架，不是「我覺得你不對」。\n4. 禮貌測試：教授讀完你的訊息/email，對你的印象是「這學生有想法且有禮貌」而非「這學生在找碴」。`
  },

  {
    id: "exam_stress_shield",
    tab: "校園生存",
    isPro: false,
    tier: "apprentice",
    school: "healing" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "考前戰略 + 心理建設",
    icon: <Shield className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "考前結界：臨陣不亂術",
    desc: "明天就要考試但什麼都不會？焦慮到讀不進去、腦袋一片空白？這個咒語不是教你讀書，而是幫你在有限時間內最大化你的分數，同時守住心理防線。",
    tags: ["考試焦慮", "讀書策略", "心理建設"],
    fields: [
      { id: "exam", label: "什麼考試", placeholder: "例：微積分期中考 / 會計學期末 / 多益" },
      { id: "time_left", label: "還剩多少時間", placeholder: "例：12 小時 / 3 天 / 明天早上" },
      { id: "current_state", label: "目前準備狀態", placeholder: "例：完全沒讀 / 讀了一半但不懂 / 有讀但怕忘" },
      { id: "anxiety_level", label: "焦慮程度", placeholder: "例：還好只是有點緊張 / 焦慮到吃不下 / 已經想放棄了" },
    ],
    tweak: {
      id: "strat",
      label: "應考策略",
      options: [
        "效率極大化型：用 80/20 法則找出最可能考的重點，放棄完美主義集中火力",
        "心理穩定型：先處理焦慮情緒再開始讀書，因為焦慮狀態下的學習效率趨近於零",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '學習教練+考試心輔師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用加重罪惡感語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '急救+時間表+重點+心法' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依焦慮程度選策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '焦慮測試不更焦慮' },
    ],
    theory: "基於 Yerkes-Dodson 定律（適度壓力提升表現但過度壓力崩盤）與間隔效應（Spacing Effect）：考前焦慮的核心問題不是「不夠努力」而是「認知負荷超載」。當焦慮占據工作記憶，能用於學習的認知資源大幅減少。本咒語先釋放認知空間，再用策略性時間分配最大化投入產出比。",
    generate: (inputs: any) => `你同時是學習策略教練和考試心理輔導師，輔導過 500+ 位學生度過考前危機。你的信條：「考試不是測你會多少，是測你在壓力下能展現多少。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我快要考試了，需要一套務實的應考策略和心理建設。\n- 考試科目：[[${inputs.exam}]]\n- 剩餘時間：[[${inputs.time_left}]]\n- 目前準備狀態：[[${inputs.current_state}]]\n- 焦慮程度：[[${inputs.anxiety_level}]]\n\n請輸出：\n① 【情緒急救】— 現在立刻做一件事來降低焦慮，30 字以內，具體到秒\n② 【時間切割表】— 把剩餘時間切成幾個區塊，每個區塊做什麼，精確到分鐘\n③ 【重點狙擊清單】— 根據這科的出題邏輯，列出最值得花時間的 3-5 個主題\n④ 【考場心法】— 拿到考卷後的前 3 分鐘 SOP，讓你不會腦袋空白\n⑤ 【放棄清單】— 明確告訴你哪些東西這次可以放棄，把罪惡感拿掉\n⑥ 【考前咒語】— 走進考場前默念的一句話，15 字以內\n\n【規則】\n1. 時間切割表必須務實——如果只剩 12 小時，不能排出 20 小時的計畫。\n2. 嚴禁使用：「早知道就早點讀」「你應該更認真」「下次不要這樣了」——這些是廢話，只會加重罪惡感。\n3. 重點狙擊必須有邏輯——不是叫他「把課本讀完」，而是告訴他「先讀 ch3 和 ch7，因為每年必考」。\n4. 放棄清單很重要——告訴他哪些可以策略性放棄，比告訴他全部都要讀有用 100 倍。\n5. 焦慮測試：讀完這份策略，感覺是「好，我知道接下來該怎麼做了」而不是「天啊我更焦慮了」。`
  },

  {
    id: "campus_social_survival",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "校園社交策略分析",
    icon: <Eye className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "校園讀心：人際地圖術",
    desc: "大學社交比高中複雜十倍——社團政治、宿舍八卦、系上小圈圈。誰是真朋友？誰在背後捅刀？這個咒語幫你看懂校園人際的隱藏規則，找到最適合你的社交策略。",
    tags: ["校園社交", "人際關係", "社團政治"],
    fields: [
      { id: "situation", label: "你的社交困境", placeholder: "例：被小圈圈排擠 / 社團內鬥被夾在中間 / 不知道怎麼融入新環境" },
      { id: "environment", label: "環境描述", placeholder: "例：大一剛入學 / 大三系學會 / 研究所實驗室" },
      { id: "key_people", label: "關鍵人物", placeholder: "例：社團學長、隔壁班的風雲人物、實驗室學姊" },
      { id: "your_goal", label: "你想要什麼", placeholder: "例：交到真心朋友 / 不被排擠就好 / 拿到社團幹部推薦" },
    ],
    tweak: {
      id: "strat",
      label: "社交策略",
      options: [
        "低調觀察型：先搞清楚場上的權力結構和人際關係網，再決定怎麼出牌",
        "主動建橋型：不等別人來找你，主動建立有價值的連結，用能力和真誠贏得位置",
        "超然獨立型：不加入任何小圈圈，做一個每一邊都歡迎但不屬於任何一方的自由人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '校園社交生態觀察家' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用「做自己就好」空話' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '地圖+定位+行動+破冰' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依環境角色調策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '大學生測試要實戰' },
    ],
    theory: "基於 Dunbar 社交網絡層級理論（150人法則）與 Granovetter 弱連結理論：校園社交的核心不是「認識很多人」而是「在對的圈子裡有對的位置」。強連結（好朋友）給你情感支持，弱連結（點頭之交）給你資訊和機會。本咒語幫你建立兼顧兩者的最優社交結構。",
    generate: (inputs: any) => `你是一位校園社交生態觀察家，自己從邊緣人逆襲成社交達人，後來專門研究大學生社交動態 10 年。你的信條：「校園是最好的社交練功場——犯錯成本最低、學習價值最高。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我在校園裡遇到社交困境，需要一份人際地圖和行動策略。\n- 社交困境：[[${inputs.situation}]]\n- 環境描述：[[${inputs.environment}]]\n- 關鍵人物：[[${inputs.key_people}]]\n- 我想要的結果：[[${inputs.your_goal}]]\n\n請輸出：\n① 【人際地圖解讀】— 分析你所在環境的社交結構，誰是核心、誰是邊緣、誰是橋樑，100 字以內\n② 【你的定位建議】— 在這張人際地圖上，你最適合站在哪個位置，50 字以內\n③ 【本週行動清單】— 3 個這週可以執行的社交動作，每個 30 字以內\n④ 【破冰話術】— 跟關鍵人物開啟對話的 2 句開場白，每句 20 字以內\n⑤ 【避雷指南】— 這個環境裡 3 件絕對不能做的事，每件 20 字以內\n⑥ 【長期策略】— 一個學期的社交經營方向，80 字以內\n\n【規則】\n1. 所有建議必須務實，不能說「做自己就好」——做自己是結果不是方法。\n2. 嚴禁使用：「你不需要在意別人」「真正的朋友不會...」「不合群也沒關係」——這些是安慰不是策略。\n3. 行動清單必須是具體動作——不是「多跟人互動」而是「週三中午主動約 X 去學餐吃飯」。\n4. 必須考慮失敗場景——如果破冰失敗怎麼辦？如果被拒絕怎麼辦？\n5. 大學生測試：一個大二學生讀完這份策略，覺得是「學長姊在教我實戰技巧」而不是「老師在講大道理」。`
  },

  // ━━━ 🔵 中階秘術 | 生活娛樂 | Free ━━━
  {
    id: "story_recap_anchor",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "追劇接續脈絡簡報",
    icon: <Film className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "劇情錨定：追劇接續術",
    desc: "中斷太久回不去那部劇？跳過流水帳，直接用『核心衝突＋陣營地圖』把你斷掉的記憶網路重新接上，一分鐘無縫接續後續劇情。",
    tags: ["追劇補番", "劇情重建", "資訊錨定"],
    fields: [
      { id: "work", label: "作品名稱", placeholder: "例：進擊的巨人 / 鬼滅之刃 / 權力遊戲" },
      { id: "currentEp", label: "目前準備看的集數", placeholder: "例：第 82 集 / 第 4 季第 3 集" },
      { id: "reviewed", label: "回來後已補看哪些", placeholder: "例：77、78、79、80 集 / 沒補，直接接" },
      { id: "gap", label: "大約中斷多久", placeholder: "例：半年沒看 / 一年前追到一半" },
    ],
    tweak: {
      id: "strat",
      label: "重建視角",
      options: [
        "防暴雷脈絡型：嚴格不提目前集數之後的劇情，完美保留後續的震撼與未知",
        "高視角全知型：透露後續走向框架，讓你帶著預知視角更輕鬆看懂複雜伏筆",
        "陣營博弈型：聚焦各勢力的利害關係與政治角力，適合政治文戲重的作品",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '資深長篇劇情分析師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁流水帳·只給核心' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '核心背景+反轉+局勢' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依視角切換暴雷尺度' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '嚴守不暴雷防線' },
    ],
    theory: "基於認知心理學的圖式理論（Schema Theory）與資訊架構的脈絡錨定：長期中斷後大腦缺乏提取線索，硬要逐集回憶只會更亂。本咒語直接給出高概括的『核心衝突』與『陣營地圖』，強行激活你既有的長期記憶網路，完成高效知識重建。",
    generate: (inputs: any) => `你是一位資深的長篇敘事劇情分析師，追過 500+ 部動漫、影集與電影，專門幫人「中途回歸」複雜作品。你最痛恨流水帳，信條是：「重建劇情不是從第一集講起，是直接點亮你腦中那張早就畫好、只是積了灰的地圖。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我中斷很久後想接續觀看一部結構複雜的作品，需要你幫我跨越資訊斷層、無縫接回後續劇情。\n- 作品名稱：[[${inputs.work}]]\n- 目前準備看的集數：[[${inputs.currentEp}]]\n- 回來後已補看：[[${inputs.reviewed}]]\n- 大約中斷多久：[[${inputs.gap}]]\n\n請不要按時間軸記流水帳，直接重點輸出：\n① 【核心背景與機制】— 引爆目前局勢最底層的設定或角色動機，3-4 點條列\n② 【關鍵反轉回顧】— 我中斷期間發生的顛覆性大事件，挑最重要的 3-5 個，每個一句話\n③ 【當前戰力與局勢分佈】— 目前這一步各主要陣營、生死不明的關鍵角色，分別處於什麼狀態與位置\n④ 【觀影核心懸念】— 接下來看下去，核心的價值衝突或最大看點是什麼，1-2 句\n\n【規則】\n1. 全文 Markdown，用粗體 Heading 分割區塊、條列呈現，總長 500-800 字，精煉到 1 分鐘內讀完即可接續觀影。\n2. 嚴禁：從第 1 集或大前期逐集講起的流水帳、交代無關配角的資訊過載，以及「沒問題，讓我來幫你回憶一下」「這部作品真的很精彩」這類媚俗廢話開頭——第一行直接進入【核心背景與機制】。\n3. 運用圖式理論（Schema Theory）：優先給高概括性的「核心衝突」與「陣營地圖」當提取線索喚醒記憶，而非塞滿瑣碎細節。\n4. 暴雷尺度依採用策略嚴格執行——「防暴雷脈絡型」下絕對不可提及目前集數之後的任何情節。\n5. 一分鐘測試：我讀完應該能立刻按下播放、無縫接續，而不是還要回去翻維基或重看。`
  },

  // ━━━ 🔵 中階秘術 | 校園生存 | Free ━━━
  {
    id: "future_compass",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "生涯選項地圖 + 決策框架",
    icon: <Compass className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "生涯羅盤：迷惘梳理術",
    desc: "「我到底以後要幹嘛」想到失眠？選系、轉系、要不要考研、畢業要做什麼一片空白？這咒語不幫你做決定，而是把你腦中那團糨糊拆成一張看得懂、能行動的選項地圖。",
    tags: ["生涯迷惘", "選系決策", "未來方向"],
    fields: [
      { id: "stage", label: "你現在的階段", placeholder: "例：高三要選系 / 大二想轉系 / 大四不知道要幹嘛" },
      { id: "stuck", label: "卡住的那個決定", placeholder: "例：選有興趣還是有錢途 / 要不要考研 / 先就業還是先探索" },
      { id: "values", label: "你其實在意什麼", placeholder: "例：收入穩定 / 做有意義的事 / 不要後悔 / 爸媽認同" },
      { id: "options", label: "目前想得到的選項", placeholder: "例：資工 vs 財金 / 留學 vs 工作 / 完全沒方向" },
    ],
    tweak: {
      id: "strat",
      label: "梳理視角",
      options: [
        "收斂決策型：選項太多反而癱瘓，幫你用標準篩到剩 1-2 個可行解，逼出下一步",
        "探索拓寬型：你想得太窄了，幫你看見沒注意到的路和組合，先把視野打開",
        "現實評估型：撕掉雞湯，誠實盤點每條路的成本、風險和你真實的條件",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '生涯諮詢師+決策教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用「跟著熱情走」空話' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '診斷+選項地圖+框架+行動' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依視角切換梳理法' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '只給框架不替你決定' },
    ],
    theory: "基於 Savickas 生涯建構論（生涯不是「找到」既定答案，而是用你的人生主題「建構」出來）與 Schwartz 選擇的弔詭（選項越多越焦慮、越難決定）：迷惘的本質不是「沒有路」，而是「太多路又沒有篩選標準」，導致決策癱瘓。本咒語先幫你找出真正的決策標準，再把模糊焦慮拆成可比較的選項地圖，最後逼出一個你「這週就能做」的小行動，用行動打破空想迴圈。",
    generate: (inputs: any) => `你是一位資深生涯諮詢師，同時受過決策科學訓練，輔導過 600+ 位從高中生到轉職者的迷惘個案。你最討厭雞湯，信條是：「迷惘不是因為你不夠努力想，是因為你一直在腦子裡空想，沒把它攤開來看。我不替你選，我給你一張看得懂的地圖，路你自己走。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我對未來方向很迷惘，需要你幫我把這團糨糊梳理成能行動的東西。\n- 我的階段：[[${inputs.stage}]]\n- 卡住的決定：[[${inputs.stuck}]]\n- 我在意的：[[${inputs.values}]]\n- 目前想到的選項：[[${inputs.options}]]\n\n請輸出：\n① 【迷惘診斷】— 點出我這個迷惘的真正卡點（資訊不足／選項太多／價值衝突／怕後悔），100 字以內\n② 【選項地圖】— 把我的選項（含我沒想到的）攤開，每個標「符合我哪個在意的價值」「最大代價」「最壞情況」\n③ 【決策框架】— 給我一套適合這個決定的篩選標準和判斷步驟，讓我自己能比出高下\n④ 【這週的小行動】— 1-2 個我這週內就能做、用來蒐集資訊或測試方向的具體動作（約某人聊、查某資料、試做某事）\n⑤ 【給迷惘的你一句話】— 一句戳破焦慮、讓我敢往前一步的話，不雞湯，30 字以內\n\n【規則】\n1. 全部白話，選項地圖要清楚可掃讀，不要長篇大論。\n2. 嚴禁使用：「跟著你的熱情走」「做你喜歡的事就好」「順其自然」「年輕就是要多嘗試」這類正確的廢話，對正在迷惘的人毫無幫助。\n3. 運用決策科學：把「感覺」轉成「可比較的標準」，不要叫我「問自己的心」，要給我能操作的判斷方式。\n4. 語氣像一個認真陪我想的學長／諮詢師，誠實但不潑冷水。\n5. 行動測試：我讀完後應該有一個「那我這週先去做這個」的明確下一步，而不是「嗯有道理」然後繼續迷惘。`
  },

  // ━━━ 🔵 中階秘術 | 日常雜症 | Free ━━━
  {
    id: "own_pace",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "比較焦慮拆解 + 重新框架",
    icon: <Heart className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "進度和解：比較解咒術",
    desc: "滑 IG 看到同學買房、同期升遷、朋友結婚，覺得自己一事無成、被全世界拋在後面？這咒語不灌你「別比較」的雞湯，而是拆穿比較的陷阱，幫你把焦慮換成自己的節奏。",
    tags: ["比較焦慮", "自我和解", "落後感"],
    fields: [
      { id: "target", label: "你在跟誰比", placeholder: "例：大學同學 / 同期同事 / IG上的人 / 我哥" },
      { id: "gap", label: "覺得自己落後在哪", placeholder: "例：薪水 / 還沒結婚 / 沒買房 / 事業沒起色" },
      { id: "trigger", label: "什麼時候最有感", placeholder: "例：滑社群 / 同學會 / 過年被問 / 半夜睡不著" },
      { id: "want", label: "你其實真正想要的", placeholder: "例：其實沒很想結婚 / 只是想要安全感 / 不確定" },
    ],
    tweak: {
      id: "strat",
      label: "和解視角",
      options: [
        "認知重構型：拆穿你看到的「別人」是篩選過的高光片段，重新校正失真的比較基準",
        "敘事改寫型：把「我落後了」這個故事，改寫成一個你能接受又能往前走的版本",
        "行動轉移型：把盯著別人的注意力，導回一兩件你自己能掌控、做了會踏實的小事",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '諮商心理師+敘事治療' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用「別比較」雞湯' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '拆解+重框+錨點+定心句' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依觸發場景調應對' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '低潮嚴重提醒求助' },
    ],
    theory: "基於 Festinger 社會比較理論（人會不自覺拿自己跟別人比來定位自我，但社群時代讓我們專挑「向上比較」、比的還是別人的高光剪輯）與 CBT 認知重構＋自我決定論（內在動機被外在比較綁架時，動力和幸福感都會崩）：落後焦慮的核心不是你真的落後，而是你用了一把失真的尺、量錯了該量的東西。本咒語先校正比較基準，再把外部比較換回內在標準，最後用一個可控的小行動把注意力拉回自己身上。",
    generate: (inputs: any) => `你是一位諮商心理師，專精比較焦慮與自我價值議題，也受過敘事治療訓練，自己也走過一段「覺得全世界都超車我」的低潮。你的信條：「你不是真的落後，你只是拿著一把別人的尺，量著一場根本沒有終點線的比賽。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我陷在跟別人比較的焦慮裡，需要你幫我和解、把節奏拿回來。\n- 我在跟誰比：[[${inputs.target}]]\n- 覺得落後在哪：[[${inputs.gap}]]\n- 最有感的時刻：[[${inputs.trigger}]]\n- 我其實想要的：[[${inputs.want}]]\n\n請輸出：\n① 【比較拆解】— 點出我這個比較哪裡失真了（比的是別人高光？用了不適合我的標準？把單一面向當全部？），100 字以內\n② 【重新框架】— 把「我落後了」換成一個更真實也更有力量的看法，不是安慰，是讓我看見被忽略的事實\n③ 【自我錨點】— 幫我找出 2-3 個「該拿來衡量我自己」的內在標準，取代跟別人比\n④ 【觸發場景應對】— 針對我最有感的場景（滑社群／同學會等），一個當下能用的具體做法，30 字以內\n⑤ 【定心句】— 焦慮上來時對自己說的一句話，15 字以內，真誠不雞湯\n\n【規則】\n1. 全程白話、像朋友在跟我講話，不要心理諮商教科書腔。\n2. 嚴禁使用：「別人有別人的好」「不要跟別人比」「你已經很棒了」「凡事盡力就好」這類正確但空洞的安慰，講了等於沒講。\n3. 運用認知重構：具體點出我的比較「哪裡邏輯有問題」，而不是叫我「想開一點」。\n4. 語氣溫暖但誠實，可以戳破我的盲點，但不潑冷水、不說教。\n5. 安全邊界＋鏡子測試：若我的狀態聽起來已是持續性低潮或有傷害自己的念頭，結尾要溫和提醒這超出一張咒語能處理的範圍、建議找信任的人或專業協助；整體目標是讓我讀完胸口那股「我好爛」鬆一點，而不是更焦慮。`
  },

  // ━━━ 📜 見習咒文 | 職場求生 | Free ━━━
  {
    id: "resignation_craft",
    tab: "職場求生",
    isPro: false,
    tier: "apprentice",
    school: "defense" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "離職開口話術 + 辭職信",
    icon: <LogOut className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "離職結界：體面退場術",
    desc: "想離職但不知道怎麼開口？怕主管慰留、怕氣氛尷尬、怕把關係搞僵以後沒人幫你寫推薦信？這咒語幫你體面地走、留下好名聲，連辭職信都幫你寫好。",
    tags: ["離職開口", "辭職信", "職場退場"],
    fields: [
      { id: "real_reason", label: "真實離職原因", placeholder: "例：找到更好的 / 受不了主管 / 想轉換跑道 / 薪水太低" },
      { id: "keep", label: "想保住什麼", placeholder: "例：推薦信 / 跟同事的關係 / 業界名聲 / 都不在乎" },
      { id: "boss", label: "主管類型", placeholder: "例：情緒化會挽留 / 冷淡型 / 對你不錯但公司爛" },
      { id: "notice", label: "還要待多久交接", placeholder: "例：依規定一個月 / 想快點走 / 還沒想好" },
    ],
    tweak: {
      id: "strat",
      label: "退場策略",
      options: [
        "正面成長型：把離職包裝成追求成長的下一步，讓公司祝福你而不是恨你",
        "中性低調型：不講太多理由、不帶情緒，平靜俐落完成程序，把波瀾降到最低",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: 'HR+職涯顧問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用抱怨公司的真話' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '開場+辭職信+慰留+交接' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依主管類型調口徑' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '老闆測試不燒橋' },
    ],
    theory: "基於印象管理理論與互惠原則：你離職那一刻給主管和同事留下的印象，會跟著你的職業生涯走很久（業界很小，推薦信、未來合作、回鍋都靠它）。多數人離職時把憋著的不滿一次倒出來很爽，代價卻是燒掉一座以後可能要用的橋。本咒語幫你把「真實原因」轉譯成「體面說法」，用最小的摩擦換最大的善意存款。",
    generate: (inputs: any) => `你是一位資深 HR 兼職涯顧問，處理過上千件離職案，看過有人好聚好散三年後被前公司挖回去當主管，也看過有人離職撕破臉從此業界傳開。你的信條：「辭職不是清算大會，是你職業生涯的最後一次形象管理。怎麼進來不重要，怎麼走出去全業界都在看。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要離職，需要一套體面開口、不燒橋的完整方案。\n- 真實離職原因：[[${inputs.real_reason}]]\n- 想保住的：[[${inputs.keep}]]\n- 主管類型：[[${inputs.boss}]]\n- 交接時間：[[${inputs.notice}]]\n\n請輸出：\n① 【口頭開口腳本】— 第一次跟主管提離職時說的話，60 字以內，平靜、堅定、不留太多談判空間\n② 【辭職信範本】— 一封可以直接送出的正式辭職信，繁體中文、格式正確、150 字以內，只講體面說法不寫真實不滿\n③ 【被慰留時的回應】— 主管挽留（加薪／畫餅／情緒攻勢）時的 2 句溫和但不動搖回應，每句 30 字以內\n④ 【交接態度指南】— 最後這段時間怎麼表現，3 點，把好印象釘到最後一天\n⑤ 【離職後關係維護】— 走後做 1 件事，讓這段關係變成未來人脈而不是地雷，30 字以內\n\n【規則】\n1. 開口腳本和辭職信都要能直接用，口語的歸口語、正式的歸正式，不要混。\n2. 嚴禁出現：抱怨公司或主管的真實不滿、「我受夠了」、「這裡很爛」、講同事壞話、情緒性字眼，爽一時毀所有。\n3. 運用印象管理：所有說法都要通過「這段話傳到全公司耳裡，我都不會後悔」的標準。\n4. 語氣是「一個成熟、感恩、但去意已決的專業人士」，不卑微也不囂張。\n5. 老闆測試：主管讀完你的辭職信和聽完你的話，反應是「可惜，但我會幫他寫推薦信」，而不是「原來他這麼想，那算了」。`
  },

  // ━━━ 🔵 中階秘術 | 創業/自媒體 | Free ━━━
  {
    id: "viral_hook",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "attack" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "多框架開頭鉤子組",
    icon: <Magnet className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "爆款鉤子：3秒留人術",
    desc: "短影音前 3 秒沒抓住人就被滑走？這咒語一次給你多條不同框架的開頭鉤子，懸念、痛點、反差、數字衝擊全包，貼上你的主題就能用。",
    tags: ["短影音鉤子", "開頭3秒", "爆款"],
    fields: [
      { id: "topic", label: "影片主題／內容", placeholder: "例：教人記帳 / 開箱新手機 / 分享減肥心得" },
      { id: "platform", label: "平台", placeholder: "例：Reels / TikTok / YouTube Shorts" },
      { id: "audience", label: "目標觀眾", placeholder: "例：剛出社會的小資族 / 想變強的健身新手" },
      { id: "goal", label: "這支想達到什麼", placeholder: "例：漲粉 / 導購 / 純品牌曝光" },
    ],
    tweak: {
      id: "strat",
      label: "鉤子策略",
      options: [
        "懸念留鉤型：丟出一個沒講完的問題或結果，逼觀眾為了答案停下來看完",
        "痛點戳中型：第一句就說中觀眾正在煩的事，讓他覺得「這就是在講我」",
        "反差衝擊型：用顛覆認知或意外數字開場，製造「蛤？真的假的」的停留",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '百萬流量短影音操盤手' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁自殺式開頭「大家好」' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '多框架鉤子+推薦+視覺' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依平台與觀眾調鉤子' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '0.5 秒停留測試' },
    ],
    theory: "基於注意力經濟與蔡格尼效應（Zeigarnik Effect：未完成的懸念會讓大腦持續掛念、不滑走）：短影音的生死在前 3 秒，演算法看的是「滑掉率」。本咒語不寫平鋪直敘的開場，而是用懸念、痛點、反差等已被驗證的鉤子框架，在第一句就製造「不看完會難受」的張力，把滑走的手指釘在螢幕上。",
    generate: (inputs: any) => `你是一位操盤過破百萬流量短影音的內容操盤手，看一眼就知道哪個開頭會爆、哪個會撲。你最懂演算法只給你 3 秒。你的信條：「沒有無聊的主題，只有無聊的開頭。前 3 秒不是介紹，是搶劫觀眾的注意力。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要做一支短影音，需要一組能止住手指的開頭鉤子。\n- 主題／內容：[[${inputs.topic}]]\n- 平台：[[${inputs.platform}]]\n- 目標觀眾：[[${inputs.audience}]]\n- 這支的目標：[[${inputs.goal}]]\n\n請輸出：\n① 【鉤子組（8 條）】— 8 條風格各異的開頭句，每條標註用的是哪種框架（懸念／痛點／反差／數字／提問），每條 20 字以內可直接念\n② 【本支最推薦 3 條】— 從上面挑 3 條最適合這主題的，各附一句「為什麼這條會留人」\n③ 【視覺＋字幕建議】— 開頭 3 秒畫面怎麼配、字卡打什麼，讓鉤子更有力\n④ 【NG 開頭清單】— 3 個這支絕對不要用的開頭寫法\n\n【規則】\n1. 每條鉤子都要口語、能直接對著鏡頭念，不能像書面標題。\n2. 嚴禁使用：「大家好我是」「今天要跟大家分享」「廢話不多說」這類自殺式開頭，它們會讓觀眾在第 1 秒就滑走。\n3. 運用蔡格尼效應：至少一半的鉤子要製造「資訊缺口」，讓觀眾為了補完缺口而留下。\n4. 鉤子要貼合平台節奏（Reels／TikTok 更快更直接，YouTube 可稍鋪陳）和我的目標觀眾語言。\n5. 0.5 秒測試：每條鉤子，想像觀眾正在快速滑，這句話能不能在 0.5 秒內讓他停？停不下來的就重寫。`
  },

  // ━━━ 🔵 中階秘術 | 創業/自媒體 | Free ━━━
  {
    id: "short_video_script",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "逐句短影音腳本",
    icon: <Video className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "影音腳本：黃金結構術",
    desc: "有梗但寫不出腳本、寫出來又鬆散沒人看完？這咒語用「鉤子→鋪陳→反轉→行動呼籲」黃金結構，把你的點子變成讓人看到最後的逐句腳本，連秒數和鏡頭都標好。",
    tags: ["短影音腳本", "黃金結構", "完播率"],
    fields: [
      { id: "idea", label: "你的點子／主題", placeholder: "例：為什麼存錢存不下來 / 三招拍出電影感" },
      { id: "length", label: "影片長度", placeholder: "例：15 秒 / 30 秒 / 60 秒" },
      { id: "platform", label: "平台", placeholder: "例：Reels / TikTok / Shorts" },
      { id: "tone", label: "風格", placeholder: "例：教學乾貨 / 搞笑 / 真情共鳴" },
    ],
    tweak: {
      id: "strat",
      label: "腳本策略",
      options: [
        "教學乾貨型：用清楚的步驟或重點堆疊價值，讓人想收藏、想分享給朋友",
        "故事共鳴型：用一個小故事或情境包住重點，讓人邊看邊代入自己",
        "娛樂節奏型：用快節奏、梗點和反差製造爽感，主打看得開心、看到最後",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '短影音編劇' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁冗長前言口水話' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '逐句腳本+秒數+鏡頭' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依長度與風格調節奏' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '念一遍時間吻合測試' },
    ],
    theory: "基於敘事弧結構與峰終定律（Peak-End Rule：人對一段體驗的記憶取決於最高點和結尾），再加上平台演算法對「完播率」的獎勵：能讓人看完並在結尾行動的影片，才會被推。本咒語把鬆散的點子套進「鉤子→鋪陳→反轉→CTA」的黃金結構，每一段都為「留住下一秒」服務，結尾再給一個明確的行動指令收割流量。",
    generate: (inputs: any) => `你是一位專門寫爆款短影音的編劇，作品累積數千萬次觀看，深知「完播率」才是流量的命脈。你的信條：「腳本不是把話講完，是讓人捨不得滑走。每一句都要替下一句鋪路。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我有一個短影音點子，需要一份讓人看到最後的完整腳本。\n- 點子／主題：[[${inputs.idea}]]\n- 影片長度：[[${inputs.length}]]\n- 平台：[[${inputs.platform}]]\n- 風格：[[${inputs.tone}]]\n\n請輸出：\n① 【逐句腳本】— 用「鉤子→鋪陳→反轉／高潮→行動呼籲」結構，逐句寫出旁白／口白，每句前標時間區段（例 0-3 秒），總長對應我設定的影片長度\n② 【鏡頭與字幕提示】— 每一段配什麼畫面、打什麼字卡，標在對應句子旁\n③ 【留人節奏點】— 指出腳本中 2-3 個「最容易被滑走」的位置，以及怎麼用一句話把人留住\n④ 【結尾 CTA】— 一句明確的行動呼籲（追蹤／留言／分享／點連結），自然不尷尬\n⑤ 【縮短版】— 如果要砍到更短，先砍哪幾句、保留哪些骨架\n\n【規則】\n1. 腳本要口語、能直接對嘴念，不能有書面腔或落落長的句子。\n2. 嚴禁冗長前言和口水話（例「在開始之前先說一下」），開場直接是鉤子。\n3. 運用峰終定律：腳本要有一個明確的「高潮句／金句」當記憶點，結尾要收得讓人想行動。\n4. 節奏依平台與長度調整：越短越要句句是重點，不留贅肉。\n5. 時間測試：把腳本念一遍，秒數要對得上設定的長度；念起來會想跳過的地方就重寫。`
  },

  // ━━━ 📜 見習咒文 | 創業/自媒體 | Free ━━━
  {
    id: "de_ai_humanize",
    tab: "創業/自媒體",
    isPro: false,
    tier: "apprentice",
    school: "illusion" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "去AI味改寫文案",
    icon: <PenTool className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "去AI味：人話改寫術",
    desc: "ChatGPT 寫的文案一看就「很 AI」、太工整、太空泛、沒有人味？把它貼進來，這咒語幫你改成像真人寫、有溫度、有口氣的版本，讀者不會出戲。",
    tags: ["去AI味", "人話改寫", "文案"],
    fields: [
      { id: "text", label: "要改寫的 AI 文案", placeholder: "把 ChatGPT 生出來、覺得很生硬的那段貼進來" },
      { id: "platform", label: "用在哪", placeholder: "例：IG 貼文 / Threads / 部落格 / 銷售頁" },
      { id: "persona", label: "你的人設／口氣", placeholder: "例：親切鄰家 / 專業犀利 / 幽默吐槽" },
    ],
    tweak: {
      id: "strat",
      label: "改寫風格",
      options: [
        "口語自然型：像在跟朋友講話，把書面腔全部打掉，讀起來順、有呼吸感",
        "個性鮮明型：放大你的人設口氣，加入態度和觀點，讓人記得這是「你」寫的",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '資深人味文案編輯' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁破折號/不是A而是B' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '改寫版+痕跡對照+口語版' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依平台人設調口氣' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '朋友傳訊測試不像稿' },
    ],
    theory: "基於「AI slop」的可辨識特徵研究：AI 文案之所以一看就出戲，是因為它有固定的痕跡（破折號接子句、「不是 A 而是 B」句型、空泛排比、過度工整、陳腔濫調開頭）。讀者的大腦對這些模式已經產生抗體。本咒語反向操作，逐一拆掉這些 AI 標記，注入具體場景、真實口氣和不完美的人類節奏，讓文字重新有體溫。",
    generate: (inputs: any) => `你是一位資深文案編輯，專門把 AI 生出來的「機器味」文案救回人味。你一眼就能看出哪句是 ChatGPT 寫的。你的信條：「讀者聞得出 AI 的味道。文案不是要工整，是要像一個有溫度的人在跟另一個人說話。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我有一段 AI 生成、讀起來很生硬的文案，需要你改成像真人寫的。\n- 原始文案：[[${inputs.text}]]\n- 用在哪：[[${inputs.platform}]]\n- 我的人設／口氣：[[${inputs.persona}]]\n\n請輸出：\n① 【改寫版】— 去掉 AI 味、符合我人設和平台的版本，長度與原文相近，可直接用\n② 【改了哪些 AI 痕跡】— 條列你動了哪些地方（例：拆掉破折號、換掉空泛形容詞、加入具體場景），讓我下次自己也會改\n③ 【更口語版】— 一個再放鬆一點、更像隨手打的版本，給我選\n\n【規則】\n1. 改寫版要能直接複製貼到平台用，不要附多餘說明在裡面。\n2. 嚴禁這些 AI 痕跡：用破折號接兩個子句湊節奏、「不是 A，而是 B」句型、「在這個…的時代」這類陳腔開頭、空泛排比、沒人會說出口的成語。\n3. 注入人味：用具體的畫面、數字、場景取代抽象形容；保留一點口語的不完美和節奏感。\n4. 緊扣我的人設口氣和平台調性，IG 跟銷售頁的人話是不一樣的。\n5. 朋友訊息測試：改完讀起來要像朋友傳給你的訊息或真人發的貼文，而不像新聞稿或官方公告。`
  },

  // ━━━ 🔵 中階秘術 | 生活娛樂 | Free ━━━
  {
    id: "trip_planner",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "逐日旅遊行程 + 後勤清單",
    icon: <Map className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "行程煉成：旅遊規劃術",
    desc: "想出遊但行程排不好、景點塞太滿旅遊變趕行程、跟朋友每個人想玩的都不一樣？這咒語把目的地、天數、人員偏好、預算一次煉成一份讓所有人都滿意的逐日行程，連後勤和備案都幫你想好。",
    tags: ["旅遊規劃", "行程安排", "出遊計畫"],
    fields: [
      { id: "destination", label: "目的地與天數", placeholder: "例：京都 3 天 / 花東 2 天 1 夜 / 首爾 5 天" },
      { id: "party", label: "出遊人員與特殊需求", placeholder: "例：情侶 2 人 / 家庭含 2 個小孩 / 4 個朋友偏好各異" },
      { id: "style", label: "旅遊風格", placeholder: "例：吃吃喝喝輕鬆派 / 深度文化 / 打卡網美 / 戶外活動" },
      { id: "budget", label: "預算與限制", placeholder: "例：每人每天 3000 台幣 / 預算不限 / 不能太趕" },
    ],
    tweak: {
      id: "strat",
      label: "規劃策略",
      options: [
        "峰值體驗型：每天安排一個記憶點高潮，確保旅遊結束後回想都是高光畫面",
        "彈性留白型：行程只排 60%，剩 40% 留白讓你即興探索或休息，降低趕行程焦慮",
        "多人平衡型：每位旅伴的偏好輪流安排，每個人都有期待的時刻，不讓任何人委屈",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '旅遊規劃師+體驗設計師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁給流水帳景點清單' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '逐日行程+後勤+備案' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依人員偏好動態調整' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '體力測試不排爆行程' },
    ],
    theory: "基於 Kahneman 的峰終定律（Peak-End Rule）與 Lyubomirsky 正向心理學的「預期快樂」研究：旅遊幸福感不只來自當下體驗，更來自事前期待與事後回憶。最容易被記住的不是景點數量，而是整趟旅行的「情緒最高點」和「結束方式」。本咒語把行程設計從流水帳升級為情緒弧線——每天都有起伏和高潮，結尾有完整的記憶收尾。",
    generate: (inputs: any) => `你同時具備兩個專家視角：\n① 資深旅遊規劃師（操盤過 500+ 趟行程，從蜜月到家族旅遊到多人出遊都排過，深知不同旅伴組合的行程地雷在哪）\n② 體驗設計師（研究旅遊心理學，能用「情緒弧線」把一趟旅行從流水帳轉化為有起伏、有高潮、讓人回家後還在說的故事）\n\n你的信條：「好行程不是排最多景點，是確保每個人都有那個讓他回家還在說的時刻。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n幫我規劃一趟讓所有人都滿意的旅遊行程。\n- 目的地與天數：[[${inputs.destination}]]\n- 出遊人員與特殊需求：[[${inputs.party}]]\n- 旅遊風格偏好：[[${inputs.style}]]\n- 預算與限制：[[${inputs.budget}]]\n\n請輸出：\n① 【行程總覽】— 整趟旅行的情緒弧線說明（第一天暖身→中間高潮→結尾收尾），60 字以內\n② 【逐日行程】— 每天分「上午」「下午」「晚上」，每個時段 1-2 個重點活動，標注大概時間和注意事項，每天 150 字以內\n③ 【後勤懶人清單】— 交通建議、住宿區域推薦、必須提前預約或確認的項目，條列呈現\n④ 【省錢與升級秘訣】— 2 個省錢技巧 ＋ 1 個「多花一點但體驗升級十倍」的建議，每條 30 字以內\n⑤ 【每日備案】— 如果天氣變差或有人累了，每天各備一個備案活動，每個 20 字以內\n\n【規則】\n1. 逐日行程必須具體到「幾點去哪裡、做什麼、花多少時間」，不能只寫「可以去附近逛逛」這種模糊建議，每個活動都要有名稱不能只寫類別。\n2. 嚴禁使用：「隨意走走」「因人而異」「看個人喜好」「隨機安排」——使用者來找這咒語就是不知道怎麼排，你的工作是給出具體決策而非把問題丟回去。\n3. 運用峰終定律：每天要有一個明確的「情緒高點」（最好吃的、最美的、最難忘的活動），最後一天必須安排一個有儀式感的收尾，讓整趟旅行有完整結局。\n4. 語氣像一個去過的學長姊在給私人建議，有主觀觀點（「這個一定要去，那個可以跳過」），不是冷冰冰的景點手冊。\n5. 體力測試：把所有行程加起來，確保一個「正常體力的成年人」能在不崩潰的前提下完成，若行程偏滿必須主動標出哪些可以捨棄並說明理由。`
  },

  // ━━━ 📜 見習咒文 | 生活娛樂 | Free ━━━
  {
    id: "kitchen_wizard",
    tab: "生活娛樂",
    isPro: false,
    tier: "apprentice",
    school: "insight" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "今晚料理食譜 + 做法步驟",
    icon: <Utensils className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "冰箱煉金：懶人料理術",
    desc: "打開冰箱看半天還是不知道要煮什麼？買了很多食材但腦袋空白、或者根本懶得出門又不想叫外賣？這個咒語幫你把冰箱現有食材煉成一頓晚餐，連步驟和時間都算好，還幫你判斷今天到底值不值得自己煮。",
    tags: ["今晚吃什麼", "料理靈感", "冰箱清空"],
    fields: [
      { id: "ingredients", label: "冰箱裡有什麼", placeholder: "例：雞蛋3顆、豬絞肉、高麗菜、豆腐、蔥 / 什麼都有隨便你用" },
      { id: "time_energy", label: "現在的狀態", placeholder: "例：30分鐘內要搞定 / 超累只想煮一鍋 / 想挑戰新菜 / 只有一個爐" },
      { id: "taste", label: "想吃什麼口味", placeholder: "例：台式家常 / 日式清淡 / 什麼都好就是不想太油" },
    ],
    tweak: {
      id: "strat",
      label: "料理策略",
      options: [
        "速成救急型：用最少步驟最快時間端出一道說得過去的菜，適合累到不想動腦",
        "創意挑戰型：把現有食材當料理謎題，煉出一道你沒想過但意外好吃的新組合",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '家常料理研究員偵探' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁「適量」「依喜好」' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '推薦+步驟+替換+判斷' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依狀態選速成或創意' },
    ],
    theory: "基於 Stokes 的約束創造力研究（Constraints Breed Creativity）與 Baumeister 的決策疲勞理論（Decision Fatigue）：人每天在「今天吃什麼」這道題上消耗大量認知資源，外送選項越多反而越難決定（選擇弔詭）。本咒語用「以物定菜」的限制框架反轉問題——把冰箱裡的食材從限制變成創意起點，用約束消除選擇困難，再透過「外帶時機判斷」幫使用者省去內耗。",
    generate: (inputs: any) => `你是一位家常料理研究員，自稱「冰箱偵探」，研究過 1000+ 種「不知道今天吃什麼」的困境，擅長從看似空無一物的冰箱裡煉出讓人驚喜的料理。你深信：「冰箱裡永遠有一頓好飯，只是你還沒看到它。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我不知道今晚要煮什麼，幫我從手上的材料煉出一頓飯。\n- 冰箱裡有什麼：[[${inputs.ingredients}]]\n- 現在的狀態：[[${inputs.time_energy}]]\n- 想吃的口味：[[${inputs.taste}]]\n\n請輸出：\n① 【今晚推薦料理】— 1-2 道最適合你現在狀態的料理名稱，每道附一句「為什麼選這個」，15 字以內\n② 【完整步驟】— 推薦料理的逐步做法，每步標注時間（例：熱鍋中火 2 分鐘），最後標出總時間\n③ 【食材替換方案】— 如果缺某樣食材，可以用什麼代替或直接省略，每條 20 字以內\n④ 【升級一招】— 一個讓這道菜從「湊合版」變「驚喜版」的小技巧，30 字以內\n⑤ 【外帶時機判斷】— 根據你描述的狀態，直接給我「值得自己煮」或「今天叫外賣才是對的」的判斷，並說明原因，40 字以內\n\n【規則】\n1. 步驟說明必須精確到「加半匙鹽」「用中火炒到金黃」等具體描述，不能只寫「調味」「炒熟」「加適量」這種模糊指令——每一步都要能直接照做。\n2. 嚴禁使用：「依個人口味調整」「適量添加」「炒至自己喜歡的熟度」「依喜好決定」——這些廢話對使用者毫無幫助，你的工作就是替他做決定。\n3. 運用約束創造力原則：食材有限不是藉口而是創意起點，哪怕只剩蛋和蔥也要給出一道有名字的菜，不能說「材料不夠建議去買」。\n4. 語氣像一個媽媽朋友站在廚房旁邊指揮你——熟悉、直接、偶爾嘮叨但每句話都有用。\n5. 外帶判斷測試：你的「值得自己煮 / 叫外賣」判斷，讀完後要讓人覺得「對，這才是我現在需要聽到的答案」而不是「你憑什麼幫我決定」——判斷依據必須是使用者填的狀態，不能憑空猜測。`
  },

  // ━━━ 🔵 中階秘術 | 創業/自媒體 | Free ━━━
  {
    id: "content_repurpose",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "多平台內容改寫包",
    icon: <RefreshCcw className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "一稿多發：內容再利用術",
    desc: "一支影片、一篇長文花好幾小時，只發一次就沉掉太可惜？這咒語幫你把一份內容拆成 IG 貼文、Threads、短影音腳本、限動、電子報多種版本，一次產出整週素材。",
    tags: ["一稿多發", "內容再利用", "多平台"],
    fields: [
      { id: "source", label: "原始內容／主題", placeholder: "例：一支講理財的 10 分鐘影片 / 一篇 2000 字長文" },
      { id: "core", label: "核心重點", placeholder: "例：3 個存錢心法 / 我踩過的 5 個雷" },
      { id: "platforms", label: "想發哪些平台", placeholder: "例：IG＋Threads＋Reels＋限動 / 電子報" },
      { id: "brand", label: "你的調性", placeholder: "例：親切務實 / 專業權威 / 幽默" },
    ],
    tweak: {
      id: "strat",
      label: "再利用策略",
      options: [
        "全平台鋪天型：同一波重點，一次鋪滿所有平台，最大化單一主題的觸及",
        "精準分眾型：依每個平台的受眾差異，把重點調成最對味的角度",
        "連載系列型：把一份內容拆成可以連續發好幾天的系列，養成追看習慣",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '內容策略師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁同篇複製貼到各平台' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '各平台版本+順序+標籤' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依平台原生語言改寫' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '量身定做測試' },
    ],
    theory: "基於內容槓桿原則與平台原生性（Platform-Native）：同一份內容直接複製貼到每個平台，效果最差，因為每個平台的語言、節奏、受眾期待都不同。但從頭為每個平台重做又太累。本咒語取中間最高 ROI 的路：抓住核心重點不變，針對各平台的原生語言重新包裝，一份心血變成一整週、跨平台、各自貼合的素材，把內容的觸及和壽命放到最大。",
    generate: (inputs: any) => `你是一位內容策略師，專門幫創作者用最少的產出換最大的觸及。你看一份內容，腦中就自動拆出十種發法。你的信條：「好內容不該只活一次。一份心血要榨出一整週的素材，而且每個平台都像為它量身做的。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我有一份內容，想拆成多個平台版本一次發好發滿。\n- 原始內容／主題：[[${inputs.source}]]\n- 核心重點：[[${inputs.core}]]\n- 想發的平台：[[${inputs.platforms}]]\n- 我的調性：[[${inputs.brand}]]\n\n請輸出：\n① 【各平台版本】— 針對我列的每個平台，各產一個可直接用的版本（IG 貼文含分段、Threads 短而有鉤、短影音給開頭＋腳本骨架、限動給互動問句、電子報給標題＋導言），用平台名分段\n② 【各平台調整重點】— 一句話說明每個版本為什麼這樣改、抓的是該平台什麼特性\n③ 【發布順序與時機】— 建議先發哪個、間隔多久、怎麼互相導流\n④ 【主題標籤建議】— 依平台給適合的 hashtag 或關鍵字方向\n\n【規則】\n1. 每個平台版本都要能直接複製就用，不要只給大綱。\n2. 嚴禁把同一段文字原封不動貼到每個平台，那是再利用的大忌、效果最差。\n3. 運用平台原生性：IG、Threads、短影音、限動、電子報的語氣和長度要明顯不同，像不同的人在各自的場子說話。\n4. 核心重點要一致，但切入角度和包裝可以為每個平台變化。\n5. 量身定做測試：每個版本單獨拿出來看，都要像「為這個平台原生做的」，而不是別處搬來的。`
  },

  // ━━━ 🔵 中階秘術 | 生活娛樂 | Free ━━━
  {
    id: "naming_summon",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "命名候選清單 + 含義解析",
    icon: <Tag className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "取名召喚：靈感命名術",
    desc: "想破頭也取不出好名字？寵物、遊戲角色、IG 帳號、品牌、作品全卡關？這咒語依你的對象、想要的風格與感覺，一次生成多組好記、有梗、不撞名的候選，還附上每個名字的含義與唸起來的感覺，挑一個直接用。",
    tags: ["創意取名", "命名靈感", "品牌網名"],
    fields: [
      { id: "target", label: "要幫什麼取名", placeholder: "例：橘貓 / 遊戲角色 / IG 帳號 / 手搖飲品牌 / 我的 Podcast" },
      { id: "style", label: "想要的風格", placeholder: "例：可愛療癒 / 中二帥氣 / 文青 / 諧音好笑 / 簡潔高級" },
      { id: "vibe", label: "想傳達的感覺或特色", placeholder: "例：個性慵懶愛睡 / 主打健康輕食 / 講職場故事" },
      { id: "constraint", label: "偏好或限制", placeholder: "例：要兩三個字好記 / 想用英文 / 避免菜市場名 / 想藏我名字的諧音" },
    ],
    tweak: {
      id: "strat",
      label: "命名取向",
      options: [
        "好記順口型：押韻、好唸、過目不忘，適合要被廣傳的品牌與帳號",
        "獨特有梗型：玩諧音、雙關、反差，讓名字自帶話題與記憶點",
        "質感氛圍型：走文青／高級／療癒路線，第一眼就定調氣質",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '資深命名／品牌顧問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁菜市場名·要解釋含義' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '候選清單+含義+唸感' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依取向切換命名手法' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '撞名與諧音地雷檢查' },
    ],
    theory: "基於語音象徵（Sound Symbolism，如 bouba/kiki 效應：圓潤的音讓人聯想柔軟可愛、爆破與銳利的音讓人聯想力量稜角）與處理流暢度（Processing Fluency：越好唸的名字越被大腦判定為好感、好記、可信）。好名字不是靈感隨機，而是讓「字音」呼應你想傳達的「感覺」，並讓人第一次聽到就唸得出、記得住。本咒語用這兩個框架批量生成候選，再幫你篩出真正站得住的那幾個。",
    generate: (inputs: any) => `你是一位資深的命名與品牌顧問，幫人取過上千個寵物名、品牌名、帳號名與作品名。你最受不了罐頭菜市場名，信條是：「名字是被唸出來、被記住的，不是看起來美就好。好名字讓人第一次聽到就唸得出、記得住，而且字音本身就在說它的個性。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要幫一個對象取名，想要一批好記又有記憶點、不撞名的候選。\n- 要幫什麼取名：[[${inputs.target}]]\n- 想要的風格：[[${inputs.style}]]\n- 想傳達的感覺或特色：[[${inputs.vibe}]]\n- 偏好或限制：[[${inputs.constraint}]]\n\n請輸出：\n① 【命名候選清單】— 一次給 8-10 個候選名，每個一行，格式「名字 — 一句含義或梗點（20 字內）」\n② 【三大首選深解】— 從中挑 3 個最推薦的，各 30-50 字說明為什麼好、適合什麼場合、唸起來是什麼感覺\n③ 【避雷提醒】— 指出哪些方向容易撞名或藏有諧音地雷，1-2 點\n④ 【延伸變體】— 給 2-3 個可延伸的玩法（例：搭配的 slogan、頭像風格、系列命名邏輯）\n\n【規則】\n1. 候選清單一律一行一個、好掃讀；全程繁體中文台灣用語，挑出來就能直接用。\n2. 嚴禁用「小白」「咪咪」「Lucky」「小可愛」這類菜市場／罐頭名硬湊數，也禁止「希望這些名字能幫到你」「以下是我的建議」這類廢話開頭——第一行直接進入候選清單。\n3. 運用語音象徵（Sound Symbolism）與處理流暢度（Processing Fluency）：優先選好唸、音節順、過目不忘的名字，並讓字音呼應想傳達的感覺（圓潤音顯可愛、爆破音顯有力）。\n4. 語氣像一個有品味又敢給意見的命名顧問，直接點出哪個最好，不要平均地列完就算。\n5. 唸讀測試：每個名字我唸出來、打出來都不彆扭，且能一眼看懂為什麼適合我——若有名字我得想三秒才懂梗，就該換掉。`
  },

  // ━━━ 🔵 中階秘術 | 生活娛樂 | Free ━━━
  {
    id: "gift_oracle",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "送禮方案 + 祝福卡片文案",
    icon: <Gift className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "送禮神算：完美選禮術",
    desc: "生日、情人節、母親節、彌月、謝師、探病⋯每次送禮都卡在「到底送什麼不踩雷」？這咒語依收禮對象、場合、預算與你們的關係，給你具體的禮物方案（含價位與去哪找），還附上能直接抄的祝福卡片文案，一次解決選禮加寫卡片。",
    tags: ["送禮選擇", "節慶禮物", "祝福文案"],
    fields: [
      { id: "recipient", label: "送給誰", placeholder: "例：交往兩年的女友 / 直屬主管 / 阿嬤 / 剛生小孩的同事" },
      { id: "occasion", label: "什麼場合", placeholder: "例：生日 / 情人節 / 母親節 / 彌月回禮 / 喬遷 / 探病" },
      { id: "budget", label: "預算", placeholder: "例：500 以內 / 1000-2000 / 不設限但別太誇張" },
      { id: "clue", label: "對方的喜好或線索", placeholder: "例：喜歡咖啡和露營 / 很實際不愛花俏 / 最近在減肥 / 完全不知道送什麼" },
    ],
    tweak: {
      id: "strat",
      label: "送禮路線",
      options: [
        "實用安全型：挑對方一定用得到、不易踩雷的選擇，適合不熟或長輩",
        "驚喜走心型：從對方的小細節下手，送出「你懂我」的記憶點",
        "體驗共享型：送活動、課程、一起去的體驗，重點是相處而非物品",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '懂送禮的生活風格顧問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁罐頭禮·給具體方案' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '禮物方案+價位+卡片文案' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依路線切換選禮邏輯' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '踩雷與預算把關' },
    ],
    theory: "基於送禮行為研究（Gino & Flynn：收禮者其實更喜歡自己會想要的東西，勝過送禮者自以為貼心、卻沒問過的「驚喜」）與體驗式消費理論（Experiential Purchases 帶來的幸福感比物品更持久、更不易比較與後悔）。送禮焦慮的本質是「用自己的視角猜對方」，本咒語把重點拉回收禮者真正想要的，並在合適時提出體驗型選項，讓你的心意被收到，而不是被收進抽屜。",
    generate: (inputs: any) => `你是一位很會送禮、品味好又務實的生活風格顧問，幫人挑過無數場合的禮物。你最討厭「送禮券／包現金就好」這種等於沒選的答案，信條是：「好的禮物不是你想送什麼，是對方真的想要、用得到、會記得。我幫你決定，不讓你更焦慮。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要送禮但不知道送什麼，需要你幫我選到對、再幫我把卡片也寫好。\n- 送給誰：[[${inputs.recipient}]]\n- 什麼場合：[[${inputs.occasion}]]\n- 預算：[[${inputs.budget}]]\n- 對方的喜好或線索：[[${inputs.clue}]]\n\n請輸出：\n① 【精選禮物方案】— 給 4-6 個具體選項（不是「買個包」而是明確品類＋風格＋大概價位＋去哪找的方向），每個附一句「為什麼適合他」\n② 【首選推薦】— 從中圈出 1-2 個最推的，說明為什麼最契合這個對象與場合，30-50 字\n③ 【祝福卡片文案】— 給 2 版可直接抄的卡片／訊息文案（一版溫馨、一版輕鬆），各 30-60 字\n④ 【踩雷提醒】— 這個對象或場合特別要避開的地雷，1-2 點（例：諧音不吉、太貴造成對方壓力）\n\n【規則】\n1. 全程繁體中文台灣用語；禮物方案要具體到我能直接去找，卡片文案要能直接複製傳出去。\n2. 嚴禁用「送禮物表達心意就好」「最重要的是心意」這類正確的廢話，也禁止用「禮券」「現金」「實用小物」這種等於沒選的罐頭答案來充數（除非對象明確只想要這個）。\n3. 運用送禮行為研究與體驗式消費理論：優先考慮對方真正想要的（而非送禮者的自我感動），並在合適時提出體驗型選項，因為體驗帶來的幸福感比物品更持久。\n4. 語氣像一個很會送禮、品味好又務實的朋友，直接幫我做決定，不要丟一堆選項讓我更難選。\n5. 決策測試：我讀完應該能直接決定「就送這個」並抄一段卡片文案傳出去，而不是還要再上網查半天。`
  },

  // ━━━ 📜 見習咒文 | 生活娛樂 | Free ━━━
  {
    id: "outfit_strategist",
    tab: "生活娛樂",
    isPro: false,
    tier: "apprentice",
    school: "illusion" as SchoolType,
    outputFormat: "每日穿搭方案",
    icon: <Shirt className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "衣櫥煉金：每日穿搭術",
    desc: "衣櫥滿滿卻每天站在鏡子前喊「沒衣服穿」？這咒語用你『現有的單品』，依場合和天氣直接幫你配好一整套，連配件和拍照角度都給齊，告別早上的選擇障礙。",
    tags: ["穿搭", "選擇困難", "形象"],
    fields: [
      { id: "occasion", label: "今天要去哪／場合", placeholder: "例：上班 / 第一次約會 / 面試 / 朋友聚餐" },
      { id: "wardrobe", label: "你衣櫥有的單品", placeholder: "例：白襯衫、牛仔褲、卡其褲、黑外套、小白鞋" },
      { id: "weather_mood", label: "天氣或想呈現的感覺", placeholder: "例：濕冷 18 度 / 想看起來幹練 / 想顯瘦" },
    ],
    tweak: {
      id: "strat",
      label: "穿搭風格",
      options: [
        "安全得體型：穩當不出錯，適合正式或重要場合，讓人覺得你很可靠",
        "亮眼吸睛型：製造記憶點，讓人忍不住多看一眼，適合想被注意的場合",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '形象顧問＋造型師' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依場合調正式度' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '穿搭+配件+理由+拍照' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '只用你有的單品' },
    ],
    theory: "基於『衣著認知』(Enclothed Cognition, Adam & Galinsky) 與首因效應：穿什麼不只影響別人怎麼看你，更會回頭改變你自己的狀態與自信。而第一印象在 7 秒內形成，穿搭就是那 7 秒的主角。本咒語從你現有的衣服出發，幫你選出『穿上會讓你感覺對、別人看了也對』的一套，把每天的穿衣決策從消耗變成助攻。",
    generate: (inputs: any) => `你是一位實戰派形象顧問兼造型師，最擅長「用素人衣櫥裡本來就有的單品，配出像有請造型師的效果」。你不會叫人去買一堆新衣服，而是把現有的搭出最好的樣子。你的信條：「會穿的人不是衣服多，是懂得怎麼配。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我今天不知道穿什麼，請用我現有的單品幫我配一套。\n- 場合：[[${inputs.occasion}]]\n- 我衣櫥有的單品：[[${inputs.wardrobe}]]\n- 天氣或想呈現的感覺：[[${inputs.weather_mood}]]\n\n請輸出：\n① 【今日穿搭】— 用我列的單品組一整套，從上到下（上衣→下著→鞋→外套）講清楚怎麼穿，能直接照穿\n② 【加分配件】— 1 到 2 個能畫龍點睛的小物（優先用我可能有的或好取得的），各一句說明放哪、怎麼用\n③ 【為什麼這樣搭】— 一句話講色彩或版型邏輯，30 字以內，讓我懂這套好在哪\n④ 【拍照建議】— 如果想拍一張 PO 出去，給一個角度或姿勢建議，20 字以內\n\n【規則】\n1. 只能用我列出的單品（最多補一兩件人人都有的百搭基本款），整套要能照著穿出門。\n2. 嚴禁出現「視個人風格而定」「自由搭配」「沒有絕對」這種講了等於沒講的話——你要直接幫我決定。\n3. 運用衣著認知：說明這套穿上後會讓我「感覺如何、被看成怎樣」，而不只是好看。\n4. 語氣像一個很會穿的朋友直接幫你配好——明確、果斷、有畫面。\n5. 鏡子測試：照這套穿好站到鏡子前，我的反應應該是「好，就這套」，而不是「好像哪裡怪怪的」。`
  },

  // ━━━ 📜 見習咒文 | 生活娛樂 | Free ━━━
  {
    id: "pet_post_ghostwriter",
    tab: "生活娛樂",
    isPro: false,
    tier: "apprentice",
    school: "illusion" as SchoolType,
    outputFormat: "毛孩社群貼文",
    icon: <PawPrint className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "毛孩代筆：萌寵貼文術",
    desc: "拍到毛孩超可愛的瞬間想分享，卻每次都只會打「今天也很可愛」？這咒語用毛孩的第一人稱口吻，幫你寫出萌系或厭世的貼文，附上互動引導句和標籤，輕鬆收割愛心和留言。",
    tags: ["寵物", "社群貼文", "萌寵"],
    fields: [
      { id: "pet", label: "毛孩資訊", placeholder: "例：橘貓「胖虎」三歲、很傲嬌 / 柴犬「麻糬」、貪吃愛笑" },
      { id: "moment", label: "想記錄的瞬間", placeholder: "例：把整捲衛生紙咬爛還很得意 / 等我下班睡在門口" },
      { id: "platform", label: "想發哪裡", placeholder: "例：IG 限動 / IG 貼文 / FB / Threads" },
    ],
    tweak: {
      id: "strat",
      label: "貼文風格",
      options: [
        "萌系療癒型：可愛撒嬌的口吻，主打療癒感，收割愛心",
        "厭世幽默型：用毛孩的傲嬌或厭世吐槽人類，引人會心一笑想分享",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '寵物社群寫手' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依平台調長度' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '三版貼文+互動+標籤' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '毛孩第一人稱代筆' },
    ],
    theory: "基於擬人化(Anthropomorphism)與社群分享心理：把毛孩擬人化、用第一人稱『代牠說話』，會大幅提升貼文的情感連結與互動率，因為讀者感覺到的是一個有個性的小傢伙在對他說話，而不是一張普通照片配說明。再結合『可愛侵略性』(cute aggression) 觸發的分享衝動，讓貼文更容易被按愛心、被 tag、被轉發。",
    generate: (inputs: any) => `你是一位專門幫毛孩經營社群的寫手，最會抓住每隻寵物的個性，用牠的口吻寫出讓人忍不住按愛心、tag 朋友的貼文。你的信條：「毛孩不會打字，但牠的個性值得被好好說出來。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我拍到毛孩的可愛瞬間想發文，請用牠的第一人稱幫我寫貼文。\n- 毛孩資訊：[[${inputs.pet}]]\n- 想記錄的瞬間：[[${inputs.moment}]]\n- 想發的平台：[[${inputs.platform}]]\n\n請輸出：\n① 【三個版本貼文】— 短版（限動一句話）、中版（IG／FB 貼文）、長版（有故事感的小短文），全部用毛孩第一人稱口吻，依我選的平台微調語氣\n② 【互動引導句】— 結尾一句引導粉絲留言或按愛心的話，15 字以內\n③ 【主題標籤】— 5 到 8 個適合的中英文 hashtag，混搭大標籤與毛孩專屬標籤\n\n【規則】\n1. 全程用毛孩的第一人稱（例：本喵、本汪、馬麻把拔），三個版本都要能直接複製貼上。\n2. 嚴禁罐頭文：「今天也是可愛的一天」「療癒」「萌翻」「日常」這類千篇一律、誰都能套的句子一律不准用。\n3. 運用擬人化：賦予毛孩語氣、小心機和情緒，讓人覺得牠真的在跟你說話、在吐槽或撒嬌。\n4. 語氣依風格走（萌系撒嬌或厭世吐槽）——口語、有畫面、有個性，不要書面腔。\n5. 分享測試：朋友看到這篇會想 tag 同樣養寵物的人，而不是無感滑過去。`
  },

  // ━━━ 📜 中階咒文 | 校園生存 | Free ━━━
  {
    id: "stage_report_craft",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "報告講稿 + 投影片要點",
    icon: <Presentation className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "講台煉金：上台報告術",
    desc: "明天要上台報告，投影片做完了卻不知道嘴巴要講什麼？怕緊張到結巴、怕超時、怕被問倒？這咒語把你手上的內容變成一份口語講稿——開場鉤子、分段骨架、逐字關鍵句、投影片要點到 Q&A 防身全給齊，照著練就能穩穩講完。",
    tags: ["上台報告", "簡報", "口語表達"],
    fields: [
      { id: "topic", label: "報告主題與科目", placeholder: "例：行銷學期末報告，講一個品牌的社群策略" },
      { id: "duration", label: "報告時間長度", placeholder: "例：10 分鐘 / 5 分鐘 / 一個人 3 分鐘" },
      { id: "material", label: "你手上已有的內容／重點", placeholder: "例：投影片 12 頁，重點是三個案例和一個結論" },
      { id: "worry", label: "你最擔心的環節", placeholder: "例：開場不知道怎麼起頭 / 會超時 / 被教授問問題" },
    ],
    tweak: {
      id: "strat",
      label: "報告策略",
      options: [
        "穩紮穩打型：結構清晰、邏輯分明，讓教授覺得你準備充分、條理清楚",
        "故事吸睛型：用故事或提問開場，抓住全班注意力，讓報告不無聊好記",
        "救急速成型：時間不多時用最少準備生出能上台的講稿，先求穩穩過關",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '簡報教練＋口語表達師' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依時間長度分配段落' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '開場+骨架+講稿+投影片+QA' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁照稿唸的書面語' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不灌水、控時不超時' },
    ],
    theory: "基於金字塔原理（Pyramid Principle, Barbara Minto）與峰終定律（Peak-End Rule）：聽眾的注意力有限，記得住的只有少數重點。金字塔原理要求『先講結論、再講支撐』，讓每一段都先讓人知道重點是什麼，降低聽眾的認知負荷；峰終定律則指出，人對一段體驗的記憶取決於最高峰與結尾，所以一個有力的開場鉤子和收尾，會決定教授對你整場報告的印象。本咒語把你零散的投影片內容，重組成『有結論、有節奏、有記憶點』的口語講稿。",
    generate: (inputs: any) => `你是一位簡報教練兼口語表達訓練師，帶過上百位學生與上班族從『怕上台』到『講得讓人記住』。你最擅長把一堆零散的投影片內容，變成一份能直接照著練、講出來像在跟人說話的講稿。你的信條：「報告不是把字唸完，是讓台下記得住你想講的那一件事。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要上台報告，投影片有了但不知道嘴巴怎麼講，請幫我生出一份口語講稿。\n- 報告主題與科目：[[${inputs.topic}]]\n- 報告時間長度：[[${inputs.duration}]]\n- 我手上已有的內容／重點：[[${inputs.material}]]\n- 我最擔心的環節：[[${inputs.worry}]]\n\n請輸出：\n① 【開場 30 秒】— 一個能立刻抓住注意力的開場（故事、提問或反差數據），60 字以內，照著講就好\n② 【報告骨架】— 依我的時間長度切成幾大段，每段一句核心訊息＋分配幾分鐘，總和不超過指定時間\n③ 【逐字關鍵句】— 每段開頭與段落轉場的關鍵句，講出來像在說話、不是唸論文\n④ 【投影片要點】— 每頁一個標題＋最多 3 個重點，提醒我哪頁字太多該砍\n⑤ 【Q&A 防身】— 教授或同學最可能問的 3 個問題＋簡短的回答方向\n⑥ 【上台前心法】— 一個抗緊張的具體動作＋走上台前默念的一句話，15 字以內\n\n【規則】\n1. 講稿要口語、能唸出來像在跟人說話，可直接照著練，不是書面報告腔。\n2. 嚴禁出現：「報告完畢謝謝大家」「接下來我要講的是」「呃…那個…」這類空話贅詞，也不准叫我把投影片塞滿字。\n3. 運用金字塔原理：每段先講結論再講支撐；用峰終定律設計強開場與強結尾，讓人記得住重點。\n4. 語氣自信但不背稿感，依我選的策略走（穩紮／故事／救急）。\n5. 計時測試：照這份練一次，時間要落在指定長度內、且結尾讓台下記得住我的重點，而不是超時被打斷或講完沒人記得。`
  },

  // ━━━ 📜 中階咒文 | 生活娛樂 | Free ━━━
  {
    id: "home_workout_forge",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "個人化健身菜單",
    icon: <Dumbbell className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "居家煉體：健身菜單術",
    desc: "想運動卻不知從何下手？網路課表不是器材對不上就是強度太狂？這咒語當你的 AI 私人教練，依你的目標、手邊器材、能練的時間和身體狀況，排出一週課表＋每個動作的組數次數，連怎麼漸進加量都給你，照著做就行。",
    tags: ["健身", "運動課表", "居家訓練"],
    fields: [
      { id: "goal", label: "健身目標", placeholder: "例：減脂 / 增肌 / 練線條 / 改善體態久坐腰痠" },
      { id: "equipment", label: "可用器材與場地", placeholder: "例：家裡只有一對啞鈴和瑜伽墊 / 有健身房 / 完全徒手" },
      { id: "schedule", label: "每週能練幾天、每次多久", placeholder: "例：一週 3 天、每次 30 分鐘 / 假日才有空" },
      { id: "body", label: "身體狀況與限制", placeholder: "例：新手沒運動過 / 膝蓋舊傷不能深蹲 / 體重 80kg" },
    ],
    tweak: {
      id: "strat",
      label: "訓練取向",
      options: [
        "高效燃脂型：用複合動作搭短休息把心率拉高，時間少也能有效燃脂",
        "增肌雕塑型：聚焦目標肌群與漸進加量，練出力量與線條",
        "新手友善型：從零開始、動作簡單，先把習慣建立起來、優先不受傷",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '私人教練＋運動生理' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依器材與天數排課' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '週課表+菜單+漸進+提醒' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '動作具體到組數秒數' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '傷病不適先就醫' },
    ],
    theory: "基於漸進超負荷（Progressive Overload）與執行意圖（Implementation Intentions, Gollwitzer）：身體只有在被『比上次稍微多一點』的負荷刺激時才會進步，所以一份好的課表必須內建『下週怎麼加量』，而不是每週原地踏步。但比課表更難的是『持續做』——研究顯示，把運動用『在 X 情境就做 Y』的具體計畫綁進固定時間（如『下班到家先換衣服就開始』），執行率會大幅提高。本咒語同時給你進步的路徑與不放棄的觸發機制。",
    generate: (inputs: any) => `你是一位有實戰經驗的私人教練，懂運動生理也帶過很多新手，最擅長依每個人手邊的器材、時間和身體狀況，排出『做得到又看得到效果』的課表。你不會丟一份網紅同款狂操菜單，而是量身打造。你的信條：「最好的課表不是最狂的，是你會持續做下去的那一份。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我想開始運動，請依我的條件幫我排一份能直接照做的健身菜單。\n- 健身目標：[[${inputs.goal}]]\n- 可用器材與場地：[[${inputs.equipment}]]\n- 每週能練幾天、每次多久：[[${inputs.schedule}]]\n- 身體狀況與限制：[[${inputs.body}]]\n\n請輸出：\n① 【一週課表】— 哪幾天練、各練什麼部位、哪天休息，一眼看懂，符合我能練的天數\n② 【單次訓練菜單】— 每個動作的組數×次數＋組間休息秒數，照著做就好，符合我有的器材\n③ 【動作要點與替代】— 每個動作一句正確做法提醒，並給一個沒器材或受限時的替代動作\n④ 【漸進計畫】— 下週或下個月怎麼加量避免卡關，30 字以內\n⑤ 【吃的小建議】— 配合目標的 3 個能做到的飲食原則，不要叫我算複雜熱量\n⑥ 【安全提醒】— 哪些狀況該停下或先看醫生，結尾再給我一句鼓勵，30 字以內\n\n【規則】\n1. 課表與菜單要具體到能直接照做（幾組幾下休息幾秒），且符合我列的器材與時間，不要排出我做不到的份量。\n2. 嚴禁拿「視個人情況調整」「請諮詢專業教練後再做」當主要內容打發我，也不准用「燃脂」「爆汗」這類空泛形容詞充數。\n3. 運用漸進超負荷說明這週強度與下週怎麼進步；用執行意圖把運動綁進固定時間情境（如「下班到家先換衣服就開始」）。\n4. 語氣像會帶人的教練——明確、給得出數字、會鼓勵但不灌雞湯。\n5. 安全測試：這份菜單對我的狀況要安全可執行；若我有提到傷病或身體不適，必須在最前面提醒我先就醫評估、並給出保守版本（本菜單僅供參考，不取代專業醫療或教練評估）。`
  },

  // ━━━ 🔵 中階秘術 | 校園生存 | Free ━━━
  {
    id: "self_intro_forge",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "自傳 + 60秒口說自介",
    icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "自傳煉成：自我介紹術",
    desc: "履歷自傳寫不出來、面試一開口就卡？全丟給 AI 又被嫌沒人味、過不了 ATS 篩選？這咒語把你零散的經歷煉成有結構又有溫度的自傳，再附一份 60 秒面試口說稿，讓你一開口就贏。",
    tags: ["履歷自傳", "面試自介", "求職新鮮人"],
    fields: [
      { id: "background", label: "你的身分與求職方向", placeholder: "例：資管系應屆 / 想轉職數位行銷 / 找暑期實習" },
      { id: "experiences", label: "你有哪些經歷或作品", placeholder: "例：辦過系上活動、打工兩年、做過一個side project、社團幹部" },
      { id: "target", label: "要投的職位或科系", placeholder: "例：行銷企劃實習 / 軟體工程師 / 研究所推甄" },
      { id: "personality", label: "你想強調的特質", placeholder: "例：扛得住高壓、很會帶團隊、自學能力強" },
    ],
    tweak: {
      id: "strat",
      label: "煉成策略",
      options: [
        "故事亮點型：用一個具體事件當主線，讓人記得住你、不淪為流水帳",
        "數據實績型：把經歷量化成成果數字，最快通過 HR 和 ATS 的第一眼篩選",
        "潛力翻轉型：經歷不多也不怕，把學習力與動機包裝成「可栽培」的稀缺特質",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '資深HR＋履歷顧問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁空泛形容詞' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '自傳+口說+關鍵字+地雷' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依經歷多寡選策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '人味測試防AI腔' },
    ],
    theory: "基於 STAR 行為面試法則與敘事身份理論（Narrative Identity, McAdams）：HR 一份履歷平均只看 7 秒，刷掉你的不是經歷不夠，而是你寫得跟所有人一樣。本咒語用 STAR（情境-任務-行動-結果）把空泛特質換成可驗證的成果，再用敘事身份把零散經歷串成一條「你是誰」的主線；同時遵守台灣 HR 共識的『七三原則』（七成真實經歷、三成潤飾），既過 ATS 關鍵字也保住人味。",
    generate: (inputs: any) => `你是一位資深 HR 兼履歷顧問，看過上萬份履歷，也當過面試官，最清楚「7 秒內被刷掉」和「想約來聊聊」的差別在哪。你的信條：「沒有不值得寫的經歷，只有不會說故事的人。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要寫自傳和準備面試自我介紹，請把我的經歷煉成讓人想錄取我的版本。\n- 我的身分與求職方向：[[${inputs.background}]]\n- 我有的經歷或作品：[[${inputs.experiences}]]\n- 要投的職位或科系：[[${inputs.target}]]\n- 想強調的特質：[[${inputs.personality}]]\n\n請輸出：\n① 【自傳草稿】— 一篇 250-350 字的自傳，分「我是誰 → 我做過什麼 → 為什麼是我」三段，可直接貼上\n② 【60 秒口說自介】— 面試一開口就講的版本，120 字以內，口語、好背、念得完\n③ 【ATS 關鍵字】— 針對這個職位該植入的 5 個關鍵字，列出來\n④ 【一句記憶點】— 讓面試官記住你的個人標籤，15 字以內\n⑤ 【地雷清單】— 這份自傳/自介最容易踩的 3 個雷，各一句\n\n【規則】\n1. 自傳分三段、可直接複製貼上；口說稿要能一口氣念完不超過 60 秒。\n2. 嚴禁使用：「抗壓性高」「學習力強」「個性活潑」「認真負責」這類人人都寫、HR 一眼略過的空話——每個特質都必須用一件具體事件證明。\n3. 運用 STAR 把經歷寫成可驗證的成果，並遵守七三原則：只能潤飾與重組我提供的真實經歷，絕不虛構或灌水數字。\n4. 語氣像一個有底氣的人在自我推薦——不卑微、不浮誇、不灌雞湯。\n5. 人味測試：念出來要像「真人在講自己的故事」而非 ChatGPT 罐頭——如果整段把名字拿掉後套在任何人身上都成立，就是失敗，重寫到只屬於我。`
  },

  // ━━━ 📜 見習咒文 | 生活娛樂 | Free ━━━
  {
    id: "dating_icebreaker",
    tab: "生活娛樂",
    isPro: false,
    tier: "apprentice",
    school: "illusion" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "交友開場白 + 話題鉤子",
    icon: <Magnet className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "破冰召喚：配對開場術",
    desc: "配對到心儀對象卻只會傳『嗨』『在嗎』然後被已讀不回？這咒語讀對方的檔案幫你客製一句讓人想回的開場白，再附幾顆能聊下去的話題鉤子，把配對變成真正的對話。",
    tags: ["交友軟體", "聊天開場", "脫單"],
    fields: [
      { id: "their_profile", label: "對方檔案有什麼", placeholder: "例：照片在爬山、自介寫愛看貓、放了一張咖啡照" },
      { id: "my_vibe", label: "你想給的感覺", placeholder: "例：幽默風趣 / 真誠穩重 / 輕鬆隨性" },
      { id: "app_context", label: "在哪配對、想先聊還是想約", placeholder: "例：Tinder想先聊熟 / Omi答題配對 / 想直接約咖啡" },
    ],
    tweak: {
      id: "strat",
      label: "破冰策略",
      options: [
        "細節鉤子型：抓對方檔案裡一個小細節當切入點，證明你有認真看、不是亂槍打鳥",
        "趣味挑戰型：用一個輕鬆的提問或玩笑邀請對方接話，讓對話自然滾起來",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '約會教練＋聊天軍師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁罐頭開場語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '開場+話題鉤+接話+地雷' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依對方檔案選切入' },
    ],
    theory: "基於社會滲透理論（Social Penetration, Altman & Taylor）的自我揭露遞進：聊天能不能熱起來，關鍵不是你多有趣，而是你有沒有給對方一個「容易接、且想接」的話頭。「嗨／在嗎」這種罐頭把回話成本整個丟給對方，已讀率最高；本咒語反過來降低對方的回覆門檻，扣住檔案裡的具體細節給一個低成本好接的開口，讓關係從淺到深自然滾動。",
    generate: (inputs: any) => `你是一位約會教練兼聊天軍師，幫過上百人從「配對到沒下文」變成「聊到約出來」，最懂交友軟體上一句話的生與死。你的信條：「會不會聊，差在你有沒有給對方一個想回的理由。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我在交友軟體上配對到對象，需要一句讓對方想回的開場白和能聊下去的話題。\n- 對方檔案有什麼：[[${inputs.their_profile}]]\n- 我想給的感覺：[[${inputs.my_vibe}]]\n- 在哪配對、想先聊還是想約：[[${inputs.app_context}]]\n\n請輸出：\n① 【開場白】— 3 個版本，每個 30 字以內，可直接複製傳出\n② 【話題鉤子】— 根據對方檔案延伸的 3 個能聊下去的話題方向\n③ 【接話備案】— 如果對方只回「哈哈」或很冷淡時的第二句，25 字以內\n④ 【地雷清單】— 這類對象最容易聊死的 3 種開場，各一句\n\n【規則】\n1. 每則開場白 30 字以內，口語、能直接貼到交友軟體送出。\n2. 嚴禁用「嗨」「在嗎」「可以認識你嗎」「你好漂亮／好帥」開頭——這些是把球丟回給對方的罐頭，已讀率最高。\n3. 運用自我揭露遞進：開場要給對方一個低成本、好接話的話頭，且最好扣住對方檔案的具體細節，不要泛泛而談。\n4. 語氣依我選的感覺走，輕鬆自然、像真人在聊天，不油、不裝、不像業務開發。\n5. 回覆測試：這句開場傳出去，對方會想「咦這個有點意思」而動手回，而不是已讀不回。`
  },

  // ━━━ 🟣 高階秘術 | 日常雜症 | Free ━━━
  {
    id: "refund_reclaim",
    tab: "日常雜症",
    isPro: false,
    tier: "master",
    school: "contract" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "申訴信 + 致電腳本 + 升級路線圖",
    icon: <Coins className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "退款逆襲：消費申訴術",
    desc: "被多收費、買到瑕疵、服務出包，客服只會一句「依規定無法退費」？多數人摸摸鼻子認賠，不是不該拿回錢，是不知道怎麼施壓對方才會讓步。這咒語把你的委屈整理成商家不得不退的申訴系統，從一封信、一通電話，到搬出消保官的升級路線，一次給你。",
    tags: ["退費申訴", "消費爭議", "客訴"],
    fields: [
      { id: "issue", label: "申訴對象與問題", placeholder: "例：某電商買到瑕疵品要求退貨被拒 / 健身房亂扣會費 / 電信多收費" },
      { id: "timeline", label: "事發經過", placeholder: "例：3/1 下單、3/5 收到破損、3/6 申請退貨、客服一直拖" },
      { id: "evidence", label: "你手上的證據", placeholder: "例：訂單截圖、對話紀錄、瑕疵照片、刷卡明細、合約條款" },
      { id: "demand", label: "你想要的結果", placeholder: "例：全額退款 / 換新品加補償 / 取消合約不收違約金" },
      { id: "attempts", label: "之前試過什麼、對方怎麼回", placeholder: "例：打過 2 次客服都說依規定不能退 / 寄了 email 沒回" },
    ],
    tweak: {
      id: "strat",
      label: "申訴策略",
      options: [
        "理性升級型：用條款、紀錄、法規一層層加壓，全程留書面，逼對方走正規流程退費",
        "公開施壓型：把爭議攤到公開評論／社群／消費者社團，用商譽當槓桿讓對方主動和解",
        "公權力型：直接亮出消保官 1950、消基會、主管機關申訴，讓對方知道你會玩到底",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '消保官＋客訴談判專家' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁用情緒謾罵語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '申訴信+電話稿+升級路線' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依對方回應選施壓層級' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '只陳述事實不恐嚇' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '有效vs無效客訴對照' },
    ],
    theory: "結合兩個框架：一是 Cialdini 的『承諾與一致』原則——讓商家在書面上先承認事實（收到你的貨、條款怎麼寫），他就難以反口；二是消費爭議的『損失趨避』槓桿——對商家而言，一個公開負評或一張消保官申訴單造成的商譽損失，遠大於退你的錢，當你讓退費變成『對他比較划算的選項』，他自然讓步。本咒語把『我覺得被坑』轉譯成『有憑有據、可被第三方檢視的事實鏈』，再依台灣消費者保護法的申訴階梯（業者→消保官 1950→調解）設計升級路線，讓你每一步都站得住。",
    generate: (inputs: any) => `你同時具備三個專家視角：\n① 消費爭議調解委員（處理過上千件退費糾紛，熟悉台灣消費者保護法但說人話，不背法條號碼）\n② 客訴談判專家（當過大型企業客服主管，最清楚什麼樣的客訴公司會秒退、什麼樣的會被丟到一旁）\n③ 證據整理師（擅長把零散的「我很委屈」整理成「商家無法反駁的事實鏈」）\n\n你的信條：「拿回該拿的錢，不是靠吵贏，是靠讓對方算清楚——退你比不退你划算。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我遇到消費爭議想討回公道，請給我一套完整的申訴系統。\n- 申訴對象與問題：[[${inputs.issue}]]\n- 事發經過：[[${inputs.timeline}]]\n- 我手上的證據：[[${inputs.evidence}]]\n- 我想要的結果：[[${inputs.demand}]]\n- 之前試過什麼、對方怎麼回：[[${inputs.attempts}]]\n\n請輸出：\n① 【爭議診斷】— 我這案子站不站得住、勝算多少、對方最可能拿什麼理由擋我，100 字以內\n② 【證據盤點】— 我現有證據夠不夠、還缺什麼、怎麼補，列成清單\n③ 【正式申訴信】— 一封可直接寄出的書面申訴，分「陳述事實→引用依據→明確訴求→期限與後續」四段，語氣堅定有禮\n④ 【客服致電腳本】— 打電話時照念的話術，含「開場定錨」「對方拖延時的回應」「要求對方承諾期限」三段\n⑤ 【升級路線圖】— 商家若不理，下一步打 1950 消保官、找消基會、向主管機關申訴的順序、各自怎麼做、預期效果\n⑥ 【一句殺手鐧】— 對話中亮出後最能讓對方願意退讓的關鍵句，並說明何時用\n\n【規則】\n1. 申訴信與電話稿都必須可以直接複製就用，書面正式、口語自然，分清楚兩種場合。\n2. 嚴禁使用情緒字眼與威脅：「你們很爛」「我要告死你」「黑心商家」——情緒謾罵只會給對方不甩你的理由，你的武器是事實不是火氣。\n3. 所有主張必須基於我提供的事實與台灣消保法常識，不可捏造條款或誇大法律效果；不確定處標註「建議向 1950 確認」。\n4. 語氣全程「堅定但講理」——讓對方覺得你是個難纏但講道理、會一路申訴到底的人。\n5. 阿嬤測試：整套流程要讓完全不懂法律的人也照著做得來，每一步都具體到「打給誰、說什麼、附什麼」。`
  },

  // ━━━ 🟣 高階秘術 | 創業/自媒體 | Pro ━━━
  {
    id: "review_crisis_pr",
    tab: "創業/自媒體",
    isPro: true,
    tier: "master",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "公開回覆 + 私訊和解稿 + 危機分級",
    icon: <PenTool className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "負評反轉：危機公關術",
    desc: "Google 一顆星、蝦皮負評、IG 被客人公審——刪不掉、不回更糟，回得不好整串炎上。多數老闆不是不想回，是一氣之下越回越錯。這咒語幫你把每一則負評當成『演給上千個潛在客戶看的公關舞台』，給你一則對外得體、一則對內和解的回覆，把危機變成展現品牌格局的機會。",
    tags: ["負評回覆", "店家公關", "品牌危機"],
    fields: [
      { id: "platform", label: "平台與商家類型", placeholder: "例：Google評論/餐廳 蝦皮/賣家 IG/個人品牌 外送/小吃店" },
      { id: "review", label: "負評內容原文", placeholder: "把客人留的負評整段貼上，越完整越好" },
      { id: "truth", label: "實際情況、對方說得對不對", placeholder: "例：的確是我們出餐慢 / 他說的不實當天根本沒這回事 / 一半誤會" },
      { id: "relationship", label: "想不想留這客人、有無後續", placeholder: "例：想挽回並請他回購 / 只想止血給其他人看 / 已私下聯絡不上" },
      { id: "brand_voice", label: "品牌語氣", placeholder: "例：溫暖親切的家庭餐廳 / 專業俐落 / 年輕幽默敢玩" },
    ],
    tweak: {
      id: "strat",
      label: "公關策略",
      options: [
        "真誠認錯型：錯在我方時，承認＋補救＋承諾改進，把扣分變加分（適合確實有疏失）",
        "澄清反轉型：對方說的不實或誤會時，平靜擺出事實還原真相，不卑不亢不對罵",
        "幽默化解型：無傷大雅的抱怨或酸民，用得體幽默四兩撥千斤，展現品牌個性圈粉",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '危機公關＋金牌店長' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁與客人對罵' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '公開回覆+私訊+危機分級' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依屬實與否選策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不洩個資不情緒化' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '炎上vs圈粉回覆對照' },
    ],
    theory: "建立在兩個框架上：一是『服務補救悖論』（Service Recovery Paradox）——一個抱怨被妥善處理後，客人的忠誠度反而高於從沒出過錯；負評不是傷口，是把不滿的客人變死忠的入口。二是『社會證明』效應——你回的不是那一個負評者，而是『正在看這串評論決定要不要光顧』的上千個潛在客戶，回覆的真正受眾是旁觀者。本咒語據此把回覆拆成兩條線：對外公開回覆是『表演格局給旁觀者看』，對內私訊是『真正解決那位客人的問題』，兩者語氣與目的完全不同，分開處理才不會兩頭落空。",
    generate: (inputs: any) => `你同時具備三個專家視角：\n① 品牌危機公關顧問（操盤過上百起負評與炎上事件，知道哪一句話能滅火、哪一句會澆油）\n② 金牌店長（第一線服務十年，最懂客人在氣什麼、一句話怎麼讓奧客變回頭客）\n③ 社群輿論分析師（清楚一則公開回覆的真正讀者不是抱怨者，而是上千個還在觀望的潛在客人）\n\n你的信條：「負評不是要你贏過那一個客人，是要你贏得正在看的一千個客人。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我的店／品牌收到一則負評，需要一套不會炎上、還能加分的回應方案。\n- 平台與商家類型：[[${inputs.platform}]]\n- 負評內容原文：[[${inputs.review}]]\n- 實際情況、對方說得對不對：[[${inputs.truth}]]\n- 想不想留這客人、有無後續：[[${inputs.relationship}]]\n- 品牌語氣：[[${inputs.brand_voice}]]\n\n請輸出：\n① 【危機分級】— 這則負評屬於「小抱怨／真疏失／不實攻擊／酸民挑釁」哪一級，要不要回、多快回，50 字以內\n② 【對外公開回覆】— 直接貼到評論區的版本，120 字以內，分「同理→回應事實→具體作為→歡迎再給機會」，寫給旁觀者看\n③ 【對內私訊和解稿】— 私下傳給客人的版本，目標是真正解決他的問題、挽回關係，語氣比公開版更個人\n④ 【絕對不能說的話】— 針對這則負評，列出 3 句講了會炎上的地雷回應\n⑤ 【止血後續動作】— 回覆之外該做的 2 件事（如何邀正評、內部怎麼改），防止同類負評再來\n⑥ 【一句定調】— 這則回覆想讓旁觀客人留下的一個印象，用一句話講明\n\n【規則】\n1. 公開回覆與私訊稿都要能直接複製就用，並嚴格分開——公開的給旁觀者看格局，私訊的給當事人解決問題。\n2. 嚴禁與客人對罵或嘲諷，禁用「你根本沒來過」「奧客」「不歡迎你這種客人」這類情緒句——對罵一次，旁觀者全跑光。\n3. 若對方說的屬實，公開回覆必須先真誠認錯再講補救，不可硬拗；若不實，平靜擺事實，不情緒化、不人身攻擊。\n4. 全程不洩漏客人個資與訂單細節，不公開私下對話內容。\n5. 語氣依我的品牌走，但底線是『讓旁觀者覺得這家店有格局、可信任』。\n6. 旁觀者測試：一個沒看過這家店的人讀完這串，對你的好感是上升的——這才算成功。`
  },

  // ━━━ 🟣 高階禁咒 | 校園生存 | Free ━━━
  {
    id: "study_plan_forge",
    tab: "校園生存",
    isPro: false,
    tier: "master",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "讀書計畫 + 亮點標語 + 自檢清單",
    icon: <ScrollText className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "備審煉成：讀書計畫術",
    desc: "研究所推甄、轉學、在職專班都要交讀書計畫，卻寫成流水帳『我從小就對○○有興趣』？教授一年看幾百份，空泛的直接刷掉。這咒語幫你把零散經歷重構成『動機→能力→規劃』一條清楚的故事線，用具體事例取代喊口號，讓教授看見你是可造之才。",
    tags: ["讀書計畫", "研究所推甄", "備審資料"],
    fields: [
      { id: "apply_target", label: "申請的校系/領域", placeholder: "例：政大企管所 / 台大資工轉學 / 師大在職專班教育" },
      { id: "background", label: "你的相關背景/經歷", placeholder: "例：本科財金、社團財務、實習過券商 / 非本科想轉領域" },
      { id: "motivation", label: "為什麼想念這個領域", placeholder: "例：實習時發現自己缺資料分析能力想補強" },
      { id: "future_goal", label: "未來職涯/研究規劃", placeholder: "例：想進顧問業 / 想往學術走考博班" },
      { id: "highlight", label: "最想凸顯的亮點", placeholder: "例：帶過全國比賽得獎 / 自學程式做過專案" },
    ],
    tweak: {
      id: "strat",
      label: "撰寫路線",
      options: [
        "學術鑽研型：強調研究熱忱與學術潛力，適合想走研究、考博班的路線",
        "實務應用型：連結產業需求與職涯目標，適合在職專班與應用型科系",
        "跨域整合型：把看似不相關的背景轉化為獨特優勢，適合轉領域申請",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '升學備審輔導顧問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁喊口號要具體事例' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '動機+短中長期+結論' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依路線調整重點' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '教授視角真實性把關' },
    ],
    theory: "基於敘事傳輸理論（Narrative Transportation）與自我決定理論（SDT）的內在動機：教授評審看的不是『你多想念』，而是『你的過去、現在、未來能不能串成一條有說服力的故事線』。本咒語把流水帳式經歷重構成『動機—能力—規劃』三幕劇，用具體事例與數據取代空泛形容詞，觸發評審的『可造之才』歸因，而非『又一份罐頭範本』的疲乏感。",
    generate: (inputs: any) => `你是一位資深升學備審輔導顧問，十餘年協助上千名學生錄取研究所、轉學與在職專班，當過系所甄試委員，最清楚教授在幾百份書審中三十秒決定去留的判準。你的信條：「讀書計畫不是寫你多愛這個系，是證明這個系收你不會後悔。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要寫一份讀書計畫，需要一條清楚有說服力的故事線。\n- 申請校系/領域：[[${inputs.apply_target}]]\n- 我的相關背景：[[${inputs.background}]]\n- 申請動機：[[${inputs.motivation}]]\n- 未來規劃：[[${inputs.future_goal}]]\n- 想凸顯的亮點：[[${inputs.highlight}]]\n\n請輸出：\n① 【破題開場】— 全篇第一段，80 字以內，用一個具體事件或洞察破題，不要『我從小就...』\n② 【申請動機段】— 150 字以內，把動機連結到具體經歷與這個校系的特色（因校制宜）\n③ 【學習計畫段】— 分短期（入學前～第一年）、中期（在學）、長期（畢業後）三層，各 2-3 句具體規劃，避免空話\n④ 【未來規劃與結論】— 100 字以內，堅定收尾，讓評審相信你能完成上述規劃\n⑤ 【一句亮點標語】— 25 字以內，可放標題或自我介紹用，濃縮你的不可取代性\n⑥ 【教授視角自檢清單】— 5 個上傳前必過的檢查點\n\n【規則】\n1. 全篇用書面但不僵硬的繁體中文，段落分明可直接貼進備審文件，總字數控制在一頁能放下。\n2. 嚴禁使用：「我從小就對○○有興趣」「貴系師資優良設備完善」「我一定會努力」「希望教授給我機會」——這些是罐頭句，教授看到就跳過。\n3. 運用敘事傳輸＋SDT：每個主張都要綁一個具體事例或數據（做過什麼、得到什麼結果），用內在動機（我想解決的問題）取代外在動機（為了文憑）。\n4. 語氣自信但不浮誇——是『我準備好了』而非『拜託收我』，展現主動規劃而非被動期待。\n5. 教授測試：把這份計畫拿給沒收你的甄試委員看，他的反應應該是『這個學生想清楚了』而不是『又一份範本』。\n\n（提醒：各校簡章大綱不同，請依簡章要求增刪段落，因校制宜。）`
  },

  // ━━━ 📜 見習咒文 | 生活娛樂 | Free ━━━
  {
    id: "blessing_words_forge",
    tab: "生活娛樂",
    isPro: false,
    tier: "apprentice",
    school: "healing" as SchoolType,
    outputFormat: "賀詞長短版 + 適用提醒",
    icon: <PartyPopper className="w-8 h-8 text-gray-500" />,
    color: "gray",
    title: "賀詞召喚：萬用祝福術",
    desc: "朋友畢業、同事結婚、阿嬤大壽、寶寶彌月，想送祝福卻只擠得出『恭喜恭喜萬事如意』？罐頭賀詞收的人一眼就知道是複製的。這咒語幫你寫出有溫度、像專門為對方寫的祝福，畢業季、婚季、紅包袋、卡片都能直接抄。",
    tags: ["祝福語", "賀詞", "卡片紅包"],
    fields: [
      { id: "occasion", label: "什麼場合", placeholder: "例：大學畢業 / 同事結婚 / 阿嬤80大壽 / 朋友寶寶彌月 / 主管榮退" },
      { id: "recipient", label: "對象與關係", placeholder: "例：四年死黨 / 不太熟的同事 / 疼我的長輩" },
      { id: "detail", label: "想提到的心意或小細節", placeholder: "例：一起熬夜趕報告的日子 / 祝她新事業順利（沒有可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "祝福風格",
      options: [
        "真摯感人型：走心暖句，適合親近的人與長輩、正式場合",
        "輕鬆幽默型：俏皮有梗不肉麻，適合好友與同輩間互相虧",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '賀詞文案寫手' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁罐頭老套吉祥話' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '長版+短版+彩蛋句' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係調整語氣' },
    ],
    theory: "基於峰終定律與具體性效應：賀詞讓人記住的從來不是華麗辭藻，而是『他真的懂我』的那一瞬間。一句指名道姓的具體回憶（你們一起做過的事），勝過一百句『鵬程萬里』。本咒語用具體細節製造情感峰值，再依關係親疏調整語氣，讓收到的人覺得這是專屬於他的、不是群發的。",
    generate: (inputs: any) => `你是一位專寫祝福賀詞的文案寫手，幫人寫過無數畢業卡、喜帖賀詞、紅包袋題字與長輩壽宴致詞，最擅長把『不知道寫什麼』變成『讓收到的人眼眶一熱』。你的信條：「最好的祝福不是辭藻最美的，是讓對方覺得『這是寫給我的』。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要送一段祝福，希望有溫度、不要罐頭。\n- 場合：[[${inputs.occasion}]]\n- 對象與關係：[[${inputs.recipient}]]\n- 想提到的心意或細節：[[${inputs.detail}]]\n\n請輸出：\n① 【完整版賀詞】— 60 字以內，適合寫卡片、發訊息或致詞，有起承轉合\n② 【一句短版】— 20 字以內，紅包袋、限動、卡片落款可直接用\n③ 【加碼彩蛋句】— 一句畫龍點睛的暖心或幽默句，讓賀詞更有記憶點\n④ 【適用提醒】— 一句話提醒這段話適合／不適合用在什麼對象，避免踩雷\n\n【規則】\n1. 所有內容口語自然、能直接複製貼上 LINE 或抄上卡片，不要書面腔。\n2. 嚴禁堆砌罐頭吉祥話：「萬事如意」「鵬程萬里」「心想事成」「百年好合」「永浴愛河」這類成語最多出現一次，且要搭配具體內容，不能整句都是。\n3. 運用具體性效應：若有提供細節就一定要寫進去；沒提供也要從關係出發給出『像認識對方』的句子，不能通用到換誰都能用。\n4. 語氣依風格走——真摯型走心不煽情，幽默型俏皮不失禮，長輩場合保留基本敬意。\n5. 本人測試：把這段話給收禮的人看，他的反應應該是『欸這是特地寫給我的吧』而不是『罐頭複製的』。`
  },

  // ━━━ 🔵 中階秘術 | 創業/自媒體 | Free ━━━
  {
    id: "product_copy_forge",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "標題 + 銷售文案 + CTA",
    icon: <ShoppingBag className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "賣場煉金：商品文案術",
    desc: "蝦皮網拍、IG 賣貨、團購開團，商品明明不錯卻只會寫『品質保證、CP值超高』，客人滑過去不下單？問題不是商品爛，是文案在自嗨。這咒語幫你把規格翻譯成顧客好處，用痛點開場、好處收單，產出可直接上架的標題、內文與催單句。",
    tags: ["商品文案", "電商賣貨", "團購開團"],
    fields: [
      { id: "product", label: "商品是什麼", placeholder: "例：保溫便當盒 / 韓系寬褲 / 益生菌 / 線上課程" },
      { id: "target_customer", label: "誰會買/目標客群", placeholder: "例：帶便當的上班族 / 想顯瘦的小資女 / 腸胃不好的人" },
      { id: "selling_point", label: "最大賣點/跟別人差在哪", placeholder: "例：可微波又不漏 / 一條抵三種穿法 / 有專利菌株" },
      { id: "platform", label: "上架平台/形式", placeholder: "例：蝦皮商品描述 / IG限動賣貨 / 團購開團文 / momo" },
    ],
    tweak: {
      id: "strat",
      label: "文案策略",
      options: [
        "痛點戳刺型：先戳中不買的痛再給解方，適合解決問題的功能型商品",
        "情境帶入型：營造使用畫面與嚮往感，適合生活風格與質感類商品",
        "限時急殺型：用稀缺與優惠催單，適合團購開團與促銷檔期",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '電商轉換文案操盤手' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁自嗨空泛形容詞' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '標題+主文+條列+CTA' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依平台調整結構' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '自嗨vs熱賣對照' },
    ],
    theory: "基於 FAB 法則（Feature特色→Advantage優勢→Benefit好處）與 AIDA 轉換漏斗，輔以損失趨避：客人從來不買『規格』，買的是『規格能為我做什麼』。本咒語強迫把每個賣點翻譯成顧客好處（不漏→包裡不再濕一片），再用注意→興趣→慾望→行動的順序推進到下單，並用認知流暢度原則讓文案一眼就懂、不用思考。",
    generate: (inputs: any) => `你是一位電商轉換文案操盤手，操刀過破千件熱銷商品頁與團購文，最懂客人滑手機三秒內決定停不停下來、看完會不會手滑下單。你的信條：「沒人想看你的商品有多好，大家只想知道它能讓我變多好。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要賣一個商品，需要可直接上架的銷售文案。\n- 商品：[[${inputs.product}]]\n- 目標客群：[[${inputs.target_customer}]]\n- 最大賣點：[[${inputs.selling_point}]]\n- 上架平台/形式：[[${inputs.platform}]]\n\n請輸出：\n① 【吸睛標題 3 選】— 各 25 字以內，含關鍵字與好處，給我挑\n② 【主文案】— 150 字以內，依「痛點→賣點→好處→信任感」推進，分行好讀\n③ 【賣點條列】— 3 到 5 條 bullet，每條把規格翻成顧客好處（特色→所以你能...）\n④ 【行動呼籲 CTA】— 1 到 2 句催單，含一個下單理由（限量／優惠／即時好處）\n⑤ 【限動／開團短句】— 50 字以內，可直接貼 IG 限動或團購開頭的精簡版\n\n【規則】\n1. 全部文案依平台調整——蝦皮重關鍵字與條列、IG限動重口語短句、團購重急迫感，並能直接複製上架。\n2. 嚴禁自嗨空泛詞：「品質保證」「CP值超高」「物美價廉」「超好用」「必買」「不買可惜」——這些賣家自嗨詞客人完全無感，要換成具體好處。\n3. 運用 FAB＋AIDA：每個賣點都要完成『特色→好處』的翻譯，整篇照注意→興趣→慾望→行動的順序排，不能只列規格。\n4. 語氣貼近目標客群——對小資女像閨蜜推坑、對上班族講效率、對長輩講安心，不用官腔。\n5. 滑手機測試：一個沒聽過這商品的陌生人滑到這篇，三秒內要看懂『這是賣什麼、干我什麼事』，並產生想點下去的衝動。`
  },

  // ━━━ 🔵 中階秘術 | 校園生存 | Free ━━━
  {
    id: "exam_notes_forge",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "重點表 + 記憶口訣 + 自測題",
    icon: <Highlighter className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "筆記煉成：考前重點整理術",
    desc: "期末、段考、國考前，課本講義堆成山，螢光筆劃滿了還是不知道哪裡會考、背了又忘？這咒語當你的金牌家教，把一團亂的課程內容濃縮成分層重點表，配上記憶口訣與自測題，讓你用主動回想真正讀進去，而不是劃完重點就以為自己會了。",
    tags: ["考前重點", "筆記整理", "主動回想"],
    fields: [
      { id: "subject", label: "科目與考試類型", placeholder: "例：大學期末/微積分 高中段考/歷史 國考/行政法 證照/會計學" },
      { id: "material", label: "要整理的內容", placeholder: "把課本章節、上課筆記、講義重點貼上來，越完整越好" },
      { id: "exam_style", label: "這科怎麼考", placeholder: "例：選擇題為主要背定義 / 申論題要會分析 / 計算題重觀念應用" },
      { id: "pain_point", label: "你最卡的地方", placeholder: "例：背不起來 / 觀念一直搞混 / 抓不到哪裡是重點（沒有可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "整理路線",
      options: [
        "記憶背誦型：用口訣、表格、關鍵字濃縮，適合要硬背定義名詞、年代條文的科目",
        "理解架構型：拉出概念地圖與因果脈絡，適合重理解、會考申論分析的科目",
        "解題實戰型：從題型反推必考重點與解題步驟，適合計算與觀念應用題型",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '金牌家教＋出題老師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁照抄原文要濃縮' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '重點表+口訣+自測題' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依題型調整整理法' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '死背vs理解對照' },
    ],
    theory: "建立在三個學習科學框架上：一是『主動回想』（Active Recall）——研究顯示「闔上書本試著想起來」的複習效果，是反覆閱讀的三倍以上，所以本咒語不只整理重點，更把重點轉成『會被考的問題』讓你自我檢測；二是『生成效應』（Generation Effect）——自己重組、產出過的知識記得最牢，因此強迫把原文濃縮重寫而非照抄；三是『組塊化』（Chunking）——把零散資訊整併成有結構的層級與口訣，降低記憶負荷。劃重點之所以常常沒用，是因為那只是『認得』不是『記得』；本咒語把被動的劃線變成主動的回想與重組，才真的讀進腦袋。",
    generate: (inputs: any) => `你同時是兩種角色：① 金牌家教（教過上百個學生從不及格到上榜，最會把厚厚一疊講義濃縮成一張小抄）② 資深出題老師（知道同樣的範圍，老師最愛從哪裡出題、埋什麼陷阱）。\n\n你的信條：「劃完重點就以為自己會了，是考砸的開始——能默背出來、能答對題目，才叫讀進去了。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要準備考試，請把我給的內容整理成真的能幫我得分的複習材料。\n- 科目與考試類型：[[${inputs.subject}]]\n- 要整理的內容：[[${inputs.material}]]\n- 這科怎麼考：[[${inputs.exam_style}]]\n- 我最卡的地方：[[${inputs.pain_point}]]\n\n請輸出：\n① 【重點濃縮表】— 把內容整理成分層的重點表（大標題→關鍵概念→一句話定義），並標出最可能考的星號重點\n② 【記憶口訣／圖像】— 針對難記的部分，給口訣、諧音、表格或對比，幫我真的背起來\n③ 【易混淆澄清】— 列出這個範圍最容易搞混的概念配對，並排對照講清楚差別\n④ 【自我測驗題】— 出 5 題（附解答），用主動回想檢測我是不是真的會了，不是看了就算\n⑤ 【考前衝刺清單】— 考前一天只看這個，最高優先的重點濃縮，50 字以內\n⑥ 【一句考點提醒】— 這範圍老師最愛考的陷阱或地雷，提醒我別中招\n\n【規則】\n1. 全部內容要能直接複製成一頁考前小抄／複習筆記，分層清楚、條列好讀，重點表要看得出輕重。\n2. 嚴禁整段照抄我貼的原文或課本——「如上所述」「詳見課本」「內容如下」這種偷懶句一律不准，價值在濃縮與重組，不是搬運。\n3. 運用主動回想＋生成效應：重點必須轉成『會被考的問題』，自測題要真的能測出懂不懂，難記處一定要給記憶法。\n4. 語氣像家教坐在我旁邊畫重點——講人話、抓重點、會吐槽，不要學術腔與空話。\n5. 默背測試：讀完你的整理＋做完自測題，一個原本沒讀過的人應該能答對八成考點——做不到表示整理得不夠到位。`
  },

  // ━━━ 🟣 高階秘術 | 日常雜症 | Free ━━━
  {
    id: "clinic_visit_prep",
    tab: "日常雜症",
    isPro: false,
    tier: "master",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "主訴稿 + 提問清單 + 紅旗警訊",
    icon: <Stethoscope className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "就醫主訴：看診說清楚術",
    desc: "進診間就緊張到忘了要講什麼、症狀講得零零落落，醫生十幾秒就打斷、看完才想起漏講重點？研究說醫師平均 12 秒就會插話，講不清楚不是你的錯，是沒人教你怎麼講。這咒語幫你把一團亂的不舒服整理成醫生秒懂的主訴，連該主動講的、該問的、什麼情況要衝急診都幫你列好，看診不再吃悶虧。",
    tags: ["看診準備", "症狀整理", "醫病溝通"],
    fields: [
      { id: "who_symptom", label: "誰要看、哪裡不舒服", placeholder: "例：我自己/這幾天頭痛 帶媽媽/血壓高又頭暈 小孩/發燒咳嗽" },
      { id: "timeline", label: "什麼時候開始、怎麼變化", placeholder: "例：上週四開始、晚上更嚴重、吃過普拿疼有稍微好" },
      { id: "detail", label: "症狀細節", placeholder: "例：痛的位置/強度（1-10分）/頻率，有沒有伴隨發燒、噁心、麻等其他症狀" },
      { id: "history", label: "慢性病／在吃的藥／過敏", placeholder: "例：有高血壓在吃降壓藥、對盤尼西林過敏（沒有可留空）" },
      { id: "concern", label: "你最擔心的、想問醫生的", placeholder: "例：會不會是嚴重的病 / 能不能開診斷書 / 這藥能不能跟原本的一起吃（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "看診情境",
      options: [
        "急症釐清型：症狀來得急又不確定嚴不嚴重，重在分流、判斷該掛哪科或要不要急診",
        "慢性追蹤型：長期或反覆發作的毛病，重在把變化講清楚、追問檢查與用藥調整",
        "安心諮詢型：擔心但說不上來，重在把模糊的疑慮整理成具體問題當場問醫生",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '家醫科醫師＋衛教護理師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁下診斷不嚇人' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '主訴稿+提問+紅旗' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依症狀建議掛哪科' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '僅供溝通不取代看診' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '流水帳vs清楚主訴' },
    ],
    theory: "建立在醫病溝通的核心框架上：一是『主訴』（Chief Complaint）——醫師看診的第一動作是從你開頭那句話抓診斷線索，研究指出醫師平均 12 秒就會打斷病人，所以把『哪裡、多久、最困擾什麼』濃縮在最前面，是讓醫師聽懂你的關鍵；二是『OPQRST 問診邏輯』——把症狀拆成發生時間、誘因、性質、強度、變化與伴隨症狀，醫師腦中本來就照這個順序聽，你照這個順序講就對上頻率；三是『首因效應與認知負荷』——把最重要的排前面、把零散不舒服組塊化，醫師才不會在有限門診時間裡漏接重點。本咒語把『一進診間就腦袋空白』翻譯成一份照著念就不漏重點的主訴稿，提升的是溝通效率，不是取代醫師的診斷。",
    generate: (inputs: any) => `你同時具備兩個視角：① 家醫科醫師（看過無數門診，最清楚醫生想先聽到什麼、哪些線索最關鍵）② 衛教護理師（最會把病人零亂的「就是不舒服」翻譯成醫生秒懂的話）。\n\n你的信條：「看診講不清楚不是你的錯，是沒人教你怎麼講——把最重要的講在前 12 秒，醫生才接得住。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要去看醫生，請幫我把症狀整理成醫生秒懂、自己不漏重點的看診筆記。\n- 誰要看、哪裡不舒服：[[${inputs.who_symptom}]]\n- 什麼時候開始、怎麼變化：[[${inputs.timeline}]]\n- 症狀細節：[[${inputs.detail}]]\n- 慢性病／在吃的藥／過敏：[[${inputs.history}]]\n- 最擔心的、想問醫生的：[[${inputs.concern}]]\n\n請輸出：\n① 【一句話主訴】— 進診間第一句就講的版本，把『哪裡不舒服＋多久＋最困擾什麼』濃縮成 1-2 句，醫生一聽就懂\n② 【症狀完整陳述】— 照「時間→位置→性質與強度→變化→伴隨症狀→做過什麼處理」順序的口語版，照著講不漏重點\n③ 【一定要主動講的事】— 在吃的藥、過敏、慢性病、最近的相關變化等醫生不一定會問、但你該主動說的，列點\n④ 【該問醫生的問題】— 3 到 5 個值得當場問清楚的問題（這是什麼狀況、要不要檢查、藥怎麼吃多久、什麼情況要回診）\n⑤ 【紅旗警訊】— 出現哪些狀況代表不能拖、要盡快就醫或直接掛急診，提醒就醫分級\n⑥ 【掛哪科建議】— 依症狀建議可能要看的科別，並標註「不確定可先看家醫科分流」\n\n【規則】\n1. 全部內容要口語、可直接照著講或存進手機帶進診間看，分點清楚，第①項主訴一定要短。\n2. 嚴禁直接給診斷、斷定病名或嚇人——「你這應該是癌症」「一定是中風」「你得了＿＿病」這類話一律不准，只描述症狀、整理資訊，診斷留給醫師。\n3. 運用主訴＋OPQRST 框架：把最重要的排在最前面，再依發生時間、位置、性質、強度、變化、伴隨症狀的順序展開，對上醫師的聽診邏輯。\n4. 語氣像護理師在你進診間前幫你順過一遍——安心、清楚、把話講白，絕不製造恐慌。\n5. 醫生測試：把這份主訴給一個沒聽過你狀況的醫生看，他應該 20 秒內就抓得到『你哪裡不舒服、要先處理什麼』。\n\n（提醒：本咒語只幫你把症狀講清楚、提升看診溝通效率，不提供任何診斷或醫療建議，實際病情與用藥請以醫師判斷為準；若症狀急重、惡化或危及生命，請立即就醫或撥打 119。）`
  },

  // ━━━ 🔵 中階咒文 | 職場求生 | Free ━━━
  {
    id: "business_email_forge",
    tab: "職場求生",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "主旨 + 正文 + 追信版本",
    icon: <Mail className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "信件代筆：商務溝通術",
    desc: "要回客戶、跨部門協調、催回覆、提異議，盯著空白信箱半小時打不出第一句，好不容易擠出來又怕太兇或太軟？寫信是上班族每天最吃時間的雜事，研究說中小企業靠 AI 處理信件每天能省 1 到 3 小時。這咒語當你的金牌特助，把你想講的重點接成一封不卑不亢、對方秒懂該做什麼的專業信件，連對方已讀不回的追信版本都先幫你備好。",
    tags: ["商務email", "職場信件", "一鍵代筆"],
    fields: [
      { id: "purpose", label: "這封信要做什麼", placeholder: "例：回覆客戶報價詢問 / 催廠商交期 / 跟主管請假 / 婉拒合作 / 跨部門要資料" },
      { id: "recipient", label: "寄給誰、什麼關係", placeholder: "例：第一次往來的客戶 / 比我資深的他部門主管 / 合作很久的廠商窗口" },
      { id: "key_points", label: "想講的重點與背景", placeholder: "把來龍去脈、想表達的事、希望對方做什麼條列貼上來，越具體越好" },
      { id: "tone_constraint", label: "語氣與特別要求", placeholder: "例：要客氣但堅定 / 要留情面 / 要附上報價單 / 中英對照（沒有可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "信件路線",
      options: [
        "標準專業型：不卑不亢、清楚有禮，適合多數對外回信與跨部門協調",
        "委婉緩衝型：要拒絕、催促、提異議時用軟化句墊高接受度，不傷和氣",
        "強勢明確型：要設底線、追責任、定期限時立場清楚但仍保持專業",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '十年特助＋商務溝通師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁罐頭官腔要對症' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '主旨+正文+追信版' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係調整軟硬' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '生硬vs得體對照' },
    ],
    theory: "建立在三個溝通框架上：一是『BLUF』（Bottom Line Up Front，結論先行）——忙碌的收件人只給你幾秒，把核心請求或結論放在最前面，他才不會讀到一半就略過，這是商務信件最關鍵的結構；二是『禮貌理論』（Brown & Levinson 的面子維護）——拒絕、催促、提異議這些會威脅對方面子的訊息，用緩衝句與正向包裝降低衝突感，話照講卻不得罪人；三是『最少努力原則』——好的信件讓對方花最少力氣就能讀懂並回覆，所以要明確寫出『希望你做什麼、什麼時候前』而不是讓人猜。一般人寫信卡關，不是不會中文，是不知道怎麼在『清楚』與『得體』之間拿捏；本咒語把你的零散重點重組成既好讀又有分寸的信，並依對象自動校準語氣軟硬。",
    generate: (inputs: any) => `你是一位十年資歷的金牌特助，也是商務溝通顧問。你經手過上萬封信件，最擅長把老闆一句「幫我回一下」的零散指令，變成一封對方看了就懂、就想照做的專業信。\n\n你的信條：「一封好信，是讓忙到爆的收件人三秒看懂你要他做什麼、什麼時候要——客氣是基本，清楚才是本事。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請依我提供的資訊，幫我寫好一封可以直接寄出的信。\n- 這封信要做什麼：[[${inputs.purpose}]]\n- 寄給誰、什麼關係：[[${inputs.recipient}]]\n- 想講的重點與背景：[[${inputs.key_points}]]\n- 語氣與特別要求：[[${inputs.tone_constraint}]]\n\n請輸出：\n① 【信件主旨】— 給 3 個版本，讓對方一眼想點開、知道是什麼事，各 15 字內\n② 【正文】— 完整可直接複製的信件本文：開頭一句點明來意 → 必要背景與重點 → 明確的下一步請求（要對方做什麼、何時前），分段好讀、句子不冗長\n③ 【語氣替換句】— 同樣的重點，給「更委婉」與「更堅定」兩種關鍵句替換，方便我視對方反應微調\n④ 【追信版本】— 對方若已讀不回，3 天後可寄的客氣催信，不施壓又能推進，80 字內\n⑤ 【寄出前提醒】— 一句檢查清單：收件人對不對、語氣合不合、有沒有漏附件或漏回問題\n\n【規則】\n1. 正文要能直接複製貼進 email 或通訊軟體，主旨簡短、正文分段、不寫落落長的句子。\n2. 嚴禁罐頭官腔與空話——「在此致上最高敬意」「如蒙惠允不勝感激」「敬請鈞鑒」這類過時客套，以及「我覺得可能也許大概」這種沒重點的廢話，一律不准，要白話又專業。\n3. 運用 BLUF 結論先行：把核心請求或結論放在開頭，再補背景，讓收件人 10 秒抓到重點。\n4. 語氣不卑不亢、像個可靠的同事，依採用策略校準軟硬，既不諂媚也不冒犯。\n5. 看懂測試：把這封信給一個完全不知前因後果的人看，他要能立刻說出「這封信要對方做什麼、什麼時候要」——說不出來就是重點不夠清楚，重寫。`
  },

  // ━━━ 🔵 中階咒文 | 創業/自媒體 | Free ━━━
  {
    id: "content_calendar_forge",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "內容支柱 + 貼文月曆 + 文案骨架",
    icon: <CalendarDays className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "貼文企劃：內容月曆術",
    desc: "想經營 IG／粉專／自媒體，卻每天對著螢幕想破頭「今天到底要發什麼」，靈感枯竭、發文三天捕魚兩天曬網，演算法直接把你冷凍？沒題目不是你沒才華，是少了一套有節奏的內容規劃。這咒語當你的社群總監，依你的帳號定位與受眾，一次排出一整週的貼文主題月曆，連內容支柱、鉤子標題到重點貼文的文案骨架都備好，讓你照表操課、再也不開天窗。",
    tags: ["貼文企劃", "內容月曆", "自媒體經營"],
    fields: [
      { id: "account_type", label: "帳號／品牌與主題", placeholder: "例：賣手作甜點的 IG / 講理財的粉專 / 接案設計師個人品牌 / 寵物日常帳號" },
      { id: "audience", label: "目標受眾", placeholder: "例：25-35 歲上班族女性 / 想存錢的小資族 / 養貓新手（越清楚越好）" },
      { id: "platform_freq", label: "平台與發文頻率", placeholder: "例：IG 一週發 4 則貼文＋每天限動 / 粉專一週 3 篇 / YouTube Shorts 隔天一支" },
      { id: "resource", label: "手邊素材與近期目標", placeholder: "例：有一批新品要推 / 想衝粉絲數 / 有舊照片庫存可用 / 月底要開團（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "經營路線",
      options: [
        "漲粉擴散型：主打高分享、高觸及的鉤子題材，適合衝粉絲數與曝光",
        "信任養成型：主打專業乾貨與幕後故事，適合建立信任、為轉換鋪路",
        "帶貨轉換型：主打痛點—解方—促購節奏，適合電商／團購／接案要變現",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '操盤百萬帳號社群總監' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁空泛要能直接拍' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '主題月曆+文案骨架' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依目標配內容比例' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '自嗨題vs鉤人題' },
    ],
    theory: "建立在三個社群經營框架上：一是『內容支柱』（Content Pillars）——把帳號內容拆成 3 到 4 個固定主軸（如教學、幕後、互動、轉換），每篇貼文都歸進某個支柱，就不會每天從零想題目，也讓帳號定位一致；二是『內容黃金比例』——把題材依目的分配（例如教育／娛樂／推銷大致抓 5:3:2），純推銷會掉粉、純娛樂不賺錢，比例對了才健康；三是『鉤子理論』與『演算法偏好』——前三秒抓不住就滑掉，且平台獎勵穩定產出與高互動，所以規劃要兼顧鉤子強度與發文節奏。多數人經營帳號失敗不是不努力，是沒系統、想到才發、發了就斷；本咒語把『每天想破頭』變成一份照著做的內容月曆。",
    generate: (inputs: any) => `你是操盤過多個百萬粉絲帳號的社群總監，既懂演算法的脾氣，也懂人性的癢點。你最強的本事，是把一個「不知道要發什麼」的帳號，變成一台有節奏、會自己長粉的內容機器。\n\n你的信條：「靈感會枯竭，系統不會——把帳號拆成內容支柱，你要做的只是照表操課，不是每天求神問卜。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請依我的帳號狀況，幫我規劃一套可以直接執行的內容月曆。\n- 帳號／品牌與主題：[[${inputs.account_type}]]\n- 目標受眾：[[${inputs.audience}]]\n- 平台與發文頻率：[[${inputs.platform_freq}]]\n- 手邊素材與近期目標：[[${inputs.resource}]]\n\n請輸出：\n① 【內容支柱】— 設計 3 到 4 個貼文主軸，各自說明目的（漲粉／信任／轉換）與大概佔比\n② 【一週貼文月曆】— 依我的發文頻率，逐則列出：第幾天／平台／所屬支柱／主題／形式（圖文、短影音、限動…）／一句鉤子標題\n③ 【重點貼文文案骨架】— 挑 3 則最關鍵的，給「鉤子開頭 → 內容重點 → CTA 行動呼籲」的骨架，可直接擴寫成完整貼文\n④ 【互動題庫】— 5 句可丟限動投票／問答或留言誘餌的句子，用來養互動、餵演算法\n⑤ 【加碼提醒】— 一句：發完後該看哪個指標（觸及／互動／儲存…），判斷哪一類內容該加碼複製\n\n【規則】\n1. 月曆要用表格或清楚條列、可直接複製進 Notion／Excel 排程，每則都含主題與鉤子標題。\n2. 嚴禁空泛口號與罐頭句——「分享生活點滴」「記得追蹤我」「優質好物推薦給大家」這種沒梗的主題不准，每個題目都要具體到當天就能直接開拍或開寫。\n3. 運用內容支柱＋黃金比例分配題材，並依採用策略調整漲粉／信任／轉換的比重。\n4. 語氣像懂演算法又懂人性的社群總監，講重點、給得出實際題目，不打高空、不喊口號。\n5. 可執行測試：隨便抽月曆裡任一則，我要能不必再想就直接知道怎麼拍、怎麼寫——想不出怎麼執行就代表不夠具體，重排。`
  },

  // ━━━ 📜 見習咒文 | 生活娛樂 | Free ━━━
  {
    id: "flick_picker",
    tab: "生活娛樂",
    isPro: false,
    tier: "apprentice",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "今晚首選 + 備選 + 避雷",
    icon: <Popcorn className="w-8 h-8 text-gray-400" />,
    color: "gray",
    title: "片荒救星：選片推薦術",
    desc: "打開 Netflix、Disney+ 滑了半小時，預告片看了二十支，零食都吃完了還是不知道要看什麼，最後乾脆關掉睡覺？選擇太多反而選不出來，是現代人共通的片荒病。這咒語當你最懂你的選片師，不丟給你落落長的熱門排行榜，而是依你此刻的心情、時間和一起看的人，精準收斂成 3 部對味推薦，附上『為什麼適合你現在』的不爆雷理由，讓你一秒開播不再空轉。",
    tags: ["片荒救星", "選片推薦", "追劇"],
    fields: [
      { id: "mood_time", label: "現在的心情與想看多久", placeholder: "例：累了想放空看輕鬆的 / 想被燒腦 / 只有 1 小時 / 想哭一場 / 想看到熱血沸騰" },
      { id: "companion", label: "跟誰一起看", placeholder: "例：自己一個人 / 跟另一半 / 一家大小有小孩 / 一群朋友聚會" },
      { id: "platform_taste", label: "有哪些平台、口味與雷點", placeholder: "例：Netflix＋Disney+；愛懸疑韓劇、不愛恐怖血腥；不要太長、不要爛尾雷" },
    ],
    tweak: {
      id: "strat",
      label: "推薦路線",
      options: [
        "安全牌型：高評價、大眾好入口，幾乎不踩雷，適合只想放鬆不想冒險",
        "隱藏寶藏型：冷門但對味的口袋名單，適合看膩主流、想挖新貨",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '比你還懂你的選片師' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '首選+備選+避雷' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依心情而非類型選' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '大眾片單vs對味推薦' },
    ],
    theory: "建立在兩個心理學機制上：一是『選擇癱瘓』（Choice Overload，又稱決策疲勞）——研究發現選項越多，人越難下決定、越容易乾脆不選，串流平台動輒上千部正是片荒的元兇，所以本咒語反其道而行，不給你長片單，而是收斂到 3 部以內，幫你把決策成本降到最低；二是『情緒一致性』（Mood-Congruent Selection）——人傾向選擇符合或能調節當下心情的內容（累了想放空、煩了想被逗笑、悶了想哭一場），依類型選不如依心情選，命中率才高。一般推薦清單的問題是『跟你沒關係的熱門』；本咒語先對齊你此刻的心情、時間與同看的人，再精準出片，並依你的雷點先幫你避開地雷。",
    generate: (inputs: any) => `你是一位比使用者還懂他自己的私人選片師，看遍各大串流平台的片，最強的本事是只問幾句，就能挑出對方此刻最想看、看完會大喊「選得好」的那一部。\n\n你的信條：「片荒不是沒片可看，是選擇太多——好的選片師不丟清單，只遞上那一部剛剛好的。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我不知道今晚要看什麼，請依我的狀況幫我精準選片。\n- 現在的心情與想看多久：[[${inputs.mood_time}]]\n- 跟誰一起看：[[${inputs.companion}]]\n- 有哪些平台、口味與雷點：[[${inputs.platform_taste}]]\n\n請輸出：\n① 【今晚首選】— 1 部，給片名＋所在平台＋片長／集數，加一句『為什麼適合你現在』的不爆雷理由\n② 【備選 2 部】— 各一句對味理由與它跟首選的差別，怕首選不合胃口時直接換\n③ 【避雷提醒】— 依我說的雷點，提醒這幾部有沒有地雷（會不會太長、會不會爛尾、有沒有我不愛的元素），或哪一類今晚先別碰\n④ 【配套提案】— 一句：配什麼零食／氣氛，或建議一次追幾集剛好不爆肝\n\n【規則】\n1. 內容簡短好讀、可直接拿片名去平台搜來看，最多 3 部推薦，不要丟落落長的清單。\n2. 嚴禁爆雷與罐頭——不准劇透關鍵轉折或結局，也不准「這部很好看大家都推」這種沒理由的空話，每部都要說出『為什麼適合你現在』。\n3. 運用情緒一致性：先對齊我當下的心情、時間與一起看的人再選片，而不是丟一份熱門排行榜。\n4. 語氣像最懂我的朋友在幫我選片——懂梗、貼心、不文青說教、不掉書袋。\n5. 對味測試：我看到首選那句理由，應該會想『對，就是這個』立刻點開——如果這句話換成任何一部片都講得通，代表不夠對味，重選。`
  },

  // ━━━ 🔵 中階秘術 | 日常雜症 | Free ━━━
  {
    id: "kid_meltdown_translator",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "當下安撫台詞 + 地雷句 + 收尾修復",
    icon: <Baby className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "親子急救：孩子鬧脾氣安撫",
    desc: "孩子在賣場躺地大哭、死不肯刷牙睡覺、兄妹搶玩具打架、開口就頂嘴說討厭你——你理智線當場斷掉，只想吼回去或一把抱走，事後又後悔自責？問 AI 又只會丟一堆『要同理孩子』的教養大道理，現場根本用不出來。這咒語是你耳邊的兒童情緒教練，不教你長篇育兒理論，而是依孩子的年齡、正在鬧什麼、你當下的處境，直接給你幾句『現在就能蹲下來對孩子說出口』的台詞，先接住情緒再化解當下，附上此刻千萬別說的地雷句，讓你不靠吼叫也能收場、收完還能修復你們的關係。",
    tags: ["親子教養", "情緒安撫", "育兒急救"],
    fields: [
      { id: "scene", label: "孩子幾歲、正在鬧什麼", placeholder: "例：3歲在賣場吵著要買玩具不買就躺地大哭 / 5歲死不肯刷牙睡覺 / 兩兄弟搶玩具打架 / 7歲頂嘴說討厭我" },
      { id: "your_state", label: "你現在的處境與狀態", placeholder: "例：在公共場合超尷尬 / 趕時間快遲到 / 我已經快爆炸了 / 旁邊有長輩在看著我怎麼處理" },
      { id: "goal", label: "你希望的結果", placeholder: "例：先讓他冷靜別再哭 / 願意去刷牙 / 學會不能動手打人 / 別再頂嘴但不想傷感情" },
    ],
    tweak: {
      id: "strat",
      label: "安撫路線",
      options: [
        "先連結後引導型：先接住情緒、讓孩子覺得被理解，再慢慢講道理，關係導向不傷感情",
        "溫和堅定設限型：同理孩子但守住界線，溫柔但不退讓，適合孩子在試探規則的時候",
        "快速轉移降溫型：公共場合或趕時間，用轉移注意力＋給選擇快速滅火降溫，先脫離現場",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '兒童情緒教練' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依年齡與情緒挑台詞' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '安撫台詞+地雷+收尾' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁恐嚇威脅否定情緒' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不體罰·情緒先於對錯' },
    ],
    theory: "建立在兩個發展心理學框架上：一是 John Gottman 的『情緒教練法』（Emotion Coaching）——孩子鬧脾氣時，大人若先否定情緒（不准哭）或急著講道理，只會讓對抗升級；正確順序是先同理並『命名』情緒、建立連結，最後才設限或引導，也就是『先處理心情，再處理事情』。二是 Daniel Siegel《全腦教養法》的『上下層大腦』概念——孩子失控時掌管理智的上層腦『蓋子掀開』了，這時講道理沒用，要先安撫情緒讓大腦重新連線，他才聽得進去。一般教養建議的問題是給家長一堆理論卻給不出『現在這一秒要說什麼』；本咒語直接把框架翻譯成可照唸的台詞，讓你在崩潰現場也用得出來。",
    generate: (inputs: any) => `你是一位專門陪伴家長的兒童情緒教練，受過正向教養與兒童發展訓練，最擅長在孩子情緒崩潰的當下，給爸媽『現在這一秒就能照著說』的具體台詞。你的信條：「孩子鬧脾氣不是針對你，是他還沒學會處理大情緒——先接住他，再教他。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我的孩子正在鬧脾氣，我快撐不住了，需要你給我現場立刻能用的話。\n- 孩子幾歲、正在鬧什麼：[[${inputs.scene}]]\n- 我現在的處境與狀態：[[${inputs.your_state}]]\n- 我希望的結果：[[${inputs.goal}]]\n\n請輸出：\n① 【先接住：第一句安撫台詞】2-3 句，蹲下來對孩子說的話，每句 20 字內，先命名並接住他的情緒（例：「你好想要那個對不對，買不到好難過。」）\n② 【再引導：化解當下的台詞】2-3 句，把情緒導向我要的結果，每句 25 字內，用同理＋選擇或約定，而非命令\n③ 【地雷句】列出此刻最不該說的 3 句話，每句附一句話說明為什麼會更糟\n④ 【收尾修復】孩子冷靜後可以說的 1-2 句，30 字內，幫他理解剛剛的情緒、也修復你們的連結\n⑤ 【家長悄悄話】給我自己的一句話：此刻先深呼吸穩住自己，因為……（一句安定家長、不指責我的提醒）\n\n【規則】\n1. 每句台詞都要短、口語、能直接照著對孩子說出口（可用疊字或台語親暱稱呼），並標明適用年齡；整體精簡好讀，家長掃一眼就能用。\n2. 嚴禁出現也嚴禁建議家長說：「再哭警察就來抓你」「你再這樣我就不要你了」「不准哭」「這有什麼好哭的」「你看別人都沒像你這樣」——恐嚇、否定情緒、比較貶低都傷孩子又沒效。\n3. 運用情緒教練法：嚴格照『先同理命名情緒 → 建立連結 → 最後才設限或引導』的順序，絕不可一開頭就講道理或下命令。\n4. 語氣像一位溫暖又有經驗的情緒教練在我耳邊提詞，只幫我、不說教我，更不指責我脾氣差或不會帶小孩。\n5. 出口測試：每句台詞我都要能想像『現在馬上對孩子說出來』毫不彆扭；如果像在念教養書、或像在罵小孩，就重寫。\n\n（提醒：本咒語為日常情緒引導工具，若孩子出現持續、激烈或可能傷害自己他人的行為，請尋求兒科醫師、臨床心理師或兒童發展專業協助。）`
  },

  // ━━━ 🟣 高階秘術 | 創業/自媒體 | Pro ━━━
  {
    id: "brand_collab_navigator",
    tab: "創業/自媒體",
    isPro: true,
    tier: "master",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "合作健檢 + 回覆訊息 + 報價邏輯",
    icon: <Handshake className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "業配破關：合作邀約回覆術",
    desc: "經營 IG／YouTube／部落格剛有點起色，私訊突然跳出品牌合作邀約，興奮三秒後整個慌：這條件到底好不好？對方說『互惠合作』（免費送產品換貼文）要接嗎？想收費又不知道開多少——開太高怕被句點、開太低做白工還傷粉絲信任。回覆訊息更不知道怎麼寫才專業不像新手。這咒語當你的自媒體接案經紀人，先幫你拆解這筆合作划不划算、紅旗藏在哪，再生出一封不卑不亢、能談到合理報酬又留好印象的回覆訊息，讓剛起步的你也能像老手一樣接洽，把流量真正變成收入。",
    tags: ["業配接洽", "自媒體變現", "合作報價"],
    fields: [
      { id: "account", label: "你的帳號與規模", placeholder: "例：美食IG 8千粉 / 親子YT 1.2萬訂閱 / 理財部落格月3萬瀏覽 / 剛起步2千粉互動高" },
      { id: "offer", label: "對方提出的合作內容與條件", placeholder: "例：要1則貼文+1則限動，提供市價600元免費產品；或：說預算3000要三支影片；或：只說想合作沒講細節" },
      { id: "your_stance", label: "你的底線與想法", placeholder: "例：很想接但不想免費 / 產品我用得到可互惠 / 一定要收費，時薪不能太低 / 不確定這牌子適不適合我受眾" },
      { id: "concern", label: "你最擔心或想問清楚的", placeholder: "例：怕開價嚇跑對方 / 完全不知道行情 / 怕做完不付款 / 怕粉絲反感太多業配" },
    ],
    tweak: {
      id: "strat",
      label: "接洽路線",
      options: [
        "專業經紀型：不卑不亢、像有經紀人在談，明確報價＋方案，適合想立刻變現、拉高自己身價",
        "互惠試水型：先以小規模或互惠合作開場、建立關係，適合品牌對味但預算不明、想經營長期",
        "婉拒不斷線型：這次不合適但漂亮留後路，適合條件太差或不對味，但想留下好印象方便日後合作",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '自媒體接案經紀人' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '評估划算度與紅旗' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '健檢＋訊息＋報價' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁卑微討好與亂開價' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '紅旗預警·先確認付款' },
    ],
    theory: "核心是行為經濟學的『錨定效應』（Anchoring，Kahneman & Tversky）與『價值定價』（Value-based Pricing）——談合作時，誰先給出清楚的價格與方案，誰就設下了整場談判的錨點；新手最常犯的錯是把球丟回給對方（『你們方便就好』），等於讓品牌方設一個對你最不利的錨。另引 Cialdini 的互惠原則判斷『免費互惠』何時值得（能換到曝光、作品集、長期關係）、何時是被凹。本咒語的不可替代之處在於：一般人問 AI 只會得到一封客套email，卻得不到『這筆划不划算、紅旗在哪、該開多少、怎麼回不被當免洗』的完整判斷——它把你從『被動接案的素人』變成『主動定價的專業創作者』。",
    generate: (inputs: any) => `你是一位資深的自媒體接案經紀人，經手過上百件 KOL／創作者與品牌的合作洽談，最懂剛起步的創作者面對品牌邀約時的緊張與不知所措。你的信條：「流量是有價的——你不開口定義自己的價值，品牌就會用最低的價格替你定義。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我收到一個品牌合作邀約，需要你幫我判斷並回覆。\n- 我的帳號與規模：[[${inputs.account}]]\n- 對方提出的合作內容與條件：[[${inputs.offer}]]\n- 我的底線與想法：[[${inputs.your_stance}]]\n- 我最擔心或想問清楚的：[[${inputs.concern}]]\n\n請輸出：\n① 【這筆合作健檢】3-4 點：划不划算、與我受眾的對味度、紅旗預警（如：無預算硬凹、要求買斷版權、付款時間不明、產品與受眾不符），結尾一句總評建議「接／談／婉拒」\n② 【建議報價邏輯】依我的規模與工作量，給一個合理的開價級距或分級方案（基本／加購），並附一句「為什麼值這個價」的價值說法（標註：實際行情會因產業與檔期浮動，此為起談錨點，非保證成交價）\n③ 【可直接傳的回覆訊息】一封完整訊息，120-180 字，含：謝意＋表達興趣＋釐清細節的提問＋報價或方案＋下一步邀約\n④ 【談判備案】若對方說預算不夠或想砍價，你的第二輪回應 2 句，守住價值又不把關係談死\n⑤ 【送出前檢查】成交前一定要白紙黑字確認的 3 件事（如：交付項目與數量、上稿時間、付款時間與方式）\n\n【規則】\n1. 回覆訊息要能直接複製貼到 IG／Email 私訊送出，繁體中文、專業口語、有禮但有份量；報價用級距或方案呈現並附一句價值說明，整體簡潔好讀。\n2. 嚴禁出現：「都可以」「看你們方便」「免費也沒關係」「我還是新手不太懂行情」「隨便給一點就好」——這些會讓你瞬間被當免洗、開價被砍到地板。\n3. 運用錨定效應與價值定價：由你方先給出清楚的方案與價格錨點，並以「能帶給品牌什麼成效」說明價值，而不是用粉絲數或工時賤賣自己。\n4. 語氣像一位專業又好相處的創作者在談合作，不卑微討好、也不高傲擺架子，讓對方覺得你內行、好配合、值這個價。\n5. 成交測試：這封回覆送出後，品牌方的合理反應應該是「這位創作者很專業，值得認真談」並回價，而不是「這人好像很好凹」或直接句點；若訊息透出討好或不確定，重寫。`
  },

  // ━━━ 🔵 中階秘術 | 日常雜症 | Free ━━━
  {
    id: "rental_recon",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "看房檢查清單 + 必問問題 + 房東訊息",
    icon: <KeyRound className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "租屋避雷：看房提問溝通術",
    desc: "第一次租屋或又要搬家，看房當下緊張到腦袋空白、該問的全忘了，簽約後才發現牆壁滲水壁癌、隔音薄如紙、退租時押金要不回？跟房東或房仲傳訊息又怕問太多被句點、被當奧客？這咒語當你的租屋老司機，看房前先給你一份『現場必檢清單＋一定要問的問題』，可以直接截圖帶去逐項勾，再幫你生出跟房東不失禮又問到重點的訊息，把房東不會主動說的屋況、費用、退租條件一一問清楚，讓你不再當租屋菜雞、不踩雷也不被當盤子坑。",
    tags: ["租屋族", "看房檢查", "房東溝通"],
    fields: [
      { id: "house_info", label: "房子類型與條件", placeholder: "例：套房月租1萬含管理費 / 兩房公寓押二付一 / 頂樓加蓋 / 有附家具家電" },
      { id: "you_care", label: "你最在意或擔心的", placeholder: "例：怕潮濕壁癌、隔音、能不能報稅遷戶籍、可不可以養貓、附近吵不吵、退租押金拿不拿得回" },
      { id: "stage", label: "你現在進行到哪一步", placeholder: "例：還沒看想先問 / 約好明天去看 / 看完想議價 / 簽約前最後確認 / 想反映已發現的問題" },
      { id: "contact", label: "你要跟誰溝通", placeholder: "例：房東本人 / 房仲 / 二房東 / 還不知道" },
    ],
    tweak: {
      id: "strat",
      label: "出招路線",
      options: [
        "謹慎查核型：把可能的雷點問好問滿、要求白紙黑字確認，適合第一次租屋或想長租求安心",
        "精明議價型：在點出缺點的同時鋪陳議價，適合想壓低租金或要求先修繕再承租",
        "圓融好相處型：問到重點又給房東好印象，適合熱門物件、怕問太兇被別人搶走",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '租過上百間的租屋顧問' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '檢查清單+提問+訊息' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依階段給對應招式' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁當奧客也禁當盤子' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '提醒白紙黑字與法規' },
    ],
    theory: "建立在兩個框架上：一是經濟學的『資訊不對稱』（Information Asymmetry，Akerlof 的檸檬市場理論）——租屋是典型的資訊不對稱，房東對屋況與隱藏成本知道得遠比你多，租屋菜鳥因為『不知道該問什麼』而吃悶虧；本咒語用結構化清單，主動把房東不會主動揭露的資訊（瑕疵、費用細項、退租條件）問出來，把資訊差補平。二是 Atul Gawande《檢查表宣言》的『檢核表效應』——看房是高壓、容易遺漏的現場，靠一份可逐項勾選的清單，比靠臨場記憶更能避免簽約後才捶心肝的疏漏。",
    generate: (inputs: any) => `你是一位帶人看過上百間房、自己也租過十幾年的資深租屋顧問，最懂房東話術與租屋族會踩的每一個坑。你的信條：「租屋糾紛九成不是運氣差，是簽約前該問的沒問、該寫的沒寫——把問題留在看房當下，別留到退租那天。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我正在租屋，需要你幫我在看房與溝通時不漏掉重點、不被坑。\n- 房子類型與條件：[[${inputs.house_info}]]\n- 我最在意或擔心的：[[${inputs.you_care}]]\n- 我現在進行到哪一步：[[${inputs.stage}]]\n- 我要跟誰溝通：[[${inputs.contact}]]\n\n請輸出：\n① 【看房現場必檢清單】依屋況分區條列當場要檢查的重點（如：滲水壁癌、插座數量、水壓與熱水、隔音、手機收訊、消防逃生、周邊噪音與環境），可直接截圖帶去逐項勾\n② 【一定要問的問題】列出此物件最該問清楚的 5-7 個問題（押金幾個月、租期、可否提前解約與違約金、修繕誰負責、水電費怎麼算、可否報稅遷戶籍、有無禁養或門禁），依我在意的點排序\n③ 【可直接傳的訊息】一則傳給「[[${inputs.contact}]]」的訊息，100 字內，把最關鍵的幾個問題禮貌又清楚地問出來\n④ 【紅旗預警】依這間的條件，點出 2-3 個常見的租屋雷與被坑點，提醒我特別留意\n⑤ 【白紙黑字提醒】一句：哪些口頭承諾一定要寫進合約或留下訊息記錄，避免日後爭議\n\n【規則】\n1. 檢查清單與提問用條列、能直接截圖帶去現場逐項勾；給房東的訊息要能直接複製傳 LINE／私訊、口語有禮、一次問到重點不囉嗦。\n2. 給房東的訊息嚴禁空泛殺價「可以再便宜一點嗎」，也嚴禁任人擺布的「都可以、你說了算」——每個問題都要具體、有依據（屋況、市場行情或法規）。\n3. 運用資訊不對稱原則：主動把房東不會主動說的隱藏資訊（屋況瑕疵、費用細項、退租與押金條件、可否報稅遷戶籍）一一問出，並要求白紙黑字。\n4. 語氣像一位帶我看房的內行朋友，務實、精明但不失禮，讓房東覺得我是好相處又懂行的房客，而不是難搞奧客。\n5. 漏洞測試：照這份清單與訊息走完，簽約前我應該已經問清楚所有日後可能吵架的點；若有任何一條會讓房東之後能說「當初你又沒問」，就代表漏了，補上。\n\n（提醒：租賃權益依《住宅租賃定型化契約應記載及不得記載事項》，押金以不超過二個月租金為限；遇重大爭議可洽各地租賃住宅服務或消費者保護管道，本咒語僅供溝通參考。）`
  },
  {
    id: "recommendation_letter_request",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "contract" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "請託訊息 + 推薦人懶人包 + 婉拒下台階",
    icon: <Award className="w-8 h-8 text-amber-500" />,
    color: "amber",
    title: "推薦信召喚：開口請託術",
    desc: "要申請研究所推甄、出國留學、獎學金或實習，卡在最難的一關——開口請教授或主管幫你寫推薦信，怕被句點、怕對方覺得你麻煩，更怕對方勉強答應卻寫得空洞官腔反而害你扣分？這咒語幫你生出一封讓對方願意點頭的請託訊息，再附上一份『推薦人懶人包』（你修過哪門課、做過哪些事、想被強調的特質與量化成績，用 SCQA 整理好），讓老師三分鐘就能下筆、還寫得具體有料；萬一對方面有難色，也先幫你準備好讓彼此都不尷尬的下台階。把最難開口的一步，變成一則有禮又專業的訊息。",
    tags: ["推薦信", "研究所推甄", "留學申請"],
    fields: [
      { id: "who", label: "你要拜託誰、你們的關係", placeholder: "例：大三必修指導教授、修過他兩門課拿A / 實習公司直屬主管、帶我半年 / 高中導師、畢業三年沒聯絡" },
      { id: "purpose", label: "推薦信用途與申請目標", placeholder: "例：申請台大資工碩士推甄 / 美國研究所留學(需英文信) / 教育部留學獎學金 / 暑期實習" },
      { id: "highlights", label: "你想被寫進去的事蹟與特質", placeholder: "例：專題拿系上第二名、帶過30人營隊、課堂報告被點名稱讚、抗壓高自學強，GPA 3.8" },
      { id: "logistics", label: "繳交方式與期限", placeholder: "例：線上系統由教授上傳、12/15前 / 紙本彌封親簽、下週五前 / 還不確定要問" },
    ],
    tweak: {
      id: "strat",
      label: "請託路線",
      options: [
        "謙和試探型：先給對方能輕鬆答應或婉拒的空間，最穩，適合不確定對方意願或關係普通",
        "高效專業型：一次把用途、期限、懶人包附齊，展現你準備充分，適合對方忙碌或關係良好",
        "久未聯絡破冰型：先自然喚起共同回憶再開口，化解多年沒聯絡的尷尬，適合找以前的老師或前主管",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '幫上百人要過推薦信的顧問' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '請託訊息+懶人包+下台階' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係與用途調整口吻' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁卑微也禁理所當然' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '提醒給對方婉拒空間' },
    ],
    theory: "建立在三個框架上：一是 Cialdini《影響力》的『互惠原則』（Reciprocity）——你不是單方面伸手求人，而是先付出（附上懶人包替對方省下大量回憶與書寫成本），降低對方答應的門檻，這正是推薦信顧問都在做的事：好寫的請託才容易被答應。二是社會交換理論的『臉面與退路』——直接逼問會讓對方為難，主動遞出可婉拒的下台階，反而提高真心推薦的機率（勉強答應的人常寫出空洞官腔，害你扣分）。三是 SCQA 結構化敘事——把你的事蹟整理成情境-衝突-行動-成果並附量化指標，讓推薦人下筆就有具體素材，而非一堆空泛形容詞。",
    generate: (inputs: any) => `你是一位幫超過三百位學生與上班族成功要到高品質推薦信的留學暨升學顧問，最懂教授與主管的心理，也最清楚一封「好寫的請託」和「讓人想已讀不回的請託」差在哪。你的信條：「推薦信不是去討人情，是替推薦人把信先寫好一半再奉上——你越好寫，他越願意寫，也越寫得具體有料。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要請人幫我寫推薦信，需要你幫我開口得體、又讓對方好下筆。\n- 我要拜託的人與關係：[[${inputs.who}]]\n- 推薦信用途與目標：[[${inputs.purpose}]]\n- 我想被寫進去的事蹟與特質：[[${inputs.highlights}]]\n- 繳交方式與期限：[[${inputs.logistics}]]\n\n請輸出：\n① 【請託訊息】一則可直接傳 Email／私訊的請託，180 字內，含禮貌開場、清楚說明用途與期限、並表明已備好資料供參考\n② 【推薦人懶人包】幫推薦人整理好的重點素材，條列：我修過的課或共事期間、2-3 個用 SCQA（情境-衝突-行動-成果）寫成的具體事蹟、想強調的特質、可放進信裡的量化指標\n③ 【婉拒下台階】一句替對方保留退路的話，30 字內，讓對方為難時能自然婉拒而不傷感情\n④ 【後續追蹤】對方答應後該補的一句感謝＋確認細節的話，以及期限前一週的禮貌提醒範本，各 40 字內\n⑤ 【地雷清單】請人寫推薦信時最容易踩的 3 個雷（如：太晚開口、給太少資料、把對方當理所當然）\n\n【規則】\n1. 請託訊息與提醒要能直接複製傳送、口語有禮、繳交方式與期限寫清楚；懶人包用條列、推薦人能直接取用。\n2. 嚴禁卑微討好語連發如「不好意思一直麻煩您」「我知道您很忙還來打擾」，也嚴禁理所當然的命令語氣如「請在X號前幫我交好」；姿態要不卑不亢。\n3. 運用互惠原則與 SCQA：你不是空手求人，而是先把事蹟整理成可直接引用的具體素材附上，把對方的書寫成本降到最低。\n4. 語氣誠懇、成熟、尊重，像一個準備充分又懂得體貼對方時間的申請者，而非伸手牌。\n5. 體貼測試：對方讀完應覺得「這個請託好回覆、資料齊全、就算我拒絕也有台階」，而不是「又一個丟一句就要我生出一封信的人」。\n\n（提醒：推薦信內容仍應與你的真實經歷相符，懶人包僅供推薦人參考，切勿要求或代寫不實事蹟；各校系對推薦信格式與份數規定不一，請以官方公告為準。）`
  },
  {
    id: "date_plan_forge",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "約會時間軸 + 記憶點 + 聊天備彈 + B計畫",
    icon: <HeartHandshake className="w-8 h-8 text-pink-500" />,
    color: "pink",
    title: "甜蜜煉成：約會企劃術",
    desc: "情人節、交往紀念日、生日，或只是難得能單獨見面，卻每次都在『欸我們要幹嘛』『隨便都可以』的鬼打牆裡把興致耗光？想給對方一點驚喜又怕做太多顯得刻意、做太少被嫌沒心，預算還有限？這咒語不是叫你跑景點趕行程，而是依你們的關係階段、對方喜好、場合與預算，企劃一場有節奏、有記憶點的約會：從碰面到結束的時間軸、一個會讓對方記住的小驚喜、聊天不冷場的話題備彈，連下雨或對方臨時想改的 B 計畫都先幫你想好。把『不知道要幹嘛』變成『他怎麼這麼懂我』。",
    tags: ["約會企劃", "情侶紀念日", "驚喜安排"],
    fields: [
      { id: "relationship", label: "你們的關係與這次場合", placeholder: "例：曖昧第三次約 / 交往兩年紀念日 / 老夫老妻想換口味 / 幫對方慶生 / 久沒約會想破冰" },
      { id: "partner", label: "對方的喜好與雷點", placeholder: "例：愛吃日料怕辣、喜歡安靜不愛人多、容易累、想被驚喜但討厭被起鬨" },
      { id: "vibe", label: "想要的氛圍與時間長度", placeholder: "例：浪漫但不尷尬 / 輕鬆好玩 / 半天下午 / 一整天 / 晚上下班後三小時" },
      { id: "budget", label: "預算與地點範圍", placeholder: "例：兩人2000內、台北市捷運可到 / 預算不拘但不想跑太遠 / 想在家也可以" },
    ],
    tweak: {
      id: "strat",
      label: "約會路線",
      options: [
        "浪漫滿點型：營造儀式感與記憶點，適合紀念日、生日或想推進關係的時刻",
        "輕鬆無壓型：自然好聊不刻意，適合曖昧期、初期約會或怕用力過猛",
        "驚喜製造型：藏一個對方意想不到的小巧思，適合想給驚喜又怕翻車",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '辦過上千場約會的企劃顧問' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係階段調整濃度' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '時間軸+驚喜+話題+備案' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁趕景點與罐頭行程' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '尊重對方意願不強迫' },
    ],
    theory: "建立在兩個框架上：一是行為經濟學的『峰終定律』（Peak-End Rule，Kahneman）——人對一段體驗的記憶主要由『最高峰』與『結尾』決定，而非總時長或塞了多少行程；所以本咒語不堆景點、不趕路，而是替約會設計一個明確的高峰（記憶點／小驚喜）與一個好收尾，讓對方事後回想是甜的。二是 Aron 的關係親密研究與『自我延伸理論』——共同從事新奇、稍有互動的活動（而非各自滑手機的吃飯逛街）最能提升親密感與心動感，因此企劃會刻意安排能一起『動手做點什麼』的橋段，而不只是消費。",
    generate: (inputs: any) => `你是一位替上千對情侶與曖昧對象設計過約會的約會企劃顧問，最懂怎麼用有限預算與時間，做出讓對方記住的一場約會。你的信條：「好的約會不是塞滿景點，是設計一個高峰和一個好結尾——重點不是去了哪，是他記得跟你在一起的感覺。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要安排一場約會，需要你幫我企劃得貼心又不尷尬。\n- 我們的關係與這次場合：[[${inputs.relationship}]]\n- 對方的喜好與雷點：[[${inputs.partner}]]\n- 想要的氛圍與時間長度：[[${inputs.vibe}]]\n- 預算與地點範圍：[[${inputs.budget}]]\n\n請輸出：\n① 【約會時間軸】從碰面到結束的流程，分 3-4 段、標出大概時間與每段在做什麼，節奏鬆緊有致、不趕不塞，貼合對方喜好與雷點\n② 【記憶點設計】這場約會的一個高峰亮點＋一個收尾巧思（峰終定律），各說明為什麼對方會喜歡、怎麼自然做出來而不刻意，80 字內\n③ 【聊天備彈】3 個就算冷場也能自然接話的話題或互動小問題，貼合對方，避免尬聊\n④ 【B 計畫】萬一下雨、對方臨時累了或想改，立刻能替換的備案 1-2 個\n⑤ 【貼心提醒】依場合給一句提醒（如該不該準備小禮物、要不要先訂位、別踩的雷），50 字內\n\n【規則】\n1. 時間軸與備案要具體可執行、能直接照做；用條列、看了就知道幾點做什麼，能直接截圖存手機。\n2. 嚴禁罐頭行程「吃飯→看電影→逛街」這種無記憶點的組合，也嚴禁不顧對方雷點硬塞人多吵雜或對方討厭的活動。\n3. 運用峰終定律與共同新奇活動原則：刻意設計一個高峰與一個好收尾，並安排能一起動手互動的橋段，而非全程只是吃喝消費。\n4. 語氣像一個既懂你也懂對方、替你著想的麻吉在出主意，溫暖、有畫面感、不油膩不老套。\n5. 心動測試：照這份企劃走完，對方事後回想時腦中浮現的是一個具體甜蜜的畫面，並會覺得「他有用心、他懂我」；若整份只是把地點排在一起卻沒有記憶點，就重排。\n\n（提醒：約會仍以雙方舒適與意願為前提，若對方明確表達不適或拒絕，請尊重而非照表硬推。）`
  },

  // ━━━ 🔵 中階秘術 | 職場求生 | Free ━━━
  {
    id: "performance_review_forge",
    tab: "職場求生",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "成果亮點 + 自評正文 + 未來規劃",
    icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "考績煉金：績效自評術",
    desc: "年中、年終考核又到了，自評欄盯著空白格半天，只擠得出『工作態度認真、積極配合』這種主管看了沒感覺的形容詞？多數人不是沒做事，是不會把一年的功勞講成有說服力的故事——做了什麼寫成流水帳、沒達標的不敢提、想加薪升遷又不好意思爭。這咒語當你的資深 HR 顧問，把你零散的工作成果用 STAR 重組成一份有數據、有亮點、連未達標都能寫成『可造之才』的自評，讓主管打分時想替你加薪。",
    tags: ["績效自評", "年終考核", "升遷加分"],
    fields: [
      { id: "period_role", label: "考核期間與你的職務", placeholder: "例：2026 上半年、行銷專員 / 入職一年的工程師 / 帶 3 人小組的店長" },
      { id: "achievements", label: "這段期間做了什麼、有什麼成果", placeholder: "把負責的專案、達成的目標、具體數字（業績、效率、客訴下降…）能想到的都條列貼上來，越具體越好" },
      { id: "challenges", label: "遇到的挑戰或沒達標的部分", placeholder: "例：有個 KPI 沒達標、跨部門卡關、人手不足；以及你怎麼應對或學到什麼（可留空）" },
      { id: "goal", label: "你想爭取的或公司重視的方向", placeholder: "例：想升小主管 / 想加薪 / 想轉調 / 公司今年主打成本控管或新客開發" },
    ],
    tweak: {
      id: "strat",
      label: "自評路線",
      options: [
        "穩健貢獻型：強調穩定交付與團隊支援，適合求穩、續任或剛站穩腳步的人",
        "成長突破型：強調比去年進步與主動補位，適合資淺想證明潛力、爭取重用",
        "爭取升遷型：強調超出職責的影響力與領導跡象，適合鎖定升遷或加薪的人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '看過萬份考核的HR顧問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁形容詞要數據成果' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '亮點+正文+未來規劃' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依目標調貢獻敘事' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '流水帳vs有亮點對照' },
    ],
    theory: "建立在三個框架上：一是『STAR 法則』（Situation 情境—Task 任務—Action 行動—Result 成果）——把『我做了什麼』寫成『在什麼狀況下、扛了什麼任務、採取什麼行動、拿到什麼可量化成果』，主管才看得到你的價值貢獻而非工作流水帳；二是『歸因理論』（Attribution Theory）的應用——達標的成果要連結到自己的主動作為（內部歸因）以彰顯能力，未達標的部分則避免推給大環境，而是說明自己的責任與已採取的改善，反而展現可被培育的成長心態；三是溝通的『好壞八二原則』——自評以正面成果為主（約八成）、誠實點出待改進（約兩成），既不浮誇也不自貶。多數人寫自評卡關，不是沒貢獻，是把功勞寫成沒重點的形容詞；本咒語把你的零散成果重組成有數據、有故事、有未來規劃的加分版本。",
    generate: (inputs: any) => `你是一位看過上萬份績效考核表的資深 HR 顧問，也當過打分的主管。你最強的本事，是把一個員工嘴上講不清楚的一年功勞，重組成一份主管一看就想替他加薪的自評。\n\n你的信條：「主管不是不給分，是看不到你的貢獻——把『我很努力』翻譯成『我做出了什麼可被衡量的結果』，分數自己會來。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請依我提供的資料，幫我寫一份可以直接填進考核表的績效自評。\n- 考核期間與職務：[[${inputs.period_role}]]\n- 這段期間做了什麼、有什麼成果：[[${inputs.achievements}]]\n- 遇到的挑戰或沒達標的部分：[[${inputs.challenges}]]\n- 想爭取的或公司重視的方向：[[${inputs.goal}]]\n\n請輸出：\n① 【三大成果亮點】— 挑出最有份量的 3 項，各用 STAR 濃縮成一句帶數據的成果句（沒有數字就用頻率、規模、前後對比量化），讓主管 10 秒抓到我的價值\n② 【自評正文】— 一段可直接複製的完整自評（約 250-350 字）：先回顧目標達成與核心貢獻，再誠實點出一項待改進並說明已採取的改善，語氣自信但不浮誇\n③ 【未達標／挑戰的寫法】— 針對我提到的卡關或沒達標，給一句『不甩鍋、扛責任、有對策』的範例句，把扣分項寫成成長證據\n④ 【未來規劃】— 2-3 點下期目標，要呼應公司重視的方向，展現我想得比現在更遠\n⑤ 【上呈前提醒】— 一句檢查：有沒有把功勞講成形容詞、有沒有漏掉最該被看見的那件事\n\n【規則】\n1. 自評正文要能直接複製貼進考核系統或表格，分點清楚、句子精煉，不寫落落長的長句。\n2. 嚴禁空泛形容詞與罐頭話——「工作態度認真」「積極負責」「配合度高」「努力學習」「使命必達」這類沒有事實支撐的詞一律不准，每個優點後面都要接得出具體事例或數字。\n3. 運用 STAR 法則寫成果、用歸因策略處理未達標（達標歸能力、失誤談責任與改善），並守住好壞八二的比例。\n4. 語氣像一個有實績、不卑不亢的專業工作者在客觀陳述貢獻，自信但不自誇、誠實但不自貶。\n5. 加分測試：把自評正文遮住名字給任何一位主管看，他要能說出『這個人這段期間具體做出了什麼、值不值得加薪』——若只看到一堆形容詞卻講不出具體成果，就重寫。`
  },

  // ━━━ 🔵 中階咒文 | 校園生存 | Free ━━━
  {
    id: "reflection_report_forge",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "重點摘要 + 心得正文 + 反思昇華",
    icon: <NotebookPen className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "心得煉成：報告反思術",
    desc: "看完影片、聽完演講、實習或服務學習結束，老師要交一篇心得，你卻只擠得出『這次活動讓我受益良多、收穫滿滿』然後就卡住湊不滿字數？問題不是你沒感覺，是沒人教你『心得』和『反思』差在哪——心得是學到什麼，反思是檢視哪裡做得好、哪裡能更好、未來怎麼用。這咒語當你的金牌助教，把你零散的感受用經驗學習循環重組成一篇有具體事例、有真情實感、有反思昇華的心得報告，讓老師看到你是真的內化了，而不是複製罐頭句湊字數。",
    tags: ["心得報告", "反思寫作", "作業救星"],
    fields: [
      { id: "source", label: "這份心得是關於什麼", placeholder: "例：看完一部紀錄片 / 聽了一場職涯講座 / 暑期實習結束 / 服務學習 / 讀完一本指定書 / 參加營隊" },
      { id: "content", label: "內容在講什麼、最有感的點", placeholder: "把主題大意、印象最深的片段或一句話、讓你有感觸的地方條列貼上來，越具體越好" },
      { id: "feeling", label: "你的真實感受或學到的", placeholder: "口語、零散都沒關係：學到什麼、心情怎樣、跟你原本想的有什麼不同、有沒有想改變什麼" },
      { id: "requirement", label: "字數與特別要求", placeholder: "例：800 字 / 老師要我們寫『對未來的影響』/ 要連結課程理論 / 純自由發揮（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "心得路線",
      options: [
        "真誠走心型：以真實感受與個人轉變為主軸，適合服務學習、營隊、生命教育類",
        "學術紮實型：扣連知識點與課程理論、用詞嚴謹，適合課程心得、讀書報告類",
        "應用導向型：聚焦『學到的能怎麼用在未來』，適合實習、講座、職涯探索類",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '帶過寫作的金牌助教' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁罐頭句要真事例' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '摘要+心得+反思昇華' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依類型調真誠學術' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '湊字罐頭vs內化反思' },
    ],
    theory: "建立在兩個經典的反思學習框架上：一是 Kolb 的『經驗學習循環』（Experiential Learning Cycle：具體經驗→反思觀察→抽象概念化→主動應用）——一篇好的心得不是停在『我覺得很好』，而是走完整個循環：先描述具體發生了什麼，再反思它對你的意義，提煉出一個可帶走的觀點，最後說明未來會怎麼應用，這正是教授真正想看的『內化』；二是 Gibbs 的『反思循環』——它區分了『心得』與『反思』：心得是描述經驗與收穫，反思則進一步檢視『哪裡做得好、為什麼、哪裡不夠、未來如何改進』，加入這層批判性回饋，文章層次立刻拉高。多數學生寫心得卡在『描述完就沒梗、只能用罐頭句湊字數』；本咒語用具體事例打底、用反思循環昇華，把流水帳變成有深度又像你自己寫的心得。",
    generate: (inputs: any) => `你是一位帶過無數學生寫作、最懂如何點出『反思深度』的金牌助教。你看一眼就知道哪篇是用心內化、哪篇是複製罐頭句湊字數，而你最強的本事，是把學生一句『收穫滿滿』背後真正的感受與成長，引導成一篇有血有肉的心得。\n\n你的信條：「心得不是寫『我覺得很好』，是寫『發生了什麼、它改變了我什麼、我以後會怎麼用』——走完這趟，老師就知道你真的學到了。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請依我提供的素材，幫我寫一篇能直接交出去的心得報告。\n- 這份心得是關於什麼：[[${inputs.source}]]\n- 內容在講什麼、最有感的點：[[${inputs.content}]]\n- 我的真實感受或學到的：[[${inputs.feeling}]]\n- 字數與特別要求：[[${inputs.requirement}]]\n\n請輸出：\n① 【一句摘要】— 用一句話點出這份心得的核心收穫，當作開頭也能用，30 字內\n② 【心得正文】— 一篇結構完整、可直接複製的心得（依我要求的字數，未指定則約 600 字）：開頭簡述經驗 → 中段挑 1-2 個具體片段寫出我的真實感受與學到的 → 結尾收束，分段好讀、口吻像學生本人\n③ 【反思昇華段】— 一段加分用的批判性反思：檢視『哪裡讓我改觀／哪裡我原本想錯了／未來我會怎麼把它用在學習或生活上』，這段是拿高分的關鍵\n④ 【可替換的金句】— 2 句有溫度、不老套的句子，方便我替換掉太平淡的地方\n⑤ 【交卷前提醒】— 一句：檢查有沒有具體事例、有沒有不小心又用了罐頭句\n\n【規則】\n1. 正文要能直接複製貼進 Word 交作業，分段清楚、字數貼合要求，不要硬湊也不要爆量。\n2. 嚴禁罐頭空話與場面話——「受益良多」「收穫滿滿」「讓我學到很多」「是一次難忘的經驗」「期許自己未來能更加努力」這類沒有具體內容的句子一律不准，每個感受都要接得出『因為發生了什麼』。\n3. 運用 Kolb 經驗學習循環與 Gibbs 反思循環：從具體經驗寫到反思，再提煉觀點、連結未來應用，做出『心得』之上的『反思』層次。\n4. 語氣要像學生本人真誠地寫，自然、有溫度、不掉書袋、不像 AI 生成的工整罐頭文。\n5. 內化測試：把正文給沒參與這件事的人看，他要能說出『這個人具體經歷了什麼、被改變了什麼』——若通篇換成任何活動都講得通，代表不夠具體，重寫。`
  },

  // ━━━ 🔵 中階咒文 | 創業/自媒體 | Free ━━━
  {
    id: "ai_art_prompt_forge",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "中文咒語 + 英文prompt + 參數 + 變體",
    icon: <Palette className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "繪圖召喚：生圖咒語術",
    desc: "想用 Midjourney、即夢或 ChatGPT 生一張圖，腦中有畫面卻只會打『一隻可愛的貓』，生出來總是不對味、構圖怪、風格散？AI 生圖不是許願，是下指令——好提示詞講究『主體＋場景＋風格＋光線＋鏡頭＋參數』的結構，一般人卡關是不知道這些咒語要寫什麼。這咒語當你的 AI 影像總監，把你一句模糊的想法擴寫成一組結構完整、可直接貼上去就生圖的提示詞，中文版、英文版、推薦參數與多個變體一次給齊，貼上就出圖。",
    tags: ["AI繪圖", "提示詞", "Midjourney"],
    fields: [
      { id: "subject", label: "你想生成的畫面", placeholder: "例：一隻橘貓坐在窗台看夕陽 / 一杯冒煙的咖啡放在木桌上 / 賽博龐克風的城市夜景" },
      { id: "usage", label: "用途與要用的工具", placeholder: "例：IG 貼文背景 / YouTube 縮圖 / Logo 發想 / 商品情境圖；工具用 Midjourney / 即夢 / ChatGPT 生圖（不確定可留空）" },
      { id: "style", label: "想要的風格與氛圍", placeholder: "例：日系清新、溫暖療癒 / 賽博龐克、霓虹冷調 / 極簡扁平插畫 / 寫實電影感（不確定也可描述感覺）" },
      { id: "constraint", label: "比例、重點與不要的東西", placeholder: "例：要直式 9:16、留上方空間放字、主體置中；不要出現文字、不要血腥、不要仿任何真人明星（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "出圖路線",
      options: [
        "寫實攝影型：擬真照片感，講究鏡頭、光線、景深，適合商品圖、情境照、人像",
        "插畫設計型：扁平／手繪／向量風，乾淨好套版，適合貼文圖、Logo 發想、貼圖",
        "概念創意型：高風格化的氛圍與想像力，適合海報、封面、藝術感視覺與吸睛縮圖",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '資深AI影像總監' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁模糊要六要素結構' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '中文+英文+參數+變體' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不仿真人不侵權' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '亂打vs結構化咒語' },
    ],
    theory: "建立在 AI 影像提示工程的核心框架上：一是『影像提示六要素公式』（主體＋動作／情境＋場景＋風格＋光線／色調＋鏡頭／參數）——AI 生圖模型不像聊天模型會自己補腦，你給的資訊越分層、越具體，構圖命中率越高；一句『一隻可愛的貓』因為缺乏場景、風格與鏡頭，模型只能亂猜，這正是新手生圖總是不對味的根因。二是『正面具體優於負面模糊』原則——AI 繪圖對『不要什麼』的理解遠弱於『要什麼』，所以本咒語以正向描述為主、把限制轉成可執行的構圖指示，並善用比例（如 --ar 9:16）、風格化等參數穩定產出。三是『視覺敘事』的取捨——好的提示詞不是塞滿形容詞，而是抓住一個明確的視覺焦點與氛圍。本咒語把你模糊的想法翻譯成這套結構，並一次給中文版、英文版與參數，讓你貼上就生圖、想微調也有方向。",
    generate: (inputs: any) => `你是一位資深的 AI 影像總監，精通 Midjourney、即夢、Stable Diffusion 與 ChatGPT 生圖，看遍各種風格與鏡頭。你最強的本事，是把客戶一句模糊的『我想要一張好看的圖』，翻譯成一組結構精準、貼上去就出對味圖的提示詞。\n\n你的信條：「AI 生圖不是許願，是下指令——畫面說得越具體分層，AI 越不會亂猜；好咒語讓你第一次就生對。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請依我的想法，幫我煉成一組可以直接使用的 AI 生圖提示詞。\n- 我想生成的畫面：[[${inputs.subject}]]\n- 用途與要用的工具：[[${inputs.usage}]]\n- 想要的風格與氛圍：[[${inputs.style}]]\n- 比例、重點與不要的東西：[[${inputs.constraint}]]\n\n請輸出：\n① 【中文咒語】— 一段可直接貼進即夢／ChatGPT 生圖的中文提示詞，依『主體＋情境＋場景＋風格＋光線色調＋鏡頭視角』分層寫清楚，讀起來像一句完整的畫面描述\n② 【英文 Prompt】— 對應的英文版本，給 Midjourney／Stable Diffusion 用，用逗號分隔關鍵詞、由主到次排列\n③ 【推薦參數】— 依用途給建議參數與比例（如 --ar 9:16 直式、--ar 16:9 橫式、stylize 強度建議），並一句說明為什麼這樣設\n④ 【3 個變體方向】— 給 3 個可快速替換的關鍵詞組合（換風格／換光線／換鏡頭），方便我一次生多張挑最好的\n⑤ 【微調提示】— 一句：若生出來哪裡不對（主體跑掉、太雜、顏色不對），該加哪個關鍵詞修正\n\n【規則】\n1. 提示詞要能直接整段複製貼上就用，中文版與英文版分開標示，關鍵詞精準、不寫廢話虛詞。\n2. 嚴禁模糊空泛詞與無效負面詞——「一隻可愛的貓」「很美的風景」「高品質」「best quality」這種沒有畫面資訊的詞要展開成具體描述；也不要堆一長串『不要…』，限制請轉成正向的構圖指示。\n3. 運用影像六要素公式（主體＋情境＋場景＋風格＋光線色調＋鏡頭參數）分層構句，以正面具體描述為主，抓住一個明確的視覺焦點。\n4. 語氣像專業又好懂的影像總監，講得出為什麼這樣寫，不堆術語嚇人、也不打高空。\n5. 出圖測試：把中文咒語給一個沒看過我想法的人讀，他腦中要能浮現一張具體清楚的畫面（主體、場景、風格、光線都到位）——若他只想得到一團模糊印象，代表不夠具體，重寫。\n\n（提醒：生成圖像請尊重智慧財產權，勿用於仿冒真實人物、特定品牌商標或抄襲他人原創作品。）`
  },

  // ━━━ 🔵 中階秘術 | 職場求生 | Free ━━━
  {
    id: "interview_killer_qa",
    tab: "職場求生",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "面試考古題回答腳本",
    icon: <Mic className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "面試破題：考古題拆解術",
    desc: "面試被問『為什麼離職』『最大缺點』『薪資期望』就腦袋空白、照網路罐頭答案背、一講就露餡？這咒語拆穿每道考古題背後人資真正想聽的，依你的真實狀況客製成既誠實又加分的回答，還附追問防守。",
    tags: ["面試準備", "考古題", "求職轉職"],
    fields: [
      { id: "identity", label: "你的身分與應徵職位", placeholder: "例：行銷專員想轉職產品經理 / 應屆生找工程師職" },
      { id: "questions", label: "你最怕被問的題目", placeholder: "例：為什麼離職、最大缺點、空窗期、薪資期望" },
      { id: "situation", label: "你的真實狀況／難言之隱", placeholder: "例：跟前主管不合、被資遣、轉職沒相關經驗" },
      { id: "strength", label: "想讓面試官記住的優勢", placeholder: "例：跨部門協調、學東西快、扛過大專案" },
    ],
    tweak: {
      id: "strat",
      label: "拆題策略",
      options: [
        "穩健真誠型：不背罐頭、用真實事例包裝，讓人資覺得你誠懇可信",
        "亮點主導型：每題都偷渡一個賣點，把防守題變成自我推銷的機會",
        "新鮮人逆襲型：經歷不足也不慌，把空白與動機轉成可栽培的潛力",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '面試過千人的資深人資' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '拆解每題隱藏考點' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '回答腳本+地雷+追問防守' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁背罐頭與抱怨前東家' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '真話測試防露餡' },
    ],
    theory: "基於歸因理論（Attribution Theory）與印象管理（Goffman）：人資問『為什麼離職』『最大缺點』不是想聽答案，而是在觀察你怎麼歸因——把問題全推給別人（外歸因）會被貼上『愛抱怨、難帶』的標籤，全往自己身上扛（過度內歸因）又顯得沒自信。本咒語把每道陷阱題重新框架為『展現成熟度與自我覺察』的舞台，教你用對的歸因方式與印象管理，把扣分題答成加分題。",
    generate: (inputs: any) => `你是一位面試過上千位求職者的資深人資主管，每道題你問出口前，心裡早有想聽的答案。你最看不起背網路罐頭答案的人，也最欣賞「誠實又懂分寸」的應答。你的信條：「面試官問的從來不是字面那題，而是想看你是什麼樣的人。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要準備面試，請拆解我最怕的考古題並給我能直接背的回答。\n- 我的身分與應徵職位：[[${inputs.identity}]]\n- 我最怕被問的題目：[[${inputs.questions}]]\n- 我的真實狀況／難言之隱：[[${inputs.situation}]]\n- 想讓面試官記住的優勢：[[${inputs.strength}]]\n\n請輸出：\n① 【逐題回答腳本】— 針對我怕的每一題，各給一段 80-120 字、可直接念的回答，先點破這題的隱藏考點再作答\n② 【一句記憶點】— 一句貫穿全場、讓面試官記住我的個人標籤，15 字以內\n③ 【地雷清單】— 我這些題最容易踩的 3 個雷，各一句\n④ 【追問防守】— 面試官可能順勢追問的 2 題與接招方向\n\n【規則】\n1. 每題回答 80-120 字、口語可直接背誦念出，不能是書面條列。\n2. 嚴禁使用：「我最大的缺點就是太追求完美」「我抗壓性很強」「因為公司制度問題」這類一聽就知道在背稿或抱怨前東家的答案。\n3. 運用歸因理論：談離職與缺點時用成熟的歸因方式（談收穫與成長、不牽拖他人），把扣分題答成展現自我覺察的加分題。\n4. 語氣像一個有底氣、想清楚自己要什麼的人——不卑微、不背書、不浮誇。\n5. 真話測試：每個回答都要建立在我提供的真實狀況上，不虛構經歷；念出來若像「任何人都能照背」就重寫到只屬於我的版本。`
  },

  // ━━━ 🔵 中階秘術 | 日常雜症 | Free ━━━
  {
    id: "bill_retention_negotiator",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "contract" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "客服議價通話腳本+訊息",
    icon: <PhoneCall className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "帳單議價：續約挽留術",
    desc: "電信、第四台、網路、健身房合約到期，續約折扣總是少得可憐，想退訂又被一通電話勸回原方案？這咒語幫你算好籌碼、生成打給客服的議價腳本與訊息，要到真正的留客方案，不再被當盤子。",
    tags: ["帳單議價", "續約折扣", "退訂挽留"],
    fields: [
      { id: "service", label: "哪個服務／業者與方案", placeholder: "例：中華電信 599 吃到飽 / 某健身房月費" },
      { id: "cost", label: "目前月費與合約狀況", placeholder: "例：月付 599、合約 8 月到期 / 已過綁約" },
      { id: "leverage", label: "你手上的籌碼", placeholder: "例：用了 6 年 / 競品攜碼只要 488 / 真的想退" },
      { id: "goal", label: "你想要的結果", placeholder: "例：月費砍到 488 / 升速不加價 / 留住舊優惠" },
    ],
    tweak: {
      id: "strat",
      label: "議價策略",
      options: [
        "理性比價型：搬出競品報價與年資，給客服一個給你折扣的台階",
        "去意已決型：表明真的要退，逼出只有挽留專員手上的隱藏方案",
        "老客戶情義型：強調長期貢獻與忠誠，訴諸『別逼老客戶離開』",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '電信客服議價顧問' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依籌碼選議價路線' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '通話腳本+逐字稿+訊息' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁理盲動氣與空威脅' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '違約金與綁約提醒' },
    ],
    theory: "基於 Akerlof 資訊不對稱與錨定效應（Anchoring）＋ BATNA（最佳替代方案）：第一線客服權限有限，真正的折扣握在『客戶挽留部門』手上，而你能要到多少，取決於你手上的 BATNA（願意走人的可信度）與是否把價格錨定在競品行情。本咒語幫你把競品報價當錨先丟出、把『真的會退』演得可信，逼出檯面下的留客方案，不再乖乖照原價續約。",
    generate: (inputs: any) => `你是一位專門替消費者跟電信、有線電視、健身房談合約的議價顧問，最清楚第一線客服的權限到哪、真正的折扣藏在「客戶挽留部門」手上。你的信條：「乖乖照原價續約的，都是業者眼中最好賺的客人。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我的合約快到期／想重談，請幫我擬好跟客服議價的腳本。\n- 服務與方案：[[${inputs.service}]]\n- 目前月費與合約狀況：[[${inputs.cost}]]\n- 我手上的籌碼：[[${inputs.leverage}]]\n- 我想要的結果：[[${inputs.goal}]]\n\n請輸出：\n① 【開場定錨句】— 打通電話／傳訊息的第一句，30 字以內，直接亮出籌碼\n② 【議價通話腳本】— 一段 150 字內的逐字稿，含要求折扣的說法與被拒絕時的回應\n③ 【關鍵升級句】— 一句把對話轉接到『挽留部門／專案方案』的話術\n④ 【可直接傳的訊息版】— 若用線上客服／簡訊，60 字以內的文字版\n⑤ 【底線提醒】— 簽約前一定要確認的 2 件事（綁約期、違約金）\n\n【規則】\n1. 腳本要口語、可照著念或直接複製傳出，不能像公文。\n2. 嚴禁使用：「我一定要退」這種沒退路的空威脅，以及辱罵、情緒勒索客服個人的字眼——對人要客氣，對方案要強硬。\n3. 運用錨定效應與 BATNA：先把競品行情或攜碼優惠當錨丟出，並讓對方相信你真的有更好的替代方案。\n4. 語氣像一個做足功課、不好唬弄但講道理的老客戶——理性、堅定、留台階。\n5. 划算測試：照腳本走，目標是拿到比官網續約價更好的條件；本內容僅供協商參考，實際方案、綁約與違約金以業者合約為準。`
  },

  // ━━━ 🔵 中階秘術 | 創業/自媒體 | Free ━━━
  {
    id: "clickbait_title_forge",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "標題組+縮圖字+說明文案",
    icon: <Youtube className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "下標煉金：點閱衝高術",
    desc: "影片內容很用心，標題卻像記流水帳，曝光高、點閱低，被演算法埋沒？這咒語針對你的主題一次生成多組高點閱標題、縮圖該打的字、和搜尋會顯示的說明開頭，兼顧好奇心與 SEO，讓人想點又搜得到。",
    tags: ["影片標題", "縮圖文案", "點閱率"],
    fields: [
      { id: "topic", label: "影片主題／內容重點", placeholder: "例：開箱平價藍牙耳機 / 一週減醣食譜" },
      { id: "platform", label: "平台與影片類型", placeholder: "例：YouTube 長片 / Shorts / 部落格文章" },
      { id: "audience", label: "目標觀眾與他們在搜什麼", placeholder: "例：小資族在搜『便宜耳機推薦』" },
      { id: "angle", label: "你的獨特賣點／結論", placeholder: "例：千元內音質贏萬元款 / 不挨餓也能瘦" },
    ],
    tweak: {
      id: "strat",
      label: "下標策略",
      options: [
        "好奇缺口型：製造資訊缺口與懸念，逼人非點不可",
        "利益明確型：把觀眾能得到的好處與結果寫進標題，直球吸睛",
        "搜尋優先型：前置關鍵字、兼顧 SEO，讓人用搜尋也找得到你",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '百萬頻道下標操盤手' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依平台調標題長度' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '標題組+縮圖字+說明開頭' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁標題殺人與文不對題' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '0.5秒掃描測試' },
    ],
    theory: "基於 Loewenstein 好奇心缺口理論（Information Gap）與點閱率（CTR）演算法邏輯：YouTube 給不給你流量，看的是縮圖＋標題的點擊率。標題太老實沒人點，太誇張點進來秒退反而被降權。本咒語在『好奇』與『兌現』之間抓平衡——製造非點不可的資訊缺口，同時把關鍵字前置餵搜尋，讓影片同時吃到推薦與搜尋兩種流量；它管的是『曝光時讓人點下去』的標題與縮圖文字，而非影片內的口說開場。",
    generate: (inputs: any) => `你是一位操盤過多個百萬訂閱頻道的下標與縮圖文案手，最懂演算法只憑縮圖加標題決定要不要把你的影片推出去。你的信條：「再好的內容，標題沒人想點，就等於沒做過。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我做了一支影片／一篇內容，需要能衝點閱的標題與縮圖文案。\n- 主題／內容重點：[[${inputs.topic}]]\n- 平台與類型：[[${inputs.platform}]]\n- 目標觀眾與他們在搜什麼：[[${inputs.audience}]]\n- 我的獨特賣點／結論：[[${inputs.angle}]]\n\n請輸出：\n① 【標題組（8 條）】— 8 條風格各異的標題，每條標註用的框架（好奇缺口／利益明確／數字／反差／搜尋型），每條 28 字以內\n② 【最推薦 3 條】— 挑 3 條最適合這支的，各附一句「為什麼這條會被點」\n③ 【縮圖字】— 縮圖上該打的 3-6 個字（兩種版本），與標題互補不重複\n④ 【說明開頭】— 搜尋結果會顯示的前 2 句說明文案，含一個關鍵字\n\n【規則】\n1. 每條標題可直接複製貼上，長標題要顧及平台顯示會被截斷的字數。\n2. 嚴禁使用：「震驚」「不看後悔」「太扯了」這類已被觀眾免疫的農場殺人標，以及與內容不符的標題殺人（點進來發現被騙會被秒退、降權）。\n3. 運用好奇心缺口理論：至少一半標題要製造「資訊缺口」，但缺口必須是內容真的能兌現的。\n4. 語氣貼合平台與觀眾的搜尋語言——YouTube 長片可帶關鍵字、Shorts 更短更直接。\n5. 0.5 秒測試：想像觀眾在滿頁縮圖中快速掃過，這個標題＋縮圖字能不能在 0.5 秒內讓他停下手指點下去？停不下來就重寫。`
  },

  // ━━━ 🔵 中階秘術 | 人際擋箭 | Free ━━━
  {
    id: "relative_interrogation_shield",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "defense" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "回應金句+話題轉移+收尾",
    icon: <Shield className="w-8 h-8 text-rose-500" />,
    color: "rose",
    title: "拷問結界：親戚逼問拆解術",
    desc: "過年家族聚餐又被親戚連環逼問「薪水多少、什麼時候結婚、有沒有對象、怎麼還不生」？想擋又怕被說沒禮貌、回太軟又被追問到底。這咒語幫你把每句尷尬逼問接成不失禮又守住底線的回應，附幽默化解、話題轉移與退場句，讓你笑著守住隱私、全身而退。",
    tags: ["過年聚餐", "親戚逼問", "得體回應"],
    fields: [
      { id: "question", label: "被問了什麼／最怕被問", placeholder: "例：薪水多少、何時結婚、怎麼還單身、什麼時候生" },
      { id: "relationship", label: "對方是誰＋你們的關係", placeholder: "例：三阿姨、許久不見的表哥、長輩中的大家長" },
      { id: "boundary", label: "你願意透露到哪、不想講什麼", placeholder: "例：薪水絕對不講、感情狀態想帶過" },
      { id: "vibe", label: "你想要的場面", placeholder: "例：幽默帶過不尷尬 / 客氣但堅定畫線" },
    ],
    tweak: {
      id: "strat",
      label: "應對風格",
      options: [
        "幽默太極型：用自嘲與玩笑把球接走，全場笑場、沒人記得追問",
        "禮貌擋箭型：客氣但明確守住底線，讓對方知難而退又不失禮",
        "反客為主型：用一個問題把焦點丟回對方，從被審問變成主導話題",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '最會做人的圓場高手' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係親疏調語氣' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '守底線不真撕破臉' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '金句+話題轉移+收尾句' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不傷感情不真難堪' },
    ],
    theory: "基於灰色岩石法（Grey Rock Method）與非暴力溝通的邊界設定：面對打探隱私的逼問，你越給情緒與細節，對方越有料繼續追問；本咒語教你用『最小資訊＋幽默轉移』讓話題自然滑走——不是冷臉硬擋（會被說沒禮貌、難看），而是笑著把問題接住又彈開，守住隱私邊界的同時保全家族和氣。它處理的是『聚會被連環逼問當下』的即時回應，而非長期有毒關係的修復。",
    generate: (inputs: any) => `你是一位最會做人的家族聚會圓場高手，看過無數人在年夜飯桌上被親戚問到臉綠，你最懂——回得太衝會被說沒大沒小、回得太軟又被追問到底。你的信條：「守住底線，也守住和氣。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我在家族聚會被親戚逼問，需要能擋住又不失禮的回應。\n- 被問了什麼／最怕被問：[[${inputs.question}]]\n- 對方是誰與關係：[[${inputs.relationship}]]\n- 我願意透露到哪、不想講什麼：[[${inputs.boundary}]]\n- 我想要的場面：[[${inputs.vibe}]]\n\n請輸出：\n① 【即用回應（3 句）】— 針對這題給 3 句風格略異的回應，每句 40 字內、可直接背起來說出口\n② 【幽默化解版】— 1 句用自嘲或玩笑把氣氛帶開的版本，附「適合對誰用」\n③ 【話題轉移句】— 2 句把焦點丟回對方或轉到安全話題（對方近況、孩子、桌上的菜）的接話\n④ 【收尾退場句】— 1 句若對方還追問，能禮貌結束這回合的句子\n\n【規則】\n1. 每句都口語、可直接說出口，貼合台灣家族聚餐語境，不要書面腔。\n2. 嚴禁出現：「乾你屁事」「不要管我」「煩不煩」這類傷感情的嗆句，以及把真實隱私（確切薪水、感情細節）全盤托出的回答。\n3. 運用灰色岩石法：回應給最小資訊量＋情緒平淡，不餵料給對方繼續追問。\n4. 語氣保持笑笑的、客氣的，守住底線但讓全場覺得你很會做人。\n5. 場面測試：想像這句說出口後，桌上會不會冷掉或翻臉？會的話換一句更圓融的——目標是守住隱私還全身而退。`
  },

  // ━━━ 🔵 中階秘術 | 職場求生 | Free ━━━
  {
    id: "leave_request_forge",
    tab: "職場求生",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "請假訊息+交接+主管追問防守",
    icon: <CalendarDays className="w-8 h-8 text-amber-500" />,
    color: "amber",
    title: "請假神諭：完美請假術",
    desc: "想請假卻卡在「理由怎麼講才不會被懷疑、訊息怎麼寫才不尷尬」？病假、事假、家裡有事，每次都糾結老半天打不出第一句。這咒語幫你把請假需求寫成一則理由可信、語氣得體、又不過度解釋的訊息，連主管追問怎麼接、工作交接怎麼講都一次備好，傳出去乾淨俐落。",
    tags: ["請假訊息", "職場溝通", "病假事假"],
    fields: [
      { id: "reason", label: "請假原因／你想講的理由", placeholder: "例：感冒發燒、家裡有事、看牙醫、身體不適" },
      { id: "leave_type", label: "請假類型與天數", placeholder: "例：病假1天 / 事假半天 / 特休週五" },
      { id: "recipient", label: "傳給誰＋你們的關係", placeholder: "例：直屬主管、嚴格的店長、好相處的組長" },
      { id: "handover", label: "手上有沒有要交接或在意的事", placeholder: "例：今天的會議、客戶回覆、不想被叫回來處理" },
    ],
    tweak: {
      id: "strat",
      label: "請假姿態",
      options: [
        "簡潔專業型：最小必要資訊、不過度解釋，乾淨俐落不留破綻",
        "誠懇體貼型：語氣溫和、主動交接，讓主管覺得你負責又好說話",
        "堅定保護型：態度明確不卑微、預防被慰留或叫回，守住你的休息權",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '最懂分寸的職場前輩' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依假別調理由詳略' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '請假訊息+交接+追問防守' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '不過度解釋不演太多' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不教偽造證明造假' },
    ],
    theory: "基於溝通心理學的『最小揭露原則』與『欲蓋彌彰效應』：請假理由講得越多、細節越滿，反而越像在編故事、越引人懷疑——真正可信的請假是『資訊剛好、語氣坦然』。本咒語幫你拿捏該講多少、怎麼講才得體，並主動處理交接以降低主管的為難感，同時備好被追問時的回應；它管的是『把請假需求說得專業又不留破綻』的訊息本身，不教你偽造證明或編造緊急事件。",
    generate: (inputs: any) => `你是一位最懂職場分寸的資深前輩，看過太多人請個假把理由編得落落長反而被主管起疑，也看過有人一句話講不清楚被慰留到不敢走。你的信條：「請假是你的權利，把它講得專業，沒人能為難你。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要請假，需要一則得體、理由可信又不過度解釋的請假訊息。\n- 請假原因／我想講的理由：[[${inputs.reason}]]\n- 假別與天數：[[${inputs.leave_type}]]\n- 傳給誰與關係：[[${inputs.recipient}]]\n- 要交接或在意的事：[[${inputs.handover}]]\n\n請輸出：\n① 【請假訊息】— 一則可直接複製傳 LINE／Email 的請假訊息，80 字內，含問候、假別天數、簡短理由、交接安排\n② 【正式版】— 1 則語氣更正式、適合 Email 或嚴格主管的版本\n③ 【交接一句話】— 1 句主動說明手上工作怎麼處理，降低主管為難\n④ 【追問防守】— 主管若追問細節或想叫你回來處理，2 句得體又守住底線的回應\n\n【規則】\n1. 訊息可直接複製貼上，符合台灣職場 LINE／Email 用語，稱謂得體。\n2. 嚴禁：教人偽造診斷證明或假單、編造親人住院過世等重大謊言，以及把理由寫得落落長、細節過多反而可疑。\n3. 運用最小揭露原則：理由給到剛好可信即可，不過度解釋、不主動報告隱私。\n4. 語氣坦然不卑微、不連聲道歉，把請假當成正當權利而非乞求。\n5. 破綻測試：想像主管讀完這則訊息，會不會起疑或覺得你在演？會的話改寫得更自然坦然。`
  },

  // ━━━ 🔵 中階秘術 | 日常雜症 | Free ━━━
  {
    id: "traffic_ticket_appeal",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "attack" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "陳述書+爭點分析+成功率",
    icon: <ScrollText className="w-8 h-8 text-cyan-500" />,
    color: "cyan",
    title: "申訴煉成：罰單翻盤術",
    desc: "收到交通違規罰單覺得很冤——標線不清、停車格沒標示、檢舉魔人亂拍，但想申訴又不知道怎麼寫、引用什麼理由、寄去哪裡？多數人摸摸鼻子認罰，不是不該爭，是不知道怎麼開口。這咒語幫你把委屈整理成一份有理有據的陳述書，分析你這張單有沒有機會、該主打哪個爭點，連申訴管道與期限都幫你列好。",
    tags: ["交通違規", "罰單申訴", "陳述書"],
    fields: [
      { id: "violation", label: "違規項目與罰單內容", placeholder: "例：闖紅燈、違規停車、超速10公里、未禮讓行人" },
      { id: "situation", label: "當下實際情況／你覺得冤的點", placeholder: "例：標線模糊、號誌被樹擋住、停車格沒畫清楚" },
      { id: "evidence", label: "你手上有的證據", placeholder: "例：行車記錄器、現場照片、Google街景、無 / 不確定" },
      { id: "goal", label: "你想要的結果", placeholder: "例：撤銷罰單、改開勸導、減輕罰款、只想試試看" },
    ],
    tweak: {
      id: "strat",
      label: "申訴主軸",
      options: [
        "程序瑕疵型：主打舉發或標誌標線不符規定、程序不完備，攻在法定要件",
        "事實澄清型：還原現場、用證據證明你並未違規或情有可原",
        "情理兼具型：坦承但說明不得已的原因，爭取改為勸導或從輕",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '熟交通法規的申訴顧問' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依違規類型挑爭點' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '陳述書+爭點+成功率' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '據實不教偽造事實' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '標僅供參考非法律意見' },
    ],
    theory: "基於說服心理學的『框架效應』與行政救濟的『要件與舉證』邏輯：同一張罰單，用『我覺得很冤』去吵不會贏，把它重新框成『舉發程序是否符合法定要件、標線標誌是否清楚、事實是否如舉發所述』，承辦員才有依據撤銷或改判。本咒語幫你把情緒化的委屈，轉譯成承辦單位看得懂、站得住腳的爭點與陳述；它產出的是供你參考的申訴陳述草稿與策略，不是法律意見，最終仍以監理／裁決單位認定為準。",
    generate: (inputs: any) => `你是一位熟悉台灣交通法規與行政救濟流程的申訴策略顧問，看過太多人收到罰單只會在心裡幹譙、卻不知道有些單其實申訴得掉。你的信條：「覺得冤沒有用，把爭點講到承辦員無法反駁，才有機會翻盤。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我收到一張交通違規罰單想申訴，需要一份有理有據的陳述與策略。\n- 違規項目與罰單內容：[[${inputs.violation}]]\n- 當下情況／我覺得冤的點：[[${inputs.situation}]]\n- 我手上的證據：[[${inputs.evidence}]]\n- 我想要的結果：[[${inputs.goal}]]\n\n請輸出：\n① 【成功率評估】— 直話直說這張單申訴有沒有機會（高／中／低）與理由，60 字內，不給假希望\n② 【主打爭點】— 列出 1-3 個最該主張的爭點，每點說明為什麼站得住腳\n③ 【申訴陳述書】— 一份可直接填寫遞交的陳述書草稿，含稱謂、事實經過、申訴理由、訴求，條理清楚\n④ 【遞交指引】— 申訴管道、期限（提醒收到後通常的法定期限）、要附的證據清單\n\n【規則】\n1. 陳述書可直接複製使用，用語正式得體、符合公文陳情語氣，但保留讓使用者填入個資與日期的空格。\n2. 嚴禁：教人捏造事實、偽造或變造證據、頂替駕駛或說謊脫罪——只在真實情況下找出對使用者有利的合法爭點。\n3. 運用框架效應：把『我覺得冤』重新包裝成程序要件、標線標誌、事實認定等承辦單位採認的角度。\n4. 語氣不卑不亢、就事論事，不情緒勒索也不威脅承辦人員。\n5. 結尾務必加註一行：「本內容僅供參考，不構成法律意見，實際申訴結果以監理或裁決單位認定為準，必要時請諮詢專業人士。」並自我檢查爭點是否真的成立，不成立就誠實告知別硬凹。`
  },

  // ━━━ 🟣 高階祕術 | 日常雜症 | Free ━━━
  {
    id: "health_report_decoder",
    tab: "日常雜症",
    isPro: false,
    tier: "master",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "紅字白話解讀 + 風險分級 + 行動建議",
    icon: <Activity className="w-8 h-8 text-rose-500" />,
    color: "rose",
    title: "紅字解碼：健檢報告判讀術",
    desc: "年度健檢報告一拿到滿江紅，看著一堆英文縮寫和上上下下的箭頭完全看不懂，上網一查更焦慮、以為自己得了重病？這咒語把你看不懂的紅字一項一項翻成白話，告訴你每個數值代表什麼、是真的危險還是虛驚一場、生活上能怎麼調整，以及哪幾項該帶著報告去找醫師——不嚇你，也不讓你輕忽。",
    tags: ["健檢報告", "紅字解讀", "健康管理"],
    fields: [
      { id: "report_items", label: "看不懂或出現紅字的項目＋數值", placeholder: "例：GPT 65、總膽固醇 230、空腹血糖 108、尿酸 8.2（有單位更好）" },
      { id: "basics", label: "你的基本狀況", placeholder: "例：38歲男性、170cm/82kg、體脂偏高（年齡性別體型有助判讀）" },
      { id: "lifestyle", label: "生活習慣", placeholder: "例：久坐少運動、外食多、會喝酒、常熬夜睡不好（可留空）" },
      { id: "history_concern", label: "已知病史／在吃的藥／最擔心的", placeholder: "例：家族有糖尿病、在吃血壓藥、最怕是不是肝出問題（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "解讀重點",
      options: [
        "全面健檢型：一次把多項紅字逐條解讀，再抓出最該優先處理的幾項",
        "單項深掘型：聚焦你最擔心的一兩項，講清楚它偏高偏低代表什麼、要不要複檢",
        "逆轉行動型：重在可自己調整的紅字，給出飲食、運動、作息的具體改善方向",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '健檢中心醫師＋衛教師' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依偏離程度分級' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '逐項白話+分級+建議' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '不下診斷只解讀' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '紅字嚴重提醒就醫' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '焦慮腦補vs正確理解' },
    ],
    theory: "建立在『健康識能（Health Literacy）』與『風險溝通分級』兩個框架上：研究顯示多數人看到健檢紅字會落入兩個極端——要嘛上網亂查嚇自己、要嘛完全擺爛，問題都出在缺乏把『單一數值』放回脈絡的能力。一個紅字代表的是『落在統計正常範圍外的機率』，而非『確診疾病』，正常人也有約 5% 會出現紅字；真正要看的是偏離程度、有沒有伴隨其他異常、以及趨勢。本咒語運用風險分級（可觀察／要注意／建議就醫）把焦慮的『滿江紅』翻譯成看得懂、排得出優先順序的行動清單，提升的是你的健康識能與醫病溝通效率，不是取代醫師的診斷。",
    generate: (inputs: any) => `你同時具備兩個視角：① 健檢中心醫師（判讀過上萬份報告，最清楚哪些紅字要緊、哪些只是虛驚）② 衛教師（最會把冷冰冰的數值翻成一般人聽得懂的話）。你的信條：「見紅就慌跟視而不見都會出事——把每個數字放回脈絡、排出輕重，你才知道下一步該做什麼。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我拿到健檢報告有看不懂的紅字，請幫我白話解讀並告訴我該怎麼辦。\n- 紅字項目與數值：[[${inputs.report_items}]]\n- 我的基本狀況：[[${inputs.basics}]]\n- 生活習慣：[[${inputs.lifestyle}]]\n- 已知病史／在吃的藥／最擔心的：[[${inputs.history_concern}]]\n\n請輸出：\n① 【一句話總結】— 用 60 字內講這份報告的整體大方向（大致還好／有幾項要留意／建議盡快找醫師），語氣安定不嚇人\n② 【紅字逐項白話】— 每項分開講：這是什麼、你的數值偏高還偏低、白話代表什麼、嚴重度標籤（🟢可觀察／🟡要注意／🔴建議就醫）\n③ 【優先處理順序】— 哪幾項最該先處理、為什麼，幫我排出第一、第二順位\n④ 【生活調整建議】— 可自己先做的飲食、運動、作息調整，具體到可執行（寫「少喝含糖飲料、每週快走3次每次30分」而非「注意飲食多運動」）\n⑤ 【該找醫師的項目與問題】— 哪些要帶報告回診、建議看哪科、進診間該問醫生什麼\n\n【規則】\n1. 逐項分點、用 🟢🟡🔴 標嚴重度，可直接存進手機帶去回診看；每項白話解釋要一般人看得懂，不堆砌醫學術語。\n2. 嚴禁直接斷定病名或恐嚇：「你得了糖尿病／肝硬化」「你這是癌症」「很危險快不行了」這類確診與嚇人的話一律不准，只解讀數值意義，確診留給醫師。\n3. 運用健康識能與風險分級：把每個紅字放回『偏離程度＋有無伴隨異常＋趨勢』的脈絡，提醒單一紅字不等於生病，避免見紅就慌或視而不見。\n4. 語氣像健檢中心衛教師逐項講解——白話、安定、就事論事，不製造恐慌也不輕描淡寫。\n5. 白話測試：把這份解讀拿給一個沒醫學背景的家人看，他要能說出「哪幾項要緊、我下一步該做什麼」；做不到就重寫得更白。\n\n（提醒：本咒語只幫你把報告數值翻成白話、理出行動方向，不提供任何診斷或醫療處置建議；單一數值無法判斷病情，實際結果與用藥請以醫師面對面判讀為準，請勿只憑本內容自行用藥或停藥。若有急性不適請立即就醫。）`
  },

  // ━━━ 🔵 中階秘術 | 生活娛樂 | Free ━━━
  {
    id: "packing_list_forge",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "分類打包清單 + 隨身重點 + 出發前檢查",
    icon: <Luggage className="w-8 h-8 text-sky-500" />,
    color: "sky",
    title: "行李召喚：打包清單術",
    desc: "出國前一晚才開始打包，行李箱塞到關不起來，到了當地卻發現漏帶轉接頭、藥、證件影本？這咒語依你的目的地、天數、季節和旅伴，一次生成分門別類的打包清單，從證件、3C、衣物到藥品、隨身重點全列好，連『哪些一定要隨身不能託運』『出發前最後一刻要再確認什麼』都幫你想到，照著打勾不再丟三落四。",
    tags: ["行李打包", "旅遊清單", "出國準備"],
    fields: [
      { id: "destination", label: "目的地與天氣", placeholder: "例：日本北海道冬天 / 泰國曼谷雨季 / 國內墾丁夏天" },
      { id: "days_people", label: "天數與同行者", placeholder: "例：5天4夜、夫妻帶一個3歲小孩 / 自己一個人 / 三五好友" },
      { id: "trip_type", label: "旅遊性質與主要活動", placeholder: "例：自由行逛街美食 / 滑雪 / 出差兼旅遊 / 露營爬山" },
      { id: "special", label: "特殊需求或一定要帶的", placeholder: "例：有在吃的藥、要帶相機、戴隱形眼鏡、廉航登機箱限重（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "打包風格",
      options: [
        "極簡輕量型：只帶真正會用到的，教你一咖登機箱搞定、能共用就不重複帶",
        "有備無患型：寧可多帶不要少帶，把備用藥品、備用證件、突發狀況用品都列進去",
        "親子家庭型：以帶小孩出遊為重，把孩子的吃喝拉撒睡與安撫法寶一併打點",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '資深領隊＋收納達人' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依目的地季節調整' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '分類清單+隨身+檢查' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '只列真會用到的' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '證件藥品隨身提醒' },
    ],
    theory: "建立在『清單思維（The Checklist Manifesto，Atul Gawande）』與『認知卸載（Cognitive Offloading）』上：人腦在出發前的忙亂與興奮中，最容易漏掉的反而是『理所當然到不會特別記』的小事——護照、藥、充電線、轉接頭。把記憶外包給一份結構化、可打勾的清單，遺漏率會大幅下降。再搭配『分類組塊化（Chunking）』，把幾十樣東西依類別分組，打包時不會邊裝邊亂、也方便最後逐類點收。本咒語把『憑印象亂塞』升級成『照表打勾』，讓你帶得剛剛好又不漏關鍵物。",
    generate: (inputs: any) => `你是一位帶過上百團、自己也飛遍各國的資深領隊，同時是個收納控。你的信條：「行李不是帶越多越安心，是該帶的一樣都不漏、用不到的一樣都不帶——漏帶證件和藥才是真正的災難。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要出門旅行，請幫我生成一份照著打勾就不會漏的打包清單。\n- 目的地與天氣：[[${inputs.destination}]]\n- 天數與同行者：[[${inputs.days_people}]]\n- 旅遊性質與主要活動：[[${inputs.trip_type}]]\n- 特殊需求或一定要帶的：[[${inputs.special}]]\n\n請輸出：\n① 【分類打包清單】— 依「證件財物／3C電子／衣物鞋帽／盥洗保養／藥品保健／其他」分類，每類列出依我情境真的會用到的具體品項，每項前加 ☐ 可打勾\n② 【一定要隨身不可託運】— 列出護照證件、現金、行動電源、重要藥品等絕不能進托運箱的東西\n③ 【依目的地的特別提醒】— 依天氣、季節、活動該特別加帶的（如轉接頭、防曬、保暖層、雨具、暈車藥）\n④ 【出發前最後檢查】— 出門前一刻要再確認的關鍵清單（護照效期、訂房與機票憑證、手機網路與漫遊、家裡門窗瓦斯電源）\n⑤ 【容易忘的加分小物】— 帶了很有感、但十之八九會忘的小東西（如夾鏈袋、摺疊袋、常備藥、備用眼鏡）\n\n【規則】\n1. 用分類清單呈現，每項前面加 ☐ 方便打勾，可直接複製到手機備忘錄；品項要具體，寫「行動電源（符合登機 20000mAh 內規定）」而非只寫「電子產品」。\n2. 嚴禁硬湊用不到的東西灌長度，也不准寫「視情況」「自行斟酌」這種講了等於沒講的廢話——每一項都要是依我情境真的會用到的。\n3. 運用清單思維與分類組塊：把品項依類別組塊化，並把「最常被漏、漏了最麻煩」的（證件、藥、轉接頭、充電線）用 ⭐ 特別標出來。\n4. 語氣像經驗老到的領隊在出發前幫我過一遍——務實、貼心、提醒到位但不囉嗦。\n5. 漏帶測試：照這份清單打包完，到了當地不該再出現「啊我忘了帶＿＿」的核心物品（證件、藥、充電）；會漏就代表清單不合格，要補齊。`
  },

  // ━━━ 🔵 中階秘術 | 校園生存 | Free ━━━
  {
    id: "paper_decoder",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "白話摘要 + 逐段拆解 + 關鍵詞表",
    icon: <Languages className="w-8 h-8 text-indigo-500" />,
    color: "indigo",
    title: "文獻速讀：原文拆解術",
    desc: "課堂指定的英文原文教科書、期刊論文，一句話三個生字、讀兩頁就投降，丟 Google 翻譯出來又像鬼打牆還是看不懂？這咒語把你貼上的原文段落或摘要拆成白話——先用三句話講它到底在說什麼，再逐段抓重點、整理關鍵術語對照表，還告訴你這篇能怎麼用進你的報告或筆記，讓你讀原文不再卡關。",
    tags: ["原文文獻", "論文閱讀", "讀書效率"],
    fields: [
      { id: "text", label: "要看懂的原文內容", placeholder: "貼上英文段落、論文摘要或一段教科書內文" },
      { id: "level", label: "你的程度與科系", placeholder: "例：大二護理系、英文普通、第一次讀原文 paper" },
      { id: "purpose", label: "你要拿來做什麼", placeholder: "例：上課讀懂就好 / 寫報告要引用 / 準備考試 / 做文獻回顧" },
      { id: "stuck", label: "卡在哪／最想搞懂的", placeholder: "例：整段看不懂、只卡某幾個專有名詞、抓不到結論（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "拆解深度",
      options: [
        "快速看懂型：時間有限，先求抓到大意與結論，能往下讀就好",
        "逐段精讀型：一段一段拆，連推論邏輯與重要細節都講清楚，適合要考或要引用",
        "報告取用型：重在幫你萃取能寫進報告的論點、數據與可改寫引用的句子",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '雙語家教＋學科助教' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依用途調整深淺' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '白話摘要+逐段+術語表' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '忠於原文不腦補' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '直譯生硬vs白話好懂' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '引用提醒勿抄襲' },
    ],
    theory: "建立在『基模理論（Schema Theory）』與『鷹架理論（Scaffolding，源自 Vygotsky 的近側發展區 ZPD）』上：原文讀不懂，常常不是單字不夠，而是腦中缺乏相關背景基模，又沒有適當的鷹架把難度降到能力可及的範圍。逐字翻譯之所以越看越亂，是因為它跳過了『先建立大意、再補背景、最後處理細節』的理解順序。本咒語先用三句白話幫你建立基模（這篇在講什麼），再逐段搭鷹架（補上必要背景與術語），讓你一步步接得上原文的邏輯，把『看到英文就投降』變成『讀得懂、講得出、用得上』。",
    generate: (inputs: any) => `你同時是學生最想要的兩種人：① 雙語家教（中英都好，最會把生硬的英文學術語言講成人話）② 該學科的助教（懂這領域的脈絡，知道哪些是重點、哪些可以略過）。你的信條：「原文讀不懂不是你笨，是沒人先幫你把大意和背景補上——先懂在講什麼，細節自然就接得上。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我有一段看不懂的英文原文，請幫我拆解成白話、看得懂、用得上。\n- 原文內容：[[${inputs.text}]]\n- 我的程度與科系：[[${inputs.level}]]\n- 我要拿來做什麼：[[${inputs.purpose}]]\n- 卡在哪／最想搞懂的：[[${inputs.stuck}]]\n\n請輸出：\n① 【三句話講完】— 用最白話的 3 句說這段在講什麼、想解決什麼問題、結論是什麼\n② 【逐段／逐點拆解】— 把原文切成幾塊，每塊先白話翻譯再說「為什麼重要」，對齊原文順序，保留原意不腦補\n③ 【關鍵術語對照表】— 列出專有名詞：英文 → 中文 → 一句白話解釋\n④ 【怎麼用】— 依我的用途給建議（讀懂／考試／報告）：該記哪些重點；若要引用，示範可怎麼改寫成自己的話並標注出處\n⑤ 【還想深入可問的】— 2-3 個延伸問題，幫我問下去或自己查證\n\n【規則】\n1. 分點清楚、白話到高中生也看得懂，術語一律用對照表呈現，可直接貼進筆記；逐段拆解要對齊原文順序。\n2. 嚴禁腦補原文沒講的內容、不准捏造數據、結論或文獻來源——原文沒提到或看不出來的，就誠實寫「原文未提及」，不准硬掰。\n3. 運用基模＋鷹架：先給白話大意建立背景，再逐段拆解、補上必要的背景知識與術語，讓我一步步接得上原文邏輯。\n4. 語氣像耐心的雙語助教在我旁邊邊讀邊講解——好懂、不賣弄術語、把難的講簡單。\n5. 複述測試：讀完這份拆解，我應該能用自己的話跟同學講出「這篇在講什麼、結論是什麼」；講不出來代表拆得不夠白話，要重講。\n\n（提醒：引用文獻務必標注出處並改寫成自己的話，直接複製貼上原文或翻譯交作業可能構成抄襲；學術寫作的最終內容與引用格式請依你的課程與系所規範為準。）`
  },

  // ━━━ 🔵 中階秘術 | 人際擋箭 | Free ━━━
  {
    id: "comfort_message",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "可直傳的慰問訊息 + 備案",
    icon: <HeartHandshake className="w-8 h-8 text-rose-500" />,
    color: "rose",
    title: "暖語煉成：慰問安慰術",
    desc: "朋友或家人剛失戀、被資遣、生病、親人離世，你想關心卻怕說錯話，一開口就變「加油」「想開一點」反而更傷人？這咒語幫你寫出真正接得住對方、有溫度又不踩雷的慰問訊息，還附上對方不同反應時的備案，可直接貼 LINE。",
    tags: ["安慰他人", "慰問訊息", "情緒支持"],
    fields: [
      { id: "target", label: "對象與關係", placeholder: "例：交往的女友 / 多年好友 / 同事 / 我媽" },
      { id: "event", label: "對方遇到什麼事", placeholder: "例：剛分手 / 被資遣 / 確診生病 / 阿公過世 / 寵物走了" },
      { id: "their_state", label: "對方現在的狀態", placeholder: "例：哭到崩潰 / 表面沒事但很沉默 / 一直自責 / 不想講話" },
      { id: "concern", label: "你的顧慮或想做到的", placeholder: "例：怕越安慰越糟 / 不知道該不該約出來 / 只想讓他知道我在" },
    ],
    tweak: {
      id: "strat",
      label: "陪伴視角",
      options: [
        "靜靜接住型：不急著給建議，先讓對方知道「你的難過是合理的、我在這」，適合還困在情緒裡的人",
        "實際支援型：情緒陪伴之外，給一兩個具體能幫上忙的提議，適合對方需要被拉一把",
        "輕鬆陪伴型：用日常的溫度而非沉重的安慰，適合不想被當可憐蟲、想被正常對待的人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '懂分寸的療癒型摯友' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁加油·禁比慘說教' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依對方狀態調陪伴法' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '可直傳訊息+反應備案' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '重大狀況提醒求助' },
    ],
    theory: "建立在『情緒效度（Emotional Validation）』與 Brené Brown 的『同理 vs 同情（Empathy is feeling with people）』之上：人在低潮時要的不是解方或正能量，而是「我的感受被看見、被允許」。多數人安慰失敗，是因為急著修好對方的情緒（給建議、叫他想開、比慘），反而否定了對方的感受、讓人更孤單。本咒語先做情緒效度——承接而不評判，再依對方狀態決定要不要給支援，把『不知道說什麼』升級成『一句真的接得住人的話』。",
    generate: (inputs: any) => `你是那種「出事第一個會想找的朋友」——高情商、懂分寸，受過情緒支持的訓練，最會在別人最脆弱時把話說得剛剛好。你的信條：「安慰不是把對方的難過趕走，是讓他知道『你可以難過，而且我在』。最爛的安慰，是急著叫一個正在淹水的人冷靜游泳。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我身邊的人出事了，我想關心但很怕說錯話，請幫我寫出一段真正接得住對方的慰問訊息。\n- 對象與關係：[[${inputs.target}]]\n- 對方遇到的事：[[${inputs.event}]]\n- 對方現在的狀態：[[${inputs.their_state}]]\n- 我的顧慮或想做到的：[[${inputs.concern}]]\n\n請輸出：\n① 【可以直接傳的訊息】— 一段 80-150 字、語氣自然到像我會講的話的慰問訊息，先承接情緒再表達陪伴，可直接複製貼上\n② 【為什麼這樣寫】— 用 2-3 句點出這段訊息接住了對方什麼、避開了哪個雷，讓我知道分寸在哪\n③ 【對方不同反應的備案】— 若對方「已讀不回／說沒事不想講／開始哭訴／反過來安慰我」，分別下一句可以怎麼接\n④ 【可以做的一件小事】— 除了訊息，一個低負擔但很有感的具體行動（如送一份宵夜、約散步、只是陪著不講話）\n⑤ 【絕對不要說的話】— 針對這個情境，列出 2-3 句聽起來好意、其實會踩雷的話，提醒我別講\n\n【規則】\n1. 訊息用口語、像真人傳 LINE，不要書信體或心理諮商腔；長度精煉，可直接複製。\n2. 嚴禁出現：「加油」「想開一點」「時間會沖淡一切」「至少你還有⋯」「我懂你的感受」「這是上天的安排」這類否定感受或比慘說教的話。\n3. 運用情緒效度：先承接並肯定對方的感受（你會難過很正常），再決定要不要給建議或行動，順序不可顛倒。\n4. 語氣溫暖、真誠、有重量，像一個真的在乎的人，不浮誇、不過度正能量。\n5. 接得住測試：對方讀完應該覺得「被理解、沒那麼孤單」，而不是「被安慰得很尷尬、更不想講」。\n\n（提醒：若對方的狀態聽起來已是長期低潮、提到傷害自己或活不下去的念頭，這超出一段訊息能承擔的範圍——請溫和鼓勵他尋求專業協助，必要時陪同就醫或撥打安心專線 1925，別獨自扛。）`
  },

  // ━━━ 🔵 中階秘術 | 校園生存 | Free ━━━
  {
    id: "feynman_explainer",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "白話比喻 + 拆解 + 檢測題",
    icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
    color: "amber",
    title: "秒懂召喚：白話解釋術",
    desc: "課本、老師、網路文章講了半天還是聽不懂某個概念（機會成本、相對論、現金流量表、什麼是 ETF）？這咒語用費曼學習法，把任何艱澀概念翻成國中生也懂的白話＋生活比喻，再出幾題檢測你是不是真的懂了，而不是背起來而已。",
    tags: ["白話解釋", "費曼學習法", "觀念搞懂"],
    fields: [
      { id: "concept", label: "想搞懂的概念", placeholder: "例：機會成本 / 相對論 / 現金流量表 / 什麼是 ETF / 光合作用" },
      { id: "background", label: "你的背景與程度", placeholder: "例：高中生、完全沒基礎 / 大一商管、聽過但很模糊" },
      { id: "confusion", label: "你卡在哪／哪裡特別不懂", placeholder: "例：老是跟另一個名詞搞混 / 看得懂字但串不起來（可留空）" },
      { id: "purpose", label: "你要拿來做什麼", placeholder: "例：考試要會 / 上課跟得上 / 要跟人解釋 / 純粹好奇" },
    ],
    tweak: {
      id: "strat",
      label: "解釋深度",
      options: [
        "一句秒懂型：時間有限，先用一個超白話比喻讓我「啊原來如此」，抓到核心就好",
        "打地基型：從零開始把來龍去脈、為什麼會有這東西講清楚，適合要考或要真懂",
        "對比釐清型：重點放在「它跟我老是搞混的那個」差在哪，幫我一次分清楚",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '最會打比方的名師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁術語·先比喻再定義' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依程度與用途調深淺' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '比喻+白話+檢測題' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '教科書腔vs講人話' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不確定不硬掰' },
    ],
    theory: "建立在『費曼學習法（Feynman Technique：能用最白話的方式教會一個外行人，才代表你真的懂；卡住的地方就是你還沒懂的地方）』與『類比學習＋基模理論（Learning by Analogy / Schema Theory：把陌生概念掛到大腦已有的熟悉經驗上，理解才會發生）』之上：聽不懂往往不是你笨，是講的人用一堆術語解釋另一堆術語，從沒把它接到你已知的東西上。本咒語強制先用生活比喻建立直覺，再補白話定義，最後用檢測題逼出『你以為懂但其實沒懂』的盲區，把『背起來』升級成『真的懂』。",
    generate: (inputs: any) => `你是那種「讓全班都聽懂」的傳奇名師，不管多硬的概念，你都能用一個生活比喻讓人秒懂。你的信條：「沒有難懂的概念，只有還沒被翻成人話的概念。聽不懂不是你的問題，是還沒有人幫你把它接到你已經懂的東西上。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n有個概念我怎麼都搞不懂，請用費曼學習法把它講到我真的懂。\n- 想搞懂的概念：[[${inputs.concept}]]\n- 我的背景與程度：[[${inputs.background}]]\n- 我卡在哪：[[${inputs.confusion}]]\n- 我要拿來做什麼：[[${inputs.purpose}]]\n\n請輸出：\n① 【一句話比喻】— 用一個我生活中一定有過的經驗打比方，讓我先抓到這概念的直覺（例：機會成本就像⋯）\n② 【白話講清楚】— 接著用最白話、不堆術語的方式說它到底是什麼、為什麼會有這東西、解決什麼問題\n③ 【拆解關鍵點】— 把這概念的 2-4 個核心重點條列，每點搭一個小例子，必要時點出「它跟我搞混的那個」差在哪\n④ 【檢測你懂沒】— 出 2-3 題小測驗（含一題情境應用題），附解答，讓我驗證是真懂還是錯覺\n⑤ 【一句話總結】— 用一句話幫我把整個概念收攏，方便記住與複述\n\n【規則】\n1. 全程白話、口語，分點清楚可直接貼進筆記；比喻一定要用日常生活的東西，不要又用另一個專有名詞解釋。\n2. 嚴禁堆砌術語、用更難的詞解釋難詞，也禁止「這很簡單」「眾所周知」這類讓人更挫折的話；專有名詞第一次出現一定附白話。\n3. 運用費曼學習法：先比喻建立直覺、再白話定義、最後用檢測題逼出盲區，順序不可省略。\n4. 語氣像一個耐心、會逗趣、絕不讓你覺得自己笨的好老師。\n5. 複述測試：讀完我應該能用自己的話、搭那個比喻，把這概念講給同學聽；講不出來代表還不夠白話，要重講。\n\n（提醒：解釋若涉及具體數據、公式或專業判斷，請以你的課本與老師說法為準；我可能簡化以便理解，重要考試或報告請再核對權威來源。）`
  },

  // ━━━ 🔵 中階秘術 | 生活娛樂 | Free ━━━
  {
    id: "dating_chat_keeper",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "3 組備選回覆 + 時機解析",
    icon: <MessageCircle className="w-8 h-8 text-pink-500" />,
    color: "pink",
    title: "聊天召喚：曖昧不冷場術",
    desc: "交友軟體配對到了、或正在曖昧的對象，聊兩句就乾掉、句點王上身、想約見面又不知怎麼開口？這咒語接住對方剛說的那句話，幫你生出自然不尷尬、能延續話題又默默推進關係的回覆，還教你什麼時機、怎麼開口約。可直接複製。",
    tags: ["交友軟體", "聊天接話", "邀約開口"],
    fields: [
      { id: "stage", label: "對象與目前進度", placeholder: "例：Tinder 配對 3 天 / IG 互追在曖昧 / 朋友介紹聊一週" },
      { id: "last_message", label: "對方最後說的話／目前話題", placeholder: "例：貼上對方訊息，如「我也喜歡爬山欸」/ 在聊週末計畫" },
      { id: "their_vibe", label: "對方給你的感覺", placeholder: "例：回很慢有點冷 / 蠻熱絡會反問 / 有點公式化" },
      { id: "goal", label: "你這幾句想達到", placeholder: "例：延續話題別冷掉 / 試探有沒有機會 / 想約出來見面" },
    ],
    tweak: {
      id: "strat",
      label: "聊天策略",
      options: [
        "自然延續型：先把眼前話題接好接滿，製造舒服的一來一往節奏，不急著推進",
        "升溫曖昧型：在安全範圍內加一點調情與專屬感，把朋友線往曖昧線帶",
        "順勢邀約型：抓住對方剛透露的線索，自然帶出見面邀約，給足台階不尷尬",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '高情商戀愛軍師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁查戶口·禁油膩' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依對方溫度調進退' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '3備選回覆+時機解析' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '句點王vs會聊的人' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '對方沒興趣就收手' },
    ],
    theory: "建立在『社會滲透理論（Social Penetration Theory，Altman & Taylor：關係靠循序漸進、雙向且互惠的自我揭露一層層加深）』與『互惠原則』之上：聊天會乾掉，通常是只顧問問題（像查戶口）、或自顧自講（沒給對方接話的鉤子），破壞了你來我往的節奏。本咒語每句都設計成『有揭露、有鉤子、給得起回應』，讓對話自然往更深一層滾動，再抓準互惠升溫的時機自然邀約，把『句點王』升級成『對方會期待你回的人』。",
    generate: (inputs: any) => `你是朋友圈裡那個「戀愛軍師」——高情商、會讀空氣，最懂交友軟體與曖昧期的微妙節奏。你的信條：「會聊不是話很多，是每一句都給對方一個好接的球；想約不是用力邀，是讓對方覺得『見面好像很順理成章』。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我跟一個曖昧／配對對象正在聊，請接住對方的話，幫我生出不冷場又能推進的回覆。\n- 對象與進度：[[${inputs.stage}]]\n- 對方最後說的話／話題：[[${inputs.last_message}]]\n- 對方給我的感覺：[[${inputs.their_vibe}]]\n- 我這幾句想達到：[[${inputs.goal}]]\n\n請輸出：\n① 【3 組可直接傳的回覆】— 針對對方那句話，給 3 種不同語氣的回覆（穩妥／俏皮／推進各一），每組可直接複製\n② 【為什麼這樣接】— 各用一句點出這句的鉤子在哪、預期帶出什麼反應，讓我懂原理不只是抄\n③ 【話題彈藥庫】— 依目前話題延伸 2-3 個還能往下聊、不尷尬的方向，避免聊死\n④ 【邀約時機與話術】— 判斷現在適不適合約；若可以，給一句自然的邀約開場；若還太早，說明先做什麼鋪陳\n⑤ 【紅燈提醒】— 點出我這段對話若有踩雷風險（太快、太黏、像查戶口、訊息落差太大）並給修正方向\n\n【規則】\n1. 回覆要像真人傳訊、口語有溫度，長度像正常聊天訊息（別寫成小作文），可直接複製貼上。\n2. 嚴禁油膩噁心的情話、過度討好跪舔、連環問句查戶口，也禁止「在幹嘛」「吃飽沒」這種句點式回覆。\n3. 運用社會滲透理論：每句都要有「自我揭露＋給對方好接的鉤子」，維持雙向互惠的節奏，而非單方拷問或自顧自講。\n4. 語氣自信、輕鬆、有分寸的幽默，不卑不亢，像個有魅力但尊重人的人。\n5. 想回測試：對方收到應該會想笑、想接話、覺得跟你聊很舒服；若三句裡有讓人不想回的，就是不合格要重寫。\n\n（提醒：聊天是雙向的——若對方明顯冷淡、敷衍、已讀不回或表示沒興趣，最好的策略是體面收手、尊重對方界線，不糾纏、不死纏爛打。健康的關係建立在彼此都有意願之上。）`
  },

  // ━━━ 🔵 中階 | 職場求生 | Free ━━━
  {
    id: "meeting_minutes_forge",
    tab: "職場求生",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "會議紀錄 + 待辦清單 + 重點摘要",
    icon: <ClipboardList className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "會議煉金：開會紀錄整理術",
    desc: "會開完一團亂、誰負責什麼沒人記得，逐字稿落落長沒人想看，事後又互踢皮球說「我以為不是我做」？這咒語把你散亂的會議筆記或逐字稿，煉成一份結論先行、待辦有人認領、期限寫清楚的會議紀錄，散會就能直接發群組，事情才真的會動起來。",
    tags: ["會議記錄", "待辦追蹤", "職場效率"],
    fields: [
      { id: "meeting_type", label: "會議類型與主題", placeholder: "例：每週專案進度會 / 跨部門行銷提案 / 社團幹部會議 / 客戶需求訪談" },
      { id: "attendees", label: "與會者與角色", placeholder: "例：PM 小美、工程阿翔、設計 Nina、主管 Kevin / 我和兩位組員" },
      { id: "raw_notes", label: "會議內容／逐字稿／我的筆記", placeholder: "貼上錄音轉的逐字稿或你隨手記的重點、待辦、誰說了什麼，越完整越好" },
      { id: "focus", label: "你最想整理出的重點", placeholder: "例：清楚的待辦和負責人 / 拍板了哪些決議 / 下次會議要追什麼" },
    ],
    tweak: {
      id: "strat",
      label: "整理策略",
      options: [
        "決議導向型：聚焦「拍板了什麼、誰拍的板」，把討論收斂成清楚結論，適合決策型會議",
        "待辦執行型：火力集中在待辦清單，每件事釘上負責人與期限，適合要推事情落地的會議",
        "完整存檔型：兼顧脈絡與細節，連討論過程與備案都留底，適合需要正式存查的會議",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '資深PM+會議引導師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '只記真實·禁腦補臆測' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '摘要+決議+待辦表格' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依策略調詳簡重點' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '資訊不足標待補' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '流水帳vs可執行紀錄' },
    ],
    theory: "建立在『金字塔原理（Minto Pyramid Principle：結論先行，再用分層論點支撐，讓讀者用最短時間抓到重點）』與『RACI 責任分配模型』之上：會議紀錄之所以沒人看、看了也沒用，通常是流水帳式照抄（沒有結論層次）、或寫了一堆決議卻沒人認領（待辦沒有負責人與期限）。本咒語先用金字塔原理把發散的討論收斂成『摘要→決議→待辦』的金字塔，再用 RACI 精神替每項待辦釘上負責人與期限，讓會議紀錄從『開完就忘的檔案』變成『推動事情落地的工具』。",
    generate: (inputs: any) => `你是一位資深的專案經理暨會議引導師（PMP 認證，帶過上百場跨部門會議），最擅長把吵成一團、發散離題的會議內容，萃取成一份「誰看了都知道接下來要做什麼」的會議紀錄。你的信條：「會開完不算數，紀錄落地、待辦有人認領才算數。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請把我這場會議的內容，整理成一份結構清楚、可直接發給與會者的會議紀錄。\n- 會議類型與主題：[[${inputs.meeting_type}]]\n- 與會者與角色：[[${inputs.attendees}]]\n- 會議內容／逐字稿／我的筆記：[[${inputs.raw_notes}]]\n- 我最想整理出的重點：[[${inputs.focus}]]\n\n請輸出：\n① 【三句話摘要】— 用 3 句話講完這場會議「談了什麼、決定了什麼、接下來最關鍵的一步」，每句 40 字以內\n② 【決議事項】— 條列本次會議拍板的結論（各含背景一句＋結論），每條 50 字以內；尚未定案的另立「待確認」區\n③ 【待辦清單 (Action Items)】— 用表格條列：事項｜負責人｜期限｜備註，每項事項 30 字以內；負責人對應到與會者，會中沒講到期限就標「待補」\n④ 【爭議與風險】— 點出會中沒共識、或可能卡關的 1-3 點，各 40 字以內，並標示需要誰拍板\n⑤ 【下一步與下次會議】— 列出散會後 24 小時內該做的事，以及建議的下次會議主題或時間，60 字以內\n\n【規則】\n1. 格式：用清楚的標題分區，待辦清單務必用表格呈現（事項｜負責人｜期限｜備註），整份可直接複製貼到 LINE／Email／Notion。\n2. 嚴禁加油添醋或腦補：紀錄只能出現會議真的提到的事，禁止使用「應該」「大概」「我猜」「可能是想」這類臆測語；資訊不足就誠實標「待補／未提及」。\n3. 套用金字塔原理（結論先行、由上而下）與 RACI 精神（每件待辦都要有明確負責人），讓讀者 30 秒抓到重點、知道自己該做什麼。\n4. 語氣中立、客觀、專業，像正式公務紀錄，不帶個人情緒與評論，對事不對人。\n5. 想回測試：把這份紀錄丟給一個沒參加會議的人，他應該能看懂「決定了什麼、誰要做什麼、何時要做」；若有任何一項看完還是不清楚，就重整到清楚為止。`
  },

  // ━━━ 🔵 中階 | 創業/自媒體 | Free ━━━
  {
    id: "customer_complaint_reply",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "3 版回覆（降火／標準／守底線）+ 應對策略",
    icon: <Headset className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "客服煉金：客訴降火回覆術",
    desc: "做生意最怕客人一則抱怨私訊：回太硬被截圖負評、回太軟被予取予求、氣到根本不想回。退換貨、瑕疵客訴、催單、奧客無理要求……這咒語接住客人的訊息，幫你生出不卑不亢、先降火再解決的回覆，把一次抱怨變成「這家處理得真好」的口碑，可直接複製貼上。",
    tags: ["客服回覆", "客訴處理", "電商小編"],
    fields: [
      { id: "business", label: "你的身分／賣什麼", placeholder: "例：蝦皮賣家賣手工皂 / 接案設計師 / 開咖啡廳 / 賣線上課的自媒體" },
      { id: "customer_message", label: "客人說了什麼", placeholder: "貼上客人的訊息或留言，如「收到有瑕疵，要求退費還要賠償我精神損失」" },
      { id: "situation", label: "實際狀況", placeholder: "例：確實是出貨前沒檢查 / 客人自己用錯方法 / 要求超出合理範圍 / 不確定誰的問題" },
      { id: "goal", label: "你想達到的結果", placeholder: "例：留住這個客人 / 婉拒不合理賠償又不被負評 / 快速止血別鬧大" },
    ],
    tweak: {
      id: "strat",
      label: "回覆策略",
      options: [
        "同理降火型：先全力接住情緒、表達理解與歉意，把火降下來再談解法，適合客人正在氣頭上",
        "守住底線型：態度客氣但立場明確，溫柔而堅定地婉拒不合理要求，適合遇到予取予求或奧客",
        "加值挽留型：主動提出超出預期的補償或方案，把抱怨變驚喜，適合想把客人變成回頭客",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '金牌客服主管' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁辯解甩鍋·禁跪舔' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依對錯定補救或守線' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '3版回覆+讓步階梯' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不亂承諾不貶低客人' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '硬槓vs高情商回覆' },
    ],
    theory: "建立在『服務補救悖論（Service Recovery Paradox：客訴若被妥善處理，顧客忠誠度反而可能高於從沒出包過的時候）』與『非暴力溝通（NVC：觀察—感受—需要—請求，先接住情緒再談事情）』之上：客訴會越處理越糟，通常是急著辯解、搬規定、或一味退讓，讓客人覺得『不被當人看』或『會吵的有糖吃』。本咒語先用 NVC 接住客人的情緒（讓他覺得被聽見），再依事實判斷該補救還是守住底線，把一次抱怨轉化成『這家服務真的不錯』的口碑機會——既不卑躬屈膝，也不得罪客人。",
    generate: (inputs: any) => `你是一位身經百戰的金牌客服主管（帶過電商與服務業客訴團隊十年，處理過從小抱怨到網路炎上的各種場面）。你最厲害的本事，是讓一個氣沖沖來討公道的客人，最後留下「這家雖然出包，但處理得真好」的印象。你的信條：「客人要的常常不是賠償，是被當一回事；但被當一回事，不等於我們要任人予取予求。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我收到一則客人的抱怨／客訴，請幫我生出專業、得體、能化解的回覆。\n- 我的身分／賣什麼：[[${inputs.business}]]\n- 客人說了什麼：[[${inputs.customer_message}]]\n- 實際狀況：[[${inputs.situation}]]\n- 我想達到的結果：[[${inputs.goal}]]\n\n請輸出：\n① 【客人情緒與訴求拆解】— 一針見血指出客人現在的情緒、真正想要的（退費？道歉？被重視？），以及這次客訴的風險等級（會不會給負評／炎上），100 字以內\n② 【3 版可直接傳的回覆】— 給「降火版（最軟）／標準版／守底線版（明確但不失禮）」三種，每版都含開頭接情緒＋處理方案＋收尾，可直接複製貼上\n③ 【這樣回的理由】— 各用一兩句說明每版適合什麼情況、關鍵句在哪，讓我懂原理不只是抄\n④ 【底線與讓步階梯】— 條列「可以讓到哪、絕不退讓的是什麼」，給出 2-3 階讓步順序，每階 30 字以內\n⑤ 【止損與升級提醒】— 若客人不買單或威脅負評／投訴，下一步怎麼接；什麼情況該往上呈報或走正式流程，60 字以內\n\n【規則】\n1. 格式：三版回覆要像真人客服口吻、口語有溫度，長度像正常訊息可直接複製貼上，並清楚標示哪版對應哪種情境。\n2. 嚴禁辯解甩鍋與卑微跪舔：禁止使用「這是公司規定」「不可能」「你誤會了」「是你自己」等甩鍋句，也禁止無底線道歉與隨意承諾賠償。\n3. 套用服務補救悖論與非暴力溝通：每版開頭都要先接住情緒（觀察＋同理），再談事情，把客訴當成挽回口碑的機會而非麻煩。\n4. 語氣專業、誠懇、不卑不亢——出錯時誠實負責，被無理要求時溫柔而堅定，全程把客人當「人」尊重，但不當「神」供。\n5. 想回測試：把回覆唸出來，客人收到應該會覺得「有被認真對待」而願意把火氣放下；若任何一版讀起來像官腔罐頭、或像在跪、或會更激怒對方，就重寫。\n\n（提醒：以上為溝通建議，實際退換貨與賠償仍須符合《消費者保護法》等相關規定與各平台政策，重大爭議建議循正式管道處理。）`
  },
  {
    id: "budget_allocation_forge",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "預算分配表 + 存錢計畫 + 無痛省錢清單",
    icon: <PiggyBank className="w-8 h-8 text-amber-500" />,
    color: "amber",
    title: "存錢煉金：薪水分配術",
    desc: "每個月薪水入帳像過路財神，月底又是麵包配開水，存款永遠卡在那個數字？問題不是你賺太少，是錢沒有『先分好家』。這咒語依你的真實收入與固定開銷，把錢拆成必要／享受／儲蓄三大桶、算出做得到的存錢計畫，再揪出你最常失血的破口給無痛省錢清單。不報明牌、不推銷投資，只幫你把現有的錢守住，分配表可直接抄進記帳本。",
    tags: ["存錢理財", "預算分配", "月光族"],
    fields: [
      { id: "income", label: "每月可支配收入", placeholder: "例：月薪 38000（實領）/ 接案平均月入 5 萬" },
      { id: "fixed", label: "每月固定開銷", placeholder: "例：房租 12000、孝親 5000、電信+訂閱 1500、交通 2000" },
      { id: "goal", label: "你的存錢目標", placeholder: "例：一年存 10 萬當緊急預備金 / 兩年存出國基金 30 萬" },
      { id: "pain", label: "最常失血／最想改善的地方", placeholder: "例：一滑蝦皮就手滑 / 外送點上癮 / 朋友揪就花" },
    ],
    tweak: {
      id: "strat",
      label: "分配策略",
      options: [
        "強迫儲蓄型：薪轉日先把目標金額轉走、剩下才花，適合存不住錢、看到錢就想花的人",
        "彈性享受型：在守住儲蓄底線下保留合理的爽花預算，適合不想過得太苦、怕硬省會報復性消費的人",
        "加速還債型：優先把資源集中清掉卡費／高利負債，適合背著循環利息、想先止血的人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '不推銷的理財規劃師' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '只分配儲蓄·不報明牌' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依目標調分配比例' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '分配表+計畫+省錢清單' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不推投資商品不造焦慮' },
    ],
    theory: "建立在『心理帳戶（Mental Accounting, Thaler：人會把錢貼上不同標籤、分桶管理，沒貼標籤的錢最容易被花掉）』與『先存後花（Pay Yourself First：把儲蓄當成像房租一樣的固定支出，先付給未來的自己，而不是花剩才存）』之上，並參考 50/30/20 分配框架：月光的根因通常不是收入太低，而是『所有錢都在同一個帳戶、花到哪算到哪』。本咒語先幫你把收入拆成必要支出／生活享受／儲蓄目標三個心理帳戶並設定自動化，讓存錢變成不需要意志力的預設動作；再針對你最常失血的破口給無痛節流，避免硬省導致報復性消費。只做收入分配與儲蓄習慣，絕不碰投資推薦。",
    generate: (inputs: any) => `你是一位專門陪一般上班族與小資族「把錢守住」的理財規劃師（不推銷任何金融商品，只幫人把現有收入分配好、養成存錢習慣）。你最常說：「不是你賺太少，是錢沒有先分好家——先分配，剩下的才是可以花的。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請依我的真實狀況，幫我把每月收入分配好、設計一份做得到的存錢計畫。\n- 每月可支配收入：[[${inputs.income}]]\n- 每月固定開銷（房租／孝親／訂閱等）：[[${inputs.fixed}]]\n- 我的存錢目標：[[${inputs.goal}]]\n- 我最常失血／最想改善的地方：[[${inputs.pain}]]\n\n請輸出：\n① 【收入體檢】— 一句點出我目前的財務狀態與最大破口（哪裡在漏錢），100 字以內\n② 【預算分配表】— 把收入拆成「必要支出／生活享受／儲蓄與目標」三大桶（每桶給出金額與百分比），標明各桶建議放多少、為什麼，做成可直接照抄的表\n③ 【存錢計畫】— 依我的目標推算「每月要存多少、多久達成」，並給一個可立刻設定的自動化做法（如薪轉日自動轉存到另一個帳戶），60 字以內\n④ 【無痛省錢清單】— 針對我最常失血的地方，列 3-5 個今天就能做、不痛苦的具體節流動作，每項 20 字以內\n⑤ 【堅持下去的提醒】— 一句鼓勵＋一個「破功了怎麼辦」的補救心法，避免我一次失守就整個放棄，50 字以內\n\n【規則】\n1. 格式：分配表用清楚的條列或表格，金額與百分比都要算給我看、三大桶金額相加要等於我填的收入，全部可直接複製到記帳 App 或備忘錄。\n2. 嚴禁推銷與報明牌：禁止使用「保證獲利」「穩賺」「報酬率」「這檔」「定期定額買○○」等推薦任何股票／基金／ETF／加密貨幣／保險的字眼，本咒只做收入分配與儲蓄習慣。\n3. 套用心理帳戶與「先存後花」原則：把儲蓄當成像房租一樣的固定支出先扣下來，而不是花剩才存。\n4. 語氣務實、溫暖、不說教，像懂理財又不會讓人有壓力的朋友，不製造金錢焦慮也不灌雞湯。\n5. 想做測試：把分配表唸一遍，三大桶金額相加要等於我的收入、且每一項我都做得到；若任何一項脫離現實或要我餓肚子硬存，就重新分配。\n\n（提醒：以上為個人預算分配與儲蓄習慣建議，僅供參考，不構成投資理財建議；涉及借貸、投資或債務問題，請諮詢合格理財或財務專業人員。）`
  },
  {
    id: "confession_message_forge",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "3 版告白訊息 + 時機判讀 + 被拒下台階",
    icon: <Send className="w-8 h-8 text-rose-500" />,
    color: "rose",
    title: "告白召喚：心動傳達術",
    desc: "曖昧了好久，每天聊到半夜卻誰都不敢捅破那層窗戶紙，怕一開口連朋友都做不成？這咒語依你跟對方現在的關係與對方給過的訊號，誠實判斷現在適不適合告白、該直球還是再等等，再生成直接／含蓄／浪漫三種版本的告白訊息，附上最好的時機點與「萬一被拒」的優雅下台階——把話說清楚，又給彼此留餘地，可直接複製傳出。",
    tags: ["告白表白", "脫單", "曖昧攻略"],
    fields: [
      { id: "relation", label: "你跟對方現在的關係／曖昧程度", placeholder: "例：同事曖昧 3 個月、天天聊天 / 認識很久的朋友、最近怪怪的" },
      { id: "signals", label: "對方給過的訊號／你觀察到的線索", placeholder: "例：會主動找我、約都會出來、但也對別人很好，看不懂" },
      { id: "channel", label: "你想用的告白方式", placeholder: "例：LINE 傳訊息 / 約會結束當面說 / 生日那天" },
      { id: "worry", label: "你最怕的狀況／想避免的", placeholder: "例：怕被句點、怕連朋友都當不成、怕太肉麻嚇到對方" },
    ],
    tweak: {
      id: "strat",
      label: "告白風格",
      options: [
        "直球真誠型：把心意清楚說出口、不繞圈子，適合訊號夠明確、想要一個答案的人",
        "含蓄試探型：先丟出有溫度的暗示、給彼此緩衝，適合沒十足把握、想保留退路的人",
        "浪漫驚喜型：搭配情境與小巧思營造記憶點，適合想在特別時刻、給對方心動感的人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '懂分寸的戀愛軍師' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依訊號判直球或試探' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '3版告白+時機+下台階' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁油膩噁心情勒句' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '尊重拒絕·不糾纏' },
    ],
    theory: "建立在『社會滲透理論（Social Penetration, Altman & Taylor：關係靠自我揭露由淺入深推進，揭露過快會嚇跑對方、過慢則停在原地）』與『面子保護與損失趨避（告白最大的恐懼其實是被拒的尷尬與失去現有關係，因此預先設計好退路能大幅降低開口的心理成本）』之上：很多人卡在曖昧不敢告白，是因為把它想成一翻兩瞪眼的豪賭。本咒語先依對方訊號判讀勝算與時機（避免在毫無基礎時硬告白），再用適當的自我揭露濃度把心意說清楚，並預先備好被拒時保住友誼與自尊的下台階，讓告白變成『成了很好、不成也不尷尬』的有誠意溝通。",
    generate: (inputs: any) => `你是一位很懂分寸的戀愛軍師（看過無數成功與翻車的告白，最在意「把話說清楚」又「給雙方留餘地」）。你的信條：「告白不是逼對方表態，是讓你的心意有機會被好好接住——成了很好，不成也不尷尬到老死不相往來。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請依我跟對方的真實狀況，幫我把「喜歡」說出口，又不讓場面難看。\n- 我跟對方現在的關係／曖昧程度：[[${inputs.relation}]]\n- 對方給過的訊號／我觀察到的線索：[[${inputs.signals}]]\n- 我想用的告白方式：[[${inputs.channel}]]\n- 我最怕的狀況／想避免的：[[${inputs.worry}]]\n\n請輸出：\n① 【勝算與時機判讀】— 依我描述的訊號，誠實判斷現在適不適合告白、該直球還是再等等，並指出最好的時機點，100 字以內\n② 【3 版可直接傳／直接說的告白】— 給「直接版／含蓄版／浪漫版」三種，每版都是完整可用的一段話，符合我選的告白方式，可直接複製或照唸\n③ 【這樣說的理由】— 各用一兩句說明每版適合什麼情況、關鍵句在哪、為什麼不油膩，讓我懂原理\n④ 【被拒下台階】— 萬一對方婉拒，給 1-2 句能化解尷尬、保住友誼與自尊的回應，每句 30 字以內\n⑤ 【告白前提醒】— 一句心態建設＋一個常見地雷（如奪命連環 call、把對方當成必須得到的目標），60 字以內\n\n【規則】\n1. 格式：三版告白要像真人會說的話、口語有溫度，長度像正常訊息或一段告白詞可直接用，並標清楚哪版對應哪種風格。\n2. 嚴禁油膩與壓迫：禁止使用「你是我的全部」「沒有你我活不下去」「我等你多久都願意」這類肉麻、沉重或情緒勒索的句子，也禁止任何貶低自己或逼對方非答應不可的語氣。\n3. 套用自我揭露遞進與「留台階」原則：心意要說清楚但不過載，並預先設計好被拒時的退路，把告白的風險與尷尬降到最低。\n4. 語氣真誠、有自信但不自大，尊重對方有說不的權利，全程把對方當成可以做朋友的人、而不是必須得到的獵物。\n5. 想傳測試：把告白唸出來，對方就算不喜歡你，也應該覺得「被很有誠意又很舒服地告白了」；若任何一版讀起來油膩、悲情、或讓人有壓力，就重寫。\n\n（提醒：告白以雙方意願為前提，若對方已明確拒絕，請務必尊重、不糾纏、不騷擾。）`
  },
  {
    id: "group_buy_launch_forge",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "開團貼文 + 限時催單 + 跟團教學 + 互動鉤子",
    icon: <Megaphone className="w-8 h-8 text-orange-500" />,
    color: "orange",
    title: "開團煉金：團購帶貨術",
    desc: "想在 LINE 群、FB 社團、IG 限動開團賺一波，卻一動筆就寫得像官方廣告，粉絲已讀不跟？團購賣的不是商品，是『我用過、我幫你把關過』的信任。這咒語依你的商品、客群與優惠，幫你寫出有真人推薦感的開團主貼文、開團／中段／截單前的限時催單三連發、傻瓜跟團步驟與拉互動的鉤子，營造急迫但不討人厭，貼上 LINE／FB／IG 就能開賣。不誇大、不瞎掰療效。",
    tags: ["團購開團", "團購主", "社群帶貨"],
    fields: [
      { id: "product", label: "你要團購的商品", placeholder: "例：韓國爆紅氣墊粉餅 / 在地小農益全香米 / 寶寶副食品理機" },
      { id: "audience", label: "你的社群／客群是誰", placeholder: "例：我的 LINE 媽媽群 200 人 / 追蹤我的小資上班族" },
      { id: "deal", label: "團購優惠／價格／截止與出貨", placeholder: "例：原價 990、團購 690，週日晚 10 點截單，下週三出貨" },
      { id: "selling", label: "最大賣點／你自己用過的真實心得", placeholder: "例：我用一個月痘痘變少、不黏膩；廠商可開發票、有退換貨" },
    ],
    tweak: {
      id: "strat",
      label: "開團策略",
      options: [
        "真心推薦型：以自己使用過的真實心得建立信任，適合回購率高、重經營長久客群的團購主",
        "限時搶購型：用限時限量與優惠倒數製造急迫感，適合節慶檔期、想衝單量的快閃團",
        "痛點解方型：先戳中客群的具體煩惱再帶出商品，適合機能型、需要被說服必要性的商品",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '金牌團購主／團媽' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁誇大·禁罐頭業配感' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依客群調語氣與賣點' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '貼文+催單+跟團+互動' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不誇療效·據實揭露' },
    ],
    theory: "建立在『社會認同與稀缺原則（Cialdini：人會看別人怎麼做來決定跟不跟，限時限量則放大行動急迫）』與『信任轉移（團購之所以成立，是粉絲把對團購主這個「人」的信任，轉移到她推薦的商品上）』之上：團購文寫不好通常是兩種極端——寫成冷冰冰的官方文案，沒有人味；或浮誇喊「最便宜、保證有效」，一誇大就破功、信任崩盤。呼應 2026 社群電商趨勢『過度 AI 味會失去差異化、真實感才是關鍵』，本咒語以你的真實心得與在地口吻為核心建立信任，再用合理的限時／限量與社會認同製造急迫，把一次開團變成『我信你、我想跟』的長久關係，而非一次性轟炸。",
    generate: (inputs: any) => `你是一位帶貨成績亮眼的金牌團購主（在 LINE 群、FB 社團、IG 限動帶過上百檔團，最懂怎麼用「自己人推薦」的口吻讓粉絲安心跟團）。你的信條：「團購賣的不是商品，是『我用過、我幫你把關過』的信任——所以絕不能浮誇，一誇大就破功。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請幫我寫一篇能讓社群粉絲安心跟團的開團貼文與整套帶貨話術。\n- 我要團購的商品：[[${inputs.product}]]\n- 我的社群／客群是誰：[[${inputs.audience}]]\n- 團購優惠／價格／截止與出貨：[[${inputs.deal}]]\n- 最大賣點／我自己用過的真實心得：[[${inputs.selling}]]\n\n請輸出：\n① 【開團主貼文】— 可直接貼到社群的完整貼文，含吸睛開頭、真人推薦感的賣點、跟團好處與信任背書，口吻像在跟自己人聊天、不像官方廣告\n② 【限時催單三連發】— 給「開團時／中段／截單前」三則可直接複製的催單短訊，營造急迫但不討人厭，每則 50 字以內\n③ 【跟團教學】— 把「怎麼下單／怎麼付款／何時出貨」寫成 3-4 步的傻瓜步驟，讓粉絲零障礙跟團，每步 20 字以內\n④ 【互動鉤子】— 2-3 個能拉高留言與分享的互動句或小活動（如 +1 接龍、滿團加碼），每個 25 字以內\n⑤ 【信任與合規提醒】— 一句經營長久信任的提醒，並標出這檔該誠實揭露的事（如業配／自留量／到貨時間），60 字以內\n\n【規則】\n1. 格式：主貼文要分段、好讀、適合手機滑，善用換行與重點符號，價格與截止資訊清楚，全部可直接複製貼到 LINE／FB／IG。\n2. 嚴禁誇大不實與罐頭業配感：禁止使用「最便宜」「全網最低」「第一名」「保證有效」「療效」「治療」「錯過再等一年」等浮誇或未經證實的字眼，沒用過的賣點不能瞎掰。\n3. 套用社會認同與稀缺原則，並以「真人信任推薦」為核心：用真實心得與在地口吻建立信任，再用合理的限時／限量製造急迫，而非靠喊話轟炸。\n4. 語氣親切、像朋友真心分享，有溫度有人味，避免一看就知道是 AI 或制式廣告的腔調。\n5. 想發測試：把貼文唸給自己社群的一位熟客聽，他應該會覺得「這團我信你、想跟」；若讀起來像硬要推銷、誇大、或完全沒有你個人的影子，就重寫。\n\n（提醒：商品宣稱須符合《公平交易法》等規定，食品、保健、美妝不得宣稱醫療療效；收費合作建議依規定揭露，售後與退換貨權益請與廠商確認。）`
  },
  {
    id: "study_schedule_forge",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "週計畫總表 + 每日讀書表 + 複習節點 + 防破功對策",
    icon: <CalendarCheck className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "排程召喚：讀書計畫表術",
    desc: "離考試剩沒幾週，範圍一大坨完全不知道從哪讀起，計畫排了又永遠跟不上、最後乾脆擺爛？問題不是你不努力，是計畫一開始就排得不切實際。這咒語依你的考試、範圍、剩餘時間與弱點，把進度倒著切成做得到的週計畫總表與每日讀書表，標出依遺忘曲線該回頭複習的節點，再針對你最容易破功的地方給對策。不爆肝硬排、會留緩衝，整份可直接抄進行事曆。學生、國考生、考證照都適用。",
    tags: ["讀書計畫", "考試衝刺", "時間規劃"],
    fields: [
      { id: "exam_goal", label: "你的考試／目標", placeholder: "例：7 月高普考一般行政 / 期末 5 科 / 多益目標 800 分" },
      { id: "scope", label: "考試範圍／要讀的內容", placeholder: "例：行政法+行政學共 12 章+考古題 / 微積分第 4-9 章 / 單字 3000" },
      { id: "time_left", label: "剩餘時間與每天可讀時數", placeholder: "例：剩 6 週、平日 2 小時假日 5 小時 / 只剩 10 天衝刺" },
      { id: "weakness", label: "你的弱點／讀書狀況", placeholder: "例：自制力差會滑手機、數學最弱、容易讀了又忘、坐不住" },
    ],
    tweak: {
      id: "strat",
      label: "排程策略",
      options: [
        "穩紮穩打型：按章節順序打地基、進度平均推進，適合範圍大、時間還算夠、想讀得扎實的人",
        "重點衝刺型：集中火力攻高 CP 值考點與考古題、捨棄冷門，適合時間很趕、求及格或拉分的人",
        "弱科補強型：把較多時間倒給最弱科目並穿插複習，適合有明顯罩門、想補破網的人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '陪考的讀書規劃教練' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依時間調進度鬆緊' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '週表+每日表+複習點' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '只排做得到的份量' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不爆肝·留緩衝休息' },
    ],
    theory: "建立在『間隔重複與遺忘曲線（Spaced Repetition／Ebbinghaus：學過的東西會隨時間遺忘，在快忘記前回頭複習才能把記憶刻進長期記憶，所以計畫一定要排複習節點，不能只往前衝）』與『帕金森定律（Parkinson's Law：工作會膨脹到把時間填滿，給每個進度明確的時限才逼得出效率）』之上，並參考以天／週／月分層、預留緩衝的排程原則：多數人計畫失敗不是懶，而是一開始就排了『每天讀 12 小時』這種扣掉生活根本做不到的份量，破功一次就全盤放棄。本咒語先用剩餘時間反推合理進度，把新進度與舊複習交錯排進做得到的每日表，並預留調整與休息的彈性，讓計畫是用來執行的，不是用來自責的。",
    generate: (inputs: any) => `你是一位陪考無數、最懂「計畫要排得做得到才有用」的讀書規劃教練（看過太多人計畫排好排滿、第三天就崩盤放棄）。你的信條：「計畫不是排給你看爽的，是排給你做得到的——扣掉吃飯睡覺通勤，剩下的時間才是你真正能讀的。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請依我的真實狀況，幫我排一份做得到、又能讀進腦的讀書計畫。\n- 我的考試／目標：[[${inputs.exam_goal}]]\n- 考試範圍／要讀的內容：[[${inputs.scope}]]\n- 剩餘時間與每天可讀時數：[[${inputs.time_left}]]\n- 我的弱點／讀書狀況：[[${inputs.weakness}]]\n\n請輸出：\n① 【進度體檢】— 用剩餘時間對照範圍，誠實判斷來不來得及、要不要取捨重點，並點出最該優先處理的部分，100 字以內\n② 【週計畫總表】— 把範圍分配到剩下的每一週，標明每週主攻什麼、留幾天做複習與緩衝，做成可直接照抄的表\n③ 【每日讀書表】— 給一份可照抄的單日時間表範本，含番茄鐘節奏、休息、把最弱科目排在精神最好的時段\n④ 【複習節點】— 依遺忘曲線標出該回頭複習的時間點與方式（如隔天、週末、考前各複習一次），讓讀過的不白讀\n⑤ 【防破功對策】— 針對我的弱點給 3 個今天就能做的具體招（手機怎麼放、讀不下去怎麼辦、進度落後怎麼補），每項 25 字以內\n\n【規則】\n1. 格式：計畫用表格或清楚條列、時間與份量具體到可勾選，三大產出都能直接抄進 Google 行事曆或手帳。\n2. 嚴禁排不可能的份量、也嚴禁打高空：禁止「每天讀 12 小時」「一天讀完一整科」這種爆肝硬塞，每天份量要扣掉吃飯通勤睡覺後真的做得到；禁說「保證上榜」「一定考好」。\n3. 套用間隔重複與帕金森定律：新進度與舊複習交錯安排、每段都給明確時限，而不是只把章節往前堆。\n4. 語氣務實、像會 push 你又心疼你的學長姐，給得了壓力也給得了喘息，不灌雞湯、不製造焦慮。\n5. 想讀測試：把每日表唸一遍，扣掉必要生活時間後我真的做得到、且讀過的內容後面有被排到複習；若任何一天滿到不可能、或整份計畫從不回頭複習，就重排。`
  },
  {
    id: "family_chat_reply_forge",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "defense" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "3 版回覆訊息 + 口氣拿捏 + 收尾建議",
    icon: <MessagesSquare className="w-8 h-8 text-teal-500" />,
    color: "teal",
    title: "群組結界：長輩訊息回應術",
    desc: "家族群組裡長輩又轉發「微波爐致癌」的養生謠言、帶風向的政治影片，或一句「怎麼還不結婚」？你想婉轉糾正又怕傷感情，已讀不回又被唸沒禮貌，正面打臉更會在群組吵起來。這咒語依長輩傳的內容、你們的關係與你想達到的目的，先判斷該溫柔糾錯、四兩撥千金還是暖心回應，再生成 3 版不傷感情、給長輩台階下的回覆，附口氣拿捏與地雷替代句，可直接貼進群組或私訊。",
    tags: ["家族群組", "長輩溝通", "假訊息回應"],
    fields: [
      { id: "message", label: "長輩傳的訊息／轉發內容", placeholder: "例：轉發『隔夜菜致癌』養生文 / 帶立場的政治影片 / 早安長輩圖 / 怎麼還不結婚" },
      { id: "relation", label: "對方是誰／你們的關係", placeholder: "例：我媽，平常很疼我但很固執 / 大伯，不太熟但長輩要給面子" },
      { id: "goal", label: "你想達到的目的", placeholder: "例：婉轉讓他知道是假的又不傷他 / 不想吵政治想轉移 / 禮貌回應就好" },
      { id: "worry", label: "你最怕的狀況", placeholder: "例：怕他覺得我頂嘴、怕在群組吵起來、怕被說沒禮貌、怕他難堪" },
    ],
    tweak: {
      id: "strat",
      label: "回應策略",
      options: [
        "溫柔糾錯型：先肯定關心再婉轉補上正確資訊，適合長輩轉發謠言、你想導正又不想傷感情",
        "四兩撥千金型：用幽默或轉移話題輕巧帶過，適合政治／逼婚等不想正面對撞的敏感話題",
        "暖心已讀型：給一個有溫度的簡短回應就收尾，適合長輩圖問候、不想已讀不回又不想多談",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '最會哄長輩的孫輩' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依話題選糾錯或轉移' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '3版回覆+口氣+收尾' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '不說教·不頂嘴·給台階' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不擴大政治宗教爭端' },
    ],
    theory: "建立在『面子工夫（Face-work, Goffman：在公開場合讓對方保住面子，是維繫關係的關鍵；當眾打臉長輩會讓他下不了台、引發防衛）』與『非暴力溝通（NVC：先接住對方的情緒與善意，再談事情，才聽得進去）』之上，並參考事實查核的共識——長輩轉發謠言，背後常是『分享關心』與『刷存在感』的情感需求，不是要害人。所以正面用「這是假的、你被騙了」打臉，幾乎一定反效果：他維護的不是那則訊息，是自己的面子。本咒語先讀懂長輩真正在意的是什麼，再用給足面子的方式溫柔糾錯、或乾脆四兩撥千金轉移，目標是『維繫關係』而不是『辯贏這一局』。",
    generate: (inputs: any) => `你是一個最會哄長輩、又有原則的晚輩（深知在家族群組裡跟長輩硬碰硬，贏了道理也輸了關係）。你的信條：「長輩要的不是那則訊息是真是假，是他的好意有沒有被接住、面子有沒有被顧到——所以糾正可以，但絕不能讓他在群組裡下不了台。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請依我的真實狀況，幫我回這則長輩訊息，既達到目的又不傷感情。\n- 長輩傳的訊息／轉發內容：[[${inputs.message}]]\n- 對方是誰／我們的關係：[[${inputs.relation}]]\n- 我想達到的目的：[[${inputs.goal}]]\n- 我最怕的狀況：[[${inputs.worry}]]\n\n請輸出：\n① 【情勢判讀】— 看這則訊息與我們的關係，建議該溫柔糾錯、轉移還是輕回應，並點出長輩這則訊息背後真正想要的（關心／存在感／擔心），80 字以內\n② 【3 版可直接傳的回覆】— 給「溫柔糾錯版／轉移話題版／暖心收尾版」三種，每版都是完整可貼到群組或私訊的一段訊息，口語有溫度\n③ 【這樣回的理由】— 各一句說明為什麼不傷感情、關鍵在哪裡（如怎麼給長輩面子）\n④ 【地雷與替代句】— 列 2-3 句會踩雷的回法（如「這是假的啦」「你不懂」）＋對應的軟化替代句\n⑤ 【收尾建議】— 一句拿捏：這則該公開回還是私訊講、要不要先按個讚再說，避免在大群組讓長輩難堪，50 字以內\n\n【規則】\n1. 格式：三版都要像真人傳的訊息、長度像一則 LINE 訊息可直接複製，並標清楚哪版對應哪種情況。\n2. 嚴禁說教與頂撞：禁止使用「這是假的」「你被騙了」「你不懂啦」「我跟你說過幾次」這類否定打臉句；也禁止附和或散播未經查證的內容。\n3. 套用「給面子＋先接情緒」原則：先接住長輩的好意或情緒，再給資訊或轉移話題，目的是維繫關係而非辯贏。\n4. 語氣是晚輩該有的尊重又不卑微，溫暖、帶點撒嬌或幽默，不冷淡也不敷衍。\n5. 想傳測試：把回覆想像傳進群組，長輩看了應該覺得被尊重、被在乎，不會覺得被嗆；若任何一版讀起來像打臉、說教或冷處理，就重寫。\n\n（提醒：政治與宗教立場人人不同，本咒語目的是維繫關係而非說服或爭辯；訊息查證可善用衛福部、台灣事實查核中心等官方闢謠管道。）`
  },
  {
    id: "progress_report_forge",
    tab: "職場求生",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "可貼的回報訊息 + 口頭精簡版 + 追問準備",
    icon: <ClipboardCheck className="w-8 h-8 text-cyan-500" />,
    color: "cyan",
    title: "回報煉金：進度匯報術",
    desc: "週報寫成落落長的流水帳沒人想看、進度落後不知道怎麼開口、出包了更怕一報就被主管罵到臭頭？會做事還要會回報，否則做再多主管也不安心。這咒語依你要回報的情況、實際進度、主管風格與目的，把一團亂的狀況整理成結論先行、好壞消息都講清楚的回報訊息＋30 秒口頭版，還幫你預判主管會追問什麼、先備好答案。報壞消息一定配對策、不甩鍋，讓主管覺得事情在你掌握中，可直接貼 LINE／Teams／Email。",
    tags: ["工作回報", "週報進度", "壞消息溝通"],
    fields: [
      { id: "situation", label: "你要回報的情況", placeholder: "例：例行週報 / 進度落後要先報壞消息 / 出包了要跟主管說 / 任務完成回報" },
      { id: "content", label: "實際進度／發生了什麼", placeholder: "例：A 功能完成、B 卡在等廠商、預計 delay 3 天 / 客戶臨時改需求" },
      { id: "boss", label: "主管風格／在意什麼", placeholder: "例：很忙只看重點要結論 / 很在意有沒有對策 / 容易焦慮要先安撫" },
      { id: "goal", label: "你想達到的目的", placeholder: "例：讓他放心進度可控 / 爭取多 3 天 / 先報壞消息但不被罵翻" },
    ],
    tweak: {
      id: "strat",
      label: "匯報策略",
      options: [
        "結論先行型：先講結果與重點、細節放後面，適合主管很忙、只想快速掌握狀況",
        "對策導向型：壞消息一定配上解法與選項，適合報問題、出包或進度落後時止血",
        "穩定軍心型：先給確定可控的部分再談風險，適合主管容易焦慮、需要被安撫",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '高情商的職場幕僚' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依好壞消息調結構' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '回報訊息+口頭版+追問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '報問題必附對策' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不甩鍋·不報喜藏憂' },
    ],
    theory: "建立在『金字塔原理與 BLUF（Bottom Line Up Front：結論先行，先給主管最關鍵的判斷與重點，再展開支撐細節，符合忙碌主管的閱讀習慣）』與『壞消息溝通原則（只丟問題會讓主管焦慮並懷疑你的能力，把問題連同影響、對策與選項一起呈上，才顯示你掌握全局、值得信任）』之上：回報寫不好通常是兩個極端——流水帳把所有做過的事按時間倒給主管，他抓不到重點；或為了怕被罵而報喜不報憂、把壞消息含糊帶過，等到爆掉就來不及。本咒語先站在主管視角抓出『他最想知道的一句話』，把進度與問題結構化成結論先行的回報，並要求壞消息必附對策、不甩鍋，讓回報從『交代』升級為『讓主管安心把事情交給你』。",
    generate: (inputs: any) => `你是一位深得主管信任的高情商職場幕僚（最懂主管打開訊息那三秒想看到什麼，也最懂壞消息要怎麼報才不會炸鍋）。你的信條：「會做事還要會回報——主管的不安，多半不是因為事情難，而是因為他不知道現在到底怎樣。把話講清楚，他就放心把事情交給你。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請依我的真實狀況，幫我把一團亂的進度整理成讓主管安心的回報。\n- 我要回報的情況：[[${inputs.situation}]]\n- 實際進度／發生了什麼：[[${inputs.content}]]\n- 主管風格／在意什麼：[[${inputs.boss}]]\n- 我想達到的目的：[[${inputs.goal}]]\n\n請輸出：\n① 【重點抓取】— 站在主管角度，點出這次他最想先知道的一句話（結論）是什麼，60 字以內\n② 【可直接傳的回報訊息】— 一則結構化文字回報，依「結論→目前進度→問題與對策／需要的協助→下一步」分段，好讀可直接貼 LINE／Teams／Email\n③ 【口頭精簡版】— 30 秒能當面或在會議上講完的版本，3-4 句，重點不漏\n④ 【主管可能追問＋準備好的答】— 預判 2-3 個會被追問的點（為何 delay／誰負責／何時好）＋簡短回答\n⑤ 【壞消息加強】— 若這次是壞消息或出包，給一句先承擔再給對策的開場，避免甩鍋或硬拗，40 字以內\n\n【規則】\n1. 格式：文字版分段條列、最重要的結論放最前面，可直接複製；口頭版要短到能一口氣講完。\n2. 嚴禁只報問題不給解法、嚴禁甩鍋與報喜不報憂：禁止「都是別人／廠商害的」「應該沒問題吧」「快好了」這種推諉或含糊，delay 或出包要講清楚影響與對策。\n3. 套用金字塔原理與 BLUF（結論先行）：先給主管最關鍵的結論與判斷，再展開細節與佐證。\n4. 語氣專業、誠實、穩得住場面，不慌不卑不亢，讓主管覺得事情在你掌握之中。\n5. 想送測試：把回報唸一遍，主管 10 秒內就能抓到「現在如何、有什麼問題、你打算怎麼辦」；若讀起來像流水帳、在找藉口、或讓人更焦慮，就重寫。`
  },
  {
    id: "scam_buster",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "defense" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "風險燈號 + 紅旗拆解 + 對方劇本 + 該怎麼做",
    icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "識詐結界：詐騙識破術",
    desc: "收到「包裹要補運費」的簡訊、被拉進穩賺不賠的投資群、交友軟體聊得正熱對方開始談錢、或看到高薪輕鬆的兼職徵人——心裡毛毛的又怕是真的、錯過或被騙都不甘心？2026 詐騙進化成 AI 養套殺劇本，連專家都差點中招。這咒語把你收到的可疑訊息丟進來，幫你亮出紅黃綠風險燈號、逐句拆穿背後的話術套路、推測對方下一步想騙你做什麼，再告訴你現在該怎麼查證、別點什麼、要不要打 165，看穿陷阱全身而退。",
    tags: ["防詐騙", "識破詐騙", "可疑訊息"],
    fields: [
      { id: "channel", label: "你從哪收到的／對方怎麼接觸你", placeholder: "例：陌生簡訊附連結 / 被拉進 LINE 投資群 / 交友軟體認識的 / FB 看到高薪兼職廣告" },
      { id: "content", label: "對方說了什麼", placeholder: "把訊息、對話或廣告原文整段貼上來，越完整越準" },
      { id: "ask", label: "對方要你做什麼", placeholder: "例：點連結登入 / 加 LINE 老師 / 先匯保證金 / 給身分證銀行帳號 / 下載某個 App" },
      { id: "worry", label: "你的疑慮／已經做了什麼", placeholder: "例：已經加 LINE 還沒匯錢 / 對方一直催很急 / 看起來很正式不確定真假" },
    ],
    tweak: {
      id: "strat",
      label: "判讀策略",
      options: [
        "快篩急判型：用幾個關鍵問題快速判出風險高低，適合正在猶豫要不要照做、需要當下定生死的時候",
        "拆解話術型：逐句拆穿對方用的心理操弄套路，適合想看懂自己怎麼被牽著走、避免下次再中招",
        "善後止血型：已經透露資料或匯了錢，需要知道接下來怎麼補救與通報，適合可能已經受害的人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '165 反詐老手' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依紅旗數定風險燈號' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '燈號+紅旗+行動清單' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '只判讀·不教反向行騙' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '高風險導向165查證' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '詐騙vs正常訊息差別' },
    ],
    theory: "建立在『影響力六原則（Cialdini：詐騙集團最常操弄「權威」假冒官方／老師、「稀缺」限時名額快沒了、「承諾一致」先騙你做小事再層層加碼，讓你來不及理智判斷）』與『零信任原則（Zero Trust：對任何主動找上門、要你點連結或給錢給個資的訊息，預設不信任、先查證再行動）』之上，並對照詐騙集團的「養—套—殺」標準劇本：被騙從來不是因為笨，而是對方用了人性的固定套路、在你情緒被牽動時下手。本咒語先用紅黃綠燈號給你一個冷靜的風險判斷，再逐條把訊息裡的操弄話術攤開來給你看，預測對方的下一步與真正目的，最後給你可立刻執行的查證與止損動作——把「憑感覺賭一把」變成「看懂套路再決定」。",
    generate: (inputs: any) => `你是一位經驗老到的反詐騙專家（在 165 反詐騙專線與刑警隊待過多年，看過上千種詐騙劇本，也很清楚一般人是怎麼一步步被話術牽著走的）。你的信條：「被騙不是因為笨，是因為對方太懂人性——看懂套路，再普通的人都騙不動。」你冷靜、精準，不嚇人也絕不輕忽。\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我收到一則讓我不太放心的訊息／邀約，請幫我判斷這是不是詐騙、我該怎麼辦。\n- 我從哪收到的／對方怎麼接觸我：[[${inputs.channel}]]\n- 對方說了什麼：[[${inputs.content}]]\n- 對方要我做什麼：[[${inputs.ask}]]\n- 我的疑慮／已經做了什麼：[[${inputs.worry}]]\n\n請輸出：\n① 【風險燈號】— 用 🔴高 / 🟡可疑 / 🟢大致安全 開頭，給一句總判斷，並說明命中了幾個詐騙紅旗，80 字以內\n② 【紅旗逐條拆解】— 條列訊息裡的可疑點，每條指出它對應哪種詐騙話術套路（如假冒官方、限時催促、保證獲利、要你私下加 LINE），讓我看懂自己差點被哪一招牽走\n③ 【對方的劇本】— 推測若我照做，對方下一步會怎麼引導我、最終真正想要什麼（你的錢／個資／帳號），60 字以內\n④ 【你現在該怎麼做】— 給可直接照做的具體行動清單（該別點什麼、別匯什麼、怎麼從官方管道獨立查證、要不要打 165／110），3-5 點\n⑤ 【查證反問句】— 給 1-2 句可直接回傳對方或拿去向官方求證的話，用來戳破話術或確認真假，每句 30 字以內\n\n【規則】\n1. 格式：以紅黃綠燈號開頭、紅旗與行動分別條列、可直接照做，重點一眼看得到。\n2. 嚴禁拍胸脯包票與教人行騙：在紅旗不夠明確時禁止「保證安全」「絕對是詐騙」「一定沒問題」這類打包票的字眼，改用機率與紅旗數說明；也禁止提供任何可用來行騙或反向詐騙他人的話術。\n3. 套用影響力六原則與零信任：明確點出對方操弄了哪一條人性原則，並一律建議「先獨立查證再行動」。\n4. 語氣冷靜、像反詐老手在旁邊提醒，既不危言聳聽嚇我、也不輕描淡寫要我別擔心。\n5. 想信測試：照你的判讀與行動清單去做，我應該既不會傻傻照詐騙指示走、也不會嚇到連正常事情都不敢處理；若判斷模稜兩可、或會讓我恐慌到不敢求證求助，就重寫。\n\n（提醒：以上為防詐參考，非正式鑑定；疑似遭詐或不確定時，請撥打 165 反詐騙專線查證、緊急狀況撥 110，金融問題請循各機構官方客服或臨櫃確認，切勿依可疑訊息提供的聯絡方式聯繫。）`
  },
  {
    id: "breakup_message_forge",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "開口前判讀 + 分手訊息 + 對方反應接話 + 分手後守則",
    icon: <HeartCrack className="w-8 h-8 text-pink-500" />,
    color: "pink",
    title: "好聚好散：分手開口術",
    desc: "已經不想繼續了，話卻卡在喉嚨好幾個月——怕傷對方、怕被糾纏、怕鬧到雙方朋友圈、更怕自己一心軟又收回去？分手最殘忍的不是說再見，是拖著不清不楚讓兩個人一起耗。這咒語先幫你判斷是不是真的想清楚了、該當面還是傳訊息，再生出溫柔好散／堅定斷捨／安全優先三種版本的開口方式，附上對方哀求、暴怒、情勒時穩住又不動搖的接話，還有分手後保護彼此的界線——把話講清楚，又盡量不撕裂收場。",
    tags: ["分手開口", "好聚好散", "感情結束"],
    fields: [
      { id: "relation", label: "你跟對方的關係／在一起多久", placeholder: "例：交往兩年同居 / 遠距一年 / 曖昧但沒正式在一起 / 對方很依賴我" },
      { id: "reason", label: "你想分手的原因", placeholder: "例：不再心動了 / 價值觀差太多常吵 / 對方控制慾太強 / 喜歡上別人不知道要不要講" },
      { id: "channel", label: "你想用的方式", placeholder: "例：當面說 / 不得已只能傳 LINE / 遠距只能視訊" },
      { id: "worry", label: "你最擔心的／對方可能的反應", placeholder: "例：怕對方崩潰自傷 / 怕被糾纏騷擾 / 怕鬧到雙方朋友 / 一看到他就心軟講不出口" },
    ],
    tweak: {
      id: "strat",
      label: "分手策略",
      options: [
        "溫柔好散型：把傷害降到最低、肯定過去再清楚收尾，適合對方仍重視你、想留住基本的尊重與情分",
        "堅定斷捨型：立場明確不留模糊空間、不給錯誤期待，適合對方容易糾纏或你已下定決心、最怕自己心軟反悔",
        "安全優先型：把人身安全與情緒風險擺第一、字句謹慎、預留求助管道，適合對方情緒不穩、控制慾強或有恐怖情人疑慮",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '陪人好好說再見的教練' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依風險選當面或文字' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '訊息+反應接話+守則' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁拖泥帶水給假希望' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '顧自傷糾纏·導向求助' },
    ],
    theory: "建立在『「我訊息」表達（I-Message：用「我感覺／我需要」陳述自己的狀態，而非「你總是／你害我」指責對方，能降低防衛與衝突）』與『損失趨避與清楚收尾（模糊不清的分手會讓對方一直抱著「還有機會」的期待，反而拖長痛苦；清楚而堅定的收尾雖然當下痛，卻是對雙方最仁慈的做法）』之上，並參考心理師對好聚好散的共識：開口前先確認自己是不是真的想清楚（分手不可逆）、優先當面在白天的公共場所談、清楚說明決定、不因一時心軟反覆，事後放過對方也放過自己。本咒語先幫你判讀時機與風險，把心意用不指責的方式說清楚，預備好面對對方各種反應的接話，並在偵測到自傷或安全疑慮時把安全擺第一、導向專業求助。",
    generate: (inputs: any) => `你是一位陪過很多人好好說再見的情感教練（既懂得心軟的人多難開口，也看過太多因為講不清楚而拖成互相折磨的關係）。你的信條：「分手最仁慈的方式，是把話講清楚——不是繼續模糊地對他好，而是讓他能死心、能往前走。」你溫柔但不鄉愿，堅定但不殘忍。\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我想結束這段關係但開不了口，請幫我把分手說清楚，又盡量不撕裂收場。\n- 我跟對方的關係／在一起多久：[[${inputs.relation}]]\n- 我想分手的原因：[[${inputs.reason}]]\n- 我想用的方式：[[${inputs.channel}]]\n- 我最擔心的／對方可能的反應：[[${inputs.worry}]]\n\n請輸出：\n① 【開口前判讀】— 誠實判斷我是不是真的想清楚了、最適合的時機與場合（盡量白天、當面優先、避免單獨密閉空間），並點出我這情況最該注意的一件事，100 字以內\n② 【可直接說／傳的分手話】— 一段完整可用的話，依「肯定這段關係→清楚表明要分手→簡短真實的原因→不留模糊餘地」結構，符合我選的方式與風格\n③ 【這樣說的理由】— 用一兩句說明關鍵句在哪、為什麼這樣講能說清楚又不傷人，讓我懂原理\n④ 【對方不同反應的接話】— 針對「哀求挽回／憤怒指責／情緒勒索或說要傷害自己」三種反應，各給 1-2 句能穩住場面、有同理但立場不動搖的回應，每句 30 字以內\n⑤ 【分手後守則】— 一句心態建設＋具體界線（如不再曖昧聯繫、不到處說對方壞話、需要時封鎖），60 字以內\n\n【規則】\n1. 格式：分手話要像真人會說的、口語有溫度、長度可直接用或照唸，並標清楚對應哪種風格。\n2. 嚴禁指責清算與留假希望：禁止「都是你的錯」「你這種人」這類翻舊帳的指責句，也禁止「我們還是好朋友」「以後有機會」「給我一點時間想想」這種講不清楚、讓對方繼續抱期待的句子。\n3. 套用「我訊息」表達與清楚收尾原則：用我的感受陳述決定，把分手講成已成定局而非還在商量。\n4. 語氣誠懇、堅定但不冷血，尊重對方的感受、也尊重自己離開的權利。\n5. 想傳測試：把話唸出來，對方就算難過，也能清楚知道「這段關係結束了、不是還有轉圜」；若讀起來像在指責、或還留著曖昧空間讓對方誤會，就重寫。\n\n（提醒：分手以雙方安全為最高原則。若對方出現自傷或傷害他人的念頭，或你感到人身安全受威脅，請立即尋求協助——衛福部安心專線 1925、生命線 1995、婦幼／保護專線 113，緊急狀況撥 110；切勿獨自承擔危險情境。）`
  },
  {
    id: "report_outline_forge",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "題目聚焦 + 大綱架構樹 + 各段論點 + 開頭結論範句",
    icon: <FileText className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "骨架召喚：報告大綱術",
    desc: "報告題目拿到了，打開空白文件卻一個字都生不出來——不知道怎麼分段、查了一堆資料卻只會複製貼上、沒有自己的論點、字數永遠湊不滿、開頭結論卡到天荒地老？寫不出來通常不是你沒料，是少了一副骨架。這咒語當你的寫作中心助教，先幫你把太大太空的題目收斂成寫得動的角度，再長出一棵分層大綱、標好每段要回答什麼、該放什麼論點與佐證方向，連破題開頭和收束結論的範句都給你，照著一段一段把報告填出來，還是你自己的觀點。",
    tags: ["報告架構", "大綱發想", "作業救星"],
    fields: [
      { id: "topic", label: "報告題目／主題", placeholder: "例：社群媒體對青少年自尊的影響 / 介紹台灣再生能源政策 / 還沒定題只知道大方向是 XX" },
      { id: "type", label: "報告類型與要求", placeholder: "例：個人書面報告 3000 字 / 期末小論文 / 讀書報告 / 老師要求要有自己的論點" },
      { id: "material", label: "你手上已有的素材／想法", placeholder: "例：找了幾篇資料還沒讀 / 有些零散想法接不起來 / 完全空白不知從何下手" },
      { id: "worry", label: "你最卡的地方", placeholder: "例：不知道怎麼分段 / 都在抄資料沒有自己觀點 / 字數湊不滿 / 開頭結論寫不出來" },
    ],
    tweak: {
      id: "strat",
      label: "架構策略",
      options: [
        "論點導向型：先幫你立一個清楚的核心主張、再用分論點層層撐起來，適合老師要求要有觀點、不能只是資料整理的報告",
        "資料整理型：把蒐集到的資訊有邏輯地分門別類成清楚架構，適合說明／介紹類、資料很多卻很亂的報告",
        "從零發想型：題目或方向還很模糊，從破題開始陪你一步步長出架構，適合一片空白、不知從何下手的時候",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '大學寫作中心助教' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依類型選論說或說明' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '大綱樹+各段+範句' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '給骨架不代寫整篇' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不杜撰來源·防抄襲' },
    ],
    theory: "建立在『學術寫作的 Why-What-How 結構（寫作中心通用框架：先講為什麼重要與要問什麼問題，再說探討了什麼、怎麼探討、發現了什麼、有什麼意義，讓讀者跟得上邏輯）』與『主張—理由—證據論證模型（Claim-Reason-Evidence：一篇有觀點的報告＝清楚的主張＋支撐的理由＋具體的證據，缺了主張就淪為資料堆疊）』之上，並參考金字塔原理（結論先行、再分支展開）：報告寫不出來，多半不是沒讀資料，而是沒先搭骨架——題目太大不知聚焦、段落之間沒有邏輯、只在搬運別人的話卻沒有自己的論點。本咒語先幫你把題目收斂成一個寫得動的核心主張，再依報告類型長出分層大綱、為每段標好任務與論點、指出該找什麼佐證，讓你從『對著空白發呆』變成『照骨架一段段填上自己的內容』。",
    generate: (inputs: any) => `你是一位大學寫作中心的金牌助教（最擅長把學生腦中那團「我知道要寫但不知道怎麼開始」的混沌，整理成一副清楚好填的報告骨架）。你的信條：「我不幫你寫報告，我幫你看見它長什麼樣子——骨架對了，內容是你自己長出來的。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我有一份報告要寫卻卡住了，請幫我搭出能照著寫的大綱架構。\n- 報告題目／主題：[[${inputs.topic}]]\n- 報告類型與要求：[[${inputs.type}]]\n- 我手上已有的素材／想法：[[${inputs.material}]]\n- 我最卡的地方：[[${inputs.worry}]]\n\n請輸出：\n① 【題目體檢與聚焦】— 判斷我的題目會不會太大／太空泛，幫我收斂成一個寫得動的角度，並提煉成一句核心主張或要回答的問題，100 字以內\n② 【大綱架構樹】— 依報告類型給「開頭→主體分點→結論」的分層大綱（用一、二、三 / 1.2.3 標號），每個段落後面標註「這段要回答什麼／放什麼」，可直接複製成文件骨架\n③ 【各段論點與佐證方向】— 主體每一段給 1-2 句核心論點＋建議該找什麼類型的佐證（數據、案例、文獻、訪談），避免淪為資料堆疊\n④ 【開頭與結論範句】— 各給一段可改寫的開場（破題鉤子）與結論（收束昇華）示範，讓我有起手式\n⑤ 【卡關補強】— 針對我最卡的地方給 1 個具體解法＋一個能合理擴寫篇幅但有料、不灌水的方向，60 字以內\n\n【規則】\n1. 格式：大綱用分層條列清楚呈現、每段標註用途，整體可直接複製成 Word／文件的骨架照著填。\n2. 嚴禁杜撰來源與空話開頭：禁止幫我捏造不存在的數據、文獻或引用出處，也禁止「眾所周知」「自古以來」「隨著時代的進步」這類萬用廢話開場。\n3. 套用 Why-What-How 與「主張—理由—證據」結構：確保整篇有一條清楚的論證主線，而不是資料拼貼。\n4. 語氣像會帶我思考的助教，啟發我自己長出內容，而不是直接餵我一篇可以交差的成品。\n5. 想交測試：照這份大綱，我應該能一段一段把報告填出來、且看得出我自己的論點與邏輯線；若大綱空泛到換任何題目都適用、或內容直接抄就能當作業，就重寫。\n\n（提醒：以上大綱與範句僅供發想參考，實際內容與引用務必自行查證、依學校格式規範撰寫，切勿整段複製以免觸犯學術倫理〔抄襲〕。）`
  },
  {
    id: "meal_prep_planner",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "七日三餐菜單表 + 分類採買清單 + 假日備料順序 + 食材替換方案",
    icon: <Salad className="w-8 h-8 text-green-500" />,
    color: "green",
    title: "備餐召喚：一週菜單術",
    desc: "每天下班、下課最折磨人的一句話就是「今天到底要吃什麼」——想減脂卻怕餓、想帶便當省錢卻沒時間天天想、外食一個月噴掉大半薪水、買了一堆食材又爛在冰箱？多數人不是不想吃得健康，而是敗在「每天現想、現買、現煮」的高摩擦。這咒語當你的私人營養規劃師＋備餐達人，依你的目標（減脂／省錢／帶便當／全家健康）、人數、預算與設備，一次幫你排好整週三餐菜單、用同一批食材變化多道菜降低成本、再生出一張可直接拿去超市照買的分類採買清單與假日備料動線，讓你一次想完、一次買齊、照表執行，把每天「吃什麼」的決策疲勞徹底外包。",
    tags: ["一週菜單", "備餐規劃", "採買清單"],
    fields: [
      { id: "goal", label: "目標與情境", placeholder: "例：想減脂但怕餓 / 每天帶便當省錢 / 一個人住懶得天天想 / 全家想吃得健康一點" },
      { id: "members", label: "用餐人數與對象", placeholder: "例：自己一人 / 兩大一小（小孩挑食） / 我和室友兩人 / 三餐都在家" },
      { id: "constraint", label: "預算／時間／飲食限制", placeholder: "例：一週菜錢 1500 內 / 只想假日備料平日加熱 / 不吃牛、對海鮮過敏 / 想控制每餐熱量" },
      { id: "equip", label: "廚房設備與下廚程度", placeholder: "例：只有電鍋微波爐 / 有烤箱氣炸鍋 / 新手只會簡單料理 / 能接受重複菜色" },
    ],
    tweak: {
      id: "strat",
      label: "規劃策略",
      options: [
        "減脂瘦身型：以熱量與蛋白質為主軸控管份量、又設計得有飽足感，適合想減脂卻怕餓、怕越減越想暴食的人",
        "省錢省時型：用最少預算、同一批食材重複變化、一次備好整週，適合外食花太多、又沒時間天天開伙的人",
        "營養均衡型：六大類食物均衡搭配、天天有變化不吃膩，適合想吃得健康、照顧全家或單純不想再亂吃的人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '營養規劃＋備餐達人' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依目標抓熱量與配比' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '七日表+分類採買清單' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '食材共用降成本防膩' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '非醫療·過敏自行確認' },
    ],
    theory: "建立在『我的餐盤（MyPlate）六大類均衡原則（蔬果、全穀、蛋白質、乳品適量搭配，讓每餐營養不偏廢）』與『巨量營養素配比（Macros：依減脂／增肌／維持目標調整碳水、蛋白質、脂肪比例）』之上，並運用行為設計學的『減少決策疲勞（decision fatigue）——把一週要吃什麼一次決定好，就不必每天耗神想「今天吃什麼」』與『批次處理（batch cooking）＋食材共用，用同一批採買的食材變化多道菜，降低成本與備料時間』。多數人不是不想吃得健康，而是敗在「每天現想、現買、現煮」的高摩擦；本咒語把規劃前置成一張七日菜單與一份採買清單，讓你一次想完、一次買齊、照表執行，把意志力留給真正重要的事。",
    generate: (inputs: any) => `你是一位務實的專業營養規劃師＋備餐（meal prep）達人（最擅長把「想吃得健康卻總是半途而廢」的人，變成照表執行、輕鬆持續的備餐高手）。你的信條：「健康飲食不是靠意志力天天硬撐，而是靠一張好菜單和一次買齊的採買清單，把每天的決定都提前做完。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我每天都在煩惱要吃什麼，請幫我規劃一份做得到、不麻煩的一週菜單。\n- 目標與情境：[[${inputs.goal}]]\n- 用餐人數與對象：[[${inputs.members}]]\n- 預算／時間／飲食限制：[[${inputs.constraint}]]\n- 廚房設備與下廚程度：[[${inputs.equip}]]\n\n請輸出：\n① 【目標體檢與每日配置】— 依我的目標抓出每日大致的熱量區間與三大營養素方向（不必精算到大卡，給可執行的份量原則即可），100 字以內\n② 【七日三餐菜單表】— 用表格條列週一到週日的早／午／晚（可含一份點心），菜色要具體可煮、盡量用重複食材變化、避免天天一樣，並標出哪幾餐可一次備料分裝\n③ 【分類採買清單】— 把整週要買的食材依「蔬菜／蛋白質／主食／調味／其他」分類列出大致份量，可直接拿去超市或線上下單，並標出可一次買大份再分裝的品項\n④ 【假日備料順序】— 給一份「先煮什麼、再備什麼、怎麼分裝保存」的備料動線，讓平日只要加熱組合，60 字內可條列\n⑤ 【替換與防膩方案】— 針對預算超支、吃膩、或臨時缺某樣食材，各給 1 個替換或變化做法，避免計畫一遇狀況就破功\n\n【規則】\n1. 格式：菜單用表格／條列清楚呈現、採買清單可直接照買，整份能複製到手機備忘錄照表執行。\n2. 嚴禁空話與療效保證：禁止「適量」「依個人喜好調整」「均衡就好」這類沒講等於沒講的詞，份量要給具體方向；嚴禁出現「X 天瘦 X 公斤」「保證瘦」「排毒」這類醫療療效或誇大承諾。\n3. 套用六大類均衡＋巨量營養素配比＋食材共用原則：確保營養不偏廢，且同批食材能跨餐重複利用以降低成本與備料時間。\n4. 語氣像一位務實不說教的備餐朋友，重點是「做得到、不麻煩」，而不是要求我變成料理達人。\n5. 成品測試：我應該能直接照採買清單買齊、照菜單煮滿一週不重複到膩、且符合我的目標與預算；若菜色天天雷同、採買清單湊不齊一餐、或份量全寫「適量」，請重做。\n\n（提醒：本菜單僅為一般飲食規劃參考，非醫療或營養治療建議；若有特殊疾病、過敏、懷孕或正在控制慢性病，份量與食材請以醫師或營養師指示為準。）`
  },
  {
    id: "english_email_forge",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "Subject 主旨3選1 + 完整英文信 + 全文中譯 + 用字語氣提醒",
    icon: <Languages className="w-8 h-8 text-indigo-500" />,
    color: "indigo",
    title: "英文代筆：得體信件術",
    desc: "要寫一封英文信，游標在空白信件裡閃了半小時——開頭該寫 Dear 還是 Hi、結尾要 Best 還是 Sincerely、語氣不是太生硬（一看就 Google 翻譯）就是太卑微（從頭到尾 sorry to bother you）、把中文邏輯硬翻成洋涇浜英文，怕失禮又怕對方根本看不懂你要幹嘛？寫信給指導教授、國外學校、交換窗口、國外客戶時，這種卡關每個台灣人都懂。這咒語當你的英文母語雙語編輯：你只要用中文講清楚「寫給誰、想達成什麼、要講哪些重點」，它就幫你寫出一封結構完整、語氣拿捏得體、母語者讀來自然、可直接複製寄出的英文信，還附上逐段中譯讓你看懂每句在說什麼，並教你哪些字眼可依關係調得更正式或更輕鬆。",
    tags: ["英文信件", "Email代筆", "跨國溝通"],
    fields: [
      { id: "recipient", label: "收件對象與你們的關係", placeholder: "例：指導教授（還不太熟） / 國外大學招生辦 / 公司國外客戶窗口 / 合作過的外國夥伴" },
      { id: "purpose", label: "這封信要達成什麼", placeholder: "例：請對方寫推薦信 / 詢問課程與申請 / 為延遲交件道歉 / 跟進上次沒回的信 / 約線上會議" },
      { id: "points", label: "你想講的重點（用中文寫就好）", placeholder: "例：我修過你的課拿 A、想申請你的實驗室、附上 CV、希望兩週內能回覆我" },
      { id: "extra", label: "補充情境或限制", placeholder: "例：有 deadline 6/30 前 / 這是第二次 follow up / 要附檔案 / 之前線下見過一面" },
    ],
    tweak: {
      id: "strat",
      label: "語氣策略",
      options: [
        "正式禮貌型：用詞最正式、敬語給足，適合教授、官方單位、初次聯絡或有求於人的場合，禮數到位不失禮",
        "專業簡潔型：商務口吻、直接清楚重效率，適合職場同事、合作窗口、往來過幾次的對象，不囉嗦不繞圈",
        "親切友善型：友善有溫度但不失禮，適合較熟的對象、道謝、或想拉近距離的信，讀起來像個有溫度的人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '英文母語雙語編輯' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係調正式程度' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '主旨+英文信+中譯' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '道地不翻譯腔' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不杜撰事實與成績' },
    ],
    theory: "建立在跨文化溝通的『高低語境理論（Hall：英語系多屬「低語境」文化，重點要白紙黑字講清楚、不靠默契暗示，與中文的含蓄迂迴相反）』與『禮貌原則／面子理論（Brown & Levinson：透過適當的緩和語與敬語照顧對方「面子」，又不過度卑微而失了自己的立場）』之上，並套用標準英文書信結構『主旨（Subject）→稱呼（Greeting）→開場目的（Purpose）→正文（Body）→行動呼籲（Call to Action）→結尾敬語（Closing）』。台灣人寫英文信最常卡在：開頭結尾不知怎麼起手、語氣不是太生硬（Google 翻譯腔）就是太卑微（連聲道歉）、以及把中文邏輯直譯成洋涇浜英文。本咒語讓你只要用中文講清楚對象、目的與重點，就幫你寫出一封結構完整、語氣拿捏得體、母語者讀來自然、可直接複製寄出的英文信，並附上中譯讓你看懂每句在說什麼。",
    generate: (inputs: any) => `你是一位英文母語的雙語編輯（bilingual editor），同時精通台灣人的中文思維與英語系的商務／學術書信禮儀（最擅長把一段中文需求，轉成既得體又自然、母語者讀來毫無違和的英文信）。你的信條：「好的英文信不是把中文翻成英文，而是用對方文化裡得體的方式，把你的意思講清楚。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要寫一封英文信但卡住了，請依我提供的中文資訊幫我寫出得體、可直接寄出的英文信。\n- 收件對象與我們的關係：[[${inputs.recipient}]]\n- 這封信要達成什麼：[[${inputs.purpose}]]\n- 我想講的重點（中文）：[[${inputs.points}]]\n- 補充情境或限制：[[${inputs.extra}]]\n\n請輸出：\n① 【主旨 Subject（3 選 1）】— 給 3 個清楚點題、讓對方一眼知道信件目的且願意點開的英文主旨，各附中譯\n② 【完整英文信】— 含稱呼、開場、正文、行動呼籲、結尾敬語與署名欄位（用 [Your Name] 標示），依策略拿捏正式程度，可直接複製寄出\n③ 【全文中文對照】— 逐段把英文信翻成中文，讓我確認語氣與內容沒講錯、也沒被多加我沒提供的資訊\n④ 【用字與語氣提醒】— 點出信中 2-3 個禮貌關鍵字眼的作用，並各給「更正式」與「更輕鬆」的替換版本，讓我能依實際關係微調，80 字內\n⑤ 【寄出前檢查】— 列出寄出前要再確認的點（稱謂與拼字、附件、deadline、是否需副本 CC），60 字內條列\n\n【規則】\n1. 格式：英文信完整且可直接複製寄出、主旨給 3 選 1、全文附逐段中譯，整體排版乾淨、無多餘符號。\n2. 嚴禁直譯腔與杜撰：禁止 Google 翻譯式的中式英文與生硬直譯；禁止杜撰我沒提供的成績、經歷、頭銜或事實；禁止過度卑微（如通篇 "I am so sorry to bother you"、連續道歉）而失了立場。\n3. 套用低語境明確結構＋禮貌原則：依「主旨→稱呼→目的→正文→行動呼籲→敬語」鋪陳，緩和語與敬語要得體但不諂媚。\n4. 語氣：依策略拿捏正式程度，做到禮貌、清楚、有自信，像個專業又有溫度的人，而不是卑躬屈膝或冷冰冰的機器。\n5. 母語者測試：把這封信交給英文母語者讀，應覺得自然得體、看得出我要什麼、且願意回覆；若讀起來像翻譯軟體、語氣與對象不搭、或加了我沒說的內容，請重寫。\n\n（提醒：涉及合約、法律、簽證或重要申請的正式信件，建議寄出前再請懂英文的師長或專業人士確認，本咒語產出僅供溝通參考。）`
  },

  // ━━━ 🔵 中階秘術 | 職場求生 | Free ━━━
  {
    id: "spreadsheet_formula_forge",
    tab: "職場求生",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "可貼上的公式 + 白話拆解 + 套用步驟 + 排錯 + 範例驗證",
    icon: <Calculator className="w-8 h-8 text-emerald-600" />,
    color: "emerald",
    title: "公式召喚：試算表速算術",
    desc: "想用 Excel 或 Google 試算表算個東西，腦袋知道要幹嘛、手卻打不出公式——VLOOKUP 對不起來、跨欄加總老是錯、想自動標顏色又卡在 IF 巢狀，Google 一堆教學看半天還是套不進自己的表？問題不是你笨，是沒人把『你的需求』翻成『機器看得懂的公式』。這咒語當你的試算表軍師：你只要用白話講清楚『資料長怎樣、想算出什麼』，它就幫你產出可直接貼上的公式（標好放哪一格、註明 Excel 與 Google 語法差異），再把公式逐段拆成白話讓你看懂它在做什麼，附套用步驟、常見錯誤排查與一組範例驗證資料，讓你貼上就能對答案、不再瞎試到崩潰。",
    tags: ["Excel", "試算表公式", "職場效率"],
    fields: [
      { id: "tool", label: "你用的工具", placeholder: "例：Excel / Google 試算表 / Numbers（不確定就寫 Excel）" },
      { id: "goal", label: "你想算出或做到什麼（白話講）", placeholder: "例：依員工編號從另一張表帶出部門 / 算每個月銷售總和 / 業績達標的列自動標綠色 / 把姓名和電話合併成一欄" },
      { id: "data_layout", label: "你的資料長怎樣（欄位與位置）", placeholder: "例：A 欄日期、B 欄品項、C 欄金額，資料從第 2 列到第 500 列；對照表在 Sheet2 的 A、B 欄" },
      { id: "extra", label: "額外條件或遇到的錯誤", placeholder: "例：空白格要顯示 0 不要 #DIV/0! / 已經試過 SUMIF 但出現 #VALUE! / 想排除合計列" },
    ],
    tweak: {
      id: "strat",
      label: "公式策略",
      options: [
        "新手白話型：用最好懂、最不容易出錯的基礎函數，每一步都解釋給完全沒基礎的人聽，寧可多打幾個字也求穩",
        "公式精簡型：用最簡潔有力的一條公式解決，適合會一點基礎、想要乾淨好維護版本的人，少巢狀少輔助欄",
        "進階自動化型：善用 XLOOKUP／LET／ARRAYFORMULA／QUERY 等較新較強的函數一次到位，適合資料量大、想一條公式自動展開整欄的人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '試算表與資料分析軍師' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依需求拆輸入邏輯輸出' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '公式+白話拆解+排錯' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '標儲存格與語法差異' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不臆測欄位用佔位符' },
    ],
    theory: "建立在計算思維（Computational Thinking, Jeannette Wing）的三步驟之上：『分解（Decomposition）』把一個模糊的需求拆成輸入資料、運算邏輯、想要的輸出；『模式辨識（Pattern Recognition）』看出這是查表、條件加總、還是文字處理問題，對應到正確的函數家族（LOOKUP 系、SUMIF/COUNTIF 系、TEXT/CONCAT 系、IF 邏輯系）；『抽象化（Abstraction）』把它組成一條能套用到整欄、資料變動也不會壞的公式。一般人卡關不是不夠聰明，而是直接跳到『要用哪個函數』，卻沒先把需求講清楚——輸入在哪、條件是什麼、要算出什麼。本咒語逼出這三件事再組公式，並強制標明儲存格位置與 Excel／Google 試算表的語法差異（如參數分隔符號、XLOOKUP 支援度），讓你貼上就能用、看得懂、改得動。",
    generate: (inputs: any) => `你是一位資深的試算表與資料分析軍師，精通 Excel 與 Google 試算表的所有函數，最擅長把一般人用白話描述的需求，翻譯成一條可直接貼上、又好懂好維護的公式（並且總是手把手解釋每一段在做什麼，讓對方下次自己也會）。你的信條：「公式不是越炫越好，而是要對得了答案、看得懂、改得動。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要在試算表裡算個東西但寫不出公式，請依我提供的資訊幫我生出可直接用的公式並教我怎麼套。\n- 我用的工具：[[${inputs.tool}]]\n- 我想算出或做到什麼：[[${inputs.goal}]]\n- 我的資料長怎樣（欄位與位置）：[[${inputs.data_layout}]]\n- 額外條件或遇到的錯誤：[[${inputs.extra}]]\n\n請輸出：\n① 【可直接貼上的公式】— 用程式碼區塊呈現，明確標示「貼在哪一格」（例：貼進 D2 再往下拉）；若 Excel 與 Google 試算表語法不同（參數分隔符號、函數支援度），分別給兩個版本並註明\n② 【公式白話拆解】— 把公式拆成幾段，逐段說明這一段在做什麼、為什麼這樣寫，讓我下次能自己改，120 字內\n③ 【套用步驟】— 1、2、3 條列，從貼在哪一格、怎麼往下／往右拉、到要不要轉成絕對位置（\\$），照著做就完成\n④ 【常見錯誤與排查】— 針對這條公式最可能噴的錯誤（如 #REF!、#VALUE!、#DIV/0!、#N/A、抓錯欄）各給一句「為什麼會這樣＋怎麼修」，80 字內\n⑤ 【範例驗證】— 給一組小範例資料（3-4 列）與套用公式後的預期結果，讓我貼上後能立刻核對公式對不對\n\n【規則】\n1. 格式：公式一律用程式碼區塊、可直接複製貼上、明確標示儲存格位置；Excel 與 Google 試算表若語法有差（如參數分隔用「,」或「;」、是否支援 XLOOKUP／ARRAYFORMULA）必須分別註明，排版乾淨無多餘符號。\n2. 嚴禁含糊與臆測：禁止「應該可以」「大概是」「你試試看」這類不確定字眼；禁止只丟公式不解釋；禁止假設我沒講清楚的欄位位置或資料範圍——不確定時用佔位符（如 A1、B:B、Sheet2!A:B）並明確要我替換成自己的位置。\n3. 套用計算思維：先在心裡把需求拆成「輸入資料→運算邏輯→想要的輸出」，辨識它屬於查表／條件加總／文字處理／邏輯判斷哪一類，再選對的函數組成公式，而不是硬套一個複雜函數。\n4. 語氣：像一位有耐心、坐你旁邊手把手教的資深同事，白話、不掉書袋、不假設我懂術語，每個專有名詞第一次出現都用一句話解釋。\n5. 驗證測試：附的範例資料貼上後，應能讓我「一眼核對公式算出來對不對」；若這條公式可能因空白格、文字混入數字、或除以零而出錯，要先用 IFERROR／IFNA 等包好並說明，確保我拿去用不會整欄爆紅字。`
  },

  // ━━━ 🔵 中階秘術 | 創業/自媒體 | Free ━━━
  {
    id: "prompt_optimizer_forge",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "優化後指令 + 升級說明 + 待補資訊 + 追問話術 + 精簡版",
    icon: <Wand2 className="w-8 h-8 text-violet-500" />,
    color: "violet",
    title: "指令煉金：AI提問優化術",
    desc: "問 ChatGPT、Claude、Gemini 老是得到一坨空泛、不對題、像廢話的答案，改了五六次還是不滿意，最後乾脆自己重寫？問題幾乎都不在 AI，而在你的提問——一句『幫我寫一篇關於行銷的文章』，AI 只能用最安全最平庸的方式猜你要什麼。會用 AI 的人跟不會用的人，差距就在『下指令的功力』。這咒語當你的提示工程教練：你只要用白話講清楚『想叫 AI 做什麼、給誰看、希望長怎樣』，它就幫你把模糊需求重組成一條結構完整（角色＋任務＋脈絡＋格式＋限制）、可直接貼進任何 AI 的神級指令，還告訴你它升級了哪裡、你可能還缺什麼資訊，並附上產出不滿意時怎麼追問微調，讓你從『會問 Google』升級成『會指揮 AI』。",
    tags: ["ChatGPT指令", "Prompt技巧", "AI效率"],
    fields: [
      { id: "ai_goal", label: "你想叫 AI 幫你做什麼", placeholder: "例：寫一篇介紹我們咖啡店新品的 IG 貼文 / 把一份會議逐字稿整理成重點 / 幫我發想 10 個影片主題 / 改寫一段太生硬的文案" },
      { id: "rough_prompt", label: "你原本打算怎麼問（貼上你試過的）", placeholder: "例：幫我寫一篇關於咖啡的貼文 /（還沒想法，只知道想做上面那件事）" },
      { id: "context", label: "AI 該知道的背景、對象、限制", placeholder: "例：受眾是 25-35 歲上班族、品牌走溫暖文青風、不要太商業、要繁體中文台灣用語、字數 150 字內" },
      { id: "output_want", label: "你希望產出長什麼樣", placeholder: "例：要 3 個版本可挑 / 條列式 / 附 5 個 hashtag / 語氣活潑帶點幽默 / 直接可複製貼上" },
    ],
    tweak: {
      id: "strat",
      label: "指令策略",
      options: [
        "萬用通才型：產出一條好懂、好複製、適合一般任務的均衡指令，新手也能直接套用，泛用性最高",
        "精準專家型：給 AI 設定明確的專家角色與嚴格的格式限制，逼出更專業、更聚焦、可直接交付的高品質產出",
        "連續任務型：把大任務拆成有先後順序的步驟指令，並要 AI 先確認理解或先給大綱再執行，適合複雜或多階段的工作流",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '提示工程教練' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '補齊角色脈絡格式限制' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '優化指令+升級說明' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '點出原指令缺什麼' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '不堆砌空泛形容詞' },
    ],
    theory: "建立在結構化提示工程（Structured Prompting）的核心框架之上：一條好指令應包含『角色（Role）→任務（Task）→脈絡（Context）→輸出格式（Format）→限制條件（Constraints）』五個要素（業界常見的 RTF、CRISPE、CO-STAR 框架皆是此邏輯的變體）。AI 給出平庸答案，幾乎都是因為這五項缺了關鍵的幾項——尤其是『脈絡』（給誰看、什麼風格、什麼背景）與『限制』（字數、語氣、要避免什麼），AI 只能用機率上最安全、最大眾、最無聊的方式填空。本咒語另援引『少樣本提示（Few-shot：給一兩個範例讓 AI 抓到你要的調性）』與『思維鏈（Chain-of-Thought：要 AI 先想步驟或先給大綱再答，複雜任務正確率更高）』。它把你的白話需求逆向工程成補齊五要素的指令，並明白告訴你為什麼這樣改更有效，讓你不只拿到一條好指令，還學會自己下指令。",
    generate: (inputs: any) => `你是一位專精提示工程（Prompt Engineering）的 AI 指令教練，精通 ChatGPT、Claude、Gemini 等大型語言模型的脾性，最擅長把一般人模糊的白話需求，逆向工程成一條結構完整、能穩定逼出高品質產出的『神級指令』，並用白話解釋每個調整為什麼有效。你的信條：「AI 給你爛答案，九成是因為你問得爛——把指令寫好，平庸的 AI 也能變神。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我想用 AI 完成一件事但問出來的結果很爛，請把我的需求重組成一條好指令，並教我為什麼這樣改。\n- 我想叫 AI 做什麼：[[${inputs.ai_goal}]]\n- 我原本打算怎麼問：[[${inputs.rough_prompt}]]\n- AI 該知道的背景、對象、限制：[[${inputs.context}]]\n- 我希望產出長什麼樣：[[${inputs.output_want}]]\n\n請輸出：\n① 【優化後的完整指令】— 用程式碼區塊呈現、可直接複製貼進任何 AI，結構分明（角色／任務／脈絡／輸出格式／限制條件清楚分段或標示），貼上就能用\n② 【這版做了哪些升級】— 對照我原本的問法，逐點說明補了什麼、為什麼這樣更有效（例：補上受眾脈絡、限定字數、指定角色），讓我下次自己也會寫，120 字內\n③ 【你可能還缺的資訊】— 點出若再補哪 1-3 項資訊，AI 會表現得更好（例：想要的範例、品牌語氣、參考對象），80 字內\n④ 【追問與微調話術】— 給 2-3 句「產出不滿意時可以接著對 AI 說」的追問句（例：要它更口語、換個角度、縮短），可直接複製\n⑤ 【一句話精簡版】— 趕時間時用的濃縮版指令，一行內，保留最關鍵的角色與限制\n\n【規則】\n1. 格式：優化後的指令一律用程式碼區塊、可一鍵複製，五要素（角色／任務／脈絡／輸出格式／限制）清楚分段或標示，排版乾淨、無多餘客套與符號。\n2. 嚴禁空泛與灌水：禁止「請幫我寫一篇關於○○的文章」這類沒有脈絡的空泛開頭；禁止堆砌「最棒的、超專業的、頂尖的、詳細的」這類沒有資訊量的形容詞；禁止杜撰我沒提供的事實、數據、品牌設定塞進指令裡。\n3. 套用結構化提示框架：依「角色→任務→脈絡→輸出格式→限制條件」補齊五要素，任務複雜時加入少樣本範例或要 AI『先給大綱／先確認理解再執行』（思維鏈）。\n4. 語氣：像一位懂 AI、講話接地氣的提示工程教練，每個調整都用白話講清楚為什麼有效，不賣弄術語、不假設我是工程師。\n5. 驗證測試：優化後的指令應做到「換成任何人來貼，都能得到穩定、對題、不需大改的結果」；若這條指令仍可能被 AI 理解成好幾種意思、或少了關鍵脈絡，請明確標出缺口並要我補齊，而不是自己亂猜一個版本給我。`
  },

  // ━━━ 🔵 中階秘術 | 生活娛樂 | Free ━━━
  {
    id: "google_review_forge",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "三版評論 + 亮點金句 + 建議星等 + 加分技巧 + 防刪檢查",
    icon: <Star className="w-8 h-8 text-amber-500" />,
    color: "amber",
    title: "評價召喚：店家評論代筆術",
    desc: "店員結帳時拜託你『方便給我們一個五星好評嗎』，你想幫忙卻打開 Google 評論欄一片空白，只擠得出『好吃、不錯、推』三個字交差？或是踩了雷想誠實留言，又怕寫得太情緒被檢舉、或詞窮講不出哪裡不好？問題不是你不會表達，是沒人把『你的真實體驗』翻成『一篇有畫面、有可信度、別人讀了真的有參考價值』的評論。這咒語當你的在地嚮導軍師：你只要用白話講『去了哪家店、實際感受如何、想給幾顆星』，它就幫你產出短、中、完整三個版本的評論（含具體細節與一句吸睛開頭），可直接複製貼上 Google 地圖、IG 或社團；中肯誠實又不會被系統判定成廣告或灌水而被刪，讓你的一票投得有份量、也幫到下一個猶豫要不要去的人。",
    tags: ["Google評論", "店家評價", "心得分享"],
    fields: [
      { id: "place", label: "店家類型與名稱", placeholder: "例：板橋一家義大利麵餐廳『○○』/ 牙醫診所 / 墾丁民宿 / 汽車美容 / 寵物美容" },
      { id: "experience", label: "你的實際體驗（好的壞的都寫，越具體越好）", placeholder: "例：白醬燉飯很濃郁、份量大、店員會主動續水、環境乾淨但有點吵、停車不好找、等了 20 分鐘上菜" },
      { id: "rating", label: "你想給幾顆星、整體傾向", placeholder: "例：5 顆星想大力推薦 / 3 顆星想中肯點出優缺 / 2 顆星體驗不佳想委婉提醒" },
      { id: "extra", label: "補充（平台、想特別提的人事物、字數偏好）", placeholder: "例：要貼 Google 地圖 / 想特別誇那位綁馬尾的店員 / 不要太長 100 字內 / 想提醒大家假日要訂位" },
    ],
    tweak: {
      id: "strat",
      label: "評論策略",
      options: [
        "溫暖推薦型：用有溫度、有畫面感的口吻寫好評，讓人看了就想衝去，適合真心喜歡、想幫店家衝人氣",
        "中肯平衡型：優點缺點都誠實寫、講清楚給這個星等的理由，可信度最高，適合想留下客觀參考給其他消費者",
        "委婉提醒型：以對事不對人、建設性的方式點出可改進處，不情緒化、不貼標籤，降低被檢舉刪除風險，適合體驗不佳但想理性反映",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '寫真實感的在地嚮導' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依星等調好評誠實度' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '長短三版+亮點金句' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '具體細節有畫面感' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不杜撰不情緒化防刪' },
    ],
    theory: "建立在說服心理學的兩大支柱之上：其一是『具體性效應（Concreteness／鮮明性效應）』——人腦對具體、有畫面的細節（『白醬燉飯濃到掛在湯匙上』）遠比抽象形容（『很好吃』）更信任、更記得住，這也是為什麼只有『讚、推、不錯』的評論毫無說服力；其二是 Cialdini 的『社會證明（Social Proof）』——人在不確定時會參考他人的真實經驗來決策，一篇寫出真實使用情境的評論，正是別人決定要不要光顧的關鍵依據。本咒語另外內建 Google 評論的『審查避雷』邏輯：Google 會自動隱藏或刪除被判定為廣告、重複貼文、情緒謾罵、或非親身經歷的評論，因此產出強制走『具體事實＋對事不對人』路線，把你的感受轉成有畫面、可信、又不踩審查紅線的文字，讓這票投得出去、也留得下來。",
    generate: (inputs: any) => `你是一位 Google 地圖最高等級的在地嚮導（Local Guide），寫過上千則被大量按讚的評論，最擅長把一般人模糊的「好吃／普通／雷」感受，轉成有畫面、有可信度、別人讀了真的能拿來決定要不要去的評論（無論好評或誠實的負評，都做到具體、中肯、不被系統刪）。你的信條：「沒有人會被『好吃推』說服，但所有人都會被『白醬濃到掛在湯匙上』打動。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要幫一家店寫 Google 評論但只擠得出幾個字，請依我提供的體驗幫我寫出可直接貼上的評論。\n- 店家類型與名稱：[[${inputs.place}]]\n- 我的實際體驗（好的壞的都寫）：[[${inputs.experience}]]\n- 我想給幾顆星、整體傾向：[[${inputs.rating}]]\n- 補充（平台、想特別提的人事物、字數偏好）：[[${inputs.extra}]]\n\n請輸出：\n① 【三版評論可挑】短版（40 字內，趕時間用）、中版（80 字內，最常用）、完整版（150 字內，最有說服力），三版皆可直接複製貼上、各含至少一個具體細節\n② 【一句亮點開頭】一句最有畫面、最吸睛、可放評論第一行的金句，30 字內\n③ 【建議星等與理由】依我的體驗建議幾顆星，並用一句話說明為什麼，40 字內\n④ 【加分小技巧】要不要附照片、可自然帶入哪些別人會搜尋的關鍵字（店名、餐點、地點、情境）讓評論更有用，60 字內\n⑤ 【送出前防刪檢查】條列檢查是否踩到 Google 會隱藏／刪除的雷區（情緒謾罵、廣告字眼、重複貼文、被判非親身經歷），50 字內\n\n【規則】\n1. 格式：三版評論長短分明、皆可一鍵複製貼上、口語自然像真實顧客寫的，排版乾淨、無多餘符號與 hashtag 堆砌。\n2. 嚴禁空泛與杜撰：禁止讓「好吃、推、不錯、CP 值高、值得一試」這類沒有資訊量的字眼單獨成句；禁止業配腔（全台最強、第一名、無與倫比、強力推薦）；禁止杜撰我沒提供的餐點名、價格、人名或情節。\n3. 套用具體性＋社會證明：把每個抽象感受換成一個具體、有畫面的場景或細節，讓讀者像親眼看到、能想像自己也在現場。\n4. 語氣：像一個真誠、講人話的真實顧客，好評有溫度不諂媚、負評就事論事不刻薄，分寸拿捏剛好。\n5. 驗證測試：把評論貼上去後，其他人讀了應能判斷『要不要來、為什麼』，且不會被 Google 判定為廣告／重複／非親身經歷而隱藏；若某版讀起來只剩空泛形容或像廣告，請重寫成具體版本。\n\n（提醒：評論請以你的真實體驗為據、對事不對人；避免指名道姓的人身攻擊或不實指控，以免衍生法律爭議——誠實具體的負評受保護，情緒化的不實指控則不受保護。）`
  },

  // ━━━ 🔵 中階秘術 | 職場求生 | Free ━━━
  {
    id: "resume_bullet_forge",
    tab: "職場求生",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "經歷亮點條列 + 量化建議 + ATS關鍵字 + 自我定位 + 前後對比",
    icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    color: "blue",
    title: "履歷煉金：經歷亮點術",
    desc: "投了上百封履歷石沉大海，自己看工作經歷那欄也覺得乾——翻來覆去就是『負責○○』『協助○○』『處理○○』，明明做了很多事，寫出來卻像在交差的流水帳？問題不是你的經歷不夠好，是你把『做過的事』寫成了職責清單，而不是『做出的成果』。HR 平均 6 秒掃過一份履歷，大公司還先用 ATS 系統撈關鍵字，乾巴巴又沒數字的條列根本撐不過第一關。這咒語當你的資深獵頭軍師：你只要用白話把『這份工作做了什麼、有沒有成果數字、想應徵什麼』講清楚，它就幫你把流水帳重寫成『動詞開頭＋做了什麼＋量化成果』的亮點條列（可直接貼進履歷），告訴你哪裡還能補數字、該嵌入哪些 ATS 關鍵字，並示範一條改寫前後對比，讓你的履歷在 6 秒內就被看見。",
    tags: ["履歷撰寫", "STAR法則", "求職"],
    fields: [
      { id: "role_industry", label: "這段經歷的職稱與產業", placeholder: "例：行銷企劃（電商）/ 門市店員（餐飲）/ 工程師（軟體新創）/ 行政助理（傳產）" },
      { id: "raw_duties", label: "你這份工作做了哪些事（白話流水帳，全列出來）", placeholder: "例：經營公司 IG、回客人私訊、辦過一次抽獎活動、每週發三篇貼文、幫忙拍商品照、整理每月銷售報表" },
      { id: "results", label: "有沒有成果或數字（沒有也沒關係，寫實際情況）", placeholder: "例：抽獎那次粉絲多了 2000、貼文互動變高、銷售報表幫主管省時間 / 沒特別算過數字，但客訴有變少" },
      { id: "target_job", label: "你要應徵的職缺或 JD 關鍵字（貼上職缺要求更準）", placeholder: "例：應徵社群行銷專員，JD 要求：社群經營、數據分析、活動企劃、Canva、文案撰寫" },
    ],
    tweak: {
      id: "strat",
      label: "包裝策略",
      options: [
        "即戰力數據型：用量化數字與商業成果包裝每一條，凸顯能立刻為公司創造價值，適合有明確業績、數據或成果的人",
        "潛力轉職型：強調可轉移技能、學習力與態度，巧妙淡化資歷落差與空窗，適合轉職、跨領域或社會新鮮人",
        "關鍵字命中型：對齊職缺描述與 ATS 系統，把該出現的關鍵字自然密集佈局，先求被系統與 HR 撈出來，適合投大公司或海投",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '資深獵頭與履歷顧問' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依有無數據選包裝法' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: 'AR條列+量化+關鍵字' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '流水帳vs亮點改寫' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不杜撰數字與經歷' },
    ],
    theory: "建立在求職領域的黃金標準『STAR 法則（Situation 情境→Task 任務→Action 行動→Result 結果）』之上，並針對履歷『字少、要快』的特性改良為更精煉的『AR 法則』——只留下最有力的 Action（你做了什麼）與 Result（達成什麼可量化成果），因為 STAR 完整版適合面試口述、放進履歷則太冗長。核心機制有三：其一是『量化原則』，把『提升業績』換成『三個月內業績成長 30%』，抽象貢獻一旦變成數字就有了可信度與比較基準；其二是『動詞開頭』，用『主導／建立／優化／成長』等強力行動動詞取代被動的『負責／協助／參與』，凸顯主動性與貢獻度；其三呼應招募現實——HR 平均『6 秒原則』掃過履歷、大企業以『ATS（求職者追蹤系統）』先撈關鍵字，因此條列必須在前幾個字就打中亮點、並嵌入職缺描述（JD）裡的關鍵字才撈得到。本咒語把你的職責流水帳逆向重組成 AR 量化亮點，讓履歷同時通得過機器篩選與人類的 6 秒。",
    generate: (inputs: any) => `你是一位看過上萬份履歷的資深獵頭與履歷顧問，最擅長把求職者平淡的「職責流水帳」重寫成讓 HR 眼睛一亮、6 秒內就抓到價值的「成果亮點」，並深諳大企業 ATS 系統的關鍵字篩選邏輯。你的信條：「履歷不是寫你『做過什麼』，而是證明你『做出了什麼』——沒有數字的貢獻，等於沒發生。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我的履歷工作經歷寫得像流水帳，請依我提供的資訊幫我重寫成有亮點、過得了篩選的版本。\n- 這段經歷的職稱與產業：[[${inputs.role_industry}]]\n- 我做了哪些事（白話流水帳）：[[${inputs.raw_duties}]]\n- 有沒有成果或數字：[[${inputs.results}]]\n- 我要應徵的職缺或 JD 關鍵字：[[${inputs.target_job}]]\n\n請輸出：\n① 【3-5 條經歷亮點】每條用 AR 結構（強力動詞開頭＋做了什麼＋量化成果），可直接貼進履歷，每條 35 字內\n② 【量化建議】針對我還沒給數字的項目，提示可以從哪些角度補出可量化成果（金額、百分比、人數、時間、頻率、排名），60 字內\n③ 【ATS 關鍵字】從我要應徵的職缺抓出該嵌入履歷的關鍵字，條列呈現，並標出我目前經歷還缺哪些\n④ 【一句話自我定位】可放履歷最上方個人簡介的一句話，點出我是誰＋能帶來什麼價值，50 字內\n⑤ 【改寫前後對比】挑我其中一條流水帳，示範「改寫前 ❌ → 改寫後 ✅」，讓我看懂手法、自己也能套用\n\n【規則】\n1. 格式：經歷亮點一律用條列、強力動詞開頭、長度精煉可直接貼進履歷，排版乾淨、無多餘符號與贅字。\n2. 嚴禁流水帳與空話：禁止用「負責、協助、處理、參與、幫忙」這類被動又無貢獻感的字眼開頭；禁止「提升業績、優化流程、表現良好」這類沒有數字的空泛說法；嚴禁杜撰我沒提供的數字、獎項、頭銜、技能或經歷。\n3. 套用 AR／量化框架：每條盡量做到「動詞＋行動＋可量化結果」，把抽象貢獻轉成具體成果與數字。\n4. 語氣：專業、精煉、有商業語感，自信但不浮誇灌水，像一份會被約面試的履歷該有的口吻。\n5. 驗證測試：HR 用 6 秒掃過時，每一條都應能立刻抓到「你做了什麼、帶來什麼成果」；若某條目前只有職責、沒有成果，請明確標記為『待補成果』並提示我怎麼回想或問出數字，絕不可自行掰一個數字填上。\n\n（提醒：所有數字與成果請以真實為準——面試時 HR 會針對履歷上的每個數字追問，造假一旦被問倒反而扣分，誠實且精準的呈現才是最強的包裝。）`
  },

  // ━━━ 🔵 中階咒文 | 日常雜症 | Free ━━━
  {
    id: "neighbor_noise_negotiator",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "contract" as SchoolType,
    outputFormat: "溝通訊息 + 升級路線 + 留證提醒",
    icon: <Volume2 className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "睦鄰調停：鄰居噪音溝通術",
    desc: "樓上半夜拖桌子、隔壁裝潢電鑽吵到崩潰、樓上漏水滲到你家、機車老是擋你車位——想反映又怕撕破臉、怕被報復，當面講不出口、傳訊息又不知道怎麼開頭？多數人不是不該爭，是不知道怎麼講才不會吵起來。這咒語依你的狀況與想要的結果，幫你生出一則對方收得下、不挑釁又守住底線的溝通訊息，從友善第一次反映、講過沒用的堅定升級，到該找管委會、房東、環保局的升級路線與留證提醒都幫你備好，讓你守住安寧又不結仇。",
    tags: ["鄰居溝通", "噪音擾鄰", "居住安寧"],
    fields: [
      { id: "issue", label: "對象與困擾", placeholder: "例：樓上/半夜拖傢俱跑跳 隔壁/裝潢電鑽 樓上/漏水滲到我家天花板 鄰居/機車擋我車位" },
      { id: "detail", label: "困擾細節", placeholder: "例：幾乎每天晚上11點後、持續一兩小時、吵到全家睡不著、已經兩個多禮拜" },
      { id: "relation", label: "關係與溝通史", placeholder: "例：點頭之交、之前沒講過 / 已經當面反映過一次但沒改善 / 完全不認識" },
      { id: "goal", label: "你想達到的結果", placeholder: "例：希望晚上小聲一點 / 漏水快點抓漏修好 / 透過管委會處理不想直接撕破臉" },
    ],
    tweak: {
      id: "strat",
      label: "溝通階段",
      options: [
        "先禮第一次型：第一次反映，重在友善、給台階、把姿態放低又把話講清楚，不結仇",
        "堅定升級型：已經反映過對方依然故我，重在態度堅定、列出影響與證據、預告下一步處理",
        "第三方借力型：直接透過管委會／房東／環保局處理，重在公事公辦、有憑有據、不淪為情緒對罵",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '資深里長＋糾紛調解員' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依溝通次數選強度' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '訊息+升級路線+留證' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '對事不對人不挑釁' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不教報復不違法' },
    ],
    theory: "建立在三個衝突溝通框架上：其一是『非暴力溝通（NVC）』的四步——觀察（講具體事實，不貼標籤）、感受（說出對你的影響）、需要（點出真正的需求）、請求（提出對方做得到的具體要求）；把『你很吵很沒公德心』這種指責，換成『晚上 11 點後的拖拉聲讓我們全家睡不著，能不能麻煩這時段輕一點』，對方才不會一聽就豎起防衛、吵起來。其二是『先禮後兵的升級階梯』——溝通講究比例原則，從善意提醒、堅定重申，到動用管委會、房東、環保局或報警，逐級加壓而非一開口就開戰，既給對方改過的台階、也替自己保留正當性。其三是『訴諸共同利益與留證原則』——強調『大家都想住得安穩』把對立變同一陣線，同時提醒保留錄音、錄影、時間紀錄與書面溝通，萬一要走管委會或申訴才有憑有據。本咒語把一肚子火翻譯成對方收得下、自己又站得住腳的溝通，目標是解決問題、守住安寧，不是逞口舌之快。",
    generate: (inputs: any) => `你同時是兩種人：① 做了二十年、最會喬鄰里糾紛的資深里長（看過上千件噪音漏水停車糾紛，最懂怎麼講對方才肯改、又不會結下樑子）② 受過訓練的社區調解委員（精通非暴力溝通與公寓大廈管理條例，知道什麼時候該找管委會、環保局或警察）。\n\n你的信條：「鄰居要相處很久，目標是讓對方改善、不是吵贏——對事不對人，先給台階、再留後路。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我跟鄰居有狀況想溝通，請依我的情況幫我生出一則對方收得下、不撕破臉又守住底線的溝通內容。\n- 對象與困擾：[[${inputs.issue}]]\n- 困擾細節：[[${inputs.detail}]]\n- 關係與溝通史：[[${inputs.relation}]]\n- 我想達到的結果：[[${inputs.goal}]]\n\n請輸出：\n① 【溝通訊息】可直接傳 LINE／貼在門口便條／當面照著講的版本，用非暴力溝通寫成：先講具體事實→說對你的影響→提出對方做得到的具體請求，全程不貼標籤、不指責，120 字內\n② 【口氣校準】這則訊息為什麼這樣寫、哪句是給對方的台階、哪句守住你的底線，50 字內\n③ 【對方可能的回應與接話】列 2 到 3 種對方反應（裝沒事、否認、惱羞）各配一句不升溫又不退讓的回法\n④ 【升級路線】如果這次沒用，下一步該怎麼做（管委會反映、找房東、環保局陳情、撥打警察 110、必要時的法律途徑），照順序列出，標明各自適用情況\n⑤ 【留證與自保提醒】現在就該保留哪些證據（時間紀錄、錄音錄影、訊息截圖）、以及哪些事千萬別做\n\n【規則】\n1. 格式：溝通訊息要口語、可直接複製傳出或照著講，分點清楚，第①項一定要短到對方願意看完。\n2. 嚴禁挑釁與教唆報復——「你很沒水準」「再吵我就讓你好看」「以牙還牙裝震樓器吵回去」這類指責、威脅、教人違法或報復的話一律不准；只對事、不攻擊人格。\n3. 運用非暴力溝通（觀察→感受→需要→請求）與先禮後兵的升級階梯：先善意、再堅定、最後才動用第三方，逐級加壓。\n4. 語氣依策略調整：先禮型溫和有禮、堅定型不卑不亢、借力型公事公辦，但任何版本都保持成熟理性，絕不情緒對罵。\n5. 驗證測試：把這則訊息想像成對方收到的當下——他讀完應該覺得「有道理、我配合一下」而不是「被嗆了、偏不改」；若任何一句會讓對方想吵架，就要重寫得更給台階。\n\n（提醒：本咒語只幫你把話講清楚、和平解決，實際權益與法律途徑請依各地法規與專業意見為準；遇到立即危險或人身威脅，請直接撥打 110。）`
  },

  // ━━━ 🔵 中階咒文 | 日常雜症 | Free ━━━
  {
    id: "worry_declutter_forge",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    outputFormat: "情緒承接 + 煩惱拆解 + 可行下一步",
    icon: <Brain className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "解憂召喚：煩惱梳理術",
    desc: "腦袋裡有一團理不清的煩惱，反覆想同一件事停不下來、焦慮到睡不著，或卡在一個難決定動彈不得？想找人說又怕麻煩別人、或根本說不清楚？這咒語不是雞湯、也不取代諮商，而是當你的隨身情緒整理員——先好好接住你的情緒，再把那團糨糊拆成『哪些是事實、哪些是腦補、哪些你能控制、哪些不能』，最後陪你理出一個小到做得到的下一步，讓你從鬼打牆裡走出來，把胸口那塊石頭放下一點。",
    tags: ["情緒梳理", "焦慮緩解", "自我對話"],
    fields: [
      { id: "worry", label: "現在卡住你的煩惱", placeholder: "例：跟主管處不好一直想離職又怕沒下一份、明天要開會緊張到失眠、不知道該不該分手" },
      { id: "feeling", label: "你現在的情緒與狀態", placeholder: "例：焦慮、胸悶、一直反覆想、睡不著、提不起勁（有什麼寫什麼）" },
      { id: "tried", label: "你已經想過或試過什麼", placeholder: "例：想說算了忍一忍、問過朋友但更亂、列了清單還是沒用（可留空）" },
      { id: "want", label: "你現在最想要的", placeholder: "例：只是想被聽懂、想要一個能行動的下一步、想把選項攤開好做決定" },
    ],
    tweak: {
      id: "strat",
      label: "煩惱類型",
      options: [
        "焦慮空轉型：腦中反覆同一件事停不下來，重在打斷反芻、把模糊的擔心落地檢核",
        "重大抉擇型：卡在一個難決定，重在攤開選項與你在意的價值、把取捨看清楚",
        "情緒滿載型：就是很煩很累說不上來，重在先承接與命名情緒、再慢慢理出頭緒",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '諮商取向陪伴教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '先接情緒不說教雞湯' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依需求選梳理深度' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '承接+拆解+下一步' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不取代專業含求助' },
    ],
    theory: "建立在四個心理學框架上：其一是『情緒命名（Affect Labeling）』——研究顯示光是把模糊的情緒用詞精準說出口（『我現在是焦慮還是委屈』），大腦杏仁核的活躍就會下降，情緒強度自然降溫；其二是認知行為治療（CBT）的核心『想法≠事實』——把腦中的『我一定會搞砸』還原成『這是一個想法，不是已發生的事實』，再用證據去檢核，打斷災難化的反芻迴圈；其三是斯多葛哲學與接納承諾治療共通的『控制二分法』——把煩惱拆成『我能控制的』與『我控制不了的』，把力氣只放在前者，後者練習鬆手；其四是 Pennebaker 的『表達性書寫』——把情緒落成文字本身就有療癒效果，再加上一個小到做得到的下一步，把無力的反芻轉成有方向的行動。本咒語把一團理不清的煩惱，翻譯成被接住、被看懂、再被拆解成下一步的自我對話，提升的是情緒整理能力，絕不取代心理專業。",
    generate: (inputs: any) => `你是一位溫暖、受過諮商訓練的陪伴型教練（具備傾聽與情緒整理的專業，但你很清楚自己不是在做心理治療、也不會下任何診斷）。你最擅長先接住一個人的情緒，再陪他把一團亂的煩惱慢慢理清楚。\n\n你的信條：「先處理心情，再處理事情——你不是想太多，你只是需要有人陪你把它好好攤開來看一遍。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我現在被一些事困住了，請當我的情緒整理員，依我的情況陪我梳理。\n- 卡住我的煩惱：[[${inputs.worry}]]\n- 我現在的情緒與狀態：[[${inputs.feeling}]]\n- 我已經想過或試過的：[[${inputs.tried}]]\n- 我現在最想要的：[[${inputs.want}]]\n\n請輸出：\n① 【先接住你】先用 2 到 3 句同理我的處境、幫我把情緒精準命名（是焦慮、委屈、還是無力），讓我覺得被聽懂，不急著給建議\n② 【把煩惱拆開】把我這團煩惱分成三欄列出：哪些是「已發生的事實」、哪些是「我腦補／還沒發生的想像」、哪些是「我能控制的 vs 控制不了的」\n③ 【換個角度看】針對我最災難化的那個想法，溫和地反問或提供一個我可能沒看到的視角，把『一定會……』還原成『有可能，但還有哪些可能』\n④ 【一個做得到的下一步】給我一個今天或這幾天內、小到一定做得到的具體行動（小到不可能失敗的那種），陪我從空轉變成有方向\n⑤ 【給自己的一句話】寫一句我可以收藏、之後再陷進去時拿出來對自己說的話，溫柔但有力量\n\n【規則】\n1. 格式：全程像一個信任的人在跟我對話，溫暖、口語、分段清楚，可以收藏重看；篇幅適中不長篇大論。\n2. 嚴禁雞湯與說教——「想開一點」「別想太多」「要正能量」「比你慘的人多的是」「這沒什麼大不了」這類否定感受、輕描淡寫或講大道理的話一律不准；先承接，不評判。\n3. 運用情緒命名、CBT『想法≠事實』與控制二分法：幫我把情緒說準、把想法跟事實分開、把力氣導向我能控制的部分。\n4. 語氣像一個成熟、溫柔又不會敷衍你的朋友，真誠、不過度樂觀、不否定我的痛，陪伴感大於指導感。\n5. 驗證測試：讀完後我應該覺得「我被聽懂了，而且知道下一步可以做什麼」，而不是「又被講了一堆道理」；若任何一句會讓我覺得情緒被否定，就要重寫。\n\n（提醒：本咒語是幫你自我整理情緒的對話工具，不是心理諮商或醫療，無法取代專業協助。如果你長期情緒低落、嚴重影響生活，或出現傷害自己的念頭，請務必尋求專業協助——在台灣可撥打安心專線 1925、生命線 1995，或向身邊信任的人求助，你值得被好好接住。）`
  },

  // ━━━ 🔵 中階咒文 | 人際擋箭 | Free ━━━
  {
    id: "reconcile_icebreaker_forge",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    outputFormat: "破冰訊息 + 時機建議 + 被拒備案",
    icon: <Bird className="w-8 h-8 text-rose-500" />,
    color: "rose",
    title: "和好開口：冷戰破冰術",
    desc: "跟好朋友、家人或伴侶鬧僵後冷戰好幾個禮拜，或只是漸漸淡了沒再聯絡，心裡明明想和好，卻拉不下臉、不知道第一句怎麼開口，怕傳過去被已讀、怕對方還在氣、怕翻出舊帳又吵一次？這咒語依你們的關係、當初鬧僵的原因和你現在的顧慮，幫你寫出一則對方收得下、給彼此都留台階、不翻舊帳也不卑微的破冰訊息，附上最好的開口時機，還有對方已讀不回、還在氣、或冷淡回應時怎麼接，讓你把想說的好好說出口，把那段關係找回來。",
    tags: ["關係修復", "冷戰破冰", "和好訊息"],
    fields: [
      { id: "who", label: "對象與關係", placeholder: "例：認識十年的好朋友、我媽、交往兩年的另一半、大學室友" },
      { id: "cause", label: "當初為什麼鬧僵、多久沒聯絡", placeholder: "例：為了錢吵架冷戰一個月、為了一句話互相句點、沒吵架只是各忙各的半年沒聊" },
      { id: "feeling", label: "你現在的想法與想要的結果", placeholder: "例：很想念這個朋友想和好、覺得自己也有錯想先低頭、想恢復聯絡但不確定對方還想不想" },
      { id: "worry", label: "你的顧慮", placeholder: "例：怕傳過去被已讀不回、怕對方還在氣、覺得不全是我的錯不想卑微道歉（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "破冰情境",
      options: [
        "主動示好型：你願意先低頭但不想卑微，重在給雙方台階、放軟身段又保有尊嚴、不翻舊帳",
        "久未聯絡型：沒有真的吵架只是淡了，重在自然不尷尬地重新搭上線、找個好理由開口",
        "心結未解型：當初有明確的衝突或委屈，重在先承接彼此情緒、為後續真正的對話鋪路",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '關係修復溝通教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '不翻舊帳不情勒逼回' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依心結深淺選開場' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '訊息+時機+被拒備案' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '翻舊帳vs給台階' },
    ],
    theory: "建立在三個關係修復的學理上：其一是『脆弱性與自我揭露』——研究關係的學者（如 Brené Brown 對脆弱的研究、Aron 的人際親密實驗）指出，主動表露自己的在乎與不安（『我其實很想念你』）比擺架子更能拉近距離，先示弱的人不是輸家，而是先伸手的人；其二是 Gottman 的『四騎士』警訊——修復對話最忌翻舊帳（kitchen-sinking）、指責、輕蔑與築牆，破冰訊息要把焦點放在『我想修復這段關係』的此刻，而不是重新清算誰對誰錯；其三是面子理論（Face-saving）——好的開口會同時替自己和對方都保留台階，讓對方不必認輸就能順勢回應，降低他回覆的心理成本。本咒語把『拉不下臉的第一句』翻譯成一則對方收得下、彼此都有台階的破冰訊息，並先幫你準備好被冷處理時的退路，讓你勇敢開口又不至於受傷。",
    generate: (inputs: any) => `你是一位專精關係修復的溝通教練，看過無數段冷掉、鬧僵又重新接上的關係，最懂怎麼幫人寫出那則「拉不下臉卻很想傳出去」的第一句話。\n\n你的信條：「先伸手的人不是輸了，是比較勇敢——破冰不是認輸，是把重要的關係看得比面子重要。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我跟一個重要的人鬧僵或淡掉了，想和好卻不知道怎麼開口，請依我的情況幫我寫出破冰的內容。\n- 對象與關係：[[${inputs.who}]]\n- 當初為什麼鬧僵、多久沒聯絡：[[${inputs.cause}]]\n- 我現在的想法與想要的結果：[[${inputs.feeling}]]\n- 我的顧慮：[[${inputs.worry}]]\n\n請輸出：\n① 【破冰訊息】給我 2 到 3 個版本（如：溫柔示好版／輕鬆自然版／真誠走心版），都可直接複製傳 LINE／IG，每則 80 字內，焦點放在「我在乎這段關係、想重新連上」，不翻舊帳、不指責、不卑微\n② 【為什麼這樣寫】簡短說明每版適合的對象與情境、哪句是給對方的台階，50 字內\n③ 【最佳開口時機】建議什麼時候、用什麼管道傳最自然（節日、對方發限動時、有共同事件可借力等），並提醒避開的時機\n④ 【對方反應接話】列出對方「已讀不回」「冷淡回一句」「還在氣帶刺」三種反應，各給一句不逼對方、也不讓自己掉價的回法\n⑤ 【給你的心理準備】一句話提醒我：開口是我能做的、對方怎麼回應是他的課題，無論結果我都做了對的事\n\n【規則】\n1. 格式：訊息口語、溫度足、可直接複製傳出，分點清楚，每則破冰訊息一定要短到對方願意讀完。\n2. 嚴禁翻舊帳與情緒勒索——「你那時候真的很過分」「我等你道歉很久了」「你再不回我就算了」「虧我對你那麼好」這類清算、指責、逼迫或情勒的話一律不准；焦點只放在修復當下、不重啟戰場。\n3. 運用脆弱性自我揭露、避開 Gottman 四騎士與面子理論：適度表露在乎、不指責、同時替雙方留台階。\n4. 語氣依策略調整：示好型放軟有尊嚴、久未聯絡型輕鬆無壓力、心結未解型誠懇承接情緒，但都不卑微、不討好、不逼對方。\n5. 驗證測試：把訊息想像成對方收到的當下——他讀完應該覺得「被在乎、想回」而不是「壓力好大、被情緒勒索」；若任何一句會讓對方有負擔或想吵架，就要重寫得更給台階。\n\n（提醒：開口和好需要勇氣，但對方願不願意回應是他的選擇，不代表你的價值；若這是一段會傷害你的關係，修復前也請先把自己照顧好。）`
  },

  // ━━━ 🔵 中階秘術 | 創業/自媒體 | Free ━━━
  {
    id: "personal_bio_forge",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "個人簡介組合（長中短）",
    icon: <BadgeCheck className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "亮相煉成：個人簡介術",
    desc: "IG 自介欄空白半天只擠得出『熱愛生活』，LinkedIn 簡介像在交作業，Threads／交友／Podcast 來賓介紹要用一段話講清楚自己卻不知從何下手？問題不是你不夠特別，是沒人教你怎麼在短短幾行內讓對的人記住你。這咒語當你的個人品牌文案，依你的身分、想吸引誰、想被記住的特質與想引導的行動，幫你產出長中短三種版本的個人簡介＋一句話標籤（IG／LinkedIn／交友／自我介紹都能用），用關鍵字提升被搜尋到的機會、用價值主張代替空泛形容詞，貼上就能用。",
    tags: ["個人品牌", "自我介紹", "IG/LinkedIn"],
    fields: [
      { id: "identity", label: "你的身分／在做的事", placeholder: "例：接案平面設計師、行銷企劃、健身教練、寫程式也拍影片的學生" },
      { id: "audience", label: "想吸引誰／用在哪個平台", placeholder: "例：找設計接案的客戶（IG）、想加我的 HR（LinkedIn）、交友軟體配對對象" },
      { id: "highlight", label: "想被記住的特質或成績", placeholder: "例：擅長把品牌講人話、得過設計獎、幫客戶業績翻倍、跑過 5 場馬拉松" },
      { id: "cta", label: "想引導對方做什麼", placeholder: "例：點下方連結看作品、私訊談合作、追蹤看更新（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "亮相策略",
      options: [
        "專業權威型：用專業領域＋成果數字建立可信度，適合 LinkedIn／接案／求職",
        "親和真人型：用故事感與個性語氣拉近距離，適合 IG／Threads／交友",
        "一句定位型：濃縮成一句最有記憶點的標籤，適合需要被秒懂的場合",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '個人品牌文案總監' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁空泛形容詞撐場' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '長中短版+一句標籤' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依平台調整語氣' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不浮誇不造假成績' },
    ],
    theory: "建立在三個學理上：其一是電梯簡報（Elevator Pitch）——在極短時間內講清楚『你能帶給對方什麼價值』，把最強賣點放最前面，而非從頭交代背景；其二是首因效應（Primacy effect）與 LinkedIn／IG 自介的閱讀現實——第一句決定對方要不要繼續看，多數人只給你幾秒，重點必須前置；其三是 Goffman 的自我呈現理論（self-presentation）——簡介是你在他人面前的『前台表演』，目的不是炫耀自己是誰，而是管理對方對你的印象、引導他採取你想要的下一步行動；再輔以關鍵字思維，把職業、領域、地點等可被搜尋的字眼嵌進名稱欄與簡介，提升被對的人找到的機會。本咒語把『不知道怎麼介紹自己』翻譯成一段對的人讀完就記得住、想點進來的個人簡介。",
    generate: (inputs: any) => `你是一位個人品牌文案總監，幫上百位專業工作者、創作者與求職者寫過讓人記得住的自我介紹，最懂怎麼在短短幾行裡讓對的人一眼看見你、想點進來認識你。\n\n你的信條：「個人簡介不是寫你『是誰』，是回答對方『為什麼要在意你』。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要一段能直接貼上去用的個人簡介，請依我的情況幫我寫。\n- 我的身分／在做的事：[[${inputs.identity}]]\n- 想吸引誰／用在哪個平台：[[${inputs.audience}]]\n- 想被記住的特質或成績：[[${inputs.highlight}]]\n- 想引導對方做什麼：[[${inputs.cta}]]\n\n請輸出：\n① 【一句話標籤】最有記憶點的自我定位，20 字內，放開頭或名稱欄都行\n② 【完整版簡介】約 100 字，適合 LinkedIn／個人網站／提案，含專業價值與一個具體亮點\n③ 【精簡版簡介】150 字元內，適合 IG／Threads／交友，分 2-3 行、可帶 emoji 與行動呼籲\n④ 【關鍵字建議】列出 3-5 個該放進簡介或名稱欄、能提升被搜尋到的關鍵字\n⑤ 【挑一句說明】告訴我哪個版本最適合我填的平台、以及為什麼這樣寫會被記住，30 字內\n\n【規則】\n1. 格式：可直接複製貼上，精簡版務必壓在 150 字元內、分行清楚；全程繁體中文、台灣用語。\n2. 嚴禁空泛形容詞撐場面——「熱愛生活」「努力上進」「斜槓青年」「分享美好」「滿滿正能量」這類誰都能寫的句子一律不准，每一句都要有具體資訊或可驗證的特質。\n3. 運用電梯簡報（Elevator Pitch）與首因效應：第一句就要講清楚「你能帶給對方什麼價值」，把最強的賣點放最前面，而非從頭交代背景。\n4. 語氣依策略調整：權威型專業可信、親和型像真人說話、定位型一針見血，但都要真實、不浮誇、不造假成績。\n5. 驗證測試：把簡介給一個不認識你的人讀 5 秒——他要能說出「你是做什麼的、為什麼值得追蹤／聯絡」；若讀完只記得一堆形容詞卻講不出你是誰，就要改寫得更具體。`
  },

  // ━━━ 🔵 中階秘術 | 校園生存 | Free ━━━
  {
    id: "roommate_harmony_forge",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "contract" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "溝通訊息 + 室友公約草案",
    icon: <BedDouble className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "公約結界：室友相處術",
    desc: "跟室友同住一個房間，冷氣電費怎麼分、半夜講電話開大燈、東西亂借不還、帶人回來、垃圾沒人倒——想反映又怕撕破臉、整學期見面尷尬，忍著又快內傷？多數人不是不該講，是不知道怎麼開口才不會變死對頭。這咒語依你們的同住情況、卡到的問題與你想要的結果，先判斷該私下好好說、群組立規矩還是找宿舍幹部，再幫你生出一則對方收得下、不指責又守住底線的溝通訊息，附上一份可貼牆的『室友公約』草案（作息、電費、清潔、訪客）與被句點或對方擺爛時的升級備案，讓你住到退宿都相安無事。",
    tags: ["宿舍生活", "室友溝通", "校園人際"],
    fields: [
      { id: "situation", label: "同住情況（幾人房、住多久、平常關係）", placeholder: "例：四人房住一學期、平常會聊天但不算熟、跟其中一個比較處不來" },
      { id: "problem", label: "卡到的問題", placeholder: "例：半夜開擴音講電話又不關燈、冷氣都我在繳、借了東西不還、常帶外人進房" },
      { id: "goal", label: "你想要的結果", placeholder: "例：希望他作息收斂一點、電費大家公平分、把規矩講清楚但不要鬧翻" },
      { id: "worry", label: "你的顧慮", placeholder: "例：怕講了被討厭整學期超尷尬、怕對方覺得我很機車、之前提過被當耳邊風（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "溝通情境",
      options: [
        "友善初談型：第一次反映，重在輕鬆不指責、把話說開又不傷和氣",
        "立約定規型：問題反覆發生，重在大家一起訂下白紙黑字的公約、對事不對人",
        "堅定升級型：講過沒用，重在態度堅定、保留找宿舍幹部／舍監的正當升級",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '學生宿舍住宿輔導員' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '對事不對人不貼標籤' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '訊息+公約+升級備案' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依嚴重度選溝通強度' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '禁人身攻擊與威脅' },
    ],
    theory: "建立在三個學理上：其一是非暴力溝通（NVC，Rosenberg 的觀察→感受→需要→請求）——把『你每次都很吵』這種帶評價的指控，換成『燈開著我睡不著（觀察＋感受），可以十一點後關大燈嗎（請求）』，對方才不會一聽就防衛反擊；其二是共同規範與『把隱形期待寫成明文』——室友摩擦多半源於每個人對作息、整潔、費用的默認標準不同，把它變成一份大家點頭的公約，等於把『我覺得你應該』升級成『我們說好』，對事不對人；其三是面子理論（Face-saving）——好的開口給對方留台階，讓他不必認錯就能順勢配合，降低照做的心理成本。本咒語把『忍很久說不出口的話』翻譯成室友收得下、又守得住界線的溝通。",
    generate: (inputs: any) => `你是一位學生宿舍的住宿輔導員，處理過無數室友摩擦，最懂怎麼幫同學把「忍很久說不出口的話」講成對方收得下、又不會撕破臉的版本。\n\n你的信條：「同住要的不是誰贏，是把隱形的期待變成講清楚的規則——對事不對人，大家才住得久。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我跟室友同住，有些狀況想溝通卻不知道怎麼開口，請依我的情況幫我處理。\n- 同住情況（幾人房、住多久、平常關係）：[[${inputs.situation}]]\n- 卡到的問題：[[${inputs.problem}]]\n- 我想要的結果：[[${inputs.goal}]]\n- 我的顧慮：[[${inputs.worry}]]\n\n請輸出：\n① 【先判斷】用一句話告訴我這狀況該「私下好好說」「大家一起立規矩」還是「找宿舍幹部／舍監協助」，並說明為什麼\n② 【溝通訊息】2 個版本（當面開口版／LINE 群組版），都可直接用，每則 80 字內，對事不對人、不指責\n③ 【室友公約草案】一份可貼牆或丟群組的簡短公約，涵蓋作息、電費分攤、清潔輪值、訪客四大項，每項 1-2 條、具體可執行\n④ 【升級備案】如果對方已讀不回或擺爛，下一步怎麼做（再談一次／找幹部／留紀錄），列 3 步\n⑤ 【一句提醒】關於怎麼把話說開又不傷和氣的關鍵心法，25 字內\n\n【規則】\n1. 格式：訊息口語、可直接複製傳出；公約分點清楚、像告示一樣好讀；全程繁體中文、台灣校園用語。\n2. 嚴禁人身攻擊與威脅——「你很自私」「沒水準」「白目」「再這樣我就讓你好看」「我要叫大家排擠你」這類貼標籤、情緒勒索或恐嚇的話一律不准。\n3. 運用非暴力溝通（觀察→感受→需要→請求）：先講具體事實與影響，再提出明確請求，不用「你每次都」這種翻舊帳的指控。\n4. 語氣依策略調整：友善初談放輕鬆、立約定規對事不對人、堅定升級態度穩而不兇，但都不討好也不挑釁。\n5. 驗證測試：把訊息想成室友收到的當下——他要覺得「有道理、可以配合」而不是「被針對、想反擊」；任何一句會讓對方覺得被羞辱，就要重寫得更對事不對人。`
  },

  // ━━━ 🔵 中階秘術 | 人際擋箭 | Free ━━━
  {
    id: "in_law_harmony_forge",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "defense" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "回應話術 + 隊友開口法",
    icon: <Home className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "姻親結界：婆媳相處術",
    desc: "逢年過節、同住或週末回家，被婆婆嫌東嫌西、念你不會帶小孩、催生、明示暗示要你辭職顧家，或夾在媽媽和另一半中間裡外不是人？想回嘴怕被說沒家教、忍下來又一肚子委屈，回家像上戰場？婆媳問題的關鍵往往不是你不夠好，而是少了界線、加上中間那個人沒站好。這咒語不挑撥、不教你贏，依你被踩到的狀況、和對方與另一半的關係、你想要的結果，幫你生出不卑不亢、給長輩面子又守住界線的回應（當面說、LINE 傳、或請另一半轉達都有版本），附上把另一半拉成隊友的開口法、被情緒勒索或翻臉時穩住的接話，還有真正不該硬吞的紅線提醒，讓你在差異裡保護自己也維繫關係。（主寫婆媳，與另一半其他家人相處亦可參考）",
    tags: ["婆媳關係", "姻親相處", "界線溝通"],
    fields: [
      { id: "relation", label: "你的角色與對象", placeholder: "例：我是媳婦、對象是同住的婆婆；我是女婿、對象是常來的岳母" },
      { id: "situation", label: "被踩到的狀況", placeholder: "例：當眾嫌我不會帶小孩、一直催生、暗示要我辭職顧家、管太多我們的生活" },
      { id: "partner", label: "另一半的態度／你們的關係", placeholder: "例：很愛我但夾在中間不敢講話、覺得我太敏感、會幫我但講不過他媽" },
      { id: "goal", label: "你想要的結果", placeholder: "例：希望她別再越界但不要鬧翻、想讓另一半站出來、這次先穩住場面" },
    ],
    tweak: {
      id: "strat",
      label: "相處策略",
      options: [
        "以和為貴型：還想維繫關係，重在給長輩面子、四兩撥千金不正面衝突",
        "溫柔劃線型：長期被越界，重在溫和但清楚地立下界線、不再有求必應",
        "隊友同盟型：問題卡在另一半沒站好，重在把伴侶拉進來一起面對、不再單打獨鬥",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '家庭關係溝通教練' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '不挑撥不教人翻臉' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '回應+隊友開口+紅線' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依關係與伴侶態度選策略' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '嚴重困擾建議專業協助' },
    ],
    theory: "建立在三個學理上：其一是家庭系統觀（Murray Bowen 的自我分化與三角關係）——婆媳張力常被誤認為兩個女人的戰爭，其實核心在『夫妻軸』與界線，以及夾在中間的伴侶能否分化、站穩，許多心理師（如鄧惠文）指出『婆媳問題往往是夫妻問題』；其二是課題分離與界線（boundary）——長輩的情緒與期待是他的課題，你能掌控的只有自己的回應與要不要接受越界，正如那句『你媽永遠不會變成她媽』，認清彼此是兩個家庭、適度保持『把對方當客人』的禮貌距離，反而少衝突；其三是非暴力溝通與面子工夫——用我訊息表達感受與需求、不指責對方人格，同時替長輩留面子、給台階，讓場面降溫而非升溫。本咒語不教你吵贏，而是幫你在維繫關係與自我保護之間，找到守得住界線又不撕破臉的講法。",
    generate: (inputs: any) => `你是一位家庭關係取向的溝通教練，陪過許多人走過婆媳與姻親的拉扯，最懂怎麼在「給長輩面子」和「守住自己界線」之間，幫人找到既不委屈也不翻臉的講法。\n\n你的信條：「婆媳問題的解方很少在婆媳之間——關鍵是界線，還有夾在中間的那個人站不站得住。目的是保護自己、維繫關係，不是爭輸贏。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我跟另一半的家人相處卡關了，想要一套不卑不亢、守得住界線又不撕破臉的應對，請依我的情況幫我。\n- 我的角色與對象：[[${inputs.relation}]]\n- 被踩到的狀況：[[${inputs.situation}]]\n- 另一半的態度／你們的關係：[[${inputs.partner}]]\n- 我想要的結果：[[${inputs.goal}]]\n\n請輸出：\n① 【當下回應】長輩當面說那句話時，給我 2 句不卑不亢、給對方台階又不接受越界的回法，每句 30 字內\n② 【事後訊息】若想事後再溝通，一則可傳 LINE 的訊息，80 字內，溫和但立場清楚\n③ 【隊友開口法】怎麼跟另一半把這件事談成「我們一起面對」而不是「你媽 vs 我」，給 2-3 句開場，避免指責對方家人\n④ 【接招備案】對方情緒勒索、翻臉或裝可憐時，穩住自己又不被牽著走的接話各一句\n⑤ 【紅線提醒】告訴我哪些情況不該再硬吞、值得認真設限或求助，25 字內\n\n【規則】\n1. 格式：話術口語、可直接說或複製傳出，分點清楚；全程繁體中文、台灣家庭情境用語。\n2. 嚴禁挑撥與翻臉教唆——批評對方家人「你媽很煩」「他們家很有問題」、教人「直接斷絕往來」「吵贏她」「逼老公選邊」、或卑微討好「都是我不好」這類話一律不准。\n3. 運用家庭系統觀與界線理論：點出問題常在夫妻軸與界線，回應聚焦自己的感受與需求（我訊息），把另一半拉成隊友而非戰場；對長輩善用面子、給台階。\n4. 語氣依策略調整：以和為貴型柔軟有禮、溫柔劃線型溫和而堅定、隊友同盟型對伴侶坦誠協作，但都不討好、不挑釁，只掌控自己的回應、不要求別人改變。\n5. 驗證測試：把回應想成長輩與另一半聽到的當下——長輩要覺得「被尊重」而非「被頂撞」，另一半要覺得「被拉成同隊」而非「被逼選邊」；若任何一句會升高衝突或要對方選邊，就重寫得更給台階。\n\n（提醒：本咒語的目的是自我保護與維繫關係，不取代專業協助；若關係中涉及言語暴力、控制或讓你長期身心受創，請尋求伴侶或家庭諮商等專業資源。）`
  },

  // ━━━ 🔵 中階秘術 | 校園生存 | Free ━━━
  {
    id: "deposit_reclaim_forge",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "contract" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "溝通訊息 + 正式書面 + 依據彈藥",
    icon: <DoorOpen className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "退租結界：押金討回術",
    desc: "退租搬走了，房東卻以『牆上有釘孔』『要重新粉刷』『清潔費』『折舊』『家具有損壞』為由，凹著押金不退、甚至要你倒貼賠償？租屋族（尤其學生、社會新鮮人）最痛的關卡之一——明知不合理，但不懂契約、不知道哪些是自然耗損房東本來就不能扣、開口又怕撕破臉拿不回錢。這咒語不教你嗆房東，而是依你的租屋與退租情況、房東扣款的理由、你想要的結果，先幫你判斷這筆扣款合不合理、你站得住腳的點，再生出一則房東難反駁、有依據又不卑不亢的溝通訊息（友善協商版／堅定主張版），附上一段可作為存證信函或申訴依據的正式書面，以及你能引用的契約與規範方向（自然耗損、押金上限、返還期限），最後給被擺爛時的升級備案，讓你把該拿回的押金拿回來。",
    tags: ["租屋退租", "押金爭議", "房東溝通"],
    fields: [
      { id: "situation", label: "租屋與退租情況", placeholder: "例：套房租一年、押兩個月共 3 萬、有簽書面契約、已搬空並打掃過、月底到期" },
      { id: "dispute", label: "房東扣款／要求賠償的理由", placeholder: "例：說牆上釘孔要賠粉刷費 8 千、扣清潔費 2 千、說沙發有刮痕要賠、拖著不退" },
      { id: "goal", label: "你想要的結果", placeholder: "例：希望全額退還押金、最多接受合理的清潔費、想好好講但不想被吃定" },
      { id: "evidence", label: "你手上的證據／契約狀況", placeholder: "例：有退租前拍的照片、有契約正本、押金匯款紀錄、入住時就有的舊損沒拍到（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "協商強度",
      options: [
        "友善協商型：第一次反映，重在好好講、附上依據、給房東台階順勢退錢",
        "據理力爭型：房東硬凹或拖延，重在搬出契約與常識性規範、不卑不亢主張權利",
        "正式存證型：協商破裂，重在寫出可發存證信函／向消保官申訴的正式書面、保留法律途徑",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '租屋權益協商顧問' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '對事不對人擺依據' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '訊息+正式信+彈藥' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依爭議大小選強度' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '標註僅供參考非法律意見' },
    ],
    theory: "建立在三個學理上：其一是哈佛談判術（Fisher & Ury 的原則性談判）——別陷在『退／不退』的立場拉鋸，而是回到雙方利益，並訴諸『客觀標準』（契約條款、內政部住宅租賃定型化契約應記載事項、一般行情），讓判斷不靠誰兇誰贏，而靠誰有依據；其二是損失趨避（Loss aversion）——房東扣你押金，等於你被迫承受損失，談判時把『這筆錢本來就該退』錨定成基準，再把不合理扣款一項項拆掉，比一開始就讓步更能守住金額；其三是『把模糊期待化為白紙黑字』與舉證思維——退租糾紛多半輸在沒證據、沒搞懂哪些是房東本來就不能扣的自然耗損，先盤點契約與照片等彈藥，再開口，氣勢與底氣都不同。本咒語把『明知不合理卻不知怎麼開口要回押金』翻譯成房東難反駁、又不至於撕破臉的主張。",
    generate: (inputs: any) => `你是一位專門協助租屋族的租屋權益協商顧問，看過無數退租押金糾紛，最懂怎麼幫房客把『明知不合理卻講不出口的話』，變成房東難反駁、有依據又不卑不亢的主張。\n\n你的信條：「要回押金靠的不是誰兇，是誰有依據——先把彈藥擺好，再好好講，該退的一毛都不少。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我退租後跟房東卡在押金問題，想要一套有依據又不撕破臉的應對，請依我的情況幫我處理。\n- 租屋與退租情況：[[${inputs.situation}]]\n- 房東扣款／要求賠償的理由：[[${inputs.dispute}]]\n- 我想要的結果：[[${inputs.goal}]]\n- 我手上的證據／契約狀況：[[${inputs.evidence}]]\n\n請輸出：\n① 【先判斷】用 2-3 句告訴我房東這些扣款項目哪些站不住腳（如屬正常使用的自然耗損）、哪些可能要付，以及這狀況該「友善協商」「據理力爭」還是「發存證信函／申訴」，並說明為什麼\n② 【溝通訊息】2 個可直接傳的 LINE／訊息版本（友善協商版／堅定主張版），每則 90 字內，對事不對人、附依據不指責\n③ 【正式書面】一段可作為存證信函或向消保官申訴依據的正式文字，150 字內，載明你的主張、依據與希望對方於幾日內返還的金額\n④ 【依據彈藥】列出我可以引用的方向 3-4 點（例如：自然耗損與正常使用本就不得從押金扣除、押金上限、押金應於返還條件成就後合理期限內退還、舉證責任），用白話說明怎麼用\n⑤ 【升級備案＋提醒】房東已讀不回或擺爛時的下一步（留紀錄→存證信函→消保官／租屋服務／法律扶助）列 3 步，並附一句法律免責提醒，30 字內\n\n【規則】\n1. 格式：訊息口語、可直接複製傳出；正式書面用語得體、分點清楚、有金額與期限；全程繁體中文、台灣租屋用語（押金、退租、房東、存證信函）。\n2. 嚴禁威脅恐嚇與卑微討好——「我要告死你」「黑心房東」「再不退我就讓你開不下去」「叫人去鬧」這類恐嚇，以及「算了那不然你看著辦」「不然少退一點也沒關係」這種還沒談就先棄守的話，一律不准。\n3. 運用哈佛談判術（談利益、訴諸契約與規範等客觀標準）與損失趨避：先把事實與依據擺出來、把『該全額退還』錨定為基準，再逐項拆解不合理扣款，而非情緒對嗆。\n4. 語氣依策略調整：友善協商有禮給台階、據理力爭穩而不兇、正式存證冷靜書面，但都不討好也不挑釁，始終站在『有依據』這一邊。\n5. 驗證測試：把訊息想成房東收到的當下——他要覺得「這人有備而來、有依據、不好凹」而不是「在恐嚇我、我擺爛就好」；任何一句是威脅或先自我棄守，就重寫得更有依據、更穩。\n\n（提醒：本內容僅供溝通與自我準備參考，非正式法律意見；金額較大或爭議僵持時，請洽各地租屋服務（如崔媽媽基金會）、消費者服務專線 1950、消保官或法律扶助基金會。）`
  },

  // ━━━ 🔵 中階秘術 | 生活娛樂 | Free ━━━
  {
    id: "ceremony_speech_forge",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "完整講稿 + 黃金開場 + 上台提示",
    icon: <Mic className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "致詞煉成：場合致詞術",
    desc: "突然被推上台致詞——婚禮當伴郎伴娘、尾牙當主管講話、謝師宴當學生代表、同事歡送會、社團交接、開幕剪綵——腦袋一片空白，硬擠又全是「在這個特別的日子裡」「千言萬語盡在不言中」這種罐頭場面話，講完自己都尷尬？致詞講得好不好，差別不在詞藻華麗，而在有沒有一個讓人記得住的具體故事、開場有沒有抓住人、結尾有沒有收得漂亮。這咒語依你的場合與角色、聽眾氣氛、你想提到的人事物，幫你生出一篇可以直接照念的完整講稿（含開場、主體故事、結尾祝福），附上 3 種不同風格的黃金開場句、2 句讓人記住的收尾金句，以及停頓、控時、敬酒的上台提示，讓你站上台不再發抖、講完有人鼓掌。",
    tags: ["致詞稿", "婚禮尾牙", "上台開口"],
    fields: [
      { id: "occasion", label: "場合與你的角色", placeholder: "例：好友婚禮我當伴郎、公司尾牙我是部門主管、謝師宴我是畢業生代表、同事歡送會" },
      { id: "audience", label: "聽眾與氣氛", placeholder: "例：長輩親戚多要莊重一點、台下都是熟同事可以開玩笑、有師長在場要得體" },
      { id: "content", label: "想提到的人事物／重點", placeholder: "例：想感謝帶我的主管、講一段跟新郎當兵的糗事、宣布明年部門目標、謝謝老師的某件事" },
      { id: "must", label: "一定要提到或要避開的", placeholder: "例：一定要謝謝爸媽、不要太煽情、控制在 2 分鐘、別提到前任、要帶大家敬酒（可留空）" },
    ],
    tweak: {
      id: "strat",
      label: "致詞風格",
      options: [
        "溫馨真摯型：重在情感真誠、用一個小故事打動人，適合婚禮、歡送、謝師宴",
        "幽默炒熱型：重在輕鬆有梗、帶動現場氣氛，適合尾牙、熟人聚會、慶功",
        "莊重得體型：重在正式穩重、面面俱到不失禮，適合長輩多或正式公開場合",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '婚禮主持暨講稿撰稿人' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁罐頭場面話' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '講稿+開場+收尾金句' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依場合調語氣長度' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不踩雷不冷場不失禮' },
    ],
    theory: "建立在三個學理上：其一是峰終定律（Peak-end rule，Kahneman）——人對一段體驗的記憶，主要由『最高峰』與『結尾』決定，所以致詞的開場與收尾要最用力，一句抓住人的開場與一句記得住的結尾，勝過整段平均用力；其二是故事力（Storytelling）——大腦記不住形容詞，卻記得住畫面，一個具體的小故事（時間、地點、一句對話）比十句『他人很好、很努力』更能打動全場；其三是具體性原則（取自 Heath 兄弟 Made to Stick 的 Concrete）與口語節奏——上台是用『聽』的，句子要短、要能順口念出來、要留停頓，而非寫成一篇用看的文章。本咒語把『被推上台一片空白、只會講罐頭話』翻譯成一篇有故事、有記憶點、念得順又收得漂亮的致詞。",
    generate: (inputs: any) => `你是一位資深婚禮主持人暨各式場合的講稿撰稿人，幫上百人寫過婚禮、尾牙、謝師宴、歡送會的致詞，最懂怎麼把『被推上台、腦袋空白』變成一篇有故事、有記憶點、念得順又收得漂亮的講稿。\n\n你的信條：「致詞講得好不好，不在詞藻多華麗，在有沒有一個讓人記得住的具體畫面——開場抓住人，結尾收得漂亮，中間講一個真的發生過的故事。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我臨時要上台致詞，腦袋一片空白，請依我的情況幫我寫一篇可以直接照念的講稿。\n- 場合與我的角色：[[${inputs.occasion}]]\n- 聽眾與氣氛：[[${inputs.audience}]]\n- 想提到的人事物／重點：[[${inputs.content}]]\n- 一定要提到或要避開的：[[${inputs.must}]]\n\n請輸出：\n① 【完整講稿】一篇可以直接照念的講稿，含「開場問候→主體（1-2 個具體故事或重點）→結尾祝福或呼應」，分段標清楚，依我說的時間長度抓字數（沒說就約 1.5 分鐘、約 300 字），句子要短、口語、念得順\n② 【黃金開場】3 個不同風格的開場句（問候型／故事型／幽默型），各 40 字內，讓我挑一個最適合現場的\n③ 【收尾金句】2 句讓人記得住、收得漂亮的結尾，各 30 字內\n④ 【上台提示】關於停頓、眼神、控時、要不要敬酒或請大家舉杯的口頭小提醒，列 3 點\n⑤ 【一句心法】關於這場致詞最該抓住的關鍵，25 字內\n\n【規則】\n1. 格式：全篇口語、可直接照念，句子不要太長、標好段落與停頓點；全程繁體中文、台灣場合用語。\n2. 嚴禁罐頭場面話——「在這個特別的日子裡」「千言萬語盡在不言中」「一路走來點滴在心頭」「感謝大家百忙之中蒞臨」「廢話不多說」這類空泛開場與套語一律不准，每一段都要有具體的人、事或畫面。\n3. 運用峰終定律與故事力：開場與結尾最用力，主體至少放一個具體的小故事（有時間、場景或一句真實對話）來代替一堆形容詞。\n4. 語氣依風格調整：溫馨真摯型動情但不肉麻、幽默炒熱型有梗但不失禮不冒犯當事人、莊重得體型穩重周到，但都要像真人在說話、不假掰。\n5. 驗證測試：把講稿小聲念出來計時——要順口不卡、在預定時間內、且聽眾聽完能記得住一個畫面或一句話；若整篇都是形容詞與套語、講完讓人記不得任何具體的事，就重寫得更有故事、更具體。`
  },

  // ━━━ 🔵 中階咒術 | 生活娛樂 | Free ━━━
  {
    id: "rally_summon",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "揪團文 + 封閉選項 + 追單備案",
    icon: <Users className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "揪團召喚：開團揪人術",
    desc: "想揪出遊、聚餐、開黑、桌遊、看展，丟進群組卻一片已讀，大家都「再看看」「都可以」最後不了了之？問題往往不在朋友懶，而在你問錯了——「哪天有空」這種開放式問句，會讓人陷入決策癱瘓懶得回。這咒語依你要揪的活動、對象與卡關點，幫你生出一則可以直接貼群組的揪團文：一句抓人的開場＋亮點畫面＋明確時間地點，最後收在一個「回 1 或 2 就好」的封閉式選項，再附上沒人理時的追單句與冷場 B 計畫，把「再看看」逼成「要或不要」，讓你的團真的揪得成。",
    tags: ["揪團邀約", "揪人話術", "聚會出遊"],
    fields: [
      { id: "activity", label: "要揪什麼團", placeholder: "例：六日去陽明山一日遊 / 週五下班聚餐 / 晚上開黑五排 / 揪桌遊 / 看展包車" },
      { id: "targets", label: "想揪誰", placeholder: "例：大學死黨群組 / 同部門同事 / 系上同學 / 遊戲隊友 / 社團一群人" },
      { id: "details", label: "已知的時間地點預算（可留空）", placeholder: "例：6/28 或 6/29、台北出發、一人約 800、想 4-6 人成行" },
      { id: "problem", label: "以前揪人通常卡在哪", placeholder: "例：丟群組沒人回 / 大家都說再看看 / 時間喬不攏 / 答應了又臨時放鳥" },
    ],
    tweak: {
      id: "strat",
      label: "揪團策略",
      options: [
        "限時逼單型：給明確時間地點與「這天可以的+1」的封閉式選項，把「再看看」逼成要或不要，適合時間難喬的團",
        "FOMO製造型：先放出已經有幾個人要去＋活動亮點畫面，讓人怕錯過熱鬧而主動跳上車，適合大團與好玩的活動",
        "零負擔邀請型：把決定成本降到最低（我都安排好你只要出現），消除「好麻煩」的拒絕慣性，適合懶人朋友圈",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '超會揪團的社群號召人' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁開放式空問句' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '揪團文+選項+追單+備案' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依對象調號召力道' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不情勒不道德綁架' },
    ],
    theory: "建立在三個學理上：其一是選擇悖論（Barry Schwartz, The Paradox of Choice）——「你們哪天有空」這種開放式問題，等於把行程規劃的決策成本丟回給對方，大腦遇到高成本決策的反射就是『等等再說』，於是已讀不回；把問題收斂成 2-3 個封閉選項（回 1 或 2），決策成本驟降，回覆率才會上來。其二是損失趨避與 FOMO（Kahneman & Tversky）——人對『錯過熱鬧』的痛感大於『參加』的吸引力，所以先秀出『已經有幾個人要去＋亮點』比單純問『要不要去』更能驅動行動。其三是社會認同（Cialdini, Social Proof）——看到別人已經答應，會大幅提高自己跳坑的意願。本咒語把『丟群組沒人理』翻譯成一則低決策成本、有畫面、有從眾動力、好回覆的揪團邀請。",
    generate: (inputs: any) => `你是一位超會揪團的「揪咖」兼社群活動號召人，揪過無數次出遊、聚餐、開黑、桌遊、看展，最懂為什麼有些揪團訊息丟進群組石沉大海、有些卻三分鐘就湊滿人。\n\n你的信條：「揪不到人通常不是朋友冷淡，是你把『要不要去』問成了『幫我規劃行程』——好揪的團，都是讓人不用動腦就能回一個字。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我想揪一個團但很怕又揪不起來，請依我的情況幫我寫一則可以直接貼群組的揪團訊息。\n- 要揪的活動：[[${inputs.activity}]]\n- 想揪的對象：[[${inputs.targets}]]\n- 已知的時間地點預算：[[${inputs.details}]]\n- 以前揪人卡在哪：[[${inputs.problem}]]\n\n請輸出：\n① 【揪團主文】一則可以直接複製貼 LINE/IG 群組的揪團訊息，80 字內，包含「一句抓人的開場 → 亮點或畫面 → 明確時間地點 → 一個好回覆的封閉式 CTA」，短句分行、口語有溫度\n② 【封閉式選項】把「你哪天有空」改寫成可以直接回的 2-3 個具體選項（例：A 6/28(六)晚、B 6/29(日)午，可以的回代號或 +1）\n③ 【已讀追單句】貼出去 24 小時沒人回時，補的一句不討人厭的追單，30 字內\n④ 【冷場備案】如果還是揪不到人，縮小規模或改方案的 B 計畫，1-2 句\n⑤ 【揪團心法】一句提醒，20 字內\n\n【規則】\n1. 格式：全程口語繁體中文、台灣用語，可直接複製貼群組；主文短句分行，結尾一定是一個「不用想就能回」的封閉式 CTA。\n2. 嚴禁使用：「有人要去嗎」「再看看」「都可以」「不一定」「看大家」這類開放式空問句，以及「拜託啦」「都沒人理我」「給個面子」這種討拍或情勒語——它們正是已讀不回的元兇。\n3. 運用選擇悖論收斂決策＋FOMO（損失趨避）與社會認同：把開放問題改成封閉選項降低決策成本，並用「已經有幾人要去＋亮點畫面」製造怕錯過的從眾動力。\n4. 語氣像「揪咖在揪一場好玩的事」——熱情、輕鬆、有畫面感，但絕不情緒勒索、不道德綁架（不准出現「不來就是不給面子」「你都不參加」這類）。\n5. 驗證測試：把主文丟進群組，對方不用認真想就能在 5 秒內回「1」或「+1」——如果還需要對方花心思想「哪天好」「要不要」，代表太開放了，重寫成更明確的封閉式邀請。`
  },

  // ━━━ 🔵 中階咒術 | 創業/自媒體 | Free ━━━
  {
    id: "festival_promo_alchemy",
    tab: "創業/自媒體",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "促銷貼文 + 標題 + 限動 + CTA",
    icon: <Tag className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "檔期煉金：節慶促銷術",
    desc: "母親節、雙11、週年慶、過年檔期到了，老闆要你發一篇促銷貼文衝買氣，你卻只擠得出「快來買！全面優惠！錯過再等一年！」這種沒人會點的空泛叫賣？節慶文案賣的從來不是折扣本身，而是「現在不買會錯過」的那個具體理由。這咒語依你的檔期、賣的東西、優惠內容與客群調性，幫你生出一篇可以直接發 IG/FB 的促銷貼文：用 AIDA 結構先抓眼、帶出價值、放大渴望、收在明確催單，外加三選一吸睛標題、限時動態超短版與行動呼籲，並守住廣告法不誇大，讓貼文不只被看見，還真的有人下單。",
    tags: ["節慶行銷", "促銷文案", "檔期貼文"],
    fields: [
      { id: "festival", label: "哪個檔期／節慶", placeholder: "例：母親節 / 雙11 / 週年慶 / 過年 / 端午 / 自訂的會員日" },
      { id: "product", label: "你賣什麼／品牌", placeholder: "例：手作甜點 / 服飾選物店 / 線上課程 / 巷口餐廳 / 保養品" },
      { id: "offer", label: "這次的優惠或活動", placeholder: "例：滿千折百 / 第二件半價 / 限量禮盒 / 限時 48 小時 / 加贈小物" },
      { id: "vibe", label: "客群與想要的調性", placeholder: "例：媽媽族群走溫馨 / 年輕人走熱血搶購 / 質感品牌不想太叫賣" },
    ],
    tweak: {
      id: "strat",
      label: "促銷策略",
      options: [
        "情感故事型：用節慶的共同情感記憶切入（媽媽的味道、團圓的桌、畢業的那年），先打動再帶到優惠，適合溫馨節慶",
        "限時急迫型：主打倒數、限量、秒殺，用稀缺感把猶豫逼成立刻下單，適合雙11、週年慶等搶購大檔",
        "質感選物型：弱化叫賣、放大心意與品味，用「送對的人對的東西」包裝優惠，適合精品或不想太促銷的品牌",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '電商節慶檔期文案操盤手' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁空泛叫賣套語' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '貼文+標題+限動+CTA' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依節慶客群調語氣' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不誇大不踩廣告法' },
    ],
    theory: "建立在三個學理上：其一是 AIDA 文案模型（Attention 抓注意 → Interest 引興趣 → Desire 放大渴望 → Action 促成行動）——一篇會賣的促銷貼文不是把優惠喊出來就好，而要先用一句抓住眼球，再讓人覺得跟自己有關、想要，最後給一個非現在不可的行動指令，本咒語強制文案走完這四步。其二是稀缺原則（Cialdini, Scarcity）與損失趨避（Kahneman & Tversky）——「限時 48 小時」「限量 30 組」之所以有效，是因為人對『即將失去機會』的痛感大於『得到優惠』的快感，所以節慶文案一定要有明確的期限與數量。其三是情感記憶與節慶 nostalgia——節慶之所以好做行銷，是它自帶共同情感（母親的味道、團圓、感謝），用故事連結記憶再帶到商品，比純喊折扣更能打動人。本咒語把『只會喊快來買』翻譯成一篇有結構、有渴望、有急迫感又不誇大的節慶促銷文。",
    generate: (inputs: any) => `你是一位操盤過上百檔節慶活動的電商暨社群文案操盤手，從母親節、雙11 到週年慶、過年都做過，最懂怎麼把一個檔期優惠寫成『會被分享、會被點進去、會真的有人下單』的貼文。\n\n你的信條：「節慶文案賣的不是折扣，是『現在不買會錯過』的那個具體理由——喊『快來買』沒用，給人一個非現在不可的畫面才有用。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n檔期到了，我要發一篇促銷貼文衝買氣，請依我的情況幫我寫出可以直接發的內容。\n- 檔期／節慶：[[${inputs.festival}]]\n- 我賣的東西／品牌：[[${inputs.product}]]\n- 這次的優惠或活動：[[${inputs.offer}]]\n- 客群與想要的調性：[[${inputs.vibe}]]\n\n請輸出：\n① 【主推貼文】一篇可以直接發 IG/FB 的促銷貼文，150 字內，依 AIDA 結構走（抓眼開場 → 帶出價值 → 放大渴望 → 明確 CTA），段落分行好讀，含 1-2 個合適 emoji 與 3-5 個 hashtag\n② 【標題三選一】3 個吸睛開頭句讓我挑（情感型／急迫型／優惠直球型），各 25 字內\n③ 【限動短版】限時動態用的超短版＋一句讓人想點的互動問句，40 字內\n④ 【行動呼籲 CTA】2 句明確催單，要講清楚「怎麼買、優惠到什麼時候」，各 25 字內\n⑤ 【一句操盤提醒】這檔最該守住的重點，20 字內\n\n【規則】\n1. 格式：全程繁體中文、台灣用語，可直接複製發 IG/FB；主文分行好讀、含適量 emoji 與 hashtag，結尾一定有明確 CTA 與優惠期限。\n2. 嚴禁空泛叫賣套語——「快來買」「不買可惜」「全面優惠」「錯過再等一年」「手刀搶購」這類沒資訊的喊話，以及「最便宜」「第一」「絕對」「保證」等誇大或踩廣告法的字眼一律不准，每句都要有具體的理由、數字或畫面。\n3. 運用 AIDA 結構＋稀缺原則與損失趨避：先抓注意，再用節慶情感或具體數字放大渴望，最後用「限時／限量＋明確期限」把猶豫逼成行動。\n4. 語氣依客群與調性調整：溫馨節慶走真誠有溫度、搶購大檔走熱血有節奏、質感品牌走低調有品味——但都不過度浮誇、不像詐騙廣告。\n5. 驗證測試：把貼文當成一般滑手機的消費者來讀——要能在 3 秒內看懂「賣什麼、現在買的好處、優惠到什麼時候」並產生「想點進去看」的衝動才算過；若通篇形容詞、看完不知道要幹嘛或沒寫優惠期限，就重寫得更具體。`
  },

  // ━━━ 🔵 中階秘術 | 人際擋箭 | Free ━━━
  {
    id: "troll_comeback_forge",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "defense" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "情緒解讀 + 多版回應 + 底線提醒",
    icon: <ShieldAlert className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "酸民結界：留言反擊術",
    desc: "在 IG、Threads、Dcard 發個文、留個言，就被酸民人身攻擊、陰陽怪氣、惡意造謠，當下氣到手抖——回嗆怕顯得自己也很 LOW、惱羞玻璃心，不回又委屈一整天卡在心裡？被酸的當下最難的不是想到怎麼回，是先讓自己冷靜。這咒語先幫你拆穿那則留言背後的動機、把情緒降下來，再依對方是誰、你想要的效果，生成幽默、理性、冷處理三種可直接複製貼上的回應，並提醒你公開留言真正的觀眾是圍觀的人、不是酸民本人，讓你回得有格局、贏在旁觀者眼裡；對方若升級成造謠或人身攻擊，也教你怎麼設界線、保存證據。",
    tags: ["酸民留言", "留言回應", "情緒防禦"],
    fields: [
      { id: "situation", label: "被攻擊的情境與平台", placeholder: "例：IG 發穿搭照被嫌胖 / Threads 講個觀點被圍剿 / Dcard 貼文被酸" },
      { id: "comment", label: "對方留言的內容", placeholder: "例：『這也敢 PO』『一看就很假』『沒料還愛講』" },
      { id: "relationship", label: "對方是誰／你想維持的關係", placeholder: "例：完全陌生的酸民 / 認識的同學 / 同溫層裡的人不想撕破臉" },
      { id: "goal", label: "你想達到的效果", placeholder: "例：幽默化解讓人笑 / 理性回一句就好 / 劃清界線後不再理 / 讓圍觀的人站我這邊" },
    ],
    tweak: {
      id: "strat",
      label: "回應策略",
      options: [
        "高 EQ 幽默型：用自嘲或機智把攻擊輕輕接住，化解尷尬還讓圍觀的人站你這邊",
        "理性降溫型：不被激怒、就事論事，把人身攻擊拉回事實，顯得你格局比對方高一截",
        "冷處理設界型：不戀戰，一句劃清界線後抽身，不給對方繼續糾纏的養分與舞台",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '公關與諮商雙修回應教練' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依對象與目的選回應路線' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '情緒解讀+三版回應+底線' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁對罵升級與情緒外洩' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '嚴重攻擊建議檢舉存證' },
    ],
    theory: "基於情緒 ABC 理論（Ellis）與『公開回應的真正觀眾是旁觀者』原理：被酸的當下讓你痛的，其實不是那則留言本身（A），而是你腦中『他在羞辱我、我必須贏回來』的自動詮釋（B），才引發了憤怒與失控（C）。本咒語先幫你拆掉這個詮釋、把情緒降下來，再提醒你——公開留言的戰場上，真正在看的是沉默的圍觀者，不是酸民本人；所以回應的目標從來不是『嗆贏對方』，而是讓旁觀者覺得『你有格局、他很難看』。面對純惡意的酸民則改用灰岩策略（Grey Rock），不餵情緒、不戀戰，讓對方失去攻擊的樂趣自己退場。",
    generate: (inputs: any) => `你是一位同時受過網路社群公關與心理諮商訓練的回應教練，看過上萬則惡意留言，最懂被酸的人當下有多想回嗆、也最清楚『回嗆贏了一時、輸了格局』的代價。\n\n你的信條：「公開留言的戰場上，真正在看的是沉默的圍觀者，不是酸你的那個人——你不是要嗆贏他，是要讓旁觀者覺得你贏在格局。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我在網路上被酸了，氣到不知道怎麼回，請幫我拆解並擬好回應。\n- 被攻擊的情境與平台：[[${inputs.situation}]]\n- 對方留言的內容：[[${inputs.comment}]]\n- 對方是誰／我想維持的關係：[[${inputs.relationship}]]\n- 我想達到的效果：[[${inputs.goal}]]\n\n請輸出：\n① 【情緒解讀】先用一句拆穿對方這則留言背後的動機，以及我為什麼不必當真，40 字內\n② 【三版回應】給 3 個可直接複製貼上的回應（幽默化解版／理性降溫版／冷處理設界版），各 50 字內，每版標明適用情境\n③ 【最佳推薦】依我的狀況指出最該用哪一版、為什麼，一句話\n④ 【底線提醒】若對方升級成造謠、人身攻擊或騷擾，該怎麼設界線、保存截圖存證或檢舉，列 2 點\n\n【規則】\n1. 格式：全程繁體中文、台灣口語，三版回應都要能直接複製貼到 IG／Threads／Dcard 留言框，不超過字數。\n2. 嚴禁回敬人身攻擊、辱罵、髒話、「你才⋯⋯」這類對罵升級的句子，也不准寫出讓我看起來惱羞、玻璃心、情緒失控或在討拍的回應。\n3. 運用情緒 ABC 與旁觀者原理：每個回應都是寫給『圍觀的人』看的，目標是讓旁觀者站我這邊，不是說服或激怒酸民。\n4. 語氣：穩、有餘裕，像一個被酸也不痛不癢的成熟大人，可以幽默但不刻薄、可以堅定但不暴怒。\n5. 驗證測試：把每個回應念給一個『中立的旁觀者』聽——要讓他覺得我贏在格局、對方很難看才算過；若聽起來像在生氣、在求認同、或跟對方一樣難看，就重寫。`
  },

  // ━━━ 🟣 高階魔導 | 職場求生 | Free ━━━
  {
    id: "salary_negotiation_forge",
    tab: "職場求生",
    isPro: false,
    tier: "master",
    school: "contract" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "數字區間 + 開口腳本 + 接招話術",
    icon: <Handshake className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "談薪煉金：薪水爭取術",
    desc: "面試被問『期望薪資多少』就慌張報低、深怕喊太高被刷掉；好不容易拿到 offer，明明覺得可以再爭取，卻不敢開口、怕得罪人資把錄取吹了，最後乖乖簽下去、上工才後悔少領好幾萬？談薪不是貪心，是『你值多少』的最後一關，而最會輸的人都輸在太早把數字講死、手上又沒有可信的籌碼。這咒語依你的職位、行情、籌碼與底線，幫你算好該喊的數字區間，生成面試報期望薪資不亮底牌的說法、拿到 offer 後爭取加碼的 email／對話腳本，連被壓價時怎麼接、加不了錢還能改要哪些條件都備好，讓你不再因為不敢談而把自己賣便宜。",
    tags: ["談薪水", "Offer議價", "求職轉職"],
    fields: [
      { id: "role", label: "你的職位與經歷年資", placeholder: "例：3 年行銷企劃應徵資深專員 / 應屆生找後端工程師" },
      { id: "stage", label: "你在哪個階段", placeholder: "例：面試被問期望薪資 / 已拿到 offer 想爭取加碼 / 在職想談調薪" },
      { id: "market", label: "行情與你打聽到的數字", placeholder: "例：104 寫 4.5～6 萬 / Dcard 前輩說這職位約 5.5 萬" },
      { id: "leverage", label: "你手上的籌碼", placeholder: "例：手上還有另一家 offer / 有稀缺技能 / 帶過得獎專案 / 公司很急著補人" },
      { id: "target", label: "你的目標數字與底線", placeholder: "例：理想 6 萬、底線 5.3 萬，低於就不去" },
    ],
    tweak: {
      id: "strat",
      label: "談薪策略",
      options: [
        "行情錨定型：用市場行情與同業數字當錨，把談判框成『回到這職位該有的價碼』，理直氣壯不像獅子大開口",
        "價值堆疊型：先把你能帶來的具體成果攤開，讓加薪變成『划算的投資報酬』，而不是『你想多要』",
        "雙 Offer 槓桿型：手上有其他選擇時，不威脅、不攤牌，但讓對方知道你有得選，逼出檯面下的加碼空間",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '談過上百次薪資的獵頭顧問' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依階段與籌碼選談法' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '數字區間+腳本+接招+備案' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '禁先亮底牌與情緒喊價' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不浮報經歷與毀諾風險' },
    ],
    theory: "建立在錨定效應（Anchoring）、BATNA（最佳替代方案）與資訊不對稱之上：談薪的人最常輸在兩件事——太早把『期望數字』講出口（先亮底牌，等於讓對方把你錨定在你自己喊的低標），以及手上沒有可信的 BATNA（沒有別的選擇，就只能照單全收）。本咒語幫你把錨點設在『市場行情或你能帶來的價值』而非自己的舊薪水，並把『你有其他選擇／你帶得來的成果』包裝成可信的籌碼，讓對方重新評估『不加碼可能會失去你』。談薪的本質從來不是討價還價拉鋸，而是讓對方把你的價值錨點往上移；當對方覺得你值這個價、加了不會跑、不加可能會跑，數字自然就上來了。",
    generate: (inputs: any) => `你是一位替數百位求職者談過薪資的資深獵頭顧問，最清楚人資的核薪權限到哪、哪些籌碼真的有用、哪種開口方式會把到手的 offer 談丟。\n\n你的信條：「先把數字講死的人先輸——薪水不是你敢不敢要，是你會不會把它框成『你值這個價』。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要談薪水，請依我的情況幫我算好數字、擬好開口的腳本與接招方式。\n- 我的職位與經歷年資：[[${inputs.role}]]\n- 我在哪個階段：[[${inputs.stage}]]\n- 行情與我打聽到的數字：[[${inputs.market}]]\n- 我手上的籌碼：[[${inputs.leverage}]]\n- 我的目標數字與底線：[[${inputs.target}]]\n\n請輸出：\n① 【該喊的數字區間】依行情與我的籌碼，給一個有底氣又不會嚇跑對方的數字區間，並附一句報這數字的理由，40 字內\n② 【開口腳本】依我的階段給一段可直接用的說法——面試版（回答期望薪資但不先亮底牌）或 offer 版（爭取加碼的 email／對話逐字稿），150 字內，口語好念\n③ 【被壓價接招】當對方說『預算就這樣／公司制度沒辦法』時，給 2 句不撕破臉又守住價碼的回應\n④ 【保留方案】若對方真的加不了底薪，可以改爭取的 3 個替代條件（簽約金、調薪時程、頭銜、遠端、特休等）\n⑤ 【一句底線提醒】簽約前一定要白紙黑字確認的事，20 字內\n\n【規則】\n1. 格式：全程繁體中文、台灣職場用語，腳本要口語、可直接照念或複製成 email，分段好讀。\n2. 嚴禁：主動先把『期望數字』講死當開場、拿辭職或別家 offer 做空威脅、情緒化喊價或哀求（如「我真的很需要這份薪水」），以及辱罵或貶低公司的字眼。\n3. 運用錨定效應與 BATNA：把錨點設在市場行情或我的價值、而非我的舊薪水；把籌碼講得可信但不威脅、不攤牌。\n4. 語氣：像一個清楚自己市場價、不卑不亢、談完還留得住關係的專業工作者——有底氣、不貪婪、不討好。\n5. 驗證測試：把腳本念給人資聽，要讓對方覺得『這人值得加、加了不會跑、不加可能會跑』才算過；若聽起來像獅子大開口、像在哀求、或像在威脅，就重寫。本內容僅供協商參考，實際薪資、職等與條件以雙方正式合約為準。`
  },
  {
    id: "info_digest_forge",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "一句話TL;DR + 分點重點 + 金句 + 待辦 + 轉發版",
    icon: <ListChecks className="w-8 h-8 text-indigo-500" />,
    color: "indigo",
    title: "懶人包煉成：長文摘要術",
    desc: "存了一堆文章、影片、PDF 說要看，結果越積越多，落落長的內容根本沒時間消化，想分享給朋友或寫進筆記又抓不到重點？這咒語當你的私人重點整理師，把你貼上的長文章、影片逐字稿、會議資料、新聞或產品條款，濃縮成一份秒懂懶人包——先用一句話講完全文在說什麼，再分點抓出關鍵重點、值得收藏的金句或數據，以及你看完該採取的行動，連可以直接轉發群組的精簡版都備好。不是把字數砍短就好，而是用『結論先行』的方式重新排序，讓沒看過原文的人也能在 30 秒內抓到重點，再也不用為了讀完一篇東西耗掉整個下午。",
    tags: ["重點整理", "懶人包", "資訊過載"],
    fields: [
      { id: "content", label: "要摘要的內容", placeholder: "直接貼上整篇文章／影片逐字稿／報告／長訊息；太長可先貼最重要的段落" },
      { id: "ctype", label: "這是什麼類型的內容", placeholder: "例：新聞報導 / YouTube 逐字稿 / PDF 報告 / 合約條款 / 一長串群組對話" },
      { id: "purpose", label: "你摘要它的目的", placeholder: "例：自己做筆記 / 轉發給家人朋友 / 寫進報告 / 快速判斷要不要花時間細看" },
      { id: "depth", label: "想要多濃縮", placeholder: "例：30 秒掃過知道大概 / 3 分鐘抓住重點 / 完整重點一個都別漏" },
    ],
    tweak: {
      id: "strat",
      label: "摘要風格",
      options: [
        "極速懶人包型：砍到只剩骨架，30 秒掃完就能跟人聊上幾句，適合資訊太多、只想先知道個大概再決定要不要深入",
        "結構筆記型：分層分點＋小標索引，像一張能直接收藏的知識卡，適合要存進筆記、複習或貼進報告",
        "觀點提煉型：除了講內容，還幫你點出作者的立場、可能的盲點與值得思考之處，適合要寫心得或判斷內容可不可信",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '萃取重點的資深編輯' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依目的與深度調整濃縮度' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: 'TL;DR+重點+金句+待辦' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '只濃縮不腦補不加料' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不杜撰原文沒有的內容' },
    ],
    theory: "建立在金字塔原理（Pyramid Principle，結論先行）與認知負荷理論（Cognitive Load Theory）之上：人腦的工作記憶一次裝不下太多資訊，落落長的內容讓人讀完什麼都沒記住，不是你不專心，是資訊沒有被『整理過』。本咒語先用一句話給出全文結論（讓你的大腦先有掛東西的鉤子），再由上而下分層展開重點，把最關鍵的放最前面（漸進式揭露 progressive disclosure），讓你依需要決定要看多深。好的摘要不是把字數砍短，而是重新排序資訊的優先級——當結論先到、細節分層，沒看過原文的人也能在最短時間內抓到全貌，這正是濃縮的本質。",
    generate: (inputs: any) => `你是一位專門幫忙萃取重點的資深編輯，每天要把成堆的長文、報告與逐字稿濃縮成主管與讀者一眼就懂的摘要，最擅長把雜亂冗長的內容重新排序、去蕪存菁。\n\n你的信條：「摘要不是把字數砍短，是把最重要的放到最前面——讓沒看過原文的人也能秒懂。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請把以下內容濃縮成一份秒懂懶人包。\n- 要摘要的內容：[[${inputs.content}]]\n- 內容類型：[[${inputs.ctype}]]\n- 我摘要它的目的：[[${inputs.purpose}]]\n- 想要的濃縮程度：[[${inputs.depth}]]\n\n請輸出：\n① 【一句話 TL;DR】用一句話講完整篇到底在說什麼，40 字內\n② 【關鍵重點】依重要性由高到低，分 3～7 點，每點一句話講清楚，重要的放前面\n③ 【金句／關鍵數據】從原文摘錄最值得記住的 1～3 句話或數字，必須忠於原文、不可改寫竄改；若原文沒有就略過此項\n④ 【看完該做什麼】依我的目的，給 2～3 個可採取的行動或值得延伸思考的點\n⑤ 【可轉發精簡版】100 字內、可直接複製貼 LINE／IG 群組的版本，讓朋友不用點開原文也看得懂\n\n【規則】\n1. 格式：全程繁體中文、台灣用語，分點清楚好掃讀，第⑤項要能直接複製轉發。\n2. 嚴禁：杜撰原文沒提到的內容、補進你自己的事實或數據、用「總而言之／綜上所述／在當今這個時代／隨著科技進步」這類空話套話、把摘要寫得比原文還長。\n3. 運用金字塔原理與認知負荷理論：結論先行、由重要到次要分層展開，讓人依需要決定看多深。\n4. 語氣：像一個幫你把厚厚資料畫好重點的能幹助理——精準、白話、不囉嗦。\n5. 驗證測試：把摘要遮住原文念一遍，要讓沒看過原文的人也能抓到全文重點與結論才算過；若出現原文沒有的資訊、或讀完還是不知道在講什麼，就重寫。若提供的內容不足、矛盾或無法判讀，直接說明缺什麼、不要硬掰。`
  },
  {
    id: "translate_polish_forge",
    tab: "校園生存",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "illusion" as SchoolType,
    outputFormat: "道地譯文 + 在地化說明 + 替代句 + 詞彙對照",
    icon: <Languages className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "譯文煉成：翻譯潤色術",
    desc: "報告要附英文摘要、想私訊國外賣家、留學文件要交、IG 想發雙語貼文——丟進 Google 翻譯出來卻一看就是機器翻的，生硬、不道地、語氣不對，傳出去怕貽笑大方？這咒語當你的母語級雙語譯者，把你給的任何文字翻成目標語言，而且不是逐字硬翻，是依場合（學術／商務／口語／社群）調整語氣與用字，翻得像當地人自己寫的。除了可直接複製的主譯文，還附上『為什麼這樣翻』的在地化說明、更正式或更口語的替代說法、和關鍵術語的中外對照，讓你不只拿到譯文，還知道怎麼用對。",
    tags: ["翻譯", "潤稿", "在地化"],
    fields: [
      { id: "source", label: "要翻譯的原文", placeholder: "直接貼上要翻譯的文字（中翻外或外翻中都可）" },
      { id: "pair", label: "翻譯方向", placeholder: "例：中翻英 / 英翻中 / 中翻日 / 日翻中" },
      { id: "context", label: "用途與場景", placeholder: "例：學術報告摘要 / 商務 email / IG 貼文 / 跟客服口語對話 / 履歷自傳" },
      { id: "tone", label: "想要的語氣與風格", placeholder: "例：正式專業 / 自然口語 / 禮貌客氣 / 活潑有行銷感" },
    ],
    tweak: {
      id: "strat",
      label: "翻譯策略",
      options: [
        "道地在地化型：不逐字直譯，改用母語人士真的會用的說法與文化慣例，讀起來像當地人自己寫的，適合貼文、自我介紹、生活對話",
        "精準對照型：忠於原意、術語精準，並附關鍵詞中外對照，適合學術摘要、合約條款、技術文件這種一個字都不能錯的場合",
        "語氣改寫型：在翻譯的同時依場合調整正式度與口吻，讓同一句話在 email、貼文、口說各有最合適的版本，適合不確定該多正式時",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '母語級雙語譯者' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依文體場合選翻法' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '譯文+在地化說明+替代句' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '不漏譯不加譯不殘留' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不竄改原意與數字人名' },
    ],
    theory: "建立在奈達（Nida）的動態對等（Dynamic Equivalence）與語用學的語域（Register）理論之上：好的翻譯從來不是逐字對應，而是讓目標語言的讀者讀完，產生和原文讀者相同的反應與感受。逐字直譯之所以一看就『很 Google 翻譯』，是因為它只對到字、沒對到語感與文化脈絡。本咒語先判斷你的使用場景與語域（學術／商務／社群／口語各有不同的正式度與慣用語），再以『目標讀者讀起來的感受』為準重新表達——該道地時道地、該精準時精準、該客氣時客氣，讓譯文擺脫翻譯腔，像母語人士親手寫的。",
    generate: (inputs: any) => `你是一位在當地生活多年的母語級雙語譯者，同時精通學術、商務與社群不同文體的語感，最痛恨『一看就知道是機器翻的』生硬譯文，總能把任何文字翻得像當地人自己寫的。\n\n你的信條：「翻譯不是把字換成另一種語言，是讓對方讀起來的感受跟原文一模一樣。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請把以下原文翻成目標語言，並依場合潤色到可以直接使用。\n- 要翻譯的原文：[[${inputs.source}]]\n- 翻譯方向：[[${inputs.pair}]]\n- 用途與場景：[[${inputs.context}]]\n- 想要的語氣與風格：[[${inputs.tone}]]\n\n請輸出：\n① 【主譯文】依場景與語氣翻好、可直接複製使用的版本，獨立成段\n② 【在地化說明】用繁體中文說明你為什麼這樣翻、哪裡為了道地或語氣做了調整，50 字內\n③ 【替代說法】給 1～2 個不同正式度的版本（更正式／更口語），方便我依對象挑選\n④ 【關鍵詞對照】若原文有專有名詞、術語或容易誤譯的字，列出中外對照，最多 5 組；沒有就略過\n⑤ 【一句提醒】若原文有歧義、文化雷或可能造成誤會之處，標出來提醒我，20 字內\n\n【規則】\n1. 格式：第①項主譯文整段使用指定的目標語言、可直接複製，其餘說明與對照用繁體中文分開列。\n2. 嚴禁：漏譯或自行增添原文沒有的句子、竄改數字日期人名地名、逐字硬翻出生硬的翻譯腔、在譯文裡留下沒翻完的原文殘留。\n3. 運用動態對等與語域理論：以『目標讀者讀起來的感受』為準，依場合調整正式度與慣用語，不只對字、要對到語感。\n4. 語氣：像一個在當地生活多年的雙語譯者——道地、自然，該正式時正式、該親切時親切。\n5. 驗證測試：把主譯文念給目標語言的母語者聽，要讓對方覺得『像母語人士自己寫的』、且意思與原文完全一致才算過；若讀起來生硬、有翻譯腔、或意思跑掉，就重寫。翻譯結果僅供參考，正式合約、法律或證件文件請再經專業審校。`
  },

  // ━━━ 🟣 高階禁咒 | 創業/自媒體 | Free ━━━
  {
    id: "ai_video_prompt_forge",
    tab: "創業/自媒體",
    isPro: false,
    tier: "master",
    school: "illusion" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "AI影片生成提示詞",
    icon: <Clapperboard className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "生片召喚：AI影片咒語術",
    desc: "想用 Veo、可靈生 AI 影片，卻只會打『一隻貓』、出來的片很爛？把你的點子翻成含運鏡、光線、節奏的專業提示詞，一鍵生出有電影感的短片。（Sora 已停止服務，本咒以現役主流模型為準）",
    tags: ["AI影片", "提示詞", "短影音"],
    fields: [
      { id: "idea", label: "想拍的畫面或故事", placeholder: "例：太空人在櫻花樹下喝咖啡 / 商品從天而降慢動作落地" },
      { id: "platform", label: "要用哪個工具", placeholder: "例：Veo / 可靈Kling / 剪映CapCut / Runway / 海螺" },
      { id: "vibe", label: "想要的風格氛圍", placeholder: "例：電影感 / 賽博龐克 / 日系清新 / 復古膠片" },
      { id: "usage", label: "用途與時長", placeholder: "例：IG Reels 15秒 / 商品廣告 / 開場動畫" },
    ],
    tweak: {
      id: "strat",
      label: "運鏡策略",
      options: [
        "電影運鏡型：用推軌、空拍、慢動作等專業分鏡語言堆出大片質感，適合想要驚豔開場或廣告",
        "真實紀錄型：強調自然光、手持感與生活細節，讓畫面像隨手拍卻很美，適合 vlog、商品情境",
        "超現實創意型：放大想像力做出現實拍不出的奇觀畫面，最容易被瘋傳分享，適合純衝聲量",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: 'AI影片導演＋提示詞工程師' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依工具特性調語法' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '中英提示詞+運鏡參數' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '補滿鏡頭光線節奏' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '避違規與版權雷' },
    ],
    theory: "建立在電影的場面調度（mise-en-scène）與鏡頭語言之上：文生影片模型讀的從來不是你腦中的『想法』，而是你寫下的『鏡頭語言』——主體、動作、景別、運鏡、光線、風格。一句『一隻貓很可愛』之所以生出爛片，是因為模型無從得知鏡頭怎麼動、光從哪來、節奏多快。本咒語把你的點子拆解成一連串可被模型解讀的具體視覺指令，像導演下分鏡那樣交代清楚，模型才生得出有設計感、有電影感的畫面。",
    generate: (inputs: any) => `你是一位專拍社群短影音的 AI 影片導演兼提示詞工程師，熟悉 Veo、可靈、海螺、Runway 等主流文生影片模型各自吃哪種語法，最痛恨『一句話丟進去生出一坨爛片』。你深知模型讀的不是你的「想法」，是你給的「鏡頭語言」。\n\n你的信條：「影片好不好，決定在你有沒有把鏡頭、光線、動作講清楚。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請把我的點子翻成一段專業、可直接貼進工具的 AI 影片生成提示詞。\n- 想拍的畫面或故事：[[${inputs.idea}]]\n- 要用的工具：[[${inputs.platform}]]\n- 想要的風格氛圍：[[${inputs.vibe}]]\n- 用途與時長：[[${inputs.usage}]]\n\n請輸出：\n① 【主提示詞 Prompt】以英文為主、可直接複製貼進工具的完整提示詞，依序含主體＋動作＋場景＋運鏡＋光線＋風格，80～120 字\n② 【中文對照】上段的繁體中文翻譯，並用一句說明為什麼這樣下關鍵詞，60 字內\n③ 【運鏡與參數建議】鏡頭運動、畫面比例（如 9:16）、時長與節奏建議，條列 3～4 點\n④ 【3 個變體關鍵詞】想換風格時可替換的關鍵詞組，方便你 A/B 測哪個版本最吸睛\n⑤ 【一句避雷提醒】可能違規或生不出來的點（名人臉、商標 logo、畫面內文字、即時新聞事件），20 字內\n\n【規則】\n1. 格式：第①項主提示詞用英文、可直接複製，其餘說明用繁體中文分項列出，不要全部混成一段。\n2. 嚴禁：只寫『a beautiful video』『high quality』這種沒有鏡頭資訊的空泛詞、把所有元素塞成沒有先後的一長串、用中文寫主提示詞卻沒附對照。\n3. 運用電影的場面調度（mise-en-scène）與鏡頭語言：明確交代鏡頭運動、景別、光線方向與氛圍，模型才生得出有設計感的畫面。\n4. 語氣：像一位給分鏡指令的導演——精準、具體、有畫面感，不是文藝抒情。\n5. 驗證測試：把主提示詞中的每個關鍵詞檢查一遍，要能對應到畫面上一個看得見的元素（主體、動作、鏡頭、光線、風格缺一不可）才算過；若有任何一句是抽象形容詞、無法轉成畫面，就刪掉重寫。AI 生成結果僅供參考，商用前請確認無侵權與平台規範問題。`
  },

  // ━━━ 🔵 中階秘術 | 生活娛樂 | Free ━━━
  {
    id: "travel_post_forge",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "旅遊貼文/限動文案",
    icon: <Camera className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "遊記召喚：旅遊打卡文術",
    desc: "出去玩回來相簿幾百張，發限動卻只會配『好玩💕』？把你的行程亮點變成有畫面、有故事、會被按讚收藏的旅遊貼文，IG／Threads／FB 一鍵生好。",
    tags: ["旅遊貼文", "IG限動文案", "打卡"],
    fields: [
      { id: "spot", label: "去哪裡玩", placeholder: "例：花蓮三天兩夜 / 京都嵐山一日遊" },
      { id: "highlight", label: "最難忘的亮點", placeholder: "例：海邊看日出 / 吃到爆好吃的拉麵 / 跟朋友迷路超好笑" },
      { id: "mood", label: "想傳達的心情", placeholder: "例：放鬆療癒 / 興奮冒險 / 閨蜜情誼" },
      { id: "platform", label: "要發在哪", placeholder: "例：IG限動 / IG貼文 / Threads / FB" },
    ],
    tweak: {
      id: "strat",
      label: "貼文策略",
      options: [
        "情感故事型：用一個小故事或心情切入，讓人想看完並留言，適合想要互動與共鳴",
        "攻略乾貨型：順手帶出交通、價位、必點等實用資訊，讓人想收藏轉發，適合衝觸及",
        "文青短句型：走極簡氛圍感、金句配美照，適合限動與走質感路線的版面",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '旅遊KOL文案寫手' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依平台調篇幅口吻' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '主文+標籤+限動短句' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '避免罐頭流水帳' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不外洩定位行程隱私' },
    ],
    theory: "建立在 Kahneman 的峰終定律（Peak-End Rule）與敘事傳輸理論（Narrative Transportation）之上：人對一段旅程的記憶，由『最高峰』與『結尾』兩個瞬間決定，而非平均每一站。所以一篇會被按讚收藏的旅遊貼文，關鍵不在你去了多遠、走了幾個點，而在有沒有鎖定那個最難忘的瞬間放大、把當下的感受傳染給讀者。流水帳式『早上去A中午去B』之所以沒人看，正是因為它平均用力、沒有峰、也沒有把人帶進你的感受裡。本咒語先抓出你的亮點瞬間，再依 2026 社群演算法（前兩行抓人、不過量堆標籤、重真實人味與私訊互動）寫成貼文。",
    generate: (inputs: any) => `你是一位專寫旅遊貼文的社群文案寫手，操盤過上百篇破萬讚的遊記與限動，熟悉 2026 年 IG／Threads 演算法——你知道前兩行沒抓住人就會被滑掉、狂塞 hashtag 會被判垃圾訊息降權、有人味的真實感才會被收藏分享。\n\n你的信條：「會被按讚的旅遊文，不是去得多遠，是有沒有把某個瞬間的感受傳給讀者。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我剛玩回來要發文，請幫我把行程亮點寫成會被按讚收藏的貼文。\n- 去哪裡玩：[[${inputs.spot}]]\n- 最難忘的亮點：[[${inputs.highlight}]]\n- 想傳達的心情：[[${inputs.mood}]]\n- 要發在哪個平台：[[${inputs.platform}]]\n\n請輸出：\n① 【主貼文】依平台篇幅寫好、可直接複製的文案（IG／FB 貼文 100～150 字、限動／Threads 50 字內），前兩行就要出現地點關鍵字並讓人想看下去\n② 【精準標籤】5～8 個中英文 hashtag，含地點＋情緒＋少量熱門通用標籤，不要過量堆疊\n③ 【限動短句版】3 句各 15 字內的氛圍短句，配照片可直接用\n④ 【互動鉤子】結尾一句引導留言或私訊詢問的話，15 字內\n⑤ 【一句提醒】發文前的隱私防雷提醒（即時定位、住宿門牌、孩童正臉），20 字內\n\n【規則】\n1. 格式：依指定平台給對應篇幅，主貼文可直接複製貼上，emoji 適量、最多每句一個。\n2. 嚴禁：『好玩』『好美』『值得』『推推』這類空泛罐頭字單獨出現、『早上去A中午去B』流水帳條列、整段複製景點官方介紹。\n3. 運用峰終定律與敘事傳輸理論：鎖定一個最高潮的瞬間放大描寫、給讀者畫面與感受，而不是把每一站都平均寫一遍。\n4. 語氣：像剛玩回來、興奮想跟朋友分享的真人口吻，不要像旅遊社的業配稿。\n5. 驗證測試：把主貼文念給沒去過的朋友聽，要讓對方冒出『哇我也想去』的衝動、而且看得出你最難忘的是哪一刻才算過；若讀起來像流水帳或罐頭文就重寫。`
  },

  // ━━━ 🟣 高階秘術 | 職場求生 | Free ━━━
  {
    id: "layoff_rights_forge",
    tab: "職場求生",
    isPro: false,
    tier: "master",
    school: "contract" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "權益試算+爭取話術+失業給付清單",
    icon: <Scale className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "討回權益：被資遣自保術",
    desc: "突然被資遣、被約談『協議離職』，腦袋一片空白只想趕快簽一簽走人？多數人不知道自己依法能拿資遣費、預告工資、特休未休折現、非自願離職證明，還能再領失業給付，白白少拿好幾個月的錢。這咒語幫你算清楚雇主到底該給你多少、生成不卑不亢的爭取訊息與索取非自願離職證明的話術，再附上失業給付申請清單，讓你就算被裁，也能體面又不吃虧地離開。",
    tags: ["資遣費", "勞工權益", "失業給付"],
    fields: [
      { id: "situation", label: "你是怎麼被資遣的", placeholder: "例：公司虧損要我走、被約談改成自願離職、口頭通知下週是最後一天" },
      { id: "tenure", label: "年資與月薪（用來估資遣費）", placeholder: "例：到職3年2個月、月薪4萬2、有沒有特休沒休完" },
      { id: "employer_offer", label: "雇主開的條件／想叫你做的", placeholder: "例：只給1個月、要我簽自願離職書、叫我馬上交接走人" },
      { id: "goal", label: "你最在意、最想爭取的", placeholder: "例：資遣費拿好拿滿、非自願離職證明、別撕破臉還想要推薦信" },
    ],
    tweak: {
      id: "strat",
      label: "爭取姿態",
      options: [
        "理性據法型：搬出勞基法條與試算數字、冷靜施壓不情緒化，適合想不撕破臉但拿好拿滿",
        "好聚好散型：語氣和緩留情面、換取資方爽快配合，適合還想要推薦信或維持業界口碑",
        "堅定維權型：態度明確不退讓、預告必要時申訴調解，適合資方擺爛或想凹你簽自願離職的硬仗",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '站你這邊的勞權顧問' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依資遣型態算該得權益' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '權益試算+爭取話術+申請清單' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '有幾分證據說幾分話' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '估算僅供參考爭議找專業' },
    ],
    theory: "建立在談判學的 BATNA（最佳替代方案）與行為經濟學『損失規避』之上：被資遣當下最大的陷阱，是資方利用你『只想趕快結束』的慌亂，把該給的權益縮水、甚至誘導你簽『自願離職』——一簽下去，資遣費與失業給付可能全部歸零。真正的自保不是吵架或求情，而是先搞清楚你的 BATNA（依法你至少該拿到什麼、不簽會怎樣），讓資方意識到『擺爛要面對勞檢調解』的損失大於『依法給足』的成本。本咒語先依你的年資與資遣型態估出你該主張的權益，再幫你把要求寫成有法源、有數字、不卑不亢的訊息；它管的是『讓你知道自己的牌、把話講到位』，不慫恿你誇大年資或捏造事實，重大爭議仍以勞工局調解與專業意見為準。",
    generate: (inputs: any) => `你是一位專門站在勞工這一邊的勞權顧問，看過太多人被資遣時慌到只想快點簽字走人，結果少拿了好幾個月的資遣費、還被話術誘導簽下『自願離職』連失業給付都領不到。你熟悉台灣勞基法的資遣費、預告工資、特休未休折現與就業保險失業給付規則。你的信條：「被資遣不是你的錯，但少拿一毛錢都是你的損失——先搞清楚你的牌，再開口。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我被資遣了，需要搞清楚自己依法能爭取什麼，並把要求講到位。\n- 我是怎麼被資遣的：[[${inputs.situation}]]\n- 年資與月薪：[[${inputs.tenure}]]\n- 雇主開的條件／想叫我做的：[[${inputs.employer_offer}]]\n- 我最想爭取的：[[${inputs.goal}]]\n\n請輸出：\n① 【權益試算】— 依我的年資與資遣型態，條列我「至少該主張」的項目（資遣費約幾個月、預告工資天數、特休未休折現、非自願離職證明），每項一句說明法源與粗估金額，開頭標註此為估算、實際以勞動部試算工具與個案為準\n② 【爭取訊息】— 一則可直接傳給主管或 HR、不卑不亢、要求依法給足並索取非自願離職證明的訊息，120 字內\n③ 【面談守則】— 3 點當面協商時要守住的底線，以及如何回應雇主常見話術（如「公司有困難」「改成自願離職對你比較好」「先簽了再說」）\n④ 【失業給付清單】— 申請失業給付的資格、需備文件與流程重點，條列 4～6 點\n⑤ 【一句提醒】— 簽任何文件前的提醒，加上「金額大或對方違法時可向當地勞工局申請調解、或洽法律扶助」的提示\n\n【規則】\n1. 格式：訊息可直接複製貼上、符合台灣職場用語稱謂得體；試算與清單用條列、數字清楚。\n2. 嚴禁：教人捏造或灌水年資薪資、使用恐嚇字眼（如「我要讓你們上新聞」「我認識誰」「給你好看」）、給空泛口號（如「加油好好爭取」「相信自己」）；金額一律標明為估算、不掛保證。\n3. 運用 BATNA 與損失規避：先講清楚我依法的底牌與不簽的後果，讓對方意識到擺爛的損失大於配合，而非靠情緒或哀求。\n4. 語氣：冷靜、有條理、有法律份量但不挑釁，像懂法又挺你的顧問，不像來吵架的。\n5. 驗證測試：想像這則訊息被主管轉給法務看，每一句要求都要站得住腳、有法源或事實依據；若出現情緒謾罵、無法舉證的指控或誇大的數字就改寫。本內容僅供參考，具體權益與金額請以勞動部規定及專業諮詢為準。`
  },

  // ━━━ 🔵 中階秘術 | 日常雜症 | Free ━━━
  {
    id: "legal_notice_forge",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "contract" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "存證信函正文+寄送指引+後續路線",
    icon: <Stamp className="w-8 h-8 text-amber-600" />,
    color: "amber",
    title: "白紙黑字：存證信函代筆術",
    desc: "錢借出去要不回、房客欠租裝死不搬、買到瑕疵商家擺爛、被人造謠想正式警告——口頭講再多都沒用，對方就是吃定你不會動真格？存證信函是有法律送達效力的『正式催告』，但多數人不知道怎麼寫，寫得情緒化或站不住腳反而扣分。這咒語幫你把糾紛寫成一封格式正確、有理有據、口氣正式的存證信函，連要寄幾份、寄去哪、收到後下一步怎麼走都幫你備好。",
    tags: ["存證信函", "債務催討", "法律自救"],
    fields: [
      { id: "dispute", label: "你遇到的糾紛（人、事、時間）", placeholder: "例：A君去年5月跟我借3萬說年底還、至今未還且已讀不回" },
      { id: "demand", label: "你要對方做什麼＋期限", placeholder: "例：7日內清償全部欠款 / 14日內搬離並付清欠租 / 限期換貨退款" },
      { id: "evidence", label: "你手上有的證據／憑證", placeholder: "例：LINE對話、轉帳紀錄、借據、租約、購買發票" },
      { id: "relationship", label: "對方是誰＋你們關係", placeholder: "例：前同事、房客、網拍賣家、鄰居（影響語氣拿捏）" },
    ],
    tweak: {
      id: "strat",
      label: "信函姿態",
      options: [
        "正式警告型：嚴正陳述事實、明列不履行的法律後果，先禮後兵但表明會走法律途徑",
        "溫和催告型：語氣留情面、以解決問題為重，適合還想維持關係或對方只是一時拖延",
        "最後通牒型：態度堅決、設明確期限與訴訟預告，適合對方擺爛已讀不回的最後一步",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '寫過上千封的法務文書手' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依糾紛類型挑該主張的點' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '存證信函正文+寄送指引' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '只陳述事實不謾罵恐嚇' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '範本僅供參考送件前核對' },
    ],
    theory: "存證信函的威力，不在用詞多兇，而在它把一場『口頭爭執』正式升級成『有書面與郵局紀錄的法律程序』——這背後是行為經濟學的『損失規避』在運作：當對方收到一封格式正確、有事實有法律主張的信，他評估的不再是『要不要還你個人情』，而是『不處理將面對訴訟、信用與金錢的損失』，而人對損失的痛感遠大於對等利益的渴望，因此正式催告往往比私下盧一百次更有效。一封站得住腳的存證信函有固定骨架：陳述事實→提出法律主張→限期要求→載明不履行的後果，環環相扣、句句可舉證。本咒語幫你依糾紛類型把這四段寫到位，避開情緒謾罵與無法舉證的指控（那只會反過來成為對方的把柄）；但存證信函本身無強制力、且個案差異大，重大或金額高的糾紛仍應諮詢律師或申請法律扶助。",
    generate: (inputs: any) => `你是一位寫過上千封存證信函的資深法務文書高手，深知一封信的份量不在罵得多兇，而在事實清楚、主張有據、句句站得住腳。你熟悉台灣存證信函的格式、催告效力與常見糾紛（借貸、租賃、買賣瑕疵、妨害名譽）的法律主張。你的信條：「能被法官看的信，才嚇得動對方——情緒越少，份量越重。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我跟人有糾紛，要寄一封存證信函正式催告對方。\n- 糾紛經過（人事時）：[[${inputs.dispute}]]\n- 我的要求與期限：[[${inputs.demand}]]\n- 我手上的證據：[[${inputs.evidence}]]\n- 對方是誰與關係：[[${inputs.relationship}]]\n\n請輸出：\n① 【存證信函正文】— 一封可直接謄寫或列印的完整正文，依「茲因…（事實陳述）→ 按…（法律主張）→ 請於…期限內…（明確要求）→ 否則…（不履行之後果）」的結構，符合台灣存證信函用語、稱謂得體\n② 【事實時間軸】— 把糾紛整理成 3～5 點條列時間軸，標明日期與對應證據，方便附件佐證\n③ 【寄送指引】— 存證信函要寫幾份（正本寄對方、副本自存、一份留郵局）、去哪寄、是否附證據影本、收件人地址要怎麼確認\n④ 【後續路線】— 對方收到後可能的反應，以及你的下一步（調解、支付命令、小額訴訟）各一句重點\n⑤ 【一句提醒】— 提醒此為參考範本、金額大或複雜糾紛建議諮詢律師或洽各地免費法律扶助\n\n【規則】\n1. 格式：正文可直接謄寫使用、用語正式符合台灣存證信函慣例；其餘區塊用條列、清楚好讀。\n2. 嚴禁：人身攻擊或謾罵字眼（如「騙子」「王八蛋」「無恥」）、恐嚇用語（如「讓你好看」「找人去處理你」「走著瞧」）、捏造不存在的事實或誇大成你無法舉證的指控。\n3. 運用催告效力與損失規避：依「事實→法律主張→限期要求→不履行後果」四段環環相扣，讓對方感到不處理的損失大於配合。\n4. 語氣：正式、冷靜、有法律份量但不情緒化，像律師事務所發出的信，而非私人吵架。\n5. 驗證測試：想像這封信被法官逐句檢視，每一句都必須是事實或合理的法律主張、且我舉得出證據；只要出現情緒謾罵或無法佐證的指控就刪掉重寫。本內容僅供參考，不構成法律意見，具體請洽專業律師。`
  },

  // ━━━ 🔵 中階秘術 | 生活娛樂 | Free ━━━
  {
    id: "red_envelope_oracle",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "紅包金額＋署名賀詞",
    icon: <Gift className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "禮金神算：紅包行情術",
    desc: "收到喜帖、過年包紅包、同事彌月，每次都在『包多少才不失禮又不傷荷包』之間天人交戰？這個咒語依場合×交情×台灣禮俗，幫你算出得體金額、避開數字禁忌，連紅包袋怎麼署名都寫好。",
    tags: ["紅包", "禮金", "人情往來"],
    fields: [
      { id: "occasion", label: "什麼場合", placeholder: "例：同事結婚 / 過年給姪子 / 朋友彌月 / 長輩壽宴 / 入厝 / 白包" },
      { id: "relationship", label: "跟對方多熟", placeholder: "例：普通同事 / 多年好友 / 久沒聯絡的親戚 / 主管" },
      { id: "situation", label: "情境補充", placeholder: "例：有去喝喜酒、五星飯店辦 / 禮到人不到 / 在中南部" },
      { id: "self", label: "你的身分或預算", placeholder: "例：剛出社會手頭緊 / 想表心意預算充足 / 學生" },
    ],
    tweak: {
      id: "strat",
      label: "神算策略",
      options: [
        "標準行情型：依台灣主流禮俗給最安全不失禮的金額，怎麼包都不會錯",
        "交情加碼型：關係好想多表心意，在行情上合理加碼又不顯得刻意炫耀",
        "精打細算型：預算有限，找出兼顧面子與荷包的最低得體金額",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '熟台灣禮俗的人情顧問' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依場合×交情定錨金額' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '金額＋理由＋禁忌＋署名' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '白包避喜慶、避諱數字' },
    ],
    theory: "包紅包之所以糾結，是因為它同時受 Gouldner『互惠規範』與社會規範錨定的雙重夾擊：金額太低被當失禮、太高又讓對方有回禮壓力，雙方其實都在猜一個『不成文的得體區間』。本咒語把這個區間外顯化——以場合與交情為座標，定錨出收禮方覺得受尊重、送禮方荷包不失血的金額，再疊上台灣特有的數字象徵（雙數吉、避諧音『死』的 4、白包反而用單數且不取吉祥數）。它解決的不是『不會寫祝福』，而是『不知道該包多少錢』這個每逢紅白帖必然發作的決策痛點。金額屬禮俗慣例，實際仍應依在地習俗與雙方交情斟酌。",
    generate: (inputs: any) => `你是一位深諳台灣婚喪喜慶禮俗的人情顧問，從北到南的紅白帖行情、數字禁忌、紅包袋寫法都瞭若指掌，幫過上百人解決『到底要包多少』的世紀難題。你的信條：「紅包的份量，是讓對方覺得被尊重、又不必為回禮煩惱。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要包一個紅包，但不知道金額怎麼抓才得體。\n- 場合：[[${inputs.occasion}]]\n- 與對方的交情：[[${inputs.relationship}]]\n- 情境補充：[[${inputs.situation}]]\n- 我的身分或預算：[[${inputs.self}]]\n\n請輸出：\n① 【建議金額】— 給「保守 / 標準 / 大方」三個級距的具體數字，每個各附一句理由（為何這個數字得體），並標明是否已避開禁忌數字\n② 【數字與禮俗提醒】— 2～3 點，說明此場合該用雙數或單數、要避開的數字（如 4）、以及任何在地眉角\n③ 【紅包袋／轉帳備註寫法】— 一段可直接照抄的正面署名與賀詞格式，含稱謂與落款\n④ 【一句場合祝福】— 一則可貼進 LINE 的祝福，30 字以內\n\n【規則】\n1. 格式：金額用台灣常見的整數寫法、可直接照包；各區塊條列清楚、能一眼讀完。\n2. 嚴禁使用：「隨便包就好」「包越多越好」「看你心意」「都可以啦」——這種沒幫到忙的廢話一律不准出現。\n3. 運用互惠規範與社會錨定：金額要落在對方「不覺得失禮、也不會有回禮壓力」的區間，並結合台灣數字象徵給建議。\n4. 語氣：像一位懂禮數又體貼的長輩朋友，務實、給得出明確數字，不說教也不模稜兩可。\n5. 驗證測試：想像收禮方拆開紅包的反應——要覺得「這金額很得體」而非「太隨便」或「破費了反而有壓力」；若場合為白包（喪事），則金額一律用單數、不取吉祥發財數字，全文不得出現任何喜慶、恭喜、發財、吉祥等字眼。本內容為禮俗參考，實際請依雙方交情與在地習俗斟酌。`
  },

  // ━━━ 🟣 高階禁咒 | 創業/自媒體 | Free ━━━
  {
    id: "seo_article_forge",
    tab: "創業/自媒體",
    isPro: false,
    tier: "master",
    school: "insight" as SchoolType,
    subSchool: "attack" as SchoolType,
    outputFormat: "SEO/GEO 文章草稿",
    icon: <FileText className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "霸榜煉金：SEO部落格術",
    desc: "想經營部落格、官網、Medium 帶流量，卻每次盯著空白頁不知從何寫起？2026 年搜尋已分流到 Google AI Overviews、ChatGPT、Perplexity——這個咒語幫你產出一篇同時能在 Google 排名、又被 AI 願意引用（GEO）的完整文章草稿，含標題、大綱、內文、FAQ。",
    tags: ["SEO", "部落格", "內容行銷"],
    fields: [
      { id: "keyword", label: "主題／目標關鍵字", placeholder: "例：新手露營裝備推薦 / 自由工作者報稅" },
      { id: "audience", label: "目標讀者與他想解決的事", placeholder: "例：第一次露營、預算有限、怕買錯的上班族" },
      { id: "expertise", label: "你的獨家經驗或觀點", placeholder: "例：露營 5 年踩過 3 次雷、實測過 10 頂帳篷" },
      { id: "cta", label: "想帶到的產品或行動", placeholder: "例：訂閱電子報 / 導購某帳篷 / 預約諮詢" },
      { id: "length_tone", label: "篇幅與風格", placeholder: "例：1000 字、親切像朋友聊天 / 專業條理" },
    ],
    tweak: {
      id: "strat",
      label: "霸榜策略",
      options: [
        "搜尋稱霸型：主攻 Google 關鍵字排名，標題與 H2 精準命中搜尋意圖",
        "AI引用型(GEO)：結構化重點＋明確結論，讓 ChatGPT、Perplexity 優先引用你",
        "故事帶貨型：用真實經驗故事建立信任，再自然導流到產品或行動呼籲",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '寫過破百篇霸榜文的主編' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依搜尋意圖排 H2 與重點' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '標題＋大綱＋全文＋FAQ' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '關鍵字自然不堆砌' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不杜撰數據與假經驗' },
    ],
    theory: "2026 的搜尋流量正從單一 Google 拆分到 AI Overviews、ChatGPT、Perplexity，內容要被『看見』必須同時滿足兩套邏輯：Google 的 E-E-A-T（經驗、專業、權威、可信）與生成式引擎優化 GEO（讓 AI 願意引用你）。兩者的共同地基是『搜尋意圖』——讀者打這個關鍵字到底想解決什麼。本咒語先以搜尋意圖定位讀者的真實問題，用 AIDA 鋪陳吸引到行動，再以真實經驗（E-E-A-T 的『經驗』維度，正是 AI 內容最缺的稀缺資產）與結構化的明確結論（FAQ、可被一句話複述的重點）讓 Google 排名、也讓 AI 主動引用。它解決的不是『改寫現成稿子』或『下一個標題』，而是『從零產出一篇能帶搜尋與 AI 流量的完整長文』。",
    generate: (inputs: any) => `你是一位寫過破百篇霸榜文章的資深 SEO 內容主編，熟悉 Google E-E-A-T、搜尋意圖分析，以及 2026 年最關鍵的生成式引擎優化（GEO）——讓 ChatGPT、Perplexity、Google AI Overviews 願意引用你的內容。你的信條：「能被搜尋引擎排名、又被 AI 引用的文章，才是真正帶得到流量的文章。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要寫一篇能帶流量的部落格／官網文章。\n- 主題／目標關鍵字：[[${inputs.keyword}]]\n- 目標讀者與他想解決的事：[[${inputs.audience}]]\n- 我的獨家經驗或觀點：[[${inputs.expertise}]]\n- 想帶到的產品或行動：[[${inputs.cta}]]\n- 篇幅與風格：[[${inputs.length_tone}]]\n\n請輸出：\n① 【標題組】— 3 個含主關鍵字的標題（各 30 字內）：一個疑問式、一個帶數字式、一個結論式\n② 【文章大綱】— H2／H3 結構，每個 H2 標明它對應讀者的哪個搜尋意圖\n③ 【完整文章草稿】— 前言＋各 H2 段落＋結論，依指定篇幅撰寫；前言 3 句內點出讀者痛點並給出本文承諾；自然融入我的獨家經驗\n④ 【FAQ 區】— 3 組常見問題＋精簡答案，方便被 AI 引用與搶 Google 精選摘要\n⑤ 【Meta 描述＋一句話總結】— Meta 描述 60 字內；再給一句「若 AI 要引用本文，會怎麼複述核心結論」的總結，60 字內\n\n【規則】\n1. 格式：H2／H3 標題清楚、段落短好讀、可直接貼進 WordPress 或 Medium；主關鍵字必須出現在標題、首段與結論。\n2. 嚴禁使用：「在當今這個社會」「眾所周知」「綜上所述」「不容置疑」「隨著科技進步」這類 AI 腔空話，也嚴禁把關鍵字硬塞重複堆砌。\n3. 運用搜尋意圖×E-E-A-T×GEO：先判斷讀者想解決什麼，用真實經驗與明確結論回答，讓 Google 想排名、AI 也想引用。\n4. 語氣：依 [[${inputs.length_tone}]] 調整，專業但好讀，像一個有經驗的人在分享，不像業配也不像論文。\n5. 驗證測試：把這篇草稿想像成丟給 AI 問「這篇在講什麼、值不值得引用」——若 AI 無法用一句話複述你的核心結論，就代表重點不夠清楚要重寫；且全文不得出現任何我無法佐證的數據、統計或捏造的親身經歷。`
  },

  // ━━━ 🔵 中階咒文 | 生活娛樂 | Free ━━━
  {
    id: "party_game_summon",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "聚會活動企劃 + 主持腳本",
    icon: <Gamepad2 className="w-8 h-8 text-pink-500" />,
    color: "pink",
    title: "團康召喚：聚會炒場活動術",
    desc: "當主揪、活動股、尾牙小組長，最怕一群人到齊卻乾坐著滑手機、冷場尷尬到想鑽地洞？迎新、尾牙、春酒、家庭聚會、同學會想帶點活動炒氣氛，Google 一堆團康卻不是太幼稚、就是規則落落長現場沒人想玩。這咒語依你的場合、人數、彼此熟不熟、有沒有場地道具，幫你選出 3 個對症的活動，每個都附上可以直接照著唸的規則說明和帶場主持詞，還準備好冷場時的救場備案，讓你從尬到爆變成全場最會帶氣氛的那個人。",
    tags: ["聚會團康", "破冰炒場", "活動企劃"],
    fields: [
      { id: "occasion", label: "什麼場合", placeholder: "例：公司尾牙 / 社團迎新 / 家族聚餐 / 同學會" },
      { id: "people", label: "人數與對象", placeholder: "例：15 人、同事沒很熟 / 8 個從小玩到大的朋友" },
      { id: "setting", label: "場地與道具限制", placeholder: "例：餐廳包廂坐著不能動 / 有投影幕 / 只有手機" },
      { id: "vibe", label: "想要的氣氛與顧慮", placeholder: "例：想炒很熱但別太over / 有長輩別太尷尬 / 30分鐘內" },
    ],
    tweak: {
      id: "strat",
      label: "炒場策略",
      options: [
        "全場爆笑型：主打反差與出糗名場面，讓氣氛瞬間炸開、話題滿滿",
        "零壓破冰型：低門檻不用才藝、坐著就能玩，讓不熟的人快速有話聊",
        "團隊競賽型：分組對抗加計分機制，用勝負欲把所有人的參與感點起來",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '帶過百場的資深康輔' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依人數場地選對遊戲' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '3活動＋規則＋主持詞' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不整人不踩尷尬雷' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '規則講完就能開玩' },
    ],
    theory: "基於破冰理論與心理安全感（Psychological Safety）：陌生團體的冷場，根源是每個人都在評估「主動了會不會出糗」的社交風險，於是集體選擇沉默。好的團康透過低門檻、人人平等出糗的設計，把出糗的社交懲罰降到最低，再用共享的笑聲快速建立群體歸屬感（in-group belonging）。同時依 Yerkes-Dodson 定律拿捏難度甜蜜點——太幼稚沒人想玩、太複雜沒人敢玩，要落在「簡單到馬上會、又有點刺激」的區間，參與感才點得起來。",
    generate: (inputs: any) => `你是一位帶過上百場迎新、尾牙、營隊的資深康輔與活動主持人，什麼冷場你都救過。你的信條：「炒場不是靠你一個人嗨，是靠設計讓每個人都敢玩。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要在一場聚會帶活動炒氣氛，需要對症、現場能直接用的團康企劃。\n- 場合：[[${inputs.occasion}]]\n- 人數與對象：[[${inputs.people}]]\n- 場地與道具限制：[[${inputs.setting}]]\n- 想要的氣氛與顧慮：[[${inputs.vibe}]]\n\n請輸出：\n① 【暖身選擇】— 依現場氣溫，第一個該開哪種活動、為什麼，40 字以內\n② 【三個對症活動】— 每個活動包含：活動名稱、一句「為何適合這場合」、需要的道具（對應我的限制）、玩法步驟（3-5 步、可直接照著唸就能開玩）、帶場主持詞（開場一句＋炒氣氛一句）\n③ 【計分與收尾機制】— 若有分組，怎麼計分、怎麼收尾頒獎，50 字以內\n④ 【冷場救場包】— 沒人反應或太安靜時，主持人可以立刻丟出的 2 句救場話，加 1 個備用小遊戲\n⑤ 【收尾金句】— 活動結束時暖場收心的一句話，30 字以內\n\n【規則】\n1. 格式：每個活動的玩法步驟要短、口語、可以直接照著唸出來就開始玩，不用玩家再自己想規則。\n2. 嚴禁使用整人、處罰性灌酒、拿身材長相性別開玩笑、強迫上台表演才藝的活動——這些會讓人尷尬或受傷，是炒場最大地雷。\n3. 運用破冰心理學與心理安全感：把活動設計成「低門檻、人人都可能出糗、又有點刺激」，降低怕丟臉的防衛，用共享的笑聲建立連結。\n4. 語氣：主持詞要熱情但不尷尬肉麻，像一個很會帶氣氛的朋友，繁體中文、台灣聚會用語。\n5. 驗證測試：把主持詞想像成現場照唸——如果唸出來會冷場、或讓某個人被針對，就重寫；每個活動都要讓「最邊緣、最不熟的那個人」也敢加入。`
  },

  // ━━━ 🔵 中階咒文 | 人際擋箭 | Free ━━━
  {
    id: "teen_talk_bridge",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    subSchool: "insight" as SchoolType,
    outputFormat: "親子對話腳本 + 接話包",
    icon: <Sprout className="w-8 h-8 text-green-600" />,
    color: "green",
    title: "青春煉語：青少年溝通術",
    desc: "跟國高中的孩子講不到三句就吵起來、關門不理人、問什麼都『還好』『不知道』？想關心成績、手機、交友、晚歸，一開口就被當嘮叨，越管越遠？青春期的孩子不是變壞，是大腦正在重組、極度在意自尊與自主。這咒語依孩子的狀況、你想談的事和你們平常的相處，把你想講的話翻譯成孩子聽得進去的版本——一段不說教、不翻舊帳、留住面子的開場，加上他頂嘴、擺爛、情緒上來時你穩住不破功的接話，還有絕對不能說的地雷句，把每次對話從角力變成靠近。",
    tags: ["親子溝通", "青春期", "教養話術"],
    fields: [
      { id: "kid", label: "孩子的狀況", placeholder: "例：國三、最近成績下滑又不講話 / 高一、整天手機不離手" },
      { id: "topic", label: "你想談的事", placeholder: "例：想聊他的手機使用時間 / 關心他跟朋友的狀況 / 談讀書" },
      { id: "relationship", label: "你們平常的相處", placeholder: "例：以前很黏最近變疏遠 / 常一講就吵 / 幾乎不太講話" },
      { id: "goal", label: "你真正想要的結果", placeholder: "例：他願意開口聊 / 一起訂手機規則 / 讓他知道我在乎不是在管" },
    ],
    tweak: {
      id: "strat",
      label: "溝通策略",
      options: [
        "先連結後引導型：先接住情緒、認同他的感受，建立安全感再談你的擔心，避免一開口就對立",
        "共訂規則型：把『我規定你』換成『我們一起討論』，讓孩子有參與感和選擇權，規則才守得住",
        "好奇提問型：少說教、多用開放式問題，讓孩子自己說出想法，你只當傾聽與釐清的人",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '青少年家庭諮商師' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依相處狀況選開口方式' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '開場＋對話腳本＋接話' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不打壓自尊不情勒' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '不說教不翻舊帳' },
    ],
    theory: "基於青少年發展心理學與非暴力溝通（NVC）：青春期大腦的邊緣系統（情緒）比前額葉（理性煞車）發展更快，加上此階段的核心發展任務正是「建立自我認同與自主」，因此對『被控制』極度敏感，父母的說教容易被解讀成否定，直接觸發防衛與關門。有效溝通的關鍵，是先滿足孩子的自尊與自主需求，用馬歇爾·盧森堡的非暴力溝通框架（觀察→感受→需要→請求）取代批評與命令，把『你應該』換成『我看到、我擔心、我們可以怎麼做』，孩子才願意把門打開。",
    generate: (inputs: any) => `你是一位專攻青少年與家庭的諮商心理師，陪過上千對親子從冷戰走回對話。你的信條：「青春期不是叛逆，是孩子在練習當一個獨立的人——你越想控制，門關得越緊。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我想跟青春期的孩子好好談一件事，但很怕一開口就吵起來或被句點。\n- 孩子的狀況：[[${inputs.kid}]]\n- 我想談的事：[[${inputs.topic}]]\n- 我們平常的相處：[[${inputs.relationship}]]\n- 我真正想要的結果：[[${inputs.goal}]]\n\n請輸出：\n① 【先別做的事】— 針對這個話題，多數家長會犯的錯誤開場是什麼、為什麼會炸，40 字以內\n② 【破冰開場】— 不說教、不翻舊帳的第一句話，30 字以內，讓孩子不會馬上豎起防衛\n③ 【對話腳本】— 一段 4-6 回合的示範對話（家長說什麼、孩子可能怎麼回、你再怎麼接），可直接參考照著調整\n④ 【情緒接話包】— 當孩子頂嘴、擺爛、爆哭或說「你不懂」時，穩住不破功又不退讓的 3 句接話\n⑤ 【地雷清單】— 這個話題絕對不能說的 3 句話，以及各該換成哪一句\n\n【規則】\n1. 格式：所有話術要口語、像真的會從嘴巴講出來的家常話，不要像教科書或心靈雞湯，能直接參考著對孩子說。\n2. 嚴禁使用：「我是為你好」「我像你這麼大的時候」「你就是不懂事」「再這樣就不要住我家」——這些是情緒勒索與否定自尊，一句就讓孩子關門。\n3. 運用非暴力溝通與青少年發展心理學：把『命令與批評』換成『我看到＋我擔心＋我們一起』，先接住情緒再談事情，尊重他的自主需求。\n4. 語氣：溫和、真誠、有耐心，是想靠近而不是想贏，繁體中文、台灣家庭日常口吻。\n5. 驗證測試：把開場白想像成真的說給孩子聽——如果他的反應會是翻白眼「又來了」或直接關門，就重寫；成功標準是孩子願意多說一句而不是句點你。並在結尾附一句提醒：若孩子出現持續低落、自傷或拒學等狀況，這是需要專業介入的訊號，請尋求學校輔導或身心科、心理師協助。`
  },

  // ━━━ 🔵 中階咒文 | 生活娛樂 | Free ━━━
  {
    id: "ai_song_forge",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "illusion" as SchoolType,
    subSchool: "healing" as SchoolType,
    outputFormat: "原創歌詞 + Suno 風格提示詞",
    icon: <Music className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "譜曲召喚：AI歌詞生成術",
    desc: "想用 Suno 這類 AI 做一首自己的歌，卻卡在生出來的歌詞不是文法怪、就是像口號，副歌根本記不住，風格欄位又不知道該填什麼？想幫另一半寫求婚歌、幫毛孩寫主題曲、幫品牌做一首洗腦廣告歌，卻不知道怎麼下咒？這咒語依你的主題、想傳達的情緒和曲風，一次幫你生出有記憶點的歌名、用 Suno 標準段落標記寫好的完整原創歌詞、可直接貼進風格欄位的英文提示詞，還附上每段的演唱情緒指示和一句分享文案，讓你不懂樂理也能做出想單曲循環、還能發出去被朋友問『這是哪首歌』的作品。",
    tags: ["AI音樂", "Suno作詞", "歌曲創作"],
    fields: [
      { id: "theme", label: "主題／想寫的故事", placeholder: "例：暗戀三年終於告白 / 送給爸媽的感謝 / 手搖飲品牌廣告歌" },
      { id: "emotion", label: "想傳達的情緒", placeholder: "例：甜甜的悸動 / 釋懷後的溫暖 / 熱血想衝一波" },
      { id: "style", label: "曲風參考", placeholder: "例：抒情鋼琴慢歌 / 輕快city pop / 嘻哈饒舌 / 台語老歌" },
      { id: "usage", label: "用途與對象", placeholder: "例：婚禮播給新娘 / IG限動分享 / 純粹自己玩 / 品牌行銷" },
    ],
    tweak: {
      id: "strat",
      label: "曲風策略",
      options: [
        "情感催淚型：主打故事感與畫面細節，副歌一句戳中淚點，適合告白、婚禮、思念主題",
        "洗腦神曲型：節奏輕快、副歌重複好記好跟唱，適合派對、品牌、想被瘋傳的場合",
        "質感文青型：意象詩意、留白多、旋律清新不濫情，適合抒情獨立風、想要有味道",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '金曲級作詞人＋AI製作人' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依曲風情緒選寫法' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '歌詞＋Suno風格提示詞' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '副歌抓耳可直接生成' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不抄襲不冒用歌手風格' },
      { type: 'example' as ModuleType, label: '範例對比', preview: '陳腔濫調vs有畫面歌詞' },
    ],
    theory: "基於耳蟲效應（Earworm）與音樂治療的情緒 ISO 原則：一首讓人單曲循環的歌，副歌往往具備『重複、簡單、朗朗上口』三特徵，這種可預期又好模仿的旋律與字句最容易在大腦中形成不自主的音樂記憶（involuntary musical imagery），也就是黏在腦中的耳蟲。情緒鋪陳則運用音樂治療的 ISO 原則——先用貼近聽者當下心情的旋律與歌詞建立共鳴，再一步步把情緒引導到你想抵達的地方，聽者才會被真正帶著走，而不是被說教。",
    generate: (inputs: any) => `你是一位寫過多首破億串流神曲的金曲級作詞人兼 AI 音樂製作人，熟悉 Suno、Udio 的提示詞邏輯，知道怎麼把一個念頭變成一首會被單曲循環的歌。你的信條：「好聽的旋律讓人聽一次，戳中心裡的歌詞讓人循環一整晚。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我想用 AI（Suno 之類的工具）生一首歌，需要能直接貼上去用的歌詞和風格設定。\n- 主題／想寫的故事：[[${inputs.theme}]]\n- 想傳達的情緒：[[${inputs.emotion}]]\n- 曲風參考：[[${inputs.style}]]\n- 用途與對象：[[${inputs.usage}]]\n\n請輸出：\n① 【歌名提案】— 3 個有記憶點的歌名，各 15 字以內\n② 【完整歌詞】— 用 Suno 標準結構標記段落（[Verse 1]／[Pre-Chorus]／[Chorus]／[Verse 2]／[Bridge]／[Outro]），主歌鋪陳、副歌一句就能記住並適合跟唱，副歌至少重複一次\n③ 【風格提示詞 Style Prompt】— 一組可直接貼進 Suno「Style of Music」欄位的英文風格標籤（曲風＋樂器＋人聲性別＋氛圍＋速度），30 字以內\n④ 【演唱情緒指示】— 給每個段落一句演唱／情緒提示（例：副歌要爆發、Bridge 轉輕），方便微調重生\n⑤ 【分享文案】— 一句貼 IG／Threads 介紹這首歌的文案，30 字以內，帶點好奇心讓人想點開聽\n\n【規則】\n1. 格式：歌詞務必用中括號段落標記（[Verse]／[Chorus] 等）分段，可整段直接貼進 Suno 的 Lyrics 欄位；風格提示詞用英文、逗號分隔。\n2. 嚴禁使用：真實歌手或樂團名字（如周杰倫、五月天、Taylor Swift）當風格提示，也嚴禁抄襲既有歌曲的旋律或歌詞、以及「愛情像海洋」「你是我的陽光」這類陳腔濫調的比喻——版權有風險且不原創。\n3. 運用耳蟲效應與情緒 ISO 原則：副歌用重複、簡單、朗朗上口的字句製造記憶點；情緒鋪陳先貼近聽者當下的心情、再引導到你想去的情緒。\n4. 語氣：依 [[${inputs.emotion}]] 與曲風調整，歌詞要像有畫面的口語，不要像作文或口號，繁體中文（副歌可少量英文點綴）。\n5. 驗證測試：把副歌想像成只聽一次——如果記不住、不想跟著哼，就重寫；並確認整首歌沒有使用任何真實藝人風格或可辨識的既有旋律與歌詞，全為原創。`
  },

  // ━━━ 🔵 中階咒文 | 日常雜症 | Free ━━━
  {
    id: "contract_clause_decoder",
    tab: "日常雜症",
    isPro: false,
    tier: "adept",
    school: "insight" as SchoolType,
    subSchool: "defense" as SchoolType,
    outputFormat: "條款白話解讀 + 紅旗清單 + 提問腳本",
    icon: <FileSearch className="w-8 h-8 text-amber-600" />,
    color: "amber",
    title: "條款解密：看懂再簽術",
    desc: "租約、工作契約、健身房會員、保單、加盟合約——一疊密密麻麻的條文看到頭暈，只想快點簽名了事，結果退租押金要不回、想解約被扒一層皮、才發現被自動續約綁死？定型化契約是對方律師早就寫好、對他最有利的版本，你看不懂不是你笨，是資訊本來就不對等。這咒語當你的把關律師，把你貼上的條款逐條翻成白話，告訴你每一條對你是好是壞，揪出那些顯失公平、藏在小字裡的陷阱（自動綁約、訂金沒收、責任全免、隱藏費用），再給你一份簽約前該問清楚、該要求白紙黑字的提問腳本，讓你看懂再簽、簽得安心，不再當被坑的那個。",
    tags: ["契約陷阱", "簽約自保", "白話解讀"],
    fields: [
      { id: "contract_type", label: "什麼合約", placeholder: "例：租屋契約 / 到職的工作契約 / 健身房會員 / 加盟合約 / 保單" },
      { id: "clauses", label: "想搞懂的條款內容", placeholder: "把看不懂或不安心的條文貼上來（可拍照打字），越完整越準" },
      { id: "concern", label: "你最擔心的點", placeholder: "例：押金拿不拿得回 / 能不能提前解約 / 有沒有隱藏費用 / 綁約多久" },
      { id: "situation", label: "你的處境與談判空間", placeholder: "例：房東在催快簽 / 還在跟別家比較 / 已經簽了想確認有沒有踩雷" },
    ],
    tweak: {
      id: "strat",
      label: "解讀策略",
      options: [
        "陷阱獵人型：主攻對你不利與顯失公平的條款，把每個坑逐一標出來、講清楚危險在哪",
        "白話翻譯型：主打逐條翻成人話，先讓你百分百看懂每條在說什麼，再判斷好壞",
        "談判籌碼型：找出可以要求刪改或補上的條款，給你跟對方開口爭取的具體說法",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '資深消保與契約律師' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依合約類型抓關鍵條款' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '白話＋紅旗＋提問腳本' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '標僅供參考建議諮詢' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '只憑內容判讀不臆測' },
    ],
    theory: "基於資訊不對稱理論（Information Asymmetry）與《消費者保護法》定型化契約的『顯失公平』原則：定型化契約是企業為與眾多消費者締約而預先單方擬定的條款，擬約方握有資訊與談判優勢，Akerlof 的檸檬市場理論指出，當一方遠比另一方清楚商品／條款真相時，弱勢方極易被坑。法律因此規定，未經個別磋商、且對消費者顯失公平的條款無效（如責任全免、片面加重義務、訂金沒收不對等）。再輔以損失規避（Loss Aversion）——人對『事後被扣錢、押金拿不回』的痛，遠大於當下省事的爽，因此把潛在損失在簽名前就攤在陽光下，才是真正的自保。",
    generate: (inputs: any) => `你是一位專攻消費者保護與契約審閱的資深律師，看過上千份定型化契約，最擅長站在弱勢一方的立場，把藏在小字裡、對消費者不利的條款一眼揪出來，並用一般人聽得懂的白話講清楚。你的信條：「看不懂不是你的錯，是對方本來就沒打算讓你看懂——但簽名前弄懂，勝過簽名後上法院。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我準備要簽（或已經簽了）一份合約，想在吃虧前把條款徹底搞懂。\n- 什麼合約：[[${inputs.contract_type}]]\n- 想搞懂的條款內容：[[${inputs.clauses}]]\n- 我最擔心的點：[[${inputs.concern}]]\n- 我的處境與談判空間：[[${inputs.situation}]]\n\n請輸出：\n① 【一句話總評】— 這份合約整體對我是有利、中性、還是要小心，並點出最該注意的一件事，40 字以內\n② 【逐條白話翻譯】— 把我貼上的條款逐條處理，每條給：原條款在講什麼（重點）→ 翻成白話是什麼意思 → 對我是好、是中性、還是不利（用 ✅／➖／🚩 標示）\n③ 【紅旗警示】— 集中列出對我不利或常見陷阱的條款（如自動綁約續約、訂金／押金沒收不對等、提前解約高額違約金、責任全免、費用未列明、片面變更權），每項標 🚩 並說明「為什麼危險」及「依消保法這條可能顯失公平」\n④ 【簽約前提問腳本】— 3-5 個簽名前該問對方、或該要求白紙黑字補進合約的問題，可直接複製傳訊息給房東／HR／業務\n⑤ 【下一步建議】— 這份該直接簽、該先談、還是該找誰（消保官、消基會、律師），以及可撥打的求助管道，50 字以內\n\n【規則】\n1. 格式：逐條對照排列、不利條款一律用 🚩 標出、提問腳本可直接複製貼上；只根據我實際貼上的條款內容判讀，我沒提供的部分明說「未提供無法判斷」，絕不臆測補全。\n2. 嚴禁使用：「這份合約完全沒問題，放心簽」「保證合法／一定違法」「你一定會贏」這類把話講死的斷言，也嚴禁虛構我沒貼上的條款或杜撰法條編號。\n3. 運用資訊不對稱與定型化契約顯失公平原則＋損失規避：一律站在我（消費者／受僱者／承租人）這個弱勢方的視角，優先揪出對方預先擬好、對我不利的條款，把潛在損失在簽名前講明白。\n4. 語氣：像一個幫你把關的律師朋友，冷靜、白話、不危言聳聽也不打包票，讓我有能力自己做決定。\n5. 驗證測試：每個標紅旗的條款都要能回答「這條為什麼對我不利、我可以怎麼辦」，答不出來就拿掉；並在結尾必附一句提醒：「本解讀僅供參考、不構成正式法律意見，金額龐大或影響重大的合約，簽署前請諮詢律師或撥打 1950 消費者服務專線、向各縣市消保官諮詢。」`
  },

  // ━━━ 🔵 中階咒文 | 生活娛樂 | Free ━━━
  {
    id: "bill_split_forge",
    tab: "生活娛樂",
    isPro: false,
    tier: "adept",
    school: "healing" as SchoolType,
    subSchool: "contract" as SchoolType,
    outputFormat: "分帳結算表 + 誰付誰 + 催款訊息",
    icon: <Receipt className="w-8 h-8 text-emerald-600" />,
    color: "emerald",
    title: "分帳召喚：聚餐旅遊AA術",
    desc: "揪了一趟三天兩夜的旅行、當了那個先刷卡付訂金訂房的冤大頭，回來面對一長串花費——住宿誰付的、幾餐誰請的、有人只來一天、有人沒喝酒不想分酒錢，算到頭痛還怕算錯得罪人？帳算好了更尷尬的是開口收錢，一句『欸你還沒付喔』傳出去像討債，乾脆自己吞掉？分帳App只幫你算數字，不會幫你把話講得漂亮。這咒語幫你把每筆帳算到底、誰該付多少一目了然，用最少的轉帳次數把帳結清，再生出一段可以直接貼進LINE群的結算公告，和給還沒付的人不傷感情的私訊範本，讓你算得公平、收得體面，當一個大家都想跟你出去玩的主揪。",
    tags: ["分帳結算", "AA制", "催款話術"],
    fields: [
      { id: "event", label: "什麼場合的帳", placeholder: "例：三天兩夜墾丁團 / 12 人火鍋聚餐 / 室友這個月水電網路" },
      { id: "expenses", label: "有哪些花費、誰先付的", placeholder: "例：住宿我付 7200、晚餐阿明付 3600、我加購零食 500、租車小美付 2400" },
      { id: "people_rule", label: "幾個人、怎麼分", placeholder: "例：5 人均分 / 有人只待一天算半價 / 沒喝酒的不分酒錢 / 小孩算半份" },
      { id: "tone", label: "你跟大家的關係與收款顧慮", placeholder: "例：都很熟可以直接講 / 有長輩或主管不好意思開口 / 想收錢又怕被覺得計較" },
    ],
    tweak: {
      id: "strat",
      label: "分帳策略",
      options: [
        "精算均分型：把每筆帳算到底、誰欠誰一目了然，並用最少的轉帳次數幫大家結清",
        "圓融收款型：主打把『催你還錢』包裝得輕鬆不尷尬，讓你開口收錢也不傷感情",
        "彈性分攤型：專門處理有人只參加一部分、消費不同的複雜情況，分得公平到沒人有話說",
      ]
    },
    modules: [
      { type: 'role' as ModuleType, label: '角色設定', preview: '精算又高EQ的分帳管家' },
      { type: 'decision' as ModuleType, label: '判斷邏輯', preview: '依參與程度算該付多少' },
      { type: 'output' as ModuleType, label: '輸出格式', preview: '結算表＋誰付誰＋訊息' },
      { type: 'behavior' as ModuleType, label: '行為規則', preview: '最少轉帳次數結清' },
      { type: 'safety' as ModuleType, label: '安全邊界', preview: '不算錯不讓人吃虧' },
    ],
    theory: "基於公平理論（Equity Theory, Adams）與 Dan Ariely 的『社會規範 vs 市場規範』衝突：分帳之所以尷尬，是因為朋友聚會運行的是『社會規範』（人情、互相、不計較），而談錢、催款會把關係硬拉進『市場規範』（一分一毫算清楚），兩套規範一撞就令人不適。公平理論則指出，人不只在意自己付多少，更在意『付出與獲得的比例』跟別人是否對等——有人只玩半程卻付全額會不平、有人先墊大筆錢沒人還會委屈。因此好的分帳要同時做到兩件事：計算上讓每個人的分攤比例公平合理，話術上把『市場規範的催款』重新包裝回『社會規範的體貼』，讓開口收錢不再像討債。",
    generate: (inputs: any) => `你是一位既會精算、EQ 又高的分帳管家，幫無數團體旅行與聚餐擺平過帳務，最擅長把一團亂的花費算得清清楚楚，還能把『收錢』這件尷尬事講得讓人心甘情願又不傷感情。你的信條：「帳要算到公平，話要說到體面——會算錢的人很多，讓人開心付錢的人才是高手。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我要幫一群人把一筆共同花費分帳並收錢，需要算得清楚、又能體面地把錢收回來。\n- 什麼場合的帳：[[${inputs.event}]]\n- 有哪些花費、誰先付的：[[${inputs.expenses}]]\n- 幾個人、怎麼分：[[${inputs.people_rule}]]\n- 我跟大家的關係與收款顧慮：[[${inputs.tone}]]\n\n請輸出：\n① 【每人該付總表】— 逐人列出：這趟總共該分攤多少、已經先墊付多少、最後要『再付』還是『可退』多少，數字清楚可核對\n② 【最少轉帳方案】— 算出誰該轉給誰、各多少，用最少的轉帳次數把帳結清（而不是每個人都轉給每個人），並附一句總花費加總對帳\n③ 【一鍵貼群組公告】— 一段可直接貼進 LINE 群的結算公告：簡述怎麼分的＋每人金額＋匯款資訊（帳號用「[你的帳號]」佔位），語氣輕鬆不像討債\n④ 【個別催款私訊】— 給還沒付的人的私訊範本 2 版（輕鬆版／正式版），開口自然不尷尬\n⑤ 【疑難排解】— 針對可能的爭議（有人覺得算多了、有人只參加半程、有人遲遲不付）各給一句怎麼回應化解，50 字以內\n\n【規則】\n1. 格式：金額一律條列、總表清楚可逐項核對；催款與公告訊息要口語、可直接複製貼上 LINE；匯款帳號用「[你的帳號]」佔位不要亂編。\n2. 嚴禁使用：「你欠我錢」「快還」「到底要不要付」這類命令討債的口氣；也嚴禁把數字算錯或多收——若某筆分法我沒交代清楚，寧可標「請幫我確認這筆怎麼分」也不硬算。\n3. 運用公平理論與社會規範／市場規範橋接：讓每個人的分攤比例看起來公平合理（只玩半程的付少、先墊錢的先拿回），並把『談錢催款』重新包裝成朋友間的體貼，降低開口的尷尬。\n4. 語氣：像一個細心又貼心的朋友在幫大家統整，清楚、輕鬆、不斤斤計較的感覺，繁體中文、台灣聚會日常口語。\n5. 驗證測試：把總表每人金額加總，必須等於總花費、對得起來才算過關，對不上就重算；並把催款私訊想像成真的傳給對方本人——如果他讀了會不爽或覺得被討債，就改得更委婉再輸出。`
  },
];

// ── Forge Charges per tier (how many times a card can be used as main card) ──
export const FORGE_CHARGES: Record<string, number> = {
  apprentice: 3,
  adept: 5,
  master: 7,
  archmage: 10,
  forbidden: 0, // cannot be main card
};

// ── Fragment yield (based on sacrifice card tier) ──
export const FRAGMENT_YIELD: Record<string, number> = {
  apprentice: 1,
  adept: 2,
  master: 3,
  archmage: 5,
};

// ── Fusion Recipes: main_id+sacrifice_id → result spell + fragments needed ──
// Recipes work BIDIRECTIONALLY — the lookup helper handles both A+B and B+A
export const FUSION_RECIPES: Record<string, { result: string; fragments_needed: number }> = {
  "late_smoke_screen+awkward_heal": { result: "smooth_operator", fragments_needed: 3 },
  "persuasion_dart+price_scout": { result: "mind_reader_persuasion", fragments_needed: 3 },
  "polite_refusal+apology_craft": { result: "graceful_no", fragments_needed: 3 },
  "promise_seal+polite_refusal": { result: "agreement_guardian", fragments_needed: 3 },
  "social_radar+meeting_shield": { result: "tactical_retreat", fragments_needed: 3 },
  "price_scout+meeting_shield": { result: "know_thy_enemy", fragments_needed: 3 },
  "allowance_alchemy+mind_reader_persuasion": { result: "career_alchemy", fragments_needed: 5 },
  "smooth_operator+graceful_no": { result: "relationship_alchemy", fragments_needed: 5 },
  "tactical_retreat+mind_reader_persuasion": { result: "shadow_broker", fragments_needed: 5 },
  "know_thy_enemy+graceful_no": { result: "absolute_territory", fragments_needed: 5 },
  "credit_thief_slayer+agreement_guardian": { result: "justice_scale", fragments_needed: 8 },
  "career_alchemy+credit_thief_slayer": { result: "negotiation_nuke", fragments_needed: 8 },
  "partnership_nuclear_pact+relationship_alchemy": { result: "iron_constitution", fragments_needed: 12 },
  "absolute_territory+emotional_blackmail_breaker": { result: "ultimate_rebirth", fragments_needed: 12 },
  "negotiation_nuke+iron_constitution": { result: "grand_conductor", fragments_needed: 12 },
};

/** Look up fusion recipe bidirectionally */
export function lookupRecipe(mainId: string, sacrificeId: string): { result: string; fragments_needed: number } | null {
  const keyA = `${mainId}+${sacrificeId}`;
  const keyB = `${sacrificeId}+${mainId}`;
  return FUSION_RECIPES[keyA] ?? FUSION_RECIPES[keyB] ?? null;
}

/** Get the fragment type key for a main+sacrifice pair */
export function getFragmentType(mainId: string, sacrificeId: string): string | null {
  const recipe = lookupRecipe(mainId, sacrificeId);
  if (!recipe) return null;
  return recipe.result; // fragment type is named after the result spell
}
