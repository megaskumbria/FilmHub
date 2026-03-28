import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { FlagBadge } from "@/entities/flag-badge/ui/FlagBadge";
import { getIconByName, hexToFlagBg } from "@/shared/lib";

export const FlagPreview = () => {
  const { flagName, selectedColor, selectedFont, selectedIcon } = useCreationFlagStore();

  const SelectedIconComponent = getIconByName(selectedIcon);
  const selectedColorBg = hexToFlagBg(selectedColor);

  return (
    <section className="rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />

        <span className="text-sm font-semibold text-foreground tracking-wide">
          Предпросмотр флага
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-5 rounded-lg bg-obsidian/60 border border-border/30 py-8">
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
            {flagName || "Название флага"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-muted">Вид бейджа:</span>

          <FlagBadge
            flagItem={{
              id: 0,
              flagName: flagName || "Название флага",
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
};
