import { Skeleton } from "@/shared/ui/skeleton";
import { Separator } from "@/shared/ui";

export const CollectionsToolbarSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-5 shrink-0 rounded" />

      <Skeleton className="h-4.5 w-28 rounded" />

      <Separator orientation="vertical" className="h-5 bg-border" />

      <Skeleton className="size-5 rounded" />

      <Separator orientation="vertical" className="h-5 bg-border" />

      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1.5 h-8 px-1">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="size-5 rounded" />
        </div>

        <div className="flex items-center gap-1.5 h-8 px-1">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="size-5 rounded" />
        </div>
      </div>
    </div>
  );
};
