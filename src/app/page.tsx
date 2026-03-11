"use client";
import { useState } from "react";
import { 
  Sparkles, Flame, Droplets, Wind, Copy, ExternalLink, ChevronDown, X, Search, Check,
  ShieldAlert, Hand, Mail, TrendingUp, Gavel, ShoppingBag, Map, LogOut, Lightbulb, Smile,
  AlertTriangle, Ban, BarChart, Home, Hammer, Navigation, FileText, Zap,
  Ghost, GraduationCap, Coins, Handshake, Trash2, HeartOff, PenTool, Send, Calendar, Megaphone, 
  Beer, ShieldCheck, UserPlus, Wallet, HelpCircle, ClipboardList, Clock, Receipt, Heart, Music,
  Dumbbell, Star, CircleDollarSign, VolumeX, Headset, ShieldX, Swords, Gift, Users,
  Brain, Bot, MessageSquare
} from "lucide-react";

// 1. 資料解耦：未來新增咒語只需在這裡加一筆
const CURSES = [
  {
    id: "boss_line",
    icon: <Flame className="w-8 h-8 text-orange-500" />,
    color: "orange",
    title: "深夜老闆 LINE 突襲",
    desc: "下班後老闆傳 LINE 交辦事項，教你如何高情商推遲到明天。",
    fields: [
      { id: "boss_msg", label: "老闆傳了什麼？", placeholder: "例：明早開會的簡報你今晚趕一下給我" },
      { id: "true_thought", label: "你心裡真正的想法？", placeholder: "例：我已經躺平了，明天早上再弄" }
    ],
    tweak: { id: "tone", label: "奴性微調 (語氣)", options: ["卑微狗腿", "專業得體", "不卑不亢 (立界線)"] },
    theory: "使用「意圖包裝」與「選項轉移法」。AI 會先安撫老闆情緒，然後提出『明天一早處理效果更好』的替代方案，避免直接拒絕。",
    generate: (inputs: any) => `你是一位精通台灣職場生存學的高階秘書。
老闆剛剛在 LINE 傳了：「${inputs.boss_msg || '[請填寫老闆訊息]'}」
我心裡真正的想法是：「${inputs.true_thought || '[請填寫真實想法]'}」

請幫我把我的真實想法，包裝成可以立刻回覆老闆的 LINE 訊息。
要求：
1. 語氣必須是：【${inputs.tone || '專業得體'}】。
2. 要有「收到並重視」的態度，但巧妙地將實際行動推遲到明天上班時間。
3. 給我 3 個不同長短的版本讓我挑選。字數簡短，符合台灣 LINE 聊天習慣。`
  },
  {
    id: "crisis_pr",
    icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "災難降臨：出包公關防護罩",
    desc: "工作不小心搞砸了，教你如何寫出「承擔責任但不顯得無能」的道歉信，把危機變轉機。",
    fields: [
      { id: "mistake", label: "具體出了什麼包？", placeholder: "例：報價單多寫了一個零、把信寄錯人" },
      { id: "fix", label: "你目前做了什麼補救？", placeholder: "例：已經收回信件並重新發送正確版" }
    ],
    tweak: { id: "tone", label: "損失控制 (語氣)", options: ["誠惶誠恐", "專業冷靜並提出 Next Step"] },
    theory: "使用「焦點轉移法 (Redirection)」。AI 不會一味道歉，而是把篇幅的 70% 放在「解決方案」與「預防機制」，在心理學上能大幅降低主管的怒氣值。",
    generate: (inputs: any) => `你是一位年薪三百萬的頂級危機處理公關。
我今天在工作上出了這個包：「${inputs.mistake || '[請填寫錯誤內容]'}」。
我目前已經做的補救是：「${inputs.fix || '[請填寫補救措施]'}」。

請幫我擬定一封給主管的道歉/說明信。
要求語氣：【${inputs.tone || '專業冷靜並提出 Next Step'}】。
規則：開頭簡短致歉，中間條列式說明補救進度，結尾提出未來如何避免的具體防呆機制。不要用過度卑微的詞彙，要展現「雖然犯錯但我完全能掌控局面」的專業感。`
  },
  {
    id: "reject_people_pleaser",
    icon: <Hand className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "濫好人結界：優雅拒絕凹客/同事",
    desc: "同事又要把不屬於你的工作塞給你？用這招禮貌退回，讓他知難而退。",
    fields: [
      { id: "who", label: "誰在凹你？", placeholder: "例：隔壁部門的老鳥" },
      { id: "task", label: "他想凹你做什麼？", placeholder: "例：幫他做下週開會的 PPT" }
    ],
    tweak: { id: "strategy", label: "拒絕策略", options: ["裝忙太極拳", "搬出主管當擋隔", "軟性拖延"] },
    theory: "使用「第三方權威借力法」與「條件交換法」。讓 AI 教你如何不說「不」，而是說「好啊，但我得先請示主管」或「好啊，那你這部分資料先給我」。",
    generate: (inputs: any) => `你是一位精通職場厚黑學與人際談判的專家。
現在「${inputs.who || '[某人]'}」試圖把「${inputs.task || '[某工作]'}」塞給我，這根本不是我的工作。

請幫我擬定一段 LINE 拒絕訊息。
要求策略：【${inputs.strategy || '裝忙太極拳'}】。
規則：
1. 絕對不能出現「我不要」、「這不是我的事」等破壞關係的字眼。
2. 要讓他看完覺得「找你幫忙成本太高」而自動放棄。`
  },
  {
    id: "wedding_bomb",
    icon: <Mail className="w-8 h-8 text-pink-500" />,
    color: "pink",
    title: "新年賀卡/婚禮炸彈：紅色炸彈迴避閃現",
    desc: "收到不熟同學的喜帖，不想去也不想包紅包，教你不傷和氣的完美推辭。",
    fields: [
      { id: "who", label: "誰丟炸彈給你？", placeholder: "例：五年沒聯絡的大學同學" }
    ],
    tweak: { id: "reason", label: "迴避理由", options: ["當天家裡有事", "已經安排出國", "預算吃緊 (婉轉版)"] },
    theory: "運用「資訊不對稱」與「過度祝福」。AI 會幫你把「理由」寫得無懈可擊，並用極度熱情的祝福語氣來掩蓋你不想去的事實。",
    generate: (inputs: any) => `你是一位高情商的公關大師。
一位「${inputs.who || '[某人]'}」突然私訊我要寄喜帖給我，但我不想去也不想包紅包。

請幫我寫一段婉拒的 LINE 訊息。
婉拒理由：【${inputs.reason || '當天家裡有事'}】。
規則：
1. 開頭必須展現極度驚喜與熱情的祝福。
2. 理由要寫得具體且無法被反駁（例如機票已經買了）。
3. 結尾祝他們新婚愉快，字數 100 字以內，符合台灣人聊天習慣。`
  },
  {
    id: "kpi_inflation",
    icon: <TrendingUp className="w-8 h-8 text-yellow-500" />,
    color: "yellow",
    title: "虛空造物：年終績效膨脹術",
    desc: "明明做了一堆事，績效表卻寫得像流水帳？教你把苦勞包裝成「戰略級貢獻」。",
    fields: [
      { id: "task", label: "描述你今年做了什麼爛差事？", placeholder: "例：每天幫大家訂便當、整理沒人看的舊檔案" }
    ],
    tweak: { id: "dimension", label: "貢獻維度", options: ["提升團隊營運效率", "降低潛在風險與成本"] },
    theory: "使用「影響力框架 (Impact Framing)」。AI 會將微小的行政庶務，與公司的「降本增效」或「風險控制」等高級商業詞彙掛鉤。",
    generate: (inputs: any) => `你是一位 MBB (麥肯錫) 級別的企管顧問。
我今年的工作內容包含：「${inputs.task || '[打雜事項]'}」。這聽起來很像打雜，但我要寫在年終績效考核表上。

請幫我重新包裝這項經歷。
包裝方向：【${inputs.dimension || '提升團隊營運效率'}】。
規則：使用 STAR 原則 (情境、任務、行動、結果)，大量使用強勢動詞 (如：優化、重構、主導)，並嘗試為我捏造一個合理的「量化成效估算」(例如：節省了 20% 的溝通時間)。`
  },
  {
    id: "landlord_battle",
    icon: <Gavel className="w-8 h-8 text-slate-500" />,
    color: "slate",
    title: "惡房東退散：修繕談判防禦陣",
    desc: "租屋處冷氣壞了房東裝死？一封自帶法律威懾力但不撕破臉的交涉信。",
    fields: [
      { id: "issue", label: "哪裡壞了/什麼問題？", placeholder: "例：冷氣滴水一個月都不修" },
      { id: "impact", label: "造成你什麼困擾？", placeholder: "例：害我筆電進水、無法睡覺" }
    ],
    tweak: { id: "level", label: "威懾等級", options: ["理性催告", "引用租賃專法暗示", "最後通牒"] },
    theory: "採用「法理情遞進結構」。不是一開始就對罵，而是透過 AI 梳理客觀事實，暗示你具備法律常識（如民法修繕義務），讓對方不敢忽視。",
    generate: (inputs: any) => `你是一位深諳台灣《租賃住宅市場發展及管理條例》的專業律師。
我的租屋處遇到問題：「${inputs.issue || '[報修事項]'}」，這導致了「${inputs.impact || '[造成困擾]'}」。房東一直消極處理。

請幫我擬定一封傳給房東的 LINE 訊息。
威懾等級：【${inputs.level || '理性催告'}】。
規則：保持禮貌但態度堅定。如果是引用法規等級，請自然地帶入「依據合約與民法429條...」等字眼，讓房東知道我不是好惹的。`
  },
  {
    id: "shopee_copywriting",
    icon: <ShoppingBag className="w-8 h-8 text-orange-500" />,
    color: "orange",
    title: "斷捨離鍊金術：蝦皮高轉單文案",
    desc: "二手商品賣不掉？讓 AI 幫你寫出帶有「故事感」與「稀缺性」的爆款拍賣文案。",
    fields: [
      { id: "item", label: "你要賣什麼？", placeholder: "例：九成新的 iPhone 13 Pro 藍色" },
      { id: "reason", label: "為什麼要賣？", placeholder: "例：換了 iPhone 15，這台放在抽屜長灰塵" }
    ],
    tweak: { id: "pain_point", label: "買家痛點打擊", options: ["強調性價比", "強調女用極新", "強調急售可議"] },
    theory: "運用行銷學的「AIDA 法則 (注意、興趣、慾望、行動)」與「故事行銷」。AI 會把無聊的規格表，轉化為前任主人的愛惜故事，降低二手疑慮。",
    generate: (inputs: any) => `你是一位蝦皮千萬級拍賣賣家兼文案大師。
我要賣二手商品：「${inputs.item || '[商品名稱]'}」，出售原因是：「${inputs.reason || '[出售原因]'}」。

請幫我寫一篇吸睛的商品描述文案。
主攻痛點：【${inputs.pain_point || '強調性價比'}】。
規則：
1. 標題要自帶流量密碼（如：極新、秒發、附原廠盒）。
2. 內文要有「前主人的惜物人設」，增加信任感。
3. 列出規格與交易方式。
4. 加上適合的 Hashtag。`
  },
  {
    id: "travel_guide",
    icon: <Map className="w-8 h-8 text-green-500" />,
    color: "green",
    title: "導遊的救贖：防雷包行程煉成陣",
    desc: "負責排行程還要被嫌棄？生成一份看起來超專業、塞住所有人嘴巴的行程表。",
    fields: [
      { id: "location", label: "去哪裡玩？幾天？", placeholder: "例：宜蘭兩天一夜" },
      { id: "audience", label: "旅伴是誰？有什麼毛病？", placeholder: "例：三個女生朋友，愛拍照但不能走太久的路" }
    ],
    tweak: { id: "pace", label: "行程節奏", options: ["超Chill睡到自然醒", "瘋狂打卡踩點", "深度文化體驗"] },
    theory: "運用「Persona (角色扮演) 與 Constraints (限制條件)」。強制 AI 考慮特定族群的體力與偏好，並輸出為易讀的時間軸格式。",
    generate: (inputs: any) => `你是一位台灣在地高端私遊導遊。
我要去「${inputs.location || '[旅遊地點]'}」，旅伴的特徵是：「${inputs.audience || '[旅伴特徵]'}」。

請幫我規劃行程。
行程節奏要求：【${inputs.pace || '超Chill睡到自然醒'}】。
規則：
1. 必須考慮車程順路，不要東奔西跑。
2. 針對旅伴的特徵安排「亮點活動」。
3. 提供備案（如果下雨怎麼辦）。
4. 用 Markdown 時間軸格式輸出，可以直接貼到群組記事本的樣式。`
  },
  {
    id: "resignation_pr",
    icon: <LogOut className="w-8 h-8 text-indigo-500" />,
    color: "indigo",
    title: "展翅之風：不留話柄的華麗辭呈",
    desc: "想離職但怕被前老闆弄？教你寫出大氣、體面，又能安全脫身的離職信。",
    fields: [
      { id: "true_reason", label: "真正離職原因", placeholder: "例：主管太機車、常常加班沒錢" }
    ],
    tweak: { id: "wrapper", label: "表面包裝理由", options: ["個人職涯發展", "家庭健康因素", "想轉換產業"] },
    theory: "「語意重構 (Reframing)」。AI 會將你的怨氣與負面情緒，轉化為對未來的正向追求，確保你安全下莊，不燒毀橋樑 (Don't burn bridges)。",
    generate: (inputs: any) => `你是一位資深 HR 兼高階獵頭。
我要提離職了，真實原因其實是：「${inputs.true_reason || '[真實原因]'}」，但我絕對不能這麼寫。
我希望對外的官方說法是：【${inputs.wrapper || '個人職涯發展'}】。

請幫我擬定一封正式的離職 Email 給主管.
規則：
1. 感謝公司的栽培（具體捏造一個小事）。
2. 表達離開的遺憾。
3. 承諾會做好完美的交接。
4. 語氣大氣、真誠，不卑不亢。`
  },
  {
    id: "creative_idea",
    icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
    color: "amber",
    title: "靈感擴張領域：企劃起死回生術",
    desc: "腦袋卡殼想不出新企劃？讓 AI 從 5 個完全不相干的維度幫你暴力碰撞出新點子。",
    fields: [
      { id: "topic", label: "你卡關的主題是什麼？", placeholder: "例：如何推廣一款新的無糖茶飲" }
    ],
    tweak: { id: "dimension", label: "腦洞維度", options: ["跨界聯名思維", "逆向操作思維", "極致荒謬搞笑"] },
    theory: "採用「SCAMPER 奔馳法」或「強制關聯法」。打破常規思維，要求 AI 將毫無關聯的概念強行結合，這是激發人類 Aha Moment 最有效的方法。",
    generate: (inputs: any) => `你是一位榮獲坎城創意獎的頂級廣告創意總監。
我現在卡關的主題是：「${inputs.topic || '[企劃主題]'}」。

請跳脫傳統的無聊框架，幫我發想 5 個創意切入點。
要求風格：【${inputs.dimension || '跨界聯名思維'}】。
規則：
不要給我那種「找網紅業配」、「買FB廣告」的垃圾建議。請給我具體的、有衝突感的、能在社群上引發瘋傳的 Guerrilla Marketing (游擊行銷) 點子。每個點子附上一句吸睛的 Slogan。`
  },
  {
    id: "vent_purifier",
    icon: <Smile className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "情緒淨化池：抱怨轉化器",
    desc: "氣到想在 IG 飆髒話？讓 AI 幫你把負能量轉化為帶有哲理的高級酸文案。",
    fields: [
      { id: "event", label: "發生了什麼鳥事？", placeholder: "例：捷運上有大媽插隊還踩到我的新鞋" }
    ],
    tweak: { id: "style", label: "輸出風格", options: ["村上春樹式憂鬱", "脫口秀演員高級酸", "佛系禪意文案"] },
    theory: "「風格遷移 (Style Transfer)」。這不僅是發洩工具，更是展示 AI 強大文學模擬能力的最佳範例，具有極強的社群傳播屬性（好玩、易分享）。",
    generate: (inputs: any) => `你是一位精通文字藝術的暢銷作家。
今天發生了一件讓我很生氣的事：「${inputs.event || '[鳥事]'}」。我想發一篇 IG 限時動態抱怨，但我不想看起來像個沒水準的瘋子。

請幫我把這件事改寫。
風格要求：【${inputs.style || '脫口秀演員高級酸'}】。
規則：不要出現任何髒話。要用極度隱喻、嘲諷或看似平靜卻充滿張力的文字，讓看得懂的人會心一笑。字數 50 字內。`
  },
  {
    id: "dead_teammate",
    icon: <Ghost className="w-8 h-8 text-purple-400" />,
    color: "purple",
    title: "死靈退散：雷組員催繳陣",
    desc: "團體報告死線快到了，組員還在裝死？教你發出帶有壓迫感但不至於撕破臉的催繳訊息。",
    fields: [
      { id: "who", label: "哪個雷包？", placeholder: "例：外系大四學長" },
      { id: "task", label: "他欠什麼東西？", placeholder: "例：第二章的文獻回顧 500 字" }
    ],
    tweak: { id: "level", label: "施壓等級", options: ["溫和關心法", "教授查勤暗示法", "最後通牒切割法"] },
    theory: "運用「責任錨定效應 (Accountability Anchoring)」。不指責對方偷懶，而是強調「整體進度」與「外部壓力（如教授）」，迫使對方產生損失厭惡 (Loss Aversion)。",
    generate: (inputs: any) => `你是一位精通談判與專案管理的黑臉 PM。
我的大學團體報告遇到雷組員「${inputs.who || '[某人]'}」，他至今未交出「${inputs.task || '[某工作]'}」。

請幫我擬定一段傳到 LINE 群組的催繳訊息。
施壓等級：【${inputs.level || '溫和關心法'}】。
規則：
1. 語氣要看似客氣，但暗藏殺機。
2. 必須設定明確的 Deadline（如：今晚 12 點前）。
3. 暗示如果沒交，會有什麼具體後果（例如：只能先在名單上註記未參與）。`
  },
  {
    id: "professor_sos",
    icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
    color: "blue",
    title: "起死回生：教授求情術",
    desc: "期末考考砸了面臨被當危機？一封動之以情、說理清晰的求情信，爭取補救機會。",
    fields: [
      { id: "course", label: "什麼課？", placeholder: "例：微積分二" },
      { id: "reason", label: "為什麼考砸？", placeholder: "例：確診剛康復狀態不佳" }
    ],
    tweak: { id: "fix", label: "補救提案", options: ["額外寫一萬字報告", "申請補考", "承諾下學期當助教"] },
    theory: "採用「成長型思維展現 (Growth Mindset Display)」。教授討厭推卸責任的學生，AI 將引導你展現「對知識的渴望」而非「對分數的貪婪」，大幅提升教授的同理心。",
    generate: (inputs: any) => `你是一位深諳學術圈心理學的資深大學教授。
我修了你的「${inputs.course || '[課程名稱]'}」，但因為「${inputs.reason || '[原因]'}」面臨被當的危機。

請幫我寫一封 Email 給教授求情。
我願意提供的補救方案是：【${inputs.fix || '額外寫一萬字報告'}】。
規則：
1. 絕對不能有「求求你讓我過」的乞討語氣。
2. 開頭先感謝教授一學期的教導。
3. 誠懇承認自己的不足，並強調對這門學科的重視。
4. 提出補救方案時要展現極大的誠意。`
  },
  {
    id: "money_pitch",
    icon: <Coins className="w-8 h-8 text-yellow-400" />,
    color: "yellow",
    title: "金庫密碼：無痛爆金幣",
    desc: "月底吃土了想跟爸媽預支生活費？把「要錢」包裝成「自我投資」，讓長輩心願掏錢。",
    fields: [
      { id: "amount", label: "缺多少錢？", placeholder: "例：5000元" },
      { id: "excuse", label: "錢花去哪了？", placeholder: "例：買了多益參考書跟報名費" }
    ],
    tweak: { id: "strategy", label: "說服策略", options: ["投資未來型", "賣慘吃泡麵型", "記帳自省型"] },
    theory: "運用「投資報酬率框架 (ROI Framing)」。將消費行為轉化為對未來的投資，降低長輩對「揮霍」的防備心，觸發他們的「望子成龍」心理。",
    generate: (inputs: any) => `你是一位頂級的募資 Pitch 專家。
我是個大學生，這個月透支了，需要跟爸媽要「${inputs.amount || '[金額]'}」。
透支原因是：「${inputs.excuse || '[因素]'}」。

請幫我寫一段 LINE 訊息給爸媽。
說服策略：【${inputs.strategy || '投資未來型'}】。
規則：
1. 語氣要像個成熟、有規劃的大人，而不是伸手牌。
2. 巧妙地把透支原因包裝成「不可抗力」或「為了更好的未來」。
3. 結尾要加上關心爸媽身體健康的溫情攻勢。`
  },
  {
    id: "sponsor_hunt",
    icon: <Handshake className="w-8 h-8 text-emerald-400" />,
    color: "emerald",
    title: "空手套白狼：拉贊助神諭",
    desc: "辦活動缺錢要找附近店家拉贊助？寫出讓老闆覺得「不贊助會虧」的企劃信。",
    fields: [
      { id: "event", label: "什麼活動？", placeholder: "例：吉他社迎新演唱會，預計 200 人" },
      { id: "target", label: "贊助商是誰？", placeholder: "例：學校對面的新開手搖飲店" }
    ],
    tweak: { id: "perk", label: "回饋機制", options: ["社群強力曝光", "實體攤位導購", "聯名專屬優惠"] },
    theory: "「價值主張對齊 (Value Proposition Alignment)」。打破學生「求贊助」的弱勢姿態，轉為「B2B 商業合作」視角，強調能為店家帶來多少實質的學生客源。",
    generate: (inputs: any) => `你是一位頂尖的 B2B 商業開發 (BD) 總監。
我是大學社團幹部，正在為「${inputs.event || '[活動]'}」尋找贊助。我想找「${inputs.target || '[店家]'}」合作。

請幫我擬定一封開發信/企劃摘要。
主打回饋機制：【${inputs.perk || '社群強力曝光'}】。
規則：
1. 標題要直接點出「能為店家帶來什麼好處」。
2. 內文使用數據化表達（如：觸及率、轉換率）。
3. 語氣專業自信，把這當作是一場雙贏的行銷合作。`
  },
  {
    id: "roommate_war",
    icon: <Trash2 className="w-8 h-8 text-neutral-400" />,
    color: "neutral",
    title: "生化危機：室友衛生談判",
    desc: "室友不倒垃圾、半夜打遊戲太吵？用不帶情緒的溝通法，解決宿舍糾紛。",
    fields: [
      { id: "issue", label: "室友的惡行？", placeholder: "例：衣服泡在水桶三天發臭" },
      { id: "goal", label: "你希望他怎麼做？", placeholder: "例：當天洗完衣服" }
    ],
    tweak: { id: "tone", label: "溝通姿態", options: ["幽默化解尷尬", "理性制定公約", "裝可憐神經衰弱"] },
    theory: "採用「非暴力溝通 (Nonviolent Communication, NVC)」。區分「觀察」與「評論」，表達感受與需要，避免激起對方的防衛機制。",
    generate: (inputs: any) => `你是一位專業的心理諮商師與調解員。
我的大學室友有這個問題：「${inputs.issue || '[問題]'}」，我希望他能：「${inputs.goal || '[期望]'}」。

請幫我擬定一段傳給他的 LINE 訊息或便利貼內容。
溝通姿態：【${inputs.tone || '理性制定公約'}】。
規則：
1. 嚴格遵守非暴力溝通原則：只陳述客觀事實，不作人身攻擊。
2. 表達這件事對我造成的具體困擾。
3. 提出明確且容易執行的請求。`
  },
  {
    id: "relationship_exit",
    icon: <HeartOff className="w-8 h-8 text-pink-500" />,
    color: "pink",
    title: "無痛切割：海王/海后退散",
    desc: "遇到暈船對象發現不對勁，或者想拒絕死纏爛打的追求者？體面下莊的拒絕藝術。",
    fields: [
      { id: "situation", label: "目前的狀態？", placeholder: "例：曖昧一個月發現對方是海王" }
    ],
    tweak: { id: "strength", label: "切割力道", options: ["發好人卡軟著陸", "專注自我發展", "冰冷且不留餘地"] },
    theory: "「邊界設定理論 (Boundary Setting)」。透過清晰、無歧義的語義結構，切斷對方的間歇性增強期待，同時保護自身安全。",
    generate: (inputs: any) => `你是一位高情商的兩性關係專家。
我目前遇到這個感情狀況：「${inputs.situation || '[狀況]'}」，我想要結束這段關係或拒絕對方。

請幫我擬定一段 LINE 訊息。
切割力道：【${inputs.strength || '發好人卡軟著陸'}】。
規則：
1. 訊息必須明確表達「拒絕」的意思，不能留有幻想空間。
2. 避免過度指責對方，多用「我訊息 (I-message)」。
3. 語氣堅定但保持基本禮貌。`
  },
  {
    id: "word_padding",
    icon: <PenTool className="w-8 h-8 text-sky-400" />,
    color: "sky",
    title: "字數煉金術：通識報告膨脹法",
    desc: "聽了一場超無聊的通識講座，要交 1000 字心得？教你把一句話擴寫成一篇學術巨作。",
    fields: [
      { id: "topic", label: "講座主題是什麼？", placeholder: "例：台灣傳統廟宇建築之美" },
      { id: "takeaway", label: "你唯一記得的一句話？", placeholder: "例：屋頂上的龍叫做交趾陶" }
    ],
    tweak: { id: "dimension", label: "擴寫維度", options: ["結合現代社會現象", "探討文化傳承危機", "哲學與自我反思"] },
    theory: "「語義擴張與多維度映射 (Semantic Expansion & Multi-dimensional Mapping)」。將單一資訊點進行暴力展開。",
    generate: (inputs: any) => `你是一位擅長寫文化評論與學術論文的專欄作家。
我剛聽完一場名為「${inputs.topic || '[主題]'}」的講座，但我只記得：「${inputs.takeaway || '[重點]'}」。現在我需要寫一份心得報告。

請幫我以此為核心，擴寫出大綱與段落內容。
擴寫維度：【${inputs.dimension || '結合現代社會現象'}】。
規則：
1. 使用大量學術與文青詞彙（如：解構、場域、異化、共鳴）。
2. 結構包含：破題引言、核心觀點展開、跨維度反思、結論。
3. 讓報告看起來像是有深度思考的。`
  },
  {
    id: "networking_pro",
    icon: <Send className="w-8 h-8 text-blue-500" />,
    color: "blue",
    title: "人脈捕手：校友冷開發",
    desc: "想找實習或請教業界學長姐，但完全不認識？一封讓對方無法拒絕的 Cold Email。",
    fields: [
      { id: "target_role", label: "對方是誰？", placeholder: "例：在 Google 當 PM 的大五屆學長" },
      { id: "ask", label: "你想求什麼？", placeholder: "例：想約 15 分鐘的線上咖啡請教面試準備" }
    ],
    tweak: { id: "strat", label: "吸引策略", options: ["極度崇拜請益型", "共同背景套近乎", "具體問題探討型"] },
    theory: "「自我效能滿足 (Ego Baiting)」。人們喜歡被視為專家。透過精準讚美與極低成本請求，最大化對方的回覆意願。",
    generate: (inputs: any) => `你是一位精通 LinkedIn 社交與人脈建立的獵頭。
我是一名大學生，想要聯繫「${inputs.target_role || '[目標對象]'}」，我的目的是：「${inputs.ask || '[請求內容]'}」。

請幫我寫一封 Cold Email 或 LinkedIn 邀請訊息。
吸引策略：【${inputs.strat || '共同背景套近乎'}】。
規則：
1. 標題要具備高開信率。
2. 開頭迅速建立連結。
3. 請求必須具體且不佔用太多時間。
4. 展現出我已經做過功課。`
  },
  {
    id: "leave_perfect",
    icon: <Calendar className="w-8 h-8 text-orange-400" />,
    color: "orange",
    title: "時空扭曲：完美請假術",
    desc: "早上起不來不想去上課/打工？生成一個合情合理、難以查證的請假理由。",
    fields: [
      { id: "event", label: "要請什麼假？", placeholder: "例：早八的體育課 / 晚上的補習班打工" }
    ],
    tweak: { id: "type", label: "請假流派", options: ["突發性生理不適", "不可抗力之交通意外", "嚴肅的家庭突發狀況"] },
    theory: "「資訊模糊化與合理性構建 (Information Obfuscation)」。提供細節建立真實感，但保留關鍵模糊性。",
    generate: (inputs: any) => `你是一位精通危機處理與藉口編造的專家。
我今天需要請假，目標是：「${inputs.event || '[目標]'}」。

請幫我擬定一段請假訊息。
請假流派：【${inputs.type || '突發性生理不適'}】。
規則：
1. 理由必須符合日常邏輯。
2. 語氣要帶有歉意以及急迫感。
3. 針對打工，要主動提出後續的補班或交接安排。`
  },
  {
    id: "dcard_master",
    icon: <Megaphone className="w-8 h-8 text-cyan-500" />,
    color: "cyan",
    title: "雙面刃：Dcard 帶風向文案",
    desc: "遇到不公不義的事情想上 Dcard 爆料？教你寫出引發共鳴、推上熱門的爆款文。",
    fields: [
      { id: "injustice", label: "發生了什麼不公的事？", placeholder: "例：學校學餐漲價又變難吃" }
    ],
    tweak: { id: "style", label: "煽動情緒", options: ["理性數據分析打臉", "委屈受害者視角", "黑色幽默極致嘲諷"] },
    theory: "「情緒傳染理論 (Emotional Contagion)」。社群演算法偏愛高喚醒情緒，AI 將重構敘事打擊共同痛點。",
    generate: (inputs: any) => `你是一位深諳台灣 Dcard 與 PTT 生態的資深社群操盤手。
我要爆料一件事：「${inputs.injustice || '[爆料內容]'}」。

請幫我寫一篇準備發在 Dcard 的文章。
情緒風格：【${inputs.style || '委屈受害者視角'}】。
規則：
1. 標題必須極度吸睛。
2. 內文排版要符合大學生閱讀習慣。
3. 結尾要拋出問題引導評論。`
  },
  {
    id: "drink_skip",
    icon: <Beer className="w-8 h-8 text-amber-600" />,
    color: "amber",
    title: "肝臟守護者：閃避下班聚餐",
    desc: "老闆突然揪下班去喝酒，但你想回家躺平？不傷和氣的完美脫身術。",
    fields: [
      { id: "who", label: "誰揪的？", placeholder: "例：愛喝酒的主管" },
      { id: "event", label: "什麼局？", placeholder: "例：臨時熱炒店聚餐" }
    ],
    tweak: { id: "excuse", label: "脫身藉口", options: ["健康養生牌", "孝親家庭牌", "進修上課牌"] },
    theory: "「社會摩擦力最小化 (Social Friction Reduction)」。使用社會普遍認可且具有道德高地的理由。",
    generate: (inputs: any) => `你是一位高情商的職場生存大師。
今天「${inputs.who || '[某人]'}」臨時揪了「${inputs.event || '[活動]'}」，但我不想去。

請幫我擬定一段口語化的拒絕說詞。
脫身藉口：【${inputs.excuse || '健康養生牌'}】。
規則：
1. 表達遺憾感。
2. 理由具體且不可逆。
3. 結尾祝大家玩得開心並客套下次。`
  },
  {
    id: "email_defense",
    icon: <ShieldCheck className="w-8 h-8 text-slate-400" />,
    color: "slate",
    title: "太極防禦：回覆酸言酸語 Email",
    desc: "收到跨部門同事推鍋或酸言酸語的 Email？教你用最專業的語氣狠狠打臉。",
    fields: [
      { id: "attack", label: "對方信裡怎麼酸你？", placeholder: "例：質疑我們進度太慢" },
      { id: "fact", label: "實際的客觀事實？", placeholder: "例：是他們規格書晚交了三天" }
    ],
    tweak: { id: "power", label: "反擊力道", options: ["溫和澄清事實", "條理分明微帶刺", "CC大老闆的終極核彈"] },
    theory: "「專業抽離與事實錨定」。剝離情緒詞彙，純粹使用事實與數據進行防禦，展現專業格局。",
    generate: (inputs: any) => `你是一位在外商公司身經百戰的法務兼公關。
我收到敵意 Email：「${inputs.attack || '[攻擊內容]'}」，但事實是：「${inputs.fact || '[事實]'}」。

請幫我擬定一封回信 (Reply All)。
反擊力道：【${inputs.power || '條理分明微帶刺'}】。
規則：
1. 不使用情緒性字眼。
2. 使用條列式或時間軸還原真相。
3. 展現大局感。`
  },
  {
    id: "self_intro",
    icon: <UserPlus className="w-8 h-8 text-indigo-400" />,
    color: "indigo",
    title: "破冰咒語：新人報到自我介紹",
    desc: "第一天上班要在全公司面前自介，怕太無聊又怕太高調？打造恰到好處的人設。",
    fields: [
      { id: "role", label: "你的職位？", placeholder: "例：數位行銷專員" },
      { id: "hobby", label: "你的特點？", placeholder: "例：假日喜歡去爬百岳" }
    ],
    tweak: { id: "style", label: "人設風格", options: ["專業可靠型", "幽默親和型", "充滿熱情的菜鳥型"] },
    theory: "「首因效應與記憶鉤子」。植入容易被記住的標籤，方便日後同事開啟話題。",
    generate: (inputs: any) => `你是一位專精個人品牌塑造的公關教練。
我明天報到，職位是「${inputs.role || '[職位]'}」，特點是「${inputs.hobby || '[特點]'}」。

請幫我寫一段自我介紹講稿。
人設風格：【${inputs.style || '專業可靠型'}】。
規則：
1. 包含基本問候、亮點。
2. 融入興趣作為記憶鉤子。
3. 表達期待與請教姿態。`
  },
  {
    id: "salary_raise",
    icon: <Wallet className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "薪資談判：試用期滿調薪陣",
    desc: "試用期過了，當初說好會調薪老闆卻裝傻？有理有據地爭取應得的薪水。",
    fields: [
      { id: "achievement", label: "你做出了什麼成績？", placeholder: "例：獨立完成了兩個專案" },
      { id: "target", label: "期望調薪多少？", placeholder: "例：加薪 3000 元" }
    ],
    tweak: { id: "angle", label: "談判切入點", options: ["強調產值與貢獻", "對標市場行情", "委婉探詢公司標準"] },
    theory: "「錨定效應與價值證明」。不談需要錢，而是談創造了多少價值，將談判框架轉移到人才投資。",
    generate: (inputs: any) => `你是一位資深 HR 總監。
我剛滿試用期，成績是：「${inputs.achievement || '[成績]'}」。希望調薪：「${inputs.target || '[金額]'}」。

請幫我擬定面談談判腳本。
談判切入點：【${inputs.angle || '強調產值與貢獻'}】。
規則：
1. 感謝栽培。
2. 量化貢獻 (STAR 原則)。
3. 語氣堅定不具威脅性。
4. 準備退讓方案。`
  },
  {
    id: "vague_clarify",
    icon: <HelpCircle className="w-8 h-8 text-slate-400" />,
    color: "slate",
    title: "通靈破解：釐清模糊指令",
    desc: "老闆丟下模糊指令「稍微弄一下要有質感」，教你如何反問出具體需求。",
    fields: [
      { id: "vague_task", label: "模糊指令是什麼？", placeholder: "例：幫我做競品分析，越快越好" }
    ],
    tweak: { id: "strat", label: "釐清策略", options: ["提供選擇題法", "確認邊界與資源法", "覆述並確認目標法"] },
    theory: "「主動聆聽與框架收斂」。將開放式問題轉化為選擇題，降低老闆認知負荷，保護自己不白工。",
    generate: (inputs: any) => `你是一位向上管理大師。
老闆給了糢糊指令：「${inputs.vague_task || '[指令]'}」。

請幫我擬定回覆訊息。
釐清策略：【${inputs.strat || '覆述並確認目標法'}】。
規則：
1. 不要直問具體做什麼。
2. 提供 2-3 個方向選。
3. 確認 Deadline 與格式。`
  },
  {
    id: "handover_magic",
    icon: <ClipboardList className="w-8 h-8 text-blue-400" />,
    color: "blue",
    title: "傳承之書：無痛交接清單",
    desc: "要離職了，交接文件不知道從何寫起？一鍵生成結構化的完美交接清單。",
    fields: [
      { id: "scope", label: "核心業務是什麼？", placeholder: "例：維護公司官網與發送 EDM" }
    ],
    tweak: { id: "level", label: "文件詳細度", options: ["大綱速成版", "鉅細靡遺保母版", "著重坑點與地雷版"] },
    theory: "「資訊架構學」。將隱性知識轉化為顯性知識，分類層級化確保接手者快速上手。",
    generate: (inputs: any) => `你是一位資深專案經理。
工作交接，核心業務：「${inputs.scope || '[業務]'}」。

請幫我生成交接目錄與模板。
詳細度：【${inputs.level || '鉅細靡遺保母版'}】。
規則：
1. 包含例行事項、專案進度、資源。
2. 包含「避坑指南」。
3. Markdown 格式。`
  },
  {
    id: "vendor_push",
    icon: <Clock className="w-8 h-8 text-red-400" />,
    color: "red",
    title: "死線衝刺：優雅催促供應商/同事",
    desc: "合作方動作太慢，眼看要開天窗了？催進度又不能得罪人的溝通藝術。",
    fields: [
      { id: "who", label: "催誰？", placeholder: "例：外包的設計師" },
      { id: "item", label: "催什麼？", placeholder: "例：明天要上線的海報" }
    ],
    tweak: { id: "tone", label: "催促語氣", options: ["溫柔提醒裝傻法", "搬出大老闆施壓法", "共同面對死線法"] },
    theory: "「急迫性框架與同盟建立」。將催促轉化為共同對抗外部壓力，降低對立感。",
    generate: (inputs: any) => `你是一位八面玲瓏的專案經理。
催促「${inputs.who || '[某人]'}」交出「${inputs.item || '[東西]'}」，時間緊迫。

請幫我擬定訊息。
催促語氣：【${inputs.tone || '共同面對死線法'}】。
規則：
1. 肯定辛苦。
2. 點出 Delay 連鎖反應。
3. 展現團隊精神。`
  },
  {
    id: "expense_claim",
    icon: <Receipt className="w-8 h-8 text-neutral-400" />,
    color: "neutral",
    title: "逆轉裁判：報帳退件申訴",
    desc: "代墊錢卻被財務部奇怪理由退件？用邏輯與規章把錢要回來。",
    fields: [
      { id: "expense", label: "報什麼被退？", placeholder: "例：客戶吃飯計程車費" },
      { id: "reason", label: "退件理由？", placeholder: "例：沒事先填出差單" }
    ],
    tweak: { id: "strat", label: "申訴策略", options: ["低姿態求通融", "引用特例與主管背書", "強調業務急迫性"] },
    theory: "「程序正義與例外管理」。理解財務防弊本質，提供合理例外解釋與授權台階。",
    generate: (inputs: any) => `你是一位資深特助。
報帳「${inputs.expense || '[報帳項]'}」被退理由「${inputs.reason || '[理由]'}」。

請幫我擬定申訴信。
申訴策略：【${inputs.strat || '引用特例與主管背書'}】。
規則：
1. 極度客氣。
2. 解釋不可抗力或急迫性。
3. 提出補救措施。`
  },
  {
    id: "mental_health",
    icon: <Heart className="w-8 h-8 text-rose-400" />,
    color: "rose",
    title: "心靈綠洲：合法請心理假/病假",
    desc: "壓力大到快崩潰只想請假？寫出讓主管無法拒絕且不被貼標籤的請假信。",
    fields: [
      { id: "status", label: "你真實的狀態？", placeholder: "例：加班兩週焦慮失眠" }
    ],
    tweak: { id: "wrapper", label: "請假包裝", options: ["突發急性腸胃炎", "偏頭痛發作", "誠實表達需要喘息"] },
    theory: "「合法權威與隱邊界 (Privacy Boundaries)」。利用生理症狀掩護心理壓力，或運用脆弱性獲取空間。",
    generate: (inputs: any) => `你是一位現代 HR 專家。
狀態「${inputs.status || '[狀態]'}」，需要請假。

請幫我擬定訊息。
請假包裝：【${inputs.wrapper || '偏頭痛發作'}】。
規則：
1. 簡潔有力。
2. 交代進度代理人。
3. 表達積極恢復態度。`
  },
  {
    id: "party_survival",
    icon: <Music className="w-8 h-8 text-pink-400" />,
    color: "pink",
    title: "尾牙求生：閃避/應付表演陣",
    desc: "菜鳥被逼著尾牙跳舞？教你如何優雅拒絕，或策範最省事但不失禮的表演。",
    fields: [
      { id: "situation", label: "公司要求什麼？", placeholder: "例：新人上台跳科目三" }
    ],
    tweak: { id: "strat", label: "應對策略", options: ["自嘲肢體障礙婉拒", "提議改視訊靜態", "策劃極簡敷衍表演"] },
    theory: "「期望值管理與替代方案」。提出成本更低但同樣具備娛樂效果的替代方案。",
    generate: (inputs: any) => `你是一位活動公關導。
公司要求「${inputs.situation || '[要求]'}」，我抗拒。

請幫我擬方案。
應對策略：【${inputs.strat || '自嘲肢體障礙婉拒'}】。
規則：
1. 婉拒則提無法反駁理由並承擔幕後。
2. 表演則提省時有效果的點子。`
  },
  {
    id: "gym_refund",
    icon: <Dumbbell className="w-8 h-8 text-orange-500" />,
    color: "orange",
    title: "斷捨離術：健身房退費咒",
    desc: "想退健身房會員卻被業務纏著不放？寫出一封讓業務知難而退、依法有據的退費信。",
    fields: [
      { id: "reason", label: "你想退出的理由", placeholder: "例：搬家到外縣市 / 工作受傷無法運動" }
    ],
    tweak: { id: "logic", label: "談判邏輯", options: ["法規條款壓制", "溫情家庭因素", "堅定不移復讀機"] },
    theory: "「損失厭惡與定錨效應」。利用消費者保護法作為定錨，讓業務意識到繼續糾纏可能會面臨法律成本或負面評價。",
    generate: (inputs: any) => `你是一位資深的消費者權益律師。
我的健身房合約想退掉，理由是：「${inputs.reason || '[理由]'}」。業務一直跟我打太極。

請幫我擬定一份傳給業務或健身房客服的訊息。
談判邏輯：【${inputs.logic || '法規條款壓制'}】。
規則：
1. 語氣堅定且不容質疑。
2. 提到「依據定型化契約應記載及不得記載事項」。
3. 清楚表達「我不是來討論的，我是來通知退費流程的」。`
  },
  {
    id: "service_critique",
    icon: <Star className="w-8 h-8 text-yellow-400" />,
    color: "yellow",
    title: "星級審查：高級酸評價術",
    desc: "吃到難吃的餐廳或遇到爛服務？教你寫出帶有幽默感與極高殺傷力的 Google 評論。",
    fields: [
      { id: "bad_exp", label: "最糟糕的部分", placeholder: "例：牛排硬得像輪胎 / 服務生翻白眼" }
    ],
    tweak: { id: "style", label: "嘲諷流派", options: ["極地冰冷自嘲", "美食評論家式毒舌", "荒謬故事敘事"] },
    theory: "「反差幽默感」。不直接噴髒話，而是用更高級的文字對比期待與現實，讓大眾在笑聲中避雷，並迫使店家認真對待回饋。",
    generate: (inputs: any) => `你是一位毒舌的美食評論家。
我剛剛在一家店遇到了極差的體驗：「${inputs.bad_exp || '[具體爛事]'}」。

請幫我寫一篇 Google 五星（或一星）評論。
嘲諷流派：【${inputs.style || '美食評論家式毒舌'}】。
規則：
1. 絕對不帶髒話，要優雅地罵人。
2. 運用生動的比喻（例如：這道菜讓我想起家鄉的馬路）。
3. 讓讀者覺得你很有才華，同時完全不想去這家店。`
  },
  {
    id: "debt_recovery",
    icon: <CircleDollarSign className="w-8 h-8 text-emerald-500" />,
    color: "emerald",
    title: "債務回收：催債不尷尬陣",
    desc: "朋友借錢不還，想討錢又怕壞了交情？用這招禮貌、精準且讓對方無法忽視地拿回錢。",
    fields: [
      { id: "who", label: "誰欠你錢？", placeholder: "例：大學室友阿強" },
      { id: "amount", label: "多少錢？", placeholder: "例：2000 元" }
    ],
    tweak: { id: "method", label: "催債技巧", options: ["借位裝窮法", "第三方系統提醒法", "自然回憶法"] },
    theory: "「認知失調與心理帳戶」。將對方從「被要求還錢」的負面感受，轉化為「幫助朋友脫離經濟困境」的正向行為。",
    generate: (inputs: any) => `你是一位精通心理戰的談判專家。
「${inputs.who || '[某人]'}」欠了我「${inputs.amount || '[金額]'}」很久都沒還。

請幫我擬一段 LINE 訊息。
催債技巧：【${inputs.method || '借位裝窮法'}】。
規則：
1. 絕不開門見山說「還我錢」。
2. 設定一個「我現在急需這筆錢」的場景（例如：信用卡要扣款了）。
3. 讓對方覺得還錢是在救你，而不是在被你嫌棄。`
  },
  {
    id: "neighbor_noise",
    icon: <VolumeX className="w-8 h-8 text-slate-400" />,
    color: "slate",
    title: "結界術：鄰居噪音制裁",
    desc: "鄰居半夜剁肉、小孩尖叫？一份既能保持未來鄰里關係，又能有效止噪的交涉信。",
    fields: [
      { id: "noise", label: "什麼噪音？", placeholder: "例：半夜三點還在拖家具" }
    ],
    tweak: { id: "approach", label: "交涉姿態", options: ["溫柔受害者", "理性事實陳述", "管理委員會警告暗示"] },
    theory: "「互惠原則 (Reciprocity)」。先展示對鄰居忙碌生活的理解，再提出噪音的具體影響，建立一個共同解決問題的框架，而非指責。",
    generate: (inputs: any) => `你是一位深諳社區協調之道的物業經理。
樓上或隔壁鄰居一直在：「${inputs.noise || '[噪音行為]'}」，讓我快抓狂了。

請幫我寫一張便利貼或 LINE 訊息。
交涉姿態：【${inputs.approach || '理性事實陳述'}】。
規則：
1. 開頭先稱讚鄰居（例如：一直覺得您是很客氣的人）。
2. 具體描述噪音的時間點與對我健康的影響（例如：偏頭痛發作）。
3. 提出一個微小的、可執行的建議。`
  },
  {
    id: "cs_war",
    icon: <Headset className="w-8 h-8 text-blue-400" />,
    color: "blue",
    title: "權利守衛：客服維權申訴",
    desc: "包裹弄丟、收到的東西壞了卻被客服已讀不回？寫出讓人工客服立刻通報主管的急件信。",
    fields: [
      { id: "issue", label: "發生什麼糾紛？", placeholder: "例：網購螢幕破裂卻說是我弄的" }
    ],
    tweak: { id: "level", label: "申訴強度", options: ["理性條列損失", "引用法律與消基會", "社交媒體擴散暗示"] },
    theory: "「權力不對稱反擊」。客服最怕流程外的麻煩，透過專業術語展現你是不好惹且有備而來的消費者，迫使他們快速結案。",
    generate: (inputs: any) => `你是一位專門處理商業糾紛的法律顧問。
我跟這家公司的糾紛是：「${inputs.issue || '[糾紛事項]'}」。

請幫我擬定一封給官方客服或申訴信箱的郵件。
申訴強度：【${inputs.level || '引用法律與消基會'}】。
規則：
1. 使用清晰的時間軸。
2. 結尾附上「若 24 小時內未獲回應，將採取法律途徑」等關鍵句。
3. 語氣冷靜得像一台法律機器。`
  },
  {
    id: "sales_shield",
    icon: <ShieldX className="w-8 h-8 text-red-500" />,
    color: "red",
    title: "格擋術：推銷/人情保險閃現",
    desc: "很久沒聯絡的朋友突然找你喝咖啡談保險？用這招快速拒絕，且不傷彼此面子。",
    fields: [
      { id: "who", label: "誰想推銷你？", placeholder: "例：國中同學突然密我" }
    ],
    tweak: { id: "reason", label: "拒絕理由", options: ["預算額度已滿", "家人在相關產業", "目前的職涯規劃不需要"] },
    theory: "「認知負荷最小化」。不要給推銷員任何「你的猶豫」作為抓手，用一個封閉式的、無法反駁的理由快速結束話題。",
    generate: (inputs: any) => `你是一位拒絕推銷的高手。
「${inputs.who || '[某人]'}」想跟我推銷東西（如：保險、直銷、投資）。

請幫我寫一段 LINE 訊息。
拒絕理由：【${inputs.reason || '預算額度已滿'}】。
規則：
1. 先大方問候，展現友誼。
2. 迅速切入重點拒絕，不給對方追問的空間。
3. 語氣溫暖但底線明確。`
  },
  {
    id: "internet_arg",
    icon: <Swords className="w-8 h-8 text-sky-400" />,
    color: "sky",
    title: "辯論終結：鍵盤俠回擊咒",
    desc: "在留言區被槓精纏上？用一句話展現高度，讓對方顯得像個沒長大的小孩。",
    fields: [
      { id: "comment", label: "對方說了什麼蠢話？", placeholder: "例：你這觀點完全是錯的，你不懂啦" }
    ],
    tweak: { id: "tactic", label: "回擊戰術", options: ["降維打擊", "幽默化解", "冷漠終止"] },
    theory: "「框架轉發 (Reframing)」。將爭論的焦點從特定的事實，轉移到「爭論行為本身」的無意義性，在精神層面上贏得勝利。",
    generate: (inputs: any) => `你是一位精通辯論與語言藝術的哲學巨匠。
網路上有個路人跟我爭論：「${inputs.comment || '[他的廢話]'}」。

請幫我寫一段簡短的、能瞬間終止爭論的回覆。
回擊戰術：【${inputs.tactic || '降維打擊'}】。
規則：
1. 不要跟他吵事實。
2. 要表現出「我理解你的侷限性，但我沒時間陪你玩」的優越感。
3. 回覆要短。`
  },
  {
    id: "dating_bio",
    icon: <Heart className="w-8 h-8 text-pink-400" />,
    color: "pink",
    title: "吸引力法則：脫單自我介紹",
    desc: "Dating App 文案沒人看？教你寫出帶有個性、幽默感，又不會顯得太卑微的爆款自介。",
    fields: [
      { id: "fact", label: "關於你的一件趣事", placeholder: "例：我可以一次吃掉 20 個水餃 / 是一個路癡" }
    ],
    tweak: { id: "vibe", label: "自介濾鏡", options: ["反差萌幽默", "極簡神秘感", "充滿能量的活力感"] },
    theory: "「信號傳遞與差異化 (Signaling & Differentiation)」。App 上都是帥哥美女，幽默與獨特的人設是最高效的信標，能快速過濾出志趣相投的人。",
    generate: (inputs: any) => `你是一位 Tinder/Bumble 的文案優化專家。
我的個人趣事是：「${inputs.fact || '[趣事]'}」。

請幫我寫兩段不同的自介。
自介濾鏡：【${inputs.vibe || '反差萌幽默'}】。
規則：
1. 拒絕流水帳，要用「展示而非敘述」。
2. 加入一個能讓對方好開啟話題的「鉤子」。
3. 字數控制在 100 字內，要有質感。`
  },
  {
    id: "favor_ask",
    icon: <Gift className="w-8 h-8 text-emerald-400" />,
    color: "emerald",
    title: "人情鍊金術：求人幫忙不欠情",
    desc: "想請朋友幫修圖、翻譯、載東西？讓對方心甘情願幫忙，且覺得自己很有榮譽感。",
    fields: [
      { id: "task", label: "你想求什麼？", placeholder: "例：幫我看這份合約有沒有陷阱" }
    ],
    tweak: { id: "strategy", label: "說服策略", options: ["認可專業型", "互惠承諾型", "求助弱者型"] },
    theory: "「富蘭克林效應 (Benjamin Franklin Effect)」。人們喜歡幫助他們曾經幫助過的人。透過認可對方的專業，讓幫忙變成一種自我實現。",
    generate: (inputs: any) => `你是一位高情商的說服力大師。
我需要請人幫忙：「${inputs.task || '[請求事項]'}」。

請幫我擬一段 LINE 訊息。
說服策略：【${inputs.strategy || '認可專業型'}】。
規則：
1. 大量讚美對方的某項特質。
2. 表達「這件事除了你我想不出第二個人能幫我」。
3. 埋下未來回報的伏筆。`
  },
  {
    id: "relative_shield",
    icon: <Users className="w-8 h-8 text-indigo-500" />,
    color: "indigo",
    title: "防禦陣：長輩職涯通神術",
    desc: "過年被問「現在在做什麼工作？薪水多少？」教你如何講得讓他們聽不懂但覺得你很厲害。",
    fields: [
      { id: "job", label: "你真實的職稱/工作", placeholder: "例：前端工程師 / 自由接案插畫家" }
    ],
    tweak: { id: "approach", label: "應對流派", options: ["高科技術語轟炸", "穩定發展公務員化", "低調發大財型"] },
    theory: "「認知覆蓋與資訊不對稱」。利用長輩對現代職業的資訊差，重新構建你的職業價值，從而終止不必要的比較與催婚。",
    generate: (inputs: any) => `你是一位專門對付親戚的脫口秀大師。
我的工作是：「${inputs.job || '[工作]'}」。

請幫我寫一段應對親戚問話的標準答案。
應對流派：【${inputs.approach || '高科技術語轟炸'}】。
規則：
1. 表面上一定要很有禮貌。
2. 使用大量高級但抽象的商業詞彙（例如：數位資產優化、跨國資源整合）。
3. 結尾迅速反向關心他們的健康（轉移法）。`
  }
];

