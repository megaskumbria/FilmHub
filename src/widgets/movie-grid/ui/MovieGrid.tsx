"use client";

import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { useEffect } from "react";
import { MediaCard } from "@/widgets";
import { useMediaCatalog } from "@/shared/stores/movie-catalog";
import { infiniteMediaQueryOptions, useIntersectionObserver } from "@/shared/hooks";
import { Skeleton } from "@/shared/ui";
import { useFilterMedia } from "@/features";
import { extractUniqueMedia } from "@/shared/lib";
import { useTranslations } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";

export const MovieGrid = () => {
  const t = useTranslations("catalog");

  const {
    selectedGenre,
    selectedSort,
    selectedYear,
    selectedCountry,
    searchQuery,
    setFrozenFilterCountry,
  } = useFilterMedia();
  const { category } = useMediaCatalog();
  const { layout } = useMovieCardLayout();

  useEffect(() => {
    setFrozenFilterCountry(searchQuery.length > 0);
  }, [searchQuery]);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    infiniteMediaQueryOptions({
      category,
      searchQuery,
      selectedGenre: selectedGenre.id,
      selectedSort,
      selectedYear,
      selectedCountry: searchQuery.length > 0 ? "" : selectedCountry.iso31661,
    }),
  );

  const ref = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
    { rootMargin: "500px" },
  );

  const allMedia = extractUniqueMedia(data);

  if (isLoading) {
    return (
      <ul className="grid grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="w-full border border-border aspect-2/3 rounded-xl" />
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-5 gap-4">
        {allMedia.map((media) => (
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
            <Skeleton
              key={`skeleton-${i}`}
              className="w-full border border-border aspect-2/3 rounded-xl"
            />
          ))}
      </ul>

      {allMedia.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-center text-sm text-muted">{t("empty")}</p>
        </div>
      )}

      <div ref={ref} style={{ height: 1 }} />
    </>
  );
};
