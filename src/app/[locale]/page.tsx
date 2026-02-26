import { mockMovies } from "@/shared/model/movies";
import { MovieCard } from "@/widgets/movie-card";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 justify-center p-4">
        {mockMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            layout={{
              // poster: ["rating", "title", "genres", "description"],
              poster: [],
              body: [],
              hover: [],
            }}
          />
        ))}
      </div>

      {/* <div className="grid grid-cols-4 gap-4 justify-center p-4"> */}
      {/* <div className="max-w-[290px]">
          <h2 className="text-lg font-bold text-center">CTO снаружи (поиск)</h2>

          <article className="max-h-fit h-auto max-w-[290px] border border-border rounded-xl">
            <div className="group relative aspect-2/3 cursor-pointer overflow-hidden rounded-xl">
              <Image
                fill
                className="object-cover rounded-xl border-b-0 transition-transform duration-300 ease-out group-hover:scale-110"
                src="/images/mock-movie-4.jpg"
                alt="movieCard"
              />

              <span className="absolute top-[10px] left-[10px] flex items-center gap-1 bg-emerald-600 rounded-lg text-white text-xs font-bold py-1 px-1.5 shadow-lg z-20">
                <Star className="size-3.5 fill-white" />
                8.2
              </span>

              <Button className="border border-border/60 absolute top-2 right-2 size-8 rounded-full bg-background/80 text-foreground hover:bg-accent shadow-md transition-colors z-20">
                <Plus className="size-4" />
              </Button>

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none" />
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
                В Библиотеке Сиґилда неизвестной силы приходит в голову Торуну, что он может
                уничтожить Саурон, уничтожив все осколки кольца. Но этот путь оказывается опасным, и
                Торуну предстоит сразиться с Моргул, демонскими стражами, чтобы сохранить свою жизнь
                и восстановить миром Семь колец.
              </p>
            </div>
          </article>
        </div> */}

      {/* ============================================================================================== */}

      {/* <div className="max-w-[290px]">
          <h2 className="text-lg font-bold text-center">CTO внутри (поиск)</h2>

          <article className="group max-h-fit h-auto max-w-[290px] border border-border rounded-xl cursor-pointer">
            <div className="relative aspect-2/3 overflow-hidden rounded-xl">
              <Image
                width={290}
                height={435}
                quality={100}
                className="object-cover rounded-xl border-b-0 transition-transform duration-300 ease-out group-hover:scale-110"
                src="/images/mock-movie-4.jpg"
                alt="movieCard"
              />

              <span className="absolute top-[10px] left-[10px] flex items-center gap-1 bg-emerald-600 rounded-lg text-white text-xs font-bold py-1 px-1.5 shadow-lg z-20">
                <Star className="size-3.5 fill-white" />
                8.2
              </span>

              <Button className="absolute top-2 right-2 size-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent shadow-md transition-colors z-20">
                <Plus className="size-4" />
              </Button>

              {/* Overlay с информацией при hover */}
      {/* <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="max-w-[200px] font-bold text-white text-base line-clamp-2 leading-tight">
                      Властелин колец: Возвращение короля
                    </h3>
                    <span className="text-white/90 font-semibold text-sm ml-2 shrink-0">2002</span>
                  </div>

                  <div className="flex gap-1.5 mb-3">
                    {["ужасы", "триллер", "драма", "фантастика"].map((genre, index) => (
                      <span
                        className="items-center rounded-full bg-white/15 border border-white/25 px-2 py-1 text-[11px] font-medium text-white/90"
                        key={index}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article> */}
      {/* </div>  */}
      {/* </div> */}
    </>
  );
}
