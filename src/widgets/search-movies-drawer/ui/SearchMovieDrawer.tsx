"use client";

import {
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  Drawer,
  Button,
  Input,
} from "@/shared/ui";
import { mockMovies } from "@/widgets/TEST/ui/MovieCard";
import { Search, Plus } from "lucide-react";

export const SearchMovieDrawer = () => {
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="size-9 border-border/80 bg-secondary/50 text-muted-foreground hover:border-accent/40 hover:bg-accent/10 transition-colors"
        >
          <Search className="size-4 text-primary" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="top-12 h-[90vh] border-border/40 bg-background/85 backdrop-blur-xl shadow-2xl rounded-b-xl">
        <DrawerHeader className="px-6 pb-4 pt-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Поиск фильмов..."
              className="h-11 pl-10 bg-secondary/50 border-border/60 text-foreground placeholder:text-muted focus-visible:border-accent/60 focus-visible:ring-accent/20"
            />
          </div>
        </DrawerHeader>

        <div className="drawer-scroll overflow-y-auto px-6 pb-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[1000px] w-full">
              {mockMovies.map((movie, index) => (
                <article
                  key={index}
                  className="group relative rounded-xl overflow-hidden border border-border/50 bg-card/80 shadow-lg transition-all duration-300 hover:border-accent/30 hover:shadow-accent/10 hover:shadow-xl"
                >
                  <div className="relative aspect-2/3 overflow-hidden">
                    <img
                      src={movie.imgUrl}
                      alt={movie.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/20 to-transparent" />
                    <Button
                      size="icon"
                      className="absolute top-2 right-2 size-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent shadow-md transition-colors z-10"
                      aria-label="Добавить"
                    >
                      <Plus className="size-4" />
                    </Button>
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5">
                      <span className="inline-flex rounded-md bg-gold/90 px-2 py-0.5 text-xs font-semibold text-background">
                        {movie.rating}
                      </span>
                      <h3 className="font-semibold text-foreground line-clamp-2 drop-shadow-sm">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-muted">{movie.yearOfRelease}</p>
                    </div>
                  </div>

                  <div className="p-3 border-t border-border/40">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {movie.genres.slice(0, 3).map((genre, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] text-muted border border-border/40"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                      {movie.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t border-border/40 py-3">
          <p className="text-center text-sm text-muted">
            Нажмите Enter или на значок поиска чтобы узнать больше результатов
          </p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
