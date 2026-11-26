const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g"];

export const PeopleSkeleton = () => {
  return (
    <ul aria-hidden className="flex flex-col">
      {SKELETON_KEYS.map((key) => (
        <li key={key} className="flex items-center gap-3 px-2 py-2.5">
          <div className="size-12 shrink-0 animate-pulse rounded-2xl bg-foreground/15" />

          <div className="flex min-w-0 flex-1 flex-col gap-2 py-0.5">
            <div className="h-3.5 w-32 max-w-[60%] animate-pulse rounded-full bg-foreground/15" />
            <div className="h-3 w-24 max-w-[70%] animate-pulse rounded-full bg-foreground/15" />
            <div className="h-2.5 w-16 max-w-[40%] animate-pulse rounded-full bg-foreground/15" />
          </div>

          <div className="h-8 w-20 shrink-0 animate-pulse rounded-full bg-foreground/15" />
        </li>
      ))}
    </ul>
  );
};
