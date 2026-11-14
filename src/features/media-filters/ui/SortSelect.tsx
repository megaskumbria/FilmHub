"use client";

import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { DATA_SORT_OPTIONS } from "../model/dataSortOptions";
import { useFilterMedia } from "../model/filter-media-store";
import { useTranslations } from "next-intl";

export const SortSelect = () => {
  const t = useTranslations("catalog");
  const { selectedSort, setSelectedSort } = useFilterMedia();

  return (
    <div className="flex flex-col gap-2">
      <Label className="px-0.5 text-[13px] font-medium text-zinc-muted">{t("sort")}</Label>

      <Select value={selectedSort} onValueChange={setSelectedSort}>
        <SelectTrigger variant="neutral">
          <SelectValue placeholder={t("sortPlaceholder")} />
        </SelectTrigger>

        <SelectContent variant="neutral" position="popper" sideOffset={8}>
          {DATA_SORT_OPTIONS.map((option) => (
            <SelectItem hideCheckIcon variant="neutral" key={option.value} value={option.value}>
              {t(`sortOptions.${option.value}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
