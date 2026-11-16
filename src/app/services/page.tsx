import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bespoke Services | Interior Solutions Hyderabad",
  description:
    "A comprehensive approach to luxury interior architecture, tailored to elevate the human experience within the built environment. Complete residential and commercial turnkey execution in Hyderabad.",
  keywords: [
    "Interior Design Hyderabad",
    "Bespoke Interior Services",
    "Architectural Styling Hyderabad",
    "Turnkey Execution Hyderabad",
    "Tolichowki interior designers",
    "Jubilee Hills luxury interiors",
  ],
};

const services = [
  {
    number: "01",
    title: "Interior Design",
    description: "Luxury residential interiors tailored to the rhythm of modern living.",
    href: "/contact?service=interior-design",
  },
  {
    number: "02",
    title: "Architectural Styling",
    description: "Spatial solutions balancing beauty, function, and longevity.",
    href: "/contact?service=architectural-styling",
  },
  {
    number: "03",
    title: "Turnkey Execution",
    description: "End-to-end delivery managed with precision and craftsmanship.",
    href: "/contact?service=turnkey-execution",
  },
];

const approachSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding lifestyle, aspirations, and spatial vision.",
  },
  {
    number: "02",
    title: "Design",
    description: "Translating ideas into a cohesive architectural language.",
  },
  {
    number: "03",
    title: "Craft",
    description: "Executing every detail with precision and care.",
  },
  {
    number: "04",
    title: "Delivery",
    description: "Presenting a complete environment ready for living.",
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full min-h-screen bg-white text-[#1A1A1A] flex flex-col justify-between selection:bg-[#C19B6C] selection:text-white">
      {/* 1. Global Navigation Header */}
      <Header />

      <main className="relative z-10 w-full flex-1">
        {/* ====================================================================
            1. HERO SECTION
            - Heavy top padding (pt-40 pb-20) to clear the transparent header
            - Heading: "Bespoke Services" (large Montserrat, black)
            - Subtext: max-w-xl, gray-500, Inter
            ==================================================================== */}
        <section className="pt-40 pb-20 px-6 sm:px-10 lg:px-16 w-full border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex flex-col items-start">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#C19B6C]" />
              <span className="text-xs font-mono uppercase tracking-[0.28em] text-[#C19B6C] font-semibold">
                Architecture & Interior Atelier
              </span>
            </div>

            <h1 className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase text-[#1A1A1A] leading-[0.95]">
              Bespoke Services
            </h1>

            <p className="mt-8 font-sans text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl">
              A comprehensive approach to luxury interior architecture, tailored to elevate the human
              experience within the built environment.
            </p>
          </div>
        </section>

        {/* ====================================================================
            2. SERVICE LIST SECTION
            - Vertical list of three services separated by thin light gray lines
            - Top of the list has a border-t border-gray-200
            - 3-column layout per row: Number (gold) | Title + Desc | "EXPLORE →"
            - Smooth CSS hover background shift to hover:bg-gray-50
            ==================================================================== */}
        <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-7xl mx-auto">
            {/* Top border of the list */}
            <div className="w-full border-t border-gray-200">
              {services.map((service) => (
                <Link
                  key={service.number}
                  href={service.href}
                  className="group block w-full py-12 sm:py-16 px-4 sm:px-8 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="grid grid-cols-12 gap-6 sm:gap-8 items-baseline sm:items-center">
                    {/* Left Column: Number ("01", "02", "03") in small, warm gold text */}
                    <div className="col-span-2 sm:col-span-1">
                      <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#C19B6C]">
                        {service.number}
                      </span>
                    </div>

                    {/* Middle Column (Flex-col): Service Title & Brief Description */}
                    <div className="col-span-10 sm:col-span-8 lg:col-span-9 flex flex-col pr-0 sm:pr-8">
                      <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] tracking-tight uppercase group-hover:text-[#C19B6C] transition-colors duration-300">
                        {service.title}
                      </h2>
                      <p className="mt-2.5 font-sans text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl">
                        {service.description}
                      </p>
                    </div>

                    {/* Right Column: "EXPLORE →" (tiny, uppercase, tracking-widest) */}
                    <div className="col-span-12 sm:col-span-3 lg:col-span-2 flex items-center justify-start sm:justify-end mt-2 sm:mt-0">
                      <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#1A1A1A] group-hover:text-[#C19B6C] transition-all duration-300 group-hover:translate-x-1.5 font-semibold">
                        <span>EXPLORE</span>
                        <span className="text-[#C19B6C] text-sm font-bold">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            3. FULL-WIDTH VISUAL BREAK
            - Massive, full-bleed image container (w-full h-[60vh] lg:h-[80vh])
            - High-quality warm-toned living room via next/image object-cover
            ==================================================================== */}
        <section className="relative w-full h-[60vh] lg:h-[80vh] overflow-hidden select-none bg-neutral-900">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85"
            alt="Interior Solutions - Bespoke Architectural Living Room Design"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle dark gradient overlay to ground the composition */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        </section>

        {/* ====================================================================
            4. "OUR APPROACH" GRID
            - Spacious section with pure white background (py-24)
            - Top-left label: "OUR APPROACH" (uppercase, tracking-widest, gray-400)
            - 4-column grid (1 col on mobile, 2 on tablet, 4 on desktop)
            - Numbers 01-04 in faint gold (#C19B6C/50), black Montserrat titles, gray Inter descriptions
            ==================================================================== */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 w-full bg-white">
          <div className="max-w-7xl mx-auto flex flex-col items-start">
            {/* Top-left subtle label */}
            <span className="text-xs uppercase tracking-[0.28em] font-mono text-gray-400 font-semibold block mb-12 sm:mb-16">
              OUR APPROACH
            </span>

            {/* 4-Column Approach Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-14 lg:gap-10 w-full">
              {approachSteps.map((step) => (
                <div key={step.number} className="flex flex-col items-start group">
                  {/* Number in faint gold */}
                  <span className="font-mono text-4xl sm:text-5xl font-light text-[#C19B6C]/50 mb-4 sm:mb-6 block transition-colors duration-300 group-hover:text-[#C19B6C]">
                    {step.number}
                  </span>

                  {/* Title in black Montserrat */}
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1A1A1A] tracking-tight uppercase">
                    {step.title}
                  </h3>

                  {/* Description in small gray Inter */}
                  <p className="mt-3 font-sans text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            5. DARK CTA BLOCK
            - Full-width block with deep black background (bg-[#1A1A1A]) and heavy vertical padding (py-32)
            - Center-aligned typography and button
            - Large Montserrat white heading: "Ready to Begin Your Journey?"
            - Gray subtext (max-w-lg mx-auto mt-6)
            - Solid gold button (bg-[#C19B6C] text-[#1A1A1A]) with subtle scale-up on hover
            ==================================================================== */}
        <section className="w-full bg-[#1A1A1A] py-28 sm:py-32 px-6 sm:px-10 lg:px-16 text-white">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            {/* Subtle Gold Sub-kicker */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-[#C19B6C]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#C19B6C] font-semibold">
                Start Your Project
              </span>
              <span className="w-6 h-px bg-[#C19B6C]" />
            </div>

            {/* Main Headline */}
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-white leading-[1.08]">
              Ready to Begin Your Journey?
            </h2>

            {/* Subtext */}
            <p className="mt-6 text-gray-400 font-sans text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
              Schedule a private consultation with our principal designer to discuss your vision,
              timeline, and the possibilities of your space.
            </p>

            {/* Primary Action Button */}
            <div className="mt-10 sm:mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 sm:px-12 py-5 bg-[#C19B6C] text-[#1A1A1A] font-heading font-bold text-xs sm:text-sm uppercase tracking-[0.24em] transition-all duration-300 hover:scale-105 hover:bg-[#D4AF7A] shadow-[0_12px_35px_rgba(193,155,108,0.35)] hover:shadow-[0_18px_45px_rgba(193,155,108,0.5)] active:scale-100"
              >
                <span>BOOK A CONSULTATION</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
