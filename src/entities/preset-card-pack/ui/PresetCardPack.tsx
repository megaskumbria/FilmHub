import { Button } from "@/shared/ui";
import { getPackAccentColor, getPackAccentRgb } from "@/widgets/popular-flags-carousel";
import { ArrowRight, Check, Users } from "lucide-react";
import { FlagBadge } from "@/entities";
import { PresetPackModal } from "@/widgets";
import { formatUsageCount } from "@/shared/lib";
import { type PresetPack } from "@/shared/hooks";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

interface Props {
  presetPack: PresetPack;
}

export const PresetCardPack = ({ presetPack }: Props) => {
  const t = useTranslations("flags.packs");
  const { title, description, flags, usageCount, isAdded } = presetPack;

  const accentColor = getPackAccentColor(presetPack);
  const accentRgb = getPackAccentRgb(presetPack);

  return (
    <PresetPackModal presetPack={presetPack}>
      <Button
        className="focus:outline-none select-none w-full h-58 transition-all duration-200 group relative flex flex-col justify-between p-4 rounded-2xl border border-border/40 bg-surface-subtle hover:border-[rgba(var(--accent-rgb),0.45)] hover:bg-[rgba(var(--accent-rgb),0.05)] hover:shadow-[0_8px_32px_-4px_rgba(var(--accent-rgb),0.2),0_0_0_1px_rgba(var(--accent-rgb),0.08)]"
        style={{ "--accent-rgb": accentRgb } as CSSProperties}
      >
        <header className="relative justify-between w-full flex gap-2 mb-2">
          <span
            className="shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded-lg border"
            style={{
              color: accentColor,
              borderColor: `rgba(${accentRgb}, 0.3)`,
              backgroundColor: `rgba(${accentRgb}, 0.1)`,
            }}
          >
            {flags.length}
          </span>

          {isAdded && (
            <span className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-lg bg-emerald-500/12 text-emerald-400 border border-emerald-500/25 shrink-0">
              <Check className="size-3" />
              <span>{t("added")}</span>
            </span>
          )}
        </header>

        <div className="flex-1 min-w-0 mb-3">
          <h3 className="text-sm font-bold text-foreground leading-tight truncate">{title}</h3>

          <p className="text-xs text-zinc-muted mt-0.5 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <div className="relative flex flex-wrap gap-1.5 mb-3">
          {flags.slice(0, 2).map((flag) => (
            <FlagBadge key={flag.id} flagItem={flag} />
          ))}

          {flags.length > 2 && (
            <span className="inline-flex h-7.5 items-center text-xs text-zinc-muted px-1.5 rounded-md border border-border/30 bg-white/3">
              +{flags.length - 2}
            </span>
          )}
        </div>

        <footer className="min-h-6.5 shrink-0 relative flex w-full items-center justify-between pt-2 border-t border-border/30">
          <span className="flex items-center gap-1 text-xs text-zinc-muted">
            <Users className="size-3" />
            <span>{t("users", { count: formatUsageCount(usageCount) })}</span>
          </span>

          <div className="flex items-center gap-1">
            <span className="text-xs font-medium transition-colors" style={{ color: accentColor }}>
              {t("details")}
            </span>

            <ArrowRight className="size-3" style={{ color: accentColor }} />
          </div>
        </footer>
      </Button>
    </PresetPackModal>
  );
};
