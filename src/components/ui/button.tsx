import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import Link from "next/link";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-sky text-white hover:bg-sky-dark active:bg-sky-dark",
        primary:
          "bg-sky text-white hover:bg-sky-dark active:bg-sky-dark",
        secondary:
          "bg-teal text-white hover:bg-teal-dark active:bg-teal-dark",
        outline:
          "border border-border bg-white text-ink hover:bg-bg active:bg-bg",
        "outline-white":
          "border border-white/40 text-white hover:bg-white/10 active:bg-white/15",
        ghost: "text-sky hover:bg-sky/10 active:bg-sky/15",
        destructive: "bg-error text-white hover:bg-error/90",
        link: "text-sky underline-offset-4 hover:underline",
        "cta-exhibitor": "bg-yellow text-ink hover:bg-yellow/90 active:bg-yellow-dark",
        "cta-visitor": "bg-yellow text-ink hover:bg-yellow/90 active:bg-yellow-dark",
        "cta-submit": "bg-yellow text-ink hover:bg-yellow/90 active:bg-yellow-dark",
      },
      size: {
        default: "h-10 px-5 py-2",
        xs: "h-7 gap-1 rounded-md px-2.5 text-xs",
        sm: "h-8 gap-1.5 rounded-md px-3.5 text-xs",
        md: "h-10 px-5",
        lg: "h-11 px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonProps = React.ComponentProps<"button"> &
  ButtonVariantProps & {
    asChild?: boolean;
    href?: string;
    target?: string;
    rel?: string;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  href,
  target,
  rel,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
