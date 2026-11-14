import { DialogHeader, DialogTitle, DialogClose } from "@/shared/ui";
import { formatUsageCount } from "@/shared/lib";
import { Crown, Users, X } from "lucide-react";
import { getPackAccentColor, getPackAccentRgb } from "@/widgets/popular-flags-carousel";
import { type PresetPack } from "@/shared/hooks";
import { useTranslations } from "next-intl";

interface Props {
  presetPack: PresetPack;
}

export const PresetPackModalHeader = ({ presetPack }: Props) => {
  const t = useTranslations("flags.packs");
  const { usageCount, title, description } = presetPack;

  const accentColor = getPackAccentColor(presetPack);
  const accentRgb = getPackAccentRgb(presetPack);

  return (
    <DialogHeader
      className="relative overflow-hidden px-4 pt-4 pb-3 text-left md:px-6 md:pt-6 md:pb-5"
      style={{
        background: `linear-gradient(135deg, rgba(${accentRgb}, 0.12) 0%, rgba(${accentRgb}, 0.04) 60%, transparent 100%)`,
        borderBottom: `1px solid rgba(${accentRgb}, 0.15)`,
      }}
    >
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative flex items-start justify-between gap-3 md:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border"
              style={{
                color: accentColor,
                borderColor: `rgba(${accentRgb}, 0.35)`,
                backgroundColor: `rgba(${accentRgb}, 0.1)`,
              }}
            >
              <Crown className="size-3" />
              <span>{t("proPack")}</span>
            </span>

            <span className="flex items-center gap-1 text-xs text-zinc-muted">
              <Users className="size-3" />
              <span>{t("users", { count: formatUsageCount(usageCount) })}</span>
            </span>
          </div>

          <DialogTitle className="text-lg font-bold leading-tight tracking-tight text-foreground md:text-xl">
            {title}
          </DialogTitle>

          <p className="mt-1 text-xs leading-relaxed text-zinc-muted md:text-sm">{description}</p>
        </div>

        <DialogClose
          className="mt-0.5 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border/40 bg-white/4 text-zinc-muted transition-colors hover:bg-white/8 hover:text-foreground md:size-7"
          aria-label={t("close")}
        >
          <X className="size-4 md:size-5" />
        </DialogClose>
      </div>
    </DialogHeader>
  );
};
