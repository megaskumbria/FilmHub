import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { IconSparkles } from "@tabler/icons-react";
import { cn } from "@/shared/lib/utils";

const PICKS = [
  { poster: "/images/dune-poster.webp", match: 94, className: "mt-3" },
  { poster: "/images/avengers-poster.webp", match: 91, className: "" },
  { poster: "/images/breaking-bad-poster.jpg", match: 87, className: "mt-3" },
];

export const RoadmapAiPicksPreview = async () => {
  const t = await getTranslations("about.roadmap.items.aiPicks.preview");

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="flex items-center gap-2 text-sm font-medium text-zinc-light">
        <IconSparkles className="size-4 text-accent" stroke={1.75} />
        <span>{t("caption")}</span>
      </p>

      <ul className="flex items-start gap-3">
        {PICKS.map(({ poster, match, className }) => (
          <li
            key={poster}
            className={cn(
              "relative aspect-2/3 w-24 overflow-hidden lg:w-20 rounded-xl border border-white/10 shadow-xl shadow-black/50",
              className,
            )}
          >
            <Image src={poster} alt="" fill sizes="96px" className="object-cover select-none" />
            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-accent px-2 py-0.5 text-sm font-semibold text-accent-foreground">
              {match}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
