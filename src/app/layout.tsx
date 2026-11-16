import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import GlobalEffects from "@/components/GlobalEffects";
import WhatsAppFloater from "@/components/WhatsAppFloater";
import ConsultationPopup from "@/components/ConsultationPopup";
import MobileStickyBar from "@/components/MobileStickyBar";

const BRAND_LOGO_URL =
  "https://raw.githubusercontent.com/Ateeqqqq/interior-solutions-ho-/refs/heads/main/interior_solutions_transparent.png";

// Structural, clean headers
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Highly legible body copy
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Localized Dynamic Metadata for Search Engines
export const metadata: Metadata = {
  metadataBase: new URL("https://interiorsolutions.in"),
  title: {
    default:
      "Interior Solutions | Premium Interior Designers in Hyderabad & Residential Construction",
    template: "%s | Interior Solutions Hyderabad",
  },
  description:
    "Interior Solutions is a premier studio for luxury interior design and turnkey residential construction in Hyderabad. We deliver effortless spatial architecture, bespoke materiality, and curated living spaces.",
  keywords: [
    "premium interior designers in Hyderabad",
    "residential construction in Hyderabad",
    "interior designers in Hyderabad",
    "turnkey interior contractors Hyderabad",
    "luxury interior design Hyderabad",
    "architectural interiors Hyderabad",
    "civil construction Hyderabad",
    "bespoke home interiors Tolichowki",
    "Interior Solutions Hyderabad",
  ],
  authors: [{ name: "Interior Solutions", url: "https://interiorsolutions.in" }],
  creator: "Interior Solutions",
  publisher: "Interior Solutions",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://interiorsolutions.in",
    siteName: "Interior Solutions",
    title:
      "Interior Solutions | Premium Interior Designers & Residential Construction",
    description:
      "Airy, modern, and effortless interior design and residential construction studio based in Hyderabad.",
    images: [
      {
        url: BRAND_LOGO_URL,
        width: 1200,
        height: 630,
        alt: "Interior Solutions - Premium Interior Designers & Residential Construction in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Interior Solutions | Premium Interior Designers in Hyderabad & Residential Construction",
    description:
      "Bespoke interior design and turnkey residential construction in Hyderabad.",
    images: [BRAND_LOGO_URL],
  },
  icons: {
    icon: [{ url: BRAND_LOGO_URL, type: "image/png" }],
    shortcut: [BRAND_LOGO_URL],
    apple: [BRAND_LOGO_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        {/* LocalBusiness JSON-LD Schema Script */}
        <StructuredData />
      </head>
      <body className="w-full min-h-screen bg-white text-[#1A1A1A] antialiased selection:bg-[#C19B6C] selection:text-white font-sans overflow-x-hidden flex flex-col">
        {/* Accessible Skip Navigation for Assistive Technologies */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#1A1A1A] focus:border focus:border-[#C19B6C] focus:shadow-md text-xs font-mono uppercase tracking-widest"
        >
          Skip to main content
        </a>

        {/* Subtle Ambient Global Visual Effects */}
        <GlobalEffects>
          {children}
        </GlobalEffects>

        {/* Global Floating WhatsApp Consultation Widget */}
        <WhatsAppFloater />

        {/* Timed Private Consultation Popup */}
        <ConsultationPopup />

        {/* Mobile Sticky Quick Action Bar */}
        <MobileStickyBar />
      </body>
    </html>
  );
}
