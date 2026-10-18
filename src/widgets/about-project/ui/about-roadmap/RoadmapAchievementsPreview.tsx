import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";

type MedalState = "done" | "active" | "locked";

const MEDALS: { value: number; state: MedalState }[] = [
  { value: 10, state: "done" },
  { value: 50, state: "active" },
  { value: 100, state: "locked" },
];

const MEDAL_STYLES: Record<MedalState, string> = {
  done: "size-16 border-gold bg-gold/15 text-gold",
  active: "size-20 border-dashed border-gold/70 bg-gold/5 text-foreground text-xl",
  locked: "size-16 border-border text-zinc-muted opacity-60",
};

const CURRENT = 37;
const GOAL = 50;

export const RoadmapAchievementsPreview = async () => {
  const t = await getTranslations("about.roadmap.items.achievements.preview");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        {MEDALS.map(({ value, state }) => (
          <span
            key={value}
            className={cn(
              "flex items-center justify-center rounded-full border font-unbounded text-lg font-semibold",
              MEDAL_STYLES[state],
            )}
          >
            {value}
          </span>
        ))}
      </div>

      <div className="flex w-56 flex-col gap-2">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-foreground">{t("name")}</span>
          <span className="text-zinc-muted">
            {CURRENT} / {GOAL}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-edge">
          <div
            className="h-full rounded-full bg-gold"
            style={{ width: `${(CURRENT / GOAL) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
