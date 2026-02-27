export const insight = {
    id: 204,
    category: "入門心法",
    themeColor: "emerald",
    difficulty_level: 2,
    tags: ["#Anthropic官方", "#直球指令", "#提示詞優化"],
    title: "Anthropic 官方提示詞教學：為什麼不要對 AI 說「請」？3 個直球指令技巧",
    summary: "對 AI 太客氣反而會讓它分心。學會官方推薦的「中括號大法」與「直球對決」，讓指令更精準。減少計算噪訊的浪費。",
    date: "2024.06.27",
    readTime: "6 分鐘",
    pain_point: "你習慣在指令前面加上大量客套話，導致 AI 回傳一堆廢話，甚至漏掉重點？這不是禮貌，這是對計算資源的浪費。",
    scenario: "想像你正在趕機場坐計程車。如果你說『司機大哥您好，真的不好意思，如果您方便的話，能不能載我去機場？』司機會覺得你不趕時間。AI 亦同。",
    solution: "1. 直球對決：省下客套。 2. 中括號隔離 [ ]：包住資料。 3. 要求先思考：先列步驟。這就是 Anthropic 官方指南的精髓。",
    example: {
        wrong: "❌ 做法：你好，真的很感謝你之前的幫忙。現在可以請你幫我總結一下嗎？謝謝。",
        right: "✅ 做法：[投訴內容]：『貼上文字』。任務：請總結 3 個重點。要求：字數 200 內。"
    },
    insight_quote: "最強大的智慧往往隱藏在最簡潔的直球對決中，讓精準成為溝通的唯一語言。",
    practice_kit: {
        title: "官方密技：資料隔離指令",
        description: "強迫 AI 專注核心任務的指令包：",
        command: `這是一段資料：
[資料內容開始]
[貼入內容]
[資料內容結束]

任務：請從以上資料中提取 3 個核心重點。
要求：請先深思熟慮，在內心列出執行步驟，再給出最終答案。不需任何客套開場。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">與其客套，不如直接。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        社交禮儀對 AI 來說只是「噪訊」。最厲害的指令，應該像專業公文一樣乾淨、明確。這能強迫 AI 的注意力百分之百集中在你的任務上。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">官方精準三部曲</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">移除噪訊</p>
                    <p>刪除所有「你好、請、謝謝」，直接跳到動詞（總結、分析、改寫）。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">建立邊界</p>
                    <p>使用 [ ] 或 --- 標記資料區塊。這能幫 AI 區分「指令」與「被處理資料」。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">開啟思考</p>
                    <p>要求 AI 「先列出計畫」，這相當於給了它大腦運作的緩衝區。</p>
                </div>
            </div>
        </div>
    </div>`
};
