import { google } from "googleapis";

function getAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !rawPrivateKey) return null;

  // Check if key is Base64 encoded, then decode it; otherwise fallback to normal key formatting
  let privateKey = rawPrivateKey;
  if (!rawPrivateKey.includes("-----BEGIN PRIVATE KEY-----")) {
    privateKey = Buffer.from(rawPrivateKey, "base64").toString("utf-8");
  } else {
    privateKey = rawPrivateKey.replace(/\\n/g, "\n");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendToSheet(
  formSource: string,
  referenceNumber: string,
  data: Record<string, unknown>
) {
  const auth = getAuth();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!auth || !spreadsheetId) {
    console.info("[sheets] Google Sheets not configured — skipping", {
      formSource,
      referenceNumber,
    });
    return;
  }

  const sheets = google.sheets({ version: "v4", auth });
  const sheetName = "Website Enquiries";
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const flatData = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join(" | ");

  const row = [timestamp, formSource, referenceNumber, flatData];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:D`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}