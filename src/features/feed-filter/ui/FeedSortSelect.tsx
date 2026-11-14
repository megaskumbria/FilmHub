import { useTranslations } from "next-intl";
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { DATA_FEED_SORT_OPTIONS } from "../model/dataFeedSortOptions";
import { useCollectionsFeedStore } from "../model/collectionsFeed.store";

export const FeedSortSelect = () => {
  const t = useTranslations("home");
  const { sort, setFilter } = useCollectionsFeedStore();

  return (
    <div className="flex flex-col gap-2">
      <Label className="px-0.5 text-[13px] font-medium text-zinc-muted">{t("sort")}</Label>

      <Select value={sort} onValueChange={(value) => setFilter({ sort: value })}>
        <SelectTrigger variant="neutral">
          <SelectValue placeholder={t("sortPlaceholder")} />
        </SelectTrigger>

        <SelectContent variant="neutral" position="popper" sideOffset={8}>
          {DATA_FEED_SORT_OPTIONS.map((option) => (
            <SelectItem hideCheckIcon variant="neutral" key={option.value} value={option.value}>
              {t(`sortOptions.${option.value}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
