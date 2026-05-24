"use client";

import { Button, Input } from "@/shared/ui";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/features/auth/model/auth.store";
import { useAddMediaToCollection, useCollection } from "@/shared/hooks";
import { CollectionCompactCard } from "@/entities";

interface Props {
  mediaId: number;
}

export const AddMovieCollection = ({ mediaId }: Props) => {
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

  const { data: collections } = useCollection(userId);
  const { mutate: addMediaToCollection } = useAddMediaToCollection();

  const filteredCollections = collections?.filter((collection) =>
    collection.collectionName.toLowerCase().includes(collectionSearch.toLowerCase()),
  );

  const handleAddMediaToCollection = () => {
    const collectionId = selectedCollections.values().next().value;
    if (!collectionId) return;
    addMediaToCollection({ collectionId, mediaId });
  };

  return (
    <div className="flex flex-col w-80">
      <header className="flex items-center justify-between px-3.5 py-3 border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
        <div className="flex items-center gap-2.5">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
          <span className="text-sm font-semibold text-foreground tracking-wide">Collections</span>
        </div>

        {selectedCollections.size > 0 && (
          <span className="text-xs text-zinc-muted">{selectedCollections.size} selected</span>
        )}
      </header>

      <nav className="p-2.5">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-muted pointer-events-none" />
          <Input
            variant="neutral"
            placeholder="Search collections..."
            className="pl-7 pr-2 text-sm h-9"
            value={collectionSearch}
            onChange={(e) => setCollectionSearch(e.target.value)}
          />
        </div>
      </nav>

      <div className="overflow-y-auto max-h-80 px-2 pb-2 drawer-scroll flex flex-col gap-2">
        {filteredCollections?.length === 0 ?
          <div className="py-6 text-center text-xs text-zinc-muted">No collections found</div>
        : filteredCollections?.map((collection) => (
            <CollectionCompactCard
              key={collection.id}
              collection={collection}
              isSelected={selectedCollections.has(collection.id)}
              toggleCollection={toggleCollection}
            />
          ))
        }
      </div>

      <footer className="px-3 py-2.5 border-t border-border/40 flex items-center justify-between">
        <Link
          href="/my-collections"
          className="flex items-center gap-1.5 text-zinc-muted hover:text-foreground transition-colors"
        >
          <Plus className="size-3.5 shrink-0" />
          <span className="text-sm">New collection</span>
        </Link>

        <Button
          disabled={selectedCollections.size === 0}
          className="h-8 px-4 text-sm rounded-lg bg-accent hover:bg-accent/90 text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
          onClick={handleAddMediaToCollection}
        >
          <span>Add{selectedCollections.size > 0 ? ` (${selectedCollections.size})` : ""}</span>
        </Button>
      </footer>
    </div>
  );
};
