import { google } from "googleapis";

export interface SheetSubmissionData {
  platform: string;
  registerAs?: string;
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
    const base64Key =
      process.env.GOOGLE_SERVICE_ACCOUNT_BASE64 ||
      process.env.GOOGLE_PRIVATE_KEY ||
      "";
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !base64Key || !spreadsheetId) {
      console.error(
        "Google Sheets credentials missing in environment variables."
      );
      return;
    }

    let privateKey = "";

    try {
      const decodedString = Buffer.from(base64Key, "base64").toString("utf8");

      if (decodedString.trim().startsWith("{")) {
        const credentialsJson = JSON.parse(decodedString);
        privateKey = credentialsJson.private_key;
      } else {
        privateKey = decodedString;
      }
    } catch {
      privateKey = base64Key;
    }

    privateKey = privateKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const sheetName = "Website Enquiries";

    const currentDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const rowValues = [
      String(currentDate || ""), // 1. Date
      String(data.platform || "Website"), // 2. Platform
      String(data.registerAs || "Enquiry"), // 3. Register As
      String(data.companyName || ""), // 4. Company Name
      String(data.contactPerson || ""), // 5. Contact Person
      String(data.designation || ""), // 6. Designation
      String(data.email || ""), // 7. Email
      String(data.mobile || ""), // 8. Mobile
      String(data.address || ""), // 9. Address
      String(data.website || ""), // 10. Website
      String(data.country || ""), // 11. Country
      String(data.spaceRequired || ""), // 12. Space Required
      String(data.areaOfInterest || ""), // 13. Area Of Interest
      String(data.getSource || ""), // 14. Source
      String(data.message || ""), // 15. Message
      "", // 16. Corrections
      "", // 17. STATUS 1
      "", // 18. STATUS 2
      "", // 19. STATUS 3
      "", // 20. STATUS 4
      "", // 21. STATUS 5
    ];

    // 1. Append the new lead
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:U`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    });

    console.log(
      "Successfully saved row:",
      response.data.updates?.updatedRange
    );

    // Example:
    // Website Enquiries!A25:U25
    const updatedRange = response.data.updates?.updatedRange;

    if (!updatedRange) {
      return;
    }

    // Extract new row number
    const rowMatch = updatedRange.match(/![A-Z]+(\d+):/);

    if (!rowMatch) {
      console.warn("Could not detect newly inserted row.");
      return;
    }

    const newRowNumber = Number(rowMatch[1]);

    // 2. Get Sheet ID
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const targetSheet = spreadsheet.data.sheets?.find(
      (sheet) => sheet.properties?.title === sheetName
    );

    const sheetId = targetSheet?.properties?.sheetId;

    if (sheetId === undefined || sheetId === null) {
      console.warn(`Sheet "${sheetName}" not found.`);
      return;
    }

    // 3. Force new lead row to have NO inherited background color
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId,

                // Google API indexes are zero-based
                startRowIndex: newRowNumber - 1,
                endRowIndex: newRowNumber,

                // A to U = 21 columns
                startColumnIndex: 0,
                endColumnIndex: 21,
              },

              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 1,
                    green: 1,
                    blue: 1,
                  },
                },
              },

              fields: "userEnteredFormat.backgroundColor",
            },
          },
        ],
      },
    });

    console.log(`Formatting reset for new lead row ${newRowNumber}.`);
  } catch (error: any) {
    console.error(
      "CRITICAL Google Sheet Error Details:",
      error.message || error
    );

    if (error.errors) {
      console.error(
        "Google API Error Response:",
        JSON.stringify(error.errors, null, 2)
      );
    }
  }
}