import type { CSSProperties } from "react";
import { FlagBadge } from "@/entities";
import { cn } from "@/shared/lib/utils";
import type { FlagItem } from "@/shared/hooks";

interface Props {
  flag: FlagItem;
  index: number;
  currentIndex: number;
  lowerColor?: string;
  upperColor?: string;
}

const tint = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

const blend = (from: string, to: string) => `color-mix(in srgb, ${from} 50%, ${to})`;

const riseStep = (step: number) => ({ "--rise-index": step }) as CSSProperties;

interface SegmentProps {
  position: "upper" | "lower";
  filled: boolean;
  from: string;
  to: string;
  step: number;
}

const RailSegment = ({ position, filled, from, to, step }: SegmentProps) => (
  <span
    className={cn(
      "absolute left-[calc(50%-1px)] w-0.5 bg-border",
      position === "upper" ? "top-0 bottom-1/2" : "top-1/2 bottom-0",
    )}
  >
    {filled && (
      <span
        className="animate-scale-rise absolute inset-0 origin-bottom"
        style={{ ...riseStep(step), backgroundImage: `linear-gradient(to top, ${from}, ${to})` }}
      />
    )}
  </span>
);

export const ScaleRung = ({ flag, index, currentIndex, lowerColor, upperColor }: Props) => {
  const { color } = flag;

  const isCurrent = index === currentIndex;
  const isReached = index <= currentIndex;

  return (
    <li
      aria-current={isCurrent ? "true" : undefined}
      className={cn(
        "relative flex items-center rounded-lg py-1.5 pr-3 pl-9 transition-opacity duration-200",
        !isReached && "opacity-45",
      )}
      style={
        isCurrent ?
          { backgroundImage: `linear-gradient(90deg, ${tint(color, 22)}, transparent 85%)` }
        : undefined
      }
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-1.5 flex w-5 items-center justify-center"
      >
        {upperColor && (
          <RailSegment
            position="upper"
            filled={index < currentIndex}
            from={color}
            to={blend(color, upperColor)}
            step={index * 2}
          />
        )}

        {lowerColor && (
          <RailSegment
            position="lower"
            filled={isReached}
            from={blend(lowerColor, color)}
            to={color}
            step={index * 2 - 1}
          />
        )}

        <span
          className={cn(
            "relative rounded-full",
            isReached ? "animate-scale-node" : "border border-zinc-muted bg-surface-elevated",
            isCurrent ? "size-3" : "size-2",
          )}
          style={
            isReached ?
              {
                ...riseStep(index * 2),
                backgroundColor: color,
                boxShadow:
                  isCurrent ?
                    `0 0 0 3px ${tint(color, 30)}, 0 0 14px ${tint(color, 70)}`
                  : undefined,
              }
            : undefined
          }
        />
      </span>

      <FlagBadge flagItem={flag} />
    </li>
  );
};
