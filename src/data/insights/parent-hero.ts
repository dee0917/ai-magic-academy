export const insight = {
    id: 301,
    category: "神隊友育兒",
    themeColor: "yellow",
    difficulty_level: 1,
    tags: ["#育兒神器", "#NanoBanana", "#故事產生器"],
    title: "育兒神器：如何用 AI 編故事並用 Nano Banana 畫出繪本？解決小孩 100 個為什麼專題",
    summary: "爸媽救星！當你被問到詞窮，讓 AI 幫你把枯燥的科普變成精彩故事，並用 Nano Banana 生產超萌插圖。搞定那 100 個為什麼。",
    date: "2024.07.01",
    readTime: "7 分鐘",
    pain_point: "小孩纏著問「為什麼恐龍會滅絕？」你只想靜靜，但又不想敷衍孩子？直接講道理太無趣，編故事又太累？看著家長群組別人的教育成果感到焦慮？",
    scenario: "想像你有一個 24 小時待命的格林童話大師，他能根據你小孩今天剛玩過的小汽車玩具，即興編出一段充滿教育意義的冒險故事，還能幫你畫出主角的長相。",
    solution: "將問題丟給 AI 改寫為童話風格，並將小孩的名字植入主角。接著，利用 <a href='/insights/601' class='text-indigo-400 underline font-bold'>Nano Banana</a> 產出對應的可愛繪本插圖，打造專屬您的「床邊動態故事書」。",
    example: {
        wrong: "❌ 做法：直接念維基百科給小孩聽，兩個人都聽得昏昏欲睡，最後小孩還是沒聽懂。",
        right: "✅ 做法：指令『請扮演恐龍專家。用 300 字編一個勇敢小暴龍的故事，教小孩為什麼要愛護地球。』再用 Nano Banana 畫出對應插畫。"
    },
    insight_quotes: [
        {
            number: "01",
            title: "創造力擴張",
            content: "AI 在育兒中的角色不是取代父母，而是作為創造力的槓桿，讓父母能以更低的成本，為孩子構建充滿奇蹟的童年環境。"
        },
        {
            number: "02",
            title: "沉浸式連結",
            content: "當孩子在故事中聽見自己的名字，看見專屬的畫面，那種『被理解』與『被重視』的心理價值遠超故事本身。"
        },
        {
            number: "03",
            title: "自我糾錯",
            content: "高級 Agent 在產出前會自我檢查，這就是為什麼正確率更高的原因。"
        }
    ],
    practice_kit: {
        title: "育兒神組合：客製化繪本",
        description: "第一步先編故事，第二步用 Nano Banana 產出插圖：",
        command: `[第一步：故事指令]
你是一位充滿童心的兒童文學作家。我的孩子今天想聽關於 [主題，如：影子] 的故事。
要求：
1. 主角叫 [小孩名字]，他是一位勇敢的小冒險家。
2. 故事中要自然地置入 [科學知識]。
3. 語氣要溫柔，節奏要慢。

[第二步：繪圖指令]
Nano Banana: 一張高品質的 3D 角色設計。可愛的 [小孩名字] 正在與 [主題主角] 冒險。溫暖夢幻的燈光。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">育兒的崩潰，往往來自那句「為什麼」。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        每個父母都經歷過被追問到無話可說的時刻。AI 的出現，不是為了取代你的陪伴，而是為了<span class="text-yellow-400 font-bold">擴張你的創造力</span>。讓它來負責邏輯，你來負責擁抱。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">全自動繪本流程</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-yellow-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">知識轉化</p>
                    <p class="text-sm text-zinc-400">將生硬百科丟給 AI，改寫為適齡故事，確保孩子聽得懂且感興趣。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-yellow-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">視覺具現</p>
                    <p class="text-sm text-zinc-400">複製實戰包中的關鍵詞到 <a href='/insights/601' class='text-indigo-400 underline'>Nano Banana</a>，產出專屬插圖。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-yellow-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">沉浸式教育</p>
                    <p class="text-sm text-zinc-400">一邊給孩子看手機上的插圖，一邊念故事，參與感與記憶點提升 200%。</p>
                </div>
            </div>
        </div>
    </div>
    `
};
