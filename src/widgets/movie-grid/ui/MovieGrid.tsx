"use client";

import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";
import { MediaCard } from "@/widgets";
import { IMedia, IMediaData, useMediaCatalog } from "@/shared/model/stores/movie-catalog";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useIntersectionObserver } from "@/shared/hooks";
import { API_URL } from "@/shared/constants/constants";

interface Props {
  initialMedia: IMedia[];
}

export const MovieGrid = ({ initialMedia }: Props) => {
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const { activeType, mediaData, setMediaData } = useMediaCatalog();
  const allMedia = mediaData?.media ?? [];

  const { layout } = useMovieCardLayout();

  useEffect(() => {
    setMediaData({
      page: 1,
      total_pages: 1,
      media: initialMedia,
    });
  }, []);

  const loadMore = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    const response = await axios.get<IMediaData>(
      `${API_URL}/media?type=${activeType}&page=${page}`,
    );

    const newMediaData = response.data.media;

    setMediaData((prev) => {
      if (!prev) return prev;

      const seen = new Set(prev.media.map((m) => m.id));
      const filteredMedia = newMediaData.filter((m) => !seen.has(m.id));

      return {
        ...prev,
        media: [...prev.media, ...filteredMedia],
      };
    });
    setPage((page) => page + 1);

    setLoading(false);
  }, [loading, page, activeType]);

  const ref = useIntersectionObserver(() => void loadMore(), {
    rootMargin: "200px",
  });

  return (
    <>
      <ul className="grid grid-cols-5 gap-4">
        {allMedia.map((movie) => {
          const { id } = movie;

          return (
            <li key={id}>
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
          );
        })}
      </ul>

      <div ref={ref} style={{ height: 1 }} />

      {loading && <p className="text-center text-base text-muted">Loading...</p>}
    </>
  );
};
