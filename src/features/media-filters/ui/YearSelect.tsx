"use client";

import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { DATA_YEARS } from "../model/dataYears";
import { useFilterMedia } from "../model/filter-media-store";
import { useTranslations } from "next-intl";

export const YearSelect = () => {
  const t = useTranslations("catalog");
  const { selectedYear, setSelectedYear } = useFilterMedia();

  return (
    <div className="flex flex-col gap-2">
      <Label className="px-0.5 text-[13px] font-medium text-zinc-muted">{t("year")}</Label>

      <Select value={selectedYear} onValueChange={setSelectedYear}>
        <SelectTrigger variant="neutral">
          <SelectValue placeholder={t("yearPlaceholder")} />
        </SelectTrigger>

        <SelectContent variant="neutral" position="popper" sideOffset={8}>
          {DATA_YEARS.map((year) => (
            <SelectItem hideCheckIcon variant="neutral" key={year.value} value={year.value}>
              {year.value === "before-1990" || year.value === "2020-today" ?
                t(`years.${year.value}`)
              : year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
