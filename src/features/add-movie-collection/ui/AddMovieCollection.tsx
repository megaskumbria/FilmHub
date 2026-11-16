"use client";

import { Button, Input } from "@/shared/ui";
import { IconLoader2, IconPlus, IconSearch } from "@tabler/icons-react";
import { CreateCollectionModal } from "@/widgets";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/model/auth.store";
import { useAddMediaToCollection, collectionQueryOptions } from "@/shared/hooks";
import { useQuery } from "@tanstack/react-query";
import { CollectionCompactCard, CollectionCompactCardSkeleton } from "@/entities";
import { MediaType } from "@/shared/stores/movie-catalog";
import { useTranslations } from "next-intl";

const IS_MY_COLLECTION = true;
const SEARCH_VISIBLE_FROM = 5;
const MAX_SELECTED_DOTS = 4;

interface Props {
  mediaId: number;
  mediaType: MediaType;
  popoverOpen: boolean;
}

export const AddMovieCollection = ({ mediaId, mediaType }: Props) => {
  const t = useTranslations("movie.collections");
  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(new Set());
  const [collectionSearch, setCollectionSearch] = useState("");

  const toggleCollection = (id: string) => {
    setSelectedCollections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const { user } = useAuthStore();
  const userId = user?.id ?? "";

  const {
    data: collections,
    isLoading,
    isFetching,
  } = useQuery(collectionQueryOptions({ userId, isMyCollection: IS_MY_COLLECTION, mediaId }));
  const { mutate: addMediaToCollection, isPending } = useAddMediaToCollection();

  const filteredCollections = collections
    ?.filter((collection) =>
      collection.collectionName.toLowerCase().includes(collectionSearch.toLowerCase()),
    )
    .sort((a, b) => Number(a.hasMedia) - Number(b.hasMedia));

  const selectedColors =
    collections?.filter(({ id }) => selectedCollections.has(id)).map(({ colorHex }) => colorHex)
    ?? [];

  const hasCollections = (collections?.length ?? 0) > 0;
  const isSearchVisible = (collections?.length ?? 0) >= SEARCH_VISIBLE_FROM;
  const isAdding = isPending || isFetching;

  const handleAddMediaToCollection = () => {
    const collectionIds = Array.from(selectedCollections);
    if (collectionIds.length === 0) return;
    addMediaToCollection({ collectionIds, mediaId, mediaType });
  };

  useEffect(() => {
    if (!isPending && !isFetching) setSelectedCollections(new Set());
  }, [isPending, isFetching]);

  return (
    <section className="flex w-full min-w-0 flex-col">
      <header className="flex items-baseline justify-between gap-3 px-4 pt-4 pb-3">
        <h2 className="min-w-0 text-[15px] font-semibold text-foreground">{t("title")}</h2>

        {selectedCollections.size > 0 && (
          <span className="shrink-0 text-xs text-zinc-muted tabular-nums">
            {t("selected", { count: selectedCollections.size })}
          </span>
        )}
      </header>

      {isSearchVisible && (
        <search className="px-3 pb-3">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-muted pointer-events-none" />
            <Input
              type="search"
              variant="neutral"
              placeholder={t("search")}
              className="pl-9 pr-3 text-sm h-9"
              value={collectionSearch}
              onChange={(e) => setCollectionSearch(e.target.value)}
            />
          </div>
        </search>
      )}

      <ul className="drawer-scroll flex max-h-[min(21rem,calc(80dvh-11rem))] min-h-0 flex-col gap-1.5 overflow-y-auto overscroll-contain px-3 pb-3">
        {isLoading ?
          Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <CollectionCompactCardSkeleton />
            </li>
          ))
        : !hasCollections ?
          <li className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-white/10 px-6 py-8 text-center">
            <p className="text-sm text-zinc-muted">{t("noCollections")}</p>

            <CreateCollectionModal isEditing={false}>
              <Button type="button" variant="accent" size="sm" className="rounded-lg text-white">
                <IconPlus className="size-4" />
                {t("new")}
              </Button>
            </CreateCollectionModal>
          </li>
        : filteredCollections?.length === 0 ?
          <li className="py-8 text-center text-sm text-zinc-muted">{t("empty")}</li>
        : filteredCollections?.map((collection) => (
            <li key={collection.id}>
              <CollectionCompactCard
                collection={collection}
                isSelected={selectedCollections.has(collection.id)}
                toggleCollection={toggleCollection}
              />
            </li>
          ))
        }
      </ul>

      {hasCollections && (
        <footer className="flex items-center justify-between gap-2 border-t border-border/40 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <CreateCollectionModal isEditing={false}>
            <Button
              size="sm"
              className="min-w-0 overflow-hidden text-sm text-zinc-muted transition-colors hover:text-foreground"
            >
              <IconPlus className="size-4 shrink-0" />
              <span className="truncate">{t("new")}</span>
            </Button>
          </CreateCollectionModal>

          <Button
            variant="accent"
            size="sm"
            disabled={selectedCollections.size === 0 || isAdding}
            className="shrink-0 rounded-lg px-4 text-sm font-medium text-white disabled:opacity-35"
            onClick={handleAddMediaToCollection}
          >
            {isAdding ?
              <>
                <IconLoader2 className="size-4 animate-spin" />
                {t("adding")}
              </>
            : <>
                {selectedColors.length > 0 && (
                  <span className="flex -space-x-1">
                    {selectedColors.slice(0, MAX_SELECTED_DOTS).map((color, i) => (
                      <span
                        key={i}
                        className="size-2.5 rounded-full ring-2 ring-accent"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </span>
                )}
                {t("add")}
              </>
            }
          </Button>
        </footer>
      )}
    </section>
  );
};
