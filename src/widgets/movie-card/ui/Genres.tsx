"use client";

import { BlockPlacement } from "../model/blocksRegistry";

interface GenresProps {
  genres: string[];
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
}

export const Genres = ({
  genres,
  hoverHeight = 0,
  hasHover,
  placement = "poster",
}: GenresProps) => {
  const shouldLift = placement === "poster" && hasHover;

  return (
    <div
      className="flex gap-1 overflow-ellipsis overflow-hidden translate-y-0 transition-transform duration-300 ease-out"
      style={{ transform: shouldLift ? `translateY(-${hoverHeight}px)` : undefined }}
    >
      {genres.map((genre, index) => (
        <span
          className="bg-white/5 border border-white/5 inline-flex items-center whitespace-nowrap rounded-full px-2 py-1.5 text-xs font-medium leading-none tracking-wide text-muted"
          key={index}
        >
          {genre}
        </span>
      ))}
    </div>
  );
};
