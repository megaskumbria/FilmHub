import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";

const GENRES = [
  { key: "drama", percent: 42 },
  { key: "scifi", percent: 27 },
  { key: "thriller", percent: 18 },
  { key: "comedy", percent: 13 },
] as const;

export const RoadmapStatisticsPreview = async () => {
  const t = await getTranslations("about.roadmap.items.statistics.preview");

  return (
    <ul className="flex w-full max-w-sm flex-col gap-3.5">
      {GENRES.map(({ key, percent }, index) => (
        <li key={key} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-sm text-zinc-light">{t(key)}</span>
          <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-edge">
            <span
              className={cn("block h-full rounded-full bg-accent", index > 0 && "opacity-60")}
              style={{ width: `${percent * 2}%` }}
            />
          </span>
          <span className="w-10 shrink-0 text-right text-sm font-semibold text-foreground">
            {percent}%
          </span>
        </li>
      ))}
    </ul>
  );
};
