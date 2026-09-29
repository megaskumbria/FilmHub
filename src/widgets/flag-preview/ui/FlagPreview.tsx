"use client";

import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { FlagBadge } from "@/entities";
import { flagSoftBackground } from "@/shared/lib";
import { FolderOpen } from "lucide-react";
import { DotGrid, InlineSvg } from "@/shared/ui";
import { useShallow } from "zustand/shallow";
import { memo } from "react";

export const FlagPreview = memo(() => {
  const { flag } = useCreationFlagStore(
    useShallow((state) => ({
      flag: state.flag,
    })),
  );

  const { flagName, selectedColor, bgOpacity, selectedFont, selectedIcon, category } = flag;

  const selectedColorBg = flagSoftBackground(selectedColor, bgOpacity);

  const { svgContent } = selectedIcon ?? {};

  return (
    <section className="rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-3 flex-1">
      <div className="flex items-center gap-2">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />

        <span className="text-sm font-semibold text-foreground tracking-wide">Flag preview</span>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center gap-4 rounded-lg bg-obsidian/60 border border-border/30 py-4">
        <DotGrid />

        <div className="flex items-center gap-1.5">
          <FolderOpen className="size-3.5 shrink-0" />

          <span className="text-sm font-medium text-zinc-muted">Category:</span>

          <span className="text-foreground font-medium">{category.name || "Not selected"}</span>
        </div>

        <div
          className="inline-flex items-center gap-1.5 p-2 rounded-lg border max-h-11.5"
          style={{
            color: selectedColor,
            backgroundColor: selectedColorBg,
            borderColor: selectedColor,
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
            fontFamily: selectedFont,
          }}
        >
          {svgContent && <InlineSvg svg={svgContent} className="size-8 shrink-0" />}

          <span
            className="text-lg font-bold"
            style={{ color: selectedColor, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
          >
            {flagName || "New flag"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-muted">Badge style:</span>

          <FlagBadge
            flagItem={{
              flagName,
              color: selectedColor,
              bgOpacity,
              fontFamily: selectedFont,
            }}
          />
        </div>
      </div>
    </section>
  );
});
