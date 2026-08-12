import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuestSystem } from "./useQuestSystem";
import { CURSES } from "../lib/constants";
import { QUESTS } from "../lib/quests";

const QUEST_KEY = "magic-quests";
const TITLES_KEY = "magic-titles";

// Pull real defense spell ids out of the data so the tests track the content.
const defenseIds = (CURSES as Array<{ id: string; school?: string; subSchool?: string }>)
  .filter((c) => c.school === "defense" || c.subSchool === "defense")
  .map((c) => c.id);

const DEFENSE_SPELL = "emotional_blackmail_breaker"; // defense_2's cast_full target

describe("useQuestSystem — cast requirements", () => {
  it("completes cast_any when a spell of the matching school is cast", () => {
    const { result } = renderHook(() => useQuestSystem());
    let events: ReturnType<typeof result.current.checkQuestProgress> = [];
    act(() => {
      events = result.current.checkQuestProgress("cast", {
        spellId: defenseIds[1],
        school: "defense",
        castLevel: "quick",
      });
    });
    const ids = events.map((e) => e.quest.id);
    expect(ids).toContain("defense_1");
    // quick cast should NOT satisfy the cast_full quest (defense_2)
    expect(ids).not.toContain("defense_2");
  });

  it("completes cast_any and the gated cast_full in a single full cast", () => {
    const { result } = renderHook(() => useQuestSystem());
    let events: ReturnType<typeof result.current.checkQuestProgress> = [];
    act(() => {
      events = result.current.checkQuestProgress("cast", {
        spellId: DEFENSE_SPELL,
        school: "defense",
        castLevel: "full",
      });
    });
    const ids = events.map((e) => e.quest.id);
    // defense_1 (cast_any) unlocks, satisfying defense_2's prerequisite in the
    // same pass, and defense_2 (cast_full of this spell) then completes too.
    expect(ids).toContain("defense_1");
    expect(ids).toContain("defense_2");
  });

  it("does not re-complete a quest already completed", () => {
    const { result } = renderHook(() => useQuestSystem());
    act(() => {
      result.current.checkQuestProgress("cast", {
        spellId: defenseIds[1],
        school: "defense",
        castLevel: "quick",
      });
    });
    let second: ReturnType<typeof result.current.checkQuestProgress> = [];
    act(() => {
      second = result.current.checkQuestProgress("cast", {
        spellId: defenseIds[1],
        school: "defense",
        castLevel: "quick",
      });
    });
    expect(second.map((e) => e.quest.id)).not.toContain("defense_1");
  });
});

describe("useQuestSystem — prerequisite gating", () => {
  it("blocks a quest whose prerequisite is unmet", () => {
    const { result } = renderHook(() => useQuestSystem());
    let events: ReturnType<typeof result.current.checkQuestProgress> = [];
    act(() => {
      // defense_4 (fuse_once) requires defense_3, which is not done
      events = result.current.checkQuestProgress("fuse", { fuseSchool: "defense" });
    });
    expect(events.map((e) => e.quest.id)).not.toContain("defense_4");
  });
});

describe("useQuestSystem — collect requirements", () => {
  it("counts unique collected cards, ignoring duplicates", () => {
    const { result } = renderHook(() => useQuestSystem());
    // satisfy defense_1 + defense_2 so defense_3's prerequisite is met
    act(() => {
      result.current.checkQuestProgress("cast", {
        spellId: DEFENSE_SPELL,
        school: "defense",
        castLevel: "full",
      });
    });

    // three copies of ONE defense card = 1 unique -> defense_3 (needs 3) not done
    let events: ReturnType<typeof result.current.checkQuestProgress> = [];
    act(() => {
      events = result.current.checkQuestProgress("collect", {
        collectedCards: [defenseIds[0], defenseIds[0], defenseIds[0]],
      });
    });
    expect(events.map((e) => e.quest.id)).not.toContain("defense_3");

    // three DISTINCT defense cards -> defense_3 completes
    act(() => {
      events = result.current.checkQuestProgress("collect", {
        collectedCards: [defenseIds[0], defenseIds[1], defenseIds[2]],
      });
    });
    expect(events.map((e) => e.quest.id)).toContain("defense_3");
  });
});

describe("useQuestSystem — full school chain, titles & progress", () => {
  it("walks defense 1->4, awards the title, and reports progress", () => {
    const { result } = renderHook(() => useQuestSystem());

    act(() => {
      result.current.checkQuestProgress("cast", {
        spellId: DEFENSE_SPELL,
        school: "defense",
        castLevel: "full",
      });
    });
    act(() => {
      result.current.checkQuestProgress("collect", {
        collectedCards: [defenseIds[0], defenseIds[1], defenseIds[2]],
      });
    });
    let fuseEvents: ReturnType<typeof result.current.checkQuestProgress> = [];
    act(() => {
      fuseEvents = result.current.checkQuestProgress("fuse", { fuseSchool: "defense" });
    });

    // defense_4 grants a title reward
    expect(fuseEvents.map((e) => e.quest.id)).toContain("defense_4");
    const titleReward = QUESTS.find((q) => q.id === "defense_4")!.reward.value as string;
    expect(result.current.earnedTitles).toContain(titleReward);
    expect(JSON.parse(localStorage.getItem(TITLES_KEY) ?? "[]")).toContain(titleReward);

    // all four defense quests are now complete
    expect(result.current.getSchoolProgress("defense")).toEqual({ completed: 4, total: 4 });
    expect(JSON.parse(localStorage.getItem(QUEST_KEY) ?? "[]")).toEqual(
      expect.arrayContaining(["defense_1", "defense_2", "defense_3", "defense_4"]),
    );

    // no active defense quest remains; getRequirementStatus reports done
    expect(result.current.getActiveQuests().some((q) => q.school === "defense")).toBe(false);
    const defense1 = QUESTS.find((q) => q.id === "defense_1")!;
    expect(result.current.getRequirementStatus(defense1, [])).toBe("已完成");
  });
});

describe("useQuestSystem — getActiveQuests", () => {
  it("returns the first uncompleted quest for each of the six schools initially", () => {
    const { result } = renderHook(() => useQuestSystem());
    const active = result.current.getActiveQuests();
    const schools = active.map((q) => q.school).sort();
    expect(schools).toEqual(
      ["attack", "contract", "defense", "healing", "illusion", "insight"].sort(),
    );
    // each returned quest is the order-1 entry (no prerequisite)
    for (const q of active) expect(q.order).toBe(1);
  });
});
