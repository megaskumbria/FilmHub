"use client";

import { useTranslations } from "next-intl";
import { Button, Label, Slider } from "@/shared/ui";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { useShallow } from "zustand/shallow";
import { RotateCcw } from "lucide-react";
import { FLAG_BACKGROUND_ALPHA } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";

export const OpacitySlider = () => {
  const t = useTranslations("flags");
  const { flag, updateStateFlag } = useCreationFlagStore(
    useShallow((state) => ({
      flag: state.flag,
      updateStateFlag: state.updateStateFlag,
    })),
  );

  const { selectedColor, bgOpacity } = flag;

  const isModified = Math.round(bgOpacity * 100) !== Math.round(FLAG_BACKGROUND_ALPHA * 100);

  return (
    <footer className="mt-auto pt-4 border-t border-border/40 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-0.5 h-3.5 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
          <Label className="text-sm font-semibold text-foreground">{t("opacity")}</Label>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            size="icon"
            onClick={() => updateStateFlag({ bgOpacity: FLAG_BACKGROUND_ALPHA })}
            className={cn(
              "size-6 rounded-md text-zinc-muted transition-all justify-center",
              isModified ?
                "opacity-100 hover:text-foreground hover:bg-white/6"
              : "opacity-0 pointer-events-none",
            )}
          >
            <RotateCcw className="size-4" strokeWidth={1.5} />
          </Button>

          <span
            className="size-4 rounded shrink-0"
            style={{
              background: `linear-gradient(to right, transparent, ${selectedColor})`,
            }}
          />
          <span className="text-xs font-mono text-zinc-muted tabular-nums w-8 text-right">
            {Math.round(bgOpacity * 100)}%
          </span>
        </div>
      </div>

      <div className="relative w-full">
        <div
          className="absolute inset-0 my-auto h-1.5 rounded-full border border-white/10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${selectedColor})`,
          }}
        />

        <Slider
          min={0}
          max={100}
          step={1}
          value={[Math.round(bgOpacity * 100)]}
          onValueChange={([val]) => updateStateFlag({ bgOpacity: val / 100 })}
          className="**:data-[slot=slider-track]:bg-transparent **:data-[slot=slider-range]:bg-transparent **:data-[slot=slider-thumb]:border-2 **:data-[slot=slider-thumb]:border-(--flag-color)"
          style={{ "--flag-color": selectedColor } as React.CSSProperties}
        />
      </div>
    </footer>
  );
};
