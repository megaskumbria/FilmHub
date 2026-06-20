"use client";

import { PosterPreviewActions, PosterUpload, useRandomPosterStore } from "@/features";
import { Button, DotGrid } from "@/shared/ui";
import { SettingsModal } from "@/widgets";
import { Settings } from "lucide-react";
import { useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { useRandomPosterAction } from "@/shared/hooks";

export const PosterUploadSection = () => {
  const { mediaPreviewInfo, resetPosterPreview } = useRandomPosterStore();
  const { isPending, handleGetRandomPoster } = useRandomPosterAction();

  const { layout } = useMovieCardLayout();

  const isFlagEnabled = Object.values(layout).some((blocks) => blocks.includes("flags"));

  const shouldShowText = mediaPreviewInfo && !isFlagEnabled;

  return (
    <section className="h-[661px] relative rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-3 w-86">
      <DotGrid />

      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
          <span className="text-sm font-semibold text-foreground tracking-wide">Poster</span>
        </div>

        <SettingsModal defaultMenu="movie-card">
          <Button className="flex items-center gap-1.5 group">
            <Settings className="size-4 text-zinc-muted/90 group-hover:text-foreground/70 transition-colors" />

            <span className="text-xs text-zinc-muted/90 font-semibold tracking-widest transition-colors group-hover:text-foreground/70 ">
              Configure
            </span>
          </Button>
        </SettingsModal>
      </div>

      <div className="flex-1 min-h-0 z-10">
        <PosterUpload flagPreview disableNavigation={true} media={mediaPreviewInfo} />
      </div>

      <div className="flex items-center gap-2 z-10 justify-center pt-2">
        <PosterPreviewActions
          onResetPreview={resetPosterPreview}
          onGetRandomPoster={handleGetRandomPoster}
          isLoading={isPending}
        />
      </div>

      {shouldShowText && (
        <SettingsModal defaultMenu="movie-card">
          <Button className="w-full pt-4 z-10">
            <span className="text-xs text-center hover:text-foreground/70 text-zinc-muted/90 font-semibold tracking-widest transition-colors ">
              Enable the flag in settings to show it here
            </span>
          </Button>
        </SettingsModal>
      )}
    </section>
  );
};