export default function MagicAcademyMVP() {
  const [selectedCurse, setSelectedCurse] = useState<any>(null);
  const [inputs, setInputs] = useState<any>({});
  const [isCopied, setIsCopied] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 搜尋過濾邏輯
  const filteredCurses = CURSES.filter((curse) => 
    curse.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    curse.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 施法邏輯
  const handleCopy = () => {
    const spell = selectedCurse.generate(inputs);
    navigator.clipboard.writeText(spell).then(() => {
      setIsCopied(true);
      setShowPortal(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  // 深度連結處理：優先嘗試開啟 APP，失敗則導向網頁
  const handleDeepLink = (webUrl: string, appScheme: string) => {
    setShowPortal(false);
    const start = Date.now();
    
    // 試圖跳轉至 App Scheme
    window.location.href = appScheme;
    
    // 如果一段時間後仍留在原處，則開啟網頁版
    setTimeout(() => {
      if (document.hasFocus() || (Date.now() - start < 1500)) {
        window.open(webUrl, "_blank");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-slate-200 font-sans selection:bg-purple-500/30 p-6 flex flex-col items-center">
      {/* 英雄區 */}
      <header className="text-center max-w-3xl mt-12 mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          AI 魔法學院
        </h1>
        <p className="text-lg text-slate-400 mb-8">選擇你想解除的職場詛咒，一鍵生成防禦咒語。</p>

        {/* 搜尋框 */}
        {!selectedCurse && (
          <div className="relative max-w-md mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input 
              type="text"
              placeholder="搜尋魔法名稱或描述..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all backdrop-blur-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </header>

      {/* 狀態一：詛咒看板 (未選擇時顯示) */}
      {!selectedCurse && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {filteredCurses.length > 0 ? (
            filteredCurses.map((curse) => (
              <button
                key={curse.id}
                onClick={() => setSelectedCurse(curse)}
                className="group text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)] backdrop-blur-md"
              >
                <div className="mb-4">{curse.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{curse.title}</h3>
                <p className="text-sm text-slate-400">{curse.desc}</p>
              </button>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl">
              <p className="text-slate-500">找不到相關魔法，請嘗試其他關鍵字</p>
            </div>
          )}
        </div>
      )}

      {/* 狀態二：魔法工房 (已選擇時顯示) */}
      {selectedCurse && (
        <div className="w-full max-w-4xl bg-white/5 border border-purple-500/30 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button onClick={() => { setSelectedCurse(null); setInputs({}); setShowPortal(false); setIsDropdownOpen(false); }} className="absolute top-6 right-6 text-slate-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
            {selectedCurse.icon}
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedCurse.title}</h2>
              <p className="text-sm text-slate-400">{selectedCurse.desc}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 左側：鷹架輸入區 */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> 注入魔力 (Level 1)
              </h3>
              {selectedCurse.fields.map((f: any) => (
                <div key={f.id}>
                  <label className="block text-sm text-slate-400 mb-2">{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    className="w-full bg-black/50 border border-purple-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                    onChange={(e) => setInputs({ ...inputs, [f.id]: e.target.value })}
                  />
                </div>
              ))}
              
              {/* 微調區 - 自定義下拉選單 */}
              <div className="pt-4 border-t border-white/10">
                <label className="block text-sm text-purple-300 mb-2 font-bold">{selectedCurse.tweak.label} (Level 2)</label>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-black/50 border border-purple-500/30 rounded-xl p-3 text-white flex items-center justify-between hover:border-pink-500/50 transition-all focus:outline-none focus:ring-1 focus:ring-pink-500/50"
                  >
                    <span>{inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <>
                      {/* 點擊透明背景關閉選單 */}
                      <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                      
                      <div className="absolute top-full left-0 w-full mt-2 bg-[#1a1025] border border-purple-500/30 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                        {selectedCurse.tweak.options.map((opt: string) => (
                          <button
                            key={opt}
                            className={`w-full text-left p-3 text-sm transition-colors hover:bg-purple-500/20 flex items-center justify-between ${
                              (inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt ? 'text-purple-300 bg-purple-500/10' : 'text-slate-300'
                            }`}
                            onClick={() => {
                              setInputs({ ...inputs, [selectedCurse.tweak.id]: opt });
                              setIsDropdownOpen(false);
                            }}
                          >
                            {opt}
                            {(inputs[selectedCurse.tweak.id] || selectedCurse.tweak.options[0]) === opt && <Check className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 右側：咒語預覽與施放區 */}
            <div className="flex flex-col">
              <div className="flex-grow bg-black/50 rounded-xl p-5 border border-white/5 font-mono text-sm text-emerald-400 whitespace-pre-wrap overflow-y-auto min-h-[250px] shadow-inner">
                {selectedCurse.generate(inputs)}
              </div>
              
              <button 
                onClick={handleCopy}
                className={`mt-4 w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isCopied ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 shadow-[0_0_20px_rgba(219,39,119,0.3)]'}`}
              >
                {isCopied ? <><Check className="w-5 h-5"/> 魔力已封印於剪貼簿</> : <><Copy className="w-5 h-5"/> 揮舞魔杖 (複製咒語)</>}
              </button>
            </div>
          </div>

          {/* 原理揭密區 */}
          <div className="mt-8 pt-6 border-t border-white/10 text-sm text-slate-500">
            <p className="font-bold text-slate-400 mb-1">📖 大魔導師筆記 (Level 3 原理)</p>
            <p>{selectedCurse.theory}</p>
          </div>
        </div>
      )}

      {/* 狀態三：傳送門 Modal (點擊複製後出現) */}
      {showPortal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#100820] border border-purple-500/50 p-8 rounded-3xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(168,85,247,0.2)]">
            <div className="w-20 h-20 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <ExternalLink className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">異界通道已開啟</h3>
            <p className="text-slate-400 mb-6">帶著你的咒語，前往異位面釋放魔力吧。</p>
            
            <div className="space-y-4">
              <button 
                onClick={() => handleDeepLink("https://gemini.google.com/app", "google-gemini://")}
                className="group relative block w-full text-left"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-[#1a1025] hover:bg-[#251835] border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all w-full">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">穿越星門</h4>
                    <p className="text-xs text-slate-500">Gemini (優先開啟 App)</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => handleDeepLink("https://chatgpt.com", "chatgpt://")}
                className="group relative block w-full text-left"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-[#1a1025] hover:bg-[#251835] border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all w-full">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Bot className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">啟動萬象之扉</h4>
                    <p className="text-xs text-slate-500">ChatGPT (優先開啟 App)</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => handleDeepLink("https://claude.ai", "claude://")}
                className="group relative block w-full text-left"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-[#1a1025] hover:bg-[#251835] border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all w-full">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                    <Brain className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">進入靈知聖所</h4>
                    <p className="text-xs text-slate-500">Claude (優先開啟 App)</p>
                  </div>
                </div>
              </button>
            </div>
            
            <button onClick={() => setShowPortal(false)} className="mt-6 text-sm text-slate-500 hover:text-white">留在學院</button>
          </div>
        </div>
      )}
    </div>
  );
}
