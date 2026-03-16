"use client";

import { IFlagItem } from "@/shared/model/flags/mockFlags";

interface FlagBadgeProps {
  flagItem: IFlagItem;
  category?: string;
}

export const FlagBadge = ({ flagItem, category }: FlagBadgeProps) => {
  const { flagName, color, bg } = flagItem;

  return (
    <span className="relative inline-flex items-stretch w-fit overflow-visible" title={category}>
      <span
        className="pl-1.5 pr-2 py-1 text-xs font-semibold rounded-l-sm border-y border-l flex items-center"
        style={{
          color,
          backgroundColor: bg,
          borderColor: color,
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
        }}
      >
        {flagName}
      </span>

      <svg
        width="8"
        viewBox="0 0 8 22"
        preserveAspectRatio="none"
        aria-hidden
        className="shrink-0 self-stretch"
      >
        <polygon points="0,0 8,11 0,22" fill={bg} stroke="none" />
        <polyline
          points="0,0 8,11 0,22"
          fill="none"
          stroke={color}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span
        aria-hidden
        className="absolute right-2 top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full opacity-75"
        style={{ backgroundColor: color }}
      />
    </span>
  );
};
