"use client";

import { useState, useRef, type FormEvent, useEffect } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import gsap from "gsap";
import { quickEnquirySchema, type QuickEnquiryInput } from "@/lib/validations/forms";
import { TextField, TextAreaField, SelectField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { CheckCircle2, Send, Loader2, AlertCircle } from "lucide-react";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { HONEYPOT_FIELD } from "@/lib/honeypot";
import { countryOptions } from "@/lib/countries";

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
  country: "Nepal",
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
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (referenceNumber && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.9, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [referenceNumber]);

  function triggerShakeAnimation() {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { x: -8 },
        { x: 8, duration: 0.08, repeat: 5, yoyo: true, ease: "power1.inOut", onComplete: () => gsap.set(formRef.current, { x: 0 }) }
      );
    }
  }

  function update<K extends keyof QuickEnquiryInput>(key: K, value: QuickEnquiryInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
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
      triggerShakeAnimation();
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
        triggerShakeAnimation();
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
      triggerShakeAnimation();
    } finally {
      setIsSubmitting(false);
    }
  }

  if (referenceNumber) {
    return (
      <div
        ref={successRef}
        className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/50 p-8 text-center backdrop-blur-sm shadow-lg"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <p className="mt-4 text-2xl font-bold text-slate-900">Thank You!</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-md mx-auto">
          Your enquiry has been received. Our team will review your message and get back to you shortly.
        </p>
        <div className="mt-6 inline-block rounded-xl border border-emerald-200 bg-white px-4 py-2.5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Reference Number</p>
          <p className="mt-0.5 text-base font-mono font-bold text-emerald-700">{referenceNumber}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="relative flex flex-col gap-5"
    >
      <HoneypotField />

      {submitError && (
        <div
          ref={errorRef}
          role="alert"
          className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm font-medium text-red-700 backdrop-blur-sm"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <span>Something went wrong while sending your message. Please try again.</span>
        </div>
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
          id="country"
          label="Country"
          required
          placeholder="Select your country"
          options={countryOptions}
          value={values.country}
          onChange={(e) => update("country", e.target.value)}
          error={errors.country}
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
              <Link href="/privacy-policy" className="font-semibold text-sky-600 hover:text-sky-700 hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-and-conditions" className="font-semibold text-sky-600 hover:text-sky-700 hover:underline">
                Terms &amp; Conditions
              </Link>
              .
            </>
          }
        />

        {/* Google reCAPTCHA v2 Component Container */}
        <div className="flex flex-col items-start gap-1.5 rounded-xl border border-slate-100 bg-slate-50/50 p-2.5">
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
            <p className="text-xs font-mono text-red-500">
              [reCAPTCHA Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing in .env]
            </p>
          )}
          {errors.recaptcha && (
            <p className="text-xs font-semibold text-red-500">{errors.recaptcha}</p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          variant="cta-submit"
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:shadow-lg sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending Enquiry...</span>
            </>
          ) : (
            <>
              <span>Send Enquiry</span>
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}