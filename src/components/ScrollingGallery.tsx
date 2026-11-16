"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";

interface GalleryItem {
  title: string;
  category: string;
  src: string;
}

const galleryItems: GalleryItem[] = [
  {
    title: "Editorial Dining Suite I",
    category: "Dining Area",
    src: "https://github.com/Ateeqqqq/intho-assets/blob/main/Dining_Area_01_Page_01.jpg?raw=true",
  },
  {
    title: "Editorial Dining Suite II",
    category: "Dining Area",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Dining_Area_02_Page_02.jpg",
  },
  {
    title: "Editorial Dining Suite III",
    category: "Dining Area",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Dining_Area_03_Page_07.jpg",
  },
  {
    title: "Illuminated Crockery Unit I",
    category: "Display Crockery",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Display_Crockery_Unit_01_Page_04.jpg",
  },
  {
    title: "Illuminated Crockery Unit II",
    category: "Display Crockery",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Display_Crockery_Unit_02_Page_08.jpg",
  },
  {
    title: "Illuminated Crockery Unit III",
    category: "Display Crockery",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Display_Crockery_Unit_03_Page_09.jpg",
  },
  {
    title: "Signature Entrance Foyer",
    category: "Entrance",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Entrance_Foyer_01_Page_05.jpg",
  },
  {
    title: "Precision Modular Kitchen I",
    category: "Kitchen",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Kitchen_01_Page_20.jpg",
  },
  {
    title: "Precision Modular Kitchen II",
    category: "Kitchen",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Kitchen_02_Page_21.jpg",
  },
  {
    title: "Precision Modular Kitchen III",
    category: "Kitchen",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Kitchen_03_Page_22.jpg",
  },
  {
    title: "Precision Modular Kitchen IV",
    category: "Kitchen",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Kitchen_04_Page_23.jpg",
  },
  {
    title: "Architectural Passage Gallery I",
    category: "Passage / Corridor",
    src: "https://github.com/Ateeqqqq/intho-assets/blob/main/Passage_Corridor_01_Page_05.jpg?raw=true",
  },
  {
    title: "Architectural Passage Gallery II",
    category: "Passage / Corridor",
    src: "https://raw.githubusercontent.com/Ateeqqqq/intho-assets/refs/heads/main/Passage_Corridor_02_Page_13.jpg",
  },
  {
    title: "Bespoke Washbasin Vanity",
    category: "Washbasin",
    src: "https://github.com/Ateeqqqq/intho-assets/blob/main/Washbasin_Vanity_Area_01_Page_06.jpg?raw=true",
  },
];

// Duplicate items to ensure a seamless infinite marquee loop
const infiniteGalleryItems = [...galleryItems, ...galleryItems];

export default function ScrollingGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <section className="relative w-full overflow-hidden py-20 bg-white">
      {/* Section Header */}
      <div className="w-full px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold mb-3">
            CURATED ARCHIVE
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#1A1A1A] leading-[1.05]">
            Spaces & Bespoke Joinery
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
            A continuous showcase of custom dining suites, illuminated cabinetry, entrance foyers, and precision modular kitchens created for residences across Hyderabad. Click any space to expand.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Auto-Scroll Marquee */}
      <div className="w-full overflow-hidden select-none">
        <div className="animate-marquee flex gap-6 hover:[animation-play-state:paused] py-2">
          {infiniteGalleryItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              onClick={() => setSelectedImage(item.src)}
              className="relative h-72 sm:h-80 aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0 bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top View Icon Button */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col">
                <span className="text-[#C19B6C] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold mb-1">
                  {item.category}
                </span>
                <h3 className="font-heading text-sm sm:text-base font-semibold text-white tracking-normal leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-[110] p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/20 backdrop-blur-sm transition-all focus:outline-none"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Centered Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[82vh]">
              <Image
                src={selectedImage}
                alt="Selected space enlargement"
                fill
                priority
                className="object-contain rounded-lg"
                sizes="(max-width: 1280px) 90vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
