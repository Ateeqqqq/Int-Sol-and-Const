"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";

const BRAND_LOGO_URL =
  "https://raw.githubusercontent.com/Ateeqqqq/interior-solutions-ho-/refs/heads/main/interior_solutions_transparent.png";

const spaces = [
  { name: "Living Spaces", href: "/#services" },
  { name: "Bedroom Sanctuaries", href: "/#services" },
  { name: "Dining Environments", href: "/#services" },
  { name: "Modular Kitchens", href: "/#services" },
  { name: "Accent & Styling", href: "/#services" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Studio", href: "/#about" },
  { name: "Selected Projects", href: "/#projects" },
  { name: "Core Services", href: "/#services" },
  { name: "Book Consultation", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="w-full bg-white text-[#1A1A1A] border-t border-black/[0.08] pt-20 pb-12 transition-colors"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* ====================================================================
            MAIN TYPOGRAPHIC GRID
            ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-black/[0.06]">
          {/* Column 1: Brand & Official Tagline (Span 4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3.5 group focus:outline-none"
              aria-label="Interior Solutions - Return to homepage"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BRAND_LOGO_URL}
                alt="Interior Solutions Logo"
                width={56}
                height={56}
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-heading font-black tracking-[0.24em] text-base uppercase text-[#1A1A1A] group-hover:text-[#C19B6C] transition-colors">
                  Interior Solutions
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C19B6C] font-mono font-medium">
                  Hyderabad · Atelier
                </span>
              </div>
            </Link>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#C19B6C] font-semibold block">
                Premium Interior Designing in Hyderabad
              </span>
              <p className="text-sm text-[#1A1A1A] font-sans leading-relaxed max-w-sm">
                Transforming residential villas, luxury penthouses, and commercial spaces across
                Hyderabad with turnkey execution, bespoke millwork, and refined spatial elegance.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#1A1A1A]">
              <ShieldCheck className="w-4 h-4 text-[#C19B6C]" />
              <span>Registered Architectural & Turnkey Interior Studio</span>
            </div>
          </div>

          {/* Column 2: Core Spaces (Span 2 cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
              Living Spaces
            </span>
            <ul className="space-y-2.5 text-xs text-[#1A1A1A] font-sans">
              {spaces.map((space) => (
                <li key={space.name}>
                  <Link
                    href={space.href}
                    className="hover:text-[#C19B6C] transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C19B6C] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{space.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Official Address & Studio Location (Span 3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
              Studio Location
            </span>

            <address className="not-italic text-xs text-[#1A1A1A] space-y-3 font-sans leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C19B6C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1A1A1A]">201, West Field Center,</p>
                  <p>Above Dominos, Tolichowki,</p>
                  <p>Hyderabad - 500008, Telangana State,</p>
                  <p>India</p>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.04] text-[11px] font-mono text-[#C19B6C]">
                <span>Serving Tolichowki, Jubilee Hills, Banjara Hills & HITEC City</span>
              </div>
            </address>
          </div>

          {/* Column 4: Official Phone, Email & Hours (Span 3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
              Contact & Inquiries
            </span>

            <div className="text-xs text-[#1A1A1A] space-y-3.5 font-sans">
              {/* Official Phone Numbers */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C19B6C] shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-1">
                  <a
                    href="tel:+919100707409"
                    className="hover:text-[#C19B6C] font-medium transition-colors"
                  >
                    +91 9100707409
                  </a>
                  <a
                    href="tel:+919666162800"
                    className="hover:text-[#C19B6C] font-medium transition-colors"
                  >
                    +91 9666162800
                  </a>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C19B6C] shrink-0 mt-0.5" />
                <a
                  href="mailto:interiorsolutionsho@gmail.com"
                  className="hover:text-[#C19B6C] font-medium transition-colors break-all"
                >
                  interiorsolutionsho@gmail.com
                </a>
              </div>

              {/* Consultation Hours */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-black/[0.04]">
                <Clock className="w-4 h-4 text-[#C19B6C] shrink-0 mt-0.5" />
                <div className="text-[11px] text-[#1A1A1A] space-y-0.5 font-mono">
                  <p>Mon – Sat: 09:30 AM – 07:30 PM</p>
                  <p className="text-[#1A1A1A]/60">Sunday: By Appointment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            SUB-FOOTER: Copyright, Legal & Studio Marker
            ==================================================================== */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#1A1A1A] font-mono gap-4">
          <p>© {new Date().getFullYear()} Interior Solutions. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#C19B6C] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#C19B6C] transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#C19B6C] font-semibold">Tolichowki · Hyderabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
