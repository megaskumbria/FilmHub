import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva("cursor-pointer flex items-center", {
  variants: {
    variant: {
      transparent: "bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0",
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
    hover: {
      none: "hover:bg-transparent",
    },
  },
  defaultVariants: {
    variant: "transparent",
    size: "default",
    hover: "none",
  },
});

function Button({
  className,
  variant = "transparent",
  size = "none",
  hover = "none",
  asChild = false,
  ...props
}: React.ComponentProps<"button">
  & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  // console.log(buttonVariants());

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, hover }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
