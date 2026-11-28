"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "@/shared/lib/utils";

function TooltipProvider({
  delayDuration = 150,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

const surfaceClasses =
  "relative isolate z-50 w-fit max-w-64 rounded-lg border border-border/70 bg-surface-elevated px-3 py-2 text-[13px] leading-snug text-zinc-light text-pretty shadow-[0_12px_32px_-12px_rgb(0_0_0/0.75)] origin-(--radix-tooltip-content-transform-origin)";

const lensClasses = cn(
  "before:pointer-events-none before:absolute before:from-transparent before:via-accent before:to-transparent",
  "data-[side=top]:before:inset-x-3 data-[side=top]:before:-bottom-px data-[side=top]:before:h-px data-[side=top]:before:bg-linear-to-r",
  "data-[side=bottom]:before:inset-x-3 data-[side=bottom]:before:-top-px data-[side=bottom]:before:h-px data-[side=bottom]:before:bg-linear-to-r",
  "data-[side=left]:before:inset-y-2 data-[side=left]:before:-right-px data-[side=left]:before:w-px data-[side=left]:before:bg-linear-to-b",
  "data-[side=right]:before:inset-y-2 data-[side=right]:before:-left-px data-[side=right]:before:w-px data-[side=right]:before:bg-linear-to-b",
);

const beamClasses = cn(
  "after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-[inherit]",
  "data-[side=top]:after:bg-[radial-gradient(70%_120%_at_50%_100%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_70%)]",
  "data-[side=bottom]:after:bg-[radial-gradient(70%_120%_at_50%_0%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_70%)]",
  "data-[side=left]:after:bg-[radial-gradient(90%_100%_at_100%_50%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_70%)]",
  "data-[side=right]:after:bg-[radial-gradient(90%_100%_at_0%_50%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_70%)]",
);

const motionClasses =
  "animate-in fade-in-0 zoom-in-[0.97] data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.97] motion-reduce:animate-none";

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(surfaceClasses, lensClasses, beamClasses, motionClasses, className)}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow asChild width={12} height={7}>
          <svg viewBox="0 0 12 7" className="-translate-y-px overflow-visible">
            <path d="M0 0 L6 6 L12 0 Z" className="fill-surface-elevated" />
            <path
              d="M0.5 0 L6 5.5 L11.5 0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-accent"
            />
          </svg>
        </TooltipPrimitive.Arrow>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
