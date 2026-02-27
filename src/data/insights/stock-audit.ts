export const insight = {
    id: 102,
    category: "投資人 AI 攻略",
    themeColor: "violet",
    difficulty_level: 3,
    tags: ["#地雷股", "#風險掃描", "#審計思維"],
    title: "地雷股怎麼看？教你用 AI 擔任 24 小時審計員，3 分鐘內掃描財報風險",
    summary: "財報像天書？教你用 AI 擔任 24 小時審計員。從毛利異常到現金流，3 分鐘抓出隱藏的地雷警訊，保護你的投資安全。",
    date: "2024.06.08",
    readTime: "8 分鐘",
    pain_point: "幾百頁的財報等讀完早就反應完了。不讀又怕踩雷，散戶總是輸在資訊不對稱？看到那些密密麻麻的數字就頭暈？",
    scenario: "財報 PDF 可以直接丟進 AI。你不需要逐字讀，只需要像「考官」一樣抽查公司。AI 具備處理財務勾稽關係的專業邏輯。",
    solution: "要求 AI 扮演「多疑的法務會計師」。專門檢查「毛利與營收不對稱」、「存貨周轉異常」與「營業現金流是否為負」。",
    example: {
        wrong: "❌ 做法：肉眼閱讀 300 頁財報看到數字就頭暈，往往漏掉備註欄中的關鍵風險揭露。",
        right: "✅ 做法：指令『請檢查這份財報，應收帳款增加比例是否遠大於營收成長？這是否代表客戶品質有問題？』"
    },
    insight_quote: "當自動化接管了繁雜的審計，透明度與誠信將在數據的底層邏輯中完美盛開。",
    practice_kit: {
        title: "指令夾：財務審計掃雷",
        description: "將財報 PDF 的文字貼入後執行：",
        command: `你是一位資深的法務會計師。請針對這份數據進行「壓力測試」：
1. 營收成長是否有相對應的營業現金流支撐？
2. 存貨周轉天數是否較去年同期異常拉長？
3. 在『風險因素』章節中，哪些是今年首度出現的新內容？
請列出這三項的結果，若有異狀請給予紅色警訊標籤。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">財報不是用來讀的，是用來「審」的。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        地雷訊號，往往藏在管理層最想隱瞞的細節裡。AI 是你最好的 24 小時不領薪審計員，它能在幾秒內完成原本需要一整個團隊處理的數據比對。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">掃雷三步驟</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-violet-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">鎖定關鍵表單</p>
                    <p>專注於風險揭露與現金流量表，而非僅僅看營收表。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-violet-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">異常比對</p>
                    <p>讓 AI 比對過去三年的平均值，尋找劇烈的離群數值。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-violet-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">產出紅綠燈報告</p>
                    <p>要求 AI 將分析結果轉化為「白話警訊」，讓你秒懂風險。</p>
                </div>
            </div>
        </div>
    </div>`
};
