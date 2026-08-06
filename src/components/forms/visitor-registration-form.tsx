"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { visitorRegistrationSchema, type VisitorRegistrationInput } from "@/lib/validations/forms";
import { industryOptions, companyTypeOptions, productCategoryOptions } from "@/lib/content/form-options";
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

  function formatUrl(url: string) {
    if (!url || url.trim() === "") return "";
    const trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return trimmed;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(false);

    const formattedValues = {
      ...values,
      companyWebsite: formatUrl(values.companyWebsite || ""),
    };

    const result = visitorRegistrationSchema.safeParse(formattedValues);
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
      <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-300 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
          Registration Received
        </p>
        <p className="mt-3 text-base leading-relaxed text-slate-800 sm:text-lg">
          Thank you for registering your interest in attending the Nepal Electric, Power and Lights International
          Expo 2026. Keep your registration confirmation and review the official website before travelling.
        </p>
        <div className="mt-6 inline-block rounded-lg bg-slate-100 px-4 py-2 border border-slate-200">
          <p className="text-sm text-slate-600">
            Reference number: <span className="font-bold text-slate-900">{referenceNumber}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl">
      <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-8">
        <HoneypotField />

        {submitError && (
          <div role="alert" className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-sm">
            <svg className="h-5 w-5 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
            <span>The form could not be submitted. Review the highlighted fields and try again.</span>
          </div>
        )}

        {/* Section 1: Personal Details */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="h-6 w-1 rounded-full bg-blue-600"></div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Personal Details</h3>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="fullName"
              label="Full Name"
              required
              placeholder="e.g. John Doe"
              value={values.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              error={errors.fullName}
            />
            <TextField
              id="designation"
              label="Designation"
              required
              placeholder="e.g. Sales Director"
              value={values.designation}
              onChange={(e) => update("designation", e.target.value)}
              error={errors.designation}
            />
            <TextField
              id="email"
              type="email"
              label="Email"
              required
              placeholder="john@company.com"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              error={errors.email}
            />
            <TextField
              id="phone"
              type="tel"
              label="Phone"
              required
              placeholder="+1 234 567 890"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              error={errors.phone}
            />
            <div className="sm:col-span-2">
              <TextField
                id="country"
                label="Country"
                required
                placeholder="Enter your country (e.g. Nepal, India)"
                value={values.country}
                onChange={(e) => update("country", e.target.value)}
                error={errors.country}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Company Details */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="h-6 w-1 rounded-full bg-blue-600"></div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Company Details</h3>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="companyName"
              label="Company / Organization"
              required
              placeholder="e.g. Acme Corp"
              value={values.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              error={errors.companyName}
            />
            <TextField
              id="companyWebsite"
              type="text"
              label="Company Website"
              placeholder="example.com"
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
        </section>

        {/* Section 3: Visit Interests */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="h-6 w-1 rounded-full bg-blue-600"></div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Visit Interests</h3>
          </div>

          <div className="flex flex-col gap-5">
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-2 text-sm font-semibold text-slate-900">
                Primary Product Categories (select all that apply)
                <span className="text-red-500 ml-1" aria-hidden="true">*</span>
              </legend>
              <div id="productCategories" tabIndex={-1} className="grid gap-3 outline-none sm:grid-cols-2">
                {productCategoryOptions.map((opt) => (
                  <label
                    key={opt.value}
                    htmlFor={`productCategories-${opt.value}`}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 transition-colors hover:bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500"
                  >
                    <input
                      type="checkbox"
                      id={`productCategories-${opt.value}`}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={values.productCategories.includes(opt.value)}
                      onChange={(e) => toggleCategory(opt.value, e.target.checked)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.productCategories && (
                <p role="alert" className="text-xs font-semibold text-red-500">
                  {errors.productCategories}
                </p>
              )}
            </fieldset>

            <TextAreaField
              id="visitPurpose"
              label="Purpose of Visit"
              required
              placeholder="Briefly state why you wish to visit the expo..."
              value={values.visitPurpose}
              onChange={(e) => update("visitPurpose", e.target.value)}
              error={errors.visitPurpose}
            />
          </div>
        </section>

        {/* Consent & Captcha Section */}
        <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <CheckboxField
            id="privacyConsent"
            required
            checked={values.privacyConsent}
            onChange={(e) => update("privacyConsent", e.target.checked)}
            error={errors.privacyConsent}
            label={
              <span className="text-sm text-slate-700">
                I agree to the{" "}
                <Link href="/privacy-policy" className="font-semibold text-blue-600 underline hover:text-blue-700">
                  Privacy Policy
                </Link>{" "}
                and consent to my information being used for registration administration.
              </span>
            }
          />

          <div className="flex flex-col items-start gap-2 pt-2">
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
              <div className="overflow-hidden rounded-lg border border-slate-200 p-1 bg-white shadow-sm">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(token) => {
                    setCaptchaToken(token);
                    if (token) setErrors((prev) => ({ ...prev, recaptcha: undefined }));
                  }}
                  onExpired={() => setCaptchaToken(null)}
                />
              </div>
            ) : (
              <p className="text-xs font-mono text-red-500 bg-red-50 p-2 rounded">
                [reCAPTCHA Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing in .env.local]
              </p>
            )}
            {errors.recaptcha && (
              <p className="text-xs font-semibold text-red-500">{errors.recaptcha}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full sm:w-auto min-w-[200px] justify-center text-base font-semibold shadow-md transition-all hover:shadow-lg"
            variant="cta-submit"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-current" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting…
              </span>
            ) : (
              "Register to Visit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}