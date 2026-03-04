"use client";

import { flagsData } from "@/shared/model/flags";
import { IFlagItem } from "@/shared/model/flags/mockFlags";
import { BlockPlacement } from "../model/cardBlocksMap";
import { FlagBadge, FlagWithCategory } from "@/widgets/movie-card";

interface FlagGroupProps {
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
  showCategories?: boolean;
}

export const FlagGroup = ({
  hoverHeight = 0,
  hasHover,
  placement,
  showCategories = true,
}: FlagGroupProps) => {
  const shouldLift = placement === "poster" && hasHover;

  return (
    <div
      className="flex flex-wrap gap-1.5 translate-y-0 transition-transform duration-300 ease-out"
      style={{ transform: shouldLift ? `translateY(-${hoverHeight}px)` : undefined }}
    >
      {flagsData.map((flagData) => {
        const { flagItems, category } = flagData;

        return flagItems
          .filter((FlagItem) => FlagItem.isUsed)
          .map((FlagItem: IFlagItem, index: number) => {
            const { id } = FlagItem;

            return (
              <FlagWithCategory key={index + id} category={category} showCategory={showCategories}>
                <FlagBadge flagItem={FlagItem} category={category} />
              </FlagWithCategory>
            );
          });
      })}
    </div>
  );
};
