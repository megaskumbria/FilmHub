"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMemo, useRef, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { useIdle } from "react-use";
import Image from "next/image";
import "swiper/css";

interface PosterCarouselProps {
  posters: string[];
  imgUrl: string;
  selectedPoster: string | null;
  setSelectedPoster: (poster: string | null) => void;
  title: string;
}

const IDLE_TIMEOUT = 5000;

export const PosterCarousel = ({
  posters,
  imgUrl,
  selectedPoster,
  setSelectedPoster,
  title,
}: PosterCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const userClickedRef = useRef(false);

  const isIdle = useIdle(IDLE_TIMEOUT);

  useEffect(() => {
    if (!swiperRef.current) return;

    if (!isIdle && selectedPoster !== null) {
      handlePosterSelect(imgUrl);
    }

    if (isIdle) {
      swiperRef.current.autoplay.start();
      userClickedRef.current = false;
    } else {
      swiperRef.current.autoplay.stop();
      setSelectedPoster(null);
    }
  }, [isIdle]);

  const handlePosterSelect = (poster: string) => {
    setSelectedPoster(poster);
    swiperRef.current?.autoplay.stop();
    userClickedRef.current = true;

    const index = posters.findIndex((p) => p === poster);

    if (index >= 0) {
      swiperRef.current?.slideToLoop(index);
    }
  };

  const updatePosters = useMemo(() => [imgUrl, ...(posters ?? [])], []);

  return (
    <div className="w-[580px]">
      <Swiper
        className="h-[140px]"
        slideToClickedSlide={true}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        speed={800}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay.stop();
        }}
        onSlideChange={(swiper) => {
          if (!isIdle) return;
          if (userClickedRef.current) return;
          setSelectedPoster(posters[swiper.realIndex]);
        }}
      >
        {updatePosters.map((poster, i) => (
          <SwiperSlide
            key={i}
            onClick={() => {
              if (swiperRef.current?.animating) return;
              handlePosterSelect(poster);
            }}
            className="relative rounded-xl overflow-hidden border border-white/30 cursor-pointer transition-all duration-200"
          >
            <Image src={poster} fill alt={title} className="object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
