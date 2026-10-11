import { useTranslations } from "next-intl";
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { useFeedGenres } from "@/shared/hooks";
import { useCollectionsFeedStore } from "../model/collectionsFeed.store";
import { capitalize } from "@/shared/lib";

export const FeedGenreSelect = () => {
  const t = useTranslations("home");
  const { genreId, setFilter } = useCollectionsFeedStore();
  const { data: genresData } = useFeedGenres();

  const selectedGenre = genresData?.find((genreItem) => genreItem.id === genreId);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-2"
    >
      <Label className="text-xs font-medium text-muted flex items-center gap-1.5">
        <Film className="size-3.5" />
        {t("genre")}
      </Label>

      <Select value={genreId} onValueChange={(value) => setFilter({ genreId: value })}>
        <SelectTrigger className="cursor-pointer w-full h-10 rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors">
          <SelectValue placeholder={t("genrePlaceholder")}>
            {selectedGenre && (
              <span className="flex w-full items-center justify-between gap-3 pr-1">
                <span className="truncate">{capitalize(selectedGenre.genre)}</span>

                <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border text-muted">
                  {selectedGenre.quantity}
                </span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={8}
          className="bg-graphite border-border/40 shadow-xl max-h-120 overflow-y-auto"
        >
          {genresData?.map((genre) => (
            <SelectItem
              hideCheckIcon={true}
              key={genre.id}
              value={genre.id}
              className="w-full [&>span:last-child]:flex-1 [&>span:last-child]:min-w-0 pr-2"
            >
              <div className="flex w-full items-center justify-between">
                <span>{capitalize(genre.genre)}</span>
                <span className="text-muted">{genre.quantity}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};
