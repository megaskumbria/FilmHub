"use client";

import { flagSoftBackground } from "@/shared/lib";
import { IFlagItem } from "@/shared/model/flags/mockFlags";

interface FlagBadgeProps {
  flagItem: IFlagItem;
  category?: string | null;
}

export const FlagBadge = ({ flagItem, category }: FlagBadgeProps) => {
  const { flagName, color, bgOpacity, fontFamily } = flagItem;

  const computedBg = flagSoftBackground(color, bgOpacity);

  // const IconComponent = getIconByName(icon || "");

  return (
    <span
      className="relative inline-flex items-stretch w-fit overflow-visible backdrop-blur-md"
      title={category || ""}
      style={{ isolation: "isolate", transform: "translateZ(0)" }}
      // style={{ transform: "translateZ(0)", willChange: "transform" }}
    >
      <span
        className="pl-1.5 gap-1.5 pr-2 py-1 text-sm font-semibold rounded-l-sm border-y border-l flex items-center"
        style={{
          color,
          backgroundColor: computedBg,
          borderColor: color,
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
          fontFamily: fontFamily || "Manrope",
        }}
      >
        {/* {IconComponent && <IconComponent className="size-5 shrink-0" style={{ color: color }} />} */}

        {flagName}
      </span>

      <svg
        width="8"
        viewBox="0 0 8 22"
        preserveAspectRatio="none"
        className="shrink-0 self-stretch"
      >
        <polygon points="0,0 8,11 0,22" fill={computedBg} stroke="none" />
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
