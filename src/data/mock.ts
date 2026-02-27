// 洞察文章 - Dee-Zapping 格式 + AEO 化 + 知識階梯系統
// 已移除新聞分類（移至獨立新聞頁面），並強化所有教學文章的「生活實戰包」指令
export const INSIGHTS = [
    // --- 神隊友育兒 (Yellow) ---
    {
        id: 301,
        category: "神隊友育兒",
        themeColor: "yellow",
        difficulty_level: 1,
        tags: ["#育兒", "#故事產生器"],
        title: "育兒神器：如何用 AI 編睡前故事？解決小孩 100 個為什麼的指令範例",
        summary: "當你被問到詞窮，讓 AI 幫你把枯燥的科普變成精彩故事。爸媽救星，搞定那 100 個為什麼。",
        date: "2024.07.01",
        readTime: "4 分鐘",
        pain_point: "下班累癱，小孩還纏著問「為什麼恐龍會滅絕？」你只想靜靜，但又不想敷衍孩子？",
        scenario: "想像你有一個 24 小時待命的故事大師，根據小孩喜好把知識變成睡前故事。",
        solution: "將問題丟給 AI，要求它以「適合 5 歲小孩理解的童話風格」改寫，並加入積極寓意。",
        example: {
            wrong: "❌ 做法：直接念維基百科給小孩聽，兩個人都聽得昏昏欲睡。",
            right: "✅ 做法：指令「請扮演恐龍專家，用 300 字編一個勇敢小暴龍探索環境變遷的故事」。"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">育兒的崩潰，往往來自那句「為什麼」。</p>
        <p class="text-lg text-zinc-300 mb-6 text-yellow-400 font-bold">AI，就是你最可靠的育兒神隊友。</p>
        <code>你是一位充滿童心的兒童文學作家。我的孩子今年 [填入年齡] 歲，他最近對 [填入主題，如：外星人] 很有興趣。請根據這個知識點編一個 5 分鐘的睡前故事，主角是一個叫 [小孩名字] 的小冒險家。故事語氣要溫柔，節奏緩慢，並在結尾帶出一個「勇敢」或「分享」的小啟發。</code>
        `
    },

    // --- 社交救星 (Rose) ---
    {
        id: 302,
        category: "社交救星",
        themeColor: "rose",
        difficulty_level: 1,
        tags: ["#社恐", "#拒絕信"],
        title: "不想參加聚餐怎麼拒絕？教你用 AI 寫出優雅拒絕信範本，保住人際關係",
        summary: "拒絕地獄不再是難事！學會讓 AI 當你的情緒緩衝墊，優雅地推掉邀約，保住私人時間。",
        date: "2024.07.02",
        readTime: "3 分鐘",
        pain_point: "面對推不掉的飯局，你總是在對話框打打刪刪 20 分鐘，最後還是硬著頭皮答應？",
        scenario: "你需要一個精通社交辭令的秘書。他能幫你把「我不想去」翻譯成「我非常想去但真的有不可抗力」。",
        solution: "告訴 AI 你的真實感受和對方的身份，要求它產出 3 個不同溫度的拒絕版本供你選擇。",
        example: {
            wrong: "❌ 做法：已讀不回，或說「我有事」結果被追問，尷尬到死。",
            right: "✅ 做法：指令「請用『既熱情又遺憾』的口吻拒絕這場聚會，理由要顯得無法反駁」。"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">社恐的痛苦，AI 最懂。</p>
        <p class="text-lg text-zinc-300 mb-6 text-rose-400 font-bold">讓 AI 當你的「社交防彈衣」。</p>
        <code>我收到一個來自 [人物關係，如：前同事] 的 [活動名稱] 邀請。但我當天其實 [真實原因，如：只想在家休息]。請幫我寫出三種風格的回覆：1. 充滿遺憾的熱情版、2. 簡短專業的客氣版、3. 帶點幽默的擋箭牌版。重點是要讓對方覺得被尊重，但完全沒辦法再強求我參加。</code>
        `
    },

    // --- 長輩數位教練 (Teal) ---
    {
        id: 303,
        category: "長輩數位教練",
        themeColor: "teal",
        difficulty_level: 1,
        tags: ["#孝親", "#長照補助"],
        title: "長輩領補助教學：教爸媽用 AI 查長照補助，比打 1966 還快的語音指令",
        summary: "別再幫爸媽查資料查到火大。教他們把語音輸入當成打電話，AI 就像住在手機裡的熱心鄰居。",
        date: "2024.07.03",
        readTime: "5 分鐘",
        pain_point: "長輩想申請長照或補助，網站字太小看不懂，電話轉接老半天，最後又要麻煩子女？",
        scenario: "想像爸媽對著手機說「我要請看護怎麼申請？」，AI 就能把萬字公文翻譯成 3 句白話文。",
        solution: "教長輩使用手機語音輸入。告訴 AI「請用簡單的國語告訴我這件事的步驟與要帶的東西」。",
        example: {
            wrong: "❌ 做法：丟一個 PDF 連結給爸媽看，他們看不懂也點不開。",
            right: "✅ 做法：教爸媽語音指令『你是數位助理，請告訴我 65 歲以上領假牙補助要準備什麼？』"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">孝順不難，難的是耐心。</p>
        <p class="text-lg text-zinc-300 mb-6 text-teal-400 font-bold">讓 AI 當爸媽的「萬事通鄰居」。</p>
        <code>你現在是一位非常有耐心的社區社工，專門服務銀髮族。我的父母想詢問關於 [填入補助名稱，如：長照 2.0 交通接送] 的申請。請用「超白話、字數精簡」的方式告訴我：1. 誰可以領？ 2. 去哪裡辦？ 3. 準備什麼證件？請分點列出，字體間距加大。</code>
        `
    },

    // --- 入門心法 (Emerald) ---
    {
        id: 201,
        category: "入門心法",
        themeColor: "emerald",
        difficulty_level: 1,
        tags: ["#實習生比喻", "#指令入門"],
        title: "ChatGPT 指令怎麼寫？把 AI 當實習生，3 步學會精準對話技巧",
        summary: "別再怪 AI 聽不懂人話了！它不是天才神諭，而是剛報到的實習生。只要 3 招，從笨蛋變神助攻。",
        date: "2024.06.20",
        readTime: "3 分鐘",
        pain_point: "你覺得 AI 笨笨的？那是因為你沒把它當人教！試過各種指令但總是不達標？",
        scenario: "想像你要實習生幫你寫報告，卻什麼背景都不講。他做出來的東西一定亂七八糟。",
        solution: "把 AI 當成實習生。耐心教導他：你是誰（身份）、要做什麼（任務）、給誰看（受眾）。",
        example: {
            wrong: "❌ 糟糕指令：幫我寫個報告 (讓 AI 瞎猜)。",
            right: "✅ 完整指令：你是一位行銷經理。我要寫競爭對手分析。重點在於定價差異。"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">這不是 AI 笨，是你把他當成了「神」。</p>
        <p class="text-lg text-zinc-300 mb-6 text-emerald-400 font-bold">把心態從『使用者』轉變成『管理者』，你就贏了一半。</p>
        <code>你是一位擁有 10 年經驗的 [填入專業身份，如：社群經理]。我現在需要你幫我執行 [任務名稱]。這份成果是為了要給 [目標受眾] 看的，請確保語氣符合 [風格要求，如：專業、幽默]。請先列出大綱，等我確認後再開始撰寫全文。</code>
        `
    },
    {
        id: 202,
        category: "入門心法",
        themeColor: "emerald",
        difficulty_level: 1,
        tags: ["#互動法", "#桌球對話"],
        title: "AI 回答不滿意怎麼辦？學會「打桌球互動法」，讓 60 分回答變 100 分",
        summary: "AI 不是投幣機，而是你的聊天隊象。學會「打桌球互動法」，讓 60 分的答案變成 100 分。",
        date: "2024.06.21",
        readTime: "3 分鐘",
        pain_point: "試了一次就覺得回答很爛，所以關掉視窗說「AI 沒用」？你期待丟一顆球就結束比賽？",
        scenario: "打桌球不是發一球就結束。你要接球、殺球，來回幾次才能出精彩結果。對話亦然。",
        solution: "把 AI 當成對話對象而非投幣機。透過追問、調整方向，你可以慢慢把答案修飾到 100 分。",
        example: {
            wrong: "❌ 做法：寫個文案 (AI 給了普通版後直接放棄)。",
            right: "✅ 做法：回覆後追加『語氣太正式了，改年輕一點』，再追加『第二段太長，縮短一半』。"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">第一次回答通常只有 60 分。</p>
        <p class="text-lg text-zinc-300 mb-6 text-emerald-400 font-bold">最精彩的內容，通常在第三、第四次對話才出現。</p>
        <code>這是我目前的想法：[貼上初步想法或 AI 的前次回答]。我覺得目前的版本 [填入缺點，如：太過死板/重點不明確]。請保留 [優點部分]，並針對 [需要改進的部分] 重新調整，請換一種更像 [特定對象，如：脫口秀演員] 的口氣再試一次。</code>
        `
    },
    {
        id: 203,
        category: "入門心法",
        themeColor: "emerald",
        difficulty_level: 1,
        tags: ["#背景設定", "#懶人包"],
        title: "AI 記性差老是失憶？教你建立專屬「背景設定懶人包」，讓 AI 永遠記得你",
        summary: "每次開新視窗 AI 都會「失憶」。教你建立專屬「懶人包」，讓 AI 永遠記得你的品牌與風格。",
        date: "2024.06.22",
        readTime: "3 分鐘",
        pain_point: "為什麼昨天聊得好好的，今天它就忘記你是誰？每次都要重新解釋，超級煩？",
        scenario: "AI 每次開新視窗就像重生，是一張白紙。就像新員工進來沒有交接，浪費時間又容易出錯。",
        solution: "建立「背景設定檔」，包含你的身份、品牌風格、目標受眾。每次工作前先貼給 AI 看。",
        example: {
            wrong: "❌ 做法：第一天教一次風格，第二天又不說，導致風格不一致。",
            right: "✅ 建立設定檔：存好一段話『我是小編，風格幽默、年輕。』每次開對話先貼上這段。"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">每開一個新視窗，AI 就重生一次。</p>
        <p class="text-lg text-zinc-300 mb-6 text-emerald-400 font-bold">這就是為什麼你需要「懶人包」。</p>
        <code>請記住以下背景資訊（前情提要）：
1. 品牌名稱：[填入名稱]
2. 核心受眾：[填入，如：30歲職場女性]
3. 禁忌字眼：[填入，如：不要用太浮誇的形容詞]
4. 成功範例：[貼上一段你滿意的舊文案]
接下來的所有回覆，請務必遵循以上設定。確認請回覆「了解，老闆」。</code>
        `
    },
    {
        id: 204,
        category: "入門心法",
        themeColor: "emerald",
        difficulty_level: 1,
        tags: ["#Anthropic官方", "#直球指令"],
        title: "Anthropic 官方提示詞教學：為什麼不要對 AI 說「請」？3 個直球指令技巧",
        summary: "對 AI 太客氣反而會分心。學會官方推薦的「中括號大法」與「直球對決」，讓指令更精準。",
        date: "2024.06.27",
        readTime: "4 分鐘",
        pain_point: "你習慣在指令前面加上大量客套話，導致 AI 回傳一堆廢話，甚至漏掉重點？",
        scenario: "趕機場坐計程車，司機不需要社交禮儀，他需要精準導航。AI 亦同。",
        solution: "1. 直球對決 2. 用「中括號」分類資料 [ ] 3. 要求「先思考，後執行」。",
        example: {
            wrong: "❌ 糟糕做法：你好，真的很感謝你之前的幫忙。現在可以請你...",
            right: "✅ 正確用法：[投訴內容]：『貼上文字』。請總結 3 個重點，用親切口吻回信。"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">不要再對 ChatGPT 說「請」了。</p>
        <p class="text-lg text-zinc-300 mb-6 text-emerald-400 font-bold">「與其客套，不如直接。」</p>
        <code>這是一段需要處理的 [資料類型，如：合約/文章]：
[資料內容開始]
[貼入內容]
[資料內容結束]

請針對以上內容執行以下任務，不需任何客套開場，直接給出答案：
1. 提取出 3 個關鍵風險。
2. 換成 10 歲小孩聽得懂的白話文解釋一遍。</code>
        `
    },

    // --- 生活應用 (Amber/Yellow) ---
    {
        id: 2,
        category: "生活應用",
        themeColor: "amber",
        difficulty_level: 1,
        tags: ["#剩菜料理", "#生活應用"],
        title: "今晚吃什麼？下班冰箱剩菜料理攻略：教你用 AI 拍照產出五星級食譜",
        summary: "工作累到腦袋當機？打開冰箱拍張照。讓 AI 幫你 15 分鐘煮出五星級剩菜料理。",
        date: "2024.05.15",
        readTime: "4 分鐘",
        pain_point: "下班大腦已死。打開冰箱發呆，最後還是點了不健康又貴的外送？",
        scenario: "冰箱還有半顆高麗菜、兩顆雞蛋。懶得想怎麼組合？這就是 AI 發揮價值的時候。",
        solution: "拍照或打字告訴 AI 食材，要求它以『零浪費私廚』身份提供 15 分鐘上菜方案。",
        example: {
            wrong: "❌ 做法：看著食材發呆，然後打開 Foodpanda。",
            right: "✅ 做法：傳照片給 AI，說『我要 15 分鐘內煮好，且洗碗次數最少』。"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">決策疲勞，是現代人的絕症。</p>
        <p class="text-lg text-zinc-300 mb-6 text-amber-400 font-bold">AI，就是你的「清冰箱救星」。</p>
        <code>我現在冰箱裡只有這些食材：[填入食材，如：高麗菜、蛋、培根、一碗冷飯]。請扮演一位「米其林創意主廚」，用這些東西幫我設計一道在 15 分鐘內能上桌、且只需要用到一個平底鍋的晚餐料理。請給出菜名與簡單的 3 個步驟。</code>
        `
    },
    {
        id: 304,
        category: "生活應用",
        themeColor: "yellow",
        difficulty_level: 1,
        tags: ["#副業", "#設計", "#Logo"],
        title: "免費商標設計：如何用 ChatGPT (DALL-E 3) 幫自己的副業或店面設計專業 Logo？",
        summary: "想開個網店卻沒預算請設計師？教你用白話文描述，讓 AI 幫你畫出具備質感的 Logo。",
        date: "2024.07.05",
        readTime: "6 分鐘",
        pain_point: "自己不會畫畫，請設計師 Logo 要好幾千，副業還沒賺錢就先虧錢？",
        scenario: "你只要說：『我開咖啡店，風格日系。』AI 就能給你四款設計稿。",
        solution: "利用 DALL-E 3 繪圖功能，給予結構化視覺指令：顏色、風格、物件。",
        example: {
            wrong: "❌ 做法：畫給我一個咖啡店 Logo (會太雜亂)。",
            right: "✅ 做法：指令『設計 Logo。極簡幾何。核心是咖啡豆。配色深棕。背景純白。』"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">設計的門檻，正在被 AI 夷為平地。</p>
        <p class="text-lg text-zinc-300 mb-6 text-yellow-400 font-bold">你不需要學會畫畫，你只需要學會「形容」。</p>
        <code>你是一位資深的品牌設計總監。我要為我的 [品牌名稱] 設計標誌。品牌的核心價值是 [填入，如：天然、手作]。請產出一張正方形的標誌圖像：風格要 [填入風格，如：極簡、扁平化]、主體物件為 [填入，如：一隻貓]、配色使用 [填入，如：莫蘭迪色系]。背景請保持全白，不要有任何多餘的文字。</code>
        `
    },
    {
        id: 305,
        category: "生活應用",
        themeColor: "amber",
        difficulty_level: 2,
        tags: ["#旅遊", "#懶人包", "#攻略"],
        title: "自助旅行規劃神器：如何用 AI 30 秒產出 5 天 4 夜精準行程表？小白自駕與地圖整合攻略",
        summary: "出國旅行查資料查到崩潰？教你把混亂的願望清單丟給 AI，自動生成包含路線、時間與預算的規劃。",
        date: "2024.07.07",
        readTime: "5 分鐘",
        pain_point: "想去日本玩，但想到要排交通、對時間、查營業時間就覺得心累？",
        scenario: "你列出想去的景點，AI 會根據位置幫你排序，確保不繞遠路，還會提醒行程是否太趕。",
        solution: "使用 AI 幫你做『路線優化』。告訴它預算、成員與必去景點。",
        example: {
            wrong: "❌ 做法：自己看 Google Map 算車程算半天。",
            right: "✅ 做法：指令『去大阪 5 天。帶小孩。必去環球。請規劃不趕路行程並用表格呈現。』"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">旅行，應該是享受，不是做功課。</p>
        <p class="text-lg text-zinc-300 mb-6 text-amber-400 font-bold">讓 AI 當你的「私人導遊」。</p>
        <code>規劃一份去 [目的地] 的 [天數] 旅遊行程。成員有 [填入，如：兩位長輩]。我希望每天不要換旅館，且行程要放慢。必去的點有 [景點A、景點B]。請幫我產出一份表格，包含：建議的出發時間、景點之間的交通方式、以及每餐的預算建議。</code>
        `
    },

    // --- 工作效率 (Blue) ---
    {
        id: 3,
        category: "工作效率",
        themeColor: "blue",
        difficulty_level: 2,
        tags: ["#會議記錄", "#逐字稿"],
        title: "會議記錄整理神器：如何用 AI 將錄音檔逐字稿 30 秒轉化為待辦清單？",
        summary: "30 頁逐字稿看到眼神死？只要 30 秒，讓 AI 幫你從雜訊中提取核心，精準抓出行動地圖。",
        date: "2024.05.10",
        readTime: "5 分鐘",
        pain_point: "開完長會還要回想誰說了什麼？老闆卻說下班前要發記錄？",
        scenario: "拿著 30 頁充滿廢話的逐字稿。丟給 AI 整理行動點。",
        solution: "要求 AI 整理成：1. 決議 2. 待辦 3. 爭議點。",
        example: {
            wrong: "❌ 做法：手動整理。浪費 1 小時且容易遺漏。",
            right: "✅ 做法：AI 整理。30 秒產出比老闆大腦還清晰的行動地圖。"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">你的生命，不該浪費在整理廢話上。</p>
        <p class="text-lg text-zinc-300 mb-6 text-blue-400 font-bold">把「行政地獄」外包給你的 AI 實習生。</p>
        <code>請閱讀以下這段會議逐字稿：
[貼入內容]

請扮演一位極致高效的專案助理，從中整理出：
1. 最終決議事項：我們到底決定了什麼？
2. 待辦清單 (Action Items)：誰負責、何時要完成。
3. 尚未解決的爭議點：下次會議要討論什麼。
請過濾掉所有客套廢話，只要「乾貨」。</code>
        `
    },

    // --- 投資攻略 (Violet) ---
    {
        id: 101,
        category: "投資人 AI 攻略",
        themeColor: "violet",
        difficulty_level: 3,
        tags: ["#財報摘要", "#投資輔助"],
        title: "股票投資 AI 攻略：如何用 ChatGPT 分析財報與摘要趨勢？散戶必學 3 招",
        summary: "別把 AI 當投顧老師問明牌！教你把它當成研究助理，3 分鐘內摘要財報、掃描風險，這才是高勝率打法。",
        date: "2024.06.01",
        readTime: "6 分鐘",
        pain_point: "問 AI『現在買什麼會漲？』它卻回你投資有風險的廢話？覺得對投資沒幫助？",
        scenario: "華爾街高手不靠預測靠數據。你要讓 AI 幫你做讀財報、分析趨勢等苦力工作。",
        solution: "將『問明牌』轉變為『問摘要』，讓 AI 過濾 90% 雜訊，你專注做最後判斷。",
        example: {
            wrong: "❌ 做法：這支股票會漲嗎？(AI 回：我無法提供建議)。",
            right: "✅ 做法：請摘要台積電過去三年財報，列出毛利率變化的趨勢。"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">AI 沒有水晶球，但它有一雙「不累的眼」。</p>
        <p class="text-lg text-zinc-300 mb-6 text-violet-400 font-bold">你需要的是「超級研究助理」。</p>
        <code>你是一位精通基本面分析的證券分析師。我將提供 [某公司] 的最新法說會報告。請幫我摘要出：1. 營收成長的主要動能、2. 管理層對下一季最擔心的 3 個風險、3. 法人提問中最尖銳的 2 個問題及其回覆。請將數據與去年的同期表現進行對比。</code>
        `
    },
    {
        id: 102,
        category: "投資人 AI 攻略",
        themeColor: "violet",
        difficulty_level: 3,
        tags: ["#地雷股", "#風險掃描"],
        title: "地雷股怎麼看？教你用 AI 擔任 24 小時審計員，3 分鐘內掃描財報風險",
        summary: "財報像天書？教你用 AI 擔任審計員。從毛利異常到現金流，3 分鐘抓出地雷警訊。",
        date: "2024.06.08",
        readTime: "8 分鐘",
        pain_point: "幾百頁財報等讀完早就反應完了。不讀又怕踩雷，散戶總是輸在資訊不對稱？",
        scenario: "財報 PDF 直接丟進 AI。像考官一樣抽查毛利異常、存貨周轉、現金流是否對稱。",
        solution: "要求 AI 扮演多疑的會計師，檢查存貨是否異常增加、營業現金流是否為負。",
        example: {
            wrong: "❌ 做法：肉眼閱讀 300 頁財報看到數字就頭暈。",
            right: "✅ 做法：指令『檢查應收帳款增加比例是否大於營收？』"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">財報不是用來讀的，是用來「審」的。</p>
        <p class="text-lg text-zinc-300 mb-6 text-violet-400 font-bold">AI，就是你的「 24 小時不領薪審計員」。</p>
        <code>你是一位不但專業且「生性多疑」的法務會計師。請掃描這份財報數據，找出是否有以下「地雷訊號」：1. 營收成長但營業現金流為負、2. 存貨周轉天數異常拉長、3. 應收帳款天數大幅領先同業。如果發現異常，請標註頁碼並給予警告。</code>
        `
    },

    // --- 進階實踐 ---
    {
        id: 306,
        category: "進階實踐",
        themeColor: "blue",
        difficulty_level: 3,
        tags: ["#自學", "#英語口說"],
        title: "免費 1 對 1 外語家教：如何開啟 ChatGPT 語音模式練英文口說？不用花錢的自學攻略",
        summary: "想練英文不敢找外師？教你設定 AI 角色，讓它成為你 24 小時在線的口說家教。",
        date: "2024.07.09",
        readTime: "8 分鐘",
        pain_point: "學了多年英文還是不敢開口？找真人外師太貴，且怕說錯會尷尬？",
        scenario: "要求 AI 扮演店員或面試官。它會耐心聽你說完，甚至在說錯時溫柔糾正你的文法。",
        solution: "開啟語音對話，並輸入『家教協議』指令，要求它在回覆後順便修正文法。",
        example: {
            wrong: "❌ 做法：直接聊天 (它只會像朋友回覆，不會主動教你)。",
            right: "✅ 做法：指令『你是專業英語教練。對話時如果有嚴重錯誤，請在括號內提醒我。』"
        },
        content: `
        <p class="text-2xl font-bold text-white mb-6">學語言最快的方式，就是「說」。</p>
        <p class="text-lg text-zinc-300 mb-6 text-blue-400 font-bold">AI 不會嘲笑你的發音，它只會陪你變強。</p>
        <code>你是一位非常有耐心且善於鼓勵學生的英語口說教練。我想跟你練習關於「在機場辦理登機」的情境對話。請先扮演櫃檯人員向我提問。規則：1. 回應保持簡短，引導我多說。 2. 如果我的句子有文法錯誤，請在回覆我的下一句話之後，用括號標註正確說法並解釋原因。</code>
        `
    }
];

// 解決方案
export const SOLUTIONS = [
    {
        id: 101,
        title: "AI 入門懶人包",
        type: "免費資源",
        desc: "從零開始學 AI，用最白話的方式帶你入門，保證看得懂。",
        detail: "一份 PDF 指南，包含 10 個最實用的 AI 使用場景。",
        action: "免費下載"
    }
];

// 學員回饋
export const TESTIMONIALS = [
    {
        name: "林小姐",
        role: "二寶媽・34歲",
        text: "以前小孩問為什麼下雨、恐龍為什麼滅絕，我都要查半天。現在直接用 Dee 教的故事指令，AI 編出的故事連大兒子都聽得一愣一愣的，真的救了我的下班時間！"
    },
    {
        name: "阿國",
        role: "傳統產業業務・45歲",
        text: "我這年紀最怕學新東西，但 Dee 的文章沒什麼術語，我看一遍就學會用手機語音叫 AI 幫我寫客戶回訪信。現在回信速度快了一倍，重點是聽起來還很得體。"
    },
    {
        name: "王奶奶",
        role: "退休教師・68歲",
        text: "本來以為 AI 是給年輕人玩的，沒想到我竟然可以用它查到長照補助的細節！Dee 教的方法真的很白話，甚至還會叫 AI 幫我翻譯醫學報告。"
    }
];
// Final Deploy Check: Fri Feb 27 09:03:51 AM UTC 2026
// Connected trigger: Fri Feb 27 11:21:52 AM UTC 2026
