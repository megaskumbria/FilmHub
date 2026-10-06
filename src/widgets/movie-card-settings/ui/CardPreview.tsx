"use client";

import { useTranslations } from "next-intl";
import { PosterPreviewActions, PosterUpload, useRandomPosterStore } from "@/features";
import { DotGrid } from "@/shared/ui";
import { ZONES } from "../model/zones";
import { useRandomPosterAction } from "@/shared/hooks";

export const CardPreview = () => {
  const t = useTranslations("settings.card");
  const { mediaPreviewInfo, resetPosterPreview } = useRandomPosterStore();
  const { isPending, handleGetRandomPoster } = useRandomPosterAction();

  return (
    <section className="relative flex flex-col items-center bg-obsidian p-4 gap-7 overflow-y-auto drawer-scroll min-h-0">
      <DotGrid />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-accent/5 blur-3xl rounded-full" />

      <p className="relative text-xs font-semibold tracking-widest uppercase text-zinc-muted">
        {t("preview")}
      </p>

      <div className="max-w-67.5 w-full">
        <PosterUpload flagPreview={true} media={mediaPreviewInfo} />
      </div>

      <div className="relative flex items-center gap-2">
        <PosterPreviewActions
          onResetPreview={resetPosterPreview}
          onGetRandomPoster={handleGetRandomPoster}
          isLoading={isPending}
        />
      </div>

      <div className="relative flex items-center gap-4">
        {ZONES.map(({ key, dotClass }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`size-1.5 rounded-full ${dotClass}`} />

            <span className="text-xs font-medium tracking-wider text-zinc-muted/60 uppercase">
              {t(key)}
            </span>
          </div>
        ))}
      </div>

      <p className="relative text-xs text-zinc-muted/40 text-center max-w-47.5 leading-relaxed">
        {t("previewHint")}
      </p>
    </section>
  );
};
