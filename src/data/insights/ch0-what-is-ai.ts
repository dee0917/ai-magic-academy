export const insight = {
    id: 100,
    category: "出發準備",
    themeColor: "teal",
    difficulty_level: 1,
    level: 0,
    tags: ["#ChatGPT", "#Claude", "#Gemini"],
    title: "ChatGPT、Claude、Gemini 是什麼？3 分鐘搞懂三大聊天 AI",
    summary: "聽大家都在說 AI，但到底該用哪一個？這篇用最白話的方式，帶你認識目前最熱門的三個聊天 AI，找到最適合你的那一個。",
    date: "2026.01.01",
    readTime: "3 分鐘",
    pain_point: "身邊的人都在用 AI，但你連 ChatGPT 是什麼都搞不清楚？打開網頁一堆英文，不知道從哪裡開始？覺得 AI 是工程師才會用的東西？",
    scenario: "我一開始也搞不懂這三個有什麼差別。後來我把它們想成三間不同風格的餐廳：ChatGPT 是什麼都賣的大型自助餐、Claude 是很會聽話的私人廚師、Gemini 是 Google 自家的智慧管家。你不需要全部都會，挑一個開始就好。",
    solution: "把聊天 AI 想成「一個超聰明的打字助理」。你打字問它問題，它打字回答你。不需要寫程式、不需要懂技術，就像跟朋友傳訊息一樣簡單。三個都免費，打開網頁就能用。",
    example: {
        wrong: "「AI 太難了，我又不是工程師，這不是我能用的東西。」（其實跟用 LINE 一樣簡單）",
        right: "打開 ChatGPT → 打字「你好，請用一句話介紹你自己」→ 收到回覆。恭喜，你已經在用 AI 了！"
    },
    insight_quote: "AI 不是火箭科學，它就是一個很會打字的朋友。",
    steps: [
        {
            title: "ChatGPT — 全球最多人用的全能選手",
            body: "OpenAI 公司出品。想像它是一間什麼都賣的自助餐：寫文章、回答問題、翻譯、寫程式，幾乎什麼都會。目前最多人用，網路上的教學也最多。免費版就很夠用。",
            dee_tip: "打開方式：用手機或電腦瀏覽器進入 chat.openai.com → 用 Google 帳號註冊 → 就可以開始聊了！"
        },
        {
            title: "Claude — 最會聽話、最有耐心的助理",
            body: "Anthropic 公司出品。如果你打了一大段話給它，它能完整理解並照做。特別擅長讀長文、寫報告、做分析。個性比較「乖」，不太會亂編東西。",
            dee_tip: "打開方式：進入 claude.ai → 用 Google 帳號註冊 → 立刻就能用。我個人最推薦新手從 Claude 開始，因為它的回答最穩定。"
        },
        {
            title: "Gemini — Google 自家的智慧大腦",
            body: "Google 出品。因為是 Google 做的，它能搜尋到最新的網路資訊（ChatGPT 和 Claude 有時會資料過時）。如果你常用 Google 的服務，Gemini 會特別順手。",
            dee_tip: "打開方式：進入 gemini.google.com → 用你的 Google 帳號直接登入 → 就能開始了。如果你有 Android 手機，可能已經內建了。"
        }
    ],
    quiz: {
        question: "以下關於三大聊天 AI 的描述，哪一個是正確的？",
        options: [
            "只有工程師才能使用 ChatGPT",
            "三個 AI 都有免費版，用瀏覽器就能打開",
            "AI 需要下載專門的軟體才能使用",
            "每次使用 AI 都要付費"
        ],
        answer: 1,
        explanation: "三個聊天 AI 都有免費版！只需要打開瀏覽器，用 Google 帳號註冊就能開始使用。不需要任何專業知識。"
    },
    skill_badge: "🚀 AI 認知啟蒙",
    practice_kit: {
        title: "三大 AI 快速體驗",
        description: "現在就打開一個 AI，把這段話複製貼上去看看它怎麼回應：",
        command: `你好！我是第一次使用聊天 AI。

請用 3 句話告訴我：
1. 你是誰？
2. 你最擅長幫人做什麼？
3. 如果我只能問你一個問題，你建議我問什麼？`
    },
    content: ``
};
