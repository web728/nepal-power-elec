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

const MAX_TILT = 9; // degrees — subtle, premium feel (not gimmicky)

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
      // Density scales with area so mobile doesn't get overcrowded/laggy
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
        // idle drift
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // repel from cursor
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
      // Draw a single static frame for reduced-motion users
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

export function Hero() {
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const rotateX = useRef<((value: number) => void) | null>(null);
  const rotateY = useRef<((value: number) => void) | null>(null);

 useEffect(() => {
  const card = cardRef.current;
  if (!card) return;

  rotateX.current = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
  rotateY.current = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
}, []);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = cardWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    const tiltY = (px - 0.5) * MAX_TILT * 2;
    const tiltX = (0.5 - py) * MAX_TILT * 2;

    rotateX.current?.(tiltX);
    rotateY.current?.(tiltY);

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        "--glare-x": `${px * 100}%`,
        "--glare-y": `${py * 100}%`,
        opacity: 0.35,
        duration: 0.4,
        overwrite: "auto",
      });
    }
  }

  function handlePointerLeave() {
    rotateX.current?.(0);
    rotateY.current?.(0);
    if (glareRef.current) {
      gsap.to(glareRef.current, { opacity: 0, duration: 0.4, overwrite: "auto" });
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* 1. Background Image */}
      <Image
        src="/uploads/nepal-electric-home-page-banner.png"
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

      {/* 3. Ambient particles — idle drift + cursor repel */}
      <HeroParticles />

      <Container className="relative z-[2] grid grid-cols-1 gap-6 py-6 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-12">
        <div className="lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
            5TH NEPAL ELECTRIC, POWER AND LIGHTS INTERNATIONAL EXPO 2026
          </p>
          <h1 className="mt-2 max-w-2xl text-[28px] leading-[1.15] text-white sm:text-[38px] lg:text-[44px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
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
        </div>

        {/* 3D tilt image card */}
        <div className="lg:col-span-5">
          <div
            ref={cardWrapRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="[perspective:1200px]"
          >
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-xl border border-white/15 bg-white/5 shadow-2xl shadow-black/20 [transform-style:preserve-3d] will-change-transform"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/uploads/0L1A2376-min-1-1024x683.jpg"
                  alt="Grid of photographs showing exhibitor stands, visitors and the exhibition floor at the 2025 edition of the Nepal Electric, Power and Lights Expo"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority
                />
              </div>

              {/* Mouse-tracked glare/shine */}
              <div
                ref={glareRef}
                className="pointer-events-none absolute inset-0 opacity-0"
                style={{
                  background:
                    "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.35), transparent 60%)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}