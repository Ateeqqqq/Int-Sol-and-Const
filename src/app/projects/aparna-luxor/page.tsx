"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCtaBanner from "@/components/ProjectCtaBanner";

const galleryImages = [
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/05/gallery-15-1-scaled.jpg",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/05/gallery-19-1-scaled.jpg",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/05/195-final-3d-designs-7-7-23-25-scaled.jpg",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/05/195-final-3d-designs-7-7-23-19-scaled.jpg",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/05/195-final-3d-designs-7-7-23-41-scaled.jpg",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/05/195-final-3d-designs-7-7-23-29-scaled.jpg",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P1_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P2_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P3_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P4_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P5_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P6_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P7_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P8_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P9_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P10_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P11_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P12_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P13_IMG1-scaled.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P14_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P15_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P16_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P17_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P18_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P19_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P21_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P22_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P23_IMG1.png",
  "https://www.interiorsolutionsho.com/wp-content/uploads/2026/06/PDF1_P25_IMG1.png",
];

const BLUEPRINT_BG_URL =
  "https://raw.githubusercontent.com/Ateeqqqq/interior-solutions-ho-/refs/heads/main/WhatsApp%20Image%202026-11-16%20at%203.24.56%20PM.jpeg";

export default function AparnaLuxorPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => ((prev! + 1) % galleryImages.length));
    }
  }, [selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => ((prev! - 1 + galleryImages.length) % galleryImages.length));
    }
  }, [selectedIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-[#1A1A1A]">
      {/* Global Navigation Header */}
      <Header />

      <main className="flex-1 w-full">
        {/* ====================================================================
            1. CINEMATIC HERO SECTION
            - Full-width hero with min-h-[50vh] or 60vh
            - First image as background with bg-black/60 dark overlay
            - Center-aligned typography: Gold subtext & Bold Montserrat title
            ==================================================================== */}
        <section className="relative w-full h-[55vh] min-h-[460px] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
          {/* Background Image */}
          <Image
            src={galleryImages[0]}
            alt="Aparna Luxor Hero"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Center-aligned Typography */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            {/* Gold Subtext Breadcrumb */}
            <span className="text-[#C19B6C] text-xs sm:text-sm uppercase tracking-[0.3em] font-mono font-semibold mb-3">
              <Link href="/" className="hover:underline transition-all">
                Home
              </Link>{" "}
              / Aparna Luxor
            </span>

            {/* Main Heading */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[1.05]">
              Aparna Luxor
            </h1>

            <p className="mt-4 text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-white/70">
              Curated Architectural Portfolio · 29 Finished Views
            </p>
          </div>
        </section>

        {/* ====================================================================
            2. THE LIGHTBOX GALLERY GRID
            - Pure white section with heavy padding (py-24)
            - Faint architectural blueprint graphic at 5% opacity
            - Responsive 3-column CSS Grid (1 col mobile, 2 col tablet, 3 col desktop)
            - 29 Images mapped into aspect-[4/3] rounded-xl containers
            ==================================================================== */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 bg-white overflow-hidden">
          {/* Faint Architectural Blueprint Graphic in Background (Opacity 5%) */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none">
            <Image
              src={BLUEPRINT_BG_URL}
              alt="Architectural Blueprint Texture"
              fill
              className="object-cover"
            />
          </div>

          {/* Section Sub-kicker & Narrative */}
          <div className="max-w-7xl mx-auto relative z-10 mb-12 sm:mb-16 text-center">
            <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold block mb-2">
              PORTFOLIO ARCHIVE
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-[#1A1A1A]">
              Space Gallery & Details
            </h2>
            <p className="mt-3 text-sm text-gray-500 font-sans max-w-lg mx-auto">
              Explore the bespoke veneer millwork, illuminated living spaces, refined kitchens, and tailored finish craftsmanship of Aparna Luxor. Click any view to enlarge.
            </p>
          </div>

          {/* Responsive 3-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto relative z-10">
            {galleryImages.map((imageUrl, index) => (
              <div
                key={imageUrl}
                onClick={() => setSelectedIndex(index)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/70"
              >
                {/* Image */}
                <Image
                  src={imageUrl}
                  alt={`Aparna Luxor - View ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading={index < 6 ? "eager" : "lazy"}
                />

                {/* Subtle Hover Gradient & Zoom Indicator */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-[10px] font-mono text-white/90 uppercase tracking-widest">
                    View {String(index + 1).padStart(2, "0")} / {galleryImages.length}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
            3. FULL-SCREEN LIGHTBOX MODAL
            - Fixed z-50 with black/95 backdrop
            - Center full-resolution image display
            - Prev / Next / Close controls + keyboard support
            ==================================================================== */}
        {selectedIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top Toolbar: Counter & Close */}
            <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between text-white pointer-events-none">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C19B6C] bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 pointer-events-auto">
                {String(selectedIndex + 1).padStart(2, "0")} / {galleryImages.length}
              </span>

              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="pointer-events-auto p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all focus:outline-none"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Previous Image Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Image Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Enlarged Image Display */}
            <div
              className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[80vh]">
                <Image
                  src={galleryImages[selectedIndex]}
                  alt={`Aparna Luxor - View ${selectedIndex + 1}`}
                  fill
                  priority
                  className="object-contain rounded-lg"
                  sizes="(max-width: 1280px) 95vw, 1200px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Turnkey Call to Action Banner */}
        <ProjectCtaBanner projectName="Aparna Luxor" />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
