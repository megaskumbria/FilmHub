"use client";

import { Button, InlineSvg, Input, Separator } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { memo, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useInfiniteIcons, useIntersectionObserver, useDebounce } from "@/shared/hooks";
import { useVirtualizer } from "@tanstack/react-virtual";

const COLS = 8;
const ROW_HEIGHT = 42;
const LIMIT = 120;

export const FlagIconPicker = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { selectedIcon, setSelectedIcon } = useCreationFlagStore(
    useShallow((state) => ({
      selectedIcon: state.selectedIcon,
      setSelectedIcon: state.setSelectedIcon,
    })),
  );

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteIcons(
    LIMIT,
    debouncedSearch,
  );

  const dataIcons = data?.pages.flatMap((page) => page.data) ?? [];

  const sentinelRef = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
    { root: scrollRef.current, rootMargin: "120px" },
  );

  const rowCount = Math.ceil(dataIcons.length / COLS);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 3,
  });

  const virtualRows = virtualizer.getVirtualItems();

  const { iconName, svgContent } = selectedIcon ?? {};

  return (
    <section className="flex flex-1 flex-col min-h-0 p-4">
      <header className="flex gap-3 mb-4 flex-col">
        <div className="relative">
          <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-muted pointer-events-none" />

          <Input
            variant="neutral"
            placeholder="Search icons…"
            className="pl-8"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Separator />

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm text-foreground">Selected:</span>

          <div className="flex items-center justify-center size-7 rounded-md bg-accent/10 border border-accent/30">
            {svgContent && <InlineSvg svg={svgContent} className="size-5 text-accent" />}
          </div>

          <span className="text-sm text-foreground">{iconName}</span>
        </div>
      </header>

      <div ref={scrollRef} className="overflow-y-auto flex-1 min-h-0 scrollbar-minimal">
        <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
          {virtualRows.map((virtualRow) => {
            const rowIcons = dataIcons.slice(
              virtualRow.index * COLS,
              (virtualRow.index + 1) * COLS,
            );

            return (
              <div
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
                className="grid grid-cols-8 gap-1.5"
              >
                {rowIcons.map(({ id, iconName: name, svgContent }) => (
                  <Button
                    key={id}
                    onClick={() =>
                      setSelectedIcon(iconName === name ? null : { iconName: name, svgContent })
                    }
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-lg border transition-all cursor-pointer hover:bg-white/6",
                      iconName === name ?
                        "border-accent bg-accent/10 text-accent "
                      : "border-border/40 text-zinc-muted hover:text-foreground",
                    )}
                    title={name}
                  >
                    <InlineSvg svg={svgContent} className="size-6" />
                  </Button>
                ))}
              </div>
            );
          })}
        </div>

        <div ref={sentinelRef} style={{ height: 1 }} />
      </div>
    </section>
  );
});
