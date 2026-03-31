"use client";
import React from "react";
import { AcademyProvider } from "./context/AcademyContext";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import SpellBrowser from "./components/SpellBrowser";
import CastingModal from "./components/CastingModal";
import SpellBookModal from "./components/SpellBookModal";
import PortalOverlay from "./components/PortalOverlay";

export default function MagicAcademyMVP() {
  return (
    <AcademyProvider>
      <div className="min-h-screen w-full parchment-bg" style={{ color: 'var(--ink)' }}>
        <NavBar />
        <HeroSection />
        <SpellBrowser />
        <CastingModal />
        <SpellBookModal />
        <PortalOverlay />

        <style jsx>{`
          @keyframes toastSlideUp {
            from { opacity: 0; transform: translateX(-50%) translateY(30px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
        `}</style>
      </div>
    </AcademyProvider>
  );
}
