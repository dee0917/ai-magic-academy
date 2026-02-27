export const insight = {
    id: 202,
    category: "入門心法",
    themeColor: "emerald",
    difficulty_level: 1,
    tags: ["#打桌球對話", "#迭代優化", "#入門心法"],
    title: "AI 回答不滿意怎麼辦？學會「打桌球互動法」，讓 60 分回答變 100 分",
    summary: "AI 不是投幣機，而是你的聊天隊象。學會「打桌球互動法」，透過追問與修正，讓 60 分的答案進化成 100 分。",
    date: "2024.06.21",
    readTime: "4 分鐘",
    pain_point: "試了一次就覺得 AI 回答很爛，所以關掉視窗說「AI 沒用」？你期待丟一顆球就結束比賽，結果總是失望而歸？",
    scenario: "想像和朋友聊天，第一次說的話可能不精確，需要反覆確認、補充。打桌球也不是發一球就結束，你要接球、殺球，來回幾次才能打出精彩的比賽。AI 對話亦然。",
    solution: "把 AI 當成對話對象而非投幣機。第一回答通常只有 60 分，透過『接球（回饋）』與『殺球（指令）』，你可以慢慢把答案修飾到滿意。AI 不會累，也不會因為你要求多而生氣。",
    example: {
        wrong: "❌ 做法：一次到位。寫一個產品文案。(AI 給了一個普通版本，然後就放棄)。",
        right: "✅ 做法：逐步改進。第一次指令：寫一個文案。AI 回覆後，追加：『語氣太正式了，改年輕一點』，再追加：『第二段太長，縮短一半』。"
    },
    insight_quote: "當思維擁有了結構，混亂的資訊便能淬煉成精準的執行邏輯。",
    practice_kit: {
        title: "指令夾：迭代優化公式",
        description: "當 AI 回答不完美時，直接貼上這段話進行『接球』：",
        command: `這是我目前的想法或你剛才的回答：[貼入內容]。
我覺得目前的版本 [填入缺點，如：太過死板/重點不明確]。
請幫我執行以下優化：
1. 保留 [優點部分]。
2. 針對 [缺點] 進行重新調整。
3. 請換一種更像 [特定角色，如：脫口秀演員] 的口氣再試一次。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">第一次回答通常只有 60 分。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        很多人看到不滿意的回答就關掉視窗，這太可惜了！最精彩的內容，通常在第三、第四次對話才出現。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">打桌球互動術</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">發球：初步指令</p>
                    <p class="text-sm text-zinc-400">先給出基礎指令，看看 AI 的原始理解。這一步不需要太完美。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">接球：回饋修正</p>
                    <p class="text-sm text-zinc-400">明確指出哪裡好、哪裡不好。給予「負向回饋」對 AI 來說非常重要。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">殺球：收網完成</p>
                    <p class="text-sm text-zinc-400">當細節都調整到位，最後要求 AI 進行全篇潤飾與排版，收割成果。</p>
                </div>
            </div>
        </div>
    </div>
    `
};
