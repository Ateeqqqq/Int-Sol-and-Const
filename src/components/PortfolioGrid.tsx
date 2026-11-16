"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";

// Blur Data URL: 8x5 base64 representing a soft, luminous gallery canvas with a warm gold focal point
const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiNGNUY1RjUiLz48Y2lyY2xlIGN4PSI0IiBjeT0iMi41IiByPSIxLjUiIGZpbGw9IiNDMTlCNkMiIG9wYWNpdHk9IjAuMTUiLz48L3N2Zz4=";

interface CaseStudy {
  id: string;
  title: string;
  category: "Residential" | "Civil Build" | "Commercial";
  location: string;
  area: string;
  year: string;
  imageUrl: string;
  gridSpan: string;
  aspectRatio: string;
  metric: string;
  problem: string;
  solution: string;
  result: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "monolith-penthouse",
    title: "The Monolith Penthouse",
    category: "Residential",
    location: "Tolichowki / Jubilee Hills, Hyderabad",
    area: "6,200 sq.ft.",
    year: "2026",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    gridSpan: "col-span-12 lg:col-span-8",
    aspectRatio: "aspect-[16/10] sm:aspect-[16/9]",
    metric: "38% Reverberation Reduction",
    problem:
      "The client required an airy, acoustically quiet residential penthouse that resolved excessive sound reverberation from cavernous 18-foot ceilings without cluttering sightlines.",
    solution:
      "Interior Solutions introduced monolithic, fluted travertine acoustic installations, concealed warm architectural gold indirect cove lighting, and suspended smoked oak vertical baffles.",
    result:
      "Decreased acoustic flutter echo by 38%, stabilized natural ambient thermal insulation, and delivered complete turnkey interior joinery in 6 months.",
  },
  {
    id: "atelier-travertine",
    title: "Atelier Travertine Villa",
    category: "Residential",
    location: "Tolichowki Main Road, Hyderabad",
    area: "4,800 sq.ft.",
    year: "2025",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    gridSpan: "col-span-12 lg:col-span-4",
    aspectRatio: "aspect-[4/5]",
    metric: "+210% Daylight Ingress",
    problem:
      "A segmented traditional villa layout with heavy partition walls created severe dark pockets and obstructed passive ventilation across the ground floor.",
    solution:
      "Demolished redundant masonry divisions and installed floor-to-ceiling slimline bronze glass pivot portals opening directly into a central luminous terrazzo light court.",
    result:
      "Increased measured daylight penetration by 210% and created an unbroken, effortless axial sightline from the foyer through to the landscaped courtyard.",
  },
  {
    id: "linear-sanctum",
    title: "Linear Sanctum Residence",
    category: "Civil Build",
    location: "Tolichowki, Hyderabad",
    area: "5,400 sq.ft.",
    year: "2026",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    gridSpan: "col-span-12 lg:col-span-5",
    aspectRatio: "aspect-[4/5]",
    metric: "+240 sq.ft. Spatial Optimization",
    problem:
      "Inconveniently situated structural load-bearing concrete pillars created residual dead-zones and awkward offsets across the primary living floorplate.",
    solution:
      "Encapsulated structural columns inside custom fluted architectural millwork with seamless push-to-open hidden storage and integrated brushed brass exhibition niches.",
    result:
      "Reclaimed 240 sq.ft. of usable living footprint, transforming an engineering obstacle into the home's primary sculptural focal point.",
  },
  {
    id: "obsidian-sky-atelier",
    title: "The Obsidian Sky Atelier",
    category: "Commercial",
    location: "Banjara Hills, Hyderabad",
    area: "3,800 sq.ft.",
    year: "2025",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85",
    gridSpan: "col-span-12 lg:col-span-7",
    aspectRatio: "aspect-[16/10] sm:aspect-[16/9]",
    metric: "40% Durability Margin Exceeded",
    problem:
      "The client required an ultra-modern executive lounge that preserved razor-sharp contrast and warmth under heavy daily commercial traffic.",
    solution:
      "Engineered scratch-resistant volcanic basalt horizontal counters, anti-fingerprint PVD gold accents, and monolithic micro-cement surfaces with 2700K recessed museum lighting.",
    result:
      "Exceeded international hospitality abrasion standards by 40% with zero aesthetic degradation over the initial 12-month operational cycle.",
  },
  {
    id: "courtyard-pavilion",
    title: "The Courtyard Pavilion",
    category: "Civil Build",
    location: "Gachibowli, Hyderabad",
    area: "7,900 sq.ft.",
    year: "2026",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    gridSpan: "col-span-12",
    aspectRatio: "aspect-[16/9] sm:aspect-[21/9]",
    metric: "22% Summer HVAC Load Reduction",
    problem:
      "Client desired continuous, edge-to-edge visual connection with an exterior zen garden despite extreme Hyderabad summer heat and direct solar glare.",
    solution:
      "Engineered an extended 3.5m architectural cantilever combined with motorized low-E argon double-glazed pivot planes and subterranean cooling air ducts.",
    result:
      "Reduced summertime cooling energy consumption by 22% while providing uninterrupted panoramic landscape views across a 24-meter continuous glazed expanse.",
  },
];

