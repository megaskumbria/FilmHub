"use client";

import { collectionsFeedQuery } from "@/shared/hooks";
import { FilterPopover } from "@/widgets";
import { useQuery } from "@tanstack/react-query";
import { CollectionDeck } from "@/entities";

export const HomeClient = () => {
  const { data: collectionsFeed } = useQuery(collectionsFeedQuery);

  return (
    <main className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      {/* <BestCollectionsSlider /> */}

      <section className="flex items-center justify-between mb-8 bg-surface rounded-lg p-4 border border-border">
        <span className="text-base font-semibold text-primary">
          Collections: <span className="text-lg">121</span>
        </span>

        <FilterPopover />
      </section>

      <div className="grid grid-cols-5 gap-x-4 gap-y-12 justify-items-center">
        {collectionsFeed?.map((collection) => (
          <CollectionDeck key={collection.id} collection={collection} />
        ))}
      </div>
    </main>
  );
};
