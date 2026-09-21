"use client";

import { useEffect } from "react";
import { useState } from "react";
import { type Media } from "@/shared/stores/movie-catalog";
import { useDeleteMediaFromCollection } from "@/shared/hooks";

interface Args {
  mediaItems: Media[];
  activeCollectionId: string;
  isMyProfile: boolean;
}

export const useCollectionEdit = ({ mediaItems, activeCollectionId, isMyProfile }: Args) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set<number>());

  const { mutate: deleteMedia, isPending: isDeleting } = useDeleteMediaFromCollection();

  const totalCountsMedia = mediaItems.length;
  const isAllSelected = selectedIds.size === totalCountsMedia && totalCountsMedia > 0;

  const mode =
    !isMyProfile ? "add-collection"
    : isEditMode ? "edit-collection"
    : "add-flag";

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      if (prev) {
        setTimeout(() => setSelectedIds(new Set()), 300);
      }
      return !prev;
    });
  };

  useEffect(() => setSelectedIds(new Set()), [activeCollectionId]);

  const handleCheckedChange = (id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const handleSelectAllMedia = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
      return;
    }
    setSelectedIds(new Set(mediaItems.map((m) => m.id)));
  };

  const handleDeleteMedia = () => {
    deleteMedia({
      mediaIds: [...selectedIds],
      collectionId: activeCollectionId,
    });
    setSelectedIds(new Set());
  };

  return {
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
  };
};
