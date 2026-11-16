"use client";

import React from "react";
import Link from "next/link";
import { Phone, Sparkles } from "lucide-react";

export default function MobileStickyBar() {
  return (
    <aside
      aria-label="Mobile Quick Conversion Bar"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1A1A1A] border-t border-[#C19B6C]/30 grid grid-cols-2 divide-x divide-white/10 shadow-[0_-4px_25px_rgba(0,0,0,0.6)]"
    >
      {/* 1. Left Action: Direct Telephone */}
      <a
        href="tel:+919100707409"
        className="flex items-center justify-center gap-2.5 py-3.5 px-4 text-white hover:text-[#C19B6C] active:bg-white/5 transition-colors text-xs font-heading font-bold uppercase tracking-[0.16em] select-none"
      >
        <Phone className="w-4 h-4 text-[#C19B6C] shrink-0" />
        <span>Call Studio</span>
      </a>

      {/* 2. Right Action: Instant Quote Link */}
      <Link
        href="/contact"
        className="flex items-center justify-center gap-2.5 py-3.5 px-4 bg-[#C19B6C] text-[#1A1A1A] hover:bg-white active:bg-white transition-colors text-xs font-heading font-bold uppercase tracking-[0.16em] select-none"
      >
        <Sparkles className="w-4 h-4 text-[#1A1A1A] shrink-0" />
        <span>Get Free Quote</span>
      </Link>
    </aside>
  );
}
