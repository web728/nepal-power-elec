"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { mediaEnquirySchema, type MediaEnquiryInput } from "@/lib/validations/forms";
import {
  mediaTypeOptions,
  languageOptions,
  mediaEnquiryTypeOptions,
  countryOptions,
} from "@/lib/content/form-options";
import { TextField, TextAreaField, SelectField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { HONEYPOT_FIELD } from "@/lib/honeypot";

const initialValues: MediaEnquiryInput = {
  fullName: "",
  designation: "",
  mediaOrganization: "",
  mediaWebsite: "",
  email: "",
  phone: "",
  country: "Nepal",
  mediaType: "",
  language: "",
  enquiryType: "",
  requestedInformation: "",
  deadline: "",
  supportingLink: "",
  privacyConsent: false,
};

type Errors = Partial<Record<keyof MediaEnquiryInput, string>>;

export function MediaEnquiryForm() {
  const [values, setValues] = useState<MediaEnquiryInput>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const { showToast } = useToast();

  function update<K extends keyof MediaEnquiryInput>(key: K, value: MediaEnquiryInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(false);

    const result = mediaEnquirySchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const nextErrors: Errors = {};
      let firstKey: string | null = null;
      for (const key in fieldErrors) {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          nextErrors[key as keyof MediaEnquiryInput] = messages[0];
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
      const res = await fetch("/api/media-enquiry", {
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
      showToast("Media request submitted successfully.", "success");
      trackEvent(AnalyticsEvents.MEDIA_ENQUIRY_SUBMIT, {});
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
        <p className="text-sm font-bold uppercase tracking-wide text-success">Request Received</p>
        <p className="mt-3 text-base leading-relaxed text-ink sm:text-lg">
          Your media request has been submitted for review. Submission does not confirm accreditation, interview
          availability, photography permission or access to restricted areas.
        </p>
        <p className="mt-4 text-sm text-muted">
          Reference number: <span className="font-semibold text-ink">{referenceNumber}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-10">
      <HoneypotField />
      {submitError && (
        <p role="alert" className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm font-medium text-error">
          The form could not be submitted. Review the highlighted fields and try again.
        </p>
      )}

      <div className="flex flex-col gap-5">
        <h3 className="text-lg font-semibold text-ink">Media Details</h3>
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
            id="designation"
            label="Designation"
            required
            value={values.designation}
            onChange={(e) => update("designation", e.target.value)}
            error={errors.designation}
          />
          <TextField
            id="mediaOrganization"
            label="Media Organization"
            required
            value={values.mediaOrganization}
            onChange={(e) => update("mediaOrganization", e.target.value)}
            error={errors.mediaOrganization}
          />
          <TextField
            id="mediaWebsite"
            type="url"
            label="Media Website"
            value={values.mediaWebsite}
            onChange={(e) => update("mediaWebsite", e.target.value)}
            error={errors.mediaWebsite}
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
            id="phone"
            type="tel"
            label="Phone"
            required
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            error={errors.phone}
          />
          <SelectField
            id="country"
            label="Country"
            required
            placeholder="Select country"
            options={countryOptions}
            value={values.country}
            onChange={(e) => update("country", e.target.value)}
            error={errors.country}
          />
          <SelectField
            id="mediaType"
            label="Media Type"
            required
            placeholder="Select media type"
            options={mediaTypeOptions}
            value={values.mediaType}
            onChange={(e) => update("mediaType", e.target.value)}
            error={errors.mediaType}
          />
          <SelectField
            id="language"
            label="Language"
            required
            placeholder="Select language"
            options={languageOptions}
            value={values.language}
            onChange={(e) => update("language", e.target.value)}
            error={errors.language}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-lg font-semibold text-ink">Request Details</h3>
        <div className="grid gap-5">
          <SelectField
            id="enquiryType"
            label="Enquiry Type"
            required
            placeholder="Select enquiry type"
            options={mediaEnquiryTypeOptions}
            value={values.enquiryType}
            onChange={(e) => update("enquiryType", e.target.value)}
            error={errors.enquiryType}
          />
          <TextAreaField
            id="requestedInformation"
            label="Requested Information or Interview"
            required
            value={values.requestedInformation}
            onChange={(e) => update("requestedInformation", e.target.value)}
            error={errors.requestedInformation}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="deadline"
              label="Publication or Broadcast Deadline"
              value={values.deadline}
              onChange={(e) => update("deadline", e.target.value)}
              error={errors.deadline}
            />
            <TextField
              id="supportingLink"
              type="url"
              label="Supporting Link or Credential"
              value={values.supportingLink}
              onChange={(e) => update("supportingLink", e.target.value)}
              error={errors.supportingLink}
            />
          </div>
        </div>
      </div>

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
        <Button type="submit" disabled={isSubmitting} size="lg" variant="cta-submit">
          {isSubmitting ? "Submitting…" : "Submit Request"}
        </Button>
      </div>
    </form>
  );
}
