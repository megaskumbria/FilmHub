import { cn } from "@/shared/lib/utils";

const MAX_LEVEL_DOTS = 6;

interface Props {
  level: number;
  total: number;
}

export const LevelDots = ({ level, total }: Props) => {
  const safeLevel = Math.min(Math.max(level, 1), total);

  const dotsCount = Math.min(total, MAX_LEVEL_DOTS);
  const filledCount =
    total > MAX_LEVEL_DOTS ?
      Math.max(1, Math.round((safeLevel / total) * MAX_LEVEL_DOTS))
    : safeLevel;

  return (
    <span
      role="img"
      aria-label={`Level ${safeLevel} of ${total}`}
      className="flex items-center gap-0.5 shrink-0"
    >
      {Array.from({ length: dotsCount }, (_, index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            "size-1.5 rounded-full bg-current",
            index < filledCount ? "" : "opacity-30",
          )}
        />
      ))}
    </span>
  );
};
