import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted transition-colors outline-none resize-y focus-visible:border-sky focus-visible:outline-2 focus-visible:outline-sky disabled:pointer-events-none disabled:bg-bg disabled:opacity-50 aria-invalid:border-error",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
