"use client";

import { Button } from "@/shared/ui";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CreateCollectionModal } from "@/widgets";
import { CollectionFolder, FolderSkeleton } from "@/entities";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { cn } from "@/shared/lib/utils";
import { useCollection } from "@/shared/hooks";
import { EmptyStateCollections } from "./EmptyStateCollections";

const sliderNavigationButton = (isVisible: boolean, side: "left" | "right") =>
  cn(
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-10 rounded-full p-0 bg-surface border border-border text-muted hover:text-foreground hover:border-accent/50 hover:bg-surface-elevated shadow-md transition-all duration-200",
    isVisible ?
      `opacity-100 ${side === "left" ? "left-1" : "right-1"}`
    : `opacity-0 ${side === "left" ? "-left-2" : "-right-2"} pointer-events-none`,
  );

interface Props {
  setActiveCollectionId: (collectionId: string) => void;
  activeCollectionId: string;
  isMyProfile: boolean;
  userId: string;
}

export const UserCollections = ({
  isMyProfile,
  setActiveCollectionId,
  activeCollectionId,
  userId,
}: Props) => {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: collections, isPending } = useCollection(userId);

  const handleNext = () => {
    const swiper = swiperRef.current;
    swiper?.slideNext();
  };

  const handlePrev = () => {
    const swiper = swiperRef.current;
    swiper?.slidePrev();
  };

  const collectionsCount = collections?.length ?? 0;

  const isLoop = collectionsCount > 10;
  const isHideButtons = collectionsCount > 5;

  // console.log({ userId, isPending, foldersCount });

  return (
    <>
      {!isPending && collectionsCount === 0 ?
        <EmptyStateCollections />
      : <>
          <div className="flex items-center justify-between mb-5 pt-5">
            <h2 className="text-lg font-semibold text-foreground">My collections</h2>

            {isMyProfile && (
              <CreateCollectionModal isEditing={false}>
                <Button variant="accent" size="sm" className="rounded-lg gap-2">
                  <Plus className="size-4" />
                  <span className="text-sm font-medium">Create</span>
                </Button>
              </CreateCollectionModal>
            )}
          </div>

          {isPending ?
            <div className="flex gap-x-2.5 w-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <FolderSkeleton isMyProfile={isMyProfile} key={index} />
              ))}
            </div>
          : <>
              <div
                onMouseEnter={() => setIsNavigationVisible(true)}
                onMouseLeave={() => setIsNavigationVisible(false)}
              >
                <Swiper
                  key={isLoop ? "loop" : "no-loop"}
                  spaceBetween={0}
                  modules={[Navigation]}
                  loop={isLoop}
                  slidesPerView={5}
                  slidesPerGroup={2}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  className="relative min-h-[220px] h-full [&_.swiper-wrapper]:gap-2.5"
                >
                  {isHideButtons && (
                    <Button
                      onClick={handlePrev}
                      variant="ghost"
                      size="icon"
                      className={sliderNavigationButton(isNavigationVisible, "left")}
                    >
                      <ChevronLeft className="size-5" />
                    </Button>
                  )}

                  {collections?.map((collection) => {
                    const { id } = collection;

                    return (
                      <SwiperSlide key={id} className="w-[calc(20%-8px)]!">
                        <CollectionFolder
                          isMyProfile={isMyProfile}
                          collection={collection}
                          activeCollectionId={activeCollectionId}
                          setActiveCollectionId={setActiveCollectionId}
                        />
                      </SwiperSlide>
                    );
                  })}

                  {isHideButtons && (
                    <Button
                      onClick={handleNext}
                      variant="ghost"
                      size="icon"
                      className={sliderNavigationButton(isNavigationVisible, "right")}
                    >
                      <ChevronRight className="size-5" />
                    </Button>
                  )}
                </Swiper>
              </div>
            </>
          }
        </>
      }
    </>
  );
};
