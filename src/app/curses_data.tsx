import { 
  Sparkles, Flame, Droplets, Wind, Copy, ExternalLink, ChevronDown, X, Search, Check,
  ShieldAlert, Hand, Mail, TrendingUp, Gavel, ShoppingBag, Map, LogOut, Lightbulb, Smile,
  AlertTriangle, Ban, BarChart, Home, Hammer, Navigation, FileText, Zap,
  Ghost, GraduationCap, Coins, Handshake, Trash2, HeartOff, PenTool, Send, Calendar, Megaphone, 
  Beer, ShieldCheck, UserPlus, Wallet, HelpCircle, ClipboardList, Clock, Receipt, Heart, Music,
  Dumbbell, Star, CircleDollarSign, VolumeX, Headset, ShieldX, Swords, Gift, Users,
  Brain, Bot, MessageSquare, Lock, Scissors
} from "lucide-react";
import React from "react";

export const CURSES = [
  {
    id: "greedy_bill_splitter",
    tab: "日常雜症",
    isPro: false,
    outputFormat: "LINE 群組尷尬化解文",
    icon: <Receipt className="w-8 h-8 text-yellow-500" />,
    color: "yellow",
    title: "AA制防禦陣：專治點餐大戶分帳術",
    desc: "聚餐有人狂點貴的卻想平攤？教你如何優雅地『精準拆帳』，讓對方自覺補錢，守護荷包且不傷友誼。",
    tags: ["AA制", "聚餐", "帳單", "精打細算"],
    fields: [
      { id: "total_bill", label: "總金額與人數", placeholder: "例：5000元/5個人", outputFormat: "帳務事實背景" },
      { id: "greedy_one", label: "那位大戶做了什麼？", placeholder: "例：他多點了三盤和牛跟兩杯調酒", outputFormat: "行為事實描述" }
    ],
    tweak: { 
      id: "strategy", 
      label: "收帳流派", 
      options: [
        "數據理性型：直接列出明細清單", 
        "裝傻委婉型：假裝錢帶不夠求精算", 
        "幽默調侃型：在笑話中點出價差",
        "軟性勒索型：這次他多付下次換人"
      ] 
    },
    theory: "基於『公平理論』。透過將總帳單『顆粒化』，打破集體平攤的心理定勢，將社會壓力從你身上轉移到那個過度消費的人身上。",
    generate: (inputs: any) => `你是一位精通人情世故的記帳達人。
聚餐總金額：[[${inputs.total_bill}]]。
有個同學/朋友點了：[[${inputs.greedy_one}]]，導致其他人平攤很不划算。
請採取【[[${inputs.strategy}]]】策略幫我寫一段傳到 LINE 群組的收錢訊息。

要求：
1. 語氣要自然，不要讓人覺得你很計較，但要讓大家看出來帳對不起來。
2. 核心目標：讓那位大戶主動承擔他超額的部分。
3. 提供 3 個不同「尷尬防禦力」的版本。

負向約束：嚴禁直接開罵；嚴禁使用死板的記帳表格；文字要帶有台灣 LINE 聊天的碎念感（如：那個、哈哈、好像）。`
  },
  {
    id: "haircut_sales_shield",
    tab: "日常雜症",
    isPro: false,
    outputFormat: "理髮椅上的脫身話術",
    icon: <Scissors className="w-8 h-8 text-pink-400" />,
    color: "pink",
    title: "洗頭結界：美髮店強迫推銷格擋術",
    desc: "頭髮洗到一半被推銷三萬塊儲值卡？教你如何戴上『窮鬼濾鏡』或『專業防禦』，讓設計師閉嘴，安靜享受服務。",
    tags: ["強迫推銷", "理髮", "拒絕", "生活"],
    fields: [
      { id: "sales_pitch", label: "他現在推銷你什麼？", placeholder: "例：要我買三萬的頭皮護理套餐", outputFormat: "推銷內容摘要" },
      { id: "current_status", label: "你目前的處境", placeholder: "例：正在洗頭臉上蓋著毛巾、或是剪到一半走不掉", outputFormat: "場景束縛描述" }
    ],
    tweak: { 
      id: "defense", 
      label: "格擋戰術", 
      options: [
        "財務破產流：我連下餐都快沒錢了", 
        "專業反駁流：我家裡已經有一打高級品", 
        "冷漠斷聯流：戴上耳機進入禪修模式",
        "公司報帳流：我只用公司配發的產品"
      ] 
    },
    theory: "利用『情境權力不對稱』反制。推銷者利用你無法逃離（洗頭中）的脆弱點。本咒語透過構建一個『無法獲利的負面標籤』，讓推銷者瞬間喪失進攻動力。",
    generate: (inputs: any) => `你是一位拒絕推銷的頂級大師。
我現在 [[${inputs.current_status}]]，被設計師推銷 [[${inputs.sales_pitch}]]。
請採取【[[${inputs.defense}]]】戰術撰寫應對台詞。

要求：
1. 台詞要短，因為我現在可能不方便講太多話。
2. 語氣要堅定，不給對方『再試試看』的空間。
3. 針對不同等級的煩人設計師，給出 3 種應對方案。

負向約束：嚴禁大聲吵架（這會讓現場很尷尬）；嚴禁給出『下次看看』這種留有餘地的回答。`
  },
  {
    id: "boss_line", tab: "職場求生", isPro: true, outputFormat: "LINE 短訊",
    icon: <Flame className="w-8 h-8 text-orange-500" />,
    color: "orange",
    title: "深夜老闆 LINE 突襲",
    desc: "下班後老闆傳 LINE 交辦事項，教你如何高情商推遲到明天。",
    tags: ["加班", "老闆", "職前", "LINE"],
    fields: [
      { id: "my_role", tab: "生活瑣事", isPro: false, outputFormat: "個人背景描述", label: "你的職位", placeholder: "例：基層工程師 / 視覺設計師" },
      { id: "boss_role", tab: "生活瑣事", isPro: false, outputFormat: "關係對位資訊", label: "對方職級/你與他的關係", placeholder: "例：直屬主管 / 公司創辦人" },
      { id: "boss_msg", tab: "生活瑣事", isPro: false, outputFormat: "老闆訊息內容", label: "他傳了什麼？", placeholder: "例：明早開會的簡報你今晚趕一下給我" },
      { id: "true_thought", tab: "生活瑣事", isPro: false, outputFormat: "內心真實意志", label: "你心裡真正的想法？", placeholder: "例：我已經躺平了，明天早上再弄" }
    ],
    tweak: { id: "tone", tab: "生活瑣事", isPro: false, outputFormat: "語氣情緒調整", label: "奴性微調 (語氣)", options: ["卑微狗腿", "專業得體", "不卑不亢 (立界線)"] },
    theory: "使用「意圖包裝」與「選項轉移法」。AI 會先安撫老闆情緒，然後提出『明天一早處理效果更好』的替代方案，避免直接拒絕。",
    generate: (inputs: any) => `你是一位精通台灣職場生存學的[[${inputs.my_role || '高情商且具備邊界感的職場專業人士'}]]。
對方是我的：「[[${inputs.boss_role || '直屬主管/老闆'}]]」
老闆剛剛在 LINE 傳了：「[[${inputs.boss_msg || '[請填寫老闆訊息]'}]]」
我心裡真正的想法是：「[[${inputs.true_thought || '[請填寫真實想法]'}]]」

請幫我把我的真實想法，包裝成可以立刻回覆老闆的 LINE 訊息。
要求：
1. 語氣必須是：【[[${inputs.tone || '專業得體'}]]】。
2. 要有「收到並重視」的態度，但巧妙地將實際行動推遲到明天上班時間。
3. 給我 3 個不同長短的版本讓我挑選。字數簡短，符合台灣 LINE 聊天習慣。`
  },
  {
    id: "crisis_pr", tab: "人際擋箭", isPro: true, outputFormat: "正式 Email",
    icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "災難降臨：出包公關防護罩",
    desc: "工作不小心搞砸了，教你如何寫出「承擔責任但不顯得無能」的道歉信，把危機變轉機。",
    tags: ["客訴", "出包", "道歉", "公關"],
    fields: [
      { id: "mistake", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "具體出了什麼包？", placeholder: "例：報價單多寫了一個零、把信寄錯人" },
      { id: "fix", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "你目前做了什麼補救？", placeholder: "例：已經收回信件並重新發送正確版" }
    ],
    tweak: { id: "tone", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "損失控制 (語氣)", options: ["誠惶誠恐", "專業冷靜並提出 Next Step"] },
    theory: "使用「焦點轉移法 (Redirection)」。AI 不會一味道歉，而是把篇幅的 70% 放在「解決方案」與「預防機制」，在心理學上能大幅降低主管的怒氣值。",
    generate: (inputs: any) => `你是一位年薪三百萬的頂級危機處理公關。
我今天在工作上出了這個包：「[[${inputs.mistake || '[請填寫錯誤內容]'}]]」。
我目前已經做的補救是：「[[${inputs.fix || '[請填寫補救措施]'}]]」。

請幫我擬定一封給主管的道歉/說明信。
要求語氣：【[[${inputs.tone || '專業冷靜並提出 Next Step'}]]】。
規則：開頭簡短致歉，中間條列式說明補救進度，結尾提出未來如何避免的具體防呆機制。不要用過度卑微的詞彙，要展現「雖然犯錯但我完全能掌控局面」的專業感。`
  },
  {
    id: "reject_people_pleaser", tab: "職場求生", isPro: false, outputFormat: "LINE/Slack",
    icon: <Hand className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "濫好人結界：優雅拒絕凹客/同事",
    desc: "同事又要把不屬於你的工作塞給你？用這招禮貌退回，讓他知難而退。",
    tags: ["奧客", "拒絕", "同事", "職場"],
    fields: [
      { id: "who", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "誰在凹你？", placeholder: "例：隔壁部門的老鳥" },
      { id: "task", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "他想凹你做什麼？", placeholder: "例：幫他做下週開會的 PPT" }
    ],
    tweak: { id: "strategy", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "拒絕策略", options: ["裝忙太極拳", "搬出主管當擋隔", "軟性拖延"] },
    theory: "使用「第三方權威借力法」與「條件交換法」。讓 AI 教你如何不說「不」，而是說「好啊，但我得先請示主管」或「好啊，那你這部分資料先給我」。",
    generate: (inputs: any) => `你是一位精通職場厚黑學與人際談判的專家。
現在「[[${inputs.who || '[某人]'}]]」試圖把「[[${inputs.task || '[某工作]'}]]」塞給我，這根本不是我的工作。

請幫我擬定一段 LINE 拒絕訊息。
要求策略：【[[${inputs.strategy || '裝忙太極拳'}]]】。
規則：
1. 絕對不能出現「我不要」、「這不是我的事」等破壞關係的字眼。
2. 要讓他看完覺得「找你幫忙成本太高」而自動放棄。`
  },
  {
    id: "wedding_bomb", tab: "人際擋箭", isPro: false, outputFormat: "LINE 婉拒",
    icon: <Mail className="w-8 h-8 text-pink-500" />,
    color: "pink",
    title: "新年賀卡/婚禮炸彈：紅色炸彈迴避閃現",
    desc: "收到不熟同學的喜帖，不想去也不想包紅包，教你不傷和氣的完美推辭。",
    tags: ["婚禮", "婉拒", "社交", "同學"],
    fields: [
      { id: "who", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "誰丟炸彈給你？", placeholder: "例：五年沒聯絡的大學同學" }
    ],
    tweak: { id: "reason", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "迴避理由", options: ["當天家裡有事", "已經安排出國", "預算吃緊 (婉轉版)"] },
    theory: "運用「資訊不對稱」與「過度祝福」。AI 會幫你把「理由」寫得無懈可擊，並用極度熱情的祝福語氣來掩蓋你不想去的事實。",
    generate: (inputs: any) => `你是一位高情商的公關大師。
一位「[[${inputs.who || '[某人]'}]]」突然私訊我要寄喜帖給我，但我不想去也不想包紅包。

請幫我寫一段婉拒的 LINE 訊息。
婉拒理由：【[[${inputs.reason || '當天家裡有事'}]]】。
規則：
1. 開頭必須展現極度驚喜與熱情的祝福。
2. 理由要寫得具體且無法被反駁（例如機票已經買了）。
3. 結尾祝他們新婚愉快，字數 100 字以內，符合台灣人聊天習慣。`
  },
  {
    id: "kpi_inflation", tab: "職場求生", isPro: true, outputFormat: "500字報告",
    icon: <TrendingUp className="w-8 h-8 text-yellow-500" />,
    color: "yellow",
    title: "虛空造物：年終績效膨脹術",
    desc: "明明做了一堆事，績效表卻寫得像流水帳？教你把苦勞包裝成「戰略級貢獻」。",
    tags: ["績效", "加薪", "升職", "周報"],
    fields: [
      { id: "task", tab: "生活瑣事", isPro: false, outputFormat: "事件事實描述", label: "描述你今年做了什麼爛差事？", placeholder: "例：每天幫大家訂便當、整理沒人看的舊檔案" }
    ],
    tweak: { id: "dimension", tab: "生活瑣事", isPro: false, outputFormat: "包裝維度選擇", label: "貢獻維度", options: ["提升團隊營運效率", "降低潛在風險與成本"] },
    theory: "使用「影響力框架 (Impact Framing)」。AI 會將微小的行政庶務，與公司的「降本增效」或「風險控制」等高級商業詞彙掛鉤。",
    generate: (inputs: any) => `你是一位 MBB (麥肯錫) 級別的企管顧問。
我今年的工作內容包含：「[[${inputs.task || '[打雜事項]'}]]」。這聽起來很像打雜，但我要寫在年終績效考核表上。

請幫我重新包裝這項經歷。
包裝方向：【[[${inputs.dimension || '提升團隊營運效率'}]]】。
規則：使用 STAR 原則 (情境、任務、行動、結果)，大量使用強勢動詞 (如：優化、重構、主導)，並嘗試為我捏造一個合理的「量化成效估算」(例如：節省了 20% 的溝通時間)。`
  },
  {
    id: "landlord_battle", tab: "日常雜症", isPro: false, outputFormat: "LINE 嚴正通知",
    icon: <Gavel className="w-8 h-8 text-slate-500" />,
    color: "slate",
    title: "惡房東退散：修繕談判防禦陣",
    desc: "租屋處冷氣壞了房東裝死？一封自帶法律威懾力但不撕破臉的交涉信。",
    tags: ["租屋", "房東", "修繕", "法律"],
    fields: [
      { id: "issue", tab: "生活瑣事", isPro: false, outputFormat: "損壞情況事實", label: "哪裡壞了/什麼問題？", placeholder: "例：冷氣滴水一個月都不修" },
      { id: "impact", tab: "生活瑣事", isPro: false, outputFormat: "具體困擾描述", label: "造成你什麼困擾？", placeholder: "例：害我筆電進水、無法睡覺" }
    ],
    tweak: { id: "level", tab: "生活瑣事", isPro: false, outputFormat: "威懾力道調整", label: "威懾等級", options: ["理性催告", "引用租賃專法暗示", "最後通牒"] },
    theory: "採用「法理情遞進結構」。不是一開始就對罵，而是透過 AI梳理客觀事實，暗示你具備法律常識（如民法修繕義務），讓對方不敢忽視。",
    generate: (inputs: any) => `你是一位深諳台灣《租賃住宅市場發展及管理條例》的專業律師。
我的租屋處遇到問題：「[[${inputs.issue || '[報修事項]'}]]」，這導致了「[[${inputs.impact || '[造成困擾]'}]]」。房東一直消極處理。

請幫我擬定一封傳給房東的 LINE 訊息。
威懾等級：【[[${inputs.level || '理性催告'}]]】。
規則：保持禮貌但態度堅定。如果是引用法規等級，請自然地帶入「依據合約與民法429條...」等字眼，讓房東知道我不是好惹的。`
  },
  {
    id: "shopee_copywriting", tab: "日常雜症", isPro: false, outputFormat: "500字拍賣文",
    icon: <ShoppingBag className="w-8 h-8 text-orange-500" />,
    color: "orange",
    title: "斷捨離鍊金術：蝦皮高轉單文案",
    desc: "二手商品賣不掉？讓 AI 幫你寫出帶有「故事感」與「稀缺性」的爆款拍賣文案。",
    tags: ["蝦皮", "文案", "拍賣", "二手"],
    fields: [
      { id: "item", tab: "生活瑣事", isPro: false, outputFormat: "商品特徵清單", label: "你要賣什麼？", placeholder: "例：九成新的 iPhone 13 Pro 藍色" },
      { id: "reason", tab: "生活瑣事", isPro: false, outputFormat: "惜物緣由背景", label: "為什麼要賣？", placeholder: "例：換了 iPhone 15，這台放在抽屜長灰塵" }
    ],
    tweak: { id: "pain_point", tab: "生活瑣事", isPro: false, outputFormat: "心理擊破策略", label: "買家痛點打擊", options: ["強調性價比", "強調女用極新", "強調急售可議"] },
    theory: "運用行銷學的「AIDA 法則 (注意、興趣、慾望、行動)」與「故事行銷」。AI 會把無聊的規格表，轉化為前任主人的愛惜故事，降低二手疑慮。",
    generate: (inputs: any) => `你是一位蝦皮千萬級拍賣賣家兼文案大師。
我要賣二手商品：「[[${inputs.item || '[商品名稱]'}]]」，出售原因是：「[[${inputs.reason || '[出售原因]'}]]」。

請幫我寫一篇吸睛的商品描述文案。
主攻痛點：【[[${inputs.pain_point || '強調性價比'}]]】。
規則：
1. 標題要自帶流量密碼（如：極新、秒發、附原廠盒）。
2. 內文要有「前主人的惜物人設」，增加信任感。
3. 列出規格與交易方式。
4. 加上適合的 Hashtag。`
  },
  {
    id: "travel_guide", tab: "日常雜症", isPro: false, outputFormat: "Markdown 行程",
    icon: <Map className="w-8 h-8 text-green-500" />,
    color: "green",
    title: "導遊的救贖：防雷包行程煉成陣",
    desc: "負責排行程還要被嫌棄？生成一份看起來超專業、塞住所有人嘴巴的行程表。",
    tags: ["導遊", "行程", "打卡", "旅遊"],
    fields: [
      { id: "location", tab: "生活瑣事", isPro: false, outputFormat: "地帶與天數資訊", label: "去哪裡玩？幾天？", placeholder: "例：宜蘭兩天一夜" },
      { id: "audience", tab: "生活瑣事", isPro: false, outputFormat: "旅伴屬性分析", label: "旅伴是誰？有什麼毛病？", placeholder: "例：三個女生朋友，愛拍照但不能走太久的路" }
    ],
    tweak: { id: "pace", tab: "生活瑣事", isPro: false, outputFormat: "行程節奏設定", label: "行程節奏", options: ["超Chill睡到自然醒", "瘋狂打卡踩點", "深度文化體驗"] },
    theory: "運用「Persona (角色扮演) 與 Constraints (限制條件)」。強制 AI 考慮特定族群的體力與偏好，並輸出為易讀的時間軸格式。",
    generate: (inputs: any) => `你是一位台灣在地高端私遊導遊。
我要去「[[${inputs.location || '[旅遊地點]'}]]」，旅伴的特徵是：「[[${inputs.audience || '[旅伴特徵]'}]]」。

請幫我規劃行程。
行程節奏要求：【[[${inputs.pace || '超Chill睡到自然醒'}]]】。
規則：
1. 必須考慮車程順路，不要東奔西跑。
2. 針對旅伴的特徵安排「亮點活動」。
3. 提供備案（如果下雨怎麼辦）。
4. 用 Markdown 時間軸格式輸出，可以直接貼到群組記事本的樣式。`
  },
  {
    id: "resignation_pr", tab: "職場求生", isPro: true, outputFormat: "正式 Email",
    icon: <LogOut className="w-8 h-8 text-indigo-500" />,
    color: "indigo",
    title: "展翅之風：不留話柄的華麗辭呈",
    desc: "想離職但怕被前老闆弄？教你寫出大氣、體面，又能安全脫身的離職信。",
    tags: ["離職", "辭呈", "老闆", "跳槽"],
    fields: [
      { id: "true_reason", tab: "生活瑣事", isPro: false, outputFormat: "內心真實動機", label: "真正離職原因", placeholder: "例：主管太機車、常常加班沒錢" }
    ],
    tweak: { id: "wrapper", tab: "生活瑣事", isPro: false, outputFormat: "官方辭令包裝", label: "表面包裝理由", options: ["個人職涯發展", "家庭健康因素", "想轉換產業"] },
    theory: "「語意重構 (Reframing)」。AI 會將你的怨氣與負面情緒，轉化為對未來的正向追求，確保你安全下莊，不燒毀橋樑 (Don't burn bridges)。",
    generate: (inputs: any) => `你是一位資深 HR 兼高階獵頭。
我要提離職了，真實原因其實是：「[[${inputs.true_reason || '[真實原因]'}]]」，但我絕對不能這麼寫。
我希望對外的官方說法是：【[[${inputs.wrapper || '個人職涯發展'}]]】。

請幫我擬定一封正式的離職 Email 給主管.
規則：
1. 感謝公司的栽培（具體捏造一個小事）。
2. 表達離開的遺憾。
3. 承諾會做好完美的交接。
4. 語氣大氣、真誠，不卑不亢。`
  },
  {
    id: "creative_idea", tab: "職場求生", isPro: false, outputFormat: "條列式點子",
    icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
    color: "amber",
    title: "靈感擴張領域：企劃起死回生術",
    desc: "腦袋卡殼想不出新企劃？讓 AI 從 5 個完全不相干的維度幫你暴力碰撞出新點子。",
    fields: [
      { id: "topic", tab: "生活瑣事", isPro: false, outputFormat: "主題關鍵字描述", label: "你卡關的主題是什麼？", placeholder: "例：如何推廣一款新的無糖茶飲" }
    ],
    tweak: { id: "dimension", tab: "生活瑣事", isPro: false, outputFormat: "腦洞撞擊維度", label: "腦洞維度", options: ["跨界聯名思維", "逆向操作思維", "極致荒謬搞笑"] },
    theory: "採用「SCAMPER 奔馳法」或「強制關聯法」。打破常規思維，要求 AI 將毫無關聯的概念強行結合，這是激發人類 Aha Moment 最有效的方法。",
    generate: (inputs: any) => `你是一位榮獲坎城創意獎的頂級廣告創意總監。
我現在卡關的主題是：「[[${inputs.topic || '[企劃主題]'}]]」。

請跳脫傳統的無聊框架，幫我發想 5 個創意切入點。
要求風格：【[[${inputs.dimension || '跨界聯名思維'}]]】。
規則：
不要給我那種「找網紅業配」、「買FB廣告」的垃圾建議。請給我具體的、有衝突感的、能在社群上引發瘋傳的 Guerrilla Marketing (游擊行銷) 點子。每個點子附上一句吸睛的 Slogan。`
  },
  {
    id: "vent_purifier", tab: "人際擋箭", isPro: false, outputFormat: "IG 限動文案",
    icon: <Smile className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "情緒淨化池：抱怨轉化器",
    desc: "氣到想在 IG 飆髒話？讓 AI 幫你把負能量轉化為帶有哲理的高級酸文案。",
    tags: ["抱怨", "文案", "情緒", "高級"],
    fields: [
      { id: "event", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "發生了什麼鳥事？", placeholder: "例：捷運上有大媽插隊還踩到我的新鞋" }
    ],
    tweak: { id: "style", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "輸出風格", options: ["村上春樹式憂鬱", "脫口秀演員高級酸", "佛系禪意文案"] },
    theory: "「風格遷移 (Style Transfer)」。這不僅是發洩工具，更是展示 AI 強大文學模擬能力的最佳範例，具有極強的社群傳播屬性（好玩、易分享）。",
    generate: (inputs: any) => `你是一位精通文字藝術的暢銷作家。
今天發生了一件讓我很生氣的事：「[[${inputs.event || '[鳥事]'}]]」。我想發一篇 IG 限時動態抱怨，但我不想看起來像個沒水準的瘋子。

請幫我把這件事改寫。
風格要求：【[[${inputs.style || '脫口秀演員高級酸'}]]】。
規則：不要出現任何髒話。要用極度隱喻、嘲諷或看似平靜卻充滿張力的文字，讓看得懂的人會心一笑。字數 50 字內。`
  },
  {
    id: "dead_teammate", tab: "校園生存", isPro: false, outputFormat: "1VS1對話策略",
    icon: <Ghost className="w-8 h-8 text-purple-400" />,
    color: "purple",
    title: "死靈退散：雷組員催繳陣",
    desc: "團體報告死線快到了，組員還在裝死？教你發出帶有壓迫感但不至於撕破臉的催繳訊息。",
    tags: ["催繳", "雷組員", "團體報告", "平級協作"],
    fields: [
      { id: "who", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "哪個雷包？", placeholder: "例：外系大四學長" },
      { id: "task", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "他欠什麼東西？", placeholder: "例：第二章的文獻回顧 500 字" }
    ],
    tweak: { id: "level", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "施壓等級", options: ["溫和關心法", "教授查勤暗示法", "最後通牒切割法"] },
    theory: "運用「責任錨定效應 (Accountability Anchoring)」。不指責對方偷懶，而是強調「整體進度」與「外部壓力（如教授）」，迫使對方產生損失厭惡 (Loss Aversion)。",
    generate: (inputs: any) => `你是一位精通談判與專案管理的黑臉 PM。
我的大學團體報告遇到雷組員「[[${inputs.who || '[某人]'}]]」，他至今未交出「[[${inputs.task || '[某工作]'}]]」。

請幫我擬定一段傳到 LINE 群組的催繳訊息。
施壓等級：【[[${inputs.level || '溫和關心法'}]]】。
規則：
1. 語氣要看似客氣，但暗藏殺機。
2. 必須設定明確的 Deadline（如：今晚 12 點前）。
3. 暗示如果沒交，會有什麼具體後果（例如：只能先在名單上註記未參與）。`
  },
  {
    id: "professor_sos", tab: "校園生存", isPro: false, outputFormat: "求情 Email",
    icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
    color: "blue",
    title: "起死回生：教授求情術",
    desc: "期末考考砸了面臨被當危機？一封動之以情、說理清晰的求情信，爭取補救機會。",
    tags: ["求情信", "教授", "期末救星", "生活瑣事"],
    fields: [
      { id: "course", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "什麼課？", placeholder: "例：微積分二" },
      { id: "reason", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "為什麼考砸？", placeholder: "例：確診剛康復狀態不佳" }
    ],
    tweak: { id: "fix", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本", label: "補救提案", options: ["額外寫一萬字報告", "申請補考", "承諾下學期當助教"] },
    theory: "採用「成長型思維展現 (Growth Mindset Display)」。教授討厭推卸責任的學生，AI 將引導你展現「對知識的渴望」而非「對分數的貪婪」，大幅提升教授的同理心。",
    generate: (inputs: any) => `你是一位深諳學術圈心理學的資深大學教授。
我修了你的「[[${inputs.course || '[課程名稱]'}]]」，但因為「[[${inputs.reason || '[原因]'}]]」面臨被當的危機。

請幫我寫一封 Email 給教授求情。
我願意提供的補救方案是：【[[${inputs.fix || '額外寫一萬字報告'}]]】。
規則：
1. 絕對不能有「求求你讓我過」的乞討語氣。
2. 開頭先感謝教授一學期的教導。
3. 誠懇承認自己的不足，並強調對這門學科的重視。
4. 提出補救方案時要展現極大的誠意。`
  },
  {
    id: "money_pitch", tab: "日常雜症", isPro: false, outputFormat: "零用錢計畫書",
    icon: <Coins className="w-8 h-8 text-yellow-400" />,
    color: "yellow",
    title: "金庫密碼：無痛爆金幣",
    desc: "月底吃土了想跟爸媽預支生活費？把「要錢」包裝成「自我投資」，讓長輩心願掏錢。",
    fields: [
      { id: "amount", tab: "生活瑣事", isPro: false, outputFormat: "具體需求金額", label: "缺多少錢？", placeholder: "例：5000元" },
      { id: "excuse", tab: "生活瑣事", isPro: false, outputFormat: "透支原因事實", label: "錢花去哪了？", placeholder: "例：買了多益參考書跟報名費" }
    ],
    tweak: { id: "strategy", tab: "生活瑣事", isPro: false, outputFormat: "老本行說服策略", label: "說服策略", options: ["投資未來型", "賣慘吃泡麵型", "記帳自省型"] },
    theory: "運用「投資報酬率框架 (ROI Framing)」。將消費行為轉化為對未來的投資，降低長輩對「揮霍」的防備心，觸發他們的「望子成龍」心理。",
    generate: (inputs: any) => `你是一位頂級的募資 Pitch 專家。
我是個大學生，這個月透支了，需要跟爸媽要「[[${inputs.amount || '[金額]'}]]」。
透支原因是：「[[${inputs.excuse || '[因素]'}]]」。

請幫我寫一段 LINE 訊息給爸媽。
說服策略：【[[${inputs.strategy || '投資未來型'}]]】。
規則：
1. 語氣要像個成熟、有規劃的大人，而不是伸手牌。
2. 巧妙地把透支原因包裝成「不可抗力」或「為了更好的未來」。
3. 結尾要加上關心爸媽身體健康的溫情攻勢。`
  },
  {
    id: "sponsor_hunt", tab: "日常雜症", isPro: false, outputFormat: "贊助商商務提案",
    icon: <Handshake className="w-8 h-8 text-emerald-400" />,
    color: "emerald",
    title: "空手套白狼：拉贊助神諭",
    desc: "辦活動缺錢要找附近店家拉贊助？寫出讓老闆覺得「不贊助會虧」的企劃信。",
    tags: ["贊助", "活動", "企劃", "合作"],
    fields: [
      { id: "event", tab: "生活瑣事", isPro: false, outputFormat: "活動細節描述", label: "什麼活動？", placeholder: "例：吉他社迎新演唱會，預計 200 人" },
      { id: "target", tab: "生活瑣事", isPro: false, outputFormat: "目標對手資訊", label: "贊助商是誰？", placeholder: "例：學校對面的新開手搖飲店" }
    ],
    tweak: { id: "perk", tab: "生活瑣事", isPro: false, outputFormat: "贊助回饋機制", label: "回饋機制", options: ["社群強力曝光", "實體攤位導購", "聯名專屬優惠"] },
    theory: "「價值主張對齊 (Value Proposition Alignment)」。打破學生「求贊助」的弱勢姿態，轉為「B2B 商業合作」視側，強調能為店家帶來多少實質的學生客源。",
    generate: (inputs: any) => `你是一位頂尖的 B2B 商業開發 (BD) 總監。
我是大學社團幹部，正在為「[[${inputs.event || '[活動]'}]]」尋找贊助。我想找「[[${inputs.target || '[店家]'}]]」合作。

請幫我擬定一封開發信/企劃摘要。
主打回饋機制：【[[${inputs.perk || '社群強力曝光'}]]】。
規則：
1. 標題要直接點出「能為店家帶來什麼好處」。
2. 內文使用數據化表達（如：觸及率、轉換率）。
3. 語氣專業自信，把這當作是一場雙贏的行銷合作。`
  },
  {
    id: "roommate_war", tab: "日常雜症", isPro: false, outputFormat: "宿舍和平協議書",
    icon: <Trash2 className="w-8 h-8 text-neutral-400" />,
    color: "neutral",
    title: "生化危機：室友衛生談判",
    desc: "室友不倒垃圾、半夜打遊戲太吵？用不帶情緒的溝通法，解決宿舍糾紛。",
    fields: [
      { id: "issue", tab: "生活瑣事", isPro: false, outputFormat: "生活習慣摩擦", label: "室友的惡行？", placeholder: "例：衣服泡在水桶三天發臭" },
      { id: "goal", tab: "生活瑣事", isPro: false, outputFormat: "具體行為請求", label: "你希望他怎麼做？", placeholder: "例：當天洗完衣服" }
    ],
    tweak: { id: "tone", tab: "生活瑣事", isPro: false, outputFormat: "談判對話姿態", label: "溝通姿態", options: ["幽默化解尷尬", "理性制定公約", "裝可憐神經衰弱"] },
    theory: "採用「非暴力溝通 (Nonviolent Communication, NVC)」。區分「觀察」與「評論」，表達感受與需要，避免激起對方的防衛機制。",
    generate: (inputs: any) => `你是一位專業的心理諮商師與調解員。
我的大學室友有這個問題：「[[${inputs.issue || '[問題]'}]]」，我希望他能：「[[${inputs.goal || '[期望]'}]]」。

請幫我擬定一段傳給他的 LINE 訊息或便利貼內容。
溝通姿態：【[[${inputs.tone || '理性制定公約'}]]】。
規則：
1. 嚴格遵守非暴力溝通原則：只陳述客觀事實，不作人身攻擊。
2. 表達這件事對我造成的具體困擾。
3. 提出明確且容易執行的請求。`
  },
  {
    id: "relationship_exit", tab: "人際擋箭", isPro: false, outputFormat: "分手不遺憾短訊",
    icon: <HeartOff className="w-8 h-8 text-pink-500" />,
    color: "pink",
    title: "無痛切割：海王/海后退散",
    desc: "遇到暈船對象發現不對勁，或者想拒絕死纏爛打的追求者？體面下莊的拒絕藝術。",
    fields: [
      { id: "situation", tab: "生活瑣事", isPro: false, outputFormat: "當前感情狀態", label: "目前的狀態？", placeholder: "例：曖昧一個月發現對方是海王" }
    ],
    tweak: { id: "strength", tab: "生活瑣事", isPro: false, outputFormat: "切割力道強弱", label: "切割力道", options: ["發好人卡軟著換", "專注自我發展", "冰冷且不留餘地"] },
    theory: "「邊界設定理論 (Boundary Setting)」。透過清晰、無歧義的語義結構，切斷對方的間歇性增強期待，同時保護自身安全。",
    generate: (inputs: any) => `你是一位高情商的兩性關係專家。
我目前遇到這個感情狀況：「[[${inputs.situation || '[狀況]'}]]」，我想要結束這段關係或拒絕對方。

請幫我擬定一段 LINE 訊息。
切割力道：【[[${inputs.strength || '發好人卡軟著陸'}]]】。
規則：
1. 訊息必須明確表達「拒絕」的意思，不能留有幻想空間。
2. 避免過度指責對方，多用「我訊息 (I-message)」。
3. 語氣堅定但保持基本禮貌。`
  },
  {
    id: "word_padding", tab: "校園生存", isPro: false, outputFormat: "灌水專用報告",
    icon: <PenTool className="w-8 h-8 text-sky-400" />,
    color: "sky",
    title: "字數煉金術：通識報告膨脹法",
    desc: "聽了一場超無聊的通識講座，要交 1000 字心得？教你把一句話擴寫成一篇學術巨作。",
    fields: [
      { id: "topic", tab: "生活瑣事", isPro: false, outputFormat: "核心主題描述", label: "講座主題是什麼？", placeholder: "例：台灣傳統廟宇建築之美" },
      { id: "takeaway", tab: "生活瑣事", isPro: false, outputFormat: "殘留記憶重點", label: "你唯一記得的一句話？", placeholder: "例：屋頂上的龍叫做交趾陶" }
    ],
    tweak: { id: "dimension", tab: "生活瑣事", isPro: false, outputFormat: "擴寫切入維度", label: "擴寫維度", options: ["結合現代社會現象", "探討文化傳傳危機", "哲學與自我反思"] },
    theory: "「語義擴張與多維度映射 (Semantic Expansion & Multi-dimensional Mapping)」。將單一資訊點進行暴力展開。",
    generate: (inputs: any) => `你是一位擅長寫文化評論與學術論文的專欄作家。
我剛聽完一場名為「[[${inputs.topic || '[主題]'}]]」的講座，但我只記得：「[[${inputs.takeaway || '[重點]'}]]」。現在我需要寫一份心得報告。

請幫我以此為核心，擴寫出大綱與段落內容。
擴寫維度：【[[${inputs.dimension || '結合現代社會現象'}]]】。
規則：
1. 使用大量學術與文青詞彙（如：解構、場域、異化、共鳴）。
2. 結構包含：破題引言、核心觀點展開、跨維度反思、結論。
3. 讓報告看起來像是有深度思考的。`
  },
  {
    id: "networking_pro", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本",
    icon: <Send className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "人脈捕手：校友冷開發",
    desc: "想找實習或請教業界學長姐，但完全不認識？一封讓對方無法拒絕的 Cold Email。",
    fields: [
      { id: "target_role", tab: "生活瑣事", isPro: false, outputFormat: "對方背景設定", label: "對方是誰？", placeholder: "例：在 Google 當 PM 的大五屆學長" },
      { id: "ask", tab: "生活瑣事", isPro: false, outputFormat: "求助具體內容", label: "你想求什麼？", placeholder: "例：想約 15 分鐘的線上咖啡請教面試準備" }
    ],
    tweak: { id: "strat", tab: "生活瑣事", isPro: false, outputFormat: "吸引策略捕捉", label: "吸引策略", options: ["極度崇拜請益型", "共同背景套近乎", "具體問題探討型"] },
    theory: "「自我效能滿足 (Ego Baiting)」。人們喜歡被視為專家。透過精準讚美與極低成本請求，最大化對方的回覆意願。",
    generate: (inputs: any) => `你是一位精通 LinkedIn 社交與人脈建立的獵頭。
我是一名大學生，想要聯繫「[[${inputs.target_role || '[目標對象]'}]]」，我的目的是：「[[${inputs.ask || '[請求內容]'}]]」。

請幫我寫一封 Cold Email 或 LinkedIn 邀請訊息。
吸引策略：【[[${inputs.strat || '共同背景套近乎'}]]】。
規則：
1. 標題要具備高開信率。
2. 開頭迅速建立連結。
3. 請求必須具體且不佔用太多時間。
4. 展現出我已經做過功課。`
  },
  {
    id: "leave_perfect", tab: "生活瑣事", isPro: false, outputFormat: "靈活長度文本",
    icon: <Calendar className="w-8 h-8 text-orange-400" />,
    color: "orange",
    title: "時空扭曲：完美請假術",
    desc: "早上起不來不想去上課/打工？生成一個合情合理、難以查證的請假理由。",
    fields: [
      { id: "event", tab: "生活瑣事", isPro: false, outputFormat: "假務目標內容", label: "要請什麼假？", placeholder: "例：早八的體育課 / 晚上的補習班打工" }
    ],
    tweak: { id: "type", tab: "生活瑣事", isPro: false, outputFormat: "藉口流派選擇", label: "請假流派", options: ["突發性生理不適", "不可抗力之交通意外", "嚴肅的家庭突發狀況"] },
    theory: "「資訊模糊化與合理性構建 (Information Obfuscation)」。提供細節建立真實感，但保留關鍵模糊性。",
    generate: (inputs: any) => `你是一位精通危機處理與藉口編造的專家。
我今天需要請假，目標是：「[[${inputs.event || '[目標]'}]]」。

請幫我擬定一段請假訊息。
請假流派：【[[${inputs.type || '突發性生理不適'}]]】。
規則：
1. 理由必須符合日常邏輯。
2. 語氣要帶有歉意以及急迫感。
3. 針對打工，要主動提出後續的補班或交接安排。`
  },
  {
    id: "dcard_master", tab: "人際擋箭", isPro: false, outputFormat: "Dcard 熱門爆料文",
    icon: <Megaphone className="w-8 h-8 text-cyan-500" />,
    color: "cyan",
    title: "雙面刃：Dcard 帶風向文案",
    desc: "遇到不公不義的事情想上 Dcard 爆料？教你寫出引發共鳴、推上熱門的爆款文。",
    fields: [
      { id: "injustice", tab: "生活瑣事", isPro: false, outputFormat: "不公事件紀實", label: "發生了什麼不公的事？", placeholder: "例：學校學餐漲價又變難吃" }
    ],
    tweak: { id: "style", tab: "生活瑣事", isPro: false, outputFormat: "情緒渲染風格", label: "煽動情緒", options: ["理性數據分析打臉", "委屈受害者視角", "黑色幽默極致嘲諷"] },
    theory: "「情緒傳染理論 (Emotional Contagion)」。社群演算法偏愛高喚醒情緒，AI 將重構敘事打擊共同痛點。",
    generate: (inputs: any) => `你是一位深諳台灣 Dcard 與 PTT 生態的資深社群操盤手。
我要爆料一件事：「[[${inputs.injustice || '[爆料內容]'}]]」。

請幫我寫一篇準備發在 Dcard 的文章。
情緒風格：【[[${inputs.style || '委屈受害者視角'}]]】。
規則：
1. 標題必須極度吸睛。
2. 內文排版要符合大學生閱讀習慣。
3. 結尾要拋出問題引導評論。`
  },
  {
    id: "drink_skip", tab: "人際擋箭", isPro: false, outputFormat: "下班聚餐防禦陣",
    icon: <Beer className="w-8 h-8 text-amber-600" />,
    color: "amber",
    title: "肝臟守護者：閃避下班聚餐",
    desc: "老闆突然揪下班去喝酒，但你想回家躺平？不傷和氣的完美脫身術。",
    fields: [
      { id: "who", tab: "生活瑣事", isPro: false, outputFormat: "邀約對象身份", label: "誰揪的？", placeholder: "例：愛喝酒的主管" },
      { id: "event", tab: "生活瑣事", isPro: false, outputFormat: "活動場景描述", label: "什麼局？", placeholder: "例：臨時熱炒店聚餐" }
    ],
    tweak: { id: "excuse", tab: "生活瑣事", isPro: false, outputFormat: "脫身藉口清單", label: "脫身藉口", options: ["健康養生牌", "孝親家庭牌", "進修上課牌"] },
    theory: "「社會摩擦力最小化 (Social Friction Reduction)」。使用社會普遍認可且具有道德高地的理由。",
    generate: (inputs: any) => `你是一位高情商的職場生存大師。
今天「[[${inputs.who || '[某人]'}]]」臨時揪了「[[${inputs.event || '[活動]'}]]」，但我不想去。

請幫我擬定一段口語化的拒絕說詞。
脫身藉口：【[[${inputs.excuse || '健康養生牌'}]]】。
規則：
1. 表達遺憾感。
2. 理由具體且不可逆。
3. 結尾祝大家玩得開心並客套下次。`
  },
  {
    id: "email_defense", tab: "職場求生", isPro: false, outputFormat: "職場防禦 Email",
    icon: <ShieldCheck className="w-8 h-8 text-slate-400" />,
    color: "slate",
    title: "太極防禦：回覆酸言酸語 Email",
    desc: "收到跨部門同事推鍋或酸言酸語的 Email？教你用最專業的語氣狠狠打臉。",
    fields: [
      { id: "attack", tab: "生活瑣事", isPro: false, outputFormat: "對方挑釁內容", label: "對方信裡怎麼酸你？", placeholder: "例：質疑我們進度太慢" },
      { id: "fact", tab: "生活瑣事", isPro: false, outputFormat: "真相資料依據", label: "實際的客觀事實？", placeholder: "例：是他們規格書晚交了三天" }
    ],
    tweak: { id: "power", tab: "生活瑣事", isPro: false, outputFormat: "反擊火力等級", label: "反擊力道", options: ["溫和澄清事實", "條理分明微帶刺", "CC大老闆的終極核彈"] },
    theory: "「專業抽離與事實錨定」。剝離情緒詞彙，純粹使用事實與數據進行防禦，展現專業格局。",
    generate: (inputs: any) => `你是一位在外商公司身經百戰的法務兼公關。
我收到敵意 Email：「[[${inputs.attack || '[攻擊內容]'}]]」，但事實是：「[[${inputs.fact || '[事實]'}]]」。

請幫我擬定一封回信 (Reply All)。
反擊力道：【[[${inputs.power || '條理分明微帶刺'}]]】。
規則：
1. 不使用情緒性字眼。
2. 使用條列式或時間軸還原真相。
3. 展現大局感。`
  },
  {
    id: "self_intro", tab: "職場求生", isPro: false, outputFormat: "破冰專用講稿",
    icon: <UserPlus className="w-8 h-8 text-indigo-400" />,
    color: "indigo",
    title: "破冰咒語：新人報到自我介紹",
    desc: "第一天上班要在全公司面前自介，怕太無聊又怕太高調？打造恰到好處的人設。",
    fields: [
      { id: "role", tab: "生活瑣事", isPro: false, outputFormat: "職位背景描述", label: "你的職位？", placeholder: "例：數位行銷專員" },
      { id: "hobby", tab: "生活瑣事", isPro: false, outputFormat: "個人記憶鉤子", label: "你的特點？", placeholder: "例：假日喜歡去爬百岳" }
    ],
    tweak: { id: "style", tab: "生活瑣事", isPro: false, outputFormat: "自我介紹風格", label: "人設風格", options: ["專業可靠型", "幽默親和型", "充滿熱情的菜鳥型"] },
    theory: "「首因效應與記憶鉤子」。植入容易被記住的標籤，方便日後同事開啟話題。",
    generate: (inputs: any) => `你是一位專精個人品牌塑造的公關教練。
我明天報到，職位是「[[${inputs.role || '[職位]'}]]」，特點是「[[${inputs.hobby || '[特點]'}]]」。

請幫我寫一段自我介紹講稿。
人設風格：【[[${inputs.style || '專業可靠型'}]]】。
規則：
1. 包含基本問候、亮點。
2. 融入興趣作為記憶鉤子。
3. 表達期待與請教姿態。`
  },
  {
    id: "salary_raise", tab: "職場求生", isPro: false, outputFormat: "秘密加薪談判",
    icon: <Wallet className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "薪資談判：試用期滿調薪陣",
    desc: "試用期過了，當初說好會調薪老闆卻裝傻？有理有據地爭取應得的薪水。",
    tags: ["加薪", "調薪談判", "薪資爭取"],
    fields: [
      { id: "achievement", tab: "生活瑣事", isPro: false, outputFormat: "功績貢獻條列", label: "你做出了什麼成績？", placeholder: "例：獨立完成了兩個專案" },
      { id: "target", tab: "生活瑣事", isPro: false, outputFormat: "期望調整數據", label: "期望調薪多少？", placeholder: "例：加薪 3000 元" }
    ],
    tweak: { id: "angle", tab: "生活瑣事", isPro: false, outputFormat: "談判切入論點", label: "談判切入點", options: ["強調產值與貢獻", "對標市場行情", "委婉探詢公司標準"] },
    theory: "「錨定效應與價值證明」。不談需要錢，而是談創造了多少價值，將談判框架轉移到人才投資。",
    generate: (inputs: any) => `你是一位資深 HR 總監。
我剛滿試用期，成績是：「[[${inputs.achievement || '[成績]'}]]」。希望調薪：「[[${inputs.target || '[金額]'}]]」。

請幫我擬定面談談判腳本。
談判切入點：【[[${inputs.angle || '強調產值與貢獻'}]]】。
規則：
1. 感謝栽培。
2. 量化貢獻 (STAR 原則)。
3. 語氣堅定不具威脅性。
4. 準備退讓方案。`
  },
  {
    id: "vague_clarify", tab: "職場求生", isPro: false, outputFormat: "通靈破解腳本",
    icon: <HelpCircle className="w-8 h-8 text-slate-400" />,
    color: "slate",
    title: "通靈破解：釐清模糊指令",
    desc: "老闆丟下模糊指令「稍微弄一下要有質感」，教你如何反問出具體需求。",
    fields: [
      { id: "vague_task", tab: "生活瑣事", isPro: false, outputFormat: "糢糊指令摘要", label: "模糊指令是什麼？", placeholder: "例：幫我做競品分析，越快越好" }
    ],
    tweak: { id: "strat", tab: "生活瑣事", isPro: false, outputFormat: "提問澄清策略", label: "釐清策略", options: ["提供選擇題法", "確認邊界與資源法", "覆述並確認目標法"] },
    theory: "「主動聆聽與框架收斂」。將開放式問題轉化為選擇題，降低老闆認知負荷，保護自己不白工。",
    generate: (inputs: any) => `你是一位向上管理大師。
老闆給了糢糊指令：「[[${inputs.vague_task || '[指令]'}]]」。

請幫我擬定回覆訊息。
釐清策略：【[[${inputs.strat || '覆述並確認目標法'}]]】。
規則：
1. 不要直問具體做什麼。
2. 提供 2-3 個方向選。
3. 確認 Deadline 與格式。`
  },
  {
    id: "handover_magic", tab: "職場求生", isPro: false, outputFormat: "工作交接說明",
    icon: <ClipboardList className="w-8 h-8 text-blue-400" />,
    color: "blue",
    title: "傳承之書：無痛交接清單",
    desc: "要離職了，交接文件不知道從何寫起？一鍵生成結構化的完美交接清單。",
    fields: [
      { id: "scope", tab: "生活瑣事", isPro: false, outputFormat: "業務範圍界定", label: "核心業務是什麼？", placeholder: "例：維護公司官網與發送 EDM" }
    ],
    tweak: { id: "level", tab: "生活瑣事", isPro: false, outputFormat: "細節完整等級", label: "文件詳細度", options: ["大綱速成版", "鉅細靡遺保母版", "著重坑點與地雷版"] },
    theory: "「資訊架構學」。將隱性知識轉化為顯性知識，分類層級化確保接手者快速上手。",
    generate: (inputs: any) => `你是一位資深專案經理。
工作交接，核心業務：「[[${inputs.scope || '[業務]'}]]」。

請幫我生成交接目錄與模板。
詳細度：【[[${inputs.level || '鉅細靡遺保母版'}]]】。
規則：
1. 包含例行事項、專案進度、資源。
2. 包含「避坑指南」。
3. Markdown 格式。`
  },
  {
    id: "vendor_push", tab: "人際擋箭", isPro: false, outputFormat: "追殺進度指令",
    icon: <Clock className="w-8 h-8 text-red-400" />,
    color: "red",
    title: "死線衝刺：優雅催促供應商/同事",
    desc: "合作方動作太慢，眼看要開天窗了？催進度又不能得罪人的溝通藝術。",
    tags: ["催促", "死線", "供應商", "平級協作"],
    fields: [
      { id: "who", tab: "生活瑣事", isPro: false, outputFormat: "對象身份標記", label: "催誰？", placeholder: "例：外包的設計師" },
      { id: "item", tab: "生活瑣事", isPro: false, outputFormat: "延宕項目內容", label: "催什麼？", placeholder: "例：明天要上線的海報" }
    ],
    tweak: { id: "tone", tab: "生活瑣事", isPro: false, outputFormat: "協戰語氣設定", label: "催促語氣", options: ["溫柔提醒裝傻法", "搬出大老闆施壓法", "共同面對死線法"] },
    theory: "「急迫性框架與同盟建立」。將催促轉化為共同對抗外部壓力，降低對立感。",
    generate: (inputs: any) => `你是一位八面玲瓏的專案經理。
催促「[[${inputs.who || '[某人]'}]]」交出「[[${inputs.item || '[東西]'}]]」，時間緊迫。

請幫我擬定訊息。
催促語氣：【[[${inputs.tone || '共同面對死線法'}]]】。
規則：
1. 肯定辛苦。
2. 點出 Delay 連鎖反應。
3. 展現團隊精神。`
  },
  {
    id: "expense_claim", tab: "職場求生", isPro: false, outputFormat: "報帳申訴文字",
    icon: <Receipt className="w-8 h-8 text-neutral-400" />,
    color: "neutral",
    title: "逆轉裁判：報帳退件申訴",
    desc: "代墊錢卻被財務部奇怪理由退件？用邏輯與規章把錢要回來。",
    fields: [
      { id: "expense", tab: "生活瑣事", isPro: false, outputFormat: "報帳項目內容", label: "報什麼被退？", placeholder: "例：客戶吃飯計程車費" },
      { id: "reason", tab: "生活瑣事", isPro: false, outputFormat: "退件理由描述", label: "退件理由？", placeholder: "例：沒事先填出差單" }
    ],
    tweak: { id: "strat", tab: "生活瑣事", isPro: false, outputFormat: "申訴溝通策略", label: "申訴策略", options: ["低姿態求通融", "引用特例與主管背書", "強調業務急迫性"] },
    theory: "「程序正義與例外管理」。理解財務防弊本質，提供合理例外解釋與授權台階。",
    generate: (inputs: any) => `你是一位資深特助。
報帳「[[${inputs.expense || '[報帳項]'}]]」被退理由「[[${inputs.reason || '[理由]'}]]」。

請幫我擬定申訴信。
申訴策略：【[[${inputs.strat || '引用特例與主管背書'}]]】。
規則：
1. 極度客氣。
2. 解釋不可抗力或急迫性。
3. 提出補救措施。`
  },
  {
    id: "mental_health", tab: "職場求生", isPro: false, outputFormat: "請假申請假條",
    icon: <Heart className="w-8 h-8 text-rose-400" />,
    color: "rose",
    title: "心靈綠洲：合法請心理假/病假",
    desc: "壓力大到快崩潰只想請假？寫出讓主管無法拒絕且不被貼標籤的請假信。",
    tags: ["請假", "心理假", "生活瑣事"],
    fields: [
      { id: "status", tab: "生活瑣事", isPro: false, outputFormat: "真實崩潰情形", label: "你真實的狀態？", placeholder: "例：加班兩週焦慮失眠" }
    ],
    tweak: { id: "wrapper", tab: "生活瑣事", isPro: false, outputFormat: "合法藉口包裝", label: "請假包裝", options: ["突發急性腸胃炎", "偏頭痛發作", "誠實表達需要喘息"] },
    theory: "「合法權威與隱邊界 (Privacy Boundaries)」。利用生理症狀掩護心理壓力，或運用脆弱性獲取空間。",
    generate: (inputs: any) => `你是一位現代 HR 專家。
狀態「[[${inputs.status || '[狀態]'}]]」，需要請假。

請幫我擬定訊息。
請假包裝：【[[${inputs.wrapper || '偏頭痛發作'}]]】。
規則：
1. 簡潔有力。
2. 交代進度代理人。
3. 表達積極恢復態度。`
  },
  {
    id: "party_survival", tab: "職場求生", isPro: false, outputFormat: "尾牙防禦方案",
    icon: <Music className="w-8 h-8 text-pink-400" />,
    color: "pink",
    title: "尾牙求生：閃避/應付表演陣",
    desc: "菜鳥被逼著尾牙跳舞？教你如何優雅拒絕，或策範最省事但不失禮的表演。",
    fields: [
      { id: "situation", tab: "生活瑣事", isPro: false, outputFormat: "尷尬被迫場景", label: "公司要求什麼？", placeholder: "例：新人上台跳科目三" }
    ],
    tweak: { id: "strat", tab: "生活瑣事", isPro: false, outputFormat: "閃避解法選擇", label: "應對策略", options: ["自嘲肢體障礙婉拒", "提議改視訊靜態", "策劃極簡敷衍表演"] },
    theory: "「期望值管理與替代方案」。提出成本更低但同樣具備娛樂效果的替代方案。",
    generate: (inputs: any) => `你是一位活動公關導。
公司要求「[[${inputs.situation || '[要求]'}]]」，我抗拒。

請幫我擬方案。
應對策略：【[[${inputs.strat || '自嘲肢體障礙婉拒'}]]】。
規則：
1. 婉拒則提無法反駁理由並承擔幕後。
2. 表演則提省時有效果的點子。`
  },
  {
    id: "gym_refund", tab: "日常雜症", isPro: false, outputFormat: "解約談判信函",
    icon: <Dumbbell className="w-8 h-8 text-orange-500" />,
    color: "orange",
    title: "斷捨離術：健身房退費咒",
    desc: "想退健身房會員卻被業務纏著不放？寫出一封讓業務知難而退、依法有據的退費信。",
    fields: [
      { id: "reason", tab: "生活瑣事", isPro: false, outputFormat: "解約具體原因", label: "你想退出的理由", placeholder: "例：搬家到外縣市 / 工作受傷無法運動" }
    ],
    tweak: { id: "logic", tab: "生活瑣事", isPro: false, outputFormat: "談判法規邏輯", label: "談判邏輯", options: ["法規條款壓制", "溫情家庭因素", "堅定不移復讀機"] },
    theory: "「損失厭惡與定錨效應」。利用消費者保護法作為定錨，讓業務意識到繼續糾纏可能會面臨法律成本或負面評價。",
    generate: (inputs: any) => `你是一位資深的消費者權益律師。
我的健身房合約想退掉，理由是：「[[${inputs.reason || '[理由]'}]]」。業務一直跟我打太極。

請幫我擬定一份傳給業務或健身房客服的訊息。
談判邏輯：【[[${inputs.logic || '法規條款壓制'}]]】。
規則：
1. 語氣堅定且不容質疑。
2. 提到「依據定型化契約應記載及不得記載事項」。
3. 清楚表達「我不是來討論的，我是來通知退費流程的」。`
  },
  {
    id: "service_critique", tab: "日常雜症", isPro: false, outputFormat: "Google 評論文",
    icon: <Star className="w-8 h-8 text-yellow-400" />,
    color: "yellow",
    title: "星級審查：高級酸評價術",
    desc: "吃到難吃的餐廳或遇到爛服務？教你寫出帶有幽默感與極高殺傷力的 Google 評論。",
    fields: [
      { id: "bad_exp", tab: "生活瑣事", isPro: false, outputFormat: "糟糕體驗紀實", label: "最糟糕的部分", placeholder: "例：牛排硬得像輪胎 / 服務生翻白眼" }
    ],
    tweak: { id: "style", tab: "生活瑣事", isPro: false, outputFormat: "毒舌嘲諷風格", label: "嘲諷流派", options: ["極地冰冷自嘲", "美食評論家式毒舌", "荒謬故事敘事"] },
    theory: "「反差幽默感」。不直接噴髒話，而是用更高級的文字對比期待與現實，讓大眾在笑聲中避雷，並迫使店家認真對待回饋。",
    generate: (inputs: any) => `你是一位毒舌的美食評論家。
我剛剛在一家店遇到了極差的體驗：「[[${inputs.bad_exp || '[具體爛事]'}]]」。

請幫我寫一篇 Google 五星（或一星）評論。
嘲諷流派：【[[${inputs.style || '美食評論家式毒舌'}]]】。
規則：
1. 絕對不帶髒話，要優雅地罵人。
2. 運用生動的比喻（例如：這道菜讓我想起家鄉的馬路）。
3. 讓讀者覺得你很有才華，同時完全不想去這家店。`
  },
  {
    id: "debt_recovery", tab: "日常雜症", isPro: false, outputFormat: "討債攻心文字",
    icon: <CircleDollarSign className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "債務回收：催債不尷尬陣",
    desc: "朋友借錢不還，想討錢又怕壞了交情？用這招禮貌、精準且讓對方無法忽視地拿回錢。",
    fields: [
      { id: "who", tab: "生活瑣事", isPro: false, outputFormat: "欠債對象資訊", label: "誰欠你錢？", placeholder: "例：大學室友阿強" },
      { id: "amount", tab: "生活瑣事", isPro: false, outputFormat: "金額帳務明細", label: "多少錢？", placeholder: "例：2000 元" }
    ],
    tweak: { id: "method", tab: "生活瑣事", isPro: false, outputFormat: "回款催討技巧", label: "催債技巧", options: ["借位裝窮法", "第三方系統提醒法", "自然回憶法"] },
    theory: "「認知失調與心理帳戶」。將對方從「被要求還錢」的負面感受，轉化為「幫助朋友脫離經濟困境」的正向行為。",
    generate: (inputs: any) => `你是一位精通心理戰的談判專家。
「[[${inputs.who || '[某人]'}]]」欠了我「[[${inputs.amount || '[金額]'}]]」很久都沒還。

請幫我擬一段 LINE 訊息。
催債技巧：【[[${inputs.method || '借位裝窮法'}]]】。
規則：
1. 絕不開門見山說「還我錢」。
2. 設定一個「我現在急需這筆錢」的場景（例如：信用卡要扣款了）。
3. 讓對方覺得還錢是在救你，而不是在被你嫌棄。`
  },
  {
    id: "neighbor_noise", tab: "日常雜症", isPro: false, outputFormat: "鄰居溝通筆記",
    icon: <VolumeX className="w-8 h-8 text-slate-400" />,
    color: "slate",
    title: "結界術：鄰居噪音制裁",
    desc: "鄰居半夜剁肉、小孩尖叫？一份既能保持未來鄰里關係，又能有效止噪的交涉信。",
    fields: [
      { id: "noise", tab: "生活瑣事", isPro: false, outputFormat: "噪音事實描述", label: "什麼噪音？", placeholder: "例：半夜三點還在拖家具" }
    ],
    tweak: { id: "approach", tab: "生活瑣事", isPro: false, outputFormat: "談判交涉姿態", label: "交涉姿態", options: ["溫柔受害者", "理性事實陳述", "管理委員會警告暗示"] },
    theory: "「互惠原則 (Reciprocity)」。先展示對鄰居忙碌生活的理解，再提出噪音的具體影響，建立一個共同解決問題的框架，而非指責。",
    generate: (inputs: any) => `你是一位深諳社區協調之道的物業經理。
樓上或隔壁鄰居一直在：「[[${inputs.noise || '[噪音行為]'}]]」，讓我快抓狂了。

請幫我寫一張便利貼或 LINE 訊息。
交涉姿態：【[[${inputs.approach || '理性事實陳述'}]]】。
規則：
1. 開頭先稱讚鄰居（例如：一直覺得您是很客氣的人）。
2. 具體描述噪音的時間點與對我健康的影響（例如：偏頭痛發作）。
3. 提出一個微小的、可執行的建議。`
  },
  {
    id: "cs_war", tab: "日常雜症", isPro: false, outputFormat: "靈活長度文本",
    icon: <Headset className="w-8 h-8 text-blue-400" />,
    color: "blue",
    title: "權利守衛：客服維權申訴",
    desc: "包裹弄丟、收到的東西壞了卻被客服已讀不回？寫出讓人工客服立刻通報主管的急件信。",
    tags: ["應付客訴", "維權申訴", "客服交涉", "生活瑣事"],
    fields: [
      { id: "issue", tab: "生活瑣事", isPro: false, outputFormat: "糾紛事件記錄", label: "發生什麼糾紛？", placeholder: "例：網購螢幕破裂卻說是我弄的" }
    ],
    tweak: { id: "level", tab: "生活瑣事", isPro: false, outputFormat: "法律施壓等級", label: "申訴強度", options: ["理性條列損失", "引用法律與消基會", "社交媒體擴散暗示"] },
    theory: "「權力不對稱反擊」。客服最怕流程外的麻煩，透過專業術語展現你是不好惹且有備而來的消費者，迫使他們快速結案。",
    generate: (inputs: any) => `你是一位專門處理商業糾紛的法律顧問。
我跟這家公司的糾紛是：「[[${inputs.issue || '[糾紛事項]'}]]」。

請幫我擬定一封給官方客服或申訴信箱的郵件。
申訴強度：【[[${inputs.level || '引用法律與消基會'}]]】。
規則：
1. 使用清晰的時間軸。
2. 結尾附上「若 24 小時內未獲回應，將採取法律途徑」等關鍵句。
3. 語氣冷靜得像一台法律機器。`
  },
  {
    id: "sales_shield", tab: "人際擋箭", isPro: false, outputFormat: "拒絕推銷短訊",
    icon: <ShieldX className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "格擋術：推銷/人情保險閃現",
    desc: "很久沒聯絡的朋友突然找你喝咖啡談保險？用這招快速拒絕，且不傷彼此面子。",
    tags: ["拒絕", "推銷", "保險", "社交"],
    fields: [
      { id: "who", tab: "生活瑣事", isPro: false, outputFormat: "推銷來源描述", label: "誰想推銷你？", placeholder: "例：國中同學突然密我" }
    ],
    tweak: { id: "reason", tab: "生活瑣事", isPro: false, outputFormat: "拒絕閉環理由", label: "拒絕理由", options: ["預算額度已滿", "家人在相關產業", "目前的職涯規劃不需要"] },
    theory: "「認知負荷最小化」。不要給推銷員任何「你的猶豫」作為抓手，用一個封閉式的、無法反駁的理由快速結束話題。",
    generate: (inputs: any) => `你是一位拒絕推銷的高手。
「[[${inputs.who || '[某人]'}]]」想跟我推銷東西（如：保險、直銷、投資）。

請幫我寫一段 LINE 訊息。
拒絕理由：【[[${inputs.reason || '預算額度已滿'}]]】。
規則：
1. 先大方問候，展現友誼。
2. 迅速切入重點拒絕，不給對方追問的空間。
3. 語氣溫暖但底線明確。`
  },
  {
    id: "internet_arg", tab: "人際擋箭", isPro: false, outputFormat: "槓精終止回覆",
    icon: <Swords className="w-8 h-8 text-sky-400" />,
    color: "sky",
    title: "辯論終結：鍵盤俠回擊咒",
    desc: "在留言區被槓精纏上？用一句話展現高度，讓對方顯得像個沒長大的小孩。",
    tags: ["回擊", "辯論", "回嗆", "反擊"],
    fields: [
      { id: "comment", tab: "生活瑣事", isPro: false, outputFormat: "槓精言論摘要", label: "對方說了什麼蠢話？", placeholder: "例：你這觀點完全是錯的，你不懂啦" }
    ],
    tweak: { id: "tactic", tab: "生活瑣事", isPro: false, outputFormat: "回擊終止戰術", label: "回擊戰術", options: ["降維打擊", "幽默化解", "冷漠終止"] },
    theory: "「框架轉發 (Reframing)」。將爭論的焦點從特定的事實，轉移到「爭論行為本身」的無意義性，在精神層面上贏得勝利。",
    generate: (inputs: any) => `你是一位精通辯論與語言藝術的哲學巨匠。
網路上有個路人跟我爭論：「[[${inputs.comment || '[他的廢話]'}]]」。

請幫我寫一段簡短的、能瞬間終止爭論的回覆。
回擊戰術：【[[${inputs.tactic || '降維打擊'}]]】。
規則：
1. 不要跟他吵事實。
2. 要表現出「我理解你的侷限性，但我沒時間陪你玩」的優越感。
3. 回覆要短。`
  },
  {
    id: "dating_bio", tab: "日常雜症", isPro: false, outputFormat: "App 爆款自介",
    icon: <Heart className="w-8 h-8 text-pink-400" />,
    color: "pink",
    title: "吸引力法則：脫單自我介紹",
    desc: "Dating App 文案沒人看？教你寫出帶有個性、幽默感，又不會顯得太卑微的爆款自介。",
    tags: ["脫單", "社交", "軟體", "自介"],
    fields: [
      { id: "fact", tab: "生活瑣事", isPro: false, outputFormat: "個人趣事紀錄", label: "關於你的一件趣事", placeholder: "例：我可以一次吃掉 20 個水餃 / 是一個路癡" }
    ],
    tweak: { id: "vibe", tab: "生活瑣事", isPro: false, outputFormat: "人設濾鏡選擇", label: "自介濾鏡", options: ["反差萌幽默", "極簡神秘感", "充滿能量的活力感"] },
    theory: "「信號傳遞與差異化 (Signaling & Differentiation)」。App 上都是帥哥美女，幽默與獨特的人設是最高效的信標，能快速過濾出志趣相投的人。",
    generate: (inputs: any) => `你是一位 Tinder/Bumble 的文案優化專家。
我的個人趣事是：「[[${inputs.fact || '[趣事]'}]]」。

請幫我寫兩段不同的自介。
自介濾鏡：【[[${inputs.vibe || '反差萌幽默'}]]】。
規則：
1. 拒絕流水帳，要用「展示而非敘述」。
2. 加入一個能讓對方好開啟話題的「鉤子」。
3. 字數控制在 100 字內，要有質感。`
  },
  {
    id: "favor_ask", tab: "日常雜症", isPro: false, outputFormat: "求人幫忙文案",
    icon: <Gift className="w-8 h-8 text-emerald-400" />,
    color: "emerald",
    title: "人情鍊金術：求人幫忙不欠情",
    desc: "想請朋友幫修圖、翻譯、載東西？讓對方心甘情願幫忙，且覺得自己很有榮譽感。",
    tags: ["人情", "幫忙", "請求", "說服"],
    fields: [
      { id: "task", tab: "生活瑣事", isPro: false, outputFormat: "請求事項內容", label: "你想求什麼？", placeholder: "例：幫我看這份合約有沒有陷阱" }
    ],
    tweak: { id: "strategy", tab: "生活瑣事", isPro: false, outputFormat: "說服人情策略", label: "說服策略", options: ["認可專業型", "互惠承諾型", "求助弱者型"] },
    theory: "「富蘭克林效應 (Benjamin Franklin Effect)」。人們喜歡幫助他們曾經幫助過的人。透過認可對方的專業，讓幫忙變成一種自我實現。",
    generate: (inputs: any) => `你是一位高情商的說服力大師。
我需要請人幫忙：「[[${inputs.task || '[請求事項]'}]]」。

請幫我擬一段 LINE 訊息。
說服策略：【[[${inputs.strategy || '認可專業型'}]]】。
規則：
1. 大量讚美對方的某項特質。
2. 表達「這件事除了你我想不出第二個人能幫我」。
3. 埋下未來回報的伏筆。`
  },
  {
    id: "relative_shield", tab: "人際擋箭", isPro: false, outputFormat: "反向關心劇本",
    icon: <Users className="w-8 h-8 text-indigo-500" />,
    color: "indigo",
    title: "防禦陣：長輩職涯通神術",
    desc: "過年被問「現在在做什麼工作？薪水多少？」教你如何講得讓他們聽不懂但覺得你很厲害。",
    tags: ["過年", "親戚", "回嗆", "職涯"],
    fields: [
      { id: "job", tab: "生活瑣事", isPro: false, outputFormat: "現有職位描述", label: "你真實的職稱/工作", placeholder: "例：前端工程師 / 自由接案插畫家" }
    ],
    tweak: { id: "approach", tab: "生活瑣事", isPro: false, outputFormat: "應對防禦流派", label: "應對流派", options: ["高科技術語轟炸", "穩定發展公務員化", "低調發大財型"] },
    theory: "「認知覆蓋與資訊不對稱」。利用長輩對現代職業的資訊差，重新構建你的職業價值，從而終止不必要的比較與催婚。",
    generate: (inputs: any) => `你是一位專門對付親戚的脫口秀大師。
我的工作是：「[[${inputs.job || '[工作]'}]]」。

請幫我寫一段應對親戚問話的標準答案。
應對流派：【[[${inputs.approach || '高科技術語轟炸'}]]】。
規則：
1. 表面上一定要很有禮貌。
2. 使用大量高級但抽象的商業詞彙（例如：數位資產優化、跨國資源整合）。
3. 結尾迅速反向關心他們的健康（轉移法）。`
  },
  {
    id: "course_swap", tab: "校園生存", isPro: false, outputFormat: "LINE & Threads",
    icon: <Handshake className="w-8 h-8 text-yellow-500" />,
    color: "yellow",
    title: "禁忌交換：勸退學長姐讓課陣",
    desc: "必修課被大四佔走？教你如何高情商開價讓學長姐心甘情願讓出名額。",
    tags: ["選課", "學長姐", "談判", "大學"],
    fields: [
      { id: "target", tab: "校園生存", isPro: false, outputFormat: "談判對象資訊", label: "佔位的人", placeholder: "例：大四延畢生 / 不認識的學姐" },
      { id: "course", tab: "校園生存", isPro: false, outputFormat: "關鍵課名資訊", label: "你想搶的課", placeholder: "例：涼課營養學分 / 畢業必修" }
    ],
    tweak: { id: "strategy", tab: "校園生存", isPro: false, outputFormat: "談判策略選擇", label: "殺價策略", options: ["裝可憐情勒法", "利益交換談判法 (請喝星巴克)"] },
    theory: "運用「互惠偏誤」與「沉沒成本卸載」。透過微小利益交換，打破學長姐佔位的心態，並轉化為幫助學弟妹的自我實現感。",
    generate: (inputs: any) => `你是深諳談判心理學的大學生。我需要搶到「[[${inputs.course || '某必修課'}]]」，目前名額被「[[${inputs.target || '某位學長姐'}]]」卡住。
策略為：【[[${inputs.strategy || '利益交換談判法'}]]】。

請幫我產出兩段內容：
1. 生成一段傳到 LINE 的私訊，必須提出具體的利益交換。
2. 生成一篇發在 IG Threads（脆）的討拍文，句尾加上 #選課地獄，並詢問網友「為了一堂課你做過多卑微的事？」。

負向約束：LINE 訊息中絕對不能出現「理所當然」的語氣；Threads 貼文避免純抱怨，需帶有荒謬自嘲感。`
  },
  {
    id: "debt_recovery_campus", tab: "校園生存", isPro: false, outputFormat: "LINE & Threads",
    icon: <CircleDollarSign className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "金錢溯源：雷室友欠款催繳咒",
    desc: "室友欠錢裝死？啟動認知失調法，不談道德純靠心理壓力讓他秒還款。",
    tags: ["催債", "室友", "金錢", "住宿"],
    fields: [
      { id: "item", tab: "校園生存", isPro: false, outputFormat: "欠款項目描述", label: "代墊什麼錢？", placeholder: "例：冷氣電費 1500 元" },
      { id: "excuse", tab: "校園生存", isPro: false, outputFormat: "對方裝死理由", label: "他的爛藉口", placeholder: "例：說月底吃土還沒領錢" }
    ],
    tweak: { id: "strategy", tab: "校園生存", isPro: false, outputFormat: "催討流派選擇", label: "催討流派", options: ["月底破產同歸於盡法", "記帳系統無情通知法"] },
    theory: "啟動「認知失調喚醒」。不談道德對錯，純粹用冷酷的系統化提醒或比對方更慘的處境，迫使對方產生心理壓力而還款。",
    generate: (inputs: any) => `你是一位精通討債心理學的財務專家。我的室友欠我「[[${inputs.item || '一些錢'}]]」，他一直用「[[${inputs.excuse || '各種理由'}]]」裝死。
策略為：【[[${inputs.strategy || '記帳系統無情通知法'}]]】。

請幫我產出兩段內容：
1. 擬定一段傳到 LINE 的催款訊息，設定明確的轉帳 Deadline。
2. 撰寫一篇發在 IG Threads（脆）的互動文，分享討債心酸並徵求網友「聽過最瞎的欠錢不還理由」。

負向約束：LINE 訊息絕對不能用「有空記得給」這種無效結尾；Threads 嚴禁透露室友真實個資。`
  },
  {
    id: "advisor_wake", tab: "校園生存", isPro: true, outputFormat: "Email & Threads",
    icon: <Clock className="w-8 h-8 text-blue-400" />,
    color: "blue",
    title: "時間溯行：指導教授喚醒咒",
    desc: "教授不回信眼看死線要到了？用假定同意框架，把開放問題收斂為勾選題。",
    tags: ["教授", "論文", "回信", "研究生"],
    fields: [
      { id: "waiting_time", tab: "校園生存", isPro: false, outputFormat: "等待時長紀錄", label: "沒回訊多久了？", placeholder: "例：整整兩週" },
      { id: "deadline", tab: "校園生存", isPro: false, outputFormat: "迫切期限描述", label: "你的死線", placeholder: "例：論文大綱提交日" }
    ],
    tweak: { id: "strategy", tab: "校園生存", isPro: false, outputFormat: "教授攻略流派", label: "攻略流派", options: ["假裝擔憂安危法", "推進進度假定法"] },
    theory: "運用「假定同意框架」與「選擇焦慮消除」。減少教授的認知負荷，將開放式問題收斂為封閉式選項。",
    generate: (inputs: any) => `你是一位高情商的研究生生存大師。我的指導教授已經「[[${inputs.waiting_time || '很久'}]]」沒回訊，眼看「[[${inputs.deadline || '重要期限'}]]」要到了。
策略為：【[[${inputs.strategy || '推進進度假定法'}]]】。

請幫我產出兩段內容：
1. 擬定一段傳給教授的 LINE/Email 訊息，主動列出 3 個我可以去敲門面談的具體時段供他勾選。
2. 寫一篇 IG Threads（脆）的勸世文，標籤 #研究生日常。

負向約束：LINE 訊息嚴禁帶有「指責教授忘記」的語氣；Threads 貼文需提煉出「一句話惹怒研究生」的精華。`
  },
  {
    id: "report_fail", tab: "校園生存", isPro: false, outputFormat: "LINE & Threads",
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    color: "orange",
    title: "浴火重生：報告翻車急救術",
    desc: "報告被教授噴爆？主動示弱並提出超預期修正案，瞬間逆轉崩壞的第一印象。",
    tags: ["報告", "出包", "社死", "大學"],
    fields: [
      { id: "criticism", tab: "校園生存", isPro: false, outputFormat: "負面反饋紀錄", label: "教授噴了什麼？", placeholder: "例：文獻回顧根本是複製貼上" },
      { id: "feeling", tab: "校園生存", isPro: false, outputFormat: "情感共鳴描述", label: "當下的心情", placeholder: "例：恨不得鑽進地洞" }
    ],
    tweak: { id: "strategy", tab: "校園生存", isPro: false, outputFormat: "災後重建策略", label: "重建策略", options: ["虛心求教極致自嘲法", "瘋狂修改的爆肝人設法"] },
    theory: "導入「脆弱性展示」與「確認偏誤逆轉」。主動示弱並提出高於預期的修正方案，瞬間逆轉教授與同學的負面印象。",
    generate: (inputs: any) => `你是頂級的校園公關危機處理專家。我剛剛經歷了報告翻車，教授批評我：「[[${inputs.criticism || '報告做很爛'}]]」，我現在感覺「[[${inputs.feeling || '想死'}]]」。
策略為：【[[${inputs.strategy || '虛心求教極致自嘲法'}]]】。

請幫我產出兩段內容：
1. 擬定一段傳到小組 LINE 群組的安定軍心訊息，並承諾今晚會重構哪部分。
2. 寫一篇 Threads（脆）災難現場紀實，用極度幽默的口吻將社死轉化為流量密碼。

負向約束：LINE 裡絕對不能推卸責任給組員；Threads 上禁止使用任何攻擊教授的字眼。`
  },
  {
    id: "relative_shield_pro", tab: "人際擋箭", isPro: false, outputFormat: "家族群組文案",
    icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
    color: "purple",
    title: "姻緣迷霧：親戚逼問防禦結界",
    desc: "被問「怎麼不交男女朋友？」施展焦點轉移與降維打擊，讓長輩無法追問。",
    tags: ["長輩", "催婚", "新年", "尬聊"],
    fields: [
      { id: "elder", tab: "人際擋箭", isPro: false, outputFormat: "攻擊來源描述", label: "哪位長輩？", placeholder: "例：很愛比較的二姑媽" },
      { id: "question", tab: "人際擋箭", isPro: false, outputFormat: "致命問題紀錄", label: "他問了什麼？", placeholder: "例：怎麼還不結婚？眼光太高？" }
    ],
    tweak: { id: "strategy", tab: "人際擋箭", isPro: false, outputFormat: "防禦防線選擇", label: "防禦防線", options: ["專注學業事業法", "反向靈魂拷問法 (問對方退休金)"] },
    theory: "實施「焦點轉移與降維打擊」。透過看似禮貌實則錯開維度的回答，讓長輩無法在同一個話題上繼續施壓。",
    generate: (inputs: any) => `你是一位精通華人家族政治的過招大師。我遇到「[[${inputs.elder || '某位親戚'}]]」逼問我「[[${inputs.question || '私人隱私'}]]」。
策略為：【[[${inputs.strategy || '專注學業事業法'}]]】。

請幫我產出兩段內容：
1. 擬定一段在 LINE 家族群組高情商且軟釘子的回覆。
2. 在 Threads（脆）發布一篇引戰文，號召網友分享「一句話激怒親戚大挑戰」。

負向約束：LINE 回覆嚴禁留下「可以順勢介紹對象」的破綻；Threads 貼文以節奏明快的對話體呈現。`
  },
  {
    id: "weekend_work", tab: "職場求生", isPro: false, outputFormat: "LINE 回覆",
    icon: <VolumeX className="w-8 h-8 text-slate-400" />,
    color: "slate",
    title: "時空結界：假日公事防禦術",
    desc: "老闆週末傳 LINE 凹人？利用社會不可抗力因素，合法建立職場與生活的護城河。",
    tags: ["加班", "週末", "老闆", "界線"],
    fields: [
      { id: "boss_message", tab: "職場求生", isPro: false, outputFormat: "交辦內容詳情", label: "老闆傳什麼垃圾？", placeholder: "例：幫我查一下競品昨天的粉專貼文" },
      { id: "urgency", tab: "職場求生", isPro: false, outputFormat: "假性壓力描述", label: "他說多趕？", placeholder: "例：這週日晚上要準備好" }
    ],
    tweak: { id: "strategy", tab: "職場求生", isPro: false, outputFormat: "不予理會理由", label: "消失策略", options: ["荒郊野外無訊號法", "嚴肅家庭祭祀法"] },
    theory: "佈層「邊界模糊化化解」與「預期管理」。利用社會不可抗力因素，合法建立職場與生活的護城河。",
    generate: (inputs: any) => `你是倡導工作生活平衡的職場教練。老闆週末發來訊息：「[[${inputs.boss_message || '[沒意義的事]'}]]」，並暗示「[[${inputs.urgency || '很急'}]]」。
策略為：【[[${inputs.strategy || '荒郊野外無訊號法'}]]】。

請幫我產出兩段內容：
1. 擬定一段週日下午才回覆的 LINE 委婉訊息，給出「週一進公司第一時間處理」的承諾。
2. 寫一篇 Threads（脆）匿名抱怨文，引發社群共鳴並詢問「大家的假日防擾模式」。

負向約束：LINE 絕對不能有直接衝撞的字眼；Threads 嚴禁洩露真實公司名稱。`
  },
  {
    id: "blame_bounce", tab: "職場求生", isPro: true, outputFormat: "LINE 群組自清",
    icon: <ShieldAlert className="w-8 h-8 text-red-400" />,
    color: "red",
    title: "太極鏡像：跨部門黑鍋反彈術",
    desc: "別部門想推鍋？剝離情緒，用時間軸與數據在主管面前完成華麗反彈。",
    tags: ["黑鍋", "宮鬥", "跨部門", "職場"],
    fields: [
      { id: "blame", tab: "職場求生", isPro: false, outputFormat: "背鍋內容詳情", label: "對方推什麼鍋？", placeholder: "例：說我們行銷部沒給文案導致延遲" },
      { id: "evidence", tab: "職場求生", isPro: false, outputFormat: "反擊鐵證紀錄", label: "事實是什麼？", placeholder: "例：上週三就已經在群組 @ 對方主管確認過" }
    ],
    tweak: { id: "strategy", tab: "職場求生", isPro: false, outputFormat: "防禦反擊模式", label: "反擊流派", options: ["裝傻回推法", "條理數據核彈打臉法"] },
    theory: "啟動「責任錨定轉移」。剝離所有情緒，純粹使用時間軸與截圖證據，在群組觀眾面前建立「專業受害者」人設。",
    generate: (inputs: any) => `你是一位頂級職場生存專家。跨部門同事試圖把「[[${inputs.blame || '過失'}]]」推給我，但事實是「[[${inputs.evidence || '我有做'}]]」。
策略為：【[[${inputs.strategy || '條理數據核彈打臉法'}]]】。

請幫我產出兩段內容：
1. 擬定一段傳到有各主管在場的 LINE 工作群組自清訊息，必須 Tag 關鍵人物。
2. 將這段經歷寫成 Threads（脆）的「職場綠茶圖鑑」連載故事。

負向約束：LINE 訊息中禁止使用低端情緒詞彙；Threads 貼文必須具備吃瓜與教學價值。`
  },
  {
    id: "group_buy_skip", tab: "職場求生", isPro: false, outputFormat: "LINE 私訊婉拒",
    icon: <ShoppingBag className="w-8 h-8 text-pink-400" />,
    color: "pink",
    title: "荷包封印：辦公室瞎團購閃避陣",
    desc: "老鳥強推智商稅團購？歸咎自身不可抗力缺陷，讓紅人無法道德施壓。",
    tags: ["團購", "老鳥", "職場", "省錢"],
    fields: [
      { id: "item", tab: "職場求生", isPro: false, outputFormat: "商品內容描述", label: "買什麼垃圾？", placeholder: "例：一罐 800 元的網紅酵素" },
      { id: "initiator", tab: "職場求生", isPro: false, outputFormat: "發起人身份", label: "誰在推銷？", placeholder: "例：總務大姐 / 皇親國戚同事" }
    ],
    tweak: { id: "strategy", tab: "職場求生", isPro: false, outputFormat: "迴避借口選擇", label: "迴避理由", options: ["體質過敏無奈法", "財務赤字哭窮法"] },
    theory: "施展「社會認同免疫」。將拒絕購買的原因歸咎於自身的「不可抗力缺陷」，讓發起人無法繼續進行從眾施壓。",
    generate: (inputs: any) => `你是一位精通辦公室人際學的公關。遇到「[[${inputs.initiator || '某人'}]]」強迫推銷「[[${inputs.item || '某東西'}]]」。
策略為：【[[${inputs.strategy || '體質過敏無奈法'}]]】。

請幫我產出兩段內容：
1. 擬定一段私訊回覆的 LINE 婉拒訊息，給足老鳥面子。
2. 在 Threads（脆）發起一個「#辦公室荒謬團購大賞」的串文，邀請網友蓋樓。

負向約束：LINE 訊息絕對不可以批評該商品；Threads 發文以黑色幽默為主。`
  },
  {
    id: "intern_promotion", tab: "職場求生", isPro: true, outputFormat: "面談開場白",
    icon: <TrendingUp className="w-8 h-8 text-indigo-400" />,
    color: "indigo",
    title: "命運躍遷：無痛轉正爭取陣",
    desc: "剛幫公司救了一場大火？趁主管最有感時執行稟賦效應重構，爭取最優職位。",
    tags: ["實習", "轉正", "談判", "加薪"],
    fields: [
      { id: "achievement", tab: "職場求生", isPro: false, outputFormat: "戰功清單紀錄", label: "你的神救援戰功", placeholder: "例：獨自辦完 300 人的大型活動" },
      { id: "goal", tab: "職場求生", isPro: false, outputFormat: "期望目標描述", label: "你想爭取什麼？", placeholder: "例：轉正並起薪 4 萬" }
    ],
    tweak: { id: "strategy", tab: "職場求生", isPro: false, outputFormat: "求職談判策略", label: "談判籌碼", options: ["外部競爭者暗示法", "忠誠度與即戰力展現法"] },
    theory: "執行「稟賦效應重構」。讓主管意識到「失去這個熟悉業務的現成人才」成本極高，藉此奪回談判籌碼。",
    generate: (inputs: any) => `你是一位資深人資總監. 我達成了「[[${inputs.achievement || '某項大功勞'}]]」，現在想跟老闆爭取「[[${inputs.goal || '更好的待遇'}]]」。
策略為：【[[${inputs.strategy || '忠誠度與即戰力展現法'}]]】。

請幫我產出兩段內容：
1. 擬定一段傳給老闆 LINE 約面談的開場白，語氣要充滿對未來的企圖心。
2. 在 Threads（脆）發布一篇乾貨文，分享「菜鳥必學的 3 個向上管理 Tips」。

負向約束：LINE 訊息嚴禁出現威脅語氣；Threads 貼文不能寫得死板，需結合個人血淚史。`
  },
  {
    id: "scope_creep", tab: "職場求生", isPro: true, outputFormat: "專業拒絕回覆",
    icon: <Ban className="w-8 h-8 text-rose-500" />,
    color: "rose",
    title: "契約反彈：奧客需求退回咒",
    desc: "客戶半夜要改主視覺？用合約神聖性阻斷範圍蔓延，把無理要求轉為報價單。",
    tags: ["奧客", "接案", "合約", "PM"],
    fields: [
      { id: "ridiculous_request", tab: "職場求生", isPro: false, outputFormat: "無理需求紀錄", label: "客戶凹什麼？", placeholder: "例：半夜 11 點要求把主視覺改成賽博龐克" },
      { id: "original_scope", tab: "職場求生", isPro: false, outputFormat: "原始合約規範", label: "合約原本怎麼寫？", placeholder: "例：只包兩次微調，且風格已確認" }
    ],
    tweak: { id: "strategy", tab: "職場求生", isPro: false, outputFormat: "專業阻斷流派", label: "對對流派", options: ["專業法務警告法", "溫和哭窮要錢法"] },
    theory: "架構「範圍蔓延阻斷」與「合約神聖性」。不直接拒絕，而是讓客戶面對「追加需求等於追加預算」的現實障礙。",
    generate: (inputs: any) => `你是一位身經百戰的接案/PM 大神。客戶提出了「[[${inputs.ridiculous_request || '無理要求'}]]」，但這早已超出「[[${inputs.original_scope || '合約範圍'}]]」。
策略為：【[[${inputs.strategy || '專業法務警告法'}]]】。

請幫我產出兩段內容：
1. 擬定一段 LINE 官方回覆，必須明確列出如果執行該需求，需要增加的具體報價與時程。
2. 發布一篇 Threads（脆）貼文，發起「一人一句激怒設計師/PM 的幹話」接龍。

負向約束：LINE 回應禁止使用陳腔濫調的「我們沒辦法配合」；Threads 嚴禁點名特定廠商。`
  },
  {
    id: "refuse_revenue_share_trap",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "專業談判稿",
    icon: <CircleDollarSign className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "想空手套白狼？分潤餅乾退散陣",
    desc: "「現在沒預算，賺錢再分你」？教你如何優雅地拆穿這塊畫不出來的大餅，把白工變定金，拒絕當創業工具人。",
    tags: ["接案", "分潤", "談判", "避坑"],
    fields: [
      { id: "project_type", label: "項目類型", placeholder: "例如：App 開發、品牌設計、SEO 優化...", outputFormat: "項目細節描述" },
      { id: "proposer_role", label: "提議者身份", placeholder: "例如：老同學、創業圈友人、前同事...", outputFormat: "人物關係定義" },
      { id: "output_style", label: "輸出風格", placeholder: "委婉拒絕 / 專業談判 / 鋼鐵直言", outputFormat: "語氣情緒調整" }
    ],
    tweak: { 
      id: "strategy", 
      label: "對應流派", 
      options: [
        "專業化降維：強調時間與設備硬成本", 
        "風險共擔對沖：要求保底費+分潤", 
        "標準流程化：搬出工作室財務審核機制",
        "資源交換反制：要求等值實體資源交換"
      ] 
    },
    theory: "基於「損失規避 (Loss Aversion)」原理。當對方不支付現金時，他們對專業投入通常缺乏尊重。透過引入「保底預付」概念，將風險轉移回提案者，藉此篩選出真正的合作者。",
    generate: (inputs: any) => `你現在是一位擁有 10 年經驗的商務談判專家。請針對 [[${inputs.proposer_role}]] 提出的 [[${inputs.project_type}]] 分潤合作案，撰寫一份風格為 [[${inputs.output_style}]] 的回覆。

要求：
1. 肯定項目的潛力，但明確指出專業產出的「硬性開發成本」。
2. 採取【[[${inputs.strategy}]]】策略，提出「預付保底 + 後期分潤」的階梯式方案。
3. 強調沒有財務承諾的合作會導致項目優先級過低。

負向約束：嚴禁出現「不好意思」、「抱歉」等軟弱詞彙；禁止接受 0 預付款模式；不需過度解釋個人財務，專注於商務規則。`
  },
  {
    id: "ai_scam_course_refund",
    tab: "創業/斜槓",
    isPro: true,
    outputFormat: "維權申訴信",
    icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "韭菜之怒：AI 大師課退費結界",
    desc: "花了三萬買「咒語」卻發現是垃圾？啟動消費維權陣，用法律與輿論讓割韭菜的主辦方乖乖把錢吐出來。",
    tags: ["割韭菜", "退費", "AI課程", "維權"],
    fields: [
      { id: "course_name", label: "課程名稱", placeholder: "例如：21天AI變現大師營", outputFormat: "受害標的名稱" },
      { id: "scam_points", label: "痛點/不實之處", placeholder: "例如：內容全是官方文件、教學過時、群組禁言...", outputFormat: "證據事實羅列" },
      { id: "channel", label: "溝通管道", placeholder: "私信客服 / 存證信函草稿 / 社群爆料文", outputFormat: "媒體渠道設定" }
    ],
    tweak: { 
      id: "pressure_mode", 
      label: "施壓等級", 
      options: [
        "法條施壓：引用消保法廣告不實條款", 
        "證據羅列：比對大綱與實際內容落差", 
        "輿論威脅：暗示具備社群傳播影響力",
        "最後通牒：設定24小時退費期限"
      ] 
    },
    theory: "利用「權力平衡 (Power Balancing)」策略。割韭菜者通常欺負學員怕麻煩。透過展現「高維證據收集」與「通路封殺」能力，讓對方意識到維持該客戶的負面成本高於退費成本。",
    generate: (inputs: any) => `你是一位專精於消費糾紛的維權律師助理。請針對 [[${inputs.course_name}]] 的 [[${inputs.scam_points}]] 問題，產出一份 [[${inputs.channel}]]。

要求：
1. 採取【[[${inputs.pressure_mode}]]】等級，條列式陳述內容與銷售頁面承諾的嚴重偏離。
2. 指出其行為可能違反定型化契約的法律風險。
3. 明確要求在指定時間內完成原路退費。

負向約束：禁止情緒化謾罵，保持冷靜且強硬的法律語調；不接受「換課」或「延長權限」等緩兵之計；嚴禁討拍，只談契約義務。`
  },
  {
    id: "micro_entrepreneur_family",
    tab: "創業/斜槓",
    isPro: false,
    outputFormat: "深度對談大綱",
    icon: <Users className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "夢想守護者：長輩不務正業屏蔽術",
    desc: "被長輩嗆「玩手機不找正經工作」？把斜槓包裝成「家庭抗風險投資」，用安全感塞住他們的嘴，換取安靜的創業空間。",
    tags: ["家人", "創業支持", "溝通", "理解"],
    fields: [
      { id: "family_member", label: "溝通對象", placeholder: "例如：保守的父母、焦慮的配偶...", outputFormat: "對象角色定義" },
      { id: "business_model", label: "創業內容", placeholder: "例如：自媒體運營、團購電商...", outputFormat: "事業模式簡述" },
      { id: "main_concern", label: "對方的核心擔憂", placeholder: "例如：收入不穩、沒勞健保、不顧小孩...", outputFormat: "阻力因素分析" }
    ],
    tweak: { 
      id: "approach", 
      label: "溝通策略", 
      options: [
        "財務可視化：展示止損線與收支預測", 
        "階梯式過渡：強調副業試驗而非辭職", 
        "外部背書：引用權威數據證明行業趨勢",
        "家庭貢獻論：描述成功後如何改善家境"
      ] 
    },
    theory: "基於「溝通框架理論」。家人的反對源於「對失去控制的恐懼」。咒語核心是將「創業」重新框架為「為了家庭更好的投資」，並提供具體的「安全護欄」。",
    generate: (inputs: any) => `你是一位擅長跨世代溝通的心理諮商師. 請針對 [[${inputs.family_member}]] 對 [[${inputs.business_model}]] 的反對，特別是針對 [[${inputs.main_concern}]]，設計一套 [[${inputs.outputFormat || '對談大綱'}]]。

要求：
1. 採用【[[${inputs.approach}]]】策略。
2. 同理心起手，承認對方的擔心是出於愛。
3. 展現成熟度，主動揭露最壞打算與止損機制。
4. 設定一個具體的「觀察期」，請求期間的心理停戰。

負向約束：嚴禁使用「你們不懂」、「這就是趨勢」等對抗性語言；禁止畫大餅，必須有數據或行動支撐；避免單純解釋夢想。`
  },
  {
    id: "sea_patrol_defense",
    tab: "人際擋箭",
    isPro: true,
    outputFormat: "Threads 爆紅貼文 / 防禦話術",
    icon: <Navigation className="w-8 h-8 text-cyan-400" />,
    color: "cyan",
    title: "海巡生還者：名人回覆後的防火牆",
    desc: "被名人「海巡」後卻引來側翼出征、長輩碎嘴？啟動這套防禦陣，讓酸民顯得沒幽默感，讓長輩覺得你是在研究「數位社群演算法」。",
    tags: ["Threads", "海巡", "出包", "公關"],
    fields: [
      { id: "celebrity", label: "哪位名人回了你？", placeholder: "例：總統、某百萬網紅、某大立委", outputFormat: "人物身份標籤" },
      { id: "trouble", label: "目前遇到了什麼麻煩？", placeholder: "例：被對方支持者出征、主管問我為何在那亂發文", outputFormat: "危機事實描述" }
    ],
    tweak: { 
      id: "strategy", 
      label: "應對流派", 
      options: [
        "降維打擊：讓出征者顯得比本人還沒氣度", 
        "專業包裝：將玩梗重塑為『社群數據觀察』", 
        "幽默化解：用更高階的梗圖邏輯終止戰場",
        "反向流量：將攻擊轉化為溫馨共鳴串"
      ] 
    },
    theory: "利用「框架重構 (Reframing)」。透過改變行為的解釋維度，將政治/娛樂行為提升到專業或藝術層次，讓攻擊者的邏輯支點消失，實現精神上的降維打擊。",
    generate: (inputs: any) => `你是一位精通台灣 Threads 與 PTT 生態的頂級公關操盤手。
我因為被 [[${inputs.celebrity}]] 海巡回覆，現在遇到 [[${inputs.trouble}]]。
請採取【[[${inputs.strategy}]]】策略幫我產出回應。

要求：
1. 回應必須具備「台灣在地味」，使用鄉民聽得懂的語彙。
2. 讓對方的支持者或攻擊者看完後，顯得像是「開不起玩笑的局外人」。
3. 針對長輩或主管的關切，提供一段讓他們聽不懂但覺得你很專業的「演算法研究」解釋。

負向約束：嚴禁道歉或示弱；嚴禁使用死板的公關聲明稿；嚴禁與酸民對罵。`
  }
];
