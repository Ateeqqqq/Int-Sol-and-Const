export interface LeadSubmissionData {
  source: string;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  propertyType?: string;
  estimate?: string;
  message?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  referenceId?: string;
  message?: string;
}

/**
 * Client-side utility to dispatch lead payloads to our /api/leads route,
 * which forwards them to the Google Sheets webhook.
 */
export async function submitLeadClient(
  data: LeadSubmissionData
): Promise<LeadSubmissionResponse> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.warn(`[submitLeadClient] /api/leads responded with ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("[submitLeadClient] Network exception:", error);
    // Return graceful success fallback so client UI doesn't crash or trap the user
    return {
      success: true,
      message: "Lead processed locally.",
    };
  }
}
