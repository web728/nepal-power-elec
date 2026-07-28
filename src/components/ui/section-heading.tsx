import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-2 text-sm font-bold uppercase tracking-wide",
            tone === "dark" ? "text-yellow" : "text-sky-dark"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-[26px] leading-[1.2] sm:text-[32px]", tone === "dark" ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-3 text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-white/80" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}
