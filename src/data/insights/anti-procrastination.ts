export const insight = {
    id: 309,
    category: "工作效率",
    themeColor: "blue",
    difficulty_level: 2,
    tags: ["#拒絕拖延", "#目標拆解", "#高效生活"],
    title: "拒絕拖延症：如何將 ChatGPT 變成你的「24 小時監督官」？讓 AI 幫你拆解目標並強制追蹤的實戰技巧",
    summary: "總是計畫趕不上變化？教你利用 AI 的邏輯拆解能力，將「巨大壓力」轉化為「可執行的微小步驟」，徹底告別拖延。",
    date: "2024.07.18",
    readTime: "8 分鐘",
    pain_point: "看著代辦清單上那個『大魔王任務』，你總是一拖再拖？因為任務太大，大腦自動開啟逃避機制？最後趕在截止日前熬夜崩潰？",
    scenario: "想像你不再是一個人面對困難。你只需要告訴 AI：『我要在下週五前學會基本的 Excel 函數。』AI 會幫你切成 10 個「15 分鐘小任務」，並告訴你現在該做哪一個。",
    solution: "使用 AI 進行「顆粒度拆解」。將大目標量化為具體可執行動作。配合 AI 角色設定為『嚴厲且具備同理心的教練』，增加心理約束力。",
    example: {
        wrong: "❌ 做法：在清單寫『準備出國旅遊』。因為太模糊，你到出發前一天還沒收行李。",
        right: "✅ 做法：指令『我要準備日本自由行。請幫我分 5 個階段拆解，第一階段請列出今天下班前要確認的 3 個網站連結。』"
    },
    insight_quote: "對抗拖延的最佳武器，是讓 AI 成為你啟動慣性的第一個推力，把思考轉化為即刻的執行。",
    practice_kit: {
        title: "指令夾：目標拆解監督官",
        description: "當你感到壓力大想拖延時，貼上這段話：",
        command: `你是一位專門對抗拖延症的高效教練。我現在面對一個任務：[填入任務名稱]。
我感到壓力很大不知道從哪開始。請幫我執行：
1. 將這個任務拆解成 5 個「只要 10 分鐘就能完成」的極小步驟。
2. 以「幽默但嚴厲」的口吻告訴我為什麼現在就該開始。
3. 詢問我第一個步驟完成沒，等我回報完成後，再給我下一個步驟。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">拖延，是因為你的任務「太重了」。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        大腦在面對無法即時預見結果的大型工程時，會產生焦慮並驅使你去做刷手機等低難度的「代償行為」。<span class="text-blue-400 font-bold">AI 的作用是降低啟動成本。</span>
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">對抗拖延三部曲</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-blue-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">暴力切碎</p>
                    <p class="text-sm text-zinc-400">強迫 AI 將任務切到「不需要思考就能動手」的程度。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-blue-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">建立死線</p>
                    <p class="text-sm text-zinc-400">為每個微小步驟設定「倒數計時」感。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-blue-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">即時反饋</p>
                    <p class="text-sm text-zinc-400">完成後告訴 AI，聽聽它的稱讚與下一個指令，這能提供多巴胺動力。</p>
                </div>
            </div>
        </div>
    </div>
    `
};
