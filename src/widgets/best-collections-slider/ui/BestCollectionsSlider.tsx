"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/shared/ui/button";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { BEST_COLLECTIONS } from "@/app/[locale]/page";
import { CollectionDeck } from "@/entities";

export const BestCollectionsSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative rounded-2xl overflow-hidden mb-14 border border-border">
      <div className="absolute inset-0 bg-linear-to-br from-accent/12 via-surface to-background" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-accent) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute -top-20 -left-20 size-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-10 size-64 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative px-8 pt-7 pb-8">
        <header className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-xl bg-accent/15 border border-accent/25">
              <BookOpen className="size-4 text-accent" />
            </div>

            <h2 className="text-xl font-bold text-foreground leading-tight">
              Best collections this month
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="rounded"
              size="icon"
              className="size-9"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="size-4" />
            </Button>

            <Button
              variant="rounded"
              size="icon"
              className="size-9"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </header>

        <Swiper
          modules={[Navigation]}
          slidesPerView={5}
          spaceBetween={24}
          speed={500}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {BEST_COLLECTIONS.map((collection) => (
            <SwiperSlide key={collection.id}>
              <CollectionDeck collection={collection} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
