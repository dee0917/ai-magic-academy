"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MODULE_CONFIG, MODULE_EXPLANATIONS, CAST_LEVELS } from "../lib/constants";
import type { SpellModule, ModuleType } from "../lib/constants";

interface SpellModulesProps {
  modules: SpellModule[];
  totalFields: number;
  /** If true, section starts expanded (desktop). If false, starts collapsed (mobile). */
  defaultExpanded?: boolean;
}

function getFieldsForCastLevel(totalFields: number, castLevelId: string): number {
  const cl = CAST_LEVELS.find(c => c.id === castLevelId);
  if (!cl) return 2;
  return Math.max(2, Math.ceil(totalFields * cl.fieldsRatio));
}

export default function SpellModules({ modules, totalFields, defaultExpanded = false }: SpellModulesProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [expandedChip, setExpandedChip] = useState<ModuleType | null>(null);

  if (!modules || modules.length === 0) return null;

  // Cast level controls how many input fields you fill (the rest auto-filled by AI)
  const quickFields = getFieldsForCastLevel(totalFields, 'quick');
  const stdFields = getFieldsForCastLevel(totalFields, 'standard');
  const fullFields = getFieldsForCastLevel(totalFields, 'full');

  return (
    <div style={{ border: '3px solid var(--ink)', marginBottom: 16 }}>
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2.5"
        style={{
          background: 'rgba(42,39,35,0.08)',
          borderBottom: isExpanded ? '3px solid var(--ink)' : 'none',
        }}
      >
        <span
          className="text-xs font-black uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-chivo)', color: 'var(--ink)' }}
        >
          {'\u{1F9E9}'} 咒語解析 -- Prompt 結構
        </span>
        <span style={{ color: 'var(--ink)', opacity: 0.5 }}>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="p-4">
          {/* Module chips */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {modules.map((mod, idx) => {
              const config = MODULE_CONFIG[mod.type];
              const isChipExpanded = expandedChip === mod.type;
              const isLastOdd = idx === modules.length - 1 && modules.length % 2 === 1;
              return (
                <button
                  key={mod.type}
                  onClick={() => setExpandedChip(isChipExpanded ? null : mod.type)}
                  className={`text-left transition-all h-full ${isLastOdd ? 'col-span-2' : ''}`}
                  style={{
                    border: `2px solid ${config.color}`,
                    background: isChipExpanded ? config.color : `${config.color}15`,
                    padding: '6px 10px',
                    boxShadow: isChipExpanded ? 'none' : `3px 3px 0px ${config.color}40`,
                    transform: isChipExpanded ? 'translate(2px, 2px)' : undefined,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontSize: 14 }}>{config.icon}</span>
                    <span
                      className="text-[10px] font-black"
                      style={{
                        fontFamily: 'var(--font-chivo)',
                        color: isChipExpanded ? '#fff' : config.color,
                      }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <div
                    className="text-[10px] mt-0.5"
                    style={{
                      fontFamily: 'var(--font-noto-sans-tc)',
                      color: isChipExpanded ? 'rgba(255,255,255,0.85)' : 'var(--ink)',
                      opacity: isChipExpanded ? 1 : 0.6,
                    }}
                  >
                    {mod.preview}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded explanation */}
          {expandedChip && (
            <div
              className="p-3 mb-3"
              style={{
                border: `2px solid ${MODULE_CONFIG[expandedChip].color}`,
                background: `${MODULE_CONFIG[expandedChip].color}10`,
              }}
            >
              <p
                className="text-xs leading-relaxed"
                style={{
                  fontFamily: 'var(--font-noto-sans-tc)',
                  color: 'var(--ink)',
                }}
              >
                <span style={{ fontWeight: 900 }}>{MODULE_CONFIG[expandedChip].icon} {MODULE_CONFIG[expandedChip].label}：</span>
                {MODULE_EXPLANATIONS[expandedChip]}
              </p>
            </div>
          )}

          {/* Cast level comparison */}
          <div
            className="px-3 py-2"
            style={{
              background: 'rgba(42,39,35,0.05)',
              border: '2px dashed rgba(42,39,35,0.2)',
            }}
          >
            <p
              className="text-[10px]"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                color: 'var(--ink)',
                opacity: 0.7,
              }}
            >
              {'\u{26A1}'} 本咒由 {modules.length} 個 Prompt 模組構成。速詠填 {quickFields} 格、標準 {stdFields} 格、全力 {fullFields} 格，其餘由 AI 自動補全，填越多越貼合你的情況。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Static version for server components (spell detail page).
 * No expand/collapse, shows all modules with explanations.
 */
export function SpellModulesStatic({ modules, totalFields = 0 }: { modules: SpellModule[]; totalFields?: number }) {
  if (!modules || modules.length === 0) return null;

  const quickFields = getFieldsForCastLevel(totalFields, 'quick');
  const stdFields = getFieldsForCastLevel(totalFields, 'standard');
  const fullFields = getFieldsForCastLevel(totalFields, 'full');

  return (
    <div
      style={{
        border: '3px solid var(--ink)',
        marginBottom: 24,
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2.5"
        style={{
          background: 'rgba(42,39,35,0.08)',
          borderBottom: '3px solid var(--ink)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-chivo)',
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: 'var(--ink)',
          }}
        >
          {'\u{1F9E9}'} 咒語解析 -- Prompt 結構
        </span>
      </div>

      {/* Modules list */}
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
          {modules.map((mod, idx) => {
            const config = MODULE_CONFIG[mod.type];
            const isLastOdd = idx === modules.length - 1 && modules.length % 2 === 1;
            return (
              <div
                key={mod.type}
                style={{
                  gridColumn: isLastOdd ? '1 / -1' : undefined,
                  border: `2px solid ${config.color}`,
                  background: `${config.color}15`,
                  padding: '6px 10px',
                  boxShadow: `3px 3px 0px ${config.color}40`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{config.icon}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-chivo)',
                      fontSize: 10,
                      fontWeight: 900,
                      color: config.color,
                    }}
                  >
                    {config.label}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-noto-sans-tc)',
                    fontSize: 10,
                    color: 'var(--ink)',
                    opacity: 0.6,
                    marginTop: 2,
                  }}
                >
                  {mod.preview}
                </div>
              </div>
            );
          })}
        </div>

        {/* All explanations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {modules.map((mod) => {
            const config = MODULE_CONFIG[mod.type];
            return (
              <div
                key={mod.type}
                style={{
                  padding: '8px 12px',
                  border: `2px solid ${config.color}`,
                  background: `${config.color}10`,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-noto-sans-tc)',
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: 'var(--ink)',
                  }}
                >
                  <span style={{ fontWeight: 900 }}>{config.icon} {config.label}：</span>
                  {MODULE_EXPLANATIONS[mod.type]}
                </p>
              </div>
            );
          })}
        </div>

        {/* Cast level comparison */}
        <div
          style={{
            padding: '8px 12px',
            background: 'rgba(42,39,35,0.05)',
            border: '2px dashed rgba(42,39,35,0.2)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-noto-sans-tc)',
              fontSize: 11,
              color: 'var(--ink)',
              opacity: 0.7,
            }}
          >
            {'\u{26A1}'} 本咒由 {modules.length} 個 Prompt 模組構成。速詠填 {quickFields} 格、標準 {stdFields} 格、全力 {fullFields} 格，其餘由 AI 自動補全，填越多越貼合你的情況。
          </p>
        </div>
      </div>
    </div>
  );
}
