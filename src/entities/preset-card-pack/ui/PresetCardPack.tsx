import { Button } from "@/shared/ui";
import {
  PresetPack,
  getPackAccentColor,
  getPackAccentRgb,
} from "@/widgets/popular-flags-carousel";
import { Users } from "lucide-react";
import { FlagBadge } from "@/entities";
import { PresetPackModal } from "@/widgets";
import { formatUsageCount } from "@/shared/lib";
import { MouseEvent } from "react";

interface Props {
  pack: PresetPack;
}

export const PresetCardPack = ({ pack }: Props) => {
  const { title, description, flags, usageCount } = pack;

  const accentColor = getPackAccentColor(pack);
  const accentRgb = getPackAccentRgb(pack);

  const handleHoverCard = (e: MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.style.borderColor = `rgba(${accentRgb}, 0.45)`;
    el.style.backgroundColor = `rgba(${accentRgb}, 0.05)`;
    el.style.boxShadow = `0 8px 32px -4px rgba(${accentRgb}, 0.2), 0 0 0 1px rgba(${accentRgb}, 0.08)`;
  };

  const handleLeaveCard = (e: MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.style.borderColor = "";
    el.style.backgroundColor = "";
    el.style.boxShadow = "";
  };

  return (
    <PresetPackModal pack={pack}>
      <Button
        className="hover:shadow-lg hover:border-opacity-60 transition-all duration-200 group relative flex flex-col justify-between gap-3 w-56 h-full p-4 rounded-2xl border border-border/40 bg-surface-subtle"
        onMouseEnter={handleHoverCard}
        onMouseLeave={handleLeaveCard}
      >
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <header className="relative flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground leading-tight truncate">{title}</h3>

            <p className="text-xs text-zinc-muted mt-0.5 line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

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
        </header>

        <div className="relative flex flex-wrap gap-1.5">
          {flags.slice(0, 3).map((flag) => (
            <FlagBadge key={flag.id} flagItem={flag} />
          ))}

          {flags.length > 3 && (
            <span className="inline-flex items-center text-xs text-zinc-muted px-1.5 py-0.5 rounded-md border border-border/30 bg-white/3">
              +{flags.length - 3}
            </span>
          )}
        </div>

        <footer className="relative flex w-full items-center justify-between pt-2 border-t border-border/30">
          <span className="flex items-center gap-1 text-xs text-zinc-muted">
            <Users className="size-3" />
            <span>{formatUsageCount(usageCount)} users</span>
          </span>

          <span className="text-xs font-medium transition-colors" style={{ color: accentColor }}>
            Details →
          </span>
        </footer>
      </Button>
    </PresetPackModal>
  );
};
