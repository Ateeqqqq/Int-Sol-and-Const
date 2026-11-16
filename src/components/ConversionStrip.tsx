import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";

interface ConversionStripProps {
  badge?: string;
  hook?: string;
  subhook?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

export default function ConversionStrip({
  badge = "BESPOKE ARCHITECTURE · HYDERABAD",
  hook = "Have a floor plan ready? Get a tailored 2D/3D layout & quote from our principal architects.",
  subhook,
  primaryCtaText = "Book Free Site Visit",
  primaryCtaHref = "/contact",
  secondaryCtaText = "WhatsApp Us Instantly",
  secondaryCtaHref = "https://wa.me/919100707409?text=Hello%20Interior%20Solutions,%20I%20would%20like%20to%20inquire%20about%20interior%20design%20services.",
  className = "",
}: ConversionStripProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 my-10 sm:my-14 ${className}`}>
      <div className="border border-[#C19B6C]/30 bg-[#FAFAFA] p-6 sm:p-8 lg:p-9 rounded-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm hover:border-[#C19B6C]/50 transition-all">
        {/* Left Hook Text */}
        <div className="max-w-2xl">
          {badge && (
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C19B6C]" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#C19B6C] font-semibold">
                {badge}
              </span>
            </div>
          )}
          <h3 className="font-heading font-bold text-lg sm:text-xl lg:text-2xl text-[#1A1A1A] leading-snug tracking-tight">
            {hook}
          </h3>
          {subhook && (
            <p className="mt-1 text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
              {subhook}
            </p>
          )}
        </div>

        {/* Right Conversion Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
          {/* Primary CTA */}
          <Link
            href={primaryCtaHref}
            className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white hover:bg-[#C19B6C] hover:text-[#1A1A1A] px-7 py-4 text-xs font-bold font-heading uppercase tracking-widest transition-all duration-300 shadow-sm active:scale-95 text-center"
          >
            <span>{primaryCtaText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Secondary WhatsApp CTA */}
          <a
            href={secondaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] hover:border-[#C19B6C] hover:text-[#C19B6C] hover:bg-white px-7 py-4 text-xs font-bold font-heading uppercase tracking-widest transition-all duration-300 shadow-sm active:scale-95 text-center"
          >
            <MessageCircle className="w-4 h-4 text-[#C19B6C]" />
            <span>{secondaryCtaText}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
