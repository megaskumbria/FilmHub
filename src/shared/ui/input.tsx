import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "border-input focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        error:
          "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 focus-visible:ring-[3px]",
        success:
          "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-500/40 focus-visible:ring-[3px]",
        ghost:
          "border-transparent shadow-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        accent:
          "bg-secondary/50 border-border/60 text-foreground placeholder:text-muted focus-visible:border-accent/60 focus-visible:ring-accent/20 transition-all",
        neutral:
          "rounded-lg bg-graphite border-border/40 placeholder:text-zinc-muted focus-visible:border-accent/50 focus-visible:ring-0 focus-visible:ring-accent/20 focus-visible:outline-none transition-all",
      },
      inputSize: {
        sm: "h-8 px-2.5 py-1 text-sm",
        default: "h-9 px-3 py-1",
        lg: "h-11 px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

function Input({
  className,
  variant = "default",
  inputSize = "default",
  type,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      data-size={inputSize}
      className={cn(inputVariants({ variant, inputSize, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
