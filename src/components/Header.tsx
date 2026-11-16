"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Menu, X, Sparkles } from "lucide-react";
import MagneticWrapper from "@/components/MagneticWrapper";

const BRAND_LOGO_URL =
  "https://raw.githubusercontent.com/Ateeqqqq/interior-solutions-ho-/refs/heads/main/preview_white_on_dark-removebg-preview.png";

// Recent Project items for the dropdown
const recentProjectItems = [
  {
    title: "Aparna Zicon Sarovar",
    subtitle: "Luxury High-Rise Residence",
    href: "/projects/aparna-zicon-sarovar",
  },
  {
    title: "Aparna Zenon",
    subtitle: "Contemporary Urban Interior",
    href: "/projects/aparna-zenon",
  },
  {
    title: "Aparna Luxor",
    subtitle: "Bespoke Premium Living",
    href: "/projects/aparna-luxor",
  },
  {
    title: "Villa",
    subtitle: "Custom Architectural Sanctuary",
    href: "/projects/villa",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll state for subtle elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth hover handlers with safety delay to prevent jitter
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setCollectionOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCollectionOpen(false);
    }, 180);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    {
      name: "RECENT PROJECTS",
      href: "/#projects",
      hasDropdown: true,
    },
    { name: "Design Ideas", href: "/#services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      role="banner"
      className={`top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "fixed bg-black/85 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3 sm:py-4"
          : pathname !== "/"
          ? "absolute bg-black/85 backdrop-blur-md py-4 sm:py-5"
          : "absolute bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* ====================================================================
            LOGO: Compact, sleek & architectural
            ==================================================================== */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Interior Solutions - Return to homepage"
        >
          <div className="relative flex items-center justify-center">
            <Image
              src={BRAND_LOGO_URL}
              alt="Interior Solutions Logo"
              width={564}
              height={443}
              priority
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-heading font-black tracking-[0.22em] text-xs sm:text-sm uppercase text-white group-hover:text-[#C19B6C] transition-colors duration-300">
              Interior Solutions
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C19B6C] font-mono font-medium">
              Hyderabad
            </span>
          </div>
        </Link>

        {/* ====================================================================
            DESKTOP NAVIGATION: 5 Main Links in Crisp Minimalist Sizing (11px / text-xs)
            ==================================================================== */}
        <nav
          role="navigation"
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 xl:gap-9 text-[11px] font-heading font-semibold uppercase tracking-[0.24em] text-white"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.hasDropdown) {
              return (
                <MagneticWrapper key={link.name} strength={0.18}>
                  <div
                    className="relative py-1.5"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => setCollectionOpen((prev) => !prev)}
                      className={`group inline-flex items-center gap-1.5 transition-colors duration-300 focus:outline-none ${
                        collectionOpen
                          ? "text-[#C19B6C]"
                          : "text-white hover:text-[#C19B6C]"
                      }`}
                      aria-expanded={collectionOpen}
                      aria-haspopup="true"
                    >
                      <span className="tracking-[0.24em] group-hover:tracking-[0.3em] transition-[letter-spacing] duration-300">
                        {link.name}
                      </span>
                      <motion.span
                        animate={{ rotate: collectionOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <ChevronDown className="w-3 h-3 text-[#C19B6C]" />
                      </motion.span>
                    </button>

                    {/* Active/Hover Gold Accent Underline */}
                    <motion.div
                      className="h-[1.5px] bg-[#C19B6C] absolute bottom-0 left-0 right-0 origin-center"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: collectionOpen ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* -----------------------------------------------------------
                        RECENT PROJECTS DROPDOWN: Floating Dark Atelier Menu
                        Links: Aparna Zicon Sarovar, Aparna Zenon, Aparna Luxor, Villa
                        ----------------------------------------------------------- */}
                    <AnimatePresence>
                      {collectionOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-84 pt-3 z-50"
                        >
                          <div className="bg-[#1A1A1A] border border-white/10 border-t-2 border-t-[#C19B6C] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-3">
                            <div className="px-3 pt-2 pb-2.5 border-b border-white/10 flex items-center justify-between">
                              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C19B6C] font-semibold">
                                Curated Portfolios
                              </span>
                              <span className="text-[10px] font-mono text-white/50">
                                4 Projects
                              </span>
                            </div>

                            <div className="flex flex-col py-1">
                              {recentProjectItems.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={() => setCollectionOpen(false)}
                                  className="group relative flex items-center justify-between px-3.5 py-3 transition-all duration-300 hover:bg-white/5 rounded-none"
                                >
                                  <div className="flex flex-col">
                                    <span className="font-heading font-semibold text-xs tracking-wider uppercase text-white group-hover:text-[#C19B6C] transition-colors flex items-center gap-2">
                                      <span>{item.title}</span>
                                      <span className="w-1 h-1 rounded-full bg-[#C19B6C] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </span>
                                    <span className="text-[10px] font-sans text-white/60 group-hover:text-white/90 transition-colors">
                                      {item.subtitle}
                                    </span>
                                  </div>

                                  <div className="w-6 h-6 flex items-center justify-center text-white/40 group-hover:text-[#C19B6C] group-hover:translate-x-0.5 transition-all">
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </div>

                                  {/* Subtle left gold indicator bar on hover */}
                                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C19B6C] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </MagneticWrapper>
              );
            }

            return (
              <MagneticWrapper key={link.name} strength={0.18}>
                <Link
                  href={link.href}
                  className="relative py-1.5 group transition-colors duration-300 hover:text-[#C19B6C] focus:outline-none block"
                >
                  <span
                    className={`block tracking-[0.24em] group-hover:tracking-[0.3em] transition-all duration-300 ${
                      isActive ? "text-[#C19B6C]" : "text-white group-hover:text-[#C19B6C]"
                    }`}
                  >
                    {link.name}
                  </span>

                  {/* Animated Gold Underline on Hover */}
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C19B6C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              </MagneticWrapper>
            );
          })}
        </nav>

        {/* ====================================================================
            RIGHT ACTION: Inquire Button with Warm Gold Accent
            ==================================================================== */}
        <div className="hidden lg:flex items-center gap-4">
          <MagneticWrapper strength={0.25}>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-5 py-2 bg-black/40 backdrop-blur-sm text-white text-[11px] font-heading font-bold uppercase tracking-[0.22em] group-hover:tracking-[0.26em] transition-all duration-300 hover:shadow-[0_0_24px_rgba(193,155,108,0.4)] border border-white/25 hover:border-[#C19B6C]"
            >
              <span>Inquire</span>
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C19B6C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </Link>
          </MagneticWrapper>
        </div>

        {/* ====================================================================
            MOBILE HAMBURGER BUTTON: Pure White Icon with Gold Hover
            ==================================================================== */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="w-9 h-9 flex items-center justify-center text-white hover:text-[#C19B6C] transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ====================================================================
          MOBILE DRAWER NAVIGATION (Framer Motion)
          ==================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden w-full bg-[#1A1A1A] border-b border-white/10 px-6 py-8 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-6">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading text-lg font-bold uppercase tracking-[0.18em] text-white hover:text-[#C19B6C] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading text-lg font-bold uppercase tracking-[0.18em] text-white hover:text-[#C19B6C] transition-colors"
              >
                About
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading text-lg font-bold uppercase tracking-[0.18em] text-white hover:text-[#C19B6C] transition-colors"
              >
                Services
              </Link>

              {/* Mobile Recent Projects Sub-menu */}
              <div className="border-t border-b border-white/10 py-4 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C19B6C] font-semibold block">
                  Recent Projects
                </span>
                <div className="flex flex-col space-y-2 pt-1">
                  {recentProjectItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3.5 py-2.5 bg-white/5 text-xs font-heading font-medium tracking-wider text-white hover:text-[#C19B6C] hover:bg-[#C19B6C]/10 transition-colors flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        <span className="text-[10px] text-white/50 font-sans tracking-normal">{item.subtitle}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C19B6C]" />
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/#services"
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading text-lg font-bold uppercase tracking-[0.18em] text-white hover:text-[#C19B6C] transition-colors"
              >
                Design Ideas
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading text-lg font-bold uppercase tracking-[0.18em] text-white hover:text-[#C19B6C] transition-colors"
              >
                Contact
              </Link>

              <div className="pt-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center py-4 bg-[#C19B6C] text-white font-heading font-bold text-xs uppercase tracking-[0.2em] shadow-md hover:bg-[#D4AF7A] transition-colors"
                >
                  Book Private Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
