"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { mainNav } from "@/lib/content/nav";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const REG_VISITOR = siteConfig.registration.visitor;
const REG_EXHIBITOR = siteConfig.registration.exhibitor;

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white p-5 focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <Image src={siteConfig.eventLogo} alt="" width={140} height={38} className="h-9 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded p-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          <Button href={REG_EXHIBITOR} target="_blank" rel="noopener noreferrer" onClick={onClose} variant="cta-exhibitor" className="w-full">
            Book a Stand
          </Button>
          <Button href={REG_VISITOR} target="_blank" rel="noopener noreferrer" onClick={onClose} variant="cta-visitor" className="w-full">
            Register to Visit
          </Button>
        </div>

        <nav aria-label="Primary" className="mt-6 flex flex-col">
          {mainNav.map((item) => (
            <div key={item.href} className="border-b border-border">
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3.5 text-left font-semibold text-ink"
                    aria-expanded={openSection === item.href}
                    onClick={() => setOpenSection(openSection === item.href ? null : item.href)}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openSection === item.href ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {openSection === item.href && (
                    <div className="flex flex-col gap-1 pb-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="rounded px-2 py-2.5 text-sm text-muted hover:bg-bg hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href} onClick={onClose} className="block py-3.5 font-semibold text-ink">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
