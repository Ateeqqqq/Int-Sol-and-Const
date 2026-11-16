"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedDivider from "@/components/AnimatedDivider";
import MagneticButton from "@/components/MagneticButton";
import ConversionStrip from "@/components/ConversionStrip";
import {
  ArrowRight,
  Compass,
  Award,
  CheckCircle2,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
} from "lucide-react";

// Editorial easing curve for effortless, airy anti-gravity motion
const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

// Text stagger variants for line-by-line reveals
const headingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 },
  },
};

const headingLineVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EDITORIAL_EASE },
  },
};

// Section 3: Our Design Philosophy Pillars
const philosophyPillars = [
  {
    number: "01",
    label: "Aesthetics & Comfort",
    category: "Atmosphere & Palette",
    description:
      "Creating atmospheric serenity through balanced palettes, warm ambient lighting, and bespoke ergonomic furnishings that soothe the senses.",
    videoUrl:
      "https://res.cloudinary.com/tweajo9y/video/upload/v1794768160/WhatsApp_Video_2026-11-13_at_10.40.40_PM.mp4",
  },
  {
    number: "02",
    label: "Space Planning",
    category: "Flow & Proportions",
    description:
      "Sculpting uncluttered circulation, intuitive spatial zones, and intelligent modular storage tailored specifically to your family's daily lifestyle.",
    videoUrl:
      "https://res.cloudinary.com/tweajo9y/video/upload/v1794768160/WhatsApp_Video_2026-11-13_at_10.40.40_PM_1.mp4",
  },
  {
    number: "03",
    label: "Attention to Detail",
    category: "Precision & Craft",
    description:
      "Engineering micro-tolerance millwork, seamless architectural transitions, and durable surface treatments built to withstand everyday living.",
    videoUrl:
      "https://res.cloudinary.com/tweajo9y/video/upload/v1794768159/WhatsApp_Video_2026-11-13_at_10.40.41_PM.mp4",
  },
];

// Section 4: Areas of Expertise Bento Cards
const areasOfExpertise = [
  {
    title: "Living Spaces",
    kicker: "01 / Architectural Lounge",
    description:
      "Expansive social environments balancing conversational warmth, bespoke millwork, and layered ambient lighting.",
    colSpan: "lg:col-span-7",
    features: ["Bespoke TV Units", "False Ceiling Acoustics", "Italian Marble Accents"],
  },
  {
    title: "Bedrooms",
    kicker: "02 / Private Sanctuary",
    description:
      "Quiet retreats engineered with acoustic calmness, soothing palettes, and walk-in wardrobe suites.",
    colSpan: "lg:col-span-5",
    features: ["Acoustic Wall Panels", "Concealed Wardrobes", "Integrated Bedheads"],
  },
  {
    title: "Dining Spaces",
    kicker: "03 / Intimate Gatherings",
    description:
      "Defined by monolithic dining surfaces, sculptural chandeliers, and bespoke bar consoles.",
    colSpan: "lg:col-span-4",
    features: ["Sculptural Tables", "Crockery Joinery", "Atmospheric Glow"],
  },
  {
    title: "Kitchens",
    kicker: "04 / Culinary Precision",
    description:
      "Where culinary function meets architectural form—modular Italian efficiency, seamless quartz, and concealed storage.",
    colSpan: "lg:col-span-4",
    features: ["Modular German Hardware", "Quartz Countertops", "Appliance Garages"],
  },
  {
    title: "Accent Spaces",
    kicker: "05 / Transitional Beauty",
    description:
      "Foyers, gallery corridors, and curated transitional zones celebrated through artisan fluted panelling and niche lighting.",
    colSpan: "lg:col-span-4",
    features: ["Foyer Partitions", "Fluted Panelling", "Architectural Niches"],
  },
  {
    title: "Commercial Interiors",
    kicker: "06 / Executive & Retail",
    description:
      "Executive offices, boutique retail studios, and corporate meeting suites designed to elevate prestige and optimize daily workflow across Hyderabad.",
    colSpan: "lg:col-span-12",
    features: ["Executive Boardrooms", "Boutique Reception Desks", "Ergonomic Workstations", "Brand Expression"],
  },
];

