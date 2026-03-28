import { Button, Label } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";

export const FlagColorPicker = () => {
  const { selectedColor, setSelectedColor, presetColors } = useCreationFlagStore();

  return (
    <section className="rounded-xl border border-border/60 bg-surface-subtle p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
          <Label className="text-sm font-semibold text-foreground">Цвет фона</Label>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="size-5 rounded-md border border-border/60"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="text-xs text-zinc-muted font-mono">{selectedColor}</span>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-2">
        {presetColors.map((color) => (
          <Button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={cn(
              "size-9 rounded-lg border-2 transition-all cursor-pointer hover:scale-110",
              selectedColor === color && "border-foreground ring-2 ring-foreground/20 scale-110",
              selectedColor !== color && "border-transparent",
            )}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </section>
  );
};
