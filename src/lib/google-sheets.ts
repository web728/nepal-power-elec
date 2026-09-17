import { google } from "googleapis";

export interface SheetSubmissionData {
  platform: string;
  registerAs?: string;      // Exhibitor, Visitor, Sponsor, etc.
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

    try {
      // Decode Base64 JSON service account key or raw key safely
      const decodedString = Buffer.from(base64Key, "base64").toString("utf8");
      
      if (decodedString.trim().startsWith("{")) {
        const credentialsJson = JSON.parse(decodedString);
        privateKey = credentialsJson.private_key;
      } else {
        privateKey = decodedString;
      }
    } catch (e) {
      // Fallback if the key was passed directly as string/PEM format
      privateKey = base64Key;
    }

    // Normalize private key line breaks
    privateKey = privateKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Current timestamp in IST
    const currentDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Exact 21 columns mapping matching your exact Sheet structure
    const rowValues = [
      String(currentDate || ""),                      // 1. Date
      String(data.platform || "Website"),             // 2. Platform
      String(data.registerAs || "Enquiry"),           // 3. Register As
      String(data.companyName || ""),                 // 4. Company Name
      String(data.contactPerson || ""),               // 5. Contact Person
      String(data.designation || ""),                 // 6. Designation
      String(data.email || ""),                       // 7. Email Ids
      String(data.mobile || ""),                      // 8. Mobile no.
      String(data.address || ""),                     // 9. Address
      String(data.website || ""),                     // 10. Website
      String(data.country || ""),                     // 11. Country
      String(data.spaceRequired || ""),               // 12. Space Required
      String(data.areaOfInterest || ""),              // 13. Area Of Interest
      String(data.getSource || ""),                   // 14. How did you get information
      String(data.message || ""),                     // 15. Message
      "",                                             // 16. Corrections
      "",                                             // 17. STATUS 1
      "",                                             // 18. STATUS 2
      "",                                             // 19. STATUS 3
      "",                                             // 20. STATUS 4
      ""                                              // 21. STATUS 5
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Website Enquiries!A:A", // Automatically targets the tab and finds the next empty row
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    });

    console.log("Successfully saved row to Google Sheet:", response.data.updates?.updatedRange);
  } catch (error: any) {
    console.error("CRITICAL Google Sheet Error Details:", error.message || error);
    if (error.errors) {
      console.error("Google API Error Response:", JSON.stringify(error.errors, null, 2));
    }
  }
}