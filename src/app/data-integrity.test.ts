import { describe, it, expect } from "vitest";
import {
  CURSES,
  TIER_CONFIG,
  SCHOOL_CONFIG,
  FORGE_CHARGES,
  FRAGMENT_YIELD,
  FUSION_RECIPES,
} from "./curses_data";
import { QUESTS } from "./lib/quests";

// The entire game is data-driven. These invariants guard against silent
// breakage when someone edits the spell/quest/recipe data by hand.

const ids = CURSES.map((c) => c.id);
const idSet = new Set(ids);

describe("CURSES data integrity", () => {
  it("has unique spell ids (getSpellCode relies on this)", () => {
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it("gives every spell a tier that exists in TIER_CONFIG", () => {
    for (const c of CURSES) {
      expect(TIER_CONFIG, `spell ${c.id} tier ${c.tier}`).toHaveProperty(c.tier);
    }
  });

  it("gives every non-forbidden tier a forge-charge and fragment-yield value", () => {
    for (const tier of Object.keys(TIER_CONFIG)) {
      expect(FORGE_CHARGES).toHaveProperty(tier);
      if (tier !== "forbidden") {
        expect(FRAGMENT_YIELD).toHaveProperty(tier);
      }
    }
  });

  it("gives every spell a school that exists in SCHOOL_CONFIG (when set)", () => {
    for (const c of CURSES as Array<{ id: string; school?: string }>) {
      if (c.school) {
        expect(SCHOOL_CONFIG, `spell ${c.id} school ${c.school}`).toHaveProperty(c.school);
      }
    }
  });

  it("gives every spell a working generate() function", () => {
    for (const c of CURSES as Array<{ id: string; generate?: unknown }>) {
      expect(typeof c.generate, `spell ${c.id}`).toBe("function");
    }
  });
});

describe("FUSION_RECIPES data integrity", () => {
  it("references only spell ids that exist in CURSES", () => {
    for (const [key, val] of Object.entries(FUSION_RECIPES)) {
      const [a, b] = key.split("+");
      expect(idSet.has(a), `recipe ingredient ${a}`).toBe(true);
      expect(idSet.has(b), `recipe ingredient ${b}`).toBe(true);
      expect(idSet.has(val.result), `recipe result ${val.result}`).toBe(true);
    }
  });

  it("never defines both A+B and B+A (would make lookupRecipe ambiguous)", () => {
    const keys = Object.keys(FUSION_RECIPES);
    for (const key of keys) {
      const [a, b] = key.split("+");
      const reversed = `${b}+${a}`;
      expect(keys.includes(reversed), `both ${key} and ${reversed} exist`).toBe(false);
    }
  });

  it("requires a positive number of fragments for every recipe", () => {
    for (const [key, val] of Object.entries(FUSION_RECIPES)) {
      expect(val.fragments_needed, key).toBeGreaterThan(0);
    }
  });
});

describe("QUESTS data integrity", () => {
  const questIds = new Set(QUESTS.map((q) => q.id));

  it("has unique quest ids", () => {
    expect(questIds.size).toBe(QUESTS.length);
  });

  it("references existing quests in every prerequisite", () => {
    for (const q of QUESTS) {
      if (q.prerequisite) {
        expect(questIds.has(q.prerequisite), `${q.id} -> ${q.prerequisite}`).toBe(true);
      }
    }
  });

  it("references existing spells in every cast_full requirement", () => {
    for (const q of QUESTS) {
      if (q.requirement.type === "cast_full" && q.requirement.spellIds) {
        for (const spellId of q.requirement.spellIds) {
          expect(idSet.has(spellId), `quest ${q.id} spell ${spellId}`).toBe(true);
        }
      }
    }
  });

  it("points every quest at a school that exists in SCHOOL_CONFIG", () => {
    for (const q of QUESTS) {
      expect(SCHOOL_CONFIG, `quest ${q.id} school ${q.school}`).toHaveProperty(q.school);
    }
  });

  it("gives collect_school / collect_total requirements a positive count", () => {
    for (const q of QUESTS) {
      const req = q.requirement;
      if (req.type === "collect_school" || req.type === "collect_total") {
        expect(req.count, q.id).toBeGreaterThan(0);
      }
    }
  });
});
