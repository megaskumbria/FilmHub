"use client";

import {
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
  Drawer,
  Button,
  Input,
} from "@/shared/ui";
import { mockMovies, IMovieCardData } from "@/shared/model/movies";
import { Search } from "lucide-react";
import { InteractiveMovieCard } from "@/widgets/interactive-movie-card";

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

      <DrawerContent
        aria-describedby={undefined}
        className="top-12 h-[90vh] border-border/40 bg-background/85 backdrop-blur-xl shadow-2xl rounded-b-xl"
      >
        <DrawerTitle></DrawerTitle>

        <DrawerHeader className="px-6 pb-4 pt-2 items-center">
          <div className="relative max-w-[1000px] w-full">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <Input variant="accent" placeholder="Поиск фильмов..." className="w-full h-11 pl-10" />
          </div>
        </DrawerHeader>

        <div className="drawer-scroll overflow-y-auto px-6 pb-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,220px))] justify-center gap-4 max-w-[1000px] w-full">
              {mockMovies.map((movie: IMovieCardData, index) => (
                <InteractiveMovieCard key={index} movie={movie} />
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
