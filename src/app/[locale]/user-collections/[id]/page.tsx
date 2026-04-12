"use client";

import { mockMovies } from "@/shared/model/movies";
import { CollectionsToolbar, MediaCard, ProfileHeader } from "@/widgets";
import { UserCollections } from "@/widgets/user-collections";
import { useState } from "react";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";

export default function UserCollectionPage() {
  const [activeFolder, setActiveFolder] = useState(0);
  const { layout, blockOptions } = useMovieCardLayout();

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      {/* <UserProfileHeader /> */}
      <ProfileHeader isMyProfile={false} />

      <UserCollections
        isMyProfile={false}
        setActiveFolder={setActiveFolder}
        activeFolder={activeFolder}
      />

      <CollectionsToolbar isMyProfile={false} activeFolder={activeFolder} />

      <ul className="grid grid-cols-5 gap-2 justify-items-center">
        {mockMovies.map((movie) => (
          <li key={movie.id}>
            <MediaCard
              cardWidth={310}
              movie={movie}
              layout={layout}
              blockOptions={blockOptions}
              mode="add-collection"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
