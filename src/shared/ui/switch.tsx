"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/shared/lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "group/switch peer inline-flex shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all px-0.5",
        "bg-zinc-muted/20 border-zinc-muted/40",
        "data-[state=checked]:bg-accent data-[state=checked]:border-accent",
        "focus-visible:ring-2 focus-visible:ring-accent/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[size=default]:h-[1.15rem] data-[size=default]:w-8",
        "data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full transition-transform",
          "bg-zinc-muted data-[state=checked]:bg-white",
          "data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0",
          "group-data-[size=default]/switch:size-3.5",
          "group-data-[size=sm]/switch:size-2.5",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
