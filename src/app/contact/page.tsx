import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Instagram, Youtube, Facebook } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/interiorsolutionshoindia",
    icon: Instagram,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@interiorsolutions",
    icon: Youtube,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Interior-Solutions-H-O/100090914154048/",
    icon: Facebook,
  },
];

export const metadata: Metadata = {
  title: "Contact Us | Premium Interior Designers in Hyderabad | Interior Solutions",
  description:
    "Get in touch with Interior Solutions in Tolichowki, Hyderabad. We provide end-to-end luxury residential interior design, modular execution, and turnkey construction across Jubilee Hills, Banjara Hills, and Greater Hyderabad.",
  keywords: [
    "Contact Interior Solutions",
    "Interior Designers in Hyderabad contact",
    "Tolichowki interior design studio",
    "Jubilee Hills interior architects",
    "turnkey home construction Hyderabad consultation",
    "Interior Solutions phone number",
    "Interior Solutions email",
  ],
  openGraph: {
    title: "Contact Interior Solutions | Hyderabad Interior Design & Construction",
    description:
      "Schedule a consultation with our Tolichowki studio. Complete home interior solutions from 3D design to turnkey handover.",
    url: "https://interiorsolutionshyd.com/contact",
    images: [
      {
        url: "https://raw.githubusercontent.com/Ateeqqqq/interior-solutions-ho-/refs/heads/main/interior_solutions_transparent.png",
        width: 1200,
        height: 630,
        alt: "Interior Solutions Hyderabad Logo",
      },
    ],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-white text-[#1A1A1A] flex flex-col justify-between selection:bg-[#C19B6C] selection:text-white">
      {/* 1. Global Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="relative z-10 w-full flex-1 pt-32 pb-24 sm:pt-40 sm:pb-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
          {/* ====================================================================
              2. PAGE HEADER: Minimalist Hero Section (Bold Black Montserrat)
              ==================================================================== */}
          <section className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C19B6C]" />
              <span className="text-[#C19B6C] text-xs uppercase tracking-[0.28em] font-mono font-semibold">
                Direct Consultation · Hyderabad Studio
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[0.96] text-[#1A1A1A]">
              Let’s Build Your <br />
              <span className="font-light italic text-[#C19B6C]">Dream Space</span>
            </h1>

            <p className="text-base sm:text-lg text-[#1A1A1A]/80 font-sans leading-relaxed max-w-2xl pt-2">
              We provide premium interior design and turnkey construction services across Hyderabad.
              From conceptual 3D architecture to bespoke modular execution, our team brings sophisticated
              craftsmanship to homes and commercial spaces throughout Tolichowki, Jubilee Hills, and Banjara Hills.
            </p>
          </section>

          {/* ====================================================================
              3. SPLIT LAYOUT (GRID): Left Details & Map | Right Form
              ==================================================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* ------------------------------------------------------------------
                LEFT COLUMN: Contact Details & Google Maps Embed
                ------------------------------------------------------------------ */}
            <div className="lg:col-span-5 flex flex-col space-y-12">
              {/* Typographic Contact Details */}
              <div className="space-y-10">
                {/* Physical Address */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C19B6C]">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#1A1A1A]/60 font-medium">
                      Studio Coordinates
                    </span>
                  </div>
                  <p className="text-base font-medium text-[#1A1A1A] leading-snug">
                    201, West Field Center, Above Dominos,
                    <br />
                    Tolichowki, Hyderabad - 500008,
                    <br />
                    Telangana State, India
                  </p>
                  <p className="text-xs text-[#C19B6C] font-mono pt-1">
                    Serving Tolichowki, Jubilee Hills, Banjara Hills & Greater Hyderabad
                  </p>
                </div>

                {/* Direct Telephones */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C19B6C]">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#1A1A1A]/60 font-medium">
                      Direct Telephones
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <a
                      href="tel:+919100707409"
                      className="text-lg sm:text-xl font-heading font-bold text-[#1A1A1A] hover:text-[#C19B6C] transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>+91 9100707409</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C19B6C]" />
                    </a>
                    <a
                      href="tel:+919666162800"
                      className="text-lg sm:text-xl font-heading font-bold text-[#1A1A1A] hover:text-[#C19B6C] transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>+91 9666162800</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C19B6C]" />
                    </a>
                  </div>
                </div>

                {/* Email Inquiries */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C19B6C]">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#1A1A1A]/60 font-medium">
                      Email Coordinates
                    </span>
                  </div>
                  <a
                    href="mailto:interiorsolutionsho@gmail.com"
                    className="text-base sm:text-lg font-sans font-medium text-[#1A1A1A] hover:text-[#C19B6C] transition-colors inline-flex items-center gap-2 group break-all"
                  >
                    <span>interiorsolutionsho@gmail.com</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C19B6C]" />
                  </a>
                </div>

                {/* Studio Consultation Hours */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C19B6C]">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#1A1A1A]/60 font-medium">
                      Consultation Hours
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#1A1A1A]">
                    Monday – Saturday: 09:30 AM – 07:30 PM (IST)
                  </p>
                  <p className="text-xs text-[#1A1A1A]/50">
                    Sunday by prior appointment for on-site design reviews.
                  </p>
                </div>

                {/* Official Social Media Channels */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2 text-[#C19B6C]">
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#1A1A1A]/60 font-medium">
                      Official Social Channels
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow Interior Solutions on ${social.name}`}
                          className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#1A1A1A] hover:text-[#C19B6C] hover:border-[#C19B6C] hover:bg-[#C19B6C]/5 transition-all duration-300 shadow-sm"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Google Maps Embed with Rounded Corners & Subtle Shadow */}
              <div className="space-y-3 pt-2">
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(26,26,26,0.06)] border border-black/[0.06] relative bg-[#FAFAFA]">
                  <iframe
                    title="Interior Solutions Tolichowki Studio Location"
                    src="https://maps.google.com/maps?q=West+Field+Center+Above+Dominos+Tolichowki+Hyderabad+500008&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#1A1A1A]/50 px-1">
                  <span>West Field Center · Above Dominos</span>
                  <Link
                    href="https://maps.google.com/maps?q=West+Field+Center+Above+Dominos+Tolichowki+Hyderabad+500008"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C19B6C] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open in Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------
                RIGHT COLUMN: ContactForm Component (Embedded Mode)
                ------------------------------------------------------------------ */}
            <div className="lg:col-span-7">
              <ContactForm embedded={true} />
            </div>
          </section>
        </div>
      </main>

      {/* 4. Global Footer with Business Details */}
      <Footer />
    </div>
  );
}
