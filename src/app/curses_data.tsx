import { 
  Sparkles, Flame, Droplets, Wind, Copy, ExternalLink, ChevronDown, X, Search, Check,
  ShieldAlert, Hand, Mail, TrendingUp, Gavel, ShoppingBag, Map, LogOut, Lightbulb, Smile,
  AlertTriangle, Ban, BarChart, Home, Hammer, Navigation, FileText, Zap,
  Ghost, GraduationCap, Coins, Handshake, Trash2, HeartOff, PenTool, Send, Calendar, Megaphone, 
  Beer, ShieldCheck, UserPlus, Wallet, HelpCircle, ClipboardList, Clock, Receipt, Heart, Music,
  Dumbbell, Star, CircleDollarSign, VolumeX, Headset, ShieldX, Swords, Gift, Users,
  Brain, Bot, MessageSquare, Lock, Scissors, Coffee, HeartCrack, PiggyBank
} from "lucide-react";
import React from "react";

export const CURSES = [
  {
    id: "soft_knife_severance",
    tab: "人際擋箭",
    isPro: false,
    outputFormat: "LINE 拒絕訊息",
    icon: <Hand className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "軟刀斷尾：老好人絕症",
    desc: "解決「明明不想答應，嘴巴卻先說好」的老好人絕症。將拒絕重新框架為資源重新分配。",
    tags: ["社交防禦", "邊界管理", "心理自救"],
    fields: [
      { id: "target", label: "對象", placeholder: "例：同事小王" },
      { id: "request", label: "請求內容", placeholder: "例：幫他代週六的班" },
      { id: "truth", label: "你的真實處境", placeholder: "例：週六已有家庭聚餐" },
      { id: "weight", label: "關係權重", placeholder: "例：普通同事/好友/主管" }
    ],
    tweak: { 
      id: "strat", 
      label: "策略選擇", 
      options: [
        "溫柔斷尾：先肯定對方，用事實屏障擋回，保留情面。", 
        "幽默閃躲：用自嘲式笑話化解尷尬，適合熟人圈。", 
        "制度盾牌：搬出規則或第三方限制，讓拒絕「去個人化」。"
      ] 
    },
    theory: "基於社會交換理論：人際互動本質是成本與報酬的動態博弈。老好人的核心恐懼是害怕拒絕後被貼上「自私」標籤。本咒語將拒絕重新框架為「資源重新分配」而非「關係背叛」。",
    generate: (inputs: any) => `你是一位專精人際邊界管理的組織心理學顧問，擁有 15 年處理職場與社交衝突的實戰經驗。\n\n【任務】\n請根據以下情境，幫我生成 3 則拒絕話術（分別對應 [[${inputs.strat}]]）：\n- 對象：[[${inputs.target}]]\n- 請求內容：[[${inputs.request}]]\n- 我的真實處境：[[${inputs.truth}]]\n- 關係權重：[[${inputs.weight}]]\n\n【規則】\n1. 每則話術不超過 60 字，必須是能直接複製貼上到 LINE 的訊息，口語化、不能有書面腔。\n2. 嚴禁使用以下詞彙：「不好意思」「真的很抱歉」「下次一定」——這些是老好人的毒藥。\n3. 每則話術必須包含一個「替代方案」或「具體補償」，讓對方感覺被尊重而非被甩。\n4. 語氣必須堅定但不冷漠——用「陳述句」取代「祈使句」，用「我」開頭而非「你」開頭。\n5. 額外輸出一段【心理暗示語】（20 字內），讓使用者在按下送出前默念，強化拒絕的正當感。`
  },
  {
    id: "gilded_salary_negotiation",
    tab: "職場求生",
    isPro: true,
    outputFormat: "加薪談判腳本",
    icon: <TrendingUp className="w-8 h-8 text-yellow-500" />,
    color: "yellow",
    title: "鍍金開口：薪資談判術",
    desc: "解決「覺得自己值得加薪但一開口就變成在要飯」的薪資談判癱瘓症。運用錨定效應翻轉權力敘事。",
    tags: ["加薪", "談判", "職涯升遷"],
    fields: [
      { id: "title", label: "目前職稱", placeholder: "例：行銷專員" },
      { id: "tenure", label: "年資", placeholder: "例：1 年 8 個月" },
      { id: "achievement", label: "具體戰功", placeholder: "例：單季社群觸及率提升 40%" },
      { id: "increase", label: "期望漲幅", placeholder: "例：月薪加 5,000 元" },
      { id: "boss_style", label: "主管風格", placeholder: "例：數據導向/重視態度/怕麻煩" }
    ],
    tweak: { 
      id: "strat", 
      label: "談判路徑", 
      options: [
        "數據碾壓型：用 ROI 與市場行情讓老闆「算不贏你」。", 
        "願景綁定型：將加薪與公司未來發展綁定，讓老闆覺得這筆錢是「投資」不是「成本”。", 
        "退路暗示型：不威脅但暗示你有選擇權，製造微妙的談判槓桿。"
      ] 
    },
    theory: "基於錨定效應與展望理論：薪資談判的深層恐懼是「開口要錢 = 暴露自己的貪婪」。運用錨定效應拋出高參照點。",
    generate: (inputs: any) => `你是一位專門輔導科技業與傳產中階員工的薪資談判教練，你的客戶平均談判成功率 78%。\n\n【任務】\n根據以下個人資料，幫我擬定一份完整的加薪談判腳本（採用 [[${inputs.strat}]]），包含：開場白、核心論述、預判老闆的 3 種可能回應及對應的接話策略。\n- 目前職稱：[[${inputs.title}]]\n- 年資：[[${inputs.tenure}]]\n- 具體戰功：[[${inputs.achievement}]]\n- 期望漲幅：[[${inputs.increase}]]\n- 主管風格：[[${inputs.boss_style}]]\n\n【規則】\n1. 開場白必須在前 15 秒內拋出一個「錨定數字」（可以是市場行情、產業報告、或你創造的營收數字），嚴禁以「我最近在想...」這種軟趴趴的方式開場。\n2. 核心論述必須採「問題—Loss—方案」三段結構：先點出團隊正面臨的挑戰、再暗示你離開的損失、最後將加薪定位成解決方案。\n3. 嚴禁出現：「我覺得我還算努力」「跟大家比起來」「如果公司方便的話」——這些是談判桌上的自殺句型。\n4. 所有語句必須使用「強勢動詞」（如：創造、推動、主導、落地），禁止使用「嘗試、希望、可能」。\n5. 最後附上一張【談判前 Checklist】，列出進會議室前必須準備的 5 件事。`
  },
  {
    id: "relationship_suturing",
    tab: "人際擋箭",
    isPro: false,
    outputFormat: "關係修復方案",
    icon: <Heart className="w-8 h-8 text-rose-400" />,
    color: "rose",
    title: "縫合咒：冷戰修復術",
    desc: "解決吵架雙方等對方低頭、結果冷戰到天荒地老的關係冰封症。將先低頭重構為高價值行為。",
    tags: ["親密關係", "情感修復", "溝通術"],
    fields: [
      { id: "target", label: "對象身份", placeholder: "例：交往兩年的女友" },
      { id: "trigger", label: "吵架導火線", placeholder: "例：我忘記紀念日" },
      { id: "landmine", label: "真正的地雷", placeholder: "例：覺得我不重視她" },
      { id: "days", label: "冷戰天數", placeholder: "例：3 天" },
      { id: "limit", label: "你的底線", placeholder: "例：願意道歉但不接受翻舊帳" }
    ],
    tweak: { 
      id: "strat", 
      label: "修復策略", 
      options: [
        "破冰簡訊型：一則精準的訊息，打開對話窗口而非一次解決問題。", 
        "行動派修復：不靠嘴巴，用一個具體行動證明改變。", 
        "結構化深談：約一個正式的「復盤對話」，用規則框住情緒。"
      ] 
    },
    theory: "基於依附理論與 Gottman 關係修復嘗試模型：將先低頭重構為維護關係的主動行為。",
    generate: (inputs: any) => `你是一位持有美國 Gottman 認證的伴侶關係治療師，專門處理華人文化脈絡下的親密關係衝突。\n\n【任務】\n根據以下吵架情境，幫我設計一套「關係修復方案」（採取 [[${inputs.strat}]]），包含：破冰訊息（或行動方案）、正式對話的開場框架、以及雙方可共同遵守的「吵架停損規則」。\n- 對象身份：[[${inputs.target}]]\n- 吵架導火線：[[${inputs.trigger}]]\n- 真正的地雷：[[${inputs.landmine}]]\n- 冷戰天數：[[${inputs.days}]]\n- 我的底線：[[${inputs.limit}]]\n\n【規則】\n1. 破冰訊息不超過 40 字，必須同時完成兩件事：承認對方的感受 + 表達想對話的意願。嚴禁寫成小作文。\n2. 嚴禁使用「但是」「可是」「不過」——這三個詞會瞬間讓前面的道歉歸零。用「同時」「而且」取代。\n3. 對話框架必須包含一條「安全詞機制」：當任一方情緒再度升溫時，可以喊暫停的規則。\n4. 所有建議必須區分「道歉」與「認錯」——道歉是對情緒的回應，認錯是對事實的承認，兩者可以獨立存在。\n5. 最後輸出一段【寫給自己的話】（50 字內），幫助使用者在按下傳送前穩住心態，提醒自己「先開口不是認輸」。`
  },
  {
    id: "social_evaporation",
    tab: "日常雜症",
    isPro: false,
    outputFormat: "自我介紹方案",
    icon: <Ghost className="w-8 h-8 text-neutral-400" />,
    color: "neutral",
    title: "蒸發入場：社交自介術",
    desc: "解決自我介紹腦袋空白、講完名字就句點的失敗症。利用 Von Restorff 隔離效應設計記憶點。",
    tags: ["社交恐懼", "自我介紹", "破冰"],
    fields: [
      { id: "event", label: "場合", placeholder: "例：新公司報到" },
      { id: "identity", label: "你的身份", placeholder: "例：UX 設計師" },
      { id: "hook", label: "想被記住的點", placeholder: "例：曾經環島騎腳踏車" },
      { id: "audience", label: "聽眾組成", placeholder: "例：工程師為主的團隊" },
      { id: "limit", label: "時間限制", placeholder: "例：30 秒" }
    ],
    tweak: { 
      id: "strat", 
      label: "自介策略", 
      options: [
        "反差鉤子型：用一個出人意料的事實製造記憶點。", 
        "問題邀請型：用一個開放式問題結尾，把獨白變成對話。", 
        "迷因嫁接型：借用一個大家都懂的流行語或文化梗來包裝自己。"
      ] 
    },
    theory: "基於初始效應與雞尾酒會效應：利用 Von Restorff 隔離效應鎖定聽眾的選擇性注意。",
    generate: (inputs: any) => `你是一位 TED 演講教練，專門訓練內向者在 30 秒內建立個人品牌印象。你深信：「無聊的自我介紹不是性格問題，是結構問題。」\n\n【任務】\n根據以下資訊，幫我設計 3 版自我介紹（分別對應 [[${inputs.strat}]]），每版嚴格控制在 [[${inputs.limit}]] 以內。\n- 場合：[[${inputs.event}]]\n- 身份：[[${inputs.identity}]]\n- 記憶點：[[${inputs.hook}]]\n- 聽眾組成：[[${inputs.audience}]]\n\n【規則】\n1. 開頭前 5 秒嚴禁出現「大家好我是 XXX」這種格式——直接從鉤子開始。\n2. 必須包含一個「互動觸發點」：讓聽眾在事後有藉口來找你搭話的元素。\n3. 嚴禁使用：「我這個人比較內向」「我也不太會講話」「請大家多多指教」——這些是社交自殺句。\n4. 語氣必須像在跟朋友聊天，不是在背稿。測試標準：如果唸出來像在讀公文，就打掉重練。\n5. 每版結尾附上一個【場後追擊句】——自我介紹結束後 10 分鐘內，可以拿來跟旁邊的人開啟閒聊的一句話。`
  },
  {
    id: "mind_soul_recall",
    tab: "日常雜症",
    isPro: false,
    outputFormat: "後續追蹤訊息",
    icon: <Mail className="w-8 h-8 text-cyan-400" />,
    color: "cyan",
    title: "讀心回魂：已讀不回破",
    desc: "解決被已讀不回後陷入無限腦補迴圈的數位焦慮症。幫助使用者從「追逐者」定位為「價值提供者」。",
    tags: ["已讀不回", "數位焦慮", "人際策略"],
    fields: [
      { id: "target", label: "對象", placeholder: "例：曖昧對象" },
      { id: "content", label: "你傳的內容", placeholder: "例：週末要不要看電影？" },
      { id: "duration", label: "已讀時長", placeholder: "例：超過 24 小時" },
      { id: "status", label: "關係現狀", placeholder: "例：每天聊但最近變少" },
      { id: "goal", label: "你的目標", placeholder: "例：確認發展意願" }
    ],
    tweak: { 
      id: "strat", 
      label: "訊息風格", 
      options: [
        "若無其事型：傳一則跟原話題完全無關的訊息，重啟對話但零壓力。", 
        "價值展示型：不追問，改發一則讓對方「主動想回」的高品質內容。", 
        "直球試探型：用輕鬆的語氣直接點破，適合想快速得到答案的人。"
      ] 
    },
    theory: "基於不確定性降低理論與認知失調：運用稀缺性原則與間歇性增強，重設社交份量感知。",
    generate: (inputs: any) => `你是一位精通數位時代人際動態的社交策略師，你的核心理念是：「最高級的追，是讓對方覺得不回你是自己的損失。」\n\n【任務】\n根據以下情境，幫我生成 3 則後續訊息（分別對應 [[${inputs.strat}]]）：\n- 對象：[[${inputs.target}]]\n- 被已讀的訊息：[[${inputs.content}]]\n- 已讀時長：[[${inputs.duration}]]\n- 關係現狀：[[${inputs.status}]]\n- 我的目標：[[${inputs.goal}]]\n\n【規則】\n1. 每則訊息不超過 30 字——已讀不回的情境下，訊息越長越像在解釋、越像在卑微。\n2. 嚴禁使用：「你是不是很忙？」「我是不是打擾你了？」「你有看到嗎？」——這是追逐者的認證戳章。\n3. 訊息的「潛台詞」必須傳達：「我的生活很精彩，你的回覆是錦上添花不是雪中送炭。」\n4. 每則訊息附上【傳送時機建議】：幾點傳、間隔多久傳，以及為什麼這個時間點最有效。\n5. 額外輸出一份【最壞情況劇本】：如果對方還是不回，你應該怎麼解讀、以及何時該停止投入。`
  },
  {
    id: "steel_apology",
    tab: "人際擋箭",
    isPro: true,
    outputFormat: "道歉話術與指南",
    icon: <ShieldCheck className="w-8 h-8 text-slate-500" />,
    color: "slate",
    title: "鋼骨道歉：尊嚴保衛戰",
    desc: "解決道歉完被吃死死、喪失地位的尊嚴保衛戰。運用有效道歉四成分模型重新定義棋局。",
    tags: ["危機溝通", "權力語言", "組織正義"],
    fields: [
      { id: "target", label: "對象", placeholder: "例：專案組同事" },
      { id: "action", label: "你做了什麼", placeholder: "例：開會否定他提案" },
      { id: "stance", label: "你的立場", placeholder: "例：方式不對內容沒錯" },
      { id: "pain", label: "對方在意的點", placeholder: "例：在眾人面前丟臉" },
      { id: "goal", label: "理想結果", placeholder: "例：恢復合作但不改立場" }
    ],
    tweak: { 
      id: "strat", 
      label: "策略流派", 
      options: [
        "精準手術型：只道歉「方式」不道歉「內容」，精確切割錯誤邊界。", 
        "高姿態修復型：主動提出一個具體的補償行動，用行為取代言語。", 
        "戰略共情型：先完整複述對方的感受，讓對方感覺被「完全理解」後再轉向。"
      ] 
    },
    theory: "基於面子理論與組織正義理論：運用有效道歉模型確保主導權不喪失，重新框架社交位階。",
    generate: (inputs: any) => `你是一位專門輔導高階主管的危機溝通顧問。你的哲學是：「道歉不是低頭，是重新定義棋局。」\n\n【任務】\n根據以下情境，幫我設計一段道歉話術（對應 [[${inputs.strat}]]），附帶一份「道歉邊界清單」。\n- 對象：[[${inputs.target}]]\n- 我做了什麼：[[${inputs.action}]]\n- 我的立場：[[${inputs.stance}]]\n- 對方在意的點：[[${inputs.pain}]]\n- 理想結果：[[${inputs.goal}]]\n\n【規則】\n1. 道歉話術必須在前兩句就完成「承認 + 負責」，不准鋪陳超過 3 句才進入正題——拖越久越像在找藉口。\n2. 嚴禁使用：「如果我讓你不舒服的話」（假設性道歉是侮辱）、「我也是為你好」（這是火上澆油）、「大家都這樣」（這是推卸責任）。\n3. 話術中必須包含一句「邊界宣告」——明確告訴對方你道歉的範圍，避免對方得寸進尺。\n4. 全文語氣要穩、要低、要慢——像一個有分量的人在說話，不是像一個犯錯的小孩在求饒。\n5. 結尾附上一段【道歉後 48 小時行動指南】：道歉完之後你該做什麼、不該做什麼，確保成果不被消耗。`
  },
  {
    id: "beast_expelling",
    tab: "人際擋箭",
    isPro: false,
    outputFormat: "防禦話術組合",
    icon: <Flame className="w-8 h-8 text-orange-400" />,
    color: "orange",
    title: "年獸退散：進度條護盾",
    desc: "解決過年被親戚輪番轟炸人生進度條的創傷症候群。利用「關係面子」機制保全價值。",
    tags: ["節慶生存", "長輩壓力", "面子功夫"],
    fields: [
      { id: "landmine", label: "你的雷區", placeholder: "例：怎麼還不結婚？" },
      { id: "truth", label: "你的現狀", placeholder: "例：享受單身不想解釋" },
      { id: "asker", label: "詢問者", placeholder: "例：二姑媽" },
      { id: "vibe", label: "家庭氣氛", placeholder: "例：表面和氣暗潮洶湧" },
      { id: "limit", label: "你的底線", placeholder: "例：打哈哈但不要被追問" }
    ],
    tweak: { 
      id: "strat", 
      label: "防禦策略", 
      options: [
        "太極推手型：笑著把問題推回去或轉移話題，四兩撥千斤。", 
        "荒謬核彈型：用一個誇張到不可能的回答讓對方不知道怎麼接。", 
        "溫柔封印型：用一句感性的話讓對方覺得「我不該再問了」。"
      ] 
    },
    theory: "基於社會比較理論與面子功夫：運用華人文化特有的「關係面子」機制，設計既保全自己面子、又不撕破長輩面子的回應。",
    generate: (inputs: any) => `你是一位精通華人家族動態的文化心理學家，你在台大開過一門課叫「節慶生存學」，選課人數年年爆滿。\n\n【任務】\n根據以下情境，幫我設計 3 套「年節防禦話術」（分別對應 [[${inputs.strat}]]），以及一份「全場生存動線圖」。\n- 我的雷區：[[${inputs.landmine}]]\n- 我的現狀：[[${inputs.truth}]]\n- 主要詢問者：[[${inputs.asker}]]\n- 家庭氣氛：[[${inputs.vibe}]]\n- 我的底線：[[${inputs.limit}]]\n\n【規則】\n1. 每套話術必須在 15 字內完成「擋 + 轉」——過年場合沒人有耐心聽你長篇大論。\n2. 嚴禁使用：「你怎麼不問表哥/表姐」（這是拉人下水，會製造新的敵人）。\n3. 太極推手型必須包含一個「回力鏢問題」——把焦點轉到對方身上（如：「姑媽你當年是幾歲結婚的？」）。\n4. 荒謬核彈型的回答必須荒謬到讓人發笑，但不能冒犯任何人——幽默的攻擊力在於讓人「不好意思再追問」。\n5. 額外提供一份【緊急撤退話術】：當情況失控時可以說的「我先去XXX」的藉口清單。`
  },
  {
    id: "anti_erosion",
    tab: "人際擋箭",
    isPro: false,
    outputFormat: "情勒解碼與行動",
    icon: <HeartCrack className="w-8 h-8 text-red-400" />,
    color: "red",
    title: "反蝕咒：情勒解套術",
    desc: "解決明知在被情緒勒索卻無法不愧疚的心理綁架。運用 CBT 技術解構勒索套路。",
    tags: ["情緒勒索", "心理自救", "邊界設定"],
    fields: [
      { id: "bully", label: "勒索者", placeholder: "例：媽媽" },
      { id: "phrase", label: "勒索句型", placeholder: "例：我做這都是為你" },
      { id: "guilt", label: "你的愧疚點", placeholder: "例：不夠孝順" },
      { id: "boundary", label: "理想邊界", placeholder: "例：可以關心但不要控制我的決定" },
      { id: "link", label: "能否遠離", placeholder: "例：不行，住一起" }
    ],
    tweak: { 
      id: "strat", 
      label: "防禦技術", 
      options: [
        "灰岩技術 (Grey Rock)：降低情緒反應，讓自己變得「無聊」到對方失去操控感。", 
        "鏡像複述型：把對方的情緒用中性語言複述回去，讓對方「聽到自己在說什麼」。", 
        "延遲回應型：不在當下回應，用「我需要想一想」爭取情緒緩衝空間。"
      ] 
    },
    theory: "基於 CBT 與情緒勒索 FOG 模型：情緒勒索之所以有效，核心機制是「讓你相信不順從 = 你是壞人」。本咒語降低其情緒穿透力。",
    generate: (inputs: any) => `你是一位臨床心理師，專精處理華人家庭中的情緒勒索與代間創傷議題，在台灣執業超過 10 年。\n\n【任務】\n根據以下情境，幫我設計：(1) 一份「勒索句型解碼表」（對應 [[${inputs.strat}]]）；(2) 對應的回應方式；(3) 一份長期的「邊界建立行動計畫」。\n- 勒索者：[[${inputs.bully}]]\n- 常見勒索句型：[[${inputs.phrase}]]\n- 我的愧疚點：[[${inputs.guilt}]]\n- 理想邊界：[[${inputs.boundary}]]\n- 能否遠離：[[${inputs.link}]]\n\n【規則】\n1. 回應話術不超過 20 字——在情緒高壓下，大腦只能處理短句。\n2. 嚴禁使用：「你不要這樣」（指責語氣）、「我理解你」（在勒索情境中這句會被當成妥協的訊號）。\n3. 每句回應必須通過「尊嚴測試」：講完這句話後，使用者不會覺得自己更渺小。\n4. 邊界行動計畫必須是「漸進式」的——不是一次性翻桌，而是像溫水慢慢調溫度。\n5. 最後附上一段【自我鬆綁語】（30 字內），用來在愧疚感湧上來時複誦，提醒自己：「設界線不是不愛，是為了能繼續愛。」`
  },
  {
    id: "soul_forge",
    tab: "職場求生",
    isPro: true,
    outputFormat: "履歷與面試內容",
    icon: <Dumbbell className="w-8 h-8 text-indigo-500" />,
    color: "indigo",
    title: "鍛魂爐：經歷翻譯術",
    desc: "解決履歷經歷欄空白、人生毫無亮點的自我價值匱乏症。將瑣碎經歷翻譯為商業產值。",
    tags: ["求職", "履歷", "個人價值"],
    fields: [
      { id: "target", label: "目標職位", placeholder: "例：科技公司 PM" },
      { id: "exp", label: "你的經歷", placeholder: "例：社團組長/打工/系上專題" },
      { id: "weak", label: "我怕被問的弱點", placeholder: "例：沒有正式實習經驗" },
      { id: "culture", label: "公司文化", placeholder: "例：強調快速迭代與自驅力" },
      { id: "pride", label: "你最驕傲的小事", placeholder: "例：在社團用 Notion 建了一套專案流程" }
    ],
    tweak: { 
      id: "strat", 
      label: "敘事流派", 
      options: [
        "故事淬鍊型：用 STAR 法則把平凡經歷煉成黃金故事。", 
        "技能遷移型：證明打工/社團學到的能力完全適用於目標職位。", 
        "潛力敘事型：承認經驗不足但用學習速度說服對方「我會很快上手」。"
      ] 
    },
    theory: "基於自我效能理論與敘事心理學：履歷焦慮是認同問題。運用「外化技術」將問題從「我不夠好」轉化為「尚未找到正確敘事框架」。",
    generate: (inputs: any) => `你是一位曾在 Google、台積電擔任招募主管的職涯策略師。你的信條是：「沒有無聊的經歷，只有不會翻譯的人。」\n\n【任務】\n根據以下素材，幫我完成（對應 [[${inputs.strat}]]）：(1) 一份針對目標職位的履歷重點（3 條 bullet points）；(2) 一段 150 字的自傳摘要；(3) 面試被問到弱點時的回答腳本。\n- 目標職位：[[${inputs.target}]]\n- 我的經歷：[[${inputs.exp}]]\n- 我怕被問的弱點：[[${inputs.weak}]]\n- 公司文化：[[${inputs.culture}]]\n- 一件我覺得不算什麼的事：[[${inputs.pride}]]\n\n【規則】\n1. Bullet points 必須用「動詞 + 量化成果 + 商業價值」結構，嚴禁用「負責XXX」開頭——「負責」是最沒有力量的動詞。\n2. 自傳嚴禁使用：「我是一個積極樂觀的人」「我善於團隊合作」「我對這份工作充滿熱忱」——這些是垃圾場等級的廢話。\n3. 弱點回答必須用「承認→轉化→證據」三段結構，承認不超過 1 句，轉化和證據佔 80% 篇幅。\n4. 所有內容必須用目標公司文化的「語言」來寫——如果公司強調「迭代」，你的履歷裡就要有迭代；如果強調「數據」，你就要放數字。\n5. 最後附上一份【面試前 Power Pose 儀式】：進面試場前 5 分鐘要做的心理準備動作。`
  },
  {
    id: "demon_mirror",
    tab: "職場求生",
    isPro: true,
    outputFormat: "三階段反制計畫",
    icon: <BarChart className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "照妖鏡：職場防禦陣",
    desc: "解決被同事背刺、打小報告卻不知如何反擊的暗箭。運用賽局理論奪回敘事權。",
    tags: ["職場政治", "自證清白", "權力博弈"],
    fields: [
      { id: "enemy", label: "背刺者", placeholder: "例：同事小王" },
      { id: "action", label: "他做了什麼", placeholder: "例：跟主管說是我沒交東西" },
      { id: "evidence", label: "清白證據", placeholder: "例：Email 紀錄顯示我準時交付" },
      { id: "boss", label: "老闆態度", placeholder: "例：半信半疑，開始冷淡" },
      { id: "pref", label: "策略偏好", placeholder: "例：不撕破臉" }
    ],
    tweak: { 
      id: "strat", 
      label: "反制風格", 
      options: [
        "證據鏈陽謀型：不指控任何人，只是「正常流程」地把證據攤出來。簡稱：真相自己說話。", 
        "結盟圍堵型：先爭取其他同事信任，形成「多數共識」孤立背刺者。簡稱：公理自在人心。", 
        "私下攤牌型：直接找對方一對一談，用壓力迫使對方收手。簡稱：我知道你在搞鬼。"
      ] 
    },
    theory: "基於賽局理論重複博弈：職場中真相不重要，敘事權才重要。運用「以直報怨」策略，讓你的版本成為預設敘事。",
    generate: (inputs: any) => `你是一位前麥肯錫高級顧問，現在專門輔導企業中高層處理辦公室政治與權力博弈。你的鐵律是：「職場裡贏的人不是最會吵的，是最會控制故事線的。」\n\n【任務】\n根據以下情境，幫我設計一套「三階段反制計畫」（對應 [[${inputs.strat}]]）：\n- 第一階段（48小時內）：止血——阻止事態繼續惡化\n- 第二階段（1-2週內）：翻盤——讓主管重新信任我\n- 第三階段（長期）：設防——確保同樣的事不再發生\n\n情境資訊：\n- 背刺者：[[${inputs.enemy}]]\n- 他做了什麼：[[${inputs.action}]]\n- 我的證據：[[${inputs.evidence}]]\n- 老闆態度：[[${inputs.boss}]]\n- 我的策略偏好：[[${inputs.pref}]]\n\n【規則】\n1. 所有建議必須通過「HR 安全測試」——不被貼上「難搞」標籤。\n2. 嚴禁建議：「直接跟老闆說他在說謊」（這是攤牌不是策略）、「忍一忍就好了」（這是放棄不是策略）。\n3. 第一階段必須包含一個「紀錄行為」——把什麼東西、用什麼形式留下來。\n4. 翻盤階段必須設計至少一次「自然曝光機會」。\n5. 每個階段附上【該說的話】和【絕對不能說的話】邏輯範例。`
  }
];