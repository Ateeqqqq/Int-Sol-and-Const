"use server";

import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";

export interface SubmitLeadResponse {
  success: boolean;
  message: string;
  referenceId?: string;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
}

/**
 * Server Action: submitLead
 *
 * Receives, validates, and processes incoming private concierge requests.
 * Pre-structured to dispatch notifications via CRM or transactional email (e.g. Resend).
 */
export async function submitLead(formData: ContactFormData): Promise<SubmitLeadResponse> {
  try {
    // 1. Server-side validation via Zod
    const validationResult = contactFormSchema.safeParse(formData);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed. Please verify the highlighted details.",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const leadData = validationResult.data;

    // 2. Simulate async CRM ingestion or dispatch latency
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // 3. Generate architectural dossier reference ID
    const referenceId = `IS-HYD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    console.log("[Concierge Server Action] New Lead Received:", {
      referenceId,
      fullName: leadData.fullName,
      phone: leadData.phoneNumber,
      email: leadData.email,
      projectType: leadData.projectType,
      receivedAt: new Date().toISOString(),
      location: "Hyderabad / Tolichowki Studio",
    });

    return {
      success: true,
      message:
        "Thank you. Your consultation request has been received. Our principal design consultant will contact you within 24 hours.",
      referenceId,
    };
  } catch (error) {
    console.error("[Concierge Server Action Error]:", error);
    return {
      success: false,
      message: "An unexpected system interruption occurred. Please contact our studio desk directly.",
    };
  }
}
