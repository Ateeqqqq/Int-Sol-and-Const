import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCtaBanner from "@/components/ProjectCtaBanner";

export const metadata: Metadata = {
  title: "Villa | Recent Projects | Interior Solutions",
  description:
    "Private luxury villa interior architecture by Interior Solutions in Hyderabad. Double-height living, sculptural stairways, and custom artisanal finishes.",
};

export default function VillaPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-[#1A1A1A]">
      {/* Global Navigation Header */}
      <Header />

      <main className="flex-1 w-full">
        {/* Editorial Project Hero Section */}
        <section className="pt-40 pb-20 px-6 sm:px-10 lg:px-16 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Back Navigation Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-gray-400 hover:text-[#C19B6C] transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Overview</span>
          </Link>

          {/* Gold Sub-heading */}
          <span className="text-[#C19B6C] text-xs sm:text-sm uppercase tracking-[0.3em] font-mono font-semibold block mb-4">
            RECENT PROJECTS
          </span>

          {/* Project Title */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-[#1A1A1A] leading-[1.05] max-w-4xl">
            Villa
          </h1>

          <p className="mt-6 text-sm sm:text-base text-gray-500 font-sans max-w-xl leading-relaxed">
            A grand private estate sanctuary showcasing double-height architectural zoning, monolithic marble elements, and custom handcrafted woodwork in Hyderabad.
          </p>
        </section>

        {/* Full-width Gallery Placeholder Container */}
        <section className="w-full px-6 sm:px-10 lg:px-16 pb-28">
          <div className="w-full h-[60vh] max-h-[750px] min-h-[420px] bg-gray-100 rounded-3xl border border-gray-200/80 flex flex-col items-center justify-center text-center p-8 select-none">
            <div className="w-12 h-12 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center text-[#C19B6C] mb-4 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-gray-400 uppercase tracking-widest font-heading font-semibold text-xs sm:text-sm">
              Project Gallery Coming Soon
            </span>
            <p className="mt-2 text-xs font-mono text-gray-400 max-w-md">
              High-resolution photography and walkthroughs are currently being curated for this portfolio.
            </p>
          </div>
        </section>

        {/* Bottom Turnkey Call to Action Banner */}
        <ProjectCtaBanner projectName="Villa Portfolio" />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
