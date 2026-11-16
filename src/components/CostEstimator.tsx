"use client";

import React, { useState, useMemo } from "react";
import {
  Compass,
  Box,
  Layers,
  Sparkles,
  Check,
  ArrowRight,
  MessageCircle,
  Upload,
  Info,
  Building,
  Home,
  CheckCircle2,
} from "lucide-react";

// ============================================================================
// DATA DEFINITIONS & MULTIPLIERS
// ============================================================================

interface PropertyConfig {
  id: "2bhk" | "3bhk" | "4bhk";
  name: string;
  sqft: number;
  label: string;
  multiplier: number;
  roomsSummary: string;
}

const propertyConfigs: PropertyConfig[] = [
  {
    id: "2bhk",
    name: "2 BHK Apartment",
    sqft: 1250,
    label: "2 BHK (1,250 Sq.Ft)",
    multiplier: 1.0,
    roomsSummary: "Living, Dining, Kitchen, Master Suite, Guest Bedroom",
  },
  {
    id: "3bhk",
    name: "3 BHK Luxury",
    sqft: 1950,
    label: "3 BHK Luxury (1,950 Sq.Ft)",
    multiplier: 1.48,
    roomsSummary: "Living, Dining, Kitchen, Master Suite, Kids Room, Guest Suite",
  },
  {
    id: "4bhk",
    name: "4 BHK / Duplex Villa",
    sqft: 3400,
    label: "4 BHK / Villa (3,400 Sq.Ft)",
    multiplier: 2.35,
    roomsSummary: "Double-Height Salon, Dining, Kitchen, 4 Bedroom Suites, Foyer",
  },
];

interface FinishTier {
  id: "essential" | "premium" | "luxury";
  name: string;
  badge: string;
  multiplier: number;
  specs: string;
}

const finishTiers: FinishTier[] = [
  {
    id: "essential",
    name: "Essential Modern",
    badge: "Core Quality",
    multiplier: 1.0,
    specs: "BWP Marine Plywood, Anti-scratch Laminates, Branded Standard Hardware",
  },
  {
    id: "premium",
    name: "Premium Bespoke",
    badge: "Most Popular",
    multiplier: 1.55,
    specs: "Acrylic & PU finishes, Hettich/Blum soft-close, Quartz counters, Profile LED",
  },
  {
    id: "luxury",
    name: "Luxury Signature",
    badge: "Architectural Ultra",
    multiplier: 2.3,
    specs: "Veneer & Fluted stone panels, Italian marble accents, Home automation, Bespoke millwork",
  },
];

interface RoomZone {
  id: string;
  title: string;
  dimensions: string;
  description: string;
  baseCost: number; // Base cost at 2BHK Essential
  // Percentage coordinates for 2D/3D map
  x: number;
  y: number;
  width: number;
  height: number;
  pinX: number;
  pinY: number;
}

const ROOM_ZONES: RoomZone[] = [
  {
    id: "foyer_tv",
    title: "Foyer & TV Unit",
    dimensions: "12'0\" × 8'6\"",
    description: "Custom fluted wall paneling, entry shoe console & floating TV credenza.",
    baseCost: 160000,
    x: 4,
    y: 56,
    width: 26,
    height: 38,
    pinX: 17,
    pinY: 74,
  },
  {
    id: "living_dining",
    title: "Living & Dining Area",
    dimensions: "22'6\" × 15'0\"",
    description: "Architectural false ceiling, crockery divider unit & monolithic feature wall.",
    baseCost: 310000,
    x: 32,
    y: 46,
    width: 40,
    height: 48,
    pinX: 52,
    pinY: 68,
  },
  {
    id: "kitchen",
    title: "Modular Kitchen + Crockery",
    dimensions: "13'6\" × 10'0\"",
    description: "Tandem drawer systems, tall pantry unit, quartz counter & breakfast ledge.",
    baseCost: 360000,
    x: 4,
    y: 8,
    width: 28,
    height: 44,
    pinX: 18,
    pinY: 28,
  },
  {
    id: "master_bed",
    title: "Master Bedroom Suite",
    dimensions: "16'0\" × 13'6\"",
    description: "Floor-to-ceiling sliding wardrobe, upholstered bedhead panel & vanity dresser.",
    baseCost: 320000,
    x: 34,
    y: 8,
    width: 34,
    height: 34,
    pinX: 51,
    pinY: 24,
  },
  {
    id: "additional_bed",
    title: "Additional Bedrooms",
    dimensions: "14'0\" × 12'0\"",
    description: "Kids / Guest wardrobes, integrated study desk & accent lighting.",
    baseCost: 260000,
    x: 74,
    y: 12,
    width: 22,
    height: 44,
    pinX: 85,
    pinY: 34,
  },
  {
    id: "ceiling_lighting",
    title: "False Ceiling & Lighting",
    dimensions: "Full Floor Plan",
    description: "Gyproc perimeter false ceiling, magnetic track lights & ambient COB LED.",
    baseCost: 150000,
    x: 74,
    y: 60,
    width: 22,
    height: 34,
    pinX: 85,
    pinY: 76,
  },
];

