import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "min-h-[44px] w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted transition-colors outline-none focus-visible:border-sky focus-visible:outline-2 focus-visible:outline-sky disabled:pointer-events-none disabled:bg-bg disabled:opacity-50 aria-invalid:border-error",
        className
      )}
      {...props}
    />
  );
}

export { Input };
