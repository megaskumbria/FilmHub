"use client";

import { useState } from "react";
import { MediaCard, CollectionsToolbar, UserCollections, ProfileHeader } from "@/widgets";
import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { useFolders } from "@/shared/hooks";

interface Props {
  userId: string;
}

export const MyCollectionsClient = ({ userId }: Props) => {
  const { data: folders, isPending } = useFolders(userId);
  const firstFolderId = folders?.[0].id ?? "";

  const [activeFolderId, setActiveFolderId] = useState(firstFolderId);

  const { layout, blockOptions } = useMovieCardLayout();

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <ProfileHeader isMyProfile={true} />

      <UserCollections
        isMyProfile={true}
        setActiveFolderId={setActiveFolderId}
        activeFolderId={activeFolderId}
        userId={userId}
      />

      {!isPending && folders && folders.length > 0 && (
        <CollectionsToolbar isMyProfile={true} activeFolderId={activeFolderId} userId={userId} />
      )}

      <ul className="grid grid-cols-5 gap-2 justify-items-center">
        {/* {mockMovies.map((movie) => (
          <li key={movie.id}>
            <MediaCard
              cardWidth={310}
              movie={movie}
              layout={layout}
              blockOptions={blockOptions}
              mode="add-flag"
            />
          </li>
        ))} */}
      </ul>
    </div>
  );
};
