import mongoose, { Schema, type Document } from "mongoose";

export interface ISubmission extends Document {
  formSource: string;
  referenceNumber: string;
  data: Record<string, unknown>;
  submittedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>({
  formSource: { type: String, required: true, index: true },
  referenceNumber: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export const Submission =
  mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", SubmissionSchema);
