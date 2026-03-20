"use client";
import { MoveDown, Stamp, Asterisk } from "lucide-react";

const h1_top = "麻瓜專用";
const h1_bottom = "魔法外掛";
const desc = "將複雜的「提示詞」封裝成一鍵釋放的魔法。應付奧客、推掉飯局、自動寫報告，你的無腦求生指南。";

const paperBg = "bg-[#f4f2ea] relative text-slate-900 font-serif overflow-hidden";
const dotPattern = "absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]";

const versions = [
  { id: 1, name: "01. 原汁原味", desc: "The Classic Ticket — 車票/老舊說明書排版" },
  { id: 2, name: "02. 復古報紙頭版", desc: "The Broadsheet — 報紙排版，權威感" },
  { id: 3, name: "03. 機密檔案夾", desc: "The Classified Dossier — 政府機密文件感" },
  { id: 4, name: "04. 古籍字典", desc: "The Dictionary Entry — 學術感與諷刺" },
  { id: 5, name: "05. 老藥局標籤", desc: "Vintage Apothecary — 華麗復古外框" },
  { id: 6, name: "06. 打字機草稿", desc: "The Typewriter Draft — 極簡粗糙草稿感" },
  { id: 7, name: "07. 劇院入場券", desc: "The Theatre Stub — 左右分割票根" },
  { id: 8, name: "08. 包浩斯網格", desc: "Bauhaus Grid — 幾何色塊現代復古" },
  { id: 9, name: "09. 東方古籍", desc: "The Oriental Scroll — 全直書排版" },
  { id: 10, name: "10. 極簡說明書", desc: "The Minimal Manual — 無印良品風格" },
];

function V01() {
  return (
    <header className={`${paperBg} w-full border-[12px] border-[#2c2c2c] shadow-2xl`}>
      <div className={dotPattern}></div>
      <div className="bg-[#1f4e5b] text-white/80 text-xs px-6 py-2 flex justify-between tracking-widest font-sans">
        <span>版本 E — 雙行裝飾</span>
        <span>標題分兩行加裝飾符號，副標在虛線框 ▼</span>
      </div>
      <div className="p-10 relative z-10">
        <div className="flex justify-between text-xs tracking-[0.2em] text-slate-500 border-b-2 border-slate-800 pb-3 mb-16 uppercase font-bold">
          <span>VOL. I — 現代魔法法典</span>
          <span>EST. 2026</span>
        </div>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="w-12 h-[2px] bg-red-700"></div>
            <h1 className="text-5xl md:text-6xl font-light tracking-[0.2em] text-[#2c2c2c]">{h1_top}</h1>
            <div className="w-12 h-[2px] bg-red-700"></div>
          </div>
          <div className="bg-[#2c2c2c] text-[#eab308] py-4 px-12 inline-block shadow-md">
            <h1 className="text-6xl md:text-8xl font-black tracking-widest">{h1_bottom}</h1>
          </div>
        </div>
        <div className="border-2 border-dashed border-[#2c2c2c] p-6 max-w-2xl mx-auto text-center">
          <p className="text-[#4a4a4a] text-lg leading-loose tracking-wider">{desc}</p>
        </div>
      </div>
    </header>
  );
}

function V02() {
  return (
    <header className={`${paperBg} w-full p-10 border border-slate-300 shadow-xl`}>
      <div className="border-t-[6px] border-b-[2px] border-slate-900 py-4 mb-10 text-center">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase text-slate-900" style={{ transform: 'scaleY(1.2)' }}>
          {h1_top}{h1_bottom}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-700 text-justify leading-relaxed">
        <div className="col-span-2 text-xl font-medium border-r-0 md:border-r-2 border-slate-900 pr-0 md:pr-8">
          <span className="text-4xl float-left mr-2 font-black">將</span>{desc.substring(1)}
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center border-2 border-slate-900 p-4">
          <Asterisk className="w-12 h-12 text-red-700 mb-2" />
          <p className="text-center font-bold tracking-widest text-sm">無腦求生<br/>唯一指定指南</p>
        </div>
      </div>
    </header>
  );
}

