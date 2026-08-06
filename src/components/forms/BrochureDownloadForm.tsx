"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { brochureDownloadSchema, type BrochureDownloadInput } from "@/lib/validations/forms";
import { TextField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { HONEYPOT_FIELD } from "@/lib/honeypot";

const initialValues: BrochureDownloadInput = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  company: "",
  privacyConsent: false,
};

type Errors = Partial<Record<keyof BrochureDownloadInput, string>> & {
  recaptcha?: string;
};

export function BrochureDownloadForm() {
  const [values, setValues] = useState<BrochureDownloadInput>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { showToast } = useToast();

  function update<K extends keyof BrochureDownloadInput>(key: K, value: BrochureDownloadInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(false);

    // 1. Validate Form Data
    const result = brochureDownloadSchema.safeParse(values);
    const nextErrors: Errors = {};

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      for (const key in fieldErrors) {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          nextErrors[key as keyof BrochureDownloadInput] = messages[0];
        }
      }
    }

    // 2. Check reCAPTCHA
    if (!captchaToken) {
      nextErrors.recaptcha = "Please complete the reCAPTCHA verification.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/event-brochure-download", {
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
          body?.error || "Submission failed. Please check the fields and try again.",
          "error"
        );
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        return;
      }

      const data = await res.json();
      setDownloadUrl(data.downloadUrl);
      showToast("Verification successful! Your brochure download is ready.", "success");
      trackEvent(AnalyticsEvents.CONTACT_SUBMIT, { category: "BrochureDownload" });

      // Auto-trigger PDF download
      if (data.downloadUrl) {
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = "Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch {
      setSubmitError(true);
      showToast("Submission failed. Please try again.", "error");
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (downloadUrl) {
    return (
      <div className="rounded-2xl border border-emerald-300 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">Brochure Unlocked</p>
        <p className="mt-3 text-base leading-relaxed text-slate-800">
          Thank you for registering. Your brochure download should start automatically. If it didn&apos;t start, click the button below.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href={downloadUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
            Download 2026 Event Brochure (PDF)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">
      <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
        Fill Details to Download Brochure
      </h3>
      <p className="mb-6 text-sm text-slate-600">
        Please complete the brief form below to access the official 2026 Event Brochure.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <HoneypotField />

        {submitError && (
          <div role="alert" className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <span>The form could not be submitted. Please check the fields and try again.</span>
          </div>
        )}

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
          id="email"
          type="email"
          label="Email Address"
          required
          placeholder="john@company.com"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="phone"
            type="tel"
            label="Phone Number"
            placeholder="+1 234 567 890"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            error={errors.phone}
          />
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

        <TextField
          id="company"
          label="Company / Organization"
          placeholder="e.g. Acme Corp"
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          error={errors.company}
        />

        <CheckboxField
          id="privacyConsent"
          required
          checked={values.privacyConsent}
          onChange={(e) => update("privacyConsent", e.target.checked)}
          error={errors.privacyConsent}
          label={
            <span className="text-xs text-slate-600">
              I agree to the{" "}
              <Link href="/privacy-policy" className="font-semibold text-blue-600 underline">
                Privacy Policy
              </Link>{" "}
              and allow sending event details.
            </span>
          }
        />

        <div className="pt-1">
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-sm inline-block">
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
          )}
          {errors.recaptcha && <p className="mt-1 text-xs font-semibold text-red-500">{errors.recaptcha}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="mt-2 w-full justify-center text-base font-semibold"
          variant="cta-submit"
        >
          {isSubmitting ? "Processing…" : "Submit & Download Brochure"}
        </Button>
      </form>
    </div>
  );
}