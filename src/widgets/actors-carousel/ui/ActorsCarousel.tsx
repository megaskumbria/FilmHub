"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/shared/ui";
import { CastMember } from "@/shared/hooks/useMedia";
import "swiper/css";

interface Props {
  actors: CastMember[];
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

export const ActorsCarousel = ({ actors }: Props) => {
  const t = useTranslations("movie");
  const swiperRef = useRef<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  const updateEdges = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (actors.length === 0) return null;

  return (
    <section aria-labelledby="movie-cast" className="min-w-0">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="movie-cast" className="font-unbounded text-lg font-medium text-white">
          {t("cast")}
        </h2>

        <div className="flex items-center gap-1.5">
          <Button
            variant="glass"
            size="icon-sm"
            className="rounded-full"
            disabled={isBeginning}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <IconChevronLeft className="size-4" />
          </Button>

          <Button
            variant="glass"
            size="icon-sm"
            className="rounded-full"
            disabled={isEnd}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <IconChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <Swiper
        slidesPerView="auto"
        slidesPerGroupAuto
        spaceBetween={16}
        wrapperTag="ul"
        watchOverflow
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateEdges(swiper);
        }}
        onSlideChange={updateEdges}
        onResize={updateEdges}
        onUpdate={updateEdges}
      >
        {actors.map((actor) => (
          <SwiperSlide key={actor.id} tag="li" className="w-28! sm:w-32!">
            <figure>
              <div className="relative aspect-3/4 overflow-hidden rounded-md bg-surface-elevated">
                {actor.profileUrl ?
                  <Image
                    src={actor.profileUrl}
                    alt={actor.name}
                    fill
                    sizes="128px"
                    className="object-cover select-none"
                  />
                : <span
                    aria-hidden
                    className="absolute inset-0 grid place-items-center font-unbounded text-2xl text-white/25"
                  >
                    {getInitials(actor.name)}
                  </span>
                }
              </div>

              <figcaption className="mt-2.5 font-manrope select-none">
                <p className="text-sm font-semibold leading-snug text-white line-clamp-2">
                  {actor.name}
                </p>

                {actor.character && (
                  <p className="mt-0.5 text-xs leading-snug text-zinc-muted line-clamp-2">
                    {actor.character}
                  </p>
                )}
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
