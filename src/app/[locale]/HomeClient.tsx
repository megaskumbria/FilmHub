"use client";

import { collectionsFeedQuery, useDebounce } from "@/shared/hooks";
import { FilterFeed } from "@/widgets";
import { useQuery } from "@tanstack/react-query";
import { CollectionDeck } from "@/entities";
import { useCollectionsFeedStore } from "@/features/feed-filter";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState } from "react";

export const HomeClient = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { genre, sort, quantity } = useCollectionsFeedStore();
  const { data: collectionsFeed } = useQuery(
    collectionsFeedQuery({ genre, sort, quantity, searchQuery: debouncedSearchQuery }),
  );

  const collectionsCount = collectionsFeed?.length;

  return (
    <main className="max-w-410 w-full mx-auto px-6 pt-20 pb-16">
      {/* <BestCollectionsSlider /> */}

      <section className="flex items-center justify-between gap-4 mb-8 bg-surface rounded-lg p-4 border border-border">
        <span className="text-sm text-muted shrink-0">
          <span className="text-primary font-semibold">{collectionsCount}</span> collections
        </span>

        <InputGroup className="w-full h-9 rounded-sm bg-surface border-border/60 shadow-none focus-within:border-accent/50 transition-colors">
          <InputGroupAddon className="pl-3.5">
            <Search className="size-3.5 text-muted" />
          </InputGroupAddon>

          <InputGroupInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
            className="placeholder:text-muted"
          />

          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setSearchQuery("")}
                className="cursor-pointer absolute right-3 size-5 rounded-full bg-muted/20 hover:bg-accent/20 flex items-center justify-center transition-colors group"
              >
                <X className="size-3.5 text-muted group-hover:text-accent transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>
        </InputGroup>

        <FilterFeed />
      </section>

      <div className="grid grid-cols-5 gap-x-4 gap-y-12 justify-items-center">
        {collectionsFeed?.map((collection) => (
          <CollectionDeck key={collection.id} collection={collection} />
        ))}
      </div>
    </main>
  );
};
