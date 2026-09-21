"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  collectionQueryOptions,
  collectionMediaQueryOptions,
  useRecordCollectionView,
} from "@/shared/hooks";

interface Args {
  userId: string;
  isMyProfile: boolean;
  collectionId: string;
}

export const useCollectionMedia = ({ userId, isMyProfile, collectionId }: Args) => {
  const [activeCollectionId, setActiveCollectionId] = useState(collectionId);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: collections = [], isLoading } = useQuery(
    collectionQueryOptions({ userId, isMyCollection: isMyProfile }),
  );

  const resolvedId =
    collections.some((c) => c.id === activeCollectionId) ? activeCollectionId : (
      (collections[0]?.id ?? "")
    );

  const { data: mediaItems = [], isLoading: isLoadingMediaItems } = useQuery(
    collectionMediaQueryOptions({
      collectionId: resolvedId,
      userId,
      searchQuery: debouncedSearchTerm,
    }),
  );

  const { mutate: recordCollectionView } = useRecordCollectionView();

  useEffect(() => {
    if (!resolvedId) return;
    recordCollectionView(resolvedId);
  }, [resolvedId]);

  const hasCollectionItems = collections.length > 0;

  return {
    collections,
    mediaItems,
    isLoading,
    isLoadingMedia: isLoadingMediaItems || isLoading,
    hasCollectionItems,
    isMediaEmpty: mediaItems.length === 0 && hasCollectionItems,
    activeCollectionId: resolvedId,
    setActiveCollectionId,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
  };
};
