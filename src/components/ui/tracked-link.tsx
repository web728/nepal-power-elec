"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

export function TrackedLink({
  event,
  params,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; params?: Record<string, string> }) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(event, params);
        onClick?.(e);
      }}
    />
  );
}
