export const insight = {
    id: 101,
    category: "投資人 AI 攻略",
    themeColor: "violet",
    difficulty_level: 3,
    tags: ["#投資助手", "#趨勢雷達", "#財報摘要"],
    title: "股票投資 AI 攻略：如何用 ChatGPT 分析財報與摘要趨勢？散戶必學 3 招",
    summary: "別把 AI 當投顧老師問明牌！教你把它當成研究助理，3 分鐘內摘要財報、掃描風險，這才是高勝率打法。解決資訊不對稱的焦慮。",
    date: "2024.06.01",
    readTime: "8 分鐘",
    pain_point: "看著別人用 AI 跑數據賺大錢，你問 AI「現在買什麼會漲？」它卻回你一堆廢話？覺得 AI 是高級聊天機器人，對投資毫無幫助？",
    scenario: "華爾街頂級分析師不靠預測賺錢，而是靠「海量閱讀」。你要讓 AI 幫你做讀財報、分析毛利變化等「苦力」工作。讓 AI 過濾雜訊，你專注判斷。",
    solution: "將「問明牌」轉變為「問摘要」。請 AI 扮演多疑的分析師，幫你找出別人都忽略的財報細節。我們開發了這套「趨勢雷達」指令包。",
    example: {
        wrong: "❌ 做法：問 AI『台積電明天會漲嗎？』(AI 回：我無法提供投資建議...)。",
        right: "✅ 做法：指令『請摘要台積電過去三年季報，列出毛利率趨勢並標註管理層提到的風險。』"
    },
    insight_quote: "股市的波動是數據的雜訊，而 AI 的洞察是穿透恐懼與貪婪的理性指南。",
    practice_kit: {
        title: "指令夾：趨勢摘要指令",
        description: "把繁瑣的法說會紀錄丟給 AI，執行以下任務：",
        command: `你是一位專精基本面分析的首席分析師。請針對以下文件進行深度摘要：
1. 營收成長的主要動能是什麼？
2. 管理層對下一季最擔心的 3 個具體風險。
3. 比較本季與去年同期的毛利率變化，並指出異常點。
請用白話列表呈現，不需客套。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">AI 沒有水晶球，但它有一雙「不累的眼」。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        別讓 AI 替你做最後決策，要讓它幫你處理那些讓你頭痛的數字。這才是散戶對抗法人機構的唯一武器。<span class="text-violet-400 font-bold">這不是在預測股價，是在預測「人類的行為」與「技術的走向」。</span>
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">建立你的趨勢雷達</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-violet-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">數據餵養</p>
                    <p class="text-sm text-zinc-400">將長篇的 PDF 財報、新聞稿或法說會逐字稿貼給 AI。不要怕內容多。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-violet-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">反向驗證</p>
                    <p class="text-sm text-zinc-400">請 AI 扮演反方辯論手，針對你的看好理由提出 3 個強力的數據反駁。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-violet-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">視覺化輔助</p>
                    <p class="text-sm text-zinc-400">利用 <a href='/insights/601' class='text-indigo-400 underline'>Nano Banana</a> 產出的趨勢圖表，輔助你的邏輯判斷。</p>
                </div>
            </div>
        </div>
    </div>`
};
