"use client";

import { ImageIcon, Upload, Dice5 } from "lucide-react";
import { ZONES } from "../model/zones";
import { Button } from "@/shared/ui";
import { ChangeEvent, useRef, useState } from "react";
import { MovieCard } from "@/widgets/movie-card";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";
import { mockMovies } from "@/shared/model/movies";

export const CardPreview = () => {
  const { layout } = useMovieCardLayout();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <section className="relative flex flex-col items-center justify-center bg-obsidian p-8 gap-7 overflow-hidden min-h-0">
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-accent/5 blur-3xl rounded-full pointer-events-none" />

      <p className="relative text-xs font-semibold tracking-widest uppercase text-zinc-muted">
        Превью
      </p>

      <article
        className="flex flex-col group cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleLoadFile}
        />

        {preview && (
          <div className="relative w-[230px] aspect-2/3 rounded-xl overflow-hidden">
            <MovieCard
              key={mockMovies[0].id}
              movie={{ ...mockMovies[0], imgUrl: preview }}
              layout={layout}
            />
          </div>
        )}

        {!preview && (
          <>
            <div className="relative w-[230px] aspect-2/3 rounded-xl border border-white/8 bg-zinc-900 flex items-center justify-center overflow-hidden shadow-2xl shadow-black/70 ring-1 ring-white/5">
              <div className="absolute inset-0 bg-linear-to-br from-zinc-800/60 via-zinc-900/80 to-zinc-950" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 px-4">
                <div className="relative flex items-center justify-center size-14 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/30">
                  <ImageIcon className="size-6 text-white/50 group-hover:hidden" />
                  <Upload className="size-6 text-accent hidden group-hover:block" />
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-medium text-white/70 group-hover:text-white/90 text-center leading-tight">
                    Загрузите постер
                  </span>

                  <span className="text-[9px] text-white/30 group-hover:text-white/50 text-center">
                    или перетащите файл
                  </span>
                </div>
              </div>

              <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-accent/5 to-transparent" />

              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="text-[8px] font-bold tracking-wider text-blue-400/70 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 uppercase">
                  poster
                </span>
              </div>

              <div className="absolute bottom-3 left-3">
                <span className="text-[8px] font-bold tracking-wider text-accent/70 bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20 uppercase">
                  hover
                </span>
              </div>
            </div>

            <div className="relative mt-1.5 h-20 w-[230px] rounded-xl border border-white/8 bg-zinc-900 overflow-hidden shadow-2xl shadow-black/70 ring-1 ring-white/5 p-3.5">
              <div className="absolute inset-0 bg-linear-to-br from-zinc-800/60 via-zinc-900/80 to-zinc-950" />
              <div className="relative z-10 flex items-center justify-between mb-3">
                <span className="text-[8px] font-bold tracking-wider text-emerald-accent/80 bg-emerald-accent/10 px-1.5 py-0.5 rounded border border-emerald-accent/20 uppercase">
                  body
                </span>
              </div>
            </div>
          </>
        )}
      </article>

      <Button className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/4 border border-white/8 text-white/50 hover:bg-accent/10 hover:border-accent/25 hover:text-accent/90 transition-all duration-200 hover:scale-105 active:scale-95 group/btn">
        <Dice5 className="size-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
        <span className="text-[11px] font-medium tracking-wide">Случайный постер</span>
      </Button>

      {/* Zone legend */}
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
