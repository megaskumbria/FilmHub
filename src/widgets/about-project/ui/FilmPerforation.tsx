import { cn } from "@/shared/lib/utils";

const PERFORATION_HOLE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='12'%3E%3Crect x='7' y='1' width='14' height='10' rx='2.5' fill='%2327272f'/%3E%3C/svg%3E\")";

interface Props {
  className?: string;
}

export const FilmPerforation = ({ className }: Props) => {
  return (
    <div
      aria-hidden
      className={cn("h-3 w-full", className)}
      style={{ backgroundImage: PERFORATION_HOLE, backgroundRepeat: "repeat-x" }}
    />
  );
};
