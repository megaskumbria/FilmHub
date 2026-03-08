"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";

const MOCK_ACTORS = [
  { id: 1, name: "Леонардо ДиКаприо", role: "Главная роль" },
  { id: 2, name: "Джозеф Гордон-Левитт", role: "Второй план" },
  { id: 3, name: "Эллиот Пейдж", role: "Второй план" },
  { id: 4, name: "Том Харди", role: "Второй план" },
  { id: 5, name: "Кен Ватанабэ", role: "Второй план" },
  { id: 6, name: "Дилип Рао", role: "Эпизод" },
  { id: 7, name: "Киллиан Мёрфи", role: "Второй план" },
  { id: 8, name: "Мэрион Котийяр", role: "Второй план" },
  { id: 9, name: "Майкл Кейн", role: "Эпизод" },
  { id: 10, name: "Пит Постлтуэйт", role: "Эпизод" },
];

export const ActorsCarousel = () => {
  return (
    <div className="w-full max-w-2xl">
      <p className="text-sm font-semibold text-white/50 mb-3 uppercase tracking-widest">Актёры</p>

      <Swiper spaceBetween={20} slidesPerView="auto" loop={false}>
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
