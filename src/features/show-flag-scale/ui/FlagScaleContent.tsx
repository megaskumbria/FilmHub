"use client";

import { useGetFlagsScale } from "../lib/useGetFlagsScale";
import { cn } from "@/shared/lib/utils";
import { FlagBadge } from "@/entities";
import { useTranslations } from "next-intl";

interface Props {
  scaleId: string;
  scaleName: string;
  currentFlagId: string;
}

export const FlagScaleContent = ({ scaleId, scaleName, currentFlagId }: Props) => {
  const t = useTranslations("flags");
  const { data: scale } = useGetFlagsScale(scaleId);

  if (!scale) return null;

  return (
    <>
      <header>
        <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
          {scaleName}
        </h4>
      </header>

      <p className="text-sm text-zinc-muted">{t("weakest")}</p>

      <ol className="flex flex-col gap-1">
        {scale.map(({ id, ...flagItem }, index) => {
          const isCurrent = id === currentFlagId;

          return (
            <li
              key={id}
              aria-current={isCurrent ? "true" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-2 py-1.5",
                isCurrent ? "border-accent/60 bg-accent/10" : "border-transparent",
              )}
            >
              <span className="w-4 text-sm tabular-nums text-zinc-muted">{index + 1}</span>

              <FlagBadge flagItem={flagItem} />
            </li>
          );
        })}
      </ol>

      <p className="text-sm text-zinc-muted">{t("strongest")}</p>
    </>
  );
};
