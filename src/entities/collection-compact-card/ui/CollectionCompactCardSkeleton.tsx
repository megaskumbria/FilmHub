export const CollectionCompactCardSkeleton = () => {
  return (
    <div className="relative pt-2">
      <div className="absolute top-0 left-3 h-2 w-10 rounded-t-md bg-white/5" />

      <div className="relative flex items-stretch gap-0 w-full overflow-hidden rounded-b-xl rounded-tr-xl border border-white/5">
        <div className="relative h-16 w-20 shrink-0 bg-white/5 animate-pulse" />

        <div className="flex flex-1 items-center justify-between px-3 bg-surface">
          <div className="min-w-0 flex flex-col gap-1.5">
            <div className="h-3.5 w-28 rounded-md bg-white/8 animate-pulse" />
            <div className="h-3 w-14 rounded-md bg-white/5 animate-pulse" />
          </div>

          <div className="size-4.5 rounded-md border border-white/8 bg-white/5 shrink-0 ml-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
