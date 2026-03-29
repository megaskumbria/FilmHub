import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { FlagBadge } from "@/entities/flag-badge/ui/FlagBadge";
import { getIconByName, flagSoftBackground } from "@/shared/lib";
import { FolderOpen } from "lucide-react";
import { DotGrid } from "@/shared/ui";
import { useShallow } from "zustand/shallow";
import { memo } from "react";

export const FlagPreview = memo(() => {
  const { flagName, selectedColor, selectedFont, selectedIcon, category } = useCreationFlagStore(
    useShallow((state) => ({
      flagName: state.flagName,
      selectedColor: state.selectedColor,
      selectedFont: state.selectedFont,
      selectedIcon: state.selectedIcon,
      category: state.category,
    })),
  );

  const SelectedIconComponent = getIconByName(selectedIcon);
  const selectedColorBg = flagSoftBackground(selectedColor);

  return (
    <section className="rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />

        <span className="text-sm font-semibold text-foreground tracking-wide">
          Предпросмотр флага
        </span>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center gap-5 rounded-lg bg-obsidian/60 border border-border/30 py-8">
        <DotGrid />

        <div className="flex items-center gap-1.5">
          <FolderOpen className="size-3.5 shrink-0" />

          <span className="text-sm font-medium text-zinc-muted">Категория:</span>

          <span className="text-foreground font-medium">{category || "Не выбрана"}</span>
        </div>

        <div
          className="inline-flex items-center gap-1.5 p-2 rounded-lg border"
          style={{
            backgroundColor: selectedColorBg,
            borderColor: selectedColor,
            fontFamily: selectedFont || "Manrope",
          }}
        >
          <SelectedIconComponent className="size-8 shrink-0" style={{ color: selectedColor }} />

          <span
            className="text-lg font-bold"
            style={{ color: selectedColor, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
          >
            {flagName || "Новый флаг"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-muted">Вид бейджа:</span>

          <FlagBadge
            flagItem={{
              id: 0,
              flagName: flagName || "Новый флаг",
              color: selectedColor,
              bg: selectedColorBg,
              isUsed: false,
              fontFamily: selectedFont || "Manrope",
              icon: selectedIcon,
            }}
          />
        </div>
      </div>
    </section>
  );
});
