import { Skeleton } from "@/shared/ui/skeleton";

export const FlagCategoriesSkeleton = () => {
  return (
    <Skeleton className="border-b border-border/40 last:border-0 py-2 px-2 rounded-t-none">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Skeleton className="w-24 h-5 rounded bg-white/11" />

        <div className="ml-auto flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-6 h-6 rounded bg-white/11 border border-border/40" />
            <Skeleton className="w-6 h-6 rounded bg-white/11 border border-border/40" />
          </div>

          <Skeleton className="size-3 rounded bg-white/11 border border-border/40" />
        </div>
      </div>
    </Skeleton>
  );
};
