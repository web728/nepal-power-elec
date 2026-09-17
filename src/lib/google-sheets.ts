import { google } from "googleapis";

export interface SheetSubmissionData {
  platform: string;
  registerAs?: string;       // e.g. Exhibitor, Visitor, Sponsor
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
}

export async function appendToGoogleSheet(data: SheetSubmissionData) {
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

    const currentDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Exact 21 columns mapping matching your sheet structure
    const rowValues = [
      currentDate,                      // 1. Date & Time
      data.platform || "Website",       // 2. Platform
      data.registerAs || "Enquiry",     // 3. Register As (Exhibitor/Visitor/Sponsor)
      data.companyName || "",           // 4. Company Name
      data.contactPerson || "",         // 5. Contact Person
      data.designation || "",           // 6. Designation
      data.email || "",                 // 7. Email Id
      data.mobile || "",                // 8. Mobile No.
      data.address || "",               // 9. Address
      data.website || "",               // 10. Website
      data.country || "",               // 11. Country
      data.spaceRequired || "",         // 12. Booth Size / Space Required
      data.areaOfInterest || "",        // 13. Area Of Interest
      data.getSource || "",             // 14. Info Get From
      data.message || "",               // 15. Message
      "",                               // 16. Corrections
      "", "", "", "", ""                // 17-21. STATUS 1 to 5
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Website Enquiries!A:U",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    });

    console.log("Successfully saved row to Google Sheet for platform:", data.platform);
  } catch (error) {
    console.error("CRITICAL Google Sheet Error:", error);
  }
}