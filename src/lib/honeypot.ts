import { NextResponse } from "next/server";

const HONEYPOT_FIELD = "_hp_website";

export { HONEYPOT_FIELD };

export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.length > 0;
}

export function honeypotResponse() {
  return NextResponse.json({ referenceNumber: "HP-SUBMITTED" });
}
