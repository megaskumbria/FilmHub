"use client";

import { IFlagItem } from "@/shared/model/flags/mockFlags";

interface FlagProps {
  flagItem: IFlagItem;
  category: string;
}

export const Flag = ({ flagItem, category }: FlagProps) => {
  const { flagName, color, bg } = flagItem;

  return (
    <span
      className="px-2 py-1 text-xs font-semibold rounded-md border backdrop-blur-sm saturate-150 w-fit"
      title={category}
      style={{
        color,
        backgroundColor: bg,
        // backgroundColor: `color-mix(in srgb, ${bg} 85%, rgba(0, 0, 0, 0.7))`,
        borderColor: color,
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
      }}
    >
      {flagName}
    </span>
  );
};
