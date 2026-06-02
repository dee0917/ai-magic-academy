"use client";
import { useEffect } from "react";
import posthog from "posthog-js";

/**
 * Initializes PostHog client-side analytics.
 * Key comes from NEXT_PUBLIC_POSTHOG_KEY (set as a Vercel env var, never committed).
 * If the key is absent (e.g. local build), PostHog simply does not initialize.
 */
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (typeof window === "undefined" || !key) return;
    if ((posthog as any).__loaded) return;
    posthog.init(key, {
      api_host: "https://us.i.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      persistence: "localStorage",
    });
  }, []);

  return <>{children}</>;
}
