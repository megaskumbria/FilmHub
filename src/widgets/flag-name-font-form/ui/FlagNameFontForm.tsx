import { Label, Input, FontPicker } from "@/shared/ui";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { useShallow } from "zustand/shallow";
import { memo } from "react";

export const FlagNameFontForm = memo(() => {
  const { flagName, selectedFont, selectedColor, setFlagName, setSelectedFont } =
    useCreationFlagStore(
      useShallow((state) => ({
        flagName: state.flagName,
        selectedFont: state.selectedFont,
        selectedColor: state.selectedColor,
        setFlagName: state.setFlagName,
        setSelectedFont: state.setSelectedFont,
      })),
    );

  return (
    <section className="rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
        <span className="text-sm font-semibold text-foreground tracking-wide">Настройки</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-semibold text-zinc-muted uppercase tracking-wider">
          Название флага
        </Label>

        <Input
          variant="neutral"
          placeholder="Введите название..."
          className="h-9 text-sm"
          value={flagName}
          onChange={(e) => setFlagName(e.target.value, selectedColor)}
        />
        <p className="text-xs text-zinc-muted/50">До 30 символов</p>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <Label className="text-xs font-semibold text-zinc-muted uppercase tracking-wider">
          Шрифт
        </Label>

        <FontPicker value={selectedFont} onChange={(family) => setSelectedFont(family)} />

        <p className="text-xs text-zinc-muted/50">Выбран: {selectedFont}</p>
      </div>
    </section>
  );
});
