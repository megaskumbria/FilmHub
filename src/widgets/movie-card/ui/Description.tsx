"use client";

import { BlockPlacement } from "../model/cardBlocksMap";

interface DescriptionProps {
  description: string;
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
}

export const Description = ({
  description,
  hoverHeight = 0,
  hasHover,
  placement = "poster",
}: DescriptionProps) => {
  const shouldLift = placement === "poster" && hasHover;

  return (
    <p
      className="text-xs relative line-clamp-3 overflow-hidden max-h-[60px] translate-y-0 transition-transform text-justify duration-300 ease-out"
      style={{ transform: shouldLift ? `translateY(-${hoverHeight}px)` : undefined }}
    >
      {description}
    </p>
  );
};
