"use client";

import React, { useState, useMemo } from "react";
import { ArrowDown, Building2, Home, Store, Sparkles, Check } from "lucide-react";

interface PropertyOption {
  id: string;
  name: string;
  multiplier: number;
  icon: React.ElementType;
  description: string;
}

interface FinishOption {
  id: string;
  name: string;
  rate: number;
  tier: string;
  description: string;
}

const propertyTypes: PropertyOption[] = [
  {
    id: "apartment",
    name: "Apartment",
    multiplier: 1.0,
    icon: Building2,
    description: "Flats & Gated Communities",
  },
  {
    id: "villa",
    name: "Villa",
    multiplier: 1.2,
    icon: Home,
    description: "Independent Houses & Duplexes",
  },
  {
    id: "commercial",
    name: "Commercial",
    multiplier: 1.1,
    icon: Store,
    description: "Boutique Offices & Retail",
  },
];

const finishLevels: FinishOption[] = [
  {
    id: "essential",
    name: "Essential",
    rate: 1500,
    tier: "Core Turnkey",
    description: "Quality laminates, branded modular fittings & turnkey execution.",
  },
  {
    id: "premium",
    name: "Premium",
    rate: 2500,
    tier: "Most Popular",
    description: "Acrylic/PU finishes, fluted paneling, veneer & ambient LED profiles.",
  },
  {
    id: "luxury",
    name: "Luxury",
    rate: 4000,
    tier: "Ultra-Bespoke",
    description: "Italian marble accents, bespoke architectural joinery & premium automation.",
  },
];

const areaPresets = [1000, 1500, 2000, 3000, 4500];

export default function CostEstimator() {
  const [carpetArea, setCarpetArea] = useState<number>(1200);
  const [selectedProperty, setSelectedProperty] = useState<PropertyOption>(propertyTypes[0]);
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(finishLevels[1]); // Default to Premium

  // Dynamic Calculation: Area * Finish Rate * Property Multiplier
  const { totalRupees, totalLakhsFormatted } = useMemo(() => {
    const rawTotal = carpetArea * selectedFinish.rate * selectedProperty.multiplier;
    const lakhs = rawTotal / 100000;
    
    // Format nicely with 2 decimal places (e.g., 30.00 or 18.75)
    const formatted = lakhs.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const inrString = Math.round(rawTotal).toLocaleString("en-IN");

    return {
      totalRupees: inrString,
      totalLakhsFormatted: formatted,
    };
  }, [carpetArea, selectedFinish, selectedProperty]);

  const handleScrollToContact = () => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="cost-estimator" className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header Block */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold block mb-3">
            INVESTMENT CALCULATOR
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#1A1A1A]">
            Instant Estimate
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Get a preliminary idea of your interior investment in Hyderabad.
          </p>
        </div>

        {/* Main Estimator Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl p-6 sm:p-10 lg:p-12 transition-all">
          <div className="space-y-10">
            {/* 1. Carpet Area Slider */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <label htmlFor="carpet-area-slider" className="font-heading font-bold text-base sm:text-lg text-[#1A1A1A]">
                    Carpet Area
                  </label>
                  <p className="text-xs text-gray-400 font-sans">
                    Adjust the slider to match your property&apos;s usable floor area.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto bg-[#F9F9F9] border border-gray-200 px-4 py-2 rounded-xl">
                  <span className="font-heading font-extrabold text-2xl text-[#1A1A1A]">
                    {carpetArea.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#C19B6C] font-mono font-semibold">
                    Sq.Ft
                  </span>
                </div>
              </div>

              {/* Slider Control */}
              <div className="relative pt-2">
                <input
                  id="carpet-area-slider"
                  type="range"
                  min={500}
                  max={5000}
                  step={50}
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C19B6C] focus:outline-none"
                />
                <div className="flex justify-between text-[11px] font-mono text-gray-400 mt-2">
                  <span>500 Sq.Ft</span>
                  <span>2,750 Sq.Ft</span>
                  <span>5,000 Sq.Ft</span>
                </div>
              </div>

              {/* Quick Area Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-2">
                <span className="text-[11px] font-mono uppercase text-gray-400 mr-1">Presets:</span>
                {areaPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCarpetArea(preset)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      carpetArea === preset
                        ? "bg-[#1A1A1A] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {preset.toLocaleString("en-IN")} sq.ft
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Property Type Selection */}
            <div>
              <div className="mb-4">
                <span className="font-heading font-bold text-base sm:text-lg text-[#1A1A1A] block">
                  Property Type
                </span>
                <p className="text-xs text-gray-400 font-sans">
                  Select your space typology to apply standard structural multiplier.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {propertyTypes.map((prop) => {
                  const Icon = prop.icon;
                  const isSelected = selectedProperty.id === prop.id;
                  return (
                    <button
                      key={prop.id}
                      type="button"
                      onClick={() => setSelectedProperty(prop)}
                      className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "border-[#C19B6C] bg-[#C19B6C]/5 ring-1 ring-[#C19B6C] shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? "bg-[#C19B6C] text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-gray-400">
                          {prop.multiplier}x
                        </span>
                      </div>
                      <div>
                        <span className="font-heading font-bold text-sm text-[#1A1A1A] block">
                          {prop.name}
                        </span>
                        <span className="text-[11px] text-gray-500 font-sans mt-0.5 block leading-tight">
                          {prop.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Finish Level Selection */}
            <div>
              <div className="mb-4">
                <span className="font-heading font-bold text-base sm:text-lg text-[#1A1A1A] block">
                  Finish Level
                </span>
                <p className="text-xs text-gray-400 font-sans">
                  Choose the material grade and architectural detailing tier.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {finishLevels.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between relative ${
                        isSelected
                          ? "border-[#C19B6C] bg-[#C19B6C]/5 ring-1 ring-[#C19B6C] shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C19B6C] font-semibold">
                            {finish.tier}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#C19B6C] text-white flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="font-heading font-bold text-base text-[#1A1A1A] block">
                          {finish.name}
                        </span>
                        <div className="my-2">
                          <span className="font-heading font-extrabold text-lg text-[#1A1A1A]">
                            ₹{finish.rate.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-gray-400 font-sans ml-1">/ sq.ft</span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                          {finish.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Dynamic Output & Calculation Display */}
            <div className="pt-8 border-t border-gray-200">
              <div className="bg-[#FAFAFA] border border-gray-200/90 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center">
                {/* Micro formula breakdown badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-500 text-[11px] font-mono mb-4">
                  <Sparkles className="w-3 h-3 text-[#C19B6C]" />
                  <span>
                    {carpetArea.toLocaleString("en-IN")} sq.ft × ₹{selectedFinish.rate}/sq.ft × {selectedProperty.multiplier}x ({selectedProperty.name})
                  </span>
                </div>

                {/* Primary Prominent Gold Price Display */}
                <div className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#C19B6C] tracking-tight uppercase leading-tight">
                  Estimated Cost: ₹{totalLakhsFormatted} Lakhs
                </div>

                {/* Subtle exact amount context */}
                <div className="text-xs font-mono text-gray-500 mt-2">
                  (Approx. ₹{totalRupees})
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-400 font-sans mt-3 max-w-md mx-auto leading-relaxed">
                  *This is a preliminary estimate. Final costs vary based on material selection and exact scope.
                </p>

                {/* CTA Button to Scroll to Contact Form */}
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleScrollToContact}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1A1A1A] hover:bg-[#C19B6C] text-white font-heading font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
                  >
                    <span>Discuss This Estimate</span>
                    <ArrowDown className="w-3.5 h-3.5" />
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
