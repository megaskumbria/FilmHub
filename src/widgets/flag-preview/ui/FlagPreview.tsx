import { FlagBadge } from "@/widgets/movie-card/ui/FlagBadge";
import { LucideIcon } from "lucide-react";

interface Props {
  selectedColor: string;
  selectedFont: string;
  flagName: string;
  SelectedIconComponent: LucideIcon;
}

export const FlagPreview = ({
  selectedColor,
  selectedFont,
  flagName,
  SelectedIconComponent,
}: Props) => {
  const selectedColorBg = selectedColor + "61";

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
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg border"
          style={{
            backgroundColor: selectedColorBg,
            borderColor: selectedColor,
            fontFamily: selectedFont,
          }}
        >
          <SelectedIconComponent className="size-5 shrink-0" style={{ color: selectedColor }} />
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
              flagName: flagName || "Название",
              color: selectedColor,
              bg: selectedColorBg,
              isUsed: false,
            }}
          />
        </div>
      </div>
    </section>
  );
};
