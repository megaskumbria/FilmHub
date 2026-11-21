"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CreateCollectionModal, EmptyStateCollection } from "@/widgets";
import { CollectionFolder, FolderSkeleton } from "@/entities";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { sliderNavigationButton } from "@/shared/lib";
import { type Collection } from "@/shared/hooks";
import "swiper/css";

const SWIPER_BREAKPOINTS = {
  1024: {
    slidesPerGroup: 2,
  },
  1280: {
    slidesPerGroup: 2,
  },
};

interface Props {
  setActiveCollectionId: (collectionId: string) => void;
  activeCollectionId: string;
  isMyProfile: boolean;
  userId: string;
  collections: Collection[];
  isPending: boolean;
  hasCollectionItems: boolean;
}

export const UserCollections = ({
  isMyProfile,
  userId,
  collections,
  setActiveCollectionId,
  activeCollectionId,
  isPending,
  hasCollectionItems,
}: Props) => {
  const t = useTranslations("collections.list");

  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    const swiper = swiperRef.current;
    swiper?.slideNext();
  };

  const handlePrev = () => {
    const swiper = swiperRef.current;
    swiper?.slidePrev();
  };

  const updateEdges = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const collectionsCount = collections?.length ?? 0;
  const isLoop = collectionsCount > 10;

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    swiper.update();
    updateEdges(swiper);
  }, [collections]);

  return (
    <>
      {!hasCollectionItems ?
        <EmptyStateCollection isMyProfile={isMyProfile} userId={userId} />
      : <section>
          <div className="flex items-center justify-between mb-5 pt-5">
            <h2 className="text-lg font-semibold text-foreground">
              {isMyProfile ? t("mine") : t("theirs")}
            </h2>

            {isMyProfile && (
              <CreateCollectionModal isEditing={false}>
                <Button variant="accent" size="sm" className="rounded-lg gap-2">
                  <Plus className="size-4" />
                  <span className="text-sm font-medium">{t("create")}</span>
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
          : <div
              onMouseEnter={() => setIsNavigationVisible(true)}
              onMouseLeave={() => setIsNavigationVisible(false)}
            >
              <Swiper
                key={isLoop ? "loop" : "no-loop"}
                modules={[Navigation]}
                loop={isLoop}
                watchOverflow
                slidesPerView="auto"
                spaceBetween={10}
                breakpoints={SWIPER_BREAKPOINTS}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  updateEdges(swiper);
                }}
                onSlideChange={updateEdges}
                onResize={updateEdges}
                className="relative min-h-55 h-full"
              >
                {!isBeginning && (
                  <Button
                    onClick={handlePrev}
                    variant="ghost"
                    size="icon"
                    className={`${sliderNavigationButton(isNavigationVisible, "left")} hidden lg:flex`}
                  >
                    <ChevronLeft className="size-5" />
                  </Button>
                )}

                {collections?.map((collection) => {
                  const { id } = collection;

                  return (
                    <SwiperSlide
                      key={id}
                      className="w-[calc((100%-3px)/1.3)]! min-[420px]:w-[calc((100%-10px)/2)]! min-[700px]:w-[calc((100%-20px)/3)]! min-[1024px]:w-[calc((100%-30px)/4)]! min-[1280px]:w-[calc((100%-40px)/5)]!"
                    >
                      <CollectionFolder
                        isMyProfile={isMyProfile}
                        collection={collection}
                        activeCollectionId={activeCollectionId}
                        setActiveCollectionId={setActiveCollectionId}
                      />
                    </SwiperSlide>
                  );
                })}

                {!isEnd && (
                  <Button
                    onClick={handleNext}
                    variant="ghost"
                    size="icon"
                    className={`${sliderNavigationButton(isNavigationVisible, "right")} hidden lg:flex`}
                  >
                    <ChevronRight className="size-5" />
                  </Button>
                )}
              </Swiper>
            </div>
          }
        </section>
      }
    </>
  );
};
