import { cn } from "@/shared/lib/utils";

export const sliderNavigationButton = (isVisible: boolean, side: "left" | "right") => {
  return cn(
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-10 rounded-full p-0 bg-surface border border-border text-muted hover:text-foreground hover:border-accent/50 hover:bg-accent shadow-md transition-all duration-200",
    isVisible ?
      `opacity-100 ${side === "left" ? "left-1" : "right-1"}`
    : `opacity-0 ${side === "left" ? "-left-2" : "-right-2"} pointer-events-none`,
  );
};
