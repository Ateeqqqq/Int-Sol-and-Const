import React from "react";
import Image from "next/image";

const detailingPoints = [
  "Space planning & furniture layouts",
  "Electrical & lighting plans",
  "False ceiling & flooring details",
  "Modular kitchen & wardrobe designs",
  "Custom furniture & carpentry drawings",
];

export default function BlueprintSection() {
  return (
    <section id="blueprint" className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* 1. Left Column (Image) - Stacks on top on mobile */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] min-h-[380px] sm:min-h-[500px] rounded-2xl overflow-hidden border border-gray-200/90 shadow-xl bg-white group">
              <Image
                src="https://raw.githubusercontent.com/Ateeqqqq/interior-solutions-ho-/refs/heads/main/WhatsApp%20Image%202026-11-16%20at%203.24.56%20PM.jpeg"
                alt="Interior Solutions 2D Architectural Detailing Blueprint"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Architectural Cadence Tag */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200 text-[10px] font-mono tracking-widest uppercase text-[#1A1A1A] font-bold shadow-sm">
                CAD · Technical Layout
              </div>

              {/* Subtle architectural grid vignette overlay */}
              <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
            </div>
          </div>

          {/* 2. Right Column (Editorial Content) */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div>
              {/* Subheading */}
              <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-bold block mb-3">
                2D DETAILING
              </span>

              {/* Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#1A1A1A] leading-[1.08]">
                The Blueprint of Perfection
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                At Interior Solutions, 2D detailing is the foundation that turns creative ideas into flawless reality. It is not just a drawing—it is a precise technical roadmap that ensures every element of your space is executed exactly as planned.
              </p>
              <p>
                We develop highly detailed and accurate layouts that define every inch of your interior—from furniture placement and space planning to electrical points, lighting, ceilings, and custom carpentry. These drawings provide complete clarity, eliminating guesswork and ensuring smooth coordination between designers, clients, and execution teams.
              </p>
              <p>
                Every line we draw has a purpose. Every dimension is calculated with precision. This allows us to maintain consistency, avoid costly errors, and deliver results that match the design vision perfectly.
              </p>
            </div>

            {/* Bullet Points */}
            <div className="pt-2">
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#1A1A1A] mb-3">
                Our 2D detailing includes:
              </h3>
              <ul className="space-y-2.5">
                {detailingPoints.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-gray-600 font-sans">
                    <span className="w-2 h-2 rounded-full bg-[#C19B6C] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Closing Statement */}
            <div className="pt-4 border-t border-gray-200">
              <p className="border-l-2 border-[#C19B6C] pl-4 font-sans text-sm sm:text-base text-gray-700 italic leading-relaxed">
                With our expertise in 2D detailing, you don&apos;t just see the design—you understand it, trust it, and experience a seamless execution process. At Interior Solutions, precision is not an option—it&apos;s our standard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
