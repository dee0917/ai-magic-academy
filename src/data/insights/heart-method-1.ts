export const insight = {
    id: 201,
    category: "入門心法",
    themeColor: "emerald",
    difficulty_level: 1,
    tags: ["#AI代理人", "#Agent", "#指令入門"],
    title: "ChatGPT 指令怎麼寫？把 AI 當成你的「全能數位代理人 (Agent)」，3 步學會高級對話技巧",
    summary: "別再把 AI 當成搜尋引擎了！它不是用來「查資料」的，而是用來「執行任務」的 Agent。學會代理人思維，讓它變神助攻。",
    date: "2024.06.20",
    readTime: "8 分鐘",
    pain_point: "你覺得 AI 笨笨的，回答總是「牛頭不對馬嘴」？你還在像用 Google 一樣問它問題嗎？這就是為什麼你總是得不到想要的結果。",
    scenario: "想像你請了一位全能的數位代理人 (Agent)。如果你只說「去做個報告」，他會不知道你的公司背景、目標和標準。你要的是一個能代表你、替你解決問題的夥伴。",
    solution: "把 AI 當成你的「全能數位代理人」。耐心教導他：你是誰（身份）、目前面臨的挑戰（背景）、你期望的具體結果（產出）。這就是從「對話」升級到「代理」的關鍵。",
    example: {
        wrong: "❌ 做法：幫我寫個報告 (當成搜尋引擎用)。",
        right: "✅ 做法：指令『你現在是我的全能代理人。我要你替我撰寫競爭分析，參考這份資料...目標是說服主管...。』"
    },
    insight_quote: "指令的本質不在於問答，而在於如何將你的意圖，封裝成具備靈魂的數位代理人。",
    practice_kit: {
        title: "代理人合約：專業任務交辦公式",
        description: "複製這套公式，與你的第一個 AI Agent 簽約：",
        command: `你現在是我的全能數位代理人 (Agent)，具備 [填入領域，如：行銷/財務] 的頂級專長。
我現在授權你幫我執行 [任務名稱]。
背景：[提供 2-3 句目前的情況]。
目標：[你最終想達成的效果]。
規則：1. 請先列出你的執行計畫。 2. 如果資訊不足，請立刻向我提問。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">從「實習生」進化到「代理人 (Agent)」</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        2026 年最核心的 AI 觀念只有一個：<span class="text-emerald-400 font-bold">Agent 時代正式降臨</span>。AI 不再只是被動回答問題的機器，而是能主動代表你執行複雜流程的「全能代理人」。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12">
        <h3 class="text-xl font-bold text-white mb-6">為什麼 Agent 比工具更強大？</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-emerald-500">01</span>
                <div>
                    <p class="text-white font-bold mb-1">主動執行權</p>
                    <p class="text-sm text-zinc-400">工具需要你一步步操作，Agent 只需要你定義目標。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">02</span>
                <div>
                    <p class="text-white font-bold mb-1">多維度理解</p>
                    <p class="text-sm text-zinc-400">Agent 能理解你的「偏好」與「隱含需求」，而不僅僅是字面意思。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">03</span>
                <div>
                    <p class="text-white font-bold mb-1">自我糾錯</p>
                    <p class="text-sm text-zinc-400">高級 Agent 在產出前會自我檢查，這就是為什麼正確率更高的原因。</p>
                </div>
            </div>
        </div>
    </div>

    <p class="text-xl text-zinc-300 font-serif italic text-center py-10 border-y border-white/5 my-10">
        「別再教 AI 怎麼做事，要教它怎麼代表你做事。這就是 Agent 思維。」
    </p>
    `
};
