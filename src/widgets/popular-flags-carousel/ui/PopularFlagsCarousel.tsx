"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PresetCardPack, PresetCardPackSkeleton } from "@/entities";
import { useGetPresetPacks } from "@/shared/hooks";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Button } from "@/shared/ui";
import { sliderNavigationButton } from "@/shared/lib";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";

const SKELETON_ITEMS = [
  "block",
  "hidden min-[590px]:block",
  "hidden min-[850px]:block",
  "hidden min-[1200px]:block",
  "hidden min-[1500px]:block",
  "hidden min-[1500px]:block",
];

const SWIPER_BREAKPOINTS = {
  0: {
    slidesPerView: 1,
  },
  590: {
    slidesPerView: 2,
  },
  850: {
    slidesPerView: 3,
  },
  1200: {
    slidesPerView: 4,
  },
  1500: {
    slidesPerView: 6,
  },
};

export const PopularFlagsCarousel = () => {
  const t = useTranslations("flags.packs");
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);

  const { data: presetPacks, isLoading } = useGetPresetPacks();

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

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperRef.current.update();
    updateEdges(swiperRef.current);
  }, [presetPacks]);

  const presetPacksCount = presetPacks?.length ?? 0;
  const isHideButtons = presetPacksCount > 5;

  return (
    <section>
      <div className="flex items-center gap-2.5">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
        <h3 className="text-sm font-semibold text-foreground tracking-wide">{t("popular")}</h3>
      </div>

      <div
        onMouseEnter={() => setIsNavigationVisible(true)}
        onMouseLeave={() => setIsNavigationVisible(false)}
      >
        {isLoading ?
          <div className="grid grid-cols-1 gap-3 pt-5 pb-9 min-[590px]:grid-cols-2 min-[850px]:grid-cols-3 min-[1200px]:grid-cols-4 min-[1500px]:grid-cols-6">
            {SKELETON_ITEMS.map((visibility, index) => (
              <div key={index} className={visibility}>
                <PresetCardPackSkeleton />
              </div>
            ))}
          </div>
        : <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateEdges(swiper);
            }}
            onSlideChange={updateEdges}
            spaceBetween={12}
            breakpoints={SWIPER_BREAKPOINTS}
            className="relative pt-5! pb-9! [--swiper-pagination-bottom:0px] [--swiper-pagination-color:#9b56f0] [--swiper-pagination-bullet-inactive-color:#8a8a94] [--swiper-pagination-bullet-inactive-opacity:1]"
          >
            {isHideButtons && !isBeginning && (
              <Button
                onClick={handlePrev}
                disabled={isBeginning}
                size="icon"
                className={`${sliderNavigationButton(isNavigationVisible, "left")} hidden lg:flex`}
              >
                <ChevronLeft className="size-5" />
              </Button>
            )}

            {presetPacks?.map((presetPack) => (
              <SwiperSlide key={presetPack.id}>
                <PresetCardPack presetPack={presetPack} />
              </SwiperSlide>
            ))}

            {isHideButtons && !isEnd && (
              <Button
                onClick={handleNext}
                size="icon"
                className={`${sliderNavigationButton(isNavigationVisible, "right")} hidden lg:flex`}
              >
                <ChevronRight className="size-5" />
              </Button>
            )}
          </Swiper>
        }
      </div>
    </section>
  );
};
