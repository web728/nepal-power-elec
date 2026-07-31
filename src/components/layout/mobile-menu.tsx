"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";
import { mainNav } from "@/lib/content/nav";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const REG_VISITOR = siteConfig.registration.visitor;
const REG_EXHIBITOR = siteConfig.registration.exhibitor;

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    // Prevent background scrolling on mobile
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  const menuContent = (
    <div className="fixed inset-0 z-[9999] lg:hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-y-0 right-0 z-[10000] flex w-full max-w-[320px] flex-col overflow-y-auto bg-white p-5 shadow-2xl focus:outline-none transition-transform duration-300"
      >
        {/* Header: Event Logo + Close Button */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link href="/" onClick={onClose} className="flex items-center">
            <Image
              src={siteConfig.eventLogo}
              alt={siteConfig.eventName}
              width={140}
              height={40}
              className="h-15 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Concurrent Show Small Banner */}
        <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-gray-50/80 p-2.5">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase leading-none">
              Concurrent Show
            </span>
          </div>
          <Image
            src="/logo/concurrent-event-logo.png"
            alt="Concurrent Event Logo"
            width={120}
            height={40}
            className="h-15 w-auto object-contain"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col gap-2.5">
          <Button
            href={REG_EXHIBITOR}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            variant="cta-exhibitor"
            className="w-full justify-center font-semibold text-xs py-2.5"
          >
            Book a Stand
          </Button>
          <Button
            href={REG_VISITOR}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            variant="cta-visitor"
            className="w-full justify-center font-semibold text-xs py-2.5"
          >
            Register to Visit
          </Button>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Primary" className="mt-5 flex flex-col divide-y divide-border/60">
          {mainNav.map((item) => (
            <div key={item.href} className="py-1">
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-2.5 text-left text-sm font-semibold text-ink"
                    aria-expanded={openSection === item.href}
                    onClick={() => setOpenSection(openSection === item.href ? null : item.href)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                        openSection === item.href ? "rotate-180 text-teal-dark" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion Sub-links */}
                  {openSection === item.href && (
                    <div className="mb-2 flex flex-col rounded-lg bg-teal-dark/5 p-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="rounded-md px-3 py-2 text-xs font-medium text-ink hover:bg-white hover:text-teal-dark transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2.5 text-sm font-semibold text-ink hover:text-teal-dark transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );

  // Render into document.body via portal so the drawer isn't affected by
  // any ancestor's `transform` (e.g. the Header's slide-in/out animation),
  // which would otherwise turn the ancestor into the containing block for
  // this `fixed` element and break the overlay's positioning.
  return createPortal(menuContent, document.body);
}