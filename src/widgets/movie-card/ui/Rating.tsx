"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { ImdbIcon } from "@/shared/icons";

interface Props {
  ratingImdb: string | null;
  voteAverage: number;
}

export const Rating = ({ ratingImdb, voteAverage }: Props) => {
  const t = useTranslations("movie.card");

  return (
    <div className="absolute top-2.5 right-2.5 flex gap-2 z-20">
      {Number(ratingImdb) > 0 && (
        <div
          className="flex items-stretch overflow-hidden rounded-md text-xs font-bold shadow-md h-fit"
          title={t("imdb")}
        >
          <div className="flex items-center bg-zinc-800 px-1.5 py-1">
            <ImdbIcon className="size-4 shrink-0 text-yellow-400 stroke-none" />
          </div>

          <div className="flex items-center bg-yellow-500 px-1.5 py-1 text-black tabular-nums">
            {ratingImdb}
          </div>
        </div>
      )}

      {voteAverage > 0 && (
        <div
          className="flex items-stretch overflow-hidden rounded-md text-xs font-bold shadow-md h-fit"
          title={t("tmdb")}
        >
          <div className="flex items-center bg-zinc-800 px-1.5 py-1">
            <Star className="size-3.5 shrink-0 fill-sky-400 text-sky-400 stroke-none" />
          </div>

          <div className="flex items-center bg-sky-500 px-1.5 py-1 text-white tabular-nums">
            {voteAverage?.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};
