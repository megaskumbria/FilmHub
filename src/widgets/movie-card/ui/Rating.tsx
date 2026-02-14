"use client";

import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  return (
    <span className="absolute top-[10px] left-[10px] flex items-center gap-1 bg-emerald-600 rounded-lg text-white text-xs font-bold py-1 px-1.5 shadow-lg z-20">
      <Star className="size-3.5 fill-white" />
      {rating}
    </span>
  );
};
