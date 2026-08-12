import { describe, it, expect } from "vitest";
import {
  getFieldVisibility,
  getMpCost,
  getTabColor,
  TABS,
} from "./constants";
import { CAST_LEVELS, TIER_CONFIG } from "../curses_data";

describe("getFieldVisibility", () => {
  it("returns at least 2 fields even for tiny spells / low cast levels", () => {
    // quick = 0.4 ratio; 1 field * 0.4 rounds to 1 but is floored to 2
    expect(getFieldVisibility(1, "quick")).toBe(2);
    expect(getFieldVisibility(0, "quick")).toBe(2);
  });

  it("scales with the cast level's fieldsRatio (ceil)", () => {
    // 5 fields: quick 0.4 -> ceil(2)=2, standard 0.7 -> ceil(3.5)=4, full 1.0 -> 5
    expect(getFieldVisibility(5, "quick")).toBe(2);
    expect(getFieldVisibility(5, "standard")).toBe(4);
    expect(getFieldVisibility(5, "full")).toBe(5);
  });

  it("reveals every field at full cast", () => {
    for (const n of [2, 3, 6, 10]) {
      expect(getFieldVisibility(n, "full")).toBe(n);
    }
  });

  it("falls back to 2 for an unknown cast level", () => {
    expect(getFieldVisibility(10, "does-not-exist")).toBe(2);
  });
});

describe("getMpCost", () => {
  it("multiplies the cast level base cost by the tier multiplier", () => {
    // apprentice multiplier = 1
    const apprentice = { tier: "apprentice" };
    expect(getMpCost(apprentice, "quick")).toBe(1 * 1);
    expect(getMpCost(apprentice, "standard")).toBe(2 * 1);
    expect(getMpCost(apprentice, "full")).toBe(3 * 1);

    // archmage multiplier = 5
    const archmage = { tier: "archmage" };
    expect(getMpCost(archmage, "full")).toBe(3 * 5);
  });

  it("stays consistent with CAST_LEVELS x TIER_CONFIG for every combination", () => {
    for (const cl of CAST_LEVELS) {
      for (const [tier, cfg] of Object.entries(TIER_CONFIG)) {
        expect(getMpCost({ tier }, cl.id)).toBe(cl.mpBase * cfg.mpMultiplier);
      }
    }
  });

  it("defaults an unknown tier to apprentice", () => {
    // undefined tier -> 'apprentice' (multiplier 1)
    expect(getMpCost({}, "standard")).toBe(2);
    expect(getMpCost(undefined, "standard")).toBe(2);
  });

  it("returns 1 for an unknown cast level", () => {
    expect(getMpCost({ tier: "master" }, "nope")).toBe(1);
  });
});

describe("getTabColor", () => {
  it("returns a distinct color for each known tab", () => {
    const colors = TABS.map(getTabColor);
    // every tab maps to a hex color
    for (const c of colors) expect(c).toMatch(/^#[0-9A-Fa-f]{6}$/);
    // and the mapped colors are unique per tab
    expect(new Set(colors).size).toBe(TABS.length);
  });

  it("falls back to the default teal for an unknown tab", () => {
    expect(getTabColor("不存在的分頁")).toBe("#1A5C5A");
  });
});
