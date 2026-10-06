"use client";

import { BlockPlacement } from "../model/cardBlocksMap";
import { FlagWithScale } from "@/widgets/movie-card";
import { useCreationFlagStore } from "@/features/creation-flag";
import { useShallow } from "zustand/shallow";
import { type FlagData } from "@/shared/hooks";
import { FlagBadge } from "@/entities";
import { FlagScaleHoverCard } from "@/features";
import { useTranslations } from "next-intl";

interface Props {
  flagsData: FlagData[];

  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
  showScales?: boolean;
  isPreview?: boolean;
}

export const FlagGroup = ({
  hoverHeight = 0,
  hasHover,
  placement,
  showScales = true,
  isPreview = false,
  flagsData,
}: Props) => {
  const t = useTranslations("flags");
  const { flag } = useCreationFlagStore(
    useShallow((state) => ({
      flag: state.flag,
    })),
  );

  const { flagName, selectedColor, selectedFont, selectedIcon, scale, bgOpacity } = flag;

  const flagItem = {
    flagName: flagName || t("newFlag"),
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
        <FlagWithScale scaleName={scale.name} showScale={showScales}>
          <FlagBadge flagItem={flagItem} />
        </FlagWithScale>
      : <>
          {flagsData.map(({ id: scaleId, flags, scaleName, flagsCount }) => {
            return flags.map((flag, index) => {
              const { id, position } = flag;

              return (
                <FlagWithScale key={index + id} scaleName={scaleName} showScale={showScales}>
                  <FlagScaleHoverCard scaleId={scaleId} scaleName={scaleName} currentFlagId={id}>
                    <FlagBadge flagItem={flag} level={position + 1} total={flagsCount} />
                  </FlagScaleHoverCard>
                </FlagWithScale>
              );
            });
          })}
        </>
      }
    </div>
  );
};
