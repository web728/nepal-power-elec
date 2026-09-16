import { google } from "googleapis";

export async function appendToGoogleSheet(data: {
  platform: string;
  companyName?: string;
  contactPerson?: string;
  designation?: string;
  email?: string;
  mobile?: string;
  address?: string;
  website?: string;
  country?: string;
  spaceRequired?: string;
  areaOfInterest?: string;
  getSource?: string;
  message?: string;
}) {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    let rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY || "";
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !rawPrivateKey || !spreadsheetId) {
      console.error("Google Sheets credentials missing in environment variables.");
      return;
    }

    let privateKey = rawPrivateKey;

    // Check if it's base64 encoded, if so decode it
    try {
      if (!rawPrivateKey.includes("BEGIN PRIVATE KEY")) {
        const decoded = Buffer.from(rawPrivateKey, "base64").toString("utf8");
        if (decoded.includes("BEGIN PRIVATE KEY")) {
          privateKey = decoded;
        }
      }
    } catch (e) {
      // Ignore and use raw
    }

    // Ensure proper newline formatting
    privateKey = privateKey.replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const currentDate = new Date().toISOString().replace("T", " ").substring(0, 19);

    const rowValues = [
      currentDate,                          // Date
      data.platform || "",                  // Platform
      "",                                   // Register As
      data.companyName || "",               // Company Name
      data.contactPerson || "",             // Contact Person
      data.designation || "",               // Designation
      data.email || "",                     // Email Ids
      data.mobile || "",                    // Mobile no.
      data.address || "",                   // Address
      data.website || "",                   // Website
      data.country || "",                   // Country
      data.spaceRequired || "",             // Space Required
      data.areaOfInterest || "",            // Area Of Interest
      data.getSource || "",                 // How did you get information
      data.message || "",                   // Message
      "",                                   // Corrections
      "",                                   // STATUS 1
      "",                                   // STATUS 2
      "",                                   // STATUS 3
      "",                                   // STATUS 4
      "",                                   // STATUS 5
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Website Enquries!A:U",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowValues],
      },
    });

    console.log("Successfully saved row to Google Sheet for:", data.platform);
  } catch (error) {
    console.error("CRITICAL Google Sheet Error:", error);
  }
}   