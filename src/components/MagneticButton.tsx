"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface MagneticButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  magneticStrength?: number;
  glowColor?: string;
  ariaLabel?: string;
}

/**
 * MagneticButton:
 * - Magnetic cursor pull on hover using Framer Motion springs
 * - Starts with solid black (#1A1A1A) background
 * - On hover: blooms a warm gold (#C19B6C) ambient glow (box-shadow)
 * - Text tracks out with increasing letter-spacing (e.g. tracking-[0.22em] -> tracking-[0.32em])
 */
export default function MagneticButton({
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  children,
  icon = <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />,
  magneticStrength = 0.35,
  glowColor = "rgba(193, 155, 108, 0.48)",
  ariaLabel,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-precision weighted spring for tactile elastic return
  const springConfig = { damping: 16, stiffness: 240, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * magneticStrength;
    const deltaY = (clientY - centerY) * magneticStrength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Base luxury button styles: solid black bg, expanding letter tracking, blooming gold glow
  const baseButtonClasses = `group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#1A1A1A] text-white font-heading font-bold text-xs uppercase transition-all duration-500 ease-out shadow-md hover:shadow-[0_0_35px_rgba(193,155,108,0.48)] hover:bg-[#1A1A1A] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none overflow-hidden ${className}`;

  // Letter tracking transition wrapper
  const content = (
    <>
      {/* Ambient background bloom layer */}
      <span
        className="absolute inset-0 bg-[#C19B6C] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Text with letter-spacing track out on hover */}
      <span className="relative z-10 tracking-[0.22em] group-hover:tracking-[0.32em] transition-[letter-spacing] duration-300 ease-out flex items-center gap-3">
        <span>{children}</span>
        {icon && <span className="shrink-0">{icon}</span>}
      </span>

      {/* Subtle gold bottom accent glow line */}
      <span
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C19B6C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center ease-out pointer-events-none"
        aria-hidden="true"
      />
    </>
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <Link
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={baseButtonClasses}
        >
          {content}
        </Link>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          aria-label={ariaLabel}
          className={baseButtonClasses}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
}
