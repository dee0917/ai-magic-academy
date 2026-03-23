import {
  Clock, Swords, Skull, Coins, Shield
} from "lucide-react";
import React from "react";

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

export const CURSES = [
  // ━━━ 📜 見習咒文 | 日常雜症 | Free ━━━
  {
    id: "late_smoke_screen",
    tab: "日常雜症",
    isPro: false,
    tier: "apprentice",
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
    theory: "基於 Goffman 印象管理理論：遲到時人最怕的不是對方生氣，而是被貼上『不尊重別人時間』的標籤。本咒語將通知從『求原諒』重新框架為『主動掌控節奏』。",
    generate: (inputs: any) => `你是一位專門處理社交場景的溝通教練，輔導過上百位「慣性遲到者」改善人際關係。\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我即將遲到，需要一則得體的通知訊息。\n- 對象：[[${inputs.target}]]\n- 預計遲到：[[${inputs.delay}]]\n- 真實原因：[[${inputs.reason}]]\n\n請輸出：\n① 【遲到通知訊息】— 一則 LINE 訊息，40 字以內，語氣穩定不卑微\n② 【到場後開場白】— 一句見面時說的話，15 字以內，化解尷尬\n③ 【備用版本】— 如果對象是長輩或主管，語氣更正式的版本，50 字以內\n\n【規則】\n1. 訊息必須 40 字以內，能直接複製貼到 LINE 送出，口語化、不能有書面腔。\n2. 嚴禁使用：「不好意思」「真的很抱歉」「sorry」「拍謝」——這些只會讓你看起來更心虛。\n3. 運用印象管理原則：訊息要讓對方覺得你「正在處理事情」而非「剛睡醒在趕路」，重點是掌控感而非歉意。\n4. 語氣必須像在「通知」不是在「求原諒」——用陳述句，不用問句或驚嘆號連發。\n5. LINE 測試：這則訊息傳出去後，對方的反應應該是「好～」而不是「你每次都這樣」。`
  },

  // ━━━ 🔵 中階秘術 | 人際擋箭 | Free ━━━
  {
    id: "allowance_alchemy",
    tab: "人際擋箭",
    isPro: false,
    tier: "adept",
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
    theory: "基於 Cialdini 互惠原則與框架效應：長輩拒絕給錢的核心不是捨不得，而是怕「養出伸手牌」。本咒語將請求從「消費支出」重新框架為「成長投資」，觸發長輩的「栽培本能」而非「警戒本能」。",
    generate: (inputs: any) => `你是一位深諳華人家庭溝通動態的親子關係顧問，輔導過 200+ 個家庭處理金錢話題，自己也是從窮學生過來的。你的信條：「會開口不是沒骨氣，是懂得經營關係。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要跟長輩開口要一筆錢，但不想被念或被看扁。\n- 對象：[[${inputs.target}]]\n- 金額：[[${inputs.amount}]]\n- 真正用途：[[${inputs.real_reason}]]\n- 長輩個性：[[${inputs.parent_style}]]\n\n請輸出：\n① 【開場鋪墊】— 在正式開口前要先說什麼話暖場，2-3 句，每句 20 字以內\n② 【核心請求話術】— 正式開口的那段話，50 字以內，必須包含「投資/成長」框架\n③ 【被追問時的回答】— 長輩問「為什麼需要這筆錢」時的 2 個版本回答\n④ 【心理暗示語】— 按下送出前默念的一句話，15 字以內\n\n【規則】\n1. 所有話術加起來不超過 200 字，口語化到可以直接在晚餐桌上說。\n2. 嚴禁使用：「我沒錢了」「可以借我嗎」「拜託」「我保證還」——這些是窮人語言，會觸發長輩的「又來了」反射。\n3. 運用框架效應：同一筆錢，「繳房租」聽起來是負擔，「確保住處穩定好專心衝事業」聽起來是投資。你必須完成這個轉換。\n4. 語氣像在「分享近況順便提到一個需求」而非「求救」——穩定、自然、不卑不亢。\n5. 阿嬤測試：這段話如果讓阿嬤聽到，她會覺得「這孫子真懂事」而不是「又來要錢」。`
  },

  // ━━━ 🟣 高階禁咒 | 職場求生 | Free ━━━
  {
    id: "credit_thief_slayer",
    tab: "職場求生",
    isPro: false,
    tier: "master",
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
    theory: "基於歸因理論與組織政治學：搶功者利用的是「資訊不對稱」——決策者不知道誰才是真正的貢獻者。本咒語透過建立「證據能見度」來消除資訊差，同時運用面子協商理論避免正面衝突。",
    generate: (inputs: any) => `你是一位擁有 18 年經驗的組織行為顧問，專門處理職場歸因衝突與功勞爭議，曾輔導超過 300 位中階主管處理類似情境。你的信條是：「最高明的反擊，是讓真相自己走到聚光燈下。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我的工作成果被搶功，需要一套不撕破臉但能奪回功勞的作戰計畫。\n- 被搶的成果：[[${inputs.project}]]\n- 搶功的人：[[${inputs.thief}]]\n- 我持有的證據：[[${inputs.evidence}]]\n- 需要知道真相的人：[[${inputs.audience}]]\n- 與搶功者的關係：[[${inputs.relationship}]]\n\n請輸出：\n① 【48 小時行動計畫】— 分「今天」「明天」「後天」三階段，每階段 2-3 個具體動作\n② 【關鍵對話腳本】— 跟主管/決策者說明時的 3 句話，每句不超過 30 字\n③ 【證據展示策略】— 如何在不直接指控的情況下讓證據「被看見」\n④ 【防禦佈局】— 未來如何防止再次被搶功的 3 個習慣\n⑤ 【檢查清單】— 執行前確認的 5 個檢查點\n\n【規則】\n1. 每個行動步驟必須具體到「幾點做什麼」，不能只寫「找機會跟主管聊」這種模糊指令。\n2. 嚴禁使用：「我覺得他搶了我的功勞」「那個是我做的耶」「不公平」——這些只會讓你看起來像在抱怨而非在陳述事實。\n3. 運用歸因理論：所有話術必須以「事實 + 時間線 + 文件」為核心，讓對方自己得出結論，而非你直接指控。\n4. 語氣必須專業冷靜——你是在「釐清貢獻歸屬」而非「告狀」或「訴苦」。\n5. 老闆測試：你輸出的每一句話，拿給老闆看都不會覺得你在搞辦公室政治，而是在做負責任的專案回顧。`
  },

  // ━━━ 🔴 大魔導術 | 創業/斜槓 | Pro ━━━
  {
    id: "partnership_nuclear_pact",
    tab: "創業/斜槓",
    isPro: true,
    tier: "archmage",
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
    theory: "基於賽局理論的承諾機制與 Williamson 交易成本經濟學：合夥最大的風險不是「對方是壞人」，而是「好人在壓力下也會做出自利選擇」。本咒語在蜜月期建立退場機制和明確分工，因為事前寫在紙上的規則，永遠比事後的爭吵更便宜。",
    generate: (inputs: any) => `你同時具備兩個專家視角：\n① 商務律師（專精中小企業合夥糾紛，自己也當過 Freelancer 再合夥創業，處理過 200+ 合夥拆夥案件）\n② 創業教練（輔導過 150 組合夥團隊，見證 90% 翻臉都是因為「沒寫清楚」而非「人品問題」）\n\n你的共同信條：「敢把醜話說在前頭的合夥人，才是真正想把事情做好的人。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我正要跟人合夥，需要一套完整的保護方案和開口話術。\n- 合夥人：[[${inputs.partner}]]\n- 生意內容：[[${inputs.business}]]\n- 我的投入：[[${inputs.my_contribution}]]\n- 對方的投入：[[${inputs.their_contribution}]]\n- 最大擔憂：[[${inputs.concern}]]\n- 彼此關係：[[${inputs.relationship}]]\n\n請輸出：\n① 【開口話術】— 如何跟合夥人提議「我們來簽合約」而不傷感情，3 句話，每句 30 字以內\n② 【合約必備條款清單】— 列出 8 個絕對不能少的條款，每條用一句話解釋為什麼重要\n③ 【分潤方案建議】— 根據雙方投入，建議 2 種分潤比例方案 + 各自的優缺點\n④ 【退場機制】— 如果有人要退出，明確寫出 3 步退場流程\n⑤ 【最壞情況劇本】— 列出 3 個最可能翻臉的場景 + 每個場景的預防條款\n⑥ 【30 天行動計畫】— 從今天到正式簽約的每週里程碑\n\n【規則】\n1. 合約條款必須用白話文寫，不能出現法律術語——因為他們可能不會真的找律師，這份清單就是他們唯一的保護。\n2. 嚴禁使用：「應該沒問題吧」「到時候再說」「我們這麼好的關係不用擔心」——這些是定時炸彈。\n3. 運用承諾機制理論：每一個條款都必須回答「如果 X 發生，誰做什麼、誰出多少、期限多久」，不能有模糊空間。\n4. 語氣必須像「兩個大人在規劃一個重要的事業」而非「一方在防另一方」——合約是保護雙方，不是監視。\n5. 阿嬤測試：每一個條款念給阿嬤聽，她都能理解「喔～所以如果他不做了，錢要這樣分對不對」。`
  },

  // ━━━ ⚫ 禁忌奧義 | 人際擋箭 | Pro ━━━
  {
    id: "emotional_blackmail_breaker",
    tab: "人際擋箭",
    isPro: true,
    tier: "forbidden",
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
    theory: "基於 Susan Forward 情緒勒索理論（FOG：Fear, Obligation, Guilt）與 Murray Bowen 家族系統理論：情勒者利用的是你內建的「愧疚迴路」——從小被訓練成「讓對方失望 = 我是壞人」。本咒語不是教你反擊，而是重新接線：把「我讓他難過了」改寫為「他正在用情緒控制我的選擇權」。結合 Bowlby 依附理論理解為什麼離不開，再用認知行為治療的認知重構技術打破自動化愧疚反應。",
    generate: (inputs: any) => `你同時具備三個專家視角：\n① 臨床心理師（專精情緒勒索與依附創傷，持有 Gottman 認證，15 年臨床經驗）\n② 家族治療師（處理過 500+ 個華人家庭的邊界議題，深諳「孝順」文化下的情勒變體）\n③ 溝通策略師（曾任企業談判顧問，擅長在不破壞關係的前提下重設權力結構）\n\n你的共同信條：「保護自己不是自私，是你對這段關係能做的最誠實的事。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我正在經歷情緒勒索，需要一套完整的脫困系統。\n- 情勒者：[[${inputs.blackmailer}]]\n- 對方慣用台詞：[[${inputs.script}]]\n- 對方的要求：[[${inputs.demand}]]\n- 我的感受：[[${inputs.feeling}]]\n- 持續時間：[[${inputs.history}]]\n- 我的底線：[[${inputs.bottom_line}]]\n\n請輸出：\n① 【情勒拆解報告】— 分析對方用了哪種 FOG 手法（恐懼/義務/愧疚），以及為什麼這招對你特別有效，200 字以內\n② 【鋼鐵邊界宣言】— 3 句可以直接對對方說的話，每句 30 字以內，語氣堅定但不冷血\n③ 【內心防護咒】— 當愧疚感湧上來時默念的 1 句話，20 字以內，用來中斷自動化妥協反應\n④ 【最壞情況劇本】— 如果對方聽完爆炸了（哭/冷戰/威脅），你的 3 步應對流程\n⑤ 【長期重設計畫】— 未來 30 天內重建關係邊界的 3 個里程碑行動\n⑥ 【風險地圖】— 這套策略可能的副作用和對應的緩衝方案\n\n【規則】\n1. 邊界宣言必須 30 字以內，能直接當面說出口，不能像在念心理學教科書。\n2. 嚴禁使用：「你不要這樣」「你讓我很受傷」「你能不能尊重我」——這些是在對方框架裡打仗，永遠贏不了。\n3. 必須同時運用 FOG 模型拆解 + 依附理論解釋 + 認知重構技術，三層防護缺一不可。\n4. 語氣指南：對外（對情勒者）像溫柔的牆——不攻擊但不退讓；對內（給自己）像教練——理性、堅定、不批判自己。\n5. 鏡子測試：你寫的每一句邊界宣言，使用者對著鏡子練習時不會覺得自己是壞人，而是覺得「我終於在保護自己了」。`
  },
];
