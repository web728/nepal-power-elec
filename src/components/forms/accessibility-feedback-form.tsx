"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { accessibilityFeedbackSchema, type AccessibilityFeedbackInput } from "@/lib/validations/forms";
import { preferredContactMethodOptions } from "@/lib/content/form-options";
import { TextField, TextAreaField, SelectField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { HONEYPOT_FIELD } from "@/lib/honeypot";

const initialValues: AccessibilityFeedbackInput = {
  fullName: "",
  email: "",
  pageOrDocument: "",
  deviceOrBrowser: "",
  issueDescription: "",
  preferredContactMethod: "",
  privacyConsent: false,
};

type Errors = Partial<Record<keyof AccessibilityFeedbackInput, string>>;

export function AccessibilityFeedbackForm() {
  const [values, setValues] = useState<AccessibilityFeedbackInput>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const { showToast } = useToast();

  function update<K extends keyof AccessibilityFeedbackInput>(key: K, value: AccessibilityFeedbackInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(false);

    const result = accessibilityFeedbackSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const nextErrors: Errors = {};
      let firstKey: string | null = null;
      for (const key in fieldErrors) {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          nextErrors[key as keyof AccessibilityFeedbackInput] = messages[0];
          if (!firstKey) firstKey = key;
        }
      }
      setErrors(nextErrors);
      if (firstKey) document.getElementById(firstKey)?.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/accessibility-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          [HONEYPOT_FIELD]: (document.getElementById(HONEYPOT_FIELD) as HTMLInputElement)?.value ?? "",
        }),
      });

      if (!res.ok) {
        setSubmitError(true);
        const body = await res.json().catch(() => null);
        showToast(
          body?.error || "The form could not be submitted. Review the highlighted fields and try again.",
          "error"
        );
        return;
      }

      const data = await res.json();
      setReferenceNumber(data.referenceNumber);
      showToast("Feedback submitted successfully.", "success");
    } catch {
      setSubmitError(true);
      showToast("The form could not be submitted. Review the highlighted fields and try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (referenceNumber) {
    return (
      <div className="rounded-xl border-2 border-success bg-success/5 p-8 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-success">Thank You</p>
        <p className="mt-3 text-base leading-relaxed text-ink sm:text-lg">
          Your accessibility feedback has been submitted to the organizing team for review.
        </p>
        <p className="mt-4 text-sm text-muted">
          Reference number: <span className="font-semibold text-ink">{referenceNumber}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-8">
      <HoneypotField />
      <h3 className="text-lg font-semibold text-ink">Report a Barrier</h3>

      {submitError && (
        <p role="alert" className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm font-medium text-error">
          The form could not be submitted. Review the highlighted fields and try again.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="fullName"
          label="Full Name"
          required
          value={values.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          error={errors.fullName}
        />
        <TextField
          id="email"
          type="email"
          label="Email"
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
        <TextField
          id="pageOrDocument"
          label="Page or Document"
          required
          value={values.pageOrDocument}
          onChange={(e) => update("pageOrDocument", e.target.value)}
          error={errors.pageOrDocument}
        />
        <TextField
          id="deviceOrBrowser"
          label="Device or Browser Used"
          required
          value={values.deviceOrBrowser}
          onChange={(e) => update("deviceOrBrowser", e.target.value)}
          error={errors.deviceOrBrowser}
        />
        <SelectField
          id="preferredContactMethod"
          label="Preferred Contact Method"
          required
          placeholder="Select contact method"
          options={preferredContactMethodOptions}
          value={values.preferredContactMethod}
          onChange={(e) => update("preferredContactMethod", e.target.value)}
          error={errors.preferredContactMethod}
        />
      </div>

      <TextAreaField
        id="issueDescription"
        label="Problem Experienced"
        required
        value={values.issueDescription}
        onChange={(e) => update("issueDescription", e.target.value)}
        error={errors.issueDescription}
      />

      <div className="flex flex-col gap-5 border-t border-border pt-6">
        <CheckboxField
          id="privacyConsent"
          required
          checked={values.privacyConsent}
          onChange={(e) => update("privacyConsent", e.target.checked)}
          error={errors.privacyConsent}
          label={
            <>
              I agree to the{" "}
              <Link href="/privacy-policy" className="font-semibold text-sky-dark hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-and-conditions" className="font-semibold text-sky-dark hover:underline">
                Terms and Conditions
              </Link>
              .
            </>
          }
        />
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? "Submitting…" : "Submit Feedback"}
        </Button>
      </div>
    </form>
  );
}
