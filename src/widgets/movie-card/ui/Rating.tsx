"use client";

import { Star } from "lucide-react";
import { ImdbIcon } from "@/shared/assets";

interface RatingProps {
  rating_imdb: string | null;
  vote_average: number;
}

export const Rating = ({ rating_imdb, vote_average }: RatingProps) => {
  return (
    <div className="absolute top-[10px] left-[10px] flex gap-2 z-20">
      {Number(rating_imdb) > 0 && (
        <div
          className="flex items-stretch overflow-hidden rounded-md text-xs font-bold shadow-md h-fit"
          title="IMDB Rating"
        >
          <div className="flex items-center bg-zinc-800 px-1.5 py-1">
            <ImdbIcon className="size-4 shrink-0 text-yellow-400 stroke-none" />
          </div>
          <div className="flex items-center bg-yellow-500 px-1.5 py-1 text-black tabular-nums">
            {rating_imdb}
          </div>
        </div>
      )}

      {vote_average > 0 && (
        <div
          className="flex items-stretch overflow-hidden rounded-md text-xs font-bold shadow-md h-fit"
          title="TMDB Rating"
        >
          <div className="flex items-center bg-zinc-800 px-1.5 py-1">
            <Star className="size-3.5 shrink-0 fill-sky-400 text-sky-400 stroke-none" />
          </div>
          <div className="flex items-center bg-sky-500 px-1.5 py-1 text-white tabular-nums">
            {vote_average?.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};
