"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";

interface ProjectCtaBannerProps {
  projectName?: string;
}

export default function ProjectCtaBanner({ projectName }: ProjectCtaBannerProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitted(true);
  };

  return (
    <section className="w-full bg-[#1A1A1A] text-white py-20 px-6 sm:px-10 lg:px-16 text-center relative overflow-hidden border-t border-white/10 select-none">
      {/* Subtle Ambient Gold Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C19B6C]/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Gold Kicker */}
        <div className="inline-flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C19B6C]" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#C19B6C] font-semibold">
            {projectName ? `${projectName.toUpperCase()} · INSPIRED ARCHITECTURE` : "TURNKEY RESIDENTIAL INTERIORS"}
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
          Want a Similar Turnkey Interior for Your Home?
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-sm sm:text-base text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed">
          Whether you own an apartment in Aparna, My Home, or an independent villa in Hyderabad, we deliver bespoke interiors from blueprint to reality.
        </p>

        {/* 3-Field Quick Capture Bar */}
        <div className="w-full max-w-2xl mx-auto mt-10">
          {isSubmitted ? (
            <div className="p-6 bg-white/5 border border-[#C19B6C]/40 rounded-2xl flex items-center justify-center gap-3 text-center animate-in fade-in duration-300">
              <CheckCircle2 className="w-5 h-5 text-[#C19B6C] shrink-0" />
              <span className="text-sm font-sans text-white/90">
                Thank you, <strong className="text-[#C19B6C] font-semibold">{name}</strong>. Our principal designer will reach out via <strong className="text-white">{phone}</strong> shortly.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-2 sm:p-2 bg-white/5 border border-white/15 rounded-2xl sm:rounded-full backdrop-blur-md shadow-2xl focus-within:border-[#C19B6C]/60 transition-colors"
            >
              {/* Field 1: Name */}
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-white placeholder-white/40 px-5 py-3.5 text-xs sm:text-sm outline-none w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-white/10 focus:placeholder-white/20 font-sans"
              />

              {/* Field 2: Phone Number */}
              <input
                type="tel"
                required
                placeholder="Phone Number / WhatsApp"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent text-white placeholder-white/40 px-5 py-3.5 text-xs sm:text-sm outline-none w-full sm:w-1/2 focus:placeholder-white/20 font-sans"
              />

              {/* Field 3: Gold Action Button */}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#C19B6C] text-[#1A1A1A] font-heading font-bold uppercase tracking-[0.16em] text-xs px-7 py-3.5 rounded-xl sm:rounded-full hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 shadow-md shrink-0 cursor-pointer active:scale-95"
              >
                <span>Request Callback</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Micro Trust Guarantee */}
        <p className="mt-4 text-[11px] font-mono text-white/40">
          Complimentary 30-min design walkthrough · Direct studio contact at Tolichowki, Hyderabad
        </p>
      </div>
    </section>
  );
}
