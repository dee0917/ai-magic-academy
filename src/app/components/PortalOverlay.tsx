"use client";
import React from "react";
import { Sparkles, Brain, Bot, MessageSquare, X, Lock } from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { TIER_CONFIG, CAST_LEVELS, getSpellCode } from "../lib/constants";

export default function PortalOverlay() {
  const {
    showPortal, setShowPortal,
    lastCastCurse, lastCastLevel,
    showSharePreview, setShowSharePreview,
    shareText, setShareText,
    shareImageUrl, setShareImageUrl,
    showAuthModal, setShowAuthModal,
    isLoggedIn, setIsLoggedIn,
    showCopyToast,
    handleDeepLink,
  } = useAcademy();

  return (
    <>
      {/* ── PORTAL MODAL (Spell Card + AI selector merged) ── */}
      {showPortal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" style={{ background: 'rgba(42,39,35,0.88)', overflowY: 'auto' }}>
          <div className="max-w-sm w-full my-8">

            {/* ── SPELL CARD (top half) ── */}
            {lastCastCurse && (() => {
              const tc = TIER_CONFIG[lastCastCurse.tier];
              const ci = CAST_LEVELS.find((c: any) => c.id === lastCastLevel);
              const code = getSpellCode(lastCastCurse);
              const tierBg: Record<string, string> = { apprentice: "#6B7280", adept: "#2563EB", master: "#7C3AED", archmage: "#DC2626", forbidden: "#B8860B" };
              return (
                <div className="mb-4" id="spell-card-capture" style={{ border: '4px solid var(--ink)', boxShadow: 'var(--shadow)', background: 'var(--parchment)', position: 'relative', overflow: 'hidden' }}>
                  <div className="halftone-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />
                  <div style={{ height: 6, background: tierBg[lastCastCurse.tier] || '#6B7280' }} />
                  <div style={{ padding: '20px 24px 16px', position: 'relative' }}>
                    {/* Code + Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontFamily: 'var(--font-chivo)', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(42,39,35,0.35)' }}>{code}</span>
                      <span style={{ background: tierBg[lastCastCurse.tier], color: '#fff', fontSize: 10, fontWeight: 900, fontFamily: 'var(--font-noto-serif-tc)', padding: '2px 10px' }}>{tc.label}級</span>
                    </div>
                    {/* Title */}
                    <h3 style={{ fontFamily: 'var(--font-noto-serif-tc)', fontSize: 22, fontWeight: 900, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 8 }}>{lastCastCurse.title}</h3>
                    <div style={{ height: 2, background: 'var(--ink)', marginBottom: 10 }} />
                    {/* Cast info + tags */}
                    <div className="flex items-center justify-between mb-3">
                      <span style={{ fontFamily: 'var(--font-chivo)', fontSize: 11, fontWeight: 700, color: 'var(--teal)', border: '2px solid var(--teal)', padding: '1px 8px' }}>⚡ {ci?.label || '標準詠唱'}</span>
                      <div className="flex gap-1">
                        {lastCastCurse.tags?.slice(0, 3).map((tag: string) => (
                          <span key={tag} style={{ fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-chivo)', color: 'var(--ink)', background: 'rgba(232,168,56,0.2)', border: '1.5px solid rgba(232,168,56,0.5)', padding: '1px 6px' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Bottom brand bar */}
                  <div style={{ background: 'var(--ink)', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-rye, var(--font-display))', fontSize: 11, color: 'var(--mustard)', fontWeight: 700 }}>AI 魔法學院</span>
                    <span style={{ fontFamily: 'var(--font-chivo)', fontSize: 8, color: 'rgba(244,238,216,0.35)', letterSpacing: '0.1em' }}>ai-magic-academy.vercel.app</span>
                  </div>
                </div>
              );
            })()}

            {/* ── Share buttons ── */}
            {lastCastCurse && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={async () => {
                    const el = document.getElementById('spell-card-capture');
                    if (!el) return;
                    const html2canvas = (await import('html2canvas')).default;
                    const canvas = await html2canvas(el, { scale: 2, backgroundColor: null, useCORS: true });
                    const link = document.createElement('a');
                    link.download = `spell-${lastCastCurse.id}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                  style={{ background: 'var(--mustard)', color: 'var(--ink)', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
                >
                  📸 下載卡片
                </button>
                <button
                  onClick={async () => {
                    const el = document.getElementById('spell-card-capture');
                    if (!el) return;
                    const html2canvas = (await import('html2canvas')).default;
                    const canvas = await html2canvas(el, { scale: 2, backgroundColor: null, useCORS: true });
                    setShareImageUrl(canvas.toDataURL('image/png'));
                    const tc = TIER_CONFIG[lastCastCurse.tier];
                    setShareText(`剛在 AI 魔法學院施放了${tc.label}級咒語【${lastCastCurse.title}】⚡ 30 秒搞定原本要想 10 分鐘的事。\n\n你也來試試 → ai-magic-academy.vercel.app`);
                    setShowSharePreview(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                  style={{ background: 'var(--teal)', color: 'var(--parchment)', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
                >
                  ✦ 分享到社群
                </button>
              </div>
            )}

            {/* ── AI Platform selector (horizontal icons) ── */}
            <div
              className="text-center p-5"
              style={{ border: '4px solid var(--ink)', boxShadow: 'var(--shadow)', background: 'var(--parchment)' }}
            >
              <h3
                className="text-base mb-1"
                style={{ fontFamily: 'var(--font-rye)', color: 'var(--ink)' }}
              >
                選擇傳送座標
              </h3>
              <p className="text-[10px] mb-4" style={{ color: 'rgba(42,39,35,0.45)', fontFamily: 'var(--font-noto-sans-tc)' }}>
                咒語已複製，選擇 AI 平台貼上即可施法
              </p>
              <div className="flex justify-center gap-3">
                {[
                  { label: 'ChatGPT', icon: <Bot className="w-5 h-5" />, color: '#2D6A4F', web: "https://chatgpt.com", scheme: "chatgpt://" },
                  { label: 'Claude', icon: <Brain className="w-5 h-5" />, color: '#D4692C', web: "https://claude.ai", scheme: "claude://" },
                  { label: 'Gemini', icon: <Sparkles className="w-5 h-5" />, color: '#1A5C5A', web: "https://gemini.google.com/app", scheme: null },
                  { label: 'Grok', icon: <MessageSquare className="w-5 h-5" />, color: '#2A2723', web: "https://grok.com", scheme: null },
                  { label: 'DS', icon: <div className="w-5 h-5 flex items-center justify-center text-[9px] font-black text-white">DS</div>, color: '#1a5fcc', web: "https://chat.deepseek.com", scheme: "deepseek://" },
                ].map(({ label, icon, color, web, scheme }) => (
                  <button
                    key={label}
                    onClick={() => { if (scheme) { handleDeepLink(web, scheme); } else { setShowPortal(false); window.open(web, '_blank'); } }}
                    className="flex flex-col items-center gap-1 transition-all active:scale-95"
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center"
                      style={{ background: color, color: '#fff', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)' }}
                    >
                      {icon}
                    </div>
                    <span className="text-[9px] font-black" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}>{label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowPortal(false)}
                className="mt-4 text-[10px] font-black uppercase"
                style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.3 }}
              >
                [ 留在學院 ]
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── SHARE PREVIEW MODAL ── */}
      {showSharePreview && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" style={{ background: 'rgba(42,39,35,0.92)' }}>
          <div className="max-w-sm w-full" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            {/* Preview header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black" style={{ color: 'var(--mustard)', fontFamily: 'var(--font-noto-serif-tc)' }}>
                分享預覽
              </h3>
              <button onClick={() => setShowSharePreview(false)}>
                <X className="w-5 h-5" style={{ color: 'rgba(244,238,216,0.5)' }} />
              </button>
            </div>

            {/* Card image preview */}
            {shareImageUrl && (
              <div className="mb-3" style={{ border: '3px solid var(--ink)', boxShadow: 'var(--shadow-sm)' }}>
                <img src={shareImageUrl} alt="施法紀錄" className="w-full block" />
              </div>
            )}

            {/* Editable text */}
            <div className="mb-3">
              <label className="block text-[10px] font-bold mb-1" style={{ color: 'rgba(244,238,216,0.4)', fontFamily: 'var(--font-chivo)', letterSpacing: '0.1em' }}>
                貼文內容（可編輯）
              </label>
              <textarea
                value={shareText}
                onChange={(e) => setShareText(e.target.value)}
                rows={4}
                className="w-full p-3 text-sm resize-none"
                style={{
                  background: 'var(--parchment)',
                  color: 'var(--ink)',
                  border: '3px solid var(--ink)',
                  boxShadow: '3px 3px 0px var(--ink)',
                  fontFamily: 'var(--font-noto-sans-tc)',
                  outline: 'none',
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Platform buttons */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {/* Threads */}
              <button
                onClick={() => {
                  const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText)}`;
                  window.open(url, '_blank');
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{ background: '#000', color: '#fff', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
              >
                ◎ Threads
              </button>

              {/* LINE */}
              <button
                onClick={() => {
                  const url = `https://line.me/R/share?text=${encodeURIComponent(shareText + '\nhttps://ai-magic-academy.vercel.app')}`;
                  window.open(url, '_blank');
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{ background: '#06C755', color: '#fff', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
              >
                💬 LINE
              </button>

              {/* Copy text + image */}
              <button
                onClick={async () => {
                  try { await navigator.clipboard.writeText(shareText); } catch {}
                  alert('文案已複製！再搭配下載的卡片圖一起發佈效果更好');
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{ background: 'var(--mustard)', color: 'var(--ink)', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
              >
                📋 複製文案
              </button>

              {/* Download image */}
              <button
                onClick={() => {
                  if (!shareImageUrl) return;
                  const link = document.createElement('a');
                  link.download = `spell-${lastCastCurse?.id || 'card'}.png`;
                  link.href = shareImageUrl;
                  link.click();
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{ background: 'var(--parchment)', color: 'var(--ink)', border: '3px solid var(--ink)', boxShadow: '3px 3px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
              >
                📸 下載圖片
              </button>
            </div>

            {/* Native share (mobile) */}
            <button
              onClick={async () => {
                try {
                  const res = await fetch(shareImageUrl);
                  const blob = await res.blob();
                  const file = new File([blob], 'spell.png', { type: 'image/png' });
                  const data = { title: 'AI 魔法學院', text: shareText, url: 'https://ai-magic-academy.vercel.app', files: [file] };
                  if (navigator.share && navigator.canShare && navigator.canShare(data)) {
                    await navigator.share(data);
                  } else {
                    try { await navigator.clipboard.writeText(shareText); } catch {}
                    alert('文案已複製！');
                  }
                } catch {
                  try { await navigator.clipboard.writeText(shareText); } catch {}
                  alert('文案已複製！');
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all active:translate-x-0.5 active:translate-y-0.5"
              style={{ background: 'var(--teal)', color: 'var(--parchment)', border: '3px solid var(--ink)', boxShadow: '4px 4px 0px var(--ink)', fontFamily: 'var(--font-noto-sans-tc)' }}
            >
              ✦ 使用手機分享
            </button>

            <button
              onClick={() => setShowSharePreview(false)}
              className="w-full mt-3 text-[10px] font-black uppercase text-center"
              style={{ fontFamily: 'var(--font-chivo)', color: 'rgba(244,238,216,0.3)' }}
            >
              [ 返回 ]
            </button>
          </div>
        </div>
      )}

      {/* ── AUTH MODAL ── */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(42,39,35,0.85)' }}>
          <div
            className="max-w-sm w-full text-center p-8"
            style={{ border: '4px solid var(--ink)', boxShadow: 'var(--shadow-hover)', background: 'var(--parchment)' }}
          >
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ border: '4px solid var(--ink)', background: 'var(--mustard)', boxShadow: 'var(--shadow-sm)' }}>
              <Lock className="w-6 h-6" style={{ color: 'var(--ink)' }} />
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-rye)', color: 'var(--ink)' }}>購買魔力水晶</h3>
            <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'var(--ink)', opacity: 0.65 }}>此咒語需要學院認證才能使用</p>
            <button
              onClick={() => { setIsLoggedIn(true); setShowAuthModal(false); }}
              className="w-full py-3 font-black uppercase transition-all active:translate-x-1 active:translate-y-1 mb-3"
              style={{
                fontFamily: 'var(--font-chivo)',
                border: '3px solid var(--ink)',
                boxShadow: 'var(--shadow-sm)',
                background: 'var(--mustard)',
                color: 'var(--ink)',
              }}
            >
              快速認證（展示通道）
            </button>
            <button
              onClick={() => setShowAuthModal(false)}
              className="text-sm font-bold"
              style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)', opacity: 0.4 }}
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* Copy Toast */}
      {showCopyToast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 500,
            background: 'var(--ink)',
            color: 'var(--parchment)',
            border: '3px solid var(--dark-red)',
            boxShadow: '4px 4px 0 var(--dark-red)',
            padding: '14px 24px',
            fontFamily: 'var(--font-chivo)',
            fontWeight: 700,
            fontSize: '15px',
            textAlign: 'center' as const,
            maxWidth: 360,
            width: '90vw',
            animation: 'toastSlideUp 0.4s ease-out',
          }}
        >
          <span style={{ marginRight: 8 }}>📋</span>
          咒語已複製！開啟 AI 對話框，<span style={{ color: 'var(--mustard)' }}>貼上即可施法</span>
        </div>
      )}
    </>
  );
}
