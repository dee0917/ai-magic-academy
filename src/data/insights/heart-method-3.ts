export const insight = {
    id: 203,
    category: "入門心法",
    themeColor: "emerald",
    difficulty_level: 1,
    tags: ["#背景設定", "#懶人包", "#品牌風格"],
    title: "AI 記性差老是失憶？教你建立專屬「背景設定懶人包」，讓 AI 永遠記得你",
    summary: "每次開新視窗 AI 都會「失憶」。教你建立專屬「懶人包」，讓 AI 永遠記得你的品牌與風格。省下無數重複解釋的時間。",
    date: "2024.06.22",
    readTime: "5 分鐘",
    pain_point: "昨天聊得好好的，今天它就忘記你是誰？每次都要重新解釋你的品牌定位、目標受眾？覺得 AI 像得了失智症？",
    scenario: "想像新員工進來沒有交接，每次你都要重頭教起。AI 每開一個新視窗就是一張白紙。你需要一份「員工手冊」隨時貼給他看。",
    solution: "建立「背景設定檔」。將您的身份、品牌風格、受眾與成功範例存在一個記事本中。每次工作前先「餵」給 AI，讓它瞬間進入角色。",
    example: {
        wrong: "❌ 做法：第一天說『風格要活潑』，第二天卻不說，結果 AI 給了你一篇死板的公文。",
        right: "✅ 做法：存好一段話『我是小編。品牌風格是幽默、年輕。之前成功的範例有：[內容]。請遵循這些設定。』"
    },
    insight_quote: "為 AI 搭建一座舞台，讓情境的深度，決定答案的高度。",
    practice_kit: {
        title: "指令夾：品牌背景範本",
        description: "將這段設定存好，每次開新對話先貼上：",
        command: `請記住以下「前情提要」：
1. 品牌名稱與調性：[填入，如：Dee 生活實驗室 / 親切白話]。
2. 核心受眾：[描述，如：對 AI 感到恐懼的初學者]。
3. 禁忌事項：[如：不要使用過多專業術語、不要太過浮誇]。
4. 優秀參考：[貼入一段你滿意的舊文案]。
接下來的所有產出，請務必嚴格遵循以上設定。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">每開一個新視窗，AI 就重生一次。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        不要期待 AI 會「慢慢認識你」。主動建立「懶人包」是維持品牌連貫性的唯一秘訣。<span class="text-emerald-400 font-bold">這不是在教 AI，是在幫你省時間。</span>
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">懶人包必備三要素</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">我是誰</p>
                    <p class="text-sm text-zinc-400">定義品牌的人格化特質。你是專家、保姆、還是嚴師？</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">誰在看</p>
                    <p class="text-sm text-zinc-400">描述目標受眾。他們擔心什麼？他們喜歡什麼樣的口吻？</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">像什麼</p>
                    <p class="text-sm text-zinc-400">提供 1-2 個你滿意的舊案例。這比任何形容詞都更能讓 AI 明白你的標準。</p>
                </div>
            </div>
        </div>
    </div>`
};
