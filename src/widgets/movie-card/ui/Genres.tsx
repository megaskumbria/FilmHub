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
          className="inline-flex items-center whitespace-nowrap rounded-full border border-border/80 bg-linear-to-b from-slate-edge to-surface-subtle p-1.5 text-[11px] font-medium leading-none tracking-wide text-zinc-light shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/5"
          key={index}
        >
          {genre}
        </span>
      ))}
    </div>
  );
};
