"use client";

import {
  Label,
  Skeleton,
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  useComboboxAnchor,
  ComboboxEmpty,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/shared/ui";
import { motion } from "framer-motion";
import { useFilterMedia } from "../model/filter-media-store";
import { useCountries } from "@/shared/hooks";
import type { Country } from "@/shared/hooks/useCountries";
import { LockKeyholeIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export const CountrySelect = () => {
  const t = useTranslations("catalog");
  const countryAnchorRef = useComboboxAnchor();
  const { selectedCountry, setSelectedCountry, isFrozenFilterCountry } = useFilterMedia();
  const { data: dataCountries = [], isLoading } = useCountries();

  return (
    <div className="flex flex-col gap-2">
      <Label className="px-0.5 text-[13px] font-medium text-zinc-muted">{t("country")}</Label>

      <div ref={countryAnchorRef} className="relative w-full">
        {isFrozenFilterCountry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 rounded-xl select-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--destructive) 8%, transparent) 40%, color-mix(in srgb, var(--destructive) 14%, transparent) 100%)",
              boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--destructive) 30%, transparent)",
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute right-0 inset-y-0 flex items-center pr-3 cursor-default">
                    <LockKeyholeIcon className="size-3.5 text-destructive/60" />
                  </div>
                </TooltipTrigger>

                <TooltipContent side="top" className="text-sm">
                  <span>{t("countryLocked")}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
        <Combobox
          value={selectedCountry.iso31661 ? selectedCountry : null}
          onValueChange={(country) => country && setSelectedCountry(country)}
          items={dataCountries}
          itemToStringLabel={(country) => country.nativeName}
          itemToStringValue={(country) => country.iso31661}
          isItemEqualToValue={(a, b) => a.iso31661 === b.iso31661}
        >
          <ComboboxInput
            placeholder={t("countryPlaceholder")}
            className="h-11 w-full rounded-xl border-border/60 bg-background shadow-none transition-colors hover:border-accent/40 has-[[data-slot=input-group-control]:focus-visible]:border-accent has-[[data-slot=input-group-control]:focus-visible]:ring-0"
            disabled={isFrozenFilterCountry}
          />

          <ComboboxContent
            anchor={countryAnchorRef}
            className="z-70 max-h-72 rounded-xl border border-border/60 bg-graphite p-1.5 shadow-2xl ring-0"
          >
            <ComboboxEmpty>
              <div className="p-4 text-sm text-muted">{t("countryEmpty")}</div>
            </ComboboxEmpty>

            <ComboboxList>
              {isLoading ?
                <div className="space-y-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full rounded-sm" />
                  ))}
                </div>
              : (country: Country) => (
                  <ComboboxItem
                    key={country.iso31661}
                    value={country}
                    className="rounded-lg py-2 pr-3 pl-3 data-highlighted:bg-white/6 data-highlighted:text-foreground **:data-[slot=combobox-item-indicator]:hidden"
                  >
                    {country.nativeName}
                  </ComboboxItem>
                )
              }
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
};
