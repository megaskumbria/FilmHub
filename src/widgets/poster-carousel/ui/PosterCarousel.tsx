"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMemo, useRef, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { useIdle } from "react-use";
import Image from "next/image";

interface Props {
  stills: string[];
  backdropUrl: string;
  selectedPoster: string | null;
  setSelectedPoster: (poster: string | null) => void;
  titleToDisplay: string;
}

const IDLE_TIMEOUT = 5000;
const IDLE_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];

export const PosterCarousel = ({
  stills,
  backdropUrl,
  selectedPoster,
  setSelectedPoster,
  titleToDisplay,
}: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const userClickedRef = useRef(false);

  const isIdle = useIdle(IDLE_TIMEOUT, false, IDLE_EVENTS);

  useEffect(() => {
    if (!swiperRef.current) return;

    if (!isIdle && selectedPoster !== null) handlePosterSelect(updatePosters[0]);

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

    const index = updatePosters.findIndex((p) => p === poster);

    if (index >= 0) swiperRef.current?.slideToLoop(index);
  };

  const updatePosters = useMemo(() => [backdropUrl, ...stills], [backdropUrl, stills]);

  return (
    <div className="w-145">
      <Swiper
        className="h-35"
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
              src={backdrop}
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
