"use client";

import { useGetFlagsScale } from "../lib/useGetFlagsScale";
import { cn } from "@/shared/lib/utils";
import { FlagBadge } from "@/entities";

interface Props {
  categoryId: string;
  categoryName: string;
  currentFlagId: string;
}

export const FlagScaleContent = ({ categoryId, categoryName, currentFlagId }: Props) => {
  const { data: scale } = useGetFlagsScale(categoryId);

  if (!scale) return null;

  return (
    <>
      <header>
        <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
          {categoryName}
        </h4>
      </header>

      <p className="text-sm text-zinc-muted">Weakest</p>

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

      <p className="text-sm text-zinc-muted">Strongest</p>
    </>
  );
};
