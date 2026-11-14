"use client";

import { useTranslations } from "next-intl";
import { collectionsFeedQuery, useDebounce } from "@/shared/hooks";
import { FilterFeed } from "@/widgets";
import { useQuery } from "@tanstack/react-query";
import { CollectionDeck } from "@/entities";
import { useCollectionsFeedStore } from "@/features/feed-filter";
import { Button, Input } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRef, useState } from "react";

export const HomeClient = () => {
  const t = useTranslations("home");
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { genreId, sort, quantity } = useCollectionsFeedStore();
  const { data: collectionsFeed } = useQuery(
    collectionsFeedQuery({ genreId, sort, quantity, searchQuery: debouncedSearchQuery }),
  );

  const collectionsCount = collectionsFeed?.length;

  return (
    <main className="max-w-410 w-full mx-auto px-6 pt-20 pb-16">
      {/* <BestCollectionsSlider /> */}

      <section className="flex flex-col gap-5 mb-10">
        <h1 className="font-serif text-5xl font-bold text-primary tracking-tight">{t("title")}</h1>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <search className="group/search relative w-full max-w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-muted transition-colors pointer-events-none group-focus-within/search:text-accent" />

              <Input
                ref={inputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && e.currentTarget.blur()}
                placeholder={t("search")}
                variant="search"
              />

              <AnimatePresence initial={false} mode="wait">
                {searchQuery && (
                  <motion.div
                    key="clear-search"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        inputRef.current?.focus();
                      }}
                      className="group size-6 rounded-full bg-muted/15 hover:bg-accent/20 transition-colors"
                    >
                      <X className="size-3.5 text-muted group-hover:text-accent transition-colors" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </search>

            <p className="flex items-end gap-2.5 shrink-0">
              <span className="font-unbounded text-3xl font-semibold tabular-nums tracking-tight leading-none text-foreground">
                {collectionsCount ?? 0}
              </span>

              <span className="text-lg text-zinc-light leading-6">
                {t("collections", { count: collectionsCount ?? 0 })}
              </span>
            </p>
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
