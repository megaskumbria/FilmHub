"use client";

import {
  MediaCard,
  CollectionsToolbar,
  UserCollections,
  ProfileHeader,
  EmptyStateCollectionFilms,
  MediaCardSkeleton,
} from "@/widgets";
import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { FloatingEditBar } from "@/features";
import { useAuthStore } from "@/features/auth";
import { useCollectionMedia, useCollectionEdit } from "@/widgets/user-collections";

interface Props {
  userId: string;
  isMyCollection: boolean;
  collectionId: string;
}

export const CollectionsClient = ({ userId, isMyCollection, collectionId }: Props) => {
  const { user, hasHydrated } = useAuthStore();
  const isMyProfile = hasHydrated ? user.id === userId : isMyCollection;

  const { layout, blockOptions } = useMovieCardLayout();

  const {
    collections,
    mediaItems,
    isLoading,
    isLoadingMedia,
    hasCollectionItems,
    isMediaEmpty,
    activeCollectionId,
    setActiveCollectionId,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
  } = useCollectionMedia({ userId, isMyProfile, collectionId });

  const {
    isEditMode,
    selectedIds,
    isAllSelected,
    totalCountsMedia,
    isDeleting,
    mode,
    toggleEditMode,
    handleCheckedChange,
    handleSelectAllMedia,
    handleDeleteMedia,
  } = useCollectionEdit({
    mediaItems,
    activeCollectionId,
    isMyProfile,
  });

  console.log(mediaItems);

  return (
    <div className="max-w-410 min-h-screen w-full mx-auto px-6 pt-20 pb-16">
      <ProfileHeader isMyProfile={isMyProfile} userId={userId} />

      <UserCollections
        isMyProfile={isMyProfile}
        userId={userId}
        setActiveCollectionId={setActiveCollectionId}
        activeCollectionId={activeCollectionId}
        hasCollectionItems={hasCollectionItems}
        collections={collections}
        isPending={isLoading}
      />

      {hasCollectionItems && (
        <CollectionsToolbar
          isMyProfile={isMyProfile}
          userId={userId}
          activeCollectionId={activeCollectionId}
          isEditMode={isEditMode}
          onToggleEditMode={toggleEditMode}
          isLoading={isLoading}
          collections={collections}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      {isMediaEmpty ?
        <EmptyStateCollectionFilms isMyProfile={isMyProfile} searchQuery={debouncedSearchTerm} />
      : <ul className="grid grid-cols-5 gap-2 justify-items-center">
          {isLoadingMedia ?
            Array.from({ length: 5 }).map((_, i) => <MediaCardSkeleton key={`skeleton-${i}`} />)
          : mediaItems.map((media) => (
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
