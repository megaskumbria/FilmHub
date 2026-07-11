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
import { useCollection, useDeleteMediaFromCollection, useGetMediaCollection } from "@/shared/hooks";
import { FloatingEditBar } from "@/features";
import { Skeleton } from "@/shared/ui";

interface Props {
  userId: string;
  hasCollections: boolean;
}

export const MyCollectionsClient = ({ userId, hasCollections }: Props) => {
  const { data: collections, isLoading } = useCollection(userId);
  const firstCollectionId = collections?.[0]?.id ?? "";
  const [activeCollectionId, setActiveCollectionId] = useState(firstCollectionId);

  const { layout, blockOptions } = useMovieCardLayout();

  const { data: movies } = useGetMediaCollection(activeCollectionId);
  const { mutate: deleteMediaFromCollection, isPending: isDeleting } =
    useDeleteMediaFromCollection();

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [hasAnyCollections, setHasAnyCollections] = useState(hasCollections);

  const totalCountsMedia = movies?.length ?? 0;
  const isAllSelected = selectedIds.size === totalCountsMedia && totalCountsMedia > 0;

  const handleToggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  useEffect(() => {
    if (!collections) return;

    if (collections.length === 0) {
      setHasAnyCollections(false);
      return;
    }

    setHasAnyCollections(true);

    const stillExists = collections.some((c) => c.id === activeCollectionId);

    if (!activeCollectionId || !stillExists) setActiveCollectionId(collections[0].id);
  }, [collections]);

  useEffect(() => {
    if (!isEditMode) {
      const timer = setTimeout(() => {
        setSelectedIds(new Set());
      }, 300);

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
      setSelectedIds(new Set(movies?.map((m) => m.id) ?? []));
    }
  };

  const handleDeleteMedia = () => {
    deleteMediaFromCollection({
      mediaIds: Array.from(selectedIds),
      collectionId: activeCollectionId,
    });
    setSelectedIds(new Set());
  };

  const isMediaEmpty = movies?.length === 0 && collections?.length !== 0;
  // const hasAnyCollections = hasCollections || (collections?.length ?? 0) > 0;

  return (
    <div className="max-w-[1640px] min-h-screen w-full mx-auto px-6 pt-20 pb-16">
      <ProfileHeader isMyProfile={true} />

      <UserCollections
        isMyProfile={true}
        setActiveCollectionId={setActiveCollectionId}
        activeCollectionId={activeCollectionId}
        userId={userId}
        hasCollections={hasAnyCollections}
      />

      {hasAnyCollections && (
        <CollectionsToolbar
          isMyProfile={true}
          activeCollectionId={activeCollectionId}
          userId={userId}
          isEditMode={isEditMode}
          onToggleEditMode={handleToggleEditMode}
          isLoading={isLoading}
        />
      )}

      {hasAnyCollections
        && (isMediaEmpty ?
          <EmptyStateCollectionFilms />
        : <ul className="grid grid-cols-5 gap-2 justify-items-center">
            {isLoading ?
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={`skeleton-${i}`}
                  className="w-full border border-border aspect-2/3 rounded-xl"
                />
              ))
            : movies?.map((movie) => (
                <li key={movie.id}>
                  <MediaCard
                    cardWidth={310}
                    media={movie}
                    layout={layout}
                    blockOptions={blockOptions}
                    mode={isEditMode ? "edit-collection" : "add-flag"}
                    onCheckedChange={handleCheckedChange}
                    isChecked={selectedIds.has(movie.id)}
                  />
                </li>
              ))
            }
          </ul>)}

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
