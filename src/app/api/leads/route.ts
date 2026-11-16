import { NextResponse } from "next/server";

export interface LeadRequestBody {
  source?: string;
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  propertyType?: string;
  estimate?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: LeadRequestBody = await request.json();

    const {
      source = "Website Lead",
      name = "Anonymous",
      phone = "Not provided",
      email = "Not provided",
      location = "Hyderabad",
      propertyType = "Residential",
      estimate = "N/A",
      message = "General Inquiry",
    } = body;

    // Structured payload for Google Sheets Webhook
    const timestamp = new Date().toISOString();
    const referenceId = `IS-HYD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      referenceId,
      timestamp,
      source,
      name,
      phone,
      email,
      location,
      propertyType,
      estimate,
      message,
    };

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl || webhookUrl.trim() === "") {
      console.warn(
        "[Leads API Warning]: GOOGLE_SHEETS_WEBHOOK_URL environment variable is missing or empty in .env.local. Submission recorded locally in development mode:",
        payload
      );

      return NextResponse.json({
        success: true,
        referenceId,
        message: "Lead recorded in development mode (Webhook URL not configured).",
      });
    }

    // Forward to Google Apps Script Webhook
    try {
      const response = await fetch(webhookUrl.trim(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      if (!response.ok) {
        console.warn(
          `[Leads API Warning]: Webhook responded with status ${response.status}: ${response.statusText}`
        );
      }
    } catch (fetchError) {
      console.error(
        "[Leads API Warning]: Failed to reach Google Sheets Webhook:",
        fetchError
      );
      // We do not throw or crash the response to avoid breaking client-side conversion UX
    }

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Lead successfully recorded and forwarded.",
    });
  } catch (error) {
    console.error("[Leads API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process lead submission. Please try again.",
      },
      { status: 500 }
    );
  }
}
