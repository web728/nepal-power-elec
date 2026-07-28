"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { mainNav } from "@/lib/content/nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { siteConfig } from "@/lib/site-config";

const REG_VISITOR = siteConfig.registration.visitor;
const REG_EXHIBITOR = siteConfig.registration.exhibitor;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-50 bg-white transition-shadow duration-300",
        scrolled ? "shadow-md" : "border-b border-border"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between container-px py-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
        >
          <Image
            src={siteConfig.eventLogo}
            alt={siteConfig.eventName}
            width={220}
            height={60}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {mainNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded px-3 py-2 text-sm font-semibold text-ink hover:text-sky-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
                aria-haspopup={item.children ? "true" : undefined}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                    aria-hidden="true"
                  />
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full w-72 -translate-y-1 rounded-lg border border-border bg-white py-2 opacity-0 shadow-xl transition-[opacity,transform,visibility] duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-ink hover:bg-bg hover:text-sky-dark focus-visible:bg-bg focus-visible:text-sky-dark focus-visible:outline-none"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Button href={REG_EXHIBITOR} target="_blank" rel="noopener noreferrer" size="sm" variant="cta-exhibitor">
            Book a Stand
          </Button>
          <Button href={REG_VISITOR} target="_blank" rel="noopener noreferrer" size="sm" variant="cta-visitor">
            Register to Visit
          </Button>
        </div>

        <button
          type="button"
          className="rounded p-2 text-ink xl:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
