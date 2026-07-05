"use client";

import { useGetFlags } from "@/shared/hooks";
import { BlockPlacement } from "../model/cardBlocksMap";
import { FlagBadge, FlagWithCategory } from "@/widgets/movie-card";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { useShallow } from "zustand/shallow";

interface Props {
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
}: Props) => {
  const { flag } = useCreationFlagStore(
    useShallow((state) => ({
      flag: state.flag,
    })),
  );

  const { flagName, selectedColor, selectedFont, selectedIcon, category, bgOpacity } = flag;
  const { svgContent } = selectedIcon ?? {};

  const flagItem = {
    id: "0",
    flagName: flagName || "New flag",
    color: selectedColor,
    fontFamily: selectedFont,
    iconId: selectedIcon,
    svgContent: svgContent,
    bgOpacity: bgOpacity,
    position: 0,
  };

  const { data: flagsData = [] } = useGetFlags();

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
          {flagsData.map(({ flags, categoryName }) => {
            return flags.map((flag, index) => {
              const { id } = flag;

              return (
                <FlagWithCategory
                  key={index + id}
                  categoryName={categoryName}
                  showCategory={showCategories}
                >
                  <FlagBadge flagItem={flag} categoryName={categoryName} />
                </FlagWithCategory>
              );
            });
          })}
        </>
      }
    </div>
  );
};
