"use client";

export function CookieSettingsButton() {
  return (
    <button type="button" className="hover:text-yellow" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>
      Cookie Settings
    </button>
  );
}
