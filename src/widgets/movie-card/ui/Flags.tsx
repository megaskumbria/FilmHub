"use client";

import { flagsData } from "@/shared/model/flags";
import { IFlagItem } from "@/shared/model/flags/mockFlags";

interface FlagsProps {
  hoverHeight?: number;
}

export const Flags = ({ hoverHeight }: FlagsProps) => {
  console.log("hoverHeight", hoverHeight);
  return (
    <div
      className="absolute bottom-0 left-2 right-2 flex flex-wrap gap-1.5 mb-2 z-20 translate-y-0 group-hover:-translate-y-[110px] transition-transform duration-300 ease-out"
      style={{
        transform: `translateY(-${hoverHeight}px)`,
      }}
    >
      {flagsData.map((flagData) => {
        const { flagItems, category } = flagData;

        return flagItems
          .filter((FlagItem) => FlagItem.isUsed)
          .map((FlagItem: IFlagItem, index: number) => {
            const { id, flagName, color, bg } = FlagItem;

            return (
              <span
                key={index + id}
                className="px-2 py-1 text-xs font-semibold rounded-md border backdrop-blur-sm saturate-150"
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
          });
      })}
    </div>
  );
};
