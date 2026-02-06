import { Button } from "@/shared/ui";
import { IMovieCardData } from "@/shared/model/movies";
import Image from "next/image";
import { Plus } from "lucide-react";

interface InteractiveMovieCardProps {
  movie: IMovieCardData;
}

export const InteractiveMovieCard = ({ movie }: InteractiveMovieCardProps) => {
  const { imgUrl, title, genres, description, yearOfRelease, rating } = movie;

  return (
    <article className="group relative rounded-xl overflow-hidden border border-border/50 bg-card/80 shadow-lg transition-all duration-300 hover:border-accent/30 hover:shadow-accent/10 hover:shadow-xl">
      <div className="relative aspect-2/3 overflow-hidden">
        <Image
          src={imgUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={200}
          height={300}
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
            {rating}
          </span>

          <h3 className="font-semibold text-foreground line-clamp-2 drop-shadow-sm">{title}</h3>

          <p className="text-xs text-muted">{yearOfRelease}</p>
        </div>
      </div>

      <div className="p-3 border-t border-border/40">
        <ul className="flex flex-nowrap gap-1.5 overflow-x-hidden truncate">
          {genres.map((genre, index) => (
            <li
              key={index}
              className="rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] text-muted border border-border/40"
            >
              {genre}
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted line-clamp-2 leading-relaxed pt-2">{description}</p>
      </div>
    </article>
  );
};
