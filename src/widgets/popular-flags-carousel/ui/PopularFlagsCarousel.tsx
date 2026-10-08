"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { PresetCardPack, PresetCardPackSkeleton } from "@/entities";
import { useGetPresetPacks } from "@/shared/hooks";
import "swiper/css";
import "swiper/css/free-mode";
import { Button } from "@/shared/ui";
import { sliderNavigationButton } from "@/shared/lib";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { useTranslations } from "next-intl";

const SKELETON_ITEMS = Array.from({ length: 7 }, (_, index) => index);

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
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
        <h3 className="text-sm font-semibold text-foreground tracking-wide">{t("popular")}</h3>

        <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border border-gold/30 bg-gold/8 text-gold">
          <Crown className="size-3" />
          <span>PRO</span>
        </span>
      </div>

      <div
        onMouseEnter={() => setIsNavigationVisible(true)}
        onMouseLeave={() => setIsNavigationVisible(false)}
      >
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateEdges(swiper);
          }}
          onSlideChange={updateEdges}
          spaceBetween={12}
          breakpoints={SWIPER_BREAKPOINTS}
          className="relative"
        >
          {isHideButtons && !isBeginning && (
            <Button
              onClick={handlePrev}
              disabled={isBeginning}
              size="icon"
              className={sliderNavigationButton(isNavigationVisible, "left")}
            >
              <ChevronLeft className="size-5" />
            </Button>
          )}

          {isLoading ?
            <SwiperSlide className="h-auto! flex! gap-x-3">
              {SKELETON_ITEMS.map((index) => (
                <PresetCardPackSkeleton key={index} />
              ))}
            </SwiperSlide>
          : presetPacks?.map((presetPack) => (
              <SwiperSlide key={presetPack.id}>
                <PresetCardPack presetPack={presetPack} />
              </SwiperSlide>
            ))
          }

          {isHideButtons && !isEnd && (
            <Button
              onClick={handleNext}
              size="icon"
              className={sliderNavigationButton(isNavigationVisible, "right")}
            >
              <ChevronRight className="size-5" />
            </Button>
          )}
        </Swiper>
      </div>
    </section>
  );
};
