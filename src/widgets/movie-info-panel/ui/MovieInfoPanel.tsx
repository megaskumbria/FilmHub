"use client";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui";
import { ActorsCarousel } from "@/widgets";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Info, Link2, Plus, Tv } from "lucide-react";
import { ICastMember, ITmdbMovie } from "@/shared/hooks/useMedia";

const formatDuration = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

interface MovieInfoPanelProps {
  movie: ITmdbMovie;
  isUiHidden: boolean;
  actors: ICastMember[];
}

export const MovieInfoPanel = ({ movie, isUiHidden, actors }: MovieInfoPanelProps) => {
  const {
    genres,
    overview,
    release_date,
    runtime,
    title,
    original_name,
    last_air_date,
    number_of_seasons,
  } = movie;

  const titleToDisplay = original_name || title;
  const yearOfRelease = new Date(release_date || last_air_date).getFullYear();

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

        {number_of_seasons ?
          <span className="flex items-center gap-1.5 text-white/70">
            <Tv className="size-3.5" />
            {number_of_seasons} {number_of_seasons === 1 ? "Season" : "Seasons"}
          </span>
        : <span className="flex items-center gap-1.5 text-white/70">
            <Clock className="size-3.5" />
            {formatDuration(runtime)}
          </span>
        }

        <span className="text-white/25">•</span>

        {genres.map((genre, i) => (
          <span key={genre.id} className="flex items-center gap-x-2.5">
            <span className="text-white/50">{genre.name}</span>
            {i < genres.length - 1 && <span className="text-white/25">•</span>}
          </span>
        ))}
      </div>

      <h1 className="text-6xl font-black text-white leading-none">{titleToDisplay}</h1>

      <p className="text-white/70 font-medium text-base leading-relaxed line-clamp-6">{overview}</p>

      <div className="flex gap-3">
        <Button
          variant="accent"
          size="lg"
          className="transition-all duration-200 gap-2 rounded-lg font-semibold shadow-lg shadow-accent/30"
        >
          <Plus className="size-4" />
          <span>Add to collection</span>
        </Button>

        <div className="flex items-stretch h-10 rounded-lg border border-white/20 bg-white/10 overflow-hidden">
          <Button className="transition-all duration-200 gap-2 h-full rounded-none bg-transparent hover:bg-white/10 font-semibold text-white border-none shadow-none px-4">
            <Link2 className="size-4" />
            <span>Generate link</span>
          </Button>

          <div className="w-px self-center h-5 bg-white/15 shrink-0" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="transition-all duration-200 cursor-default w-11 h-full shrink-0 rounded-none bg-transparent hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white/90 border-none shadow-none">
                <Info className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p className="text-sm">Builds a link to a free source for watching the film.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <ActorsCarousel actors={actors} />
    </motion.div>
  );
};
