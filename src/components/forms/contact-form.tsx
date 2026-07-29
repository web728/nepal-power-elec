"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { contactFormSchema, type ContactFormInput } from "@/lib/validations/forms";
import { enquiryTypeOptions, countryOptions } from "@/lib/content/form-options";
import { TextField, TextAreaField, SelectField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { HONEYPOT_FIELD } from "@/lib/honeypot";

const initialValues: ContactFormInput = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  company: "",
  enquiryType: "",
  subject: "",
  message: "",
  privacyConsent: false,
};

type Errors = Partial<Record<keyof ContactFormInput, string>> & {
  recaptcha?: string;
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormInput>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { showToast } = useToast();

  function update<K extends keyof ContactFormInput>(key: K, value: ContactFormInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(false);

    // 1. Validate Form Schema
    const result = contactFormSchema.safeParse(values);
    const nextErrors: Errors = {};

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      let firstKey: string | null = null;
      for (const key in fieldErrors) {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          nextErrors[key as keyof ContactFormInput] = messages[0];
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          recaptchaToken: captchaToken, // reCAPTCHA Token
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
        // Reset Captcha on error
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        return;
      }

      const data = await res.json();
      setReferenceNumber(data.referenceNumber);
      showToast("Enquiry submitted successfully.", "success");
      trackEvent(AnalyticsEvents.CONTACT_SUBMIT, {});
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
        <p className="text-sm font-bold uppercase tracking-wide text-success">Thank You</p>
        <p className="mt-3 text-base leading-relaxed text-ink sm:text-lg">
          Your enquiry has been submitted to the organizing team. A representative may contact you using the
          details provided. Submission does not confirm registration, exhibition space, media accreditation or
          partnership status.
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
          id="phone"
          type="tel"
          label="Phone"
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
        <TextField
          id="company"
          label="Company"
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          error={errors.company}
        />
        <SelectField
          id="enquiryType"
          label="Enquiry Type"
          required
          placeholder="Select enquiry type"
          options={enquiryTypeOptions}
          value={values.enquiryType}
          onChange={(e) => update("enquiryType", e.target.value)}
          error={errors.enquiryType}
        />
        <TextField
          id="subject"
          label="Subject"
          required
          className="sm:col-span-2"
          value={values.subject}
          onChange={(e) => update("subject", e.target.value)}
          error={errors.subject}
        />
      </div>

      <TextAreaField
        id="message"
        label="Message"
        required
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
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
    <p className="text-xs text-error font-mono">
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
          {isSubmitting ? "Submitting…" : "Send Enquiry"}
        </Button>
      </div>
    </form>
  );
}