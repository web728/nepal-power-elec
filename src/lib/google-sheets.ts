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
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error("Google Sheets credentials missing in environment variables.");
      return;
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Date formatting (Current Timestamp or Date)
    const currentDate = new Date().toISOString().replace("T", " ").substring(0, 19);

    // Columns mapping sequence as per your requirement:
    // Date | Platform | Register As | Company Name | Contact Person | Designation | Email Ids | Mobile no. | Address | Website | Country | Space Required | Area Of Interest | How did you get information | Message | Corrections | STATUS 1 | STATUS 2 | STATUS 3 | STATUS 4 | STATUS 5
    const rowValues = [
      currentDate,                          // Date
      data.platform || "",                  // Platform (e.g. Visitor Registration, Exhibitor Enquiry)
      "",                                   // Register As (if applicable in specific forms)
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
      range: "Website Enquries!A:U", // Tab name with range
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowValues],
      },
    });
  } catch (error) {
    console.error("Error appending data to Google Sheet:", error);
  }
}