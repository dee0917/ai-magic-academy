# AI Magic Academy - 架構詳解與審查報告

> 審查日期：2026-03-18

---

## 目錄

1. [專案概覽](#1-專案概覽)
2. [技術棧](#2-技術棧)
3. [目錄結構](#3-目錄結構)
4. [架構設計](#4-架構設計)
5. [核心模組分析](#5-核心模組分析)
6. [資料層設計](#6-資料層設計)
7. [UI/UX 設計系統](#7-uiux-設計系統)
8. [路由架構](#8-路由架構)
9. [PWA 與快取策略](#9-pwa-與快取策略)
10. [外部整合](#10-外部整合)
11. [元件關係圖](#11-元件關係圖)
12. [架構優點](#12-架構優點)
13. [已知限制與改善建議](#13-已知限制與改善建議)

---

## 1. 專案概覽

**AI Magic Academy（AI 魔法學院）** 是一個以「魔法學院」為主題的 AI Prompt 模板工具。專為台灣繁體中文使用者打造，將日常工作、校園、人際、創業等情境的 AI 提示詞（Prompt）包裝成「咒語（Curse）」，讓使用者輕鬆複製並貼到 ChatGPT、Claude、Gemini、Grok 等 AI 平台使用。

**核心定位**：麻瓜專用 AI 外掛 — 降低 AI 使用門檻的 Prompt 模板產生器。

---

## 2. 技術棧

| 層級 | 技術 | 版本 | 用途 |
|------|------|------|------|
| **框架** | Next.js (App Router) | 16.1.6 | SSG/SSR 框架 |
| **語言** | TypeScript | ^5 | 型別安全 |
| **UI 庫** | React | 19.2.3 | 元件渲染引擎 |
| **樣式** | Tailwind CSS | ^4 | Utility-first CSS |
| **動畫** | Framer Motion | ^12.35.2 | 元件轉場與互動動畫 |
| **搜尋** | Fuse.js | ^7.1.0 | 客戶端模糊搜尋 |
| **圖示** | Lucide React | ^0.577.0 | SVG 圖示庫 |
| **快取** | Service Worker | 自訂 | Network-First 快取 |
| **建構** | PostCSS | Tailwind 4 引擎 | CSS 處理 |
| **Lint** | ESLint | ^9 | 程式碼規範 |

---

## 3. 目錄結構

```
ai-magic-academy/
├── src/
│   └── app/
│       ├── page.tsx              # 主應用程式（618 行）
│       ├── layout.tsx            # 根佈局、Metadata、SW 註冊（96 行）
│       ├── globals.css           # Tailwind 設定與自訂動畫（52 行）
│       ├── curses_data.tsx       # 資料層 — 51 個咒語物件（1,346 行）
│       ├── hero-preview/
│       │   └── page.tsx          # 設計實驗室（10 種 Hero 樣式）
│       ├── hero-preview-epic/
│       │   └── page.tsx          # 史詩召喚陣 Hero 展示
│       └── favicon.ico
├── public/
│   ├── manifest.json             # PWA Manifest
│   ├── sw.js                     # Service Worker（Network-First）
│   └── icon-512x512.png          # PWA 圖示
├── package.json                  # 依賴與腳本
├── next.config.ts                # Next.js 設定（快取標頭）
├── tsconfig.json                 # TypeScript 設定（@ 路徑別名）
├── postcss.config.mjs            # Tailwind 4 PostCSS
├── eslint.config.mjs             # ESLint 規則
├── decouple.js                   # 資料解耦工具腳本
├── fix.js                        # 正規表達式修復腳本
├── refactor.js                   # 程式碼轉換腳本
├── README.md                     # 入門指南
└── PROGRESS.md                   # 專案進度追蹤
```

### 檔案規模統計

| 檔案 | 行數 | 職責 |
|------|------|------|
| `page.tsx` | 618 | 核心應用邏輯與 UI |
| `curses_data.tsx` | 1,346 | 全部 51 個咒語資料 |
| `layout.tsx` | 96 | SW 註冊與 Metadata |
| `hero-preview/page.tsx` | 165 | 設計實驗室 |
| `hero-preview-epic/page.tsx` | 73 | 史詩 Hero 展示 |
| `globals.css` | 52 | 主題與動畫 |
| `sw.js` | 61 | 快取策略 |

---

## 4. 架構設計

### 4.1 整體架構

```
┌─────────────────────────────────────────────┐
│                  Client Side                │
│  ┌─────────────────────────────────────┐    │
│  │          Next.js App Router          │    │
│  │  ┌──────────┐  ┌────────────────┐   │    │
│  │  │ layout   │  │   page.tsx     │   │    │
│  │  │ .tsx     │→ │ (主應用元件)    │   │    │
│  │  └──────────┘  └───────┬────────┘   │    │
│  │                        │             │    │
│  │              ┌─────────▼──────────┐  │    │
│  │              │  curses_data.tsx   │  │    │
│  │              │  (資料層 × 51)     │  │    │
│  │              └────────────────────┘  │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │ Fuse.js  │  │ Framer   │  │  Lucide   │ │
│  │ (搜尋)   │  │ Motion   │  │  React    │ │
│  └──────────┘  └──────────┘  └───────────┘ │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │        Service Worker (sw.js)       │    │
│  │        Network-First Cache          │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
          │                    │
          ▼                    ▼
  ┌──────────────┐    ┌──────────────────┐
  │  Clipboard   │    │  外部 AI 平台    │
  │  API         │    │  ChatGPT/Claude  │
  │              │    │  Gemini/Grok     │
  └──────────────┘    └──────────────────┘
```

### 4.2 設計模式

- **純客戶端架構**：無後端 API、無資料庫、無伺服器端邏輯
- **單頁應用（SPA）**：主應用集中在單一 `page.tsx`
- **資料與 UI 分離**：咒語資料獨立於 `curses_data.tsx`
- **React Hooks 狀態管理**：`useState` + `useMemo`，無外部狀態庫
- **靜態部署**：可作為純靜態站點部署

---

## 5. 核心模組分析

### 5.1 主應用元件 `MagicAcademyMVP`（page.tsx）

核心元件，承載所有互動邏輯。

**狀態管理：**

| 狀態 | 型別 | 用途 |
|------|------|------|
| `selectedCurse` | Curse \| null | 當前選中的咒語 |
| `inputs` | Record<string, string> | 使用者表單輸入值 |
| `isCopied` | boolean | 複製按鈕回饋 |
| `showPortal` | boolean | AI 平台選擇 Modal |
| `searchQuery` | string | 全文搜尋輸入 |
| `agreedToRisk` | boolean | 風險聲明同意 |
| `activeTab` | string \| null | 當前分類標籤 |
| `showAuthModal` | boolean | 認證 Modal |
| `isLoggedIn` | boolean | 登入狀態 |
| `showRiskScroll` | boolean | 風險聲明捲軸 Modal |

**內部輔助元件：**

- **`HighlightedPrompt`**：解析並高亮 `[[變數]]` 語法，以翡翠/黃色樣式渲染

### 5.2 資料流

```
使用者輸入搜尋詞
       │
       ▼
  Fuse.js 模糊搜尋（title, desc, tags, tab）
       │
       ▼
  useMemo 過濾 & 分組（按 tab 分類）
       │
       ▼
  渲染咒語卡片（水平捲動）
       │
       ▼
  使用者點擊卡片 → 開啟「魔法工作坊」Modal
       │
       ▼
  填入動態表單欄位 → 即時預覽
       │
       ▼
  同意風險聲明 → 複製到剪貼簿
       │
       ▼
  開啟 AI 傳送門 → Deep Link 到外部平台
```

---

## 6. 資料層設計

### 6.1 咒語（Curse）資料結構

```typescript
interface Curse {
  id: string;              // 唯一識別碼
  tab: string;             // 分類（5 種）
  isPro: boolean;          // 是否需要認證
  outputFormat: string;    // 輸出類型（LINE、Email、Report 等）
  icon: JSX.Element;       // Lucide React 圖示
  color: string;           // Tailwind 色彩名
  title: string;           // 咒語標題
  desc: string;            // 描述（2-3 句）
  tags: string[];          // 搜尋標籤（偏好 2 字元）
  fields: Array<{          // 動態表單欄位
    id: string;
    label: string;
    placeholder: string;
    outputFormat?: string;
  }>;
  tweak?: {                // 可選的變體選擇器
    id: string;
    label: string;
    options: string[];
  };
  theory: string;          // 詳細原理說明
  generate: (inputs: Record<string, string>) => string;  // Prompt 模板產生函式
}
```

### 6.2 分類系統

| 分類 | 中文名 | 咒語數量 |
|------|--------|----------|
| 職場求生 | Workplace Survival | ~15 |
| 校園生存 | Campus Survival | ~10 |
| 人際擋箭 | Social Shield | ~8 |
| 日常雜症 | Daily Life | ~10 |
| 創業/斜槓 | Entrepreneurship | ~8 |

**總計：51 個咒語**，其中 11 個標記為 PRO（需認證）。

---

## 7. UI/UX 設計系統

### 7.1 色彩系統

| 角色 | 色碼 | 用途 |
|------|------|------|
| 背景 | `#050510` | 近黑色，帶紫色調 |
| 主要強調 | `#a855f7` (purple-600) | 按鈕、高亮 |
| 次要強調 | `#ec4899` (pink-500) | 漸層終點 |
| 文字 | `#e2e8f0` (slate-200) | 主要文字 |
| 卡片背景 | `rgba(255,255,255,0.05)` | 玻璃擬態 |

### 7.2 設計語言

- **玻璃擬態（Glassmorphism）**：`backdrop-blur-xl` + 半透明背景 + `border-white/10`
- **發光效果**：色彩編碼的 `drop-shadow` 與 `box-shadow`
- **暗色主題**：全站深色模式
- **響應式**：行動優先，使用 `md:` 斷點

### 7.3 字體系統

| 字體 | 用途 |
|------|------|
| Geist Sans | 預設無襯線字體 |
| Noto Serif TC | 中文襯線字體（Hero 標題） |
| Geist Mono | 等寬字體（程式碼預覽） |

### 7.4 動畫

- **Tailwind 自訂動畫**：`gradient-xy`（3 秒漸層旋轉）、`shimmer`、`progress`
- **Framer Motion**：Modal 轉場、卡片懸停效果
- **背景光球**：兩個動畫脈衝光球（紫色、靛色）

---

## 8. 路由架構

| 路徑 | 頁面 | 說明 |
|------|------|------|
| `/` | `page.tsx` | 主應用程式 |
| `/hero-preview` | `hero-preview/page.tsx` | 設計實驗室（10 種 Hero 變體） |
| `/hero-preview-epic` | `hero-preview-epic/page.tsx` | 史詩召喚陣展示 |

所有頁面使用 Next.js App Router（`/src/app/` 目錄結構）。

---

## 9. PWA 與快取策略

### 9.1 Service Worker（`sw.js`）

- **策略**：Network-First（網路優先）
- **Navigation 請求**：始終從網路取得（確保最新 HTML）
- **快取版本**：`ai-magic-v3`（手動遞增）
- **更新偵測**：透過 `controllerchange` 事件自動重新載入

### 9.2 PWA Manifest

- **名稱**：AI 魔法學院
- **顯示模式**：Standalone
- **主題色**：`#050510`
- **圖示**：512×512 PNG

### 9.3 快取標頭（`next.config.ts`）

```typescript
headers: [{
  source: '/(.*)',
  headers: [{
    key: 'Cache-Control',
    value: 'no-cache, no-store, max-age=0, must-revalidate'
  }]
}]
```

所有路由設定為**不快取**，確保使用者始終取得最新內容。

---

## 10. 外部整合

### 10.1 AI 平台 Deep Link

| 平台 | 策略 | App Scheme | Web Fallback |
|------|------|-----------|-------------|
| ChatGPT | App → Web | `chatgpt://` | `https://chatgpt.com` |
| Claude | App → Web | `claude://` | `https://claude.ai` |
| Gemini | 僅 Web | — | `https://gemini.google.com/app` |
| Grok | 僅 Web | — | `https://grok.com` |

**Deep Link 流程**：
1. 嘗試開啟 App Scheme（ChatGPT/Claude）
2. 監聽 `visibilitychange` 事件偵測 App 是否啟動
3. 2.5 秒逾時後開啟 Web Fallback
4. Gemini/Grok 直接開啟 Web URL

### 10.2 Clipboard API

- 使用 `navigator.clipboard.writeText()` 複製產生的 Prompt
- 複製前移除 `[[]]` 變數標記

---

## 11. 元件關係圖

```
MagicAcademyMVP（主元件）
├── 🎨 背景光球裝飾
├── 📌 Header 區塊
│   ├── Logo 徽章（動畫漸層）
│   ├── 標題 "{麻瓜專用AI外掛}"
│   ├── 副標題
│   └── 搜尋輸入（Fuse.js）+ 清除按鈕
├── 🏷️ Tab 導航
│   └── 按鈕群組（5 分類 + 全部）
├── 📦 主內容區
│   ├── 各分類區段（職場/校園/人際/日常/創業）
│   │   ├── 分類標籤
│   │   ├── 捲動指示器（行動版）
│   │   └── 咒語卡片（水平捲動）
│   │       ├── 圖示
│   │       ├── 標題 & 描述
│   │       ├── 標籤
│   │       └── PRO 徽章（鎖定）
│   └── 空結果狀態
├── 🔮 魔法工作坊 Modal（selectedCurse）
│   ├── 圖示 + 標題
│   ├── 動態表單欄位
│   │   ├── 文字輸入
│   │   └── 變體選擇器（Tweak）
│   ├── 即時預覽終端機
│   ├── 風險同意核取方塊
│   └── 複製按鈕
├── 📜 風險聲明捲軸 Modal
│   ├── 警示圖示
│   ├── 4 點法律聲明
│   └── 簽署契約按鈕
├── 🌀 AI 傳送門 Modal
│   ├── ChatGPT / Claude / Gemini / Grok 按鈕
│   └── 「留在學院」按鈕
└── 🔐 認證 Modal
    ├── 鎖定圖示
    ├── 解鎖訊息
    └── 展示通道按鈕
```

---

## 12. 架構優點

### 12.1 設計優勢

1. **資料與 UI 分離**：`curses_data.tsx` 獨立維護 51 個咒語，新增/修改咒語無需更動 UI 邏輯
2. **零後端依賴**：純客戶端運作，部署簡單，無伺服器成本
3. **模糊搜尋**：Fuse.js 提供使用者友善的容錯搜尋體驗
4. **PWA 支援**：可安裝為桌面/行動應用，離線仍可瀏覽
5. **動態表單系統**：每個咒語定義自己的輸入欄位，彈性極高
6. **即時預覽**：使用者可在輸入時即時看到產生的 Prompt
7. **深色魔法主題**：獨特的視覺識別度，玻璃擬態與發光效果增添沉浸感

### 12.2 技術優勢

1. **TypeScript 嚴格模式**：型別安全，減少執行期錯誤
2. **Tailwind CSS 4**：最新版本，原生 CSS 層疊層支援
3. **React 19**：最新版本，效能改善
4. **useMemo 最佳化**：避免不必要的重新計算
5. **輕量依賴**：僅 4 個執行期依賴（next, react, framer-motion, fuse.js, lucide-react）

---

## 13. 已知限制與改善建議

### 13.1 架構層面

| 問題 | 嚴重度 | 建議 |
|------|--------|------|
| **單一巨大元件**：`page.tsx` 承載所有 UI 與邏輯（618 行） | 中 | 拆分為獨立元件：`CurseCard`、`MagicWorkshopModal`、`PortalModal`、`RiskDisclaimer`、`SearchBar` 等 |
| **無真實認證**：`isLoggedIn` 僅為前端狀態切換 | 低 | 若需 PRO 功能，整合 NextAuth.js 或 Supabase Auth |
| **硬編碼資料**：51 個咒語寫死在 TSX 檔案中 | 低 | 考慮遷移至 JSON/YAML 或 CMS，方便非工程師編輯 |
| **無錯誤邊界**：缺少 React Error Boundary | 低 | 加入 Error Boundary 防止白屏 |
| **無測試**：無單元測試或 E2E 測試 | 中 | 加入 Vitest + React Testing Library |

### 13.2 效能層面

| 問題 | 嚴重度 | 建議 |
|------|--------|------|
| **圖示全量載入**：Lucide React 在資料層直接引用 JSX | 低 | 可考慮動態載入或 tree-shaking 驗證 |
| **快取標頭過於激進**：所有路由 `no-store` | 低 | 靜態資源（CSS、JS、圖片）應設定長期快取 |

### 13.3 可維護性

| 問題 | 嚴重度 | 建議 |
|------|--------|------|
| **未定義 TypeScript 介面**：Curse 型別隱含在資料中 | 中 | 建立 `types/curse.ts` 明確定義介面 |
| **無國際化（i18n）**：僅支援繁體中文 | 低 | 若需擴展市場，整合 next-intl |
| **工具腳本留存**：`decouple.js`、`fix.js`、`refactor.js` 未清理 | 低 | 移至 `/scripts` 目錄或移除 |

---

## 總結

AI Magic Academy 是一個**架構簡潔、目標明確**的客戶端 Prompt 模板工具。以「魔法學院」為主題包裝 AI 使用門檻，定位精準。目前架構適合 MVP 階段，若需擴展規模，建議優先進行**元件拆分**與**型別定義**，以提升可維護性與團隊協作效率。
