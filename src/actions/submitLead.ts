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

    const webhookPayload = {
      referenceId,
      timestamp: new Date().toISOString(),
      source: "Contact Form / Concierge Intake",
      name: leadData.fullName,
      phone: leadData.phoneNumber,
      email: leadData.email,
      location: "Hyderabad",
      propertyType: leadData.projectType,
      estimate: "Custom Scope",
      message: leadData.projectDetails || "No message provided",
    };

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (webhookUrl && webhookUrl.trim() !== "") {
      try {
        await fetch(webhookUrl.trim(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookPayload),
          redirect: "follow",
        });
      } catch (webhookError) {
        console.error("[submitLead Action] Webhook dispatch warning:", webhookError);
      }
    } else {
      console.warn(
        "[submitLead Action Warning]: GOOGLE_SHEETS_WEBHOOK_URL is not set. Lead logged locally:",
        webhookPayload
      );
    }

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
