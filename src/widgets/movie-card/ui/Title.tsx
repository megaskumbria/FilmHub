"use client";

import { BlockPlacement } from "../model/cardBlocksMap";

interface TitleProps {
  title: string;
  yearOfRelease: number;
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
}

export const Title = ({
  title,
  yearOfRelease,
  hoverHeight = 0,
  hasHover,
  placement = "poster",
}: TitleProps) => {
  const shouldLift = placement === "poster" && hasHover;

  return (
    <div
      className="flex justify-between items-center mb-2 translate-y-0 transition-transform duration-300 ease-out"
      style={{ transform: shouldLift ? `translateY(-${hoverHeight}px)` : undefined }}
    >
      <h3 className="max-w-[200px] overflow-ellipsis whitespace-nowrap overflow-hidden font-semibold text-foreground">
        {title}
      </h3>

      <span className="text-sm font-medium text-muted">{yearOfRelease}</span>
    </div>
  );
};
