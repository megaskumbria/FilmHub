"use client";

import { mockMovies } from "@/shared/model/movies";
import Link from "next/link";
import { MovieCard } from "@/widgets/movie-card";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";
import { MovieCatalogToolbar } from "@/widgets";

export default function MovieSearchPage() {
  const { layout } = useMovieCardLayout();

  return (
    <div className="max-w-[1640px] w-full mx-auto p-4 pt-16">
      <MovieCatalogToolbar />

      <ul className="grid grid-cols-5 gap-4">
        {mockMovies.map((movie) => {
          const { id } = movie;

          return (
            <Link href={`/movies/${id}`} key={id}>
              <MovieCard
                movie={movie}
                layout={layout}
                blockOptions={{
                  poster: { flags: { showFlags: false } },
                  hover: { flags: { showFlags: false } },
                  body: { flags: { showFlags: false } },
                }}
              />
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
