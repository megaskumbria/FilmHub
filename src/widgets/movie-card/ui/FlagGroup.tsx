"use client";

import { BlockPlacement } from "../model/cardBlocksMap";
import { FlagWithCategory } from "@/widgets/movie-card";
import { useCreationFlagStore } from "@/features/creation-flag";
import { useShallow } from "zustand/shallow";
import { type FlagData } from "@/shared/hooks";
import { FlagBadge } from "@/entities";

interface Props {
  flagsData: FlagData[];

  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
  showCategories?: boolean;
  isPreview?: boolean;
}

export const FlagGroup = ({
  hoverHeight = 0,
  hasHover,
  placement,
  showCategories = true,
  isPreview = false,
  flagsData,
}: Props) => {
  const { flag } = useCreationFlagStore(
    useShallow((state) => ({
      flag: state.flag,
    })),
  );

  const { flagName, selectedColor, selectedFont, selectedIcon, category, bgOpacity } = flag;

  const flagItem = {
    flagName: flagName || "New flag",
    color: selectedColor,
    fontFamily: selectedFont,
    bgOpacity,
    icon: selectedIcon,
  };

  const shouldLift = placement === "poster" && hasHover;

  return (
    <div
      className="flex flex-wrap gap-1.5 translate-y-0 transition-transform duration-300 ease-out"
      style={{ transform: shouldLift ? `translateY(-${hoverHeight}px)` : undefined }}
    >
      {isPreview ?
        <FlagWithCategory categoryName={category.name} showCategory={showCategories}>
          <FlagBadge flagItem={flagItem} categoryName={category.name} />
        </FlagWithCategory>
      : <>
          {flagsData.map(({ flags, categoryName, flagsCount }) => {
            return flags.map((flag, index) => {
              const { id, position } = flag;

              return (
                <FlagWithCategory
                  key={index + id}
                  categoryName={categoryName}
                  showCategory={showCategories}
                >
                  <FlagBadge
                    flagItem={flag}
                    categoryName={categoryName}
                    level={position + 1}
                    total={flagsCount}
                  />
                </FlagWithCategory>
              );
            });
          })}
        </>
      }
    </div>
  );
};
