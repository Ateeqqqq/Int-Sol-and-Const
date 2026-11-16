"use client";

import React from "react";
import { motion, useScroll } from "framer-motion";

interface GlobalEffectsProps {
  children?: React.ReactNode;
}

export default function GlobalEffects({ children }: GlobalEffectsProps) {
  // Top viewport scroll progress tracking
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* ====================================================================
          1. SCROLL PROGRESS BAR: 1px Fixed Gold Line at Viewport Top
          ==================================================================== */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-[#C19B6C] origin-left z-[100] pointer-events-none shadow-[0_0_10px_rgba(193,155,108,0.7)]"
        aria-hidden="true"
      />

      {/* ====================================================================
          2. AMBIENT GOLD GLOWS: Two Massive, Slow-Drifting Background Orbs
             - STRICTLY z-index: -1, pointer-events: none, positioned behind main content
          ==================================================================== */}
      <div
        style={{ zIndex: -1 }}
        className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10"
        aria-hidden="true"
      >
        {/* Orb 1: Upper Left-Center (Slow 25s Drift) */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, 60, 20, 0],
            scale: [1, 1.12, 0.96, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] rounded-full bg-gradient-to-br from-[#C19B6C]/[0.06] via-[#C19B6C]/[0.025] to-transparent blur-[140px] sm:blur-[180px] pointer-events-none"
        />

        {/* Orb 2: Lower Right-Center (Slow 28s Counter-Drift) */}
        <motion.div
          animate={{
            x: [0, -90, 50, 0],
            y: [0, -70, -15, 0],
            scale: [1, 0.94, 1.1, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -right-32 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] rounded-full bg-gradient-to-tl from-[#C19B6C]/[0.07] via-[#C19B6C]/[0.025] to-transparent blur-[150px] sm:blur-[190px] pointer-events-none"
        />
      </div>

      {/* 3. PASS-THROUGH CHILDREN */}
      {children}
    </>
  );
}
