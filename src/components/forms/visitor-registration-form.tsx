"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { User, Building, Compass, CheckCircle2, AlertCircle, ShieldCheck, Loader2 } from "lucide-react";
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
      <div className="mx-auto max-w-2xl rounded-2xl border border-teal/30 bg-gradient-to-b from-teal/5 to-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-teal shadow-xs">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-teal">
          Registration Success
        </span>
        <h3 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
          Confirmation Received!
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Thank you for registering your interest in attending the 5th Nepal Electric, Power and Lights Expo 2026.
          Please save your reference code below for fast-track badge collection.
        </p>

        <div className="mt-6 inline-flex flex-col items-center justify-center rounded-xl border border-teal/20 bg-white px-6 py-3 shadow-xs">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Reference Code</span>
          <span className="font-mono text-xl font-black text-teal sm:text-2xl">{referenceNumber}</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-8">
      <HoneypotField />

      {submitError && (
        <div role="alert" className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 shadow-xs sm:text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <span>The form could not be submitted. Review the highlighted fields and try again.</span>
        </div>
      )}

      {/* Section 1: Personal Details */}
      <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
        <div className="mb-5 flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <User className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Personal Details</h3>
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
            placeholder="e.g. Chief Engineer / Manager"
            value={values.designation}
            onChange={(e) => update("designation", e.target.value)}
            error={errors.designation}
          />
          <TextField
            id="email"
            type="email"
            label="Work Email"
            required
            placeholder="john@company.com"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            error={errors.email}
          />
          <TextField
            id="phone"
            type="tel"
            label="Phone / Mobile"
            required
            placeholder="+977 9800000000"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            error={errors.phone}
          />
          <div className="sm:col-span-2">
            <TextField
              id="country"
              label="Country"
              required
              placeholder="e.g. Nepal, India, China"
              value={values.country}
              onChange={(e) => update("country", e.target.value)}
              error={errors.country}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Company Details */}
      <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
        <div className="mb-5 flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <Building className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Company Details</h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="companyName"
            label="Company / Organization"
            required
            placeholder="e.g. Acme Power Systems"
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
            label="Industry Sector"
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
      <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
        <div className="mb-5 flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <Compass className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Visit Interests</h3>
        </div>

        <div className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 text-sm font-bold text-slate-900">
              Primary Product Categories (Select all relevant)
              <span className="ml-1 text-red-500" aria-hidden="true">*</span>
            </legend>
            <div id="productCategories" tabIndex={-1} className="grid gap-3 outline-none sm:grid-cols-2">
              {productCategoryOptions.map((opt) => {
                const isChecked = values.productCategories.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    htmlFor={`productCategories-${opt.value}`}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-xs font-semibold leading-snug transition-all duration-200 sm:text-sm ${
                      isChecked
                        ? "border-teal/60 bg-teal/5 text-slate-900 shadow-2xs"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={`productCategories-${opt.value}`}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded-xs border-slate-300 text-teal focus:ring-teal"
                      checked={isChecked}
                      onChange={(e) => toggleCategory(opt.value, e.target.checked)}
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
            {errors.productCategories && (
              <p role="alert" className="text-xs font-bold text-red-500 mt-1">
                {errors.productCategories}
              </p>
            )}
          </fieldset>

          <TextAreaField
            id="visitPurpose"
            label="Purpose of Visit"
            required
            placeholder="Briefly state your main goals for attending (e.g. Sourcing suppliers, networking, market research)..."
            value={values.visitPurpose}
            onChange={(e) => update("visitPurpose", e.target.value)}
            error={errors.visitPurpose}
          />
        </div>
      </section>

      {/* Consent & reCAPTCHA */}
      <div className="flex flex-col gap-5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-xs">
        <CheckboxField
          id="privacyConsent"
          required
          checked={values.privacyConsent}
          onChange={(e) => update("privacyConsent", e.target.checked)}
          error={errors.privacyConsent}
          label={
            <span className="text-xs text-slate-600 sm:text-sm">
              I agree to the{" "}
              <Link href="/privacy-policy" className="font-bold text-teal underline hover:text-teal/80">
                Privacy Policy
              </Link>{" "}
              and consent to my information being processed for registration administration and event updates.
            </span>
          }
        />

        <div className="flex flex-col items-start gap-2 pt-1">
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-2xs">
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
            <p className="rounded bg-red-50 p-2 font-mono text-xs text-red-500">
              [reCAPTCHA Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing]
            </p>
          )}
          {errors.recaptcha && (
            <p className="text-xs font-bold text-red-500">{errors.recaptcha}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="w-full justify-center text-base font-bold shadow-sm transition-all hover:shadow-md sm:w-auto sm:min-w-[220px]"
          variant="cta-submit"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting Registration…
            </span>
          ) : (
            "Submit Registration"
          )}
        </Button>
      </div>
    </form>
  );
}