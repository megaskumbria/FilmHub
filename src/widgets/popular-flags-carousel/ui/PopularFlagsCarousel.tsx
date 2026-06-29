"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { PRESET_PACKS } from "../model/preset-packs-data";
import { Crown } from "lucide-react";
import { PresetCardPack } from "@/entities";
import "swiper/css";
import "swiper/css/free-mode";

export const PopularFlagsCarousel = () => {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
        <h3 className="text-sm font-semibold text-foreground tracking-wide">Popular packs</h3>

        <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border border-gold/30 bg-gold/8 text-gold">
          <Crown className="size-3" />
          <span>PRO</span>
        </span>
      </div>

      <Swiper
        modules={[FreeMode]}
        freeMode
        slidesPerView="auto"
        spaceBetween={12}
        className="overflow-visible! [&_.swiper-wrapper]:items-stretch"
      >
        {PRESET_PACKS.map((pack) => (
          <SwiperSlide key={pack.id} className="w-auto! h-auto!">
            <PresetCardPack pack={pack} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
