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
import { mockMovies } from "@/shared/model/movies";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MediaCard } from "@/widgets/movie-card";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";

export const SearchMovieDrawer = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { layout } = useMovieCardLayout();

  const navigateToMovieSearch = (e: globalThis.KeyboardEvent) => {
    if (e.key === "Enter") {
      router.push("/movie-search");
      e.preventDefault();
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    window.addEventListener("keydown", navigateToMovieSearch);
    return () => window.removeEventListener("keydown", navigateToMovieSearch);
  }, [open, router]);

  return (
    <Drawer direction="top" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-center rounded-sm size-9 border-border/80 bg-secondary/50 text-muted-foreground hover:border-accent/40 hover:bg-accent/10 transition-colors"
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
            <Link href="/movie-search" onClick={() => setOpen(false)}>
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted cursor-pointer" />
            </Link>

            <Input
              placeholder="Search movies..."
              className="w-full h-11 pl-10 placeholder:text-zinc-muted"
            />
          </div>
        </DrawerHeader>

        <div className="drawer-scroll overflow-y-auto px-6 pb-4 flex justify-center">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,220px))] justify-center gap-4 max-w-[1000px] w-full">
            {mockMovies.map((movie) => (
              <MediaCard
                key={movie.id}
                movie={movie}
                layout={layout}
                blockOptions={{
                  poster: { flags: { showFlags: false } },
                  hover: { flags: { showFlags: false } },
                  body: { flags: { showFlags: false } },
                }}
                mode="add-collection"
              />
            ))}
          </div>
        </div>

        <DrawerFooter className="border-t border-border/40 py-3">
          <p className="text-center text-sm text-muted">
            Press Enter or the search icon to load more results
          </p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
