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
import { useFilterMedia } from "@/shared/stores/filter-media-store";
import { useCountries } from "@/shared/hooks";
import type { Country } from "@/shared/hooks/useCountries";
import { EarthIcon } from "@/shared/icons";
import { LockKeyholeIcon } from "lucide-react";

export const CountrySelect = () => {
  const countryAnchorRef = useComboboxAnchor();
  const { selectedCountry, setSelectedCountry, isFrozenFilterCountry } = useFilterMedia();
  const { data: dataCountries = [], isLoading } = useCountries();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-2"
    >
      <Label className="text-xs font-medium text-muted flex items-center gap-1.5">
        <EarthIcon className="size-3.5" />
        Country
      </Label>

      <div ref={countryAnchorRef} className="relative w-full">
        {isFrozenFilterCountry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 rounded-lg select-none"
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
                  <span>Country filter is unavailable while searching</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
        <Combobox
          value={selectedCountry.iso31661 ? selectedCountry : null}
          onValueChange={(country) => country && setSelectedCountry(country)}
          items={dataCountries}
          itemToStringLabel={(country) => country.englishName}
          itemToStringValue={(country) => country.iso31661}
          isItemEqualToValue={(a, b) => a.iso31661 === b.iso31661}
        >
          <ComboboxInput
            placeholder="Select country"
            className="py-2 w-full rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors"
            disabled={isFrozenFilterCountry}
          />

          <ComboboxContent
            anchor={countryAnchorRef}
            className="bg-graphite border-border/40 shadow-xl"
          >
            <ComboboxEmpty>
              <div className="p-4 text-sm text-muted">No countries found</div>
            </ComboboxEmpty>

            <ComboboxList>
              {isLoading ?
                <div className="space-y-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full rounded-sm" />
                  ))}
                </div>
              : (country: Country) => (
                  <ComboboxItem key={country.iso31661} value={country}>
                    {country.englishName}
                  </ComboboxItem>
                )
              }
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </motion.div>
  );
};
