import { Skeleton } from "@/shared/ui";

export const MediaCardSkeleton = () => {
  return (
    <div
      aria-hidden
      className="relative w-full aspect-2/3 overflow-hidden rounded-xl border border-border bg-surface/40"
    >
      <Skeleton className="absolute inset-0 rounded-none" />

      <div className="absolute top-2.5 right-2.5 flex gap-2">
        <Skeleton className="h-6 w-12 rounded-md bg-muted/20" />
        <Skeleton className="h-6 w-14 rounded-md bg-muted/20" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3">
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-full bg-muted/20" />
          <Skeleton className="h-5 w-10 rounded-full bg-muted/20" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-3/5 rounded bg-muted/20" />
          <Skeleton className="h-3.5 w-9 rounded bg-muted/20" />
        </div>

        <Skeleton className="h-3 w-2/5 rounded bg-muted/20" />
      </div>
    </div>
  );
};
