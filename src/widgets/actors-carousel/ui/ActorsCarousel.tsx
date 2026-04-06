"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import { Button } from "@/shared/ui/button";

const MOCK_ACTORS = [
  { id: 1, name: "Leonardo DiCaprio", role: "Dom Cobb" },
  { id: 2, name: "Joseph Gordon-Levitt", role: "Arthur" },
  { id: 3, name: "Elliot Page", role: "Ariadne" },
  { id: 4, name: "Tom Hardy", role: "Eames" },
  { id: 5, name: "Ken Watanabe", role: "Saito" },
  { id: 6, name: "Dileep Rao", role: "Yusuf" },
  { id: 7, name: "Cillian Murphy", role: "Robert Fischer" },
  { id: 8, name: "Marion Cotillard", role: "Mal" },
  { id: 9, name: "Michael Caine", role: "Miles" },
  { id: 10, name: "Pete Postlethwaite", role: "Maurice Fischer" },
];

export const ActorsCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (swiper.isEnd) {
      swiper.slideTo(0);
    } else {
      swiper.slideNext();
    }
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
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {MOCK_ACTORS.map((actor) => (
          <SwiperSlide key={actor.id} className="w-auto!">
            <div className="flex flex-col items-center gap-2 w-[72px]">
              <div className="relative size-[60px] rounded-full overflow-hidden border border-white/60 shrink-0">
                <Image
                  src="/images/mock-avatar-actor.webp"
                  alt={actor.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center w-full">
                <p className="text-white text-xs font-medium leading-tight line-clamp-2">
                  {actor.name}
                </p>

                <p className="text-zinc-muted text-[11px] mt-0.5">{actor.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
