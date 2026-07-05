import { DialogHeader, DialogTitle, DialogClose } from "@/shared/ui";
import { formatUsageCount } from "@/shared/lib";
import { Crown, Users, X } from "lucide-react";
import { getPackAccentColor, getPackAccentRgb } from "@/widgets/popular-flags-carousel";
import { type PresetPack } from "@/shared/hooks";

interface Props {
  presetPack: PresetPack;
}

export const PresetPackModalHeader = ({ presetPack }: Props) => {
  const { usageCount, title, description } = presetPack;

  const accentColor = getPackAccentColor(presetPack);
  const accentRgb = getPackAccentRgb(presetPack);

  return (
    <DialogHeader
      className="relative px-6 pt-6 pb-5 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(${accentRgb}, 0.12) 0%, rgba(${accentRgb}, 0.04) 60%, transparent 100%)`,
        borderBottom: `1px solid rgba(${accentRgb}, 0.15)`,
      }}
    >
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative flex items-start justify-between gap-4">
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
              <span>PRO pack</span>
            </span>

            <span className="flex items-center gap-1 text-xs text-zinc-muted">
              <Users className="size-3" />
              <span>{formatUsageCount(usageCount)} users</span>
            </span>
          </div>

          <DialogTitle className="text-xl font-bold text-foreground tracking-tight leading-tight">
            {title}
          </DialogTitle>

          <p className="text-sm text-zinc-muted mt-1 leading-relaxed">{description}</p>
        </div>

        <DialogClose
          className="shrink-0 mt-0.5 size-7 flex items-center justify-center rounded-lg border border-border/40 bg-white/4 text-zinc-muted hover:text-foreground hover:bg-white/8 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="size-5" />
        </DialogClose>
      </div>
    </DialogHeader>
  );
};
