"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { CastMember } from "@/shared/hooks/useMedia";

interface Props {
  actors: CastMember[];
}

export const ActorsCarousel = ({ actors }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    swiper.isEnd ? swiper.slideTo(0) : swiper.slideNext();
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-white/50 uppercase tracking-widest">Cast</p>

        <div className="flex items-center gap-1 pr-4">
          <Button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex items-center justify-center size-7 rounded-full border border-white/20 text-white/60 transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/10"
          >
            <ChevronLeft size={14} />
          </Button>

          <Button
            onClick={handleNext}
            className="flex items-center justify-center size-7 rounded-full border border-white/20 text-white/60 transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/10"
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>

      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        // slidesPerGroup={4}
        slidesPerGroupAuto={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {actors.map((actor) => (
          <SwiperSlide key={actor.id} className="w-auto!">
            <div className="flex flex-col items-center gap-2 w-18">
              <div className="relative size-15 rounded-full overflow-hidden border border-white/60 shrink-0">
                <Image
                  src={actor.profileUrl ?? ""}
                  alt={actor.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center w-full">
                <p className="text-white text-xs font-medium leading-tight line-clamp-2">
                  {actor.name}
                </p>

                <p className="text-zinc-muted text-xs mt-0.5">{actor.character}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
