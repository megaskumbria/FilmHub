import { useTranslations } from "next-intl";
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
      render={({ field }) => {
        const selectedLabel = COLOR_PRESETS.find(({ colorHex }) => colorHex === field.value)?.label;

        return (
          <FormItem className="flex flex-col gap-3">
            <header className="flex items-center justify-between gap-4">
              <FormLabel className="text-sm font-medium text-foreground">{t("color")}</FormLabel>

              {selectedLabel && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-muted">
                  <span className="size-2 rounded-full" style={{ backgroundColor: field.value }} />
                  {selectedLabel}
                </span>
              )}
            </header>

            <FormControl>
              <div className="grid grid-cols-10 justify-items-center gap-y-2.5">
                {COLOR_PRESETS.map(({ colorHex, label }) => {
                  const isSelected = field.value === colorHex;

                  return (
                    <Button
                      type="button"
                      variant="swatch"
                      key={colorHex}
                      title={label}
                      onClick={() => field.onChange(colorHex)}
                      className="size-7"
                      style={{
                        backgroundColor: colorHex,
                        boxShadow:
                          isSelected ?
                            `0 0 0 2px var(--background), 0 0 0 4px ${colorHex}, 0 0 14px ${colorHex}80`
                          : "inset 0 0 0 1px rgb(255 255 255 / 0.08)",
                      }}
                    >
                      {isSelected && (
                        <IconCheck
                          className="size-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                          strokeWidth={2.8}
                        />
                      )}
                    </Button>
                  );
                })}
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};
