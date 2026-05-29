"use client";

import { useState } from "react";
import {
  MediaCard,
  CollectionsToolbar,
  UserCollections,
  ProfileHeader,
  EmptyStateCollectionFilms,
  FloatingEditBar,
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const { layout, blockOptions } = useMovieCardLayout();
  const { data: movies } = useGetMediaCollection(activeCollectionId);

  const isShowToolbar = !isPending && collections && collections.length > 0;
  const totalCount = movies?.length ?? 0;
  const isAllSelected = selectedIds.size === totalCount && totalCount > 0;

  const handleEditModeChange = (value: boolean) => {
    setIsEditMode(value);
    if (!value) setSelectedIds(new Set());
  };

  const handleCheckedChange = (id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(movies?.map((m) => m.id) ?? []));
    }
  };

  const handleDelete = () => {
    // TODO: implement delete logic
  };

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <ProfileHeader isMyProfile={true} />

      <UserCollections
        isMyProfile={true}
        setActiveCollectionId={setActiveCollectionId}
        activeCollectionId={activeCollectionId}
        userId={userId}
      />

      {isShowToolbar && (
        <CollectionsToolbar
          isMyProfile={true}
          activeCollectionId={activeCollectionId}
          userId={userId}
          isEditMode={isEditMode}
          onEditModeChange={handleEditModeChange}
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
                mode={isEditMode ? "edit-collection" : undefined}
                isChecked={selectedIds.has(movie.id)}
                onCheckedChange={handleCheckedChange}
              />
            </li>
          ))}
        </ul>
      }

      <FloatingEditBar
        isVisible={isEditMode}
        selectedCount={selectedIds.size}
        totalCount={totalCount}
        isAllSelected={isAllSelected}
        onSelectAll={handleSelectAll}
        onDelete={handleDelete}
      />
    </div>
  );
};
