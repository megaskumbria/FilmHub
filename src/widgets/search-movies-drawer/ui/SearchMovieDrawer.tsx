"use client";

import {
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
  Drawer,
  Button,
  Input,
  CardShirt,
} from "@/shared/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { MediaCard } from "@/widgets/movie-card";
import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { useDebounce, useIntersectionObserver, infiniteMediaQueryOptions } from "@/shared/hooks";
import { extractUniqueMedia } from "@/shared/lib";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

export const SearchMovieDrawer = () => {
  const t = useTranslations("header.search");

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const { layout } = useMovieCardLayout();

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    infiniteMediaQueryOptions({
      scope: "search-drawer",
      category: "all",
      searchQuery: debouncedSearch,
      enabled: open,
    }),
  );

  const ref = useIntersectionObserver(
    () => {
      if (open && hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
    { rootMargin: "100px" },
  );

  const allMedia = extractUniqueMedia(data);

  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <Drawer direction="top" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="transparent"
          className="flex size-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white/80 shadow-sm transition-colors hover:border-accent/40 hover:bg-white/20 hover:text-white"
        >
          <Search className="size-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent
        aria-describedby={undefined}
        className="top-12 h-[90vh] border-border/40 bg-background/85 backdrop-blur-xl shadow-2xl rounded-b-xl"
      >
        <DrawerTitle></DrawerTitle>

        <DrawerHeader className="px-6 pb-4 pt-2 items-center">
          <div className="relative max-w-250 w-full flex items-center">
            <Link href="/movie-search" onClick={() => setOpen(false)}>
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted cursor-pointer" />
            </Link>

            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("placeholder")}
              className="w-full h-11 pl-10 placeholder:text-zinc-muted"
            />

            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setSearchQuery("")}
                  className="cursor-pointer absolute right-3 size-5 rounded-full bg-muted/20 hover:bg-accent/20 flex items-center justify-center transition-colors group"
                >
                  <X className="size-3.5 text-muted group-hover:text-accent transition-colors" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </DrawerHeader>

        {!isLoading && allMedia.length === 0 && (
          <p className="text-center text-sm text-muted">{t("empty")}</p>
        )}

        <div
          ref={scrollRef}
          className="drawer-scroll overflow-y-auto px-6 pb-4 flex justify-center"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,220px))] justify-center gap-4 max-w-250 w-full">
            {isLoading && (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <CardShirt key={`card-shirt-${i}`} />
                ))}
              </>
            )}

            {!isLoading
              && allMedia.length > 0
              && allMedia.map((media) => (
                <MediaCard
                  key={media.id}
                  media={media}
                  layout={layout}
                  blockOptions={{
                    poster: { flags: { showFlags: false } },
                    hover: { flags: { showFlags: false } },
                    body: { flags: { showFlags: false } },
                  }}
                  mode="add-collection"
                />
              ))}

            {isFetchingNextPage
              && Array.from({ length: 10 }).map((_, i) => <CardShirt key={`card-shirt-${i}`} />)}

            <div ref={ref} style={{ height: 1 }} />
          </div>
        </div>

        <DrawerFooter className="border-t border-border/40 py-3">
          <Link
            href="/movie-search"
            onClick={() => setOpen(false)}
            className="group flex items-center justify-center gap-0.5"
          >
            <p className="text-center text-sm text-muted group-hover:text-muted/70  transition-all">
              {t("more")}
            </p>
            <ChevronRight className="size-5 text-muted translate-y-1px group-hover:text-muted/70  transition-all" />
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
