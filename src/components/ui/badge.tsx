import * as React from "react";
import { cn } from "@/lib/utils";

const toneClasses: Record<string, string> = {
  sky: "bg-sky/10 text-sky-dark border-sky/20",
  teal: "bg-teal/10 text-teal border-teal/20",
  yellow: "bg-yellow/10 text-yellow-dark border-yellow/20",
  muted: "bg-bg text-muted border-border",
  success: "bg-success/10 text-success border-success/20",
  error: "bg-error/10 text-error border-error/20",
};

function Badge({
  className,
  tone = "sky",
  ...props
}: React.ComponentProps<"span"> & {
  tone?: "sky" | "teal" | "yellow" | "muted" | "success" | "error";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
