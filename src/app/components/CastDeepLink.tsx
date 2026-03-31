"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAcademy } from "../context/AcademyContext";
import { CURSES } from "../lib/constants";

export default function CastDeepLink() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleCardClick } = useAcademy();

  useEffect(() => {
    const castId = searchParams.get("cast");
    if (!castId) return;

    const spell = CURSES.find((c) => c.id === castId);
    if (spell) {
      handleCardClick(spell);
    }

    // Clean URL without triggering navigation/reload
    router.replace("/", { scroll: false });
  }, [searchParams, handleCardClick, router]);

  return null;
}
