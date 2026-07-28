"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  const animateValue = useCallback(() => {
    const match = value.match(/^([\d,]+)(\+?)$/);
    if (!match) return;

    const numStr = match[1].replace(/,/g, "");
    const suffix = match[2] || "";
    const target = parseInt(numStr, 10);
    if (isNaN(target)) return;

    const duration = 1600;
    const steps = 40;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(current.toLocaleString() + suffix);

      if (step >= steps) {
        clearInterval(timer);
        setDisplay(value);
      }
    }, interval);
  }, [value]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animateValue]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