// Section 5: Our Approach Steps
const approachSteps = [
  {
    step: "01",
    title: "Understanding Your Requirements",
    phase: "Discovery & Briefing",
    description:
      "We begin with an in-depth consultation exploring your daily lifestyle, aesthetic inspirations, spatial priorities, and budget benchmarks to establish a crystal-clear project foundation.",
  },
  {
    step: "02",
    title: "Planning the Space",
    phase: "Architectural Layout",
    description:
      "Our team translates your brief into optimized 2D floor plans, ergonomic circulation pathways, functional storage zones, and spatial proportion studies.",
  },
  {
    step: "03",
    title: "Developing the Design",
    phase: "3D Visualization & Finishes",
    description:
      "Experience your space before construction begins through photorealistic 3D renders, comprehensive material palettes, bespoke millwork specifications, and lighting blueprints.",
  },
  {
    step: "04",
    title: "Execution and Coordination",
    phase: "Precision Craftsmanship",
    description:
      "With factory-precision modular manufacturing and meticulous on-site civil management, our specialized teams execute every detail under strict architectural supervision.",
  },
  {
    step: "05",
    title: "Final Delivery",
    phase: "White-Glove Handover",
    description:
      "Following thorough snagging audits, architectural detailing, and deep cleaning, we deliver a turnkey space that is impeccably styled and ready for immediate living.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);

  // Subtle parallax effect for hero background video
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroVideoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroVideoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.22, 0.05]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div className="w-full min-h-screen bg-white text-[#1A1A1A] flex flex-col justify-between selection:bg-[#C19B6C] selection:text-white">
      {/* Global Navigation Header */}
      <Header />

      <main className="relative z-10 w-full flex-1">
        {/* ====================================================================
            SECTION 1: HERO SECTION
            - Spacious, full-width editorial entry point
            - Subtle low-opacity looping video texture in background
            - Architectural gold atmospheric lighting and delicate hairline accents
            ==================================================================== */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] sm:min-h-screen w-full bg-white text-[#1A1A1A] flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 px-6 sm:px-10 lg:px-16"
        >
          {/* Subtle Video Texture Layer */}
          <motion.div
            style={{ scale: heroVideoScale, opacity: heroVideoOpacity }}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
          >
            <video
              src="https://res.cloudinary.com/tweajo9y/video/upload/v1794768164/WhatsApp_Video_2026-11-13_at_10.40.41_PM_2.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
            {/* Pure white ambient overlay to soften video texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
          </motion.div>

          {/* Background Structural Gold Accents */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Floating Soft Gold Glow Blurs */}
            <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-[#C19B6C]/[0.06] rounded-full blur-[140px]" />
            <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] bg-[#C19B6C]/[0.05] rounded-full blur-[160px]" />

            {/* Delicate Architectural Hairlines */}
            <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C19B6C]/20 to-transparent" />
            <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C19B6C]/15 to-transparent" />
            <div className="absolute left-12 sm:left-24 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-black/[0.04] to-transparent" />
            <div className="absolute right-12 sm:right-24 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-black/[0.04] to-transparent" />

            {/* Corner Architectural Coordinate Markers */}
            <span className="absolute top-28 left-8 sm:left-16 font-mono text-[10px] text-[#C19B6C]/40 tracking-widest">
              + 17.3920° N / 78.4070° E
            </span>
            <span className="absolute top-28 right-8 sm:right-16 font-mono text-[10px] text-[#C19B6C]/40 tracking-widest hidden sm:inline-block">
              HYDERABAD STUDIO · ISHO
            </span>
          </div>

          {/* Hero Content Block */}
          <motion.div
            style={{ y: heroTextY }}
            className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 sm:space-y-10"
          >
            {/* Minimalist Editorial Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EDITORIAL_EASE }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/80 border border-[#C19B6C]/30 shadow-[0_2px_12px_rgba(193,155,108,0.1)] backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#C19B6C] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#C19B6C] font-semibold">
                Studio Philosophy · Tolichowki, Hyderabad
              </span>
            </motion.div>

            {/* Hero Main Headline: Staggered Line-by-Line Reveal */}
            <motion.h1
              variants={headingContainerVariants}
              initial="hidden"
              animate="visible"
              className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight uppercase text-[#1A1A1A] leading-[0.98]"
            >
              <motion.span variants={headingLineVariants} className="block">
                Elevating the Way
              </motion.span>
              <motion.span variants={headingLineVariants} className="block font-light italic text-[#C19B6C]">
                You Experience Space.
              </motion.span>
            </motion.h1>

            {/* Architectural Gold Accent Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EDITORIAL_EASE }}
              className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C19B6C] to-transparent origin-center"
            />

            {/* Hero Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: EDITORIAL_EASE }}
              className="font-sans text-base sm:text-xl md:text-2xl text-[#1A1A1A]/80 font-normal leading-relaxed max-w-3xl"
            >
              Thoughtfully designed interiors that bring together aesthetics, comfort, and functionality.
            </motion.p>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: EDITORIAL_EASE }}
              className="pt-4 flex flex-col sm:flex-row items-center gap-5 sm:gap-8"
            >
              <MagneticButton href="/contact" className="px-9 py-4">
                Book Consultation
              </MagneticButton>

              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#1A1A1A] hover:text-[#C19B6C] transition-colors border-b border-[#1A1A1A]/20 hover:border-[#C19B6C] pb-1"
              >
                <span>View Portfolio Showcase</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom subtle scroll chevron */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#1A1A1A]/40">
              Scroll
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#C19B6C] to-transparent animate-pulse" />
          </motion.div>
        </section>

        {/* SECTION DIVIDER: 1 -> 2 */}
        <AnimatedDivider label="Who We Are · ISHO" />

        {/* ====================================================================
            SECTION 2: WHO WE ARE
            - 50/50 Split Editorial Layout
            - Left: Founder story (Rehan Ahmed), philosophy, & striking 12+ Years callout
            - Right: Embedded Showcase Video with tactile 3D offset gold frame
            ==================================================================== */}
        <section className="relative py-24 sm:py-36 w-full bg-white text-[#1A1A1A] overflow-hidden">
          {/* Subtle Ambient Background Accent */}
          <div className="absolute -top-24 right-1/3 w-[600px] h-[600px] bg-[#C19B6C]/[0.035] rounded-full blur-[150px] pointer-events-none select-none" />

          <div className="w-full px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
              {/* --------------------------------------------------------------
                  LEFT COLUMN: Narrative & 12+ Years Editorial Stat
                  -------------------------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: EDITORIAL_EASE }}
                className="lg:col-span-6 flex flex-col space-y-10"
              >
                {/* Section Subtitle */}
                <div>
                  <div className="inline-flex items-center gap-2.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#C19B6C]" />
                    <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold">
                      Who We Are · Tolichowki, Hyderabad
                    </span>
                  </div>

                  <motion.h2
                    variants={headingContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                    className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-[#1A1A1A] leading-[1.02]"
                  >
                    <motion.span variants={headingLineVariants} className="block">
                      Spaces Designed
                    </motion.span>
                    <motion.span variants={headingLineVariants} className="block font-light italic text-[#C19B6C]">
                      Around the Way You Live.
                    </motion.span>
                  </motion.h2>
                </div>

                {/* Founder Narrative & Core Copy */}
                <div className="space-y-6 text-base sm:text-lg text-[#1A1A1A]/85 font-sans leading-relaxed">
                  <p className="font-medium text-[#1A1A1A] text-lg sm:text-xl leading-snug border-l-2 border-[#C19B6C] pl-5">
                    Interior Solutions and Constructions was founded by{" "}
                    <strong className="text-[#1A1A1A] font-bold">Rehan Ahmed</strong>, bringing
                    over 12 years of experience in creating thoughtfully designed interior spaces.
                  </p>

                  <p className="text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed">
                    Under his leadership, our studio has transformed villas, luxury apartments, and
                    executive commercial environments across Hyderabad into harmonious expressions of
                    architectural elegance. We merge timeless materiality with modern modular execution,
                    ensuring that every living room, bedroom, dining space, and bespoke kitchen delivers
                    enduring comfort and refined distinction.
                  </p>
                </div>

                {/* Visually Striking Editorial Highlight: 12+ Years of Experience */}
                <div className="relative group">
                  {/* Offset Tactile Gold Border Frame */}
                  <div
                    className="absolute -inset-1 sm:-inset-1.5 border border-[#C19B6C]/30 rounded-2xl pointer-events-none transition-transform duration-500 ease-out group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover:border-[#C19B6C] -z-10"
                    aria-hidden="true"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: EDITORIAL_EASE }}
                    className="relative p-7 sm:p-8 bg-[#FAFAFA] border border-[#C19B6C]/25 rounded-2xl shadow-[0_15px_40px_-10px_rgba(193,155,108,0.12)] overflow-hidden transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                  >
                    {/* Delicate Gold Floating Corner Accents */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C19B6C]/15 to-transparent pointer-events-none" />
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#C19B6C]/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                      {/* Stat Number */}
                      <div className="flex flex-col shrink-0">
                        <span className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-[#C19B6C] tracking-tighter leading-none">
                          12+
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#1A1A1A]/50 mt-1">
                          Years Milestone
                        </span>
                      </div>

                      {/* Stat Description Divider & Copy */}
                      <div className="sm:border-l sm:border-[#C19B6C]/30 sm:pl-6 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#C19B6C]" />
                          <h3 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#1A1A1A]">
                            12+ Years of Experience
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans leading-relaxed">
                          Dedicated mastery in end-to-end residential interiors, civil construction, and
                          turnkey spatial transformations throughout Hyderabad.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Key Commitments Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C19B6C] shrink-0" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]">
                      Founder-Led Execution
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C19B6C] shrink-0" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]">
                      Turnkey Civil Guarantee
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C19B6C] shrink-0" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]">
                      Bespoke Materiality
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C19B6C] shrink-0" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]">
                      45-Day Handover Standard
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* --------------------------------------------------------------
                  RIGHT COLUMN: Video Showcase Player with Tactile Offset Gold Frame
                  -------------------------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: EDITORIAL_EASE }}
                className="lg:col-span-6 relative group"
              >
                {/* Tactile Offset Gold Border Frame Behind */}
                <div
                  className="absolute -inset-2 sm:-inset-3 border border-[#C19B6C]/35 rounded-3xl pointer-events-none transition-transform duration-500 ease-out group-hover:translate-x-3.5 group-hover:translate-y-3.5 group-hover:border-[#C19B6C] -z-10"
                  aria-hidden="true"
                />

                {/* Video Card Container */}
                <div className="relative rounded-2xl overflow-hidden bg-black shadow-[0_25px_60px_-15px_rgba(26,26,26,0.12)] border border-black/[0.08] group-hover:border-[#C19B6C]/60 aspect-[4/5] sm:aspect-[4/5] w-full transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                  <video
                    src="https://res.cloudinary.com/tweajo9y/video/upload/v1794768158/WhatsApp_Video_2026-11-13_at_10.40.41_PM_1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  {/* Gentle Gradient Vignette for Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C19B6C] animate-ping" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">
                        Craftsmanship In Motion
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                      Tolichowki · Hyderabad
                    </span>
                  </div>

                  {/* Bottom Video Caption */}
                  <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C19B6C] block">
                      Interior Solutions & Constructions
                    </span>
                    <p className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight leading-snug">
                      Precision Detailing & Spatial Harmony
                    </p>
                  </div>
                </div>

                {/* Floating Studio Stamp */}
                <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white border border-black/[0.08] p-4 shadow-xl rounded-xl items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#C19B6C]/40 flex items-center justify-center text-[#C19B6C]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/40 block">
                      Design Methodology
                    </span>
                    <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#1A1A1A]">
                      Form Meets Function
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER: 2 -> 3 */}
        <AnimatedDivider label="Methodology & Spatial Craft" />

        {/* ====================================================================
            SECTION 3: OUR DESIGN PHILOSOPHY
            - Pure white background with deep black typography
            - Minimalist 3-Column Video Grid with tactile 3D offset gold frames
            ==================================================================== */}
        <section className="relative py-20 sm:py-32 w-full bg-white text-[#1A1A1A] overflow-hidden">
          {/* Subtle background ambient glow blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#C19B6C]/[0.025] rounded-full blur-[160px] pointer-events-none select-none" />

          <div className="w-full px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-16 sm:space-y-20">
            {/* Header Block with Line-by-Line Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EDITORIAL_EASE }}
              className="max-w-4xl space-y-6"
            >
              <div className="inline-flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C19B6C]" />
                <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold">
                  Our Design Philosophy
                </span>
              </div>

              <motion.h2
                variants={headingContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-[#1A1A1A] leading-[1.02]"
              >
                <motion.span variants={headingLineVariants} className="block">
                  Good Design Is More
                </motion.span>
                <motion.span variants={headingLineVariants} className="block font-light italic text-[#C19B6C]">
                  Than What You See.
                </motion.span>
              </motion.h2>

              <p className="font-sans text-base sm:text-lg lg:text-xl text-[#1A1A1A]/80 font-normal leading-relaxed max-w-3xl pt-1">
                We balance form and function, ensuring that aesthetic choices enhance comfort, optimize space planning, and withstand the rigors of everyday use.
              </p>
            </motion.div>

            {/* 3-Column Minimalist Video Grid with Tactile Offset Gold Frames */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
              {philosophyPillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: EDITORIAL_EASE }}
                  className="relative group flex flex-col"
                >
                  {/* Subtle offset gold frame revealed on hover */}
                  <div
                    className="absolute -inset-1 sm:-inset-1.5 border border-[#C19B6C]/30 rounded-2xl pointer-events-none transition-transform duration-500 ease-out group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover:border-[#C19B6C] -z-10"
                    aria-hidden="true"
                  />

                  {/* Main Card Container */}
                  <div className="flex flex-col justify-between flex-1 bg-white border border-black/[0.08] group-hover:border-[#C19B6C]/60 transition-all duration-500 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-[0_20px_50px_rgba(193,155,108,0.22)] group-hover:-translate-x-1 group-hover:-translate-y-1">
                    {/* Top Bar with Number & Category */}
                    <div className="p-6 pb-4 flex items-center justify-between border-b border-black/[0.04]">
                      <span className="font-heading text-sm font-extrabold text-[#C19B6C] tracking-widest">
                        {pillar.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-medium">
                        {pillar.category}
                      </span>
                    </div>

                    {/* Video Container (Muted, Loop, AutoPlay, PlaysInline) */}
                    <div className="relative w-full aspect-[4/5] bg-black overflow-hidden">
                      <video
                        src={pillar.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Subtle Overlay Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Video Badge */}
                      <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex items-center justify-between text-white">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#C19B6C] drop-shadow-sm font-semibold">
                          Pillar {pillar.number}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                          Spatial Methodology
                        </span>
                      </div>
                    </div>

                    {/* Bottom Text Content Block */}
                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4 bg-white">
                      <div className="space-y-2">
                        <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#1A1A1A] group-hover:text-[#C19B6C] transition-colors">
                          {pillar.label}
                        </h3>
                        <p className="text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>

                      {/* Subtle Gold Hover Progress Bar */}
                      <div className="pt-2">
                        <div className="w-full h-[2px] bg-black/[0.06] overflow-hidden rounded-full">
                          <div className="w-full h-full bg-[#C19B6C] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER: 3 -> 4 */}
        <AnimatedDivider label="Spatial Portfolio · Typologies" />

        {/* ====================================================================
            SECTION 4: AREAS OF EXPERTISE
            - Pure white background with architectural portfolio aesthetic
            - Asymmetrical Bento Grid with tactile 3D offset gold frames
            ==================================================================== */}
        <section className="relative py-20 sm:py-32 w-full bg-white text-[#1A1A1A] overflow-hidden">
          {/* Subtle background ambient blur */}
          <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] bg-[#C19B6C]/[0.03] rounded-full blur-[170px] pointer-events-none select-none" />

          <div className="w-full px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-16 sm:space-y-20">
            {/* Section Header with Line-by-Line Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EDITORIAL_EASE }}
              className="max-w-3xl space-y-6"
            >
              <div className="inline-flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C19B6C]" />
                <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold">
                  Areas of Expertise
                </span>
              </div>

              <motion.h2
                variants={headingContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-[#1A1A1A] leading-[1.02]"
              >
                <motion.span variants={headingLineVariants} className="block">
                  Spaces That Feel
                </motion.span>
                <motion.span variants={headingLineVariants} className="block font-light italic text-[#C19B6C]">
                  Like They Belong.
                </motion.span>
              </motion.h2>

              <p className="font-sans text-base sm:text-lg lg:text-xl text-[#1A1A1A]/80 font-normal leading-relaxed max-w-2xl pt-1">
                From private residences in Jubilee Hills to executive boardrooms in HITEC City, our turnkey capabilities cover every dimension of contemporary interior design.
              </p>
            </motion.div>

            {/* Asymmetrical Bento Grid with Tactile Offset Gold Frames */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {areasOfExpertise.map((area, idx) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: EDITORIAL_EASE }}
                  className={`relative group ${area.colSpan}`}
                >
                  {/* Tactile Offset Gold Border Frame Behind */}
                  <div
                    className="absolute -inset-1 sm:-inset-1.5 border border-[#C19B6C]/30 rounded-2xl pointer-events-none transition-transform duration-500 ease-out group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover:border-[#C19B6C] -z-10"
                    aria-hidden="true"
                  />

                  {/* Bento Card Surface */}
                  <div className="h-full flex flex-col justify-between bg-white border border-black/[0.08] group-hover:border-[#C19B6C]/60 rounded-2xl p-8 sm:p-10 transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 shadow-sm group-hover:shadow-[0_25px_60px_-15px_rgba(193,155,108,0.18)] group-hover:bg-gradient-to-br group-hover:from-white group-hover:via-[#FAFAFA] group-hover:to-[#C19B6C]/[0.04] overflow-hidden">
                    {/* Expanding Top Gold Accent Line on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#C19B6C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />

                    {/* Corner Accent Detail */}
                    <div className="absolute top-4 right-4 text-[10px] font-mono text-[#C19B6C] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      + SPEC
                    </div>

                    {/* Top Content Block */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#C19B6C] font-semibold">
                          {area.kicker}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-black/[0.06] flex items-center justify-center text-[#1A1A1A]/40 group-hover:text-[#C19B6C] group-hover:border-[#C19B6C]/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#1A1A1A] group-hover:text-[#1A1A1A] transition-colors">
                        {area.title}
                      </h3>

                      <p className="font-sans text-sm sm:text-base text-[#1A1A1A]/70 leading-relaxed max-w-xl">
                        {area.description}
                      </p>
                    </div>

                    {/* Bottom Features / Pills */}
                    <div className="pt-8 sm:pt-10 border-t border-black/[0.04] flex flex-wrap items-center gap-2">
                      {area.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-[#FAFAFA] group-hover:bg-white group-hover:border-[#C19B6C]/30 border border-black/[0.05] rounded-full text-[11px] font-mono text-[#1A1A1A]/70 group-hover:text-[#1A1A1A] transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Faint ambient gold background aura inside card */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C19B6C]/[0.08] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER: 4 -> 5 */}
        <AnimatedDivider label="5-Phase Methodology" />

        {/* ====================================================================
            SECTION 5: OUR APPROACH
            - Clean, minimalist vertical timeline for the 5-phase delivery
            - Warm Gold (#C19B6C) styled index numerals
            ==================================================================== */}
        <section className="relative py-24 sm:py-36 w-full bg-[#FAFAFA] text-[#1A1A1A] overflow-hidden">
          {/* Subtle architectural grid pattern in background */}
          <div
            className="absolute inset-0 pointer-events-none select-none opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="w-full px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto relative z-10 space-y-16 sm:space-y-24">
            {/* Header Block with Line-by-Line Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EDITORIAL_EASE }}
              className="max-w-3xl space-y-6"
            >
              <div className="inline-flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C19B6C]" />
                <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold">
                  Our Approach · 5-Phase Methodology
                </span>
              </div>

              <motion.h2
                variants={headingContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-[#1A1A1A] leading-[1.02]"
              >
                <motion.span variants={headingLineVariants} className="block">
                  From an Idea to a Space
                </motion.span>
                <motion.span variants={headingLineVariants} className="block font-light italic text-[#C19B6C]">
                  You Call Your Own.
                </motion.span>
              </motion.h2>

              <p className="font-sans text-base sm:text-lg text-[#1A1A1A]/80 font-normal leading-relaxed max-w-2xl pt-1">
                A rigorous, transparent design and build process ensuring predictable timelines, uncompromised craft, and effortless peace of mind from blueprint to handover.
              </p>
            </motion.div>

            {/* Vertical Minimalist Timeline */}
            <div className="relative border-l border-[#C19B6C]/30 ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-12 md:pl-16 space-y-12 sm:space-y-16">
              {approachSteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: idx * 0.12, ease: EDITORIAL_EASE }}
                  className="relative group"
                >
                  {/* Timeline Node Point with Warm Gold Glow */}
                  <div className="absolute -left-[31px] sm:-left-[55px] md:-left-[71px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#C19B6C] shadow-[0_0_12px_rgba(193,155,108,0.4)] group-hover:scale-125 group-hover:bg-[#C19B6C] transition-all duration-300" />

                  {/* Offset Tactile Frame */}
                  <div
                    className="absolute -inset-1 border border-[#C19B6C]/20 rounded-2xl pointer-events-none transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-[#C19B6C]/60 -z-10"
                    aria-hidden="true"
                  />

                  {/* Step Card */}
                  <div className="p-6 sm:p-8 bg-white border border-black/[0.06] group-hover:border-[#C19B6C]/50 rounded-2xl transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-sm group-hover:shadow-[0_15px_40px_-10px_rgba(193,155,108,0.12)] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                      <div className="flex items-baseline gap-3">
                        {/* Number in Warm Gold */}
                        <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#C19B6C] tracking-wider">
                          {step.step}.
                        </span>
                        <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#1A1A1A] group-hover:text-[#1A1A1A] transition-colors">
                          {step.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/40 shrink-0">
                        {step.phase}
                      </span>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-[#1A1A1A]/75 leading-relaxed max-w-3xl pt-1">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER: 5 -> 6 */}
        <AnimatedDivider label="Local Presence" />

        {/* ====================================================================
            SECTION 6: LOCAL PRESENCE
            - Heading: Rooted in Hyderabad
            - Text & Address framed in a thin, elegant tactile gold border
            ==================================================================== */}
        <section className="relative py-24 sm:py-36 w-full bg-white text-[#1A1A1A] overflow-hidden">
          {/* Ambient Gold Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C19B6C]/[0.035] rounded-full blur-[160px] pointer-events-none select-none" />

          <div className="w-full px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-12 sm:space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EDITORIAL_EASE }}
              className="text-center max-w-2xl mx-auto space-y-4"
            >
              <div className="inline-flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C19B6C]" />
                <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold">
                  Local Presence · Tolichowki
                </span>
                <span className="w-2 h-2 rounded-full bg-[#C19B6C]" />
              </div>

              <motion.h2
                variants={headingContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-[#1A1A1A]"
              >
                <motion.span variants={headingLineVariants} className="inline-block mr-3">
                  Rooted in
                </motion.span>
                <motion.span variants={headingLineVariants} className="inline-block font-light italic text-[#C19B6C]">
                  Hyderabad.
                </motion.span>
              </motion.h2>

              <p className="font-sans text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
                Based in Tolichowki, we are committed to elevating residential and commercial spaces across Hyderabad.
              </p>
            </motion.div>

            {/* Framed Address Block with Tactile Offset Gold Border */}
            <div className="max-w-4xl mx-auto relative group">
              {/* Subtle offset gold frame revealed on hover */}
              <div
                className="absolute -inset-1.5 sm:-inset-2 border border-[#C19B6C]/35 rounded-2xl pointer-events-none transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:translate-y-3 group-hover:border-[#C19B6C] -z-10"
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: EDITORIAL_EASE }}
                className="relative p-8 sm:p-12 lg:p-14 bg-white border border-[#C19B6C]/45 group-hover:border-[#C19B6C] rounded-2xl shadow-[0_20px_50px_rgba(193,155,108,0.1)] transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 overflow-hidden"
              >
                {/* Corner Blueprint Crosshairs */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-[#C19B6C]/60 pointer-events-none">
                  + STUDIO
                </div>
                <div className="absolute top-3 right-3 text-[10px] font-mono text-[#C19B6C]/60 pointer-events-none">
                  SEC · 06 +
                </div>
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#C19B6C]/60 pointer-events-none">
                  + 500008
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#C19B6C]/60 pointer-events-none">
                  HYD · IN +
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 sm:gap-10">
                  <div className="space-y-4 max-w-xl">
                    <div className="flex items-center gap-2 text-[#C19B6C]">
                      <MapPin className="w-5 h-5 shrink-0" />
                      <span className="text-[11px] font-mono uppercase tracking-[0.24em] font-semibold text-[#1A1A1A]">
                        Official Studio Address
                      </span>
                    </div>

                    <p className="font-heading text-lg sm:text-2xl font-bold text-[#1A1A1A] leading-snug">
                      201, West Field Center, Above Domino&apos;s, <br className="hidden sm:inline" />
                      Tolichowki, Hyderabad - 500008, Telangana.
                    </p>

                    <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/70 leading-relaxed">
                      Centrally situated to serve Jubilee Hills, Banjara Hills, Madhapur, Gachibowli, Kondapur, and Greater Hyderabad.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-black/[0.06] md:pl-8">
                    <MagneticButton href="/contact" className="px-6 py-3.5">
                      Visit Studio
                    </MagneticButton>

                    <a
                      href="tel:+919100707409"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#C19B6C] text-[#1A1A1A] hover:bg-[#C19B6C]/10 font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C19B6C]" />
                      <span>+91 9100707409</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Inline Conversion Strip */}
        <ConversionStrip
          badge="STUDIO CONSULTATION · TOLICHOWKI"
          hook="Planning an interior transformation in Hyderabad? Schedule an in-person review at our studio."
          subhook="Bring your blueprints or floor plans to our Tolichowki atelier for a 1-on-1 session with our principal architects."
        />

        {/* SECTION DIVIDER: 6 -> 7 */}
        <AnimatedDivider label="Consultation & Inquiries" />

        {/* ====================================================================
            SECTION 7: FINAL CALL TO ACTION (CTA)
            - Heading: "Let's Create a Space That Feels Like Yours."
            - Button: "Get in Touch" -> /contact (Black bg transitioning to gold on hover)
            ==================================================================== */}
        <section className="relative py-24 sm:py-36 w-full bg-white text-[#1A1A1A] overflow-hidden">
          {/* Subtle Ambient Gold Radiance */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#C19B6C]/[0.04] rounded-full blur-[180px] pointer-events-none select-none" />

          <div className="w-full px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto relative z-10 text-center space-y-10">
            {/* Minimalist Sub-kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EDITORIAL_EASE }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#C19B6C]/30 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C19B6C]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#C19B6C] font-semibold">
                Start Your Spatial Journey
              </span>
            </motion.div>

            {/* Final CTA Headline with Line-by-Line Reveal */}
            <motion.h2
              variants={headingContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase text-[#1A1A1A] leading-[1.02] max-w-4xl mx-auto"
            >
              <motion.span variants={headingLineVariants} className="block">
                Let’s Create a Space
              </motion.span>
              <motion.span variants={headingLineVariants} className="block font-light italic text-[#C19B6C]">
                That Feels Like Yours.
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: EDITORIAL_EASE }}
              className="font-sans text-base sm:text-xl text-[#1A1A1A]/80 leading-relaxed max-w-2xl mx-auto"
            >
              Whether embarking on a new villa construction, a residential apartment renovation, or modular room upgrades, our principal consultants are ready to discuss your vision.
            </motion.p>

            {/* Button: Black transitioning to Gold on hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: EDITORIAL_EASE }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <MagneticButton href="/contact" className="px-12 py-5">
                Get in Touch
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="pt-2 text-xs font-mono text-[#1A1A1A]/50"
            >
              Complimentary initial consultation · Direct studio contact at Tolichowki, Hyderabad
            </motion.div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
