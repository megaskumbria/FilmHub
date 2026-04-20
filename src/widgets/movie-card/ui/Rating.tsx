"use client";

import { Star } from "lucide-react";
import { ImdbIcon } from "@/shared/assets";

interface RatingProps {
  rating_imdb: string | null;
  vote_average: number;
}

export const Rating = ({ rating_imdb, vote_average }: RatingProps) => {
  return (
    <div className="absolute top-[10px] left-[10px] flex gap-1 z-20">
      {rating_imdb && (
        <div
          className="flex items-center gap-1 bg-emerald-600 rounded-lg py-1 px-1.5 shadow-lg h-fit"
          title="IMDB Rating"
        >
          <ImdbIcon className="size-5 text-white stroke-none" />
          <span className="text-white text-xs font-bold">{rating_imdb}</span>
        </div>
      )}

      {vote_average && (
        <div
          className="flex items-center gap-1 bg-emerald-600 rounded-lg py-1 px-1.5 shadow-lg h-fit"
          title="TMDB Rating"
        >
          <Star className="size-3 fill-white stroke-none" />
          <span className="text-white text-xs font-bold">{vote_average?.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};
