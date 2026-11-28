import { Skeleton } from "@/shared/ui";

const COLS = 8;

interface Props {
  rows: number;
}

export const SkeletonRows = ({ rows }: Props) => (
  <div className="grid grid-cols-8 gap-1" aria-hidden>
    {Array.from({ length: rows * COLS }, (_, i) => (
      <Skeleton key={i} className="h-10 rounded-lg bg-white/4" />
    ))}
  </div>
);
