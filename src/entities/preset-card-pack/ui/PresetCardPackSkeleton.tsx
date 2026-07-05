import { Skeleton } from "@/shared/ui";

export const PresetCardPackSkeleton = () => {
  return (
    <div className="flex flex-col justify-between gap-3 w-56 h-full p-4 rounded-2xl border border-border/40 bg-surface-subtle">
      <header className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4.5 w-3/4 rounded" />

          <div className="space-y-1 mt-0.5">
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-2/3 rounded" />
          </div>
        </div>

        <Skeleton className="shrink-0 h-5.5 w-5.5 rounded-lg" />
      </header>

      <div className="flex flex-wrap gap-1.5">
        <Skeleton className="h-7 w-22.5 rounded-sm" />
        <Skeleton className="h-7 w-18 rounded-sm" />
        <Skeleton className="h-7 w-8 rounded-sm" />
      </div>

      <footer className="flex w-full items-center justify-between pt-2 border-t border-border/30">
        <div className="flex items-center gap-1">
          <Skeleton className="size-3 rounded" />
          <Skeleton className="h-3 w-14 rounded" />
        </div>

        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-10 rounded" />
          <Skeleton className="size-3 rounded" />
        </div>
      </footer>
    </div>
  );
};
