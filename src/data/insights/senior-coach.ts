export const insight = {
    id: 303,
    category: "長輩數位教練",
    themeColor: "teal",
    difficulty_level: 1,
    tags: ["#長照補助", "#孝親專題", "#語音指令"],
    title: "長輩領補助教學：教爸媽用 AI 查長照補助，比打 1966 還快的語音指令實戰",
    summary: "別再幫爸媽查資料查到火大。教他們把語音輸入當成打電話，AI 就像住在手機裡的萬事通鄰居。",
    date: "2024.07.03",
    readTime: "5 分鐘",
    pain_point: "長輩想申請長照或補助，政府網站字太小、流程太長看不懂，電話轉接老半天，最後還是要麻煩子女查？",
    scenario: "想像爸媽只需要對著手機說「我要請外籍看護要怎麼申請？」，AI 就能把幾萬字的複雜公文翻譯成 3 句白話文。",
    solution: "教長輩使用手機的語音輸入功能，並直接對話。告訴 AI「請用簡單的國語告訴我這件事的 3 個步驟」。",
    example: {
        wrong: "❌ 做法：丟一個 PDF 連結給爸媽看，或是貼一大串文字，他們看不懂也點不開。",
        right: "✅ 做法：教爸媽語音指令『你是數位助理，請告訴我 65 歲以上領假牙補助要去哪裡辦？要帶什麼？』"
    },
    insight_quote: "跨越數位鴻溝的橋樑，不是冰冷的技術，而是讓 AI 成為長輩探索世界的第二雙眼睛。",
    practice_kit: {
        title: "孝親語音：爸媽專用指令",
        description: "幫爸媽存好這段話，讓他們隨時能對著手機念：",
        command: `你是一位最有耐心的社區社工，專門服務銀髮族。我的父母想詢問 [補助名稱] 的申請流程。
請用「超白話、字數精簡」的方式告訴我：
1. 誰可以領？ 
2. 去哪裡辦？ 
3. 準備什麼證件？
要求：請分點列出，字體間距加大，不要寫任何專業術語。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">孝順不難，難的是耐心。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        與其每次都幫長輩查，不如教他們如何「對著手機問問題」。這不僅能減少您的負擔，更能給長輩巨大的「掌控感」與「成就感」。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">數位教練三步驟</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-teal-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">找到麥克風</p>
                    <p class="text-sm text-zinc-400">教爸媽找到對話框旁的麥克風圖示，跨出「開口說話」的第一步。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-teal-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">設定耐心模式</p>
                    <p class="text-sm text-zinc-400">幫他們預設好「耐心社工」的角色設定，讓 AI 的回話變溫柔。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-teal-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">字體視覺優化</p>
                    <p class="text-sm text-zinc-400">要求 AI 使用大字體或列表，確保老花眼也能輕鬆閱讀。</p>
                </div>
            </div>
        </div>
    </div>
    `
};
