"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { visitorRegistrationSchema, type VisitorRegistrationInput } from "@/lib/validations/forms";
import { industryOptions, companyTypeOptions, productCategoryOptions, countryOptions } from "@/lib/content/form-options";
import { TextField, TextAreaField, SelectField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { HONEYPOT_FIELD } from "@/lib/honeypot";

const initialValues: VisitorRegistrationInput = {
  fullName: "",
  designation: "",
  email: "",
  phone: "",
  country: "",
  companyName: "",
  companyWebsite: "",
  industry: "",
  companyType: "",
  productCategories: [],
  visitPurpose: "",
  privacyConsent: false,
};

type Errors = Partial<Record<keyof VisitorRegistrationInput, string>> & {
  recaptcha?: string;
};

export function VisitorRegistrationForm() {
  const [values, setValues] = useState<VisitorRegistrationInput>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { showToast } = useToast();

  function update<K extends keyof VisitorRegistrationInput>(key: K, value: VisitorRegistrationInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function toggleCategory(value: string, checked: boolean) {
    setValues((prev) => ({
      ...prev,
      productCategories: checked
        ? [...prev.productCategories, value]
        : prev.productCategories.filter((v) => v !== value),
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(false);

    // 1. Validate Form Schema
    const result = visitorRegistrationSchema.safeParse(values);
    const nextErrors: Errors = {};

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      let firstKey: string | null = null;
      for (const key in fieldErrors) {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          nextErrors[key as keyof VisitorRegistrationInput] = messages[0];
          if (!firstKey) firstKey = key;
        }
      }
    }

    // 2. Validate reCAPTCHA Token
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
      const res = await fetch("/api/visitor-registration", {
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
      showToast("Registration submitted successfully.", "success");
      trackEvent(AnalyticsEvents.VISITOR_REGISTER_SUBMIT, {});
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
        <p className="text-sm font-bold uppercase tracking-wide text-success">Registration Received</p>
        <p className="mt-3 text-base leading-relaxed text-ink sm:text-lg">
          Thank you for registering your interest in attending the Nepal Electric, Power and Lights International
          Expo 2026. Keep your registration confirmation and review the official website before travelling.
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
        <h3 className="text-lg font-semibold text-ink">Personal Details</h3>
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
            label="Company / Organization"
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
          <SelectField
            id="industry"
            label="Industry"
            required
            placeholder="Select industry"
            options={industryOptions}
            value={values.industry}
            onChange={(e) => update("industry", e.target.value)}
            error={errors.industry}
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
        <h3 className="text-lg font-semibold text-ink">Visit Interests</h3>
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-ink">
            Primary Product Categories (select all that apply)
            <span className="text-error" aria-hidden="true">
              {" "}
              *
            </span>
          </legend>
          <div id="productCategories" tabIndex={-1} className="grid gap-2.5 outline-none sm:grid-cols-2">
            {productCategoryOptions.map((opt) => (
              <label
                key={opt.value}
                htmlFor={`productCategories-${opt.value}`}
                className="flex items-start gap-2.5 rounded-lg border border-border px-3 py-2.5 text-sm text-ink focus-within:outline focus-within:outline-2 focus-within:outline-sky"
              >
                <input
                  type="checkbox"
                  id={`productCategories-${opt.value}`}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
                  checked={values.productCategories.includes(opt.value)}
                  onChange={(e) => toggleCategory(opt.value, e.target.checked)}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {errors.productCategories && (
            <p role="alert" className="text-xs font-medium text-error">
              {errors.productCategories}
            </p>
          )}
        </fieldset>

        <TextAreaField
          id="visitPurpose"
          label="Purpose of Visit"
          required
          value={values.visitPurpose}
          onChange={(e) => update("visitPurpose", e.target.value)}
          error={errors.visitPurpose}
        />
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
              and consent to my information being used for registration administration.
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
              [reCAPTCHA Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing in .env]
            </p>
          )}
          {errors.recaptcha && (
            <p className="text-xs font-medium text-error">{errors.recaptcha}</p>
          )}
        </div>
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} size="lg" variant="cta-submit">
          {isSubmitting ? "Submitting…" : "Register to Visit"}
        </Button>
      </div>
    </form>
  );
}