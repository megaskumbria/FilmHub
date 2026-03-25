"use client";

import { ZONES } from "../model/zones";
import { DragOverlay, MovieCardPlaceholder } from "@/widgets/movie-card-settings";
import { MovieCard } from "@/widgets/movie-card";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";
import { mockMovies } from "@/shared/model/movies";
import { useWindowFileDrag, useImageUpload } from "@/shared/hooks";
import { PosterPreviewActions } from "@/features";
import { DotGrid } from "@/shared/ui";

export const CardPreview = () => {
  const isWindowDragOver = useWindowFileDrag();

  const { layout, blockOptions } = useMovieCardLayout();

  const { preview, fileInputRef, handleFileInputChange, handleDrop, handleReset } =
    useImageUpload();

  return (
    <section className="relative flex flex-col items-center bg-obsidian p-4 gap-7 overflow-y-auto drawer-scroll min-h-0">
      <DotGrid />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-accent/5 blur-3xl rounded-full pointer-events-none" />

      <p className="relative text-xs font-semibold tracking-widest uppercase text-zinc-muted">
        Превью
      </p>

      <article
        className="flex flex-col group cursor-pointer w-full max-w-[270px]"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileInputChange}
        />

        {preview && (
          <div
            className="relative rounded-xl"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <MovieCard
              key={mockMovies[0].id}
              movie={{ ...mockMovies[0], imgUrl: preview }}
              layout={layout}
              blockOptions={blockOptions}
              shouldShowAddButton={false}
            />

            <DragOverlay visible={isWindowDragOver} />
          </div>
        )}

        {!preview && (
          <div className="relative" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <MovieCardPlaceholder />
            <DragOverlay visible={isWindowDragOver} />
          </div>
        )}
      </article>

      <div className="relative flex items-center gap-2">
        <PosterPreviewActions onResetPreview={handleReset} />
      </div>

      <div className="relative flex items-center gap-4">
        {ZONES.map(({ key, label, dotClass }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`size-1.5 rounded-full ${dotClass}`} />

            <span className="text-[10px] font-medium tracking-wider text-zinc-muted/60 uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="relative text-xs text-zinc-muted/40 text-center max-w-[190px] leading-relaxed">
        Настройте видимость блоков в каждой зоне карточки
      </p>
    </section>
  );
};
