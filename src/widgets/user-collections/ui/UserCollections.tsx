"use client";

import { Button } from "@/shared/ui";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CreateCollectionModal } from "@/widgets";
import { CollectionFolder, FolderSkeleton } from "@/entities";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { EmptyStateCollections } from "./EmptyStateCollections";
import { sliderNavigationButton } from "@/shared/lib";
import { type Collection } from "@/shared/hooks/useCollection";

interface Props {
  setActiveCollectionId: (collectionId: string) => void;
  activeCollectionId: string;
  isMyProfile: boolean;
  collections: Collection[];
  isPending: boolean;
  hasCollections: boolean;
}

export const UserCollections = ({
  isMyProfile,
  collections,
  setActiveCollectionId,
  activeCollectionId,
  isPending,
  hasCollections,
}: Props) => {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

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

  return (
    <>
      {!hasCollections ?
        <EmptyStateCollections />
      : <section>
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
        </section>
      }
    </>
  );
};
