"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, CheckCircle2, Sparkles, Send, Loader2 } from "lucide-react";
import { submitLeadClient } from "@/lib/submitLead";

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    propertyType: "Apartment",
    location: "",
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("hasSeenPopup", "true");
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // 1. Trigger Logic: Open after 15000ms if not seen in current session
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("hasSeenPopup");
      if (!hasSeen) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem("hasSeenPopup", "true");
        }, 15000);

        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  // Prevent background scroll while open and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      sessionStorage.setItem("hasSeenPopup", "true");
      await submitLeadClient({
        source: "15s Consultation Popup",
        name: formData.fullName,
        phone: formData.phone,
        propertyType: formData.propertyType,
        location: formData.location || "Hyderabad",
        message: `Property Type: ${formData.propertyType}. Location: ${formData.location || "Not specified"}.`,
      });
    } catch (error) {
      console.error("[ConsultationPopup] Submit error:", error);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Automatically close modal after 2.5 seconds (2500ms)
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
      }, 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-popup-title"
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={handleClose}
    >
      {/* Modal Box */}
      <div
        className="max-w-lg w-full p-8 sm:p-10 relative bg-white border border-[#C19B6C]/40 shadow-2xl rounded-2xl select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-[#1A1A1A] transition-colors rounded-full hover:bg-gray-100 focus:outline-none"
          aria-label="Close consultation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation State */
          <div className="py-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#C19B6C]/10 border border-[#C19B6C] flex items-center justify-center text-[#C19B6C] shadow-[0_0_25px_rgba(193,155,108,0.25)] animate-in zoom-in duration-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C19B6C] font-semibold block">
                Inquiry Received
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1A1A1A] tracking-tight">
                Thank You
              </h3>
            </div>
            <p className="text-sm text-gray-600 font-sans max-w-xs leading-relaxed">
              Thank you. Our design team will reach out shortly.
            </p>
          </div>
        ) : (
          /* Form Content State */
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C19B6C]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C19B6C] font-semibold">
                  PRIVATE CONSULTATION · HYDERABAD
                </span>
              </div>
              <h2
                id="consultation-popup-title"
                className="font-heading font-bold text-2xl sm:text-3xl text-[#1A1A1A] mt-2 tracking-tight"
              >
                Transform Your Living Space
              </h2>
              <p className="text-sm text-gray-600 mt-2 font-sans leading-relaxed">
                Share your details below to receive a bespoke design consultation and preliminary quote from our principal architects.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="popup-fullName"
                  className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/70 mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="popup-fullName"
                  type="text"
                  required
                  placeholder="e.g. Tariq Mansoor"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full border-b border-gray-300 focus:border-[#C19B6C] bg-transparent py-2.5 text-sm outline-none transition-colors text-[#1A1A1A] placeholder-gray-400"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label
                  htmlFor="popup-phone"
                  className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/70 mb-1"
                >
                  Phone / WhatsApp Number *
                </label>
                <input
                  id="popup-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border-b border-gray-300 focus:border-[#C19B6C] bg-transparent py-2.5 text-sm outline-none transition-colors text-[#1A1A1A] placeholder-gray-400"
                />
              </div>

              {/* Property Type Dropdown */}
              <div>
                <label
                  htmlFor="popup-propertyType"
                  className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/70 mb-1"
                >
                  Property Type
                </label>
                <select
                  id="popup-propertyType"
                  value={formData.propertyType}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyType: e.target.value })
                  }
                  className="w-full border-b border-gray-300 focus:border-[#C19B6C] bg-transparent py-2.5 text-sm outline-none transition-colors text-[#1A1A1A] cursor-pointer"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial Space">Commercial Space</option>
                </select>
              </div>

              {/* Location in Hyderabad */}
              <div>
                <label
                  htmlFor="popup-location"
                  className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/70 mb-1"
                >
                  Location in Hyderabad
                </label>
                <input
                  id="popup-location"
                  type="text"
                  placeholder="e.g., Jubilee Hills, Kokapet, Tolichowki"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full border-b border-gray-300 focus:border-[#C19B6C] bg-transparent py-2.5 text-sm outline-none transition-colors text-[#1A1A1A] placeholder-gray-400"
                />
              </div>

              {/* Submit Button with Loading State */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C19B6C] text-white font-heading font-bold uppercase tracking-[0.2em] text-xs py-4 hover:bg-[#1A1A1A] transition-colors rounded-none shadow-md flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Consultation</span>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
