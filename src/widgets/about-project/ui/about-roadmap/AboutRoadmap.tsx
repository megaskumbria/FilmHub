import { getTranslations } from "next-intl/server";
import { IconHourglassLow } from "@tabler/icons-react";
import { cn } from "@/shared/lib/utils";
import { ROADMAP_ITEMS, type RoadmapItemKey } from "../../model/about-config";
import { RoadmapAchievementsPreview } from "./RoadmapAchievementsPreview";
import { RoadmapStatisticsPreview } from "./RoadmapStatisticsPreview";
import { RoadmapCommentsPreview } from "./RoadmapCommentsPreview";
import { RoadmapAiPicksPreview } from "./RoadmapAiPicksPreview";

const PREVIEWS: Record<RoadmapItemKey, () => Promise<React.JSX.Element>> = {
  achievements: RoadmapAchievementsPreview,
  statistics: RoadmapStatisticsPreview,
  comments: RoadmapCommentsPreview,
  aiPicks: RoadmapAiPicksPreview,
};

interface CardLayout {
  cardClass: string;
  isHorizontal: boolean;
  isFeatured?: boolean;
}

const CARD_LAYOUT: Record<RoadmapItemKey, CardLayout> = {
  statistics: { cardClass: "lg:col-span-8 lg:flex-row", isHorizontal: true },
  achievements: { cardClass: "lg:col-span-4", isHorizontal: false },
  comments: { cardClass: "lg:col-span-5", isHorizontal: false },
  aiPicks: {
    cardClass: "lg:col-span-7 lg:flex-row-reverse",
    isHorizontal: true,
    isFeatured: true,
  },
};

const FEATURED_GLOW =
  "radial-gradient(70% 90% at 25% 40%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 75%)";

export const AboutRoadmap = async () => {
  const t = await getTranslations("about.roadmap");

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-5 sm:px-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2
          id="about-roadmap"
          className="font-unbounded text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          {t("title")}
        </h2>
      </header>

      <ol className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {ROADMAP_ITEMS.map((key) => {
          const Preview = PREVIEWS[key];
          const { cardClass, isHorizontal, isFeatured } = CARD_LAYOUT[key];

          return (
            <li
              key={key}
              className={cn(
                "flex min-w-0 flex-col gap-5 rounded-3xl border bg-card p-4 sm:p-5",
                isFeatured ? "border-accent/30" : "border-border",
                cardClass,
              )}
              style={isFeatured ? { backgroundImage: FEATURED_GLOW } : undefined}
            >
              <div
                aria-hidden
                className="flex min-h-56 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-border bg-obsidian p-5"
              >
                <Preview />
              </div>

              <div
                className={cn(
                  "flex flex-col gap-3 px-1 pb-1",
                  isHorizontal && "lg:w-2/5 lg:shrink-0 lg:justify-center lg:px-3",
                )}
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-dashed border-gold/50 px-3 py-1 text-sm font-medium text-gold">
                  <IconHourglassLow className="size-4" stroke={1.75} />
                  {t("status")}
                </span>

                <div className="flex flex-col gap-2">
                  <h3 className="font-unbounded text-base font-semibold leading-snug text-foreground sm:text-lg">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-muted sm:text-base">
                    {t(`items.${key}.text`)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