export default function CostEstimator() {
  // Visual Mode: 2D Blueprint vs 3D Isometric
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  // Step 1: Property Type (2BHK, 3BHK, 4BHK)
  const [selectedProperty, setSelectedProperty] = useState<PropertyConfig>(propertyConfigs[0]);

  // Step 2: Scope (Design Only vs Full Turnkey)
  const [scope, setScope] = useState<"turnkey" | "design_only">("turnkey");

  // Step 3: Material & Finish Tier
  const [selectedFinish, setSelectedFinish] = useState<FinishTier>(finishTiers[1]); // Default to Premium

  // Step 4: Active Room Packages (Boolean map)
  const [activeRooms, setActiveRooms] = useState<Record<string, boolean>>({
    foyer_tv: true,
    living_dining: true,
    kitchen: true,
    master_bed: true,
    additional_bed: true,
    ceiling_lighting: true,
  });

  // Hovered room hotspot for floating tooltip
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);

  // Toggle individual room package
  const toggleRoom = (roomId: string) => {
    setActiveRooms((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  // ============================================================================
  // DYNAMIC PRICE CALCULATIONS
  // ============================================================================
  const { lowLakhs, highLakhs, exactInr, roomCosts } = useMemo(() => {
    if (scope === "design_only") {
      // Consultancy rate: ₹150 / sq.ft
      const baseEstimate = selectedProperty.sqft * 150;
      const low = (selectedProperty.sqft * 135) / 100000;
      const high = (selectedProperty.sqft * 165) / 100000;

      const costs: Record<string, number> = {};
      ROOM_ZONES.forEach((r) => {
        costs[r.id] = Math.round((baseEstimate * (r.baseCost / 1560000)));
      });

      return {
        lowLakhs: low.toFixed(2),
        highLakhs: high.toFixed(2),
        exactInr: Math.round(baseEstimate).toLocaleString("en-IN"),
        roomCosts: costs,
      };
    }

    // Turnkey Calculation
    let sumBaseCost = 0;
    const costs: Record<string, number> = {};

    ROOM_ZONES.forEach((room) => {
      const roomTotal =
        room.baseCost * selectedProperty.multiplier * selectedFinish.multiplier;
      costs[room.id] = Math.round(roomTotal);
      if (activeRooms[room.id]) {
        sumBaseCost += roomTotal;
      }
    });

    const lowEstimate = (sumBaseCost * 0.95) / 100000;
    const highEstimate = (sumBaseCost * 1.08) / 100000;

    return {
      lowLakhs: lowEstimate.toFixed(1),
      highLakhs: highEstimate.toFixed(1),
      exactInr: Math.round(sumBaseCost).toLocaleString("en-IN"),
      roomCosts: costs,
    };
  }, [scope, selectedProperty, selectedFinish, activeRooms]);

  // Pre-filled WhatsApp inquiry link with exact user configuration
  const whatsappUrl = useMemo(() => {
    const includedRooms = ROOM_ZONES.filter((r) => activeRooms[r.id])
      .map((r) => r.title)
      .join(", ");

    const scopeName =
      scope === "design_only"
        ? "2D CAD Blueprints + 3D Renders (Design Consultancy)"
        : `Turnkey Design + Execution [${selectedFinish.name}]`;

    const message = `Hello Interior Solutions! I configured my floor plan on your spatial estimator:
• Property: ${selectedProperty.label}
• Scope: ${scopeName}
• Selected Zones: ${includedRooms || "None selected"}
• Estimated Range: ₹${lowLakhs} - ₹${highLakhs} Lakhs

I would like to lock this estimate and discuss floor plan execution with your principal architects.`;

    return `https://wa.me/919100707409?text=${encodeURIComponent(message)}`;
  }, [activeRooms, scope, selectedFinish, selectedProperty, lowLakhs, highLakhs]);

  const handleScrollToContact = () => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="cost-estimator"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-white text-[#1A1A1A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ====================================================================
            HEADER: Luxury Editorial Narrative
            ==================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#C19B6C]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#C19B6C] font-semibold">
              Interactive Spatial Estimator
            </span>
            <span className="w-6 h-px bg-[#C19B6C]" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A1A] leading-[1.05]">
            2D / 3D Floor Plan Spatial Estimator
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Switch between architectural 2D blueprints and 3D spatial renders. Toggle individual living zones to calculate custom design and turnkey interior investments across Hyderabad.
          </p>
        </div>

        {/* ====================================================================
            MAIN SPLIT-SCREEN 12-COLUMN ARCHITECTURAL GRID
            ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ==================================================================
              LEFT 7 COLUMNS: THE 2D / 3D INTERACTIVE FLOOR PLAN CANVAS
              ================================================================== */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Top Toolbar: View Mode & BHK Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 bg-[#FAFAFA] border border-gray-200 rounded-2xl">
              {/* 2D vs 3D View Toggles */}
              <div className="flex items-center bg-gray-200/80 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode("2d")}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                    viewMode === "2d"
                      ? "bg-[#1A1A1A] text-white shadow-sm font-semibold"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#C19B6C]" />
                  <span>2D Blueprint</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("3d")}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                    viewMode === "3d"
                      ? "bg-[#1A1A1A] text-white shadow-sm font-semibold"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-[#C19B6C]" />
                  <span>3D Isometric</span>
                </button>
              </div>

              {/* Property Configuration Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {propertyConfigs.map((prop) => (
                  <button
                    key={prop.id}
                    type="button"
                    onClick={() => setSelectedProperty(prop)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all shrink-0 ${
                      selectedProperty.id === prop.id
                        ? "bg-[#C19B6C] text-white font-semibold shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {prop.name.replace(" Apartment", "").replace(" / Duplex", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* The Visual Floor Plan Canvas Frame */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-gray-300 bg-[#0B0F17] min-h-[460px] sm:min-h-[520px] p-6 flex items-center justify-center select-none shadow-2xl">
              {/* CAD Blueprint Architectural Grid Pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(#C19B6C 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "24px 24px, 24px 24px, 24px 24px",
                }}
              />

              {/* Architectural Technical Dimensions Stamp */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C19B6C] font-bold">
                  {selectedProperty.label}
                </span>
                <span className="text-[10px] font-mono text-white/50">
                  CAD Scale: 1:50 · Hyderabad Specifications
                </span>
              </div>

              {/* Perspective Transformation Wrapper for 3D Mode */}
              <div
                className="relative w-full h-[400px] sm:h-[450px] max-w-[620px] transition-transform duration-700 ease-out"
                style={
                  viewMode === "3d"
                    ? {
                        transform: "perspective(1200px) rotateX(28deg) rotateZ(-16deg)",
                        transformStyle: "preserve-3d",
                      }
                    : { transform: "none" }
                }
              >
                {/* SVG Blueprint Wall Outlines & Floor Division */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Outer Structural Walls */}
                  <rect
                    x="2"
                    y="4"
                    width="96"
                    height="92"
                    fill="none"
                    stroke="#C19B6C"
                    strokeWidth="0.8"
                    strokeDasharray="1,1"
                    opacity="0.4"
                  />
                  {/* Room Dividing CAD lines */}
                  <line x1="32" y1="4" x2="32" y2="96" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
                  <line x1="2" y1="52" x2="32" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
                  <line x1="72" y1="4" x2="72" y2="96" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
                  <line x1="32" y1="44" x2="72" y2="44" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
                  <line x1="72" y1="56" x2="98" y2="56" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
                </svg>

                {/* Spatial Room Zones & Interactive Pins */}
                {ROOM_ZONES.map((room) => {
                  const isActive = activeRooms[room.id];
                  const isHovered = hoveredRoomId === room.id;
                  const costInLakhs = (roomCosts[room.id] / 100000).toFixed(2);

                  return (
                    <div
                      key={room.id}
                      style={{
                        left: `${room.x}%`,
                        top: `${room.y}%`,
                        width: `${room.width}%`,
                        height: `${room.height}%`,
                      }}
                      className={`absolute rounded-xl transition-all duration-300 border flex flex-col justify-between p-2.5 sm:p-3 ${
                        isActive
                          ? viewMode === "3d"
                            ? "bg-[#C19B6C]/20 border-2 border-[#C19B6C] shadow-[0_25px_45px_rgba(193,155,108,0.45)] -translate-y-2"
                            : "bg-[#C19B6C]/10 border-[#C19B6C] shadow-[0_0_20px_rgba(193,155,108,0.2)]"
                          : "bg-white/[0.03] border-white/10 opacity-50 hover:opacity-80"
                      }`}
                    >
                      {/* Room Details in Zone */}
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] sm:text-[11px] font-heading font-bold text-white uppercase tracking-wider leading-tight">
                          {room.title}
                        </span>
                        <span className="text-[9px] font-mono text-white/40 hidden sm:inline">
                          {room.dimensions}
                        </span>
                      </div>

                      {/* Status indicator on zone */}
                      <div className="flex items-center justify-between text-[9px] font-mono">
                        <span className={isActive ? "text-[#C19B6C] font-semibold" : "text-white/40"}>
                          {isActive ? `Active (₹${costInLakhs}L)` : "Excluded"}
                        </span>
                      </div>

                      {/* Interactive Hotspot Pin */}
                      <div
                        onClick={() => toggleRoom(room.id)}
                        onMouseEnter={() => setHoveredRoomId(room.id)}
                        onMouseLeave={() => setHoveredRoomId(null)}
                        style={{
                          left: `${room.pinX}%`,
                          top: `${room.pinY}%`,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 group"
                      >
                        {/* Pulsing Target Ring */}
                        <div className="relative flex items-center justify-center">
                          <span
                            className={`absolute w-7 h-7 rounded-full transition-all duration-300 ${
                              isActive
                                ? "bg-[#C19B6C]/40 animate-ping opacity-75"
                                : "bg-white/20"
                            }`}
                          />
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                              isActive
                                ? "bg-[#C19B6C] text-black border-white shadow-lg scale-110"
                                : "bg-[#1A1A1A] text-white/50 border-white/30"
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </div>

                        {/* Floating Tooltip */}
                        {isHovered && (
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-[#1A1A1A] border border-[#C19B6C] text-white p-2.5 rounded-xl shadow-2xl z-40 text-left pointer-events-none animate-in fade-in duration-200">
                            <span className="text-[10px] font-mono text-[#C19B6C] uppercase tracking-wider block font-semibold">
                              {room.title}
                            </span>
                            <span className="text-[10px] text-gray-300 block mt-0.5">
                              {room.dimensions} · {isActive ? "Click to Remove" : "Click to Include"}
                            </span>
                            <div className="mt-1 pt-1 border-t border-white/10 flex justify-between items-center text-xs">
                              <span className="text-gray-400">Package Cost:</span>
                              <span className="font-bold text-[#C19B6C]">₹{costInLakhs} Lakhs</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Canvas Status Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-white/60 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C19B6C]" />
                  <span>
                    Active Zones: {Object.values(activeRooms).filter(Boolean).length} of {ROOM_ZONES.length}
                  </span>
                </span>
                <span className="text-[#C19B6C]">
                  💡 Tip: Click any room pin directly on the floor plan to toggle package
                </span>
              </div>
            </div>
          </div>

          {/* ==================================================================
              RIGHT 5 COLUMNS: CONFIGURATION CONTROLS & LIVE BREAKDOWN
              ================================================================== */}
          <div className="lg:col-span-5 flex flex-col space-y-6 bg-white">
            {/* STEP 1: Design & Detailing Scope */}
            <div className="space-y-2.5">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-gray-400 font-semibold block">
                Step 01 / Architectural Scope
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setScope("turnkey")}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    scope === "turnkey"
                      ? "border-[#C19B6C] bg-[#C19B6C]/5 ring-1 ring-[#C19B6C]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="font-heading font-bold text-xs uppercase text-[#1A1A1A] block">
                    Full Turnkey Execution
                  </span>
                  <span className="text-[11px] text-gray-500 font-sans block mt-0.5">
                    Complete 2D/3D + site civil & millwork execution.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setScope("design_only")}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    scope === "design_only"
                      ? "border-[#C19B6C] bg-[#C19B6C]/5 ring-1 ring-[#C19B6C]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="font-heading font-bold text-xs uppercase text-[#1A1A1A] block">
                    2D CAD + 3D Renders Only
                  </span>
                  <span className="text-[11px] text-gray-500 font-sans block mt-0.5">
                    Design Consultancy at ₹150 / sq.ft.
                  </span>
                </button>
              </div>
            </div>

            {/* STEP 2: Material & Finish Tier (Only for Turnkey) */}
            {scope === "turnkey" && (
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] font-mono text-gray-400 font-semibold block">
                    Step 02 / Material & Finish Tier
                  </span>
                  <span className="text-[10px] font-mono text-[#C19B6C] font-semibold uppercase">
                    {selectedFinish.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {finishTiers.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedFinish(tier)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        selectedFinish.id === tier.id
                          ? "border-[#C19B6C] bg-[#C19B6C]/5 ring-1 ring-[#C19B6C]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#C19B6C] font-bold block mb-1">
                          {tier.badge}
                        </span>
                        <span className="font-heading font-bold text-xs text-[#1A1A1A] block">
                          {tier.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-sans mt-2 line-clamp-2">
                        {tier.specs}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Interactive Room Checklist (Synced with 2D/3D Pins) */}
            <div className="space-y-2.5 pt-2 border-t border-gray-100">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-gray-400 font-semibold block">
                Step 03 / Spatial Package Checklist
              </span>

              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {ROOM_ZONES.map((room) => {
                  const isChecked = activeRooms[room.id];
                  const costInLakhs = (roomCosts[room.id] / 100000).toFixed(2);

                  return (
                    <div
                      key={room.id}
                      onClick={() => toggleRoom(room.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? "bg-white border-[#C19B6C]/40 shadow-xs"
                          : "bg-gray-50 border-gray-200 opacity-60 hover:opacity-90"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? "bg-[#C19B6C] border-[#C19B6C] text-white"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="font-heading font-bold text-xs text-[#1A1A1A] block leading-tight">
                            {room.title}
                          </span>
                          <span className="text-[10px] text-gray-400 font-sans block">
                            {room.dimensions}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-[#1A1A1A]">
                        {isChecked ? `₹${costInLakhs} L` : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LIVE PRICE DISPLAY BOX */}
            <div className="bg-[#1A1A1A] text-white p-6 sm:p-7 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Subtle Ambient Gold Radiance */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#C19B6C]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C19B6C] font-semibold">
                    ESTIMATED INVESTMENT · HYDERABAD
                  </span>
                  <span className="text-[10px] font-mono text-white/50">
                    {selectedProperty.label}
                  </span>
                </div>

                {/* Primary Large Gold Price Range Display */}
                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-[#C19B6C] tracking-tight uppercase leading-tight">
                  ₹{lowLakhs} Lakhs – ₹{highLakhs} Lakhs
                </div>

                {/* Deliverables Included Badge */}
                <div className="inline-flex items-center gap-2 text-xs font-sans text-gray-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C19B6C] shrink-0" />
                  <span>Includes Free 2D Blueprints & 3D Walk-through Renders</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  {/* Primary WhatsApp Action */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#C19B6C] hover:bg-[#D4AF7A] text-[#1A1A1A] font-heading font-bold uppercase tracking-[0.16em] text-xs py-4 px-6 rounded-xl transition-all duration-300 shadow-lg active:scale-95 text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                    <span>Lock Estimate & Send Floor Plan on WhatsApp →</span>
                  </a>

                  {/* Secondary Floor Plan Upload Button */}
                  <button
                    type="button"
                    onClick={handleScrollToContact}
                    className="w-full inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#C19B6C] text-white hover:text-[#C19B6C] font-heading font-medium text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-colors duration-200"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Your Own Floor Plan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
