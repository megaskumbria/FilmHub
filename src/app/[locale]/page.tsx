"use client";

import { mockMovies } from "@/shared/model/movies";
import { MovieCard } from "@/widgets/movie-card";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";

export default function Home() {
  const { layout, blockOptions } = useMovieCardLayout();

  return (
    <>
      <h1 className="text-center text-2xl font-bold">
        ЭТА СТРАНИЦА БУДЕТ С КОЛЛОДАМИ КОЛЛЕКЦИЙ ЮЗЕРОВ В ДАЛЬНЕЙШЕМ
      </h1>

      <div className="grid grid-cols-4 gap-4 justify-center p-4">
        {mockMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} layout={layout} blockOptions={blockOptions} />
        ))}
      </div>
    </>
  );
}
