export const insight = {
    id: 306,
    category: "進階實踐",
    themeColor: "blue",
    difficulty_level: 3,
    tags: ["#英語口說", "#自學神器", "#免費家教"],
    title: "免費 1 對 1 外語家教：如何開啟 ChatGPT 語音模式練英文口說？不用花錢的自學攻略",
    summary: "想練英文卻不敢找外師？教你設定 AI 角色，讓它成為你 24 小時在線、永遠不會對你發火的口說家教。隨時隨地，開口就練。",
    date: "2024.07.09",
    readTime: "8 分鐘",
    pain_point: "學了多年英文還是不敢開口？找真人外師太貴且時間難配？怕說錯會尷尬、被嘲笑？",
    scenario: "要求 AI 扮演一位溫柔的店員或面試官。它會耐心聽你說完，甚至在說錯時「主動」在對話後糾正你的文法，還能陪你反覆練習同一個句子。",
    solution: "開啟手機版語音對話。在開始前，先用文字輸入一套「家教協議」。這會改變 AI 的性格，讓它從「回答者」變成「引導者與老師」。",
    example: {
        wrong: "❌ 做法：直接點麥克風聊天。AI 會像普通朋友回覆，完全不會糾正你的發音或錯誤文法。",
        right: "✅ 做法：指令『你現在是專業英語老師。請跟我聊 10 分鐘。規則：回應簡短，且在我說錯時用括號標註正確說法並解釋。』"
    },
    insight_quote: "學習一門語言不是為了模仿，而是為了與世界進行一場不間斷的深度對話。",
    practice_kit: {
        title: "指令夾：外語家教協議",
        description: "開啟語音模式前，先貼上這段話設定 AI 的大腦：",
        command: `你是一位非常有耐心且善於鼓勵學生的英語口說教練。
我想跟你練習關於「[主題]」的對話。
規則：
1. 請保持回應簡短（每次不超過 3 句話），引導我多說話。
2. 如果我有明顯的文法錯誤或發音彆扭，請在回覆我的下一句話之後，用括號標註正確說法並簡單解釋原因。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">學語言最快的方式，就是「說」。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        AI 的發音已經極度自然。它不會嘲笑你的台式英文，更不會因為你思考太久而顯得不耐煩。它是你最忠實的練習夥伴，讓你隨時都能建立「英語語感」。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">家教養成三部曲</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-blue-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">環境準備</p>
                    <p>開啟手機版 App，確認具備語音功能。戴上耳機，效果更佳。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-blue-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">輸入契約</p>
                    <p>先用文字輸入「家教協議」。這是在幫 AI 定位任務，非常重要。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-blue-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">模擬情境</p>
                    <p>不要只是閒聊，要求 AI 模擬特定場景（如：買咖啡、面試），練習會更高效。</p>
                </div>
            </div>
        </div>
    </div>`
};
