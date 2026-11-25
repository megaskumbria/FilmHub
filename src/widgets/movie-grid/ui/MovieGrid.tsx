"use client";

import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { useEffect } from "react";
import { MediaCard } from "@/widgets";
import { CardShirt } from "@/shared/ui";
import { useMediaCatalog } from "@/shared/stores/movie-catalog";
import { infiniteMediaQueryOptions, useIntersectionObserver } from "@/shared/hooks";
import { useFilterMedia } from "@/features";
import { extractUniqueMedia } from "@/shared/lib";
import { useInfiniteQuery } from "@tanstack/react-query";
import { EmptyStateCatalog } from "@/widgets/empty-state-catalog";

const mediaGridClassName =
  "grid grid-cols-2 gap-3 xs:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5";

export const MovieGrid = () => {
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

  useEffect(() => setFrozenFilterCountry(searchQuery.length > 0), [searchQuery]);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    infiniteMediaQueryOptions({
      category,
      searchQuery,
      selectedGenre: String(selectedGenre.id),
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
      <ul className={mediaGridClassName}>
        {Array.from({ length: 10 }).map((_, i) => (
          <CardShirt key={i} />
        ))}
      </ul>
    );
  }

  return (
    <>
      {allMedia.length === 0 ?
        <EmptyStateCatalog />
      : <ul className={mediaGridClassName}>
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
            && Array.from({ length: 10 }).map((_, i) => <CardShirt key={`card-shirt-${i}`} />)}
        </ul>
      }

      <div ref={ref} style={{ height: 1 }} />
    </>
  );
};
