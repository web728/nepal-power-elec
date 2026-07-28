"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

export function SearchForm() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    trackEvent(AnalyticsEvents.SEARCH_NO_RESULTS);
  }

  function handleReset() {
    setQuery("");
    setSubmitted(false);
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="site-search" className="sr-only">
          Search
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by keyword, company, product, page or topic"
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:border-sky min-h-[48px]"
        />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </form>

      {submitted && (
        <div
          role="status"
          className="mt-6 rounded-lg border-l-4 border-yellow bg-yellow/10 px-5 py-4 text-sm leading-relaxed text-ink"
        >
          No results were found for your search. Check the spelling, use fewer words, browse the
          sitemap or contact the organizing team.
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="outline" onClick={handleReset} type="button">
          Search Again
        </Button>
        <Button href="/sitemap" variant="ghost">
          View Sitemap
        </Button>
        <Button href="/contact" variant="ghost">
          Contact Us
        </Button>
      </div>
    </div>
  );
}
