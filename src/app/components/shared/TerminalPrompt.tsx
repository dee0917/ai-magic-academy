"use client";
import React from "react";
import { HIDDEN_MARKER } from "../../lib/constants";

// Highlight [[variables]] in terminal style
export const renderTerminalVariables = (text: string) => {
  const parts = text.split(/(\[\[.*?\]\])/g);
  return parts.map((part, i) => {
    if (part.startsWith('[[') && part.endsWith(']]')) {
      return (
        <span key={i} className="font-bold px-1"
          style={{ color: '#E8A838', background: 'rgba(232,168,56,0.15)', border: '1px solid rgba(232,168,56,0.3)' }}>
          [{part.slice(2, -2)}]
        </span>
      );
    }
    // Also highlight inline 【section】 headers within text
    const sectionParts = part.split(/(【.+?】)/g);
    if (sectionParts.length > 1) {
      return sectionParts.map((sp, j) => {
        if (sp.startsWith('【') && sp.endsWith('】')) {
          return (
            <span key={`${i}-${j}`} className="inline-block text-sm font-black px-2 py-0.5 mx-1"
              style={{ background: 'var(--mustard)', border: '2px solid rgba(232,168,56,0.6)', color: 'var(--ink)', fontFamily: 'var(--font-noto-serif-tc)' }}>
              {sp}
            </span>
          );
        }
        return <span key={`${i}-${j}`}>{sp}</span>;
      });
    }
    return <span key={i}>{part}</span>;
  });
};

// Helper: Terminal-style spell preview with structured formatting
const TerminalPrompt = ({ text }: { text: string }) => {
  // Split text into lines, then parse each line for structure
  const lines = text.split('\n');
  let ruleCounter = 0;
  // Track consecutive hidden lines to show a single lock hint
  let hiddenGroupShown = false;

  return (
    <div style={{ fontFamily: 'var(--font-noto-sans-tc)', color: 'rgba(244,238,216,0.85)' }}>
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lineIdx} className="h-3" />;

        // Check if this line contains a locked parameter
        const isHiddenParam = trimmed.includes(HIDDEN_MARKER);

        // Section headers like 【任務】【規則】【角色】etc.
        const sectionMatch = trimmed.match(/^【(.+?)】/);
        if (sectionMatch && trimmed === `【${sectionMatch[1]}】`) {
          ruleCounter = 0;
          hiddenGroupShown = false;
          return (
            <div key={lineIdx} className="mt-5 mb-3 first:mt-0">
              <span className="inline-block text-sm font-black px-3 py-1"
                style={{ background: 'var(--mustard)', border: '2px solid rgba(232,168,56,0.6)', color: 'var(--ink)', fontFamily: 'var(--font-noto-serif-tc)' }}>
                【{sectionMatch[1]}】
              </span>
            </div>
          );
        }

        // Numbered rules: lines starting with number + dot or dash
        const numberedMatch = trimmed.match(/^(\d+)[.、．]\s*(.*)/);
        const dashMatchResult = !numberedMatch ? trimmed.match(/^[-–—]\s*(.*)/) : null;

        if (numberedMatch || dashMatchResult) {
          ruleCounter++;
          const content = numberedMatch ? numberedMatch[2] : (dashMatchResult ? dashMatchResult[1] : '');
          if (isHiddenParam) {
            if (!hiddenGroupShown) {
              hiddenGroupShown = true;
              return (
                <div key={lineIdx} className="my-3 py-3 px-4 text-center" style={{ border: '1px dashed rgba(232,168,56,0.4)', background: 'rgba(232,168,56,0.05)' }}>
                  <span className="text-xs font-black tracking-wider" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--mustard)' }}>
                    🔒 提升詠唱等級以解鎖更多參數
                  </span>
                </div>
              );
            }
            return null;
          }
          hiddenGroupShown = false;
          return (
            <div key={lineIdx} className="flex gap-3 mb-3 text-sm leading-relaxed">
              <span className="flex-shrink-0 font-black text-base"
                style={{ color: 'var(--dark-red)', fontFamily: 'var(--font-chivo)', minWidth: '32px' }}>
                {String(ruleCounter).padStart(2, '0')}.
              </span>
              <span>{renderTerminalVariables(content)}</span>
            </div>
          );
        }

        // Regular text line with hidden param
        if (isHiddenParam) {
          if (!hiddenGroupShown) {
            hiddenGroupShown = true;
            return (
              <div key={lineIdx} className="my-3 py-3 px-4 text-center" style={{ border: '1px dashed rgba(232,168,56,0.4)', background: 'rgba(232,168,56,0.05)' }}>
                <span className="text-xs font-black tracking-wider" style={{ fontFamily: 'var(--font-chivo)', color: 'var(--mustard)' }}>
                  🔒 提升詠唱等級以解鎖更多參數
                </span>
              </div>
            );
          }
          return null;
        }

        hiddenGroupShown = false;
        return (
          <div key={lineIdx} className="text-sm leading-relaxed mb-2">
            {renderTerminalVariables(trimmed)}
          </div>
        );
      })}
    </div>
  );
};

export default TerminalPrompt;
