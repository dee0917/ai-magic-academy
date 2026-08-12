import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMPSystem, COLLECTION_MILESTONES } from "./useMPSystem";

const MP_KEY = "magic-mp";
const LOGIN_DATE_KEY = "magic-last-login";
const MILESTONES_KEY = "magic-milestones-claimed";

const today = () => new Date().toISOString().slice(0, 10);

describe("useMPSystem — initialization", () => {
  it("starts at MAX_MP when nothing is stored", () => {
    localStorage.setItem(LOGIN_DATE_KEY, today()); // suppress daily-login bump
    const { result } = renderHook(() => useMPSystem());
    expect(result.current.mp).toBe(result.current.MAX_MP);
  });

  it("restores a stored MP value, clamped to MAX_MP", () => {
    localStorage.setItem(LOGIN_DATE_KEY, today());
    localStorage.setItem(MP_KEY, "999");
    const { result } = renderHook(() => useMPSystem());
    expect(result.current.mp).toBe(result.current.MAX_MP);
  });
});

describe("useMPSystem — daily login recovery", () => {
  it("grants DAILY_MP once per new calendar day", () => {
    localStorage.setItem(MP_KEY, "10");
    localStorage.setItem(LOGIN_DATE_KEY, "2000-01-01"); // stale -> should recover
    const { result } = renderHook(() => useMPSystem());
    // 10 + 5 daily = 15
    expect(result.current.mp).toBe(15);
    expect(localStorage.getItem(LOGIN_DATE_KEY)).toBe(today());
  });

  it("does not grant again when already logged in today", () => {
    localStorage.setItem(MP_KEY, "10");
    localStorage.setItem(LOGIN_DATE_KEY, today());
    const { result } = renderHook(() => useMPSystem());
    expect(result.current.mp).toBe(10);
  });
});

describe("useMPSystem — saveMp clamping", () => {
  it("clamps saved MP to [0, MAX_MP] and persists it", () => {
    localStorage.setItem(LOGIN_DATE_KEY, today());
    const { result } = renderHook(() => useMPSystem());

    act(() => result.current.saveMp(999));
    expect(result.current.mp).toBe(result.current.MAX_MP);
    expect(localStorage.getItem(MP_KEY)).toBe(String(result.current.MAX_MP));

    act(() => result.current.saveMp(-50));
    expect(result.current.mp).toBe(0);
    expect(localStorage.getItem(MP_KEY)).toBe("0");
  });
});

describe("useMPSystem — milestone rewards", () => {
  it("grants each collection milestone exactly once", () => {
    localStorage.setItem(LOGIN_DATE_KEY, today());
    const { result } = renderHook(() => useMPSystem());
    act(() => result.current.saveMp(0)); // make room to observe the bonus

    let bonus = 0;
    act(() => {
      bonus = result.current.checkMilestoneRewards(3);
    });
    expect(bonus).toBe(COLLECTION_MILESTONES[3]); // 3
    expect(result.current.mp).toBe(COLLECTION_MILESTONES[3]);

    // second call at same count: already claimed -> no bonus
    act(() => {
      bonus = result.current.checkMilestoneRewards(3);
    });
    expect(bonus).toBe(0);
  });

  it("grants every unclaimed threshold at or below the count in one call", () => {
    localStorage.setItem(LOGIN_DATE_KEY, today());
    const { result } = renderHook(() => useMPSystem());
    act(() => result.current.saveMp(0));

    let bonus = 0;
    act(() => {
      bonus = result.current.checkMilestoneRewards(15);
    });
    // 3 + 5 + 8 + 15 = 31, but MP is clamped to MAX_MP
    const expected = Object.entries(COLLECTION_MILESTONES)
      .filter(([t]) => Number(t) <= 15)
      .reduce((sum, [, v]) => sum + v, 0);
    expect(bonus).toBe(expected);
    expect(result.current.mp).toBe(result.current.MAX_MP);

    // persisted claimed milestones cover all four thresholds
    const claimed = JSON.parse(localStorage.getItem(MILESTONES_KEY) ?? "[]");
    expect(claimed.sort((a: number, b: number) => a - b)).toEqual([3, 5, 8, 15]);
  });

  it("grants nothing when the count is below the lowest threshold", () => {
    localStorage.setItem(LOGIN_DATE_KEY, today());
    const { result } = renderHook(() => useMPSystem());
    let bonus = -1;
    act(() => {
      bonus = result.current.checkMilestoneRewards(2);
    });
    expect(bonus).toBe(0);
  });
});
