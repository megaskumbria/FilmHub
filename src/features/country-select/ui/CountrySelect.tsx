"use client";

import {
  Label,
  Skeleton,
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxValue,
  ComboboxList,
  ComboboxItem,
  useComboboxAnchor,
} from "@/shared/ui";
import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import { useFilterMedia } from "@/shared/stores/filter-media-store";
import { useCountries } from "@/shared/hooks";

export const CountrySelect = () => {
  const countryAnchorRef = useComboboxAnchor();
  const { selectedCountry, setSelectedCountry } = useFilterMedia();
  const { data: dataCountries = [], isLoading } = useCountries();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-2"
    >
      <Label className="text-xs font-medium text-muted flex items-center gap-1.5">
        <Flag className="size-3.5" />
        Country
      </Label>

      <div ref={countryAnchorRef} className="w-full">
        <Combobox
          value={selectedCountry.iso_3166_1}
          onValueChange={(value) =>
            setSelectedCountry({
              iso_3166_1: value ?? "",
              english_name: "",
              native_name: "",
            })
          }
        >
          <ComboboxInput className="cursor-pointer w-full h-9 rounded-lg bg-input/50 border-border hover:border-accent/30 transition-colors">
            <ComboboxValue placeholder="Choose country" />
          </ComboboxInput>

          <ComboboxContent
            anchor={countryAnchorRef}
            className="bg-graphite border-border/40 shadow-xl"
          >
            <ComboboxList>
              {isLoading ?
                <div className="space-y-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full rounded-sm" />
                  ))}
                </div>
              : dataCountries.map((country) => (
                  <ComboboxItem key={country.iso_3166_1} value={country.iso_3166_1}>
                    {country.english_name}
                  </ComboboxItem>
                ))
              }
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </motion.div>
  );
};
