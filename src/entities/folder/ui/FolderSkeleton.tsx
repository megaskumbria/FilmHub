import { Skeleton } from "@/shared/ui";

interface Props {
  isMyProfile?: boolean;
}

export const FolderSkeleton = ({ isMyProfile = false }: Props) => {
  return (
    <div className="relative pt-3 flex-1">
      <Skeleton className="absolute top-0 left-4 h-3 w-16 rounded-b-none rounded-t-md border-t border-l border-r border-border" />

      <div className="relative flex flex-col shadow-lg rounded-b-xl rounded-tr-xl border border-border overflow-hidden w-full">
        <div className="relative h-36 bg-surface overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton
              className="w-20 h-28 rounded-md ring-1 ring-white/15"
              style={{
                transform: "translateX(0px) rotate(0deg) scale(0.92)",
              }}
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-black/10" />

          <div className="absolute top-2.5 left-2.5 z-30 flex items-center gap-2">
            <Skeleton className="size-7 shrink-0 rounded-lg ring-1 ring-white/10" />
            {isMyProfile && (
              <Skeleton className="size-7 shrink-0 rounded-lg ring-1 ring-white/10" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between bg-surface px-3.5 py-2.5">
          <Skeleton className="h-5 w-24 rounded-sm bg-white/10" />
          <Skeleton className="h-5 w-5 rounded-sm bg-white/10" />
        </div>
      </div>
    </div>
  );
};
