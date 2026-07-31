"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
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
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const lastScrollY = useRef(0);

  // Smooth Auto-hide header logic on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add shadow when scrolled down
      setScrolled(currentScrollY > 20);

      // Scroll Down -> Hide | Scroll Up -> Show
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= 120) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    if (
      typeof document !== "undefined" &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 inset-x-0 z-50 bg-white transition-transform duration-300 ease-in-out",
        scrolled ? "shadow-md" : "border-b border-border/80",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Top Row: Main Event Logo (Left) & Concurrent Show Logo (Right, sm+) */}
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-2 container-px py-2 sm:py-2.5">

        {/* Main Event Logo */}
        <Link
          href="/"
          className="flex items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky shrink-0"
        >
          <Image
            src={siteConfig.eventLogo}
            alt={siteConfig.eventName}
            width={260}
            height={70}
            priority
            className="h-15 w-auto sm:h-10 md:h-15 lg:h-15 object-contain transition-transform hover:scale-[1.01]"
          />
        </Link>

        {/* Right Area: Concurrent Show Logo (hidden on mobile, shown in drawer instead) + Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 shrink-0">

          {/* Concurrent Show Logo Container — hidden below sm, since it's shown in the mobile drawer already */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3 pl-3 sm:pl-5 border-l border-border/80">
            <div className="flex flex-col items-end justify-center">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-muted-foreground uppercase leading-none">
                Concurrent
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-muted-foreground uppercase leading-tight">
                Show
              </span>
            </div>

            <Image
              src="/logo/concurrent-event-logo.png"
              alt="5th Home Appliances Concurrent Event Logo"
              width={200}
              height={70}
              className="h-15 w-auto sm:h-15 md:h-15 object-contain"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="rounded-lg p-1.5 text-ink lg:hidden hover:bg-gray-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky shrink-0"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Bottom Row: Nav Links (Left) + CTAs (Right) — Desktop only */}
      <div className="hidden lg:block border-t border-teal-dark/15 bg-teal-dark/[0.04] backdrop-blur-xs">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between container-px py-1">

          {/* Nav Items */}
          <nav aria-label="Primary" className="flex items-center space-x-1">
            {mainNav.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-md px-3 py-1.5 text-xs sm:text-sm font-semibold text-ink hover:text-teal-dark hover:bg-white/80 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
                  aria-haspopup={item.children ? "true" : undefined}
                  onClick={handleLinkClick}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:rotate-180 group-focus-within:rotate-180 group-hover:text-teal-dark"
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {item.children && (
                  <div className="invisible absolute left-0 top-full w-64 -translate-y-1 rounded-lg border border-border bg-white py-1.5 opacity-0 shadow-xl transition-[opacity,transform,visibility] duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3.5 py-2 text-xs sm:text-sm font-medium text-ink hover:bg-teal-dark/5 hover:text-teal-dark focus-visible:bg-teal-dark/5 focus-visible:text-teal-dark focus-visible:outline-none"
                        onClick={handleLinkClick}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <Button
              href={REG_EXHIBITOR}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="cta-exhibitor"
              className="font-semibold shadow-xs text-xs px-3.5 py-1.5 h-auto transition-transform hover:scale-[1.02]"
            >
              Book a Stand
            </Button>
            <Button
              href={REG_VISITOR}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="cta-visitor"
              className="font-semibold shadow-xs text-xs px-3.5 py-1.5 h-auto transition-transform hover:scale-[1.02]"
            >
              Register to Visit
            </Button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}