"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      gap={8}
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-400" />,
        info: <InfoIcon className="size-4 text-violet-400" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-400" />,
        error: <OctagonXIcon className="size-4 text-red-400" />,
        loading: <Loader2Icon className="size-4 animate-spin text-zinc-400" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-white/[0.06] bg-[#1a1f2e]/95 backdrop-blur-md shadow-2xl shadow-black/50 text-foreground",
          title: "text-sm font-semibold tracking-tight",
          description: "text-xs text-zinc-400 leading-relaxed",
          closeButton:
            "border-white/10 bg-white/5 text-zinc-400 hover:text-foreground hover:bg-white/10",
          actionButton: "bg-accent text-white text-xs font-medium hover:bg-accent/90",
          cancelButton: "bg-white/5 text-zinc-400 text-xs hover:bg-white/10 hover:text-foreground",
          success: "!border-l-2 !border-l-emerald-500/70",
          error: "!border-l-2 !border-l-red-500/70",
          warning: "!border-l-2 !border-l-amber-500/70",
          info: "!border-l-2 !border-l-violet-500/70",
        },
      }}
      style={
        {
          "--normal-bg": "#1a1f2e",
          "--normal-text": "var(--foreground)",
          "--normal-border": "rgba(255,255,255,0.06)",
          "--success-bg": "#1a1f2e",
          "--success-text": "var(--foreground)",
          "--success-border": "rgba(255,255,255,0.06)",
          "--error-bg": "#1a1f2e",
          "--error-text": "var(--foreground)",
          "--error-border": "rgba(255,255,255,0.06)",
          "--warning-bg": "#1a1f2e",
          "--warning-text": "var(--foreground)",
          "--warning-border": "rgba(255,255,255,0.06)",
          "--info-bg": "#1a1f2e",
          "--info-text": "var(--foreground)",
          "--info-border": "rgba(255,255,255,0.06)",
          "--border-radius": "0.75rem",
          "--width": "380px",
          "--font": "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
