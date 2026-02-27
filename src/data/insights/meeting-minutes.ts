export const insight = {
    id: 3,
    category: "工作效率",
    themeColor: "blue",
    difficulty_level: 2,
    tags: ["#會議記錄", "#逐字稿整理", "#高效辦公"],
    title: "會議記錄整理神器：如何用 AI 將錄音檔逐字稿 30 秒轉化為待辦清單？",
    summary: "30 頁逐字稿看到眼神死？只要 30 秒，讓 AI 幫你從雜訊中提取核心，精準抓出行動地圖。",
    date: "2024.05.10",
    readTime: "5 分鐘",
    pain_point: "開完長會還要回想誰說了什麼？老闆卻說下班前要發記錄？手中的逐字稿充滿了口頭禪與廢話？",
    scenario: "拿著 30 頁充滿「嗯、啊、那個」的廢話逐字稿。您需要找出最終決議，並確認誰要在何時完成什麼事。",
    solution: "丟給 AI，並要求它擔任『毒舌派秘書』，要求它整理成：1. 最終決議 2. 待辦清單 (誰負責) 3. 尚未達成共識的爭議點。",
    example: {
        wrong: "❌ 做法：自己一個個重聽錄音帶，打字到手酸，浪費 1 小時且容易漏掉關鍵。",
        right: "✅ 做法：指令『請閱讀這段文字，過濾所有廢話。只給我一張表格，列出決議事項與對應負責人。』"
    },
    insight_quote: "在喧嘩的會議中，AI 是那位安靜的智者，為你從碎片中打撈智慧的珍珠。",
    practice_kit: {
        title: "高效助理：會議整理指令",
        description: "把繁瑣逐字稿丟進來，一鍵生成行動建議：",
        command: `請扮演一位專業專案助理。以下是一段會議逐字稿。
請幫我執行：
1. 最終決議事項：我們到底決定了什麼？
2. 待辦清單 (Action Items)：誰負責、何時要完成。
3. 下次會議待議點：還有哪些沒解決。
要求：過濾掉寒暄與口頭禪，只保留乾貨。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">你的生命，不該浪費在整理廢話上。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        會議室裡的空調聲，通常比發言者的內容更有意義。把「行政地獄」外包給你的 AI 實習生，省下來的時間拿來做真正的決策。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">會議優化三步驟</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-blue-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">獲取文字來源</p>
                    <p class="text-sm text-zinc-400">使用內建或第三方語音轉文字工具取得初步文本。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-blue-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">AI 提純指令</p>
                    <p class="text-sm text-zinc-400">使用實戰包中的結構化指令，讓 AI 進行深度摘要。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-blue-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">發送確認信</p>
                    <p class="text-sm text-zinc-400">將產出的行動地圖直接發送給團隊成員，確保責任到人。</p>
                </div>
            </div>
        </div>
    </div>
    `
};
