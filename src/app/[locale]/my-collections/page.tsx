"use client";

import { useState } from "react";
import { MovieCard, CollectionsToolbar, UserCollections, ProfileHeader } from "@/widgets";
import { mockMovies } from "@/shared/model/movies";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";

export default function AuthorDashboardPage() {
  const [activeFolder, setActiveFolder] = useState(0);

  const { layout, blockOptions } = useMovieCardLayout();

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16 space-y-8">
      <ProfileHeader />

      <UserCollections setActiveFolder={setActiveFolder} activeFolder={activeFolder} />

      <CollectionsToolbar activeFolder={activeFolder} />

      <ul className="grid grid-cols-5 gap-4">
        {mockMovies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} layout={layout} blockOptions={blockOptions} mode="add-flag" />
          </li>
        ))}
      </ul>
    </div>
  );
}
