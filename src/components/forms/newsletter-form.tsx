"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations/forms";
import { cn } from "@/lib/utils";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { HONEYPOT_FIELD } from "@/lib/honeypot";

type Errors = Partial<Record<keyof NewsletterInput, string>>;

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<NewsletterInput>({ email: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState(
    "The form could not be submitted. Review the highlighted fields and try again."
  );
  const [subscribed, setSubscribed] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(false);

    const result = newsletterSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const nextErrors: Errors = {};
      let firstKey: string | null = null;
      for (const key in fieldErrors) {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          nextErrors[key as keyof NewsletterInput] = messages[0];
          if (!firstKey) firstKey = key;
        }
      }
      setErrors(nextErrors);
      if (firstKey) document.getElementById(firstKey)?.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          [HONEYPOT_FIELD]: (document.getElementById(HONEYPOT_FIELD) as HTMLInputElement)?.value ?? "",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setSubmitErrorMessage(
          body?.error || "The form could not be submitted. Review the highlighted fields and try again."
        );
        setSubmitError(true);
        return;
      }

      setSubscribed(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const labelClass = compact ? "text-white" : "text-ink";
  const mutedClass = compact ? "text-white/70" : "text-muted";
  const inputClass = compact
    ? "w-full rounded-lg border border-white/25 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow min-h-[44px]"
    : "w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky min-h-[44px]";

  if (subscribed) {
    return (
      <p role="status" className={cn("text-sm font-medium", compact ? "text-yellow" : "text-success")}>
        Thanks — check your inbox to confirm your subscription.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("relative flex flex-col gap-3", compact && "gap-2.5")}>
      <HoneypotField />
      {submitError && (
        <p role="alert" className={cn("text-xs font-medium", compact ? "text-yellow" : "text-error")}>
          {submitErrorMessage}
        </p>
      )}

      <div className={cn("flex gap-2.5", compact ? "flex-col sm:flex-row" : "flex-col")}>
        <div className="flex-1">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            aria-invalid={!!errors.email}
            placeholder="Enter your email"
            className={inputClass}
            value={values.email}
            onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
          />
          {errors.email && (
            <p role="alert" className={cn("mt-1 text-xs font-medium", compact ? "text-yellow" : "text-error")}>
              {errors.email}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-yellow px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-yellow/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-50"
        >
          {isSubmitting ? "Submitting…" : "Subscribe"}
        </button>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          required
          aria-invalid={!!errors.consent}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
          checked={values.consent}
          onChange={(e) => setValues((prev) => ({ ...prev, consent: e.target.checked }))}
        />
        <label htmlFor="consent" className={cn("text-xs leading-snug", labelClass)}>
          I agree to receive email updates and accept the{" "}
          <Link href="/privacy-policy" className="font-semibold underline hover:no-underline">
            Privacy Policy
          </Link>
          .
        </label>
      </div>
      {errors.consent && (
        <p role="alert" className={cn("text-xs font-medium", compact ? "text-yellow" : "text-error")}>
          {errors.consent}
        </p>
      )}
      {!compact && <p className={cn("text-xs", mutedClass)}>We only send verified event updates.</p>}
    </form>
  );
}
