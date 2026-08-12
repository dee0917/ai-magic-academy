import { describe, it, expect } from "vitest";
import {
  getSpellCode,
  lookupRecipe,
  getFragmentType,
  FUSION_RECIPES,
  CURSES,
} from "./curses_data";

describe("getSpellCode", () => {
  it("formats as <tierSymbol>-<tabCode>-<3-digit seq>", () => {
    const code = getSpellCode({ tier: "apprentice", tab: "人際擋箭", id: "late_smoke_screen" });
    expect(code).toMatch(/^[ⅠⅡⅢⅣⅤ]-[A-Z]{2}-\d{3}$/);
  });

  it("uses fallback symbols for unknown tier/tab", () => {
    const code = getSpellCode({ tier: "???", tab: "???", id: "nope" });
    expect(code.startsWith("Ⅰ-XX-")).toBe(true);
  });

  it("produces a unique code for every spell in CURSES", () => {
    const codes = CURSES.map((c) => getSpellCode(c));
    expect(new Set(codes).size).toBe(CURSES.length);
  });

  it("numbers spells sequentially within the same tier+tab group", () => {
    const sample = CURSES[0];
    const group = CURSES.filter((c) => c.tier === sample.tier && c.tab === sample.tab);
    const firstSeq = getSpellCode(group[0]).split("-")[2];
    expect(firstSeq).toBe("001");
    if (group.length > 1) {
      expect(getSpellCode(group[1]).split("-")[2]).toBe("002");
    }
  });
});

describe("lookupRecipe", () => {
  const [knownKey, knownVal] = Object.entries(FUSION_RECIPES)[0];
  const [mainId, sacrificeId] = knownKey.split("+");

  it("finds a recipe in the forward direction (main+sacrifice)", () => {
    expect(lookupRecipe(mainId, sacrificeId)).toEqual(knownVal);
  });

  it("finds the same recipe in the reverse direction (sacrifice+main)", () => {
    expect(lookupRecipe(sacrificeId, mainId)).toEqual(knownVal);
  });

  it("returns null when no recipe exists", () => {
    expect(lookupRecipe("late_smoke_screen", "late_smoke_screen")).toBeNull();
    expect(lookupRecipe("__nope__", "__also_nope__")).toBeNull();
  });
});

describe("getFragmentType", () => {
  const [knownKey, knownVal] = Object.entries(FUSION_RECIPES)[0];
  const [mainId, sacrificeId] = knownKey.split("+");

  it("returns the recipe result id as the fragment type", () => {
    expect(getFragmentType(mainId, sacrificeId)).toBe(knownVal.result);
    expect(getFragmentType(sacrificeId, mainId)).toBe(knownVal.result);
  });

  it("returns null when the pair has no recipe", () => {
    expect(getFragmentType("__nope__", "__also_nope__")).toBeNull();
  });
});
