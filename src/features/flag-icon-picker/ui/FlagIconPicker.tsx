"use client";

import {
  Button,
  Input,
  SearchClearButton,
  InlineSvg,
  Label,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/shared/ui";
import { IconSearch, IconPhoto, IconChevronsLeft } from "@tabler/icons-react";
import {
  useCreationFlagStore,
  type SelectedIcon,
} from "@/features/creation-flag/model/creation-flag-store";
import {
  memo,
  useCallback,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { useInfiniteIcons, useIntersectionObserver, useDebounce } from "@/shared/hooks";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTranslations } from "next-intl";
import type { PickerIcon } from "../model/types";
import { IconTryOnStage } from "./IconTryOnStage";
import { useShallow } from "zustand/react/shallow";
import { SkeletonRows } from "./SkeletonRows";

const COLS = 8;
const ROW_HEIGHT = 44;
const LIMIT = 120;

interface Props {
  selectedIcon: SelectedIcon | null;
}

export const FlagIconPicker = memo(({ selectedIcon }: Props) => {
  const t = useTranslations("flags");

  const [searchQuery, setSearchQuery] = useState("");
  const [previewIcon, setPreviewIcon] = useState<PickerIcon | null>(null);
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { selectedColor, selectedId } = useCreationFlagStore(
    useShallow((state) => ({
      selectedColor: state.flag.selectedColor,
      selectedId: state.flag.selectedIcon?.iconId,
    })),
  );

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteIcons(
    LIMIT,
    debouncedSearch,
    sheetOpen,
  );

  const dataIcons = data?.pages.flatMap((page) => page.data) ?? [];
  const total = data?.pages[0]?.total;
  const isEmpty = !isPending && dataIcons.length === 0;

  const sentinelRef = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
    { root: scrollEl, rootMargin: "120px" },
  );

  const virtualizer = useVirtualizer({
    count: Math.ceil(dataIcons.length / COLS),
    getScrollElement: () => scrollEl,
    estimateSize: () => ROW_HEIGHT,
    overscan: 3,
  });

  const handleSelect = useCallback((icon: PickerIcon) => {
    const { flag, updateStateFlag } = useCreationFlagStore.getState();
    const isSame = flag.selectedIcon?.iconId === icon.id;

    updateStateFlag({
      selectedIcon:
        isSame ? null : { iconName: icon.iconName, svgContent: icon.svgContent, iconId: icon.id },
    });
  }, []);

  const clearSearch = () => setSearchQuery("");

  const handleGridBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setPreviewIcon(null);
  };

  const handleClearSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" && searchQuery) {
      e.stopPropagation();
      clearSearch();
    }
  };

  const { iconName, svgContent } = selectedIcon ?? {};

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label className="text-xs font-semibold text-zinc-muted uppercase tracking-wider">
        {t("form.icon")}
      </Label>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 justify-between px-2 border-border/60 bg-surface text-zinc-muted hover:bg-white/5 hover:text-foreground transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-surface-subtle border border-border/60 flex items-center justify-center shrink-0">
                {svgContent ?
                  <InlineSvg svg={svgContent} className="size-5 shrink-0 text-zinc-muted" />
                : <IconPhoto className="size-5 shrink-0 text-zinc-muted" />}
              </div>

              <span className="text-sm truncate">{iconName ?? t("form.chooseIcon")}</span>
            </div>
          </Button>
        </SheetTrigger>

        <SheetContent
          showCloseButton={false}
          isHideOverlay={true}
          side="left"
          className="w-full p-0 border-border/60 bg-surface-subtle flex flex-col gap-0 z-1000 h-screen overflow-hidden"
        >
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-border/60 flex items-center justify-between flex-row">
            <SheetTitle className="text-sm font-semibold text-foreground">
              {t("form.chooseIconTitle")}
            </SheetTitle>

            <SheetClose asChild>
              <Button
                type="button"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 p-0 text-zinc-muted transition-colors hover:border-zinc-muted hover:bg-white/6 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <IconChevronsLeft className="size-5" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <section
            className="flex flex-1 flex-col min-h-0"
            style={{ "--flag-color": selectedColor } as CSSProperties}
          >
            <IconTryOnStage previewIcon={previewIcon} />

            <search className="flex shrink-0 flex-col gap-2 px-4 pt-4 pb-3">
              <div className="relative">
                <IconSearch className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-muted" />

                <Input
                  type="search"
                  variant="search"
                  value={searchQuery}
                  placeholder={t("form.searchIcons")}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => handleClearSearch(e)}
                />

                <SearchClearButton show={!!searchQuery} onClear={clearSearch} size={6} />
              </div>

              <p className="h-4 px-4 text-xs text-zinc-muted tabular-nums">
                {total && t("iconPicker.found", { count: total })}
              </p>
            </search>

            <div
              ref={setScrollEl}
              className="scrollbar-minimal min-h-0 flex-1 overflow-y-auto px-4 pb-4"
              onPointerLeave={() => setPreviewIcon(null)}
              onBlur={handleGridBlur}
            >
              {isPending && <SkeletonRows rows={8} />}

              {isEmpty && (
                <div className="flex flex-col items-center gap-3 px-6 pt-10 text-center">
                  <p className="text-sm text-foreground">
                    {t("iconPicker.noResults", { query: debouncedSearch })}
                  </p>

                  <p className="max-w-64 text-xs leading-relaxed text-zinc-muted">
                    {t("iconPicker.noResultsHint")}
                  </p>
                </div>
              )}

              <div className="relative" style={{ height: virtualizer.getTotalSize() }}>
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const rowIcons = dataIcons.slice(
                    virtualRow.index * COLS,
                    (virtualRow.index + 1) * COLS,
                  );

                  return (
                    <div
                      key={virtualRow.key}
                      className="absolute top-0 left-0 grid w-full grid-cols-8 gap-1"
                      style={{ transform: `translateY(${virtualRow.start}px)` }}
                    >
                      {rowIcons.map((icon) => (
                        <Button
                          key={icon.id}
                          variant="glyph"
                          className="h-10 w-full"
                          aria-pressed={icon.id === selectedId}
                          onClick={() => handleSelect(icon)}
                          onPointerEnter={() => setPreviewIcon(icon)}
                          onFocus={() => setPreviewIcon(icon)}
                        >
                          <InlineSvg svg={icon.svgContent} className="size-6" />
                        </Button>
                      ))}
                    </div>
                  );
                })}
              </div>

              {isFetchingNextPage && <SkeletonRows rows={1} />}

              <div ref={sentinelRef} className="h-px" />
            </div>
          </section>
        </SheetContent>
      </Sheet>
    </div>
  );
});
