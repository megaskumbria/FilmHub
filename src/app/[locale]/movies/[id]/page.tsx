"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MovieInfoPanel, PosterCarousel } from "@/widgets";
import { useMovie } from "@/shared/hooks";
import { IBackdrop } from "@/shared/hooks/useMedia";
import { Button } from "@/shared/ui";
import { Eye, EyeOff } from "lucide-react";
import { MediaType } from "@/shared/stores/movie-catalog";
import { useSearchParams } from "next/navigation";

export default function MoviePage() {
  const [selectedPoster, setSelectedPoster] = useState<IBackdrop | null>(null);
  const [isUiHidden, setIsUiHidden] = useState(false);
  const searchParams = useSearchParams();

  const params = useParams();
  const id = params?.id != null ? Number(params.id) : NaN;
  const type = searchParams.get("type") as MediaType;

  const { data: movie } = useMovie(id, type);

  if (!movie) return null;

  const { title, backdropUrl, images, credits, originalName } = movie;
  const { backdrops } = images;
  const { cast } = credits;

  const titleToDisplay = originalName || title;

  // console.log("movie", movie);

  return (
    <div className="relative w-full overflow-hidden h-screen">
      <div className="absolute inset-0 w-full">
        <AnimatePresence mode="sync">
          <motion.div
            key={selectedPoster?.url ?? backdropUrl}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Image
              src={selectedPoster?.url ?? backdropUrl ?? ""}
              alt={titleToDisplay}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        animate={{ opacity: isUiHidden ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-transparent pointer-events-none"
      />

      <motion.div
        animate={{ opacity: isUiHidden ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute inset-0 bg-linear-to-r from-black/75 via-black/20 to-transparent pointer-events-none"
      />

      <div className="relative h-full flex flex-col justify-end">
        <div className="flex items-end justify-between gap-10 px-14 mb-10">
          <MovieInfoPanel movie={movie} isUiHidden={isUiHidden} actors={cast} />

          {backdropUrl && (
            <div className="shrink-0 flex flex-col gap-3">
              <Button
                onClick={() => setIsUiHidden((v) => !v)}
                className="self-end flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/60 hover:bg-white/18 hover:text-white transition-all duration-200 text-xs font-medium"
              >
                {isUiHidden ?
                  <Eye className="size-3.5" />
                : <EyeOff className="size-3.5" />}
                <span>{isUiHidden ? "Show UI" : "Poster only"}</span>
              </Button>

              <PosterCarousel
                backdrops={backdrops}
                backdropUrl={backdropUrl}
                selectedPoster={selectedPoster}
                setSelectedPoster={setSelectedPoster}
                titleToDisplay={titleToDisplay}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
