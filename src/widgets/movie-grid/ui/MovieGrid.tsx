"use client";

import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { MediaCard } from "@/widgets";
import { useMediaCatalog } from "@/shared/stores/movie-catalog";
import { useInfiniteMedia, useIntersectionObserver } from "@/shared/hooks";
import { Skeleton } from "@/shared/ui";
import { useFilterMedia } from "@/shared/stores/filter-media-store";

export const MovieGrid = () => {
  const { category, searchQuery } = useMediaCatalog();
  const { selectedGenre } = useFilterMedia();
  const { layout } = useMovieCardLayout();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteMedia(
    searchQuery,
    category,
    selectedGenre.id,
  );

  const ref = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
    { rootMargin: "200px" },
  );

  const allMediaRaw = data?.pages.flatMap((page) => page.media) ?? [];
  const allMedia = Array.from(new Map(allMediaRaw.map((m) => [m.id, m])).values());

  // console.log("allMediaRaw", allMediaRaw);
  // console.log("allMedia", allMedia);

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
        {allMedia.map((movie) => (
          <li key={movie.id}>
            <MediaCard
              media={movie}
              layout={layout}
              blockOptions={{
                poster: { flags: { showFlags: false } },
                hover: { flags: { showFlags: false } },
                body: { flags: { showFlags: false } },
              }}
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

      <div ref={ref} style={{ height: 1 }} />
    </>
  );
};
