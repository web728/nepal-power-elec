"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { exhibitorEnquirySchema, type ExhibitorEnquiryInput } from "@/lib/validations/forms";
import { productCategoryOptions, companyTypeOptions } from "@/lib/content/form-options";
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
  country: "",
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

    const result = exhibitorEnquirySchema.safeParse(formattedValues);
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
      <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-300 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">Enquiry Received</p>
        <p className="mt-3 text-base leading-relaxed text-slate-800 sm:text-lg">
          Thank you for your interest in exhibiting. The organizing team will review the company and product
          information provided. Submission does not reserve or confirm a stand.
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

        {/* Section 1: Contact Details */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="h-6 w-1 rounded-full bg-blue-600"></div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Contact Details</h3>
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
                placeholder="Enter your country"
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
              label="Company Name"
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
            <TextField
              id="companyAddress"
              label="Company Address"
              required
              placeholder="Street address, City, Zip Code"
              className="sm:col-span-2"
              value={values.companyAddress}
              onChange={(e) => update("companyAddress", e.target.value)}
              error={errors.companyAddress}
            />
            <div className="sm:col-span-2">
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
        </section>

        {/* Section 3: Exhibit Details */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="h-6 w-1 rounded-full bg-blue-600"></div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Exhibit Details</h3>
          </div>
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
              placeholder="Briefly describe what you will display or showcase..."
              value={values.productsOrServices}
              onChange={(e) => update("productsOrServices", e.target.value)}
              error={errors.productsOrServices}
            />
            <TextField
              id="standRequirement"
              label="Preferred Stand Requirement"
              required
              placeholder="e.g. 9 sqm shell scheme, 18 sqm raw space"
              hint="Preference only, not a final booking"
              value={values.standRequirement}
              onChange={(e) => update("standRequirement", e.target.value)}
              error={errors.standRequirement}
            />
            <TextAreaField
              id="message"
              label="Message (Optional)"
              placeholder="Any additional questions or specific instructions..."
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              error={errors.message}
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
                and{" "}
                <Link href="/terms-and-conditions" className="font-semibold text-blue-600 underline hover:text-blue-700">
                  Terms and Conditions
                </Link>
                .
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
              "Submit Enquiry"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}