"use client";

import { Button, Label, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { Pipette } from "lucide-react";
import { memo, useEffect, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { useThrottle } from "@/shared/hooks";
import { OpacitySlider } from "@/features/opacity-slider";
import { useShallow } from "zustand/shallow";

export const FlagColorPicker = memo(() => {
  const { flag, presetColors, updateStateFlag } = useCreationFlagStore(
    useShallow((state) => ({
      flag: state.flag,
      presetColors: state.presetColors,
      updateStateFlag: state.updateStateFlag,
    })),
  );

  const { selectedColor } = flag;

  const [tempColor, setTempColor] = useState(selectedColor);

  const throttledColor = useThrottle(tempColor, 50);

  useEffect(() => updateStateFlag({ selectedColor: throttledColor }), [throttledColor]);

  return (
    <div className="max-w-120 rounded-xl border border-border/60 bg-surface-subtle p-4 h-full">
      <div className="h-full flex flex-col">
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
            <Label className="text-sm font-semibold text-foreground">Background color</Label>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-8 px-2.5 rounded-lg border border-border/60 bg-surface hover:bg-surface-elevated transition-colors"
              >
                <span
                  className="size-4 rounded-md border border-white/10 shrink-0"
                  style={{ backgroundColor: selectedColor }}
                />
                <span className="text-xs text-zinc-muted font-mono truncate">{selectedColor}</span>
                <Pipette className="size-3.5 text-zinc-muted shrink-0" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="end"
              sideOffset={8}
              avoidCollisions={false}
              className="w-auto p-3 rounded-xl border border-border/60 bg-surface shadow-popover"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-0.5 h-3.5 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
                  <span className="text-sm font-semibold text-foreground">Pick a color</span>
                </div>

                <ColorPicker
                  value={tempColor}
                  onChange={setTempColor}
                  hideColorTypeBtns
                  hideGradientControls
                  hidePresets
                  hideInputType
                  disableDarkMode
                  width={260}
                  height={160}
                />

                <div className="flex items-center justify-between pt-1 border-t border-border/40 gap-2">
                  <span className="text-xs text-zinc-muted shrink-0">Selected:</span>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="size-4 rounded border border-white/10 shrink-0"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <span className="text-xs font-mono text-foreground truncate">
                      {selectedColor}
                    </span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </header>

        <section className="grid grid-cols-10 gap-1.5">
          {presetColors.map((color) => (
            <Button
              key={color}
              onClick={() => updateStateFlag({ selectedColor: color })}
              title={color}
              className={cn(
                "size-8 rounded-lg border-2 transition-all cursor-pointer hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selectedColor === color && "border-foreground ring-2 ring-foreground/20 scale-110",
                selectedColor !== color && "border-transparent hover:border-white/30",
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </section>

        <OpacitySlider />
      </div>
    </div>
  );
});
