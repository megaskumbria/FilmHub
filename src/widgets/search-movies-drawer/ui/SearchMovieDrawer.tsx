"use client";

import {
  DrawerContent,
  DrawerFooter,
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
  const inputRef = useRef<HTMLInputElement>(null);

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
  const showEmpty = !isLoading && allMedia.length === 0;

  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <Drawer direction="top" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="transparent"
          aria-label={t("placeholder")}
          className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-colors outline-none hover:border-white/20 hover:bg-white/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Search className="size-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent
        aria-describedby={undefined}
        className="top-0 flex h-[90dvh] max-h-[90dvh] flex-col overflow-hidden rounded-b-xl border-border/40 bg-background/85 shadow-2xl backdrop-blur-xl data-[vaul-drawer-direction=top]:mb-0! data-[vaul-drawer-direction=top]:h-[90dvh]! data-[vaul-drawer-direction=top]:max-h-[90dvh]! data-[vaul-drawer-direction=top]:rounded-b-xl!"
      >
        <DrawerTitle className="sr-only">{t("placeholder")}</DrawerTitle>

        <div className="mx-auto flex min-h-0 w-full max-w-250 flex-1 flex-col px-3 sm:px-6">
          <header className="shrink-0 pe-2.5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:pt-4 sm:pb-4">
            <search className="group/search relative w-full">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-muted transition-colors group-focus-within/search:text-accent" />

              <Input
                ref={inputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && e.currentTarget.blur()}
                placeholder={t("placeholder")}
                variant="neutral"
                inputSize="lg"
                className="pr-12 pl-11 text-sm shadow-none focus-visible:border-accent focus-visible:shadow-none [&::-webkit-search-cancel-button]:hidden"
              />

              <AnimatePresence initial={false}>
                {searchQuery && (
                  <motion.div
                    key="clear"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-1/2 right-3 -translate-y-1/2"
                  >
                    <Button
                      type="button"
                      className="group size-6 rounded-full bg-muted/15 transition-colors hover:bg-accent/20"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="size-3.5 text-muted transition-colors group-hover:text-accent" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </search>
          </header>

          <div ref={scrollRef} className="drawer-scroll min-h-0 flex-1 overflow-y-auto pb-4">
            {showEmpty ?
              <p className="m-auto text-center text-sm text-muted">{t("empty")}</p>
            : <div className="flex h-fit w-full flex-col">
                <ul className="grid w-full grid-cols-2 content-start gap-3 xs:grid-cols-3 sm:gap-4 min-[800px]:grid-cols-4 lg:grid-cols-5">
                  {isLoading
                    && Array.from({ length: 15 }).map((_, i) => (
                      <li key={`card-shirt-${i}`}>
                        <CardShirt />
                      </li>
                    ))}

                  {!isLoading
                    && allMedia.map((media) => (
                      <li key={media.id}>
                        <MediaCard
                          media={media}
                          layout={layout}
                          blockOptions={{
                            poster: { flags: { showFlags: false } },
                            hover: { flags: { showFlags: false } },
                            body: { flags: { showFlags: false } },
                          }}
                          mode="add-collection"
                        />
                      </li>
                    ))}

                  {isFetchingNextPage
                    && Array.from({ length: 10 }).map((_, i) => (
                      <li key={`card-shirt-next-${i}`}>
                        <CardShirt />
                      </li>
                    ))}
                </ul>

                <div ref={ref} className="h-px w-full" />
              </div>
            }
          </div>
        </div>

        <DrawerFooter className="shrink-0 border-t border-border/40 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
          <Link
            href="/catalog"
            onClick={() => setOpen(false)}
            className="group flex items-center justify-center gap-0.5"
          >
            <p className="text-center text-sm text-muted transition-all group-hover:text-muted/70">
              {t("more")}
            </p>
            <ChevronRight className="size-5 translate-y-px text-muted transition-all group-hover:text-muted/70" />
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
