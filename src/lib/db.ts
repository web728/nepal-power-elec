import { connectDB } from "@/lib/mongodb";
import { Submission } from "@/lib/models/submission";
import { generateReferenceNumber, isDuplicateSubmission } from "@/lib/rate-limit";
import { appendToSheet } from "@/lib/google-sheets";

export class DuplicateSubmissionError extends Error {
  constructor() {
    super("Duplicate submission");
    this.name = "DuplicateSubmissionError";
  }
}

export async function submitLead<T extends Record<string, unknown>>(
  formSource: string,
  payload: T,
  referencePrefix: string
) {
  if (isDuplicateSubmission(formSource, payload)) {
    throw new DuplicateSubmissionError();
  }

  const referenceNumber = generateReferenceNumber(referencePrefix);

  const db = await connectDB();
  if (!db) {
    console.info(`[db:${formSource}] MongoDB not configured — logging submission only`, {
      referenceNumber,
      ...payload,
    });
  } else {
    await Submission.create({
      formSource,
      referenceNumber,
      data: payload,
      submittedAt: new Date(),
    });
  }

  try {
    await appendToSheet(formSource, referenceNumber, payload);
  } catch (err) {
    console.error(`[sheets:${formSource}] Failed to append to Google Sheet`, err);
  }

  return { referenceNumber };
}
