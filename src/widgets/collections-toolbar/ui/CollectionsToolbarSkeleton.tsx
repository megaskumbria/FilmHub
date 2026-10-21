import { Skeleton } from "@/shared/ui/skeleton";

export const CollectionsToolbarSkeleton = () => {
  return (
    <div className="relative flex items-center gap-4">
      <Skeleton className="size-14 shrink-0 rounded-2xl" />

      <div className="space-y-2.5">
        <Skeleton className="h-7 w-52 rounded-md" />

        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-10 rounded" />
          <Skeleton className="h-4 w-10 rounded" />
        </div>
      </div>
    </div>
  );
};
