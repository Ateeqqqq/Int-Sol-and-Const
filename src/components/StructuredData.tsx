import React from "react";

/**
 * StructuredData Component
 *
 * Injects a Schema.org LocalBusiness (HomeAndConstructionBusiness) JSON-LD payload
 * into the <head> for local search engines and Answer Engines (AEO).
 */
export default function StructuredData() {
  const logoUrl =
    "https://raw.githubusercontent.com/Ateeqqqq/interior-solutions-ho-/refs/heads/main/interior_solutions_transparent.png";

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://interiorsolutions.in/#business",
    name: "Interior Solutions",
    alternateName: "Interior Solutions Hyderabad",
    description:
      "Premier interior design and residential construction firm in Hyderabad. Specializing in luxury architectural interiors, space planning, bespoke millwork, and turnkey residential builds.",
    url: "https://interiorsolutions.in",
    logo: logoUrl,
    image: logoUrl,
    telephone: "+91-9100707409",
    email: "interiorsolutionsho@gmail.com",
    priceRange: "₹₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, UPI",
    address: {
      "@type": "PostalAddress",
      streetAddress: "201, West Field Center, Above Dominos, Tolichowki",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana State",
      postalCode: "500008",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.3995,
      longitude: 78.4124,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Hyderabad",
      },
      {
        "@type": "AdministrativeArea",
        name: "Tolichowki",
      },
      {
        "@type": "AdministrativeArea",
        name: "Jubilee Hills",
      },
      {
        "@type": "AdministrativeArea",
        name: "Banjara Hills",
      },
      {
        "@type": "AdministrativeArea",
        name: "Gachibowli",
      },
      {
        "@type": "AdministrativeArea",
        name: "HITEC City",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:30",
        closes: "19:30",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior Design & Residential Construction Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interior Design",
            description:
              "Haute residential interior design, space planning, lighting choreography, and bespoke furniture curation in Hyderabad.",
            areaServed: "Hyderabad",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Construction",
            description:
              "Turnkey civil construction, architectural elevations, structural renovations, and ground-up builds across Hyderabad.",
            areaServed: "Hyderabad",
          },
        },
      ],
    },
    sameAs: [
      "https://www.instagram.com/interiorsolutions",
      "https://www.linkedin.com/company/interiorsolutions",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessSchema),
      }}
    />
  );
}
