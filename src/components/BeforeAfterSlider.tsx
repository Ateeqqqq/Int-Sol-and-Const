"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronsLeftRight, Sparkles, ArrowUpRight } from "lucide-react";
import MagneticWrapper from "@/components/MagneticWrapper";

const BEFORE_IMAGE_URL =
  "https://raw.githubusercontent.com/Ateeqqqq/interior-solutions-ho-/refs/heads/main/Unfinished%20Living%20Room%20with%20Balcony%20Views.jpg";

const AFTER_IMAGE_URL =
  "https://raw.githubusercontent.com/Ateeqqqq/interior-solutions-ho-/refs/heads/main/Warm%20Modern%20Luxury%20Living%20Room.jpg";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle range input change (covers both mobile touch and desktop drag)
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="relative w-full py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-16 bg-[#F0F0F0] text-[#1A1A1A] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* ====================================================================
            MINIMALIST EDITORIAL HEADER
            ==================================================================== */}
        <div className="text-center max-w-2xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-6 h-px bg-[#C19B6C]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#C19B6C] font-semibold">
              The Transformation
            </span>
            <span className="w-6 h-px bg-[#C19B6C]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-[#1A1A1A]"
          >
            Vision to Reality.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-sans text-sm sm:text-base text-[#1A1A1A]/70 leading-relaxed max-w-xl mx-auto"
          >
            Drag the slider to explore our complete turnkey metamorphosis — from an unfinished bare
            shell to a warm, bespoke architectural sanctuary in Hyderabad.
          </motion.p>
        </div>

        {/* ====================================================================
            INTERACTIVE SLIDER CANVAS CONTAINER
            ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(26,26,26,0.12)] border border-black/[0.08] select-none group bg-black/5"
        >
          {/* 1. AFTER IMAGE (Background Layer) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={AFTER_IMAGE_URL}
              alt="After: Warm Modern Luxury Living Room Completed by Interior Solutions"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center pointer-events-none"
            />
            {/* Subtle bottom gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* 2. BEFORE IMAGE (Foreground Layer - Clipped) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <Image
              src={BEFORE_IMAGE_URL}
              alt="Before: Unfinished Living Room with Balcony Views prior to Interior Solutions Execution"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center pointer-events-none"
            />
            {/* Subtle dark tint over raw construction to highlight contrast */}
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </div>

          {/* 3. CONTEXTUAL PILL BADGES */}
          {/* Before Badge (Left) */}
          <div className="absolute top-5 left-5 z-10 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold">
                Before · Raw Space
              </span>
            </div>
          </div>

          {/* After Badge (Right) */}
          <div className="absolute top-5 right-5 z-10 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C19B6C]/90 backdrop-blur-md border border-white/30 text-white shadow-lg">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold">
                After · Turnkey Living
              </span>
            </div>
          </div>

          {/* 4. VERTICAL GOLD DIVIDER LINE */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#C19B6C] z-20 pointer-events-none shadow-[0_0_16px_rgba(193,155,108,0.8)]"
            style={{
              left: `${sliderPosition}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* Center Circular Handle Button */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-[#1A1A1A] border-2 border-[#C19B6C] shadow-[0_6px_25px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-200 ${
                isHovered ? "scale-110 shadow-[0_8px_30px_rgba(193,155,108,0.5)]" : "scale-100"
              }`}
            >
              <ChevronsLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#C19B6C] transition-transform duration-200" />
            </div>
          </div>

          {/* 5. INVISIBLE FULL-SPAN RANGE INPUT */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleRangeChange}
            aria-label="Before and after transformation slider"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 appearance-none m-0 p-0"
          />

          {/* Bottom Interactive Prompt */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/90 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 hidden sm:inline-block">
              Drag Slider To Compare
            </span>
          </div>
        </motion.div>

        {/* ====================================================================
            CENTERED PRIMARY CALL TO ACTION BUTTON
            ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 flex justify-center w-full"
        >
          <MagneticWrapper strength={0.3}>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-9 sm:px-11 py-4 sm:py-5 text-xs sm:text-sm font-heading font-bold uppercase text-white bg-[#C19B6C] overflow-hidden transition-all duration-500 hover:bg-[#D4AF7A] shadow-[0_12px_35px_rgba(193,155,108,0.35)] hover:shadow-[0_18px_45px_rgba(193,155,108,0.5)] active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-3 tracking-[0.22em] group-hover:tracking-[0.28em] transition-[letter-spacing] duration-300">
                <span>Schedule Design Consultation</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </Link>
          </MagneticWrapper>
        </motion.div>
      </div>
    </section>
  );
}
