import { Flag } from "lucide-react";
import { useTranslations } from "next-intl";

const MAX_LIMIT_PER_MEDIA = 4;

export const FlagsLimitNotice = () => {
  const t = useTranslations("movie.flags");

  return (
    <div className="sticky bottom-1.5 left-0 right-0 bg-linear-to-t from-popover via-popover to-transparent animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <div className="mx-1 mb-1.5 flex items-center gap-2.5 rounded-lg border border-accent/20 bg-accent/6 px-3 py-2 shadow-[inset_0_0_12px_rgba(155,86,240,0.06)]">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-accent/15">
          <Flag className="size-3.5 text-accent" />
        </span>

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-accent leading-tight">
            {t("limit", { current: MAX_LIMIT_PER_MEDIA, max: MAX_LIMIT_PER_MEDIA })}
          </span>

          <span className="text-[11px] text-zinc-muted leading-tight mt-0.5">{t("limitHint")}</span>
        </div>

        <div className="ml-auto flex gap-1 shrink-0">
          {Array.from({ length: MAX_LIMIT_PER_MEDIA }).map((_, i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-accent shadow-[0_0_4px_rgba(155,86,240,0.8)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
