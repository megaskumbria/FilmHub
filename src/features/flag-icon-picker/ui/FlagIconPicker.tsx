import { Button, Label, InlineSvg } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { memo } from "react";
import { useShallow } from "zustand/shallow";
import { useInfiniteIcons, useIntersectionObserver } from "@/shared/hooks";

export const FlagIconPicker = memo(() => {
  const { selectedIcon, setSelectedIcon } = useCreationFlagStore(
    useShallow((state) => ({
      selectedIcon: state.selectedIcon,
      setSelectedIcon: state.setSelectedIcon,
    })),
  );

  const {
    data: dataIcons,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteIcons({ limit: 60 });

  const ref = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
    { rootMargin: "10px" },
  );

  console.log(dataIcons);
  // const { icons, total, page, limit, totalPages } = dataIcons;
  // console.log(icons);

  // const SelectedIconComponent = getIconByName(selectedIcon);

  return (
    <section className="rounded-xl border border-border/60 bg-surface-subtle p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
          <Label className="text-sm font-semibold text-foreground">Icon</Label>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-muted">Selected:</span>

          <span className="flex items-center justify-center size-7 rounded-md bg-accent/10 border border-accent/30">
            {/* {SelectedIconComponent && <SelectedIconComponent className="size-4 text-accent" />} */}
          </span>

          <span className="text-xs text-zinc-muted">{selectedIcon}</span>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1.5 max-h-64 overflow-y-auto scrollbar-minimal ">
        {/* {icons?.map(({ id, name, svgContent }) => (
          <Button
            key={id}
            onClick={() => setSelectedIcon(selectedIcon === name ? null : name)}
            className={cn(
              "flex items-center justify-center size-10 rounded-lg border transition-all cursor-pointer hover:bg-white/6",
              selectedIcon === name
                && "border-accent bg-accent/10 text-accent shadow-[0_0_8px_rgba(155,86,240,0.3)]",
              selectedIcon !== name && "border-border/40 text-zinc-muted hover:text-foreground",
            )}
            title={name}
          >
            <InlineSvg svg={svgContent} className="size-6" />
          </Button>
        ))} */}

        <div ref={ref} style={{ height: 1 }} />
      </div>

      <span className="text-base text-zinc-muted text-center w-full block">
        About 1,500 SVG icons will live here (stored on the backend)
      </span>
    </section>
  );
});
