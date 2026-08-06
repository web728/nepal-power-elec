// @/components/sections/stats-section.tsx

import { Container } from "@/components/ui/container";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { eventScale } from "@/lib/content/stats";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-teal py-14 sm:py-18">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(4, 79, 71, 0.5) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        <p className="mb-8 text-center text-sm font-bold uppercase tracking-wide text-yellow">
          2025 Edition Results
        </p>
        
        {/* Updated grid for 4 items: Mobile (2 cols) -> Tablet/Desktop (4 cols) */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {eventScale.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/90">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}