"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import VideoShowcase from "@/components/VideoShowcase";
import BlueprintSection from "@/components/BlueprintSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProcessTimeline from "@/components/ProcessTimeline";
import ScrollingGallery from "@/components/ScrollingGallery";
import Services from "@/components/Services";
import CostEstimator from "@/components/CostEstimator";
import ContactForm from "@/components/ContactForm";
import ConversionStrip from "@/components/ConversionStrip";
import AnimatedDivider from "@/components/AnimatedDivider";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Trophy, Users, Clock } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Homes & Spaces Designed" },
  { value: "12+", label: "Years of Design Leadership" },
  { value: "100%", label: "Turnkey Quality Guarantee" },
  {
    value: "Depends on Project",
    label: "Average Handover Timeline",
    isLong: true,
  },
];

const headingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const headingLineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HomePage() {
  return (
    <div className="w-full flex flex-col bg-white text-[#1A1A1A]">
      {/* Global Navigation Header */}
      <Header />

      {/* Main Page Canvas */}
      <main className="relative z-10 w-full flex-1">
        {/* 1. Full-Width Editorial Hero Section */}
        <HeroSection />

        {/* Animated Drawing Divider: Hero -> About */}
        <AnimatedDivider label="Studio Pedigree" />

        {/* 2. Metrics & About Summary Section */}
        <section id="about" className="py-20 sm:py-28 w-full px-6 sm:px-10 lg:px-16 bg-[#FAFAFA]">
          <div className="w-full">
            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-16 border-b border-black/[0.06]">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="flex flex-col justify-end"
                >
                  <span
                    className={`font-heading font-extrabold text-[#C19B6C] tracking-tight ${
                      stat.isLong
                        ? "text-2xl sm:text-3xl lg:text-4xl leading-[1.1] min-h-[2.5rem] sm:min-h-[3.75rem] flex items-end"
                        : "text-4xl sm:text-6xl min-h-[2.5rem] sm:min-h-[3.75rem] flex items-end"
                    }`}
                  >
                    {stat.value}
                  </span>
                  <span className="mt-2 text-xs uppercase tracking-[0.2em] text-[#1A1A1A] font-mono font-medium">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* About Summary Block: Position as Leading Hyderabad Experts */}
            <div className="pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold block mb-3">
                  Our Hyderabad Expertise
                </span>
                {/* Line-by-line staggered heading reveal */}
                <motion.h2
                  variants={headingContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.05 }}
                  className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-[1.05] text-[#1A1A1A]"
                >
                  <motion.span variants={headingLineVariants} className="block">
                    Leading Interior
                  </motion.span>
                  <motion.span variants={headingLineVariants} className="block text-[#C19B6C] font-light italic">
                    Designers in Hyderabad
                  </motion.span>
                </motion.h2>
              </div>

              <div className="lg:col-span-6 flex flex-col space-y-6">
                <p className="font-sans text-base sm:text-lg text-[#1A1A1A] leading-relaxed">
                  Interior Solutions is a premier interior architecture studio headquartered in Tolichowki,
                  serving discerning homeowners and commercial clients across Jubilee Hills, Banjara Hills,
                  Gachibowli, and HITEC City.
                </p>

                <p className="font-sans text-sm sm:text-base text-[#1A1A1A] leading-relaxed">
                  We specialize in complete turnkey transformations for residential villas, modern apartments,
                  and boutique commercial spaces. From functional living rooms and tranquil bedrooms to custom
                  dining suites, high-efficiency modular kitchens, and signature entryway accents, our in-house
                  team ensures seamless execution from 3D blueprints to handover.
                </p>

                <div className="pt-2 flex items-center gap-6">
                  <Link
                    href="/#services"
                    className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#C19B6C] transition-colors border-b border-[#C19B6C] pb-1"
                  >
                    <span>Explore Our Core Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Drawing Divider: About -> Portfolio */}
        <AnimatedDivider label="Selected Projects" />

        {/* 3. Full-Width Portfolio Showcase */}
        <PortfolioGrid />

        {/* Animated Drawing Divider: Portfolio -> Video Showcase */}
        <AnimatedDivider label="Living Motion" />

        {/* 4. Cinematic Motion Video Showcase */}
        <VideoShowcase />

        {/* Animated Drawing Divider: Video -> Blueprint */}
        <AnimatedDivider label="2D Detailing" />

        {/* 4.4. 2D Detailing & Blueprint Section */}
        <BlueprintSection />

        {/* Inline Conversion Strip: Below 2D Blueprint */}
        <ConversionStrip
          badge="2D / 3D ARCHITECTURAL BLUEPRINTS"
          hook="Have a floor plan ready? Get a tailored 2D/3D layout & quote from our principal architects."
          subhook="Complete spatial planning, false ceiling CAD, electrical layouts, and modular detailing across Hyderabad."
        />

        {/* Animated Drawing Divider: Blueprint -> Transformation */}
        <AnimatedDivider label="Transformation" />

        {/* 4.5. Before & After Interactive Showcase */}
        <BeforeAfterSlider />

        {/* Animated Drawing Divider: Transformation -> Methodology */}
        <AnimatedDivider label="Methodology" />

        {/* 4.6. Process Timeline: From Vision to Sanctuary */}
        <ProcessTimeline />

        {/* Inline Conversion Strip: Below Process Timeline */}
        <ConversionStrip
          badge="DELIBERATE TURNKEY JOURNEY"
          hook="Ready to turn your aspirations into built reality? Book a free site consultation."
          subhook="From initial discovery to final reveal in Tolichowki, Jubilee Hills, Banjara Hills & HITEC City."
        />

        {/* Animated Drawing Divider: Methodology -> Gallery */}
        <AnimatedDivider label="Curated Gallery" />

        {/* 4.7. Auto-Scrolling Portfolio Gallery & Lightbox */}
        <ScrollingGallery />

        {/* Inline Conversion Strip: Below Scrolling Gallery */}
        <ConversionStrip
          badge="BESPOKE RESIDENTIAL FINISHES"
          hook="Inspired by our custom joinery & living spaces? Discuss your floor plan with our designers."
          subhook="Premium acrylics, Italian marble accents, veneer millwork, and high-efficiency modular kitchens."
        />

        {/* Animated Drawing Divider: Gallery -> Core Spaces */}
        <AnimatedDivider label="Core Spaces" />

        {/* 5. Core Services Component (Living, Bedroom, Dining, Kitchen, Accent) */}
        <Services />

        {/* Inline Conversion Strip: Below Core Living Spaces */}
        <ConversionStrip
          badge="HYDERABAD INTERIOR EXPERTISE"
          hook="Transform your apartment, villa, or boutique office with our turnkey delivery team."
          subhook="Full 3D visualization, transparent billing, and dedicated architectural site supervision."
        />

        {/* Animated Drawing Divider: Services -> Estimator */}
        <AnimatedDivider label="Instant Estimate" />

        {/* 5.5 Instant Cost Estimator Component */}
        <CostEstimator />

        {/* Animated Drawing Divider: Estimator -> Contact */}
        <AnimatedDivider label="Consultation Desk" />

        {/* 6. Concierge Desk Client Intake Form */}
        <ContactForm />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
