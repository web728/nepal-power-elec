"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { exhibitorEnquirySchema, type ExhibitorEnquiryInput } from "@/lib/validations/forms";
import { productCategoryOptions, companyTypeOptions } from "@/lib/content/form-options";
import { countryOptions } from "@/lib/countries";
import { TextField, TextAreaField, SelectField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { HONEYPOT_FIELD } from "@/lib/honeypot";

const initialValues: ExhibitorEnquiryInput = {
  fullName: "",
  designation: "",
  email: "",
  phone: "",
  country: "India",
  companyName: "",
  companyWebsite: "",
  companyAddress: "",
  companyType: "",
  productCategory: "",
  productsOrServices: "",
  standRequirement: "",
  message: "",
  privacyConsent: false,
};

type Errors = Partial<Record<keyof ExhibitorEnquiryInput, string>> & {
  recaptcha?: string;
};

export function ExhibitorEnquiryForm() {
  const [values, setValues] = useState<ExhibitorEnquiryInput>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { showToast } = useToast();

  function update<K extends keyof ExhibitorEnquiryInput>(key: K, value: ExhibitorEnquiryInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(false);

    // 1. Validate Form Schema
    const result = exhibitorEnquirySchema.safeParse(values);
    const nextErrors: Errors = {};

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      let firstKey: string | null = null;
      for (const key in fieldErrors) {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          nextErrors[key as keyof ExhibitorEnquiryInput] = messages[0];
          if (!firstKey) firstKey = key;
        }
      }
    }

    // 2. Validate reCAPTCHA
    if (!captchaToken) {
      nextErrors.recaptcha = "Please complete the reCAPTCHA verification.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstErrorKey = Object.keys(nextErrors)[0];
      if (firstErrorKey && firstErrorKey !== "recaptcha") {
        document.getElementById(firstErrorKey)?.focus();
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/exhibitor-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          recaptchaToken: captchaToken,
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
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        return;
      }

      const data = await res.json();
      setReferenceNumber(data.referenceNumber);
      showToast("Enquiry submitted successfully.", "success");
      trackEvent(AnalyticsEvents.BOOK_STAND_SUBMIT, {});
    } catch {
      setSubmitError(true);
      showToast("The form could not be submitted. Review the highlighted fields and try again.", "error");
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (referenceNumber) {
    return (
      <div className="rounded-xl border-2 border-success bg-success/5 p-8 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-success">Enquiry Received</p>
        <p className="mt-3 text-base leading-relaxed text-ink sm:text-lg">
          Thank you for your interest in exhibiting. The organizing team will review the company and product
          information provided. Submission does not reserve or confirm a stand.
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
        <h3 className="text-lg font-semibold text-ink">Contact Details</h3>
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
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-lg font-semibold text-ink">Company Details</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="companyName"
            label="Company Name"
            required
            value={values.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            error={errors.companyName}
          />
          <TextField
            id="companyWebsite"
            type="url"
            label="Company Website"
            value={values.companyWebsite}
            onChange={(e) => update("companyWebsite", e.target.value)}
            error={errors.companyWebsite}
          />
          <TextField
            id="companyAddress"
            label="Company Address"
            required
            className="sm:col-span-2"
            value={values.companyAddress}
            onChange={(e) => update("companyAddress", e.target.value)}
            error={errors.companyAddress}
          />
          <SelectField
            id="companyType"
            label="Company Type"
            required
            placeholder="Select company type"
            options={companyTypeOptions}
            value={values.companyType}
            onChange={(e) => update("companyType", e.target.value)}
            error={errors.companyType}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-lg font-semibold text-ink">Exhibit Details</h3>
        <div className="grid gap-5">
          <SelectField
            id="productCategory"
            label="Primary Product Category"
            required
            placeholder="Select product category"
            options={productCategoryOptions}
            value={values.productCategory}
            onChange={(e) => update("productCategory", e.target.value)}
            error={errors.productCategory}
          />
          <TextAreaField
            id="productsOrServices"
            label="Products or Services"
            required
            value={values.productsOrServices}
            onChange={(e) => update("productsOrServices", e.target.value)}
            error={errors.productsOrServices}
          />
          <TextField
            id="standRequirement"
            label="Preferred Stand Requirement"
            required
            hint="e.g. 9 sqm shell scheme, 18 sqm raw space — a preference only, not a booking"
            value={values.standRequirement}
            onChange={(e) => update("standRequirement", e.target.value)}
            error={errors.standRequirement}
          />
          <TextAreaField
            id="message"
            label="Message"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            error={errors.message}
          />
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

        {/* Google reCAPTCHA v2 Component */}
        <div className="flex flex-col items-start gap-1">
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={(token) => {
                setCaptchaToken(token);
                if (token) setErrors((prev) => ({ ...prev, recaptcha: undefined }));
              }}
              onExpired={() => setCaptchaToken(null)}
            />
          ) : (
            <p className="text-xs font-mono text-error">
              [reCAPTCHA Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing in .env.local]
            </p>
          )}
          {errors.recaptcha && (
            <p className="text-xs font-medium text-error">{errors.recaptcha}</p>
          )}
        </div>
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} size="lg" variant="cta-submit">
          {isSubmitting ? "Submitting…" : "Submit Enquiry"}
        </Button>
      </div>
    </form>
  );
}