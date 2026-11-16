"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import MagneticWrapper from "@/components/MagneticWrapper";

// High-end editorial easing curve
const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Scroll parallax hook bound to standard native scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Multilayered parallax scroll offsets
  const yHeadline = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yEditorialNotes = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Smooth scroll trigger to services / spaces section using native smooth scroll
  const handleScrollToSpaces = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#services");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0D0D0D] text-white overflow-hidden flex flex-col justify-between pt-0 pb-12 px-6 sm:px-12 lg:px-20 selection:bg-[#C19B6C] selection:text-white"
    >
      {/* ====================================================================
          CINEMATIC VIDEO BACKGROUND: Zoomed-in Architectural Motion Texture
          ==================================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          src="https://res.cloudinary.com/tweajo9y/video/upload/v1794818166/Architectural_interior_video_mon__8f030a29_1080p.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-110 sm:scale-125"
        />

        {/* Dark contrast overlays for crisp white typography */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* ====================================================================
          TOP SUB-BAR: Hyderabad Location & Leadership Tag
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
        className="relative z-20 flex items-center justify-between w-full border-b border-white/10 pt-20 sm:pt-24 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C19B6C] animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-white font-semibold">
            Leading Interior Design Experts · Hyderabad
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[10px] sm:text-[11px] text-white">
          <span className="hidden sm:inline font-semibold">TOLICHOWKI · JUBILEE HILLS · BANJARA HILLS</span>
          <span className="text-[#C19B6C] font-medium">EST. 2014</span>
        </div>
      </motion.div>

      {/* ====================================================================
          HERO CORE: Authoritative Headline & Narrative (Full Width Editorial)
          ==================================================================== */}
      <div className="relative z-10 w-full my-auto py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* -------------------------------------------------------------
            MAIN: Massive Montserrat Headline & CTA
            ------------------------------------------------------------- */}
        <motion.div
          style={{ y: yHeadline }}
          className="lg:col-span-12 max-w-4xl flex flex-col items-start pr-0"
        >
          {/* Subtle White Sub-Heading with Gold Dash */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-[#C19B6C]" />
            <span className="text-xs font-mono uppercase tracking-[0.28em] text-white font-semibold">
              Premium Interior Designing in Hyderabad
            </span>
          </motion.div>

          {/* Massive Montserrat Headline (Instant Reveal to Fix Lag) */}
          <div className="w-full flex flex-col">
            <div className="overflow-hidden w-full">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
                className="font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.75rem] tracking-[-0.04em] leading-[0.9] uppercase text-white"
              >
                Modern
              </motion.h1>
            </div>

            <div className="overflow-hidden w-full mt-1 sm:mt-2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
                className="font-heading font-light text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.75rem] tracking-[-0.04em] leading-[0.9] uppercase text-white"
              >
                Living <span className="font-extrabold italic text-[#C19B6C]">Spaces</span>
              </motion.h1>
            </div>
          </div>

          {/* Authoritative Body Paragraph strictly in Pure White */}
          <motion.div
            style={{ y: yEditorialNotes }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
            className="mt-8 sm:mt-10 max-w-xl"
          >
            <p className="font-sans text-base sm:text-lg text-white font-normal leading-relaxed">
              Interior Solutions designs and delivers luxury residential and commercial interiors across
              Hyderabad. From inviting living rooms and serene bedroom sanctuaries to bespoke dining
              areas, modular kitchens, and custom accent styling, we provide complete turnkey execution.
            </p>
          </motion.div>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
            className="mt-10 sm:mt-12 flex flex-wrap items-center gap-6"
          >
            {/* Primary Gold CTA with Magnetic Physics */}
            <MagneticWrapper strength={0.3}>
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-9 sm:px-11 py-4 sm:py-5 text-xs sm:text-sm font-heading font-bold uppercase text-white bg-[#C19B6C] overflow-hidden transition-all duration-500 hover:bg-[#D4AF7A] shadow-[0_12px_35px_rgba(193,155,108,0.35)] hover:shadow-[0_18px_45px_rgba(193,155,108,0.5)] active:translate-y-0"
              >
                <span className="relative z-10 flex items-center gap-3 tracking-[0.22em] group-hover:tracking-[0.28em] transition-[letter-spacing] duration-300">
                  <span>Schedule Design Consultation</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </a>
            </MagneticWrapper>

            {/* Secondary Ghost Link with Magnetic Physics */}
            <MagneticWrapper strength={0.2}>
              <a
                href="#services"
                onClick={handleScrollToSpaces}
                className="inline-flex items-center gap-3 px-6 py-4 text-xs sm:text-sm font-heading font-semibold uppercase tracking-[0.2em] group-hover:tracking-[0.26em] text-white hover:text-[#C19B6C] transition-all duration-300 relative group"
              >
                <span>Explore Living Spaces</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C19B6C]" />
                <span className="absolute bottom-2 left-6 right-6 h-[2px] bg-[#C19B6C] scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
              </a>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </div>

      {/* ====================================================================
          BOTTOM ROW: 5 Core Spaces Strip & Scroll Cue
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
        className="relative z-20 w-full flex items-end justify-between pt-6 border-t border-white/10"
      >
        <a
          href="#services"
          onClick={handleScrollToSpaces}
          className="group inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-white/80 hover:text-[#C19B6C] transition-colors"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/30 group-hover:border-[#C19B6C] flex items-start justify-center p-1 transition-colors"
          >
            <div className="w-1 h-2 rounded-full bg-[#C19B6C]" />
          </motion.div>
          <span className="hidden sm:inline">Scroll To Explore Spaces</span>
          <ArrowDown className="w-3.5 h-3.5 sm:hidden" />
        </a>

        {/* 5 Core Living Spaces Integration */}
        <div className="flex items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white">
          <span className="font-semibold">LIVING</span>
          <span className="text-[#C19B6C]">·</span>
          <span className="font-semibold">BEDROOM</span>
          <span className="text-[#C19B6C]">·</span>
          <span className="font-semibold">DINING</span>
          <span className="text-[#C19B6C]">·</span>
          <span className="font-semibold">KITCHEN</span>
          <span className="text-[#C19B6C]">·</span>
          <span className="font-semibold text-[#C19B6C]">ACCENT</span>
        </div>
      </motion.div>
    </section>
  );
}
