import { z } from "zod";

/**
 * Zod Schema for Interior Solutions Concierge Inquiries
 * Strictly types and validates client details for residential & commercial commissions.
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (minimum 2 characters)")
    .max(80, "Name must not exceed 80 characters"),

  phoneNumber: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(18, "Phone number is too long")
    .regex(
      /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$|^(\+\d{1,3}[\-\s]?)?\d{10,14}$/,
      "Please enter a valid phone number (e.g. +91 98765 43210)"
    ),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address"),

  projectType: z
    .enum([
      "Residential Interior Architecture",
      "Turnkey Civil Construction",
      "Bespoke Villa Renovation",
      "Commercial & Retail Atelier",
      "Private Architectural Advisory",
    ])
    .default("Residential Interior Architecture"),

  projectDetails: z
    .string()
    .trim()
    .min(10, "Please outline your project scope, location, or timeline (minimum 10 characters)")
    .max(2500, "Project details must not exceed 2500 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
