import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  // Use the automatic JSX runtime so test files (and the JSX-bearing
  // curses_data module) transform without needing React in scope.
  esbuild: { jsx: "automatic", jsxImportSource: "react" },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/app/**/*.{ts,tsx}"],
    },
  },
});
