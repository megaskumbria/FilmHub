"use client";

import {
  Button,
  FilmPerforation,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { Pipette } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { useThrottle } from "@/shared/hooks";
import { OpacitySlider } from "@/features/opacity-slider";
import { useShallow } from "zustand/shallow";
import { useTranslations } from "next-intl";
import { buildReels, parseColor, readableInk, toHex } from "../lib/color";

const SELECTED_GROW = 6;

export const FlagColorPicker = memo(() => {
  const t = useTranslations("flags.color");
  const { flag, presetColors, updateStateFlag } = useCreationFlagStore(
    useShallow((state) => ({
      flag: state.flag,
      presetColors: state.presetColors,
      updateStateFlag: state.updateStateFlag,
    })),
  );

  const { selectedColor } = flag;

  const [tempColor, setTempColor] = useState(selectedColor);
  const [previewColor, setPreviewColor] = useState<string | null>(null);

  const throttledColor = useThrottle(tempColor, 50);

  useEffect(() => updateStateFlag({ selectedColor: throttledColor }), [throttledColor]);

  const reels = useMemo(() => buildReels(presetColors), [presetColors]);

  const colorAtPointer = (reel: string[], event: React.PointerEvent<HTMLDivElement>) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const weights = reel.map((color) => (color === selectedColor ? SELECTED_GROW : 1));
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    const position = Math.min(Math.max((event.clientX - left) / width, 0), 0.9999) * total;

    let passed = 0;
    const index = weights.findIndex((weight) => (passed += weight) > position);

    return reel[Math.max(index, 0)];
  };

  const frameColor = previewColor ?? selectedColor;
  const frameInk = readableInk(frameColor);
  const { r, g, b } = parseColor(frameColor);

  return (
    <div className="relative max-w-120 h-full overflow-hidden rounded-xl border border-border/60 bg-surface-subtle p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -top-20 h-48 rounded-full opacity-25 blur-3xl transition-colors duration-300"
        style={{ backgroundColor: frameColor }}
      />

      <div className="relative flex h-full flex-col">
        <header className="mb-4 flex items-center gap-2">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
          <Label className="text-sm font-semibold text-foreground">{t("background")}</Label>
        </header>

        <Popover onOpenChange={(open) => open && setTempColor(selectedColor)}>
          <PopoverTrigger asChild>
            <Button
              aria-label={t("pick")}
              className="group block w-full rounded-lg border border-border/40 bg-obsidian py-1.5 text-left transition-colors hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FilmPerforation />

              <span
                className="relative mx-2 my-1.5 flex h-28 flex-col justify-between rounded-[5px] p-3 transition-colors duration-150"
                style={{ backgroundColor: frameColor, color: frameInk }}
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[11px] tabular-nums tracking-wider opacity-70">
                    R{Math.round(r)} · G{Math.round(g)} · B{Math.round(b)}
                  </span>

                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-current/10 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12 motion-reduce:transition-none">
                    <Pipette className="size-3.5" />
                  </span>
                </span>

                <span className="font-unbounded text-2xl font-semibold leading-none tracking-tight">
                  {toHex(frameColor)}
                </span>
              </span>

              <FilmPerforation />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={8}
            avoidCollisions={false}
            className="w-auto p-3 rounded-xl border border-border/60 bg-surface shadow-popover"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-0.5 h-3.5 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
                <span className="text-sm font-semibold text-foreground">{t("pick")}</span>
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
                <span className="text-xs text-zinc-muted shrink-0">{t("selected")}</span>
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

        <section
          className="my-4 flex min-h-44 flex-1 flex-col gap-1.5"
          onBlur={() => setPreviewColor(null)}
        >
          {reels.map((reel, index) => (
            <div
              key={index}
              className="flex min-h-14 flex-1 touch-pan-y select-none overflow-hidden rounded-md border border-white/8"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                setPreviewColor(colorAtPointer(reel, event));
              }}
              onPointerMove={(event) => setPreviewColor(colorAtPointer(reel, event))}
              onPointerUp={(event) => {
                updateStateFlag({ selectedColor: colorAtPointer(reel, event) });
                // A finger leaves the screen, a mouse keeps hovering.
                if (event.pointerType !== "mouse") setPreviewColor(null);
              }}
              onPointerLeave={() => setPreviewColor(null)}
              onPointerCancel={() => setPreviewColor(null)}
            >
              {reel.map((color) => {
                const isSelected = selectedColor === color;
                const ink = readableInk(color);

                return (
                  <Button
                    key={color}
                    // Pointers are handled by the reel; this covers keyboard activation only.
                    onClick={(event) =>
                      event.detail === 0 && updateStateFlag({ selectedColor: color })
                    }
                    onFocus={(event) =>
                      event.currentTarget.matches(":focus-visible") && setPreviewColor(color)
                    }
                    title={toHex(color)}
                    aria-label={toHex(color)}
                    aria-pressed={isSelected}
                    className={cn(
                      "h-full min-w-0 basis-0 grow outline-none transition-[flex-grow] duration-200 ease-out motion-reduce:transition-none",
                      previewColor === color && "grow-5",
                      isSelected && "grow-6",
                    )}
                    style={{
                      backgroundColor: color,
                      boxShadow: isSelected ? `inset 0 0 0 2px ${ink}` : undefined,
                    }}
                  >
                    {isSelected && (
                      <span className="size-1.5 rounded-full" style={{ backgroundColor: ink }} />
                    )}
                  </Button>
                );
              })}
            </div>
          ))}
        </section>

        <OpacitySlider />
      </div>
    </div>
  );
});
