import { google } from "googleapis";

export interface SheetSubmissionData {
  platform: string;
  registerAs?: string;       // Exhibitor, Visitor, Sponsor, etc.
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
    const base64Key = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64 || process.env.GOOGLE_PRIVATE_KEY || "";
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !base64Key || !spreadsheetId) {
      console.error("Google Sheets credentials missing in environment variables.");
      return;
    }

    let privateKey = "";

    // Safely decode Base64 JSON service account key or raw key
    try {
      if (!base64Key.includes("BEGIN PRIVATE KEY")) {
        const decodedString = Buffer.from(base64Key, "base64").toString("utf8");
        if (decodedString.includes("private_key")) {
          const credentialsJson = JSON.parse(decodedString);
          privateKey = credentialsJson.private_key;
        } else if (decodedString.includes("BEGIN PRIVATE KEY")) {
          privateKey = decodedString;
        }
      } else {
        privateKey = base64Key;
      }
    } catch (e) {
      privateKey = base64Key;
    }

    // Clean and normalize private key line breaks
    privateKey = privateKey.replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const currentDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Exact 21 columns mapping matching your sheet headers order
    const rowValues = [
      currentDate,                      // 1. Date
      data.platform || "Website",       // 2. Platform
      data.registerAs || "Enquiry",     // 3. Register As
      data.companyName || "",           // 4. Company Name
      data.contactPerson || "",         // 5. Contact Person
      data.designation || "",           // 6. Designation
      data.email || "",                 // 7. Email Ids
      data.mobile || "",                // 8. Mobile no.
      data.address || "",               // 9. Address
      data.website || "",               // 10. Website
      data.country || "",               // 11. Country
      data.spaceRequired || "",         // 12. Space Required
      data.areaOfInterest || "",        // 13. Area Of Interest
      data.getSource || "",             // 14. How did you get information
      data.message || "",               // 15. Message
      "",                               // 16. Corrections
      "",                               // 17. STATUS 1
      "",                               // 18. STATUS 2
      "",                               // 19. STATUS 3
      "",                               // 20. STATUS 4
      ""                                // 21. STATUS 5
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "'Website Enquiries'!A:U",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    });

    console.log("Successfully saved row to Google Sheet (Website Enquiries) for:", data.platform);
  } catch (error) {
    console.error("CRITICAL Google Sheet Error:", error);
  }
}