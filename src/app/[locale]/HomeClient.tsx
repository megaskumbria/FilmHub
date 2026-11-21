"use client";

import { useTranslations } from "next-intl";
import { infiniteCollectionsFeedQuery, useDebounce, useIntersectionObserver } from "@/shared/hooks";
import { FilterFeed } from "@/widgets";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CollectionDeck } from "@/entities";
import { useCollectionsFeedStore } from "@/features/feed-filter";
import { CardShirt, Input, SearchClearButton } from "@/shared/ui";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

export const HomeClient = () => {
  const t = useTranslations("home");
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { genreId, sort, quantity } = useCollectionsFeedStore();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    infiniteCollectionsFeedQuery({
      genreId,
      sort,
      quantity,
      searchQuery: debouncedSearchQuery,
      limit: 20,
    }),
  );

  const ref = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
    { rootMargin: "500px" },
  );

  const collections = data?.pages.flatMap((page) => page.items) ?? [];
  const collectionsCount = data?.pages[0]?.total ?? 0;

  return (
    <div className="w-full min-w-0 overflow-clip">
      <main className="mx-auto w-full min-w-0 max-w-410 px-2 pt-20 pb-16 min-[907px]:px-4 min-[1278px]:px-6">
        {/* <BestCollectionsSlider /> */}

        <section className="mb-8 flex min-w-0 flex-col gap-4 sm:mb-10 sm:gap-5">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-5xl">
            {t("title")}
          </h1>

          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <search className="group/search relative w-full min-w-0 sm:w-80 sm:max-w-80 sm:shrink">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-muted transition-colors pointer-events-none group-focus-within/search:text-accent" />

              <Input
                ref={inputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && e.currentTarget.blur()}
                placeholder={t("search")}
                variant="search"
              />

              <SearchClearButton
                show={!!searchQuery}
                onClear={() => {
                  setSearchQuery("");
                  inputRef.current?.focus();
                }}
                size={6}
              />
            </search>

            <div className="flex items-center justify-between gap-3 sm:contents">
              <p className="flex shrink-0 items-end gap-2 sm:gap-2.5">
                <span className="font-unbounded text-2xl font-semibold tabular-nums leading-none tracking-tight text-foreground sm:text-3xl">
                  {collectionsCount}
                </span>

                <span className="text-base leading-5 text-zinc-light sm:text-lg sm:leading-6">
                  {t("collections", { count: collectionsCount })}
                </span>
              </p>

              <div className="shrink-0 sm:ml-auto">
                <FilterFeed />
              </div>
            </div>
          </div>
        </section>

        <div
          className="grid w-full min-w-0 items-start justify-items-center gap-x-2 gap-y-12 lg:gap-x-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 276px), 1fr))" }}
        >
          {isLoading ?
            Array.from({ length: 10 }).map((_, i) => <CardShirt key={i} className="w-55" />)
          : collections.map((collection) => (
              <CollectionDeck key={collection.id} collection={collection} />
            ))
          }

          {isFetchingNextPage
            && Array.from({ length: 10 }).map((_, i) => (
              <CardShirt key={`card-shirt-${i}`} className="w-55" />
            ))}
        </div>

        <div ref={ref} style={{ height: 1 }} />
      </main>
    </div>
  );
};
