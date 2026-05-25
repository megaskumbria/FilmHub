"use client";

import { useState } from "react";
import {
  MediaCard,
  CollectionsToolbar,
  UserCollections,
  ProfileHeader,
  EmptyStateCollectionFilms,
} from "@/widgets";
import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { useCollection, useGetMediaCollection } from "@/shared/hooks";

interface Props {
  userId: string;
}

export const MyCollectionsClient = ({ userId }: Props) => {
  const { data: collections, isPending } = useCollection(userId);
  const firstCollectionId = collections?.[0]?.id ?? "";

  const [activeCollectionId, setActiveCollectionId] = useState(firstCollectionId);

  const { layout, blockOptions } = useMovieCardLayout();
  const { data: movies } = useGetMediaCollection(activeCollectionId);

  // console.log({ activeCollectionId, movies });
  // console.log("collections", collections);

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <ProfileHeader isMyProfile={true} />

      <UserCollections
        isMyProfile={true}
        setActiveCollectionId={setActiveCollectionId}
        activeCollectionId={activeCollectionId}
        userId={userId}
      />

      {!isPending && collections && collections.length > 0 && (
        <CollectionsToolbar
          isMyProfile={true}
          activeCollectionId={activeCollectionId}
          userId={userId}
        />
      )}

      {movies?.length === 0 ?
        <EmptyStateCollectionFilms />
      : <ul className="grid grid-cols-5 gap-2 justify-items-center">
          {movies?.map((movie) => (
            <li key={movie.id}>
              <MediaCard
                cardWidth={310}
                media={movie}
                layout={layout}
                blockOptions={blockOptions}
                mode="add-flag"
              />
            </li>
          ))}
        </ul>
      }
    </div>
  );
};
