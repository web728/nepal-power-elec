"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "nepal-expo-cookie-consent";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("consent-updated", { detail: consent }));
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Reading localStorage (an external system) on mount to decide whether
    // to show the banner — not derivable from props/state, so this must
    // happen in an effect rather than a lazy useState initializer (which
    // would mismatch between server and client render).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!getConsent()) setVisible(true);
    const openSettings = () => {
      setManaging(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    return () => window.removeEventListener("open-cookie-settings", openSettings);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
    setVisible(false);
  };
  const rejectNonEssential = () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
    setVisible(false);
  };
  const savePreferences = () => {
    saveConsent({ essential: true, analytics, marketing });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] sm:p-6"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm text-ink">
          We use essential cookies to run this website, and optional analytics cookies only with your consent. See our{" "}
          <a href="/cookie-policy" className="font-semibold text-sky-dark underline">
            Cookie Policy
          </a>
          .
        </p>

        {managing && (
          <div className="mt-4 flex flex-col gap-3 rounded-lg border border-border bg-bg p-4">
            <label className="flex items-start gap-2.5 text-sm">
              <input type="checkbox" checked disabled className="mt-1 h-4 w-4" />
              <span>
                <strong>Essential</strong> — required for security, forms and navigation. Always on.
              </span>
            </label>
            <label className="flex items-start gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                <strong>Analytics</strong> — helps us understand aggregate site usage.
              </span>
            </label>
            <label className="flex items-start gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                <strong>Marketing</strong> — used for campaign measurement, only if enabled.
              </span>
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {managing ? (
            <Button size="sm" onClick={savePreferences}>
              Save Preferences
            </Button>
          ) : (
            <>
              <Button size="sm" onClick={acceptAll}>
                Accept All
              </Button>
              <Button size="sm" variant="outline" onClick={rejectNonEssential}>
                Reject Non-Essential
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setManaging(true)}>
                Manage Preferences
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
