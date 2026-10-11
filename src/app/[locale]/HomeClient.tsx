"use client";

import { useTranslations } from "next-intl";
import { collectionsFeedQuery, useDebounce } from "@/shared/hooks";
import { FilterFeed } from "@/widgets";
import { useQuery } from "@tanstack/react-query";
import { CollectionDeck } from "@/entities";
import { useCollectionsFeedStore } from "@/features/feed-filter";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState } from "react";

export const HomeClient = () => {
  const t = useTranslations("home");
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { genreId, sort, quantity } = useCollectionsFeedStore();
  const { data: collectionsFeed } = useQuery(
    collectionsFeedQuery({ genreId, sort, quantity, searchQuery: debouncedSearchQuery }),
  );

  const collectionsCount = collectionsFeed?.length;

  console.log("collectionsFeed", collectionsFeed);

  return (
    <main className="max-w-410 w-full mx-auto px-6 pt-20 pb-16">
      {/* <BestCollectionsSlider /> */}

      <section className="flex flex-col gap-5 mb-10">
        <h1 className="font-serif text-5xl font-bold text-primary tracking-tight">{t("title")}</h1>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <p className="text-sm text-muted shrink-0">
              {t("collections", { count: collectionsCount ?? 0 })}
            </p>

            <InputGroup className="max-w-82 w-full h-9 rounded-full bg-surface border border-border shadow-sm hover:border-zinc-muted/60 focus-within:bg-surface-elevated transition-all duration-200">
              <InputGroupAddon>
                <Search className="size-4 text-zinc-light" />
              </InputGroupAddon>

              <InputGroupInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search")}
                className="placeholder:text-muted text-foreground"
              />

              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    key="clear-search"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-2"
                  >
                    <InputGroupButton
                      size="icon-xs"
                      className="size-5 rounded-full bg-muted/20 hover:bg-accent/20 flex items-center justify-center"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="size-3.5 text-muted " />
                    </InputGroupButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </InputGroup>
          </div>

          <FilterFeed />
        </div>
      </section>

      <div className="grid grid-cols-5 gap-x-4 gap-y-12 justify-items-center">
        {collectionsFeed?.map((collection) => (
          <CollectionDeck key={collection.id} collection={collection} />
        ))}
      </div>
    </main>
  );
};
