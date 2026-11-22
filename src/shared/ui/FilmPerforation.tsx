import { cn } from "@/shared/lib/utils";

const PERFORATION_HOLE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='12'%3E%3Crect x='7' y='1' width='14' height='10' rx='2.5' fill='%2327272f'/%3E%3C/svg%3E\")";

const PERFORATION_HOLE_VERTICAL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='28'%3E%3Crect x='1' y='7' width='10' height='14' rx='2.5' fill='%2327272f'/%3E%3C/svg%3E\")";

interface Props {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const FilmPerforation = ({ className, orientation = "horizontal" }: Props) => {
  const isVertical = orientation === "vertical";

  return (
    <div
      aria-hidden
      className={cn(isVertical ? "w-3 h-full shrink-0" : "h-3 w-full", className)}
      style={{
        backgroundImage: isVertical ? PERFORATION_HOLE_VERTICAL : PERFORATION_HOLE,
        backgroundRepeat: isVertical ? "repeat-y" : "repeat-x",
      }}
    />
  );
};
