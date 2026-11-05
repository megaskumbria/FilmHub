import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui";
import { COLOR_PRESETS } from "@/widgets/create-folder-modal/model/color-presets";
import { Button } from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
import { CreateCollectionSchema } from "../model/useCreateCollectionSchema";
import { IconCheck } from "@tabler/icons-react";

interface Props {
  form: UseFormReturn<CreateCollectionSchema>;
}

export const CollectionColorPicker = ({ form }: Props) => {
  const t = useTranslations("collections.create");

  return (
    <FormField
      control={form.control}
      name="colorHex"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2.5">
          <FormLabel className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
            {t("color")}
          </FormLabel>

          <FormControl>
            <div className="grid grid-cols-10 gap-1.5 justify-items-center">
              {COLOR_PRESETS.map(({ colorHex }, i) => {
                const isSelected = field.value === colorHex;

                return (
                  <Button
                    key={i}
                    onClick={() => field.onChange(colorHex)}
                    className={cn(
                      "relative size-7 rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      field.value !== colorHex && "opacity-60 hover:opacity-90 hover:scale-105",
                      isSelected && "z-10 scale-105",
                    )}
                    style={{
                      backgroundColor: colorHex,
                      boxShadow:
                        isSelected ?
                          `0 0 0 2px #121214, 0 0 0 3px ${colorHex}, 0 0 12px ${colorHex}66`
                        : undefined,
                    }}
                  >
                    {isSelected && (
                      <IconCheck
                        className="absolute size-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                        strokeWidth={2.8}
                      />
                    )}
                  </Button>
                );
              })}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
