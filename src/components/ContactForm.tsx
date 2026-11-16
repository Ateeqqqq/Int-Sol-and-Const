"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
} from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { submitLead, type SubmitLeadResponse } from "@/actions/submitLead";
import MagneticButton from "@/components/MagneticButton";

export interface ContactFormProps {
  id?: string;
  isStandalonePage?: boolean;
  className?: string;
  showCoordinates?: boolean;
  embedded?: boolean;
  title?: string;
  highlightedTitle?: string;
  subtitle?: string;
  description?: string;
}

export default function ContactForm({
  id = "contact",
  isStandalonePage = false,
  className = "",
  showCoordinates = true,
  embedded = false,
  title = "Book A Design",
  highlightedTitle = "Consultation",
  subtitle = "The Concierge Desk · Hyderabad",
  description = "Connect directly with our Hyderabad interior design team. We provide end-to-end design, modular execution, and turnkey construction for homes and businesses across the city.",
}: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [submissionResult, setSubmissionResult] = useState<SubmitLeadResponse | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      projectType: "Residential Interior Architecture",
      projectDetails: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    startTransition(async () => {
      try {
        const response = await submitLead(data);
        setSubmissionResult(response);
        if (response.success) {
          reset();
        }
      } catch (err) {
        setSubmissionResult({
          success: false,
          message:
            "Unable to dispatch your consultation inquiry. Please try again or call our studio desk directly.",
        });
      }
    });
  };

  const handleReset = () => {
    setSubmissionResult(null);
    reset();
  };

  const renderFormBody = () => (
    <AnimatePresence mode="wait">
      {submissionResult?.success ? (
        /* =============================================================
           INLINE SUCCESS STATE: Smooth Fade Into "Thank You" Card
           ============================================================= */
        <motion.div
          key="success-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 flex flex-col items-center text-center space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-[#C19B6C]/10 border border-[#C19B6C] flex items-center justify-center text-[#C19B6C] shadow-[0_0_35px_rgba(193,155,108,0.25)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.28em] text-[#C19B6C] font-semibold">
              Consultation Confirmed
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#1A1A1A]">
              Thank You
            </h3>
          </div>

          <p className="text-sm sm:text-base text-[#1A1A1A] max-w-md font-sans leading-relaxed">
            {submissionResult.message}
          </p>

          {submissionResult.referenceId && (
            <div className="px-5 py-2.5 bg-white border border-black/[0.08] font-mono text-xs text-[#1A1A1A] shadow-sm">
              <span className="text-[#1A1A1A]/60">Inquiry Reference ID: </span>
              <strong className="text-[#C19B6C] font-bold">
                {submissionResult.referenceId}
              </strong>
            </div>
          )}

          <button
            onClick={handleReset}
            className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#C19B6C] transition-colors border-b border-black/20 hover:border-[#C19B6C] pb-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Submit Another Inquiry</span>
          </button>
        </motion.div>
      ) : (
        /* =============================================================
           FORM STATE: Borderless Inputs with Bottom-Border Line Transition
           ============================================================= */
        <motion.form
          key="concierge-form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-10"
          noValidate
        >
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
              Interior Design Consultation Form
            </span>
            <span className="text-[10px] font-mono text-[#C19B6C] uppercase tracking-wider">
              Tolichowki · Hyderabad
            </span>
          </div>

          {/* FIELD 1: Full Name */}
          <div className="relative">
            <label
              htmlFor="fullName"
              className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-1"
            >
              Client Name *
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                disabled={isPending}
                placeholder="e.g. Tariq Mansoor"
                {...register("fullName")}
                className={`peer w-full bg-transparent border-0 border-b py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 transition-colors duration-300 focus:outline-none focus:ring-0 rounded-none ${
                  errors.fullName
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#1A1A1A]/20 focus:border-transparent"
                }`}
              />
              {/* Smooth center-outwards sliding gold border line */}
              {!errors.fullName && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C19B6C] scale-x-0 origin-center transition-transform duration-500 ease-out peer-focus:scale-x-100 pointer-events-none" />
              )}
            </div>
            {errors.fullName && (
              <span className="text-[11px] font-mono text-red-500 mt-1 block">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* TWO-COLUMN ROW: Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* FIELD 2: Phone */}
            <div className="relative">
              <label
                htmlFor="phoneNumber"
                className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-1"
              >
                Direct Telephone *
              </label>
              <div className="relative">
                <input
                  id="phoneNumber"
                  type="tel"
                  disabled={isPending}
                  placeholder="+91 98765 43210"
                  {...register("phoneNumber")}
                  className={`peer w-full bg-transparent border-0 border-b py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 transition-colors duration-300 focus:outline-none focus:ring-0 rounded-none ${
                    errors.phoneNumber
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#1A1A1A]/20 focus:border-transparent"
                  }`}
                />
                {!errors.phoneNumber && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C19B6C] scale-x-0 origin-center transition-transform duration-500 ease-out peer-focus:scale-x-100 pointer-events-none" />
                )}
              </div>
              {errors.phoneNumber && (
                <span className="text-[11px] font-mono text-red-500 mt-1 block">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            {/* FIELD 3: Email */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-1"
              >
                Email Coordinates *
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  disabled={isPending}
                  placeholder="tariq@residence.com"
                  {...register("email")}
                  className={`peer w-full bg-transparent border-0 border-b py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 transition-colors duration-300 focus:outline-none focus:ring-0 rounded-none ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#1A1A1A]/20 focus:border-transparent"
                  }`}
                />
                {!errors.email && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C19B6C] scale-x-0 origin-center transition-transform duration-500 ease-out peer-focus:scale-x-100 pointer-events-none" />
                )}
              </div>
              {errors.email && (
                <span className="text-[11px] font-mono text-red-500 mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* FIELD 4: Service Required */}
          <div className="relative">
            <label
              htmlFor="projectType"
              className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-1"
            >
              Service Required
            </label>
            <div className="relative">
              <select
                id="projectType"
                disabled={isPending}
                {...register("projectType")}
                className="peer w-full bg-transparent border-0 border-b border-[#1A1A1A]/20 focus:border-transparent py-3 text-sm text-[#1A1A1A] transition-colors duration-300 focus:outline-none focus:ring-0 rounded-none cursor-pointer"
              >
                <option value="Residential Interior Architecture">
                  Complete Home Interior Design
                </option>
                <option value="Turnkey Civil Construction">
                  Turnkey Residential Construction
                </option>
                <option value="Bespoke Villa Renovation">
                  Living Room & Bedroom Renovation
                </option>
                <option value="Commercial & Retail Atelier">
                  Modular Kitchen & Dining Setup
                </option>
                <option value="Private Architectural Advisory">
                  Accent Panelling & False Ceiling
                </option>
              </select>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C19B6C] scale-x-0 origin-center transition-transform duration-500 ease-out peer-focus:scale-x-100 pointer-events-none" />
            </div>
          </div>

          {/* FIELD 5: Project Details */}
          <div className="relative">
            <label
              htmlFor="projectDetails"
              className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-1"
            >
              Project Details & Vision *
            </label>
            <div className="relative">
              <textarea
                id="projectDetails"
                rows={4}
                disabled={isPending}
                placeholder="Outline your location (e.g. Tolichowki, Jubilee Hills), square footage, desired timeline, or aesthetic preferences..."
                {...register("projectDetails")}
                className={`peer w-full bg-transparent border-0 border-b py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 transition-colors duration-300 focus:outline-none focus:ring-0 resize-none rounded-none ${
                  errors.projectDetails
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#1A1A1A]/20 focus:border-transparent"
                }`}
              />
              {!errors.projectDetails && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C19B6C] scale-x-0 origin-center transition-transform duration-500 ease-out peer-focus:scale-x-100 pointer-events-none" />
              )}
            </div>
            {errors.projectDetails && (
              <span className="text-[11px] font-mono text-red-500 mt-1 block">
                {errors.projectDetails.message}
              </span>
            )}
          </div>

          {/* Server Error Notification */}
          {submissionResult && !submissionResult.success && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
              {submissionResult.message}
            </div>
          )}

          {/* SUBMISSION BUTTON: Magnetic CTA with Bloom Glow & Letter Tracking */}
          <div className="pt-2">
            <MagneticButton
              type="submit"
              disabled={isPending}
              icon={
                isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#C19B6C]" />
                ) : (
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                )
              }
            >
              {isPending ? "Submitting Inquiry..." : "Request Design Consultation"}
            </MagneticButton>
            <p className="mt-3 text-[11px] font-mono text-[#1A1A1A]/50">
              Direct response within 24 hours. Complimentary on-site consultation across Hyderabad.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );

  // If used in embedded mode or explicitly without outer coordinates
  if (embedded || !showCoordinates) {
    return (
      <div
        id={id}
        className={`w-full bg-[#FAFAFA] p-8 sm:p-12 lg:p-14 border border-black/[0.05] relative shadow-[0_20px_60px_-15px_rgba(26,26,26,0.06)] rounded-2xl ${className}`}
      >
        {renderFormBody()}
      </div>
    );
  }

  // Full-width standalone section with integrated studio coordinates column
  return (
    <section
      id={id}
      className={`w-full bg-white text-[#1A1A1A] relative ${
        isStandalonePage
          ? "pt-32 pb-24 sm:pt-40 sm:pb-32"
          : "py-24 sm:py-32"
      } ${className}`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* ====================================================================
              LEFT COLUMN: Studio Pedigree & Direct Contact Coordinates
              ==================================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#C19B6C]" />
                <span className="text-[#C19B6C] text-xs uppercase tracking-[0.26em] font-mono font-semibold">
                  {subtitle}
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[0.95] text-[#1A1A1A]">
                {title} <br />
                <span className="font-light italic text-[#C19B6C]">{highlightedTitle}</span>
              </h2>
              <p className="mt-6 text-sm sm:text-base text-[#1A1A1A] font-sans leading-relaxed max-w-md">
                {description}
              </p>
            </div>

            {/* Direct Studio Coordinates */}
            <div className="space-y-6 pt-6 border-t border-black/[0.06]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-black/[0.06] flex items-center justify-center text-[#C19B6C] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/40 block">
                    Studio Address
                  </span>
                  <p className="text-sm font-medium text-[#1A1A1A] mt-0.5">
                    201, West Field Center, Above Dominos, Tolichowki, Hyderabad - 500008, Telangana State, India
                  </p>
                  <span className="text-xs text-[#C19B6C] font-mono">
                    Serving Tolichowki, Jubilee Hills, Banjara Hills & Greater Hyderabad
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-black/[0.06] flex items-center justify-center text-[#C19B6C] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/40 block">
                    Direct Telephones
                  </span>
                  <div className="flex flex-col space-y-0.5 mt-0.5">
                    <a
                      href="tel:+919100707409"
                      className="text-sm font-medium text-[#1A1A1A] hover:text-[#C19B6C] transition-colors"
                    >
                      +91 9100707409
                    </a>
                    <a
                      href="tel:+919666162800"
                      className="text-sm font-medium text-[#1A1A1A] hover:text-[#C19B6C] transition-colors"
                    >
                      +91 9666162800
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-black/[0.06] flex items-center justify-center text-[#C19B6C] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/40 block">
                    Official Email
                  </span>
                  <a
                    href="mailto:interiorsolutionsho@gmail.com"
                    className="text-sm font-medium text-[#1A1A1A] hover:text-[#C19B6C] transition-colors mt-0.5 block"
                  >
                    interiorsolutionsho@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-black/[0.06] flex items-center justify-center text-[#C19B6C] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/40 block">
                    Consultation Hours
                  </span>
                  <p className="text-sm text-[#1A1A1A]/80 mt-0.5">
                    Monday – Saturday: 09:30 AM – 07:30 PM (IST)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================================
              RIGHT COLUMN: Form Card Container
              ==================================================================== */}
          <div className="lg:col-span-7 bg-[#FAFAFA] p-8 sm:p-12 lg:p-16 border border-black/[0.05] relative shadow-[0_20px_60px_-15px_rgba(26,26,26,0.06)] rounded-2xl">
            {renderFormBody()}
          </div>
        </div>
      </div>
    </section>
  );
}
