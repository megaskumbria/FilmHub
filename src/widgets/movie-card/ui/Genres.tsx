"use client";

interface GenresProps {
  genres: string[];
}

export const Genres = ({ genres }: GenresProps) => {
  return (
    <div className="flex gap-1 mb-3 overflow-ellipsis overflow-hidden">
      {genres.map((genre, index) => (
        <span
          className="inline-flex items-center whitespace-nowrap rounded-full border border-border/80 bg-linear-to-b from-slate-edge to-surface-subtle p-1.5 text-[11px] font-medium leading-none tracking-wide text-zinc-light shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/5"
          key={index}
        >
          {genre}
        </span>
      ))}
    </div>
  );
};
