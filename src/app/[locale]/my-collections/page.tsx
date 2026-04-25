"use client";

import { useState } from "react";
import { MediaCard, CollectionsToolbar, UserCollections, ProfileHeader } from "@/widgets";
import { mockMovies } from "@/shared/model/movies";
import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";

export default function AuthorDashboardPage() {
  const [activeFolder, setActiveFolder] = useState(0);

  const { layout, blockOptions } = useMovieCardLayout();

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <ProfileHeader isMyProfile={true} />

      <UserCollections
        isMyProfile={true}
        setActiveFolder={setActiveFolder}
        activeFolder={activeFolder}
      />

      <CollectionsToolbar isMyProfile={true} activeFolder={activeFolder} />

      <ul className="grid grid-cols-5 gap-2 justify-items-center">
        {mockMovies.map((movie) => (
          <li key={movie.id}>
            <MediaCard
              cardWidth={310}
              movie={movie}
              layout={layout}
              blockOptions={blockOptions}
              mode="add-flag"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
