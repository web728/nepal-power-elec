"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PressReleaseCard } from "./press-release-card";
import type { PressReleaseEdition } from "@/lib/content/press-releases";

export function PressReleaseCarousel({ edition }: { edition: PressReleaseEdition }) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const { releases } = edition;
  const count = releases.length;
  const current = releases[index];

  const goTo = (nextIndex: number) => {
    if (nextIndex === index) return;
    setIndex([nextIndex, nextIndex > index ? 1 : -1]);
  };

  const goPrev = () => goTo(index === 0 ? count - 1 : index - 1);
  const goNext = () => goTo(index === count - 1 ? 0 : index + 1);

  return (
    <div>
      {/* Edition heading + position indicator, so older releases stay reachable
          without scrolling the whole page */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{edition.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{edition.subtitle}</p>
        </div>

        {count > 1 && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">
              {index + 1} / {count}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous press release"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-teal/50 hover:text-teal"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next press release"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-teal/50 hover:text-teal"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current.id}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <PressReleaseCard release={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators double as direct jump-to controls */}
      {count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {releases.map((release, i) => (
            <button
              key={release.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show press release ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-teal" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}