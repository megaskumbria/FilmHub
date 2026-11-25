import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "cursor-pointer flex items-center justify-center disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        transparent: "bg-transparent focus:ring-0 focus:ring-offset-0",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-linear-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg shadow-accent/20 transition-all",
        rounded:
          "border backdrop-blur-sm flex items-center justify-center border-border/60 rounded-full bg-background/80 hover:bg-accent shadow-md transition-colors",
        subtle:
          "border border-border bg-background/60 text-zinc-muted hover:border-zinc-muted hover:text-foreground transition-colors",
        glass:
          "border border-white/15 bg-black/45 text-white backdrop-blur-md hover:bg-black/65 transition-colors",
        soft: "rounded-lg border border-white/10 bg-white/5 text-white/60 outline-none transition-colors hover:border-white/20 hover:bg-white/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
        social:
          "h-10 w-full gap-2.5 rounded-lg border border-border/80 bg-transparent font-medium text-foreground/80 transition-all hover:bg-white/5 hover:border-border hover:text-foreground active:scale-[0.98]",
        picker:
          "rounded-lg border border-transparent text-zinc-muted hover:bg-white/5 hover:text-foreground transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-pressed:text-white",
        swatch:
          "relative rounded-full transition-transform duration-150 hover:scale-110 aria-pressed:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80 motion-reduce:transition-none",
        frame:
          "relative block w-full overflow-hidden rounded-sm opacity-70 transition-[opacity,box-shadow] duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none",
        tile: "relative w-full justify-start text-left overflow-hidden rounded-xl border border-white/6 bg-white/2 hover:border-white/15 hover:bg-white/4 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-45",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "transparent",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "transparent",
  size = "none",
  asChild = false,
  ...props
}: React.ComponentProps<"button">
  & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
