"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const REG_VISITOR = siteConfig.registration.visitor;
const REG_EXHIBITOR = siteConfig.registration.exhibitor;

/** Central place to manage gallery images — works for mobile carousel */
const GALLERY_IMAGES = [
  { src: "/uploads/0L1A2654-min-1536x1024.jpg", alt: "Exhibition floor" },
  { src: "/uploads/0L1A2354-min-1-1024x683.jpg", alt: "Exhibitor stand" },
  { src: "/uploads/IMG_8276-min-300x200.jpg", alt: "Visitors networking" },
  { src: "/uploads/np7-1024x681.jpg", alt: "Product demo" },
  { src: "/uploads/IMG_8240-min-1536x1022.jpg", alt: "Panel discussion" },
  { src: "/uploads/0L1A2376-min-1-1024x683.jpg", alt: "Award ceremony" },
  { src: "/uploads/AYU_7443-min-1536x1024.jpg", alt: "Award ceremony" },
  { src: "/uploads/0L1A2531-min-1-1024x683.jpg", alt: "Award ceremony" },
  { src: "/uploads/559A5415-min.jpg", alt: "Ribbon cutting" },
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
};

/** Canvas-based ambient particles that gently drift and repel from the cursor. */
function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function initParticles() {
      const count = Math.max(50, Math.min(120, Math.floor((width * height) / 9000)));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: Math.random() * 2.2 + 1.0,
        opacity: Math.random() * 0.4 + 0.4,
      }));
    }

    function resize() {
      if (!canvas || !parent || !ctx) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function onMouseMove(e: MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    const REPEL_RADIUS = 140;
    const REPEL_STRENGTH = 2.6;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0.01) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    resize();
    if (!prefersReducedMotion) {
      animate();
    } else {
      animate();
      cancelAnimationFrame(rafRef.current);
    }

    window.addEventListener("resize", resize);
    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}

/**
 * Mobile: infinite auto-scrolling carousel.
 * Hidden on desktop (`lg:hidden`).
 */
function MobileImageCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: GALLERY_IMAGES.length * 4,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const loopedImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <div className="relative w-full overflow-hidden lg:hidden">
      {/* Fade edges so images don't hard-cut at the container bounds */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black/40 to-transparent" />

      <div ref={trackRef} className="flex w-max gap-3 py-1">
        {loopedImages.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative h-32 w-44 flex-shrink-0 overflow-hidden rounded-xl border border-white/15 shadow-lg shadow-black/20 sm:h-36 sm:w-52"
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="220px" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 1. Background Image */}
      <Image
        src="/uploads/nepal-electric-home-page-banner.jpeg"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center pointer-events-none"
        sizes="100vw"
      />

      {/* Subtle radial accent */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(53, 168, 224, 0.09) 0%, transparent 90%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient particles */}
      <HeroParticles />

      <Container className="relative z-[2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
            5TH NEPAL ELECTRIC, POWER AND LIGHTS INTERNATIONAL EXPO 2026
          </p>
          <h1 className="mt-2 max-w-2xl text-[28px] leading-[1.15] text-white sm:text-[38px] lg:text-[48px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {siteConfig.marketingLine}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Meet manufacturers, suppliers, buyers, engineers, distributors and project professionals across
            Nepal&apos;s electrical, power, lighting, renewable-energy and allied industries.
          </p>

          <div className="mt-4 inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
            <div className="h-8 w-1 rounded-full bg-yellow" aria-hidden="true" />
            <p className="text-xs font-semibold text-white sm:text-sm">
              {siteConfig.dates.display} · {siteConfig.venue.name} · {siteConfig.venue.city},{" "}
              {siteConfig.venue.country}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <TrackedLink
              event={AnalyticsEvents.BOOK_STAND_START}
              params={{ source: "hero" }}
              href={REG_EXHIBITOR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Book a Stand
            </TrackedLink>

            <TrackedLink
              event={AnalyticsEvents.VISITOR_REGISTER_START}
              params={{ source: "hero" }}
              href={REG_VISITOR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors duration-150 hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Register to Visit
            </TrackedLink>

            <TrackedLink
              event={AnalyticsEvents.BROCHURE_DOWNLOAD}
              params={{ source: "hero" }}
              href="/downloads/Nepal-Electric-Power-Lights-Expo-2026-Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center justify-center gap-1.5 text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 hover:text-yellow hover:decoration-yellow drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
            >
              Download Brochure
            </TrackedLink>
          </div>

          {/* Mobile-only infinite scroll carousel */}
          <div className="mt-8 lg:hidden">
            <MobileImageCarousel />
          </div>
        </div>
      </Container>
    </section>
  );
}