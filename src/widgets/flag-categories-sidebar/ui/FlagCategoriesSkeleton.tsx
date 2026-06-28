import { cn } from "@/shared/lib/utils";

interface Props {
  index?: number;
}

export const FlagCategoriesSkeleton = ({ index = 0 }: Props) => {
  const widths = ["w-28", "w-20", "w-32", "w-24", "w-16"];

  return (
    <div className="relative border-b border-border/40 last:border-0 px-2 py-2  flex items-center gap-2 overflow-hidden">
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />

      <div className={cn("h-4 rounded-md bg-white/8", widths[index % 5])} />

      <div className="ml-auto flex items-center gap-2 shrink-0">
        <div className="w-6 h-6 rounded-md bg-white/8 border border-border/30" />
        <div className="w-6 h-6 rounded bg-white/6 border border-border/30" />
      </div>

      <div className="w-4 h-4 rounded bg-white/5" />
    </div>
  );
};
