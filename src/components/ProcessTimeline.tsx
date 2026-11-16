"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineStep {
  number: string;
  title: string;
  description: string;
}

const steps: TimelineStep[] = [
  {
    number: "01",
    title: "Discovery & Consultation",
    description:
      "We begin with an in-depth consultation to understand your vision, lifestyle, and space requirements. Every great design starts with listening — before a single sketch is drawn.",
  },
  {
    number: "02",
    title: "Concept & Mood Board",
    description:
      "Our designers craft a personalized mood board, color palette, and spatial concept tailored to your aesthetic — bridging imagination and architecture.",
  },
  {
    number: "03",
    title: "Design Development",
    description:
      "We present detailed 3D renders, material palettes, furniture layouts, and lighting plans for your review and approval. Revisions are made until the design feels exactly right.",
  },
  {
    number: "04",
    title: "Procurement & Sourcing",
    description:
      "From bespoke furniture to curated décor, we source premium materials and pieces from trusted vendors — ensuring quality, originality, and timely delivery.",
  },
  {
    number: "05",
    title: "Execution & Installation",
    description:
      "Our craftsmen and project managers bring the design to life with precision — on time, within budget, every detail supervised.",
  },
  {
    number: "06",
    title: "Final Reveal",
    description:
      "We style your space, handle every last detail, and hand it over ready to live in. The result: a home that feels entirely, unmistakably yours.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="relative w-full py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-16 bg-white text-[#1A1A1A] overflow-hidden">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* ====================================================================
            1. SECTION HEADER (Centered)
            ==================================================================== */}
        <div className="text-center max-w-3xl mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-6 h-px bg-[#C19B6C]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#C19B6C] font-semibold">
              Our Methodology
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
            From Vision to Sanctuary
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-5 font-sans text-base sm:text-lg text-[#1A1A1A]/70 leading-relaxed max-w-2xl mx-auto"
          >
            A thoughtful journey — from first conversation to final reveal. Every project follows a
            deliberate, transparent process designed to transform your aspirations into built reality.
          </motion.p>
        </div>

        {/* ====================================================================
            2. VERTICAL TIMELINE (Left-Aligned Structure)
            ==================================================================== */}
        <div className="relative w-full max-w-3xl pl-4 sm:pl-8">
          {/* Continuous vertical gray guide line */}
          <div
            className="absolute top-3 bottom-8 left-[22px] sm:left-[38px] w-px bg-black/10 -translate-x-1/2"
            aria-hidden="true"
          />

          <div className="flex flex-col space-y-12 sm:space-y-16">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="relative flex items-start gap-6 sm:gap-10 group"
              >
                {/* Timeline Visual Node: Gold Circle Overlapping Line */}
                <div className="relative z-10 flex-shrink-0 mt-1.5">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#C19B6C] ring-4 ring-white shadow-sm transition-transform duration-300 group-hover:scale-125" />
                </div>

                {/* Content Block */}
                <div className="flex flex-col flex-1 pt-0.5">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#C19B6C]">
                      {step.number}
                    </span>
                    <span className="w-4 h-px bg-[#C19B6C]/40" />
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1A1A1A] tracking-tight transition-colors duration-300 group-hover:text-[#C19B6C]">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 font-sans text-sm sm:text-base text-[#1A1A1A]/70 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
