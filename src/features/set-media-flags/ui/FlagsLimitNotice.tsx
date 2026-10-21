import { IconFlag3 } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { MAX_LIMIT_PER_MEDIA } from "../model/constants";

export const FlagsLimitNotice = () => {
  const t = useTranslations("movie.flags");

  return (
    <div className="sticky bottom-0 left-0 right-0 pt-4 pb-2 bg-linear-to-t from-surface via-surface to-transparent animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3 rounded-xl border border-accent/25 bg-accent/8 px-3 py-2.5 shadow-[inset_0_0_16px_rgba(155,86,240,0.08)]">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <IconFlag3 className="size-4.5" />
        </span>

        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-accent leading-tight">
            {t("limit", { current: MAX_LIMIT_PER_MEDIA, max: MAX_LIMIT_PER_MEDIA })}
          </span>

          <span className="text-sm text-zinc-muted leading-tight mt-0.5">{t("limitHint")}</span>
        </div>
      </div>
    </div>
  );
};
