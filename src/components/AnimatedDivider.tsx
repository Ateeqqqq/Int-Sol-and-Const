"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedDividerProps {
  vertical?: boolean;
  className?: string;
  label?: string;
}

export default function AnimatedDivider({
  vertical = false,
  className = "",
  label,
}: AnimatedDividerProps) {
  if (vertical) {
    return (
      <div className={`relative flex flex-col items-center justify-center overflow-hidden py-4 ${className}`}>
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-[1px] h-20 sm:h-28 bg-gradient-to-b from-transparent via-[#C19B6C] to-transparent origin-top"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full flex items-center justify-center overflow-hidden py-4 sm:py-6 ${className}`}>
      <div className="w-full max-w-7xl px-6 sm:px-10 lg:px-16 mx-auto relative flex items-center justify-center">
        {/* Animated Drawing Gold Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C19B6C]/40 to-transparent origin-left"
        />

        {/* Architectural Center Indicator */}
        {label ? (
          <div className="absolute px-4 bg-white flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C19B6C]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#C19B6C] font-semibold">
              {label}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C19B6C]" />
          </div>
        ) : (
          <div className="absolute px-3 bg-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C19B6C]" />
          </div>
        )}
      </div>
    </div>
  );
}
