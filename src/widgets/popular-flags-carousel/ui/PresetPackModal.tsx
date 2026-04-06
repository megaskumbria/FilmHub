"use client";

import { Dialog, DialogClose, DialogContent, DialogTrigger, Button } from "@/shared/ui";
import { FlagBadge } from "@/entities/flag-badge/ui/FlagBadge";
import { IPresetPack } from "../model/preset-packs-data";
import { Crown, FolderPlus, Users } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

interface PresetPackModalProps {
  pack: IPresetPack;
  children: ReactNode;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}K`;
  return String(n);
}

export const PresetPackModal = ({ pack, children }: PresetPackModalProps) => {
  const accentRgb = pack.accentColor.replace("rgba(", "").split(",").slice(0, 3).join(", ");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="w-full max-w-lg sm:max-w-lg p-0 gap-0 overflow-hidden bg-surface border-border/60"
        showCloseButton={false}
        aria-describedby={undefined}
      >
        <div className="flex flex-col">
          {/* Hero header */}
          <div
            className="relative px-6 pt-6 pb-5 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(${accentRgb}, 0.12) 0%, rgba(${accentRgb}, 0.04) 60%, transparent 100%)`,
              borderBottom: `1px solid rgba(${accentRgb}, 0.15)`,
            }}
          >
            {/* Glow blob */}
            <div
              className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: pack.accentColor }}
            />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border"
                    style={{
                      color: pack.accentColor,
                      borderColor: `rgba(${accentRgb}, 0.35)`,
                      backgroundColor: `rgba(${accentRgb}, 0.1)`,
                    }}
                  >
                    <Crown className="size-3" />
                    <span>PRO pack</span>
                  </span>

                  <span className="flex items-center gap-1 text-xs text-zinc-muted">
                    <Users className="size-3" />
                    <span>{formatCount(pack.usageCount)} users</span>
                  </span>
                </div>

                <h2 className="text-xl font-bold text-foreground tracking-tight leading-tight">
                  {pack.title}
                </h2>

                <p className="text-sm text-zinc-muted mt-1 leading-relaxed">{pack.description}</p>
              </div>

              <DialogClose
                className="shrink-0 mt-0.5 size-7 flex items-center justify-center rounded-lg border border-border/40 bg-white/4 text-zinc-muted hover:text-foreground hover:bg-white/8 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 1L11 11M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </DialogClose>
            </div>
          </div>

          {/* Flags list */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-zinc-muted uppercase tracking-widest">
                Flags in this pack
              </span>
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded-md"
                style={{
                  color: pack.accentColor,
                  backgroundColor: `rgba(${accentRgb}, 0.12)`,
                }}
              >
                {pack.flags.length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {pack.flags.map((flag, index) => (
                <div
                  key={flag.id}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border/30 bg-white/2 transition-all",
                    "hover:bg-white/4 hover:border-border/50",
                  )}
                  style={{
                    animationDelay: `${index * 60}ms`,
                  }}
                >
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: `rgba(${accentRgb}, 0.12)`,
                      color: pack.accentColor,
                    }}
                  >
                    {index + 1}
                  </span>

                  <FlagBadge flagItem={flag} />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 border-t border-border/40"
            style={{
              background: `linear-gradient(to right, rgba(${accentRgb}, 0.04), transparent)`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-0.5 h-4 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: pack.accentColor }}
              />
              <p className="text-xs text-zinc-muted leading-relaxed">
                The pack is added as a new category{" "}
                <span className="text-foreground font-medium">&ldquo;{pack.categoryName}&rdquo;</span> in your
                sidebar. You can edit the flags after adding.
              </p>
            </div>

            <Button
              variant="accent"
              size="default"
              className="w-full rounded-xl gap-2 font-semibold"
              style={
                {
                  "--tw-gradient-from": pack.accentColor,
                  "--tw-gradient-to": `rgba(${accentRgb}, 0.7)`,
                } as React.CSSProperties
              }
            >
              <FolderPlus className="size-4" />
              <span>Add pack to collection</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
