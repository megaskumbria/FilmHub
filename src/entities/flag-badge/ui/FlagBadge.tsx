"use client";

import { flagSoftBackground, loadFont } from "@/shared/lib";
import { FlagItem } from "@/shared/hooks";
import { InlineSvg } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useEffect } from "react";
import { LevelDots } from "./LevelDots";

type FlagItemData = Pick<FlagItem, "flagName" | "color" | "bgOpacity" | "fontFamily" | "icon">;

interface Props {
  flagItem: FlagItemData;
  level?: number;
  total?: number;
}

export const FlagBadge = ({ flagItem, level, total }: Props) => {
  const { flagName, color, bgOpacity, fontFamily, icon } = flagItem;

  const { svgContent } = icon ?? {};

  const hasLevelProps = level !== undefined && total !== undefined;
  const shouldShowLevel = hasLevelProps && total > 1;

  const computedBg = flagSoftBackground(color, bgOpacity);

  useEffect(() => {
    if (fontFamily && fontFamily !== "Manrope") {
      void loadFont(fontFamily).catch(console.error);
    }
  }, [fontFamily]);

  return (
    <span
      className="relative inline-flex items-stretch w-fit overflow-visible backdrop-blur-md"
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
        {svgContent && <InlineSvg svg={svgContent} className="size-5 shrink-0" />}

        <span
          className={cn(
            "flex flex-col items-start gap-1",
            hasLevelProps && "min-h-7.5 justify-center",
          )}
        >
          <span className="leading-tight">{flagName}</span>

          {shouldShowLevel && <LevelDots level={level} total={total} />}
        </span>
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
        className="absolute right-2 top-1/2 -translate-y-1/2 w-1.25 h-1.25 rounded-full opacity-75"
        style={{ backgroundColor: color }}
      />
    </span>
  );
};
