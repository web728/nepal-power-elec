"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { User, Building2, Store, ShieldCheck, AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
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
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
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

    if (!captchaToken && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
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
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50/50 to-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
          Enquiry Received
        </span>
        <h4 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">Thank You for Your Interest</h4>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
          The organizing team will review your submitted company and product profile. Please note that this submission serves as an application and does not immediately reserve or confirm a stand.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-xs">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Reference Code:</span>
          <span className="font-mono text-base font-bold text-teal">{referenceNumber}</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <HoneypotField />

      {submitError && (
        <div role="alert" className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700 shadow-xs sm:text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <span>The form could not be submitted. Review the highlighted fields below and try again.</span>
        </div>
      )}

      {/* Step 1: Contact Information */}
      <fieldset className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6">
        <legend className="flex items-center gap-2.5 text-base font-bold text-ink">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <User className="h-4 w-4" />
          </div>
          1. Personal Contact Details
        </legend>
        
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField
            id="fullName"
            label="Full Name"
            required
            placeholder="e.g. Rahul Sharma"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            error={errors.fullName}
          />
          <TextField
            id="designation"
            label="Designation"
            required
            placeholder="e.g. Marketing Director"
            value={values.designation}
            onChange={(e) => update("designation", e.target.value)}
            error={errors.designation}
          />
          <TextField
            id="email"
            type="email"
            label="Official Email Address"
            required
            placeholder="rahul@company.com"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            error={errors.email}
          />
          <TextField
            id="phone"
            type="tel"
            label="Phone / Mobile Number"
            required
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            error={errors.phone}
          />
          <div className="sm:col-span-2">
            <TextField
              id="country"
              label="Country"
              required
              placeholder="e.g. India"
              value={values.country}
              onChange={(e) => update("country", e.target.value)}
              error={errors.country}
            />
          </div>
        </div>
      </fieldset>

      {/* Step 2: Company Details */}
      <fieldset className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6">
        <legend className="flex items-center gap-2.5 text-base font-bold text-ink">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <Building2 className="h-4 w-4" />
          </div>
          2. Organization & Business Info
        </legend>
        
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField
            id="companyName"
            label="Company Name"
            required
            placeholder="e.g. Acme Industries Ltd"
            value={values.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            error={errors.companyName}
          />
          <TextField
            id="companyWebsite"
            type="text"
            label="Company Website"
            placeholder="www.company.com"
            value={values.companyWebsite}
            onChange={(e) => update("companyWebsite", e.target.value)}
            error={errors.companyWebsite}
          />
          <div className="sm:col-span-2">
            <TextField
              id="companyAddress"
              label="Company Registered Address"
              required
              placeholder="Street address, City, State, Postal Code"
              value={values.companyAddress}
              onChange={(e) => update("companyAddress", e.target.value)}
              error={errors.companyAddress}
            />
          </div>
          <div className="sm:col-span-2">
            <SelectField
              id="companyType"
              label="Company Type / Business Model"
              required
              placeholder="Select company type"
              options={companyTypeOptions}
              value={values.companyType}
              onChange={(e) => update("companyType", e.target.value)}
              error={errors.companyType}
            />
          </div>
        </div>
      </fieldset>

      {/* Step 3: Stand & Exhibit Details */}
      <fieldset className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6">
        <legend className="flex items-center gap-2.5 text-base font-bold text-ink">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <Store className="h-4 w-4" />
          </div>
          3. Exhibit Requirements
        </legend>

        <div className="mt-4 grid gap-4">
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
            label="Products / Technologies to Display"
            required
            placeholder="Briefly detail what products, services, or equipment you plan to demonstrate..."
            value={values.productsOrServices}
            onChange={(e) => update("productsOrServices", e.target.value)}
            error={errors.productsOrServices}
          />

          <TextField
            id="standRequirement"
            label="Preferred Stand Size / Configuration"
            required
            placeholder="e.g. 12 sqm Built-up Shell Scheme or 36 sqm Bare Space"
            hint="Indicate preferred area in sqm. Final allotment subject to availability."
            value={values.standRequirement}
            onChange={(e) => update("standRequirement", e.target.value)}
            error={errors.standRequirement}
          />

          <TextAreaField
            id="message"
            label="Additional Notes / Custom Requests (Optional)"
            placeholder="Any special power, rigging, or stall location requirements..."
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            error={errors.message}
          />
        </div>
      </fieldset>

      {/* Step 4: Consent & Recaptcha */}
      <div className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5">
        <CheckboxField
          id="privacyConsent"
          required
          checked={values.privacyConsent}
          onChange={(e) => update("privacyConsent", e.target.checked)}
          error={errors.privacyConsent}
          label={
            <span className="text-xs text-slate-600 sm:text-sm">
              I consent to the collection and processing of my details according to the{" "}
              <Link href="/privacy-policy" className="font-semibold text-teal underline hover:text-teal/80">
                Privacy Policy
              </Link>{" "}
              and accept the exhibition{" "}
              <Link href="/terms-and-conditions" className="font-semibold text-teal underline hover:text-teal/80">
                Terms and Conditions
              </Link>
              .
            </span>
          }
        />

        <div className="pt-2">
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
            <div className="inline-block overflow-hidden rounded-lg border border-slate-200 bg-white p-1">
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
            <p className="rounded bg-amber-50 p-2 font-mono text-xs text-amber-700 border border-amber-200">
              [Development Mode: reCAPTCHA site key missing]
            </p>
          )}
          {errors.recaptcha && (
            <p className="mt-1 text-xs font-semibold text-red-500">{errors.recaptcha}</p>
          )}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="w-full sm:w-auto min-w-[220px] justify-center gap-2 bg-teal text-white hover:bg-teal/90 shadow-md font-bold transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing Application...</span>
            </>
          ) : (
            <>
              <span>Submit Space Application</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}