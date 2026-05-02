"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMemo, useRef, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { useIdle } from "react-use";
import Image from "next/image";
import "swiper/css";
import { IBackdrop } from "@/shared/hooks/useMedia";

interface PosterCarouselProps {
  backdrops: IBackdrop[];
  backdrop_url: string;
  selectedPoster: IBackdrop | null;
  setSelectedPoster: (poster: IBackdrop | null) => void;
  titleToDisplay: string;
}

const IDLE_TIMEOUT = 5000;

export const PosterCarousel = ({
  backdrops,
  backdrop_url,
  selectedPoster,
  setSelectedPoster,
  titleToDisplay,
}: PosterCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const userClickedRef = useRef(false);

  const isIdle = useIdle(IDLE_TIMEOUT);

  // console.log(selectedPoster);

  useEffect(() => {
    if (!swiperRef.current) return;

    if (!isIdle && selectedPoster !== null) {
      handlePosterSelect(updatePosters[0]);
    }

    if (isIdle) {
      swiperRef.current.autoplay.start();
      userClickedRef.current = false;
    } else {
      swiperRef.current.autoplay.stop();
      setSelectedPoster(null);
    }
  }, [isIdle]);

  const handlePosterSelect = (poster: IBackdrop) => {
    // console.log("handlePosterSelect", poster);
    setSelectedPoster(poster);
    swiperRef.current?.autoplay.stop();
    userClickedRef.current = true;

    const index = updatePosters.findIndex((p) => p.url === poster.url);

    if (index >= 0) {
      swiperRef.current?.slideToLoop(index);
    }
  };

  const updatePosters = useMemo<IBackdrop[]>(
    () => [
      {
        file_path: "",
        height: 0,
        width: 0,
        vote_average: 0,
        url: backdrop_url,
      },
      ...(backdrops ?? []),
    ],
    [backdrop_url, backdrops],
  );

  return (
    <div className="w-[580px]">
      <Swiper
        className="h-[140px]"
        // slideToClickedSlide={true}
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
          setSelectedPoster(updatePosters[swiper.realIndex]);
        }}
      >
        {updatePosters.map((backdrop, i) => (
          <SwiperSlide
            key={i}
            onClick={() => {
              if (swiperRef.current?.animating) return;
              handlePosterSelect(backdrop);
            }}
            className="relative rounded-xl overflow-hidden border border-white/30 cursor-pointer transition-all duration-200"
          >
            <Image
              src={backdrop.url ?? ""}
              fill
              alt={titleToDisplay}
              sizes="(max-width: 768px) 50vw, 145px"
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
