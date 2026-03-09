"use client";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui";
import { ActorsCarousel } from "@/widgets";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Info, Link2, Plus } from "lucide-react";
import { IMovieCardData } from "@/shared/model/movies";

const formatDuration = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}ч ${m}мин` : `${m}мин`;
};

interface MovieInfoPanelProps {
  movie: IMovieCardData;
  isUiHidden: boolean;
}

export const MovieInfoPanel = ({ movie, isUiHidden }: MovieInfoPanelProps) => {
  const { genres, description, yearOfRelease, durationMinutes, title } = movie;

  return (
    <motion.div
      animate={{ opacity: isUiHidden ? 0 : 1, x: isUiHidden ? -24 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="max-w-xl shrink-0 flex flex-col gap-4"
      style={{ pointerEvents: isUiHidden ? "none" : "auto" }}
    >
      <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-base font-medium">
        <span className="flex items-center gap-1.5 text-white/70">
          <CalendarDays className="size-3.5" />
          {yearOfRelease}
        </span>

        <span className="text-white/25">•</span>

        <span className="flex items-center gap-1.5 text-white/70">
          <Clock className="size-3.5" />
          {formatDuration(durationMinutes)}
        </span>

        <span className="text-white/25">•</span>

        {genres.map((genre, i) => (
          <span key={genre} className="flex items-center gap-x-2.5">
            <span className="text-white/50">{genre}</span>
            {i < genres.length - 1 && <span className="text-white/25">•</span>}
          </span>
        ))}
      </div>

      <h1 className="text-6xl font-black text-white leading-none">{title}</h1>

      <p className="text-white/70 font-medium text-base leading-relaxed line-clamp-6">
        {description}
      </p>

      <div className="flex gap-3">
        <Button
          variant="accent"
          size="lg"
          className="transition-all duration-200 gap-2 rounded-lg font-semibold shadow-lg shadow-accent/30"
        >
          <Plus className="size-4" />
          <span>Добавить в коллекцию</span>
        </Button>

        <div className="flex items-stretch h-10 rounded-lg border border-white/20 bg-white/10 overflow-hidden">
          <Button className="transition-all duration-200 gap-2 h-full rounded-none bg-transparent hover:bg-white/10 font-semibold text-white border-none shadow-none px-4">
            <Link2 className="size-4" />
            <span>Сгенерировать ссылку</span>
          </Button>

          <div className="w-px self-center h-5 bg-white/15 shrink-0" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="transition-all duration-200 cursor-default w-11 h-full shrink-0 rounded-none bg-transparent hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white/90 border-none shadow-none">
                <Info className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p className="text-sm">
                Генерирует ссылку на бесплатный источник для просмотра фильма.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <ActorsCarousel />
    </motion.div>
  );
};
