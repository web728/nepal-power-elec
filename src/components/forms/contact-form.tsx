"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { motion, AnimatePresence } from "framer-motion";
import { contactFormSchema, type ContactFormInput } from "@/lib/validations/forms";
import { enquiryTypeOptions } from "@/lib/content/form-options";
import { TextField, TextAreaField, SelectField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { HONEYPOT_FIELD } from "@/lib/honeypot";
import { CheckCircle2, AlertCircle, Send, Sparkles, ShieldCheck } from "lucide-react";

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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto max-w-2xl rounded-2xl border border-emerald-200/80 bg-white p-8 sm:p-10 text-center shadow-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-600 shadow-xs"
        >
          <CheckCircle2 className="h-8 w-8" />
        </motion.div>

        <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
          Submission Successful
        </span>

        <h3 className="mt-3 text-2xl font-black text-slate-900">Thank You!</h3>

        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
          Your enquiry has been submitted to the organizing team. A representative may contact you using the
          details provided. Submission does not confirm registration, exhibition space, media accreditation or
          partnership status.
        </p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-5 py-3 border border-slate-200/80 shadow-2xs"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Reference Number:</span>
          <span className="font-mono text-base font-extrabold text-teal">{referenceNumber}</span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-8">
        <HoneypotField />

        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              role="alert"
              className="flex items-center gap-3 rounded-xl border border-rose-200/80 bg-rose-50/80 px-5 py-4 text-sm font-medium text-rose-800 shadow-2xs"
            >
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
              <span>The form could not be submitted. Review the highlighted fields and try again.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Fields Section */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-8 shadow-xs">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">Enquiry Information</h3>
            </div>
            <span className="text-xs font-medium text-slate-400">* Required fields</span>
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
            <TextField
              id="company"
              label="Company"
              placeholder="e.g. Acme Corp"
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
            <div className="sm:col-span-2">
              <TextField
                id="subject"
                label="Subject"
                required
                placeholder="How can we help you?"
                value={values.subject}
                onChange={(e) => update("subject", e.target.value)}
                error={errors.subject}
              />
            </div>
            <div className="sm:col-span-2">
              <TextAreaField
                id="message"
                label="Message"
                required
                placeholder="Write your message or inquiry here..."
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                error={errors.message}
              />
            </div>
          </div>
        </section>

        {/* Consent & reCAPTCHA Section */}
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            <ShieldCheck className="h-4 w-4 text-teal" />
            <span>Verification & Privacy</span>
          </div>

          <CheckboxField
            id="privacyConsent"
            required
            checked={values.privacyConsent}
            onChange={(e) => update("privacyConsent", e.target.checked)}
            error={errors.privacyConsent}
            label={
              <span className="text-sm font-medium text-slate-700">
                I agree to the{" "}
                <Link href="/privacy-policy" className="font-semibold text-teal underline decoration-teal/30 hover:decoration-teal transition-all">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-and-conditions" className="font-semibold text-teal underline decoration-teal/30 hover:decoration-teal transition-all">
                  Terms and Conditions
                </Link>
                .
              </span>
            }
          />

          <div className="flex flex-col items-start gap-2 pt-1">
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
              <div className="overflow-hidden rounded-xl border border-slate-200/80 p-1 bg-white shadow-2xs transition-all hover:border-slate-300">
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
              <p className="text-xs font-mono text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                [reCAPTCHA Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing in .env.local]
              </p>
            )}
            {errors.recaptcha && (
              <motion.p 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold text-rose-600"
              >
                {errors.recaptcha}
              </motion.p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full sm:w-auto min-w-[220px] justify-center gap-2 text-base font-bold shadow-sm transition-all hover:shadow-md"
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
                <>
                  <span>Send Enquiry</span>
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  );
}