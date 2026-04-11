"use client";

import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";
import { MovieCard } from "@/widgets";
import { IMovie, IMovieData } from "@/app/[locale]/movie-search/page";
import { useCallback, useState } from "react";
import axios from "axios";
import { useIntersectionObserver } from "@/shared/hooks";
import { API_URL } from "@/shared/constants/constants";

interface Props {
  initialMovies: IMovie[];
}

export const MovieGrid = ({ initialMovies }: Props) => {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const { layout } = useMovieCardLayout();

  const loadMore = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    const response = await axios.get<IMovieData>(`${API_URL}/movies?page=${page}`);
    // console.log(response.data);
    // console.log(response.data.movies.forEach((m) => console.log(m.poster_url)));
    // И проверить все URL-ы на корректность формата:
    // console.log(response.data.movies.filter((m) => !m.poster_url.startsWith("https://")));
    // console.log(response.data.movies.filter((m) => !m.poster_url)); // []

    setMovies((prev) => [...prev, ...response.data.movies]);
    setPage((p) => p + 1);

    setLoading(false);
  }, [loading, page]);

  const ref = useIntersectionObserver(() => void loadMore(), {
    rootMargin: "200px",
  });

  return (
    <>
      <ul className="grid grid-cols-5 gap-4">
        {movies.map((movie) => {
          const { id } = movie;

          return (
            <li key={id}>
              <MovieCard
                movie={movie}
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
