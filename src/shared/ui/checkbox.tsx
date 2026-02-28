"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-zinc-muted/40 bg-surface outline-none overflow-hidden",
        "data-[state=checked]:bg-success data-[state=checked]:border-success",
        "focus-visible:ring-2 focus-visible:ring-success/40 focus-visible:border-success",
        "disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center w-full h-full text-white"
      >
        <CheckIcon className="size-full" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
