import { 
  Sparkles, Flame, Droplets, Wind, Copy, ExternalLink, ChevronDown, X, Search, Check,
  ShieldAlert, Hand, Mail, TrendingUp, Gavel, ShoppingBag, Map, LogOut, Lightbulb, Smile,
  AlertTriangle, Ban, BarChart, Home, Hammer, Navigation, FileText, Zap,
  Ghost, GraduationCap, Coins, Handshake, Trash2, HeartOff, PenTool, Send, Calendar, Megaphone, 
  Beer, ShieldCheck, UserPlus, Wallet, HelpCircle, ClipboardList, Clock, Receipt, Heart, Music,
  Dumbbell, Star, CircleDollarSign, VolumeX, Headset, ShieldX, Swords, Gift, Users,
  Brain, Bot, MessageSquare, Lock, Scissors, Coffee, HeartCrack, PiggyBank,
  Languages, Timer, HeartHandshake, Building, Moon, Eye, Phone, Sword, Mic, RefreshCcw,
  Film, Magnet, Newspaper, Wand2, Video
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
  },

  // ── 合約類十大咒語 (⑪–⑳) ──────────────────────────────────────────────

  {
    id: "lease_deminer",
    tab: "日常雜症",
    isPro: false,
    outputFormat: "條款體檢報告",
    icon: <Home className="w-8 h-8 text-amber-500" />,
    color: "amber",
    title: "破陣眼：租屋防禦術",
    desc: "解決「看完租屋合約 20 頁眼睛脫窗，不知道哪些條款是地雷、哪些是唬人」的租屋菜雞恐慌症。",
    tags: ["租屋", "合約審查", "押金保護"],
    fields: [
      { id: "lease_type", label: "租屋類型", placeholder: "例：台北市套房，月租 12,000" },
      { id: "landlord_type", label: "房東類型", placeholder: "例：很客氣但合約超長" },
      { id: "suspicious_clause", label: "合約中可疑條款", placeholder: "例：提前退租須賠三個月租金" },
      { id: "deposit", label: "你的押金狀況", placeholder: "例：押兩個月" },
      { id: "worry", label: "你最擔心的事", placeholder: "例：被趕走或押金被吃掉" }
    ],
    tweak: {
      id: "strat",
      label: "策略選擇",
      options: [
        "逐條掃雷型：像拆彈專家一樣，逐條標記「安全/注意/危險」。",
        "對照基準型：用內政部公版租約當基準線，找出所有「偏離值」。",
        "談判改寫型：不只找地雷，還直接幫你生成「修改建議版」的替代條款。"
      ]
    },
    theory: "基於資訊不對稱理論 (Akerlof) 與預設效應：租屋合約恐懼的深層心理是「我根本看不懂，但如果我問太多，房東會覺得我難搞」。本咒語透過可辨識性轉換，將法律黑話翻譯成人話，打破資訊不對稱的權力結構。",
    generate: (inputs: any) => `你是一位在台灣執業超過 15 年的不動產律師，同時是租屋糾紛調解委員。你的核心理念是：「合約是可以談的，不敢談的人付出最貴的代價。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n(1) 針對我提供的可疑條款，做一份「條款體檢報告」——用🟢安全/🟡注意/🔴危險三個等級分類，每條附上 30 字以內的白話翻譯。\n(2) 針對所有🔴危險條款，生成「建議修改版」——直接給我可以拿去跟房東談的替代文字。\n(3) 一份「簽約前必問清單」——列出 5 個我必須當面問房東、而且必須錄音或留文字紀錄的問題。\n\n情境資訊：\n- 租屋類型：[[${inputs.lease_type}]]\n- 房東類型：[[${inputs.landlord_type}]]\n- 可疑條款：[[${inputs.suspicious_clause}]]\n- 押金狀況：[[${inputs.deposit}]]\n- 我最擔心的事：[[${inputs.worry}]]\n\n【規則】\n1. 所有法律依據必須標注台灣現行法規條號（如《民法》第 XXX 條、《租賃住宅市場發展及管理條例》第 X 條），嚴禁只說「依法」兩字帶過。\n2. 嚴禁使用「建議諮詢律師」作為結尾萬用句——你自己就是律師，你給的就是法律意見。\n3. 「建議修改版」的替代條款必須用「對等原則」——如果房東有權提前終止，房客也必須有相同權利。\n4. 所有翻譯必須用租屋族聽得懂的台灣口語，禁止出現「甲方」「乙方」「茲因」等法律文言文。\n5. 最後附上一段【談判開場白】——讓我能自然地跟房東說「這幾條我想討論一下」而不像在宣戰。`
  },

  {
    id: "consumer_exorcism",
    tab: "日常雜症",
    isPro: false,
    outputFormat: "合約紅旗清單",
    icon: <ShoppingBag className="w-8 h-8 text-pink-500" />,
    color: "pink",
    title: "隱墨現形術：消費防割韭",
    desc: "解決「健身房/補習班/美容院合約綁超久、退費超難、業務話術超滑」的消費型合約割韭菜防禦。",
    tags: ["消保法", "退費", "業務話術"],
    fields: [
      { id: "biz_type", label: "業者類型", placeholder: "例：連鎖健身房" },
      { id: "duration", label: "合約期限", placeholder: "例：兩年" },
      { id: "monthly_fee", label: "每月費用", placeholder: "例：月繳 1,388 元" },
      { id: "refund_clause", label: "退費條款", placeholder: "例：未滿一年解約須付違約金 3,000 元加手續費" },
      { id: "sales_words", label: "業務說的話", placeholder: "例：之後隨時都可以停約啦" }
    ],
    tweak: {
      id: "strat",
      label: "策略選擇",
      options: [
        "法規照妖型：用消保法逐條打臉不合理條款。",
        "談判壓價型：利用法規當談判籌碼，爭取更好的條件而非直接翻臉。",
        "證據佈局型：教你簽約前怎麼留證據，讓未來退費有武器可用。"
      ]
    },
    theory: "基於承諾與一致性原則 (Cialdini) 與沉沒成本謬誤：業者的套路核心是承諾升級術——先讓你說「好」一次，再用一致性壓力逼你簽長約。本咒語運用逆向承諾拆解術，在簽約前先識破節點，插入「暫停機制」。",
    generate: (inputs: any) => `你是一位台灣消費者保護官，同時是消保法實務操作的權威講師。你的座右銘是：「合約上沒寫的，就當作不存在。嘴巴說的，風一吹就散。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n(1) 一份「合約紅旗清單」——找出所有違反消保法或顯失公平的條款，並標注對應法條。\n(2) 一份「業務話術翻譯表」——用「他說的→合約上寫的→真正的意思」三欄結構呈現。\n(3) 一份「簽約前保命 SOP」——如果我決定簽，哪些動作必須先做（拍照、錄音、要求加註等）。\n\n情境資訊：\n- 業者類型：[[${inputs.biz_type}]]\n- 合約期限：[[${inputs.duration}]]\n- 每月費用：[[${inputs.monthly_fee}]]\n- 退費條款：[[${inputs.refund_clause}]]\n- 業務說的話：[[${inputs.sales_words}]]\n\n【規則】\n1. 必須引用台灣《消費者保護法》《定型化契約應記載及不得記載事項》的具體條號，明確說「違反第X條」或「處於灰色地帶，理由是...」。\n2. 業務話術翻譯表必須讓對比一目了然。\n3. 嚴禁建議「那就不要簽」——重點是幫他「簽得安全」。\n4. 保命 SOP 必須包含至少一個「書面化」動作——把業務的口頭承諾轉成白紙黑字的具體作法。\n5. 最後提供一份【事後退費劇本】——從撥打 1950 消保專線到寫申訴書的完整流程。`
  },

  {
    id: "freelance_shield",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "接案合約文本",
    icon: <ShieldCheck className="w-8 h-8 text-cyan-500" />,
    color: "cyan",
    title: "鑄盾令：接案自保術",
    desc: "解決「自由接案不敢談合約，怕一提錢對方就跑、不提又怕被白嫖」的 Freelancer 裸奔症。",
    tags: ["接案", "合約", "Freelancer"],
    fields: [
      { id: "case_type", label: "接案類型", placeholder: "例：品牌 LOGO 設計" },
      { id: "amount", label: "案件金額", placeholder: "例：30,000 元" },
      { id: "client_type", label: "客戶類型", placeholder: "例：新創公司老闆，第一次合作" },
      { id: "worst_case", label: "最怕的情況", placeholder: "例：做完不付錢，或無限改稿" },
      { id: "contract_status", label: "目前有無合約", placeholder: "例：只有 LINE 對話紀錄" }
    ],
    tweak: {
      id: "strat",
      label: "合約風格",
      options: [
        "極簡合約型：一頁內搞定的精簡合約，適合小案子、不想嚇跑對方。",
        "完整防禦型：涵蓋所有常見糾紛情境的正式合約。",
        "軟性協議型：不用「合約」兩個字，用「合作備忘錄」包裝，降低對方防禦心。"
      ]
    },
    theory: "基於交易成本理論 (Williamson) 與心理契約 (Rousseau)：Freelancer 不敢談合約的深層恐懼是「提合約 = 暗示不信任 = 破壞關係」。本咒語運用框架效應將「簽合約」重新包裝為「讓合作更順暢的工具」。",
    generate: (inputs: any) => `你是一位專門服務台灣自由工作者的商務律師，你自己也曾當過 5 年的 Freelance 設計師。你最懂的事是：「怎麼讓合約看起來不像合約，但保護力一點都不少。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n(1) 一份合約文本（根據策略風格調整詳略程度），必須涵蓋：工作範圍、交付時程、付款方式（含分期節點）、修改次數上限、智慧財產權歸屬、終止條件。\n(2) 一段「開口邀請簽約的話術」——讓我能自然地把合約丟出來，不尷尬。\n(3) 一份「常見坑洞對照表」——5 個 Freelancer 最常踩到的合約地雷和防禦方式。\n\n案件資訊：\n- 接案類型：[[${inputs.case_type}]]\n- 案件金額：[[${inputs.amount}]]\n- 客戶類型：[[${inputs.client_type}]]\n- 最怕的情況：[[${inputs.worst_case}]]\n- 目前有無合約：[[${inputs.contract_status}]]\n\n【規則】\n1. 合約文本必須是台灣法律框架下有效的——使用中華民國法律用語，管轄法院寫台灣的法院，幣值用新臺幣。\n2. 付款條款必須設計「分期制」——至少拆成「簽約訂金 + 中期款 + 尾款」三階段，嚴禁出現「全部完成後一次付清」。\n3. 必須明確寫入「修改次數上限」與「超出修改的計費方式」。\n4. 語氣要專業但不要像在法院打官司——合約的目的是「建立信任」不是「威嚇對方」。\n5. 最後附上一段【收到錢之前不要做的三件事】——用血淚經驗提醒接案者哪些行為會讓自己陷入被動。`
  },

  {
    id: "refund_tide",
    tab: "日常雜症",
    isPro: false,
    outputFormat: "退費作戰計畫",
    icon: <Receipt className="w-8 h-8 text-orange-500" />,
    color: "orange",
    title: "退潮術：退費實戰法",
    desc: "解決「花了大錢買課程/療程/會員，用了才發現是盤子，想退費卻被合約卡住」的冤大頭覺醒後遺症。",
    tags: ["退費", "消保法", "申訴"],
    fields: [
      { id: "purchase", label: "購買項目", placeholder: "例：線上英文課程 100 堂，總價 80,000 元" },
      { id: "used_amount", label: "已使用量", placeholder: "例：上了 5 堂" },
      { id: "refund_block", label: "退費阻礙", placeholder: "例：合約寫不退費、已超過鑑賞期" },
      { id: "time_since", label: "簽約距今", placeholder: "例：2 個月前" },
      { id: "evidence", label: "手上有什麼", placeholder: "例：合約影本、付款紀錄、LINE 對話" }
    ],
    tweak: {
      id: "strat",
      label: "退費策略",
      options: [
        "消保法核彈型：直接走法律途徑，引用具體條文要求退費。",
        "協商談判型：不撕破臉，用法律當底牌但以協商方式爭取最大退費金額。",
        "行政施壓型：透過消保官、公平會等行政管道施壓，讓業者主動讓步。"
      ]
    },
    theory: "基於稟賦效應與現狀偏誤：退費恐懼的深層心理是「承認退費 = 承認自己當初判斷錯誤」。業者利用心理加上「退費流程故意設計得極度複雜」製造放棄成本。本咒語運用認知重評，將退費重新框架為「理性止損的高智商行為」。",
    generate: (inputs: any) => `你是一位台灣消費者保護領域的訴訟律師，經手過超過 200 件退費糾紛案件，勝率 85%。你的原則是：「法律保護的不是乖乖牌，是懂得用法律的人。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n(1)「法律武器盤點」——我的情況可以引用哪些法條、判例或行政函釋來主張退費。\n(2)「三封信戰術」——①給業者的第一封存證信函（友善但有壓力）、②給消保官的申訴信、③給法院的小額訴訟起訴狀重點。\n(3)「退費金額試算」——根據我的使用量，合理的退費金額應該是多少。\n\n情境資訊：\n- 購買項目：[[${inputs.purchase}]]\n- 已使用量：[[${inputs.used_amount}]]\n- 業者拒退理由：[[${inputs.refund_block}]]\n- 簽約距今：[[${inputs.time_since}]]\n- 手上的證據：[[${inputs.evidence}]]\n\n【規則】\n1. 法律引用必須精準到條號與項次（如《消保法》第 19 條第 1 項），並附上白話翻譯。嚴禁用「相關法規規定」這種空話。\n2. 存證信函必須使用正式但不過度威脅的語氣——目的是讓對方知道「你懂法」，不是真的要上法院（第一步）。\n3. 退費金額試算必須扣除「已享用的等比例費用」，不能主張全額退費除非有法律依據。\n4. 嚴禁建議「算了當學教訓」——每一塊錢都值得爭取。\n5. 每封信都必須附上【寄送方式指引】——用什麼方式寄、寄到哪裡、怎麼保留寄送證明。`
  },

  {
    id: "partnership_pact",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "合夥協議書",
    icon: <Handshake className="w-8 h-8 text-green-500" />,
    color: "green",
    title: "共生契：合夥防爆術",
    desc: "解決「跟朋友一起創業或合夥開店，談錢傷感情、不談錢散夥更傷」的友情炸彈拆除。",
    tags: ["合夥", "創業", "友情保護"],
    fields: [
      { id: "biz", label: "合夥項目", placeholder: "例：開一間咖啡店" },
      { id: "partners", label: "合夥人數", placeholder: "例：3 個人（包含我）" },
      { id: "investment", label: "出資比例", placeholder: "例：我 50 萬、A 30 萬、B 20 萬" },
      { id: "division", label: "分工方式", placeholder: "例：我管營運、A 管財務、B 管行銷" },
      { id: "landmine", label: "最怕的地雷", placeholder: "例：有人出錢不出力，或意見不合時沒人讓步" }
    ],
    tweak: {
      id: "strat",
      label: "協議風格",
      options: [
        "全套合夥協議型：生成一份正式的合夥契約書，所有情況都寫清楚。",
        "核心條款精簡型：只鎖定最容易爆炸的 5 大議題，生成重點條款。",
        "對話引導型：先生成一份「合夥前必聊清單」，讓你們在簽約前先把醜話說清楚。"
      ]
    },
    theory: "基於團體迷思 (Janis) 與公平理論 (Adams)：合夥最致命的病毒是「因為是朋友所以不好意思講清楚」——而這恰恰是日後 90% 合夥糾紛的根源。本咒語設計「貢獻—回報對等矩陣」，將模糊的「感覺」轉化為可量化的「契約」。",
    generate: (inputs: any) => `你是一位台灣中小企業法務顧問，經手過超過 300 件合夥糾紛。你最常跟客戶說的話是：「好的合夥協議不是防小人，是防誤會。小人會走，誤會會殺死友情。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n(1) 一份合夥協議（根據策略風格調整詳略程度），必須涵蓋：出資與股權、分潤與虧損分攤、決策機制（尤其是意見不合時的仲裁規則）、退夥與除名機制、競業禁止。\n(2) 一份「合夥前必聊清單」——10 個你們在簽約前必須當面講清楚的問題，附上每題「為什麼要問」的理由。\n(3) 一份「關係存續機制」——當合夥出現摩擦時，如何用制度解決而不是吵架。\n\n合夥資訊：\n- 合夥項目：[[${inputs.biz}]]\n- 合夥人數：[[${inputs.partners}]]\n- 出資比例：[[${inputs.investment}]]\n- 分工方式：[[${inputs.division}]]\n- 最怕的地雷：[[${inputs.landmine}]]\n\n【規則】\n1. 必須設計「決策僵局打破機制」——當票數持平時的具體解法（輪值決策權、外部仲裁、買斷條款）。嚴禁寫「大家好好溝通」這種廢話。\n2. 退夥條款必須包含「估值公式」——退夥時股份怎麼算，不能只寫「雙方協商」。\n3. 出資比例與分潤比例如果不一致，必須設計「勞務出資折算」機制。\n4. 語氣必須同時達成「法律有效」和「朋友能接受」。\n5. 最後附上一段【把合約丟出來的開場白】——讓使用者能自然地說：「我找人幫我們擬了一份東西，大家一起看看。」`
  },

  {
    id: "onboarding_shield",
    tab: "職場求生",
    isPro: false,
    outputFormat: "合約逐條翻譯",
    icon: <FileText className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "結界術：到職簽約防禦",
    desc: "解決「公司叫你簽一堆東西但你根本不知道自己簽了什麼，也不敢不簽」的新人到職合約恐慌。",
    tags: ["勞動契約", "NDA", "競業禁止"],
    fields: [
      { id: "company", label: "到職公司", placeholder: "例：中型科技公司" },
      { id: "documents", label: "簽署文件", placeholder: "例：勞動契約、保密協議 (NDA)、競業禁止條款" },
      { id: "suspicious", label: "可疑條款", placeholder: "例：離職後兩年內不得從事同業工作" },
      { id: "leverage", label: "你的談判空間", placeholder: "例：這份工作是唯一 offer，不太敢講話" },
      { id: "concern", label: "你最在意的", placeholder: "例：離職後不能去同業" }
    ],
    tweak: {
      id: "strat",
      label: "防禦策略",
      options: [
        "全文體檢型：逐份文件審閱，標記所有需要注意的條款。",
        "精準狙擊型：只針對你最擔心的條款做深度分析，給出法律底線與談判建議。",
        "沉默修改型：教你怎麼在「不拒簽」的前提下，用手寫加註或附函方式保護自己。"
      ]
    },
    theory: "基於權力距離理論 (Hofstede) 與習得性無助 (Seligman)：到職簽約的深層恐懼是「我還沒開始工作就跟公司對著幹，會不會被黑掉？」。本咒語運用微觀賦權策略——不是鼓勵你「勇敢說不」，而是教你「在說好的同時，悄悄加上保護自己的條件」。",
    generate: (inputs: any) => `你是一位台灣勞動法律師，同時擔任勞動部的勞資爭議調解人。你的信條是：「勞動契約不是聖旨。法律給你的權利，老闆不能用一張紙拿走。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n(1)「逐條翻譯」——把每份文件的關鍵條款翻成白話，標注🟢合理 / 🟡可議 / 🔴違法或顯失公平。\n(2) 針對🔴和🟡條款，提供「三種回應方式」：直接談判的話術、沉默修改的手寫加註範本、以及「簽了但事後可主張無效」的法律依據。\n(3) 一份「勞工權利小抄」——5 條你在到職第一天就該知道的台灣勞基法保障。\n\n情境資訊：\n- 到職公司：[[${inputs.company}]]\n- 簽署文件：[[${inputs.documents}]]\n- 可疑條款：[[${inputs.suspicious}]]\n- 談判空間：[[${inputs.leverage}]]\n- 最在意的：[[${inputs.concern}]]\n\n【規則】\n1. 競業禁止條款必須依《勞基法》第 9-1 條逐項檢驗四大要件，缺一項就可主張無效。\n2. 嚴禁只說「可以不簽」——要給使用者一條「既簽了又保護自己」的路。\n3. 手寫加註範本必須合法有效——註明加註位置、格式、需不需要對方副署。\n4. 所有建議必須考慮使用者「沒有談判本錢」的現實處境。\n5. 最後附上一段【心理建設語】——提醒使用者：「要求看清楚再簽，是成熟不是找碴。任何因此不要你的公司，都不值得去。」`
  },

  {
    id: "loan_armor",
    tab: "人際擋箭",
    isPro: true,
    outputFormat: "借貸文件 + 話術",
    icon: <PiggyBank className="w-8 h-8 text-yellow-500" />,
    color: "yellow",
    title: "金鐘罩：親友借貸防護",
    desc: "解決「親戚朋友開口借錢，不借傷感情、借了怕拿不回來，更不好意思提簽借據」的人情債困境。",
    tags: ["借錢", "借據", "人情管理"],
    fields: [
      { id: "borrower", label: "借錢的人", placeholder: "例：從小一起長大的表哥" },
      { id: "amount", label: "借款金額", placeholder: "例：100,000 元" },
      { id: "reason", label: "借款理由", placeholder: "例：週轉房租，下個月就還" },
      { id: "willingness", label: "你的意願", placeholder: "例：願意借但怕拿不回來" },
      { id: "risk", label: "關係風險", placeholder: "例：表哥可能覺得被看不起" }
    ],
    tweak: {
      id: "strat",
      label: "借貸策略",
      options: [
        "正式借據型：生成一份法律有效的借據，教你怎麼自然地提出。",
        "軟性備忘型：不叫「借據」，用 LINE 訊息建立有法律效力的文字紀錄。",
        "止損設計型：設計一個「借一部分 + 設停損點」的方案，控制損失上限。"
      ]
    },
    theory: "基於社會交換理論與樂觀偏差 (Optimism Bias)：借方通常嚴重樂觀（「下個月一定還」），出借方則有「關係維護偏差」——高估不簽借據的關係收益、低估拿不回錢的財務風險。本咒語將「人情」轉化為「可管理的風險敞口」。",
    generate: (inputs: any) => `你是一位同時具備法律執照與家族治療背景的諮詢師。你的核心觀點是：「借據不是不信任的證明，是讓雙方都能安心的工具。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n(1) 一份適合的借貸文件（根據策略風格調整格式），確保在法律上可作為債權證明。\n(2) 一段「提出簽借據的話術」——讓我能自然地要求留下紀錄，不傷感情。\n(3) 一份「借貸風險評估表」——幫我冷靜判斷「該不該借」以及「該借多少」。\n\n情境資訊：\n- 借錢的人：[[${inputs.borrower}]]\n- 借款金額：[[${inputs.amount}]]\n- 借款理由：[[${inputs.reason}]]\n- 我的意願：[[${inputs.willingness}]]\n- 關係風險：[[${inputs.risk}]]\n\n【規則】\n1. 借據必須包含法律上的有效要素：借貸雙方姓名身分證字號、金額（大小寫並列）、借款日期、約定還款日期、利率（有的話）、雙方簽名。嚴禁漏掉任何一項。\n2. LINE 備忘型必須教使用者「怎麼用幾句對話把六大要素都涵蓋進去」，看起來像聊天但法律上站得住腳。\n3. 止損設計必須包含一個「心理止損數字」的計算方式——「借出這個金額後，即使拿不回來，我也不會記恨對方」的那個數字。\n4. 嚴禁道德說教（如「不要借錢給朋友」）——使用者已決定面對這個問題了。\n5. 最後附上一段【催收話術分級指南】——從「溫馨提醒」到「正式催告」到「存證信函」三個等級的範本。`
  },

  {
    id: "exit_pass",
    tab: "職場求生",
    isPro: false,
    outputFormat: "離職全流程 SOP",
    icon: <LogOut className="w-8 h-8 text-slate-500" />,
    color: "slate",
    title: "離場券：離職保全術",
    desc: "解決「想離職但不確定合約上有沒有坑、怕被扣薪、怕競業禁止、怕預告期算錯」的離職恐懼。",
    tags: ["離職", "競業禁止", "勞基法"],
    fields: [
      { id: "company_type", label: "公司類型", placeholder: "例：上市科技公司" },
      { id: "tenure", label: "年資", placeholder: "例：2 年 4 個月" },
      { id: "restrictions", label: "合約限制", placeholder: "例：競業禁止、保密條款、最低服務年限條款" },
      { id: "reason", label: "離職原因", placeholder: "例：拿到更好的 offer" },
      { id: "worry", label: "最擔心的", placeholder: "例：被前公司告、或拿不到非自願離職證明" }
    ],
    tweak: {
      id: "strat",
      label: "離職策略",
      options: [
        "合約解鎖型：逐條分析你簽過的限制條款是否合法有效，找出可以掙脫的缺口。",
        "完美離場型：設計一套從提離職到最後一天的完整 SOP，滴水不漏。",
        "談判撤銷型：教你怎麼在離職時「順便」談掉競業禁止等限制條款。"
      ]
    },
    theory: "基於前景理論的損失厭惡與承諾升級陷阱：員工對離職合約限制的恐懼通常被高估——「損失厭惡」讓人把「可能被告」的風險放大了數倍。本咒語運用法律現實測試，將模糊的恐懼還原為「實際上會不會被執行」的理性機率評估。",
    generate: (inputs: any) => `你是一位台灣勞動法訴訟律師，代理過上百件離職糾紛案，從工程師到高階主管都處理過。你最常說的話是：「老闆最強的武器不是法律，是讓你以為法律站在他那邊。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n(1)「合約枷鎖體檢」——逐條審視我簽過的限制條款，判定其法律效力（有效/可爭議/無效），附上法律依據。\n(2)「離職全流程 SOP」——從決定離職到拿到離職證明的每一步，包含預告期計算、交接清單、該留存的文件。\n(3)「最壞情況兵棋推演」——如果前公司真的想搞我，他們可能做什麼？我該怎麼準備？\n\n情境資訊：\n- 公司類型：[[${inputs.company_type}]]\n- 年資：[[${inputs.tenure}]]\n- 簽過的限制：[[${inputs.restrictions}]]\n- 離職原因：[[${inputs.reason}]]\n- 最擔心的：[[${inputs.worry}]]\n\n【規則】\n1. 預告期必須依《勞基法》第 16 條精確計算，不是「大概兩週」這種含糊回答。\n2. 競業禁止分析必須逐一檢驗四大法定要件，任何一項不符就明確告訴使用者「這條很可能無效」。\n3. 最低服務年限條款必須依《勞基法》第 15-1 條檢驗「必要性」與「合理性」。嚴禁只說「看情況」。\n4. 離職 SOP 必須包含「證據保全」步驟——哪些文件要在離職前備份、哪些不能帶走、怎麼合法地留下自己需要的紀錄。\n5. 最後附上一段【離職面談攻略】——HR 會問什麼、哪些話可以說、哪些話說了會變成未來被告的證據。`
  },

  {
    id: "contract_severance",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "三步走終止計畫",
    icon: <Scissors className="w-8 h-8 text-rose-500" />,
    color: "rose",
    title: "割席不見血：合約終止術",
    desc: "解決「跟廠商/合作方撕破臉想終止合約，但怕被告違約或要賠一大筆錢」的斷約恐慌。",
    tags: ["合約終止", "廠商", "違約"],
    fields: [
      { id: "contract_type", label: "合約類型", placeholder: "例：跟網頁設計公司的委託開發合約" },
      { id: "termination_reason", label: "想終止的原因", placeholder: "例：對方一再延期交付、品質不符預期" },
      { id: "termination_clause", label: "合約怎麼寫終止", placeholder: "例：任一方違約經催告 30 日未改善得終止" },
      { id: "loss", label: "目前的損失", placeholder: "例：已付 50% 款項（15 萬），但只拿到半成品" },
      { id: "desired_outcome", label: "你想要的結果", placeholder: "例：拿回部分款項 + 拿到原始碼" }
    ],
    tweak: {
      id: "strat",
      label: "終止策略",
      options: [
        "依約終止型：嚴格按照合約條款走，讓對方挑不出毛病。",
        "協議解除型：談一個雙方都能接受的結束方案，避免進法院。",
        "壓力施加型：先發存證信函，再用行政或法律程序的壓力迫使對方讓步。"
      ]
    },
    theory: "基於沉沒成本謬誤與 BATNA 理論 (Fisher & Ury)：終止合約的深層恐懼是「已經投入那麼多了，現在斷掉是不是更虧？」加上「如果我先提終止，對方反咬一口說是我違約怎麼辦？」。本咒語運用 BATNA 分析法，用理性比較取代情緒猶豫。",
    generate: (inputs: any) => `你是一位專精商業契約糾紛的台灣執業律師，特別擅長在不進法院的前提下讓客戶全身而退。你的策略核心是：「終止合約是一場敘事戰——不是誰對誰錯，是誰先把故事講好。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n(1)「終止合法性分析」——我現在能不能合法終止？依據是什麼？風險在哪？\n(2)「三步走終止計畫」——催告信→終止通知→善後協議，每一步的時間表與文件範本。\n(3)「談判劇本」——如果對方不願意放手，我跟他談判時的策略與底線。\n\n情境資訊：\n- 合約類型：[[${inputs.contract_type}]]\n- 終止原因：[[${inputs.termination_reason}]]\n- 合約終止條款：[[${inputs.termination_clause}]]\n- 目前損失：[[${inputs.loss}]]\n- 想要的結果：[[${inputs.desired_outcome}]]\n\n【規則】\n1. 催告信必須是法律上有效的「催告」——符合民法的催告要件，包含具體違約事實、改善期限、未改善之法律效果。\n2. 嚴禁建議「直接不付錢」或「直接不理對方」——這會讓自己從受害者變成違約方。\n3. 終止通知必須區分「合約終止」與「合約解除」的法律效果差異，選擇對使用者最有利的路徑。\n4. 談判劇本必須先設定 BATNA（最佳替代方案）和底線，再設計策略——沒有底線的談判是裸奔。\n5. 最後附上一份【善後 Checklist】——合約終止後你該做什麼（取回資料、確認權利歸屬、保留證據、稅務處理）。`
  },

  {
    id: "immortal_contract",
    tab: "日常雜症",
    isPro: true,
    outputFormat: "致命條款清單",
    icon: <Gavel className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "不朽契：人生大合約術",
    desc: "解決「買房簽約、保險合約、婚前協議等重大人生合約看不懂也不知道該注意什麼」的人生大事裸簽症。",
    tags: ["買房", "保險", "婚前協議"],
    fields: [
      { id: "contract_kind", label: "合約種類", placeholder: "例：預售屋買賣契約" },
      { id: "contract_amount", label: "合約金額", placeholder: "例：總價 1,200 萬" },
      { id: "role", label: "你的身份", placeholder: "例：買方（首購族）" },
      { id: "worry", label: "你最擔心的", placeholder: "例：建商蓋到一半跑路" },
      { id: "knowledge_level", label: "知識程度", placeholder: "例：完全是小白" }
    ],
    tweak: {
      id: "strat",
      label: "審查策略",
      options: [
        "全面體檢型：逐章節審閱合約，像做全身健檢一樣不漏掉任何器官。",
        "致命條款狙擊型：只看最容易出事的 5-7 個條款，集中火力。",
        "小白速成型：先給你一份「這類合約的基礎知識懶人包」，再帶你看條款。"
      ]
    },
    theory: "基於有限理性 (Simon) 與資訊過載：重大合約恐懼的深層心理是「這份合約可能決定我未來十年的生活品質，但我根本搞不懂它在寫什麼，而我又不能不簽」。人在資訊過載時會啟動「滿意化策略」——不再追求最優解，隨便找一個「看起來還好」的選項就簽了。本咒語運用關鍵少數原則 (Pareto) 從動輒 30 頁的合約中萃取真正影響你權益的 20% 條款。",
    generate: (inputs: any) => `你是一位台灣執業超過 20 年的民事律師，專精不動產交易、保險契約、與家事法（含婚前協議）。你處理過的合約總金額超過百億。你的核心理念是：「合約不難，難的是沒有人用你聽得懂的話跟你解釋。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n(1)「合約架構導讀」——用一張表格列出這份合約的章節結構，每章用一句話說明「這章在保護誰」。\n(2)「致命條款清單」——挑出最容易出問題的 5-7 條，每條做三件事：白話翻譯、風險等級（🟢🟡🔴）、以及「簽之前你該確認什麼」。\n(3)「談判籌碼盤點」——在這類合約中，哪些條款其實是「可以改的」，以及怎麼開口改。\n\n情境資訊：\n- 合約種類：[[${inputs.contract_kind}]]\n- 合約金額：[[${inputs.contract_amount}]]\n- 我的身份：[[${inputs.role}]]\n- 最擔心的：[[${inputs.worry}]]\n- 知識程度：[[${inputs.knowledge_level}]]\n\n【規則】\n1. 所有解釋必須通過「阿嬤測試」——你阿嬤聽了也能懂。嚴禁使用任何未經翻譯的法律術語。\n2. 必須標注哪些條款是「政府有公版/應記載事項」，偏離公版的必須特別標記。\n3. 不動產合約必須檢查：履約保證機制、交屋條件、瑕疵擔保、違約處理。保險合約必須檢查：除外責任、等待期、理賠條件。婚前協議必須檢查：財產分配、債務歸屬、贍養費。\n4. 嚴禁輸出「合約看起來沒什麼問題」這種結論——律師的價值是找出「你以為沒問題但其實有問題」的地方。\n5. 最後附上一份【簽約當天 Checklist】——從帶什麼文件、到簽名時要注意什麼、到簽完後要留存什麼，每一步都列出來。`
  },
  {
    id: "human_translator",
    tab: "職場求生",
    isPro: false,
    outputFormat: "職場暗語翻譯報告",
    icon: <Languages className="w-8 h-8 text-teal-600" />,
    color: "teal",
    title: "人體翻譯機",
    desc: "解決「主管、同事、客戶講話永遠有弦外之音，聽懂了氣死、聽不懂被賣」的職場密碼破譯困境。",
    tags: ["職場暗語", "弦外之音", "密碼破譯"],
    fields: [
      { id: "quote", label: "對方說的話", placeholder: "例：這個方案『很有創意』，但我們可能需要更『務實』一點" },
      { id: "who", label: "誰說的", placeholder: "例：直屬主管" },
      { id: "context", label: "說的場合", placeholder: "例：週會上當著所有人的面" }
    ],
    tweak: {
      id: "strat",
      label: "翻譯風格",
      options: [
        "毒舌翻譯型：用最直白、最刻薄的方式翻譯對方真正的意思，適合發 Threads 引爆共鳴。",
        "攻略解盤型：不只翻譯，還告訴你對方下一步會做什麼、你該怎麼接招。",
        "反制話術型：直接給你一句「用同樣的弦外之音」回擊的話，以其人之道還治其人。"
      ]
    },
    theory: "基於語用學 (Pragmatics) 中的合作原則與會話含意 (Grice's Conversational Implicature) 與權力話語分析：職場暗語的深層恐懼是「每個人都在演，只有我在當真——我不是聽不懂中文，我是聽不懂『職場中文』」。本咒語本質上是一台「含意解碼器」，將職場話語的「表層語義」與「深層意圖」做系統性拆解。",
    generate: (inputs: any) => `你是一位在台灣科技業與金融業混跡 20 年的職場老鳥，現在轉行當「職場語言翻譯師」。你最出名的技能是：一句話戳破所有職場客套話的真面目。你的翻譯風格：精準、毒辣、但讓人笑著點頭。\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n請幫我翻譯以下這句職場話術的真正含義：\n\n原文：「[[${inputs.quote}]]」\n說話者：[[${inputs.who}]]\n場合：[[${inputs.context}]]\n\n請輸出以下結構：\n① 【表面意思】（對方字面上在說什麼）\n② 【真正意思】（用最直白的台灣口語翻譯，可以毒舌）\n③ 【潛台詞】（對方沒說出口但希望你自己懂的事）\n④ 【危險指數】（🟢沒事/🟡小心/🔴你已經在名單上了）\n⑤ 【建議回應】（一句可以不卑不亢接住的話）\n\n【規則】\n1. 「真正意思」必須用台灣人日常說話的口語寫，像在跟好朋友吐槽一樣。可以毒但不能惡毒。\n2. 嚴禁輸出「可能是你想太多了」這種和稀泥的分析。\n3. 「建議回應」不超過 20 字，必須是能當場說出口的。\n4. 如果這句話真的只是字面意思、沒有弦外之音，你必須誠實地說「這句是真的」，但要附上判斷依據。\n5. 整體輸出風格必須適合被截圖發到 Threads 上。`
  },
  {
    id: "time_seal",
    tab: "日常雜症",
    isPro: false,
    outputFormat: "倒數行動計畫",
    icon: <Timer className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "時間咒印",
    desc: "解決「deadline 就在明天但現在完全不想動，腦子一直在算『如果現在開始還來不來得及』」的拖延末日倒數崩潰。",
    tags: ["拖延急救", "番茄鐘", "deadline"],
    fields: [
      { id: "task", label: "要完成的事", placeholder: "例：3000 字的期末報告" },
      { id: "deadline", label: "Deadline", placeholder: "例：明天早上 9 點" },
      { id: "now_time", label: "現在幾點", placeholder: "例：晚上 11 點" },
      { id: "status", label: "你的狀態", placeholder: "例：已經刷了 2 小時手機，很累但很焦慮" },
      { id: "progress", label: "已完成多少", placeholder: "例：只有標題" }
    ],
    tweak: {
      id: "strat",
      label: "急救模式",
      options: [
        "軍令狀型：把剩餘時間切成精確的時間塊，像軍事行動一樣排程，直接進入執行模式。",
        "毒雞湯開機型：先用一段毒到骨子裡的話把你罵醒，再給你行動計畫。",
        "最低可交付型：告訴你「80 分的作業長什麼樣」，砍掉所有多餘的完美主義。"
      ]
    },
    theory: "基於時間折扣理論 (Temporal Discounting) 與 Zeigarnik Effect：拖延症的深層恐懼不是「懶」，而是「一旦開始做，就必須面對自己可能做不好的事實，所以不開始 = 不失敗」。本咒語運用 Zeigarnik 效應的反向操作——先讓你「只做第一步」，利用未完成任務產生的心理張力驅動後續行動。",
    generate: (inputs: any) => `你是一位前特種部隊作戰參謀，退役後轉行當「deadline 急救教練」。你的名言是：「完美是拖延的保護色。先交出去，再去死。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我正在經歷一場拖延危機，請根據以下資訊幫我制定「倒數行動計畫」：\n- 任務：[[${inputs.task}]]\n- Deadline：[[${inputs.deadline}]]\n- 現在時間：[[${inputs.now_time}]]\n- 我的狀態：[[${inputs.status}]]\n- 完成進度：[[${inputs.progress}]]\n\n請輸出：\n① 【真相時刻】——用一句話告訴我「你現在的處境到底有多緊」\n② 【倒數時間塊】——把剩餘時間切成 25 分鐘為單位的番茄鐘，每個時間塊指定明確的產出目標\n③ 【開機指令】——給我「此刻立刻做的第一個動作」，必須是 30 秒內可以開始的\n④ 【80 分長什麼樣】——告訴我這份東西做到什麼程度就「夠了」\n⑤ 【戰後宣言】——一句交完之後可以發 Threads 的厭世金句\n\n【規則】\n1. 「真相時刻」必須像被甩巴掌——不是安慰，是直擊。\n2. 時間塊排程必須扣除緩衝——每 3 個番茄鐘強制休息 10 分鐘。\n3. 「開機指令」要具體到「打開 Word，在第一行寫下『本報告探討___』」。\n4. 嚴禁任何「你可以的！加油！」正能量垃圾。\n5. 「戰後宣言」必須是讓人看了會心一笑的厭世語錄。`
  },
  {
    id: "apology_ferry",
    tab: "人際擋箭",
    isPro: false,
    outputFormat: "3 版道歉訊息",
    icon: <HeartHandshake className="w-8 h-8 text-pink-500" />,
    color: "pink",
    title: "渡口擺渡人",
    desc: "解決「做錯事想傳訊息道歉，但打了又刪刪了又打，最後什麼都沒傳出去」的道歉訊息難產症。",
    tags: ["道歉訊息", "關係修復", "面子協商"],
    fields: [
      { id: "what_happened", label: "你做了什麼", placeholder: "例：忘記朋友的生日" },
      { id: "target", label: "道歉對象", placeholder: "例：認識十年的閨蜜" },
      { id: "severity", label: "嚴重程度", placeholder: "例：她已經在限動發了暗示文" },
      { id: "channel", label: "管道", placeholder: "例：LINE / IG私訊 / 當面" },
      { id: "personality", label: "你的個性", placeholder: "例：平常很嘴但認真的時候會不好意思" }
    ],
    tweak: {
      id: "strat",
      label: "道歉風格",
      options: [
        "一擊斃命型：一則訊息搞定，不拖泥帶水，開頭就認錯。",
        "梗道歉型：用一個自嘲的梗當開頭，降低雙方的尷尬門檻，再認真道歉。",
        "行動先行型：不傳訊息，先做一件事（訂蛋糕、寫卡片），再搭配一句簡短的話。"
      ]
    },
    theory: "基於面子協商理論 (Face Negotiation Theory) 與關係修復心理學：道歉訊息難產的深層恐懼是「我不怕道歉，我怕道歉了對方不接受——那我連『還沒道歉』這個退路都沒了」。本咒語運用「雙面子模型」——好的道歉必須同時保全自己的「能力面子」和對方的「自主面子」。",
    generate: (inputs: any) => `你是一位人際關係急診室的主治醫師。你的治療方針是：「道歉的品質不在字數，在精準度。一句到位的話，勝過十段解釋。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我需要道歉但卡住了，請幫我生成 3 版道歉訊息：\n- 我做了什麼：[[${inputs.what_happened}]]\n- 道歉對象：[[${inputs.target}]]\n- 嚴重程度：[[${inputs.severity}]]\n- 管道：[[${inputs.channel}]]\n- 我跟對方的互動風格：[[${inputs.personality}]]\n\n請輸出：\n① 【一擊斃命版】——直球道歉，不繞彎（不超過 50 字）\n② 【梗道歉版】——用自嘲開場（不超過 60 字）\n③ 【行動先行版】——推薦一個具體行動 + 搭配的簡短訊息（不超過 30 字訊息）\n\n【規則】\n1. 所有版本的第一句話必須是「承認事實」，不是「解釋原因」。\n2. 嚴禁使用：「如果我讓你不開心」「我不是故意的」。\n3. 梗道歉的幽默必須是「自嘲」不是「淡化」。\n4. 結尾不能要求對方回覆——留空間比索取答案更有力。\n5. 額外輸出一句【傳出去之前的自我喊話】——10 字內，幫使用者按下送出鍵。`
  },
  {
    id: "survival_radar",
    tab: "日常雜症",
    isPro: true,
    outputFormat: "租屋風險掃描報告",
    icon: <Building className="w-8 h-8 text-orange-600" />,
    color: "orange",
    title: "生存雷達",
    desc: "解決「在 591 上看到一間便宜到可疑的房子，不知道是真的撿到寶還是即將踩到雷」的租屋直覺驗證焦慮。",
    tags: ["租屋掃雷", "591", "房東話術"],
    fields: [
      { id: "listing", label: "物件資訊", placeholder: "例：台北大安區套房，7,500/月，含水電，近捷運" },
      { id: "suspicious", label: "可疑之處", placeholder: "例：這個價格在大安區太便宜了" },
      { id: "landlord_words", label: "房東說了什麼", placeholder: "例：剛裝潢好想趕快租出去" },
      { id: "photos", label: "照片狀態", placeholder: "例：照片很新很漂亮但只有三張" }
    ],
    tweak: {
      id: "strat",
      label: "掃描模式",
      options: [
        "紅旗掃描型：像老兵掃地雷一樣，系統性列出所有可疑信號。",
        "話術拆解型：針對房東的每一句話做「翻譯」，告訴你哪句是真話哪句是包裝。",
        "看房劇本型：如果你決定去看，給你一份「現場必做必問」清單。"
      ]
    },
    theory: "基於前景理論 (Prospect Theory) 中的確定性效應：租屋詐騙焦慮的深層心理是「便宜的東西讓人興奮，但興奮感會降低警覺性——我怕我是因為想要才覺得它合理」。本咒語運用系統性風險評估框架，將模糊的「感覺怪怪的」轉化為可逐項檢驗的「風險清單」。",
    generate: (inputs: any) => `你是一位在台灣租屋市場打滾 15 年的租屋老司機，看過上千間房子。語氣直白有趣，像在跟學弟妹聊天。\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n幫我分析這間房子是不是雷：\n- 物件資訊：[[${inputs.listing}]]\n- 我覺得可疑的點：[[${inputs.suspicious}]]\n- 房東說的話：[[${inputs.landlord_words}]]\n- 照片狀態：[[${inputs.photos}]]\n\n請輸出：\n① 【雷達掃描結果】——用🟢安全 / 🟡注意 / 🔴高危 標注每個可疑點\n② 【房東話術翻譯】——把房東每句話翻成「他真正的意思」\n③ 【看房任務清單】——如果決定去看，現場必做的 5 件事\n④ 【一句話判決】——用一句話總結「這間房該不該繼續看」\n⑤ 【Threads 體文案】——幫我寫一則可以發 Threads 分享的短文（100 字內）\n\n【規則】\n1. 分析必須基於台灣租屋市場的實際行情與常見話術。\n2. 嚴禁用「每個人情況不同」當結論。\n3. 看房清單必須包含至少一個「多數人不會想到」的檢查項目。\n4. 「房東話術翻譯」要毒但精準。\n5. Threads 文案必須自帶傳播力。`
  },
  {
    id: "monday_rescue",
    tab: "職場求生",
    isPro: false,
    outputFormat: "週一生存急救包",
    icon: <Moon className="w-8 h-8 text-indigo-500" />,
    color: "indigo",
    title: "社畜急救包",
    desc: "解決「週日晚上想到明天要上班就開始焦慮、失眠、厭世，但又不能不去」的 Sunday Scaries 存在危機。",
    tags: ["週一症候群", "焦慮", "厭世"],
    fields: [
      { id: "reason", label: "不想去的主因", placeholder: "例：週一有一場我害怕的會議" },
      { id: "event_detail", label: "事件細節", placeholder: "例：要跟老闆報告上週沒完成的進度" },
      { id: "anxiety_level", label: "焦慮程度 (1-10)", placeholder: "例：8 分" },
      { id: "current_state", label: "你週日晚上在幹嘛", placeholder: "例：躺在床上滑手機但什麼都看不進去" }
    ],
    tweak: {
      id: "strat",
      label: "急救模式",
      options: [
        "戰前簡報型：把明天最可怕的事情「預演」一遍，把焦慮轉化為準備。",
        "最壞情境拆解型：幫你把「最壞的結果」寫出來，然後證明它沒那麼壞。",
        "厭世共鳴型：不解決問題，先讓你笑出來——用一段毒雞湯幫你撐過今晚。"
      ]
    },
    theory: "基於預期焦慮 (Anticipatory Anxiety) 與 CBT 暴露原則：Sunday Scaries 的深層機制是「大腦在模擬明天可能發生的所有災難，但因為還沒發生，你連面對它的機會都沒有」。本咒語將明天最可怕的場景「文字化」——當恐懼從腦內的模糊影像變成紙上的具體文字時，它就被「降維」了。",
    generate: (inputs: any) => `你是一位專門治療上班族「週日恐慌症」的心理教練，副業是經營一個 10 萬粉的厭世 Threads 帳號。\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我現在正在經歷 Sunday Scaries：\n- 主要焦慮來源：[[${inputs.reason}]]\n- 具體事件：[[${inputs.event_detail}]]\n- 焦慮指數：[[${inputs.anxiety_level}]]\n- 目前狀態：[[${inputs.current_state}]]\n\n請輸出：\n① 【厭世共鳴彈】——用 3 句話精準描述我此刻的心理狀態\n② 【最壞劇本】——把明天最壞的情況寫出來，然後用一句話證明「就算最壞也不過如此」\n③ 【週一早晨 3 步驟】——起床後到進公司前的 3 個具體動作\n④ 【那場會議的保命話術】——針對我害怕的具體事件，給我一句「萬用安全句」\n⑤ 【今晚的處方】——告訴我現在該做什麼，讓我能真的睡著\n\n【規則】\n1. 「厭世共鳴彈」的品質標準是——使用者看完會截圖發 Threads。\n2. 「最壞劇本」嚴禁淡化，要先認真面對最壞結果，再從邏輯上拆解它。\n3. 早晨步驟必須是「肌肉記憶等級」的簡單。\n4. 保命話術不超過 15 字。\n5. 嚴禁出現「明天會更好」「撐過去就好了」。`
  },
  {
    id: "red_flag_scope",
    tab: "人際擋箭",
    isPro: true,
    outputFormat: "紅旗鑑定報告",
    icon: <Eye className="w-8 h-8 text-rose-500" />,
    color: "rose",
    title: "鑑渣顯微鏡",
    desc: "解決「跟一個人聊了一陣子，有些話聽起來怪怪的但又說不上來哪裡怪」的人際紅旗識別障礙。",
    tags: ["紅旗鑑定", "約會", "PUA辨識"],
    fields: [
      { id: "their_words", label: "對方說的話/行為", placeholder: "例：你不用想太多，聽我的就好" },
      { id: "relationship", label: "目前關係階段", placeholder: "例：交友軟體配對，聊了兩週" },
      { id: "frequency", label: "出現頻率", placeholder: "例：第三次了" },
      { id: "gut_feeling", label: "你的直覺", placeholder: "例：覺得不太對但對方其他時候很體貼" }
    ],
    tweak: {
      id: "strat",
      label: "鑑定模式",
      options: [
        "紅旗鑑定型：直接判斷這是不是 red flag，有幾面紅旗，嚴重程度如何。",
        "行為模式分析型：不只看單句，而是分析「這種人通常的行為模式」。",
        "已讀不回劇本型：如果判定是紅旗，直接幫你寫一段優雅結束對話的訊息。"
      ]
    },
    theory: "基於依附理論中的焦慮型依附模式與認知失調理論：紅旗辨識困難的深層心理是「對方 80% 的時候很好，所以我不斷為那 20% 找理由——因為承認紅旗就等於承認這段關係可能是錯的」。本咒語的核心功能是充當「外部客觀判斷」，替代使用者被情感扭曲的內部判斷。",
    generate: (inputs: any) => `你是一位結合了心理學背景與 10 年交友軟體實戰經驗的「紅旗鑑定師」。你的座右銘：「你的直覺比你的大腦更早知道答案。如果你會來問我，那它八成就是紅旗。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我遇到了一個讓我困惑的對象，幫我鑑定：\n- 對方說的話/做的事：[[${inputs.their_words}]]\n- 關係階段：[[${inputs.relationship}]]\n- 這種感覺出現幾次：[[${inputs.frequency}]]\n- 我的直覺：[[${inputs.gut_feeling}]]\n\n請輸出：\n① 【紅旗鑑定結果】——🟢正常 / 🟡微妙 / 🔴紅旗 / 🚩巨型紅旗，附上判斷理由\n② 【行為翻譯】——這句話/行為在心理學上對應什麼模式\n③ 【未來預測】——如果繼續發展，這類人下一步通常會做什麼\n④ 【你可以做的事】——2 個選項：繼續觀察時怎麼試探、決定抽身時怎麼退場\n⑤ 【Threads 體吐槽】——把這件事寫成一則 100 字的 Threads 匿名吐槽文\n\n【規則】\n1. 鑑定必須具體到「為什麼這是紅旗」的行為心理學機制。\n2. 嚴禁使用「每個人都不同」「也許他只是不擅表達」。\n3. 如果鑑定結果真的是🟢正常，也要誠實說——但附上「持續觀察的指標」。\n4. 退場訊息必須優雅不帶怨氣。\n5. Threads 吐槽文必須讓看到的人覺得「天啊我上一段就是這樣」。`
  },
  {
    id: "call_shield",
    tab: "人際擋箭",
    isPro: false,
    outputFormat: "通話話題菜單",
    icon: <Phone className="w-8 h-8 text-green-600" />,
    color: "green",
    title: "省話神諭",
    desc: "解決「接到爸媽/親戚的電話，聊 5 分鐘就不知道要說什麼、掛也不是不掛也不是」的跨世代通訊困境。",
    tags: ["長輩電話", "家庭溝通", "話題庫"],
    fields: [
      { id: "caller", label: "打來的人", placeholder: "例：媽媽" },
      { id: "call_freq", label: "通話頻率", placeholder: "例：每天" },
      { id: "pain_point", label: "你的痛點", placeholder: "例：講不到 3 分鐘就沒話講" },
      { id: "their_lines", label: "對方固定台詞", placeholder: "例：吃飯了嗎？有沒有穿暖？什麼時候回來？" },
      { id: "ideal", label: "理想通話模式", placeholder: "例：短但有品質，不要像在交差" }
    ],
    tweak: {
      id: "strat",
      label: "溝通策略",
      options: [
        "話題彈藥庫型：按星期幾分類，每天一個可以跟長輩聊的話題，像抽籤一樣不費腦。",
        "主動出擊型：教你怎麼反過來「先打給他們」，用主動權改變對話節奏。",
        "文字轉移型：把部分通話需求轉移到 LINE，教你怎麼用貼圖和短句維持溫度。"
      ]
    },
    theory: "基於社會情緒選擇理論 (Carstensen)：與父母通話的深層困境是「我知道他們打來是因為想念我，但我真的不知道要聊什麼——然後我為『沒話講』感到愧疚」。通話的目標不是「有聊不完的話題」，而是「讓對方掛電話後覺得溫暖」。",
    generate: (inputs: any) => `你是一位專門研究華人家庭溝通模式的家族治療師。你的理念是：「跟爸媽的電話不需要長，需要的是——讓他們掛完之後跟隔壁阿姨說『我兒子/女兒剛剛打來了』時，臉上有笑容。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我跟家人的通話陷入了一種尷尬模式：\n- 打來的人：[[${inputs.caller}]]\n- 通話頻率：[[${inputs.call_freq}]]\n- 我的痛點：[[${inputs.pain_point}]]\n- 對方固定台詞：[[${inputs.their_lines}]]\n- 我的理想狀態：[[${inputs.ideal}]]\n\n請輸出：\n① 【一週話題菜單】——週一到週日各一個可以跟長輩聊的話題（20 字以內的開場白）\n② 【固定台詞升級回覆】——針對「吃飯了嗎」等，給 3 種讓對話延伸 30 秒的回覆\n③ 【優雅收線話術】——在自然時機結束通話的 3 句話\n④ 【主動出擊模板】——一則你可以主動傳的 LINE 訊息\n⑤ 【Threads 共鳴文】——一則關於「跟爸媽講電話」的 Threads 短文（80 字內）\n\n【規則】\n1. 話題必須是長輩「接得住」的——不要聊 AI 趨勢，要聊菜市場、天氣、電視劇。\n2. 升級回覆的標準不是「聊很久」，是「多給一個細節讓對方有東西可以接」。\n3. 收線話術嚴禁用「好啦我先忙了」。\n4. 所有建議必須通過「可執行性測試」——內向的人也能照做。\n5. Threads 文必須擊中「愧疚但又不知道怎麼改變」的情緒。`
  },
  {
    id: "sharp_edge",
    tab: "人際擋箭",
    isPro: true,
    outputFormat: "線上爭論反擊稿",
    icon: <Sword className="w-8 h-8 text-slate-600" />,
    color: "slate",
    title: "鋒芒術",
    desc: "解決「跟人在 LINE 或社群上吵架，氣到手抖但打出來的字完全沒有殺傷力」的線上吵架貧弱症。",
    tags: ["線上吵架", "反擊話術", "論點拆解"],
    fields: [
      { id: "their_attack", label: "對方說了什麼", placeholder: "例：你就是想太多了吧，有這麼嚴重嗎" },
      { id: "my_stance", label: "你的立場", placeholder: "例：我反映一個合理的問題，對方在淡化我的感受" },
      { id: "goal", label: "你想要的效果", placeholder: "例：讓對方知道他在淡化我的感受" },
      { id: "style_pref", label: "風格偏好", placeholder: "例：冷靜到讓對方覺得自己才是失控的人" },
      { id: "bottom_line", label: "底線", placeholder: "例：不想人身攻擊，但要讓對方知道我不好惹" }
    ],
    tweak: {
      id: "strat",
      label: "反擊風格",
      options: [
        "冰刃型：語氣越冷越有殺傷力。用事實和邏輯讓對方無法反駁。",
        "修辭碾壓型：用一個精準的比喻或反問句，讓對方的論點自動瓦解。",
        "高位收尾型：不繼續吵，用一句話結束整場爭論，站在制高點離場。"
      ]
    },
    theory: "基於論證理論 (Toulmin) 與控制感需求：線上吵架焦慮的深層心理是「對方氣得我話都說不清楚，我越急越講不好，越講不好越氣」。Toulmin 的論證模型告訴我們：有效的反擊不是「更大聲」，而是「更有結構」。本咒語的核心功能是在你情緒失控時，充當你的「冷靜替身」。",
    generate: (inputs: any) => `你是一位辯論教練兼網路筆戰顧問。你的鐵則是：「吵架的最高境界不是罵贏對方，是讓圍觀的人都站你這邊。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我在一場線上爭論中被惹毛了：\n- 對方說的話：[[${inputs.their_attack}]]\n- 我的立場：[[${inputs.my_stance}]]\n- 我想要的效果：[[${inputs.goal}]]\n- 風格偏好：[[${inputs.style_pref}]]\n- 底線：[[${inputs.bottom_line}]]\n\n請輸出：\n① 【對方的邏輯漏洞】——用一句話指出對方論點裡最致命的弱點\n② 【冰刃版回覆】——冷到讓人打冷顫的回擊（不超過 40 字）\n③ 【修辭碾壓版回覆】——用一個比喻或反問讓對方的論點自爆（不超過 40 字）\n④ 【高位收尾版】——一句話結束這場爭論（不超過 25 字）\n⑤ 【Threads 戰報】——把這場吵架寫成 100 字的 Threads 文\n\n【規則】\n1. 所有回覆嚴禁人身攻擊、外貌攻擊、家人攻擊。\n2. 冰刃版必須只用「事實」和「邏輯」。\n3. 修辭碾壓版的比喻必須讓旁觀者瞬間理解。\n4. 高位收尾版必須讓你「是最後一個說話的人」。\n5. 嚴禁任何激化衝突的建議。`
  },
  {
    id: "elevator_pitch",
    tab: "職場求生",
    isPro: true,
    outputFormat: "60 秒口語報告稿",
    icon: <Mic className="w-8 h-8 text-amber-600" />,
    color: "amber",
    title: "黃金 60 秒",
    desc: "解決「老闆在電梯裡問你專案進度，你有 60 秒要講清楚但大腦當機只擠出『呃⋯還可以』」的即興報告癱瘓症。",
    tags: ["電梯簡報", "即興報告", "金字塔原理"],
    fields: [
      { id: "project", label: "你的專案", placeholder: "例：App 改版專案" },
      { id: "current_status", label: "目前狀態", placeholder: "例：設計稿完成 80%，但工程端還沒開始" },
      { id: "good_news", label: "好消息", placeholder: "例：用戶測試反饋很正面" },
      { id: "bad_news", label: "壞消息", placeholder: "例：工程資源被其他專案搶走" },
      { id: "impression", label: "想留下什麼印象", placeholder: "例：我有掌握狀況，問題不是我造成的" }
    ],
    tweak: {
      id: "strat",
      label: "報告結構",
      options: [
        "結論先行型：BLUF (Bottom Line Up Front) 結構，第一句話就給結論。",
        "好壞三明治型：好消息→壞消息→解決方案，讓老闆聽完覺得你有在處理。",
        "數字說話型：用 2-3 個關鍵數字說完全部，不浪費一秒在形容詞上。"
      ]
    },
    theory: "基於認知負荷理論 (Sweller) 與金字塔原理 (Minto)：即興報告癱瘓的深層恐懼是「我知道所有細節，但不知道哪些該說」。Minto 的金字塔原理證明：高效溝通的結構是「先結論、後論據」——但人類的自然思考順序是反過來的。本咒語強制你的大腦切換成「金字塔模式」。",
    generate: (inputs: any) => `你是一位前麥肯錫顧問，現在專門訓練科技業中階主管的「60 秒彙報術」。你的訓練理念是：「如果你 60 秒講不清楚，60 分鐘也講不清楚。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我的老闆可能隨時問我專案進度，幫我準備：\n- 專案：[[${inputs.project}]]\n- 進度：[[${inputs.current_status}]]\n- 好消息：[[${inputs.good_news}]]\n- 壞消息：[[${inputs.bad_news}]]\n- 想留下的印象：[[${inputs.impression}]]\n\n請輸出：\n① 【60 秒腳本】——我可以直接背起來的完整口語稿（嚴格控制在 60 秒唸完）\n② 【萬一被追問的接球句】——老闆最可能追問的 3 個問題，每題一句「安全回答」\n③ 【絕對不能說的話】——3 句會讓老闆瞬間扣分的地雷句，附上為什麼\n④ 【Threads 版吐槽】——一則「在電梯裡遇到老闆」主題的 Threads 厭世文（80 字內）\n\n【規則】\n1. 60 秒腳本必須用口語——不是簡報稿，是「可以對著人說出來」的話。\n2. 壞消息嚴禁用「遇到了一些困難」這種模糊說法。\n3. 嚴禁以「我覺得」開頭任何一句話。\n4. 地雷句必須附上「為什麼老闆聽了會扣分」的心理分析。\n5. 所有版本的最後一句必須是「行動導向」——告訴老闆你下一步要做什麼。`
  },
  {
    id: "gen_translator",
    tab: "人際擋箭",
    isPro: false,
    outputFormat: "跨世代翻譯包",
    icon: <RefreshCcw className="w-8 h-8 text-purple-500" />,
    color: "purple",
    title: "怪味翻譯蒟蒻",
    desc: "解決「想跟爸媽或長輩解釋一件現代的事（WFH、斜槓、加密貨幣、交友軟體），但怎麼講他們都聽不懂或直接否定」的世代翻譯崩潰。",
    tags: ["世代溝通", "長輩翻譯", "類比說服"],
    fields: [
      { id: "thing_to_explain", label: "要解釋的事", placeholder: "例：我想在家工作（WFH）不是在家耍廢" },
      { id: "elder_reaction", label: "長輩的反應", placeholder: "例：在家工作不就是在偷懶嗎" },
      { id: "min_goal", label: "最低理解目標", placeholder: "例：至少不再每次見面都念我" },
      { id: "elder_bg", label: "長輩的背景", placeholder: "例：60 歲退休公務員" }
    ],
    tweak: {
      id: "strat",
      label: "翻譯策略",
      options: [
        "類比翻譯型：把現代概念用長輩的世代經驗來類比（WFH = 以前帶公文回家加班）。",
        "數字說服型：用長輩信任的「數字」和「權威」來背書（XX 企業都在做、政府鼓勵）。",
        "故事植入型：不直接解釋，用一個「別人家小孩」的成功故事來間接洗腦。"
      ]
    },
    theory: "基於世代認知基模 (Generational Schema Theory) 與精緻化可能性模型 (ELM)：跨世代溝通失敗的根源是「你用 2024 年的概念去撞 1970 年的認知框架，框架不匹配所以所有資訊都被自動彈回」。本咒語運用「基模嫁接技術」——不強塞新概念，而是把新概念接在長輩已有的舊基模上。",
    generate: (inputs: any) => `你是一位專門幫台灣年輕人「翻譯」現代生活方式給長輩聽的跨世代溝通顧問。你的超能力是：把任何 Gen Z 的概念用菜市場阿嬤都懂的方式講清楚。\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我想讓長輩理解一件他們不認同的事：\n- 我要解釋的事：[[${inputs.thing_to_explain}]]\n- 長輩通常的反應：[[${inputs.elder_reaction}]]\n- 最低理解目標：[[${inputs.min_goal}]]\n- 長輩背景：[[${inputs.elder_bg}]]\n\n請輸出：\n① 【世代翻譯】——用一段 100 字以內、長輩聽得懂的方式解釋（必須包含至少一個他們那個年代的類比）\n② 【權威背書彈藥】——3 個「長輩會信的資訊來源」的論點\n③ 【故事植入法】——一個「別人家小孩」的故事版本\n④ 【地雷詞彙表】——解釋時絕對不能用的 5 個詞和替代用語\n⑤ 【Threads 世代笑話】——一則「跟爸媽解釋 XXX」主題的 Threads 短文（80 字內）\n\n【規則】\n1. 類比必須用長輩的「母語」——公務員就用公務體系的比喻。\n2. 嚴禁出現任何帶有「你們那個年代不懂」潛台詞的語句。\n3. 權威背書要具體到「某某公司」「某某政策」。\n4. 故事植入法的故事不能太完美——要用「普通人稍微改善」的等級。\n5. Threads 文必須同時讓年輕人笑、讓看到的長輩若有所思。`
  },
  {
    id: "idea_engine",
    tab: "創業/斜槓",
    isPro: false,
    outputFormat: "30 天選題日曆 + 爆款分析",
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    color: "yellow",
    title: "靈感永動機",
    desc: "解決「今天又要發文了但完全不知道要發什麼，盯著螢幕 2 小時只想到一個爛點子」的創作者靈感枯竭症。",
    tags: ["選題", "自媒體", "爆款公式"],
    fields: [
      { id: "niche", label: "你的領域", placeholder: "例：職場成長 / 穿搭 / 理財 / 料理" },
      { id: "audience", label: "目標受眾", placeholder: "例：25-35 歲台灣女性上班族" },
      { id: "top_content", label: "近期表現好的內容", placeholder: "例：「月薪三萬如何存到第一桶金」那篇 Reels 破 10 萬觀看" },
      { id: "flop_content", label: "近期表現差的內容", placeholder: "例：「推薦五本理財書」幾乎沒人看" },
      { id: "bottleneck", label: "目前的瓶頸", placeholder: "例：同類型內容做太多，觀眾開始膩了" }
    ],
    tweak: { id: "strat", label: "選題策略", options: [
      "爆款逆向工程型：分析你的爆款「為什麼爆」，提取公式後套用到新主題。",
      "跨界嫁接型：從完全不同的領域借靈感，製造「這跟理財有什麼關係？」的好奇心。",
      "時事寄生型：抓住當週熱門話題，用你的專業角度切入，蹭流量但不掉格調。"
    ]},
    theory: "基於創造力的聯想理論 (Mednick) 與資訊落差理論 (Loewenstein)：靈感枯竭的深層問題不是「沒東西可寫」，而是「大腦已經在同一個領域裡建立了太強的路徑依賴」。本咒語強制啟動「遠距聯想」迴路，同時用資訊落差原理設計選題。",
    generate: (inputs: any) => `你是一位操盤過 10 個以上百萬粉帳號的自媒體內容策略師。你的核心方法論是：「爆款不是靈感，是公式 × 時機 × 情緒。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我的帳號陷入靈感枯竭，請幫我完成一次「選題大補帖」：\n- 領域：[[${inputs.niche}]]\n- 受眾：[[${inputs.audience}]]\n- 近期爆款：[[${inputs.top_content}]]\n- 近期撲街：[[${inputs.flop_content}]]\n- 瓶頸：[[${inputs.bottleneck}]]\n\n請輸出：\n① 【爆款解剖】——分析爆款內容為什麼爆，提取 3 個可複製的「爆款因子」\n② 【撲街驗屍】——分析撲街內容死在哪裡，精確到「標題缺乏資訊落差」這個層級\n③ 【30 天選題日曆】——30 個選題，分四類配置：🔴爆款型(40%) 🟡權威型(25%) 🟢互動型(20%) 🔵轉化型(15%)\n④ 【每題附標題】——每個選題附上一個「會被點擊」的標題，標注用了什麼標題技法\n\n【規則】\n1. 至少 5 個必須是「跨界嫁接」型。\n2. 標題嚴禁使用「你一定要知道的 X 件事」「看完這篇你就懂了」等過期句型。\n3. 爆款型選題必須在標題裡就引發情緒。\n4. 每個選題附上「適合哪個平台」標注。\n5. 最後附上【選題自檢表】——5 個問題快速判斷「這題值不值得做」。`
  },
  {
    id: "hook_master",
    tab: "創業/斜槓",
    isPro: false,
    outputFormat: "短影音完整腳本",
    icon: <Film className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "鉤魂首行",
    desc: "解決「拍了一支 Reels/Shorts 但前 3 秒留不住人，完播率慘到不忍看」的短影音開頭致死率。",
    tags: ["短影音", "Reels", "完播率"],
    fields: [
      { id: "topic", label: "影片主題", placeholder: "例：小資族外食也能一個月存 8,000 元的方法" },
      { id: "duration", label: "影片長度", placeholder: "例：60 秒" },
      { id: "platform", label: "平台", placeholder: "例：IG Reels" },
      { id: "style", label: "你的表演風格", placeholder: "例：講話快、會用手勢、偶爾自嘲" },
      { id: "audience", label: "目標受眾", placeholder: "例：月薪 3-5 萬的外食族" }
    ],
    tweak: { id: "strat", label: "開場策略", options: [
      "衝突開場型：前 3 秒拋出一個違反常識的論點，讓人「不同意所以看下去」。",
      "痛點直擊型：前 3 秒描述觀眾正在經歷的痛苦，讓人「被說中所以看下去」。",
      "數據震撼型：前 3 秒丟一個讓人嚇到的數字，讓人「想知道為什麼所以看下去」。"
    ]},
    theory: "基於注意力經濟學 (Davenport) 與認知中斷理論：短影音完播率低的核心問題是「你的前 3 秒沒有製造足夠的認知中斷——觀眾的拇指滑過你的影片時，大腦沒有收到『停下來』的信號」。本咒語專門製造前 3 秒的「認知中斷彈」。",
    generate: (inputs: any) => `你是一位專門幫創作者寫腳本的短影音編劇，你寫過的腳本累計超過 5 億次觀看。你的核心信仰是：「一支短影音的命運在前 3 秒就決定了。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n幫我寫一支短影音的完整腳本：\n- 主題：[[${inputs.topic}]]\n- 長度：[[${inputs.duration}]]\n- 平台：[[${inputs.platform}]]\n- 我的風格：[[${inputs.style}]]\n- 受眾：[[${inputs.audience}]]\n\n請輸出：\n① 【3 版開場鉤子】——衝突開場、痛點直擊、數據震撼各一版前 3 秒台詞\n② 【完整腳本】——選最強的鉤子寫完整腳本：🪝鉤子(0-3秒) → 📌定錨(3-8秒) → 🥩肉(8-45秒) → 🎯CTA(最後5-10秒)\n③ 【畫面指示】——每段台詞旁標注「鏡頭該拍什麼」\n④ 【封面文字建議】——一行會讓人停下來的封面標題（8 字以內）\n\n【規則】\n1. 前 3 秒嚴禁以「大家好今天要跟你們分享」開頭。\n2. 腳本必須是口語稿，唸起來像跟朋友說話。\n3. 每 10 秒必須有一次節奏轉換。\n4. CTA 嚴禁「如果你覺得有用就按個讚」——要給互動的理由。\n5. 封面文字必須通過「縮圖測試」——手機上縮到指甲大小還看得清楚。`
  },
  {
    id: "follower_magnet",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "帳號診斷 + 90天漲粉計畫",
    icon: <Magnet className="w-8 h-8 text-pink-600" />,
    color: "pink",
    title: "萬磁王",
    desc: "解決「內容品質不差但追蹤數就是不動，像在對著空氣表演」的自媒體隱形人症候群。",
    tags: ["漲粉", "演算法", "擴散機制"],
    fields: [
      { id: "current_stats", label: "帳號現況", placeholder: "例：2,300 粉，平均按讚 50-80" },
      { id: "niche", label: "領域", placeholder: "例：居家佈置 / 租屋改造" },
      { id: "unique", label: "你的獨特性", placeholder: "例：專門做「預算 3,000 以內」的改造" },
      { id: "goal", label: "目標", placeholder: "例：三個月內破萬粉" },
      { id: "tried", label: "試過但沒用的方法", placeholder: "例：互追、hashtag 研究、固定發文時間" }
    ],
    tweak: { id: "strat", label: "成長策略", options: [
      "爆文衝刺型：設計 3 篇「為漲粉而生」的戰略型內容，犧牲深度換擴散力。",
      "人設強化型：重新定位你的帳號人設和 bio，讓路人一秒理解「追蹤你能得到什麼」。",
      "協作槓桿型：設計可以 tag 其他帳號、被轉發、或引發 UGC 的合作型內容。"
    ]},
    theory: "基於網絡效應理論與社會認同理論 (Cialdini)：漲粉困境的深層問題不是「內容不好」，而是「好內容被困在同溫層裡，沒有觸發演算法的擴散機制」。本咒語運用「擴散觸發器設計」——在內容裡植入讓人「不得不」分享、留言、tag 朋友的機制。",
    generate: (inputs: any) => `你是一位專門幫中小型帳號突破停滯期的自媒體成長駭客。你的方法論：「粉絲不是追來的，是被你的內容結構推過來的。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我的帳號卡在成長停滯期：\n- 現況：[[${inputs.current_stats}]]\n- 領域：[[${inputs.niche}]]\n- 獨特性：[[${inputs.unique}]]\n- 目標：[[${inputs.goal}]]\n- 試過但沒用的：[[${inputs.tried}]]\n\n請輸出：\n① 【帳號健檢報告】——人設清晰度、內容擴散力、追蹤轉換率 三維度診斷\n② 【Bio 重寫】——用「我幫___解決___」結構，附 3 個版本\n③ 【3 篇戰略型爆文企劃】——每篇設計「擴散觸發器」，附標題、大綱、CTA\n④ 【漲粉飛輪模型】——可重複執行的「內容→互動→擴散→漲粉」SOP\n⑤ 【90 天里程碑】——三個 30 天階段的重點任務和預期成果\n\n【規則】\n1. 診斷必須殘酷但建設性。\n2. 爆文企劃必須包含一個「分享觸發器」。\n3. Bio 嚴禁 emoji 堆疊超過 3 個。\n4. 漲粉策略嚴禁包含「互追」「買粉」。\n5. 90 天計畫必須考慮創作者一天只有 2 小時做內容的現實。`
  },
  {
    id: "monetize_shield",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "報價計算 + 回覆信模板",
    icon: <CircleDollarSign className="w-8 h-8 text-emerald-600" />,
    color: "emerald",
    title: "變現結界",
    desc: "解決「品牌來信問報價但你不知道怎麼開價，開太高怕嚇跑、開太低怕被當盤子」的自媒體定價恐慌。",
    tags: ["業配報價", "品牌合作", "KOL定價"],
    fields: [
      { id: "brand", label: "品牌名稱", placeholder: "例：某保養品牌" },
      { id: "collab_content", label: "合作內容", placeholder: "例：一則 IG 圖文 + 限時動態三則" },
      { id: "my_stats", label: "你的帳號數據", placeholder: "例：1.2 萬粉，互動率 4.5%" },
      { id: "niche", label: "你的領域", placeholder: "例：美妝保養" },
      { id: "their_offer", label: "對方開的條件", placeholder: "例：提供產品 + 稿費，想了解您的報價" }
    ],
    tweak: { id: "strat", label: "報價策略", options: [
      "數據定價型：用公式算出合理報價區間，讓你開價有依據。",
      "套裝方案型：不只回覆報價，直接提供「三個合作方案」讓品牌選，掌握主動權。",
      "回覆信模板型：生成一封專業的品牌合作回覆信，語氣讓人覺得「這個創作者很專業」。"
    ]},
    theory: "基於錨定效應與 BATNA 談判理論：業配定價恐懼的深層心理是「我不知道自己值多少錢」。這是一種將「商業報價」與「自我價值」混為一談的認知扭曲。錨定效應告訴我們：誰先出價誰就設定了談判的心理錨點。本咒語給你「先出價的勇氣」和「定價的邏輯依據」。",
    generate: (inputs: any) => `你是一位專門代理台灣中小型 KOL 的經紀人，經手過 500+ 件品牌合作案。你的定價哲學是：「你的報價不是在賣貼文，是在賣你的受眾注意力。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n有品牌來找我合作：\n- 品牌：[[${inputs.brand}]]\n- 合作內容：[[${inputs.collab_content}]]\n- 我的數據：[[${inputs.my_stats}]]\n- 我的領域：[[${inputs.niche}]]\n- 對方開的條件：[[${inputs.their_offer}]]\n\n請輸出：\n① 【報價計算】——用公式算出建議報價：底線價 / 合理價 / 理想價\n② 【三檔合作方案】——A基本款 / B推薦款 / C旗艦款\n③ 【回覆信】——一封可直接寄出的專業回覆\n④ 【談判紅線清單】——5 件絕對不能接受的條件\n\n【規則】\n1. 報價計算必須有具體數字，精確到千元級。\n2. 回覆信語氣「專業但不傲慢」。\n3. 三檔方案運用「誘餌效應」。\n4. 嚴禁建議「先免費合作累積作品集」。\n5. 附上【合作前必確認清單】——審核次數、修改次數、授權範圍、付款時間、上刊日期。`
  },
  {
    id: "troll_shield",
    tab: "創業/斜槓",
    isPro: false,
    outputFormat: "酸民應對策略 + 神回覆",
    icon: <ShieldAlert className="w-8 h-8 text-orange-500" />,
    color: "orange",
    title: "毒舌護盾",
    desc: "解決「被酸民留言攻擊，刪掉怕被說玻璃心、回嘴怕越吵越大、不理又氣得睡不著」的創作者心理戰損。",
    tags: ["酸民處理", "負評", "神回覆"],
    fields: [
      { id: "troll_comment", label: "酸民的留言", placeholder: "例：又一個假掰的生活分享，有錢人的世界我們不懂" },
      { id: "my_content", label: "你的內容", placeholder: "例：我分享自己改造租屋空間的圖文" },
      { id: "account_size", label: "帳號大小", placeholder: "例：8,000 粉" },
      { id: "my_emotion", label: "你的情緒", placeholder: "例：委屈，因為我真的是小資改造" },
      { id: "preference", label: "你想怎麼處理", placeholder: "例：想回但不想吵架" }
    ],
    tweak: { id: "strat", label: "應對策略", options: [
      "神回覆型：用一句讓旁觀者拍手叫好的話回擊，把酸言變成你的舞台。",
      "借力打力型：把這則負評變成一則新內容的靈感，把攻擊轉化成流量。",
      "靜默防禦型：不回覆，但教你怎麼調整心態，以及什麼情況該刪、該回、該無視。"
    ]},
    theory: "基於線上去抑制效應 (Suler) 與情緒感染理論：酸民攻擊對創作者的深層傷害是「一百則正面留言抵不過一則負面留言」。本咒語的核心功能是做你的「情緒隔離層」——在你和酸民之間插入一層理性分析。",
    generate: (inputs: any) => `你是一位專門訓練公眾人物處理網路輿情的危機公關顧問。你的心法是：「酸民是免費的互動率。問題不是要不要回，是怎麼回才能讓你加分。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我被酸了：\n- 酸民的留言：[[${inputs.troll_comment}]]\n- 留言位置：[[${inputs.my_content}]]\n- 帳號大小：[[${inputs.account_size}]]\n- 我的情緒：[[${inputs.my_emotion}]]\n- 我的傾向：[[${inputs.preference}]]\n\n請輸出：\n① 【酸民類型鑑定】——路過型 / 嫉妒型 / 挑釁型 / 正當批評型\n② 【該不該回？決策樹】——根據類型、帳號大小、貼文熱度判斷最佳策略\n③ 【神回覆】——3 版：幽默化解版、高格調版、反將一軍版\n④ 【轉化企劃】——把酸言變成一則新內容的具體企劃\n⑤ 【心理復原處方】——3 句話幫你切換回「這是生意不是人生」的心態\n\n【規則】\n1. 如果是「正當批評型」，必須誠實告訴使用者「這不是酸，這是反饋」。\n2. 回覆嚴禁「謝謝你的意見❤️」「你行你上」、截圖公審。\n3. 幽默化解版必須獨立存在也是好內容。\n4. 轉化企劃讓使用者從「被攻擊」變成「主動創造話題」。\n5. 心理復原處方嚴禁雞湯——提供認知重構框架。`
  },
  {
    id: "content_splitter",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "多平台裂變內容包",
    icon: <Copy className="w-8 h-8 text-cyan-500" />,
    color: "cyan",
    title: "裂變器",
    desc: "解決「辛辛苦苦做了一支 YT 影片，但沒有力氣再拆成 IG、Threads、部落格版本」的一魚多吃癱瘓症。",
    tags: ["跨平台", "一魚多吃", "內容裂變"],
    fields: [
      { id: "original", label: "原始內容", placeholder: "例：一支 10 分鐘的 YouTube 影片，主題是「如何跟室友設立界線」" },
      { id: "original_platform", label: "原始平台", placeholder: "例：YouTube" },
      { id: "target_platforms", label: "要改寫到哪些平台", placeholder: "例：IG 圖文、IG Reels、Threads、部落格" },
      { id: "tone_diff", label: "各平台的帳號調性", placeholder: "例：YT 正經、IG 比較輕鬆、Threads 最毒舌" }
    ],
    tweak: { id: "strat", label: "裂變模式", options: [
      "全自動裂變型：直接把一份內容拆成各平台的完整版本，複製貼上即可。",
      "鉤子矩陣型：同一個主題用不同角度切入每個平台，讓跨平台粉絲都覺得是「新內容」。",
      "導流漏斗型：每個平台的內容設計成「只講一半」，把人導回主平台看完整版。"
    ]},
    theory: "基於長尾理論與內容複利效應：一魚多吃不是偷懶，是「用一份創作成本取得多份平台曝光」的策略性資源配置。關鍵在於每個平台版本必須「原生化」——不是縮短版而是「該平台的語法」重寫版。",
    generate: (inputs: any) => `你是一位一人公司的內容營運長，你的方法論叫「1→10 裂變法」：一份核心內容，裂變成多個平台版本。\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我已經做好一份內容，請幫我裂變：\n- 原始內容：[[${inputs.original}]]\n- 原始平台：[[${inputs.original_platform}]]\n- 目標平台：[[${inputs.target_platforms}]]\n- 各平台調性：[[${inputs.tone_diff}]]\n\n請針對每個目標平台輸出：\n① 【IG 圖文版】——封面標題(8字內) + 5-7張輪播內容 + CTA + Hashtag(5個)\n② 【IG Reels 版】——30秒腳本(含鉤子+核心+CTA) + 封面文字 + 音樂風格建議\n③ 【Threads 版】——3 則不同角度的短文(每則100字內)\n④ 【部落格 SEO 版】——SEO標題 + Meta description + 文章大綱(H2/H3) + 前200字草稿\n\n【規則】\n1. 每個平台版本必須「獨立成立」——沒看過原始內容也能理解。\n2. Threads 版必須跟 IG 版有不同切入角度。\n3. 部落格版必須考慮 SEO。\n4. 嚴禁寫「完整版請看我的 YouTube」——用更巧妙的方式引導。\n5. 每個版本附上【最佳發布時間】和【發布順序建議】。`
  },
  {
    id: "title_wizard",
    tab: "創業/斜槓",
    isPro: false,
    outputFormat: "10 個標題 + TOP 3 推薦",
    icon: <PenTool className="w-8 h-8 text-indigo-500" />,
    color: "indigo",
    title: "通靈標題師",
    desc: "解決「內容做完了但想不出好標題，隨便取一個結果觸及率只有平常的一半」的標題廢物困境。",
    tags: ["標題技法", "封面文字", "CTR優化"],
    fields: [
      { id: "content_topic", label: "內容主題", placeholder: "例：大學生如何用 Notion 管理時間" },
      { id: "platform", label: "平台", placeholder: "例：IG 圖文" },
      { id: "audience", label: "目標受眾", placeholder: "例：大學生、研究生" },
      { id: "best_part", label: "內容中最勁爆的點", placeholder: "例：用了一個模板後每天多出 2 小時" },
      { id: "brand_tone", label: "你的品牌調性", placeholder: "例：實用但帶點幽默" }
    ],
    tweak: { id: "strat", label: "標題策略", options: [
      "數據衝擊型：用數字 + 結果當鉤子。",
      "爭議製造型：用一個會讓人「不同意」的觀點當標題。",
      "身份認同型：讓目標受眾在標題裡看到自己。"
    ]},
    theory: "基於選擇性注意理論與雞尾酒效應：標題的功能不是「描述內容」，是「在資訊洪流中搶到 0.3 秒的注意力」。好標題讓人在滑過的瞬間產生「跟我有關」或「不可能吧？」的反應。",
    generate: (inputs: any) => `你是一位「標題黑手」——專門幫自媒體創作者把 30 分的標題改成 90 分。你改過的標題平均讓觸及率提升 2.5 倍。\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n幫我這篇內容想標題：\n- 主題：[[${inputs.content_topic}]]\n- 平台：[[${inputs.platform}]]\n- 受眾：[[${inputs.audience}]]\n- 最有料的點：[[${inputs.best_part}]]\n- 品牌調性：[[${inputs.brand_tone}]]\n\n請輸出：\n① 【10 個標題】——每個標注：技法名稱、點擊吸引力(★-★★★★★)、最適合的平台\n② 【TOP 3 推薦】——說明為什麼這 3 個最可能爆\n③ 【封面視覺建議】——TOP 3 標題搭配的封面設計建議\n④ 【A/B 測試計畫】——怎麼用限動投票或 Threads 測試哪個標題最強\n\n【規則】\n1. 10 個標題不能有任何兩個使用相同的技法。\n2. 嚴禁過期句型：「X 個你不知道的___」「建議收藏」。\n3. 每個標題 15 個中文字以內。\n4. 至少 2 個必須「反直覺」。\n5. 標題嚴禁比內容精彩（標題黨）。`
  },
  {
    id: "golden_voice",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "Podcast 完整腳本大綱",
    icon: <Mic className="w-8 h-8 text-amber-500" />,
    color: "amber",
    title: "金嗓術",
    desc: "解決「錄 Podcast 或口播影片時講話沒重點、容易離題、聽眾聽到一半就跳出」的音頻內容失焦症。",
    tags: ["Podcast", "口播腳本", "敘事結構"],
    fields: [
      { id: "topic", label: "主題", placeholder: "例：為什麼你應該在 25 歲前離職至少一次" },
      { id: "format", label: "節目形式", placeholder: "例：獨白 / 對談 / 訪問" },
      { id: "target_length", label: "目標長度", placeholder: "例：15 分鐘" },
      { id: "speaking_style", label: "你的口條風格", placeholder: "例：容易歪樓、會講故事但收不回來" },
      { id: "audience", label: "目標受眾", placeholder: "例：22-30 歲的職場新鮮人" }
    ],
    tweak: { id: "strat", label: "腳本結構", options: [
      "故事脊椎型：整集用一個故事撐起來，穿插觀點，讓人聽故事的同時被說服。",
      "問題清單型：用 3-5 個問題當骨架，每個問題就是一段，結構清晰不失焦。",
      "辯論體型：先提出一個爭議觀點，然後自己當正反方辯論，製造張力。"
    ]},
    theory: "基於敘事運輸理論 (Green & Brock) 與系列位置效應：音頻失焦的核心問題是「你知道要說什麼，但不知道什麼順序說效果最好」。人一旦被「運輸」進故事，批判性思維會自動降低。本咒語將隨機漫談重組為「有記憶錨點的敘事結構」。",
    generate: (inputs: any) => `你是一位曾在 Apple Podcast 台灣排行榜 Top 10 待過的 Podcast 製作人。你的剪輯台上有一張紙條：「好的 Podcast 不是你想說什麼，是聽眾需要用什麼順序聽。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n幫我規劃一集完整腳本大綱：\n- 主題：[[${inputs.topic}]]\n- 形式：[[${inputs.format}]]\n- 長度：[[${inputs.target_length}]]\n- 我的口條：[[${inputs.speaking_style}]]\n- 受眾：[[${inputs.audience}]]\n\n請輸出：\n① 【開場 90 秒腳本】——完整逐字稿，從按下錄音鍵的第一秒開始\n② 【段落結構】——拆成 3-5 段，每段標注：標題、時間長度、核心論點、故事/例子、過渡句\n③ 【結尾 60 秒腳本】——收束觀點 + CTA\n④ 【節目筆記 (Show Notes)】——可直接貼到 Podcast 平台的文字版重點摘要\n⑤ 【金句候選】——3 句「可以做成 IG 圖卡」的金句\n\n【規則】\n1. 開場嚴禁「哈囉大家好歡迎收聽」——先丟鉤子。\n2. 每段設計「過渡句」——不是「好，接下來」這種機械轉場。\n3. 針對「容易歪樓」的特性，每段設計一個「歪樓保險句」。\n4. 結尾 CTA 嚴禁「幫我按五星」——給聽眾有價值的行動。\n5. 金句必須通過「圖卡測試」——單獨看也有衝擊力。`
  },
  {
    id: "newsletter_mint",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "電子報完整規劃 + 範本",
    icon: <Newspaper className="w-8 h-8 text-sky-500" />,
    color: "sky",
    title: "印鈔術",
    desc: "解決「想開電子報或經營鐵粉社群但不知道寫什麼、怎麼寫、怎麼讓人持續開信」的私域流量冷啟動障礙。",
    tags: ["電子報", "會員經營", "私域流量"],
    fields: [
      { id: "niche", label: "你的領域", placeholder: "例：自由工作者的接案生存術" },
      { id: "reader", label: "目標讀者", placeholder: "例：想成為自由工作者或剛起步的人" },
      { id: "frequency", label: "發報頻率", placeholder: "例：每週一次" },
      { id: "goal", label: "你的目標", placeholder: "例：建立個人品牌 + 未來推課程" },
      { id: "struggle", label: "你的困境", placeholder: "例：寫了三期就不知道要寫什麼了" }
    ],
    tweak: { id: "strat", label: "經營模式", options: [
      "固定欄目型：設計 3-4 個固定欄目，每期只需「填空」，降低創作壓力。",
      "策展人型：不全部自己寫，用「蒐集 + 評論」的模式做內容策展。",
      "連載故事型：把電子報設計成有連續性的「每週連載」，讓讀者期待下一期。"
    ]},
    theory: "基於習慣迴路理論 (Duhigg) 與預期效用理論：電子報斷更的深層問題是「每一期都是從零開始，沒有慣性」。本咒語同時設計「創作端的生產 SOP」和「讀者端的期待機制」。",
    generate: (inputs: any) => `你是一位經營電子報訂閱數超過 5 萬人的個人品牌專家。你的秘訣：「電子報不是文章，是一封寫給朋友的信。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我想認真經營電子報：\n- 領域：[[${inputs.niche}]]\n- 目標讀者：[[${inputs.reader}]]\n- 頻率：[[${inputs.frequency}]]\n- 經營目標：[[${inputs.goal}]]\n- 困境：[[${inputs.struggle}]]\n\n請輸出：\n① 【電子報定位宣言】——一句話告訴潛在訂戶「訂閱你能得到什麼」\n② 【固定欄目設計】——3-4 個每期固定欄目，說明名稱、內容、讀者為什麼期待\n③ 【前 12 期選題規劃】——前三個月的每期主題\n④ 【第一期完整範本】——示範版，包含開場、各欄目、結尾 CTA\n⑤ 【成長漏斗】——從「陌生人→訂閱→開信→鐵粉→付費」的轉換策略\n\n【規則】\n1. 欄目設計考慮「每期寫作不超過 3 小時」。\n2. 開場嚴禁「本週精選」「本期目錄」——第一段就是故事或觀察。\n3. 每期必須有一個「只有電子報才看得到」的獨家內容。\n4. CTA 不能每期都叫人「轉發給朋友」——要設計不同互動機制輪替。\n5. 成長漏斗必須包含「從 IG/Threads 導入電子報」的具體方法。`
  },
  {
    id: "emperor_cut",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "影片全流程生產計畫",
    icon: <Video className="w-8 h-8 text-red-600" />,
    color: "red",
    title: "帝王剪輯令",
    desc: "解決「想做 YouTube 長影片但從企劃、腳本、拍攝到剪輯全部卡住，結果一支影片拖三週」的全流程癱瘓症。",
    tags: ["YouTube", "影片企劃", "剪輯流程"],
    fields: [
      { id: "video_topic", label: "影片主題", placeholder: "例：我離職後的第一個月發生了什麼事" },
      { id: "video_length", label: "影片長度", placeholder: "例：12-15 分鐘" },
      { id: "channel_style", label: "頻道定位", placeholder: "例：Vlog 風格帶觀點輸出" },
      { id: "equipment", label: "你的設備", placeholder: "例：iPhone + 基本燈光 + 剪映" },
      { id: "weakness", label: "你的弱項", placeholder: "例：開頭不知道怎麼拍、B-roll 素材不夠" }
    ],
    tweak: { id: "strat", label: "製作模式", options: [
      "全流程 SOP 型：從企劃到上傳每一步都幫你排好，照著做就好。",
      "模板套用型：給你一個「爆款影片結構模板」，只需把你的內容填進去。",
      "極簡主義型：用最少的鏡頭、最簡單的剪輯完成一支有品質的影片。"
    ]},
    theory: "基於帕金森定律與最小可行產品理論 (MVP)：影片拖延的深層問題是「你以為一支好影片需要完美的企劃、完美的拍攝、完美的剪輯——所以你永遠在等自己準備好」。MVP 理論證明：先做出「60 分但完整」的版本比「追求 100 分但永遠沒上架」的版本有價值一萬倍。",
    generate: (inputs: any) => `你是一位幫 YouTube 創作者做「影片加速器」的製作顧問。你的核心理念是：「一支影片的價值不在製作水準，在它有沒有被上傳。磁碟裡的完美影片，價值是零。」\n\n採用策略：[[${inputs.strat}]]\n\n【任務】\n我想做一支 YouTube 影片但整個流程都卡住了：\n- 主題：[[${inputs.video_topic}]]\n- 長度：[[${inputs.video_length}]]\n- 頻道定位：[[${inputs.channel_style}]]\n- 設備：[[${inputs.equipment}]]\n- 弱項：[[${inputs.weakness}]]\n\n請輸出：\n① 【企劃表（1 頁）】——一句話概括 + 目標觀眾看完後的改變 + 影片結構時間軸\n② 【腳本大綱】——開場鉤子(前30秒逐字稿) + 每段 bullet points + 結尾CTA\n③ 【拍攝清單 (Shot List)】——每個畫面要拍什麼、角度、B-roll 需求\n④ 【剪輯指南】——節奏設計 + 音樂風格 + 縮圖設計建議\n⑤ 【3 天完成時間表】——Day1企劃+腳本(2hr) → Day2拍攝(3hr) → Day3剪輯+上傳(4hr)\n\n【規則】\n1. 所有建議適配使用者的設備。\n2. 腳本大綱只給 bullet points——逐字稿會讓 Vlog 聽起來像背書。\n3. 3 天時間表必須真的做得完。\n4. 開場嚴禁「嗨大家好我是 XXX」——直接丟炸彈。\n5. 縮圖建議必須具體到「臉要多大、文字放哪邊、背景什麼顏色」。`
  }
];