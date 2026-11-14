import { useTranslations } from "next-intl";
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { DATA_MEDIA_COUNT_OPTIONS } from "../model/dataMediaCountOptions";
import { useCollectionsFeedStore } from "../model/collectionsFeed.store";

export const MediaCountSelect = () => {
  const t = useTranslations("home");
  const { quantity, setFilter } = useCollectionsFeedStore();

  return (
    <div className="flex flex-col gap-2">
      <Label className="px-0.5 text-[13px] font-medium text-zinc-muted">{t("size")}</Label>

      <Select value={quantity} onValueChange={(value) => setFilter({ quantity: value })}>
        <SelectTrigger variant="neutral">
          <SelectValue placeholder={t("sizePlaceholder")} />
        </SelectTrigger>

        <SelectContent variant="neutral" position="popper" sideOffset={8}>
          {DATA_MEDIA_COUNT_OPTIONS.map((option) => (
            <SelectItem hideCheckIcon variant="neutral" key={option.value} value={option.value}>
              {t(`sizeOptions.${option.value}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
