"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { quickEnquirySchema, type QuickEnquiryInput } from "@/lib/validations/forms";
import { TextField, TextAreaField, SelectField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { CheckCircle2 } from "lucide-react";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { HONEYPOT_FIELD } from "@/lib/honeypot";

const interestOptions = [
  { label: "Exhibiting at the Expo", value: "Exhibiting" },
  { label: "Visiting the Expo", value: "Visiting" },
  { label: "Partnership Opportunity", value: "Partnership" },
  { label: "Sponsorship", value: "Sponsorship" },
  { label: "Media Coverage", value: "Media" },
  { label: "General Enquiry", value: "General" },
];

const initialValues: QuickEnquiryInput = {
  fullName: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
  privacyConsent: false,
};

type Errors = Partial<Record<keyof QuickEnquiryInput, string>> & {
  recaptcha?: string;
};

export function QuickEnquiryForm() {
  const [values, setValues] = useState<QuickEnquiryInput>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { showToast } = useToast();

  function update<K extends keyof QuickEnquiryInput>(key: K, value: QuickEnquiryInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(false);

    // 1. Validate Form Schema
    const result = quickEnquirySchema.safeParse(values);
    const nextErrors: Errors = {};

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      let firstKey: string | null = null;
      for (const key in fieldErrors) {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          nextErrors[key as keyof QuickEnquiryInput] = messages[0];
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
      const res = await fetch("/api/quick-enquiry", {
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
        showToast(body?.error || "Something went wrong. Please try again.", "error");
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        return;
      }

      const data = await res.json();
      setReferenceNumber(data.referenceNumber);
      showToast("Enquiry submitted successfully.", "success");
    } catch {
      setSubmitError(true);
      showToast("Something went wrong. Please try again.", "error");
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (referenceNumber) {
    return (
      <div className="rounded-xl border-2 border-success bg-success/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <p className="mt-3 text-lg font-semibold text-ink">Thank You!</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Your enquiry has been received. Our team will get back to you shortly.
        </p>
        <p className="mt-4 text-xs text-muted">
          Reference: <span className="font-semibold text-ink">{referenceNumber}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5">
      <HoneypotField />
      {submitError && (
        <p role="alert" className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm font-medium text-error">
          Something went wrong. Please try again.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="fullName"
          label="Full Name"
          required
          placeholder="Your full name"
          value={values.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          error={errors.fullName}
        />
        <TextField
          id="email"
          type="email"
          label="Email"
          required
          placeholder="you@company.com"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
        <TextField
          id="phone"
          type="tel"
          label="Phone"
          placeholder="+977 ..."
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
        />
        <SelectField
          id="interest"
          label="I'm Interested In"
          required
          placeholder="Select your interest"
          options={interestOptions}
          value={values.interest}
          onChange={(e) => update("interest", e.target.value)}
          error={errors.interest}
        />
      </div>

      <TextAreaField
        id="message"
        label="Message"
        required
        placeholder="Tell us about your requirements..."
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
      />

      <div className="flex flex-col gap-4">
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
                Terms &amp; Conditions
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
              [reCAPTCHA Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing in .env]
            </p>
          )}
          {errors.recaptcha && (
            <p className="text-xs font-medium text-error">{errors.recaptcha}</p>
          )}
        </div>
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} size="lg" variant="cta-submit" className="w-full sm:w-auto">
          {isSubmitting ? "Sending…" : "Send Enquiry"}
        </Button>
      </div>
    </form>
  );
}