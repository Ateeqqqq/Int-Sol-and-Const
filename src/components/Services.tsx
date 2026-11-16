"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sofa,
  Bed,
  UtensilsCrossed,
  ChefHat,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import MagneticWrapper from "@/components/MagneticWrapper";

interface ServiceSpace {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const serviceSpaces: ServiceSpace[] = [
  {
    id: "living",
    number: "01",
    title: "Living Spaces",
    subtitle: "Open-Concept Comfort & Entertainment",
    description:
      "Expansive, welcoming living rooms tailored for modern family life and effortless hosting. We design cohesive spatial layouts featuring custom entertainment units, warm ambient lighting, and elegant feature walls.",
    features: [
      "Custom TV & Media Units with Concealed Wiring",
      "Architectural False Ceilings with Indirect 2700K Glow",
      "Ergonomic Space Planning & Seating Arrangements",
    ],
    icon: Sofa,
  },
  {
    id: "bedroom",
    number: "02",
    title: "Bedroom Sanctuaries",
    subtitle: "Restful Suites & Smart Storage",
    description:
      "Peaceful master and guest bedrooms designed to maximize relaxation. Our layouts incorporate ergonomic walk-in wardrobes, custom-padded headboards, and integrated dressers tailored to your morning routine.",
    features: [
      "Floor-to-Ceiling Wardrobes with Profile Lighting",
      "Acoustic Wall Panelling & Premium Headboards",
      "Integrated Vanity Units & Dressing Spaces",
    ],
    icon: Bed,
  },
  {
    id: "dining",
    number: "03",
    title: "Dining Environments",
    subtitle: "Intimate Gatherings & Grand Dinners",
    description:
      "Sophisticated dining spaces that bridge culinary prep and lively conversation. From custom marble tables to statement lighting and discreet crockery storage, every detail is considered.",
    features: [
      "Bespoke Dining Tables in Quartz, Marble & Wood",
      "Custom Crockery Units & Bar Cabinets",
      "Focal Chandelier & Pendant Lighting Plans",
    ],
    icon: UtensilsCrossed,
  },
  {
    id: "kitchen",
    number: "04",
    title: "Modular Kitchens",
    subtitle: "Ergonomic Workflow & Premium Finishes",
    description:
      "High-performance modular kitchens engineered for daily cooking. We combine durable, heat-resistant countertops with German-engineered soft-close hardware and seamless pantry organization.",
    features: [
      "Waterproof Acrylic & PU Lacquered Cabinetry",
      "Premium Hardware by Blum / Hafele with Soft-Close",
      "Dedicated Appliance Towers & Pull-Out Pantries",
    ],
    icon: ChefHat,
  },
  {
    id: "accent",
    number: "05",
    title: "Accent & Styling",
    subtitle: "Fluted Panelling, Foyers & Custom Detailing",
    description:
      "The distinguishing architectural elements that elevate a home from standard to extraordinary. We craft memorable entryway foyers, decorative partition screens, fluted wall panels, and bespoke shelving.",
    features: [
      "Statement Entryway Foyers with Mirror Styling",
      "Fluted Charcoal & Gold Wall Louver Panels",
      "Custom Display Niches & Decorative Partitions",
    ],
    icon: Sparkles,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 w-full bg-white text-[#1A1A1A] relative">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* ====================================================================
            HEADER: Authoritative Intro to Core Services
            ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-black/[0.06] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C19B6C]" />
              <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold">
                Our Hyderabad Expertise
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
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[0.95]"
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
                Core Living
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
                Spaces
              </motion.span>
            </motion.h2>
          </div>

          <p className="text-[#1A1A1A] max-w-lg text-sm sm:text-base leading-relaxed font-sans">
            As Hyderabad’s trusted interior design specialists, we provide complete turnkey design and
            execution across every room of your home, ensuring flawless consistency and durable quality.
          </p>
        </div>

        {/* ====================================================================
            SERVICES GRID: 5 Core Living Spaces (Living, Bedroom, Dining, Kitchen, Accent)
            ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceSpaces.map((service, idx) => {
            const Icon = service.icon;
            const isFullWidthCard = idx === 3 || idx === 4;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative group ${
                  idx === 3 ? "lg:col-span-1" : idx === 4 ? "lg:col-span-2" : ""
                }`}
              >
                {/* Subtle offset gold frame revealed on hover */}
                <div
                  className="absolute -inset-1 sm:-inset-1.5 border border-[#C19B6C]/30 pointer-events-none transition-transform duration-500 ease-out group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover:border-[#C19B6C] -z-10"
                  aria-hidden="true"
                />

                <div className="h-full bg-[#FAFAFA] p-8 sm:p-10 border border-black/[0.06] group-hover:border-[#C19B6C]/60 transition-all duration-500 shadow-[0_10px_30px_rgba(26,26,26,0.03)] group-hover:shadow-[0_20px_50px_rgba(193,155,108,0.18)] flex flex-col justify-between group-hover:-translate-x-1 group-hover:-translate-y-1">
                  <div>
                    {/* Top Bar: Icon & Space Identifier */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 bg-white border border-black/[0.06] text-[#1A1A1A] flex items-center justify-center group-hover:bg-[#C19B6C] group-hover:text-white group-hover:border-[#C19B6C] transition-all duration-300 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-sm text-[#1A1A1A]/30 font-semibold group-hover:text-[#C19B6C] transition-colors">
                        {service.number}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#C19B6C] font-semibold block mb-1.5">
                      {service.subtitle}
                    </span>
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-[#1A1A1A] mb-4">
                      {service.title}
                    </h3>

                    {/* Body Text strictly in black for maximum contrast */}
                    <p className="text-[#1A1A1A] text-sm leading-relaxed font-sans mb-6">
                      {service.description}
                    </p>

                    {/* Included Highlights */}
                    <div className="space-y-2.5 pt-4 border-t border-black/[0.06]">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#1A1A1A] font-sans">
                          <CheckCircle2 className="w-4 h-4 text-[#C19B6C] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="mt-8 pt-5 border-t border-black/[0.06] flex items-center justify-between">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#C19B6C] transition-colors"
                    >
                      <span>Discuss This Space</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-widest">
                      Turnkey Hyderabad
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Consultation CTA Strip */}
        <div className="mt-16 p-8 sm:p-10 bg-[#FAFAFA] border border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C19B6C] font-semibold block mb-1">
              Start Your Transformation
            </span>
            <h4 className="font-heading text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              Planning a new home or renovation in Hyderabad?
            </h4>
            <p className="text-sm text-[#1A1A1A] mt-1 font-sans">
              Schedule a private site consultation with our principal interior design team.
            </p>
          </div>

          <MagneticWrapper strength={0.3}>
            <Link
              href="/#contact"
              className="px-8 py-4 bg-[#C19B6C] text-white font-heading font-bold text-xs uppercase tracking-[0.2em] hover:tracking-[0.26em] hover:bg-[#D4AF7A] transition-all duration-300 shadow-md shrink-0 block"
            >
              Schedule Consultation
            </Link>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  );
}
