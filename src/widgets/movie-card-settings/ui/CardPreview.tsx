"use client";

import { Dice5, RotateCcw } from "lucide-react";
import { ZONES } from "../model/zones";
import { Button } from "@/shared/ui";
import { DragOverlay, MovieCardPlaceholder } from "@/widgets/movie-card-settings";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { MovieCard } from "@/widgets/movie-card";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";
import { mockMovies } from "@/shared/model/movies";
import { toast } from "sonner";
import { MOVIE_CARD_PREVIEW_KEY } from "@/shared/storages/storage-keys";
import { useWindowFileDrag } from "@/shared/hooks";

export const CardPreview = () => {
  const [preview, setPreview] = useState<string | null>(() => {
    const preview = localStorage.getItem(MOVIE_CARD_PREVIEW_KEY);
    return preview ?? null;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isWindowDragOver = useWindowFileDrag();

  const { layout, blockOptions } = useMovieCardLayout();

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const loadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      localStorage.setItem(MOVIE_CARD_PREVIEW_KEY, dataUrl);
      toast.success("Постер загружен", { position: "bottom-left" });
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setPreview(null);
      localStorage.removeItem(MOVIE_CARD_PREVIEW_KEY);

      toast.success("Превью сброшено", { position: "bottom-left" });
      return;
    }
    toast.error("Не удалось сбросить превью", { position: "bottom-left" });
  };

  return (
    <section className="relative flex flex-col items-center bg-obsidian p-4 gap-7 overflow-y-auto drawer-scroll min-h-0">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

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
        <Button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/4 border border-white/8 text-white/50 hover:bg-accent/10 hover:border-accent/25 hover:text-accent/90 transition-all duration-200 hover:scale-105 active:scale-95 group/btn">
          <Dice5 className="size-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
          <span className="text-[11px] font-medium tracking-wide">Случайный постер</span>
        </Button>

        <div className="w-px h-4 bg-white/10 rounded-full" />

        <Button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/4 border border-white/8 text-white/30 hover:bg-white/6 hover:border-white/12 hover:text-white/60 transition-all duration-200 hover:scale-105 active:scale-95 group/reset"
        >
          <RotateCcw className="size-3 group-hover/reset:rotate-[-360deg] transition-transform duration-500" />
          <span className="text-[11px] font-medium tracking-wide">Сброс</span>
        </Button>
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
