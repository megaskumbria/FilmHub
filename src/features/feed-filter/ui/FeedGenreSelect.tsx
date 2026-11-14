import { useTranslations } from "next-intl";
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { useFeedGenres } from "@/shared/hooks";
import { capitalize } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { useCollectionsFeedStore } from "../model/collectionsFeed.store";

export const FeedGenreSelect = () => {
  const t = useTranslations("home");
  const { genreId, setFilter } = useCollectionsFeedStore();
  const { data: genresData } = useFeedGenres();

  const selectedGenre = genresData?.find((genreItem) => genreItem.id === genreId);

  return (
    <div className="flex flex-col gap-2">
      <Label className="px-0.5 text-[13px] font-medium text-zinc-muted">{t("genre")}</Label>

      <Select value={genreId} onValueChange={(value) => setFilter({ genreId: value })}>
        <SelectTrigger variant="neutral">
          <SelectValue placeholder={t("genrePlaceholder")}>
            {selectedGenre ? capitalize(selectedGenre.genre) : null}
          </SelectValue>
        </SelectTrigger>

        <SelectContent variant="neutral" position="popper" sideOffset={8}>
          {genresData?.map((genre) => (
            <SelectItem
              hideCheckIcon
              variant="neutral"
              key={genre.id}
              value={genre.id}
              className="[&>span:last-child]:min-w-0 [&>span:last-child]:flex-1"
            >
              <span className="flex w-full items-center justify-between gap-4">
                <span className="truncate">{capitalize(genre.genre)}</span>
                <span
                  className={cn(
                    "shrink-0 text-xs tabular-nums",
                    genre.quantity === 0 ? "text-zinc-muted/35" : "text-zinc-muted",
                  )}
                >
                  {genre.quantity}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
