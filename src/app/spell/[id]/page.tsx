import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CURSES, TIER_CONFIG, SCHOOL_CONFIG } from "../../lib/constants";
import { SchoolType } from "../../curses_data";
import { SpellModulesStatic } from "../../components/SpellModules";

interface SpellPageProps {
  params: Promise<{ id: string }>;
}

function findSpell(id: string) {
  return CURSES.find((c) => c.id === id) ?? null;
}

export async function generateMetadata({ params }: SpellPageProps): Promise<Metadata> {
  const { id } = await params;
  const spell = findSpell(id);

  if (!spell) {
    return { title: "咒語不存在 | AI 魔法學院" };
  }

  const description = spell.desc.length > 160 ? spell.desc.slice(0, 157) + "..." : spell.desc;

  return {
    title: `${spell.title} | AI 魔法學院`,
    description,
    openGraph: {
      title: `${spell.title} | AI 魔法學院`,
      description,
      url: `https://ai-magic-academy.vercel.app/spell/${spell.id}`,
      siteName: "AI 魔法學院",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${spell.title} | AI 魔法學院`,
      description,
    },
  };
}

export async function generateStaticParams() {
  return CURSES.map((c) => ({ id: c.id }));
}

export default async function SpellPage({ params }: SpellPageProps) {
  const { id } = await params;
  const spell = findSpell(id);

  if (!spell) {
    notFound();
  }

  const tierConfig = TIER_CONFIG[spell.tier];
  const schoolConfig = SCHOOL_CONFIG[spell.school as SchoolType];

  const TIER_BADGE_BG: Record<string, string> = {
    apprentice: "#6B7280",
    adept: "#2563EB",
    master: "#7C3AED",
    archmage: "#DC2626",
    forbidden: "#B8860B",
  };

  return (
    <div
      className="min-h-screen w-full parchment-bg flex flex-col items-center px-4 py-12"
      style={{ color: "var(--ink)" }}
    >
      {/* Spell detail card */}
      <div
        style={{
          maxWidth: 540,
          width: "100%",
          background: "var(--parchment)",
          border: "4px solid var(--ink)",
          boxShadow: "8px 8px 0px var(--ink)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Halftone overlay */}
        <div
          className="halftone-bg"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />

        {/* Tier color bar */}
        <div
          style={{
            height: 8,
            background: TIER_BADGE_BG[spell.tier] || "#6B7280",
          }}
        />

        <div style={{ padding: "32px 32px 24px", position: "relative" }}>
          {/* Tier badge */}
          <div
            style={{
              display: "inline-block",
              background: TIER_BADGE_BG[spell.tier],
              color: "#fff",
              fontSize: 12,
              fontWeight: 900,
              fontFamily: "var(--font-noto-serif-tc)",
              padding: "4px 14px",
              marginBottom: 8,
            }}
          >
            {tierConfig.label}級咒語
          </div>

          {/* School badge */}
          <div
            style={{
              display: "inline-block",
              marginLeft: 8,
              background: schoolConfig.color,
              color: "#fff",
              fontSize: 12,
              fontWeight: 900,
              fontFamily: "var(--font-noto-serif-tc)",
              padding: "4px 14px",
              marginBottom: 8,
            }}
          >
            {schoolConfig.emoji} {schoolConfig.label}學派
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-noto-serif-tc)",
              fontSize: 28,
              fontWeight: 900,
              color: "var(--ink)",
              lineHeight: 1.3,
              marginTop: 12,
              marginBottom: 14,
            }}
          >
            {spell.title}
          </h1>

          {/* Divider */}
          <div style={{ height: 3, background: "var(--ink)", marginBottom: 16 }} />

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-noto-sans-tc)",
              fontSize: 15,
              lineHeight: 1.8,
              color: "var(--ink)",
              marginBottom: 20,
            }}
          >
            {spell.desc}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {spell.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "var(--font-chivo)",
                  color: "var(--ink)",
                  background: "rgba(232,168,56,0.2)",
                  border: "2px solid rgba(232,168,56,0.5)",
                  padding: "3px 10px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Category */}
          <div
            style={{
              fontFamily: "var(--font-chivo)",
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(42,39,35,0.4)",
              letterSpacing: "0.08em",
              marginBottom: 20,
            }}
          >
            {spell.tab}
          </div>

          {/* Theory / psychology reference */}
          {spell.theory && (
            <div
              style={{
                background: "rgba(42,39,35,0.06)",
                border: "2px solid rgba(42,39,35,0.15)",
                padding: "16px 18px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-noto-serif-tc)",
                  fontSize: 13,
                  fontWeight: 900,
                  color: "var(--ink)",
                  marginBottom: 8,
                }}
              >
                理論基礎
              </div>
              <p
                style={{
                  fontFamily: "var(--font-noto-sans-tc)",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "rgba(42,39,35,0.7)",
                }}
              >
                {spell.theory}
              </p>
            </div>
          )}

          {/* Spell Modules - prompt structure analysis */}
          {(spell as any).modules && (spell as any).modules.length > 0 && (
            <SpellModulesStatic modules={(spell as any).modules} />
          )}

          {/* CTA Button */}
          <Link
            href={`/?cast=${spell.id}`}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              background: "var(--mustard)",
              color: "var(--ink)",
              border: "3px solid var(--ink)",
              boxShadow: "4px 4px 0px var(--ink)",
              padding: "14px 0",
              fontFamily: "var(--font-noto-serif-tc)",
              fontSize: 18,
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            前往學院施法
          </Link>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            background: "var(--ink)",
            padding: "12px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-rye, var(--font-display))",
              fontSize: 14,
              color: "var(--mustard)",
              fontWeight: 700,
            }}
          >
            AI 魔法學院
          </span>
          <span
            style={{
              fontFamily: "var(--font-chivo)",
              fontSize: 10,
              color: "rgba(244,238,216,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            ai-magic-academy.vercel.app
          </span>
        </div>
      </div>
    </div>
  );
}
