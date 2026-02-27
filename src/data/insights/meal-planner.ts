export const insight = {
    id: 308,
    category: "生活應用",
    themeColor: "yellow",
    difficulty_level: 1,
    tags: ["#菜單規劃", "#省錢攻略", "#健康飲食"],
    title: "全家人的營養師：如何用 AI 規劃一週「低糖且省錢」的菜單？附買菜清單自動生成指令",
    summary: "每天想吃什麼想到心累？教你用 AI 擔任家庭營養師，30 秒產出兼顧營養、預算與全家人口味的完美菜單。",
    date: "2024.07.16",
    readTime: "7 分鐘",
    pain_point: "每天下班都在煩惱晚餐，最後往往隨便吃或點外送，既不健康又花錢？想控制預算卻不知道如何精準買菜？",
    scenario: "想像你有一個精打細算的營養師。你只需告訴他：『我家有兩大一小，這週預算 2000 元，要低醣飲食，且不准出現青椒。』他就能列出 7 天菜單與買菜清單。",
    solution: "利用 AI 的「限制性生成」能力。提供人數、預算、口味偏好與飲食目標。AI 會自動計算食材重複利用率，幫你省錢省時。",
    example: {
        wrong: "❌ 做法：去超市隨便逛，買了一堆想吃的卻湊不出三餐，最後一半食材爛在冰箱裡。",
        right: "✅ 做法：指令『請扮演精打細算的營養師。規劃一週菜單：2人份、預算1500、強調高蛋白質。請產出表格與超市採買清單。』"
    },
    insight_quote: "健康的定義不再是自律的苦行，而是運用 AI 數據，精準譜寫每一餐的能量美學。",
    practice_kit: {
        title: "指令夾：家庭營養師公式",
        description: "複製這段指令，解決你下週的採買煩惱：",
        command: `你是一位資深的家庭營養師與採購專家。請幫我規劃一週（週一至週日）的晚餐菜單。
背景資訊：
1. 用餐人數：[填入，如：2位大人、1位幼稚園小孩]。
2. 飲食偏好：[填入，如：低碳水、少油、不要香菜]。
3. 本週預算：[填入，如：台幣 2500 元]。
4. 特殊要求：[如：週三要加班，請安排 15 分鐘能做好的快手菜]。
請產出一份包含：1. 每日菜名。 2. 核心食材清單。 3. 超市採購總清單（按蔬菜/肉類/乾貨分類）。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">想吃什麼？這不該是人腦處理的事。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        「決策疲勞」是現代人的隱形殺手。每天要做出上萬個決定，而「晚餐吃什麼」往往是壓死駱駝的最後一根稻草。<span class="text-yellow-400 font-bold">讓 AI 負責邏輯與計算，你負責享受美味與陪伴。</span>
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">菜單規畫三部曲</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-yellow-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">精準限制</p>
                    <p class="text-sm text-zinc-400">告訴 AI 你的預算與「絕對不吃」的清單。限制越多，結果越實用。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-yellow-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">食材聯動</p>
                    <p class="text-sm text-zinc-400">要求 AI 「重複利用食材」，例如週一的剩餘雞胸肉可以變成週二的沙拉。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-yellow-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">視覺化導覽</p>
                    <p class="text-sm text-zinc-400">將買菜清單存入手機記事本，去超市不再盲目亂逛。</p>
                </div>
            </div>
        </div>
    </div>
    `
};
