import { ImageIcon, Upload } from "lucide-react";

export const MovieCardPlaceholder = () => {
  return (
    <>
      <div className="relative w-full aspect-2/3 rounded-xl border border-white/8 bg-zinc-900 flex items-center justify-center overflow-hidden shadow-2xl shadow-black/70 ring-1 ring-white/5">
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

      <div className="relative mt-1.5 h-20 w-full rounded-xl border border-white/8 bg-zinc-900 overflow-hidden shadow-2xl shadow-black/70 ring-1 ring-white/5 p-3.5">
        <div className="absolute inset-0 bg-linear-to-br from-zinc-800/60 via-zinc-900/80 to-zinc-950" />
        <div className="relative z-10 flex items-center justify-between mb-3">
          <span className="text-[8px] font-bold tracking-wider text-emerald-accent/80 bg-emerald-accent/10 px-1.5 py-0.5 rounded border border-emerald-accent/20 uppercase">
            body
          </span>
        </div>
      </div>
    </>
  );
};
