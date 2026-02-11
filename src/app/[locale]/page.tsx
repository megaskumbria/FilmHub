import { Button } from "@/shared/ui";
import { Plus, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* <h2 className="text-2xl font-bold">Здесь будет общая лента фильмов</h2> */}

      <article className="max-h-fit h-auto max-w-[290px] border border-border rounded-xl">
        <div className="relative aspect-2/3">
          <img
            className="block w-full h-full object-cover rounded-xl border-b-0"
            src="images/mock-movie-4.jpg"
            alt="movieCard"
          />

          <span className="absolute top-[10px] left-[10px] flex items-center gap-1 bg-emerald-600 rounded-lg text-white text-xs font-bold py-1 px-1.5 shadow-lg">
            <Star className="size-3.5 fill-white" />
            8.2
          </span>

          <Button
            size="icon"
            className="absolute top-2 right-2 size-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent shadow-md transition-colors z-10"
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <div className="p-3">
          <div className="flex justify-between mb-2">
            <h3 className="max-w-[200px] overflow-ellipsis whitespace-nowrap overflow-hidden font-semibold text-foreground">
              Властелин колец: Возвращение короля
            </h3>

            <span>2002</span>
          </div>

          <div className="flex gap-1 mb-3 overflow-ellipsis overflow-hidden">
            {["ужасы", "триллер", "драма", "фантастика"].map((genre, index) => (
              <span
                className="inline-flex items-center whitespace-nowrap rounded-full border border-border/80 bg-linear-to-b from-slate-edge to-surface-subtle p-1.5 text-[11px] font-medium leading-none tracking-wide text-zinc-light shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/5"
                key={index}
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-sm relative line-clamp-3 overflow-hidden max-h-[60px]">
            В Библиотеке Сиґилда неизвестной силы приходит в голову Торуну, что он может уничтожить
            Саурон, уничтожив все осколки кольца. Но этот путь оказывается опасным, и Торуну
            предстоит сразиться с Моргул, демонскими стражами, чтобы сохранить свою жизнь и
            восстановить миром Семь колец.
          </p>
        </div>
      </article>
    </div>
  );
}
