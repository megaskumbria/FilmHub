"use client";

import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { CollectionsToolbar, MediaCard, ProfileHeader, UserCollections } from "@/widgets";
import { useQuery } from "@tanstack/react-query";
import { useUserCollectionMediaQuery, useUserCollectionsQuery } from "@/shared/hooks";
import { useState } from "react";

interface Props {
  userId: string;
  collectionId: string;
}

export const UserCollectionsClient = ({ userId, collectionId }: Props) => {
  const { data: collections, isPending } = useQuery(useUserCollectionsQuery(userId));
  const [activeCollectionId, setActiveCollectionId] = useState(collectionId);

  const { data: collectionItems } = useQuery(
    useUserCollectionMediaQuery(activeCollectionId, userId),
  );

  // const [hasCollectionItems, setHasCollectionItems] = useState(false);

  const { layout, blockOptions } = useMovieCardLayout();

  const hasCollections = (collections?.length ?? 0) > 0;

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      {/* <UserProfileHeader /> */}
      <ProfileHeader isMyProfile={false} />

      <UserCollections
        isMyProfile={false}
        collections={collections ?? []}
        isPending={isPending}
        setActiveCollectionId={setActiveCollectionId}
        activeCollectionId={activeCollectionId}
        hasCollections={hasCollections}
      />

      <CollectionsToolbar
        isMyProfile={false}
        activeCollectionId={activeCollectionId}
        isLoading={isPending}
        collections={collections ?? []}
      />

      <ul className="grid grid-cols-5 gap-2 justify-items-center">
        {collectionItems?.map((item) => (
          <li key={item.id}>
            <MediaCard
              cardWidth={310}
              media={item}
              layout={layout}
              blockOptions={blockOptions}
              mode="add-collection"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
