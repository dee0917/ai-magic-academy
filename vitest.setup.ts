import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, vi } from "vitest";

// jsdom provides window.localStorage, but reset it between tests so persisted
// game state (MP, quests, collection, fragments) never leaks across cases.
beforeEach(() => {
  try {
    window.localStorage.clear();
  } catch {
    /* no localStorage in this environment */
  }
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});