function V03() {
  return (
    <header className={`${paperBg} w-full p-12 border border-[#d6d3c4] shadow-md rounded-tr-[4rem]`}>
      <div className="absolute top-8 right-8 text-red-700 border-4 border-red-700 p-2 transform rotate-12 opacity-80 z-20">
        <span className="text-2xl font-black tracking-widest">TOP SECRET</span>
      </div>
      <div className="font-mono text-sm tracking-widest text-slate-500 mb-8 border-b border-slate-400 pb-2">
        FILE NO. 001 / SUBJECT: AI SURVIVAL
      </div>
      <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-2">{h1_bottom}</h1>
      <h2 className="text-2xl md:text-3xl font-mono bg-slate-900 text-white inline-block px-4 py-1 mb-10">{h1_top}</h2>
      <div className="max-w-xl bg-[#e8e5d5] p-6 border-l-4 border-slate-900 font-mono text-slate-700 leading-loose">
        {desc}
      </div>
    </header>
  );
}

function V04() {
  return (
    <header className={`${paperBg} w-full p-16 border-l-[16px] border-slate-900 shadow-xl`}>
      <div className={dotPattern}></div>
      <div className="relative z-10">
        <div className="flex items-baseline gap-4 mb-8 flex-wrap">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900">{h1_bottom}</h1>
          <span className="text-xl md:text-2xl text-slate-500 italic font-serif">/ {h1_top} /</span>
        </div>
        <div className="space-y-4 text-lg">
          <p className="font-bold text-slate-800">名詞 (Noun)</p>
          <div className="pl-6 border-l-[3px] border-red-700">
            <p className="text-slate-700 leading-relaxed"><span className="font-bold text-red-700 mr-2">1.</span> {desc}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function V05() {
  return (
    <header className={`${paperBg} w-full p-6 shadow-2xl`}>
      <div className="border-[8px] border-double border-slate-900 p-12 text-center relative h-full">
        <p className="uppercase tracking-[0.3em] text-sm font-bold text-slate-600 mb-6">Guaranteed Cure For Workplace Anxiety</p>
        <div className="flex justify-center items-center gap-4 mb-4">
          <span className="w-16 h-[1px] bg-slate-900"></span>
          <h2 className="text-2xl italic font-serif text-red-800">{h1_top}</h2>
          <span className="w-16 h-[1px] bg-slate-900"></span>
        </div>
        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-slate-900 mb-10" style={{ transform: 'scaleY(1.1)' }}>
          {h1_bottom}
        </h1>
        <div className="w-full max-w-md mx-auto border-t-2 border-slate-900 pt-6">
          <p className="text-slate-700 text-lg leading-relaxed font-medium">{desc}</p>
        </div>
      </div>
    </header>
  );
}

function V06() {
  return (
    <header className={`${paperBg} w-full p-16 shadow-md`}>
      <div className="font-mono text-slate-800 max-w-2xl">
        <div className="mb-12">
          <span className="bg-red-700 text-white px-2 py-1 text-sm font-bold tracking-widest">DRAFT_01</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
          {h1_top} <br/>
          <span className="underline decoration-4 underline-offset-8 decoration-red-700">{h1_bottom}</span>
        </h1>
        <p className="text-xl leading-loose mt-12 bg-white/50 p-6 border border-slate-300 shadow-sm">
          {desc}
        </p>
      </div>
    </header>
  );
}

function V07() {
  return (
    <header className={`${paperBg} w-full flex flex-col md:flex-row shadow-2xl overflow-hidden`}>
      <div className="md:w-1/3 bg-slate-900 text-[#f4f2ea] p-10 flex flex-col justify-between border-r-[4px] border-dashed border-[#f4f2ea] min-h-[300px]">
        <div className="font-mono text-sm tracking-widest opacity-60">ADMIT ONE</div>
        <h2 className="text-5xl font-black md:[writing-mode:vertical-rl]">{h1_top}</h2>
        <div className="font-mono text-sm opacity-60">NO. 009942</div>
      </div>
      <div className="md:w-2/3 p-12 flex flex-col justify-center relative">
        <div className={dotPattern}></div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 relative z-10">{h1_bottom}</h1>
        <p className="text-lg text-slate-700 leading-loose border-l-4 border-red-700 pl-6 relative z-10">{desc}</p>
      </div>
    </header>
  );
}

function V08() {
  return (
    <header className={`${paperBg} w-full border-[10px] border-slate-900 shadow-xl flex flex-col`}>
      <div className="flex flex-col md:flex-row border-b-[10px] border-slate-900">
        <div className="md:w-1/2 p-12 bg-red-700 text-[#f4f2ea] flex items-center">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter">{h1_top}</h1>
        </div>
        <div className="md:w-1/2 p-12 bg-slate-900 text-[#f4f2ea] flex items-center">
          <h1 className="text-6xl md:text-7xl font-black tracking-widest">{h1_bottom}</h1>
        </div>
      </div>
      <div className="p-10 bg-[#f4f2ea] text-center">
        <p className="text-xl font-medium text-slate-800 tracking-wider max-w-2xl mx-auto">{desc}</p>
      </div>
    </header>
  );
}

function V09() {
  return (
    <header className={`${paperBg} w-full p-16 border-y-[8px] border-slate-900 shadow-lg flex justify-end`} style={{ writingMode: 'vertical-rl' as any }}>
      <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-widest mb-12">
        {h1_bottom}
      </h1>
      <div className="border-l-2 border-red-700 pl-8 mb-8">
        <h2 className="text-3xl font-bold text-red-700 tracking-[0.3em] mb-4">{h1_top}</h2>
      </div>
      <p className="text-lg text-slate-700 leading-loose tracking-widest">{desc}</p>
    </header>
  );
}

function V10() {
  return (
    <header className={`${paperBg} w-full p-16 shadow-sm border border-slate-200`}>
      <div className="w-full h-[1px] bg-slate-900 mb-2"></div>
      <div className="w-full h-[3px] bg-slate-900 mb-16"></div>
      <h2 className="text-xl font-bold text-slate-500 tracking-[0.5em] mb-4 uppercase">{h1_top}</h2>
      <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-12">{h1_bottom}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-300 pt-8">
        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Description //</div>
        <p className="text-slate-700 leading-loose">{desc}</p>
      </div>
    </header>
  );
}

const COMPONENTS = [V01, V02, V03, V04, V05, V06, V07, V08, V09, V10];

export default function HeroVersions() {
  return (
    <div className="min-h-screen bg-zinc-200 font-serif">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#2c2c2c] px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-black tracking-wider text-[#eab308]">HERO 版型預覽 — 復古印刷品系列</span>
        <a href="/" className="text-xs text-white/40 hover:text-white/70 transition">← 返回主站</a>
      </div>

      <div className="bg-[#eab308] border-b-2 border-[#2c2c2c] px-6 py-3">
        <p className="text-sm text-[#2c2c2c] font-bold text-center">
          紙質米黃底色 + 襯線體 + 黑灰紅配色。決定後回傳「我選版本 XX」即可套用。
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-16">
        {versions.map((v, idx) => {
          const Component = COMPONENTS[idx];
          return (
            <div key={v.id}>
              <div className="flex items-center gap-4 mb-4 px-2">
                <span className="text-lg font-black text-slate-800">{v.name}</span>
                <span className="text-xs text-slate-500 tracking-wider">{v.desc}</span>
              </div>
              <Component />
            </div>
          );
        })}
      </div>

      <div className="text-center pb-16">
        <p className="text-xs text-slate-400">此為臨時預覽頁，決定後將刪除。路徑：/hero-versions</p>
      </div>
    </div>
  );
}
