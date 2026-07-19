"use client";

import { useEffect, useState } from "react";
import {
  MediaCard,
  CollectionsToolbar,
  UserCollections,
  ProfileHeader,
  EmptyStateCollectionFilms,
} from "@/widgets";
import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import {
  useDeleteMediaFromCollection,
  collectionMediaQueryOptions,
  collectionQueryOptions,
} from "@/shared/hooks";
import { FloatingEditBar } from "@/features";
import { Skeleton } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";

interface Props {
  userId: string;
  isMyCollection: boolean;
  collectionId: string;
}

export const CollectionsClient = ({ userId, isMyCollection, collectionId }: Props) => {
  const { data: collections, isLoading } = useQuery(
    collectionQueryOptions({ userId, isMyCollection }),
  );

  const [activeCollectionId, setActiveCollectionId] = useState(collectionId);
  const { data: mediaItems } = useQuery(
    collectionMediaQueryOptions({ collectionId: activeCollectionId, userId, isMyCollection }),
  );

  const { layout, blockOptions } = useMovieCardLayout();

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [hasCollectionItems, setHasCollectionItems] = useState((collections?.length ?? 0) > 0);

  const { mutate: deleteMediaFromCollection, isPending: isDeleting } =
    useDeleteMediaFromCollection();

  const totalCountsMedia = mediaItems?.length ?? 0;
  const isAllSelected = selectedIds.size === totalCountsMedia && totalCountsMedia > 0;

  const handleToggleEditMode = () => setIsEditMode((prev) => !prev);

  useEffect(() => {
    if (!collections) return;

    if (collections.length === 0) {
      setHasCollectionItems(false);
      return;
    }

    setHasCollectionItems(true);

    const stillExists = collections.some((c) => c.id === activeCollectionId);

    if (!activeCollectionId || !stillExists) setActiveCollectionId(collections[0].id);
  }, [collections]);

  useEffect(() => {
    if (!isEditMode) {
      const timer = setTimeout(() => setSelectedIds(new Set()), 300);
      return () => clearTimeout(timer);
    }
  }, [isEditMode]);

  useEffect(() => setSelectedIds(new Set()), [activeCollectionId]);

  const handleCheckedChange = (id: number, checked: boolean) => {
    setSelectedIds((prevIds) => {
      const nextIds = new Set(prevIds);
      checked ? nextIds.add(id) : nextIds.delete(id);
      return nextIds;
    });
  };

  const handleSelectAllMedia = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(mediaItems?.map((m) => m.id) ?? []));
    }
  };

  const handleDeleteMedia = () => {
    deleteMediaFromCollection({
      mediaIds: Array.from(selectedIds),
      collectionId: activeCollectionId,
    });
    setSelectedIds(new Set());
  };

  const isMediaEmpty = mediaItems?.length === 0 && collections?.length !== 0;

  const mode =
    !isMyCollection ? "add-collection"
    : isEditMode ? "edit-collection"
    : "add-flag";

  return (
    <div className="max-w-[1640px] min-h-screen w-full mx-auto px-6 pt-20 pb-16">
      <ProfileHeader isMyProfile={isMyCollection} />

      <UserCollections
        isMyProfile={isMyCollection}
        setActiveCollectionId={setActiveCollectionId}
        activeCollectionId={activeCollectionId}
        hasCollectionItems={hasCollectionItems}
        collections={collections ?? []}
        isPending={isLoading}
      />

      {hasCollectionItems && (
        <CollectionsToolbar
          isMyProfile={isMyCollection}
          activeCollectionId={activeCollectionId}
          isEditMode={isEditMode}
          onToggleEditMode={handleToggleEditMode}
          isLoading={isLoading}
          collections={collections ?? []}
        />
      )}

      {isMediaEmpty ?
        <EmptyStateCollectionFilms />
      : <ul className="grid grid-cols-5 gap-2 justify-items-center">
          {isLoading ?
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={`skeleton-${i}`}
                className="w-full border border-border aspect-2/3 rounded-xl"
              />
            ))
          : mediaItems?.map((media) => (
              <li key={media.id}>
                <MediaCard
                  cardWidth={310}
                  media={media}
                  layout={layout}
                  blockOptions={blockOptions}
                  mode={mode}
                  onCheckedChange={handleCheckedChange}
                  isChecked={selectedIds.has(media.id)}
                />
              </li>
            ))
          }
        </ul>
      }

      <FloatingEditBar
        isEditMode={isEditMode}
        selectedCountsMedia={selectedIds.size}
        totalCountsMedia={totalCountsMedia}
        isAllSelected={isAllSelected}
        onSelectAll={handleSelectAllMedia}
        onDelete={handleDeleteMedia}
        isDeleting={isDeleting}
      />
    </div>
  );
};
