"use client";

import { useState } from "react";
import { MediaCard, CollectionsToolbar, UserCollections, ProfileHeader } from "@/widgets";
import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { useCollection, useGetMediaCollection } from "@/shared/hooks";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

interface Props {
  userId: string;
}

export const MyCollectionsClient = ({ userId }: Props) => {
  const { data: collections, isPending } = useCollection(userId);
  const firstCollectionId = collections?.[0]?.id ?? "";

  const [activeCollectionId, setActiveCollectionId] = useState(firstCollectionId);

  const { layout, blockOptions } = useMovieCardLayout();
  const { data: movies } = useGetMediaCollection(activeCollectionId);
  const locale = useLocale();

  // console.log({ activeCollectionId, movies });

  // console.log(movies);

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <ProfileHeader isMyProfile={true} />

      <UserCollections
        isMyProfile={true}
        setActiveCollectionId={setActiveCollectionId}
        activeCollectionId={activeCollectionId}
        userId={userId}
      />

      {!isPending && collections && collections.length > 0 && (
        <CollectionsToolbar
          isMyProfile={true}
          activeCollectionId={activeCollectionId}
          userId={userId}
        />
      )}

      {movies?.length === 0 ?
        <div className="w-full flex flex-col items-center justify-center gap-8 h-80">
          <div className="relative w-full max-w-2xl flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#121214] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#121214] to-transparent z-10 pointer-events-none" />

            <div className="w-full flex items-center h-14 bg-surface border-y border-border/50 overflow-hidden">
              <div className="flex items-center gap-2 px-3 shrink-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-5 rounded-sm bg-background border border-border/40"
                  />
                ))}
              </div>

              <div className="flex-1 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-border/30" />
                <p className="text-sm text-muted/60 tracking-widest uppercase whitespace-nowrap select-none">
                  no films added
                </p>
                <div className="h-px flex-1 bg-border/30" />
              </div>

              <div className="flex items-center gap-2 px-3 shrink-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-5 rounded-sm bg-background border border-border/40"
                  />
                ))}
              </div>
            </div>
          </div>

          <Link
            href={`/${locale}/movie-search`}
            className="group flex items-center gap-2 text-sm text-muted/50 hover:text-muted transition-colors duration-200"
          >
            <span className="underline underline-offset-4 decoration-muted/20 group-hover:decoration-muted/50 transition-colors duration-200">
              Browse the catalogue to find something to add
            </span>
            <ArrowRight className="size-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform duration-200" />
          </Link>
        </div>
      : <ul className="grid grid-cols-5 gap-2 justify-items-center">
          {movies?.map((movie) => (
            <li key={movie.id}>
              <MediaCard
                cardWidth={310}
                media={movie}
                layout={layout}
                blockOptions={blockOptions}
                mode="add-flag"
              />
            </li>
          ))}
        </ul>
      }
    </div>
  );
};