const categories = ["All", "Residential", "Civil Build", "Commercial"] as const;

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredStudies =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((item) => item.category === activeCategory);

  return (
    <section id="projects" className="py-24 sm:py-32 w-full bg-white text-[#1A1A1A]">
      {/* Full-width outer container spanning edge-to-edge */}
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* ====================================================================
            HEADER: Editorial Section Title & Clean Category Filtering
            ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-black/[0.06] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C19B6C]" />
              <span className="text-[#C19B6C] text-xs uppercase tracking-[0.26em] font-mono font-semibold">
                Completed Projects · Hyderabad
              </span>
            </div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.1 },
                },
              }}
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
                Featured
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
                Living Spaces
              </motion.span>
            </motion.h2>
          </div>

          {/* Minimalist Filter Navigation */}
          <div className="flex items-center gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 text-xs uppercase tracking-[0.2em] font-mono transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-[#1A1A1A] font-bold"
                    : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
                }`}
              >
                <span>{category}</span>
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C19B6C]"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ====================================================================
            FULL-WIDTH ASYMMETRICAL GRID
            Stretches near the edges of the screen rather than being boxed
            ==================================================================== */}
        <motion.div layout className="grid grid-cols-12 gap-8 lg:gap-12 w-full">
          <AnimatePresence>
            {filteredStudies.map((study) => (
              <motion.article
                key={study.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -9,
                  transition: { type: "spring", stiffness: 240, damping: 22 },
                }}
                className={`group relative flex flex-col cursor-pointer ${study.gridSpan}`}
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                {/* -------------------------------------------------------------
                    IMAGE CONTAINER: Anti-Gravity Elevation & Tactile Gold Frame
                    ------------------------------------------------------------- */}
                <div className="relative">
                  {/* Subtle offset gold frame revealed on hover */}
                  <div
                    className="absolute -inset-1 sm:-inset-1.5 border border-[#C19B6C]/30 pointer-events-none transition-transform duration-500 ease-out group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover:border-[#C19B6C] -z-10"
                    aria-hidden="true"
                  />
                  <div
                    className={`relative w-full ${study.aspectRatio} overflow-hidden bg-[#F5F5F5] rounded-none shadow-[0_12px_35px_rgba(26,26,26,0.06)] group-hover:shadow-[0_35px_80px_-15px_rgba(26,26,26,0.16)] transition-all duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1`}
                  >
                    <Image
                      src={study.imageUrl}
                      alt={`${study.title} - ${study.category} Architecture in ${study.location}`}
                      fill
                      priority={study.id === "monolith-penthouse"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 90vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Gentle gradient wash at the base of the image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Floating Top Pill Badges */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                      <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#1A1A1A] shadow-sm">
                        {study.category}
                      </span>
                      <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#C19B6C] group-hover:text-white transition-colors duration-300 shadow-sm">
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* Subtle Gold Accent Line that appears upon hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C19B6C] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out z-20" />
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    CAPTION & METADATA: Editorial Typographic Row
                    ------------------------------------------------------------- */}
                <div className="pt-5 flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      itemProp="name"
                      className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#C19B6C] transition-colors"
                    >
                      {study.title}
                    </h3>
                    <span className="text-xs font-mono text-[#1A1A1A]/40 tracking-wider shrink-0">
                      {study.area} · {study.year}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#1A1A1A]/60">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C19B6C]" />
                      <span>{study.location}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[11px] text-[#1A1A1A]/80 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C19B6C]" />
                      <span>{study.metric}</span>
                    </div>
                  </div>
                </div>

                {/* =============================================================
                    SEO & AEO SEMANTIC CONTENT (Machine-Readable Hidden Structure)
                    Structured for Answer Engines (Google SGE, Perplexity, Gemini)
                    ============================================================= */}
                <div
                  className="sr-only"
                  itemProp="description"
                  aria-label={`Detailed architectural monograph for ${study.title}`}
                >
                  <h4>Case Study Overview: {study.title}</h4>
                  <p>
                    <strong>Site Location:</strong> {study.location}
                  </p>
                  <p>
                    <strong>Architectural Typology:</strong> {study.category} ({study.area},{" "}
                    {study.year})
                  </p>
                  <section>
                    <h5>Client Challenge & Problem Statement</h5>
                    <p>{study.problem}</p>
                  </section>
                  <section>
                    <h5>Interior Solutions Architectural Methodology</h5>
                    <p>{study.solution}</p>
                  </section>
                  <section>
                    <h5>Quantifiable Performance Result</h5>
                    <p>{study.result}</p>
                  </section>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
