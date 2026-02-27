export const insight = {
    id: 310,
    category: "生活應用",
    themeColor: "rose",
    difficulty_level: 1,
    tags: ["#寵物讀心", "#趣味實踐", "#毛小孩"],
    title: "寵物讀心術初體驗：如何拍下毛小孩照片，讓 AI 翻譯牠現在的「內心獨白」？",
    summary: "狗狗在想什麼？貓咪為什麼一直盯著你看？教你利用 AI 的圖像辨識能力，捕捉寵物的小情緒，為生活增添驚喜與樂趣。",
    date: "2024.07.20",
    readTime: "5 分鐘",
    pain_point: "看著家裡的毛小孩做出奇怪的表情或動作，卻猜不透牠的心情？想發社群動態卻不知道幫牠配什麼文案？",
    scenario: "你隨手拍下一張貓咪斜眼看你的照片。AI 能從牠的耳朵角度、瞳孔大小判斷出：『主人，這餐的乾乾比昨天少兩顆，我正在考慮要不要把你的拖鞋藏起來。』",
    solution: "利用 AI 的「視覺解讀」與「角色扮演」結合。上傳照片後，給予特定的口吻設定（如：傲嬌小公主、憨厚老實狗），讓 AI 翻譯內心戲。",
    example: {
        wrong: "❌ 做法：隨便配一句『可愛的貓咪』。沒創意也沒共鳴。",
        right: "✅ 做法：上傳照片後指令『你現在是我的貓。請解讀這張照片中你的肢體語言。並用「傲嬌」口吻寫一段你想對我說的話。』"
    },
    insight_quote: "當演算法開始解讀靈魂，我們與生命的連結將跨越物種，抵達最深層的共鳴。",
    practice_kit: {
        title: "指令夾：寵物翻譯官",
        description: "拍下你家毛小孩的近照，貼上這段話：",
        command: `你是一位資深的寵物行為觀察家與幽默作家。我提供這張寵物的照片。
請幫我執行：
1. 分析牠目前的「心理狀態」（根據耳朵、眼睛、尾巴）。
2. 用牠的口吻寫一段 50 字的內心獨白。
3. 語氣要設定為 [填入性格，如：傻白甜 / 高冷國王]。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">這不是玄學，是「行為數據學」。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        AI 並不是真的能通靈，但它讀取過數百萬份關於寵物行為的研究報告。它能從細微的肌肉張力中，解讀出人類容易忽略的情緒訊號。<span class="text-rose-400 font-bold">這是一個與生命進行趣味連結的最佳方式。</span>
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">寵物讀心三部曲</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-rose-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">精確攝影</p>
                    <p class="text-sm text-zinc-400">拍下清晰的眼神與動作，這對 AI 判斷情緒至關重要。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-rose-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">設定靈魂</p>
                    <p class="text-sm text-zinc-400">告訴 AI 牠的平日個性。越具體，翻譯出來的話就越像牠。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-rose-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">創意發揮</p>
                    <p class="text-sm text-zinc-400">請 AI 用牠的口吻寫一段 IG 文案，保證互動率爆表。</p>
                </div>
            </div>
        </div>
    </div>
    `
};
