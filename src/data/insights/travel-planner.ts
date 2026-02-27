export const insight = {
    id: 305,
    category: "生活應用",
    themeColor: "amber",
    difficulty_level: 2,
    tags: ["#旅遊規劃", "#行程大師", "#自由行"],
    title: "自助旅行規劃神器：如何用 AI 30 秒產出 5 天 4 夜精準行程表？小白自駕與地圖整合攻略",
    summary: "出國旅行查資料查到崩潰？教你把混亂的願望清單丟給 AI，自動生成包含路線、時間與預算的完美規劃。",
    date: "2024.07.07",
    readTime: "5 分鐘",
    pain_point: "想去日本玩，但想到要排交通、對時間、查地圖就覺得心累？最後往往隨便走走，錯過很多景點？",
    scenario: "想像你有一個 24 小時在線的導遊。你只要把你想去的點丟給他，他會自動幫你規劃一條不繞路的最優動線，連交通轉乘時間都算好。",
    solution: "使用 AI 的「路線優化」能力。告訴它你的預算、成員（如：帶小孩）以及必去景點。它能產出包含景點連結與停留建議的結構化表格。",
    example: {
        wrong: "❌ 做法：自己看 Google Map 算車程，手寫在筆記本上，最後臨時迷路或太趕。",
        right: "✅ 做法：指令『我要去大阪 5 天。帶 2 個小孩。請規劃不趕路、適合推車的行程，並用表格呈現，含午晚餐建議。』"
    },
    insight_quote: "最好的行程規劃，是讓 AI 處理繁瑣的邏輯，而你負責在抵達時感受靈魂的自由。",
    practice_kit: {
        title: "私人導遊：旅遊規劃指令",
        description: "出國前，請將您的清單與需求貼上：",
        command: `你是一位資深自由行導遊。請規劃一份去 [目的地] 的 [天數] 行程。
成員：[例如：兩位長輩、一位小孩]。
需求：[預算有限/每天不超過三個景點/喜歡吃拉麵]。
必去景點：[清單]。
請幫我產出一份表格，包含建議的出發時間、景點間的交通方式、以及每餐的預算建議。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">旅行，應該是享受，不是做功課。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        AI 的強大在於「大數據處理」。它能瞬間比對數百家餐廳的評價與營業時間。您只需要負責「想去哪」，複雜的「怎麼去」交給它。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">旅遊規劃三部曲</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-amber-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">碎裂需求蒐集</p>
                    <p class="text-sm text-zinc-400">把想吃的、想看的、預算限制全部寫下來，不用管格式。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-amber-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">AI 提純排序</p>
                    <p class="text-sm text-zinc-400">使用實戰包指令，讓 AI 根據地理位置進行邏輯排序。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-amber-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">整合地圖地標</p>
                    <p class="text-sm text-zinc-400">要求 AI 給出地址，直接貼上 Google Map 收藏。</p>
                </div>
            </div>
        </div>
    </div>
    `
};
