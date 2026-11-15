export const CollectionCompactCardSkeleton = () => {
  return (
    <div className="flex items-stretch w-full overflow-hidden rounded-xl border border-white/6 bg-white/2">
      <div className="flex w-25 shrink-0 gap-0.5 bg-obsidian px-0.5 py-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-11 w-7.5 shrink-0 rounded-[3px] bg-white/5 animate-pulse" />
        ))}
      </div>

      <div className="flex flex-1 items-center gap-3 px-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="h-3.5 w-28 rounded-md bg-white/8 animate-pulse" />
          <div className="h-3 w-16 rounded-md bg-white/5 animate-pulse" />
        </div>

        <div className="size-6 shrink-0 rounded-full border border-white/8 animate-pulse" />
      </div>
    </div>
  );
};
