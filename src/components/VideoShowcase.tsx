"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Film, Sparkles, ArrowUpRight, MapPin } from "lucide-react";

interface VideoItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  location: string;
  gridSpan: string;
  aspectRatio: string;
}

const videoShowcases: VideoItem[] = [
  {
    id: "video-1",
    src: "https://res.cloudinary.com/tweajo9y/video/upload/v1794768164/WhatsApp_Video_2026-11-13_at_10.40.41_PM_2.mp4",
    title: "Travertine Volumetric Living",
    subtitle: "High-Ceiling Acoustic Coves & Smoked Oak",
    location: "Jubilee Hills, Hyderabad",
    gridSpan: "col-span-12 lg:col-span-7",
    aspectRatio: "aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/11]",
  },
  {
    id: "video-2",
    src: "https://res.cloudinary.com/tweajo9y/video/upload/v1794768160/WhatsApp_Video_2026-11-13_at_10.40.40_PM.mp4",
    title: "Minimalist Italian Joinery",
    subtitle: "Monolithic Kitchen & Integrated Islands",
    location: "Tolichowki Main, Hyderabad",
    gridSpan: "col-span-12 sm:col-span-6 lg:col-span-5",
    aspectRatio: "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/11]",
  },
  {
    id: "video-3",
    src: "https://res.cloudinary.com/tweajo9y/video/upload/v1794768160/WhatsApp_Video_2026-11-13_at_10.40.40_PM_1.mp4",
    title: "Sanctuary Master Suite",
    subtitle: "Fluted Travertine & Indirect 2700K Glow",
    location: "Banjara Hills, Hyderabad",
    gridSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
    aspectRatio: "aspect-[4/5]",
  },
  {
    id: "video-4",
    src: "https://res.cloudinary.com/tweajo9y/video/upload/v1794768159/WhatsApp_Video_2026-11-13_at_10.40.41_PM.mp4",
    title: "Pivot Glass & Courtyard Flow",
    subtitle: "Passive Daylight & Axial Sightlines",
    location: "Gachibowli, Hyderabad",
    gridSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
    aspectRatio: "aspect-[4/5]",
  },
  {
    id: "video-5",
    src: "https://res.cloudinary.com/tweajo9y/video/upload/v1794768158/WhatsApp_Video_2026-11-13_at_10.40.41_PM_1.mp4",
    title: "Architectural Bespoke Millwork",
    subtitle: "Concealed Hardware & Fluted Travertino",
    location: "Tolichowki, Hyderabad",
    gridSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
    aspectRatio: "aspect-[4/5]",
  },
];

export default function VideoShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 w-full bg-white text-[#1A1A1A] relative overflow-hidden"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* ====================================================================
            HEADER: Section Title & Architectural Video Intro
            ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-black/[0.06] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C19B6C] animate-pulse" />
              <span className="text-[#C19B6C] text-xs uppercase tracking-[0.26em] font-mono font-semibold">
                Living Architecture in Motion
              </span>
            </div>
            <motion.h2
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.14 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[0.95]"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="inline-block"
              >
                Cinematic
              </motion.span>{" "}
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="inline-block font-light italic text-[#C19B6C]"
              >
                Walkthroughs
              </motion.span>
            </motion.h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#1A1A1A]/60 max-w-md leading-relaxed">
            <Film className="w-4 h-4 text-[#C19B6C] shrink-0" />
            <p>
              Direct motion captures from our completed residential sanctuaries. Unfiltered,
              continuous sightlines showcasing spatial weightlessness.
            </p>
          </div>
        </div>

        {/* ====================================================================
            MASONRY VIDEO GALLERY
            Subtle gold borders & diffused gold drop-shadows on hover
            ==================================================================== */}
        <div className="grid grid-cols-12 gap-8 lg:gap-10 w-full">
          {videoShowcases.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.35, ease: "easeOut" },
              }}
              className={`group relative flex flex-col cursor-pointer ${video.gridSpan}`}
            >
              {/* -------------------------------------------------------------
                  VIDEO CONTAINER: Tactile Gold Frame & 3D Hover Elevation
                  ------------------------------------------------------------- */}
              <div className="relative">
                {/* Subtle offset gold frame revealed on hover */}
                <div
                  className="absolute -inset-1 sm:-inset-1.5 border border-[#C19B6C]/30 pointer-events-none transition-transform duration-500 ease-out group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover:border-[#C19B6C] -z-10"
                  aria-hidden="true"
                />
                <div
                  className={`relative w-full ${video.aspectRatio} overflow-hidden bg-[#F5F5F5] border border-black/[0.06] group-hover:border-[#C19B6C]/60 shadow-[0_10px_30px_rgba(26,26,26,0.04)] group-hover:shadow-[0_25px_60px_-10px_rgba(193,155,108,0.28)] transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1`}
                >
                  {/* Looping Muted HTML5 Video (No External Controls) */}
                  <video
                    src={video.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Subtle dark gradient wash to ensure metadata legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Badge: Reel Identifier & Live Indicator */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A] border border-black/[0.04]">
                      FILM 0{idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-mono uppercase tracking-wider text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C19B6C] animate-pulse" />
                      <span>MOTION</span>
                    </div>
                  </div>

                  {/* Bottom Overlay Label (Inside Video Card) */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none flex items-end justify-between text-white">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C19B6C] block">
                        {video.location}
                      </span>
                      <h3 className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white mt-0.5">
                        {video.title}
                      </h3>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1A1A1A] group-hover:bg-[#C19B6C] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-md">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Subtle Gold Accent Line on Bottom Edge */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C19B6C] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-20 pointer-events-none" />
                </div>
              </div>

              {/* -------------------------------------------------------------
                  CAPTION / SUBTITLE: Editorial Typographic Notes
                  ------------------------------------------------------------- */}
              <div className="pt-3.5 flex items-center justify-between gap-4 text-xs font-mono text-[#1A1A1A]/60">
                <p className="truncate font-sans text-sm text-[#1A1A1A]/80 font-normal">
                  {video.subtitle}
                </p>
                <div className="flex items-center gap-1 shrink-0 text-[#C19B6C]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>HYD</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
